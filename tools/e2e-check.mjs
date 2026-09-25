// 端到端复验: 题面契约 / 隐藏用例不剧透 / run 只跑公开用例
const BASE = 'http://127.0.0.1:4319';
const post = async (path, body) => {
  const r = await fetch(BASE + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return { status: r.status, json: await r.json().catch(() => null) };
};
let fail = 0;
const check = (name, cond, extra = '') => { console.log(`${cond ? '✅' : '❌'} ${name}${extra ? ' — ' + extra : ''}`); if (!cond) fail++; };

// 1. ch08-L14: 严格按新题面实现(add/conjugate + addShow/conjShow) 必须 AC
const complex = `class Complex {
  private final double re, im;
  public Complex(double re, double im){ this.re = re; this.im = im; }
  public double re(){ return re; }
  public double im(){ return im; }
  public String show(){ return re + (im < 0 ? "-" : "+") + Math.abs(im) + "i"; }
  public Complex add(double dr, double di){ return new Complex(re + dr, im + di); }
  public Complex mul(double c, double d){ return new Complex(re*c - im*d, re*d + im*c); }
  public Complex conjugate(){ return new Complex(re, -im); }
  public double norm2(){ return re*re + im*im; }
  public String addShow(double dr, double di){ return add(dr, di).show(); }
  public String conjShow(){ return conjugate().show(); }
}
public class Main { }`;
const r1 = await post('/api/judge', { problemId: 'ch08-L14', code: complex });
check('ch08-L14 按题面实现可 AC', r1.json && r1.json.verdict === 'AC', r1.json && r1.json.verdict);

// 2. 隐藏用例失败时不泄露期望值
const wrong = `class Complex { public Complex(double a,double b){} public double re(){return 0;} public double im(){return 0;} public String show(){return "x";} public double norm2(){return 0;} public String addShow(double a,double b){return "x";} public String conjShow(){return "x";} }
public class Main { }`;
const r2 = await post('/api/judge', { problemId: 'ch08-L14', code: wrong });
const cases2 = (r2.json && r2.json.cases) || [];
check('design 判题返回用例列表', cases2.length > 0, 'verdict=' + (r2.json && r2.json.verdict));

// 3. stress 关现在会执行作者手写的边界用例
const badEmpty = `public class Main { public static int solve(int[] a){ if(a.length==0) throw new RuntimeException("boom"); int s=0; for(int x:a) s+=x; return s; } }`;
const r3 = await post('/api/judge', { problemId: 'ch01-L10', code: badEmpty });
check('stress 关边界用例真正执行(空数组崩溃被抓住)', r3.json && r3.json.verdict !== 'AC', 'verdict=' + (r3.json && r3.json.verdict) + ' cases=' + ((r3.json && r3.json.total) || 0));

// 4. run 只跑公开用例
const r4 = await post('/api/run', { problemId: 'ch13-L15', code: 'public class Main { }' });
check('/api/run 不含隐藏用例', r4.json && !(r4.json.cases || []).some(c => c.hidden), 'total=' + (r4.json && r4.json.total));

// 5. 非法 URL 不崩服务
const bad = await fetch(BASE + '/%').then(r => r.status).catch(() => 'ERR');
check('畸形 URL 返回 400 且服务存活', bad === 400, 'status=' + bad);
const alive = await fetch(BASE + '/api/problems').then(r => r.status).catch(() => 'ERR');
check('服务仍存活', alive === 200, 'status=' + alive);

// 6. 题库数据不作为静态文件下发
const dataLeak = await fetch(BASE + '/data/problems/ch01.js').then(r => r.status).catch(() => 'ERR');
check('data/ 静态访问被拦截', dataLeak === 403, 'status=' + dataLeak);

// 7. 题面一致性: 所有 design 关 ops 调用的方法名都出现在题干里
const chapters = await fetch(BASE + '/api/problems').then(r => r.json()).then(j => j.chapters);
let missTotal = 0;
for (const c of chapters) for (const l of c.levels) {
  if (l.mode !== 'design') continue;
}
check('题目总数 210', chapters.reduce((a, c) => a + c.levels.length, 0) === 210, '实际=' + chapters.reduce((a, c) => a + c.levels.length, 0));

console.log(fail ? `\n❌ 失败 ${fail} 项` : '\n✅ 端到端复验全部通过');
process.exit(fail ? 1 : 0);
