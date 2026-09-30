window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 10,
  "title": "继承与多态",
  "courseRef": "黑马第11章-面向对象高级(继承/权限修饰符/方法重写/构造链/多态/抽象模板方法)",
  "levels": [
    {
      "id": "ch10-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "画布面积与周长(多态算总账)",
      "tags": [
        "继承",
        "abstract",
        "多态",
        "ArrayList"
      ],
      "q": "程序已给出继承结构: 抽象父类 Shape 声明了 abstract double area(); abstract double perimeter(); 子类 Rect(double w, double h) 与 Circle(double r) 已实现这两个方法。请实现 Main.totalArea(Shape[] shapes) 返回所有图形面积之和, 实现 Main.totalPerimeter(Shape[] shapes) 返回所有图形周长之和。约束: shapes 可能为空数组, 元素 |尺寸| ≤ 1e4, 圆周率请用 Math.PI; 要求以 double 返回, 判题按相对误差 1e-6 比较。核心考点: 数组声明为父类型, 实际调用哪个实现由运行时对象的真实类型决定(动态分派)。",
      "mode": "method",
      "entry": {
        "method": "totalArea",
        "params": [
          "List"
        ],
        "ret": "double"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    // 判题接口: tokens 形如 \"R:2:3|C:1\"(多个图形用 | 分隔)\n    public static double totalArea(List<String> tokens) { return 0.0; }\n    public static double totalPerimeter(List<String> tokens) { return 0.0; }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static double totalArea(List<String> tokens) {\n        Shape[] ss = build(tokens);\n        double s = 0.0;\n        for (Shape sh : ss) s += sh.area();\n        return s;\n    }\n\n    public static double totalPerimeter(List<String> tokens) {\n        Shape[] ss = build(tokens);\n        double s = 0.0;\n        for (Shape sh : ss) s += sh.perimeter();\n        return s;\n    }\n\n    static Shape[] build(List<String> tokens) {\n        Shape[] r = new Shape[tokens.size()];\n        for (int i = 0; i < r.length; i++) r[i] = parse(tokens.get(i).trim());\n        return r;\n    }\n\n    static Shape parse(String t) {\n        String[] p = t.split(String.valueOf((char) 58));\n        if (p[0].equals(\"R\")) return new Rect(Double.parseDouble(p[1]), Double.parseDouble(p[2]));\n        return new Circle(Double.parseDouble(p[1]));\n    }\n}\n\nclass Shape {\n    double area() { return 0.0; }\n    double perimeter() { return 0.0; }\n}\n\nclass Rect extends Shape {\n    final double w, h;\n    Rect(double w, double h) { this.w = w; this.h = h; }\n    double area() { return w * h; }\n    double perimeter() { return 2.0 * (w + h); }\n}\n\nclass Circle extends Shape {\n    final double r;\n    Circle(double r) { this.r = r; }\n    double area() { return Math.PI * r * r; }\n    double perimeter() { return 2.0 * Math.PI * r; }\n}\n",
      "tests": [
        {
          "name": "混合图形",
          "args": [
            "R:2:3|C:1"
          ],
          "expect": "9.141592653589793",
          "cmp": "float"
        },
        {
          "name": "单个矩形",
          "args": [
            "R:4:5"
          ],
          "expect": "20.0",
          "cmp": "float"
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "0.0",
          "cmp": "float",
          "hidden": true
        },
        {
          "name": "零尺寸",
          "args": [
            "R:0:9|C:0"
          ],
          "expect": "0.0",
          "cmp": "float",
          "hidden": true
        },
        {
          "name": "纯圆形",
          "args": [
            "C:2|C:2"
          ],
          "expect": "25.132741228718345",
          "cmp": "float",
          "hidden": true
        }
      ],
      "hints": [
        "多态调用的本质: 编译看左边(Shape), 运行看右边(new 出来的真实对象)",
        "父类引用数组里存子类对象, 循环里 sh.area() 会自动分派到子类重写后的实现",
        "空数组要让累加结果为 0.0, 不要忘记初始值"
      ]
    },
    {
      "id": "ch10-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "成员变量就近原则与 super 限定",
      "tags": [
        "继承",
        "成员变量",
        "super",
        "就近原则"
      ],
      "q": "给定三层继承结构: class A { int v = 1; } / class B extends A { int v = 2; } / class C extends B { int v = 3; }。请实现 Main.lookupV(int level): 返回第 level 层声明的那个 v(level=1 取 A 的, 2 取 B 的, 3 取 C 的), 越界返回 -1。再实现 Main.sumV(): 返回 this.v + super.v + ((A)this).v 的和, 即 3 + 2 + 1。约束: level 为任意 int(含负数与超大值)。核心考点: 成员变量不具备多态性, 编译期由引用类型决定; 子类同名变量不会覆盖父类变量, 而是被隐藏, 必须用 super 或强制类型转换才能取到父类那份。",
      "mode": "method",
      "entry": {
        "method": "lookupV",
        "params": [
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int lookupV(int level, int mode) {\n        // mode=0: 返回第 level 层声明的那个 v\n        // mode=1: 返回 this.v + super.v + ((A)this).v\n        // TODO\n        return 0;\n    }\n}\n\nclass A { int v = 1; }\n\nclass B extends A { int v = 2; }\n\nclass C extends B {\n    int v = 3;\n    int self() { return v; }\n    int parent() { return super.v; }\n    int grand() { return ((A) this).v; }\n    int sum() { return self() + parent() + grand(); }\n}\n",
      "solution": "public class Main {\n    public static int lookupV(int level, int mode) {\n        C c = new C();\n        if (mode == 1) return c.sum();\n        if (level == 1) return ((A) c).v;\n        if (level == 2) return ((B) c).v;\n        if (level == 3) return c.v;\n        return -1;\n    }\n}\n\nclass A { int v = 1; }\n\nclass B extends A { int v = 2; }\n\nclass C extends B {\n    int v = 3;\n    int self() { return v; }\n    int parent() { return super.v; }\n    int grand() { return ((A) this).v; }\n    int sum() { return self() + parent() + grand(); }\n}\n",
      "tests": [
        {
          "name": "取子类",
          "args": [
            "3",
            "0"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "取父类",
          "args": [
            "2",
            "0"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "取祖父类",
          "args": [
            "1",
            "0"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "同名变量求和",
          "args": [
            "0",
            "1"
          ],
          "expect": "6",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "越界为零",
          "args": [
            "0",
            "0"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负数越界",
          "args": [
            "-5",
            "0"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "成员变量没有多态: 看引用类型, 不看对象真实类型",
        "((A) c).v 与 ((B) c).v 取的是同一个 C 对象里两份不同的变量",
        "super.v 只在子类内部可用, 外部要通过父类引用访问"
      ]
    },
    {
      "id": "ch10-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "构造链与 super 执行顺序",
      "tags": [
        "继承",
        "构造方法",
        "super",
        "初始化顺序"
      ],
      "q": "给定三层继承结构 Base → Mid extends Base → Leaf extends Mid: 每个类都既有显式构造方法, 又有实例初始化块, 并且每个构造方法都显式调用 super(...)。请实现 Main.ctorTrace(int kind) 返回 new Leaf(kind) 过程中所有\"初始化步骤\"的日志, 用 | 分隔后整体返回一个字符串。日志里的数字统一写成: Base 的实例块为 1, Base 的构造方法为 2, Mid 的实例块为 3, Mid 的构造方法为 4, Leaf 的实例块为 5, Leaf 的构造方法为 6。再实现 Main.fieldTrace() 返回 new Leaf 后各层字段被赋值的最早时刻, 规则是: 某个类的字段在\"它这一层的实例块之前\"已由 super 构造调用波及, 日志同样按上述编号挑选。约束: kind 取 0/1/2, 分别代表 Leaf(0)、Leaf(1)、Leaf(2) 三种重载构造。核心考点: 子类构造方法第一行一定是 super(...), 因此父类静态代码块 → 父类实例块 → 父类构造方法 → 子类实例块 → 子类构造方法。",
      "mode": "method",
      "entry": {
        "method": "ctorTrace",
        "params": [
          "int"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String ctorTrace(int kind) {\n        // TODO: 依次 new 三种 Leaf, 取出各类内部记录的日志\n        return \"\";\n    }\n\n    public static String fieldTrace() {\n        // TODO: 返回字段赋值与构造执行的先后编号\n        return \"\";\n    }\n}\n\nclass Base {\n    static StringBuilder LOG = new StringBuilder();\n    int a = mark(1);\n    Base() { LOG.append(\"2|\"); }\n    Base(int x) { this(); }\n    static int mark(int k) { LOG.append(k).append('|'); return k; }\n}\n\nclass Mid extends Base {\n    int b = mark(3);\n    Mid() { super(); LOG.append(\"4|\"); }\n    Mid(int x) { this(); }\n}\n\nclass Leaf extends Mid {\n    int c = mark(5);\n    Leaf() { super(); LOG.append(\"6|\"); }\n    Leaf(int x) { super(x); }\n    Leaf(String s) { this(); }\n}\n",
      "solution": "public class Main {\n    public static String ctorTrace(int kind) {\n        Base.LOG.setLength(0);\n        if (kind == 0) new Leaf();\n        else if (kind == 1) new Leaf(1);\n        else new Leaf(\"s\");\n        return Base.LOG.toString();\n    }\n\n    public static String fieldTrace() {\n        Base.LOG.setLength(0);\n        new Leaf();\n        return Base.LOG.toString();\n    }\n}\n\nclass Base {\n    static StringBuilder LOG = new StringBuilder();\n    int a = mark(1);\n    Base() { LOG.append(\"2|\"); }\n    Base(int x) { this(); }\n    static int mark(int k) { LOG.append(k).append('|'); return k; }\n}\n\nclass Mid extends Base {\n    int b = mark(3);\n    Mid() { super(); LOG.append(\"4|\"); }\n    Mid(int x) { this(); }\n}\n\nclass Leaf extends Mid {\n    int c = mark(5);\n    Leaf() { super(); LOG.append(\"6|\"); }\n    Leaf(int x) { super(x); }\n    Leaf(String s) { this(); }\n}\n",
      "tests": [
        {
          "name": "无参构造链",
          "args": [
            "0"
          ],
          "expect": "1|2|3|4|5|6|",
          "cmp": "exact"
        },
        {
          "name": "this() 链",
          "args": [
            "1"
          ],
          "expect": "1|2|3|4|5|",
          "cmp": "exact"
        },
        {
          "name": "super(x) 链",
          "args": [
            "2"
          ],
          "expect": "1|2|3|4|5|6|",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "重复构造仍同序",
          "args": [
            "0"
          ],
          "expect": "1|2|3|4|5|6|",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "子类构造方法首行固定是 super(...), 所以父类先初始化完才轮到子类",
        "同一个类里, 实例初始化块按书写顺序排在构造方法体之前执行",
        "this() 与 super() 都只能位于构造方法第一行, 所以二者不能同时出现"
      ]
    },
    {
      "id": "ch10-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "方法重写(返回类型兼容与协变)",
      "tags": [
        "重写",
        "协变返回",
        "多态",
        "异常"
      ],
      "q": "程序给出父类 Animal { Animal copy() } 与子类 Cat extends Animal。请实现 Main.copyAll(String kinds): kinds 的每一项是 \"C\"(猫)或 \"D\"(狗), 请为每一项调用统一的 Animal 引用上的 copy() 方法, 再把每个副本的 name 用 | 拼起来返回(不调用拷贝方法直接造对象会与参考答案不一致)。再实现 Main.rebind(String kind): 返回 \"类型@名称\" 形式的字符串, 用来验证 Animal a = new Cat(); 这种向上转型后, 引用类型与运行时类型是否一致, 判题比较的是 \"Cat@cat\" 这类字符串。约束: 元素只会出现 C/D, 列表可能为空(返回空串)。核心考点: 重写要求方法名、参数列表相同, 返回类型可以协变(子类更具体), 权限不能变严格。",
      "mode": "method",
      "entry": {
        "method": "copyAll",
        "params": [
          "List",
          "int"
        ],
        "ret": "String"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static String copyAll(List<String> kinds, int op) {\n        // op=0: 为每个元素调用 copy(), 把副本的 name 用 | 连起来\n        // op=1: 对第一个元素做向上转型, 返回 \"运行时类名@name\"\n        // TODO\n        return \"\";\n    }\n}\n\nclass Animal {\n    protected String name = \"animal\";\n    Animal copy() { return new Animal(); }\n}\n\nclass Cat extends Animal {\n    Cat() { name = \"cat\"; }\n    Cat copy() { return new Cat(); }\n}\n\nclass Dog extends Animal {\n    Dog() { name = \"dog\"; }\n    Dog copy() { return new Dog(); }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static String copyAll(List<String> kinds, int op) {\n        if (op == 1) {\n            Animal a = make(kinds.get(0).trim());\n            return a.getClass().getSimpleName() + \"@\" + a.name;\n        }\n        StringBuilder b = new StringBuilder();\n        for (int i = 0; i < kinds.size(); i++) {\n            if (i > 0) b.append('|');\n            Animal a = make(kinds.get(i).trim());\n            Animal c = a.copy();\n            b.append(c.name);\n        }\n        return b.toString();\n    }\n\n    static Animal make(String k) { return k.equals(\"C\") ? new Cat() : new Dog(); }\n}\n\nclass Animal {\n    protected String name = \"animal\";\n    Animal copy() { return new Animal(); }\n}\n\nclass Cat extends Animal {\n    Cat() { name = \"cat\"; }\n    Cat copy() { return new Cat(); }\n}\n\nclass Dog extends Animal {\n    Dog() { name = \"dog\"; }\n    Dog copy() { return new Dog(); }\n}\n",
      "tests": [
        {
          "name": "混合拷贝",
          "args": [
            "C|D",
            "0"
          ],
          "expect": "cat|dog",
          "cmp": "exact"
        },
        {
          "name": "向上转型",
          "args": [
            "C",
            "1"
          ],
          "expect": "Cat@cat",
          "cmp": "exact"
        },
        {
          "name": "空列表",
          "args": [
            "",
            "0"
          ],
          "expect": "",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大量重复",
          "args": [
            "D|D|C|D",
            "0"
          ],
          "expect": "dog|dog|cat|dog",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "向上转型看跑步对象",
          "args": [
            "D",
            "1"
          ],
          "expect": "Dog@dog",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "copy() 被重写后, 通过 Animal 引用调用也会执行子类版本",
        "协变返回: 子类可以把父类的 Animal copy() 重写成 Cat copy()",
        "子类 copy() 里应 new 出子类对象, 否则副本会退化成父类"
      ]
    },
    {
      "id": "ch10-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "权限修饰符可见性矩阵",
      "tags": [
        "权限修饰符",
        "private",
        "protected",
        "default",
        "package"
      ],
      "q": "同一个包内有两个类, 另有子类 extends Parent。请实现 Main.visibility(String probes): 对每个探测项返回 '1'(可见)或 '0'(不可见)。探测项取值与含义: 'self-pub' 同类中访问本类 public 成员 → 可见; 'self-pri' 同类中访问本类 private 成员 → 可见; 'same-pkg' 同包其他类访问 default 成员 → 可见; 'child-pri' 不同包的子类通过继承访问父类 private 成员 → 不可见; 'child-prot' 不同包的子类继承访问父类 protected 成员 → 可见; 'child-def' 不同包的子类继承访问父类 default 成员 → 不可见; 'other-def' 不同包的无关类访问 default 成员 → 不可见; 'other-pub' 不同包的无关类访问 public 成员 → 可见; 'not-here' 表示同级类中重名的私有成员互不可见 → 不可见。约束: 探测项只会是上述九种, 列表可能为空(返回空串)。核心考点: 权限从大到小 public > protected > default(包私有) > private; protected 允许跨包子类继承访问, default 不允许。",
      "mode": "method",
      "entry": {
        "method": "visibility",
        "params": [
          "List"
        ],
        "ret": "String"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static String visibility(List<String> probes) {\n        // TODO: 用一张表把探测项映射成 1/0, 再拼成字符串\n        return \"\";\n    }\n}\n\n// 同包内的两个类: 用于验证同类可见 / 同包可见\nclass Owner {\n    public int pub = 1;\n    protected int prot = 2;\n    int def = 3;\n    private int pri = 4;\n\n    int readSelfPublic() { return pub; }\n    int readSelfPrivate() { return pri; }\n}\n\nclass Sibling {\n    int readDefault(Owner o) { return o.def; }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static String visibility(List<String> probes) {\n        StringBuilder b = new StringBuilder();\n        for (int i = 0; i < probes.size(); i++) {\n            if (i > 0) b.append('|');\n            b.append(visible(probes.get(i).trim()) ? '1' : '0');\n        }\n        return b.toString();\n    }\n\n    static boolean visible(String p) {\n        if (p.equals(\"self-pub\")) return true;\n        if (p.equals(\"self-pri\")) return true;\n        if (p.equals(\"same-pkg\")) return true;\n        if (p.equals(\"child-pri\")) return false;\n        if (p.equals(\"child-prot\")) return true;\n        if (p.equals(\"child-def\")) return false;\n        if (p.equals(\"other-def\")) return false;\n        if (p.equals(\"other-pub\")) return true;\n        return false;\n    }\n}\n\nclass Owner {\n    public int pub = 1;\n    protected int prot = 2;\n    int def = 3;\n    private int pri = 4;\n\n    int readSelfPublic() { return pub; }\n    int readSelfPrivate() { return pri; }\n}\n\nclass Sibling {\n    int readDefault(Owner o) { return o.def; }\n}\n",
      "tests": [
        {
          "name": "同类与同包",
          "args": [
            "self-pub|self-pri|same-pkg"
          ],
          "expect": "1|1|1",
          "cmp": "exact"
        },
        {
          "name": "跨包子类",
          "args": [
            "child-pri|child-prot|child-def"
          ],
          "expect": "0|1|0",
          "cmp": "exact"
        },
        {
          "name": "跨包无关类",
          "args": [
            "other-def|other-pub"
          ],
          "expect": "0|1",
          "cmp": "exact"
        },
        {
          "name": "空串",
          "args": [
            ""
          ],
          "expect": "",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "未知探测项",
          "args": [
            "not-here"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "private 只在本类内部可见, 子类继承不到",
        "protected 是\"包内 + 跨包子类\", default 只有包内",
        "public 到处可见, 记住四档顺序就好办了"
      ]
    },
    {
      "id": "ch10-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "向上转型与 instanceof 精确统计",
      "tags": [
        "多态",
        "向下转型",
        "instanceof",
        "ClassCastException"
      ],
      "q": "给出继承结构 Animal → Mammal → {Dog, Cat}。请实现 Main.countByType(String code, int n): code 由若干字母组成, 'A' 造 Animal、'M' 造 Mammal、'D' 造 Dog、'C' 造 Cat, 把所有对象放进 Animal[] 后, 统计\"运行时真实类型恰好是\"指定类别的对象个数并返回。参数 n 表示要统计的层级: 1=Animal, 2=Mammal, 3=Dog, 4=Cat; 因为 Dog 也是 Mammal 也是 Animal, 必须用精确类型判断而不是 instanceof, 否则会重复计数。再实现 Main.downcast(String code): 对 code 中的每个对象做向下转型, 能用 (Dog) 安全转成功的收集名字, 结果用 | 连接; 判题只要求正确结果, 不允许抛异常。约束: code 长度 ≤ 1e4, 可能为空串, n ∈ [1,4]。",
      "mode": "method",
      "entry": {
        "method": "countByType",
        "params": [
          "String",
          "int",
          "int"
        ],
        "ret": "String"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static String countByType(String code, int n, int op) {\n        // op=0: 返回真实类型恰为 n 级类型(1=Animal,2=Mammal,3=Dog,4=Cat)的对象个数\n        // op=1: 对每个对象尝试向下转型, 把能安全转成 Dog 的对象名字用 | 连起来\n        // TODO\n        return \"\";\n    }\n}\n\nclass Animal {\n    String name = \"animal\";\n}\n\nclass Mammal extends Animal {\n    Mammal() { name = \"mammal\"; }\n}\n\nclass Dog extends Mammal {\n    Dog() { name = \"dog\"; }\n}\n\nclass Cat extends Mammal {\n    Cat() { name = \"cat\"; }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static String countByType(String code, int n, int op) {\n        Animal[] as = build(code);\n        if (op == 1) {\n            StringBuilder b = new StringBuilder();\n            for (Animal a : as) {\n                if (a.getClass() == Dog.class) {\n                    if (b.length() > 0) b.append('|');\n                    b.append(((Dog) a).name);\n                }\n            }\n            return b.toString();\n        }\n        Class<?> want = n == 1 ? Animal.class : n == 2 ? Mammal.class : n == 3 ? Dog.class : Cat.class;\n        int c = 0;\n        for (Animal a : as) if (a.getClass() == want) c++;\n        return String.valueOf(c);\n    }\n\n    static Animal[] build(String code) {\n        Animal[] r = new Animal[code.length()];\n        for (int i = 0; i < r.length; i++) {\n            char c = code.charAt(i);\n            if (c == 'A') r[i] = new Animal();\n            else if (c == 'M') r[i] = new Mammal();\n            else if (c == 'D') r[i] = new Dog();\n            else r[i] = new Cat();\n        }\n        return r;\n    }\n}\n\nclass Animal {\n    String name = \"animal\";\n}\n\nclass Mammal extends Animal {\n    Mammal() { name = \"mammal\"; }\n}\n\nclass Dog extends Mammal {\n    Dog() { name = \"dog\"; }\n}\n\nclass Cat extends Mammal {\n    Cat() { name = \"cat\"; }\n}\n",
      "tests": [
        {
          "name": "统计 Dog",
          "args": [
            "DMCAD",
            "3",
            "0"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "统计 Animal 精确",
          "args": [
            "DMCAD",
            "1",
            "0"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "空串",
          "args": [
            "",
            "1",
            "0"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "统计 Mammal 精确",
          "args": [
            "MMDC",
            "2",
            "0"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "向下转型收集",
          "args": [
            "DDC",
            "0",
            "1"
          ],
          "expect": "dog|dog",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "instanceof 会把子类也算进去, 精确统计必须用 getClass() == X.class",
        "向下转型前先判断真实类型, 否则会抛 ClassCastException",
        "空串构造出的数组长度为 0, 循环自然不执行"
      ]
    },
    {
      "id": "ch10-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "计数器类继承链(静态 vs 实例)",
      "tags": [
        "继承",
        "静态变量",
        "构造链",
        "不可变"
      ],
      "q": "给出继承结构 Counter(有 static int created 与实例字段 id、long value) → StepCounter extends Counter。请实现 Main.simulate(int steps, int[] deltas): 先 new 一个 StepCounter, 依次把 deltas 中每个值加到它的 value 上(允许负数, 累加过程用 long 防溢出), 每加一次就把该实例的步数记录下来; 最后返回字符串 \"创建数,最终值,最大值,最小值\"(用逗号分隔, 不带空格)。再实现 Main.mirror(int steps): 返回 \"子类读到,父类读到\" 两个数值, 用来验证静态成员被所有子类共享(通过子类名和父类名读到的是同一个变量)。约束: steps 是 StepCounter 构造参数(≥0), deltas 长度 ≤ 1e5, 元素 |d| ≤ 1e9; deltas 为空时最大值与最小值都取 0。核心考点: 静态变量属于类且被继承共享; 实例字段各对象独立; 构造链中子类构造方法会先走父类构造。",
      "mode": "method",
      "entry": {
        "method": "simulate",
        "params": [
          "int",
          "int[]",
          "int"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String simulate(int steps, int[] deltas, int op) {\n        // op=0: 返回 \"创建数,最终值,最大值,最小值\"\n        // op=1: 返回 \"子类读到的 created,父类读到的 created\"\n        // TODO\n        return \"\";\n    }\n}\n\nclass Counter {\n    static int created = 0;\n    final int id;\n    long value = 0L;\n\n    Counter(int steps) {\n        created++;\n        id = created;\n        value = steps;\n    }\n}\n\nclass StepCounter extends Counter {\n    long max = Long.MIN_VALUE;\n    long min = Long.MAX_VALUE;\n\n    StepCounter(int steps) { super(steps); }\n\n    void add(long d) {\n        value += d;\n        if (value > max) max = value;\n        if (value < min) min = value;\n    }\n}\n",
      "solution": "public class Main {\n    public static String simulate(int steps, int[] deltas, int op) {\n        Counter.created = 0;\n        StepCounter c = new StepCounter(steps);\n        long cur = c.value;\n        long mx = deltas.length == 0 ? 0L : Long.MIN_VALUE;\n        long mn = deltas.length == 0 ? 0L : Long.MAX_VALUE;\n        for (int d : deltas) {\n            cur += d;\n            if (cur > mx) mx = cur;\n            if (cur < mn) mn = cur;\n        }\n        if (op == 1) return StepCounter.created + \",\" + Counter.created;\n        return Counter.created + \",\" + cur + \",\" + mx + \",\" + mn;\n    }\n}\n\nclass Counter {\n    static int created = 0;\n    final int id;\n    long value = 0L;\n\n    Counter(int steps) {\n        created++;\n        id = created;\n        value = steps;\n    }\n}\n\nclass StepCounter extends Counter {\n    long max = Long.MIN_VALUE;\n    long min = Long.MAX_VALUE;\n\n    StepCounter(int steps) { super(steps); }\n\n    void add(long d) {\n        value += d;\n        if (value > max) max = value;\n        if (value < min) min = value;\n    }\n}\n",
      "tests": [
        {
          "name": "常规累加",
          "args": [
            "5",
            "3,-1,4",
            "0"
          ],
          "expect": "1,11,11,7",
          "cmp": "exact"
        },
        {
          "name": "全负数",
          "args": [
            "2",
            "-3,-4",
            "0"
          ],
          "expect": "1,-5,-1,-5",
          "cmp": "exact"
        },
        {
          "name": "空增量",
          "args": [
            "7",
            "",
            "0"
          ],
          "expect": "1,7,0,0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单次大增量",
          "args": [
            "0",
            "1000000000",
            "0"
          ],
          "expect": "1,1000000000,1000000000,1000000000",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "静态共享",
          "args": [
            "3",
            "1",
            "1"
          ],
          "expect": "1,1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "静态变量属于类, 通过 StepCounter.created 和 Counter.created 读到的是同一个",
        "value 用 long 累加, int 在 1e5 × 1e9 规模下会溢出",
        "deltas 为空时不要用 Long.MIN_VALUE 当答案, 直接取 0"
      ]
    },
    {
      "id": "ch10-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "final 语义与不可变继承",
      "tags": [
        "final",
        "不可变",
        "多态",
        "常量"
      ],
      "q": "给出三类声明: class Stamp 被 final 修饰(不可被继承)、class Ticket 含有 final 字段与 final 方法 fare()、class TimedTicket extends Ticket 只能重写非 final 方法。请实现 Main.rule(String code): code 由若干条以 | 分隔的规则名组成, 对每条规则返回 '1' 表示\"编译可以通过\", '0' 表示\"编译会报错\"。规则名与语义: 'extend-final' 继承 final 类; 'override-final' 重写父类 final 方法; 'assign-final' 对 final 字段再次赋值; 'shadow-param' 在方法参数名与 final 字段同名时读取字段; 'same-final-method' 在子类中声明与父类 final 方法签名完全相同的方法; 'extend-plain' 继承普通类; 'new-same-name' 在子类中用同名方法但不同参数列表重载父类 final 方法; 'local-final' 给局部 final 变量再赋值。约束: 规则名只会是上述八种, code 可能为空串(返回空串)。核心考点: final 修饰类→不可继承; 修饰方法→不可重写; 修饰变量→只能赋值一次(重载不受限制)。",
      "mode": "method",
      "entry": {
        "method": "rule",
        "params": [
          "List"
        ],
        "ret": "String"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static String rule(List<String> code) {\n        // TODO: 用一张表把规则名映射成 1/0(规则名之间用 | 分隔)\n        return \"\";\n    }\n}\n\nfinal class Stamp {\n    final int id = 7;\n}\n\nclass Ticket {\n    final int price = 10;\n    final int fare() { return price; }\n}\n\nclass TimedTicket extends Ticket {\n    int extra = 2;\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static String rule(List<String> code) {\n        StringBuilder b = new StringBuilder();\n        for (int i = 0; i < code.size(); i++) {\n            if (i > 0) b.append('|');\n            b.append(ok(code.get(i).trim()) ? '1' : '0');\n        }\n        return b.toString();\n    }\n\n    static boolean ok(String r) {\n        if (r.equals(\"extend-final\")) return false;\n        if (r.equals(\"override-final\")) return false;\n        if (r.equals(\"assign-final\")) return false;\n        if (r.equals(\"shadow-param\")) return true;\n        if (r.equals(\"same-final-method\")) return false;\n        if (r.equals(\"extend-plain\")) return true;\n        if (r.equals(\"new-same-name\")) return true;\n        if (r.equals(\"local-final\")) return false;\n        return false;\n    }\n}\n\nfinal class Stamp {\n    final int id = 7;\n}\n\nclass Ticket {\n    final int price = 10;\n    final int fare() { return price; }\n}\n\nclass TimedTicket extends Ticket {\n    int extra = 2;\n}\n",
      "tests": [
        {
          "name": "继承限制",
          "args": [
            "extend-final|extend-plain"
          ],
          "expect": "0|1",
          "cmp": "exact"
        },
        {
          "name": "重写限制",
          "args": [
            "override-final|same-final-method"
          ],
          "expect": "0|0",
          "cmp": "exact"
        },
        {
          "name": "字段与局部变量",
          "args": [
            "assign-final|local-final"
          ],
          "expect": "0|0",
          "cmp": "exact"
        },
        {
          "name": "重载合法",
          "args": [
            "new-same-name|shadow-param"
          ],
          "expect": "1|1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空列表",
          "args": [
            ""
          ],
          "expect": "",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "重载(参数列表不同)不受 final 方法限制, 重写(签名相同)才受限",
        "final 字段的第一次赋值可以放在声明处或构造方法里, 之后再赋值就报错",
        "局部 final 变量同理, 只能被赋值一次"
      ]
    },
    {
      "id": "ch10-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "员工薪资多态分派(super 调用链)",
      "tags": [
        "继承",
        "多态",
        "super",
        "抽象类",
        "模板方法"
      ],
      "q": "给出抽象父类 Employee 与两个子类 SalariedEmp(月薪) / HourlyEmp(时薪×工时)。父类已实现 final 方法 pay(): 它先调用子类重写的 basePay(), 再调用子类重写的 bonus(), 最后调用父类自己的 tax(), 三者相加得到实发工资。请实现 Main.payroll(String spec): spec 的每一项以 | 分隔, 形如 'S,名称,月薪' 或 'H,名称,时薪,工时'; 返回\"名称:实发工资\"用 | 连接。规则: SalariedEmp 的 basePay 是月薪, bonus 为月薪的 10%(向下取整); HourlyEmp 的 basePay 是时薪×工时, 工时超过 160 的部分按 1.5 倍单价计酬, bonus 固定 200; 父类 tax 取三者合计(即 basePay+bonus)的 8% 向下取整。约束: 每条记录字段数固定, 金额为非负整数 ≤ 1e7, spec 可能为空串(返回空串)。核心考点: 父类模板调用被重写的方法会分派到子类(多态); 父类方法里若想用父类实现, 必须写 super 或 final 固定住。",
      "mode": "method",
      "entry": {
        "method": "payroll",
        "params": [
          "List"
        ],
        "ret": "String"
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static String payroll(List<String> spec) {\n        // TODO: 每项形如 'S,名称,月薪' 或 'H,名称,时薪,工时', 多项之间用 | 分隔, 用 Employee 引用调用 pay()\n        return \"\";\n    }\n}\n\nabstract class Employee {\n    final String name;\n\n    Employee(String name) { this.name = name; }\n\n    abstract int basePay();\n    abstract int bonus();\n    int tax() { return (int) ((basePay() + bonus()) * 8L / 100L); }\n\n    final int pay() { return basePay() + bonus() + tax(); }\n}\n\nclass SalariedEmp extends Employee {\n    final int monthly;\n\n    SalariedEmp(String name, int monthly) { super(name); this.monthly = monthly; }\n\n    int basePay() { return monthly; }\n    int bonus() { return (int) (monthly * 10L / 100L); }\n}\n\nclass HourlyEmp extends Employee {\n    final int rate, hours;\n\n    HourlyEmp(String name, int rate, int hours) { super(name); this.rate = rate; this.hours = hours; }\n\n    int basePay() { return hours <= 160 ? rate * hours : rate * 160 + (int) (rate * (hours - 160) * 3L / 2L); }\n    int bonus() { return 200; }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static String payroll(List<String> spec) {\n        StringBuilder b = new StringBuilder();\n        for (int i = 0; i < spec.size(); i++) {\n            if (i > 0) b.append('|');\n            String[] p = spec.get(i).trim().split(String.valueOf((char) 44));\n            Employee e = p[0].equals(\"S\")\n                ? new SalariedEmp(p[1], Integer.parseInt(p[2]))\n                : new HourlyEmp(p[1], Integer.parseInt(p[2]), Integer.parseInt(p[3]));\n            b.append(e.name).append(':').append(e.pay());\n        }\n        return b.toString();\n    }\n}\n\nabstract class Employee {\n    final String name;\n\n    Employee(String name) { this.name = name; }\n\n    abstract int basePay();\n    abstract int bonus();\n    int tax() { return (int) ((basePay() + bonus()) * 8L / 100L); }\n\n    final int pay() { return basePay() + bonus() + tax(); }\n}\n\nclass SalariedEmp extends Employee {\n    final int monthly;\n\n    SalariedEmp(String name, int monthly) { super(name); this.monthly = monthly; }\n\n    int basePay() { return monthly; }\n    int bonus() { return (int) (monthly * 10L / 100L); }\n}\n\nclass HourlyEmp extends Employee {\n    final int rate, hours;\n\n    HourlyEmp(String name, int rate, int hours) { super(name); this.rate = rate; this.hours = hours; }\n\n    int basePay() { return hours <= 160 ? rate * hours : rate * 160 + (int) (rate * (hours - 160) * 3L / 2L); }\n    int bonus() { return 200; }\n}\n",
      "tests": [
        {
          "name": "月薪员工",
          "args": [
            "S,Ann,10000"
          ],
          "expect": "Ann:11880",
          "cmp": "exact"
        },
        {
          "name": "时薪无加班",
          "args": [
            "H,Bob,100,100"
          ],
          "expect": "Bob:11016",
          "cmp": "exact"
        },
        {
          "name": "时薪带加班",
          "args": [
            "H,Cid,50,200"
          ],
          "expect": "Cid:12096",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "混合两条",
          "args": [
            "S,Ann,10000|H,Bob,100,100"
          ],
          "expect": "Ann:11880|Bob:11016",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "零月薪",
          "args": [
            "S,Zed,0"
          ],
          "expect": "Zed:0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "basePay 与 bonus 在父类模板里被调用, 会分派到子类重写版本",
        "加班工资是 160 以内按原价, 超出部分单价 ×1.5",
        "税取 basePay+bonus 的 8% 向下取整, 不要用 Math.round"
      ]
    },
    {
      "id": "ch10-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "多态分派结果 vs 朴素分支(对拍)",
      "tags": [
        "多态",
        "分派",
        "对拍",
        "金额计算"
      ],
      "q": "同一组商品有两种计价方式: 多态方式(Item 抽象父类 + Book/Food/Clothes 三个子类各自重写 cost())与朴素方式(一个 if/else 链直接根据类型字符串算钱)。请实现 Main.solve(String spec): spec 形如 'B,120;F,45;L,300'。每种商品的 cost 规则为: Book(B) 打 9 折; Food(F) 满 100 减 20(不足 100 不打折); Clothes(L) 打 7 折后四舍五入到分位, 折算结果一律向下取整到 int。返回所有商品 cost 之和。约束: 商品数 ≤ 1e5, 单价 0 ≤ price ≤ 1e7, 总和不超出 int 范围。本题使用随机对拍: 你的实现会与一个独立编写的朴素参考实现比对; 参考实现使用的是\"类型字符串 → 分支计算\"的写法, 只要你的多态分派语义与它一致就能通过。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "String"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static int solve(String spec) {\n        // TODO: 解析每项 '类型,单价', 用统一的 Item 引用调用 cost()\n        return 0;\n    }\n}\n\nabstract class Item {\n    final int price;\n    Item(int price) { this.price = price; }\n    abstract int cost();\n}\n\nclass Book extends Item {\n    Book(int price) { super(price); }\n    int cost() { return price * 9 / 10; }\n}\n\nclass Food extends Item {\n    Food(int price) { super(price); }\n    int cost() { return price >= 100 ? price - 20 : price; }\n}\n\nclass Clothes extends Item {\n    Clothes(int price) { super(price); }\n    int cost() { return price * 7 / 10; }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static int solve(String spec) {\n        int total = 0;\n        String[] parts = spec.split(String.valueOf((char) 59));\n        for (String part : parts) {\n            if (part.length() == 0) continue;\n            String[] p = part.split(String.valueOf((char) 44));\n            total += build(p[0].charAt(0), Integer.parseInt(p[1])).cost();\n        }\n        return total;\n    }\n\n    static Item build(char kind, int price) {\n        if (kind == 'B') return new Book(price);\n        if (kind == 'F') return new Food(price);\n        return new Clothes(price);\n    }\n}\n\nabstract class Item {\n    final int price;\n    Item(int price) { this.price = price; }\n    abstract int cost();\n}\n\nclass Book extends Item {\n    Book(int price) { super(price); }\n    int cost() { return price * 9 / 10; }\n}\n\nclass Food extends Item {\n    Food(int price) { super(price); }\n    int cost() { return price >= 100 ? price - 20 : price; }\n}\n\nclass Clothes extends Item {\n    Clothes(int price) { super(price); }\n    int cost() { return price * 7 / 10; }\n}\n",
      "tests": [
        {
          "name": "三种商品",
          "args": [
            "B,120;F,45;L,300"
          ],
          "expect": "363",
          "cmp": "exact"
        },
        {
          "name": "满减边界",
          "args": [
            "F,100;F,99"
          ],
          "expect": "179",
          "cmp": "exact"
        },
        {
          "name": "零价商品",
          "args": [
            "B,0;F,0;L,0"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单件大额",
          "args": [
            "L,10000000"
          ],
          "expect": "7000000",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20261001,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=1+r.nextInt(14); StringBuilder b=new StringBuilder(); char[] k=new char[]{'B','F','L'}; for(int i=0;i<n;i++){ if(i>0) b.append((char)59); b.append(k[r.nextInt(3)]).append((char)44).append(r.nextInt(1200)); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static int solve(String spec){ int t=0; String[] ps=spec.split(\";\", -1); for(String s : ps){ if(s.length()==0) continue; int c=s.indexOf(44); char k=s.charAt(0); int v=Integer.parseInt(s.substring(c+1)); if(k=='B') t+=v*9/10; else if(k=='F') t+= v>=100 ? v-20 : v; else t+=v*7/10; } return t; } }"
      },
      "hints": [
        "多态版本与分支版本必须完全等价, 整数除法就是向下取整",
        "Food 的满减阈值是 price >= 100, 恰好 100 也减",
        "空片段要跳过, 避免 split 产生的空串导致解析异常"
      ]
    },
    {
      "id": "ch10-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "子类分组求和与惰性缓存(对拍)",
      "tags": [
        "多态",
        "分组",
        "缓存",
        "对拍"
      ],
      "q": "给出抽象父类 Node 与两个子类 Num(权重 = 数值本身) 与 Pair(权重 = 两个数值之和 × 系数 k)。请实现 Main.solve(String spec): spec 是用 ; 分隔的记录, 形如 'N,5' 或 'P,3,4,2'; 对每条记录求其权重, 按\"记录下标对 3 取模\"分成三组, 最后返回三组权重之和, 用逗号分隔(格式 'g0,g1,g2')。约束: 记录数 ≤ 1e5, 数值 |x| ≤ 1e6, 系数 1 ≤ k ≤ 1e6, 每组之和用 long(可能超出 int 范围)。本题使用随机对拍: 与一个用朴素分支 + 原地累加写的参考实现对拍。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "String"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static String solve(String spec) {\n        // TODO: 用 Node 引用统一调用 weight(), 再按下标 % 3 累加\n        return \"\";\n    }\n}\n\nabstract class Node {\n    abstract long weight();\n}\n\nclass Num extends Node {\n    final long v;\n    Num(long v) { this.v = v; }\n    long weight() { return v; }\n}\n\nclass Pair extends Node {\n    final long a, b, k;\n    Pair(long a, long b, long k) { this.a = a; this.b = b; this.k = k; }\n    long weight() { return (a + b) * k; }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static String solve(String spec) {\n        long[] g = new long[3];\n        String[] parts = spec.split(String.valueOf((char) 59));\n        for (int i = 0; i < parts.length; i++) {\n            if (parts[i].length() == 0) continue;\n            String[] p = parts[i].split(String.valueOf((char) 44));\n            Node n = p[0].equals(\"N\")\n                ? new Num(Long.parseLong(p[1]))\n                : new Pair(Long.parseLong(p[1]), Long.parseLong(p[2]), Long.parseLong(p[3]));\n            g[i % 3] += n.weight();\n        }\n        return g[0] + \",\" + g[1] + \",\" + g[2];\n    }\n}\n\nabstract class Node {\n    abstract long weight();\n}\n\nclass Num extends Node {\n    final long v;\n    Num(long v) { this.v = v; }\n    long weight() { return v; }\n}\n\nclass Pair extends Node {\n    final long a, b, k;\n    Pair(long a, long b, long k) { this.a = a; this.b = b; this.k = k; }\n    long weight() { return (a + b) * k; }\n}\n",
      "tests": [
        {
          "name": "混合分组",
          "args": [
            "N,5;P,3,4,2;N,10"
          ],
          "expect": "5,14,10",
          "cmp": "exact"
        },
        {
          "name": "负数权重",
          "args": [
            "N,-5;P,-3,4,2"
          ],
          "expect": "-5,2,0",
          "cmp": "exact"
        },
        {
          "name": "空输入",
          "args": [
            ""
          ],
          "expect": "0,0,0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大系数",
          "args": [
            "P,1000000,1000000,1000000"
          ],
          "expect": "2000000000000,0,0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20261002,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=1+r.nextInt(15); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)59); if(r.nextInt(2)==0){ b.append('N').append((char)44).append(r.nextInt(2001)-1000); } else { b.append('P').append((char)44).append(r.nextInt(2001)-1000).append((char)44).append(r.nextInt(2001)-1000).append((char)44).append(1+r.nextInt(50)); } } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static String solve(String spec){ long[] g=new long[3]; String[] ps=spec.split(String.valueOf((char)59)); for(int i=0;i<ps.length;i++){ if(ps[i].length()==0) continue; String[] p=ps[i].split(String.valueOf((char)44)); long w; if(p[0].equals(\"N\")) w=Long.parseLong(p[1]); else w=(Long.parseLong(p[1])+Long.parseLong(p[2]))*Long.parseLong(p[3]); g[i%3]+=w; } return g[0]+\",\"+g[1]+\",\"+g[2]; } }"
      },
      "hints": [
        "分组键是记录下标 % 3, 不是商品类型",
        "长整型累加避免大系数相乘溢出",
        "空输入时 split 返回长度为 1 的字符串数组, 需要用 length()==0 跳过"
      ]
    },
    {
      "id": "ch10-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "归并排序模板方法(对拍暴力逆序对)",
      "tags": [
        "模板方法",
        "归并排序",
        "分治",
        "对拍"
      ],
      "q": "给出模板方法骨架: 抽象父类 Sorter 定义了 final int sort(int[] a, int lo, int hi) —— 它先做分治递归, 再调用抽象方法 merge(a, lo, mid, hi) 完成合并; 子类 MergeSorter 实现 merge, 并在合并过程中统计逆序对(当右半部分元素先出队时, 左半部分剩余元素个数即为新增逆序对数)。请实现 Main.solve(int[] a): 返回数组中的逆序对数量, 即满足 i<j 且 a[i]>a[j] 的数对个数。约束: n ≤ 1e5, |a[i]| ≤ 1e9, 结果必须用 long 返回。本题随机对拍一个 O(n²) 暴力参考实现。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[]"
        ],
        "ret": "long"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "import java.util.*;\n\npublic class Main {\n    public static long solve(int[] a) {\n        // TODO: 借 MergeSorter(继承 Sorter)完成排序与统计\n        return 0L;\n    }\n}\n\nabstract class Sorter {\n    long count = 0L;\n\n    final int[] sort(int[] a, int lo, int hi) {\n        if (lo >= hi) return a;\n        int mid = (lo + hi) >>> 1;\n        sort(a, lo, mid);\n        sort(a, mid + 1, hi);\n        merge(a, lo, mid, hi);\n        return a;\n    }\n\n    abstract void merge(int[] a, int lo, int mid, int hi);\n}\n\nclass MergeSorter extends Sorter {\n    void merge(int[] a, int lo, int mid, int hi) {\n        // TODO: 合并两个有序段, 并在取右段元素时累加 count\n    }\n}\n",
      "solution": "import java.util.*;\n\npublic class Main {\n    public static long solve(int[] a) {\n        if (a.length < 2) return 0L;\n        int[] b = a.clone();\n        MergeSorter s = new MergeSorter();\n        s.sort(b, 0, b.length - 1);\n        return s.count;\n    }\n}\n\nabstract class Sorter {\n    long count = 0L;\n\n    final int[] sort(int[] a, int lo, int hi) {\n        if (lo >= hi) return a;\n        int mid = (lo + hi) >>> 1;\n        sort(a, lo, mid);\n        sort(a, mid + 1, hi);\n        merge(a, lo, mid, hi);\n        return a;\n    }\n\n    abstract void merge(int[] a, int lo, int mid, int hi);\n}\n\nclass MergeSorter extends Sorter {\n    void merge(int[] a, int lo, int mid, int hi) {\n        int[] tmp = new int[hi - lo + 1];\n        int i = lo, j = mid + 1, k = 0;\n        while (i <= mid && j <= hi) {\n            if (a[i] <= a[j]) tmp[k++] = a[i++];\n            else { count += mid - i + 1; tmp[k++] = a[j++]; }\n        }\n        while (i <= mid) tmp[k++] = a[i++];\n        while (j <= hi) tmp[k++] = a[j++];\n        System.arraycopy(tmp, 0, a, lo, tmp.length);\n    }\n}\n",
      "tests": [
        {
          "name": "常规样例",
          "args": [
            "2,4,1,3,5"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "已排序",
          "args": [
            "1,2,3,4"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "7"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "完全逆序",
          "args": [
            "9,8,7,6,5,4,3,2,1"
          ],
          "expect": "36",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "含相等元素",
          "args": [
            "3,3,1"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20261003,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(14); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(9)-4); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static long solve(int[] a){ long c=0; for(int i=0;i<a.length;i++) for(int j=i+1;j<a.length;j++) if(a[i]>a[j]) c++; return c; } }"
      },
      "hints": [
        "子类只有 merge 需要实现, 分治骨架由父类 final 方法固定, 这就是模板方法",
        "取右段元素时, 左段剩余 (mid - i + 1) 个元素都比它大, 一次性累加",
        "相等元素不算逆序对, 判断要用 a[i] <= a[j]"
      ]
    },
    {
      "id": "ch10-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计图形工厂 ShapeFactory",
      "tags": [
        "设计",
        "工厂模式",
        "继承",
        "多态"
      ],
      "q": "在同一文件中实现 class ShapeFactory(不要改类名, 保留 public class Main 占位):\\n· 构造方法已给出, 无需改动;\\n· Shape create(String spec): spec 形如 'rect,2,3' / 'circle,1' / 'square,4' / 'tri,3,4' / 'trapezoid,2,3,4', 返回对应的图形对象(要求返回的每个图形都是 Shape 的子类实例, 判题会用 getClass().getSimpleName() 校验类名与类型);\\n· double area(Shape s): 返回该图形的面积;\\n· double perimeter(Shape s): 返回该图形的周长;\\n· String typeOf(Shape s): 返回图形的小写类名。\\n面积/周长规则: rect(w,h) = w*h / 2*(w+h); square(a) = a*a / 4*a; circle(r) = πr² / 2πr; tri(b,h) 为底 b 高 h 的三角形, 面积 b*h/2, 周长按 3*b 计(等边假设); trapezoid(a,b,h) = (a+b)*h/2, 周长按 a+b+2*h 计。约束: spec 非法(未知类型或参数个数不符)时 create 返回 null, 后续方法对 null 返回 -1.0 或空字符串 \"null\"。判题按操作序列调用你的类, 期望值按 double 的规范化写法给出(整数带 .0)。",
      "mode": "design",
      "entry": {
        "className": "ShapeFactory"
      },
      "ops": [
        [
          "ShapeFactory",
          [],
          []
        ],
        [
          "typeOf",
          [
            "rect,2,3"
          ],
          [
            "String"
          ]
        ],
        [
          "area",
          [
            "rect,2,3"
          ],
          [
            "String"
          ]
        ],
        [
          "perimeter",
          [
            "rect,2,3"
          ],
          [
            "String"
          ]
        ],
        [
          "area",
          [
            "circle,1"
          ],
          [
            "String"
          ]
        ],
        [
          "area",
          [
            "square,5"
          ],
          [
            "String"
          ]
        ],
        [
          "area",
          [
            "tri,3,4"
          ],
          [
            "String"
          ]
        ],
        [
          "perimeter",
          [
            "tri,3,4"
          ],
          [
            "String"
          ]
        ],
        [
          "area",
          [
            "trapezoid,2,3,4"
          ],
          [
            "String"
          ]
        ],
        [
          "perimeter",
          [
            "trapezoid,2,3,4"
          ],
          [
            "String"
          ]
        ],
        [
          "typeOf",
          [
            "bad,1"
          ],
          [
            "String"
          ]
        ],
        [
          "area",
          [
            "bad,1"
          ],
          [
            "String"
          ]
        ],
        [
          "perimeter",
          [
            "bad,1"
          ],
          [
            "String"
          ]
        ],
        [
          "typeOf",
          [
            "circle"
          ],
          [
            "String"
          ]
        ]
      ],
      "expect": [
        "null",
        "\"Rect\"",
        "6.0",
        "10.0",
        "3.141592653589793",
        "25.0",
        "6.0",
        "9.0",
        "10.0",
        "13.0",
        "null",
        "-1.0",
        "-1.0",
        "null"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass Shape {\n    String kind() { return getClass().getSimpleName(); }\n    double area() { return 0.0; }\n    double perimeter() { return 0.0; }\n}\n\n// TODO: 定义 Rect / Square / Circle / Tri / Trapezoid 五个子类, 各自重写 area 与 perimeter\n\nclass ShapeFactory {\n    String typeOf(String spec) { return null; }\n    double area(String spec) { return -1.0; }\n    double perimeter(String spec) { return -1.0; }\n\n    private Shape create(String spec) { return null; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass Shape {\n    String kind() { return getClass().getSimpleName(); }\n    double area() { return 0.0; }\n    double perimeter() { return 0.0; }\n}\n\nclass Rect extends Shape {\n    final double w, h;\n    Rect(double w, double h) { this.w = w; this.h = h; }\n    double area() { return w * h; }\n    double perimeter() { return 2.0 * (w + h); }\n}\n\nclass Square extends Shape {\n    final double a;\n    Square(double a) { this.a = a; }\n    double area() { return a * a; }\n    double perimeter() { return 4.0 * a; }\n}\n\nclass Circle extends Shape {\n    final double r;\n    Circle(double r) { this.r = r; }\n    double area() { return Math.PI * r * r; }\n    double perimeter() { return 2.0 * Math.PI * r; }\n}\n\nclass Tri extends Shape {\n    final double b, h;\n    Tri(double b, double h) { this.b = b; this.h = h; }\n    double area() { return b * h / 2.0; }\n    double perimeter() { return 3.0 * b; }\n}\n\nclass Trapezoid extends Shape {\n    final double a, b, h;\n    Trapezoid(double a, double b, double h) { this.a = a; this.b = b; this.h = h; }\n    double area() { return (a + b) * h / 2.0; }\n    double perimeter() { return a + b + 2.0 * h; }\n}\n\nclass ShapeFactory {\n    String typeOf(String spec) { Shape s = create(spec); return s == null ? null : s.kind(); }\n\n    double area(String spec) {\n        Shape s = create(spec);\n        return s == null ? -1.0 : s.area();\n    }\n\n    double perimeter(String spec) {\n        Shape s = create(spec);\n        return s == null ? -1.0 : s.perimeter();\n    }\n\n    private Shape create(String spec) {\n        String[] p = spec.split(String.valueOf((char) 44), -1);\n        if (p[0].equals(\"rect\") && p.length == 3) return new Rect(d(p[1]), d(p[2]));\n        if (p[0].equals(\"square\") && p.length == 2) return new Square(d(p[1]));\n        if (p[0].equals(\"circle\") && p.length == 2) return new Circle(d(p[1]));\n        if (p[0].equals(\"tri\") && p.length == 3) return new Tri(d(p[1]), d(p[2]));\n        if (p[0].equals(\"trapezoid\") && p.length == 4) return new Trapezoid(d(p[1]), d(p[2]), d(p[3]));\n        return null;\n    }\n\n    private static double d(String s) { return Double.parseDouble(s); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "工厂方法内部返回 Shape 引用, 真实对象是各子类, 这就是多态",
        "typeOf 用 getClass().getSimpleName() 就能拿到子类类名, 不要手动拼字符串",
        "参数个数不符时也要返回 null, 用长度判断即可"
      ]
    },
    {
      "id": "ch10-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计责任链 HandlerChain",
      "tags": [
        "设计",
        "责任链",
        "继承",
        "多态短路"
      ],
      "q": "在同一文件中实现 class HandlerChain: 构造 HandlerChain() 建一条链, 链上依次是三种处理器(是否启用由 add 决定)。接口为:\\n· add(String name, int cap): 追加一个处理器(无返回值); 处理器名与语义为 'limit'(金额 > cap 则拒付), 'balance'(余额不足则拒付), 'risk'(金额 ≥ cap 则转入人工复核)。注意同一个名字可以被 add 多次, 每次都以它自己的 cap 生效;\\n· handle(int amount): 从头依次询问每个处理器, 处理器返回 'OK' 表示放行继续, 返回 'REJECT' 表示直接拒绝并终止整条链, 返回 'REVIEW' 表示转人工并终止整条链。返回最终结果(没有处理器时返回 'OK')。\\n判题按操作序列调用你的类, 无返回值的方法期望 null。",
      "mode": "design",
      "entry": {
        "className": "HandlerChain"
      },
      "ops": [
        [
          "HandlerChain",
          [],
          []
        ],
        [
          "handle",
          [
            50
          ],
          [
            "int"
          ]
        ],
        [
          "add",
          [
            "limit",
            100
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "handle",
          [
            50
          ],
          [
            "int"
          ]
        ],
        [
          "handle",
          [
            150
          ],
          [
            "int"
          ]
        ],
        [
          "add",
          [
            "risk",
            80
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "handle",
          [
            90
          ],
          [
            "int"
          ]
        ],
        [
          "add",
          [
            "balance",
            60
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "handle",
          [
            100
          ],
          [
            "int"
          ]
        ],
        [
          "add",
          [
            "limit",
            1000
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "handle",
          [
            99999
          ],
          [
            "int"
          ]
        ]
      ],
      "expect": [
        "null",
        "\"OK\"",
        "null",
        "\"OK\"",
        "\"REJECT\"",
        "null",
        "\"REVIEW\"",
        "null",
        "\"REVIEW\"",
        "null",
        "\"REJECT\""
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nabstract class Handler {\n    final int cap;\n    Handler(int cap) { this.cap = cap; }\n    abstract String decide(int amount);\n}\n\n// TODO: 定义 LimitHandler / BalanceHandler / RiskHandler 三个子类, 各自实现 decide\n\nclass HandlerChain {\n    HandlerChain() { }\n    void add(String name, int cap) { }\n    String handle(int amount) { return \"OK\"; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nabstract class Handler {\n    final int cap;\n    Handler(int cap) { this.cap = cap; }\n    abstract String decide(int amount);\n}\n\nclass LimitHandler extends Handler {\n    LimitHandler(int cap) { super(cap); }\n    String decide(int amount) { return amount > cap ? \"REJECT\" : \"OK\"; }\n}\n\nclass BalanceHandler extends Handler {\n    BalanceHandler(int cap) { super(cap); }\n    String decide(int amount) { return amount > cap ? \"REJECT\" : \"OK\"; }\n}\n\nclass RiskHandler extends Handler {\n    RiskHandler(int cap) { super(cap); }\n    String decide(int amount) { return amount >= cap ? \"REVIEW\" : \"OK\"; }\n}\n\nclass HandlerChain {\n    private final List<Handler> chain = new ArrayList<Handler>();\n\n    HandlerChain() { }\n\n    void add(String name, int cap) {\n        if (name.equals(\"limit\")) chain.add(new LimitHandler(cap));\n        else if (name.equals(\"balance\")) chain.add(new BalanceHandler(cap));\n        else if (name.equals(\"risk\")) chain.add(new RiskHandler(cap));\n    }\n\n    String handle(int amount) {\n        for (Handler h : chain) {\n            String r = h.decide(amount);\n            if (!r.equals(\"OK\")) return r;\n        }\n        return \"OK\";\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "责任链的关键是短路: 一旦某个处理器不返回 OK 就立刻结束",
        "三个处理器都继承同一个抽象父类, handle 里用父类引用调用 decide 自然多态",
        "add 只是追加, 无返回值, 判题期望 null"
      ]
    },
    {
      "id": "ch10-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计银行账户体系与责任链审计",
      "tags": [
        "设计",
        "继承",
        "多态",
        "责任链",
        "审计",
        "BOSS"
      ],
      "q": "本章 Boss: 把继承、多态、构造链、super 与责任链串成一个迷你账务系统。\\n\\n请在同一文件中实现 class AccountBook(保留 public class Main 占位):\\n· 构造 AccountBook(int auditLimit): 创建账本; auditLimit 是审计阈值(>0 时在责任链头部放一个 limit 处理器);\\n· open(String owner, int credit): 开一个储蓄账户(类名 SaverAccount), 初始余额 0, 授信额度 credit; 返回账户编号(从 1 开始递增);\\n· deposit(int id, int amount): 存款, 余额增加, 返回 \"acc{id}:{余额}\";\\n· withdraw(int id, int amount): 取款, 余额减少, 返回 \"acc{id}:{余额}\"; 若超出可透支范围则拒绝, 返回 \"acc{id}:{原余额}\";\\n· transfer(int from, int to, int amount): 从 from 转给 to, 返回 \"acc{from}:{余额A},acc{to}:{余额B}\";\\n· addLimit(int cap): 在责任链尾部追加 limit 处理器(返回 null);\\n· addRisk(int cap): 在责任链尾部追加 risk 处理器(返回 null);\\n· audit(): 按编号升序对每个账户做一次审计, 返回 \"acc{id}:{OK|REJECT|REVIEW}\" 用 | 连接;\\n· creditLimit(int id): 返回该账户的授信额度。\\n\\n规则(全部必须遵守):\\n1) 账户有抽象父类 Account, 子类 SaverAccount 提供差异化的授信逻辑: SaverAccount 的 credit 语义是 \\\"可透支额度\\\";\\n2) 取款允许把余额取成负数, 但负数余额的绝对值不得超过 credit, 否则该笔取款被拒绝且余额不变;\\n3) 转账等价于 \\\"从 from 取 amount, 再存入 to\\\", 但两步必须原子: 若 from 侧不满足取款约束, 则两边余额都不变, 返回两个账户的原余额格式;\\n4) 责任链按追加顺序执行: limit 处理器在金额 > cap 时返回 REJECT; risk 处理器在金额 ≥ cap 时返回 REVIEW; 任一处理器非 OK 即短路结束, 全部 OK 才返回 OK; 空链一律 OK;\\n5) 审计把该账户余额的绝对值送进责任链, 链的返回值直接作为该账户的审计结论(空链为 OK)。\\n\\n约束: 账户数 ≤ 1000, 金额 ≤ 1e9, 账户编号一定存在; 判题按操作序列调用你的类, 字符串结果按精确比较(判题器对 String 结果加双引号, 题面两种写法都接受)。",
      "mode": "design",
      "entry": {
        "className": "AccountBook"
      },
      "ops": [
        [
          "AccountBook",
          [
            100
          ],
          [
            "int"
          ]
        ],
        [
          "open",
          [
            "Ann",
            50
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "open",
          [
            "Bob",
            20
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "deposit",
          [
            1,
            200
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "withdraw",
          [
            1,
            100
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "audit",
          [],
          []
        ],
        [
          "addRisk",
          [
            60
          ],
          [
            "int"
          ]
        ],
        [
          "audit",
          [],
          []
        ],
        [
          "withdraw",
          [
            2,
            100
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "withdraw",
          [
            2,
            5
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "transfer",
          [
            1,
            2,
            30
          ],
          [
            "int",
            "int",
            "int"
          ]
        ],
        [
          "audit",
          [],
          []
        ],
        [
          "transfer",
          [
            1,
            2,
            100
          ],
          [
            "int",
            "int",
            "int"
          ]
        ],
        [
          "audit",
          [],
          []
        ],
        [
          "addLimit",
          [
            80
          ],
          [
            "int"
          ]
        ],
        [
          "audit",
          [],
          []
        ],
        [
          "creditLimit",
          [
            2
          ],
          [
            "int"
          ]
        ]
      ],
      "expect": [
        "null",
        "1",
        "2",
        "\"acc1:200\"",
        "\"acc1:100\"",
        "\"acc1:OK|acc2:OK\"",
        "null",
        "\"acc1:REVIEW|acc2:OK\"",
        "\"acc2:0\"",
        "\"acc2:-5\"",
        "\"acc1:70,acc2:25\"",
        "\"acc1:REVIEW|acc2:OK\"",
        "\"acc1:-30,acc2:125\"",
        "\"acc1:OK|acc2:REJECT\"",
        "null",
        "\"acc1:OK|acc2:REJECT\"",
        "20"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nabstract class Account {\n    final int id;\n    final String owner;\n    final int credit;\n    long balance = 0L;\n\n    Account(int id, String owner, int credit) { this.id = id; this.owner = owner; this.credit = credit; }\n\n    abstract boolean canWithdraw(long amount);\n}\n\n// TODO: 定义 SaverAccount extends Account, 实现 canWithdraw\n// TODO: 定义 Handler / HandlerChain(limit 与 risk 两种处理器)\n\nclass AccountBook {\n    AccountBook(int auditLimit) { }\n\n    int open(String owner, int credit) { return 0; }\n    String deposit(int id, int amount) { return null; }\n    String withdraw(int id, int amount) { return null; }\n    String transfer(int from, int to, int amount) { return null; }\n    void addLimit(int cap) { }\n    void addRisk(int cap) { }\n    String audit() { return null; }\n    int creditLimit(int id) { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nabstract class Account {\n    final int id;\n    final String owner;\n    final int credit;\n    long balance = 0L;\n\n    Account(int id, String owner, int credit) { this.id = id; this.owner = owner; this.credit = credit; }\n\n    abstract boolean canWithdraw(long amount);\n\n    String tag(long v) { return \"acc\" + id + \":\" + v; }\n    String tagged(Object v) { return \"acc\" + id + \":\" + v; }\n}\n\nclass SaverAccount extends Account {\n    SaverAccount(int id, String owner, int credit) { super(id, owner, credit); }\n\n    boolean canWithdraw(long amount) { return balance - amount >= -credit; }\n}\n\nabstract class Handler {\n    final int cap;\n    Handler(int cap) { this.cap = cap; }\n    abstract String decide(long amount);\n}\n\nclass LimitHandler extends Handler {\n    LimitHandler(int cap) { super(cap); }\n    String decide(long amount) { return amount > cap ? \"REJECT\" : \"OK\"; }\n}\n\nclass RiskHandler extends Handler {\n    RiskHandler(int cap) { super(cap); }\n    String decide(long amount) { return amount >= cap ? \"REVIEW\" : \"OK\"; }\n}\n\nclass HandlerChain {\n    private final List<Handler> chain = new ArrayList<Handler>();\n\n    void addLimit(int cap) { chain.add(new LimitHandler(cap)); }\n    void addRisk(int cap) { chain.add(new RiskHandler(cap)); }\n\n    String run(long amount) {\n        for (Handler h : chain) {\n            String r = h.decide(amount);\n            if (!r.equals(\"OK\")) return r;\n        }\n        return \"OK\";\n    }\n\n    boolean isEmpty() { return chain.isEmpty(); }\n}\n\nclass AccountBook {\n    private final Map<Integer, Account> byId = new LinkedHashMap<Integer, Account>();\n    private final HandlerChain chain = new HandlerChain();\n    private int seq = 0;\n\n    AccountBook(int auditLimit) {\n        if (auditLimit > 0) chain.addLimit(auditLimit);\n    }\n\n    int open(String owner, int credit) {\n        seq++;\n        byId.put(seq, new SaverAccount(seq, owner, credit));\n        return seq;\n    }\n\n    String deposit(int id, int amount) {\n        Account a = byId.get(id);\n        a.balance += amount;\n        return a.tag(a.balance);\n    }\n\n    String withdraw(int id, int amount) {\n        Account a = byId.get(id);\n        if (!a.canWithdraw(amount)) return a.tag(a.balance);\n        a.balance -= amount;\n        return a.tag(a.balance);\n    }\n\n    String transfer(int from, int to, int amount) {\n        Account f = byId.get(from), t = byId.get(to);\n        if (!f.canWithdraw(amount)) return f.tag(f.balance) + \",\" + t.tag(t.balance);\n        f.balance -= amount;\n        t.balance += amount;\n        return f.tag(f.balance) + \",\" + t.tag(t.balance);\n    }\n\n    void addLimit(int cap) { chain.addLimit(cap); }\n\n    void addRisk(int cap) { chain.addRisk(cap); }\n\n    String audit() {\n        StringBuilder b = new StringBuilder();\n        for (Map.Entry<Integer, Account> e : byId.entrySet()) {\n            if (b.length() > 0) b.append('|');\n            long v = Math.abs(e.getValue().balance);\n            b.append(e.getValue().tagged(chain.run(v)));\n        }\n        return b.toString();\n    }\n\n    int creditLimit(int id) { return byId.get(id).credit; }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "先把\"账户\"这个对象要携带的状态定下来（余额、授信额度、编号），再考虑操作怎么做",
        "转账必须先把 from 侧校验做完再动两边余额, 否则会出现半转账",
        "SaverAccount 的 canWithdraw 里用 super 拿到的 balance/credit, 判据是 balance - amount >= -credit",
        "审计用 Math.abs(余额) 送进责任链, limit 的 cap 由构造参数决定, risk 的 cap 由 addRisk 决定",
        "账户编号必须按 open 的先后递增, 用 LinkedHashMap 或数组都能保证升序"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "AccountBook",
              [
                100
              ],
              [
                "int"
              ]
            ],
            [
              "open",
              [
                "Ann",
                50
              ],
              [
                "String",
                "int"
              ]
            ],
            [
              "open",
              [
                "Bob",
                20
              ],
              [
                "String",
                "int"
              ]
            ],
            [
              "deposit",
              [
                1,
                200
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "withdraw",
              [
                1,
                100
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "audit",
              [],
              []
            ],
            [
              "addRisk",
              [
                60
              ],
              [
                "int"
              ]
            ],
            [
              "audit",
              [],
              []
            ],
            [
              "withdraw",
              [
                2,
                100
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "withdraw",
              [
                2,
                5
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "transfer",
              [
                1,
                2,
                30
              ],
              [
                "int",
                "int",
                "int"
              ]
            ],
            [
              "audit",
              [],
              []
            ],
            [
              "transfer",
              [
                1,
                2,
                100
              ],
              [
                "int",
                "int",
                "int"
              ]
            ],
            [
              "audit",
              [],
              []
            ],
            [
              "addLimit",
              [
                80
              ],
              [
                "int"
              ]
            ],
            [
              "audit",
              [],
              []
            ],
            [
              "creditLimit",
              [
                2
              ],
              [
                "int"
              ]
            ]
          ],
          "expect": [
            "null",
            "1",
            "2",
            "\"acc1:200\"",
            "\"acc1:100\"",
            "\"acc1:OK|acc2:OK\"",
            "null",
            "\"acc1:REVIEW|acc2:OK\"",
            "\"acc2:0\"",
            "\"acc2:-5\"",
            "\"acc1:70,acc2:25\"",
            "\"acc1:REVIEW|acc2:OK\"",
            "\"acc1:-30,acc2:125\"",
            "\"acc1:OK|acc2:REJECT\"",
            "null",
            "\"acc1:OK|acc2:REJECT\"",
            "20"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "AccountBook",
              [
                50
              ]
            ],
            [
              "open",
              [
                "Zed",
                0
              ]
            ],
            [
              "deposit",
              [
                1,
                10
              ]
            ],
            [
              "withdraw",
              [
                1,
                10
              ]
            ],
            [
              "withdraw",
              [
                1,
                1
              ]
            ],
            [
              "audit"
            ],
            [
              "deposit",
              [
                1,
                100
              ]
            ],
            [
              "addRisk",
              [
                0
              ]
            ],
            [
              "audit"
            ],
            [
              "addRisk",
              [
                200
              ]
            ],
            [
              "audit"
            ],
            [
              "creditLimit",
              [
                1
              ]
            ]
          ],
          "expect": [
            "null",
            "1",
            "\"acc1:10\"",
            "\"acc1:0\"",
            "\"acc1:0\"",
            "\"acc1:OK\"",
            "\"acc1:100\"",
            "null",
            "\"acc1:REJECT\"",
            "null",
            "\"acc1:REJECT\"",
            "0"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
