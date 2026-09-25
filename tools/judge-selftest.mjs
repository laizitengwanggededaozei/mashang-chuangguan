// 判题内核自测矩阵: node tools/judge-selftest.mjs
// 覆盖学习场景真正需要的能力: 判决分类 / 各模式 / 类型与编码 / 比较器 / 边界语义
import { judgeProblem, compare } from './judge-core.mjs';

const P = (o) => Object.assign({ mode: 'method', entry: { method: 'solve', params: [], ret: 'int' }, limits: { timeMs: 1200, memMb: 128 } }, o);
const STRESS = {
  iterations: 150, seed: 7,
  gen: "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(8); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(21)-10); } return new String[]{ b.toString() }; } }",
  ref: "public class Ref { public static int solve(int[] a){ int s=0; for(int x:a) s+=x; return s; } }"
};

const cases = [
  // ---------- 基础判决 ----------
  ['method-AC', P({ entry: { method: 'solve', params: ['int[]'], ret: 'int' }, tests: [{ name: 'a', args: ['1,2,3'], expect: '6' }, { name: 'b', args: ['-1,1'], expect: '0', hidden: true }] }),
    `public class Main { public static int solve(int[] a){ int s=0; for(int x:a) s+=x; return s; } }`, 'AC'],
  ['method-WA', P({ entry: { method: 'solve', params: ['int[]'], ret: 'int' }, tests: [{ name: 'a', args: ['1,2,3'], expect: '6' }] }),
    `public class Main { public static int solve(int[] a){ return 0; } }`, 'WA'],
  ['method-CE', P({ entry: { method: 'solve', params: ['int'], ret: 'int' }, tests: [{ name: 'a', args: ['1'], expect: '1' }] }),
    `public class Main { public static int solve(int n){ return n } }`, 'CE'],
  ['method-TLE', P({ entry: { method: 'solve', params: ['int'], ret: 'int' }, tests: [{ name: 'a', args: ['1'], expect: '1' }], limits: { timeMs: 800, memMb: 128 } }),
    `public class Main { public static int solve(int n){ long s=0; while(true) s++; } }`, 'TLE'],
  ['method-MLE', P({ entry: { method: 'solve', params: ['int'], ret: 'int' }, tests: [{ name: 'a', args: ['1'], expect: '1' }], limits: { timeMs: 3000, memMb: 48 } }),
    `public class Main { public static int solve(int n){ java.util.List<long[]> l=new java.util.ArrayList<>(); while(true) l.add(new long[1<<20]); } }`, 'MLE'],
  ['method-RE', P({ entry: { method: 'solve', params: ['int'], ret: 'int' }, tests: [{ name: 'a', args: ['1'], expect: '1' }] }),
    `public class Main { public static int solve(int n){ int[] a=new int[2]; return a[5]; } }`, 'RE'],

  // ---------- 调试打印与判定稳健性(学习场景常见: 学生边写边打印) ----------
  ['调试打印不影响判定', P({ entry: { method: 'solve', params: ['int[]'], ret: 'int' }, tests: [{ name: 'a', args: ['1,2,3'], expect: '6' }] }),
    `public class Main { public static int solve(int[] a){ System.out.println("debug line"); int s=0; for(int x:a) s+=x; return s; } }`, 'AC'],
  ['超大输出不误判为超时', P({ entry: { method: 'solve', params: ['int[]'], ret: 'int' }, tests: [{ name: 'a', args: ['1'], expect: '1' }] }),
    `public class Main { public static int solve(int[] a){ StringBuilder b=new StringBuilder(); for(int i=0;i<300000;i++) b.append("12345678901234567890\\n"); System.out.print(b); return 1; } }`, 'AC'],

  // ---------- design 模式 ----------
  ['H5 design带参构造+精确签名', P({
    mode: 'design', entry: { className: 'LRUCache' },
    ops: [['LRUCache', [2], ['int']], ['put', [1, 1], ['int', 'int']], ['get', [1], ['int']], ['put', [3, 3], ['int', 'int']], ['get', [2], ['int']]],
    expect: ['null', 'null', '1', 'null', '-1'], cmp: 'exact'
  }), `import java.util.*;
class LRUCache { private final int cap; private final LinkedHashMap<Integer,Integer> m;
  public LRUCache(int c){ cap=c; m=new LinkedHashMap<>(16,0.75f,true); }
  public int get(int k){ Integer v=m.get(k); return v==null?-1:v; }
  public void put(int k,int v){ if(m.containsKey(k)){ m.put(k,v); return; } if(m.size()>=cap){ Iterator<Integer> it=m.keySet().iterator(); it.next(); it.remove(); } m.put(k,v); } }
public class Main { }`, 'AC'],
  ['H4 design重载不再歧义(签名精确匹配)', P({
    mode: 'design', entry: { className: 'Box' },
    ops: [['Box', [], []], ['set', [5], ['int']], ['set', ['hi'], ['String']], ['get', [], []]],
    expect: ['null', 'null', 'null', '"hi"'], cmp: 'exact'
  }), `class Box { private Object v;
  public void set(int x){ v = "int:" + x; } public void set(String s){ v = s; }
  public String get(){ return String.valueOf(v); } }
public class Main { }`, 'AC'],

  // ---------- 类型覆盖 ----------
  ['List<String> 参数可用(B3)', P({ entry: { method: 'solve', params: ['List<String>'], ret: 'int' }, tests: [{ name: 'a', args: ['ab|cd|e'], expect: '3' }] }),
    `import java.util.*; public class Main { public static int solve(List<String> l){ return l.size(); } }`, 'AC'],
  ['String[] 参数可用(PStrs修复)', P({ entry: { method: 'solve', params: ['String[]'], ret: 'String' }, tests: [{ name: 'a', args: ['ab|cd'], expect: '"abcd"' }] }),
    `public class Main { public static String solve(String[] a){ return a[0]+a[1]; } }`, 'AC'],
  ['char 参数严格校验', P({ entry: { method: 'solve', params: ['char'], ret: 'String' }, tests: [{ name: 'a', args: ['a'], expect: '"a"' }] }),
    `public class Main { public static String solve(char c){ return String.valueOf(c); } }`, 'AC'],
  ['double 类型可用', P({ entry: { method: 'solve', params: ['double'], ret: 'double' }, tests: [{ name: 'a', args: ['3'], expect: '9.0', cmp: 'float' }] }),
    `public class Main { public static double solve(double x){ return x*x; } }`, 'AC'],

  // ---------- stress ----------
  ['stress-AC', P({ mode: 'stress', entry: { method: 'solve', params: ['int[]'], ret: 'int' }, limits: { timeMs: 4000, memMb: 256 }, stress: STRESS }),
    `public class Main { public static int solve(int[] a){ int s=0; for(int x:a) s+=x; return s; } }`, 'AC'],
  ['stress-WA(对拍抓错)', P({ mode: 'stress', entry: { method: 'solve', params: ['int[]'], ret: 'int' }, limits: { timeMs: 4000, memMb: 256 }, stress: STRESS }),
    `public class Main { public static int solve(int[] a){ int s=0; for(int x:a){ if(x>0) s+=x; } return s; } }`, 'WA'],
  ['stress-WA(随机输入抛异常)', P({ mode: 'stress', entry: { method: 'solve', params: ['int[]'], ret: 'int' }, limits: { timeMs: 4000, memMb: 256 }, stress: STRESS }),
    `public class Main { public static int solve(int[] a){ int s=0; for(int x:a){ s+=10/(x+5); } return s; } }`, 'WA'],

  // ---------- 比较器 ----------
  ['cmp-unordered 数组顺序无关', P({ entry: { method: 'solve', params: ['int'], ret: 'int[]' }, tests: [{ name: 'a', args: ['3'], expect: '[3,2,1]', cmp: 'unordered' }] }),
    `public class Main { public static int[] solve(int n){ return new int[]{1,2,3}; } }`, 'AC'],
  ['cmp-set 去重比较', P({ entry: { method: 'solve', params: ['int'], ret: 'int[]' }, tests: [{ name: 'a', args: ['3'], expect: '[1,1,2]', cmp: 'set' }] }),
    `public class Main { public static int[] solve(int n){ return new int[]{2,1}; } }`, 'AC'],
  ['cmp-float eps 生效', P({ entry: { method: 'solve', params: ['int'], ret: 'double' }, tests: [{ name: 'a', args: ['1'], expect: '0.3333333', cmp: { type: 'float', eps: 1e-6 } }] }),
    `public class Main { public static double solve(int n){ return 1.0/3.0; } }`, 'AC'],
];

