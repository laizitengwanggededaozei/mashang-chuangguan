// 题库验证器 v2: node tools/verify-problems.mjs data/problems/chNN.js
// 校验 schema → 编译 starter(应可编译) → 编译并跑 solution 全部用例 → 校验隐藏用例/递进顺序
import fs from 'fs'; import vm from 'vm';
import { judgeProblem } from './judge-core.mjs';

const file = process.argv[2];
if (!file) { console.error('用法: node tools/verify-problems.mjs data/problems/chNN.js'); process.exit(1); }
const src = fs.readFileSync(file, 'utf8');
const ctx = { window: { JQ_PROBLEMS: [] }, console };
try { vm.runInNewContext(src, ctx, { timeout: 8000 }); }
catch (e) { console.error('❌ 文件无法解析:', e.message); process.exit(1); }
const blob = (ctx.window.JQ_PROBLEMS || [])[0];
if (!blob) { console.error('❌ 未找到 JQ_PROBLEMS 数据'); process.exit(1); }

let fail = 0, stats = { method: 0, stress: 0, design: 0, stdin: 0 };
const levels = blob.levels || [];
console.log(`📘 ch${blob.ch} ${blob.title || ''} — ${levels.length} 关`);

if (levels.length < 15) { console.error(`❌ 关卡数 ${levels.length} < 15`); fail++; }
const orders = levels.map(l => l.order);
if (JSON.stringify(orders) !== JSON.stringify([...Array(levels.length)].map((_, i) => i + 1))) {
  console.error(`❌ order 必须为 1..N 连续递进, 实际: ${orders.join(',')}`); fail++;
}
const ids = new Set();
const seenTitles = new Map();   // 标题 -> 关卡 id
const seenFp = new Map();       // 解法指纹 -> 关卡 id

