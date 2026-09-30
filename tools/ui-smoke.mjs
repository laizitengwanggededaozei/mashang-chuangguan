// 前端冒烟测试: 用 stub DOM 真实执行 api.js / engine2.js / ui2.js 的渲染与交互路径
// 目的: 在不用浏览器的情况下抓出"点击无反应 / 渲染报错"这类接线故障
// 用法: node tools/ui-smoke.mjs
import fs from 'fs'; import vm from 'vm'; import path from 'path';
import { judgeProblem } from './judge-core.mjs';

const root = process.cwd();
const problems = [];
for (const f of fs.readdirSync(path.join(root, 'data/problems')).filter(x => /^ch\d+\.js$/.test(x)).sort()) {
  const ctx = { window: { JQ_PROBLEMS: [] }, console };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'data/problems', f), 'utf8'), ctx);
  problems.push(ctx.window.JQ_PROBLEMS[0]);
}

// ---------- 最小 DOM / 浏览器 API 桩 ----------
const elements = new Map();
function makeEl(id) {
  const el = {
    id, innerHTML: '', textContent: '', value: '', style: {}, dataset: {}, className: '',
    classList: { toggle() { }, add() { }, remove() { } },
    addEventListener() { }, insertAdjacentHTML(_, h) { this.innerHTML += h; },
    querySelectorAll() { return []; }, appendChild() { },
  };
  elements.set(id, el);
  return el;
}
const store = {};
const localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: k => { delete store[k]; },
};
// Object.keys(localStorage) 需返回草稿键
const localStorageProxy = new Proxy(localStorage, {
  ownKeys: () => Object.keys(store),
  getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true, value: undefined }),
});
const document = {
  getElementById: id => elements.get(id) || makeEl(id),
  querySelectorAll: () => [],
  createElement: tag => makeEl('created-' + tag + '-' + Math.random().toString(36).slice(2, 7)),
  addEventListener() { },
};
document.body = makeEl('body');
document.documentElement = document.body;
const timers = [];
const sandbox = {
  console, localStorage: localStorageProxy, document,
  window: null, setTimeout: () => 0, clearTimeout: () => { },
  setInterval: () => { timers.push(1); return timers.length; }, clearInterval: () => { },
  alert: () => { }, confirm: () => true,
};

// fetch 桩: 转发到本地题库与判题内核
const fetchStub = async (url, opt) => {
  if (url === '/api/problems') {
    const chapters = problems.map(b => ({
      ch: b.ch, title: b.title, courseRef: b.courseRef,
      levels: b.levels.map(p => {
        const opSets = p.opSets || [];
        return {
          id: p.id, order: p.order, stage: p.stage, title: p.title, tags: p.tags || [], q: p.q,
          mode: p.mode, entry: p.entry, limits: p.limits || null, hints: p.hints || [], starter: p.starter,
          samples: (p.tests || []).filter(t => !t.hidden).map(t => ({ name: t.name, args: t.args, expect: t.expect })),
          judgeDesc: p.mode === 'stress' ? `随机对拍 ×${(p.stress && p.stress.iterations) || 200} + 固定用例 ×${(p.tests || []).length}`
            : p.mode === 'design' ? `操作序列 ×${opSets.length || 1}` : `用例 ×${(p.tests || []).length}`,
          totalTests: p.mode === 'design' ? (opSets.length || 1) : (p.tests || []).length + (p.mode === 'stress' ? 1 : 0),
          hiddenCount: 0, hasStress: p.mode === 'stress', hasDesign: p.mode === 'design',
        };
      })
    }));
    return { ok: true, json: async () => ({ chapters }) };
  }
  if (url === '/api/judge' || url === '/api/run') {
    const { problemId, code } = JSON.parse(opt.body);
    let p = null;
    for (const b of problems) { const l = b.levels.find(x => x.id === problemId); if (l) p = l; }
    const runOnly = url === '/api/run';
    const target = runOnly ? Object.assign({}, p, { tests: (p.tests || []).filter(t => !t.hidden), opSets: (p.opSets || []).filter(s => !s.hidden), mode: p.mode === 'stress' ? 'method' : p.mode }) : p;
    const r = judgeProblem(target, code);
    return { ok: true, json: async () => ({ ...r, mode: runOnly ? 'run' : 'judge' }) };
  }
  return { ok: false, status: 404, json: async () => ({ error: 'not found' }) };
};

