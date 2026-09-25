window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 6,
  "title": "原理篇: 内存、引用与传递",
  "courseRef": "本机课程第6章-原理篇 (Java运行机制/内存和内存地址/变量和方法的内存分配/数组的内存分配/数组在方法中传递)",
  "levels": [
    {
      "id": "ch06-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "值传递: 形参重新赋值不改实参",
      "tags": [
        "值传递",
        "方法调用",
        "数组内存",
        "引用变量"
      ],
      "q": "本题考察 Java 的传参语义(值传递)。实现 rebind(int[] a, int k):(1) 先把形参变量 p 重新指向一个全新的数组, 内容是调用者数组 a 的每个元素乘 k —— 这一步不得改动 a; (2) 再把形参变量 p 重新指向另一个新数组, 内容是\"重新读取后的 a\"的每个元素乘 k —— 同样不得改动 a; (3) 最后把 p 的首元素写入 a 的首元素(即 a[0] 最终变成 k*a[0]); (4) 返回\"重新读取后的 a\"的首元素, 也就是本方法最终写进 a[0] 的那个值。返回值可以证明形参重新赋值不影响实参: 若第一步或第二步意外改写了 a, 返回值就会偏离 k 乘以原始首元素。约束 0 ≤ n ≤ 1000, |a[i]| ≤ 1000, 1 ≤ k ≤ 10, 保证 k*a[0] 不溢出 int。空数组时不做任何写入, 返回 -1。",
      "mode": "method",
      "entry": {
        "method": "rebind",
        "params": [
          "int[]",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int rebind(int[] a, int k) {\n        // TODO: 形参 p 重新赋值不影响 a; 只有最后一步才写 a[0]\n        int[] p = a;\n        p = copyScaled(a, k);\n        p = copyScaled(a, k);\n        return 0;\n    }\n\n    static int[] copyScaled(int[] src, int k) {\n        int[] r = new int[src.length];\n        for (int i = 0; i < src.length; i++) r[i] = src[i] * k;\n        return r;\n    }\n}\n",
      "solution": "public class Main {\n    public static int rebind(int[] a, int k) {\n        int[] p = a;\n        p = copyScaled(a, k);\n        p = copyScaled(a, k);\n        if (a.length == 0) return -1;\n        a[0] = p[0];\n        return a[0];\n    }\n\n    static int[] copyScaled(int[] src, int k) {\n        int[] r = new int[src.length];\n        for (int i = 0; i < src.length; i++) r[i] = src[i] * k;\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3",
            "2"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "7",
            "3"
          ],
          "expect": "21",
          "cmp": "exact"
        },
        {
          "name": "k=1",
          "args": [
            "5,5",
            "1"
          ],
          "expect": "5",
          "cmp": "exact"
        },
        {
          "name": "负数首元素",
          "args": [
            "-4,9",
            "3"
          ],
          "expect": "-12",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空数组",
          "args": [
            "",
            "5"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "形参 p 只是局部变量(栈上的引用值), 重新赋值不会改变调用者手里的 a",
        "copyScaled 每次都 new 出新数组, 因此 a 的元素从头到尾没被写过"
      ]
    },
    {
      "id": "ch06-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "数组别名: 通过引用改内容",
      "tags": [
        "别名",
        "引用语义",
        "副作用",
        "数组内存"
      ],
      "q": "两个引用变量可以指向堆上的同一个数组对象, 这时通过任一引用修改元素, 另一方都会立刻看到。实现 methodName(int[] a):模拟\"别名共享\"的正确处理顺序。规则: 第一步按题目给定规则原地修改 a 的元素(把每个元素替换成其在数组中的下标位置值 0,1,2,...), 第二步通过参数别名引用再改一次(把每个元素替换成 100 减去它的下标), 其余内容不得再做修改。返回最终数组。(1) 先用别名引用 p = a 把 a 的每个元素写成它的下标; (2) 再通过 p 把每个元素写成 100 减下标。约束 0 ≤ n ≤ 100, 元素初值任意 int。空数组返回空数组。",
      "mode": "method",
      "entry": {
        "method": "aliasOverwrite",
        "params": [
          "int[]"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] aliasOverwrite(int[] a) {\n        // TODO: 别名共享同一块堆内存, 任意一次写入都作用于同一个对象\n        int[] p = a;\n        for (int i = 0; i < p.length; i++) p[i] = i;\n        // 继续完成第二步\n        return a;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] aliasOverwrite(int[] a) {\n        int[] p = a;\n        for (int i = 0; i < p.length; i++) p[i] = i;\n        for (int i = 0; i < p.length; i++) p[i] = 100 - i;\n        return a;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "9,9"
          ],
          "expect": "[100,99]",
          "cmp": "exact"
        },
        {
          "name": "长度3",
          "args": [
            "0,0,0"
          ],
          "expect": "[100,99,98]",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "5"
          ],
          "expect": "[100]",
          "cmp": "exact",
          "hidden": true
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
          "name": "长度100",
          "args": [
            "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100"
          ],
          "expect": "[100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "p = a 不复制数组, 只是把同一块堆地址写进另一个引用变量",
        "第二次循环必须走 p(或 a)逐个写, 不能用 a = new int[...] 换掉引用"
      ]
    },
    {
      "id": "ch06-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "方法内调整引用, 调用者不受影响",
      "tags": [
        "值传递",
        "引用重定向",
        "方法内存分配",
        "别名"
      ],
      "q": "实现 redirect(int[] a):在方法内部创建一个全新数组并让形参引用指向它, 再通过备份引用把内容写回调用者的原数组。规则(必须按顺序执行): (1) 备份形参原来指向的对象; (2) 创建新数组, 让形参变量指向它, 新数组每个元素是原数组对应元素加 10;(3) 通过形参新指向的数组把值逐个写回备份引用指向的数组, 即调用者看到的数组每个元素加 10; (4) 返回备份引用指向的那个对象。返回值必须是调用者传入的那个数组对象本身(与 a 是同一个引用, 与新建数组不是同一个)。约束 0 ≤ n ≤ 1000, |a[i]| ≤ 1000, 加法不溢出 int。空数组时第 (3) 步自然无操作, 返回传入的同一个空数组。",
      "mode": "method",
      "entry": {
        "method": "redirect",
        "params": [
          "int[]"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] redirect(int[] a) {\n        // TODO: 先备份原引用, 再让形参换指向, 最后通过备份把副本写回原对象\n        return a;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] redirect(int[] a) {\n        int[] original = a;\n        int[] fresh = new int[a.length];\n        for (int i = 0; i < a.length; i++) fresh[i] = a[i] + 10;\n        a = fresh;\n        for (int i = 0; i < original.length; i++) original[i] = a[i];\n        return original;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3"
          ],
          "expect": "[11,12,13]",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "-10,0"
          ],
          "expect": "[0,10]",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "5"
          ],
          "expect": "[15]",
          "cmp": "exact",
          "hidden": true
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
          "name": "极值",
          "args": [
            "1000,-1000"
          ],
          "expect": "[1010,-990]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "a = fresh 只把新地址写进形参变量, 调用者的引用仍指向旧对象",
        "要改调用者看到的内容, 必须通过 original 引用逐个写元素"
      ]
    },
    {
      "id": "ch06-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "先拷贝再改原数组: 引用独立性",
      "tags": [
        "浅拷贝",
        "引用独立",
        "别名",
        "数组内存"
      ],
      "q": "实现 copyThenTouch(int[] a):(1) 先把 a 的内容复制到一个全新的数组 c 中(长度、顺序、元素值都与 a 相同); (2) 复制完成之后, 把原数组 a 的首元素改成 -1(若 a 非空); (3) 返回 c。因为 c 是在修改 a 之前就复制好的独立数组, 返回值里必须仍是 a 的原始内容, 首元素不能被 -1 污染。如果实现让 c 指向了 a(别名, 没有真正分配新数组), 那么第 (2) 步改 a[0] 会连带把 c[0] 也改成 -1, 返回值就错了。约束 0 ≤ n ≤ 1000, |a[i]| ≤ 1e9。空数组不执行第 (2) 步的修改, 返回长度为 0 的新数组。",
      "mode": "method",
      "entry": {
        "method": "copyThenTouch",
        "params": [
          "int[]"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] copyThenTouch(int[] a) {\n        // TODO: 必须先真正复制出新数组, 再去改原数组 a[0]\n        int[] c = a;\n        if (a.length > 0) a[0] = -1;\n        return c;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] copyThenTouch(int[] a) {\n        int[] c = new int[a.length];\n        for (int i = 0; i < a.length; i++) c[i] = a[i];\n        if (a.length > 0) a[0] = -1;\n        return c;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3"
          ],
          "expect": "[1,2,3]",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "42"
          ],
          "expect": "[42]",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "-7,-7,3"
          ],
          "expect": "[-7,-7,3]",
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
          "name": "极值",
          "args": [
            "2147483647,-2147483648,0"
          ],
          "expect": "[2147483647,-2147483648,0]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "c = a 只是把同一块堆地址复制给另一个引用变量, 之后改 a[0] 等于改 c[0]",
        "顺序很关键: 必须先把元素逐个复制进新数组, 再去修改原数组",
        "别用 a.clone() 之后又返回 a —— 返回的必须是那个新数组"
      ]
    },
    {
      "id": "ch06-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "数组反转三兄弟: 原地/副本/混合",
      "tags": [
        "原地修改",
        "副本语义",
        "引用分离",
        "双指针"
      ],
      "q": "实现 reverseMode(int[] a, int mode):用三种方式反转数组并用返回值区分它们对入参的影响。mode=0: 原地反转 a 本身(入参被修改), 返回同一个数组对象。mode=1: 不改动 a, 返回一个全新的反转副本(入参不变, 副本与 a 不是同一对象)。mode=2: 先原地反转 a, 再基于反转后的 a 生成并返回一个全新的副本(入参被修改, 返回值是新对象)。反转指元素顺序整体倒置, 长度不变。约束 0 ≤ n ≤ 1000, -1e9 ≤ a[i] ≤ 1e9, mode 只会是 0/1/2。空数组三种模式都返回长度 0(模式 0/2 返回的仍是同一对象)。",
      "mode": "method",
      "entry": {
        "method": "reverseMode",
        "params": [
          "int[]",
          "int"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] reverseMode(int[] a, int mode) {\n        // TODO: mode=0 原地; mode=1 副本; mode=2 先原地再副本\n        return a;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] reverseMode(int[] a, int mode) {\n        if (mode == 1) {\n            int[] r = new int[a.length];\n            for (int i = 0; i < a.length; i++) r[i] = a[a.length - 1 - i];\n            return r;\n        }\n        for (int i = 0, j = a.length - 1; i < j; i++, j--) {\n            int t = a[i]; a[i] = a[j]; a[j] = t;\n        }\n        if (mode == 2) {\n            int[] r = new int[a.length];\n            for (int i = 0; i < a.length; i++) r[i] = a[i];\n            return r;\n        }\n        return a;\n    }\n}\n",
      "tests": [
        {
          "name": "原地",
          "args": [
            "1,2,3,4",
            "0"
          ],
          "expect": "[4,3,2,1]",
          "cmp": "exact"
        },
        {
          "name": "副本",
          "args": [
            "1,2,3,4",
            "1"
          ],
          "expect": "[4,3,2,1]",
          "cmp": "exact"
        },
        {
          "name": "混合",
          "args": [
            "1,2,3,4",
            "2"
          ],
          "expect": "[4,3,2,1]",
          "cmp": "exact"
        },
        {
          "name": "奇数长度",
          "args": [
            "1,2,3,4,5",
            "1"
          ],
          "expect": "[5,4,3,2,1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空数组原地",
          "args": [
            "",
            "0"
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单元素副本",
          "args": [
            "9",
            "1"
          ],
          "expect": "[9]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "原地反转用双指针 i<j 交换即可, i<j 保证奇数长度中间元素不动",
        "mode=1 必须用 a[a.length-1-i] 读取, 千万不要先反转 a 再复制"
      ]
    },
    {
      "id": "ch06-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "盒装化: 通过数组引用返回多个结果",
      "tags": [
        "引用返回",
        "堆内存分配",
        "多返回值",
        "边界"
      ],
      "q": "Java 方法只能返回一个值, 常用\"小数组\"当作盒装容器把多个结果一次带回。实现 boxStats(int[] a):一次性返回 int[]{min, max, sum} 三件套。约束 0 ≤ n ≤ 1e5, -1e9 ≤ a[i] ≤ 1e9, 保证 sum 不超出 int 范围。空数组时返回 int[]{0, 0, 0}。返回值必须是新分配的 int[3], 长度恰好为 3。",
      "mode": "method",
      "entry": {
        "method": "boxStats",
        "params": [
          "int[]"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] boxStats(int[] a) {\n        // TODO: 一次遍历求 min/max/sum, 用长度为 3 的新数组带回\n        return new int[]{0, 0, 0};\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] boxStats(int[] a) {\n        if (a.length == 0) return new int[]{0, 0, 0};\n        int mn = a[0], mx = a[0], sum = 0;\n        for (int x : a) {\n            if (x < mn) mn = x;\n            if (x > mx) mx = x;\n            sum += x;\n        }\n        return new int[]{mn, mx, sum};\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3,1,4,1,5"
          ],
          "expect": "[1,5,14]",
          "cmp": "exact"
        },
        {
          "name": "全相等",
          "args": [
            "7,7,7"
          ],
          "expect": "[7,7,21]",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "-1,-2,-3"
          ],
          "expect": "[-3,-1,-6]",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "[0,0,0]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单元素",
          "args": [
            "-5"
          ],
          "expect": "[-5,-5,-5]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "min/max 用首元素初始化, 不要用 0 或 Integer.MAX_VALUE 兜底",
        "空数组必须单独判, 否则 a[0] 直接抛异常"
      ]
    },
    {
      "id": "ch06-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "方法内 swap 为何失效: 可判定语义题",
      "tags": [
        "值传递",
        "交换失效",
        "引用语义",
        "Java运行机制"
      ],
      "q": "经典陷阱: swap(int x, int y) 无法交换调用者的两个变量, 因为参数按值传递。实现 swapDemo(int[] a, int i, int j):返回 int[4] 依次记录四个可判定的结果。规则与返回值: (1) ret[0] 记录\"形参互相赋值方式\"的模拟结果 —— 先把 a[i] 与 a[j] 的值读入两个局部变量 x、y, 然后执行局部变量互换 x<->y, 最后把 x 写回 a[i], y 写回 a[j]; 此时该位置应记录 a[i] 最终的值。(2) ret[1] 记录\"通过引用真的交换\"的结果 —— 直接交换数组元素 a[i] 与 a[j]; 此时同样记录 a[i] 最终的值。(3) ret[2] 记录整个数组的最小值。(4) ret[3] 记录整个数组的最大值。注意步骤 (1) 的\"局部变量互换\"在正确实现下不改变数组(因为 x 与 y 本来就是从这两个位置读出来的); 步骤 (2) 才是真正改变数组的交换。约束 1 ≤ n ≤ 1000, 0 ≤ i, j < n 且保证 i ≠ j, -1e9 ≤ a[i] ≤ 1e9。",
      "mode": "method",
      "entry": {
        "method": "swapDemo",
        "params": [
          "int[]",
          "int",
          "int"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] swapDemo(int[] a, int i, int j) {\n        // TODO: (1) 局部变量互换后写回 (2) 通过数组引用交换 (3) 统计 min/max\n        return new int[4];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] swapDemo(int[] a, int i, int j) {\n        int x = a[i], y = a[j];\n        int t = x; x = y; y = t;\n        a[i] = x; a[j] = y;\n        int afterLocal = a[i];\n        int tmp = a[i]; a[i] = a[j]; a[j] = tmp;\n        int afterRef = a[i];\n        int mn = a[0], mx = a[0];\n        for (int v : a) { if (v < mn) mn = v; if (v > mx) mx = v; }\n        return new int[]{afterLocal, afterRef, mn, mx};\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3,4",
            "0",
            "2"
          ],
          "expect": "[3,1,1,4]",
          "cmp": "exact"
        },
        {
          "name": "相邻交换",
          "args": [
            "5,9",
            "0",
            "1"
          ],
          "expect": "[9,5,5,9]",
          "cmp": "exact"
        },
        {
          "name": "含负数",
          "args": [
            "-3,8,-1,4",
            "1",
            "2"
          ],
          "expect": "[-1,8,-3,8]",
          "cmp": "exact"
        },
        {
          "name": "首尾交换",
          "args": [
            "2,2,2,7",
            "0",
            "3"
          ],
          "expect": "[7,2,2,7]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "极值",
          "args": [
            "-1000000000,1000000000,0",
            "0",
            "1"
          ],
          "expect": "[1000000000,-1000000000,-1000000000,1000000000]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "局部变量互换只改了栈上的临时副本, 要真正影响数组必须通过引用 a 写元素",
        "步骤 (1) 写回的值等价于原值, 因为 x、y 正是从这两个下标读出来的"
      ]
    },
    {
      "id": "ch06-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "递归栈深度: 形参与栈帧",
      "tags": [
        "递归",
        "栈帧",
        "栈深度",
        "内存分配"
      ],
      "q": "每次方法调用都会在虚拟机栈上压入一个栈帧, 递归深度过大就会 StackOverflowError。实现方法 depth(int n):用递归模拟\"逐层展开再逐层返回\"的调用链, 返回该调用链中形参取到过的最大值(即最深处那一层的参数)。规则: 递归函数 f(int v) 在 v ≤ 0 时返回 v 本身; 否则计算 sub = f(v - 1), 再将 sub 写入一个长度为 2 的临时数组的 0 号位, 最后返回 max(v, sub)。调用入口为 f(n)。这样返回值恰好是 max(0, n) 在 n > 0 时的最大值即 n 本身; 但递归链会真实地压入 n+1 层栈帧。约束 -10000 ≤ n ≤ 10000。注意: 请勿用循环改写, 本题考的就是递归调用链。",
      "mode": "method",
      "entry": {
        "method": "depth",
        "params": [
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int depth(int n) {\n        // TODO: 用递归 f(v) = v<=0 ? v : max(v, f(v-1))\n        return 0;\n    }\n\n    static int f(int v) {\n        if (v <= 0) return v;\n        int sub = f(v - 1);\n        int[] box = new int[2];\n        box[0] = sub;\n        return Math.max(v, box[0]);\n    }\n}\n",
      "solution": "public class Main {\n    public static int depth(int n) {\n        return f(n);\n    }\n\n    static int f(int v) {\n        if (v <= 0) return v;\n        int sub = f(v - 1);\n        int[] box = new int[2];\n        box[0] = sub;\n        return Math.max(v, box[0]);\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "5"
          ],
          "expect": "5",
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
          "name": "负数",
          "args": [
            "-7"
          ],
          "expect": "-7",
          "cmp": "exact"
        },
        {
          "name": "单层",
          "args": [
            "1"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "深递归",
          "args": [
            "10000"
          ],
          "expect": "10000",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "递归终止条件 v<=0 返回 v, 负数时最大值就是 v 本身",
        "每一层的 box 都是新的堆对象, 不会被下层调用覆盖"
      ]
    },
    {
      "id": "ch06-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "写方法: 通过引用把结果搬回调用者",
      "tags": [
        "引用返回",
        "越界写入",
        "方法内存分配",
        "多返回值"
      ],
      "q": "方法无法直接改变调用者的基本类型变量, 但可以改变调用者\"看得见\"的堆对象。实现 fillStats(int[] src, int[] out):在 out 中写入 4 个统计量并返回 out(证明返回的就是传入的那个对象)。写入规则: out[0] = src 的最小值; out[1] = src 的最大值; out[2] = src 中最大值所在的最小下标; out[3] = src 中最小值所在的最大下标。要求: 调用方传入的 out 长度必须为 4(题目保证); 不得 new 一个新数组返回, 必须返回传入的同一个 out 对象。约束 1 ≤ n ≤ 1e5, -1e9 ≤ src[i] ≤ 1e9。",
      "mode": "method",
      "entry": {
        "method": "fillStats",
        "params": [
          "int[]",
          "int[]"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] fillStats(int[] src, int[] out) {\n        // TODO: 把结果写进 out 的元素, 不要替换 out 引用\n        return out;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] fillStats(int[] src, int[] out) {\n        int mn = src[0], mx = src[0], idxMax = 0, idxMin = 0;\n        for (int i = 1; i < src.length; i++) {\n            if (src[i] > mx) { mx = src[i]; idxMax = i; }\n            if (src[i] <= mn) { mn = src[i]; idxMin = i; }\n        }\n        out[0] = mn;\n        out[1] = mx;\n        out[2] = idxMax;\n        out[3] = idxMin;\n        return out;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3,1,4,1,5",
            "0,0,0,0"
          ],
          "expect": "[1,5,4,3]",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "8",
            "0,0,0,0"
          ],
          "expect": "[8,8,0,0]",
          "cmp": "exact"
        },
        {
          "name": "全部相同",
          "args": [
            "2,2,2",
            "0,0,0,0"
          ],
          "expect": "[2,2,0,2]",
          "cmp": "exact"
        },
        {
          "name": "负数",
          "args": [
            "-5,-5,-1",
            "0,0,0,0"
          ],
          "expect": "[-5,-1,2,1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "最大下标优先小",
          "args": [
            "9,1,9,1,9",
            "0,0,0,0"
          ],
          "expect": "[1,9,0,3]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "最大值下标要取最小下标: 只在严格大于时才更新 idxMax",
        "最小值下标要取最大下标: 用 src[i] <= mn 更新 idxMin"
      ]
    },
    {
      "id": "ch06-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "对拍: 原地归零与副本计算的语义比对",
      "tags": [
        "对拍",
        "原地修改",
        "副本语义",
        "纯函数"
      ],
      "q": "实现 solve(int[] a):返回一个 int, 表示\"原地把负数清零\"之后数组里所有正数的和。规则: 先把 a 中所有小于 0 的元素原地置为 0(调用者可见的副作用), 然后返回剩下元素的总和。要求: 若把入参替换成它的独立副本, 结果必须完全一致 —— 也就是说你的实现只能依赖入参内容本身, 不能依赖任何跨调用的隐藏状态。本题随机对拍:你的实现会与\"先复制入参、在副本上归零再求和\"的参考实现在大量随机用例上比对。约束 0 ≤ n ≤ 2000, -1e6 ≤ a[i] ≤ 1e6, 总和不超过 int 范围。",
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
      "starter": "public class Main {\n    public static int solve(int[] a) {\n        // TODO: 原地归零负数, 再累加正数\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int[] a) {\n        int sum = 0;\n        for (int i = 0; i < a.length; i++) {\n            if (a[i] < 0) a[i] = 0;\n            sum += a[i];\n        }\n        return sum;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,-2,3,-4,5"
          ],
          "expect": "9",
          "cmp": "exact"
        },
        {
          "name": "全负",
          "args": [
            "-1,-2,-3"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "全正",
          "args": [
            "1,2,3"
          ],
          "expect": "6",
          "cmp": "exact"
        },
        {
          "name": "含零",
          "args": [
            "0,0,-1"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260610,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(15); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(2000001)-1000000); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static int solve(int[] a){ int[] c=a.clone(); for(int i=0;i<c.length;i++) if(c[i]<0) c[i]=0; int s=0; for(int x:c) s+=x; return s; } }"
      },
      "hints": [
        "参考实现在副本上操作, 你的原地实现只要语义正确就必然对拍通过",
        "不要缓存上一次的 sum, 那会破坏\"副本等价\"的语义"
      ]
    },
    {
      "id": "ch06-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "对拍: 别名安全的区间替换",
      "tags": [
        "对拍",
        "别名",
        "区间操作",
        "前驱更新"
      ],
      "q": "实现 solve(int[] a):对数组做一趟\"前驱更新\"。规则: 从下标 1 开始向右扫描, 若 a[i] 严格小于 a[i-1], 则把 a[i] 改成 a[i-1]; 否则保持不变。返回最终数组。该操作必须是对入参数组的原地更新, 且只依赖当前已更新的前缀, 不能读写扫描位置之后的元素。本题随机对拍:与\"先复制入参、在副本上按同样规则推进\"的参考实现比对, 任何越界读写或额外副作用都会被对拍捕获。约束 0 ≤ n ≤ 5000, |a[i]| ≤ 1e9。空数组返回空数组。",
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
      "starter": "public class Main {\n    public static int[] solve(int[] a) {\n        // TODO: 从左到右原地推进, 用已更新的前一个元素作比较基准\n        return a;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] solve(int[] a) {\n        for (int i = 1; i < a.length; i++) {\n            if (a[i] < a[i - 1]) a[i] = a[i - 1];\n        }\n        return a;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3,1,4,1,5"
          ],
          "expect": "[3,3,4,4,5]",
          "cmp": "exact"
        },
        {
          "name": "已非降",
          "args": [
            "1,2,3"
          ],
          "expect": "[1,2,3]",
          "cmp": "exact"
        },
        {
          "name": "严格降",
          "args": [
            "5,4,3,2,1"
          ],
          "expect": "[5,5,5,5,5]",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "9"
          ],
          "expect": "[9]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 400,
        "seed": 20260611,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){\n  int mode = r.nextInt(4);\n  int n;\n  if(mode == 0) n = r.nextInt(10);\n  else if(mode == 1) n = r.nextInt(200);\n  else if(mode == 2) n = 5000;                       // 上界\n  else n = r.nextInt(3);\n  StringBuilder b = new StringBuilder();\n  for(int i=0;i<n;i++){\n    if(i>0) b.append((char)44);\n    int k = r.nextInt(4);\n    if(k == 0) b.append(r.nextInt(5));               // 密集小值(前驱更新会连成一片)\n    else if(k == 1) b.append(-r.nextInt(1000));      // 负值\n    else if(k == 2) b.append(r.nextInt(2001) - 1000);\n    else b.append(Integer.MIN_VALUE);                // 极值\n  }\n  return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static int[] solve(int[] a){ int[] c=a.clone(); for(int i=1;i<c.length;i++) if(c[i]<c[i-1]) c[i]=c[i-1]; return c; } }"
      },
      "hints": [
        "必须从左到右, 因为 a[i-1] 可能已经被这一次扫描更新过",
        "反向扫描会得到不同的结果, 对拍会立刻发现"
      ]
    },
    {
      "id": "ch06-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "对拍: 深拷贝二维网格(不得共享行引用)",
      "tags": [
        "深拷贝",
        "二维数组",
        "引用独立",
        "对拍"
      ],
      "q": "实现 solve(int[][] g):(1) 先对 g 做真正的深拷贝 r —— 外层要 new, 每一行也必须各自 new 并逐元素复制; (2) 深拷贝完成之后, 若 g 至少有一行且第一行非空, 把原网格的 g[0][0] 改成 -1; (3) 返回 r。因为 r 是在修改 g 之前就完成的深拷贝, 返回值必须仍是 g 的原始内容, r[0][0] 不能被 -1 污染。如果只做外层 clone(g.clone() 会共享行数组), 那么改 g[0][0] 会连带改掉 r[0][0], 返回值就错了。本题随机对拍:与\"逐行深拷贝后再修改原网格\"的参考实现比对。行编码: 每个参数 token 是一行元素, 用逗号分隔(例如 1,2,3), 行与行之间以参数 token 分隔。约束 0 ≤ 行数 ≤ 50, 0 ≤ 列数 ≤ 50, |元素| ≤ 1e6。空网格返回长度为 0 的新数组。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[][]"
        ],
        "ret": "int[][]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[][] solve(int[][] g) {\n        // TODO: 外层 new + 每一行也要 new 并复制元素, 只 clone 外层会共享行引用\n        int[][] r = g.clone();\n        if (g.length > 0 && g[0].length > 0) g[0][0] = -1;\n        return r;\n    }\n}\n",
      "solution": "public class Main {\n    public static int[][] solve(int[][] g) {\n        int[][] r = new int[g.length][];\n        for (int i = 0; i < g.length; i++) {\n            r[i] = new int[g[i].length];\n            for (int j = 0; j < g[i].length; j++) r[i][j] = g[i][j];\n        }\n        if (g.length > 0 && g[0].length > 0) g[0][0] = -1;\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2;3,4"
          ],
          "expect": "[[1,2],[3,4]]",
          "cmp": "exact"
        },
        {
          "name": "单行",
          "args": [
            "5,6,7"
          ],
          "expect": "[[5,6,7]]",
          "cmp": "exact"
        },
        {
          "name": "单列",
          "args": [
            "1;2;3"
          ],
          "expect": "[[1],[2],[3]]",
          "cmp": "exact"
        },
        {
          "name": "空网格",
          "args": [
            ""
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "含空行",
          "args": [
            "1,2;;3,4"
          ],
          "expect": "[[1,2],[],[3,4]]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "首行为空",
          "args": [
            ";9,8"
          ],
          "expect": "[[],[9,8]]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260612,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int rows=r.nextInt(5); String[] out=new String[rows]; for(int i=0;i<rows;i++){ StringBuilder b=new StringBuilder(); int cols=r.nextInt(5); for(int j=0;j<cols;j++){ if(j>0) b.append((char)44); b.append(r.nextInt(2001)-1000); } out[i]=b.toString(); } return out; } }",
        "ref": "public class Ref { public static int[][] solve(int[][] g){ int[][] r=new int[g.length][]; for(int i=0;i<g.length;i++){ r[i]=new int[g[i].length]; for(int j=0;j<g[i].length;j++) r[i][j]=g[i][j]; } if(g.length>0 && g[0].length>0) g[0][0]=-1; return r; } }"
      },
      "hints": [
        "g.clone() 只是浅拷贝, 行数组仍然共享, 会破坏\"不得共享引用\"的要求",
        "外层和内层都要各自 new, 空行必须保留为空的新行(不能是 null)"
      ]
    },
    {
      "id": "ch06-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计: 不可变数组包装 ImmutableIntArray",
      "tags": [
        "不可变",
        "防御性拷贝",
        "引用语义",
        "设计"
      ],
      "q": "实现 class ImmutableIntArray(保持类名与 public class Main 占位不变):构造器接收一个 int[](构造时必须做防御性拷贝, 之后外部再改那个数组不得影响本对象);提供如下方法。size() 返回元素个数。get(int i) 返回下标 i 的元素。toArray() 返回一个\"新的\"数组副本, 调用者修改返回的数组不得影响本对象, 且不得把内部数组直接暴露出去。with(int i, int v) 返回一个新的 ImmutableIntArray, 其内容是把本对象下标 i 换成 v, 本对象自身必须保持不变。toString() 返回形如 [1,2,3] 的字符串, 空数组返回 []。判题按操作序列调用, 只有无返回值的方法(构造器与 void 方法)在结果里记为 null; 任何有返回值的调用都会按返回值规范化后参与比对, 例如返回 int 直接比对数字, 返回 int[] 比对 [1,2,3], 返回 String 比对带引号的字符串, 返回对象则比对它的文本形式。",
      "mode": "design",
      "entry": {
        "className": "ImmutableIntArray"
      },
      "ops": [
        [
          "ImmutableIntArray",
          [
            "1,2,3"
          ],
          [
            "int[]"
          ]
        ],
        [
          "size",
          [],
          []
        ],
        [
          "get",
          [
            0
          ],
          [
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
          "toArray",
          [],
          []
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
          "with",
          [
            1,
            9
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "toString",
          [],
          []
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
          "with",
          [
            0,
            0
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "toString",
          [],
          []
        ],
        [
          "with",
          [
            2,
            7
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "toArray",
          [],
          []
        ],
        [
          "size",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "3",
        "1",
        "3",
        "[1,2,3]",
        "2",
        "\"[1,9,3]\"",
        "\"[1,2,3]\"",
        "2",
        "\"[0,2,3]\"",
        "\"[1,2,3]\"",
        "\"[1,2,7]\"",
        "[1,2,3]",
        "3"
      ],
      "cmp": "exact",
      "starter": "class ImmutableIntArray {\n    // TODO: 构造时拷贝入参; toArray 返回副本; with 返回新对象\n    private final int[] data;\n\n    public ImmutableIntArray(int[] src) {\n        this.data = src;\n    }\n\n    public int size() { return 0; }\n    public int get(int i) { return 0; }\n    public int[] toArray() { return data; }\n    public ImmutableIntArray with(int i, int v) { return this; }\n    public String toString() { return \"\"; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass ImmutableIntArray {\n    private final int[] data;\n\n    public ImmutableIntArray(int[] src) {\n        this.data = new int[src.length];\n        for (int i = 0; i < src.length; i++) this.data[i] = src[i];\n    }\n\n    public int size() { return data.length; }\n    public int get(int i) { return data[i]; }\n    public int[] toArray() { return data.clone(); }\n\n    public ImmutableIntArray with(int i, int v) {\n        int[] next = data.clone();\n        next[i] = v;\n        return new ImmutableIntArray(next);\n    }\n\n    public String toString() {\n        StringBuilder b = new StringBuilder(\"[\");\n        for (int i = 0; i < data.length; i++) { if (i > 0) b.append(\",\"); b.append(data[i]); }\n        return b.append(\"]\").toString();\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "构造器里 this.data = src 是别名, 外部一改就\"不可变\"失效了",
        "toArray 必须 clone, 否则调用者能绕过封装的引用直接改内部状态",
        "with 必须返回新对象并在新数组上改, 绝不能写 this.data"
      ]
    },
    {
      "id": "ch06-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计: 对象池 ArrayPool(复用与计数)",
      "tags": [
        "对象池",
        "复用",
        "设计",
        "内存分配"
      ],
      "q": "实现 class ArrayPool:ArrayPool(int cap) 构造(池中最多缓存 cap 个数组, cap ≥ 1)。acquire(int n) 返回一个长度恰好为 n 的 int[]: 若池中有长度不小于 n 的空闲数组, 取出其中长度最小的那个并清空其前 n 个元素后返回(这样做是为了内存复用); 否则新分配一个长度为 n 的数组。无论哪条路径, 成功取出的数组前 n 个元素必须全为 0, 长度必须恰好为 n(若取出的缓存数组更长, 需要截取或重新分配, 但不得返回长度不为 n 的数组)。release(int[] a) 把数组归还池中: 若 a 为 null 直接忽略; 若池已满则丢弃该数组(池容量不变); 否则入池。size() 返回当前池中缓存的数组个数。reuseCount() 返回到目前为止\"从池中命中复用\"的次数(新分配不计数)。判题按操作序列调用, 无返回值的方法记 null。",
      "mode": "design",
      "entry": {
        "className": "ArrayPool"
      },
      "ops": [
        [
          "ArrayPool",
          [
            2
          ],
          [
            "int"
          ]
        ],
        [
          "size",
          [],
          []
        ],
        [
          "reuseCount",
          [],
          []
        ],
        [
          "acquire",
          [
            3
          ],
          [
            "int"
          ]
        ],
        [
          "release",
          [
            "1,2,3"
          ],
          [
            "int[]"
          ]
        ],
        [
          "size",
          [],
          []
        ],
        [
          "acquire",
          [
            2
          ],
          [
            "int"
          ]
        ],
        [
          "reuseCount",
          [],
          []
        ],
        [
          "acquire",
          [
            5
          ],
          [
            "int"
          ]
        ],
        [
          "reuseCount",
          [],
          []
        ],
        [
          "release",
          [
            "0,0"
          ],
          [
            "int[]"
          ]
        ],
        [
          "release",
          [
            "0,0,0"
          ],
          [
            "int[]"
          ]
        ],
        [
          "size",
          [],
          []
        ],
        [
          "release",
          [
            "0"
          ],
          [
            "int[]"
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
        "0",
        "0",
        "[0,0,0]",
        "null",
        "1",
        "[0,0]",
        "1",
        "[0,0,0,0,0]",
        "1",
        "null",
        "null",
        "2",
        "null",
        "2"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass ArrayPool {\n    // TODO: 用 List<int[]> 保存空闲数组; 命中复用时长度必须精确\n    private final int cap;\n\n    public ArrayPool(int cap) { this.cap = cap; }\n\n    public int[] acquire(int n) { return new int[n]; }\n    public void release(int[] a) { }\n    public int size() { return 0; }\n    public int reuseCount() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass ArrayPool {\n    private final int cap;\n    private final List<int[]> idle = new ArrayList<int[]>();\n    private int reuse = 0;\n\n    public ArrayPool(int cap) { this.cap = cap; }\n\n    public int[] acquire(int n) {\n        int best = -1;\n        for (int i = 0; i < idle.size(); i++) {\n            if (idle.get(i).length >= n && (best < 0 || idle.get(i).length < idle.get(best).length)) best = i;\n        }\n        if (best < 0) return new int[n];\n        int[] got = idle.remove(best);\n        reuse++;\n        if (got.length == n) {\n            Arrays.fill(got, 0);\n            return got;\n        }\n        int[] r = new int[n];\n        return r;\n    }\n\n    public void release(int[] a) {\n        if (a == null) return;\n        if (idle.size() >= cap) return;\n        idle.add(a);\n    }\n\n    public int size() { return idle.size(); }\n    public int reuseCount() { return reuse; }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "acquire 要选\"长度最小且 ≥ n\"的空闲数组, 这样才能把大块留给后续更大的请求",
        "缓存数组比 n 长时必须重新分配, 绝不能把长数组直接返回(长度会不符)"
      ]
    },
    {
      "id": "ch06-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计环形分配器 RingAllocator(内存复用)",
      "tags": [
        "设计",
        "环形缓冲",
        "内存复用",
        "BOSS"
      ],
      "q": "本章 BOSS。实现 class RingAllocator:RingAllocator(int cap) 构造, 内部用一块容量为 cap 的 int[] 作为堆区(下标 0..cap-1), 构造后堆区全为 0、没有任何区域被占用。分配规则(游标式, 不回绕): 维护一个分配游标, 初始为 0。alloc(int size) 从游标处向后分配一段长度为 size 的连续区域, 但必须同时满足以下全部条件才允许: 1 ≤ size ≤ cap; 游标 + size ≤ cap; 目标区间内没有任何格子仍被占用。全部满足时, 把游标到游标+size-1 这 size 个格子标记为占用、值全部置 0, 游标前进 size, 返回本段起始下标。否则本次调用不做任何修改并返回 -1(特别地, 长度超出剩余空间、区间与已占用区域重叠、size ≤ 0 或 size > cap 都必须返回 -1)。free(int start, int size) 回收一段区域并返回 true; 但如果 size ≤ 0、start < 0、start + size > cap, 或目标区间里存在任何未被占用的格子, 则必须整段拒绝、不做任何修改并返回 false。get(int index) 返回堆区下标 index 的值, 越界(含负数)返回 -1。set(int index, int value) 在 index 合法时写入该值, 越界不做任何修改。used() 返回当前仍被占用的格子总数。回收一段区域后, 再次 alloc 时游标只会继续向前, 不会回到被回收的空洞(即空洞不会被重新分配)。判题按操作序列调用, 无返回值的方法记 null, boolean 返回 true/false。",
      "mode": "design",
      "entry": {
        "className": "RingAllocator"
      },
      "ops": [
        [
          "RingAllocator",
          [
            8
          ],
          [
            "int"
          ]
        ],
        [
          "alloc",
          [
            3
          ],
          [
            "int"
          ]
        ],
        [
          "alloc",
          [
            5
          ],
          [
            "int"
          ]
        ],
        [
          "alloc",
          [
            1
          ],
          [
            "int"
          ]
        ],
        [
          "used",
          [],
          []
        ],
        [
          "set",
          [
            0,
            7
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "get",
          [
            0
          ],
          [
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
          "free",
          [
            0,
            3
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "used",
          [],
          []
        ],
        [
          "alloc",
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
            0
          ],
          [
            "int"
          ]
        ],
        [
          "free",
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
          "used",
          [],
          []
        ],
        [
          "alloc",
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
            20
          ],
          [
            "int"
          ]
        ],
        [
          "free",
          [
            6,
            4
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "free",
          [
            -1,
            1
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "free",
          [
            0,
            0
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "set",
          [
            9,
            5
          ],
          [
            "int",
            "int"
          ]
        ],
        [
          "get",
          [
            9
          ],
          [
            "int"
          ]
        ],
        [
          "used",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "0",
        "3",
        "-1",
        "8",
        "null",
        "7",
        "0",
        "true",
        "5",
        "-1",
        "7",
        "true",
        "0",
        "-1",
        "-1",
        "false",
        "false",
        "false",
        "null",
        "-1",
        "0"
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass RingAllocator {\n    // TODO: 用 boolean[] 标记占用, 用游标推进分配; 区间重叠时整段拒绝\n    private final int cap;\n    private final int[] heap;\n\n    public RingAllocator(int cap) {\n        this.cap = cap;\n        this.heap = new int[cap];\n    }\n\n    public int alloc(int size) { return -1; }\n    public boolean free(int start, int size) { return false; }\n    public int get(int index) { return -1; }\n    public void set(int index, int value) { }\n    public int used() { return 0; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass RingAllocator {\n    private final int cap;\n    private final int[] heap;\n    private final boolean[] used;\n    private int cursor = 0;\n    private int usedCount = 0;\n\n    public RingAllocator(int cap) {\n        this.cap = cap;\n        this.heap = new int[cap];\n        this.used = new boolean[cap];\n    }\n\n    public int alloc(int size) {\n        if (size <= 0 || size > cap) return -1;\n        if (cursor + size > cap) return -1;\n        for (int i = cursor; i < cursor + size; i++) if (used[i]) return -1;\n        for (int i = cursor; i < cursor + size; i++) { heap[i] = 0; used[i] = true; usedCount++; }\n        int start = cursor;\n        cursor += size;\n        return start;\n    }\n\n    public boolean free(int start, int size) {\n        if (size <= 0 || start < 0 || start + size > cap) return false;\n        for (int i = start; i < start + size; i++) if (!used[i]) return false;\n        for (int i = start; i < start + size; i++) { used[i] = false; usedCount--; }\n        return true;\n    }\n\n    public int get(int index) { return (index < 0 || index >= cap) ? -1 : heap[index]; }\n\n    public void set(int index, int value) { if (index >= 0 && index < cap) heap[index] = value; }\n\n    public int used() { return usedCount; }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "alloc 必须先整体校验再统一修改: 一旦区间里已有占用格子就整段拒绝, 不能改一半",
        "free 同理, 区间里出现任何空闲格子都要整段拒绝(不能只回收其中的已占用部分)",
        "游标只前进不回退, 因此释放出来的空洞不会被再次分配, 再次 alloc 返回 -1"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "RingAllocator",
              [
                8
              ],
              [
                "int"
              ]
            ],
            [
              "alloc",
              [
                3
              ],
              [
                "int"
              ]
            ],
            [
              "alloc",
              [
                5
              ],
              [
                "int"
              ]
            ],
            [
              "alloc",
              [
                1
              ],
              [
                "int"
              ]
            ],
            [
              "used",
              [],
              []
            ],
            [
              "set",
              [
                0,
                7
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "get",
              [
                0
              ],
              [
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
              "free",
              [
                0,
                3
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "used",
              [],
              []
            ],
            [
              "alloc",
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
                0
              ],
              [
                "int"
              ]
            ],
            [
              "free",
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
              "used",
              [],
              []
            ],
            [
              "alloc",
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
                20
              ],
              [
                "int"
              ]
            ],
            [
              "free",
              [
                6,
                4
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "free",
              [
                -1,
                1
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "free",
              [
                0,
                0
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "set",
              [
                9,
                5
              ],
              [
                "int",
                "int"
              ]
            ],
            [
              "get",
              [
                9
              ],
              [
                "int"
              ]
            ],
            [
              "used",
              [],
              []
            ]
          ],
          "expect": [
            "null",
            "0",
            "3",
            "-1",
            "8",
            "null",
            "7",
            "0",
            "true",
            "5",
            "-1",
            "7",
            "true",
            "0",
            "-1",
            "-1",
            "false",
            "false",
            "false",
            "null",
            "-1",
            "0"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "RingAllocator",
              [
                1
              ]
            ],
            [
              "alloc",
              [
                1
              ]
            ],
            [
              "alloc",
              [
                1
              ]
            ],
            [
              "get",
              [
                0
              ]
            ],
            [
              "used"
            ],
            [
              "free",
              [
                0,
                1
              ]
            ],
            [
              "used"
            ],
            [
              "alloc",
              [
                1
              ]
            ],
            [
              "alloc",
              [
                1
              ]
            ],
            [
              "set",
              [
                0,
                5
              ]
            ],
            [
              "get",
              [
                0
              ]
            ],
            [
              "free",
              [
                0,
                2
              ]
            ],
            [
              "free",
              [
                1,
                1
              ]
            ],
            [
              "used"
            ]
          ],
          "expect": [
            "null",
            "0",
            "-1",
            "0",
            "1",
            "true",
            "0",
            "-1",
            "-1",
            "null",
            "5",
            "false",
            "false",
            "0"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