for (const p of levels) {
  const tag = `[L${p.order} ${p.id || '?'}]`;
  const err = [];
  if (!p.id || !/^ch\d{2}-L\d{2}$/.test(p.id)) err.push('id 非法(应为 chNN-LNN)');
  if (ids.has(p.id)) err.push('id 重复'); ids.add(p.id);
  if (!p.title || p.title.length < 2) err.push('缺 title');
  if (!p.stage) err.push('缺 stage');
  if (!p.q || p.q.length < 20) err.push('题干过短(<20字)');
  if (p.t) err.push('存在问答题字段 t(禁止选择题)');
  if (!['method', 'design', 'stress', 'stdin'].includes(p.mode)) err.push('mode 非法');
  if (!p.starter || !p.starter.includes('class Main')) err.push('starter 缺 public class Main');
  if (!p.solution || !p.solution.includes('class Main')) err.push('solution 缺 class Main');
  if (!Array.isArray(p.tags) || !p.tags.length) err.push('缺 tags');
  if (!Array.isArray(p.hints)) err.push('缺 hints');
  else if (p.hints.length < 2) err.push(`hints 只有 ${p.hints.length} 条, 分层提示要求每关 ≥2 条(第1条给方向, 靠后的才是关键做法)`);
  else {
    for (const h of p.hints) if (typeof h !== 'string' || !h.trim()) err.push('hints 存在空条目');
    // 第 1 条不应是可直接照抄的做法 —— 仅告警, 不判失败(语言陷阱类提示含运算符是合理的)
    if (/[;]|<=|>=|&&|\|\||>>>|>>|<<|\.equals\(|\.length\(\)/.test(p.hints[0])) {
      console.log(`   ⚠️  ${tag} 第 1 条提示含代码特征, 建议把"做法"后移`);
    }
  }

  if (p.mode === 'design') {
    if (!p.entry || !p.entry.className) err.push('design 缺 entry.className');
    if (!Array.isArray(p.ops) || !p.ops.length) err.push('design 缺 ops');
    if (!Array.isArray(p.expect) || p.expect.length !== (p.ops || []).length) err.push('expect 长度须等于 ops');
    // 门禁1: design 的 tests 不会被执行, 不得用它冒充公开样例
    if ((p.tests || []).length) err.push('design 的 tests 不会被执行(判题只用 ops/opSets), 请删除或改用 opSets');
    // 门禁2: 判题会调用的每个方法名必须在题干里出现, 否则学生无从得知接口
    const opNames = new Set();
    for (const set of (p.opSets && p.opSets.length ? p.opSets : [{ ops: p.ops || [] }])) {
      for (const o of (set.ops || [])) if (o && o[0]) opNames.add(o[0]);
    }
    opNames.delete(p.entry.className);
    const missing = [...opNames].filter(n => !String(p.q).includes(n));
    if (missing.length) err.push(`题干未说明这些被调用的方法: ${missing.join(', ')}`);    // 门禁3: 只有 BOSS(L15) 需要"公开序列 + 隐藏边界序列"的多阶段结构; L13/L14 单序列即可
    if (p.order === 15) {
      if (!Array.isArray(p.opSets) || !p.opSets.length) err.push('BOSS 缺 opSets(需要"公开序列 + 隐藏边界序列"两阶段)');
      else if (!p.opSets.some(s => s.hidden)) err.push('BOSS 缺 hidden 边界序列(opSets 中没有 hidden:true)');
      else if (!p.opSets.some(s => !s.hidden)) err.push('BOSS 缺公开序列');
    }
    for (const s of (p.opSets || [])) {
      if ((s.ops || []).length !== (s.expect || []).length) err.push(`opSets「${s.name || '?'}」ops 与 expect 长度不一致`);
    }
  } else if (p.mode === 'stress') {
    if (!p.stress || !p.stress.gen || !p.stress.ref) err.push('stress 缺 gen/ref');
    if (!p.stress || (p.stress.iterations || 0) < 100) err.push('stress.iterations < 100');
    if (!p.entry || !p.entry.method) err.push('stress 缺 entry.method');
  } else {
    if (!p.entry || !p.entry.method) err.push('method 模式缺 entry.method');
    if (!Array.isArray(p.entry.params)) err.push('缺 entry.params');
    if (!p.entry.ret) err.push('缺 entry.ret');
  }
  const tests = p.tests || [];
  if (p.mode !== 'design') {
    if (tests.length < 3) err.push(`用例数 ${tests.length} < 3`);
    if (!tests.some(t => t.hidden)) err.push('缺隐藏用例(hidden:true)');
    for (const t of tests) {
      if (t.expect === undefined) err.push('用例缺 expect');
      if (p.mode === 'method' && !Array.isArray(t.args)) err.push(`用例 ${t.name} 缺 args 数组`);
    }
  }

  if (err.length) { console.error(`❌ ${tag} schema: ${err.join('; ')}`); fail++; continue; }

  // 门禁4: 与同章其他关卡不得同题(标题/入口签名/解法指纹)
  const fp = String(p.solution).replace(/\/\/[^\n]*/g, '').replace(/\s+/g, '');
  if (seenTitles.has(p.title)) err.push(`标题与本章 ${seenTitles.get(p.title)} 重复`);
  seenTitles.set(p.title, p.id);
  if (seenFp.has(fp)) err.push(`解法与本章 ${seenFp.get(fp)} 完全相同(疑似同题)`);
  seenFp.set(fp, p.id);

  // starter 应可编译
  const rs = judgeProblem(p, p.starter);
  if (rs.verdict === 'CE') { console.error(`❌ ${tag} starter 无法编译: ${String(rs.message).slice(0, 200)}`); fail++; }

  // solution 必须 AC
  const r = judgeProblem(p, p.solution);
  stats[p.mode]++;
  if (r.verdict !== 'AC') {
    const bad = (r.cases || []).filter(c => c.verdict !== 'AC').slice(0, 2)
      .map(c => `${c.name}:${c.verdict} 期望${JSON.stringify(c.expect)} 得到${JSON.stringify(c.got)}`).join(' | ');
    console.error(`❌ ${tag} ${p.title} solution 未通过: ${r.verdict} ${r.compile === false ? String(r.message).slice(0, 200) : bad}`);
    fail++;
  } else {
    console.log(`   ✅ L${p.order} [${p.mode}] ${p.title} (${r.total}用例 ${r.timeMs}ms)`);
  }
}
console.log(`\n${fail ? '❌ 问题数:' + fail : '✅ 全部通过'} | 模式分布: method=${stats.method} stress=${stats.stress} design=${stats.design} stdin=${stats.stdin}`);
process.exit(fail ? 1 : 0);
