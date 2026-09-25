window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 5,
  "title": "方法与数值计算",
  "courseRef": "黑马第5章-方法 + 第14章-常用API与数值计算",
  "levels": [
    {
      "id": "ch05-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "参数合法性校验与签名",
      "tags": [
        "方法定义",
        "参数校验",
        "返回值契约",
        "Integer包装类"
      ],
      "q": "实现方法 clampToRange(String raw, int lo, int hi):把十进制文本 raw 解析为 int 并夹到闭区间 [lo, hi] 内返回。规则:raw 为 null 或空串、或含非数字字符(允许开头的可选 +/-)时返回 lo;解析结果小于 lo 返回 lo, 大于 hi 返回 hi, 否则返回原值。约束 lo ≤ hi, |lo|,|hi| ≤ 1e9, 文本可能超出 int 范围(此时按截断方向返回 lo 或 hi)。",
      "mode": "method",
      "entry": {
        "method": "clampToRange",
        "params": [
          "String",
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int clampToRange(String raw, int lo, int hi) {\n        // TODO: 先判空与非法字符, 再用 long 解析防溢出, 最后夹取\n        return lo;\n    }\n}\n",
      "solution": "public class Main {\n    public static int clampToRange(String raw, int lo, int hi) {\n        if (raw == null || raw.isEmpty()) return lo;\n        int i = 0, n = raw.length();\n        boolean neg = false;\n        if (raw.charAt(0) == '+' || raw.charAt(0) == '-') { neg = raw.charAt(0) == '-'; i = 1; }\n        if (i >= n) return lo;\n        long v = 0;\n        for (; i < n; i++) {\n            char c = raw.charAt(i);\n            if (c < '0' || c > '9') return lo;\n            v = v * 10 + (c - '0');\n            if (v > 4000000000L) v = 4000000000L;\n        }\n        if (neg) v = -v;\n        if (v < lo) return lo;\n        if (v > hi) return hi;\n        return (int) v;\n    }\n}\n",
      "tests": [
        {
          "name": "区间内",
          "args": [
            "42",
            "0",
            "100"
          ],
          "expect": "42",
          "cmp": "exact"
        },
        {
          "name": "上溢夹取",
          "args": [
            "500",
            "0",
            "100"
          ],
          "expect": "100",
          "cmp": "exact"
        },
        {
          "name": "非法字符",
          "args": [
            "4x2",
            "0",
            "100"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空串",
          "args": [
            "",
            "7",
            "100"
          ],
          "expect": "7",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "文本超int",
          "args": [
            "99999999999999",
            "0",
            "1000000000"
          ],
          "expect": "1000000000",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "parseInt 遇到超范围文本会抛 NumberFormatException, 必须自己用 long 逐位解析",
        "符号后面为空(如 \"-\")也算非法, 直接返回 lo"
      ]
    },
    {
      "id": "ch05-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "方法参数的值传递",
      "tags": [
        "值传递",
        "引用副本",
        "副作用"
      ],
      "q": "Java 只有值传递:数组参数传的是引用副本。实现方法 swapFirst(int[] a):交换 a[0] 与 a[1] 并返回交换后的 a;若 a 为 null 或长度小于 2, 原样返回 a(不抛异常)。约束 a 长度 ≤ 1000。请体会\"能改元素、不能改指向\"的区别。",
      "mode": "method",
      "entry": {
        "method": "swapFirst",
        "params": [
          "int[]"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] swapFirst(int[] a) {\n        // TODO: 交换元素本身是可见副作用; 重新赋值形参则不可见\n        return a;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] swapFirst(int[] a) {\n        if (a == null || a.length < 2) return a;\n        int t = a[0]; a[0] = a[1]; a[1] = t;\n        return a;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3"
          ],
          "expect": "[2,1,3]",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "7"
          ],
          "expect": "[7]",
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
          "name": "两元素",
          "args": [
            "9,8"
          ],
          "expect": "[8,9]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "数组内容可变是因为拿到的引用副本仍指向同一对象",
        "长度不足时返回原数组而不是新建, 判题只看返回内容"
      ]
    },
    {
      "id": "ch05-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "方法重载:按实参个数与类型选择",
      "tags": [
        "重载",
        "可变参数",
        "编译期选择"
      ],
      "q": "实现三个同名重载方法 area:area(int r) 返回半径为 r 的圆面积取整;area(int w, int h) 返回矩形面积;area(int a, int b, int c) 返回长方体表面积 2(ab+bc+ca)。要求全部用 Math.PI 计算圆面积并强转 int。约束参数均为 1..10000 的正整数。判题会按方法名 area 与参数个数反射调用对应的那个重载。",
      "mode": "method",
      "entry": {
        "method": "area",
        "params": [
          "int",
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int area(int r) {\n        // TODO\n        return 0;\n    }\n    public static int area(int w, int h) {\n        // TODO\n        return 0;\n    }\n    public static int area(int a, int b, int c) {\n        // TODO\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int area(int r) { return (int) (Math.PI * r * r); }\n    public static int area(int w, int h) { return w * h; }\n    public static int area(int a, int b, int c) { return 2 * (a * b + b * c + c * a); }\n}\n",
      "tests": [
        {
          "name": "体积重载",
          "args": [
            "2",
            "3",
            "4"
          ],
          "expect": "52",
          "cmp": "exact"
        },
        {
          "name": "同参数同函数",
          "args": [
            "1",
            "1",
            "1"
          ],
          "expect": "6",
          "cmp": "exact"
        },
        {
          "name": "边界最小值",
          "args": [
            "1",
            "1",
            "1"
          ],
          "expect": "6",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "重载由参数个数/类型在编译期决定, 与返回值无关",
        "圆面积用 (int) 强转, 小数部分直接截断"
      ]
    },
    {
      "id": "ch05-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "递归:阶乘与调用栈深度",
      "tags": [
        "递归",
        "long溢出",
        "边界"
      ],
      "q": "实现方法 factorial(int n):用递归返回 n!。约束 0 ≤ n ≤ 20。若 n 超出该范围返回 -1;n=0 与 n=1 都返回 1。注意 20! 已接近 long 上限(21! 会溢出), 所以上界是 20 而不是更大。",
      "mode": "method",
      "entry": {
        "method": "factorial",
        "params": [
          "int"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    public static long factorial(int n) {\n        // TODO: 递归基 + 越界保护\n        return -1L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long factorial(int n) {\n        if (n < 0 || n > 20) return -1L;\n        if (n <= 1) return 1L;\n        return n * factorial(n - 1);\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "5"
          ],
          "expect": "120",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "上界20",
          "args": [
            "20"
          ],
          "expect": "2432902008176640000",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "越界",
          "args": [
            "21"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "0! 与 1! 都为 1, 递归基可以合并成 n<=1",
        "long 最大约 9.22e18, 20! ≈ 2.43e18 仍在范围内"
      ]
    },
    {
      "id": "ch05-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "尾递归改写:斐波那契(O(n))",
      "tags": [
        "递归",
        "尾递归",
        "记忆化"
      ],
      "q": "实现方法 fib(int n):返回第 n 个斐波那契数, 约定 fib(0)=0, fib(1)=1。约束 0 ≤ n ≤ 90。必须做到 O(n) 时间, 禁止朴素双递归(O(2^n))。n=90 时结果在 long 范围内。",
      "mode": "method",
      "entry": {
        "method": "fib",
        "params": [
          "int"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    public static long fib(int n) {\n        // TODO: 双递归会指数爆炸, 请用累加迭代或尾递归\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long fib(int n) {\n        if (n < 0) return -1L;\n        long a = 0, b = 1;\n        for (int i = 0; i < n; i++) { long t = a + b; a = b; b = t; }\n        return a;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "10"
          ],
          "expect": "55",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "一",
          "args": [
            "1"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大n",
          "args": [
            "90"
          ],
          "expect": "2880067194370816120",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "滚动两个变量即可, 无需数组",
        "朴素 fib(n)=fib(n-1)+fib(n-2) 在 n=90 时会超时"
      ]
    },
    {
      "id": "ch05-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "递归:整数拆分方案数",
      "tags": [
        "递归",
        "分治计数",
        "组合"
      ],
      "q": "实现方法 partitions(int n, int maxPart):返回把正整数 n 拆成若干个不超过 maxPart 的正整数之和的方案数(不考虑顺序, 即 n=3 有 3=3,2+1,1+1+1 三种)。约束 0 ≤ n ≤ 30, 1 ≤ maxPart ≤ 30。n=0 时视为 1 种方案(空拆分)。",
      "mode": "method",
      "entry": {
        "method": "partitions",
        "params": [
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int partitions(int n, int maxPart) {\n        // TODO: 要么用掉一个 maxPart, 要么放弃 maxPart 这一档\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int partitions(int n, int maxPart) {\n        if (n == 0) return 1;\n        if (n < 0 || maxPart <= 0) return 0;\n        return partitions(n - maxPart, maxPart) + partitions(n, maxPart - 1);\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3",
            "3"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "限制为1",
          "args": [
            "4",
            "1"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0",
            "5"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "较大值",
          "args": [
            "20",
            "20"
          ],
          "expect": "627",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "拆分的递推本质是\"用不用 maxPart 这一档\"",
        "maxPart 大于 n 时自然退化为 partitions(n, n)"
      ]
    },
    {
      "id": "ch05-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "分治:二分快速幂",
      "tags": [
        "分治",
        "快速幂",
        "long溢出"
      ],
      "q": "实现方法 power(long base, long exp, long mod):返回 (base^exp) mod mod。约束 0 ≤ exp ≤ 1e9, 1 ≤ mod ≤ 1e9, base 为任意 long(可为负)。要求 O(log exp), 禁止循环 exp 次。注意乘法可能溢出 long, 必须用每步取模或提前防溢出; 负数底数要先化到 [0,mod) 区间。",
      "mode": "method",
      "entry": {
        "method": "power",
        "params": [
          "long",
          "long",
          "long"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    public static long power(long base, long exp, long mod) {\n        // TODO: 二分快速幂, 每一步都要 % mod\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long power(long base, long exp, long mod) {\n        long b = base % mod;\n        if (b < 0) b += mod;\n        long r = 1 % mod;\n        while (exp > 0) {\n            if ((exp & 1L) == 1L) r = (r * b) % mod;\n            b = (b * b) % mod;\n            exp >>= 1;\n        }\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "2",
            "10",
            "1000"
          ],
          "expect": "24",
          "cmp": "exact"
        },
        {
          "name": "指数为零",
          "args": [
            "5",
            "0",
            "7"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "负底数",
          "args": [
            "-2",
            "3",
            "5"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大指数",
          "args": [
            "2",
            "1000000000",
            "998244353"
          ],
          "expect": "851104391",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "(a*b)%m 里 a,b 都小于 m≤1e9, 乘积小于 1e18 不会溢出 long",
        "-2 的 3 次方是 -8, 对 5 取模要补成 2"
      ]
    },
    {
      "id": "ch05-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "分治:归并排序与调用计数",
      "tags": [
        "分治",
        "归并排序",
        "静态计数"
      ],
      "q": "实现方法 mergeSorted(int[] a) 与 countInversions(int[] a)。mergeSorted 返回升序数组(不改动入参);countInversions 返回逆序对数量 i<j 且 a[i]>a[j] 的个数, 要求分治 O(n log n), 结果用 long。约束 n ≤ 1e5。判题会对两个方法分别用参数个数反射调用:mergeSorted 收 1 个 int[], countInversions 也收 1 个 int[]。",
      "mode": "method",
      "entry": {
        "method": "countInversions",
        "params": [
          "int[]"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    public static int[] mergeSorted(int[] a) {\n        // TODO: 归并排序(不改动入参)\n        return new int[0];\n    }\n    public static long countInversions(int[] a) {\n        // TODO: 归并过程中统计跨越中点的逆序对\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] mergeSorted(int[] a) {\n        int[] b = a.clone();\n        ms(b, 0, b.length - 1);\n        return b;\n    }\n    static void ms(int[] b, int l, int r) {\n        if (l >= r) return;\n        int m = (l + r) >>> 1;\n        ms(b, l, m); ms(b, m + 1, r);\n        int[] t = new int[r - l + 1];\n        int i = l, j = m + 1, k = 0;\n        while (i <= m && j <= r) t[k++] = b[i] <= b[j] ? b[i++] : b[j++];\n        while (i <= m) t[k++] = b[i++];\n        while (j <= r) t[k++] = b[j++];\n        System.arraycopy(t, 0, b, l, t.length);\n    }\n    public static long countInversions(int[] a) {\n        return ci(a.clone(), 0, a.length - 1);\n    }\n    static long ci(int[] b, int l, int r) {\n        if (l >= r) return 0L;\n        int m = (l + r) >>> 1;\n        long c = ci(b, l, m) + ci(b, m + 1, r);\n        int[] t = new int[r - l + 1];\n        int i = l, j = m + 1, k = 0;\n        while (i <= m && j <= r) {\n            if (b[i] <= b[j]) t[k++] = b[i++];\n            else { c += m - i + 1; t[k++] = b[j++]; }\n        }\n        while (i <= m) t[k++] = b[i++];\n        while (j <= r) t[k++] = b[j++];\n        System.arraycopy(t, 0, b, l, t.length);\n        return c;\n    }\n}\n",
      "tests": [
        {
          "name": "完全逆序",
          "args": [
            "5,4,3,2,1"
          ],
          "expect": "10",
          "cmp": "exact"
        },
        {
          "name": "已有序",
          "args": [
            "1,2,3"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "含重复",
          "args": [
            "2,2,1"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单元素",
          "args": [
            "9"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "相等元素不算逆序对, 归并时左侧用 <= 才不会多计",
        "从右半取出一个元素时, 左半剩余 (m-i+1) 个都比它大"
      ]
    },
    {
      "id": "ch05-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "数值精度:浮点误差与修正",
      "tags": [
        "浮点误差",
        "epsilon",
        "Math",
        "精度"
      ],
      "q": "实现方法 safeRatio(double a, double b):计算 a/b 并把结果按\"减去 1e-9\"的误差修正:若结果的绝对值与最近的整数相差不超过 1e-9, 就吸附到该整数;否则保留原值。b 为 0 时返回 Double.NaN。约束 |a|,|b| ≤ 1e9。例如 0.1+0.2 这类累加产生的 2.9999999999999996 应吸附为 3.0。判题用 1e-9 相对误差比较(double 结果)。",
      "mode": "method",
      "entry": {
        "method": "safeRatio",
        "params": [
          "double",
          "double"
        ],
        "ret": "double"
      },
      "starter": "public class Main {\n    public static double safeRatio(double a, double b) {\n        // TODO: 先算商, 再用 Math.rint 找最近整数并做 epsilon 吸附\n        return 0.0;\n    }\n}\n",
      "solution": "public class Main {\n    public static double safeRatio(double a, double b) {\n        if (b == 0.0) return Double.NaN;\n        double q = a / b;\n        double r = Math.rint(q);\n        if (Math.abs(q - r) <= 1e-9) return r;\n        return q;\n    }\n}\n",
      "tests": [
        {
          "name": "整除",
          "args": [
            "6",
            "2"
          ],
          "expect": "3.0",
          "cmp": "float"
        },
        {
          "name": "残差吸附",
          "args": [
            "8.999999999999998",
            "3"
          ],
          "expect": "3.0",
          "cmp": "float"
        },
        {
          "name": "不吸附",
          "args": [
            "1",
            "3"
          ],
          "expect": "0.333333333",
          "cmp": "float",
          "hidden": true
        },
        {
          "name": "除零",
          "args": [
            "1",
            "0"
          ],
          "expect": "NaN",
          "cmp": "float",
          "hidden": true
        }
      ],
      "hints": [
        "Math.rint 返回最近的整数(四舍六入五取偶), 适合做吸附判断",
        "NaN 参与任何比较都为 false, 所以除零必须最先短路返回"
      ]
    },
    {
      "id": "ch05-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "对拍:大数阶乘取模",
      "tags": [
        "对拍",
        "阶乘",
        "取模",
        "O(n)"
      ],
      "q": "实现方法 solve(int n, int mod):返回 n! mod mod。约束 0 ≤ n ≤ 100000, 1 ≤ mod ≤ 1000000007。要求 O(n) 时间、O(1) 额外空间, 禁止用 BigInteger(会超时超内存)。本题用随机对拍:你的实现会与参考实现在大量随机用例上逐位比对, 任何一次结果不同即判错。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int",
          "int"
        ],
        "ret": "long"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long solve(int n, int mod) {\n        // TODO: 累乘并每步取模\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long solve(int n, int mod) {\n        long r = 1L % mod;\n        for (int i = 2; i <= n; i++) r = (r * i) % mod;\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "5",
            "1000"
          ],
          "expect": "120",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0",
            "7"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "模为1",
          "args": [
            "10",
            "1"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大n",
          "args": [
            "100000",
            "1000000007"
          ],
          "expect": "457992974",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "n=100000 上界(必须 O(n))",
          "args": [
            "100000",
            "1000000007"
          ],
          "expect": "457992974",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260501,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){\n  int mode = r.nextInt(10);\n  int n, mod;\n  if(mode < 6){ n = r.nextInt(40); mod = 1 + r.nextInt(1000000); }          // 多数小规模\n  else if(mode < 9){ int[] mm = {1, 2, 3, 1000000007, 999999937}; n = r.nextInt(2000); mod = mm[r.nextInt(mm.length)]; } // 特殊模数\n  else { n = r.nextInt(3); mod = 1 + r.nextInt(10); }                       // 0!/1! 边界\n  return new String[]{ String.valueOf(n), String.valueOf(mod) }; } }",
        "ref": "public class Ref { public static long solve(int n,int mod){ java.math.BigInteger f=java.math.BigInteger.ONE; for(int i=2;i<=n;i++) f=f.multiply(java.math.BigInteger.valueOf(i)); return f.mod(java.math.BigInteger.valueOf(mod)).longValue(); } }"
      },
      "hints": [
        "mod=1 时 1%1=0, 所有结果都是 0",
        "每步乘完立刻取模, 乘积最大约 1e9*1e5=1e14 不会溢出 long"
      ]
    },
    {
      "id": "ch05-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "对拍:矩阵快速幂",
      "tags": [
        "对拍",
        "矩阵快速幂",
        "分治",
        "long"
      ],
      "q": "矩阵按行优先展平成 long[4]:[a,b,c,d] 代表 [[a,b],[c,d]]。实现方法 solve(long[] m, long exp, long mod):返回 m 的 exp 次幂展平后的 long[4], 每个元素对 mod 取模。约束 0 ≤ exp ≤ 1e9, 1 ≤ mod ≤ 1e9, 元素 0 ≤ m[i] < mod。要求 O(log exp), 禁止循环 exp 次。本题用随机对拍, 与朴素逐次相乘的参考实现比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "long[]",
          "long",
          "long"
        ],
        "ret": "long[]"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long[] solve(long[] m, long exp, long mod) {\n        // TODO: 单位矩阵展平为 [1%mod,0,0,1%mod], 每次乘法后取模\n        return new long[4];\n    }\n}\n",
      "solution": "public class Main {\n    public static long[] solve(long[] m, long exp, long mod) {\n        long[] r = new long[]{1L % mod, 0L, 0L, 1L % mod};\n        long[] b = new long[]{m[0] % mod, m[1] % mod, m[2] % mod, m[3] % mod};\n        while (exp > 0) {\n            if ((exp & 1L) == 1L) r = mul(r, b, mod);\n            b = mul(b, b, mod);\n            exp >>= 1;\n        }\n        return r;\n    }\n    static long[] mul(long[] x, long[] y, long mod) {\n        return new long[]{\n            (x[0] * y[0] + x[1] * y[2]) % mod,\n            (x[0] * y[1] + x[1] * y[3]) % mod,\n            (x[2] * y[0] + x[3] * y[2]) % mod,\n            (x[2] * y[1] + x[3] * y[3]) % mod\n        };\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,1,1,0",
            "2",
            "100000"
          ],
          "expect": "[2,1,1,1]",
          "cmp": "exact"
        },
        {
          "name": "零次幂",
          "args": [
            "2,3,4,5",
            "0",
            "97"
          ],
          "expect": "[1,0,0,1]",
          "cmp": "exact"
        },
        {
          "name": "一次幂",
          "args": [
            "2,3,4,5",
            "1",
            "97"
          ],
          "expect": "[2,3,4,5]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大指数",
          "args": [
            "1,1,1,0",
            "1000000000",
            "1000000007"
          ],
          "expect": "[999999994,21,21,999999973]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20260502,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int mod=1+r.nextInt(1000); StringBuilder b=new StringBuilder(); for(int i=0;i<4;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(mod)); } return new String[]{ b.toString(), String.valueOf(r.nextInt(12)), String.valueOf(mod) }; } }",
        "ref": "public class Ref { public static long[] solve(long[] m,long exp,long mod){ long[] r=new long[]{1L%mod,0L,0L,1L%mod}; for(long k=0;k<exp;k++){ r=new long[]{(r[0]*m[0]+r[1]*m[2])%mod,(r[0]*m[1]+r[1]*m[3])%mod,(r[2]*m[0]+r[3]*m[2])%mod,(r[2]*m[1]+r[3]*m[3])%mod}; } return r; } }"
      },
      "hints": [
        "0 次幂是单位矩阵展平后的 [1%mod,0,0,1%mod], 不是全 0",
        "m 的元素已保证小于 mod, 乘积累加量级约 2e18, 仍在 long 范围内"
      ]
    },
    {
      "id": "ch05-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "对拍:递归转迭代(Ackermann)",
      "tags": [
        "对拍",
        "递归转迭代",
        "显式栈",
        "状态机"
      ],
      "q": "实现方法 solve(int m, int n):返回 Ackermann 函数 A(m,n) 的值, 定义为 A(0,n)=n+1; A(m,0)=A(m-1,1); A(m,n)=A(m-1, A(m, n-1))。约束 0 ≤ m ≤ 3, 0 ≤ n ≤ 8(该范围内结果不超过 2^61, 无需大数)。因为 A(3,8)=2045 的递归深度会爆栈, 请用显式栈把递归改成迭代。本题随机对拍参考实现(小规模上的直接递归)比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int",
          "int"
        ],
        "ret": "long"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long solve(int m, int n) {\n        // TODO: 用两个显式栈保存待展开的 (m,n), 避免深递归爆栈\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long solve(int m, int n) {\n        java.util.ArrayDeque<Integer> sm = new java.util.ArrayDeque<>();\n        java.util.ArrayDeque<Integer> sn = new java.util.ArrayDeque<>();\n        sm.push(m); sn.push(n);\n        long acc = -1;\n        while (!sm.isEmpty()) {\n            int cm = sm.pop(), cn = sn.pop();\n            if (acc >= 0) { cn = (int) acc; acc = -1; }\n            if (cm == 0) { acc = cn + 1L; continue; }\n            if (cn == 0) { sm.push(cm - 1); sn.push(1); continue; }\n            sm.push(cm - 1); sn.push(-1);\n            sm.push(cm); sn.push(cn - 1);\n        }\n        return acc;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1",
            "3"
          ],
          "expect": "5",
          "cmp": "exact"
        },
        {
          "name": "基础",
          "args": [
            "0",
            "7"
          ],
          "expect": "8",
          "cmp": "exact"
        },
        {
          "name": "中规模",
          "args": [
            "2",
            "4"
          ],
          "expect": "11",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "深递归上界",
          "args": [
            "3",
            "8"
          ],
          "expect": "2045",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 200,
        "seed": 20260503,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ return new String[]{ String.valueOf(r.nextInt(4)), String.valueOf(r.nextInt(6)) }; } }",
        "ref": "public class Ref { public static long solve(int m,int n){ if(m==0) return n+1L; if(n==0) return solve(m-1,1); return solve(m-1,(int)solve(m,n-1)); } }"
      },
      "hints": [
        "显式栈里用 n=-1 当占位符, 表示\"父层的 n 要等子调用结果\"",
        "A(3,8) 的递归深度可达数万层, 朴素递归必然 StackOverflowError"
      ]
    },
    {
      "id": "ch05-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计:大整数累加器 BigInteger",
      "tags": [
        "设计",
        "BigInteger",
        "不可变性",
        "API封装"
      ],
      "q": "实现 class BigAcc(不要改类名, 保留 public class Main 占位):构造 BigAcc(String init) 用十进制字符串初始化;add(String x) 把 x 累加进去且不返回;value() 返回当前值的十进制字符串;isZero() 返回是否为零;bitLen() 返回当前值的二进制位长度(0 的位长为 0)。所有字符串均为非负十进制整数, 长度 ≤ 200。判题按操作序列调用, 无返回值操作期望 null。禁用手写高精度逻辑, 请直接用 java.math.BigInteger。",
      "mode": "design",
      "entry": {
        "className": "BigAcc"
      },
      "ops": [
        [
          "BigAcc",
          [
            "0"
          ]
        ],
        [
          "add",
          [
            "123456789012345678901234567890"
          ]
        ],
        [
          "value",
          []
        ],
        [
          "isZero",
          []
        ],
        [
          "bitLen",
          []
        ],
        [
          "add",
          [
            "9"
          ]
        ],
        [
          "value",
          []
        ]
      ],
      "expect": [
        "null",
        "null",
        "\"123456789012345678901234567890\"",
        "false",
        "97",
        "null",
        "\"123456789012345678901234567899\""
      ],
      "cmp": "exact",
      "starter": "import java.math.BigInteger;\n\nclass BigAcc {\n    // TODO: 用 BigInteger 保存当前值, 注意保持不可变语义\n    BigAcc(String init) { }\n    public void add(String x) { }\n    public String value() { return \"0\"; }\n    public boolean isZero() { return true; }\n    public int bitLen() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.math.BigInteger;\n\nclass BigAcc {\n    private BigInteger v;\n    BigAcc(String init) { v = new BigInteger(init.trim()); }\n    public void add(String x) { v = v.add(new BigInteger(x.trim())); }\n    public String value() { return v.toString(); }\n    public boolean isZero() { return v.signum() == 0; }\n    public int bitLen() { return v.bitLength(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "BigInteger 不可变, add 必须把返回值赋回字段",
        "BigInteger.bitLength() 对 0 返回 0, 正好满足约定"
      ]
    },
    {
      "id": "ch05-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计:BigDecimal 计价器",
      "tags": [
        "设计",
        "BigDecimal",
        "舍入模式",
        "不可变"
      ],
      "q": "实现 class Money(不要改类名):Money(String amount) 用十进制字符串构造并把金额定点到 2 位小数;plus(String amount)、minus(String amount)、times(int k) 各自基于**构造时的金额**结算并返回十进制字符串(至少 2 位小数, 按 HALF_UP 四舍五入到 2 位), 这些运算不改变已保存的金额;toPlain() 返回当前金额的十进制字符串。所有金额非负且 ≤ 1e12, 保证减法结果不为负。判题按操作序列调用, 构造操作期望 null, 字符串返回值按带引号形式比对。必须用 BigDecimal 而非 double。",
      "mode": "design",
      "entry": {
        "className": "Money"
      },
      "ops": [
        [
          "Money",
          [
            "10.50"
          ]
        ],
        [
          "plus",
          [
            "2.25"
          ]
        ],
        [
          "plus",
          [
            "0.005"
          ]
        ],
        [
          "times",
          [
            3
          ]
        ],
        [
          "toPlain",
          []
        ],
        [
          "minus",
          [
            "0.01"
          ]
        ],
        [
          "toPlain",
          []
        ]
      ],
      "expect": [
        "null",
        "\"12.75\"",
        "\"10.51\"",
        "\"31.50\"",
        "\"10.50\"",
        "\"10.49\"",
        "\"10.50\""
      ],
      "cmp": "exact",
      "starter": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\n\nclass Money {\n    // TODO: 内部用 BigDecimal 保存, setScale(2, RoundingMode.HALF_UP) 做定点化\n    private final BigDecimal v;\n    Money(String amount) { v = new BigDecimal(amount.trim()).setScale(2, RoundingMode.HALF_UP); }\n    public String plus(String amount) { return v.toPlainString(); }\n    public String minus(String amount) { return v.toPlainString(); }\n    public String times(int k) { return v.toPlainString(); }\n    public String toPlain() { return v.toPlainString(); }\n}\n\npublic class Main { }\n",
      "solution": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\n\nclass Money {\n    private final BigDecimal v;\n    Money(String amount) { v = new BigDecimal(amount.trim()).setScale(2, RoundingMode.HALF_UP); }\n    private static String fmt(BigDecimal x) { return x.setScale(2, RoundingMode.HALF_UP).toPlainString(); }\n    public String plus(String amount) { return fmt(v.add(new BigDecimal(amount.trim()))); }\n    public String minus(String amount) { return fmt(v.subtract(new BigDecimal(amount.trim()))); }\n    public String times(int k) { return fmt(v.multiply(BigDecimal.valueOf(k))); }\n    public String toPlain() { return fmt(v); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "setScale(2, RoundingMode.HALF_UP) 同时完成\"四舍五入\"和\"补齐 2 位小数\"",
        "toPlainString 不会输出 BigDecimal.toString 的指数形式",
        "new BigDecimal(\"0.005\") 是精确十进制, 不会像 double 那样引入二进制误差"
      ]
    },
    {
      "id": "ch05-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 大整数表达式求值器",
      "tags": [
        "设计",
        "表达式求值",
        "双栈",
        "BigInteger",
        "运算符优先级"
      ],
      "q": "实现 class BigExpr(不要改类名, 保留 public class Main 占位):构造 BigExpr() 无参;eval(String s) 计算表达式并返回十进制结果字符串。表达式含非负整数(任意长度, 可达 200 位)、二元运算符 + - * / 与一对括号 ( );运算符优先级与结合性同 Java:() 最高, * / 高于 + -, 同级从左到右。整除按 Java 整数语义向下取整(非负操作数即普通整除), 保证不会除以 0。判题按操作序列调用, 无返回值操作期望 null。必须用 BigInteger 保证任意精度。",
      "mode": "design",
      "entry": {
        "className": "BigExpr"
      },
      "ops": [
        [
          "BigExpr",
          []
        ],
        [
          "eval",
          [
            "1+2*3"
          ]
        ],
        [
          "eval",
          [
            "(1+2)*3"
          ]
        ],
        [
          "eval",
          [
            "1000000000000000000000000000000*99999999999999999999"
          ]
        ],
        [
          "eval",
          [
            "10/3"
          ]
        ],
        [
          "eval",
          [
            "2*(3+4*(5-1))"
          ]
        ],
        [
          "eval",
          [
            "1000000000000000000000000000000-1"
          ]
        ]
      ],
      "expect": [
        "null",
        "\"7\"",
        "\"9\"",
        "\"99999999999999999999000000000000000000000000000000\"",
        "\"3\"",
        "\"38\"",
        "\"999999999999999999999999999999\""
      ],
      "cmp": "exact",
      "starter": "import java.math.BigInteger;\nimport java.util.*;\n\nclass BigExpr {\n    // TODO: 双栈(操作数栈 + 运算符栈) + 优先级比较, 操作数用 BigInteger\n    BigExpr() { }\n    public String eval(String s) { return \"0\"; }\n}\n\npublic class Main { }\n",
      "solution": "import java.math.BigInteger;\nimport java.util.*;\n\nclass BigExpr {\n    private final Deque<BigInteger> num = new ArrayDeque<>();\n    private final Deque<Character> op = new ArrayDeque<>();\n\n    BigExpr() { }\n\n    public String eval(String s) {\n        num.clear(); op.clear();\n        int i = 0, n = s.length();\n        while (i < n) {\n            char c = s.charAt(i);\n            if (c == ' ') { i++; continue; }\n            if (c >= '0' && c <= '9') {\n                int j = i;\n                while (j < n && s.charAt(j) >= '0' && s.charAt(j) <= '9') j++;\n                num.push(new BigInteger(s.substring(i, j)));\n                i = j;\n            } else if (c == '(') { op.push(c); i++; }\n            else if (c == ')') {\n                while (op.peek() != '(') apply();\n                op.pop(); i++;\n            } else {\n                while (!op.isEmpty() && op.peek() != '(' && prec(op.peek()) >= prec(c)) apply();\n                op.push(c); i++;\n            }\n        }\n        while (!op.isEmpty()) apply();\n        return num.pop().toString();\n    }\n\n    private int prec(char c) { return (c == '*' || c == '/') ? 2 : 1; }\n\n    private void apply() {\n        char o = op.pop();\n        BigInteger b = num.pop(), a = num.pop();\n        if (o == '+') num.push(a.add(b));\n        else if (o == '-') num.push(a.subtract(b));\n        else if (o == '*') num.push(a.multiply(b));\n        else num.push(a.divide(b));\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "遇到运算符先把栈顶优先级 >= 当前的都算掉, 保证从左到右结合",
        "遇到 ')' 就一路弹栈计算直到 '(', 再把 '(' 弹出",
        "数字可以任意长, 读取时要用 substring 整段转 BigInteger"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "BigExpr",
              []
            ],
            [
              "eval",
              [
                "1+2*3"
              ]
            ],
            [
              "eval",
              [
                "(1+2)*3"
              ]
            ],
            [
              "eval",
              [
                "1000000000000000000000000000000*99999999999999999999"
              ]
            ],
            [
              "eval",
              [
                "10/3"
              ]
            ],
            [
              "eval",
              [
                "2*(3+4*(5-1))"
              ]
            ],
            [
              "eval",
              [
                "1000000000000000000000000000000-1"
              ]
            ]
          ],
          "expect": [
            "null",
            "\"7\"",
            "\"9\"",
            "\"99999999999999999999000000000000000000000000000000\"",
            "\"3\"",
            "\"38\"",
            "\"999999999999999999999999999999\""
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "BigExpr"
            ],
            [
              "eval",
              [
                "0"
              ]
            ],
            [
              "eval",
              [
                "10-2-3"
              ]
            ],
            [
              "eval",
              [
                "(2-5)"
              ]
            ],
            [
              "eval",
              [
                "7/2"
              ]
            ],
            [
              "eval",
              [
                "2*3*4-5"
              ]
            ],
            [
              "eval",
              [
                "((1+2)*(3+4))"
              ]
            ],
            [
              "eval",
              [
                "99999999999999999999999999999999999999/99999999999999999999"
              ]
            ]
          ],
          "expect": [
            "null",
            "\"0\"",
            "\"5\"",
            "\"-3\"",
            "\"3\"",
            "\"19\"",
            "\"21\"",
            "\"1000000000000000000\""
          ],
          "hidden": true
        }
      ]
    }
  ]
});
