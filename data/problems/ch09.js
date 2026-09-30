window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 9,
  "title": "面向对象进阶(static/final/枚举/位标志)",
  "courseRef": "黑马第10章-面向对象进阶 + 第9章-面向对象原理",
  "levels": [
    {
      "id": "ch09-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "静态工具类: 安全解析整数",
      "tags": [
        "static工具方法",
        "边界",
        "异常转默认值"
      ],
      "q": "实现静态工具方法 parseOr(String s, int def):把字符串 s 解析为 int。要求:s 为 null、空串或含非法字符时返回 def(不允许抛异常);允许前导/尾随空格;允许可选的正负号;不接受溢出(超出 int 范围视为非法返回 def)。约束 s 长度 ≤ 20。",
      "mode": "method",
      "entry": {
        "method": "parseOr",
        "params": [
          "String",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int parseOr(String s, int def) {\n        // TODO: 判空 -> 去空格 -> 逐字符校验 -> long 累加防溢出\n        return def;\n    }\n}\n",
      "solution": "public class Main {\n    public static int parseOr(String s, int def) {\n        if (s == null) return def;\n        String t = s.trim();\n        if (t.isEmpty()) return def;\n        int i = 0, sign = 1;\n        char c0 = t.charAt(0);\n        if (c0 == '+' || c0 == '-') { if (c0 == '-') sign = -1; i = 1; }\n        if (i >= t.length()) return def;\n        long v = 0;\n        for (; i < t.length(); i++) {\n            char c = t.charAt(i);\n            if (c < '0' || c > '9') return def;\n            v = v * 10 + (c - '0');\n            if (sign * v > Integer.MAX_VALUE || sign * v < Integer.MIN_VALUE) return def;\n        }\n        return (int) (sign * v);\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "42",
            "-1"
          ],
          "expect": "42",
          "cmp": "exact"
        },
        {
          "name": "带空格负数",
          "args": [
            "  -17  ",
            "0"
          ],
          "expect": "-17",
          "cmp": "exact"
        },
        {
          "name": "null取默认",
          "args": [
            "",
            "7"
          ],
          "expect": "7",
          "cmp": "exact"
        },
        {
          "name": "非法尾字符",
          "args": [
            "12a",
            "5"
          ],
          "expect": "5",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "上溢取默认",
          "args": [
            "2147483648",
            "-9"
          ],
          "expect": "-9",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "最小整数",
          "args": [
            "-2147483648",
            "0"
          ],
          "expect": "-2147483648",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先用 long 累加, 最后再判断能否安全转回 int",
        "只有符号没有数字(如 \"-\")也算非法"
      ]
    },
    {
      "id": "ch09-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "枚举映射: 星期几的序号",
      "tags": [
        "枚举",
        "ordinal",
        "switch映射"
      ],
      "q": "定义枚举 Week {MON,TUE,WED,THU,FRI,SAT,SUN}(顺序如上, MON 是第 1 天)。实现静态方法 dayIndex(String name):返回该枚举常量对应的 1..7 天序号;名称不匹配(含 null、大小写不同、空串)返回 -1。约束 name 长度 ≤ 10。",
      "mode": "method",
      "entry": {
        "method": "dayIndex",
        "params": [
          "String"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    enum Week { MON, TUE, WED, THU, FRI, SAT, SUN }\n\n    public static int dayIndex(String name) {\n        // TODO: valueOf 会抛异常, 必须自行捕获或自行比较\n        return -1;\n    }\n}\n",
      "solution": "public class Main {\n    enum Week { MON, TUE, WED, THU, FRI, SAT, SUN }\n\n    public static int dayIndex(String name) {\n        if (name == null) return -1;\n        for (Week w : Week.values()) if (w.name().equals(name)) return w.ordinal() + 1;\n        return -1;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "MON"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "周末",
          "args": [
            "SUN"
          ],
          "expect": "7",
          "cmp": "exact"
        },
        {
          "name": "小写不匹配",
          "args": [
            "mon"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空串",
          "args": [
            ""
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "非法名称",
          "args": [
            "FUNDAY"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "Enum.valueOf 对未知名称抛 IllegalArgumentException, 要返回 -1 就得自己遍历",
        "ordinal() 从 0 开始, 所以序号要 +1"
      ]
    },
    {
      "id": "ch09-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "final 常量表: 只读单位换算",
      "tags": [
        "final",
        "常量表",
        "整数溢出"
      ],
      "q": "实现静态方法 toMillis(int value, String unit):把 value 按单位换算成毫秒。支持单位 \"s\"(×1000)、\"m\"(×60000)、\"h\"(×3600000)、\"d\"(×86400000);单位非法(含 null)返回 -1L。结果可能超出 int, 必须返回 long。约束 |value| ≤ 1000000。",
      "mode": "method",
      "entry": {
        "method": "toMillis",
        "params": [
          "int",
          "String"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    // TODO: 用 static final 常量表承载倍率\n    public static long toMillis(int value, String unit) {\n        return -1L;\n    }\n}\n",
      "solution": "public class Main {\n    static final long SEC = 1000L;\n    static final long MIN = 60L * SEC;\n    static final long HOUR = 60L * MIN;\n    static final long DAY = 24L * HOUR;\n\n    public static long toMillis(int value, String unit) {\n        if (unit == null) return -1L;\n        long f;\n        if (unit.equals(\"s\")) f = SEC;\n        else if (unit.equals(\"m\")) f = MIN;\n        else if (unit.equals(\"h\")) f = HOUR;\n        else if (unit.equals(\"d\")) f = DAY;\n        else return -1L;\n        return value * f;\n    }\n}\n",
      "tests": [
        {
          "name": "秒",
          "args": [
            "5",
            "s"
          ],
          "expect": "5000",
          "cmp": "exact"
        },
        {
          "name": "分",
          "args": [
            "2",
            "m"
          ],
          "expect": "120000",
          "cmp": "exact"
        },
        {
          "name": "非法单位",
          "args": [
            "1",
            "x"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "一天",
          "args": [
            "1",
            "d"
          ],
          "expect": "86400000",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "溢出保护",
          "args": [
            "1000000",
            "d"
          ],
          "expect": "86400000000000",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负值",
          "args": [
            "-3",
            "h"
          ],
          "expect": "-10800000",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "常量表用 long 定义, 乘法才不会在 int 阶段溢出",
        "非法单位与 null 都要短路返回 -1"
      ]
    },
    {
      "id": "ch09-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "静态计数器: 对象编号生成",
      "tags": [
        "static字段",
        "自增",
        "实例与类成员"
      ],
      "q": "实现静态方法 makeIds(int count):模拟创建 count 个对象, 返回它们被分配的编号数组。编号从 1 开始、每次创建自增 1;count ≤ 0 时返回空数组 int[0]。约束 count ≤ 100000。编号由类级计数器产生, 与具体实例无关。",
      "mode": "method",
      "entry": {
        "method": "makeIds",
        "params": [
          "int"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    // TODO: 用 static 计数器, 每次 makeIds 从 1 重新开始\n    public static int[] makeIds(int count) {\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    private static int counter = 0;\n\n    public static int[] makeIds(int count) {\n        if (count <= 0) return new int[0];\n        counter = 0;\n        int[] r = new int[count];\n        for (int i = 0; i < count; i++) r[i] = ++counter;\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3"
          ],
          "expect": "[1,2,3]",
          "cmp": "exact"
        },
        {
          "name": "单个",
          "args": [
            "1"
          ],
          "expect": "[1]",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0"
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负数",
          "args": [
            "-4"
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "连续调用幂等",
          "args": [
            "5"
          ],
          "expect": "[1,2,3,4,5]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先分清实例字段与静态字段的生命周期差别：谁在每次调用后还留着值",
        "static 字段被所有调用共享, 所以每次进入方法都要重置, 否则第二次调用会接着上次的编号"
      ]
    },
    {
      "id": "ch09-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "位标志: 权限位集合",
      "tags": [
        "位运算",
        "位标志",
        "常量组合"
      ],
      "q": "用位标志表示权限:READ=1, WRITE=2, EXEC=4。实现三个静态方法协同工作。addPerm(int mask, int perm) 返回加上权限后的掩码(重复添加不变);hasPerm(int mask, int perm) 判断是否含全部指定权限(perm 可能是组合值, 全含才返回 true);countPerm(int mask) 返回 mask 中已开启的权限位个数(只统计低 3 位)。约束 mask、perm 为任意 int。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "int",
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    // TODO: 返回按 op 分派的结果: op=0 加权限, op=1 判断(返回 0/1), op=2 计数\n    public static int solve(int op, int mask, int perm) {\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    static final int READ = 1, WRITE = 2, EXEC = 4;\n\n    public static int solve(int op, int mask, int perm) {\n        if (op == 0) return mask | perm;\n        if (op == 1) return (mask & perm) == perm ? 1 : 0;\n        int c = 0;\n        for (int i = 0; i < 3; i++) if ((mask & (1 << i)) != 0) c++;\n        return c;\n    }\n}\n",
      "tests": [
        {
          "name": "加权限",
          "args": [
            "0",
            "1",
            "2"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "重复添加不变",
          "args": [
            "0",
            "3",
            "1"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "全含为真",
          "args": [
            "1",
            "7",
            "5"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "部分含为假",
          "args": [
            "1",
            "3",
            "5"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "计数",
          "args": [
            "2",
            "5",
            "0"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "计数零",
          "args": [
            "2",
            "0",
            "0"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "忽略高位",
          "args": [
            "2",
            "255",
            "0"
          ],
          "expect": "3",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "判断组合权限必须写成 (mask & perm) == perm, 不能写成 (mask & perm) != 0",
        "计数只扫低 3 位, 高位不属于权限集合"
      ]
    },
    {
      "id": "ch09-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "幂等工具: 字符串规范化",
      "tags": [
        "幂等",
        "不可变性",
        "StringBuilder"
      ],
      "q": "实现静态方法 normalize(String s):返回规范化结果——去掉首尾空白, 中间连续空白压缩成单个空格, 其余字符原样保留。s 为 null 返回空串。要求幂等:normalize(normalize(s)) 必须等于 normalize(s)。约束 s 长度 ≤ 10000。",
      "mode": "method",
      "entry": {
        "method": "normalize",
        "params": [
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    public static String normalize(String s) {\n        // TODO: 逐字符扫描, 空白折叠\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String normalize(String s) {\n        if (s == null) return \"\";\n        StringBuilder sb = new StringBuilder();\n        boolean pendingSpace = false;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (c == ' ' || c == '\\t' || c == '\\n' || c == '\\r') { pendingSpace = sb.length() > 0; }\n            else {\n                if (pendingSpace) { sb.append(' '); pendingSpace = false; }\n                sb.append(c);\n            }\n        }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "  a   b  "
          ],
          "expect": "a b",
          "cmp": "exact"
        },
        {
          "name": "单字符",
          "args": [
            "x"
          ],
          "expect": "x",
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
          "name": "全空白",
          "args": [
            "    "
          ],
          "expect": "",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "制表符与换行",
          "args": [
            "a\tb\nc"
          ],
          "expect": "a b c",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "用一个 pendingSpace 标记代替直接追加空格, 才能处理结尾空白",
        "sb.length() > 0 保证结果不以空格开头"
      ]
    },
    {
      "id": "ch09-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "枚举驱动的算术分派器",
      "tags": [
        "枚举",
        "分派",
        "除零处理"
      ],
      "q": "定义枚举 Op { ADD, SUB, MUL, DIV, MOD }。实现静态方法 calc(String opName, int a, int b):按枚举名称执行运算并返回结果;名称非法(含 null)返回 Integer.MIN_VALUE;DIV/MOD 遇到 b==0 也返回 Integer.MIN_VALUE。除法向零取整(与 Java 的 / 一致)。约束 |a|,|b| ≤ 1000000。",
      "mode": "method",
      "entry": {
        "method": "calc",
        "params": [
          "String",
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    enum Op { ADD, SUB, MUL, DIV, MOD }\n\n    public static int calc(String opName, int a, int b) {\n        // TODO: 解析枚举 -> 分派 -> 处理除零\n        return Integer.MIN_VALUE;\n    }\n}\n",
      "solution": "public class Main {\n    enum Op { ADD, SUB, MUL, DIV, MOD }\n\n    public static int calc(String opName, int a, int b) {\n        if (opName == null) return Integer.MIN_VALUE;\n        Op op;\n        try { op = Op.valueOf(opName); }\n        catch (IllegalArgumentException e) { return Integer.MIN_VALUE; }\n        switch (op) {\n            case ADD: return a + b;\n            case SUB: return a - b;\n            case MUL: return a * b;\n            case DIV: if (b == 0) return Integer.MIN_VALUE; return a / b;\n            case MOD: if (b == 0) return Integer.MIN_VALUE; return a % b;\n        }\n        return Integer.MIN_VALUE;\n    }\n}\n",
      "tests": [
        {
          "name": "加法",
          "args": [
            "ADD",
            "2",
            "3"
          ],
          "expect": "5",
          "cmp": "exact"
        },
        {
          "name": "整除向零",
          "args": [
            "DIV",
            "-7",
            "2"
          ],
          "expect": "-3",
          "cmp": "exact"
        },
        {
          "name": "取模符号",
          "args": [
            "MOD",
            "-7",
            "2"
          ],
          "expect": "-1",
          "cmp": "exact"
        },
        {
          "name": "非法名称",
          "args": [
            "POW",
            "1",
            "2"
          ],
          "expect": "-2147483648",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "除零",
          "args": [
            "DIV",
            "1",
            "0"
          ],
          "expect": "-2147483648",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "模零",
          "args": [
            "MOD",
            "5",
            "0"
          ],
          "expect": "-2147483648",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "valueOf 抛异常时要捕获并返回哨兵值",
        "Java 的 % 结果符号跟被除数一致, 不要用 Math.abs 改写成非负"
      ]
    },
    {
      "id": "ch09-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "枚举状态机: 订单状态流转",
      "tags": [
        "枚举",
        "状态机",
        "合法性校验"
      ],
      "q": "定义枚举 State { CREATED, PAID, SHIPPED, DONE, CANCELED }。实现静态方法 next(String cur, String action):按规则返回新状态名称。规则:CREATED + \"pay\" -> PAID;CREATED + \"cancel\" -> CANCELED;PAID + \"ship\" -> SHIPPED;PAID + \"cancel\" -> CANCELED;SHIPPED + \"finish\" -> DONE;其余组合(含未知状态、未知动作、终态再操作)一律返回 \"INVALID\"。约束输入长度 ≤ 20。",
      "mode": "method",
      "entry": {
        "method": "next",
        "params": [
          "String",
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    enum State { CREATED, PAID, SHIPPED, DONE, CANCELED }\n\n    public static String next(String cur, String action) {\n        // TODO: 用 switch 表达合法迁移, 默认返回 INVALID\n        return \"INVALID\";\n    }\n}\n",
      "solution": "public class Main {\n    enum State { CREATED, PAID, SHIPPED, DONE, CANCELED }\n\n    public static String next(String cur, String action) {\n        if (cur == null || action == null) return \"INVALID\";\n        State s;\n        try { s = State.valueOf(cur); }\n        catch (IllegalArgumentException e) { return \"INVALID\"; }\n        switch (s) {\n            case CREATED:\n                if (action.equals(\"pay\")) return \"PAID\";\n                if (action.equals(\"cancel\")) return \"CANCELED\";\n                return \"INVALID\";\n            case PAID:\n                if (action.equals(\"ship\")) return \"SHIPPED\";\n                if (action.equals(\"cancel\")) return \"CANCELED\";\n                return \"INVALID\";\n            case SHIPPED:\n                if (action.equals(\"finish\")) return \"DONE\";\n                return \"INVALID\";\n            default:\n                return \"INVALID\";\n        }\n    }\n}\n",
      "tests": [
        {
          "name": "样例支付",
          "args": [
            "CREATED",
            "pay"
          ],
          "expect": "PAID",
          "cmp": "exact"
        },
        {
          "name": "支付后发货",
          "args": [
            "PAID",
            "ship"
          ],
          "expect": "SHIPPED",
          "cmp": "exact"
        },
        {
          "name": "终态不可再转",
          "args": [
            "DONE",
            "pay"
          ],
          "expect": "INVALID",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "已取消不可支付",
          "args": [
            "CANCELED",
            "pay"
          ],
          "expect": "INVALID",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "未知状态",
          "args": [
            "UNKNOWN",
            "pay"
          ],
          "expect": "INVALID",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "未发货不能完成",
          "args": [
            "CREATED",
            "finish"
          ],
          "expect": "INVALID",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "发货后可取消",
          "args": [
            "SHIPPED",
            "cancel"
          ],
          "expect": "INVALID",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "终态(DONE/CANCELED)用 default 分支统一拒绝",
        "注意 SHIPPED 只允许 finish, 不允许 cancel"
      ]
    },
    {
      "id": "ch09-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "枚举序数映射与还原",
      "tags": [
        "枚举",
        "ordinal",
        "编解码"
      ],
      "q": "定义枚举 Color { RED, GREEN, BLUE, WHITE, BLACK }。实现两个静态方法:encode(int[] ords) 把一组序数(0..4)编码为紧凑字符串, 规则是把每个序数当作 3 位二进制位拼成一个整数再转十进制字符串(第 i 个序数占第 3*i 位开始的 3 位);序数越界(小于 0 或大于 4)则该组整体无效返回 \"-1\"。decode(String s) 是逆操作:把十进制字符串还原成序数数组, s 非法(空、非数字、超过 10 位、单组超过 5 个元素、含越界序数)返回空数组。约束 ords 长度 ≤ 5。",
      "mode": "method",
      "entry": {
        "method": "solve",
        "params": [
          "int",
          "String"
        ],
        "ret": "String"
      },
      "starter": "public class Main {\n    enum Color { RED, GREEN, BLUE, WHITE, BLACK }\n\n    // op=0: 入参是序数串(逗号分隔), 返回编码结果\n    // op=1: 入参是十进制编码串, 返回序数数组的字符串形式\n    public static String solve(int op, String s) {\n        return op == 0 ? \"-1\" : \"[]\";\n    }\n}\n",
      "solution": "public class Main {\n    enum Color { RED, GREEN, BLUE, WHITE, BLACK }\n\n    public static String solve(int op, String s) {\n        if (op == 0) {\n            if (s == null || s.isEmpty()) return \"-1\";\n            String[] p = s.split(String.valueOf((char) 44));\n            if (p.length > 5) return \"-1\";\n            int code = 0;\n            for (int i = 0; i < p.length; i++) {\n                int v;\n                try { v = Integer.parseInt(p[i].trim()); }\n                catch (NumberFormatException e) { return \"-1\"; }\n                if (v < 0 || v >= Color.values().length) return \"-1\";\n                code |= v << (3 * i);\n            }\n            return String.valueOf(code);\n        }\n        if (s == null || s.isEmpty() || s.length() > 10) return \"[]\";\n        int code;\n        try { code = Integer.parseInt(s.trim()); }\n        catch (NumberFormatException e) { return \"[]\"; }\n        if (code < 0) return \"[]\";\n        StringBuilder sb = new StringBuilder(\"[\");\n        int n = 0;\n        while (code > 0) {\n            int v = code & 7;\n            if (v >= Color.values().length) return \"[]\";\n            if (n > 0) sb.append((char) 44);\n            sb.append(v);\n            code >>= 3;\n            n++;\n            if (n > 5) return \"[]\";\n        }\n        return sb.append(']').toString();\n    }\n}\n",
      "tests": [
        {
          "name": "编码单组",
          "args": [
            "0",
            "1"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "编码多组",
          "args": [
            "0",
            "1,2"
          ],
          "expect": "17",
          "cmp": "exact"
        },
        {
          "name": "解码零",
          "args": [
            "1",
            "0"
          ],
          "expect": "[]",
          "cmp": "exact"
        },
        {
          "name": "往返一致",
          "args": [
            "1",
            "17"
          ],
          "expect": "[1,2]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "序数越界",
          "args": [
            "0",
            "5"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "解码越界位",
          "args": [
            "1",
            "7"
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "解码非数字",
          "args": [
            "1",
            "abc"
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先数清楚：5 个枚举常量各需要几位二进制才能互相区分？一个 int 一共能装下几组？",
        "编码用 code |= v << (3*i), 解码用 code & 7 逐组取出",
        "序数 5..7 在 3 位里能表示, 但枚举只有 5 个常量, 必须判越界"
      ]
    },
    {
      "id": "ch09-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "静态工具: 格式化类对拍",
      "tags": [
        "static工具方法",
        "字符串格式化",
        "对拍"
      ],
      "q": "实现静态方法 solve(int[] a):把数组按 \"[i:v]\" 形式拼接成字符串, 元素之间用 \"|\" 分隔, 形如 \"[0:5]|[1:3]\"。空数组返回空串 \"\"。约束数组长度 ≤ 200, 元素 |a[i]| ≤ 1000000。本题使用随机对拍:你的实现会与朴素 StringBuilder 参考实现在大量随机用例上比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[]"
        ],
        "ret": "String"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static String solve(int[] a) {\n        // TODO: StringBuilder 拼接, 注意分隔符只在元素之间出现\n        return \"\";\n    }\n}\n",
      "solution": "public class Main {\n    public static String solve(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) {\n            if (i > 0) sb.append('|');\n            sb.append('[').append(i).append(':').append(a[i]).append(']');\n        }\n        return sb.toString();\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "5,3"
          ],
          "expect": "[0:5]|[1:3]",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "7"
          ],
          "expect": "[0:7]",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负数",
          "args": [
            "-1"
          ],
          "expect": "[0:-1]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260409,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(13); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(2001)-1000); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static String solve(int[] a){ String s=\"\"; for(int i=0;i<a.length;i++){ if(i>0) s+=(char)124; s+=\"[\"+i+\":\"+a[i]+\"]\"; } return s; } }"
      },
      "hints": [
        "先写出最直白的实现并跑公开样例，重点确认空输入与只有一个元素时的输出",
        "分隔符用 i > 0 判断, 避免开头或结尾多出竖线"
      ]
    },
    {
      "id": "ch09-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "位运算工具与朴素实现对拍",
      "tags": [
        "位运算",
        "位标志",
        "对拍"
      ],
      "q": "实现静态方法 solve(int op, int x, int y):op=0 返回 x 与 y 的按位与;op=1 返回 x 与 y 的按位或;op=2 返回 x 与 y 的按位异或;op=3 返回 x 中 1 的个数(32 位补码);op=4 返回 x 的最小值形式的位反转(即逐位取反的低 32 位结果);其他 op 返回 0。约束 x、y 为任意 int。本题随机对拍:与用循环逐位计算的参考实现比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int",
          "int",
          "int"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int solve(int op, int x, int y) {\n        // TODO: 用 & | ^ 与 Integer.bitCount / 循环移位实现\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int op, int x, int y) {\n        switch (op) {\n            case 0: return x & y;\n            case 1: return x | y;\n            case 2: return x ^ y;\n            case 3: {\n                int c = 0, v = x;\n                while (v != 0) { c += (v & 1); v >>>= 1; }\n                return c;\n            }\n            case 4: return ~x;\n            default: return 0;\n        }\n    }\n}\n",
      "tests": [
        {
          "name": "与",
          "args": [
            "0",
            "12",
            "10"
          ],
          "expect": "8",
          "cmp": "exact"
        },
        {
          "name": "或",
          "args": [
            "1",
            "12",
            "10"
          ],
          "expect": "14",
          "cmp": "exact"
        },
        {
          "name": "异或",
          "args": [
            "2",
            "12",
            "10"
          ],
          "expect": "6",
          "cmp": "exact"
        },
        {
          "name": "计数负数",
          "args": [
            "3",
            "-1",
            "0"
          ],
          "expect": "32",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "取反",
          "args": [
            "4",
            "0",
            "0"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "未知操作",
          "args": [
            "9",
            "1",
            "1"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260509,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ return new String[]{ String.valueOf(r.nextInt(7)), String.valueOf(r.nextInt()), String.valueOf(r.nextInt()) }; } }",
        "ref": "public class Ref { public static int solve(int op, int x, int y){ if(op==0){ int s=0; for(int i=0;i<32;i++){ int m=1<<i; if((x&m)!=0 && (y&m)!=0) s|=m; } return s; } if(op==1){ int s=0; for(int i=0;i<32;i++){ int m=1<<i; if((x&m)!=0 || (y&m)!=0) s|=m; } return s; } if(op==2){ int s=0; for(int i=0;i<32;i++){ int m=1<<i; if(((x&m)!=0) != ((y&m)!=0)) s|=m; } return s; } if(op==3){ int c=0; for(int i=0;i<32;i++) if((x & (1<<i))!=0) c++; return c; } if(op==4){ int s=0; for(int i=0;i<32;i++) if((x & (1<<i))==0) s|=1<<i; return s; } return 0; } }"
      },
      "hints": [
        "统计 1 的个数时必须用无符号右移 >>>, 否则负数会死循环",
        "取反 ~x 等价于逐位翻转 32 位"
      ]
    },
    {
      "id": "ch09-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "枚举序数映射一致性对拍",
      "tags": [
        "枚举",
        "ordinal",
        "对拍"
      ],
      "q": "定义枚举 Level { LOW, MID, HIGH, URGENT, CRITICAL }(共 5 个)。实现静态方法 solve(int n, int[] idx):给定 n 次查询, 每次查询返回该序数对应枚举常量的名称长度。序数越界(小于 0 或大于 4)返回 -1。返回 int[] 与 queries 一一对应。约束 n ≤ 200, 与 idx 长度一致且可为 0。本题随机对拍:与用字符串数组朴素映射的参考实现比对(两者必须完全一致)。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int",
          "int[]"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    enum Level { LOW, MID, HIGH, URGENT, CRITICAL }\n\n    public static int[] solve(int n, int[] idx) {\n        // TODO: 用 Level.values()[i].name().length(), 注意越界\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    enum Level { LOW, MID, HIGH, URGENT, CRITICAL }\n\n    public static int[] solve(int n, int[] idx) {\n        Level[] vs = Level.values();\n        int[] r = new int[n];\n        for (int i = 0; i < n; i++) {\n            int k = idx[i];\n            r[i] = (k < 0 || k >= vs.length) ? -1 : vs[k].name().length();\n        }\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3",
            "0,2,4"
          ],
          "expect": "[3,4,8]",
          "cmp": "exact"
        },
        {
          "name": "零次查询",
          "args": [
            "0",
            ""
          ],
          "expect": "[]",
          "cmp": "exact"
        },
        {
          "name": "越界",
          "args": [
            "2",
            "-1,5"
          ],
          "expect": "[-1,-1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全部常量",
          "args": [
            "5",
            "0,1,2,3,4"
          ],
          "expect": "[3,3,4,6,8]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260609,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(9); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(9)-2); } return new String[]{ String.valueOf(n), b.toString() }; } }",
        "ref": "public class Ref { public static int[] solve(int n, int[] idx){ String[] names={\"LOW\",\"MID\",\"HIGH\",\"URGENT\",\"CRITICAL\"}; int[] r=new int[n]; for(int i=0;i<n;i++){ int k=idx[i]; r[i]=(k<0||k>=names.length)?-1:names[k].length(); } return r; } }"
      },
      "hints": [
        "结果数组长度必须是 n, 不是 idx.length",
        "越界返回 -1 而不是抛 ArrayIndexOutOfBoundsException"
      ]
    },
    {
      "id": "ch09-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计: 枚举驱动的状态机",
      "tags": [
        "design",
        "枚举",
        "状态机"
      ],
      "q": "在同一文件中实现 class OrderMachine(不要改类名与 public class Main 占位)。状态用枚举 State { CREATED, PAID, SHIPPED, DONE, CANCELED } 表示, 对外一律用序数(int)交流。方法:OrderMachine() 构造, 初始状态 CREATED;apply(String action) 按规则迁移并返回迁移后的状态序数, 非法动作不改变状态并返回当前序数:CREATED + pay -> PAID, CREATED + cancel -> CANCELED, PAID + ship -> SHIPPED, PAID + cancel -> CANCELED, SHIPPED + finish -> DONE, 终态(DONE/CANCELED)拒绝一切动作;state() 返回当前状态序数。判题按操作序列调用。",
      "mode": "design",
      "entry": {
        "className": "OrderMachine"
      },
      "ops": [
        [
          "OrderMachine",
          []
        ],
        [
          "state",
          []
        ],
        [
          "apply",
          [
            "pay"
          ]
        ],
        [
          "apply",
          [
            "ship"
          ]
        ],
        [
          "state",
          []
        ],
        [
          "apply",
          [
            "finish"
          ]
        ],
        [
          "state",
          []
        ],
        [
          "apply",
          [
            "cancel"
          ]
        ],
        [
          "state",
          []
        ]
      ],
      "expect": [
        "null",
        "0",
        "1",
        "2",
        "2",
        "3",
        "3",
        "3",
        "3"
      ],
      "cmp": "exact",
      "starter": "class OrderMachine {\n    // TODO: 用枚举保存状态, apply 里做合法迁移, 非法动作原样返回当前序数\n    public OrderMachine() { }\n    public int apply(String action) { return 0; }\n    public int state() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "class OrderMachine {\n    enum State { CREATED, PAID, SHIPPED, DONE, CANCELED }\n    private State cur = State.CREATED;\n\n    public OrderMachine() { }\n\n    public int apply(String action) {\n        if (action == null) return cur.ordinal();\n        switch (cur) {\n            case CREATED:\n                if (action.equals(\"pay\")) cur = State.PAID;\n                else if (action.equals(\"cancel\")) cur = State.CANCELED;\n                break;\n            case PAID:\n                if (action.equals(\"ship\")) cur = State.SHIPPED;\n                else if (action.equals(\"cancel\")) cur = State.CANCELED;\n                break;\n            case SHIPPED:\n                if (action.equals(\"finish\")) cur = State.DONE;\n                break;\n            default:\n                break;\n        }\n        return cur.ordinal();\n    }\n\n    public int state() { return cur.ordinal(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "apply 无论成功失败都返回当前状态序数, 这样终态上的任何动作都自然返回终态序数",
        "用 cur.ordinal() 把枚举映射成 int, 对外接口不暴露枚举类型"
      ]
    },
    {
      "id": "ch09-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计: 单例注册表",
      "tags": [
        "design",
        "单例",
        "注册表",
        "static"
      ],
      "q": "在同一文件中实现 class Registry, 全局共享一份注册表:任意实例读写到的都是同一份数据, getInstance() 返回的也必须是这个共享实例。注意判题通过反射构造对象, 所以构造器不能声明为 private(用包级私有或 public 均可)。方法:getInstance() 返回全局唯一实例(静态工厂);register(String name, int value) 注册或覆盖, 返回注册总数;get(String name) 命中返回值, 未注册返回 -1;size() 返回当前键数;unregister(String name) 删除并返回是否删除了(不存在返回 false);clear() 清空全部注册。name 为 null 视为空串键。判题按操作序列调用。",
      "mode": "design",
      "entry": {
        "className": "Registry"
      },
      "ops": [
        [
          "Registry",
          []
        ],
        [
          "register",
          [
            "a",
            1
          ]
        ],
        [
          "register",
          [
            "b",
            2
          ]
        ],
        [
          "get",
          [
            "a"
          ]
        ],
        [
          "size",
          []
        ],
        [
          "register",
          [
            "a",
            9
          ]
        ],
        [
          "get",
          [
            "a"
          ]
        ],
        [
          "size",
          []
        ],
        [
          "unregister",
          [
            "b"
          ]
        ],
        [
          "unregister",
          [
            "b"
          ]
        ],
        [
          "unregister",
          [
            "a"
          ]
        ],
        [
          "size",
          []
        ],
        [
          "clear",
          []
        ],
        [
          "size",
          []
        ],
        [
          "register",
          [
            "c",
            5
          ]
        ],
        [
          "get",
          [
            "c"
          ]
        ],
        [
          "size",
          []
        ]
      ],
      "expect": [
        "null",
        "1",
        "2",
        "1",
        "2",
        "2",
        "9",
        "2",
        "true",
        "false",
        "true",
        "0",
        "null",
        "0",
        "1",
        "5",
        "1"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass Registry {\n    // TODO: 静态 final 实例 + 静态 Map 存储(构造器不能是 private)\n    Registry() { }\n    public static Registry getInstance() { return null; }\n    public int register(String name, int value) { return 0; }\n    public int get(String name) { return -1; }\n    public int size() { return 0; }\n    public boolean unregister(String name) { return false; }\n    public void clear() { }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass Registry {\n    private static final Registry INSTANCE = new Registry();\n    private static final Map<String, Integer> MAP = new HashMap<>();\n\n    Registry() { }\n\n    public static Registry getInstance() { return INSTANCE; }\n\n    public int register(String name, int value) {\n        MAP.put(name == null ? \"\" : name, value);\n        return MAP.size();\n    }\n\n    public int get(String name) {\n        Integer v = MAP.get(name == null ? \"\" : name);\n        return v == null ? -1 : v;\n    }\n\n    public int size() { return MAP.size(); }\n\n    public boolean unregister(String name) { return MAP.remove(name == null ? \"\" : name) != null; }\n\n    public void clear() { MAP.clear(); }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "把 Map 也声明为 static, 任何实例访问的都是同一份数据",
        "register 覆盖已存在的键时 size 不变, 返回值是当下的键数而不是累计注册次数"
      ]
    },
    {
      "id": "ch09-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 权限位集合与操作序列判定",
      "tags": [
        "design",
        "位标志",
        "枚举",
        "权限模型"
      ],
      "q": "本章 Boss。在同一文件中实现 class PermSet, 用位标志管理一组权限。权限枚举 Perm { READ=0, WRITE=1, EXEC=2, ADMIN=3 }, 对应位值 1<<序数。方法:PermSet() 构造为空权限;grant(String name) 授予单个权限(名称非法返回 false 且不改变状态), 已拥有则返回 false;revoke(String name) 撤销单个权限(名称非法或本就没有返回 false);has(String name) 判断是否拥有(名称非法返回 false);grantAll(String names) 批量授予多个权限, names 是逗号分隔的名称串, 返回本次新授予成功的个数(忽略非法名称), 空串返回 0;mask() 返回当前位掩码;count() 返回已授予的权限个数;hasAll(String names) 判断是否同时拥有 names 中全部权限, 空串返回 true, 含非法名称返回 false。判题按操作序列调用。",
      "mode": "design",
      "entry": {
        "className": "PermSet"
      },
      "ops": [
        [
          "PermSet",
          []
        ],
        [
          "mask",
          []
        ],
        [
          "count",
          []
        ],
        [
          "grant",
          [
            "READ"
          ]
        ],
        [
          "grant",
          [
            "READ"
          ]
        ],
        [
          "grant",
          [
            "WRITE"
          ]
        ],
        [
          "mask",
          []
        ],
        [
          "has",
          [
            "READ"
          ]
        ],
        [
          "has",
          [
            "EXEC"
          ]
        ],
        [
          "grantAll",
          [
            "EXEC,ADMIN"
          ]
        ],
        [
          "count",
          []
        ],
        [
          "mask",
          []
        ],
        [
          "grantAll",
          [
            "EXEC,GHOST"
          ]
        ],
        [
          "revoke",
          [
            "READ"
          ]
        ],
        [
          "revoke",
          [
            "READ"
          ]
        ],
        [
          "hasAll",
          [
            "WRITE,EXEC"
          ]
        ],
        [
          "hasAll",
          [
            "WRITE,READ"
          ]
        ],
        [
          "hasAll",
          [
            ""
          ]
        ],
        [
          "grant",
          [
            "GHOST"
          ]
        ],
        [
          "count",
          []
        ]
      ],
      "expect": [
        "null",
        "0",
        "0",
        "true",
        "false",
        "true",
        "3",
        "true",
        "false",
        "2",
        "4",
        "15",
        "0",
        "true",
        "false",
        "true",
        "false",
        "true",
        "false",
        "3"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass PermSet {\n    // TODO: 用 int 掩码存权限, 枚举名 -> 位值; grant/revoke/has 都要处理非法名称\n    public PermSet() { }\n    public boolean grant(String name) { return false; }\n    public boolean revoke(String name) { return false; }\n    public boolean has(String name) { return false; }\n    public int grantAll(String names) { return 0; }\n    public int mask() { return 0; }\n    public int count() { return 0; }\n    public boolean hasAll(String names) { return false; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass PermSet {\n    enum Perm { READ, WRITE, EXEC, ADMIN }\n\n    private int mask = 0;\n\n    public PermSet() { }\n\n    private static int bitOf(String name) {\n        if (name == null) return -1;\n        for (Perm p : Perm.values()) if (p.name().equals(name)) return 1 << p.ordinal();\n        return -1;\n    }\n\n    public boolean grant(String name) {\n        int b = bitOf(name);\n        if (b < 0 || (mask & b) != 0) return false;\n        mask |= b;\n        return true;\n    }\n\n    public boolean revoke(String name) {\n        int b = bitOf(name);\n        if (b < 0 || (mask & b) == 0) return false;\n        mask &= ~b;\n        return true;\n    }\n\n    public boolean has(String name) {\n        int b = bitOf(name);\n        return b >= 0 && (mask & b) != 0;\n    }\n\n    public int grantAll(String names) {\n        if (names == null || names.isEmpty()) return 0;\n        int added = 0;\n        for (String part : names.split(String.valueOf((char) 44))) {\n            if (grant(part.trim())) added++;\n        }\n        return added;\n    }\n\n    public int mask() { return mask; }\n\n    public int count() {\n        int c = 0, m = mask;\n        while (m != 0) { c += (m & 1); m >>>= 1; }\n        return c;\n    }\n\n    public boolean hasAll(String names) {\n        if (names == null) return false;\n        if (names.isEmpty()) return true;\n        for (String part : names.split(String.valueOf((char) 44))) {\n            if (!has(part.trim())) return false;\n        }\n        return true;\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "非法名称统一返回 -1 的位值, 用 sentinel 短路, 避免到处 try/catch",
        "grantAll 借助 grant 自动忽略重复与非法名称, 累加的就是新增个数",
        "空串的 hasAll 按vacuous truth 返回 true"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "PermSet",
              []
            ],
            [
              "mask",
              []
            ],
            [
              "count",
              []
            ],
            [
              "grant",
              [
                "READ"
              ]
            ],
            [
              "grant",
              [
                "READ"
              ]
            ],
            [
              "grant",
              [
                "WRITE"
              ]
            ],
            [
              "mask",
              []
            ],
            [
              "has",
              [
                "READ"
              ]
            ],
            [
              "has",
              [
                "EXEC"
              ]
            ],
            [
              "grantAll",
              [
                "EXEC,ADMIN"
              ]
            ],
            [
              "count",
              []
            ],
            [
              "mask",
              []
            ],
            [
              "grantAll",
              [
                "EXEC,GHOST"
              ]
            ],
            [
              "revoke",
              [
                "READ"
              ]
            ],
            [
              "revoke",
              [
                "READ"
              ]
            ],
            [
              "hasAll",
              [
                "WRITE,EXEC"
              ]
            ],
            [
              "hasAll",
              [
                "WRITE,READ"
              ]
            ],
            [
              "hasAll",
              [
                ""
              ]
            ],
            [
              "grant",
              [
                "GHOST"
              ]
            ],
            [
              "count",
              []
            ]
          ],
          "expect": [
            "null",
            "0",
            "0",
            "true",
            "false",
            "true",
            "3",
            "true",
            "false",
            "2",
            "4",
            "15",
            "0",
            "true",
            "false",
            "true",
            "false",
            "true",
            "false",
            "3"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "PermSet"
            ],
            [
              "grantAll",
              [
                "READ,READ,WRITE"
              ]
            ],
            [
              "count"
            ],
            [
              "mask"
            ],
            [
              "hasAll",
              [
                ""
              ]
            ],
            [
              "hasAll",
              [
                "READ,GHOST"
              ]
            ],
            [
              "grantAll",
              [
                "ADMIN,EXEC"
              ]
            ],
            [
              "mask"
            ],
            [
              "revoke",
              [
                "WRITE"
              ]
            ],
            [
              "revoke",
              [
                "WRITE"
              ]
            ],
            [
              "hasAll",
              [
                "READ,EXEC,ADMIN"
              ]
            ],
            [
              "count"
            ],
            [
              "grant",
              [
                "read"
              ]
            ],
            [
              "count"
            ]
          ],
          "expect": [
            "null",
            "2",
            "2",
            "3",
            "true",
            "false",
            "2",
            "15",
            "true",
            "false",
            "true",
            "3",
            "false",
            "3"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
