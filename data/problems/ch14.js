window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 14,
  "title": "数值精度、大数与底层表示",
  "courseRef": "黑马第14章-Math/System/Object/包装类/BigInteger与BigDecimal + 进阶数据结构",
  "levels": [
    {
      "id": "ch14-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "钱的加法: 浮点陷阱与 BigDecimal",
      "tags": [
        "浮点陷阱",
        "BigDecimal",
        "精度"
      ],
      "q": "实现 addMoney(double a, double b):两位小数精确相加, 返回四舍五入到 2 位的 double。约束 -1e9 ≤ a,b ≤ 1e9。注意 double 无法精确表示 0.1/0.2, 必须先把加数按十进制字面量转成 BigDecimal 再相加, 用 double 直接相加会得到 0.30000000000000004 一类的偏差。",
      "mode": "method",
      "entry": {
        "method": "addMoney",
        "params": [
          "double",
          "double"
        ],
        "ret": "double"
      },
      "starter": "public class Main {\n    public static double addMoney(double a, double b) {\n        // TODO: 用 BigDecimal(String) 而不是 double 直接加\n        return a + b;\n    }\n}\n",
      "solution": "import java.math.*;\n\npublic class Main {\n    public static double addMoney(double a, double b) {\n        BigDecimal x = new BigDecimal(String.valueOf(a));\n        BigDecimal y = new BigDecimal(String.valueOf(b));\n        return x.add(y).setScale(2, RoundingMode.HALF_UP).doubleValue();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "0.1",
            "0.2"
          ],
          "expect": "0.3",
          "cmp": "exact"
        },
        {
          "name": "整数",
          "args": [
            "4",
            "5"
          ],
          "expect": "9.0",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "-1.1",
            "-2.2"
          ],
          "expect": "-3.3",
          "cmp": "exact"
        },
        {
          "name": "大额进位",
          "args": [
            "999999999.99",
            "0.01"
          ],
          "expect": "1000000000.0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "零",
          "args": [
            "0",
            "0"
          ],
          "expect": "0.0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "new BigDecimal(String.valueOf(a)) 保留用户看到的十进制字面量",
        "用 new BigDecimal(a) 走 double 构造器会把 0.1 的二进制误差原样带进来",
        "doubleValue() 之后整数按 9.0 / 1000000000.0 的形式序列化, 注意不是科学计数法"
      ]
    },
    {
      "id": "ch14-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "兼容 parseInt 的任意进制解析",
      "tags": [
        "进制",
        "位运算",
        "溢出检测"
      ],
      "q": "实现 toRadix(long v, int radix):把十进制数 v 转成 radix(2..36) 进制字符串, 10..35 用小写字母 a..z, 负数保留前导 '-'。要求语义与 Long.toString(long, int) 完全一致(负数按绝对值转换, 不做补码展开)。约束 radix 保证在 2..36 内, v 为任意 long。",
      "mode": "method",
      "entry": {
        "method": "toRadix",
        "params": [
          "long",
          "int"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String toRadix(long v, int radix) {\n        // TODO: 处理 0 与负数, 短除法取余后反转\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String toRadix(long v, int radix) {\n        if (v == 0) return \"0\";\n        String d = \"0123456789abcdefghijklmnopqrstuvwxyz\";\n        boolean neg = v < 0;\n        StringBuilder sb = new StringBuilder();\n        long x = neg ? -v : v;\n        while (x != 0) { sb.append(d.charAt((int) (x % radix))); x /= radix; }\n        if (neg) sb.append('-');\n        return sb.reverse().toString();\n    }\n}\n",
      "tests": [
        {
          "name": "二进制",
          "args": [
            "10",
            "2"
          ],
          "expect": "\"1010\"",
          "cmp": "exact"
        },
        {
          "name": "三十六进制",
          "args": [
            "12345678",
            "36"
          ],
          "expect": "\"7clzi\"",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "-255",
            "16"
          ],
          "expect": "\"-ff\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "零",
          "args": [
            "0",
            "2"
          ],
          "expect": "\"0\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "long最大值的36进制",
          "args": [
            "9223372036854775807",
            "36"
          ],
          "expect": "\"1y2p0ij32e8e7\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "-Long.MIN_VALUE 会溢出, 但本题输入按十进制解析, 可用 long x = neg ? -v : v 后再处理",
        "字符表用字符串索引最简洁: d.charAt(x % radix)",
        "结果要 reverse, 因为短除法先得到低位"
      ]
    },
    {
      "id": "ch14-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "浮点安全相等判定(epsilon)",
      "tags": [
        "epsilon",
        "浮点比较",
        "ULP"
      ],
      "q": "实现 approxEqual(double a, double b, double eps):|a-b| ≤ eps 时返回 true, 否则 false。NaN 与任何值(含 NaN)都不相等; ±Infinity 仅在符号相同时相等。约束 a,b 为任意 double, 0 ≤ eps。",
      "mode": "method",
      "entry": {
        "method": "approxEqual",
        "params": [
          "double",
          "double",
          "double"
        ],
        "ret": "boolean"
      },
      "starter": "public class Main {\n    public static boolean approxEqual(double a, double b, double eps) {\n        // TODO: 先排除 NaN 与无穷, 再比较差值\n        return false;\n    }\n}\n",
      "solution": "public class Main {\n    public static boolean approxEqual(double a, double b, double eps) {\n        if (Double.isNaN(a) || Double.isNaN(b)) return false;\n        if (Double.isInfinite(a) || Double.isInfinite(b)) return a == b;\n        return Math.abs(a - b) <= eps;\n    }\n}\n",
      "tests": [
        {
          "name": "浮点误差",
          "args": [
            "0.1",
            "0.3",
            "0.2"
          ],
          "expect": "true",
          "cmp": "exact"
        },
        {
          "name": "超过阈值",
          "args": [
            "1.0",
            "1.1",
            "0.01"
          ],
          "expect": "false",
          "cmp": "exact"
        },
        {
          "name": "NaN 不自等",
          "args": [
            "NaN",
            "NaN",
            "1.0"
          ],
          "expect": "false",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "同号无穷",
          "args": [
            "Infinity",
            "Infinity",
            "0"
          ],
          "expect": "true",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "异号无穷差为 NaN",
          "args": [
            "Infinity",
            "-Infinity",
            "1000000"
          ],
          "expect": "false",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "Infinity - Infinity 结果是 NaN, NaN <= eps 恒为 false, 所以无穷必须单独判",
        "用 abs(a-b) <= eps 而不是 abs(a-b) < eps, 边界取等号"
      ]
    },
    {
      "id": "ch14-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "按总位数四舍五入",
      "tags": [
        "有效数字",
        "BigDecimal",
        "舍入模式"
      ],
      "q": "实现 roundDigits(double x, int digits):把 x 按十进制字面量保留 digits 位有效数字(四舍五入)后返回 double。约定 x=0.0 时返回 0.0。约束 digits ≥ 1, x 为有限值(可能为负); 若 x 的有效数字个数本身就不超过 digits, 原样返回, 不要补零缩放。例如 x=1234.5678 且 digits=3 时约为 1230.0; 而 x=0.05 且 digits=1 时原样返回 0.05。",
      "mode": "method",
      "entry": {
        "method": "roundDigits",
        "params": [
          "double",
          "int"
        ],
        "ret": "double"
      },
      "starter": "import java.math.*;\n\npublic class Main {\n    public static double roundDigits(double x, int digits) {\n        // TODO: MathContext 表示有效数字个数, 直接用 BigDecimal.round\n        return x;\n    }\n}\n",
      "solution": "import java.math.*;\n\npublic class Main {\n    public static double roundDigits(double x, int digits) {\n        if (x == 0.0) return 0.0;\n        BigDecimal b = new BigDecimal(String.valueOf(x));\n        return b.round(new MathContext(digits, RoundingMode.HALF_UP)).doubleValue();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1234.5678",
            "3"
          ],
          "expect": "1230.0",
          "cmp": "exact"
        },
        {
          "name": "无需舍入",
          "args": [
            "123.4",
            "5"
          ],
          "expect": "123.4",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0",
            "3"
          ],
          "expect": "0.0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负数",
          "args": [
            "-123.45",
            "4"
          ],
          "expect": "-123.5",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "小数进位",
          "args": [
            "0.099999",
            "2"
          ],
          "expect": "0.1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "有效位不足",
          "args": [
            "0.05",
            "1"
          ],
          "expect": "0.05",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "MathContext(digits, RoundingMode.HALF_UP) 就是\"保留 digits 位有效数字\", 比手算 scale 可靠得多",
        "不要用 setScale(digits - precision): 1234.5678 的 precision 是 8, setScale(-5) 会得到 0.0",
        "有效数字本来就不超过 digits 时, round 会原样返回, 0.05 用 digits=1 仍是 0.05"
      ]
    },
    {
      "id": "ch14-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "十进制位数字乘积",
      "tags": [
        "BigInteger",
        "大数",
        "字符串"
      ],
      "q": "实现 digitProduct(String s):s 是只含数字字符的非负十进制整数(可能极长, 长度 ≤ 200, 无前导零, 至少一位), 返回各位数字之积。结果可能远超 long 范围, 必须用 BigInteger 累乘后返回十进制字符串。",
      "mode": "method",
      "entry": {
        "method": "digitProduct",
        "params": [
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String digitProduct(String s) {\n        // TODO: 逐位 new BigInteger(String.valueOf(c)).multiply(...)\n        return \"0\";\n    }\n}\n",
      "solution": "import java.math.*;\n\npublic class Main {\n    public static String digitProduct(String s) {\n        BigInteger p = BigInteger.ONE;\n        for (int i = 0; i < s.length(); i++) {\n            int d = s.charAt(i) - '0';\n            if (d == 0) return \"0\";\n            p = p.multiply(BigInteger.valueOf(d));\n        }\n        return p.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "12345"
          ],
          "expect": "\"120\"",
          "cmp": "exact"
        },
        {
          "name": "单个数字",
          "args": [
            "7"
          ],
          "expect": "\"7\"",
          "cmp": "exact"
        },
        {
          "name": "含零",
          "args": [
            "102030"
          ],
          "expect": "\"0\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全九(超 long)",
          "args": [
            "9999999999999999999999999999999999999999"
          ],
          "expect": "\"147808829414345923316083210206383297601\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "遇到字符 '0' 可以直接返回 \"0\", 省掉 40 次乘法",
        "全 9 串是检验是否偷偷用 long 的关键用例"
      ]
    },
    {
      "id": "ch14-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "整数平方根(大数版)",
      "tags": [
        "牛顿迭代",
        "BigInteger",
        "溢出"
      ],
      "q": "实现 sqrtFloor(long n):返回 floor(sqrt(n)), 即最大的满足 r*r ≤ n 的非负整数 r。约束 0 ≤ n ≤ Long.MAX_VALUE。注意 1e18 量级的 n 用 int/long 直接相乘会溢出, 也不要用 Math.sqrt 再修正以外的取整方式(浮点在大数上会丢精度), 建议用 BigInteger 做精确判定。",
      "mode": "method",
      "entry": {
        "method": "sqrtFloor",
        "params": [
          "long"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    public static long sqrtFloor(long n) {\n        // TODO: 牛顿迭代 + BigInteger 精确校正\n        return 0L;\n    }\n}\n",
      "solution": "import java.math.*;\n\npublic class Main {\n    public static long sqrtFloor(long n) {\n        if (n <= 0) return 0;\n        BigInteger N = BigInteger.valueOf(n);\n        BigInteger x = BigInteger.valueOf(Math.max(1, (long) Math.sqrt((double) n)));\n        while (true) {\n            BigInteger nx = x.add(N.divide(x)).shiftRight(1);\n            if (nx.compareTo(x) >= 0) break;\n            x = nx;\n        }\n        while (x.multiply(x).compareTo(N) > 0) x = x.subtract(BigInteger.ONE);\n        while (x.add(BigInteger.ONE).multiply(x.add(BigInteger.ONE)).compareTo(N) <= 0) x = x.add(BigInteger.ONE);\n        return x.longValue();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "10"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "完全平方",
          "args": [
            "9"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "完全平方数边界",
          "args": [
            "72057594037927936"
          ],
          "expect": "268435456",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "最大值",
          "args": [
            "9223372036854775807"
          ],
          "expect": "3037000499",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "牛顿迭代式: x = (x + n/x) / 2, 从 x ≥ √n 出发会单调下降到 floor(√n) 或略低",
        "浮点 Math.sqrt 只作为初值, 必须用乘方比较做一次上下的校正",
        "中间量 r*r 用 BigInteger, 避免 long 溢出"
      ]
    },
    {
      "id": "ch14-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "枚举子集求异或和",
      "tags": [
        "位运算",
        "枚举子集",
        "溢出"
      ],
      "q": "实现 subsetXorSum(int[] a):返回 a 的所有非空子集的异或和之和。子集用下标集合定义, 元素个数 n ≤ 20, 元素 0 ≤ a[i] ≤ 1e9。注意两个子集即使异或值相同也要分别计入。",
      "mode": "method",
      "entry": {
        "method": "subsetXorSum",
        "params": [
          "int[]"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    public static long subsetXorSum(int[] a) {\n        // TODO: 用 1..(1<<n)-1 枚举掩码\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long subsetXorSum(int[] a) {\n        int n = a.length;\n        long sum = 0;\n        for (int mask = 1; mask < (1 << n); mask++) {\n            int x = 0;\n            for (int i = 0; i < n; i++) if ((mask & (1 << i)) != 0) x ^= a[i];\n            sum += x;\n        }\n        return sum;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,3"
          ],
          "expect": "6",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "5"
          ],
          "expect": "5",
          "cmp": "exact"
        },
        {
          "name": "带零",
          "args": [
            "0,0"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "三元素",
          "args": [
            "1,2,4"
          ],
          "expect": "28",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "掩码从 1 开始就天然排除了空集",
        "n ≤ 20 时 1<<n 仍在 int 范围内, 但累加和要用 long"
      ]
    },
    {
      "id": "ch14-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "分数类的最小四则化简",
      "tags": [
        "有理数",
        "gcd",
        "不可变性"
      ],
      "q": "实现 fracOp(long a, long b, long c, long d, String op):计算 (a/b) op (c/d), 其中 op 取 \"add\"、\"sub\"、\"mul\"、\"div\" 之一(分别表示 +、-、×、÷), 返回最简分数 \"num/den\"。规则: 分母恒正; 结果为 0 时输出 \"0/1\"; 分数必须约到最简(用 gcd)。约束: b,d,c ≠ 0; op=\"div\" 时 c ≠ 0; |a|,|b|,|c|,|d| ≤ 1e9, 中间乘积可能达到 1e18, 全程用 long 计算。",
      "mode": "method",
      "entry": {
        "method": "fracOp",
        "params": [
          "long",
          "long",
          "long",
          "long",
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String fracOp(long a, long b, long c, long d, String op) {\n        // TODO: 先算分子分母, 再统一处理符号并约分\n        return \"0/1\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String fracOp(long a, long b, long c, long d, String op) {\n        long num, den;\n        if (op.equals(\"add\")) { num = a * d + c * b; den = b * d; }\n        else if (op.equals(\"sub\")) { num = a * d - c * b; den = b * d; }\n        else if (op.equals(\"mul\")) { num = a * c; den = b * d; }\n        else { num = a * d; den = b * c; }\n        if (den < 0) { num = -num; den = -den; }\n        long g = gcd(Math.abs(num), den);\n        if (g == 0) g = 1;\n        num /= g; den /= g;\n        return num + \"/\" + den;\n    }\n\n    private static long gcd(long x, long y) {\n        while (y != 0) { long t = x % y; x = y; y = t; }\n        return x;\n    }\n}\n",
      "tests": [
        {
          "name": "加法",
          "args": [
            "1",
            "3",
            "1",
            "6",
            "add"
          ],
          "expect": "\"1/2\"",
          "cmp": "exact"
        },
        {
          "name": "零结果",
          "args": [
            "1",
            "2",
            "1",
            "2",
            "sub"
          ],
          "expect": "\"0/1\"",
          "cmp": "exact"
        },
        {
          "name": "乘法负号归位",
          "args": [
            "2",
            "3",
            "3",
            "-4",
            "mul"
          ],
          "expect": "\"-1/2\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "减法跨零",
          "args": [
            "1",
            "3",
            "2",
            "3",
            "sub"
          ],
          "expect": "\"-1/3\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "除法",
          "args": [
            "1",
            "2",
            "3",
            "4",
            "div"
          ],
          "expect": "\"2/3\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大数四则",
          "args": [
            "1000000000",
            "999999999",
            "999999999",
            "1000000000",
            "add"
          ],
          "expect": "\"1999999998000000001/999999999000000000\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "符号统一交给分母: den < 0 时分子分母同时取反, 之后 gcd 只用正数",
        "gcd(0, den) = den, 结果 0 会自动化简成 0/1",
        "字符串里不要出现空格, 判题按原样比较"
      ]
    },
    {
      "id": "ch14-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "new BigDecimal(double) 的真相",
      "tags": [
        "BigDecimal",
        "double构造器",
        "舍入"
      ],
      "q": "实现 moneyRounded(double amount):把 amount 四舍五入到 2 位小数后返回 double。必须使用 new BigDecimal(amount) 这个 double 构造器精确表示 amount 的二进制值, 再做 setScale(2, RoundingMode.HALF_UP)。约束 amount 为有限 double。因为二进制表示的误差, 结果与 DecimalFormat 的 1.005 -> 1.01 不同, 请按本方法的精确语义返回。",
      "mode": "method",
      "entry": {
        "method": "moneyRounded",
        "params": [
          "double"
        ],
        "ret": "double"
      },
      "starter": "public class Main {\n    public static double moneyRounded(double amount) {\n        // TODO: 注意这里刻意要求用 new BigDecimal(double) 构造器\n        return amount;\n    }\n}\n",
      "solution": "import java.math.*;\n\npublic class Main {\n    public static double moneyRounded(double amount) {\n        return new BigDecimal(amount).setScale(2, RoundingMode.HALF_UP).doubleValue();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1234.5678"
          ],
          "expect": "1234.57",
          "cmp": "exact"
        },
        {
          "name": "整数",
          "args": [
            "100"
          ],
          "expect": "100.0",
          "cmp": "exact"
        },
        {
          "name": "负零附近",
          "args": [
            "-0.05"
          ],
          "expect": "-0.05",
          "cmp": "exact"
        },
        {
          "name": "二进制误差",
          "args": [
            "1.005"
          ],
          "expect": "1.0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "正好落在中点",
          "args": [
            "2.675"
          ],
          "expect": "2.67",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "new BigDecimal(1.005) 的真实值是 1.00499999999999989..., 所以 HALF_UP 得到 1.0",
        "对照题 L04: new BigDecimal(\"1.005\") 才会得到 1.01, 这正是本关想让你体会的差别",
        "doubleValue() 后再序列化, 2.67 就是 2.67"
      ]
    },
    {
      "id": "ch14-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "大数乘法与 BigInteger 一致性",
      "tags": [
        "大数乘法",
        "BigInteger",
        "对拍"
      ],
      "q": "实现 bigMul(String x, String y):两个十进制非负整数串(无前导零, 可为 \"0\")的乘积, 返回十进制字符串, 结果可能长达 160 位。约束两个长度均 ≤ 80。本题使用随机对拍:会与 BigInteger.multiply 的参考实现比对大量随机用例, 比拼的正是你的竖式乘法与进位处理。",
      "mode": "stress",
      "entry": {
        "method": "bigMul",
        "params": [
          "String",
          "String"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String bigMul(String x, String y) {\n        // TODO: 竖式乘法: int[] 存每一位, 最后统一处理进位与前导零\n        return \"0\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String bigMul(String x, String y) {\n        int n = x.length(), m = y.length();\n        int[] r = new int[n + m];\n        for (int i = n - 1; i >= 0; i--) {\n            int a = x.charAt(i) - '0';\n            for (int j = m - 1; j >= 0; j--) {\n                r[i + j + 1] += a * (y.charAt(j) - '0');\n            }\n        }\n        for (int k = r.length - 1; k > 0; k--) { r[k - 1] += r[k] / 10; r[k] %= 10; }\n        StringBuilder sb = new StringBuilder();\n        int i = 0;\n        while (i < r.length - 1 && r[i] == 0) i++;\n        for (; i < r.length; i++) sb.append((char) ('0' + r[i]));\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "12",
            "34"
          ],
          "expect": "408",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0",
            "123"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "进位链",
          "args": [
            "999",
            "999"
          ],
          "expect": "998001",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "长乘长",
          "args": [
            "12345678901234567890",
            "98765432109876543210"
          ],
          "expect": "1219326311370217952237463801111263526900",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260414,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ String x=rnd(r), y=rnd(r); return new String[]{ x, y }; } static String rnd(java.util.Random r){ int len=1+r.nextInt(9); StringBuilder b=new StringBuilder(); b.append((char)(49+r.nextInt(9))); for(int i=1;i<len;i++) b.append((char)(48+r.nextInt(10))); return b.toString(); } }",
        "ref": "import java.math.BigInteger;\npublic class Ref { public static String bigMul(String x, String y){ return new BigInteger(x).multiply(new BigInteger(y)).toString(); } }"
      },
      "hints": [
        "r[i+j+1] 的偏移量刚好让最后一位对齐, 不必一开始就逐位进位",
        "统一进位要从低位向高位扫; 最高位可能再溢出, 但 r[0] 已经留了位置",
        "去掉前导零时至少保留一位, 才能让 0×n 输出 \"0\""
      ]
    },
    {
      "id": "ch14-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "分数类与 double 近似一致性",
      "tags": [
        "有理数",
        "gcd",
        "对拍"
      ],
      "q": "实现 fracAdd(String f1, String f2):两个分数串形如 \"a/b\", 计算和并按最简分数 \"num/den\" 返回(分母为正, 结果为整数时输出 \"n/1\")。约束 |分子|,|分母| ≤ 1e9 且分母 ≠ 0, 输入已最简但不保证分母为正。本题随机对拍:参考实现用 BigInteger 精确加法, 用来检验你的 long 路线是否在约分/符号上出错。",
      "mode": "stress",
      "entry": {
        "method": "fracAdd",
        "params": [
          "String",
          "String"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String fracAdd(String f1, String f2) {\n        // TODO: 交叉相乘求分子, 分母相乘, 再用 gcd 约分\n        return \"0/1\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String fracAdd(String f1, String f2) {\n        long[] p = parse(f1), q = parse(f2);\n        long num = p[0] * q[1] + q[0] * p[1];\n        long den = p[1] * q[1];\n        if (den < 0) { num = -num; den = -den; }\n        long g = gcd(Math.abs(num), den);\n        if (g == 0) g = 1;\n        return (num / g) + \"/\" + (den / g);\n    }\n\n    private static long[] parse(String s) {\n        int k = s.indexOf('/');\n        return new long[]{ Long.parseLong(s.substring(0, k)), Long.parseLong(s.substring(k + 1)) };\n    }\n\n    private static long gcd(long x, long y) {\n        while (y != 0) { long t = x % y; x = y; y = t; }\n        return x;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1/3",
            "1/6"
          ],
          "expect": "1/2",
          "cmp": "exact"
        },
        {
          "name": "结果为整数",
          "args": [
            "1/2",
            "1/2"
          ],
          "expect": "1/1",
          "cmp": "exact"
        },
        {
          "name": "负分母归一",
          "args": [
            "1/-2",
            "1/-2"
          ],
          "expect": "-1/1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "和为负",
          "args": [
            "1/4",
            "-3/4"
          ],
          "expect": "-1/2",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260515,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ return new String[]{ f(r), f(r) }; } static String f(java.util.Random r){ long a=r.nextInt(2001)-1000; long b=1+r.nextInt(1000); if(r.nextBoolean()) b=-b; return a + \"/\" + b; } }",
        "ref": "import java.math.BigInteger;\npublic class Ref { public static String fracAdd(String f1, String f2){ BigInteger[] p=parse(f1), q=parse(f2); BigInteger num=p[0].multiply(q[1]).add(q[0].multiply(p[1])); BigInteger den=p[1].multiply(q[1]); if(den.signum()<0){ num=num.negate(); den=den.negate(); } BigInteger g=num.gcd(den); if(g.signum()==0) g=BigInteger.ONE; return num.divide(g)+\"/\"+den.divide(g); } static BigInteger[] parse(String s){ int k=s.indexOf(47); return new BigInteger[]{ new BigInteger(s.substring(0,k)), new BigInteger(s.substring(k+1)) }; } }"
      },
      "hints": [
        "分母为负时统一翻号, 否则 gcd 的正负会让输出不稳定",
        "gcd(0, den) == den, 所以 0 的和会化成 \"0/1\"",
        "输入已最简时可以用 a/g1*b/g1 的小技巧, 但直接交叉相乘在本题规模内也够用"
      ]
    },
    {
      "id": "ch14-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "定点小数乘法(缩放一致性)",
      "tags": [
        "定点数",
        "BigDecimal",
        "对拍"
      ],
      "q": "实现 fixedMul(int x, int y, int scale):x、y 是放大 10^scale 倍的整数(定点表示), 返回它们真实乘积同样放大 10^scale 倍后的整数, 采用 HALF_UP 舍入(即 (x*y)/10^scale 四舍五入)。约束 scale ∈ [0,9], |x|,|y| ≤ 1e9, 乘积可达 1e18。本题随机对拍:参考实现用 BigDecimal 做精确乘除与舍入。",
      "mode": "stress",
      "entry": {
        "method": "fixedMul",
        "params": [
          "int",
          "int",
          "int"
        ],
        "ret": "long"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long fixedMul(int x, int y, int scale) {\n        // TODO: product = (long)x*y; 再按 10^scale 做 HALF_UP 舍入\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long fixedMul(int x, int y, int scale) {\n        long p = (long) x * (long) y;\n        long f = 1;\n        for (int i = 0; i < scale; i++) f *= 10;\n        if (scale == 0) return p;\n        if (p >= 0) return (p + f / 2) / f;\n        return -((-p + f / 2) / f);\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "12345",
            "100",
            "2"
          ],
          "expect": "12345",
          "cmp": "exact"
        },
        {
          "name": "scale为0",
          "args": [
            "3",
            "7",
            "0"
          ],
          "expect": "21",
          "cmp": "exact"
        },
        {
          "name": "负数舍入",
          "args": [
            "-15",
            "-15",
            "1"
          ],
          "expect": "23",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大数",
          "args": [
            "1000000000",
            "1000000000",
            "9"
          ],
          "expect": "1000000000",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260616,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int x=r.nextInt(20001)-10000; int y=r.nextInt(20001)-10000; int s=r.nextInt(10); return new String[]{ String.valueOf(x), String.valueOf(y), String.valueOf(s) }; } }",
        "ref": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\npublic class Ref { public static long fixedMul(int x, int y, int scale){ BigDecimal p=new BigDecimal(x).multiply(new BigDecimal(y)); BigDecimal d=BigDecimal.ONE.scaleByPowerOfTen(scale); return p.divide(d, 0, RoundingMode.HALF_UP).longValue(); } }"
      },
      "hints": [
        "先用 long 承接乘积, 不要用 int 相乘",
        "负数的 HALF_UP 等价于 -(abs(p) + f/2) / f, 直接对负数做整数除法会朝零取整",
        "(p + f/2) / f 利用了 f 为偶数, 对正数恰好是 HALF_UP"
      ]
    },
    {
      "id": "ch14-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计分数类 Fraction",
      "tags": [
        "设计",
        "不可变性",
        "gcd"
      ],
      "q": "在同一文件中实现 class Fraction(不要改类名, public class Main 保留占位)。要求:Fration(long num, long den) 构造, 构造后内部保存最简形式且分母恒正(零表示为 0/1);reset(long num, long den) 重新装载一个分数并回到同样规范;add(long n, long d) 把 n/d 加到自身(原地累加, 无返回值);toString() 返回 \"num/den\";value() 返回 double 近似值。判题会先构造一次, 之后反复 reset/add/toString/value, 无返回值操作期望 null。",
      "mode": "design",
      "entry": {
        "className": "Fraction"
      },
      "ops": [
        [
          "Fraction",
          [
            0,
            1
          ],
          [
            "long",
            "long"
          ]
        ],
        [
          "reset",
          [
            1,
            3
          ],
          [
            "long",
            "long"
          ]
        ],
        [
          "add",
          [
            1,
            6
          ],
          [
            "long",
            "long"
          ]
        ],
        [
          "toString",
          [],
          []
        ],
        [
          "value",
          [],
          []
        ],
        [
          "add",
          [
            1,
            -2
          ],
          [
            "long",
            "long"
          ]
        ],
        [
          "toString",
          [],
          []
        ],
        [
          "value",
          [],
          []
        ],
        [
          "reset",
          [
            0,
            5
          ],
          [
            "long",
            "long"
          ]
        ],
        [
          "toString",
          [],
          []
        ],
        [
          "reset",
          [
            -4,
            -8
          ],
          [
            "long",
            "long"
          ]
        ],
        [
          "toString",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "\"1/2\"",
        "0.5",
        "null",
        "\"0/1\"",
        "0.0",
        "null",
        "\"0/1\"",
        "null",
        "\"1/2\""
      ],
      "cmp": "exact",
      "starter": "class Fraction {\n    // TODO: 构造/reset 都要约分并归一符号, add 原地累加后再次约分\n    public Fraction(long num, long den) { }\n    public void reset(long num, long den) { }\n    public void add(long n, long d) { }\n    public double value() { return 0.0; }\n    public String toString() { return \"0/1\"; }\n}\n\npublic class Main { }\n",
      "solution": "class Fraction {\n    private long num = 0;\n    private long den = 1;\n\n    public Fraction(long n, long d) { reset(n, d); }\n\n    public void reset(long n, long d) {\n        if (d < 0) { n = -n; d = -d; }\n        long g = gcd(Math.abs(n), d);\n        if (g == 0) g = 1;\n        num = n / g;\n        den = d / g;\n    }\n\n    public void add(long n, long d) {\n        long nn = num * d + n * den;\n        long dd = den * d;\n        if (dd < 0) { nn = -nn; dd = -dd; }\n        long g = gcd(Math.abs(nn), dd);\n        if (g == 0) g = 1;\n        num = nn / g;\n        den = dd / g;\n    }\n\n    public double value() { return (double) num / den; }\n\n    public String toString() { return num + \"/\" + den; }\n\n    private static long gcd(long x, long y) {\n        while (y != 0) { long t = x % y; x = y; y = t; }\n        return x;\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "把约分与符号归一集中写在 reset 里, 构造器直接委托给它, 不变量就只有一处维护",
        "分母为负时把负号搬到分子, 这样 toString 永远规范",
        "add 是原地累加, 每一步都要重新约分, 否则 1/3 + 1/6 会输出 9/18",
        "reset(0, 5) 必须归一成 \"0/1\", 而不是 \"0/5\""
      ]
    },
    {
      "id": "ch14-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计大整数累加器 BigAcc",
      "tags": [
        "设计",
        "大数",
        "取模"
      ],
      "q": "在同一文件中实现 class BigAcc(不要改类名, public class Main 保留占位)。要求:BigAcc(int mod) 构造(m=1 表示不取模的精确模式, m>1 表示所有报告都对 m 取模);clear() 清零并把 add 计数归零;add(String v) 累加一个十进制大整数串(长度 ≤ 400, 非负且无前导零);mulBy(long k) 把当前和乘以 k(0 ≤ k ≤ 1e9);sum() 返回和的十进制串(m=1 时为精确值, 可达数百位; m>1 时为 [0,m) 内的余数);count() 返回 add 的调用次数。判题先构造一次, 之后反复调用这些方法, 无返回值操作期望 null。",
      "mode": "design",
      "entry": {
        "className": "BigAcc"
      },
      "ops": [
        [
          "BigAcc",
          [
            1
          ],
          [
            "int"
          ]
        ],
        [
          "clear",
          [],
          []
        ],
        [
          "add",
          [
            "12"
          ],
          [
            "String"
          ]
        ],
        [
          "add",
          [
            "30"
          ],
          [
            "String"
          ]
        ],
        [
          "sum",
          [],
          []
        ],
        [
          "count",
          [],
          []
        ],
        [
          "mulBy",
          [
            10
          ],
          [
            "long"
          ]
        ],
        [
          "sum",
          [],
          []
        ],
        [
          "add",
          [
            "9999999999999999999999999999999999999999"
          ],
          [
            "String"
          ]
        ],
        [
          "sum",
          [],
          []
        ],
        [
          "clear",
          [],
          []
        ],
        [
          "sum",
          [],
          []
        ],
        [
          "count",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "null",
        "\"42\"",
        "2",
        "null",
        "\"420\"",
        "null",
        "\"10000000000000000000000000000000000000419\"",
        "null",
        "\"0\"",
        "0"
      ],
      "cmp": "exact",
      "starter": "import java.math.*;\n\nclass BigAcc {\n    // TODO: 用 BigInteger 保存精确值, mod > 1 时报告前先取模\n    public BigAcc(int mod) { }\n    public void clear() { }\n    public void add(String v) { }\n    public void mulBy(long k) { }\n    public String sum() { return \"0\"; }\n    public long count() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.math.*;\n\nclass BigAcc {\n    private final BigInteger mod;\n    private BigInteger total = BigInteger.ZERO;\n    private long count = 0;\n\n    public BigAcc(int m) { mod = m <= 1 ? null : BigInteger.valueOf(m); }\n\n    public void clear() { total = BigInteger.ZERO; count = 0; }\n\n    public void add(String v) {\n        total = total.add(new BigInteger(v));\n        count++;\n        if (mod != null) total = total.mod(mod);\n    }\n\n    public void mulBy(long k) {\n        total = total.multiply(BigInteger.valueOf(k));\n        if (mod != null) total = total.mod(mod);\n    }\n\n    public String sum() { return total.toString(); }\n\n    public long count() { return count; }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "构造器参数 m=1 表示精确模式, 用 null 表示不取模最直观",
        "count 统计 add 的调用次数, mulBy 不计入, clear 要把它归零",
        "取模模式下每次运算后归约, 精确模式下绝不归约, 这样 sum() 才能输出数百位",
        "本题 ops 用的是精确模式: 420 加上 40 个 9 之后结果长达 42 位, 用 long 会直接溢出"
      ]
    },
    {
      "id": "ch14-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计十进制大数 BigInt",
      "tags": [
        "设计",
        "大数加减乘",
        "进位/借位"
      ],
      "q": "在同一文件中实现 class BigInt(不要改类名, public class Main 保留占位)。要求:BigInt(String v) 用十进制串构造(可为负、无前导零, 但也要能接受 \"-0\" 与 \"000\");load(String v) 重新装载;add(String v) 返回 this+v 的结果串;subtract(String v) 返回 this-v 的结果串;multiply(String v) 返回 this*v 的结果串;所有运算都不修改内部状态。结果串必须规范: 负数带 '-', 零输出 \"0\", 无前导零。判题先构造一次, 之后反复调用这些方法比对返回的十进制串, 无返回值操作期望 null。",
      "mode": "design",
      "entry": {
        "className": "BigInt"
      },
      "ops": [
        [
          "BigInt",
          [
            "0"
          ],
          [
            "String"
          ]
        ],
        [
          "load",
          [
            "12345678901234567890"
          ],
          [
            "String"
          ]
        ],
        [
          "add",
          [
            "12340"
          ],
          [
            "String"
          ]
        ],
        [
          "subtract",
          [
            "12340"
          ],
          [
            "String"
          ]
        ],
        [
          "multiply",
          [
            "12340"
          ],
          [
            "String"
          ]
        ],
        [
          "subtract",
          [
            "12345678901234567890"
          ],
          [
            "String"
          ]
        ],
        [
          "load",
          [
            "-12340"
          ],
          [
            "String"
          ]
        ],
        [
          "add",
          [
            "12340"
          ],
          [
            "String"
          ]
        ],
        [
          "subtract",
          [
            "1"
          ],
          [
            "String"
          ]
        ],
        [
          "multiply",
          [
            "-1"
          ],
          [
            "String"
          ]
        ],
        [
          "load",
          [
            "99999999999999999999"
          ],
          [
            "String"
          ]
        ],
        [
          "multiply",
          [
            "99999999999999999999"
          ],
          [
            "String"
          ]
        ],
        [
          "load",
          [
            "-0"
          ],
          [
            "String"
          ]
        ],
        [
          "add",
          [
            "0"
          ],
          [
            "String"
          ]
        ],
        [
          "load",
          [
            "000"
          ],
          [
            "String"
          ]
        ],
        [
          "multiply",
          [
            "-5"
          ],
          [
            "String"
          ]
        ]
      ],
      "expect": [
        "null",
        "null",
        "\"12345678901234580230\"",
        "\"12345678901234555550\"",
        "\"152345677641234567762600\"",
        "\"0\"",
        "null",
        "\"0\"",
        "\"-12341\"",
        "\"12340\"",
        "null",
        "\"9999999999999999999800000000000000000001\"",
        "null",
        "\"0\"",
        "null",
        "\"0\""
      ],
      "cmp": "exact",
      "starter": "class BigInt {\n    // TODO: 内部存\"符号 + 无前导零的绝对值串\"; add/subtract/multiply 返回结果串且不改状态\n    public BigInt(String v) { }\n    public void load(String v) { }\n    public String add(String v) { return \"0\"; }\n    public String subtract(String v) { return \"0\"; }\n    public String multiply(String v) { return \"0\"; }\n    public String toString() { return \"0\"; }\n}\n\npublic class Main { }\n",
      "solution": "class BigInt {\n    private String digits = \"0\";\n    private boolean neg = false;\n\n    public BigInt(String v) { load(v); }\n\n    private BigInt(String d, boolean n) { digits = d; neg = n; }\n\n    public void load(String v) {\n        boolean n = v.startsWith(\"-\");\n        String d = trim(n ? v.substring(1) : v);\n        if (d.equals(\"0\")) n = false;\n        digits = d;\n        neg = n;\n    }\n\n    public String add(String v) {\n        BigInt o = new BigInt(v);\n        if (neg == o.neg) return wrap(uadd(digits, o.digits), neg);\n        int c = ucmp(digits, o.digits);\n        if (c == 0) return \"0\";\n        if (c > 0) return wrap(usub(digits, o.digits), neg);\n        return wrap(usub(o.digits, digits), o.neg);\n    }\n\n    public String subtract(String v) {\n        BigInt o = new BigInt(v);\n        return add(new BigInt(o.digits, !o.neg).toString());\n    }\n\n    public String multiply(String v) {\n        BigInt o = new BigInt(v);\n        return wrap(umul(digits, o.digits), neg != o.neg);\n    }\n\n    public String toString() { return wrap(digits, neg); }\n\n    private static String wrap(String d, boolean n) {\n        String t = trim(d);\n        if (t.equals(\"0\")) return \"0\";\n        return (n ? \"-\" : \"\") + t;\n    }\n\n    private static String trim(String s) {\n        int i = 0;\n        while (i < s.length() - 1 && s.charAt(i) == '0') i++;\n        return s.substring(i);\n    }\n\n    private static String uadd(String a, String b) {\n        StringBuilder sb = new StringBuilder();\n        int i = a.length() - 1, j = b.length() - 1, c = 0;\n        while (i >= 0 || j >= 0 || c > 0) {\n            int s = c + (i >= 0 ? a.charAt(i--) - '0' : 0) + (j >= 0 ? b.charAt(j--) - '0' : 0);\n            sb.append((char) ('0' + s % 10));\n            c = s / 10;\n        }\n        return sb.reverse().toString();\n    }\n\n    private static String usub(String a, String b) {\n        StringBuilder sb = new StringBuilder();\n        int i = a.length() - 1, j = b.length() - 1, br = 0;\n        while (i >= 0) {\n            int s = (a.charAt(i--) - '0') - br - (j >= 0 ? b.charAt(j--) - '0' : 0);\n            if (s < 0) { s += 10; br = 1; } else br = 0;\n            sb.append((char) ('0' + s));\n        }\n        return trim(sb.reverse().toString());\n    }\n\n    private static String umul(String a, String b) {\n        int n = a.length(), m = b.length();\n        int[] r = new int[n + m];\n        for (int i = n - 1; i >= 0; i--)\n            for (int j = m - 1; j >= 0; j--)\n                r[i + j + 1] += (a.charAt(i) - '0') * (b.charAt(j) - '0');\n        for (int k = r.length - 1; k > 0; k--) { r[k - 1] += r[k] / 10; r[k] %= 10; }\n        StringBuilder sb = new StringBuilder();\n        int i = 0;\n        while (i < r.length - 1 && r[i] == 0) i++;\n        for (; i < r.length; i++) sb.append((char) ('0' + r[i]));\n        return sb.toString();\n    }\n\n    private static int ucmp(String a, String b) {\n        if (a.length() != b.length()) return a.length() < b.length() ? -1 : 1;\n        return a.compareTo(b);\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "内部统一存\"符号 + 无前导零的绝对值串\", 所有难点就收敛成无符号加减乘",
        "减法用\"加相反数\"实现: this - o = this + (-o), 这样只需维护加法一支",
        "load 必须把 \"-0\" 和 \"000\" 都归一成 \"0\", 否则结果串会漏出 \"-0\"",
        "乘法先累加 r[i+j+1], 最后从低位统一进位, 前导零只保留一位; 进位不是每次循环都做的"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "BigInt",
              [
                "0"
              ],
              [
                "String"
              ]
            ],
            [
              "load",
              [
                "12345678901234567890"
              ],
              [
                "String"
              ]
            ],
            [
              "add",
              [
                "12340"
              ],
              [
                "String"
              ]
            ],
            [
              "subtract",
              [
                "12340"
              ],
              [
                "String"
              ]
            ],
            [
              "multiply",
              [
                "12340"
              ],
              [
                "String"
              ]
            ],
            [
              "subtract",
              [
                "12345678901234567890"
              ],
              [
                "String"
              ]
            ],
            [
              "load",
              [
                "-12340"
              ],
              [
                "String"
              ]
            ],
            [
              "add",
              [
                "12340"
              ],
              [
                "String"
              ]
            ],
            [
              "subtract",
              [
                "1"
              ],
              [
                "String"
              ]
            ],
            [
              "multiply",
              [
                "-1"
              ],
              [
                "String"
              ]
            ],
            [
              "load",
              [
                "99999999999999999999"
              ],
              [
                "String"
              ]
            ],
            [
              "multiply",
              [
                "99999999999999999999"
              ],
              [
                "String"
              ]
            ],
            [
              "load",
              [
                "-0"
              ],
              [
                "String"
              ]
            ],
            [
              "add",
              [
                "0"
              ],
              [
                "String"
              ]
            ],
            [
              "load",
              [
                "000"
              ],
              [
                "String"
              ]
            ],
            [
              "multiply",
              [
                "-5"
              ],
              [
                "String"
              ]
            ]
          ],
          "expect": [
            "null",
            "null",
            "\"12345678901234580230\"",
            "\"12345678901234555550\"",
            "\"152345677641234567762600\"",
            "\"0\"",
            "null",
            "\"0\"",
            "\"-12341\"",
            "\"12340\"",
            "null",
            "\"9999999999999999999800000000000000000001\"",
            "null",
            "\"0\"",
            "null",
            "\"0\""
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "BigInt",
              [
                "-0"
              ]
            ],
            [
              "add",
              [
                "0"
              ]
            ],
            [
              "multiply",
              [
                "-5"
              ]
            ],
            [
              "load",
              [
                "000"
              ]
            ],
            [
              "subtract",
              [
                "0"
              ]
            ],
            [
              "load",
              [
                "5"
              ]
            ],
            [
              "subtract",
              [
                "5"
              ]
            ],
            [
              "add",
              [
                "-5"
              ]
            ],
            [
              "multiply",
              [
                "0"
              ]
            ],
            [
              "load",
              [
                "-1"
              ]
            ],
            [
              "multiply",
              [
                "-1"
              ]
            ],
            [
              "load",
              [
                "1000000000000000000000"
              ]
            ],
            [
              "multiply",
              [
                "1000000000000000000000"
              ]
            ]
          ],
          "expect": [
            "null",
            "\"0\"",
            "\"0\"",
            "null",
            "\"0\"",
            "null",
            "\"0\"",
            "\"0\"",
            "\"0\"",
            "null",
            "\"1\"",
            "null",
            "\"1000000000000000000000000000000000000000000\""
          ],
          "hidden": true
        }
      ]
    }
  ]
});
