// JavaQuest v2 服务端: 静态文件 + 题库 API + 判题 API
//   GET  /api/problems            题目列表(只含公开信息与公开样例)
//   POST /api/judge               提交评测 { problemId, code } -> 逐用例 verdict(含隐藏用例+对拍)
//   POST /api/run                 仅跑公开样例(快速自测, 不含隐藏用例)
//   GET  /api/reload              热加载题库
import http from 'http'; import fs from 'fs'; import path from 'path'; import vm from 'vm';
import { judgeProblem } from './judge-core.mjs';

const root = path.resolve('.');
const port = +(process.argv[2] || 4319);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8' };

const problems = new Map();
let problemsMeta = [];
function loadProblems() {
  const dir = path.join(root, 'data/problems');
  if (!fs.existsSync(dir)) return;
  problems.clear();
  const chapters = [];
  for (const f of fs.readdirSync(dir).filter(x => /^ch\d+\.js$/.test(x)).sort()) {
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    const ctx = { window: { JQ_PROBLEMS: [] }, console };
    try { vm.runInNewContext(src, ctx, { timeout: 8000 }); } catch (e) { console.error('[problems] 解析失败', f, e.message); continue; }
    const blob = (ctx.window.JQ_PROBLEMS || [])[0];
    if (!blob) continue;
    const levels = [];
    for (const p of blob.levels || []) {
      problems.set(p.id, p);
      const opSets = p.opSets || [];
      const visibleOpSets = opSets.filter(s => !s.hidden).length;
      // 如实描述"怎么判": 用例数按真正会执行的数量统计
      const judgeDesc = p.mode === 'stress'
        ? `随机对拍 ×${(p.stress && p.stress.iterations) || 200} + 固定用例 ×${(p.tests || []).length}`
        : p.mode === 'design'
          ? `操作序列 ×${opSets.length || 1}`
          : `用例 ×${(p.tests || []).length}`;
      const hiddenCount = p.mode === 'stress'
        ? (p.tests || []).filter(t => t.hidden).length
        : p.mode === 'design'
          ? opSets.filter(s => s.hidden).length
          : (p.tests || []).filter(t => t.hidden).length;
      const totalTests = p.mode === 'stress'
        ? (p.tests || []).length + 1
        : p.mode === 'design'
          ? (opSets.length || 1)
          : (p.tests || []).length;
      levels.push({
        id: p.id, order: p.order, stage: p.stage, title: p.title, tags: p.tags || [], q: p.q,
        mode: p.mode, entry: p.entry, limits: p.limits || null, hints: p.hints || [], starter: p.starter,
        samples: (p.tests || []).filter(t => !t.hidden).map(t => ({ name: t.name, args: t.args, stdin: t.stdin, expect: t.expect })),
        sampleCount: (p.tests || []).filter(t => !t.hidden).length,
        hiddenCount, totalTests, judgeDesc,
        isBoss: p.order === 15,
        hasStress: p.mode === 'stress', hasDesign: p.mode === 'design'
      });
    }
    chapters.push({ ch: blob.ch, title: blob.title, courseRef: blob.courseRef, levels });
  }
  chapters.sort((a, b) => a.ch - b.ch);
  problemsMeta = chapters;
  console.log(`[problems] 已加载 ${chapters.length} 章 / ${problems.size} 关`);
}

function readBody(req) {
  return new Promise(resolve => {
    let b = '';
    req.on('data', c => { b += c; if (b.length > 400 * 1024) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(b || '{}')); } catch { resolve(null); } });
  });
}
function json(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

loadProblems();

http.createServer(async (req, res) => {
  const u = req.url.split('?')[0];

  if (u === '/api/problems') return json(res, 200, { chapters: problemsMeta });
  if (u === '/api/reload') { loadProblems(); return json(res, 200, { ok: true, count: problems.size }); }

  if (req.method === 'POST' && (u === '/api/judge' || u === '/api/run')) {
    const body = await readBody(req);
    if (!body || !body.problemId) return json(res, 400, { error: 'bad request' });
    const p = problems.get(body.problemId);
    if (!p) return json(res, 404, { error: '未知题目 ' + body.problemId });
    const code = String(body.code || '');
    if (code.length > 20000) return json(res, 400, { error: '代码过长' });
    const runOnly = u === '/api/run';
    const target = runOnly
      ? Object.assign({}, p, {
        tests: (p.tests || []).filter(t => !t.hidden),
        opSets: (p.opSets || []).filter(s => !s.hidden),
        mode: p.mode === 'stress' ? 'method' : p.mode
      })
      : p;
    const r = judgeProblem(target, code);
    const out = {
      verdict: r.verdict, compile: r.compile, message: r.message,
      passed: r.passed, total: r.total, timeMs: r.timeMs, mode: runOnly ? 'run' : 'judge',
      cases: (r.cases || []).map(c => ({
        name: c.hidden ? ('阶段 · ' + (c.name || '隐藏边界')) : c.name,
        verdict: c.verdict, timeMs: c.timeMs,
        // 安全: 隐藏用例不泄露期望/实际值(仅判题器内部比对), 防止对着隐藏用例打表
        got: c.hidden ? undefined : c.got,
        expect: c.hidden ? undefined : c.expect,
        detail: c.hidden ? undefined : c.detail,
        hidden: !!c.hidden
      }))
    };
    if (!runOnly && r.verdict === 'AC' && p.solution) out.solution = p.solution;
    return json(res, 200, out);
  }

  let p;
  try { p = decodeURIComponent(req.url.split('?')[0]); }
  catch { res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('400 非法路径'); return; }
  if (p === '/') p = '/index.html';
  // 题库数据只在服务端使用(含参考实现与隐藏用例), 不作为静态文件下发
  if (/^\/data\//i.test(p) || /\.\./.test(p)) { res.writeHead(403); res.end('403'); return; }
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log(`JavaQuest v2 已启动: http://127.0.0.1:${port}`));

// 兜底: 单个请求异常不应让整个服务退出
process.on('uncaughtException', e => console.error('[未捕获异常]', e && e.message));
process.on('unhandledRejection', e => console.error('[未处理拒绝]', e && (e.message || e)));