const sandbox2 = null;
sandbox.fetch = fetchStub;
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);
for (const f of ['js/api.js', 'js/engine2.js', 'js/ui2.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}

let fail = 0;
const check = (name, cond, extra = '') => { console.log(`${cond ? '✅' : '❌'} ${name}${extra ? ' — ' + extra : ''}`); if (!cond) fail++; };
const stage = () => elements.get('stage');
// 等 boot 完成
await new Promise(r => setTimeout(r, 300));
check('启动后渲染出关卡地图', /关卡地图/.test(stage().innerHTML || ''), `stage 长度 ${(stage().innerHTML || '').length}`);
check('地图含 14 章', (stage().innerHTML.match(/class="chap-title"/g) || []).length === 14, '章标题数=' + (stage().innerHTML.match(/class="chap-title"/g) || []).length);
const openEntries = (stage().innerHTML.match(/JQ2UI\.open\(/g) || []).length;
const lockedEntries = (stage().innerHTML.match(/先通过第/g) || []).length;
check('每章第 1 关默认可点(共 14 个入口)', openEntries === 14, '可点入口=' + openEntries);
check('其余 196 关处于锁定状态', lockedEntries === 196, '锁定=' + lockedEntries);

const Q = sandbox.JQ2;
check('JQ2UI.open 已定义(点击入口)', typeof Q.open === 'function');
check('题库已加载 210 关', Q.totalCount() === 210, '实际=' + Q.totalCount());

// 三个视图都要能渲染且不抛错
for (const v of ['map', 'route', 'bag']) {
  try { Q.view(v); check(`视图 ${v} 渲染正常`, (stage().innerHTML || '').length > 50); }
  catch (e) { check(`视图 ${v} 渲染正常`, false, e.message); }
}

// 逐一点开关卡(每个模式各取若干)
const picked = ['ch01-L01', 'ch01-L10', 'ch01-L13', 'ch04-L05', 'ch08-L14', 'ch13-L15'];
for (const id of picked) {
  try {
    await Q.open(id);   // 地图点击走的正是这个入口
    const html = stage().innerHTML || '';
    check(`点击 ${id} 能打开关卡`, html.includes('提交评测') && html.includes('codein'), `长度 ${html.length}`);
  } catch (e) { check(`点击 ${id} 能打开关卡`, false, e.message); }
}

// 用 solution 走一遍"跑公开样例"与"提交评测"
for (const id of ['ch01-L01', 'ch01-L10', 'ch08-L14']) {
  let p = null;
  for (const b of problems) { const l = b.levels.find(x => x.id === id); if (l) p = l; }
  try {
    await Q.open(id);
    elements.get('codein').value = p.solution;
    await Q.runSamples();
    await Q.submit();
    const out = elements.get('verdict').innerHTML || '';
    check(`${id} 提交正确解 → 显示通过`, /通过/.test(out) && !/答案错误/.test(out), out.replace(/<[^>]+>/g, ' ').slice(0, 80));
  } catch (e) { check(`${id} 提交正确解`, false, e.message); }
}

// 用 starter 提交必须不通过
{
  const p = problems.flatMap(b => b.levels).find(l => l.id === 'ch01-L01');
  await Q.open('ch01-L01');
  elements.get('codein').value = p.starter;
  await Q.submit();
  const out = elements.get('verdict').innerHTML || '';
  check('starter 提交不通过', !/🎉 通关/.test(out), out.replace(/<[^>]+>/g, ' ').slice(0, 80));
}

// ---------- 成就徽章 ----------
{
  const badges = Q.badgeState();
  check('徽章定义齐全(12 个)', badges.length === 12, '实际=' + badges.length);
  check('初始已有徽章解锁(首次通过触发)', Q.badgeCount() >= 1, '已解锁=' + Q.badgeCount());
  check('"初次编译"徽章已解锁', Q.save.badges.includes('first'), Q.save.badges.join(','));
  check('"一击必杀"徽章已解锁(首次提交即通过)', Q.save.badges.includes('firsttry'), Q.save.badges.join(','));
  Q.view('bag');
  check('战绩页渲染徽章墙', (stage().innerHTML.match(/badge-item/g) || []).length === 12, '徽章格数=' + (stage().innerHTML.match(/badge-item/g) || []).length);
  check('战绩页显示 BOSS 进度', /章节 BOSS 进度/.test(stage().innerHTML));
}

// ---------- BOSS 限时多阶段 ----------
let bossLv = null;
for (const b of problems) { const l = b.levels.find(x => x.id === 'ch01-L15'); if (l) bossLv = l; }
{
  await Q.open('ch01-L15');
  const html = stage().innerHTML;
  check('BOSS 关显示限时面板', /👑/.test(html) && /bosstimer/.test(html), 'BOSS 面板=' + /boss-card/.test(html));
  check('BOSS 关显示多阶段芯片', /boss-stages/.test(html) && /阶段 1/.test(html));
  check('BOSS 关计时器已启动', timers.length > 0, '定时器数=' + timers.length);
  check('地图上 BOSS 关有独立样式', /sec-card boss/.test((require_view_map(), stage().innerHTML)), '');
  function require_view_map() { Q.view('map'); }

  // 先提交错误实现 → 阶段判定应为未通过, 并记录提交次数
  await Q.open('ch01-L15');
  elements.get('codein').value = bossLv.starter;
  await Q.submit();
  const v1 = elements.get('verdict').innerHTML || '';
  check('BOSS 首次失败显示阶段进度面板', /BOSS 阶段进度/.test(v1), v1.replace(/<[^>]+>/g, ' ').slice(0, 60));
  check('BOSS 第一次失败记入提交次数', Q.attemptsOf(bossLv) === 1, '次数=' + Q.attemptsOf(bossLv));

  // 再提交正确实现 → BOSS 击破
  elements.get('codein').value = bossLv.solution;
  await Q.submit();
  const v2 = elements.get('verdict').innerHTML || '';
  check('提交正确解 → BOSS 击破', /BOSS 击破/.test(v2), v2.replace(/<[^>]+>/g, ' ').slice(0, 70));
  check('BOSS 通关记录已保存', !!Q.save.boss['ch01-L15'], JSON.stringify(Q.save.boss['ch01-L15'] || {}));
  check('非首次即通过 → 连击归零', Q.save.streak.cur === 0, 'cur=' + Q.save.streak.cur + ' best=' + Q.save.streak.best);
  check('🔒 未解锁的 BOSS 不会显示可挑战', (() => { Q.view('map'); return /🔒 未解锁/.test(stage().innerHTML); })());
}

// ---------- 分层提示: 逐级揭示 ----------
{
  // 找一关有 ≥3 条提示的, 便于观察逐级行为
  let lv = null;
  for (const b of problems) { const l = b.levels.find(x => (x.hints || []).length >= 3); if (l) { lv = l; break; } }
  check('存在有 ≥3 条提示的关卡(供逐级揭示测试)', !!lv, lv ? lv.id + ' hints=' + lv.hints.length : '无');
  await Q.open(lv.id);
  const total = lv.hints.length;
  check(`打开关卡时未揭示任何提示(0/${total})`, Q.hintsSeen(lv) === 0, 'seen=' + Q.hintsSeen(lv));
  check('提示按钮显示进度', /💡 提示 \(0\/\d+\)/.test(elements.get('hintbtn').textContent || ''), elements.get('hintbtn').textContent);
  check('未揭示的提示显示为锁定', (elements.get('hintlist').innerHTML.match(/hint-tier locked/g) || []).length === total,
    '锁定数=' + (elements.get('hintlist').innerHTML.match(/hint-tier locked/g) || []).length);

  // 逐次点击, 每次只多揭示一条
  const seenSeq = [];
  for (let i = 1; i <= total; i++) {
    Q.showHint();
    seenSeq.push(Q.hintsSeen(lv));
    const shown = (elements.get('hintlist').innerHTML.match(/hint-tier t\d/g) || []).length;
    check(`第 ${i} 次点击揭示到 ${i} 条`, Q.hintsSeen(lv) === i && shown === i, `seen=${Q.hintsSeen(lv)} 已显示=${shown}`);
  }
  check('揭示序列严格递增', JSON.stringify(seenSeq) === JSON.stringify([...Array(total)].map((_, i) => i + 1)), seenSeq.join(','));
  check('全部揭示后写入存档', Q.save.hintsSeen[lv.id] === total, JSON.stringify(Q.save.hintsSeen[lv.id]));
  check('全部揭示后按钮变为已显示全部', /已显示全部提示/.test(elements.get('hintbtn').textContent || ''), elements.get('hintbtn').textContent);
  check('全部揭示后按钮被禁用', elements.get('hintbtn').disabled === true, 'disabled=' + elements.get('hintbtn').disabled);
  const before = Q.hintsSeen(lv);
  Q.showHint();   // 越界点击不应出错, 也不应超过总数
  check('已全部揭示后再点击不会越界', Q.hintsSeen(lv) === before, 'seen=' + Q.hintsSeen(lv));

  // 重新打开该关 → 已揭示的层级应当保留(持久化)
  await Q.open(lv.id);
  check('重新进入关卡保留已揭示层级', Q.hintsSeen(lv) === total, 'seen=' + Q.hintsSeen(lv));

  // 另一关仍应从 0 开始(计数按关独立)
  let other = null;
  for (const b of problems) { const l = b.levels.find(x => x.id !== lv.id && (x.hints || []).length >= 2); if (l) { other = l; break; } }
  await Q.open(other.id);
  check('提示计数按关卡独立', Q.hintsSeen(other) === 0, other.id + ' seen=' + Q.hintsSeen(other));

  // 战绩页显示累计查看提示数
  Q.view('bag');
  check('战绩页显示累计查看提示数', /查看提示/.test(stage().innerHTML) && new RegExp('>' + Q.totalHintsSeen() + '<').test(stage().innerHTML),
    'total=' + Q.totalHintsSeen());
  check('全库每关提示 ≥2 条', problems.flatMap(b => b.levels).every(l => (l.hints || []).length >= 2),
    '最少=' + Math.min(...problems.flatMap(b => b.levels).map(l => (l.hints || []).length)));
}


console.log(fail ? `\n❌ 前端冒烟测试失败 ${fail} 项` : '\n✅ 前端冒烟测试全部通过');
process.exit(fail ? 1 : 0);
