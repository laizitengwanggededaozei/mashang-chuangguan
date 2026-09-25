window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 8,
  "title": "面向对象:类与对象",
  "courseRef": "黑马第8章-面向对象(类与对象/封装/this/构造方法) + 第9章-面向对象原理(内存分配/参数传递/this本质)",
  "levels": [
    {
      "id": "ch08-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "封装矩形:面积/周长/等边判断",
      "tags": [
        "类与对象",
        "字段私有",
        "参数校验",
        "double返回"
      ],
      "q": "实现类 Rect:字段 private double width/height(用 double 接收, 单位可为小数)。构造方法 Rect(double w, double h) 把边长存进字段。注意构造方法里的形参与字段同名, 必须用 this 区分。方法 area() 返回面积 width*height;perimeter() 返回周长 2*(width+height);isSquare() 当且仅当两边存进去之后的 double 值完全相等(用 ==)时返回 true。约束 0 < w,h ≤ 1e6, 边长可能是小数。注意:结果按 double 原样输出, 不是正方形时不要四舍五入凑等。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "double",
          "double"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String solve(double w, double h) {\n        // TODO: 造一个 Rect 对象, 直接读它算出的三个结果并拼成字符串\n        // 契约: 必须写成 \"area=<面积>;perimeter=<周长>;square=<true|false>\"\n        return \"\";\n    }\n}\n\n// TODO: 在这里定义 class Rect (字段私有 + 构造方法 + 三个方法)\n",
      "solution": "public class Main {\n    public static String solve(double w, double h) {\n        Rect r = new Rect(w, h);\n        return \"area=\" + r.area() + \";perimeter=\" + r.perimeter() + \";square=\" + r.isSquare();\n    }\n}\n\nclass Rect {\n    private double width;\n    private double height;\n    public Rect(double w, double h) { this.width = w; this.height = h; }\n    public double area() { return width * height; }\n    public double perimeter() { return 2 * (width + height); }\n    public boolean isSquare() { return width == height; }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3",
            "4"
          ],
          "expect": "\"area=12.0;perimeter=14.0;square=false\"",
          "cmp": "exact"
        },
        {
          "name": "正方形",
          "args": [
            "2.5",
            "2.5"
          ],
          "expect": "\"area=6.25;perimeter=10.0;square=true\"",
          "cmp": "exact"
        },
        {
          "name": "小数边长",
          "args": [
            "0.1",
            "0.2"
          ],
          "expect": "\"area=0.020000000000000004;perimeter=0.6000000000000001;square=false\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "构造方法里字段名与形参名冲突时, this.width 才是字段",
        "边长用 double 存, 不要提前转成 int, 否则小数边长会被截断",
        "字符串拼接中 double 会按 Java 默认规则输出, 例如 12.0"
      ]
    },
    {
      "id": "ch08-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "不可变有理数:约分与相等",
      "tags": [
        "不可变对象",
        "final字段",
        "构造器归一化",
        "gcd"
      ],
      "q": "实现类 Frac 表示有理数对象:字段 private final long num/den(不可变, 无 setter)。构造方法 Frac(long n, long d) 必须做归一化:若 d < 0 就把符号搬到分子;再用 gcd 约分;den = 0 时视为表示为 0/1(即 num=0,den=1)。方法 num()/den() 返回分子/分母;equals(Frac o) 用这一对字段比较相等, 参数为 null 或类型不符时返回 false。主方法 solve(long n, long d) 返回字符串 \"num=<约分后分子>;den=<约分后分母>;eq=<同值对象是否 equals>\"。同一个有理数用两份不同写法的对象去比, 必须相等。约束 |n|,|d| ≤ 1e9。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "long",
          "long"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String solve(long n, long d) {\n        // TODO: 造两个不同写法的 Frac 对象, 用 equals 比较\n        // 提示: 第二个对象可以用 (n*2, d*2) 造, 归一化后应与第一个相等\n        return \"\";\n    }\n}\n\n// TODO: class Frac —— 字段 final, 构造方法里归一化(搬符号 + 约分 + den=0 特判)\n",
      "solution": "public class Main {\n    public static String solve(long n, long d) {\n        Frac a = new Frac(n, d);\n        Frac b = new Frac(n * 2, d * 2);\n        return \"num=\" + a.num() + \";den=\" + a.den() + \";eq=\" + a.equals(b);\n    }\n}\n\nclass Frac {\n    private final long num;\n    private final long den;\n    public Frac(long n, long d) {\n        if (d == 0) { this.num = 0; this.den = 1; return; }\n        if (d < 0) { n = -n; d = -d; }\n        long g = gcd(Math.abs(n), d);\n        if (g == 0) g = 1;\n        this.num = n / g;\n        this.den = d / g;\n    }\n    private static long gcd(long a, long b) { while (b != 0) { long t = a % b; a = b; b = t; } return a; }\n    public long num() { return num; }\n    public long den() { return den; }\n    public boolean equals(Frac o) { return o != null && num == o.num && den == o.den; }\n}\n",
      "tests": [
        {
          "name": "约分",
          "args": [
            "2",
            "4"
          ],
          "expect": "\"num=1;den=2;eq=true\"",
          "cmp": "exact"
        },
        {
          "name": "负分母搬符号",
          "args": [
            "3",
            "-6"
          ],
          "expect": "\"num=-1;den=2;eq=true\"",
          "cmp": "exact"
        },
        {
          "name": "分母为零",
          "args": [
            "5",
            "0"
          ],
          "expect": "\"num=0;den=1;eq=true\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "零",
          "args": [
            "0",
            "-9"
          ],
          "expect": "\"num=0;den=1;eq=true\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "归一化只在构造方法里做一次, 之后对象状态永不改变",
        "d<0 时同时取反分子分母, 保证分母恒为正",
        "gcd(0, d) 会返回 d, 所以 n=0 时要单独保证得到 0/1"
      ]
    },
    {
      "id": "ch08-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "构造方法校验:非法参数直接抛异常",
      "tags": [
        "构造方法校验",
        "IllegalArgumentException",
        "数据安全"
      ],
      "q": "实现类 Range 表示闭区间。构造方法 Range(int lo, int hi) 必须做守卫:lo > hi 时抛 new IllegalArgumentException(\"lo>hi\");构造成功的对象保证 lo ≤ hi。方法 size() 返回元素个数(hi-lo+1, 用 long 防止 int 溢出);contains(int x) 判断闭区间包含;mid() 返回整数中点(向下取整, 即 floor((lo+hi)/2))。主方法 solve(int lo, int hi) 用 lo 与 hi 的算术平均值 prob = (int)Math.floor((lo+(long)hi)/2.0) 作为探测点, 返回字符串 \"size=<个数>;contains=<prob 是否在区间内>;mid=<中点>\"。若构造失败, solve 必须原样把异常抛出去(判题端会记为运行时错误)。约束 -1e9 ≤ lo,hi ≤ 1e9, 区间可能极宽。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "int",
          "int"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String solve(int lo, int hi) {\n        // TODO: 构造 Range, 若抛异常请让它继续向外抛(不要 catch 吞掉)\n        // 契约: \"size=<个数>;contains=<true|false>;mid=<中点>\"\n        // 探测点 prob = (int) Math.floor((lo + (long) hi) / 2.0)\n        return \"\";\n    }\n}\n\n// TODO: class Range —— 字段私有; 构造方法里 lo>hi 抛 IllegalArgumentException(\"lo>hi\")\n",
      "solution": "public class Main {\n    public static String solve(int lo, int hi) {\n        Range r = new Range(lo, hi);\n        int prob = (int) Math.floor((lo + (long) hi) / 2.0);\n        return \"size=\" + r.size() + \";contains=\" + r.contains(prob) + \";mid=\" + r.mid();\n    }\n}\n\nclass Range {\n    private final int lo;\n    private final int hi;\n    public Range(int lo, int hi) {\n        if (lo > hi) throw new IllegalArgumentException(\"lo>hi\");\n        this.lo = lo;\n        this.hi = hi;\n    }\n    public long size() { return (long) hi - lo + 1; }\n    public boolean contains(int x) { return x >= lo && x <= hi; }\n    public int mid() { return (int) Math.floor(((long) lo + hi) / 2.0); }\n}\n",
      "tests": [
        {
          "name": "普通区间",
          "args": [
            "1",
            "10"
          ],
          "expect": "\"size=10;contains=true;mid=5\"",
          "cmp": "exact"
        },
        {
          "name": "单点区间",
          "args": [
            "4",
            "4"
          ],
          "expect": "\"size=1;contains=true;mid=4\"",
          "cmp": "exact"
        },
        {
          "name": "负区间",
          "args": [
            "-10",
            "-3"
          ],
          "expect": "\"size=8;contains=true;mid=-7\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "整个int范围",
          "args": [
            "-2147483648",
            "2147483647"
          ],
          "expect": "\"size=4294967296;contains=true;mid=-1\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先校验再赋值, 失败的对象根本不会被创建出来",
        "hi-lo+1 可能超过 int 范围, 返回值必须是 long",
        "中点用 (lo+(long)hi)/2.0 再向下取整, 直接用 int 相加会溢出"
      ]
    },
    {
      "id": "ch08-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "this 链式调用:可变构建器",
      "tags": [
        "this",
        "链式调用",
        "返回this",
        "可变态"
      ],
      "q": "实现类 StrBuilder:一个可变字符串容器。append(String s) 把 s 追加到内部末尾并返回 this(支持链式调用);prepend(String s) 插到最前面并返回 this;reverse() 原地反转内容并返回 this;length() 返回当前长度;get() 返回当前字符串。构造方法 StrBuilder(String init) 用 init 初始化内容, 传 null 视为空串。主方法 solve(String init) 返回字符串 \"get=<最终内容>;len=<长度>\"。变换序列固定为 append(\"-1\") → prepend(\"0-\") → reverse()。要求所有变换都作用在同一个对象上, 不能每次返回新对象。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "String"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String solve(String init) {\n        // TODO: 固定序列 b.append(\"-1\").prepend(\"0-\").reverse(), 全程同一个对象\n        // 契约: \"get=<最终内容>;len=<长度>\"\n        return \"\";\n    }\n}\n\n// TODO: class StrBuilder —— 每个变换方法末尾 return this;\n",
      "solution": "public class Main {\n    public static String solve(String init) {\n        StrBuilder b = new StrBuilder(init);\n        b.append(\"-1\").prepend(\"0-\").reverse();\n        return \"get=\" + b.get() + \";len=\" + b.length();\n    }\n}\n\nclass StrBuilder {\n    private String s;\n    public StrBuilder(String init) { this.s = init == null ? \"\" : init; }\n    public StrBuilder append(String x) { s = s + x; return this; }\n    public StrBuilder prepend(String x) { s = x + s; return this; }\n    public StrBuilder reverse() { s = new StringBuilder(s).reverse().toString(); return this; }\n    public int length() { return s.length(); }\n    public String get() { return s; }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "ab"
          ],
          "expect": "\"get=1-ba-0;len=6\"",
          "cmp": "exact"
        },
        {
          "name": "空初始值",
          "args": [
            ""
          ],
          "expect": "\"get=1--0;len=4\"",
          "cmp": "exact"
        },
        {
          "name": "单字符",
          "args": [
            "z"
          ],
          "expect": "\"get=1-z-0;len=5\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "回文",
          "args": [
            "aba"
          ],
          "expect": "\"get=1-aba-0;len=7\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "链式调用的关键就是方法末尾 return this",
        "this 在这里表示\"当前正在被操作的那个对象\", 所以三条语句改的是同一份数据",
        "reverse 会把整个串(含后来加进去的内容)一起颠倒, 顺序错一步结果就完全不同"
      ]
    },
    {
      "id": "ch08-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "对象数组:按总分排名(稳定)",
      "tags": [
        "对象数组",
        "Comparator",
        "稳定排序",
        "封装"
      ],
      "q": "实现类 Student:字段 private final String name 与 private final int score(构造方法 Student(String name, int score), 提供 name()/score() 访问器, 不提供 setter)。实现方法 rank(String[] names, int[] scores):按 score 从高到低排序后用字符串 \"<name>:<score>\" 依次拼接, 段与段之间用一个逗号连接, 返回该字符串。分数相同时必须保持输入中先出现的同学排在前面(稳定排序)。传入的两个数组长度相同, 长度 0 时返回空串。约束人数 ≤ 1000, |score| ≤ 1e6, 姓名不含逗号与冒号。",
      "mode": "method",
      "entry": {
        "method": "rank",
        "params": [
          "String[]",
          "int[]"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String rank(String[] names, int[] scores) {\n        // TODO: 造 Student[] 并按分数降序做稳定排序, 再拼成 \"名:分\" 逗号串\n        return \"\";\n    }\n}\n\n// TODO: class Student —— 字段 private final, 只读访问器\n",
      "solution": "public class Main {\n    public static String rank(String[] names, int[] scores) {\n        Student[] a = new Student[names.length];\n        for (int i = 0; i < names.length; i++) a[i] = new Student(names[i], scores[i]);\n        java.util.Arrays.sort(a, (x, y) -> Integer.compare(y.score(), x.score()));\n        StringBuilder b = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) b.append(','); b.append(a[i].name()).append(':').append(a[i].score()); }\n        return b.toString();\n    }\n}\n\nclass Student {\n    private final String name;\n    private final int score;\n    public Student(String name, int score) { this.name = name; this.score = score; }\n    public String name() { return name; }\n    public int score() { return score; }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "a|b|c",
            "90,80,70"
          ],
          "expect": "\"a:90,b:80,c:70\"",
          "cmp": "exact"
        },
        {
          "name": "同分保持输入序",
          "args": [
            "x|y|z",
            "50,50,90"
          ],
          "expect": "\"z:90,x:50,y:50\"",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "solo",
            "0"
          ],
          "expect": "\"solo:0\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空名单",
          "args": [
            "",
            ""
          ],
          "expect": "\"\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负数与全同分",
          "args": [
            "p|q",
            "-5,-5"
          ],
          "expect": "\"p:-5,q:-5\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "Arrays.sort(对象数组, 比较器) 对相等元素保持原有次序, 所以比较器在分数相同时必须返回 0",
        "比较器写成 Integer.compare(y.score(), x.score()) 就是降序, 不要用减法以免溢出",
        "两个参数分别是待比较的两名学生, 别把 x 与 y 的字段取错对象"
      ]
    },
    {
      "id": "ch08-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "Comparator 比较器:按绝对值再按值",
      "tags": [
        "Comparator",
        "自定义比较",
        "绝对值",
        "$比较器传递"
      ],
      "q": "实现类 Entry:字段 private final long v(构造方法 Entry(long v), 访问器 v())。实现方法 order(long[] a):把每个元素包成 Entry, 按\"绝对值升序;绝对值相同时按原值升序\"排序, 返回每个元素原值的字符串按逗号连接。即排序键为 (|v|, v)。例如 -2 与 2 的绝对值相同, 按原值升序后 -2 排在 2 前面。约束元素个数 n ≤ 1000(允许 n=0, 返回空串), |a[i]| ≤ 1e18。用 long 处理时必须小心 Long.MIN_VALUE 的绝对值会溢出。",
      "mode": "method",
      "entry": {
        "method": "order",
        "params": [
          "long[]"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String order(long[] a) {\n        // TODO: 包成 Entry 后用自定义比较器排序, 再拼成逗号串\n        return \"\";\n    }\n}\n\n// TODO: class Entry —— 字段 private final long, 访问器 v()\n",
      "solution": "public class Main {\n    public static String order(long[] a) {\n        Entry[] b = new Entry[a.length];\n        for (int i = 0; i < a.length; i++) b[i] = new Entry(a[i]);\n        java.util.Arrays.sort(b, (x, y) -> {\n            int c = Long.compare(Math.abs(x.v()), Math.abs(y.v()));\n            return c != 0 ? c : Long.compare(x.v(), y.v());\n        });\n        StringBuilder s = new StringBuilder();\n        for (int i = 0; i < b.length; i++) { if (i > 0) s.append(','); s.append(b[i].v()); }\n        return s.toString();\n    }\n}\n\nclass Entry {\n    private final long v;\n    public Entry(long v) { this.v = v; }\n    public long v() { return v; }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3,-1,2,-2"
          ],
          "expect": "\"-1,-2,2,3\"",
          "cmp": "exact"
        },
        {
          "name": "全为零与单元素",
          "args": [
            "0"
          ],
          "expect": "\"0\"",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "\"\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "相反数相邻",
          "args": [
            "5,-5,3,-3,0"
          ],
          "expect": "\"0,-3,3,-5,5\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "极端值",
          "args": [
            "-9223372036854775808,9223372036854775807,-1"
          ],
          "expect": "\"-9223372036854775808,-1,9223372036854775807\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "比较器里先比绝对值, 相等再比原值, 这两步的顺序就是题目要求的排序键",
        "相减方式比较 long 会溢出, 一律用 Long.compare",
        "Math.abs(Long.MIN_VALUE) 仍然是负数, 这是本题最容易翻车的边界"
      ]
    },
    {
      "id": "ch08-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "自实现 equals(稀疏向量比较)",
      "tags": [
        "equals重写",
        "稀疏数据",
        "类型判断",
        "契约"
      ],
      "q": "实现类 SparseVec:用一个索引数组(idx)与值数组(val)存放非零项, 字段全部 private final, 构造时对传入的两个 int[] 做防御性复制(clone), 外部再改原数组不得影响对象。重写 equals(SparseVec o):当且仅当两个向量的\"每个下标的取值都相同\"时返回 true;下标顺序不同但取值相同也算相等, 一方漏写的下标视为 0;o 为 null 时返回 false(本题两个向量的维度天然相同, 都是 dim)。主方法 solve(int[] i1, int[] v1, int[] i2, int[] v2, int dim) 构造两个向量并用 equals 判断, 返回 \"eq=<true|false>;nnz=<第一个向量非零项数>;dim=<维度>\"。约束 dim ≤ 1e5, 项数 ≤ 1e4, 下标严格递增且 ∈ [0,dim), 值不为 0。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "int[]",
          "int[]",
          "int[]",
          "int[]",
          "int"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String solve(int[] i1, int[] v1, int[] i2, int[] v2, int dim) {\n        // TODO: 造两个 SparseVec 并比较; 注意防御性复制\n        // 契约: \"eq=<true|false>;nnz=<第一个向量非零项数>;dim=<维度>\"\n        return \"\";\n    }\n}\n\n// TODO: class SparseVec —— 构造时 clone 入参, equals 按下标取值逐个比对\n",
      "solution": "public class Main {\n    public static String solve(int[] i1, int[] v1, int[] i2, int[] v2, int dim) {\n        SparseVec a = new SparseVec(i1, v1, dim);\n        SparseVec b = new SparseVec(i2, v2, dim);\n        return \"eq=\" + a.equals(b) + \";nnz=\" + a.nnz() + \";dim=\" + a.dim();\n    }\n}\n\nclass SparseVec {\n    private final int[] idx;\n    private final int[] val;\n    private final int dim;\n    public SparseVec(int[] idx, int[] val, int dim) {\n        this.idx = idx.clone();\n        this.val = val.clone();\n        this.dim = dim;\n    }\n    public int[] copyIdx() { return idx.clone(); }\n    public int[] copyVal() { return val.clone(); }\n    public int nnz() { return idx.length; }\n    public int dim() { return dim; }\n    public boolean equals(SparseVec o) {\n        if (o == null || dim != o.dim) return false;\n        int i = 0, j = 0;\n        while (i < idx.length || j < o.idx.length) {\n            int a = i < idx.length ? idx[i] : Integer.MAX_VALUE;\n            int b = j < o.idx.length ? o.idx[j] : Integer.MAX_VALUE;\n            if (a < b) { if (val[i] != 0) return false; i++; }\n            else if (a > b) { if (o.val[j] != 0) return false; j++; }\n            else { if (val[i] != o.val[j]) return false; i++; j++; }\n        }\n        return true;\n    }\n}\n",
      "tests": [
        {
          "name": "完全相同",
          "args": [
            "0,2",
            "5,7",
            "0,2",
            "5,7",
            "3"
          ],
          "expect": "\"eq=true;nnz=2;dim=3\"",
          "cmp": "exact"
        },
        {
          "name": "缺项视为零",
          "args": [
            "1",
            "4",
            "1,2",
            "4,0",
            "3"
          ],
          "expect": "\"eq=true;nnz=1;dim=3\"",
          "cmp": "exact"
        },
        {
          "name": "下标错位",
          "args": [
            "0",
            "5",
            "1",
            "5",
            "3"
          ],
          "expect": "\"eq=false;nnz=1;dim=3\"",
          "cmp": "exact"
        },
        {
          "name": "值不同",
          "args": [
            "0",
            "5",
            "0",
            "6",
            "1"
          ],
          "expect": "\"eq=false;nnz=1;dim=1\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空与零值项",
          "args": [
            "1",
            "0",
            "",
            "",
            "4"
          ],
          "expect": "\"eq=true;nnz=1;dim=4\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "两边都空",
          "args": [
            "",
            "",
            "",
            "",
            "4"
          ],
          "expect": "\"eq=true;nnz=0;dim=4\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "构造方法里必须 clone, 否则外部数组一改对象就被偷偷改掉了",
        "两个下标序列都是递增的, 可以用双指针线性比对, 不必开 dim 大小的数组",
        "只有当某一侧存在非零项而另一侧该下标缺失时, 才可能不相等"
      ]
    },
    {
      "id": "ch08-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "构造器内做深拷贝(行程编码)",
      "tags": [
        "深拷贝",
        "防御性复制",
        "编码解码",
        "不可变"
      ],
      "q": "实现类 RunLength:表示行程编码序列, 内部存放两个 private final int[] value/length(连续重复段)。构造方法 RunLength(int[] value, int[] length) 必须做深拷贝, 并在拷贝时合并相邻的\"相同值\"段(例如 value=[1,1,2], length=[2,3,4] 应归一化成 [1,2,3] 与 [5,4])。方法 expand() 返回展开后的完整序列(长度 = 各段长度之和, 总和可能很大但不保证, 本题总和 ≤ 1e6);compress(int[] a) 静态方法把任意 int[] 压缩成 RunLength。主方法 solve(int[] v, int[] len, int[] probe) 返回 \"norm=<归一化后的值段用竖线连接>;count=<归一化后段数>;head=<probe 展开后前 10 个元素用逗号连接>\"。约束:段长 ≥ 1;probe 展开长度 ≥ 10。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "int[]",
          "int[]",
          "int[]"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String solve(int[] v, int[] len, int[] probe) {\n        // TODO: 构造 RunLength(会自动深拷贝+合并同值相邻段), 再用 compress 处理 probe\n        // 契约: \"norm=<值段竖线连接>;count=<段数>;head=<展开前10个用逗号连接>\"\n        return \"\";\n    }\n}\n\n// TODO: class RunLength —— 构造方法拷贝并合并相邻同值段; compress 静态方法\n",
      "solution": "public class Main {\n    public static String solve(int[] v, int[] len, int[] probe) {\n        RunLength r = new RunLength(v, len);\n        RunLength p = RunLength.compress(probe);\n        StringBuilder head = new StringBuilder();\n        int[] ex = p.expand();\n        for (int i = 0; i < 10; i++) { if (i > 0) head.append(','); head.append(ex[i]); }\n        StringBuilder norm = new StringBuilder();\n        for (int i = 0; i < r.count(); i++) { if (i > 0) norm.append('|'); norm.append(r.valueAt(i)); }\n        return \"norm=\" + norm + \";count=\" + r.count() + \";head=\" + head;\n    }\n}\n\nclass RunLength {\n    private final int[] value;\n    private final int[] length;\n    public RunLength(int[] v, int[] l) {\n        int[] tv = new int[v.length];\n        int[] tl = new int[v.length];\n        int n = 0;\n        for (int i = 0; i < v.length; i++) {\n            if (n > 0 && tv[n - 1] == v[i]) tl[n - 1] += l[i];\n            else { tv[n] = v[i]; tl[n] = l[i]; n++; }\n        }\n        this.value = java.util.Arrays.copyOf(tv, n);\n        this.length = java.util.Arrays.copyOf(tl, n);\n    }\n    public static RunLength compress(int[] a) {\n        int[] v = new int[a.length];\n        int[] l = new int[a.length];\n        int n = 0;\n        for (int i = 0; i < a.length; i++) {\n            if (n > 0 && v[n - 1] == a[i]) l[n - 1]++;\n            else { v[n] = a[i]; l[n] = 1; n++; }\n        }\n        return new RunLength(java.util.Arrays.copyOf(v, n), java.util.Arrays.copyOf(l, n));\n    }\n    public int count() { return value.length; }\n    public int valueAt(int i) { return value[i]; }\n    public int lengthAt(int i) { return length[i]; }\n    public int[] expand() {\n        int total = 0;\n        for (int x : length) total += x;\n        int[] r = new int[total];\n        int k = 0;\n        for (int i = 0; i < value.length; i++) for (int j = 0; j < length[i]; j++) r[k++] = value[i];\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "需要合并",
          "args": [
            "1,1,2",
            "2,3,4",
            "5,5,5,6,6,6,7,7,7,8,8"
          ],
          "expect": "\"norm=1|2;count=2;head=5,5,5,6,6,6,7,7,7,8\"",
          "cmp": "exact"
        },
        {
          "name": "无需合并",
          "args": [
            "7",
            "3",
            "1,2,1,2,1,2,3,3,3,3"
          ],
          "expect": "\"norm=7;count=1;head=1,2,1,2,1,2,3,3,3,3\"",
          "cmp": "exact"
        },
        {
          "name": "全同值",
          "args": [
            "4,4,4",
            "2,2,2",
            "9,9,9,9,9,9,9,9,9,9,9"
          ],
          "expect": "\"norm=4;count=1;head=9,9,9,9,9,9,9,9,9,9\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负数与零",
          "args": [
            "-1,0,-1",
            "1,1,1",
            "0,0,0,-1,-1,0,0,0,0,0,0"
          ],
          "expect": "\"norm=-1|0|-1;count=3;head=0,0,0,-1,-1,0,0,0,0,0\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "构造方法既负责复制也负责归一化, 调用者之后怎么改原数组都与对象无关",
        "合并条件只看\"前一段的值是否等于当前值\", 与段长无关",
        "compress 得到的结果再由构造方法处理一次, 等价于多走一遍归一化"
      ]
    },
    {
      "id": "ch08-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "对象图中的 this 与 null 比较",
      "tags": [
        "this本质",
        "对象比较",
        "null安全",
        "关联对象"
      ],
      "q": "实现两个类:Person 字段 private final String name 与 private final Person friend(朋友引用可以为 null, 表示没有朋友), 提供 name()/friend()/hasFriend()。实现类 Linker 的静态方法 describe(Person p):返回一个描述串 —— p 为 null 时返回 \"null\";否则输出 \"<name>-><朋友名>\", 朋友为空时用 \"none\" 占位。再实现 same(Person a, Person b):a 与 b 引用同一个对象(用 == 判断)且都不为 null 时返回 true。主方法 solve(String n1, String n2, boolean sameRef) 构造两个 Person:当 sameRef 为 true 时让 second 直接指向 first 这个对象, 否则新建一个同名的另一个对象;并让 first 的朋友指向 second。返回 \"first=<describe(first)>;second=<describe(second)>;same=<same(first,second)>;self=<same(first,first)>\"。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "String",
          "String",
          "boolean"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String solve(String n1, String n2, boolean sameRef) {\n        // TODO: 按 sameRef 决定 second 是 first 的别名还是同名新对象\n        // 契约: \"first=<descr>;second=<descr>;same=<true|false>;self=<true|false>\"\n        return \"\";\n    }\n}\n\n// TODO: class Person(含可为 null 的 friend 引用) 与 class Linker(describe/same)\n",
      "solution": "public class Main {\n    public static String solve(String n1, String n2, boolean sameRef) {\n        Person first = new Person(n1, null);\n        Person second = sameRef ? first : new Person(n1, null);\n        first = new Person(n1, second);\n        return \"first=\" + Linker.describe(first) + \";second=\" + Linker.describe(second)\n                + \";same=\" + Linker.same(first, second) + \";self=\" + Linker.same(first, first);\n    }\n}\n\nclass Person {\n    private final String name;\n    private final Person friend;\n    public Person(String name, Person friend) { this.name = name; this.friend = friend; }\n    public String name() { return name; }\n    public Person friend() { return friend; }\n    public boolean hasFriend() { return friend != null; }\n}\n\nclass Linker {\n    public static String describe(Person p) {\n        if (p == null) return \"null\";\n        return p.name() + \"->\" + (p.hasFriend() ? p.friend().name() : \"none\");\n    }\n    public static boolean same(Person a, Person b) { return a != null && a == b; }\n}\n",
      "tests": [
        {
          "name": "同引用",
          "args": [
            "amy",
            "bob",
            "true"
          ],
          "expect": "\"first=amy->amy;second=amy->none;same=false;self=true\"",
          "cmp": "exact"
        },
        {
          "name": "不同对象",
          "args": [
            "amy",
            "bob",
            "false"
          ],
          "expect": "\"first=amy->amy;second=amy->none;same=false;self=true\"",
          "cmp": "exact"
        },
        {
          "name": "空名字",
          "args": [
            "",
            "",
            "true"
          ],
          "expect": "\"first=->;second=->none;same=false;self=true\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "self 用同一个引用去比, 必须为 true —— == 比较的是\"是不是同一个对象\"",
        "两个内容完全一样的对象, == 仍然是 false;想比内容要写自己的 equals",
        "friend 允许为 null, 每次取用前先判空"
      ]
    },
    {
      "id": "ch08-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "对拍:自实现 equals/hashCode 的集合语义",
      "tags": [
        "equals",
        "hashCode",
        "HashSet",
        "随机对拍",
        "不可变对象"
      ],
      "q": "实现不可变类 Point:字段 private final int x,y;重写 equals(Object o)(要求 o 为 Point 且 x、y 都相等)与 hashCode()(必须与 equals 一致:相等对象哈希值相同)。实现方法 solve(int[][] pts, int[] q):先把 pts 中每个坐标对包成 Point 放进 HashSet 去重, 返回一个 int[] = [不同点个数, q 是否已存在于集合中(1/0)]。注意:hashCode 不能只返回常量(那样虽然正确但会退化), 也不要遗漏对 o 的类型判断。本题用随机对拍:与逐项线性查找的参考实现在大量随机用例上比对。约束点数 ≤ 1e4, 坐标 |x|,|y| ≤ 1e6。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[][]",
          "int[]"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] solve(int[][] pts, int[] q) {\n        // TODO: HashSet<Point> 去重后返回 {不同点数, q 是否存在 ? 1 : 0}\n        return new int[]{0, 0};\n    }\n}\n\n// TODO: class Point —— 字段 private final; 重写 equals 与 hashCode\n",
      "solution": "public class Main {\n    public static int[] solve(int[][] pts, int[] q) {\n        java.util.HashSet<Point> set = new java.util.HashSet<>();\n        for (int[] p : pts) set.add(new Point(p[0], p[1]));\n        return new int[]{ set.size(), set.contains(new Point(q[0], q[1])) ? 1 : 0 };\n    }\n}\n\nclass Point {\n    private final int x;\n    private final int y;\n    public Point(int x, int y) { this.x = x; this.y = y; }\n    public int x() { return x; }\n    public int y() { return y; }\n    public boolean equals(Object o) {\n        if (!(o instanceof Point)) return false;\n        Point p = (Point) o;\n        return x == p.x && y == p.y;\n    }\n    public int hashCode() { return x * 31 + y; }\n}\n",
      "tests": [
        {
          "name": "含重复点",
          "args": [
            "1,2;1,2;3,4",
            "1,2"
          ],
          "expect": "[2,1]",
          "cmp": "exact"
        },
        {
          "name": "查询不存在",
          "args": [
            "0,0",
            "1,1"
          ],
          "expect": "[1,0]",
          "cmp": "exact"
        },
        {
          "name": "空输入",
          "args": [
            "",
            "0,0"
          ],
          "expect": "[0,0]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "坐标取反不算相同",
          "args": [
            "1,-1;-1,1;1,-1",
            "-1,1"
          ],
          "expect": "[2,1]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260801,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(9); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)59); b.append(r.nextInt(7)-3); b.append((char)44); b.append(r.nextInt(7)-3); } return new String[]{ b.toString(), String.valueOf(r.nextInt(7)-3)+String.valueOf((char)44)+String.valueOf(r.nextInt(7)-3) }; } }",
        "ref": "public class Ref { public static int[] solve(int[][] pts, int[] q){ int c=0; boolean f=false; for(int i=0;i<pts.length;i++){ boolean seen=false; for(int j=0;j<i;j++) if(pts[j][0]==pts[i][0] && pts[j][1]==pts[i][1]){ seen=true; break; } if(!seen) c++; } for(int i=0;i<pts.length;i++) if(pts[i][0]==q[0] && pts[i][1]==q[1]){ f=true; break; } return new int[]{ c, f?1:0 }; } }"
      },
      "hints": [
        "HashSet 先用 hashCode 定位桶, 再用 equals 判等, 两者必须保持同一套相等语义",
        "hashCode 用 x*31+y 这类组合值, 保证不同点尽量落在不同桶",
        "equals 参数类型必须是 Object, 且要先 instanceof 再强转"
      ]
    },
    {
      "id": "ch08-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "对拍:字符串比较器的平局与传递性",
      "tags": [
        "Comparator",
        "字符串比较",
        "排序契约",
        "稳定性"
      ],
      "q": "实现 solve(String[] words):按下列规则排序并返回结果数组(判题按 String[] 逐元素比较, 期望值写成 [\"a\",\"bb\"] 这种带引号的形式)。规则:先按**长度升序**;长度相同时按**字典序升序**(区分大小写, 使用 String.compareTo 的自然顺序);长度与字典序都相同时按原下标升序保持稳定。要求比较器完全符合排序契约:必须满足自反(a,a)=0、反对称 sign(a,b) = -sign(b,a)、以及传递性;连续调用比较器不得出现自相矛盾的结果(例如用减法实现时忘记处理差值符号, 或在大整数上做减法导致溢出)。本题随机对拍:与\"插入排序 + 两两比较同一规则\"的参考实现在大量随机用例上逐位比对。约束 0 ≤ n ≤ 5000(允许 n=0, 返回空数组), 单词长度 ≤ 30, 仅含大小写字母。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "String[]"
        ],
        "ret": "String[]"
      },
      "limits": {
        "timeMs": 3000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String[] solve(String[] words) {\n        // TODO: 长度升序, 长度相同按字典序; 比较器要满足排序契约\n        return words;\n    }\n}\n",
      "solution": "public class Main {\n    public static String[] solve(String[] words) {\n        String[] r = words.clone();\n        java.util.Arrays.sort(r, (a, b) -> {\n            if (a.length() != b.length()) return Integer.compare(a.length(), b.length());\n            return a.compareTo(b);\n        });\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "长度优先",
          "args": [
            "bbb|a|cc"
          ],
          "expect": "[\"a\",\"cc\",\"bbb\"]",
          "cmp": "tokens"
        },
        {
          "name": "长度相同的字典序",
          "args": [
            "ba|ab|aa"
          ],
          "expect": "[\"aa\",\"ab\",\"ba\"]",
          "cmp": "tokens"
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "[]",
          "cmp": "tokens",
          "hidden": true
        },
        {
          "name": "大小写敏感",
          "args": [
            "A|a|B|b"
          ],
          "expect": "[\"A\",\"B\",\"a\",\"b\"]",
          "cmp": "tokens",
          "hidden": true
        },
        {
          "name": "单元素",
          "args": [
            "x"
          ],
          "expect": "[\"x\"]",
          "cmp": "tokens",
          "hidden": true
        },
        {
          "name": "相同长度混合",
          "args": [
            "z|Y|x|W"
          ],
          "expect": "[\"W\",\"Y\",\"x\",\"z\"]",
          "cmp": "tokens",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260811,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(12); StringBuilder b=new StringBuilder();\n  for(int i=0;i<n;i++){ if(i>0) b.append((char)124); int L=1+r.nextInt(4); for(int j=0;j<L;j++){ int c=r.nextInt(4); b.append((char)(c<2 ? 97+r.nextInt(3) : 65+r.nextInt(3))); } }\n  return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static String[] solve(String[] w){\n  String[] r = w.clone();\n  for(int i=1;i<r.length;i++){ String cur=r[i]; int j=i-1; while(j>=0 && cmp(r[j],cur)>0){ r[j+1]=r[j]; j--; } r[j+1]=cur; }\n  return r; }\n  static int cmp(String a,String b){ if(a.length()!=b.length()) return a.length()<b.length()?-1:1; return a.compareTo(b); } }"
      },
      "hints": [
        "长度不同时只比长度, 不要顺手去比字典序",
        "长度相同时用 a.compareTo(b), 它本身就是字典序且区分大小写",
        "Comparator 里不要用 a.length() - b.length() 之外的\"减法\"实现字符串比较"
      ]
    },
    {
      "id": "ch08-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "对拍:同值等价类的去重与计数",
      "tags": [
        "等价关系",
        "去重计数",
        "值对象",
        "随机对拍"
      ],
      "q": "实现方法 solve(String[] words):把一个单词表按\"长度相同且首字母相同\"分组(不区分大小写, 统一转成小写后再看;长度 0 的字符串与空串视为同一组), 返回 int[] = [分组个数, 最大分组的单词数, 最大分组中出现次数最多的首字母在该组的排名] —— 最后一项目前不需要, 约定固定返回 0。也就是说只需返回 {不同等价类个数, 最大类大小, 0}。等价类由\"长度 + 小写首字母\"唯一决定。本题用随机对拍:与 O(n^2) 双重循环参考实现比对。约束 n ≤ 1e4, 单词长度 ≤ 20, 只含大小写字母。注意 Java 中 \"a\".equalsIgnoreCase(\"A\") 为 true, 但作为 Map 的 key 必须统一大小写才能合并到同一类。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "String[]"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] solve(String[] words) {\n        // TODO: 按 (小写首字母, 长度) 统计每个等价类的大小\n        return new int[]{0, 0, 0};\n    }\n}\n\n// TODO: 可用 HashMap<String,Integer> 或自定义值对象作为 key\n",
      "solution": "public class Main {\n    public static int[] solve(String[] words) {\n        java.util.HashMap<String, Integer> m = new java.util.HashMap<>();\n        for (String w : words) {\n            String k = w.isEmpty() ? \"#0\" : (Character.toLowerCase(w.charAt(0)) + \"#\" + w.length());\n            m.merge(k, 1, Integer::sum);\n        }\n        int mx = 0;\n        for (int v : m.values()) mx = Math.max(mx, v);\n        return new int[]{ m.size(), mx, 0 };\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "ab|Ac|xy|z"
          ],
          "expect": "[3,2,0]",
          "cmp": "exact"
        },
        {
          "name": "空串与重复",
          "args": [
            "|a|A|aa"
          ],
          "expect": "[3,2,0]",
          "cmp": "exact"
        },
        {
          "name": "空输入",
          "args": [
            ""
          ],
          "expect": "[0,0,0]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "一类独大",
          "args": [
            "ab|ac|ad|z"
          ],
          "expect": "[2,3,0]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260803,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(10); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)124); int L=r.nextInt(5); for(int j=0;j<L;j++){ int c=r.nextInt(4); b.append((char)(c<2 ? (char)(97+r.nextInt(3)) : (char)(65+r.nextInt(3)))); } } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static int[] solve(String[] w){ int classes=0, mx=0; boolean[] used=new boolean[w.length]; int[] cnt=new int[w.length]; for(int i=0;i<w.length;i++){ if(used[i]) continue; int c=0; for(int j=i;j<w.length;j++){ if(same(w[i],w[j])){ used[j]=true; c++; } } cnt[classes]=c; if(c>mx) mx=c; classes++; } return new int[]{ classes, mx, 0 }; } static boolean same(String a,String b){ int la=a.length(), lb=b.length(); if(la!=lb) return false; if(la==0) return true; return Character.toLowerCase(a.charAt(0))==Character.toLowerCase(b.charAt(0)); } }"
      },
      "hints": [
        "等价类的 key 必须把所有同类的串映射到同一个值, 大小写差异要在入 key 前抹掉",
        "空串没有首字母, 给它单独一个固定 key, 例如 \"#0\"",
        "统计最大值时不要忘记空输入, 否则 max 的初值会把答案带偏"
      ]
    },
    {
      "id": "ch08-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计不可变整数区间集合(操作序列)",
      "tags": [
        "设计",
        "不可变对象",
        "集合合并",
        "操作序列"
      ],
      "q": "实现 class IntervalSet:一个只增不改的闭区间集合。构造区:IntervalSet() 构造空集合(判题序列里第一个操作就是它, 不要写成带参数的构造器)。put(int lo, int hi) 把区间 [lo,hi] 加入集合;若新区间与已有某个区间有公共点(端点点接触也算相交), 就与它合并成一个更大的区间。overlaps(int lo, int hi) 判断 [lo,hi] 是否与集合中任一区间有公共点。count() 返回当前区间条数。total() 返回所有区间覆盖的整数总个数(long)。toString 不要重写, 用方法 describe() 返回区间列表: 每个区间写成 \"[lo,hi]\", 相邻区间之间用一个逗号连接, 按 lo 升序;空集合返回 \"[]\"。判题按操作序列调用你的方法, 无返回值的方法期望 null。",
      "mode": "design",
      "entry": {
        "className": "IntervalSet"
      },
      "limits": {
        "timeMs": 6000,
        "memMb": 256
      },
      "ops": [
        [
          "IntervalSet",
          [],
          []
        ],
        [
          "put",
          [
            1,
            3
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "put",
          [
            5,
            7
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "put",
          [
            3,
            5
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "count",
          [],
          []
        ],
        [
          "total",
          [],
          []
        ],
        [
          "describe",
          [],
          []
        ],
        [
          "overlaps",
          [
            2,
            2
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "overlaps",
          [
            8,
            9
          ],
          [
            "int",
            "int"
          ]
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "null",
        "1",
        "7",
        "\"[1,7]\"",
        "true",
        "false"
      ],
      "cmp": "exact",
      "starter": "class IntervalSet {\n    // TODO: 用一个 int[][] 或列表保存互不相交且已合并的区间\n    public IntervalSet() { }\n    public void put(int lo, int hi) { }\n    public boolean overlaps(int lo, int hi) { return false; }\n    public int count() { return 0; }\n    public long total() { return 0L; }\n    public String describe() { return \"\"; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass IntervalSet {\n    private final List<int[]> iv = new ArrayList<>();\n    public IntervalSet() { }\n    public void put(int lo, int hi) {\n        int nl = lo, nh = hi;\n        for (int i = iv.size() - 1; i >= 0; i--) {\n            int[] e = iv.get(i);\n            if (e[0] <= nh + 1L && nl <= e[1] + 1L) {\n                nl = Math.min(nl, e[0]);\n                nh = Math.max(nh, e[1]);\n                iv.remove(i);\n            }\n        }\n        iv.add(new int[]{nl, nh});\n        java.util.Collections.sort(iv, (x, y) -> Integer.compare(x[0], y[0]));\n    }\n    public boolean overlaps(int lo, int hi) {\n        for (int[] e : iv) if (e[0] <= hi && lo <= e[1]) return true;\n        return false;\n    }\n    public int count() { return iv.size(); }\n    public long total() {\n        long s = 0;\n        for (int[] e : iv) s += (long) e[1] - e[0] + 1;\n        return s;\n    }\n    public String describe() {\n        if (iv.isEmpty()) return \"[]\";\n        StringBuilder b = new StringBuilder();\n        for (int i = 0; i < iv.size(); i++) {\n            if (i > 0) b.append(',');\n            b.append('[').append(iv.get(i)[0]).append(',').append(iv.get(i)[1]).append(']');\n        }\n        return b.toString();\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "put 要能合并所有与新区间相交或相邻的旧区间, 合并后整个集合必须两两不相交",
        "合并判定写成 e[0] <= hi && lo <= e[1] 只能处理相交;要点接触也算, 需要放宽一个单位",
        "total 是覆盖的整数个数, 区间 [a,b] 贡献 b-a+1, 加法必须用 long"
      ]
    },
    {
      "id": "ch08-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计不可变复数(操作序列)",
      "tags": [
        "设计",
        "不可变",
        "值对象",
        "double运算"
      ],
      "q": "实现 class Complex:不可变复数。构造区:Complex(double re, double im) 由操作序列第一个操作给出(参数以字符串形式传入, 会被解析成 double)。re()/im() 返回实部虚部;show() 返回形如 \"1.5+2.5i\" 的文本(虚部为负则写成 \"1.5-2.5i\" 这种形式, 虚部为 0 也要照写)。add(double dr, double di) 返回实部加 dr、虚部加 di 的【全新】复数对象, 不修改调用者。mul(double c, double d) 表示与 (c+di) 相乘, 返回新对象。conjugate() 返回共轭(虚部取反)的新对象。norm2() 返回模的平方 re*re+im*im。为了能直接观察到新对象, 还必须实现两个返回文本的便捷方法:addShow(double dr, double di) 返回 add(dr,di).show() 的结果;conjShow() 返回 conjugate().show() 的结果。注意判题只比对能直接序列化的返回值(int/double/boolean/String), 所以返回新对象的 add/mul/conjugate 请同时实现对应的 Show 方法。判题按操作序列调用, 无返回值的方法(void)期望写 null。",
      "mode": "design",
      "entry": {
        "className": "Complex"
      },
      "limits": {
        "timeMs": 6000,
        "memMb": 256
      },
      "ops": [
        [
          "Complex",
          [
            1.5,
            2.5
          ],
          [
            "double",
            "double"
          ]
        ],
        [
          "re",
          [],
          []
        ],
        [
          "im",
          [],
          []
        ],
        [
          "show",
          [],
          []
        ],
        [
          "norm2",
          [],
          []
        ],
        [
          "addShow",
          [
            1,
            -0.5
          ],
          [
            "double",
            "double"
          ]
        ],
        [
          "show",
          [],
          []
        ],
        [
          "re",
          [],
          []
        ],
        [
          "im",
          [],
          []
        ],
        [
          "conjShow",
          [],
          []
        ],
        [
          "show",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "1.5",
        "2.5",
        "\"1.5+2.5i\"",
        "8.5",
        "\"2.5+2.0i\"",
        "\"1.5+2.5i\"",
        "1.5",
        "2.5",
        "\"1.5-2.5i\"",
        "\"1.5+2.5i\""
      ],
      "cmp": "exact",
      "starter": "class Complex {\n    // TODO: 字段 private final double re, im\n    public Complex(double re, double im) { }\n    public double re() { return 0.0; }\n    public double im() { return 0.0; }\n    public String show() { return \"\"; }\n    public String addShow(double dr, double di) { return \"\"; }\n    public String conjShow() { return \"\"; }\n    public double norm2() { return 0.0; }\n}\n\npublic class Main { }\n",
      "solution": "class Complex {\n    private final double re;\n    private final double im;\n    public Complex(double re, double im) { this.re = re; this.im = im; }\n    public double re() { return re; }\n    public double im() { return im; }\n    public String show() { return re + (im < 0 ? \"-\" : \"+\") + Math.abs(im) + \"i\"; }\n    public Complex add(double dr, double di) { return new Complex(re + dr, im + di); }\n    public Complex mul(double c, double d) { return new Complex(re * c - im * d, re * d + im * c); }\n    public Complex conjugate() { return new Complex(re, -im); }\n    public String addShow(double dr, double di) { return add(dr, di).show(); }\n    public String conjShow() { return conjugate().show(); }\n    public double norm2() { return re * re + im * im; }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "add 与 mul 里返回的是 new Complex(...), 不能改 this.re",
        "复数乘法 (a+bi)(c+di) = (ac-bd) + (ad+bc)i",
        "调用 addShow 之后原对象必须原封不动, 所以紧随其后的 re()/im() 仍应是 1.5 与 2.5",
        "show 里虚部要取绝对值后再拼符号, 否则会出现 1.5+-2.5i"
      ]
    },
    {
      "id": "ch08-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS:带强校验的不可变十进制大整数",
      "tags": [
        "设计",
        "不可变",
        "构造器校验",
        "大整数",
        "边界"
      ],
      "q": "实现 class BigDec40 —— 一个定宽十进制大整数(数值部分恰好 40 位), 用于模拟 BigInteger 的核心行为。构造区:BigDec40(String dec), 字符串必须是可选符号(- 或 +)加恰好 40 个数字字符, 否则抛 new IllegalArgumentException(\"bad\")(允许前导零;判题序列第一个操作就是它, 因此这个类只允许存在这一个构造器)。另有静态工厂 fromInt(int v) 用 int 造出定宽对象。str() 返回规范化文本: 40 位数字不足补前导零, 负数整体加前缀 '-'(所以负数是 41 个字符); 数值为 0 时不允许出现 '-', 注意 \"-000...0\" 必须规范成 40 个零。isZero()/isNeg() 判断零与负数。addStr(String dec) 接收同样是 40 位定宽格式的字符串, 返回【新的】定宽对象。cmpInt(int k) 把自身与整数 k 比较, 返回 -1/0/1。addThenStr(String dec) 等价于 addStr(dec).str(), 直接返回新对象的文本。addStr 与 addThenStr 都不得修改调用者自身。判题按操作序列调用, 无返回值期望 null。数值部分必须真的按 40 位存(加法要按位处理进位/借位)。",
      "mode": "design",
      "entry": {
        "className": "BigDec40"
      },
      "limits": {
        "timeMs": 6000,
        "memMb": 256
      },
      "ops": [
        [
          "BigDec40",
          [
            "0000000000000000000000000000000000000001"
          ],
          [
            "String"
          ]
        ],
        [
          "str",
          [],
          []
        ],
        [
          "isNeg",
          [],
          []
        ],
        [
          "cmpInt",
          [
            0
          ],
          [
            "int"
          ]
        ],
        [
          "addThenStr",
          [
            "0000000000000000000000000000000000000002"
          ],
          [
            "String"
          ]
        ],
        [
          "str",
          [],
          []
        ],
        [
          "addThenStr",
          [
            "-0000000000000000000000000000000000000003"
          ],
          [
            "String"
          ]
        ],
        [
          "str",
          [],
          []
        ],
        [
          "isZero",
          [],
          []
        ],
        [
          "cmpInt",
          [
            -1
          ],
          [
            "int"
          ]
        ],
        [
          "addThenStr",
          [
            "0000000000000000000000000000000000000000"
          ],
          [
            "String"
          ]
        ],
        [
          "isNeg",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "\"0000000000000000000000000000000000000001\"",
        "false",
        "1",
        "\"0000000000000000000000000000000000000003\"",
        "\"0000000000000000000000000000000000000001\"",
        "\"-0000000000000000000000000000000000000002\"",
        "\"0000000000000000000000000000000000000001\"",
        "false",
        "1",
        "\"0000000000000000000000000000000000000001\"",
        "false"
      ],
      "cmp": "exact",
      "starter": "class BigDec40 {\n    // TODO: 内部用 40 位的 int[] 存数字, 字段 final; 只保留一个 String 构造器\n    public BigDec40(String dec) { }\n    public static BigDec40 fromInt(int v) { return null; }\n    public String str() { return \"\"; }\n    public boolean isZero() { return true; }\n    public boolean isNeg() { return false; }\n    public BigDec40 addStr(String dec) { return null; }\n    public String addThenStr(String dec) { return \"\"; }\n    public int cmpInt(int k) { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "class BigDec40 {\n    static final int N = 40;\n    private final int[] d = new int[N];\n    private final boolean neg;\n    public BigDec40(String dec) {\n        int i = 0;\n        boolean ng = false;\n        if (dec.startsWith(\"-\") || dec.startsWith(\"+\")) { ng = dec.charAt(0) == '-'; i = 1; }\n        if (dec.length() - i != N) throw new IllegalArgumentException(\"bad\");\n        for (int k = 0; k < N; k++) {\n            char c = dec.charAt(i + k);\n            if (c < '0' || c > '9') throw new IllegalArgumentException(\"bad\");\n            d[k] = c - '0';\n        }\n        this.neg = ng && !allZero(d);\n    }\n    public static BigDec40 fromInt(int v) {\n        long x = Math.abs((long) v);\n        int[] m = new int[N];\n        for (int k = N - 1; k >= 0; k--) { m[k] = (int) (x % 10); x /= 10; }\n        return build(m, v < 0);\n    }\n    private static boolean allZero(int[] a) { for (int x : a) if (x != 0) return false; return true; }\n    private static BigDec40 build(int[] mag, boolean neg) {\n        StringBuilder b = new StringBuilder();\n        if (neg) b.append('-');\n        for (int x : mag) b.append((char) ('0' + x));\n        return new BigDec40(b.toString());\n    }\n    private static int cmpMag(int[] a, int[] b) {\n        for (int i = 0; i < N; i++) if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;\n        return 0;\n    }\n    public String str() {\n        StringBuilder b = new StringBuilder();\n        if (neg) b.append('-');\n        for (int x : d) b.append((char) ('0' + x));\n        return b.toString();\n    }\n    public boolean isZero() { return allZero(d); }\n    public boolean isNeg() { return neg; }\n    private static int[] addMag(int[] a, int[] b) {\n        int[] r = new int[N];\n        int c = 0;\n        for (int i = N - 1; i >= 0; i--) { int s = a[i] + b[i] + c; r[i] = s % 10; c = s / 10; }\n        return r;\n    }\n    private static int[] subMag(int[] a, int[] b) {\n        int[] r = new int[N];\n        int br = 0;\n        for (int i = N - 1; i >= 0; i--) { int s = a[i] - b[i] - br; if (s < 0) { s += 10; br = 1; } else br = 0; r[i] = s; }\n        return r;\n    }\n    public BigDec40 addStr(String dec) {\n        BigDec40 o = new BigDec40(dec);\n        if (neg == o.neg) return build(addMag(d, o.d), neg);\n        int c = cmpMag(d, o.d);\n        if (c == 0) return build(new int[N], false);\n        if (c > 0) return build(subMag(d, o.d), neg);\n        return build(subMag(o.d, d), o.neg);\n    }\n    public int cmpInt(int k) {\n        BigDec40 o = fromInt(k);\n        if (isZero() && o.isZero()) return 0;\n        if (neg != o.neg) return neg ? -1 : 1;\n        int c = cmpMag(d, o.d);\n        return neg ? -c : c;\n    }\n    public String addThenStr(String dec) { return addStr(dec).str(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "用长度 40 的 int[] 从低位到高位存数字, 加减法按位处理进位/借位",
        "符号相同的加法直接加绝对值; 符号不同时先比绝对值再决定谁减谁",
        "str() 里不能只靠内部 sign 字段, 全零结果的符号必须归一化为非负, 否则会多出一个 '-'",
        "cmp 在符号不同时可以直接由符号定胜负, 但要先排除两个都是零的情况"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "BigDec40",
              [
                "0000000000000000000000000000000000000001"
              ],
              [
                "String"
              ]
            ],
            [
              "str",
              [],
              []
            ],
            [
              "isNeg",
              [],
              []
            ],
            [
              "cmpInt",
              [
                0
              ],
              [
                "int"
              ]
            ],
            [
              "addThenStr",
              [
                "0000000000000000000000000000000000000002"
              ],
              [
                "String"
              ]
            ],
            [
              "str",
              [],
              []
            ],
            [
              "addThenStr",
              [
                "-0000000000000000000000000000000000000003"
              ],
              [
                "String"
              ]
            ],
            [
              "str",
              [],
              []
            ],
            [
              "isZero",
              [],
              []
            ],
            [
              "cmpInt",
              [
                -1
              ],
              [
                "int"
              ]
            ],
            [
              "addThenStr",
              [
                "0000000000000000000000000000000000000000"
              ],
              [
                "String"
              ]
            ],
            [
              "isNeg",
              [],
              []
            ]
          ],
          "expect": [
            "null",
            "\"0000000000000000000000000000000000000001\"",
            "false",
            "1",
            "\"0000000000000000000000000000000000000003\"",
            "\"0000000000000000000000000000000000000001\"",
            "\"-0000000000000000000000000000000000000002\"",
            "\"0000000000000000000000000000000000000001\"",
            "false",
            "1",
            "\"0000000000000000000000000000000000000001\"",
            "false"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "BigDec40",
              [
                "-0000000000000000000000000000000000000000"
              ]
            ],
            [
              "str"
            ],
            [
              "isNeg"
            ],
            [
              "isZero"
            ],
            [
              "cmpInt",
              [
                0
              ]
            ],
            [
              "addThenStr",
              [
                "0000000000000000000000000000000000000000"
              ]
            ],
            [
              "addThenStr",
              [
                "-0000000000000000000000000000000000000001"
              ]
            ],
            [
              "isNeg"
            ],
            [
              "str"
            ],
            [
              "cmpInt",
              [
                -2
              ]
            ],
            [
              "addThenStr",
              [
                "0000000000000000000000000000000000000001"
              ]
            ],
            [
              "str"
            ],
            [
              "isZero"
            ]
          ],
          "expect": [
            "null",
            "\"0000000000000000000000000000000000000000\"",
            "false",
            "true",
            "0",
            "\"0000000000000000000000000000000000000000\"",
            "\"-0000000000000000000000000000000000000001\"",
            "false",
            "\"0000000000000000000000000000000000000000\"",
            "1",
            "\"0000000000000000000000000000000000000001\"",
            "\"0000000000000000000000000000000000000000\"",
            "true"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
