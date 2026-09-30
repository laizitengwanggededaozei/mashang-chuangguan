window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 2,
  "title": "语法篇: 数据表示与运算符",
  "courseRef": "本机第2章-语法篇(字面量/变量/数据类型/标识符/键盘录入/算术运算符/类型转换/自增自减/赋值/关系/逻辑/三元运算符)",
  "levels": [
    {
      "id": "ch02-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "温度换算与隐式类型转换",
      "tags": [
        "字面量",
        "整数除法",
        "double转换",
        "四舍五入"
      ],
      "q": "实现 toFahrenheit(int celsius):把摄氏温度换算为华氏温度并保留一位小数返回。公式 F = C × 9 / 5 + 32。约束 -1000 ≤ celsius ≤ 1000。注意:celsius 是 int, 若直接用 9/5 会得到整数 1, 必须发生隐式或显式类型转换;结果保留一位小数(四舍五入), 例如 celsius=37 时 F=98.6, celsius=-40 时 F=-40.0。",
      "mode": "method",
      "entry": {
        "method": "toFahrenheit",
        "params": [
          "int"
        ],
        "ret": "double"
      },
      "starter": "public class Main {\n    public static double toFahrenheit(int celsius) {\n        // TODO: 注意整数除法陷阱, 把参与运算的数转成 double\n        return 0.0;\n    }\n}\n",
      "solution": "public class Main {\n    public static double toFahrenheit(int celsius) {\n        double f = celsius * 9.0 / 5.0 + 32;\n        return Math.round(f * 10) / 10.0;\n    }\n}\n",
      "tests": [
        {
          "name": "样例37",
          "args": [
            "37"
          ],
          "expect": "98.6",
          "cmp": "exact"
        },
        {
          "name": "冰点",
          "args": [
            "0"
          ],
          "expect": "32.0",
          "cmp": "exact"
        },
        {
          "name": "零下40",
          "args": [
            "-40"
          ],
          "expect": "-40.0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负温度",
          "args": [
            "-17"
          ],
          "expect": "1.4",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "celsius * 9 / 5 全是 int, 结果是整数; 写成 9.0 / 5.0 才会得到 double",
        "Math.round(x * 10) / 10.0 保留一位小数"
      ]
    },
    {
      "id": "ch02-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "字符与 ASCII 码的互转",
      "tags": [
        "char",
        "类型转换",
        "ASCII",
        "边界"
      ],
      "q": "实现 rotateChar(char c, int shift):把字符 c 向后循环移动 shift 位后返回新字符。c 只保证是 'a'..'z'(小写字母); shift 可为负数(表示向前移动)。循环规则:'z' 后一位回到 'a'。约束 -1000 ≤ shift ≤ 1000。例如 ('a',1)->'b'、('z',1)->'a'、('a',-1)->'z'。",
      "mode": "method",
      "entry": {
        "method": "rotateChar",
        "params": [
          "char",
          "int"
        ],
        "ret": "char"
      },
      "starter": "public class Main {\n    public static char rotateChar(char c, int shift) {\n        // TODO: 先把 shift 规约到 0..25, 再做字符偏移\n        return c;\n    }\n}\n",
      "solution": "public class Main {\n    public static char rotateChar(char c, int shift) {\n        int off = ((shift % 26) + 26) % 26;\n        return (char) ('a' + (c - 'a' + off) % 26);\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "a",
            "1"
          ],
          "expect": "'b'",
          "cmp": "exact"
        },
        {
          "name": "绕回",
          "args": [
            "z",
            "1"
          ],
          "expect": "'a'",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "a",
            "-1"
          ],
          "expect": "'z'",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "超大位移",
          "args": [
            "m",
            "2601"
          ],
          "expect": "'n'",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负超大",
          "args": [
            "b",
            "-27"
          ],
          "expect": "'a'",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "Java 里 % 对负数返回负余数, 要用 ((x % 26) + 26) % 26 修正",
        "char 参与算术会自动提升为 int, 结果要强制转回 (char)"
      ]
    },
    {
      "id": "ch02-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "自增自减的前后之别",
      "tags": [
        "自增自减",
        "求值顺序",
        "副作用",
        "序列模拟"
      ],
      "q": "模拟一段自增/自减运算序列并返回最终的变量值。实现 evaluate(int initValue, String ops):start 变量初值为 initValue; 依次执行 ops 中每个字符代表的语句: 'P' 表示 x++(后置自增), 'Q' 表示 ++x(前置自增), 'M' 表示 x--(后置自减), 'N' 表示 --x(前置自减)。每条语句都会改变 x, 且每一步的『表达式值』会累加进 sum(sum 初值 0):后置形式累加自增/自减之前的值, 前置形式累加之后的值。返回 int[]{最终x, sum}。约束 ops 长度 ≤ 1e5, 只含 PQMN, 可为空, |initValue| ≤ 1e6。",
      "mode": "method",
      "entry": {
        "method": "evaluate",
        "params": [
          "int",
          "String"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] evaluate(int initValue, String ops) {\n        // TODO: 逐字符处理, 注意前置取变化后的值, 后置取变化前的值\n        return new int[]{initValue, 0};\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] evaluate(int initValue, String ops) {\n        int x = initValue;\n        long sum = 0;\n        for (int i = 0; i < ops.length(); i++) {\n            char c = ops.charAt(i);\n            if (c == 'P') { sum += x; x++; }\n            else if (c == 'Q') { x++; sum += x; }\n            else if (c == 'M') { sum += x; x--; }\n            else if (c == 'N') { x--; sum += x; }\n        }\n        return new int[]{x, (int) sum};\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "5",
            "PQ"
          ],
          "expect": "[7,12]",
          "cmp": "exact"
        },
        {
          "name": "空序列",
          "args": [
            "0",
            ""
          ],
          "expect": "[0,0]",
          "cmp": "exact"
        },
        {
          "name": "自减",
          "args": [
            "3",
            "MN"
          ],
          "expect": "[1,4]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单前置",
          "args": [
            "-1",
            "Q"
          ],
          "expect": "[0,0]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "混合长串",
          "args": [
            "0",
            "PQMNPQ"
          ],
          "expect": "[2,6]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "x++ 的表达式值 = 自增前的 x; ++x 的表达式值 = 自增后的 x",
        "sum 用 long 累加更安全, 返回前转回 int"
      ]
    },
    {
      "id": "ch02-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "算术运算符与整除取模的符号",
      "tags": [
        "整数除法",
        "取模符号",
        "边界",
        "Math.floorMod"
      ],
      "q": "实现 splitMod(int a, int b):返回 int[]{a除以b的商, a对b取余}(均按 Java 整数语义)。要求满足恒等式 a == q * b + r, 且 |r| < |b|。约束 -1e9 ≤ a ≤ 1e9, b ≠ 0 且 |b| ≤ 1e9。注意 Java 整数除法向零截断, a % b 的符号跟随 a:例如 (-7,3) 得商 -2, 余 -1;而 (7,-3) 得商 -2, 余 1。另外必须处理 a = Integer.MIN_VALUE 与 b = -1 的情形。",
      "mode": "method",
      "entry": {
        "method": "splitMod",
        "params": [
          "int",
          "int"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] splitMod(int a, int b) {\n        // TODO: 直接用 / 和 % 即可, 但要考虑 MIN_VALUE / -1 的溢出\n        return new int[]{0, 0};\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] splitMod(int a, int b) {\n        if (a == Integer.MIN_VALUE && b == -1) return new int[]{Integer.MIN_VALUE, 0};\n        return new int[]{a / b, a % b};\n    }\n}\n",
      "tests": [
        {
          "name": "正正",
          "args": [
            "7",
            "3"
          ],
          "expect": "[2,1]",
          "cmp": "exact"
        },
        {
          "name": "负被除数",
          "args": [
            "-7",
            "3"
          ],
          "expect": "[-2,-1]",
          "cmp": "exact"
        },
        {
          "name": "负除数",
          "args": [
            "7",
            "-3"
          ],
          "expect": "[-2,1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "整倍数",
          "args": [
            "-9",
            "3"
          ],
          "expect": "[-3,0]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "溢出陷阱",
          "args": [
            "-2147483648",
            "-1"
          ],
          "expect": "[-2147483648,0]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "Java 的 % 结果符号与被除数一致, 不是数学上的非负余数",
        "Integer.MIN_VALUE / -1 会溢出回自身, 必须单独处理"
      ]
    },
    {
      "id": "ch02-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "短路求值与副作用:按位与逻辑的差别",
      "tags": [
        "运算符优先级",
        "短路求值",
        "位运算",
        "副作用"
      ],
      "q": "实现 bitBucket(int a, int b, String op):按 op 指定的运算对 a、b 求值并返回 int 结果, op 取值与语义如下 —— \"and\" 按位与 a & b; \"or\" 按位或 a | b; \"xor\" 按位异或 a ^ b; \"andand\" 逻辑与 (a != 0) && (b != 0), 返回 1 或 0; \"oror\" 逻辑或 (a != 0) || (b != 0), 返回 1 或 0; \"not\" 按位取反 ~a(忽略 b); \"shl\" a << (b & 31); \"shr\" a >> (b & 31)(算术右移, 保持符号); \"ushr\" a >>> (b & 31)(逻辑右移, 高位补 0); \"prio\" 验证优先级: 返回 (a | b) & ~a 的结果。 这些运算必须直接使用对应的 Java 运算符(不要自己写循环模拟), 判题会在极值(含负数与 int 边界)上对拍。 重点体会: 按位运算不做短路、位移量会自动对 32 取模、>>> 与 >> 在负数上结果完全不同。约束 a、b 为任意 int, op 必为上述之一。本题随机对拍: 与逐分支的参考实现比对。",
      "mode": "method",
      "entry": {
        "method": "bitBucket",
        "params": [
          "int",
          "int",
          "String"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int bitBucket(int a, int b, String op) {\n        // TODO: 用 Java 原生运算符实现每种 op; 注意位移量需 & 31\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int bitBucket(int a, int b, String op) {\n        switch (op) {\n            case \"and\":    return a & b;\n            case \"or\":     return a | b;\n            case \"xor\":    return a ^ b;\n            case \"andand\": return (a != 0) && (b != 0) ? 1 : 0;\n            case \"oror\":   return (a != 0) || (b != 0) ? 1 : 0;\n            case \"not\":    return ~a;\n            case \"shl\":    return a << (b & 31);\n            case \"shr\":    return a >> (b & 31);\n            case \"ushr\":   return a >>> (b & 31);\n            case \"prio\":   return (a | b) & ~a;\n            default:       return 0;\n        }\n    }\n}\n",
      "tests": [
        {
          "name": "按位与",
          "args": [
            "12",
            "10",
            "and"
          ],
          "expect": "8",
          "cmp": "exact"
        },
        {
          "name": "逻辑与返回 0/1",
          "args": [
            "5",
            "0",
            "andand"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "负数逻辑右移",
          "args": [
            "-1",
            "1",
            "ushr"
          ],
          "expect": "2147483647",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负数算术右移",
          "args": [
            "-1",
            "1",
            "shr"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "位移量取模 32",
          "args": [
            "1",
            "33",
            "shl"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "INT_MIN 取反",
          "args": [
            "-2147483648",
            "0",
            "not"
          ],
          "expect": "2147483647",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "优先级验证",
          "args": [
            "6",
            "3",
            "prio"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "位移量 Java 会自动 b & 31, 但把 & 31 显式写出来能避免负数位移的意外",
        ">> 是算术右移(负数补 1), >>> 是逻辑右移(高位补 0) —— 两者在负数上差别巨大",
        "按位运算(| & ^)不做短路, 两边都会求值; 逻辑运算(&& ||)才会短路"
      ],
      "limits": {
        "timeMs": 3000,
        "memMb": 256
      },
      "stress": {
        "iterations": 300,
        "seed": 20260205,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){\n  String[] ops = {\"and\",\"or\",\"xor\",\"andand\",\"oror\",\"not\",\"shl\",\"shr\",\"ushr\",\"prio\"};\n  int mode = r.nextInt(4);\n  int a, b;\n  if(mode == 0){ a = r.nextInt(); b = r.nextInt(); }\n  else if(mode == 1){ a = r.nextInt(64) - 32; b = r.nextInt(64) - 32; }\n  else if(mode == 2){ int[] sp = {0, -1, 1, Integer.MIN_VALUE, Integer.MAX_VALUE, 31, 32, 33, -31}; a = sp[r.nextInt(sp.length)]; b = sp[r.nextInt(sp.length)]; }\n  else { a = r.nextInt(256); b = r.nextInt(64); }\n  return new String[]{ String.valueOf(a), String.valueOf(b), ops[r.nextInt(ops.length)] }; } }",
        "ref": "public class Ref { public static int bitBucket(int a, int b, String op){\n  if(op.equals(\"and\")) return a & b;\n  if(op.equals(\"or\")) return a | b;\n  if(op.equals(\"xor\")) return a ^ b;\n  if(op.equals(\"andand\")) return (a != 0) && (b != 0) ? 1 : 0;\n  if(op.equals(\"oror\")) return (a != 0) || (b != 0) ? 1 : 0;\n  if(op.equals(\"not\")) return ~a;\n  if(op.equals(\"shl\")) return a << (b & 31);\n  if(op.equals(\"shr\")) return a >> (b & 31);\n  if(op.equals(\"ushr\")) return a >>> (b & 31);\n  if(op.equals(\"prio\")) return (a | b) & ~a;\n  return 0; } }"
      }
    },
    {
      "id": "ch02-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "三元运算符与分段函数求值",
      "tags": [
        "三元运算符",
        "分段函数",
        "嵌套三目",
        "整数运算"
      ],
      "q": "实现 piecewise(int x):按下列分段函数返回 y 的值。当 x < -10 时 y = 3 * x + 5; 当 -10 ≤ x < 0 时 y = x * x; 当 0 ≤ x < 100 时 y = x / 10(整数除法); 当 x ≥ 100 时 y = 100 - x。约束 -1e6 ≤ x ≤ 1e6。要求返回值与实际数学结果一致, 注意每段都只使用整数运算。",
      "mode": "method",
      "entry": {
        "method": "piecewise",
        "params": [
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int piecewise(int x) {\n        // TODO: 用嵌套三元运算符实现四段函数\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int piecewise(int x) {\n        return x < -10 ? 3 * x + 5\n             : x < 0 ? x * x\n             : x < 100 ? x / 10\n             : 100 - x;\n    }\n}\n",
      "tests": [
        {
          "name": "第一段",
          "args": [
            "-20"
          ],
          "expect": "-55",
          "cmp": "exact"
        },
        {
          "name": "第二段",
          "args": [
            "-10"
          ],
          "expect": "100",
          "cmp": "exact"
        },
        {
          "name": "第三段",
          "args": [
            "55"
          ],
          "expect": "5",
          "cmp": "exact"
        },
        {
          "name": "第四段边界",
          "args": [
            "100"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
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
          "name": "极大",
          "args": [
            "1000000"
          ],
          "expect": "-999900",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "三个嵌套三目要按 x 从小到大判断, 边界值 -10、0、100 归属于后一段",
        "x=0 走第三段 x/10 得 0, 与第四段结果巧合相同, 但逻辑上不能混淆"
      ]
    },
    {
      "id": "ch02-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "位运算模拟整数集合",
      "tags": [
        "位运算",
        "位图",
        "位掩码",
        "集合"
      ],
      "q": "用 32 位整数的每一位表示 0..31 是否存在, 实现三个方法:addElement(int mask, int v) 把第 v 位置 1; removeElement(int mask, int v) 把第 v 位清 0; contains(int mask, int v) 判断第 v 位是否为 1。三个方法都写在 Main 中, 判题只调用其中被 entry 指定的一个(本题为 addElement)。约束 0 ≤ v ≤ 31, mask 为任意 int(含负数)。例如 mask=0, v=3 得 8。",
      "mode": "method",
      "entry": {
        "method": "addElement",
        "params": [
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int addElement(int mask, int v) {\n        // TODO: 用 1 << v 生成位掩码, 按位或置位\n        return mask;\n    }\n    public static int removeElement(int mask, int v) { return mask; }\n    public static boolean contains(int mask, int v) { return false; }\n}\n",
      "solution": "public class Main {\n    public static int addElement(int mask, int v) {\n        return mask | (1 << v);\n    }\n    public static int removeElement(int mask, int v) {\n        return mask & ~(1 << v);\n    }\n    public static boolean contains(int mask, int v) {\n        return (mask & (1 << v)) != 0;\n    }\n}\n",
      "tests": [
        {
          "name": "置位",
          "args": [
            "0",
            "3"
          ],
          "expect": "8",
          "cmp": "exact"
        },
        {
          "name": "已存在",
          "args": [
            "8",
            "3"
          ],
          "expect": "8",
          "cmp": "exact"
        },
        {
          "name": "最高位",
          "args": [
            "0",
            "31"
          ],
          "expect": "-2147483648",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "最低位",
          "args": [
            "0",
            "0"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "保留原有位",
          "args": [
            "-1",
            "5"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "1 << 31 会变成负数(Integer.MIN_VALUE), 这是正常现象",
        "置位用 |, 清位用 & ~mask, 判位用 & 后与 0 比较"
      ]
    },
    {
      "id": "ch02-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "整数反转与溢出处理",
      "tags": [
        "溢出",
        "long中转",
        "取模",
        "边界"
      ],
      "q": "实现 reverseNumber(int n):反转十进制数字返回反转后的整数。若反转结果超出 int 表示范围, 返回 0。约束 n 为任意 int, 包括 Integer.MIN_VALUE。例如 123 得 321, -1200 得 -21, 1534236469 反转后溢出得 0。",
      "mode": "method",
      "entry": {
        "method": "reverseNumber",
        "params": [
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int reverseNumber(int n) {\n        // TODO: 用 long 累加, 每步检查是否越界\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int reverseNumber(int n) {\n        long r = 0;\n        while (n != 0) {\n            r = r * 10 + n % 10;\n            if (r > Integer.MAX_VALUE || r < Integer.MIN_VALUE) return 0;\n            n /= 10;\n        }\n        return (int) r;\n    }\n}\n",
      "tests": [
        {
          "name": "正数",
          "args": [
            "123"
          ],
          "expect": "321",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "-1200"
          ],
          "expect": "-21",
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
          "name": "正溢出",
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
        "n % 10 对负数返回负余数, 天然保留符号, 不用单独判符号",
        "溢出判断必须放在乘以 10 之后立即执行"
      ]
    },
    {
      "id": "ch02-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "逻辑表达式与运算符优先级还原",
      "tags": [
        "运算符优先级",
        "逻辑短路",
        "表达式求值",
        "递归下降"
      ],
      "q": "实现 evalBool(String expr):对只含 'T'(真)、'F'(假)、'&'(与)、'|'(或)、'!'(非)、'(' ')' 的表达式求值, 返回 boolean。优先级: ! 高于 & 高于 |, 括号最高。! 为前缀单目运算符, 可连续出现(如 !!T 为 true)。约束 expr 长度 ≤ 200, 保证表达式合法, 使用全角符号之外的纯 ASCII。例如 'T|F&T' 为 true, '!F&F' 为 false。",
      "mode": "method",
      "entry": {
        "method": "evalBool",
        "params": [
          "String"
        ],
        "ret": "boolean"
      },
      "starter": "public class Main {\n    public static boolean evalBool(String expr) {\n        // TODO: 可先转成显式真值+运算符序列, 再按优先级或递归下降求值\n        return false;\n    }\n}\n",
      "solution": "public class Main {\n    private static String s; private static int p;\n    public static boolean evalBool(String expr) { s = expr; p = 0; return parseOr(); }\n    private static boolean parseOr() {\n        boolean v = parseAnd();\n        while (p < s.length() && s.charAt(p) == '|') { p++; boolean r = parseAnd(); v = v || r; }\n        return v;\n    }\n    private static boolean parseAnd() {\n        boolean v = parseUnary();\n        while (p < s.length() && s.charAt(p) == '&') { p++; boolean r = parseUnary(); v = v && r; }\n        return v;\n    }\n    private static boolean parseUnary() {\n        int cnt = 0;\n        while (p < s.length() && s.charAt(p) == '!') { cnt++; p++; }\n        boolean v = parseAtom();\n        return cnt % 2 == 0 ? v : !v;\n    }\n    private static boolean parseAtom() {\n        char c = s.charAt(p);\n        if (c == '(') { p++; boolean v = parseOr(); p++; return v; }\n        p++;\n        return c == 'T';\n    }\n}\n",
      "tests": [
        {
          "name": "优先级",
          "args": [
            "T|F&T"
          ],
          "expect": "true",
          "cmp": "exact"
        },
        {
          "name": "非前缀",
          "args": [
            "!F&F"
          ],
          "expect": "false",
          "cmp": "exact"
        },
        {
          "name": "括号改变结合",
          "args": [
            "(T|F)&F"
          ],
          "expect": "false",
          "cmp": "exact"
        },
        {
          "name": "双非",
          "args": [
            "!!T"
          ],
          "expect": "true",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "深层嵌套",
          "args": [
            "!((F|T)&!(F&T))"
          ],
          "expect": "false",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "纯原子",
          "args": [
            "F"
          ],
          "expect": "false",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "! 是前缀且可叠加, 用计数奇偶决定是否取反",
        "递归下降: parseOr -> parseAnd -> parseUnary -> parseAtom"
      ]
    },
    {
      "id": "ch02-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "快速幂取模",
      "tags": [
        "快速幂",
        "位运算",
        "long溢出",
        "O(log n)"
      ],
      "q": "实现 solve(long base, long exp, long mod):计算 base^exp mod mod。要求 O(log exp), 不得使用 Math.pow。约束 0 ≤ exp ≤ 1e18, mod ≥ 1, |base| ≤ 1e18。注意 base 可能为负, 中间乘法必须用 long 且先规约到 [0, mod) 再相乘(在 mod ≤ 1e9 的前提下不会溢出)。本题使用随机对拍, 会与逐次相乘的参考实现比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "long",
          "long",
          "long"
        ],
        "ret": "long"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long solve(long base, long exp, long mod) {\n        // TODO: 二进制快速幂, exp 每次右移一位\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long solve(long base, long exp, long mod) {\n        long b = base % mod;\n        if (b < 0) b += mod;\n        long r = 1 % mod;\n        while (exp > 0) {\n            if ((exp & 1L) == 1L) r = r * b % mod;\n            b = b * b % mod;\n            exp >>= 1;\n        }\n        return r;\n    }\n}\n",
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
          "name": "模为1",
          "args": [
            "123",
            "456",
            "1"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
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
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260401,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ long mod=1+r.nextInt(1000000000); long e=(long)r.nextInt(2000); long b=(long)(r.nextInt(2000000001)-1000000000); return new String[]{ String.valueOf(b), String.valueOf(e), String.valueOf(mod) }; } }",
        "ref": "public class Ref { public static long solve(long base, long exp, long mod){ long b=base%mod; if(b<0) b+=mod; long r=1%mod; for(long i=0;i<exp;i++) r=r*b%mod; return r; } }"
      },
      "hints": [
        "先用 base % mod 并修正负数, 保证底数落在 [0, mod)",
        "1 % mod 才能正确处理 mod=1 的情况"
      ]
    },
    {
      "id": "ch02-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "统计 [0,n] 所有整数的二进制 1 总数",
      "tags": [
        "位运算",
        "数位计数",
        "O(log n)",
        "溢出边界"
      ],
      "q": "实现 solve(int n):统计 0, 1, 2, ..., n 这 n+1 个整数的二进制表示里 1 的总个数, 返回这个总数。约束 0 ≤ n ≤ 1e9。注意: 结果可能达到约 1.5e10, 必须用 long 累加; 逐个数字数 1 是 O(n log n), 在 n=1e9 时会超时, 请用\"按位计数\"的思路: 第 b 位上 1 的出现次数由完整周期数与余数共同决定, 对每个位 O(1) 计算, 整体 O(log n)。本题随机对拍: 你的实现会与逐个 bitCount 的参考实现在大量随机用例上比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int"
        ],
        "ret": "long"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long solve(int n) {\n        // TODO: 按位计数, 每个位 O(1), 整体 O(log n)\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long solve(int n) {\n        long N = (long) n + 1;\n        long total = 0;\n        for (int b = 0; (1L << b) <= n; b++) {\n            long half = 1L << b;\n            long cycle = half << 1;\n            total += (N / cycle) * half;\n            long rem = N % cycle;\n            if (rem > half) total += rem - half;\n        }\n        return total;\n    }\n}\n",
      "tests": [
        {
          "name": "零",
          "args": [
            "0"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "小规模 n=5",
          "args": [
            "5"
          ],
          "expect": "7",
          "cmp": "exact"
        },
        {
          "name": "中等 n=12345",
          "args": [
            "12345"
          ],
          "expect": "82199",
          "cmp": "exact"
        },
        {
          "name": "上界 n=1e9 (O(log n) 才不超时)",
          "args": [
            "1000000000"
          ],
          "expect": "14846928141",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "2 的幂减一 n=1048575",
          "args": [
            "1048575"
          ],
          "expect": "10485760",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "2 的幂 n=1048576",
          "args": [
            "1048576"
          ],
          "expect": "10485761",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20260202,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){\n  int mode = r.nextInt(4);\n  int n;\n  if(mode == 0) n = r.nextInt(3);\n  else if(mode == 1) n = r.nextInt(1000);\n  else if(mode == 2) n = r.nextInt(200000);\n  else n = 1000000000 - r.nextInt(1000);\n  if(mode != 3) return new String[]{ String.valueOf(n) };\n  // 大规模输入参考实现会很慢, 只保留中等规模做对拍\n  return new String[]{ String.valueOf(r.nextInt(200000)) };\n} }",
        "ref": "public class Ref { public static long solve(int n){\n  long total = 0;\n  for(int i = 0; i <= n; i++) total += Integer.bitCount(i);\n  return total;\n} }"
      },
      "hints": [
        "把每一位分开算: 第 b 位(权值 2^b)在 0..n 中出现的次数有周期性, 周期长 2^(b+1), 每周期出现 2^b 次",
        "余数部分: 若 (n+1) % 2^(b+1) > 2^b, 还要加上超出的那一截",
        "结果要用 long: n=1e9 时总数约 1.5e10, 超出 int"
      ]
    },
    {
      "id": "ch02-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "位运算实现无溢出整数加法",
      "tags": [
        "位运算",
        "异或进位",
        "溢出",
        "状态机"
      ],
      "q": "实现 solve(int a, int b):不使用 + 和 - 运算符, 通过位运算返回 a + b 的结果(允许 int 自然溢出回绕)。允许使用 << >> 和逻辑运算。本题随机对拍:会与直接相加的参考实现在大量随机输入(含极值)上比对。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int",
          "int"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int solve(int a, int b) {\n        // TODO: 循环: 无进位和 = a^b, 进位 = (a&b)<<1, 直到进位为 0\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int a, int b) {\n        while (b != 0) {\n            int carry = (a & b) << 1;\n            a = a ^ b;\n            b = carry;\n        }\n        return a;\n    }\n}\n",
      "tests": [
        {
          "name": "正加正",
          "args": [
            "3",
            "5"
          ],
          "expect": "8",
          "cmp": "exact"
        },
        {
          "name": "一正一负",
          "args": [
            "-7",
            "3"
          ],
          "expect": "-4",
          "cmp": "exact"
        },
        {
          "name": "零",
          "args": [
            "0",
            "0"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "回绕",
          "args": [
            "2147483647",
            "1"
          ],
          "expect": "-2147483648",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "互为相反数",
          "args": [
            "12345",
            "-12345"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 400,
        "seed": 20260403,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){\n  int mode = r.nextInt(5);\n  int a, b;\n  if(mode == 0){ a = r.nextInt(); b = r.nextInt(); }                       // 全域\n  else if(mode == 1){ a = r.nextInt(200) - 100; b = r.nextInt(200) - 100; } // 小值\n  else if(mode == 2){ int[] sp = {0, -1, 1, Integer.MIN_VALUE, Integer.MAX_VALUE}; a = sp[r.nextInt(sp.length)]; b = sp[r.nextInt(sp.length)]; } // 极值\n  else if(mode == 3){ a = r.nextInt(2) == 0 ? Integer.MAX_VALUE : Integer.MIN_VALUE; b = r.nextInt(3) - 1; } // 边界加小量\n  else { a = r.nextInt(); b = -a; }                                        // 相加得 0(进位链最长)\n  return new String[]{ String.valueOf(a), String.valueOf(b) }; } }",
        "ref": "public class Ref { public static int solve(int a, int b){ return a+b; } }"
      },
      "hints": [
        "先想清楚：二进制加法可以拆成\"不考虑进位的和\"与\"进位\"两部分，分别由哪两个位运算得到？",
        "a^b 是不进位和, (a&b)<<1 是进位, 反复迭代直到进位为 0",
        "int 的 << 自动丢弃高位, 天然实现 32 位回绕, 与参考实现一致"
      ]
    },
    {
      "id": "ch02-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计位图集合 BitSet32",
      "tags": [
        "设计",
        "位图",
        "位运算",
        "O(1)"
      ],
      "q": "在同一文件中实现 class BitSet32(不要改类名, 保留 public class Main 占位):构造 BitSet32(int n) 创建可容纳 [0, n) 的无符号整数集合; add(int v)、remove(int v)、contains(int v) 要求 O(1);count() 返回当前元素个数;toString() 返回按升序排列、以逗号分隔的元素(空集合返回空串)。约束 0 ≤ v < n ≤ 1024。判题按操作序列调用, 无返回值的方法期望 null。",
      "mode": "design",
      "entry": {
        "className": "BitSet32"
      },
      "ops": [
        [
          "BitSet32",
          [
            64
          ]
        ],
        [
          "add",
          [
            3
          ]
        ],
        [
          "add",
          [
            3
          ]
        ],
        [
          "add",
          [
            40
          ]
        ],
        [
          "contains",
          [
            3
          ]
        ],
        [
          "contains",
          [
            40
          ]
        ],
        [
          "contains",
          [
            7
          ]
        ],
        [
          "count",
          []
        ],
        [
          "remove",
          [
            3
          ]
        ],
        [
          "contains",
          [
            3
          ]
        ],
        [
          "count",
          []
        ],
        [
          "toString",
          []
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "null",
        "true",
        "true",
        "false",
        "2",
        "null",
        "false",
        "1",
        "\"40\""
      ],
      "cmp": "exact",
      "starter": "class BitSet32 {\n    // TODO: 用 long[] 存位, add/remove/contains 用位运算 O(1), 并维护 size\n    public BitSet32(int n) { }\n    public void add(int v) { }\n    public void remove(int v) { }\n    public boolean contains(int v) { return false; }\n    public int count() { return 0; }\n    public String toString() { return \"\"; }\n}\n\npublic class Main { }\n",
      "solution": "class BitSet32 {\n    private final long[] bits;\n    private int size = 0;\n    public BitSet32(int n) { bits = new long[(n + 63) >>> 6]; }\n    public void add(int v) {\n        int w = v >>> 6, b = v & 63;\n        if ((bits[w] & (1L << b)) == 0) { bits[w] |= (1L << b); size++; }\n    }\n    public void remove(int v) {\n        int w = v >>> 6, b = v & 63;\n        if ((bits[w] & (1L << b)) != 0) { bits[w] &= ~(1L << b); size--; }\n    }\n    public boolean contains(int v) { return (bits[v >>> 6] & (1L << (v & 63))) != 0; }\n    public int count() { return size; }\n    public String toString() {\n        StringBuilder sb = new StringBuilder();\n        for (int w = 0; w < bits.length; w++) {\n            long x = bits[w];\n            while (x != 0) {\n                int b = Long.numberOfTrailingZeros(x);\n                if (sb.length() > 0) sb.append(',');\n                sb.append(w * 64 + b);\n                x &= (x - 1);\n            }\n        }\n        return sb.toString();\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "先选容器：一个 long 有 64 位，正好当 64 个布尔位用，比 boolean[] 省很多空间",
        "第 v 位落在 long 数组下标 v>>>6 的第 v&63 位上",
        "add 时要先判断该位是否已存在, 否则 size 会重复累加",
        "toString 按下标升序扫描即天然有序"
      ]
    },
    {
      "id": "ch02-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计表达式计算器(变量与类型转换)",
      "tags": [
        "设计",
        "状态机",
        "类型转换",
        "栈"
      ],
      "q": "在同一文件中实现 class SmallCalc(保留 public class Main 占位):set(String name, int value) 声明/覆盖一个整型变量;eval(String expr) 计算只含变量名、非负整数字面量、+ - * / 四则运算与圆括号的表达式, 返回 int(整数除法向零截断)。表达式保证合法, 变量名保证已声明。运算法则与 Java 完全一致(优先级、左结合、括号)。判题按操作序列调用, set 无返回值期望 null。",
      "mode": "design",
      "entry": {
        "className": "SmallCalc"
      },
      "ops": [
        [
          "SmallCalc",
          []
        ],
        [
          "set",
          [
            "a",
            10
          ]
        ],
        [
          "set",
          [
            "b",
            3
          ]
        ],
        [
          "eval",
          [
            "a+b"
          ]
        ],
        [
          "eval",
          [
            "a*b-b"
          ]
        ],
        [
          "eval",
          [
            "(a+b)*2"
          ]
        ],
        [
          "eval",
          [
            "a/b"
          ]
        ],
        [
          "eval",
          [
            "100-2*3"
          ]
        ],
        [
          "set",
          [
            "a",
            -7
          ]
        ],
        [
          "eval",
          [
            "a/b"
          ]
        ],
        [
          "eval",
          [
            "a+a"
          ]
        ],
        [
          "eval",
          [
            "((a))"
          ]
        ],
        [
          "eval",
          [
            "2*(3+4)*(5-1)"
          ]
        ]
      ],
      "expect": [
        "null",
        "null",
        "null",
        "13",
        "27",
        "26",
        "3",
        "94",
        "null",
        "-2",
        "-14",
        "-7",
        "56"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass SmallCalc {\n    // TODO: 用 map 存变量, 递归下降或双栈解析表达式\n    private final Map<String, Integer> vars = new HashMap<>();\n    public void set(String name, int value) { }\n    public int eval(String expr) { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass SmallCalc {\n    private final Map<String, Integer> vars = new HashMap<>();\n    private String s;\n    private int p;\n    public void set(String name, int value) { vars.put(name, value); }\n    public int eval(String expr) { s = expr; p = 0; return parseExpr(); }\n    private int parseExpr() {\n        int v = parseTerm();\n        while (p < s.length() && (s.charAt(p) == '+' || s.charAt(p) == '-')) {\n            char op = s.charAt(p++);\n            int r = parseTerm();\n            v = op == '+' ? v + r : v - r;\n        }\n        return v;\n    }\n    private int parseTerm() {\n        int v = parseFactor();\n        while (p < s.length() && (s.charAt(p) == '*' || s.charAt(p) == '/')) {\n            char op = s.charAt(p++);\n            int r = parseFactor();\n            v = op == '*' ? v * r : v / r;\n        }\n        return v;\n    }\n    private int parseFactor() {\n        char c = s.charAt(p);\n        if (c == '(') { p++; int v = parseExpr(); p++; return v; }\n        if (c >= '0' && c <= '9') {\n            int v = 0;\n            while (p < s.length() && Character.isDigit(s.charAt(p))) v = v * 10 + (s.charAt(p++) - '0');\n            return v;\n        }\n        int st = p;\n        while (p < s.length() && Character.isLetter(s.charAt(p))) p++;\n        Integer v = vars.get(s.substring(st, p));\n        return v == null ? 0 : v;\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "递归下降三层: 表达式(+ -) -> 项(* /) -> 因子(数字/变量/括号)",
        "eval 每次都要把游标 p 重置为 0",
        "Java 整数除法向零截断, -7/3 得 -2"
      ]
    },
    {
      "id": "ch02-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计溢出安全的定长整数累加器",
      "tags": [
        "设计",
        "溢出饱和",
        "状态机",
        "位运算",
        "边界"
      ],
      "q": "在同一文件中实现 class SafeInt(保留 public class Main 占位), 模拟 Java int 变量在自增/自减/赋值时的溢出回绕行为, 并额外提供饱和统计。构造 SafeInt(int initial) 设定初值。方法:inc() 让 value 加 1(int 回绕);dec() 让 value 减 1(int 回绕);add(int delta) 让 value 加上 delta(int 回绕);assign(int v) 直接赋值;get() 返回当前 value。此外每次数值变化时都按 Java 语义记录是否发生溢出回绕:overflowCount() 返回至今发生回绕的次数(判断依据是数学结果超出 int 范围;inc/dec/add/assign 都计入, 但 assign 永远不溢出)。判题按操作序列调用, 无返回值的方法期望 null。",
      "mode": "design",
      "entry": {
        "className": "SafeInt"
      },
      "ops": [
        [
          "SafeInt",
          [
            2147483647
          ]
        ],
        [
          "get",
          []
        ],
        [
          "inc",
          []
        ],
        [
          "get",
          []
        ],
        [
          "overflowCount",
          []
        ],
        [
          "dec",
          []
        ],
        [
          "get",
          []
        ],
        [
          "overflowCount",
          []
        ],
        [
          "add",
          [
            10
          ]
        ],
        [
          "get",
          []
        ],
        [
          "overflowCount",
          []
        ],
        [
          "assign",
          [
            5
          ]
        ],
        [
          "get",
          []
        ],
        [
          "overflowCount",
          []
        ],
        [
          "dec",
          []
        ],
        [
          "dec",
          []
        ],
        [
          "dec",
          []
        ],
        [
          "dec",
          []
        ],
        [
          "dec",
          []
        ],
        [
          "dec",
          []
        ],
        [
          "get",
          []
        ],
        [
          "overflowCount",
          []
        ]
      ],
      "expect": [
        "null",
        "2147483647",
        "null",
        "-2147483648",
        "1",
        "null",
        "2147483647",
        "2",
        "null",
        "-2147483639",
        "3",
        "null",
        "5",
        "3",
        "null",
        "null",
        "null",
        "null",
        "null",
        "null",
        "-1",
        "3"
      ],
      "cmp": "exact",
      "starter": "class SafeInt {\n    // TODO: 用 long 保存数学结果再转回 int, 比较两者是否不同以判断回绕\n    public SafeInt(int initial) { }\n    public void inc() { }\n    public void dec() { }\n    public void add(int delta) { }\n    public void assign(int v) { }\n    public int get() { return 0; }\n    public int overflowCount() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "class SafeInt {\n    private int value;\n    private int overflows = 0;\n    public SafeInt(int initial) { value = initial; }\n    private void set(long math) {\n        int nv = (int) math;\n        if (nv != math) overflows++;\n        value = nv;\n    }\n    public void inc() { set((long) value + 1); }\n    public void dec() { set((long) value - 1); }\n    public void add(int delta) { set((long) value + delta); }\n    public void assign(int v) { value = v; }\n    public int get() { return value; }\n    public int overflowCount() { return overflows; }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "把运算放到 long 里做, 再强转回 int;若两者不相等说明发生了回绕",
        "assign 是直接赋值, 不存在数学溢出, 不计数",
        "dec 越过 Integer.MIN_VALUE 时同样算一次回绕"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "SafeInt",
              [
                2147483647
              ]
            ],
            [
              "get",
              []
            ],
            [
              "inc",
              []
            ],
            [
              "get",
              []
            ],
            [
              "overflowCount",
              []
            ],
            [
              "dec",
              []
            ],
            [
              "get",
              []
            ],
            [
              "overflowCount",
              []
            ],
            [
              "add",
              [
                10
              ]
            ],
            [
              "get",
              []
            ],
            [
              "overflowCount",
              []
            ],
            [
              "assign",
              [
                5
              ]
            ],
            [
              "get",
              []
            ],
            [
              "overflowCount",
              []
            ],
            [
              "dec",
              []
            ],
            [
              "dec",
              []
            ],
            [
              "dec",
              []
            ],
            [
              "dec",
              []
            ],
            [
              "dec",
              []
            ],
            [
              "dec",
              []
            ],
            [
              "get",
              []
            ],
            [
              "overflowCount",
              []
            ]
          ],
          "expect": [
            "null",
            "2147483647",
            "null",
            "-2147483648",
            "1",
            "null",
            "2147483647",
            "2",
            "null",
            "-2147483639",
            "3",
            "null",
            "5",
            "3",
            "null",
            "null",
            "null",
            "null",
            "null",
            "null",
            "-1",
            "3"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "SafeInt",
              [
                -2147483648
              ]
            ],
            [
              "get"
            ],
            [
              "dec"
            ],
            [
              "get"
            ],
            [
              "overflowCount"
            ],
            [
              "inc"
            ],
            [
              "overflowCount"
            ],
            [
              "add",
              [
                -1
              ]
            ],
            [
              "get"
            ],
            [
              "overflowCount"
            ],
            [
              "assign",
              [
                -5
              ]
            ],
            [
              "overflowCount"
            ],
            [
              "dec"
            ],
            [
              "get"
            ]
          ],
          "expect": [
            "null",
            "-2147483648",
            "null",
            "2147483647",
            "1",
            "null",
            "2",
            "null",
            "2147483647",
            "3",
            "null",
            "3",
            "null",
            "-6"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
