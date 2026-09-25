// ============================================================================
// JavaQuest 评测内核 v2.2  (清晰版)
//   设计目标: 判得准、讲得清 —— 这是一个编程学习游戏, 不是安全竞赛。
//   能力:
//     · 四种模式: method(反射调用函数) / design(操作序列, 面向对象设计) /
//                 stress(随机对拍) / stdin(标准输入输出)
//     · 每用例独立 JVM, 判决 CE / TLE / MLE / RE / WA / AC
//     · 隐藏用例: 只回传判决, 不回传期望值(避免剧透)
//     · 调试打印不影响判定(用户 stdout 丢弃, 结果走独立结果文件)
//     · 比较器: exact / tokens / float(可配 eps) / unordered / set / lines
//   代码在本地机器上运行, 信任使用者; 未做沙箱隔离(学习用途无需)。
// ============================================================================
import { spawnSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';

// ----------------------------- Java 助手源码 --------------------------------
const JAVA_HELPERS = `
  static int[] PInts(String s){ if(s.length()==0) return new int[0]; String[] p=s.split(String.valueOf((char)44)); int[] r=new int[p.length]; for(int i=0;i<p.length;i++) r[i]=Integer.parseInt(p[i].trim()); return r; }
  static long[] PLongs(String s){ if(s.length()==0) return new long[0]; String[] p=s.split(String.valueOf((char)44)); long[] r=new long[p.length]; for(int i=0;i<p.length;i++) r[i]=Long.parseLong(p[i].trim()); return r; }
  static double[] PDoubles(String s){ if(s.length()==0) return new double[0]; String[] p=s.split(String.valueOf((char)44)); double[] r=new double[p.length]; for(int i=0;i<p.length;i++) r[i]=Double.parseDouble(p[i].trim()); return r; }
  static boolean[] PBools(String s){ if(s.length()==0) return new boolean[0]; String[] p=s.split(String.valueOf((char)44)); boolean[] r=new boolean[p.length]; for(int i=0;i<p.length;i++){ String q=p[i].trim(); if(!q.equals("true") && !q.equals("false")) throw new RuntimeException("boolean 参数必须是 true/false, 收到: "+q); r[i]=Boolean.parseBoolean(q);} return r; }
  static char[] PChars(String s){ return s.toCharArray(); }
  static String[] PStrs(String s){ if(s.length()==0) return new String[0]; java.util.List<String> out=new java.util.ArrayList<String>(); StringBuilder cur=new StringBuilder(); for(int i=0;i<s.length();i++){ char c=s.charAt(i); if(c==(char)124){ out.add(cur.toString()); cur.setLength(0); } else cur.append(c); } out.add(cur.toString()); return out.toArray(new String[0]); }
  static int[][] PInts2(String s){ if(s.length()==0) return new int[0][]; String[] rows=s.split(String.valueOf((char)59)); int[][] r=new int[rows.length][]; for(int i=0;i<rows.length;i++) r[i]=PInts(rows[i]); return r; }
  static String[][] PStrs2(String s){ if(s.length()==0) return new String[0][]; String[] rows=s.split(String.valueOf((char)59), -1); String[][] r=new String[rows.length][]; for(int i=0;i<rows.length;i++) r[i]=PStrs(rows[i]); return r; }
  static String baseName(String t){ int i=t.indexOf('<'); return i<0 ? t : t.substring(0,i); }
  static String elemName(String t){ int i=t.indexOf('<'); if(i<0) return "String"; return t.substring(i+1, t.lastIndexOf('>')).trim(); }
  static Object parseElem(String t, String v){
    String b=baseName(t);
    if(b.equals("int")||b.equals("Integer")) return Integer.valueOf(Integer.parseInt(v.trim()));
    if(b.equals("long")||b.equals("Long")) return Long.valueOf(Long.parseLong(v.trim()));
    if(b.equals("double")||b.equals("Double")) return Double.valueOf(Double.parseDouble(v.trim()));
    if(b.equals("boolean")||b.equals("Boolean")){ String q=v.trim(); if(!q.equals("true")&&!q.equals("false")) throw new RuntimeException("boolean 元素必须是 true/false: "+q); return Boolean.valueOf(q); }
    if(b.equals("char")||b.equals("Character")) { if(v.length()!=1) throw new RuntimeException("char 参数长度必须为 1, 收到: "+v); return Character.valueOf(v.charAt(0)); }
    return v;
  }
  static Object parseOne(Class<?> c, String s){
    if(c==int.class) return Integer.valueOf(Integer.parseInt(s.trim()));
    if(c==long.class) return Long.valueOf(Long.parseLong(s.trim()));
    if(c==double.class) return Double.valueOf(Double.parseDouble(s.trim()));
    if(c==boolean.class){ String q=s.trim(); if(!q.equals("true")&&!q.equals("false")) throw new RuntimeException("boolean 参数必须是 true/false, 收到: "+q); return Boolean.valueOf(q); }
    if(c==char.class){ if(s.length()!=1) throw new RuntimeException("char 参数长度必须为 1, 收到: "+s); return Character.valueOf(s.charAt(0)); }
    if(c==String.class) return s;
    if(c==int[].class) return PInts(s);
    if(c==long[].class) return PLongs(s);
    if(c==double[].class) return PDoubles(s);
    if(c==boolean[].class) return PBools(s);
    if(c==char[].class) return PChars(s);
    if(c==String[].class) return PStrs(s);
    if(c==int[][].class) return PInts2(s);
    if(c==String[][].class) return PStrs2(s);
    if(c==java.util.List.class) return new java.util.ArrayList<String>(java.util.Arrays.asList(PStrs(s)));
    throw new RuntimeException("unsupported param type: " + c.getName());
  }
  static Object parseAuto(String s){
    String q=s.trim();
    if(q.equals("true")||q.equals("false")) return Boolean.valueOf(q);
    if(q.matches("[+-]?\\\\d+")) { long v=Long.parseLong(q); if(v>=Integer.MIN_VALUE && v<=Integer.MAX_VALUE) return Integer.valueOf((int)v); return Long.valueOf(v); }
    if(q.matches("[+-]?(\\\\d+\\\\.\\\\d*|\\\\.\\\\d+)([eE][+-]?\\\\d+)?")) return Double.valueOf(q);
    return s;
  }
  static Object parseTyped(String decl, String s){
    String b=baseName(decl);
    if(b.equals("Auto")) return parseAuto(s);
    if(b.equals("Map") || b.equals("HashMap") || b.equals("LinkedHashMap")){
      java.util.Map<String,String> m=new java.util.LinkedHashMap<String,String>();
      if(s.length()>0) for(String kv : PStrs(s)){ int e=kv.indexOf('='); if(e<0) m.put(kv,""); else m.put(kv.substring(0,e), kv.substring(e+1)); }
      return m;
    }
    if(b.equals("List") || b.equals("ArrayList")){
      java.util.List<Object> out=new java.util.ArrayList<Object>();
      String e=elemName(decl);
      if(s.length()>0) for(String p : PStrs(s)) out.add(parseElem(e, p));
      return out;
    }
    return parseOne(typeOf(decl), s);
  }
  static Object[] parseAllTyped(String[] decls, String[] t){
    Object[] a=new Object[decls.length];
    for(int i=0;i<decls.length;i++) a[i]=parseTyped(decls[i], i<t.length ? t[i] : "");
    return a;
  }
  static java.lang.reflect.Method findMethod(Class<?> c, String name, int argc){
    for(java.lang.reflect.Method m : c.getMethods()) if(m.getName().equals(name) && m.getParameterCount()==argc) return m;
    for(java.lang.reflect.Method m : c.getDeclaredMethods()) if(m.getName().equals(name) && m.getParameterCount()==argc) return m;
    throw new RuntimeException("no method " + name + " with " + argc + " params");
  }
  static java.lang.reflect.Method findMethodTyped(Class<?> c, String name, String[] decls){
    boolean anyAuto = false;
    for(String d : decls) if(d==null || baseName(d).equals("Auto")) anyAuto = true;
    if(!anyAuto){
      Class<?>[] want=new Class<?>[decls.length];
      for(int i=0;i<decls.length;i++) want[i]=typeOf(baseName(decls[i]));
      try { java.lang.reflect.Method m=c.getMethod(name, want); m.setAccessible(true); return m; } catch(NoSuchMethodException e){ }
      try { java.lang.reflect.Method m=c.getDeclaredMethod(name, want); m.setAccessible(true); return m; } catch(NoSuchMethodException e){ }
    }
    // Auto/歧义: 若某方法"唯一"同参数个数则直接用; 否则报错要求声明类型
    java.util.LinkedHashMap<String,java.lang.reflect.Method> uniq = new java.util.LinkedHashMap<String,java.lang.reflect.Method>();
    for(java.lang.reflect.Method m : c.getMethods()) if(m.getName().equals(name) && m.getParameterCount()==decls.length){ m.setAccessible(true); uniq.put(java.util.Arrays.toString(m.getParameterTypes()), m); }
    for(java.lang.reflect.Method m : c.getDeclaredMethods()) if(m.getName().equals(name) && m.getParameterCount()==decls.length){ m.setAccessible(true); uniq.put(java.util.Arrays.toString(m.getParameterTypes()), m); }
    if(uniq.size()==1) return uniq.values().iterator().next();
    if(uniq.isEmpty()) throw new RuntimeException("找不到方法: " + name + " (参数个数 " + decls.length + ")");
    throw new RuntimeException("方法签名歧义: " + name + "(" + java.util.Arrays.toString(decls) + "), 候选 " + uniq.size() + " 个, 请在题面 ops 中给出精确类型");
  }
  // 用方法的真实签名解析参数(配合 Auto)
  static Object[] parseFor(java.lang.reflect.Method m, String[] toks, String[] decls){
    Class<?>[] pt = m.getParameterTypes();
    Object[] a = new Object[pt.length];
    for(int i=0;i<pt.length;i++){
      String d = (decls!=null && i<decls.length && decls[i]!=null && !baseName(decls[i]).equals("Auto")) ? decls[i] : null;
      a[i] = d != null ? parseTyped(d, i<toks.length?toks[i]:"") : parseOne(pt[i], i<toks.length?toks[i]:"");
    }
    return a;
  }
  static Object[] parseForCtor(java.lang.reflect.Constructor<?> k, String[] toks, String[] decls){
    Class<?>[] pt = k.getParameterTypes();
    Object[] a = new Object[pt.length];
    for(int i=0;i<pt.length;i++){
      String d = (decls!=null && i<decls.length && decls[i]!=null && !baseName(decls[i]).equals("Auto")) ? decls[i] : null;
      a[i] = d != null ? parseTyped(d, i<toks.length?toks[i]:"") : parseOne(pt[i], i<toks.length?toks[i]:"");
    }
    return a;
  }
  static java.lang.reflect.Constructor<?> findCtor(Class<?> c, int argc){
    for(java.lang.reflect.Constructor<?> k : c.getDeclaredConstructors()) if(k.getParameterCount()==argc){ k.setAccessible(true); return k; }
    throw new RuntimeException("no constructor with " + argc + " params");
  }
  static Object newInstanceRaw(java.lang.reflect.Constructor<?> k, Object[] args) throws Exception {
    k.setAccessible(true);
    return k.newInstance(args);
  }
  static Object newInstanceTyped(java.lang.reflect.Constructor<?> k, String[] decls, String[] a) throws Exception {
    k.setAccessible(true);
    return k.newInstance(parseAllTyped(decls, a));
  }
  static Class<?> typeOf(String t){
    String b=baseName(t);
    if(b.equals("int")) return int.class;
    if(b.equals("long")) return long.class;
    if(b.equals("double")) return double.class;
    if(b.equals("boolean")) return boolean.class;
    if(b.equals("char")) return char.class;
    if(b.equals("String")) return String.class;
    if(b.equals("int[]")) return int[].class;
    if(b.equals("long[]")) return long[].class;
    if(b.equals("double[]")) return double[].class;
    if(b.equals("boolean[]")) return boolean[].class;
    if(b.equals("char[]")) return char[].class;
    if(b.equals("String[]")) return String[].class;
    if(b.equals("int[][]")) return int[][].class;
    if(b.equals("int[][]")) return int[][].class;
    if(b.equals("long[][]")) return long[][].class;
    if(b.equals("double[][]")) return double[][].class;
    if(b.equals("String[][]")) return String[][].class;
    if(b.equals("List")||b.equals("ArrayList")) return java.util.List.class;
    if(b.equals("Map")||b.equals("HashMap")||b.equals("LinkedHashMap")) return java.util.Map.class;
    if(b.equals("Object")||b.equals("Auto")) return Object.class;
    throw new RuntimeException("unsupported declared type: " + t);
  }
  static Class<?>[] typesOf(String[] ts){ Class<?>[] r=new Class<?>[ts.length]; for(int i=0;i<ts.length;i++) r[i]=typeOf(ts[i]); return r; }
`;

const JAVA_SER = `
class Ser {
  static String ser(Object o){
    if(o==null) return "null";
    Class<?> c=o.getClass();
    if(c.isArray()){
      int n=java.lang.reflect.Array.getLength(o);
      StringBuilder b=new StringBuilder("[");
      for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(ser(java.lang.reflect.Array.get(o,i))); }
      return b.append("]").toString();
    }
    if(o instanceof java.util.Collection){
      StringBuilder b=new StringBuilder("["); boolean first=true;
      for(Object x : (java.util.Collection<?>)o){ if(!first) b.append((char)44); first=false; b.append(ser(x)); }
      return b.append("]").toString();
    }
    if(o instanceof java.util.Map){
      StringBuilder b=new StringBuilder("{"); boolean first=true;
      for(java.util.Map.Entry<?,?> e : ((java.util.Map<?,?>)o).entrySet()){ if(!first) b.append((char)44); first=false; b.append(ser(e.getKey())).append((char)58).append(ser(e.getValue())); }
      return b.append("}").toString();
    }
    if(o instanceof String) return q((String)o);
    if(o instanceof Character) return String.valueOf((char)39) + esc(String.valueOf(o)) + String.valueOf((char)39);
    if(o instanceof Double || o instanceof Float){
      double d=((Number)o).doubleValue();
      if(Double.isNaN(d)) return "NaN";
      if(Double.isInfinite(d)) return d>0?"Infinity":"-Infinity";
      if(d==Math.rint(d) && Math.abs(d)<1e15) return String.valueOf((long)d)+".0";
      return String.valueOf(d);
    }
    if(o instanceof Number || o instanceof Boolean) return o.toString();
    return q(String.valueOf(o));
  }
  static String q(String s){ return String.valueOf((char)34) + esc(s) + String.valueOf((char)34); }
  static String esc(String s){
    StringBuilder b=new StringBuilder();
    for(int i=0;i<s.length();i++){
      int ch=s.charAt(i);
      if(ch==92) b.append((char)92).append((char)92);
      else if(ch==34) b.append((char)92).append((char)34);
      else if(ch==10) b.append((char)92).append('n');
      else if(ch==13) b.append((char)92).append('r');
      else if(ch==9) b.append((char)92).append('t');
      else b.append((char)ch);
    }
    return b.toString();
  }
}
`;

function javaStr(s) {
  let out = '';
  for (const ch of String(s)) {
    const c = ch.codePointAt(0);
    if (ch === '"') out += '\\"';
    else if (ch === '\\') out += '\\\\';
    else if (c === 10) out += '\\n';
    else if (c === 13) out += '\\r';
    else if (c === 9) out += '\\t';
    else if (c > 126) out += '\\u' + c.toString(16).padStart(4, '0');
    else out += ch;
  }
  return '"' + out + '"';
}

// --------------------------- harness 代码生成 -------------------------------
function buildHarness(problem) {
  const timeMs = (problem.limits && problem.limits.timeMs) || 3000;
  const mode = problem.mode || 'method';
  let body;
  if (mode === 'method') {
    const params = (problem.entry && problem.entry.params) || [];
    body = `
    java.lang.reflect.Method m = findMethodTyped(Main.class, ${javaStr(problem.entry.method || 'solve')}, new String[]{ ${params.map(javaStr).join(', ')} });
    Object[] a = parseAllTyped(new String[]{ ${params.map(javaStr).join(', ')} }, t);
    return m.invoke(null, a);`;
  } else if (mode === 'design') {
    body = `
    int setId = Integer.parseInt(t[0]);
    int n = Integer.parseInt(t[1]);
    int p = 2;
    Object obj = null;
    java.util.List<String> outs = new java.util.ArrayList<String>();
    for(int i=0;i<n;i++){
      String op = t[p++];
      int ac = Integer.parseInt(t[p++]);
      String[] a = new String[ac];
      for(int j=0;j<ac;j++) a[j] = t[p++];
      String[] decls = new String[ac];
      for(int j=0;j<ac;j++) decls[j] = (setId<OPDECLS.length && i<OPDECLS[setId].length && j<OPDECLS[setId][i].length) ? OPDECLS[setId][i][j] : "Auto";      if(obj == null){
        Class<?> kc = Class.forName(${javaStr((problem.entry && problem.entry.className) || 'Main')});
        java.lang.reflect.Constructor<?> ctor = findCtor(kc, ac);
        Object[] cargs = parseForCtor(ctor, a, decls);
        obj = newInstanceRaw(ctor, cargs);
        outs.add("null");
        continue;
      }
      java.lang.reflect.Method m = findMethodTyped(obj.getClass(), op, decls);
      Object r = m.invoke(obj, parseFor(m, a, decls));
      outs.add(Ser.ser(r));
    }
    return new Raw(String.join(String.valueOf((char)10), outs));`;
  } else if (mode === 'stress') {
    const params = (problem.entry && problem.entry.params) || [];
    const P = `new String[]{ ${params.map(javaStr).join(', ')} }`;
    body = `
    java.lang.reflect.Method mm = findMethodTyped(Main.class, ${javaStr(problem.entry.method || 'solve')}, ${P});
    // idx>0: 跑作者手写的固定用例(边界/极端输入), 让隐藏用例真正生效
    if(idx > 0){
      Object[] fa = parseAllTyped(${P}, t);
      return mm.invoke(null, fa);
    }
    int n = ${problem.stress.iterations || 200};
    java.util.Random rnd = new java.util.Random(${(problem.stress.seed || 20260101)}L);
    java.lang.reflect.Method mr = findMethodTyped(Ref.class, ${javaStr(problem.entry.method || 'solve')}, ${P});
    for(int i=0;i<n;i++){
      String[] a = Gen.gen(rnd);
      String[] b = new String[a.length];
      System.arraycopy(a,0,b,0,a.length);
      Object exp = mr.invoke(null, parseAllTyped(${P}, b));
      Object got;
      try { got = mm.invoke(null, parseAllTyped(${P}, a)); }
      catch(java.lang.reflect.InvocationTargetException e){
        throw new RuntimeException("你的实现在随机输入上抛异常: 输入=[" + String.join("|", a) + "] " + e.getCause());
      }
      String se = Ser.ser(exp), sg = Ser.ser(got);
      if(!se.equals(sg)){
        throw new RuntimeException("随机对拍不一致 输入=[" + String.join("|", a) + "] 期望=" + se + " 实际=" + sg);
      }
    }
    return new Raw("STRESS_OK:" + n);`;
  } else {
    // stdin 模式: 调用用户 Main.main, 捕获其 stdout(与判决控制通道隔离)
    body = `
    final java.io.ByteArrayOutputStream cap = new java.io.ByteArrayOutputStream();
    java.io.PrintStream old = System.out;
    System.setOut(new java.io.PrintStream(cap, true, "UTF-8"));
    try { Main.main(new String[0]); } finally { System.out.flush(); System.setOut(old); }
    return new Raw(new String(cap.toByteArray(), "UTF-8"));`;
  }

  const designSets = mode === 'design'
    ? (problem.opSets && problem.opSets.length ? problem.opSets : [{ ops: problem.ops || [] }])
    : [];
  const opDecls = mode === 'design'
    ? '  static final String[][][] OPDECLS = new String[][][]{ ' +
      designSets.map(s => '{' + (s.ops || []).map(o => {
        const ty = Array.isArray(o) ? (o[2] || []) : (o.types || []);
        return '{' + ty.map(javaStr).join(',') + '}';
      }).join(', ') + '}').join(', ') + ' };\n'
    : '  static final String[][][] OPDECLS = new String[][][]{};\n';

  return `import java.util.*;
import java.lang.reflect.*;

public class Harness {
  static final long LIMIT = ${timeMs}L;
  static final boolean DESIGN = ${mode === 'design'};
  static String RESULT_PATH;
  static class Raw { String s; Raw(String s){ this.s = s; } }
${opDecls}
  public static void main(String[] argv) throws Exception {
    RESULT_PATH = System.getProperty("jq.result");
    if(RESULT_PATH == null) { System.err.println("harness: missing jq.result"); System.exit(90); }
    // 用户 stdout 丢弃, 判决结果写入结果文件(避免调试打印污染判定)
    java.io.PrintStream sink = new java.io.PrintStream(new java.io.OutputStream(){
      public void write(int b) { }
      public void write(byte[] b, int off, int len) { }
    });
    System.setOut(sink); System.setErr(sink);
    Thread w = new Thread(new Runnable(){ public void run(){ try { Thread.sleep(LIMIT); } catch(Throwable e){} writeResult(RESULT_PATH, "TLE"); Runtime.getRuntime().halt(124); } });
    w.start();
    int idx = Integer.parseInt(argv[0]);
    String[] t = DESIGN ? argv : Arrays.copyOfRange(argv, 1, argv.length);
    String payload;
    try {
      Object out = run(idx, t);
      payload = "OK\\n" + ((out instanceof Raw) ? ((Raw)out).s : Ser.ser(out));
    } catch (Throwable e) {
      java.io.StringWriter sw = new java.io.StringWriter();
      e.printStackTrace(new java.io.PrintWriter(sw));
      payload = "ERR\\n" + sw.toString();
    }
    writeResult(RESULT_PATH, payload);
    Runtime.getRuntime().halt(0);
  }
  static void writeResult(String p, String content){
    try { java.nio.file.Files.write(java.nio.file.Paths.get(p), content.getBytes("UTF-8")); } catch (Throwable t) { }
  }
  static Object run(int idx, String[] t) throws Exception {
    ${body}
  }
${JAVA_HELPERS}
}
${JAVA_SER}
`;
}


// ------------------------------- 比较器 -------------------------------------
function toks(s) { return String(s).trim().split(/\s+/).filter(x => x.length); }
// 数组/集合答案: [1,2] 与 [2,1] 的"元素级"切分
function elems(s) {
  const t = String(s).trim();
  if (t.startsWith('[') && t.endsWith(']')) return t.slice(1, -1).split(',').map(x => x.trim());
  return toks(t);
}
const NUM_RE = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/;
function numEq(a, b, eps) {
  if (!NUM_RE.test(String(a).trim()) || !NUM_RE.test(String(b).trim())) return String(a) === String(b);
  const x = Number(a), y = Number(b);
  if (Number.isNaN(x) || Number.isNaN(y)) return false;
  const diff = Math.abs(x - y);
  return diff <= eps * Math.max(1, Math.abs(y)) || diff <= eps;
}
export function compare(got, expect, cmp) {
  const g = String(got ?? '').replace(/\r\n/g, '\n').replace(/\s+$/, '');
  const e = String(expect ?? '').replace(/\r\n/g, '\n').replace(/\s+$/, '');
  const type = (cmp && typeof cmp === 'object') ? cmp.type : (cmp || 'exact');
  const eps = (cmp && typeof cmp === 'object' && cmp.eps) ? cmp.eps : 1e-6;
  // 兼容层: 判题器对 String 结果加双引号并转义制表/换行; 题面可能写成裸串或真实字符。
  // 学习场景下这两种写法应视为同一个答案(表示宽松, 逻辑严格)。
  const unesc = s => s.replace(/\\t/g, '\t').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\\\/g, '\\').replace(/\\"/g, '"');
  const unq = s => {
    const t = s.trim();
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return unesc(t.slice(1, -1));
    return null;
  };
  const gu = unq(g), eu = unq(e);
  switch (type) {
    case 'tokens': return toks(g).join(' ') === toks(e).join(' ') || (gu !== null && eu !== null && toks(gu).join(' ') === toks(eu).join(' '));
    case 'float': {
      const gt = toks(g), et = toks(e);
      if (gt.length !== et.length) return false;
      return gt.every((x, i) => numEq(x, et[i], eps));
    }
    case 'unordered': {
      const ge = elems(g), ee = elems(e);
      if (ge.length !== ee.length) return false;
      if (JSON.stringify(ge.map(x => x.trim()).sort()) === JSON.stringify(ee.map(x => x.trim()).sort())) return true;
      // 逐元素忽略引号差异
      const norm = a => a.map(x => { const u = unq(x); return (u === null ? x : u).trim(); }).sort();
      return JSON.stringify(norm(ge)) === JSON.stringify(norm(ee));
    }
    case 'set': {
      const norm = a => [...new Set(a.map(x => { const u = unq(x); return (u === null ? x : u).trim(); }))].sort();
      return JSON.stringify(norm(elems(g))) === JSON.stringify(norm(elems(e)));
    }
    case 'lines': {
      const gl = g.split('\n').map(x => x.replace(/\s+$/, '')), el = e.split('\n').map(x => x.replace(/\s+$/, ''));
      if (JSON.stringify(gl) === JSON.stringify(el)) return true;
      const nrm = a => a.map(x => { const u = unq(x); return (u === null ? x : u).replace(/\s+$/, ''); });
      return JSON.stringify(nrm(gl)) === JSON.stringify(nrm(el));
    }
    default:
      if (g === e) return true;
      if (gu !== null && eu !== null && gu === eu) return true;
      if (gu !== null && gu === e) return true;
      if (eu !== null && eu === g) return true;
      return false;
  }
}

// ------------------------------- 执行器 -------------------------------------
function runJvm(dir, args, resultPath, { stdin = '', timeMs = 3000, memMb = 256, stackKb = 16384 } = {}) {
  const t0 = Date.now();
  const r = spawnSync('java', [
    '-Dfile.encoding=UTF-8', '-Dstdout.encoding=UTF-8', '-Dstderr.encoding=UTF-8',
    '-Djq.result=' + resultPath,
    '-Xmx' + memMb + 'm', '-Xss' + stackKb + 'k', '-XX:+UseSerialGC', '-cp', dir, 'Harness', ...args
  ], { cwd: dir, input: stdin, timeout: timeMs + 3000, maxBuffer: 1024 * 1024, env: { ...process.env, JAVA_TOOL_OPTIONS: '-Duser.language=en -Duser.country=US' } });
  const wall = Date.now() - t0;
  return {
    stdout: r.stdout ? r.stdout.toString('utf8') : '',
    stderr: r.stderr ? r.stderr.toString('utf8') : '',
    exit: r.status === null ? -1 : r.status,
    killed: !!r.signal,
    timeMs: wall,
    error: r.error ? (r.error.code || String(r.error.message)) : null
  };
}

// 判定: 结果文件优先; 无结果文件 => RE(含 halt/exit 逃逸)
function verdictFrom(result, r, timeMs) {
  const t = result.time === 'TLE' || r.exit === 124 || r.killed || result.time === 'long';
  if (result.time === 'TLE' || r.exit === 124) return 'TLE';
  if (r.error === 'ENOBUFS') return 'OLE';
  if (result.time === 'MLE' || /OutOfMemoryError|GC overhead limit/i.test(result.payload || '')) return 'MLE';
  if (result.time === 'ERR') return 'RE';
  if (result.time === 'NOFILE') {
    if (r.killed || r.exit === 124) return 'TLE';
    if (/OutOfMemoryError/.test(r.stderr)) return 'MLE';
    return 'RE';   // 逃逸: halt/exit 或 JVM 崩溃, 绝不判 AC
  }
  if (r.killed) return 'TLE';
  if (r.timeMs > timeMs * 1.5) return 'TLE';
  return 'AC';
}

function readResult(resultPath) {
  try {
    if (!fs.existsSync(resultPath)) return { time: 'NOFILE', payload: '' };
    const raw = fs.readFileSync(resultPath, 'utf8');
    const nl = raw.indexOf('\n');
    if (nl < 0) return { time: 'NOFILE', payload: '' };
    const head = raw.slice(0, nl);
    const rest = raw.slice(nl + 1);
    if (head === 'TLE') return { time: 'TLE', payload: '' };
    if (head === 'OK') return { time: 'OK', payload: rest };
    if (head === 'ERR') return { time: 'ERR', payload: rest };
    return { time: 'NOFILE', payload: raw };
  } catch { return { time: 'NOFILE', payload: '' }; }
}

// ------------------------------- 主入口 -------------------------------------
export function judgeProblem(problem, code) {
  const limits = Object.assign({ timeMs: 3000, memMb: 256, stackKb: 16384 }, problem.limits || {});
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jq2-'));
  const nonce = crypto.randomBytes(8).toString('hex');
  const resultPath = path.join(os.tmpdir(), 'jq2res-' + nonce + '.txt');
  const started = Date.now();
  try {
    fs.writeFileSync(path.join(dir, 'Main.java'), String(code).replace(/^\uFEFF/, ''));
    const mode = problem.mode || 'method';
    if (mode !== 'stdin') fs.writeFileSync(path.join(dir, 'Harness.java'), buildHarness(problem));
    if (mode === 'stress') {
      fs.writeFileSync(path.join(dir, 'Gen.java'), problem.stress.gen);
      fs.writeFileSync(path.join(dir, 'Ref.java'), problem.stress.ref);
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.java'));
    // -proc:none 防编译期代码执行; -implicit:none 防隐式编译
    const javac = spawnSync('javac', ['-encoding', 'UTF-8', '-nowarn', '-proc:none', '-implicit:none', '-d', dir, ...files],
      { cwd: dir, encoding: 'buffer', timeout: 30000, env: { ...process.env, JAVA_TOOL_OPTIONS: '-Duser.language=en -Duser.country=US' } });
    if (javac.status !== 0) {
      let msg = (javac.stderr || Buffer.from('')).toString('utf8');
      if (/重复|duplicate/i.test(msg) && /(Ser|Harness|Raw)/.test(msg)) {
        msg += '\n提示: 你的代码中定义了与评测壳同名的类(Ser/Harness/Raw), 请改名。';
      }
      return { verdict: 'CE', compile: false, message: msg.slice(0, 4000) || 'javac failed', cases: [], timeMs: Date.now() - started };
    }

    const cases = [];
    const runOne = (args, label, hidden, stdin) => {
      if (fs.existsSync(resultPath)) fs.rmSync(resultPath, { force: true });
      const r = runJvm(dir, args, resultPath, { ...limits, stdin: stdin || '' });
      const result = readResult(resultPath);
      const v = verdictFrom(result, r, limits.timeMs);
      return { r, result, v, label, hidden };
    };

    if (mode === 'stress') {
      const one = runOne(['0'], '随机对拍', false);
      let detail = '';
      let pass = false;
      if (one.v === 'AC' && /^STRESS_OK:/.test(one.result.payload || '')) {
        pass = true;
        detail = `已通过 ${one.result.payload.split(':')[1]} 组随机对拍`;
      } else if (one.result.time === 'ERR') {
        // 对拍不一致 / 随机输入抛异常 => 用户答案错误(WA), 而非系统级 RE
        detail = one.result.payload.split('\n').slice(0, 6).join('\n').slice(0, 1200);
      }
      cases.push({
        name: `随机对拍 ×${problem.stress.iterations || 200}`,
        verdict: pass ? 'AC' : (one.v === 'AC' || one.v === 'RE' ? 'WA' : one.v),
        timeMs: one.r.timeMs,
        got: pass ? detail : (detail || one.r.stderr.slice(0, 800)),
        expect: '全部随机用例与参考实现一致',
        detail: ''
      });
      // 作者手写的固定用例(含边界隐藏用例)同样要跑, 否则边界错误会被"随机对拍通过"掩盖
      for (let i = 0; i < (problem.tests || []).length; i++) {
        const t = problem.tests[i];
        const one = runOne([String(i + 1), ...(t.args || []).map(String)], t.name || ('case' + (i + 1)), !!t.hidden);
        const got = one.result.time === 'OK' ? one.result.payload.replace(/\s+$/, '') : null;
        const ok = one.v === 'AC' && got !== null && compare(got, t.expect, t.cmp);
        cases.push({
          name: t.name || ('case' + (i + 1)),
          verdict: ok ? 'AC' : (got === null ? one.v : 'WA'),
          timeMs: one.r.timeMs,
          got: got === null ? (one.result.time === 'ERR' ? one.result.payload.slice(0, 1200) : one.r.stderr.slice(0, 1000)) : got.slice(0, 1500),
          expect: String(t.expect).slice(0, 1500),
          detail: one.result.time === 'ERR' ? one.result.payload.slice(0, 1000) : '',
          hidden: !!t.hidden
        });
      }
    } else if (mode === 'design') {
      const opSets = problem.opSets && problem.opSets.length ? problem.opSets : [{ ops: problem.ops, expect: problem.expect, name: '操作序列' }];
      for (let si = 0; si < opSets.length; si++) {
        const set = opSets[si];
        const ops = set.ops || [];
        const args = [String(si), String(ops.length)];
        for (const o of ops) {
          args.push(o[0], String((o[1] || []).length));
          for (const a of o[1] || []) args.push(String(a));
        }
        const one = runOne(args, set.name || '操作序列', !!set.hidden);        const got = one.result.time === 'OK' ? one.result.payload.replace(/\s+$/, '') : null;
        const expect = (set.expect || []).join('\n');
        const okCmp = got !== null && compare(got, expect, set.cmp || problem.cmp || 'exact');
        cases.push({
          name: set.name || '操作序列',
          verdict: (one.v === 'AC' && okCmp) ? 'AC' : (got === null ? one.v : 'WA'),
          timeMs: one.r.timeMs,
          got: got === null ? (one.result.time === 'ERR' ? one.result.payload.slice(0, 1200) : one.r.stderr.slice(0, 800)) : got,
          expect,
          detail: '', hidden: !!set.hidden
        });
      }
    } else if (mode === 'stdin') {
      for (const t of problem.tests || []) {
        const one = runOne(['0'], t.name || 'case', !!t.hidden, t.stdin || '');
        // stdin 模式: 以用户 stdout 为准(但用户 stdout 已被 sink 屏蔽) -> 用 result 文件承载
        const got = one.result.time === 'OK' ? one.result.payload.replace(/\s+$/, '') : '';
        const pass = one.v === 'AC' && compare(got, t.expect, t.cmp);
        cases.push({ name: t.name || 'case', verdict: pass ? 'AC' : (one.v === 'AC' ? 'WA' : one.v), timeMs: one.r.timeMs, got: got.slice(0, 1500), expect: String(t.expect).slice(0, 1500), detail: one.result.time === 'ERR' ? one.result.payload.slice(0, 800) : '', hidden: !!t.hidden });
      }
    } else {
      for (let i = 0; i < (problem.tests || []).length; i++) {
        const t = problem.tests[i];
        const one = runOne([String(i), ...(t.args || []).map(String)], t.name || ('case' + (i + 1)), !!t.hidden);
        const got = one.result.time === 'OK' ? one.result.payload.replace(/\s+$/, '') : null;
        const pass = one.v === 'AC' && got !== null && compare(got, t.expect, t.cmp);
        cases.push({
          name: t.name || ('case' + (i + 1)),
          verdict: pass ? 'AC' : (got === null ? one.v : 'WA'),
          timeMs: one.r.timeMs,
          got: got === null ? (one.result.time === 'ERR' ? one.result.payload.slice(0, 1200) : one.r.stderr.slice(0, 1000)) : got.slice(0, 1500),
          expect: String(t.expect).slice(0, 1500),
          detail: one.result.time === 'ERR' ? one.result.payload.slice(0, 1000) : '',
          hidden: !!t.hidden
        });
      }
    }

    const order = { CE: 7, OLE: 6, TLE: 5, MLE: 4, RE: 3, WA: 2, AC: 1 };
    let worst = 'AC';
    for (const c of cases) if ((order[c.verdict] || 0) > (order[worst] || 0)) worst = c.verdict;
    const passed = cases.filter(c => c.verdict === 'AC').length;
    return {
      verdict: cases.length === 0 ? 'SE' : worst,
      compile: true, passed, total: cases.length, cases,
      timeMs: Date.now() - started
    };
  } catch (e) {
    return { verdict: 'SE', compile: false, message: String((e && e.message) || e), cases: [], timeMs: Date.now() - started };
  } finally {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch { }
    try { fs.rmSync(resultPath, { force: true }); } catch { }
  }
}

export { buildHarness };
