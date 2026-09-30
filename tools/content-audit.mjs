// 内容体检: 找出跨章同题(题干/解法指纹重复) 与 难度倒挂(章内复杂度与 order 不符)
import fs from 'fs'; import vm from 'vm';

const problems = [];
for (const f of fs.readdirSync('data/problems').filter(x => /^ch\d+\.js$/.test(x)).sort()) {
  const ctx = { window: { JQ_PROBLEMS: [] }, console };
  vm.runInNewContext(fs.readFileSync('data/problems/' + f, 'utf8'), ctx);
  const b = ctx.window.JQ_PROBLEMS[0];
  for (const p of b.levels) problems.push({ ch: b.ch, chTitle: b.title, ...p });
}
console.log(`题库: ${problems.length} 关\n`);

// ---------- 1. 解法指纹: 归一化后比对, 找"同一段代码" ----------
const norm = s => String(s)
  .replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, '').replace(/java\.util\./g, '')
  .replace(/public|private|static|final/g, '');
const solGroups = new Map();
for (const p of problems) {
  const k = norm(p.solution);
  if (!solGroups.has(k)) solGroups.set(k, []);
  solGroups.get(k).push(p.id);
}
console.log('=== 解法完全相同(逐字节归一化后一致) ===');
let dupSol = 0;
for (const [k, ids] of solGroups) {
  if (ids.length < 2) continue;
  dupSol++;
  const ps = ids.map(id => problems.find(p => p.id === id));
  console.log(`  ${ids.join(' = ')}`);
  console.log(`     题: ${ps.map(p => p.title).join(' / ')}`);
  console.log(`     签名: ${ps[0].entry.method || (ps[0].entry && ps[0].entry.className)}(${(ps[0].entry.params || []).join(',')}) mode=${ps[0].mode}`);
}
console.log(dupSol ? `共 ${dupSol} 组\n` : '无\n');

// ---------- 2. 接口签名重复(同一方法名+参数类型, 跨章) ----------
const sigGroups = new Map();
for (const p of problems) {
  const sig = p.mode === 'design'
    ? `${p.entry.className}|${(p.ops || []).length}`
    : `${p.entry.method}(${(p.entry.params || []).join(',')})->${p.entry.ret}`;
  if (!sigGroups.has(sig)) sigGroups.set(sig, []);
  sigGroups.get(sig).push(p);
}
console.log('=== 接口签名跨章重复 ===');
let dupSig = 0;
for (const [sig, ps] of sigGroups) {
  if (ps.length < 2) continue;
  const chs = new Set(ps.map(p => p.ch));
  if (chs.size < 2) continue;
  dupSig++;
  console.log(`  ${sig} → ${ps.map(p => p.id + ' ' + p.title).join(' | ')}`);
}
console.log(dupSig ? `共 ${dupSig} 组\n` : '无\n');

// ---------- 3. 难度倒挂: 用"参考实现规模 + 测试规模"做粗粒度复杂度代理 ----------
console.log('=== 章内规模分布(参考实现字符数), 用于发现 order 倒挂 ===');
for (let ch = 1; ch <= 14; ch++) {
  const ls = problems.filter(p => p.ch === ch).sort((a, b) => a.order - b.order);
  if (!ls.length) continue;
  const rows = ls.map(p => {
    const size = String(p.solution).replace(/\s+/g, '').length;
    return { order: p.order, size, id: p.id, title: p.title, mode: p.mode };
  });
  // 找明显倒挂: 后段(order>=10)比同章中段(order 7-9)还短的
  const late = rows.filter(r => r.order >= 10);
  const mid = rows.filter(r => r.order >= 7 && r.order <= 9);
  const midAvg = mid.reduce((a, r) => a + r.size, 0) / (mid.length || 1);
  const shortestLate = late.reduce((a, r) => (r.size < a.size ? r : a), late[0]);
  if (shortestLate.size < midAvg * 0.55) {
    console.log(`  ⚠️ ch${ch}: L${shortestLate.order} ${shortestLate.title} (${shortestLate.size} 字符) 明显短于中段均值 ${Math.round(midAvg)}`);
  }
}
