window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 11,
  "title": "面向对象高级(多态/抽象类/接口/内部类)",
  "courseRef": "黑马第11章-面向对象高级(11-21 多态/抽象类/接口/JDK8新特性/内部类/匿名内部类)",
  "levels": [
    {
      "id": "ch11-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "接口常量与父类静态成员的隐藏",
      "tags": [
        "接口",
        "静态成员隐藏",
        "编译期绑定"
      ],
      "q": "给定下面这段代码(字段都是静态的, 访问规则同接口常量与父类静态成员):\n\nclass Base { public static String tag() { return \"Base\"; } public String name() { return \"Base\"; } }\nclass Sub extends Base { public static String tag() { return \"Sub\"; } public String name() { return \"Sub\"; } }\n\n实现两个方法:\n1) staticCall(int who): who==0 时用 Base 类型的引用调用静态方法 tag(), 否则用 Sub 类型的引用调用, 返回结果字符串。\n2) polyCall(int who): who==0 时用 Base 引用、who==1 时用 Sub 引用调用实例方法 name(), 返回结果字符串。\n\n约束 0 ≤ who ≤ 1。要求 100% 复现 Java 的真实语义: 静态方法看引用类型(编译期绑定), 实例方法看对象类型(运行期多态)。\n(返回 String 时判题按 Java 字符串字面量形式对比, 等价于返回内容本身, 不影响你写代码。)",
      "mode": "method",
      "entry": {
        "method": "staticCall",
        "params": [
          "int"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String staticCall(int who) {\n        // TODO: who==0 -> 用 Base 引用调用静态 tag(); who==1 -> 用 Sub 引用调用\n        return \"\";\n    }\n    public static String polyCall(int who) {\n        // TODO: who==0 -> Base 引用指向 Sub 对象; who==1 -> Sub 引用\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    static class Base {\n        static String tag() { return \"Base\"; }\n        String name() { return \"Base\"; }\n    }\n    static class Sub extends Base {\n        static String tag() { return \"Sub\"; }\n        String name() { return \"Sub\"; }\n    }\n    public static String staticCall(int who) {\n        if (who == 0) { Base b = new Sub(); return Base.tag(); }\n        Sub s = new Sub(); return Sub.tag();\n    }\n    public static String polyCall(int who) {\n        Base b = who == 0 ? new Base() : new Sub();\n        return b.name();\n    }\n}\n",
      "tests": [
        {
          "name": "静态看引用类型",
          "args": [
            "0"
          ],
          "expect": "\"Base\"",
          "cmp": "exact"
        },
        {
          "name": "静态看引用类型(子类)",
          "args": [
            "1"
          ],
          "expect": "\"Sub\"",
          "cmp": "exact"
        },
        {
          "name": "实例方法走多态(父类对象)",
          "args": [
            "0"
          ],
          "expect": "\"Base\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "静态方法属于类, 编译期就按引用类型决定了调用哪个",
        "实例方法属于对象, 运行期按 new 出来的真实类型决定",
        "Base b = new Sub(); b.tag() 的结果是 Base, b.name() 的结果是 Sub"
      ]
    },
    {
      "id": "ch11-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "抽象类模板方法: 批量计算面积",
      "tags": [
        "抽象类",
        "模板方法",
        "多态"
      ],
      "q": "设计一个抽象类 Shape, 含抽象方法 double area(); 子类 Circle(半径 r)、Rect(宽 w 高 h)、Square(边长 a) 分别实现它。\n\n实现 double totalArea(String kinds, String nums):\n- kinds 与 nums 都以半角逗号分隔且长度相同; kinds 中每个字符 C/R/S 表示一个图形, nums 中对应位置是它的参数(圆 1 个半径, 矩形 2 个宽高, 正方形 1 个边长);\n- 返回所有图形面积之和对 1e-6 的相对误差结果。\n\n约束图形个数 1..100, 参数都在 [0, 1000] 且任何图形的面积都不会超过 1e7。空串表示没有任何图形, 返回 0。圆周率用 Math.PI。",
      "mode": "method",
      "entry": {
        "method": "totalArea",
        "params": [
          "String",
          "String"
        ],
        "ret": "double"
      },
      "starter": "public class Main {\n    static abstract class Shape { abstract double area(); }\n    // TODO: 补 Circle / Rect / Square 三个子类, 再写 totalArea\n    public static double totalArea(String kinds, String nums) {\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    static abstract class Shape { abstract double area(); }\n    static class Circle extends Shape {\n        final double r; Circle(double r) { this.r = r; }\n        double area() { return Math.PI * r * r; }\n    }\n    static class Rect extends Shape {\n        final double w, h; Rect(double w, double h) { this.w = w; this.h = h; }\n        double area() { return w * h; }\n    }\n    static class Square extends Shape {\n        final double a; Square(double a) { this.a = a; }\n        double area() { return a * a; }\n    }\n    public static double totalArea(String kinds, String nums) {\n        if (kinds.isEmpty()) return 0;\n        String[] ks = kinds.split(\",\");\n        String[] ps = nums.split(\",\");\n        java.util.List<Shape> list = new java.util.ArrayList<>();\n        int p = 0;\n        for (int i = 0; i < ks.length; i++) {\n            char k = ks[i].charAt(0);\n            if (k == 'C') { list.add(new Circle(Double.parseDouble(ps[p++]))); }\n            else if (k == 'R') { double w = Double.parseDouble(ps[p++]); double h = Double.parseDouble(ps[p++]); list.add(new Rect(w, h)); }\n            else { list.add(new Square(Double.parseDouble(ps[p++]))); }\n        }\n        double s = 0;\n        for (Shape x : list) s += x.area();\n        return s;\n    }\n}\n",
      "tests": [
        {
          "name": "圆+矩形+正方形",
          "args": [
            "C,R,S",
            "1,2,3,4"
          ],
          "expect": "25.141592653589793",
          "cmp": "float"
        },
        {
          "name": "两个正方形",
          "args": [
            "S,S",
            "2,3"
          ],
          "expect": "13.0",
          "cmp": "float"
        },
        {
          "name": "全为矩形",
          "args": [
            "R,R",
            "1,1,2,2"
          ],
          "expect": "5.0",
          "cmp": "float"
        },
        {
          "name": "空串无图形",
          "args": [
            "",
            ""
          ],
          "expect": "0.0",
          "cmp": "float",
          "hidden": true
        },
        {
          "name": "零半径与零边长",
          "args": [
            "C,S",
            "0,0"
          ],
          "expect": "0.0",
          "cmp": "float",
          "hidden": true
        }
      ],
      "hints": [
        "抽象类只是把 area() 的实现推迟到子类, 多态调用它时写法完全一样",
        "nums 的游标要按图形类型消耗 1 个或 2 个参数, 不能一个图形固定取一个",
        "答案用 cmp:float 比较, 不需要自己做四舍五入"
      ]
    },
    {
      "id": "ch11-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "静态内部类实现二维点排序",
      "tags": [
        "静态内部类",
        "Comparable",
        "排序"
      ],
      "q": "在类的内部定义一个静态内部类 Point(字段 int x, int y, 含构造方法与 getter), 让它实现 Comparable<Point>: 先按 x 升序, x 相同时按 y 升序。\n\n实现 String sortPoints(int[][] pts): 把每个点格式化成 \"(x,y)\", 按上述顺序排序后用逗号连接返回; 空数组返回空串。\n\n约束点数 0 ≤ n ≤ 1000, 坐标在 [-1000, 1000]。",
      "mode": "method",
      "entry": {
        "method": "sortPoints",
        "params": [
          "int[][]"
        ],
        "ret": "String"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    static class Point {\n        // TODO: 补 x/y 字段、构造方法、getter, 并让它实现 Comparable<Point>\n    }\n    public static String sortPoints(int[][] pts) {\n        return \"\";\n    }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    static class Point implements Comparable<Point> {\n        private final int x, y;\n        Point(int x, int y) { this.x = x; this.y = y; }\n        public int getX() { return x; }\n        public int getY() { return y; }\n        public int compareTo(Point o) {\n            if (x != o.x) return Integer.compare(x, o.x);\n            return Integer.compare(y, o.y);\n        }\n        public String toString() { return \"(\" + x + \",\" + y + \")\"; }\n    }\n    public static String sortPoints(int[][] pts) {\n        Point[] a = new Point[pts.length];\n        for (int i = 0; i < pts.length; i++) a[i] = new Point(pts[i][0], pts[i][1]);\n        Arrays.sort(a);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(','); sb.append(a[i]); }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "2,1;1,2;1,1"
          ],
          "expect": "\"(1,1),(1,2),(2,1)\"",
          "cmp": "exact"
        },
        {
          "name": "单点",
          "args": [
            "5,5"
          ],
          "expect": "\"(5,5)\"",
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
          "name": "负坐标与重复点",
          "args": [
            "-1,0;-1,-1;0,-5"
          ],
          "expect": "\"(-1,-1),(-1,0),(0,-5)\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "二维数组参数的行用分号、列用逗号编码, 例如 \"2,1;1,2\" 是两个点",
        "compareTo 里不要写 x - o.x 之外就忘了 y, 更不要用相减的 int 溢出写法",
        "静态内部类不依赖外部类实例, 可以直接 new Main.Point(...)"
      ]
    },
    {
      "id": "ch11-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "迭代器实现去重收集",
      "tags": [
        "Iterable",
        "Iterator",
        "内部类",
        "去重"
      ],
      "q": "实现一个内部类 UniqueBag(位于 Main 内部) 去承载数据, 它 implements Iterable<Integer>:\n- void add(int v) 允许重复加入;\n- 用匿名内部类(或内部类)实现迭代器, 迭代时跳过与上一个已产出元素相同的值(数据按加入顺序存储, 只做相邻去重)。\n\n再用增强 for 遍历它, 把每个元素追加到 StringBuilder 并用逗号连接, 由 String collect(int[] src) 返回。\n\n约束 0 ≤ n ≤ 1e5, 元素 |v| ≤ 1e9。src 为空返回空串, 例如 [1,1,2,1] 返回 \"1,2,1\"。",
      "mode": "method",
      "entry": {
        "method": "collect",
        "params": [
          "int[]"
        ],
        "ret": "String"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    static class UniqueBag implements Iterable<Integer> {\n        // TODO: 用 int[]/ArrayList 存数据, add(int v) 追加\n        public void add(int v) { }\n        public Iterator<Integer> iterator() { return null; }\n    }\n    public static String collect(int[] src) {\n        return \"\";\n    }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    static class UniqueBag implements Iterable<Integer> {\n        private final List<Integer> data = new ArrayList<>();\n        public void add(int v) { data.add(v); }\n        public Iterator<Integer> iterator() {\n            return new Iterator<Integer>() {\n                private int i = 0;\n                public boolean hasNext() { return i < data.size(); }\n                public Integer next() {\n                    int v = data.get(i); i++;\n                    while (i < data.size() && data.get(i) == v) i++;\n                    return v;\n                }\n            };\n        }\n    }\n    public static String collect(int[] src) {\n        UniqueBag bag = new UniqueBag();\n        for (int v : src) bag.add(v);\n        StringBuilder sb = new StringBuilder();\n        for (int v : bag) {\n            if (sb.length() > 0) sb.append(',');\n            sb.append(v);\n        }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "相邻去重",
          "args": [
            "1,1,2,1"
          ],
          "expect": "\"1,2,1\"",
          "cmp": "exact"
        },
        {
          "name": "无重复",
          "args": [
            "3,1,4"
          ],
          "expect": "\"3,1,4\"",
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
          "name": "全部相同",
          "args": [
            "7,7,7,7"
          ],
          "expect": "\"7\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "实现 Iterable 后就能用增强 for, 关键是 iterator() 返回一个状态正确的迭代器",
        "跳重复要在 next() 里推进游标, 不要在 hasNext() 里改变状态",
        "Integer 的 == 只能比较 -128..127 的小整数缓存, 比较值请用 int 拆箱"
      ]
    },
    {
      "id": "ch11-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "Comparator 多级排序规格",
      "tags": [
        "Comparator",
        "匿名内部类",
        "多级排序"
      ],
      "q": "给定二维数组 rows, 每行是一个记录 [id, age, score]。按规格 spec 排序后返回 id 序列:\n- spec 以半角逗号分隔若干键, 每个键形如 \"字段:方向\", 字段取 id/age/score, 方向取 a(升序)或 d(降序);\n- 先按第一个键分组比较, 相等时再看第二个键; 为覆盖全部情况, 规格中 id 键总会出现。\n\n返回排序后各记录 id 用逗号拼接的字符串; 空数组返回空串。\n约束行数 0 ≤ n ≤ 1e5, age/score 在 [0, 1e4], id 互不相同。",
      "mode": "method",
      "entry": {
        "method": "sortBy",
        "params": [
          "int[][]",
          "String"
        ],
        "ret": "String"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static String sortBy(int[][] rows, String spec) {\n        // TODO: 用 Comparator 链式比较(Comparator.comparingInt / thenComparing)\n        return \"\";\n    }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static String sortBy(int[][] rows, String spec) {\n        int[][] a = rows.clone();\n        final String[] keys = spec.split(\",\");\n        Comparator<int[]> cmp = null;\n        for (String k : keys) {\n            String[] p = k.split(\":\");\n            final int idx = p[0].equals(\"id\") ? 0 : (p[0].equals(\"age\") ? 1 : 2);\n            final boolean asc = p[1].equals(\"a\");\n            Comparator<int[]> cur = new Comparator<int[]>() {\n                public int compare(int[] x, int[] y) {\n                    int r = Integer.compare(x[idx], y[idx]);\n                    return asc ? r : -r;\n                }\n            };\n            cmp = cmp == null ? cur : cmp.thenComparing(cur);\n        }\n        Arrays.sort(a, cmp);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(','); sb.append(a[i][0]); }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "按分数降序",
          "args": [
            "1,20,90;2,19,95;3,21,90",
            "score:d"
          ],
          "expect": "\"2,1,3\"",
          "cmp": "exact"
        },
        {
          "name": "年龄升序后按分数降序",
          "args": [
            "1,20,80;2,20,90;3,19,70",
            "age:a,score:d"
          ],
          "expect": "\"3,2,1\"",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            "",
            "id:a"
          ],
          "expect": "\"\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "三键混合",
          "args": [
            "1,20,80;2,20,80;3,19,99",
            "score:d,age:a,id:d"
          ],
          "expect": "\"3,2,1\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "多级排序就是把若干个\"单键比较\"按优先级串起来，先写好每一级再拼接",
        "多级比较用 thenComparing 串起来, 先写好单键再拼接",
        "Comparator.comparingInt(r -> r[1]).reversed() 只反转当前这一段, 不要整体 reversed()",
        "排序会改动数组, 建议先 clone 或用包装对象"
      ]
    },
    {
      "id": "ch11-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "匿名内部类实现策略选择",
      "tags": [
        "匿名内部类",
        "策略模式",
        "多态"
      ],
      "q": "定义函数式接口(只有一个抽象方法) Op { int apply(int a, int b); }, 实现方法 choose(String name):\n- \"add\" -> a+b, \"sub\" -> a-b, \"mul\" -> a*b, \"max\" -> a 与 b 的较大者, \"min\" -> 较小者;\n- 其它名字一律返回 \"unknown\";\n要求每个策略都用**匿名内部类**在方法内现场创建(不允许用 if/else 直接算结果)。\n\n返回格式固定为 \"名字=结果\", 例如 choose(\"add\",2,3) 返回 \"add=5\", choose(\"x\",1,2) 返回 \"unknown\"。\n约束 |a|,|b| ≤ 1e5。",
      "mode": "method",
      "entry": {
        "method": "choose",
        "params": [
          "String",
          "int",
          "int"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    interface Op { int apply(int a, int b); }\n    public static String choose(String name, int a, int b) {\n        // TODO: 用匿名内部类 new Op(){ ... } 分别实现五种策略\n        return \"unknown\";\n    }\n}\n",
      "solution": "public class Main {\n    interface Op { int apply(int a, int b); }\n    public static String choose(String name, int a, int b) {\n        Op op = null;\n        if (name.equals(\"add\")) op = new Op() { public int apply(int a, int b) { return a + b; } };\n        else if (name.equals(\"sub\")) op = new Op() { public int apply(int a, int b) { return a - b; } };\n        else if (name.equals(\"mul\")) op = new Op() { public int apply(int a, int b) { return a * b; } };\n        else if (name.equals(\"max\")) op = new Op() { public int apply(int a, int b) { return Math.max(a, b); } };\n        else if (name.equals(\"min\")) op = new Op() { public int apply(int a, int b) { return Math.min(a, b); } };\n        else return \"unknown\";\n        return name + \"=\" + op.apply(a, b);\n    }\n}\n",
      "tests": [
        {
          "name": "加法",
          "args": [
            "add",
            "2",
            "3"
          ],
          "expect": "\"add=5\"",
          "cmp": "exact"
        },
        {
          "name": "乘法负数",
          "args": [
            "mul",
            "-4",
            "5"
          ],
          "expect": "\"mul=-20\"",
          "cmp": "exact"
        },
        {
          "name": "未知策略",
          "args": [
            "div",
            "1",
            "2"
          ],
          "expect": "\"unknown\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "相等时取最值",
          "args": [
            "max",
            "7",
            "7"
          ],
          "expect": "\"max=7\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "匿名内部类的写法是 new 接口名(){ 实现抽象方法 }; 后面记得分号",
        "把策略赋值给接口类型的变量, 调用时就是多态分发",
        "名字不认识时直接返回 \"unknown\", 不要抛异常"
      ]
    },
    {
      "id": "ch11-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "抽象类变长参数批量统计",
      "tags": [
        "抽象类",
        "变长参数",
        "多态"
      ],
      "q": "定义抽象类 Stat, 含抽象方法 double avg(int[] a); 子类 Mean(算术平均)、Median(中位数)、Range(最大值减最小值)分别实现 (它们都 implements Average, 以便用接口类型接收)。\n\n实现 double stat(String kind, int... nums): 按 kind 选择统计器并返回结果。\n- kind 只可能是 \"mean\"/\"median\"/\"range\";\n- 空数组或 null 一律返回 0;\n- 偶数个元素的中位数取中间两个数的算术平均。\n\n约束元素个数 0 ≤ n ≤ 1e5, |nums[i]| ≤ 1e9。",
      "mode": "method",
      "entry": {
        "method": "stat",
        "params": [
          "String",
          "int[]"
        ],
        "ret": "double"
      },
      "starter": "public class Main {\n    interface Average { double avg(int[] a); }\n    static abstract class Stat implements Average { }\n    // TODO: 补 Mean / Median / Range, 再写 stat\n    public static double stat(String kind, int[] nums) {\n        return 0;\n    }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    interface Average { double avg(int[] a); }\n    static abstract class Stat implements Average { }\n    static class Mean extends Stat {\n        public double avg(int[] a) { if (a == null || a.length == 0) return 0; double s = 0; for (int x : a) s += x; return s / a.length; }\n    }\n    static class Median extends Stat {\n        public double avg(int[] a) {\n            if (a == null || a.length == 0) return 0;\n            int[] b = a.clone(); Arrays.sort(b);\n            int n = b.length;\n            if (n % 2 == 1) return b[n / 2];\n            return (b[n / 2 - 1] + b[n / 2]) / 2.0;\n        }\n    }\n    static class Range extends Stat {\n        public double avg(int[] a) {\n            if (a == null || a.length == 0) return 0;\n            int mn = a[0], mx = a[0];\n            for (int x : a) { if (x < mn) mn = x; if (x > mx) mx = x; }\n            return (double) mx - mn;\n        }\n    }\n    public static double stat(String kind, int[] nums) {\n        Average s;\n        if (kind.equals(\"mean\")) s = new Mean();\n        else if (kind.equals(\"median\")) s = new Median();\n        else s = new Range();\n        return s.avg(nums);\n    }\n}\n",
      "tests": [
        {
          "name": "平均值",
          "args": [
            "mean",
            "1,2,3,4"
          ],
          "expect": "2.5",
          "cmp": "float"
        },
        {
          "name": "奇数个数的中位数",
          "args": [
            "median",
            "3,1,2"
          ],
          "expect": "2.0",
          "cmp": "float"
        },
        {
          "name": "偶数个数的中位数",
          "args": [
            "median",
            "1,2,3,4"
          ],
          "expect": "2.5",
          "cmp": "float",
          "hidden": true
        },
        {
          "name": "极差",
          "args": [
            "range",
            "-5,5,0"
          ],
          "expect": "10.0",
          "cmp": "float"
        },
        {
          "name": "空数组",
          "args": [
            "median",
            ""
          ],
          "expect": "0.0",
          "cmp": "float",
          "hidden": true
        }
      ],
      "hints": [
        "变长参数在判题里仍然按 int[] 传入, 声明成 int[] nums 也能正确接收",
        "中位数必须先去重排序(其实是排序但保留重复), 不要用 Set 去重",
        "偶数长度取 (b[n/2-1] + b[n/2]) / 2.0, 写成 /2 会整除截断"
      ]
    },
    {
      "id": "ch11-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "JDK8 接口默认方法链式处理",
      "tags": [
        "JDK8",
        "默认方法",
        "静态接口方法",
        "Function"
      ],
      "q": "定义一个接口 Chain, 含:\n- 抽象方法 int apply(int x);\n- 默认方法 Chain andThen(Chain next): 返回一个新的 Chain, 先调用当前 apply 再把结果交给 next.apply;\n- 静态方法 of(String kind): 按名字返回内置实现 (\"inc\" -> x+1, \"double\" -> 2x, \"square\" -> x*x, \"neg\" -> -x)。\n\n实现 String run(int start, String ops): ops 是半角逗号分隔的名字列表, 依次串联成一条链, 从 start 出发算出最终结果并返回其十进制字符串。\n\n约束 ops 中名字只会是上面四种, 个数 0 ≤ k ≤ 20, |start| ≤ 1e6, 中间结果不会超出 int 范围。ops 为空串表示不加任何处理, 直接返回 start。",
      "mode": "method",
      "entry": {
        "method": "run",
        "params": [
          "int",
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    interface Chain {\n        int apply(int x);\n        default Chain andThen(Chain next) {\n            // TODO: 返回一个把两个实现串起来的新 Chain\n            return null;\n        }\n        static Chain of(String kind) {\n            // TODO: 按名字返回实现\n            return null;\n        }\n    }\n    public static String run(int start, String ops) {\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    interface Chain {\n        int apply(int x);\n        default Chain andThen(Chain next) {\n            return new Chain() { public int apply(int x) { return next.apply(Chain.this.apply(x)); } };\n        }\n        static Chain of(String kind) {\n            if (kind.equals(\"inc\")) return new Chain() { public int apply(int x) { return x + 1; } };\n            if (kind.equals(\"double\")) return new Chain() { public int apply(int x) { return x * 2; } };\n            if (kind.equals(\"square\")) return new Chain() { public int apply(int x) { return x * x; } };\n            return new Chain() { public int apply(int x) { return -x; } };\n        }\n    }\n    public static String run(int start, String ops) {\n        if (ops.isEmpty()) return String.valueOf(start);\n        Chain c = null;\n        for (String s : ops.split(\",\")) {\n            Chain cur = Chain.of(s);\n            c = (c == null) ? cur : c.andThen(cur);\n        }\n        return String.valueOf(c.apply(start));\n    }\n}\n",
      "tests": [
        {
          "name": "加一再翻倍",
          "args": [
            "3",
            "inc,double"
          ],
          "expect": "\"8\"",
          "cmp": "exact"
        },
        {
          "name": "翻倍再加一",
          "args": [
            "3",
            "double,inc"
          ],
          "expect": "\"7\"",
          "cmp": "exact"
        },
        {
          "name": "空链",
          "args": [
            "42",
            ""
          ],
          "expect": "\"42\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负数平方取反",
          "args": [
            "-3",
            "square,neg"
          ],
          "expect": "\"-9\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "默认方法可以调用抽象方法, 它就是给接口加能力而不破坏已有实现",
        "串联顺序很关键: andThen 的语义是先执行自己再把结果交给下一个",
        "接口里的静态方法用 接口名.of(...) 调用, 不能通过实现类实例调用"
      ]
    },
    {
      "id": "ch11-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "内部类模拟继承链的构造顺序",
      "tags": [
        "内部类",
        "构造顺序",
        "super"
      ],
      "q": "用内部类模拟一条继承链 A -> B -> C: 创建 A 的对象只打印 \"A\"; 创建 B 的对象会先打印父类再打印自己, 即 \"AB\"; 创建 C 的对象是 \"ABC\"。\n\n实现 String build(String layers, String log), layers 是用半角逗号分隔的构建指令序列, 规则如下:\n- 先把 log 原样写入结果;\n- 然后追加字符串 \"INIT\";\n- 再按 layers 的顺序处理每个指令: \"A\" 追加 \"A\", \"B\" 追加 \"AB\", \"C\" 追加 \"ABC\", \"ReB\" 追加 \"A\"(表示变量声明为 A 类型但对象是 B);\n- 最后照原样再重放一遍整条序列(模拟第二次构建), 也就是再追加一遍全部标记。\n\n指令只可能是上面四种, 个数 0 ≤ n ≤ 1e4; log 长度 ≤ 1e4。layers 为空串表示没有任何指令, 此时只返回 log + \"INIT\"。例如 build(\"A\", \">\") 返回 \">INITAA\"。",
      "mode": "method",
      "entry": {
        "method": "build",
        "params": [
          "String",
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String build(String layers, String log) {\n        StringBuilder sb = new StringBuilder(log);\n        // TODO: 追加 INIT, 再正序重放两遍标记\n        return sb.toString();\n    }\n}\n",
      "solution": "public class Main {\n    public static String build(String layers, String log) {\n        StringBuilder sb = new StringBuilder(log);\n        sb.append(\"INIT\");\n        String[] arr = layers.isEmpty() ? new String[0] : layers.split(\",\");\n        for (int round = 0; round < 2; round++) {\n            for (String s : arr) {\n                if (s.equals(\"A\")) sb.append(\"A\");\n                else if (s.equals(\"B\")) sb.append(\"AB\");\n                else if (s.equals(\"C\")) sb.append(\"ABC\");\n                else sb.append(\"A\");\n            }\n        }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "单层A",
          "args": [
            "A",
            ">"
          ],
          "expect": "\">INITAA\"",
          "cmp": "exact"
        },
        {
          "name": "两层",
          "args": [
            "A,C",
            ">"
          ],
          "expect": "\">INITAABCAABC\"",
          "cmp": "exact"
        },
        {
          "name": "空指令序列",
          "args": [
            "",
            ">"
          ],
          "expect": "\">INIT\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "引用类型B",
          "args": [
            "ReB,B",
            ">"
          ],
          "expect": "\">INITAABAAB\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "layers 用半角逗号分隔, 空串要单独判断, 否则 split 会得到 [\"\"]",
        "把每种指令的标记串在一个表里对号入座, 不要写成一串 if 嵌套",
        "外层再套一层 2 次的循环就完成了重放, 注意 log 只写一次"
      ]
    },
    {
      "id": "ch11-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "自定义比较器排序正确性对拍",
      "tags": [
        "Comparator",
        "稳定排序",
        "随机对拍"
      ],
      "q": "给定 int[][] rows, 每行是 [id, key]: 请按 key 升序排序, key 相同时按原下标(输入顺序)升序保持**稳定**。返回排序后 id 组成的 int[]。\n\n约束行数 0 ≤ n ≤ 2000, 0 ≤ id, key ≤ 1e6。输入允许 id 重复, 输出必须与稳定排序完全一致。\n本题使用随机对拍: 你的实现会与参考实现在 400 组随机数据上逐位比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[][]"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static int[] solve(int[][] rows) {\n        // TODO: 用带下标的包装对象 + Comparator, 或 Arrays.sort 稳定版本\n        return new int[0];\n    }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static int[] solve(int[][] rows) {\n        Integer[] idx = new Integer[rows.length];\n        for (int i = 0; i < idx.length; i++) idx[i] = i;\n        Arrays.sort(idx, new Comparator<Integer>() {\n            public int compare(Integer a, Integer b) {\n                int r = Integer.compare(rows[a][1], rows[b][1]);\n                return r != 0 ? r : Integer.compare(a, b);\n            }\n        });\n        int[] out = new int[rows.length];\n        for (int i = 0; i < out.length; i++) out[i] = rows[idx[i]][0];\n        return out;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,5;2,3;3,5"
          ],
          "expect": "[2,1,3]",
          "cmp": "exact"
        },
        {
          "name": "单行",
          "args": [
            "9,0"
          ],
          "expect": "[9]",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全同key保序",
          "args": [
            "7,1;8,1;9,1"
          ],
          "expect": "[7,8,9]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 400,
        "seed": 20261101,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(9); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)59); b.append(r.nextInt(6)); b.append((char)44); b.append(r.nextInt(4)); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static int[] solve(int[][] rows){ int n=rows.length; int[] idx=new int[n]; for(int i=0;i<n;i++) idx[i]=i; for(int i=1;i<n;i++){ int v=idx[i], j=i-1; while(j>=0 && rows[idx[j]][1]>rows[v][1]){ idx[j+1]=idx[j]; j--; } idx[j+1]=v; } int[] out=new int[n]; for(int i=0;i<n;i++) out[i]=rows[idx[i]][0]; return out; } }"
      },
      "hints": [
        "Arrays.sort(Object[]) 是稳定排序, 但 Arrays.sort(int[][], Comparator) 的比较器必须自己保证 tie-break",
        "把原下标当第二关键字, 结果自然与稳定排序一致",
        "不要直接对 rows 原地排序后只输出 id, 那样会丢失稳定性"
      ]
    },
    {
      "id": "ch11-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "策略切换结果一致性对拍",
      "tags": [
        "策略模式",
        "对拍",
        "边界"
      ],
      "q": "实现 int[] solve(String op, int a, int b, int c): 按策略名对三个整数做运算, 返回长度为 2 的数组 {正常结果, 饱和结果}:\n- \"max\"   -> 三者最大值\n- \"min\"   -> 三者最小值\n- \"mid\"   -> 三者中位数(排序后取中间)\n- \"sum\"   -> 三者之和\n- \"spread\"-> 最大值减最小值\n\n饱和结果 = 把正常结果限制在 int 范围(超出上界取 Integer.MAX_VALUE, 低于下界取 Integer.MIN_VALUE)。\n\n约束 0 ≤ |a|,|b|,|c| ≤ 1e9, op 只会是上面五种。\n本题使用随机对拍: 你的实现会与参考实现在 400 组随机数据上比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "String",
          "int",
          "int",
          "int"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] solve(String op, int a, int b, int c) {\n        // TODO: 用策略接口 + 匿名内部类/内部类分派, 再统一做饱和处理\n        return new int[]{0, 0};\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] solve(String op, int a, int b, int c) {\n        long lv;\n        if (op.equals(\"max\")) lv = Math.max(a, Math.max(b, c));\n        else if (op.equals(\"min\")) lv = Math.min(a, Math.min(b, c));\n        else if (op.equals(\"mid\")) { long mx = Math.max(a, Math.max(b, c)), mn = Math.min(a, Math.min(b, c)); lv = (long) a + b + c - mx - mn; }\n        else if (op.equals(\"sum\")) lv = (long) a + b + c;\n        else lv = (long) Math.max(a, Math.max(b, c)) - Math.min(a, Math.min(b, c));\n        int normal = (int) lv;                       // 正常结果按 int 语义(允许溢出)\n        int sat = lv > Integer.MAX_VALUE ? Integer.MAX_VALUE : (lv < Integer.MIN_VALUE ? Integer.MIN_VALUE : (int) lv);\n        return new int[]{ normal, sat };\n    }\n}\n",
      "tests": [
        {
          "name": "三元求和",
          "args": [
            "sum",
            "1000000000",
            "1000000000",
            "1000000000"
          ],
          "expect": "[-1294967296,2147483647]",
          "cmp": "exact"
        },
        {
          "name": "中位数",
          "args": [
            "mid",
            "3",
            "1",
            "2"
          ],
          "expect": "[2,2]",
          "cmp": "exact"
        },
        {
          "name": "极差",
          "args": [
            "spread",
            "-1000000000",
            "0",
            "1000000000"
          ],
          "expect": "[2000000000,2000000000]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "最小值负数",
          "args": [
            "min",
            "-5",
            "-9",
            "-1"
          ],
          "expect": "[-9,-9]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 400,
        "seed": 20261102,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ String[] ops={\"max\",\"min\",\"mid\",\"sum\",\"spread\"}; String op=ops[r.nextInt(5)]; int a=r.nextInt(2001)-1000, b=r.nextInt(2001)-1000, c=r.nextInt(2001)-1000; if(r.nextInt(4)==0){ int big=r.nextInt(2)==0?1000000000:-1000000000; if(r.nextInt(2)==0) a=big; else b=big; } return new String[]{ op, String.valueOf(a), String.valueOf(b), String.valueOf(c) }; } }",
        "ref": "public class Ref { public static int[] solve(String op, int a, int b, int c){\n  long lv;\n  if(op.equals(\"max\")) lv=Math.max(a,Math.max(b,c));\n  else if(op.equals(\"min\")) lv=Math.min(a,Math.min(b,c));\n  else if(op.equals(\"mid\")){ long mx=Math.max(a,Math.max(b,c)), mn=Math.min(a,Math.min(b,c)); lv=(long)a+b+c-mx-mn; }\n  else if(op.equals(\"sum\")) lv=(long)a+b+c;\n  else lv=(long)Math.max(a,Math.max(b,c))-Math.min(a,Math.min(b,c));\n  int normal=(int)lv;\n  int sat = lv>Integer.MAX_VALUE ? Integer.MAX_VALUE : (lv<Integer.MIN_VALUE ? Integer.MIN_VALUE : (int)lv);\n  return new int[]{ normal, sat };\n} }"
      },
      "hints": [
        "正常结果故意保留 int 溢出, 饱和结果才做截断, 两者必须分别返回",
        "中位数用 a+b+c-最大值-最小值, 注意这个式子同样会溢出",
        "饱和判断用 long 承接后再比较, 不要用 Math.abs"
      ]
    },
    {
      "id": "ch11-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "迭代器语义与相邻去重对拍",
      "tags": [
        "Iterator",
        "去重",
        "随机对拍"
      ],
      "q": "实现 int[] solve(int[] a): 返回按输入顺序去掉了**连续重复**元素后的数组。\n例如 [1,1,2,1] -> [1,2,1]; [5,5,5] -> [5]; 空数组 -> 空数组。\n\n约束 0 ≤ n ≤ 5000, 元素 |a[i]| ≤ 1e9。\n本题使用随机对拍: 你的实现会与参考实现在 400 组随机数据上比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[]"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] solve(int[] a) {\n        // TODO: 相邻比较, 相同就跳过; 不要用 Set 全局去重\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] solve(int[] a) {\n        java.util.List<Integer> out = new java.util.ArrayList<>();\n        for (int i = 0; i < a.length; i++) {\n            if (i == 0 || a[i] != a[i - 1]) out.add(a[i]);\n        }\n        int[] r = new int[out.size()];\n        for (int i = 0; i < r.length; i++) r[i] = out.get(i);\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,1,2,1"
          ],
          "expect": "[1,2,1]",
          "cmp": "exact"
        },
        {
          "name": "无重复",
          "args": [
            "1,2,3"
          ],
          "expect": "[1,2,3]",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全部相同",
          "args": [
            "9,9,9"
          ],
          "expect": "[9]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 400,
        "seed": 20261103,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(10); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(4)); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static int[] solve(int[] a){ if(a.length==0) return new int[0]; int n=1; for(int i=1;i<a.length;i++) if(a[i]!=a[i-1]) n++; int[] r=new int[n]; int k=0; for(int i=0;i<a.length;i++){ if(i==0||a[i]!=a[i-1]) r[k++]=a[i]; } return r; } }"
      },
      "hints": [
        "只跳过与**前一个元素**相同的值, 全局去重会得到错误答案",
        "先统计长度再开数组, 或用 ArrayList 收集后转换",
        "空数组是必须处理的边界, 不要访问 a[0]"
      ]
    },
    {
      "id": "ch11-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计策略计算器 StrategyCalc",
      "tags": [
        "设计",
        "策略模式",
        "函数式接口"
      ],
      "q": "在同一文件中实现 class StrategyCalc(不要改类名, public class Main 保留占位):\n- void setOp(String name): 切换当前策略, 支持 \"add\"/\"sub\"/\"mul\"/\"neg\"; 未注册的名字忽略本次设置(保持原策略);\n- long calc(int a, int b): 用当前策略计算, 初始策略是 \"add\"; \"neg\" 只对 a 取负; 使用 long 运算避免溢出;\n- String dump(): 返回 \"当前策略名:上一次结果\", 若尚未调用过 calc 则上一次结果为 0。\n\n判题按操作序列调用, 无返回值的操作期望 null。",
      "mode": "design",
      "entry": {
        "className": "StrategyCalc"
      },
      "ops": [
        [
          "StrategyCalc",
          [],
          []
        ],
        [
          "setOp",
          [
            "add"
          ],
          [
            "String"
          ]
        ],
        [
          "calc",
          [
            2,
            3
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "dump",
          [],
          []
        ],
        [
          "setOp",
          [
            "sub"
          ],
          [
            "String"
          ]
        ],
        [
          "calc",
          [
            2,
            3
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "setOp",
          [
            "bad"
          ],
          [
            "String"
          ]
        ],
        [
          "dump",
          [],
          []
        ],
        [
          "setOp",
          [
            "neg"
          ],
          [
            "String"
          ]
        ],
        [
          "calc",
          [
            7,
            0
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "dump",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "null",
        "5",
        "\"add:5\"",
        "null",
        "-1",
        "null",
        "\"sub:-1\"",
        "null",
        "-7",
        "\"neg:-7\""
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass StrategyCalc {\n    // TODO: 用 Map<String, 函数式接口> 注册策略, 记录当前策略名与上一次结果\n    public void setOp(String name) { }\n    public long calc(int a, int b) { return 0L; }\n    public String dump() { return \"\"; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass StrategyCalc {\n    private interface Op { long apply(int a, int b); }\n    private final Map<String, Op> ops = new HashMap<>();\n    private String cur = \"add\";\n    private long last = 0L;\n    StrategyCalc() {\n        ops.put(\"add\", (a, b) -> (long) a + b);\n        ops.put(\"sub\", (a, b) -> (long) a - b);\n        ops.put(\"mul\", (a, b) -> (long) a * b);\n        ops.put(\"neg\", (a, b) -> -(long) a);\n    }\n    public void setOp(String name) { if (ops.containsKey(name)) cur = name; }\n    public long calc(int a, int b) { last = ops.get(cur).apply(a, b); return last; }\n    public String dump() { return cur + \":\" + last; }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "策略表用 Map<String, 函数式接口>, setOp 只做注册表命中判断",
        "未注册的策略名要忽略, 不能把当前策略改成 null",
        "String 返回值会被序列化成带双引号的形态, 所以 expect 里写 \\\"add:5\\\" 这种写法"
      ]
    },
    {
      "id": "ch11-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计插件式处理器注册表 PluginRegistry",
      "tags": [
        "注册表",
        "接口多态",
        "异常隔离"
      ],
      "q": "在同一文件中实现 class PluginRegistry(保留 public class Main 占位), 这是一个插件式处理器注册表:\n- void register(String name, String kind): 按名字注册一个处理器(kind 取 \"upper\"/\"length\"/\"boom\"), 同名注册直接覆盖, 不报错;\n- String execute(String name, String arg): 取出处理器并调用它; 未注册的名字返回 \"no-plugin:名字\"; 处理器内部抛出的任何异常都要被捕获, 返回 \"error:异常类简单名\";\n- int size(): 返回当前注册表里的处理器个数。\n\n处理器语义: \"upper\" 返回 arg 的大写; \"length\" 返回 arg 的长度(十进制字符串); \"boom\" 抛 IllegalStateException。\n判题按操作序列调用, 无返回值的操作期望 null, String 返回值在 expect 里带双引号。",
      "mode": "design",
      "entry": {
        "className": "PluginRegistry"
      },
      "ops": [
        [
          "PluginRegistry",
          [],
          []
        ],
        [
          "register",
          [
            "up",
            "upper"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "register",
          [
            "len",
            "length"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "execute",
          [
            "up",
            "hello"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "execute",
          [
            "len",
            "hello"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "execute",
          [
            "missing",
            "x"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "register",
          [
            "boom",
            "boom"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "execute",
          [
            "boom",
            "x"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "size",
          [],
          []
        ],
        [
          "register",
          [
            "up",
            "length"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "execute",
          [
            "up",
            "hello"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "size",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "\"HELLO\"",
        "\"5\"",
        "\"no-plugin:missing\"",
        "null",
        "\"error:IllegalStateException\"",
        "3",
        "null",
        "\"5\"",
        "3"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass PluginRegistry {\n    // TODO: 定义 Handler 接口与三种实现, 用 Map<String, Handler> 保存\n    public void register(String name, String kind) { }\n    public String execute(String name, String arg) { return \"\"; }\n    public int size() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass PluginRegistry {\n    interface Handler { String handle(String s); }\n    static class Upper implements Handler { public String handle(String s) { return s.toUpperCase(); } }\n    static class Length implements Handler { public String handle(String s) { return String.valueOf(s.length()); } }\n    static class Boom implements Handler { public String handle(String s) { throw new IllegalStateException(\"boom\"); } }\n    private final Map<String, Handler> map = new LinkedHashMap<>();\n    static Handler make(String kind) {\n        if (kind.equals(\"upper\")) return new Upper();\n        if (kind.equals(\"length\")) return new Length();\n        return new Boom();\n    }\n    public void register(String name, String kind) { map.put(name, make(kind)); }\n    public String execute(String name, String arg) {\n        Handler h = map.get(name);\n        if (h == null) return \"no-plugin:\" + name;\n        try {\n            return h.handle(arg);\n        } catch (Throwable e) {\n            return \"error:\" + e.getClass().getSimpleName();\n        }\n    }\n    public int size() { return map.size(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "注册表就是一个 Map, 同名 register 用 put 天然完成覆盖",
        "execute 里必须把处理过程中抛出的异常捕获并转成 \"error:异常类简单名\"",
        "用 Map 的 size() 直接返回个数, 覆盖注册不会让个数增长"
      ]
    },
    {
      "id": "ch11-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计事件总线 EventBus",
      "tags": [
        "设计",
        "事件总线",
        "不可变性",
        "防御性拷贝"
      ],
      "q": "设计本章 Boss: 在同一文件中实现 class EventBus(保留 public class Main 占位), 支持按话题订阅与顺序投递:\n- int subscribe(String topic, String handlerName): 订阅话题并返回 void(判题里无返回值操作期望 null); 同一话题允许多个订阅者, 按订阅先后顺序投递;\n- String publish(String topic, String event): 依次调用该话题下所有订阅者, 把每个订阅者的名称与它返回的字符串用冒号拼成一段, 段之间用分号连接; 话题无人订阅时返回 \"none\";\n- String history(String topic): 返回该话题历次 publish 的 event 记录, 用逗号连接; 从未发布过返回空串。\n\n约束: handlerName 取值 \"log\"/\"upper\"/\"num\", 分别返回 \"LOG(event)\"、event 的大写、event 的长度字符串。history 必须只反映发布过的输入, 不能被外部修改影响。\n判题按操作序列调用。",
      "mode": "design",
      "entry": {
        "className": "EventBus"
      },
      "ops": [
        [
          "EventBus",
          [],
          []
        ],
        [
          "history",
          [
            "news"
          ],
          [
            "String"
          ]
        ],
        [
          "subscribe",
          [
            "news",
            "log"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "subscribe",
          [
            "news",
            "upper"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "publish",
          [
            "news",
            "hi"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "history",
          [
            "news"
          ],
          [
            "String"
          ]
        ],
        [
          "publish",
          [
            "news",
            "go"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "history",
          [
            "news"
          ],
          [
            "String"
          ]
        ],
        [
          "publish",
          [
            "empty",
            "x"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "subscribe",
          [
            "news",
            "num"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "publish",
          [
            "news",
            "abc"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "history",
          [
            "news"
          ],
          [
            "String"
          ]
        ]
      ],
      "expect": [
        "null",
        "\"\"",
        "null",
        "null",
        "\"log:LOG(hi);upper:HI\"",
        "\"hi\"",
        "\"log:LOG(go);upper:GO\"",
        "\"hi,go\"",
        "\"none\"",
        "null",
        "\"log:LOG(abc);upper:ABC;num:3\"",
        "\"hi,go,abc\""
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass EventBus {\n    // TODO: Map<String, List<String>> 存订阅者; Map<String, List<String>> 存历史\n    public void subscribe(String topic, String handlerName) { }\n    public String publish(String topic, String event) { return \"\"; }\n    public String history(String topic) { return \"\"; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass EventBus {\n    private final Map<String, List<String>> subs = new LinkedHashMap<>();\n    private final Map<String, List<String>> hist = new LinkedHashMap<>();\n    public void subscribe(String topic, String handlerName) {\n        subs.computeIfAbsent(topic, k -> new ArrayList<>()).add(handlerName);\n    }\n    public String publish(String topic, String event) {\n        hist.computeIfAbsent(topic, k -> new ArrayList<>()).add(event);\n        List<String> hs = subs.get(topic);\n        if (hs == null || hs.isEmpty()) return \"none\";\n        StringBuilder sb = new StringBuilder();\n        for (String h : hs) {\n            if (sb.length() > 0) sb.append(';');\n            sb.append(h).append(':').append(handle(h, event));\n        }\n        return sb.toString();\n    }\n    public String history(String topic) {\n        List<String> h = hist.get(topic);\n        if (h == null) return \"\";\n        return String.join(\",\", h);\n    }\n    private static String handle(String handler, String event) {\n        if (handler.equals(\"log\")) return \"LOG(\" + event + \")\";\n        if (handler.equals(\"upper\")) return event.toUpperCase();\n        return String.valueOf(event.length());\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "投递顺序必须严格等于订阅顺序, 用 List 保存订阅者而不是 Set",
        "history 要保存你收到的 event 参数本身; 若直接保存外部传入的可变对象, 之后被改动会污染历史",
        "话题没有订阅者时 publish 也要记进 history, 但仍然返回 \"none\""
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "EventBus",
              [],
              []
            ],
            [
              "history",
              [
                "news"
              ],
              [
                "String"
              ]
            ],
            [
              "subscribe",
              [
                "news",
                "log"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "subscribe",
              [
                "news",
                "upper"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "publish",
              [
                "news",
                "hi"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "history",
              [
                "news"
              ],
              [
                "String"
              ]
            ],
            [
              "publish",
              [
                "news",
                "go"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "history",
              [
                "news"
              ],
              [
                "String"
              ]
            ],
            [
              "publish",
              [
                "empty",
                "x"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "subscribe",
              [
                "news",
                "num"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "publish",
              [
                "news",
                "abc"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "history",
              [
                "news"
              ],
              [
                "String"
              ]
            ]
          ],
          "expect": [
            "null",
            "\"\"",
            "null",
            "null",
            "\"log:LOG(hi);upper:HI\"",
            "\"hi\"",
            "\"log:LOG(go);upper:GO\"",
            "\"hi,go\"",
            "\"none\"",
            "null",
            "\"log:LOG(abc);upper:ABC;num:3\"",
            "\"hi,go,abc\""
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "EventBus"
            ],
            [
              "subscribe",
              [
                "t1",
                "num"
              ]
            ],
            [
              "publish",
              [
                "t1",
                "a"
              ]
            ],
            [
              "history",
              [
                "t1"
              ]
            ],
            [
              "publish",
              [
                "t1",
                "aBc"
              ]
            ],
            [
              "history",
              [
                "t1"
              ]
            ],
            [
              "subscribe",
              [
                "t2",
                "log"
              ]
            ],
            [
              "publish",
              [
                "t1",
                "xy"
              ]
            ],
            [
              "publish",
              [
                "t2",
                "z"
              ]
            ],
            [
              "history",
              [
                "t2"
              ]
            ],
            [
              "history",
              [
                "t9"
              ]
            ],
            [
              "subscribe",
              [
                "t2",
                "upper"
              ]
            ],
            [
              "publish",
              [
                "t2",
                "z"
              ]
            ],
            [
              "history",
              [
                "t2"
              ]
            ]
          ],
          "expect": [
            "null",
            "null",
            "\"num:1\"",
            "\"a\"",
            "\"num:3\"",
            "\"a,aBc\"",
            "null",
            "\"num:2\"",
            "\"log:LOG(z)\"",
            "\"z\"",
            "\"\"",
            "null",
            "\"log:LOG(z);upper:Z\"",
            "\"z,z\""
          ],
          "hidden": true
        }
      ]
    }
  ]
});