let fail = 0;
for (const [name, problem, code, want] of cases) {
  const r = judgeProblem(problem, code);
  const ok = r.verdict === want;
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${name}: 期望 ${want} 实际 ${r.verdict} (${r.timeMs}ms)` +
    (ok ? '' : `\n   详情: ${JSON.stringify(r.cases?.[0] || r.message).slice(0, 400)}`));
}
// 比较器直测
const cmpTests = [
  [compare('[1,2]', '[2,1]', 'unordered'), true, 'unordered 数组'],
  [compare('[1,1,2]', '[1,2]', 'set'), true, 'set 去重'],
  [compare('[1,2]', '[2,1]', 'exact'), false, 'exact 严格'],
  [compare('0.3333333', '0.3333334', { type: 'float', eps: 1e-5 }), true, 'float eps'],
  [compare('abc', '0', 'float'), false, 'float 非数值不同'],
];
for (const [got, want, name] of cmpTests) {
  if (got !== want) { console.log(`❌ 比较器 ${name}`); fail++; } else console.log(`✅ 比较器 ${name}`);
}
console.log(fail ? `\n❌ 失败 ${fail}` : `\n✅ 判题内核自测全部通过 (${cases.length} 判决 + ${cmpTests.length} 比较器)`);
process.exit(fail ? 1 : 0);
