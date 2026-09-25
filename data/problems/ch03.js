window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 3,
  "title": "判断与循环",
  "courseRef": "本机课程第3章-if判断/switch选择/for/while/do-while/break/continue/循环嵌套/猜数字/九九乘法表",
  "levels": [
    {
      "id": "ch03-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "闰年与月份天数",
      "tags": [
        "if判断",
        "逻辑运算",
        "边界"
      ],
      "q": "实现 daysInMonth(int year, int month):返回该年该月的天数。闰年规则为「能被4整除且不能被100整除, 或者能被400整除」, 闰年 2 月 29 天, 平年 2 月 28 天。1/3/5/7/8/10/12 月 31 天, 4/6/9/11 月 30 天。约束 1 ≤ year ≤ 9999, 1 ≤ month ≤ 12。注意 1900 年不是闰年, 2000 年是闰年, 用 (year%4==0 && year%100!=0) || year%400==0 一次写对。",
      "mode": "method",
      "entry": {
        "method": "daysInMonth",
        "params": [
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int daysInMonth(int year, int month) {\n        // TODO: 先判 2 月, 再按大小月返回\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int daysInMonth(int year, int month) {\n        if (month == 2) {\n            boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;\n            return leap ? 29 : 28;\n        }\n        if (month == 4 || month == 6 || month == 9 || month == 11) return 30;\n        return 31;\n    }\n}\n",
      "tests": [
        {
          "name": "平年2月",
          "args": [
            "2023",
            "2"
          ],
          "expect": "28",
          "cmp": "exact"
        },
        {
          "name": "闰年2月",
          "args": [
            "2024",
            "2"
          ],
          "expect": "29",
          "cmp": "exact"
        },
        {
          "name": "小月",
          "args": [
            "2024",
            "4"
          ],
          "expect": "30",
          "cmp": "exact"
        },
        {
          "name": "整百非闰年",
          "args": [
            "1900",
            "2"
          ],
          "expect": "28",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "四百年闰年",
          "args": [
            "2000",
            "2"
          ],
          "expect": "29",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大月",
          "args": [
            "2024",
            "12"
          ],
          "expect": "31",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "整百年份必须单独用 %400 判断, 否则 1900 会被误判为闰年",
        "先处理 2 月可以让后面的判断简化"
      ]
    },
    {
      "id": "ch03-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "成绩等级判定",
      "tags": [
        "if-else阶梯",
        "switch",
        "符号处理"
      ],
      "q": "实现 gradeOf(int score):把 0..100 的百分制成绩转为等级, 返回单个大写字母。规则: 90..100 返回 'A'; 80..89 返回 'B'; 70..79 返回 'C'; 60..69 返回 'D'; 0..59 返回 'E'。约束 0 ≤ score ≤ 100。返回类型为 char, 判题输出形如 'A'(带单引号)。若用 switch 需要先做 score/10 的映射, 并注意 100 分要单独并入 A。",
      "mode": "method",
      "entry": {
        "method": "gradeOf",
        "params": [
          "int"
        ],
        "ret": "char"
      },
      "starter": "public class Main {\n    public static char gradeOf(int score) {\n        // TODO: 用 if-else 阶梯或 switch(score/10)\n        return 'E';\n    }\n}\n",
      "solution": "public class Main {\n    public static char gradeOf(int score) {\n        if (score >= 90) return 'A';\n        if (score >= 80) return 'B';\n        if (score >= 70) return 'C';\n        if (score >= 60) return 'D';\n        return 'E';\n    }\n}\n",
      "tests": [
        {
          "name": "优秀",
          "args": [
            "95"
          ],
          "expect": "'A'",
          "cmp": "exact"
        },
        {
          "name": "不及格",
          "args": [
            "59"
          ],
          "expect": "'E'",
          "cmp": "exact"
        },
        {
          "name": "满分",
          "args": [
            "100"
          ],
          "expect": "'A'",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "零分",
          "args": [
            "0"
          ],
          "expect": "'E'",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "及格线",
          "args": [
            "60"
          ],
          "expect": "'D'",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "写 switch 时 100/10 得到 10, 不要忘记 case 10",
        "if-else 阶梯要从高到低写, 避免重复区间判断"
      ]
    },
    {
      "id": "ch03-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "switch 简易计算器",
      "tags": [
        "switch",
        "整数除法",
        "除零判断"
      ],
      "q": "实现 calc(int a, int b, char op, int[] out):模拟计算器并返回状态码。op 取 '+','-','*','/' 四种。若 op 不是四种之一返回 -1; 若 op 为 '/' 且 b == 0 返回 -2(不得抛异常); 否则把结果 a op b 写入 out[0] 并返回 0。整数除法向下取整, 例如 -7 / 2 == -3。约束 |a|,|b| ≤ 1e4 且 b 只在 '/' 时可能为 0。注意返回值是状态码而不是计算结果。",
      "mode": "method",
      "entry": {
        "method": "calc",
        "params": [
          "int",
          "int",
          "char",
          "int[]"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int calc(int a, int b, char op, int[] out) {\n        // TODO: switch(op) 处理四种运算, 错误返回负状态码\n        return -1;\n    }\n}\n",
      "solution": "public class Main {\n    public static int calc(int a, int b, char op, int[] out) {\n        switch (op) {\n            case '+': out[0] = a + b; return 0;\n            case '-': out[0] = a - b; return 0;\n            case '*': out[0] = a * b; return 0;\n            case '/':\n                if (b == 0) return -2;\n                out[0] = a / b; return 0;\n            default: return -1;\n        }\n    }\n}\n",
      "tests": [
        {
          "name": "加法",
          "args": [
            "3",
            "5",
            "+",
            "0"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "负数除法",
          "args": [
            "-7",
            "2",
            "/",
            "0"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "除零",
          "args": [
            "1",
            "0",
            "/",
            "0"
          ],
          "expect": "-2",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "非法运算符",
          "args": [
            "1",
            "1",
            "x",
            "0"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "除零必须在做除法之前返回, 否则会抛 ArithmeticException",
        "Java 整数除法向零取整, -7/2 是 -3"
      ]
    },
    {
      "id": "ch03-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "九九乘法表某一行",
      "tags": [
        "循环嵌套",
        "StringBuilder",
        "格式控制"
      ],
      "q": "实现 mulRow(int n):返回第 n 行九九乘法表, 第 n 行包含 n 个算式, 形如 \"1*3=3\\t2*3=6\\t3*3=9\"——每个算式的格式是 i+\"*\"+n+\"=\"+(i*n), 算式之间用一个制表符 '\\t' 分隔, 行尾没有多余空白。约束 1 ≤ n ≤ 9。判题按原始字符串精确比较(tab 不可换成空格), 注意 i 在前 n 在后。",
      "mode": "method",
      "entry": {
        "method": "mulRow",
        "params": [
          "int"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String mulRow(int n) {\n        // TODO: 循环 i=1..n 拼接 i + \"*\" + n + \"=\" + (i*n)\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String mulRow(int n) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 1; i <= n; i++) {\n            if (i > 1) sb.append('\\t');\n            sb.append(i).append('*').append(n).append('=').append(i * n);\n        }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "第一行",
          "args": [
            "1"
          ],
          "expect": "1*1=1",
          "cmp": "exact"
        },
        {
          "name": "第三行",
          "args": [
            "3"
          ],
          "expect": "1*3=3\t2*3=6\t3*3=9",
          "cmp": "exact"
        },
        {
          "name": "末行",
          "args": [
            "9"
          ],
          "expect": "1*9=9\t2*9=18\t3*9=27\t4*9=36\t5*9=45\t6*9=54\t7*9=63\t8*9=72\t9*9=81",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "StringBuilder.append(int) 会直接拼数字, 不会变成字符",
        "用 if (i > 1) 控制分隔符, 避免行尾多一个 tab"
      ]
    },
    {
      "id": "ch03-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "质因数分解",
      "tags": [
        "while循环",
        "循环不变量",
        "除法递推"
      ],
      "q": "实现 factorize(int n):把 n 分解质因数, 返回各质因子(含重复)按升序排列的 int[]。约束 2 ≤ n ≤ 1e9。例如 360 = 2*2*2*3*3*5, 返回 [2,2,2,3,3,5]; n 本身是质数时返回 [n]。当 n 是 999999937 这类大质数时, 循环次数约为根号 n, 必须保证 O(√n) 效率, 不能用 List 之后再排序。",
      "mode": "method",
      "entry": {
        "method": "factorize",
        "params": [
          "int"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] factorize(int n) {\n        // TODO: 从小到大试除, 每次除尽为止\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] factorize(int n) {\n        int[] buf = new int[32];\n        int c = 0;\n        for (int p = 2; (long) p * p <= n; p++) {\n            while (n % p == 0) { buf[c++] = p; n /= p; }\n        }\n        if (n > 1) buf[c++] = n;\n        int[] r = new int[c];\n        System.arraycopy(buf, 0, r, 0, c);\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "360"
          ],
          "expect": "[2,2,2,3,3,5]",
          "cmp": "exact"
        },
        {
          "name": "质数",
          "args": [
            "13"
          ],
          "expect": "[13]",
          "cmp": "exact"
        },
        {
          "name": "2的幂",
          "args": [
            "1024"
          ],
          "expect": "[2,2,2,2,2,2,2,2,2,2]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大质数",
          "args": [
            "999999893"
          ],
          "expect": "[999999893]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "最小合法值",
          "args": [
            "2"
          ],
          "expect": "[2]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "循环条件用 (long)p*p <= n, 避免 p*p 溢出后死循环",
        "循环结束后若 n > 1, 说明剩下的大于 √原值 的质因子, 要补进去"
      ]
    },
    {
      "id": "ch03-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "数字根(反复各位求和)",
      "tags": [
        "while循环",
        "循环嵌套",
        "同余"
      ],
      "q": "实现 digitalRoot(int n):反复把 n 的各位数字相加, 直到结果只剩一位数字, 返回这个一位数。约束 0 ≤ n ≤ 1e9(0 的数字根规定为 0)。例如 9875 → 9+8+7+5=29 → 2+9=11 → 1+1=2。要求用嵌套循环真实模拟这个过程, 不要直接套用 (n-1)%9+1 的结论公式(两种写法结果相同, 判题只看返回值)。",
      "mode": "method",
      "entry": {
        "method": "digitalRoot",
        "params": [
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int digitalRoot(int n) {\n        // TODO: 外层 while(n >= 10), 内层求各位和\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int digitalRoot(int n) {\n        while (n >= 10) {\n            int s = 0;\n            while (n > 0) { s += n % 10; n /= 10; }\n            n = s;\n        }\n        return n;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "9875"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "一位数",
          "args": [
            "7"
          ],
          "expect": "7",
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
          "name": "整十数",
          "args": [
            "999999999"
          ],
          "expect": "9",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "内层 while(n>0) 会把 n 写成 0, 必须用临时变量接收各位和后再赋值",
        "n<10 时循环一次都不执行直接返回, 天然覆盖 0 和一位数"
      ]
    },
    {
      "id": "ch03-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "猜数字:二分最少次数",
      "tags": [
        "二分",
        "循环计数",
        "上取整"
      ],
      "q": "实现 guessCount(int n, int secret):数字范围是 [1, n], 目标值是 secret。猜题者每次都猜当前可能区间的中点, 即 lo=1, hi=n 时猜 mid=(lo+hi)/2(向下取整), 猜中即结束, 猜小了则 lo=mid+1, 猜大了则 hi=mid-1。返回实际需要的猜测次数。约束 1 ≤ n ≤ 1e9, 1 ≤ secret ≤ n。",
      "mode": "method",
      "entry": {
        "method": "guessCount",
        "params": [
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int guessCount(int n, int secret) {\n        // TODO: while(true) 中更新 lo/hi, 每次 cnt++\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int guessCount(int n, int secret) {\n        int lo = 1, hi = n, cnt = 0;\n        while (lo <= hi) {\n            int mid = (lo + hi) >>> 1;\n            cnt++;\n            if (mid == secret) return cnt;\n            if (mid < secret) lo = mid + 1; else hi = mid - 1;\n        }\n        return cnt;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "10",
            "6"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "首个",
          "args": [
            "10",
            "1"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "1",
            "1"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "最大范围末端",
          "args": [
            "1000000000",
            "1000000000"
          ],
          "expect": "30",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "用 (lo+hi)>>>1 而不是 (lo+hi)/2, 避免 1e9 级区间相加溢出",
        "这不是问最少猜测次数的上界, 而是给定中点策略下的实际次数"
      ]
    },
    {
      "id": "ch03-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "滑动窗口:最长无重复子串",
      "tags": [
        "双指针",
        "状态维护",
        "O(n)"
      ],
      "q": "实现 longestUnique(String s):返回 s 中最长的、不含重复字符的连续子串长度。约束 0 ≤ s.length() ≤ 1e5, 字符为 ASCII(0..127), 空串返回 0。要求 O(n):左指针只前进不后退, 用 last[c] 记录字符上次出现的下标; 当上次出现位置在当前窗口内时, 左指针跳到它右边一格(不能简单回退到 left+1)。",
      "mode": "method",
      "entry": {
        "method": "longestUnique",
        "params": [
          "String"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int longestUnique(String s) {\n        // TODO: last[128] 记录上次下标, left 只向右移动\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int longestUnique(String s) {\n        int[] last = new int[128];\n        for (int i = 0; i < 128; i++) last[i] = -1;\n        int left = 0, best = 0;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (last[c] >= left) left = last[c] + 1;\n            last[c] = i;\n            best = Math.max(best, i - left + 1);\n        }\n        return best;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "abcabcbb"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "全相同",
          "args": [
            "bbbbb"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "空串",
          "args": [
            ""
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "含空格与符号",
          "args": [
            "pwwkew"
          ],
          "expect": "3",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "整体不重复",
          "args": [
            "abcdefg"
          ],
          "expect": "7",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "if (last[c] >= left) 这个条件很关键, 否则 left 会被历史位置拉回去",
        "每次循环都要更新 last[c] = i, 无论是否收缩窗口"
      ]
    },
    {
      "id": "ch03-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "数字区间内 3 或 5 的倍数之和",
      "tags": [
        "等差求和",
        "容斥",
        "long"
      ],
      "q": "实现 sumMultiples35(int n):返回 [1, n] 中所有是 3 的倍数或是 5 的倍数的整数之和。约束 0 ≤ n ≤ 1e9。因为 3 和 5 的公倍数会被重复统计, 必须用容斥原理减去 15 的倍数之和。n 很大时逐个数判定会超时, 要求 O(1) 数学解法。注意 n = 0 时和为 0, 返回类型是 long。",
      "mode": "method",
      "entry": {
        "method": "sumMultiples35",
        "params": [
          "int"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    public static long sumMultiples35(int n) {\n        // TODO: 用等差数列求和公式, 减去 15 的倍数部分\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long sumMultiples35(int n) {\n        return sumOfMultiples(n, 3) + sumOfMultiples(n, 5) - sumOfMultiples(n, 15);\n    }\n\n    private static long sumOfMultiples(int n, int k) {\n        long m = n / k;\n        return m * (m + 1) / 2 * k;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "10"
          ],
          "expect": "33",
          "cmp": "exact"
        },
        {
          "name": "边界零",
          "args": [
            "0"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "小于3",
          "args": [
            "2"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "恰好含公倍数",
          "args": [
            "15"
          ],
          "expect": "60",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "大值",
          "args": [
            "1000000000"
          ],
          "expect": "233333334166666668",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "1..n 中 k 的倍数之和 = k * m * (m+1) / 2, m = n/k",
        "m*(m+1) 中的乘法要在 long 下进行, 否则 1e9 量级会溢出"
      ]
    },
    {
      "id": "ch03-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "前缀和:区间和查询",
      "tags": [
        "前缀和",
        "long",
        "随机对拍"
      ],
      "q": "实现 rangeSum(int[] a, int[][] q):对每个查询 q[i] = {l, r} 返回 a[l..r] 的闭区间元素之和, 结果按查询顺序放入 long[] 返回。约束 0 ≤ n ≤ 200, 0 ≤ l ≤ r < n, 元素 |a[i]| ≤ 1e6, 查询数 ≤ 200。允许数组为空且查询数为 0。用前缀和把单次查询降到 O(1); 本题随机对拍, 你的实现会与暴力双重循环的参考实现在大量随机用例上比对, 注意前缀和数组要用 long 防止累加溢出。",
      "mode": "stress",
      "entry": {
        "method": "rangeSum",
        "params": [
          "int[]",
          "int[][]"
        ],
        "ret": "long[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long[] rangeSum(int[] a, int[][] q) {\n        // TODO: 建 long[] pre, 再用 pre[r+1]-pre[l]\n        return new long[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static long[] rangeSum(int[] a, int[][] q) {\n        long[] pre = new long[a.length + 1];\n        for (int i = 0; i < a.length; i++) pre[i + 1] = pre[i] + a[i];\n        long[] res = new long[q.length];\n        for (int i = 0; i < q.length; i++) res[i] = pre[q[i][1] + 1] - pre[q[i][0]];\n        return res;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3,4",
            "0,1;1,2;0,3"
          ],
          "expect": "[3,5,10]",
          "cmp": "exact"
        },
        {
          "name": "单点查询",
          "args": [
            "5",
            "0,0"
          ],
          "expect": "[5]",
          "cmp": "exact"
        },
        {
          "name": "空数组空查询",
          "args": [
            "",
            ""
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负值区间",
          "args": [
            "-3,-1,-4,-1,-5,-9,-2,-6",
            "0,7;2,5"
          ],
          "expect": "[-31,-19]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20260707,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(9); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(2001)-1000); } int m=n==0?0:1+r.nextInt(5); StringBuilder c=new StringBuilder(); for(int i=0;i<m;i++){ if(i>0) c.append((char)59); int l=r.nextInt(n), rr=l+r.nextInt(n-l); c.append(l).append((char)44).append(rr); } return new String[]{ b.toString(), c.toString() }; } }",
        "ref": "public class Ref { public static long[] rangeSum(int[] a, int[][] q){ long[] r=new long[q.length]; for(int i=0;i<q.length;i++){ long s=0; for(int j=q[i][0]; j<=q[i][1]; j++) s+=a[j]; r[i]=s; } return r; } }"
      },
      "hints": [
        "前缀和数组长度是 n+1, pre[i] 表示前 i 个元素之和",
        "区间 [l, r] 的和是 pre[r+1] - pre[l], 注意是 r+1"
      ]
    },
    {
      "id": "ch03-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "枚举图:删除一个点后的连通块数",
      "tags": [
        "邻接表",
        "连通块",
        "暴力枚举"
      ],
      "q": "实现 removeNode(int n, int[][] edges, int k):n 个点编号 0..n-1, edges 是无向边列表, 先把点 k 及其所有关联边删掉, 返回剩下 n-1 个点中连通块的个数(被删除的点不计入; 孤立的剩余点各算一个连通块)。约束 0 ≤ n ≤ 200, 0 ≤ edges.length ≤ 200, 0 ≤ k < n。本题随机对拍, 参考实现每次用 DFS 重新统计连通块, 你的实现只需保证结果一致。",
      "mode": "stress",
      "entry": {
        "method": "removeNode",
        "params": [
          "int",
          "int[][]",
          "int"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int removeNode(int n, int[][] edges, int k) {\n        // TODO: 建邻接表(跳过 k), 再数连通块\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int removeNode(int n, int[][] edges, int k) {\n        java.util.List<java.util.List<Integer>> g = new java.util.ArrayList<>();\n        for (int i = 0; i < n; i++) g.add(new java.util.ArrayList<Integer>());\n        for (int[] e : edges) {\n            if (e[0] == k || e[1] == k) continue;\n            g.get(e[0]).add(e[1]);\n            g.get(e[1]).add(e[0]);\n        }\n        boolean[] vis = new boolean[n];\n        int cnt = 0;\n        for (int i = 0; i < n; i++) {\n            if (i == k || vis[i]) continue;\n            cnt++;\n            java.util.ArrayDeque<Integer> st = new java.util.ArrayDeque<>();\n            st.push(i);\n            vis[i] = true;\n            while (!st.isEmpty()) {\n                int u = st.pop();\n                for (int v : g.get(u)) if (!vis[v]) { vis[v] = true; st.push(v); }\n            }\n        }\n        return cnt;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "5",
            "0,1;1,2;3,4",
            "1"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "无边",
          "args": [
            "4",
            "",
            "0"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "删后全连通",
          "args": [
            "4",
            "0,1;1,2;2,3",
            "0"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单点",
          "args": [
            "1",
            "",
            "0"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "删中间点",
          "args": [
            "3",
            "0,1;1,2;0,2",
            "1"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20260808,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(9); int m=n==0?0:r.nextInt(7); StringBuilder b=new StringBuilder(); for(int i=0;i<m;i++){ if(i>0) b.append((char)59); b.append(r.nextInt(n)).append((char)44).append(r.nextInt(n)); } int k=n==0?0:r.nextInt(n); return new String[]{ String.valueOf(n), b.toString(), String.valueOf(k) }; } }",
        "ref": "public class Ref { public static int removeNode(int n, int[][] edges, int k){ boolean[][] g=new boolean[n][n]; for(int[] e:edges){ if(e[0]==k||e[1]==k) continue; g[e[0]][e[1]]=true; g[e[1]][e[0]]=true; } boolean[] v=new boolean[n]; int c=0; for(int i=0;i<n;i++){ if(i==k||v[i]) continue; c++; int[] q=new int[n]; int h=0,t=0; q[t++]=i; v[i]=true; while(h<t){ int u=q[h++]; for(int w=0;w<n;w++) if(g[u][w] && !v[w]){ v[w]=true; q[t++]=w; } } } return c; } }"
      },
      "hints": [
        "自己到自己也是合法边, 建表时无需特判",
        "被删除的点 k 在计数前必须跳过, 否则它会单独算成一个连通块"
      ]
    },
    {
      "id": "ch03-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "差分数组:区间加法后取值",
      "tags": [
        "差分数组",
        "批量更新",
        "随机对拍"
      ],
      "q": "实现 applyOps(int n, int[][] ops, int[][] q):初始有长度 n 的全零数组 a(下标 0..n-1)。ops[i] = {l, r, v} 表示对 a[l..r] 每个元素加上 v(允许 v 为负)。全部操作执行完后, 对每个查询 q[i] = {idx} 返回 a[idx] 的值, 结果按查询顺序组成 long[] 返回。约束 0 ≤ n ≤ 300, 操作数与查询数 ≤ 300, |v| ≤ 1e6, 保证 0 ≤ l ≤ r < n 且 0 ≤ idx < n。用差分数组做到 O(n + ops + q); 本题随机对拍, 参考实现是逐区间暴力累加。",
      "mode": "stress",
      "entry": {
        "method": "applyOps",
        "params": [
          "int",
          "int[][]",
          "int[][]"
        ],
        "ret": "long[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long[] applyOps(int n, int[][] ops, int[][] q) {\n        // TODO: diff[l]+=v, diff[r+1]-=v, 再前缀和还原\n        return new long[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static long[] applyOps(int n, int[][] ops, int[][] q) {\n        long[] diff = new long[n + 1];\n        for (int[] op : ops) {\n            diff[op[0]] += op[2];\n            diff[op[1] + 1] -= op[2];\n        }\n        long[] a = new long[n];\n        long cur = 0;\n        for (int i = 0; i < n; i++) { cur += diff[i]; a[i] = cur; }\n        long[] res = new long[q.length];\n        for (int i = 0; i < q.length; i++) res[i] = a[q[i][0]];\n        return res;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "5",
            "0,2,1;1,3,2",
            "0;3;4"
          ],
          "expect": "[1,2,0]",
          "cmp": "exact"
        },
        {
          "name": "无操作",
          "args": [
            "3",
            "",
            "0;2"
          ],
          "expect": "[0,0]",
          "cmp": "exact"
        },
        {
          "name": "负增量覆盖",
          "args": [
            "3",
            "0,2,5;1,1,-10",
            "0;1;2"
          ],
          "expect": "[5,-5,5]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空规模",
          "args": [
            "0",
            "",
            ""
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20260909,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(9); int m=n==0?0:r.nextInt(6); StringBuilder b=new StringBuilder(); for(int i=0;i<m;i++){ if(i>0) b.append((char)59); int l=r.nextInt(n), rr=l+r.nextInt(n-l); b.append(l).append((char)44).append(rr).append((char)44).append(r.nextInt(21)-10); } int c=n==0?0:1+r.nextInt(5); StringBuilder d=new StringBuilder(); for(int i=0;i<c;i++){ if(i>0) d.append((char)59); d.append(r.nextInt(n)); } return new String[]{ String.valueOf(n), b.toString(), d.toString() }; } }",
        "ref": "public class Ref { public static long[] applyOps(int n, int[][] ops, int[][] q){ long[] a=new long[n]; for(int[] op:ops) for(int j=op[0]; j<=op[1]; j++) a[j]+=op[2]; long[] r=new long[q.length]; for(int i=0;i<q.length;i++) r[i]=a[q[i][0]]; return r; } }"
      },
      "hints": [
        "差分数组要开 n+1 长度, 因为 r+1 可能等于 n",
        "最后一次前缀和扫描直接把结果写回 a, 再回答查询"
      ]
    },
    {
      "id": "ch03-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计购物车结算 Cart",
      "tags": [
        "设计",
        "状态机",
        "分支综合"
      ],
      "q": "在同一文件中实现 class Cart(保留 public class Main 占位, 不要改类名):add(String name, long price, int qty) 加入商品, 每次调用把 price*qty 累加进该商品的累计金额(同名商品重复加入会累加, 不覆盖之前的价格); remove(String name) 移除该商品的全部累计金额, 从未加入过则不做任何事; total() 返回结算总价, 计算方式是「所有商品累计金额之和」再乘以当前折扣率 factor, factor 初始为 100(即原价), 结果用整数除法向下取整; discount(int percent) 把 factor 设置为 percent(percent 范围 0..100), 它只改变折扣率, 不改变任何商品的金额, 因此空车打折后再 add 仍然按新折扣率结算; itemCount() 返回购物车中不同商品的种类数。判题按操作序列调用你的类, 无返回值的方法期望 null。",
      "mode": "design",
      "entry": {
        "className": "Cart"
      },
      "ops": [
        [
          "Cart",
          []
        ],
        [
          "itemCount",
          []
        ],
        [
          "add",
          [
            "apple",
            100,
            3
          ]
        ],
        [
          "total",
          []
        ],
        [
          "add",
          [
            "apple",
            150,
            1
          ]
        ],
        [
          "total",
          []
        ],
        [
          "itemCount",
          []
        ],
        [
          "add",
          [
            "pear",
            40,
            2
          ]
        ],
        [
          "itemCount",
          []
        ],
        [
          "remove",
          [
            "pear"
          ]
        ],
        [
          "total",
          []
        ],
        [
          "discount",
          [
            90
          ]
        ],
        [
          "total",
          []
        ],
        [
          "remove",
          [
            "apple"
          ]
        ],
        [
          "itemCount",
          []
        ],
        [
          "total",
          []
        ]
      ],
      "expect": [
        "null",
        "0",
        "null",
        "300",
        "null",
        "450",
        "1",
        "null",
        "2",
        "null",
        "450",
        "null",
        "405",
        "null",
        "0",
        "0"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass Cart {\n    // TODO: 商品金额与折扣率分开维护, 在 total() 里合成\n    public void add(String name, long price, int qty) { }\n    public void remove(String name) { }\n    public long total() { return 0L; }\n    public void discount(int percent) { }\n    public int itemCount() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass Cart {\n    private final Map<String, Long> items = new LinkedHashMap<>();\n    private int factor = 100;\n\n    public void add(String name, long price, int qty) {\n        items.put(name, items.getOrDefault(name, 0L) + price * qty);\n    }\n\n    public void remove(String name) { items.remove(name); }\n\n    public long total() {\n        long sum = 0;\n        for (long v : items.values()) sum += v;\n        return sum * factor / 100;\n    }\n\n    public void discount(int percent) { factor = percent; }\n\n    public int itemCount() { return items.size(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "同名商品重复 add 是覆盖单价、累加数量, 不是新增一种商品",
        "折扣要作用在总价上并向下取整, 且不影响已存的单价与数量"
      ]
    },
    {
      "id": "ch03-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计罗马数字转换器 Roman",
      "tags": [
        "设计",
        "贪心",
        "边界"
      ],
      "q": "在同一文件中实现 class Roman:toRoman(int num) 把 1..3999 的整数转为罗马数字字符串(标准七符号加六个减法组合, 如 4=IV、9=IX、40=XL、90=XC、400=CD、900=CM); fromRoman(String s) 把合法罗马数字转回整数。两个方法互为逆运算。判题按操作序列调用你的类, 无返回值的方法期望 null。注意字符串结果在判题输出中带双引号。",
      "mode": "design",
      "entry": {
        "className": "Roman"
      },
      "ops": [
        [
          "Roman",
          []
        ],
        [
          "toRoman",
          [
            4
          ]
        ],
        [
          "toRoman",
          [
            9
          ]
        ],
        [
          "toRoman",
          [
            58
          ]
        ],
        [
          "toRoman",
          [
            1994
          ]
        ],
        [
          "fromRoman",
          [
            "MCMXCIV"
          ]
        ],
        [
          "toRoman",
          [
            3999
          ]
        ],
        [
          "fromRoman",
          [
            "IV"
          ]
        ],
        [
          "fromRoman",
          [
            "MMMCMXCIX"
          ]
        ]
      ],
      "expect": [
        "null",
        "\"IV\"",
        "\"IX\"",
        "\"LVIII\"",
        "\"MCMXCIV\"",
        "1994",
        "\"MMMCMXCIX\"",
        "4",
        "3999"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass Roman {\n    // TODO: 建立 13 组 {数值, 符号} 表, 从大到小贪心相减\n    public String toRoman(int num) { return \"\"; }\n    public int fromRoman(String s) { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass Roman {\n    private static final int[] VAL = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\n    private static final String[] SYM = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n\n    public String toRoman(int num) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < VAL.length; i++) {\n            while (num >= VAL[i]) { sb.append(SYM[i]); num -= VAL[i]; }\n        }\n        return sb.toString();\n    }\n\n    public int fromRoman(String s) {\n        Map<Character, Integer> m = new HashMap<>();\n        m.put('I', 1); m.put('V', 5); m.put('X', 10); m.put('L', 50);\n        m.put('C', 100); m.put('D', 500); m.put('M', 1000);\n        int sum = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int v = m.get(s.charAt(i));\n            if (i + 1 < s.length() && v < m.get(s.charAt(i + 1))) sum -= v;\n            else sum += v;\n        }\n        return sum;\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "把 4/9/40/90/400/900 也当成独立符号放进表里, 从大到小贪心即可",
        "fromRoman 中若某位比后一位小就减去它, 否则加上它"
      ]
    },
    {
      "id": "ch03-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS:设计循环缓冲统计器 LoopStats",
      "tags": [
        "设计",
        "环形缓冲",
        "子数组极值",
        "综合"
      ],
      "q": "在同一文件中实现 class LoopStats(本章 Boss, 保留 public class Main 占位):push(int v) 追加一个数据; sum() 返回已加入数据的总和(long); max() 返回当前最大值; min() 返回当前最小值; windowSum(int k) 返回最近 k 个数据的和, 若当前数据不足 k 个则返回 -1(窗口指的是最后 k 个); avg() 返回所有数据的整数平均值(总和 / 个数, 向下取整); distinct() 返回当前不同数值的个数。判题按操作序列调用你的类, 无返回值的方法期望 null, 注意 sum/min/max/avg/distinct 在空状态下的返回值。",
      "mode": "design",
      "entry": {
        "className": "LoopStats"
      },
      "ops": [
        [
          "LoopStats",
          []
        ],
        [
          "sum",
          []
        ],
        [
          "min",
          []
        ],
        [
          "max",
          []
        ],
        [
          "avg",
          []
        ],
        [
          "distinct",
          []
        ],
        [
          "push",
          [
            5
          ]
        ],
        [
          "push",
          [
            3
          ]
        ],
        [
          "sum",
          []
        ],
        [
          "max",
          []
        ],
        [
          "min",
          []
        ],
        [
          "windowSum",
          [
            2
          ]
        ],
        [
          "push",
          [
            7
          ]
        ],
        [
          "push",
          [
            5
          ]
        ],
        [
          "windowSum",
          [
            3
          ]
        ],
        [
          "windowSum",
          [
            5
          ]
        ],
        [
          "avg",
          []
        ],
        [
          "distinct",
          []
        ],
        [
          "push",
          [
            -2
          ]
        ],
        [
          "min",
          []
        ],
        [
          "windowSum",
          [
            2
          ]
        ],
        [
          "sum",
          []
        ],
        [
          "avg",
          []
        ],
        [
          "distinct",
          []
        ]
      ],
      "expect": [
        "null",
        "0",
        "0",
        "0",
        "0",
        "0",
        "null",
        "null",
        "8",
        "5",
        "3",
        "8",
        "null",
        "null",
        "15",
        "-1",
        "5",
        "3",
        "null",
        "-2",
        "3",
        "18",
        "3",
        "4"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass LoopStats {\n    // TODO: 维护总和/极值/去重集合, windowSum 用最近 k 个元素另算\n    public void push(int v) { }\n    public long sum() { return 0L; }\n    public int max() { return 0; }\n    public int min() { return 0; }\n    public long windowSum(int k) { return -1L; }\n    public long avg() { return 0L; }\n    public int distinct() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass LoopStats {\n    private final List<Integer> data = new ArrayList<>();\n    private final Map<Integer, Integer> freq = new HashMap<>();\n    private long total = 0;\n\n    public void push(int v) {\n        data.add(v);\n        total += v;\n        freq.put(v, freq.getOrDefault(v, 0) + 1);\n    }\n\n    public long sum() { return total; }\n\n    public int max() {\n        int m = Integer.MIN_VALUE;\n        for (int x : data) m = Math.max(m, x);\n        return data.isEmpty() ? 0 : m;\n    }\n\n    public int min() {\n        int m = Integer.MAX_VALUE;\n        for (int x : data) m = Math.min(m, x);\n        return data.isEmpty() ? 0 : m;\n    }\n\n    public long windowSum(int k) {\n        if (data.size() < k) return -1L;\n        long s = 0;\n        for (int i = data.size() - k; i < data.size(); i++) s += data.get(i);\n        return s;\n    }\n\n    public long avg() { return data.isEmpty() ? 0L : total / data.size(); }\n\n    public int distinct() { return freq.size(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "windowSum(k) 取的是最后 k 个元素, 不足 k 个返回 -1 而不是 0",
        "avg 用整数除法向下取整, 负数时 Java 的 / 是向零取整, 要留意符号"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "LoopStats",
              []
            ],
            [
              "sum",
              []
            ],
            [
              "min",
              []
            ],
            [
              "max",
              []
            ],
            [
              "avg",
              []
            ],
            [
              "distinct",
              []
            ],
            [
              "push",
              [
                5
              ]
            ],
            [
              "push",
              [
                3
              ]
            ],
            [
              "sum",
              []
            ],
            [
              "max",
              []
            ],
            [
              "min",
              []
            ],
            [
              "windowSum",
              [
                2
              ]
            ],
            [
              "push",
              [
                7
              ]
            ],
            [
              "push",
              [
                5
              ]
            ],
            [
              "windowSum",
              [
                3
              ]
            ],
            [
              "windowSum",
              [
                5
              ]
            ],
            [
              "avg",
              []
            ],
            [
              "distinct",
              []
            ],
            [
              "push",
              [
                -2
              ]
            ],
            [
              "min",
              []
            ],
            [
              "windowSum",
              [
                2
              ]
            ],
            [
              "sum",
              []
            ],
            [
              "avg",
              []
            ],
            [
              "distinct",
              []
            ]
          ],
          "expect": [
            "null",
            "0",
            "0",
            "0",
            "0",
            "0",
            "null",
            "null",
            "8",
            "5",
            "3",
            "8",
            "null",
            "null",
            "15",
            "-1",
            "5",
            "3",
            "null",
            "-2",
            "3",
            "18",
            "3",
            "4"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "LoopStats"
            ],
            [
              "windowSum",
              [
                1
              ]
            ],
            [
              "push",
              [
                -3
              ]
            ],
            [
              "push",
              [
                -3
              ]
            ],
            [
              "sum"
            ],
            [
              "avg"
            ],
            [
              "min"
            ],
            [
              "max"
            ],
            [
              "distinct"
            ],
            [
              "windowSum",
              [
                1
              ]
            ],
            [
              "windowSum",
              [
                3
              ]
            ],
            [
              "push",
              [
                7
              ]
            ],
            [
              "avg"
            ],
            [
              "distinct"
            ]
          ],
          "expect": [
            "null",
            "-1",
            "null",
            "null",
            "-6",
            "-3",
            "-3",
            "-3",
            "1",
            "-3",
            "-1",
            "null",
            "0",
            "2"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
