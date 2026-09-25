window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 1,
  "title": "语言基础与数据表示",
  "courseRef": "黑马第1章-入门篇 + 第2章-语法篇",
  "levels": [
    {
      "id": "ch01-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "拆解整数各位数字",
      "tags": [
        "取模",
        "循环",
        "边界"
      ],
      "q": "实现方法 digits(int n):把非负整数 n 的每一位数字按高位到低位放入 int[] 返回。约束 0 ≤ n ≤ 2147483647。注意 n=0 必须返回 [0];n 末尾的 0 必须保留。",
      "mode": "method",
      "entry": {
        "method": "digits",
        "params": [
          "int"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] digits(int n) {\n        // TODO: 先确定位数, 再逐位填充\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] digits(int n) {\n        if (n == 0) return new int[]{0};\n        int len = 0, t = n;\n        while (t > 0) { len++; t /= 10; }\n        int[] r = new int[len];\n        for (int i = len - 1; i >= 0; i--) { r[i] = n % 10; n /= 10; }\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1234"
          ],
          "expect": "[1,2,3,4]",
          "cmp": "exact"
        },
        {
          "name": "个位",
          "args": [
            "7"
          ],
          "expect": "[7]",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0"
          ],
          "expect": "[0]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "末尾零",
          "args": [
            "1000000000"
          ],
          "expect": "[1,0,0,0,0,0,0,0,0,0]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先算位数再分配数组, 避免用 List 后转换",
        "n=0 是必须单独处理的边界"
      ]
    },
    {
      "id": "ch01-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "反转整数(溢出保护)",
      "tags": [
        "整数溢出",
        "边界",
        "long中转"
      ],
      "q": "实现 reverseInt(int x):反转十进制数字。若反转结果超出 int 范围必须返回 0。约束 x 为任意 int(含 Integer.MIN_VALUE)。",
      "mode": "method",
      "entry": {
        "method": "reverseInt",
        "params": [
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int reverseInt(int x) {\n        // TODO: 用 long 累加并在越界时返回 0\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int reverseInt(int x) {\n        long r = 0;\n        while (x != 0) {\n            r = r * 10 + x % 10;\n            if (r > Integer.MAX_VALUE || r < Integer.MIN_VALUE) return 0;\n            x /= 10;\n        }\n        return (int) r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "123"
          ],
          "expect": "321",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "-123"
          ],
          "expect": "-321",
          "cmp": "exact"
        },
        {
          "name": "末尾零",
          "args": [
            "120"
          ],
          "expect": "21",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "溢出",
          "args": [
            "1534236469"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "最小整数",
          "args": [
            "-2147483648"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "x % 10 对负数天然得到负余数, 无需特判",
        "溢出检测必须在乘 10 之后立刻做"
      ]
    },
    {
      "id": "ch01-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "二进制中 1 的个数",
      "tags": [
        "位运算",
        "无符号右移",
        "补码"
      ],
      "q": "实现 countBits(int n):返回 n 的二进制补码表示中 1 的个数。约束 n 为任意 int(负数按 32 位补码计, 例如 -1 返回 32)。",
      "mode": "method",
      "entry": {
        "method": "countBits",
        "params": [
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int countBits(int n) {\n        // TODO: 注意负数要用无符号右移 >>>\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int countBits(int n) {\n        int c = 0;\n        while (n != 0) { c += (n & 1); n >>>= 1; }\n        return c;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "11"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "单一位",
          "args": [
            "128"
          ],
          "expect": "1",
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
          "name": "负数补码",
          "args": [
            "-1"
          ],
          "expect": "32",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "用 n & (n-1) 可以每次消掉最低位的 1"
      ]
    },
    {
      "id": "ch01-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "任意进制转换",
      "tags": [
        "进制",
        "字符映射",
        "StringBuilder"
      ],
      "q": "实现 toBase(int n, int base):把正整数 n 转为 base(2..16) 进制字符串, 使用小写字母。约束 1 ≤ n ≤ 1000000, 2 ≤ base ≤ 16。",
      "mode": "method",
      "entry": {
        "method": "toBase",
        "params": [
          "int",
          "int"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String toBase(int n, int base) {\n        // TODO: 短除法取余, 最后反转\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String toBase(int n, int base) {\n        if (n == 0) return \"0\";\n        String d = \"0123456789abcdef\";\n        StringBuilder sb = new StringBuilder();\n        while (n > 0) { sb.append(d.charAt(n % base)); n /= base; }\n        return sb.reverse().toString();\n    }\n}\n",
      "tests": [
        {
          "name": "二进制",
          "args": [
            "10",
            "2"
          ],
          "expect": "1010",
          "cmp": "exact"
        },
        {
          "name": "十六进制",
          "args": [
            "255",
            "16"
          ],
          "expect": "ff",
          "cmp": "exact"
        },
        {
          "name": "最小",
          "args": [
            "1",
            "2"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "较大值",
          "args": [
            "1000000",
            "16"
          ],
          "expect": "f4240",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "返回 String 时判题直接按原样比较, 不要加引号"
      ]
    },
    {
      "id": "ch01-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "手写字符串转整数(myAtoi)",
      "tags": [
        "字符处理",
        "截断",
        "溢出"
      ],
      "q": "实现 myAtoi(String s):跳过前导空格; 可选符号 +/-; 连续读取数字直到非数字字符; 结果截断到 int 范围返回。约束 s 长度 ≤ 200, 可为空串, 不含数字时返回 0。",
      "mode": "method",
      "entry": {
        "method": "myAtoi",
        "params": [
          "String"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int myAtoi(String s) {\n        // TODO: 去空格 -> 符号 -> 读数字 -> 溢出截断\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int myAtoi(String s) {\n        int i = 0, n = s.length();\n        while (i < n && s.charAt(i) == ' ') i++;\n        int sign = 1;\n        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) { if (s.charAt(i) == '-') sign = -1; i++; }\n        long v = 0;\n        while (i < n && Character.isDigit(s.charAt(i))) {\n            v = v * 10 + (s.charAt(i) - '0');\n            if (sign * v > Integer.MAX_VALUE) return Integer.MAX_VALUE;\n            if (sign * v < Integer.MIN_VALUE) return Integer.MIN_VALUE;\n            i++;\n        }\n        return (int) (sign * v);\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "42"
          ],
          "expect": "42",
          "cmp": "exact"
        },
        {
          "name": "空格负数",
          "args": [
            "   -42"
          ],
          "expect": "-42",
          "cmp": "exact"
        },
        {
          "name": "尾部干扰",
          "args": [
            "4193 with words"
          ],
          "expect": "4193",
          "cmp": "exact"
        },
        {
          "name": "无数字",
          "args": [
            "words and 987"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "下溢截断",
          "args": [
            "-91283472332"
          ],
          "expect": "-2147483648",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "用 long 累加, 每步检查是否越界再截断",
        "符号与数字之间不允许有空格"
      ]
    },
    {
      "id": "ch01-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "最大公约数与最小公倍数",
      "tags": [
        "欧几里得",
        "溢出",
        "long"
      ],
      "q": "实现 gcdLcm(int a, int b):返回 long[]{最大公约数, 最小公倍数}。约束 |a|,|b| ≤ 1e9, 且不同时为 0。注意 lcm 可能超出 int 范围, 必须用 long 计算。",
      "mode": "method",
      "entry": {
        "method": "gcdLcm",
        "params": [
          "int",
          "int"
        ],
        "ret": "long[]"
      },
      "starter": "public class Main {\n    public static long[] gcdLcm(int a, int b) {\n        // TODO: 辗转相除求 gcd, 再算 lcm\n        return new long[]{0, 0};\n    }\n}\n",
      "solution": "public class Main {\n    public static long[] gcdLcm(int a, int b) {\n        long x = Math.abs((long) a), y = Math.abs((long) b);\n        while (y != 0) { long t = x % y; x = y; y = t; }\n        long g = x == 0 ? 1 : x;\n        long l = Math.abs((long) a / g * (long) b);\n        return new long[]{g, l};\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "12",
            "18"
          ],
          "expect": "[6,36]",
          "cmp": "exact"
        },
        {
          "name": "互质",
          "args": [
            "7",
            "13"
          ],
          "expect": "[1,91]",
          "cmp": "exact"
        },
        {
          "name": "都为1",
          "args": [
            "1",
            "1"
          ],
          "expect": "[1,1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大数溢出",
          "args": [
            "1000000000",
            "999999999"
          ],
          "expect": "[1,999999999000000000]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "lcm = a / gcd * b, 先除后乘避免溢出"
      ]
    },
    {
      "id": "ch01-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "二分查找(不存在的边界)",
      "tags": [
        "二分",
        "边界",
        "O(log n)"
      ],
      "q": "实现 solve(int[] a, int target):在非降序数组 a 中返回 target 的下标, 不存在返回 -1。要求 O(log n)。约束 a 长度 ≤ 1e5, 可为空数组。若存在多个相同元素返回任意一个下标均可。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "int[]",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int solve(int[] a, int target) {\n        // TODO: 注意 lo<=hi 与中点写法\n        return -1;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int[] a, int target) {\n        int lo = 0, hi = a.length - 1;\n        while (lo <= hi) {\n            int mid = (lo + hi) >>> 1;\n            if (a[mid] == target) return mid;\n            if (a[mid] < target) lo = mid + 1; else hi = mid - 1;\n        }\n        return -1;\n    }\n}\n",
      "tests": [
        {
          "name": "命中",
          "args": [
            "1,3,5,7",
            "3"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "未命中",
          "args": [
            "1,3,5,7",
            "9"
          ],
          "expect": "-1",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            "",
            "1"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单元素",
          "args": [
            "2",
            "2"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "用 (lo+hi)>>>1 避免加法溢出"
      ]
    },
    {
      "id": "ch01-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "合并两个有序数组",
      "tags": [
        "归并",
        "双指针",
        "数组"
      ],
      "q": "实现 solve(int[] a, int[] b):把两个非降序数组合并为一个非降序数组并返回(保留重复元素)。约束两数组长度 ≤ 1e4, 允许为空。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "int[]",
          "int[]"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] solve(int[] a, int[] b) {\n        // TODO: 三指针归并\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] solve(int[] a, int[] b) {\n        int[] r = new int[a.length + b.length];\n        int i = 0, j = 0, k = 0;\n        while (i < a.length && j < b.length) r[k++] = a[i] <= b[j] ? a[i++] : b[j++];\n        while (i < a.length) r[k++] = a[i++];\n        while (j < b.length) r[k++] = b[j++];\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,3",
            "2,4"
          ],
          "expect": "[1,2,3,4]",
          "cmp": "exact"
        },
        {
          "name": "一侧为空",
          "args": [
            "",
            "1"
          ],
          "expect": "[1]",
          "cmp": "exact"
        },
        {
          "name": "重复元素",
          "args": [
            "1,1",
            "1"
          ],
          "expect": "[1,1,1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全空",
          "args": [
            "",
            ""
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "用 <= 保证稳定性, 结果长度是两数组长度之和"
      ]
    },
    {
      "id": "ch01-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "括号匹配校验",
      "tags": [
        "栈",
        "状态机",
        "字符数组"
      ],
      "q": "实现 solve(String s):判断只含 ()[]{} 的字符串是否合法(左右匹配且嵌套正确)。约束长度 ≤ 1e4, 空串视为合法。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "String"
        ],
        "ret": "boolean"
      },
      "starter": "public class Main {\n    public static boolean solve(String s) {\n        // TODO: 用 char[] 当栈\n        return false;\n    }\n}\n",
      "solution": "public class Main {\n    public static boolean solve(String s) {\n        char[] st = new char[s.length()];\n        int top = 0;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (c == '(' || c == '[' || c == '{') st[top++] = c;\n            else {\n                if (top == 0) return false;\n                char o = st[--top];\n                if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{')) return false;\n            }\n        }\n        return top == 0;\n    }\n}\n",
      "tests": [
        {
          "name": "合法",
          "args": [
            "()[]{}"
          ],
          "expect": "true",
          "cmp": "exact"
        },
        {
          "name": "类型不匹配",
          "args": [
            "(]"
          ],
          "expect": "false",
          "cmp": "exact"
        },
        {
          "name": "空串",
          "args": [
            ""
          ],
          "expect": "true",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "交叉嵌套",
          "args": [
            "([)]"
          ],
          "expect": "false",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "栈空时遇到右括号立即判非法",
        "结束后栈必须为空"
      ]
    },
    {
      "id": "ch01-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "最大子数组和",
      "tags": [
        "动态规划",
        "Kadane",
        "O(n)"
      ],
      "q": "实现 solve(int[] a):返回连续子数组的最大和(子数组至少含一个元素)。约束 1 ≤ n ≤ 1e5, 元素 |a[i]| ≤ 1e4。本题使用随机对拍:你的实现会与 O(n^2) 参考实现在大量随机用例上比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[]"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int solve(int[] a) {\n        // TODO: Kadane: cur = max(x, cur+x)\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int[] a) {\n        int best = Integer.MIN_VALUE, cur = 0;\n        for (int x : a) { cur = Math.max(x, cur + x); best = Math.max(best, cur); }\n        return best;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,-2,3,4,-1"
          ],
          "expect": "7",
          "cmp": "exact"
        },
        {
          "name": "全负",
          "args": [
            "-2,-1"
          ],
          "expect": "-1",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "5"
          ],
          "expect": "5",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260101,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=1+r.nextInt(12); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(21)-10); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static int solve(int[] a){ int best=Integer.MIN_VALUE; for(int i=0;i<a.length;i++){ int s=0; for(int j=i;j<a.length;j++){ s+=a[j]; if(s>best) best=s; } } return best; } }"
      },
      "hints": [
        "全负数时答案是最大的那个负数, 不能初始化为 0"
      ]
    },
    {
      "id": "ch01-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "第 k 小元素",
      "tags": [
        "选择",
        "排序",
        "堆/快选"
      ],
      "q": "实现 solve(int[] a, int k):返回数组中第 k 小的元素(1 ≤ k ≤ n)。约束 n ≤ 1e5, 元素 |a[i]| ≤ 1e9。本题随机对拍:与插入排序参考实现比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[]",
          "int"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int solve(int[] a, int k) {\n        // TODO: 可用排序、堆或快速选择\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int[] a, int k) {\n        int[] b = a.clone();\n        java.util.Arrays.sort(b);\n        return b[k - 1];\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3,1,2",
            "2"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "7",
            "1"
          ],
          "expect": "7",
          "cmp": "exact"
        },
        {
          "name": "重复值",
          "args": [
            "5,5,5,1",
            "4"
          ],
          "expect": "5",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260202,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=1+r.nextInt(12); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(41)-20); } int k=1+r.nextInt(n); return new String[]{ b.toString(), String.valueOf(k) }; } }",
        "ref": "public class Ref { public static int solve(int[] a, int k){ int[] b=a.clone(); for(int i=1;i<b.length;i++){ int v=b[i], j=i-1; while(j>=0 && b[j]>v){ b[j+1]=b[j]; j--; } b[j+1]=v; } return b[k-1]; } }"
      },
      "hints": [
        "注意 clone 原数组, 不要破坏入参"
      ]
    },
    {
      "id": "ch01-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "统计逆序对",
      "tags": [
        "归并排序",
        "分治",
        "long"
      ],
      "q": "实现 solve(int[] a):返回逆序对数量, 即满足 i<j 且 a[i]>a[j] 的数对个数。约束 n ≤ 1e5, 结果可能超过 int 范围, 必须返回 long。本题随机对拍 O(n^2) 参考实现。",
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
      "starter": "public class Main {\n    public static long solve(int[] a) {\n        // TODO: 归并排序过程中统计\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long solve(int[] a) { return ms(a.clone(), 0, a.length - 1); }\n    static long ms(int[] a, int l, int r) {\n        if (l >= r) return 0;\n        int m = (l + r) >>> 1;\n        long c = ms(a, l, m) + ms(a, m + 1, r);\n        int[] tmp = new int[r - l + 1];\n        int i = l, j = m + 1, k = 0;\n        while (i <= m && j <= r) { if (a[i] <= a[j]) tmp[k++] = a[i++]; else { c += m - i + 1; tmp[k++] = a[j++]; } }\n        while (i <= m) tmp[k++] = a[i++];\n        while (j <= r) tmp[k++] = a[j++];\n        System.arraycopy(tmp, 0, a, l, tmp.length);\n        return c;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "2,4,1,3,5"
          ],
          "expect": "3",
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
          "name": "完全逆序",
          "args": [
            "5,4,3,2,1"
          ],
          "expect": "10",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20260303,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=1+r.nextInt(12); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(11)-5); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static long solve(int[] a){ long c=0; for(int i=0;i<a.length;i++) for(int j=i+1;j<a.length;j++) if(a[i]>a[j]) c++; return c; } }"
      },
      "hints": [
        "相等元素不算逆序对, 归并时用 a[i] <= a[j]"
      ]
    },
    {
      "id": "ch01-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计最小栈 MinStack",
      "tags": [
        "设计",
        "辅助栈",
        "O(1)"
      ],
      "q": "在同一文件中实现 class MinStack(不要改类名与 public class Main 占位):push(int) 与 pop() 都是 void 方法(返回类型必须写 void, 期望值记作 null); top() 与 getMin() 返回 int。四个操作均要求 O(1)。判题会按操作序列调用你的类。",
      "mode": "design",
      "entry": {
        "className": "MinStack"
      },
      "ops": [
        [
          "MinStack",
          []
        ],
        [
          "push",
          [
            -2
          ]
        ],
        [
          "push",
          [
            0
          ]
        ],
        [
          "push",
          [
            -3
          ]
        ],
        [
          "getMin",
          []
        ],
        [
          "pop",
          []
        ],
        [
          "top",
          []
        ],
        [
          "getMin",
          []
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "null",
        "-3",
        "null",
        "0",
        "-2"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass MinStack {\n    // TODO: 用两个栈, 一个存数据, 一个存当前最小值\n    public void push(int x) { }\n    public void pop() { }\n    public int top() { return 0; }\n    public int getMin() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass MinStack {\n    private Deque<Integer> st = new ArrayDeque<>();\n    private Deque<Integer> mn = new ArrayDeque<>();\n    public void push(int x) { st.push(x); mn.push(mn.isEmpty() ? x : Math.min(x, mn.peek())); }\n    public void pop() { st.pop(); mn.pop(); }\n    public int top() { return st.peek(); }\n    public int getMin() { return mn.peek(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "辅助栈保存每一步的历史最小值",
        "pop 时两个栈同步弹出"
      ]
    },
    {
      "id": "ch01-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计前缀树 Trie",
      "tags": [
        "设计",
        "树",
        "字符串"
      ],
      "q": "实现 class Trie:insert(String)、search(String)(完整单词)、startsWith(String)(前缀)。判题按操作序列调用, 无返回值期望 null, 布尔结果期望 true/false。",
      "mode": "design",
      "entry": {
        "className": "Trie"
      },
      "ops": [
        [
          "Trie",
          []
        ],
        [
          "insert",
          [
            "apple"
          ]
        ],
        [
          "search",
          [
            "apple"
          ]
        ],
        [
          "search",
          [
            "app"
          ]
        ],
        [
          "startsWith",
          [
            "app"
          ]
        ],
        [
          "insert",
          [
            "app"
          ]
        ],
        [
          "search",
          [
            "app"
          ]
        ]
      ],
      "expect": [
        "null",
        "null",
        "true",
        "false",
        "true",
        "null",
        "true"
      ],
      "cmp": "exact",
      "starter": "class Trie {\n    // TODO: 每个节点 26 个子节点 + 结束标记\n    public void insert(String w) { }\n    public boolean search(String w) { return false; }\n    public boolean startsWith(String p) { return false; }\n}\n\npublic class Main { }\n",
      "solution": "class Trie {\n    private static class Node { Node[] ch = new Node[26]; boolean end; }\n    private Node root = new Node();\n    public void insert(String w) { Node c = root; for (int i = 0; i < w.length(); i++) { int k = w.charAt(i) - 'a'; if (c.ch[k] == null) c.ch[k] = new Node(); c = c.ch[k]; } c.end = true; }\n    public boolean search(String w) { Node c = find(w); return c != null && c.end; }\n    public boolean startsWith(String p) { return find(p) != null; }\n    private Node find(String s) { Node c = root; for (int i = 0; i < s.length(); i++) { int k = s.charAt(i) - 'a'; if (c.ch[k] == null) return null; c = c.ch[k]; } return c; }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "search 与 startsWith 的区别只在结束标记"
      ]
    },
    {
      "id": "ch01-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计 LRU 缓存",
      "tags": [
        "设计",
        "哈希+双向链表",
        "LinkedHashMap"
      ],
      "q": "实现 class LRUCache:LRUCache(int capacity) 构造; get(int key) 命中返回值, 否则 -1 并视为访问; put(int key,int value) 写入, 超出容量时淘汰最久未使用项。要求 get/put 平均 O(1)。判题按操作序列调用。注意: 构造器名与类名必须都是 LRUCache(区分大小写); get 返回 int; put 返回 void(期望写 null)。",
      "mode": "design",
      "entry": {
        "className": "LRUCache"
      },
      "ops": [
        [
          "LRUCache",
          [
            2
          ]
        ],
        [
          "put",
          [
            1,
            1
          ]
        ],
        [
          "put",
          [
            2,
            2
          ]
        ],
        [
          "get",
          [
            1
          ]
        ],
        [
          "put",
          [
            3,
            3
          ]
        ],
        [
          "get",
          [
            2
          ]
        ],
        [
          "put",
          [
            4,
            4
          ]
        ],
        [
          "get",
          [
            1
          ]
        ],
        [
          "get",
          [
            3
          ]
        ],
        [
          "get",
          [
            4
          ]
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "1",
        "null",
        "-1",
        "null",
        "-1",
        "3",
        "4"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass LRUCache {\n    // TODO: 哈希表 + 双向链表(或 LinkedHashMap 的 accessOrder)\n    public LRUCache(int capacity) { }\n    public int get(int key) { return -1; }\n    public void put(int key, int value) { }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass LRUCache {\n    private final int cap;\n    private final LinkedHashMap<Integer, Integer> m;\n    public LRUCache(int capacity) { cap = capacity; m = new LinkedHashMap<>(16, 0.75f, true); }\n    public int get(int key) { Integer v = m.get(key); return v == null ? -1 : v; }\n    public void put(int key, int value) {\n        if (m.containsKey(key)) { m.put(key, value); return; }\n        if (m.size() >= cap) { Iterator<Integer> it = m.keySet().iterator(); it.next(); it.remove(); }\n        m.put(key, value);\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "LinkedHashMap(16,0.75f,true) 天然按访问顺序排列",
        "淘汰时删除迭代器的第一个 key"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "LRUCache",
              [
                2
              ]
            ],
            [
              "put",
              [
                1,
                1
              ]
            ],
            [
              "put",
              [
                2,
                2
              ]
            ],
            [
              "get",
              [
                1
              ]
            ],
            [
              "put",
              [
                3,
                3
              ]
            ],
            [
              "get",
              [
                2
              ]
            ],
            [
              "put",
              [
                4,
                4
              ]
            ],
            [
              "get",
              [
                1
              ]
            ],
            [
              "get",
              [
                3
              ]
            ],
            [
              "get",
              [
                4
              ]
            ]
          ],
          "expect": [
            "null",
            "null",
            "null",
            "1",
            "null",
            "-1",
            "null",
            "-1",
            "3",
            "4"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "LRUCache",
              [
                1
              ]
            ],
            [
              "put",
              [
                1,
                10
              ]
            ],
            [
              "get",
              [
                1
              ]
            ],
            [
              "put",
              [
                2,
                20
              ]
            ],
            [
              "get",
              [
                1
              ]
            ],
            [
              "get",
              [
                2
              ]
            ],
            [
              "put",
              [
                2,
                21
              ]
            ],
            [
              "get",
              [
                2
              ]
            ],
            [
              "put",
              [
                1,
                11
              ]
            ],
            [
              "get",
              [
                1
              ]
            ],
            [
              "get",
              [
                2
              ]
            ]
          ],
          "expect": [
            "null",
            "null",
            "10",
            "null",
            "-1",
            "20",
            "null",
            "21",
            "null",
            "11",
            "-1"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
