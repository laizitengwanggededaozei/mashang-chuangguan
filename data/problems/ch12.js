window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 12,
  "title": "常见API与集合基础",
  "courseRef": "黑马第12章-常见API(String/StringBuilder/ArrayList/正则) + 集合基础",
  "levels": [
    {
      "id": "ch12-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "字符串反转与判空边界",
      "tags": [
        "String",
        "StringBuilder",
        "边界"
      ],
      "q": "实现 reverse(String s):返回 s 的反转字符串。约束 s 非 null, 长度 0 ≤ n ≤ 1000。空串必须返回空串; 长度为 1 时必须原样返回。不得使用 new StringBuilder(s).reverse() 以外的方式输出错误编码。",
      "mode": "method",
      "entry": {
        "method": "reverse",
        "params": [
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String reverse(String s) {\n        // TODO: 用 StringBuilder 或字符数组倒序拼接\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String reverse(String s) {\n        return new StringBuilder(s).reverse().toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "hello"
          ],
          "expect": "\"olleh\"",
          "cmp": "exact"
        },
        {
          "name": "单字符",
          "args": [
            "a"
          ],
          "expect": "\"a\"",
          "cmp": "exact"
        },
        {
          "name": "空串",
          "args": [
            ""
          ],
          "expect": "\"\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全同字符",
          "args": [
            "aaaa"
          ],
          "expect": "\"aaaa\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "StringBuilder.reverse() 直接返回自身, 可以链式调用 toString()",
        "空串反转仍是空串, 不要返回 null"
      ]
    },
    {
      "id": "ch12-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "统计字符出现的次数",
      "tags": [
        "String API",
        "计数",
        "ASCII"
      ],
      "q": "实现 charCount(String s, char c):返回字符 c 在字符串 s 中出现的次数。约束 s 非 null, 长度 ≤ 1e4, s 只含可见 ASCII 字符。s 为空串时返回 0。",
      "mode": "method",
      "entry": {
        "method": "charCount",
        "params": [
          "String",
          "char"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int charCount(String s, char c) {\n        // TODO: 遍历字符逐个比较\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int charCount(String s, char c) {\n        int n = 0;\n        for (int i = 0; i < s.length(); i++) if (s.charAt(i) == c) n++;\n        return n;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "apple",
            "p"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "不存在",
          "args": [
            "apple",
            "z"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "空串",
          "args": [
            "",
            "a"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "连续重复",
          "args": [
            "aaaaa",
            "a"
          ],
          "expect": "5",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "char 参数由判题按字符首字面解析, 直接写单字符即可",
        "统计时注意区分大小写"
      ]
    },
    {
      "id": "ch12-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "StringBuilder 拼接数字序列",
      "tags": [
        "StringBuilder",
        "循环",
        "性能"
      ],
      "q": "实现 joinRange(int a, int b):把闭区间 [a, b] 中的整数依次用逗号拼接成一个字符串; 若 a > b 返回空串。约束 -1000 ≤ a,b ≤ 1000。例如 joinRange(1,4) 返回 \"1,2,3,4\", joinRange(3,1) 返回空串。",
      "mode": "method",
      "entry": {
        "method": "joinRange",
        "params": [
          "int",
          "int"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String joinRange(int a, int b) {\n        // TODO: 用 StringBuilder 拼接, 注意逗号只加在中间\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String joinRange(int a, int b) {\n        if (a > b) return \"\";\n        StringBuilder sb = new StringBuilder();\n        for (int i = a; i <= b; i++) {\n            if (i > a) sb.append(',');\n            sb.append(i);\n        }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1",
            "4"
          ],
          "expect": "\"1,2,3,4\"",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "5",
            "5"
          ],
          "expect": "\"5\"",
          "cmp": "exact"
        },
        {
          "name": "逆序区间",
          "args": [
            "3",
            "1"
          ],
          "expect": "\"\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "含负数越零",
          "args": [
            "-2",
            "1"
          ],
          "expect": "\"-2,-1,0,1\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "用 if (i > a) 控制分隔符, 避免首尾多余逗号",
        "负数拼接会自带负号, 不需要特殊处理"
      ]
    },
    {
      "id": "ch12-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "按空白分词并清洗标点",
      "tags": [
        "分词",
        "StringBuilder",
        "字符判断"
      ],
      "q": "实现 wordCount(String s):把句子按空白(空格)切分, 每个词去掉首尾的非字母数字字符后计数, 若清洗后为空则不计入。返回词的个数。约束 s 长度 ≤ 1e4, 只含 ASCII 字母、数字、空格与常见标点 .,!?;:'-  。空串或全空白返回 0。",
      "mode": "method",
      "entry": {
        "method": "wordCount",
        "params": [
          "String"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int wordCount(String s) {\n        // TODO: split(\"\\\\s+\") 后逐个清洗并计数\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int wordCount(String s) {\n        String t = s.trim();\n        if (t.isEmpty()) return 0;\n        String[] parts = t.split(\"\\\\s+\");\n        int n = 0;\n        for (String p : parts) {\n            int i = 0, j = p.length() - 1;\n            while (i <= j && !Character.isLetterOrDigit(p.charAt(i))) i++;\n            while (j >= i && !Character.isLetterOrDigit(p.charAt(j))) j--;\n            if (i <= j) n++;\n        }\n        return n;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "hello world"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "带标点",
          "args": [
            "hi, there!"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "纯标点词",
          "args": [
            "... ---"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "多空白",
          "args": [
            "  a   b  "
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先 trim 再 split(\"\\\\s+\"), 否则首部会产生空串元素",
        "清洗要双向收缩: 前导与后导标点都要去掉"
      ]
    },
    {
      "id": "ch12-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "用正则校验密码强度",
      "tags": [
        "正则表达式",
        "String.matches",
        "组合条件"
      ],
      "q": "实现 strongPassword(String p):判断密码是否满足:长度 8..20; 至少含 1 个数字; 至少含 1 个小写字母; 至少含 1 个大写字母; 且不含空白字符。全部满足返回 true。约束 p 非 null, 长度 ≤ 200。",
      "mode": "method",
      "entry": {
        "method": "strongPassword",
        "params": [
          "String"
        ],
        "ret": "boolean"
      },
      "starter": "public class Main {\n    public static boolean strongPassword(String p) {\n        // TODO: 多个正则条件同时成立\n        return false;\n    }\n}\n",
      "solution": "public class Main {\n    public static boolean strongPassword(String p) {\n        if (p.length() < 8 || p.length() > 20) return false;\n        return p.matches(\".*[0-9].*\") && p.matches(\".*[a-z].*\") && p.matches(\".*[A-Z].*\") && !p.matches(\".*\\\\s.*\");\n    }\n}\n",
      "tests": [
        {
          "name": "样例通过",
          "args": [
            "Abcdef12"
          ],
          "expect": "true",
          "cmp": "exact"
        },
        {
          "name": "缺大写",
          "args": [
            "abcdef12"
          ],
          "expect": "false",
          "cmp": "exact"
        },
        {
          "name": "长度不足",
          "args": [
            "Ab1"
          ],
          "expect": "false",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "含空格",
          "args": [
            "Abcdef 12"
          ],
          "expect": "false",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "matches 要求整串匹配, 片段匹配需要前后加 .*",
        "长度边界是 8 与 20, 两端都算合法"
      ]
    },
    {
      "id": "ch12-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "手写 ArrayList:去重并保序",
      "tags": [
        "ArrayList",
        "去重",
        "保序"
      ],
      "q": "实现 unique(String a):参数是把若干单词用 '|' 连接后的字符串(判题按 String 传入), 先按 '|' 拆分成单词数组, 再借助 ArrayList 手工去重(不要用 Set)、保留单词首次出现的顺序, 最后返回去重后的 String[]。约束连接串长度 ≤ 1e4、单词非 null 长度 ≤ 50, 空串视为无单词并返回空数组。",
      "mode": "method",
      "entry": {
        "method": "unique",
        "params": [
          "String"
        ],
        "ret": "String[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String[] unique(String a) {\n        // TODO: 入参是 'a|b|c' 形式的连接串, 先按 | 拆开, 再用 ArrayList + contains 手工判重\n        return new String[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static String[] unique(String a) {\n        if (a.isEmpty()) return new String[0];\n        java.util.ArrayList<String> list = new java.util.ArrayList<>();\n        for (String s : a.split(\"\\\\|\")) if (!list.contains(s)) list.add(s);\n        return list.toArray(new String[0]);\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "a|b|a|c"
          ],
          "expect": "[\"a\",\"b\",\"c\"]",
          "cmp": "exact"
        },
        {
          "name": "无重复",
          "args": [
            "x|y"
          ],
          "expect": "[\"x\",\"y\"]",
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
            "z|z|z"
          ],
          "expect": "[\"z\"]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "空串要先单独返回空数组, 因为 \"\".split(\"\\\\|\") 会得到含一个空串的数组",
        "String.split(\"\\\\|\") 需要转义竖线, 因为 | 在正则中是或运算符",
        "保序的关键是遍历时按首次出现顺序 add",
        "返回 String[] 判题会按 [\"a\",\"b\"] 形式序列化"
      ]
    },
    {
      "id": "ch12-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "最长回文子串长度",
      "tags": [
        "回文",
        "中心扩展",
        "双指针"
      ],
      "q": "实现 longestPalindrome(String s):返回 s 中最长回文子串的长度。约束长度 ≤ 2000, s 非 null、只含 ASCII 可见字符。空串返回 0, 单字符返回 1。要求复杂度优于 O(n^3)。",
      "mode": "method",
      "entry": {
        "method": "longestPalindrome",
        "params": [
          "String"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int longestPalindrome(String s) {\n        // TODO: 枚举中心 + 向两侧扩展, 共 2n-1 个中心\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int longestPalindrome(String s) {\n        if (s.length() == 0) return 0;\n        int best = 1;\n        for (int c = 0; c < 2 * s.length() - 1; c++) {\n            int l = c / 2, r = l + c % 2;\n            while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { best = Math.max(best, r - l + 1); l--; r++; }\n        }\n        return best;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "babad"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "偶回文",
          "args": [
            "cbbd"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "无回文(单字符)",
          "args": [
            "ab"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
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
          "name": "全同",
          "args": [
            "aaaa"
          ],
          "expect": "4",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "中心有两类: 单字符中心与双字符中心, 用 c 的奇偶统一枚举",
        "答案至少为 1(非空串)"
      ]
    },
    {
      "id": "ch12-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "字符串压缩(行程编码)",
      "tags": [
        "压缩",
        "StringBuilder",
        "边界"
      ],
      "q": "实现 compress(String s):把连续重复字符做行程编码, 形式为 字符+次数, 次数为 1 时省略数字。约束长度 ≤ 1e4, s 非 null、只含小写字母。空串返回空串。例如 \"aaabbc\" -> \"a3b2c\"。",
      "mode": "method",
      "entry": {
        "method": "compress",
        "params": [
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String compress(String s) {\n        // TODO: 统计连续段, 段长>1 才追加数字\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String compress(String s) {\n        StringBuilder sb = new StringBuilder();\n        int i = 0;\n        while (i < s.length()) {\n            int j = i;\n            while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;\n            sb.append(s.charAt(i));\n            if (j - i > 1) sb.append(j - i);\n            i = j;\n        }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "aaabbc"
          ],
          "expect": "\"a3b2c\"",
          "cmp": "exact"
        },
        {
          "name": "无重复",
          "args": [
            "abc"
          ],
          "expect": "\"abc\"",
          "cmp": "exact"
        },
        {
          "name": "空串",
          "args": [
            ""
          ],
          "expect": "\"\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "双字符段",
          "args": [
            "aab"
          ],
          "expect": "\"a2b\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单段超长",
          "args": [
            "aaaaaaaaaa"
          ],
          "expect": "\"a10\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "段长为 1 时不写数字, 段长为 2 要写",
        "次数可能是多位数, 直接 append(int) 即可"
      ]
    },
    {
      "id": "ch12-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "手写哈希表 MyHashMap",
      "tags": [
        "哈希",
        "拉链法",
        "手写实现"
      ],
      "q": "实现 hashMapOps(int cap, String spec):spec 是用 '|' 连接的操作串, 每条指令形如 \"put:key:val\"、\"get:key\"、\"remove:key\", 依次执行后把每条 get 的结果(不存在为 -1)按顺序返回 int[]。cap 为桶数量(≥1), key 为非负 int。要求自己实现链表拉链法, 不允许直接使用 HashMap 完成全部逻辑。",
      "mode": "method",
      "entry": {
        "method": "hashMapOps",
        "params": [
          "int",
          "String"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] hashMapOps(int cap, String spec) {\n        // TODO: 按 | 拆分指令, 再用 int[] 桶 + 链表节点实现 put/get/remove\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    static class Node { int k, v; Node next; Node(int k, int v) { this.k = k; this.v = v; } }\n    public static int[] hashMapOps(int cap, String spec) {\n        Node[] tab = new Node[cap];\n        java.util.ArrayList<Integer> res = new java.util.ArrayList<>();\n        for (String op : spec.split(\"\\\\|\")) {\n            String[] p = op.split(\":\");\n            int idx = Integer.parseInt(p[1]) % cap;\n            if (p[0].equals(\"put\")) {\n                int v = Integer.parseInt(p[2]);\n                boolean done = false;\n                for (Node c = tab[idx]; c != null; c = c.next) if (c.k == Integer.parseInt(p[1])) { c.v = v; done = true; }\n                if (!done) { Node nd = new Node(Integer.parseInt(p[1]), v); nd.next = tab[idx]; tab[idx] = nd; }\n            } else if (p[0].equals(\"get\")) {\n                int r = -1;\n                for (Node c = tab[idx]; c != null; c = c.next) if (c.k == Integer.parseInt(p[1])) { r = c.v; break; }\n                res.add(r);\n            } else {\n                Node prev = null;\n                for (Node c = tab[idx]; c != null; c = c.next) {\n                    if (c.k == Integer.parseInt(p[1])) { if (prev == null) tab[idx] = c.next; else prev.next = c.next; break; }\n                    prev = c;\n                }\n            }\n        }\n        int[] out = new int[res.size()];\n        for (int i = 0; i < out.length; i++) out[i] = res.get(i);\n        return out;\n    }\n}\n",
      "tests": [
        {
          "name": "基本读写",
          "args": [
            "4",
            "put:1:10|put:2:20|get:1|get:2|get:3"
          ],
          "expect": "[10,20,-1]",
          "cmp": "exact"
        },
        {
          "name": "同桶冲突",
          "args": [
            "2",
            "put:1:1|put:3:3|get:1|get:3|remove:1|get:1"
          ],
          "expect": "[1,3,-1]",
          "cmp": "exact"
        },
        {
          "name": "覆盖写",
          "args": [
            "3",
            "put:5:1|put:5:9|get:5"
          ],
          "expect": "[9]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "删除不存在",
          "args": [
            "1",
            "remove:7|get:7|put:0:0|get:0"
          ],
          "expect": "[-1,0]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "入参是 'A|B' 形式的连接串, split(\"\\\\|\") 后逐条解析",
        "取模时 key 非负, 直接用 % cap 即可",
        "覆盖写必须更新原有节点的 value, 而不是新增节点"
      ]
    },
    {
      "id": "ch12-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "KMP 匹配首个下标(对拍暴力)",
      "tags": [
        "KMP",
        "next数组",
        "O(n+m)"
      ],
      "q": "实现 solve(String hay, String needle):返回 needle 在 hay 中首次出现的下标, 不存在返回 -1; needle 为空串时返回 0。约束两串长度 ≤ 1e5, 均由小写字母组成。要求用 KMP(或等价线性算法), 本题会把你的实现与暴力匹配参考实现在大量随机用例上对拍。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "String",
          "String"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int solve(String hay, String needle) {\n        // TODO: 先求 next(前缀函数), 再线性扫描\n        return -1;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(String hay, String needle) {\n        int n = hay.length(), m = needle.length();\n        if (m == 0) return 0;\n        int[] nxt = new int[m];\n        for (int i = 1, k = 0; i < m; i++) {\n            while (k > 0 && needle.charAt(i) != needle.charAt(k)) k = nxt[k - 1];\n            if (needle.charAt(i) == needle.charAt(k)) k++;\n            nxt[i] = k;\n        }\n        for (int i = 0, k = 0; i < n; i++) {\n            while (k > 0 && hay.charAt(i) != needle.charAt(k)) k = nxt[k - 1];\n            if (hay.charAt(i) == needle.charAt(k)) k++;\n            if (k == m) return i - m + 1;\n        }\n        return -1;\n    }\n}\n",
      "tests": [
        {
          "name": "样例命中",
          "args": [
            "aabaabaaa",
            "aabaa"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "未命中",
          "args": [
            "abc",
            "d"
          ],
          "expect": "-1",
          "cmp": "exact"
        },
        {
          "name": "空模式",
          "args": [
            "abc",
            ""
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "模式更长",
          "args": [
            "ab",
            "abc"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260701,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(40); int m=r.nextInt(8); int al=1+r.nextInt(3); StringBuilder h=new StringBuilder(); for(int i=0;i<n;i++) h.append((char)(97+r.nextInt(al))); StringBuilder p=new StringBuilder(); for(int i=0;i<m;i++) p.append((char)(97+r.nextInt(al))); return new String[]{ h.toString(), p.toString() }; } }",
        "ref": "public class Ref { public static int solve(String h, String p){ if(p.length()==0) return 0; for(int i=0;i+p.length()<=h.length();i++){ int j=0; while(j<p.length() && h.charAt(i+j)==p.charAt(j)) j++; if(j==p.length()) return i; } return -1; } }"
      },
      "hints": [
        "next[i] 表示 needle[0..i] 的最长相等前后缀长度",
        "失配时回退到 nxt[k-1], 而不是 k-1"
      ]
    },
    {
      "id": "ch12-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "编辑距离(对拍记忆化递归)",
      "tags": [
        "动态规划",
        "编辑距离",
        "二维DP"
      ],
      "q": "实现 solve(String a, String b):返回把 a 变成 b 的最少操作数, 允许插入、删除、替换各算 1 次。约束两串长度 ≤ 200。空串参与时答案等于另一串长度。本题随机对拍:与记忆化递归参考实现比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "String",
          "String"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int solve(String a, String b) {\n        // TODO: dp[i][j] = a 前 i 个变成 b 前 j 个的最少操作数\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(String a, String b) {\n        int n = a.length(), m = b.length();\n        int[] dp = new int[m + 1];\n        for (int j = 0; j <= m; j++) dp[j] = j;\n        for (int i = 1; i <= n; i++) {\n            int prev = dp[0];\n            dp[0] = i;\n            for (int j = 1; j <= m; j++) {\n                int tmp = dp[j];\n                if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = prev;\n                else dp[j] = 1 + Math.min(prev, Math.min(dp[j], dp[j - 1]));\n                prev = tmp;\n            }\n        }\n        return dp[m];\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "horse",
            "ros"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "相同串",
          "args": [
            "abc",
            "abc"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "空串到非空",
          "args": [
            "",
            "abc"
          ],
          "expect": "3",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "都为空",
          "args": [
            "",
            ""
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20260811,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(9); int m=r.nextInt(9); int al=1+r.nextInt(3); StringBuilder x=new StringBuilder(); for(int i=0;i<n;i++) x.append((char)(97+r.nextInt(al))); StringBuilder y=new StringBuilder(); for(int i=0;i<m;i++) y.append((char)(97+r.nextInt(al))); return new String[]{ x.toString(), y.toString() }; } }",
        "ref": "public class Ref { static int[][] memo; public static int solve(String a, String b){ int n=a.length(), m=b.length(); memo=new int[n+1][m+1]; for(int[] r : memo) java.util.Arrays.fill(r,-1); return go(a,b,n,m); } static int go(String a, String b, int i, int j){ if(i==0) return j; if(j==0) return i; if(memo[i][j]>=0) return memo[i][j]; int r; if(a.charAt(i-1)==b.charAt(j-1)) r=go(a,b,i-1,j-1); else r=1+Math.min(go(a,b,i-1,j-1), Math.min(go(a,b,i-1,j), go(a,b,i,j-1))); memo[i][j]=r; return r; } }"
      },
      "hints": [
        "dp 边界: dp[i][0]=i, dp[0][j]=j",
        "滚动数组时注意先保存上一行左上角的值"
      ]
    },
    {
      "id": "ch12-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "行程编码压缩还原(对拍)",
      "tags": [
        "压缩还原",
        "状态机",
        "多位数次数"
      ],
      "q": "实现 solve(String s):把行程编码串还原成原始字符串。编码规则:字母后面可以跟十进制数字表示重复次数, 没有数字表示重复 1 次(例如 \"a3b2\" -> \"aaabb\"); 次数可能是多位数(如 \"a12\" 表示 12 个 a)。约束 s 长度 ≤ 1e4, 由小写字母与数字组成, 保证合法且结果长度 ≤ 1e5; 空串返回空串。本题随机对拍:参考实现用另写的解析器逐字符还原。",
      "mode": "stress",
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
      "starter": "public class Main {\n    public static String solve(String s) {\n        // TODO: 遇到字母就找它后面连续的数字作为次数, 再重复输出\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String solve(String s) {\n        StringBuilder sb = new StringBuilder();\n        int i = 0;\n        while (i < s.length()) {\n            char c = s.charAt(i++);\n            int num = 0;\n            boolean has = false;\n            while (i < s.length() && Character.isDigit(s.charAt(i))) { num = num * 10 + (s.charAt(i) - '0'); i++; has = true; }\n            int cnt = has ? num : 1;\n            for (int k = 0; k < cnt; k++) sb.append(c);\n        }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "a3b2"
          ],
          "expect": "\"aaabb\"",
          "cmp": "exact"
        },
        {
          "name": "无数字",
          "args": [
            "abc"
          ],
          "expect": "\"abc\"",
          "cmp": "exact"
        },
        {
          "name": "空串",
          "args": [
            ""
          ],
          "expect": "\"\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "多位数次数",
          "args": [
            "a12"
          ],
          "expect": "\"aaaaaaaaaaaa\"",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "次数为十",
          "args": [
            "b10c"
          ],
          "expect": "\"bbbbbbbbbbc\"",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260921,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int segs=r.nextInt(6); int al=1+r.nextInt(3); StringBuilder b=new StringBuilder(); for(int i=0;i<segs;i++){ char c=(char)(97+r.nextInt(al)); int cnt=1+r.nextInt(20); b.append(c); if(r.nextInt(3)!=0) b.append(cnt); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static String solve(String s){ StringBuilder b=new StringBuilder(); int i=0; while(i<s.length()){ char c=s.charAt(i); i++; int num=-1; int st=i; while(i<s.length() && s.charAt(i)>=(char)48 && s.charAt(i)<=(char)57) i++; if(i>st) num=Integer.parseInt(s.substring(st,i)); int cnt=(num<0)?1:num; for(int k=0;k<cnt;k++) b.append(c); } return b.toString(); } }"
      },
      "hints": [
        "次数读取要循环到第一个非数字字符为止, 支持多位数",
        "没有数字时默认次数为 1"
      ]
    },
    {
      "id": "ch12-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计字符串缓冲器 StringBuilderLite",
      "tags": [
        "设计",
        "StringBuilder",
        "String API"
      ],
      "q": "在同一文件中实现 class StringBuilderLite(不要改类名与 public class Main 占位):append(String s) 追加; reverse() 反转当前内容; toString() 返回当前内容; length() 返回当前长度。判题按操作序列调用你的类, 无返回值的方法期望 null(toString 也被当作普通方法调用并在无参时返回内容)。",
      "mode": "design",
      "entry": {
        "className": "StringBuilderLite"
      },
      "ops": [
        [
          "StringBuilderLite",
          [],
          []
        ],
        [
          "append",
          [
            "ab"
          ],
          [
            "String"
          ]
        ],
        [
          "append",
          [
            "cd"
          ],
          [
            "String"
          ]
        ],
        [
          "length",
          [],
          []
        ],
        [
          "reverse",
          [],
          []
        ],
        [
          "toString",
          [],
          []
        ],
        [
          "length",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "4",
        "null",
        "\"dcba\"",
        "4"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass StringBuilderLite {\n    // TODO: 内部维护一个可变字符容器(可用 StringBuilder 或 ArrayList<Character>)\n    public void append(String s) { }\n    public void reverse() { }\n    public int length() { return 0; }\n    public String toString() { return \"\"; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass StringBuilderLite {\n    private final StringBuilder sb = new StringBuilder();\n    public void append(String s) { sb.append(s); }\n    public void reverse() { sb.reverse(); }\n    public int length() { return sb.length(); }\n    public String toString() { return sb.toString(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "reverse 是原地翻转, 不返回新对象",
        "length 在反转前后可能相同, 注意用最终内容判断"
      ]
    },
    {
      "id": "ch12-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计通配符匹配器 WildcardMatcher",
      "tags": [
        "设计",
        "通配符",
        "回溯/DP"
      ],
      "q": "实现 class WildcardMatcher:\\n· WildcardMatcher(String pattern) 构造时编译并保存模式; compile(String pattern) 可随时更换模式;\\n· matches(String text) 判断整串是否匹配。\\n模式中 '?' 匹配任意 1 个字符, '*' 匹配任意长度(含 0)的任意字符序列; 其他字符按字面匹配。约束模式与被匹配串长度 ≤ 1e4。判题按操作序列调用你的类。",
      "mode": "design",
      "entry": {
        "className": "WildcardMatcher"
      },
      "ops": [
        [
          "WildcardMatcher",
          [
            "a?c"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "abc"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "ac"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "abbc"
          ],
          [
            "String"
          ]
        ],
        [
          "compile",
          [
            "a*c"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "ac"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "abbbc"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "abd"
          ],
          [
            "String"
          ]
        ],
        [
          "compile",
          [
            "*x?"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "zzxq"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "zzx"
          ],
          [
            "String"
          ]
        ],
        [
          "matches",
          [
            "xq"
          ],
          [
            "String"
          ]
        ]
      ],
      "expect": [
        "null",
        "true",
        "false",
        "false",
        "null",
        "true",
        "true",
        "false",
        "null",
        "true",
        "false",
        "true"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass WildcardMatcher {\n    // TODO: compile(String) 保存模式; matches(String) 用双指针贪心回溯(或二维 DP)处理 '?' 与 '*'\n    public void compile(String pattern) { }\n    public boolean matches(String text) { return false; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass WildcardMatcher {\n    private String p = \"\";\n    public WildcardMatcher() { }\n    public WildcardMatcher(String pattern) { this.p = pattern; }\n    public void compile(String pattern) { this.p = pattern; }\n    public boolean matches(String text) {\n        int i = 0, j = 0, star = -1, mark = 0;\n        while (i < text.length()) {\n            if (j < p.length() && (p.charAt(j) == '?' || p.charAt(j) == text.charAt(i))) { i++; j++; }\n            else if (j < p.length() && p.charAt(j) == '*') { star = j++; mark = i; }\n            else if (star >= 0) { j = star + 1; i = ++mark; }\n            else return false;\n        }\n        while (j < p.length() && p.charAt(j) == '*') j++;\n        return j == p.length();\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "构造接收初始模式, 之后可用 compile(String) 换模式, 无返回值操作期望 null",
        "贪心回溯: 记录最近一个 * 的位置与它匹配到的文本位置",
        "文本走完后, 模式剩余部分必须全是 *"
      ]
    },
    {
      "id": "ch12-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计 LFU 缓存",
      "tags": [
        "设计",
        "LFU",
        "哈希+频次表"
      ],
      "q": "实现 class LFUCache:\\n· LFUCache(int capacity) 构造, capacity ≥ 1;\\n· get(int key) 命中返回值并把该键使用频次 +1, 未命中返回 -1;\\n· put(int key,int value) 写入或更新(更新也算一次使用); 容量满时淘汰使用频次最小的键, 频次相同时淘汰最久未使用的键。\\n要求 get/put 平均 O(1)。判题按操作序列调用你的类, 无返回值操作期望 null。",
      "mode": "design",
      "entry": {
        "className": "LFUCache"
      },
      "ops": [
        [
          "LFUCache",
          [
            2
          ],
          [
            "int"
          ]
        ],
        [
          "put",
          [
            1,
            1
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "put",
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
          "get",
          [
            1
          ],
          [
            "int"
          ]
        ],
        [
          "put",
          [
            3,
            3
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "get",
          [
            2
          ],
          [
            "int"
          ]
        ],
        [
          "get",
          [
            3
          ],
          [
            "int"
          ]
        ],
        [
          "put",
          [
            4,
            4
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "get",
          [
            1
          ],
          [
            "int"
          ]
        ],
        [
          "get",
          [
            3
          ],
          [
            "int"
          ]
        ],
        [
          "get",
          [
            4
          ],
          [
            "int"
          ]
        ],
        [
          "put",
          [
            3,
            30
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "get",
          [
            3
          ],
          [
            "int"
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
        "3",
        "null",
        "-1",
        "3",
        "4",
        "null",
        "30"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass LFUCache {\n    // TODO: key -> 值/频次; 频次 -> 该频次下的键(按访问先后排序, 便于淘汰最久未使用)\n    public LFUCache(int capacity) { }\n    public int get(int key) { return -1; }\n    public void put(int key, int value) { }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass LFUCache {\n    private final int cap;\n    private final Map<Integer, int[]> kv = new HashMap<>();       // key -> {value, freq}\n    private final Map<Integer, LinkedHashSet<Integer>> freq = new HashMap<>();\n    private int minFreq = 0;\n\n    public LFUCache(int capacity) { this.cap = capacity; }\n\n    private void touch(int key) {\n        int[] e = kv.get(key);\n        int f = e[1];\n        LinkedHashSet<Integer> set = freq.get(f);\n        if (set != null) { set.remove(key); if (set.isEmpty()) { freq.remove(f); if (minFreq == f) minFreq = f + 1; } }\n        e[1] = f + 1;\n        freq.computeIfAbsent(f + 1, k -> new LinkedHashSet<>()).add(key);\n    }\n\n    public int get(int key) {\n        int[] e = kv.get(key);\n        if (e == null) return -1;\n        touch(key);\n        return e[0];\n    }\n\n    public void put(int key, int value) {\n        if (cap <= 0) return;\n        int[] e = kv.get(key);\n        if (e != null) { e[0] = value; touch(key); return; }\n        if (kv.size() >= cap) {\n            LinkedHashSet<Integer> set = freq.get(minFreq);\n            if (set != null && !set.isEmpty()) {\n                Iterator<Integer> it = set.iterator();\n                int victim = it.next();\n                it.remove();\n                if (set.isEmpty()) freq.remove(minFreq);\n                kv.remove(victim);\n            }\n        }\n        kv.put(key, new int[]{value, 1});\n        freq.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(key);\n        minFreq = 1;\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "频次表用 LinkedHashSet, 迭代器第一个元素就是同频次下最久未使用的键",
        "新插入的键频次必为 1, 因此插入后 minFreq 直接置 1",
        "更新已有键的 value 同样要算一次使用(频次 +1)"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "LFUCache",
              [
                2
              ],
              [
                "int"
              ]
            ],
            [
              "put",
              [
                1,
                1
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "put",
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
              "get",
              [
                1
              ],
              [
                "int"
              ]
            ],
            [
              "put",
              [
                3,
                3
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "get",
              [
                2
              ],
              [
                "int"
              ]
            ],
            [
              "get",
              [
                3
              ],
              [
                "int"
              ]
            ],
            [
              "put",
              [
                4,
                4
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "get",
              [
                1
              ],
              [
                "int"
              ]
            ],
            [
              "get",
              [
                3
              ],
              [
                "int"
              ]
            ],
            [
              "get",
              [
                4
              ],
              [
                "int"
              ]
            ],
            [
              "put",
              [
                3,
                30
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "get",
              [
                3
              ],
              [
                "int"
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
            "3",
            "null",
            "-1",
            "3",
            "4",
            "null",
            "30"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "LFUCache",
              [
                1
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
              "get",
              [
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
              "get",
              [
                2
              ]
            ],
            [
              "put",
              [
                2,
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
              "get",
              [
                3
              ]
            ]
          ],
          "expect": [
            "null",
            "null",
            "1",
            "null",
            "-1",
            "2",
            "null",
            "3",
            "null",
            "-1",
            "3"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
