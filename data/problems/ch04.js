window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 4,
  "title": "数组与线性结构",
  "courseRef": "黑马第4章-数组 + 第7章-算法训练",
  "levels": [
    {
      "id": "ch04-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "一维数组四种遍历口径",
      "tags": [
        "数组遍历",
        "增强for",
        "边界",
        "D&C"
      ],
      "q": "实现 stats(int[] a):单次调用里统计并返回 4 个量 —— [元素个数, 元素之和, 最大值, 最小值], 以 long[]{n, sum, max, min} 返回。\n约束 0 ≤ n ≤ 1e5, 元素 |a[i]| ≤ 1e9。\n边界: 空数组必须返回 [0, 0, 0, 0](不能抛异常); 和可能超出 int 范围, 必须用 long 累加。\n要求 O(n) 一次遍历完成, 不允许排序。",
      "mode": "method",
      "entry": {
        "method": "stats",
        "params": [
          "int[]"
        ],
        "ret": "long[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long[] stats(int[] a) {\n        // TODO: 空数组要单独兜底, 否则 max/min 无意义\n        // TODO: 用一个循环同时维护 4 个量\n        return new long[]{0L, 0L, 0L, 0L};\n    }\n}\n",
      "solution": "public class Main {\n    public static long[] stats(int[] a) {\n        if (a.length == 0) return new long[]{0L, 0L, 0L, 0L};\n        long sum = 0L, max = a[0], min = a[0];\n        for (int x : a) {\n            sum += x;\n            if (x > max) max = x;\n            if (x < min) min = x;\n        }\n        return new long[]{a.length, sum, max, min};\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3"
          ],
          "expect": "[3,6,3,1]",
          "cmp": "exact"
        },
        {
          "name": "全负",
          "args": [
            "-5,-2,-9"
          ],
          "expect": "[3,-16,-2,-9]",
          "cmp": "exact"
        },
        {
          "name": "单元素",
          "args": [
            "7"
          ],
          "expect": "[1,7,7,7]",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            ""
          ],
          "expect": "[0,0,0,0]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "和溢出int",
          "args": [
            "1000000000,1000000000,1000000000"
          ],
          "expect": "[3,3000000000,1000000000,1000000000]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "空数组是必答边界: 直接返回全 0, 不要靠 max 初值 0 蒙混(全负数组会错)",
        "max/min 用 a[0] 初始化而不是 0 / Integer.MAX_VALUE, 可以少一个特判"
      ]
    },
    {
      "id": "ch04-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "动态初始化与哨兵查找",
      "tags": [
        "静态/动态初始化",
        "线性查找",
        "哨兵",
        "边界"
      ],
      "q": "实现 solve(int[] a, int target):返回 target 第一次出现的下标, 不存在返回 -1(等价于课程里的『查找数据』练习)。\n约束 0 ≤ n ≤ 1e5, 元素 0 ≤ a[i] ≤ 1e9, target 为任意 int。\n边界: 空数组返回 -1; 有重复元素必须返回最左边那个; 查找不得修改入参数组。\n要求 O(n)。提示: 可用 int max 记录『数组最大值』需要动态初始化或哨兵技巧。",
      "mode": "method",
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
      "starter": "public class Main {\n    public static int solve(int[] a, int target) {\n        // TODO: 从左往右扫, 命中立刻返回, 保证是最左下标\n        return -1;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int[] a, int target) {\n        for (int i = 0; i < a.length; i++) {\n            if (a[i] == target) return i;\n        }\n        return -1;\n    }\n}\n",
      "tests": [
        {
          "name": "命中",
          "args": [
            "5,3,8,1",
            "8"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "未命中",
          "args": [
            "5,3,8,1",
            "9"
          ],
          "expect": "-1",
          "cmp": "exact"
        },
        {
          "name": "重复取最左",
          "args": [
            "4,4,4,4",
            "4"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空数组",
          "args": [
            "",
            "0"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "命中末位",
          "args": [
            "1,2,3",
            "3"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "命中后必须立刻 return, 否则会拿到最右下标",
        "target 可能是负数, 不要把比较写成 a[i] < target 之类的剪枝"
      ]
    },
    {
      "id": "ch04-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "值查找与下标查找",
      "tags": [
        "值-下标映射",
        "指针数组",
        "边界",
        "count==size陷阱"
      ],
      "q": "实现 twoWay(int[] a, int v):返回 int[]{值查找结果, 下标查找结果}。\n语义: 第一个元素 = v 在 a 中第一次出现的**下标**(不存在返回 -1); 第二个元素 = 下标 **v** 处的元素值(下标越界返回 -1)。\n约束 0 ≤ n ≤ 1e5, -1e9 ≤ a[i] ≤ 1e9, v 为任意 int。\n边界: 空数组两个结果都是 -1; v 为负数时代码不能直接 a[v] 取值; 不得修改入参。",
      "mode": "method",
      "entry": {
        "method": "twoWay",
        "params": [
          "int[]",
          "int"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] twoWay(int[] a, int v) {\n        // TODO: 第一个元素做『值 -> 下标』的线性查找\n        // TODO: 第二个元素做『下标 -> 值』的随机访问, 务必先做越界保护\n        return new int[]{-1, -1};\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] twoWay(int[] a, int v) {\n        int idx = -1;\n        for (int i = 0; i < a.length; i++) {\n            if (a[i] == v) { idx = i; break; }\n        }\n        int val = (v >= 0 && v < a.length) ? a[v] : -1;\n        return new int[]{idx, val};\n    }\n}\n",
      "tests": [
        {
          "name": "双命中",
          "args": [
            "10,20,30",
            "1"
          ],
          "expect": "[-1,20]",
          "cmp": "exact"
        },
        {
          "name": "值下标同命中",
          "args": [
            "10,20,30,2",
            "2"
          ],
          "expect": "[3,30]",
          "cmp": "exact"
        },
        {
          "name": "值不存在且越界",
          "args": [
            "10,20,30",
            "99"
          ],
          "expect": "[-1,-1]",
          "cmp": "exact"
        },
        {
          "name": "负下标",
          "args": [
            "1,2,3",
            "-1"
          ],
          "expect": "[-1,-1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空数组",
          "args": [
            "",
            "0"
          ],
          "expect": "[-1,-1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "取首位",
          "args": [
            "7,8",
            "0"
          ],
          "expect": "[-1,7]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "两个语义互不干扰: 左边是『扫出来的下标』, 右边是『按 v 当下标取的值』",
        "v 同时当查找值和当下标用, 所以负数与 ≥n 都要走 -1 分支"
      ]
    },
    {
      "id": "ch04-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "原地删除所有等于 val 的元素",
      "tags": [
        "双指针",
        "原地删除",
        "O(1)额外空间",
        "删除数据"
      ],
      "q": "实现 removeElement(int[] a, int val):把所有等于 val 的元素原地删除, 返回剩余元素个数 k, 并保证 a 的**前 k 个位置**恰好是剩余元素的相对原序。\n约束 0 ≤ n ≤ 1e5, 元素与 val 为任意 int。\n边界: 全部等于 val 时 k=0; val 不存在时 k=n 且数组不变; 必须原位改造数组(判题会读取你改造后的 a), 不允许新建数组返回。\n要求 O(n) 时间、O(1) 额外空间。",
      "mode": "method",
      "entry": {
        "method": "removeElement",
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
      "starter": "public class Main {\n    public static int removeElement(int[] a, int val) {\n        // TODO: k 是『写指针』也是最终答案\n        // TODO: i 是『读指针』, a[i] != val 时写进 a[k++] 以保持原序\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int removeElement(int[] a, int val) {\n        int k = 0;\n        for (int i = 0; i < a.length; i++) {\n            if (a[i] != val) a[k++] = a[i];\n        }\n        return k;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3,2,2,3",
            "3"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "全删",
          "args": [
            "5,5,5",
            "5"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "无匹配",
          "args": [
            "1,2,3",
            "9"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "空数组",
          "args": [
            "",
            "1"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "保留原序",
          "args": [
            "1,2,3,4,5",
            "3"
          ],
          "expect": "4",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "快慢指针: i 只管读, k 只管写, k 结束时就是剩余个数",
        "判题会同时检查返回值和 a[0..k-1], 只返回个数字会被判 WA"
      ]
    },
    {
      "id": "ch04-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "数组去重(保持首次出现顺序)",
      "tags": [
        "去重",
        "有序性",
        "排序+压缩",
        "去除重复元素"
      ],
      "q": "实现 dedup(int[] a):返回去重后的新数组, 保留每个取值**第一次出现**的相对顺序(课程『去除重复元素』练习的保序版本)。\n约束 0 ≤ n ≤ 1e4, -1e9 ≤ a[i] ≤ 1e9。\n边界: 空数组返回空数组; 全相同返回单元素数组; 输入不得被修改。\n要求 O(n^2) 以上均可接受; 直接排序去重会打乱顺序, 判 WA。",
      "mode": "method",
      "entry": {
        "method": "dedup",
        "params": [
          "int[]"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] dedup(int[] a) {\n        // TODO: 用一个结果数组 + 已出现标记(或逐一回查结果数组)\n        // TODO: 关键: 判断『是否出现过』必须只看结果数组, 不能排序\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] dedup(int[] a) {\n        int[] r = new int[a.length];\n        int k = 0;\n        outer:\n        for (int i = 0; i < a.length; i++) {\n            for (int j = 0; j < k; j++) {\n                if (r[j] == a[i]) continue outer;\n            }\n            r[k++] = a[i];\n        }\n        int[] out = new int[k];\n        System.arraycopy(r, 0, out, 0, k);\n        return out;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,1,2,3,3,3"
          ],
          "expect": "[1,2,3]",
          "cmp": "exact"
        },
        {
          "name": "全相同",
          "args": [
            "7,7,7"
          ],
          "expect": "[7]",
          "cmp": "exact"
        },
        {
          "name": "已唯一",
          "args": [
            "3,1,2"
          ],
          "expect": "[3,1,2]",
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
          "name": "隔空重复保序",
          "args": [
            "2,1,2,1,3"
          ],
          "expect": "[2,1,3]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "答案顺序敏感, 所以不能用 TreeSet/HashSet 迭代输出",
        "用外层带标签的 continue 跳到下一个元素, 可以少写一个布尔开关"
      ]
    },
    {
      "id": "ch04-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "二维网格的螺旋遍历",
      "tags": [
        "二维数组",
        "边界收缩",
        "状态机",
        "四边界"
      ],
      "q": "实现 spiralOrder(int[][] m):按顺时针从外到内螺旋顺序返回全部元素(一维数组)。\n约束 0 ≤ 行数 ≤ 100, 0 ≤ 列数 ≤ 100; 允许空矩阵、单行、单列、非方阵。\n边界: 非方阵最后容易出现重复访问, 必须用四条边界的收缩条件挡住(尤其是 top==bottom 或 left==right 的收尾行/列)。\n要求 O(m·n)。",
      "mode": "method",
      "entry": {
        "method": "spiralOrder",
        "params": [
          "int[][]"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] spiralOrder(int[][] m) {\n        // TODO: 维护 top/bottom/left/right 四条边界, 每走完一条边就收缩\n        // TODO: 后两条边要各加一个 if 判空, 否则单行/单列会重复\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] spiralOrder(int[][] m) {\n        int rows = m.length;\n        if (rows == 0 || m[0].length == 0) return new int[0];\n        int cols = m[0].length;\n        int[] r = new int[rows * cols];\n        int k = 0, top = 0, bottom = rows - 1, left = 0, right = cols - 1;\n        while (top <= bottom && left <= right) {\n            for (int j = left; j <= right; j++) r[k++] = m[top][j];\n            top++;\n            for (int i = top; i <= bottom; i++) r[k++] = m[i][right];\n            right--;\n            if (top <= bottom) {\n                for (int j = right; j >= left; j--) r[k++] = m[bottom][j];\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) r[k++] = m[i][left];\n                left++;\n            }\n        }\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "方阵",
          "args": [
            "1,2,3;4,5,6;7,8,9"
          ],
          "expect": "[1,2,3,6,9,8,7,4,5]",
          "cmp": "exact"
        },
        {
          "name": "单行",
          "args": [
            "1,2,3,4"
          ],
          "expect": "[1,2,3,4]",
          "cmp": "exact"
        },
        {
          "name": "单列",
          "args": [
            "1;2;3"
          ],
          "expect": "[1,2,3]",
          "cmp": "exact"
        },
        {
          "name": "非方阵",
          "args": [
            "1,2,3,4;5,6,7,8"
          ],
          "expect": "[1,2,3,4,8,7,6,5]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空矩阵",
          "args": [
            ""
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "单行/单列只需第一个 for 环即可结束, 所以下面三条边必须带判空保护",
        "常见 bug: 忘了 if (top <= bottom), 单行会被反向再输出一遍"
      ]
    },
    {
      "id": "ch04-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "定长窗口最大和",
      "tags": [
        "滑动窗口",
        "前缀和",
        "O(n)",
        "边界"
      ],
      "q": "实现 maxWindowSum(int[] a, int k):返回数组中所有长度为 k 的连续子数组的元素和的最大值; 若 k <= 0 或 k > a.length(不存在这样的窗口)则返回 0。要求 O(n):用滑动窗口(进一个出一个)或前缀和, 不允许对每个窗口重新求和(O(n·k) 在 n=1e5 时会超时)。注意和可能超出 int 范围, 必须用 long 计算。约束 0 ≤ n ≤ 1e5, |a[i]| ≤ 1e9, 0 ≤ k ≤ 1e5。",
      "mode": "method",
      "entry": {
        "method": "maxWindowSum",
        "params": [
          "int[]",
          "int"
        ],
        "ret": "long"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long maxWindowSum(int[] a, int k) {\n        // TODO: 滑动窗口或前缀和, O(n)\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long maxWindowSum(int[] a, int k) {\n        if (k <= 0 || k > a.length) return 0L;\n        long sum = 0;\n        for (int i = 0; i < k; i++) sum += a[i];\n        long best = sum;\n        for (int i = k; i < a.length; i++) {\n            sum += (long) a[i] - a[i - k];\n            if (sum > best) best = sum;\n        }\n        return best;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3,4,5",
            "2"
          ],
          "expect": "9",
          "cmp": "exact"
        },
        {
          "name": "整个数组",
          "args": [
            "-1,-2,-3",
            "3"
          ],
          "expect": "-6",
          "cmp": "exact"
        },
        {
          "name": "k 超长",
          "args": [
            "1,2",
            "5"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "k=0",
          "args": [
            "1,2",
            "0"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全负取最大窗口",
          "args": [
            "-5,-1,-9,-2",
            "2"
          ],
          "expect": "-6",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "和溢出 int",
          "args": [
            "2000000000,2000000000",
            "2"
          ],
          "expect": "4000000000",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先算前 k 个的和, 之后每右移一格就\"加进新元素、减掉滑出的元素\"",
        "k 非法时要返回 0, 别漏掉这个边界",
        "和要用 long: 两个 2e9 相加就溢出 int 了"
      ]
    },
    {
      "id": "ch04-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "差分数组批量区间加",
      "tags": [
        "差分数组",
        "O(1)区间修改",
        "前缀和还原",
        "边界"
      ],
      "q": "实现 applyOps(int[] a, int[][] ops, int k):把数组 a 的后 k 个元素作为答案返回, 其中每个操作 ops[i] = {l, r, v} 表示对闭区间 [l, r] **同时加上** v。\n约束 0 ≤ n, ops 长度 ≤ 1e5, 0 ≤ k ≤ n, |a[i]|, |v| ≤ 1e4, 保证 0 ≤ l ≤ r < n。\n答案不超出 int 范围。\n边界: k=0 必须返回空数组; ops 为空数组时答案就是原数组前 k 项。\n要求 O(n + ops.length), 不允许对每个操作都扫一遍区间。",
      "mode": "method",
      "entry": {
        "method": "applyOps",
        "params": [
          "int[]",
          "int[][]",
          "int"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 5000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] applyOps(int[] a, int[][] ops, int k) {\n        // TODO: diff 长度 n+1, 对每个操作做 diff[l]+=v; diff[r+1]-=v;\n        // TODO: 再跑一次前缀累积得到最终值(也可以直接叠加到 a 的拷贝上)\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] applyOps(int[] a, int[][] ops, int k) {\n        int n = a.length;\n        long[] diff = new long[n + 1];\n        for (int[] op : ops) {\n            diff[op[0]] += op[2];\n            diff[op[1] + 1] -= op[2];\n        }\n        int[] r = new int[k];\n        long cur = 0L;\n        for (int i = 0; i < k; i++) {\n            cur += diff[i];\n            r[i] = (int) (a[i] + cur);\n        }\n        return r;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3,4,5",
            "0,2,10;1,3,-1",
            "5"
          ],
          "expect": "[11,11,12,3,5]",
          "cmp": "exact"
        },
        {
          "name": "无操作",
          "args": [
            "1,2,3",
            "",
            "3"
          ],
          "expect": "[1,2,3]",
          "cmp": "exact"
        },
        {
          "name": "取前k",
          "args": [
            "1,2,3,4",
            "0,3,100",
            "2"
          ],
          "expect": "[101,102]",
          "cmp": "exact"
        },
        {
          "name": "k为0",
          "args": [
            "1,2,3",
            "0,2,5",
            "0"
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空数组",
          "args": [
            "",
            "",
            "0"
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "diff 要多开 1 格, 因为 r+1 可能等于 n",
        "多个操作重叠时 diff 自然累加, 不需要去重合并"
      ]
    },
    {
      "id": "ch04-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "快慢指针原地移除有序数组重复项",
      "tags": [
        "快慢指针",
        "有序数组",
        "原地压缩",
        "O(1)空间"
      ],
      "q": "实现 dedupSorted(int[] a):a 已按**非降序**排列。原地删除重复项, 使每个取值只保留一个, 返回新的长度 k, 并保证 a 的前 k 项严格递增(课程『快慢指针』练习)。\n约束 0 ≤ n ≤ 1e5, 元素为任意 int(可能全相等, 也可能全不同)。\n边界: 空数组返回 0; 单元素返回 1; 必须原位改造数组, 判题会读取 a[0..k-1]。\n要求 O(n) 时间、O(1) 额外空间。",
      "mode": "method",
      "entry": {
        "method": "dedupSorted",
        "params": [
          "int[]"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int dedupSorted(int[] a) {\n        // TODO: slow 指向已压缩区域的最后一个位置\n        // TODO: fast 向前找与 a[slow] 不同的值, 找到就写进 a[++slow]\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int dedupSorted(int[] a) {\n        if (a.length == 0) return 0;\n        int slow = 0;\n        for (int fast = 1; fast < a.length; fast++) {\n            if (a[fast] != a[slow]) a[++slow] = a[fast];\n        }\n        return slow + 1;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,1,2"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "无重复",
          "args": [
            "1,2,3"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "全相同",
          "args": [
            "2,2,2,2"
          ],
          "expect": "1",
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
        },
        {
          "name": "负值双段",
          "args": [
            "-3,-3,-1,-1,0"
          ],
          "expect": "3",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "返回的是 slow + 1, 不是 slow —— 这是最常见的差一错误",
        "既然数组有序, 只需比较 a[fast] 与 a[slow] 相邻去重, 不必回查整段"
      ]
    },
    {
      "id": "ch04-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "长度最小的连续子数组(滑动窗口)",
      "tags": [
        "滑动窗口",
        "双指针",
        "O(n)",
        "连续子数组"
      ],
      "q": "实现 minLen(int[] a, int t):返回和 ≥ t 的**连续子数组**的最小长度; 不存在这样的子数组返回 0。\n约束 1 ≤ n ≤ 1e5, 1 ≤ a[i], t ≤ 1e4。\n边界: 数组可为空(返回 0); 单个元素就够时返回 1; 全部加起来都不够时返回 0。\n本题使用**随机对拍**: 你的实现会与 O(n^3) 暴力参考实现在 300 组随机用例上逐一比对, 因此必须完全正确。",
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
        "timeMs": 6000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int solve(int[] a, int t) {\n        // TODO: 右指针 right 不断扩张并累加窗口和\n        // TODO: 当 sum >= t 时尽量收缩 left, 记录最小长度\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int[] a, int t) {\n        int left = 0, best = Integer.MAX_VALUE;\n        long sum = 0L;\n        for (int right = 0; right < a.length; right++) {\n            sum += a[right];\n            while (sum >= t) {\n                best = Math.min(best, right - left + 1);\n                sum -= a[left++];\n            }\n        }\n        return best == Integer.MAX_VALUE ? 0 : best;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "2,3,1,2,4,3",
            "7"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "单元素即够",
          "args": [
            "5,1,1",
            "5"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "整体才够",
          "args": [
            "1,1,1,1",
            "4"
          ],
          "expect": "4",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "总和不足",
          "args": [
            "1,1,1",
            "100"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "空数组",
          "args": [
            "",
            "1"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260404,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(12); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(1+r.nextInt(9)); } int t=1+r.nextInt(30); return new String[]{ b.toString(), String.valueOf(t) }; } }",
        "ref": "public class Ref { public static int solve(int[] a, int t){ int best=Integer.MAX_VALUE; for(int i=0;i<a.length;i++){ for(int j=i;j<a.length;j++){ long s=0; for(int k=i;k<=j;k++) s+=a[k]; if(s>=t){ int len=j-i+1; if(len<best) best=len; } } } return best==Integer.MAX_VALUE?0:best; } }"
      },
      "hints": [
        "窗口收缩要用 while 而不是 if, 一次扩张可能要连续收缩多轮",
        "返回 0 表示『无解』, 不要用 MinValue 直接返回"
      ]
    },
    {
      "id": "ch04-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "接雨水(双指针求总水量)",
      "tags": [
        "接雨水",
        "双指针",
        "O(n)/O(1)",
        "贪心"
      ],
      "q": "实现 trap(int[] h):h[i] 表示第 i 根柱子的高度(宽度均为 1), 返回下雨后能接住的**总水量**。\n约束 0 ≤ n ≤ 1e5, 0 ≤ h[i] ≤ 1e4。\n边界: 空数组与单柱返回 0; 单调递增/递减返回 0; 结果可能接近 1e9, 建议用 long 累加。\n本题使用**随机对拍**: 与 O(n^2) 的『逐列找左右最高』暴力参考实现比对 300 组随机用例。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[]"
        ],
        "ret": "long"
      },
      "limits": {
        "timeMs": 6000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static long solve(int[] h) {\n        // TODO: 双指针法, 谁那边的挡板矮就结算谁那一格\n        // TODO: 维护 leftMax / rightMax 两个历史最高\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long solve(int[] h) {\n        int l = 0, r = h.length - 1;\n        long leftMax = 0L, rightMax = 0L, water = 0L;\n        while (l < r) {\n            if (h[l] < h[r]) {\n                if (h[l] >= leftMax) leftMax = h[l];\n                else water += leftMax - h[l];\n                l++;\n            } else {\n                if (h[r] >= rightMax) rightMax = h[r];\n                else water += rightMax - h[r];\n                r--;\n            }\n        }\n        return water;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "0,1,0,2,1,0,1,3,2,1,2,1"
          ],
          "expect": "6",
          "cmp": "exact"
        },
        {
          "name": "阶梯",
          "args": [
            "4,2,0,3,2,5"
          ],
          "expect": "9",
          "cmp": "exact"
        },
        {
          "name": "递增",
          "args": [
            "1,2,3,4"
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
        },
        {
          "name": "单柱",
          "args": [
            "5"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260505,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=r.nextInt(14); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(9)); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static long solve(int[] h){ long w=0; for(int i=0;i<h.length;i++){ int lm=0, rm=0; for(int j=0;j<=i;j++) if(h[j]>lm) lm=h[j]; for(int j=i;j<h.length;j++) if(h[j]>rm) rm=h[j]; int m=Math.min(lm,rm); if(m>h[i]) w+=m-h[i]; } return w; } }"
      },
      "hints": [
        "哪边挡板矮, 就说明这一格的短板由它决定, 可以立刻结算并移动",
        "返回 long: 1e5 根柱子 × 1e4 高度, 极限水量会超出 int"
      ]
    },
    {
      "id": "ch04-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "多数投票求众数",
      "tags": [
        "多数投票",
        "Boyer-Moore",
        "O(n)/O(1)",
        "众数"
      ],
      "q": "实现 majority(int[] a):返回出现次数**严格大于** n/2 的那个元素; 若不存在这样的多数元素则返回 -1。\n约束 1 ≤ n ≤ 1e5, 元素为任意 int。\n边界: 恰好等于 n/2 不算多数(如 [1,2] 返回 -1); 数组长度可为 1(直接返回该元素)。\n要求: 请使用 O(n) 时间、O(1) 额外空间的**多数投票**算法(哈希计数也能过小数据, 但对拍阶段请写正解)。\n本题使用**随机对拍**: 与 O(n^2) 暴力计数参考实现比对 300 组随机用例。",
      "mode": "stress",
      "entry": {
        "method": "solve",
        "params": [
          "int[]"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 6000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int solve(int[] a) {\n        // TODO: 第一趟投票选出候选 cand 和计数 count\n        // TODO: 第二趟必须复核 cand 是否真的超过一半, 否则返回 -1\n        return -1;\n    }\n}\n",
      "solution": "public class Main {\n    public static int solve(int[] a) {\n        long cand = 0L, count = 0L;\n        for (int x : a) {\n            if (count == 0L) { cand = x; count = 1L; }\n            else if (x == cand) count++;\n            else count--;\n        }\n        long freq = 0L;\n        for (int x : a) if (x == cand) freq++;\n        return freq * 2 > a.length ? (int) cand : -1;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "3,2,3"
          ],
          "expect": "3",
          "cmp": "exact"
        },
        {
          "name": "无多数",
          "args": [
            "2,2,1,1,1,2,2"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "恰好一半",
          "args": [
            "1,2"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "单元素",
          "args": [
            "7"
          ],
          "expect": "7",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全相同",
          "args": [
            "-5,-5,-5"
          ],
          "expect": "-5",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20260606,
        "gen": "public class Gen { public static String[] gen(java.util.Random r){ int n=1+r.nextInt(12); StringBuilder b=new StringBuilder(); for(int i=0;i<n;i++){ if(i>0) b.append((char)44); b.append(r.nextInt(4)); } return new String[]{ b.toString() }; } }",
        "ref": "public class Ref { public static int solve(int[] a){ int best=-1; for(int i=0;i<a.length;i++){ int c=0; for(int j=0;j<a.length;j++) if(a[j]==a[i]) c++; if(c*2>a.length){ best=a[i]; break; } } return best; } }"
      },
      "hints": [
        "投票只保证『若存在多数元素, 它一定是 cand』, 所以第二趟复核不能省",
        "判断条件写 freq * 2 > n, 别写成 freq >= n/2(恰好一半会被误判)"
      ]
    },
    {
      "id": "ch04-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计可变长动态数组 IntList",
      "tags": [
        "设计",
        "动态初始化",
        "扩容",
        "System.arraycopy"
      ],
      "q": "在同一文件中实现 class IntList(不要改类名, public class Main 保留为空占位)。\n要求实现课程『数组动态初始化』的真实语义: 内部用 int[] 存储, 容量不足时按 2 倍扩容, 并提供以下方法 ——\n  IntList() 构造空表; add(int x) 尾部追加; get(int i) 读取下标 i; set(int i, int x) 写入并返回旧值; size() 返回元素个数; capacity() 返回当前容量; toArray() 返回长度恰为 size 的元素副本; average() 返回所有元素的平均值(空表返回 0.0)。\n判题会按操作序列调用你的类: 无返回值的操作期望 null, int 返回按整数, double 返回按 1.0 形式。\n要求 add 的**均摊**复杂度为 O(1)。",
      "mode": "design",
      "entry": {
        "className": "IntList"
      },
      "ops": [
        [
          "IntList",
          []
        ],
        [
          "size",
          []
        ],
        [
          "capacity",
          []
        ],
        [
          "add",
          [
            10
          ]
        ],
        [
          "add",
          [
            20
          ]
        ],
        [
          "add",
          [
            30
          ]
        ],
        [
          "size",
          []
        ],
        [
          "get",
          [
            0
          ]
        ],
        [
          "get",
          [
            2
          ]
        ],
        [
          "set",
          [
            1,
            99
          ]
        ],
        [
          "get",
          [
            1
          ]
        ],
        [
          "toArray",
          []
        ],
        [
          "average",
          []
        ],
        [
          "size",
          []
        ]
      ],
      "expect": [
        "null",
        "0",
        "0",
        "null",
        "null",
        "null",
        "3",
        "10",
        "30",
        "20",
        "99",
        "[10,99,30]",
        "46.333333333333336",
        "3"
      ],
      "cmp": "exact",
      "starter": "class IntList {\n    // TODO: 三个字段就够了: int[] data; int size; (容量即 data.length)\n    // TODO: add 前先 ensureCapacity, 满了就扩容到 max(1, data.length * 2)\n    public IntList() { }\n    public void add(int x) { }\n    public int get(int i) { return 0; }\n    public int set(int i, int x) { return 0; }\n    public int size() { return 0; }\n    public int capacity() { return 0; }\n    public int[] toArray() { return new int[0]; }\n    public double average() { return 0.0; }\n}\n\npublic class Main { }\n",
      "solution": "class IntList {\n    private int[] data = new int[0];\n    private int size = 0;\n\n    public IntList() { }\n\n    private void ensureCapacity(int need) {\n        if (need <= data.length) return;\n        int cap = Math.max(1, data.length == 0 ? 1 : data.length * 2);\n        while (cap < need) cap *= 2;\n        int[] n = new int[cap];\n        System.arraycopy(data, 0, n, 0, size);\n        data = n;\n    }\n\n    public void add(int x) {\n        ensureCapacity(size + 1);\n        data[size++] = x;\n    }\n\n    public int get(int i) { return data[i]; }\n\n    public int set(int i, int x) {\n        int old = data[i];\n        data[i] = x;\n        return old;\n    }\n\n    public int size() { return size; }\n\n    public int capacity() { return data.length; }\n\n    public int[] toArray() {\n        int[] r = new int[size];\n        System.arraycopy(data, 0, r, 0, size);\n        return r;\n    }\n\n    public double average() {\n        if (size == 0) return 0.0;\n        long s = 0L;\n        for (int i = 0; i < size; i++) s += data[i];\n        return (double) s / size;\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "capacity 返回的是内部数组**已分配**长度, size 返回有效元素个数, 两者不能混",
        "扩容必须用 System.arraycopy 把手里的 size 个元素搬过去, 只搬 data.length 会带脏数据",
        "toArray 要返回新数组: 直接把 data 返回会把剩余容量一起暴露出去"
      ]
    },
    {
      "id": "ch04-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计定长环形缓冲区 RingBuffer",
      "tags": [
        "设计",
        "环形数组",
        "取模",
        "覆盖写"
      ],
      "q": "在同一文件中实现 class RingBuffer(不要改类名, public class Main 保留为空占位)。\n这是一个**固定容量**的环形缓冲区: 写满后继续写入会覆盖最旧的数据, 并提供以下方法 ——\n  RingBuffer(int capacity) 构造, capacity ≥ 1; push(int x) 写入(满了覆盖最旧并返回 true, 否则返回 false); pop() 弹出并返回最旧元素(空则返回 -1); peek() 只看不弹(空则返回 -1); size() 当前元素个数; isFull(); isEmpty(); toArray() 按**从旧到新**顺序返回元素。\n判题会按操作序列调用你的类, 无返回值/boolean/int 按各自形式比对。\n要求所有操作 O(1), 不允许用 ArrayList 每次 remove(0) 模拟。",
      "mode": "design",
      "entry": {
        "className": "RingBuffer"
      },
      "ops": [
        [
          "RingBuffer",
          [
            3
          ]
        ],
        [
          "isEmpty",
          []
        ],
        [
          "push",
          [
            1
          ]
        ],
        [
          "push",
          [
            2
          ]
        ],
        [
          "push",
          [
            3
          ]
        ],
        [
          "isFull",
          []
        ],
        [
          "size",
          []
        ],
        [
          "peek",
          []
        ],
        [
          "toArray",
          []
        ],
        [
          "push",
          [
            4
          ]
        ],
        [
          "size",
          []
        ],
        [
          "toArray",
          []
        ],
        [
          "pop",
          []
        ],
        [
          "toArray",
          []
        ],
        [
          "pop",
          []
        ],
        [
          "pop",
          []
        ],
        [
          "pop",
          []
        ],
        [
          "isEmpty",
          []
        ]
      ],
      "expect": [
        "null",
        "true",
        "false",
        "false",
        "false",
        "true",
        "3",
        "1",
        "[1,2,3]",
        "true",
        "3",
        "[2,3,4]",
        "2",
        "[3,4]",
        "3",
        "4",
        "-1",
        "true"
      ],
      "cmp": "exact",
      "starter": "class RingBuffer {\n    // TODO: 用 int[] + head(最旧位置) + size 表示状态, 不要搬运元素\n    // TODO: 新元素落点下标 = (head + size) % capacity\n    // TODO: 满了 push 时覆盖 head 位置并把 head 前移一格\n    public RingBuffer(int capacity) { }\n    public boolean push(int x) { return false; }\n    public int pop() { return -1; }\n    public int peek() { return -1; }\n    public int size() { return 0; }\n    public boolean isFull() { return false; }\n    public boolean isEmpty() { return true; }\n    public int[] toArray() { return new int[0]; }\n}\n\npublic class Main { }\n",
      "solution": "class RingBuffer {\n    private final int[] data;\n    private int head = 0;\n    private int count = 0;\n\n    public RingBuffer(int capacity) {\n        data = new int[capacity];\n    }\n\n    public boolean push(int x) {\n        boolean full = (count == data.length);\n        if (full) {\n            data[head] = x;\n            head = (head + 1) % data.length;\n        } else {\n            data[(head + count) % data.length] = x;\n            count++;\n        }\n        return full;\n    }\n\n    public int pop() {\n        if (count == 0) return -1;\n        int v = data[head];\n        head = (head + 1) % data.length;\n        count--;\n        return v;\n    }\n\n    public int peek() {\n        return count == 0 ? -1 : data[head];\n    }\n\n    public int size() { return count; }\n\n    public boolean isFull() { return count == data.length; }\n\n    public boolean isEmpty() { return count == 0; }\n\n    public int[] toArray() {\n        int[] r = new int[count];\n        for (int i = 0; i < count; i++) r[i] = data[(head + i) % data.length];\n        return r;\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "head 指向最旧元素, 新元素写在下标 (head + count) % capacity 上",
        "覆盖写时不要 count++, 它已经等于容量了",
        "toArray 必须从 head 开始按 head+i 取模绕一圈, 直接遍历 data 顺序是错的"
      ]
    },
    {
      "id": "ch04-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计 O(1) 随机集合 RandomizedSet",
      "tags": [
        "设计",
        "动态数组+哈希",
        "随机访问",
        "交换删除",
        "Boss"
      ],
      "q": "本章 Boss。在同一文件中实现 class RandomizedSet(不要改类名, public class Main 保留为空占位)。\n要求三个操作**平均 O(1)** ——\n  RandomizedSet() 构造空集合; insert(int v) 若 v 不存在则加入并返回 true, 已存在返回 false; remove(int v) 若 v 存在则删除并返回 true, 不存在返回 false; getRandom() 等概率随机返回一个当前元素(集合非空时调用, 判题不会在空集上调用);\n  toArray() 返回当前全部元素(升序)。\n判题会按操作序列调用你的类; 由于 getRandom 结果随机, 判题序列保证每次调用时集合内**恰好只有一个**元素。\n提示: 动态数组存元素 + HashMap 存『值 → 数组下标』, 删除时把末尾元素换到待删位置再 shrink, 才能让 O(1) 删除成立。",
      "mode": "design",
      "entry": {
        "className": "RandomizedSet"
      },
      "ops": [
        [
          "RandomizedSet",
          []
        ],
        [
          "insert",
          [
            1
          ]
        ],
        [
          "insert",
          [
            2
          ]
        ],
        [
          "insert",
          [
            2
          ]
        ],
        [
          "toArray",
          []
        ],
        [
          "getRandom",
          []
        ],
        [
          "remove",
          [
            1
          ]
        ],
        [
          "remove",
          [
            1
          ]
        ],
        [
          "getRandom",
          []
        ],
        [
          "insert",
          [
            2
          ]
        ],
        [
          "remove",
          [
            2
          ]
        ],
        [
          "insert",
          [
            5
          ]
        ],
        [
          "getRandom",
          []
        ],
        [
          "insert",
          [
            6
          ]
        ],
        [
          "remove",
          [
            5
          ]
        ],
        [
          "getRandom",
          []
        ],
        [
          "toArray",
          []
        ]
      ],
      "expect": [
        "null",
        "true",
        "true",
        "false",
        "[1,2]",
        "1",
        "true",
        "false",
        "2",
        "false",
        "true",
        "true",
        "5",
        "true",
        "true",
        "6",
        "[6]"
      ],
      "cmp": "exact",
      "starter": "class RandomizedSet {\n    // TODO: int[] vals + int size 作为元素池(动态数组语义)\n    // TODO: java.util.HashMap<Integer,Integer> 维护『值 -> 在 vals 中的下标』\n    // TODO: remove 时先把末尾元素搬到待删下标, 再 size--, 同步修正 map\n    public RandomizedSet() { }\n    public boolean insert(int v) { return false; }\n    public boolean remove(int v) { return false; }\n    public int getRandom() { return 0; }\n    public int[] toArray() { return new int[0]; }\n}\n\npublic class Main { }\n",
      "solution": "import java.util.*;\n\nclass RandomizedSet {\n    private int[] vals = new int[8];\n    private int size = 0;\n    private final HashMap<Integer, Integer> idx = new HashMap<>();\n    private final Random rnd = new Random(20260404L);\n\n    public RandomizedSet() { }\n\n    public boolean insert(int v) {\n        if (idx.containsKey(v)) return false;\n        if (size == vals.length) {\n            int[] n = new int[vals.length * 2];\n            System.arraycopy(vals, 0, n, 0, size);\n            vals = n;\n        }\n        vals[size] = v;\n        idx.put(v, size);\n        size++;\n        return true;\n    }\n\n    public boolean remove(int v) {\n        Integer pos = idx.get(v);\n        if (pos == null) return false;\n        int last = vals[size - 1];\n        vals[pos] = last;\n        idx.put(last, pos);\n        idx.remove(v);\n        size--;\n        return true;\n    }\n\n    public int getRandom() {\n        return vals[rnd.nextInt(size)];\n    }\n\n    public int[] toArray() {\n        int[] r = new int[size];\n        System.arraycopy(vals, 0, r, 0, size);\n        Arrays.sort(r);\n        return r;\n    }\n}\n\npublic class Main { }\n",
      "tests": [],
      "hints": [
        "只有『值 → 数组下标』这一张表, 才能让 remove 先 O(1) 定位再 O(1) 交换删除",
        "交换删除后别忘了把被搬走的末尾元素的新下标写回 map; 删的恰好是末尾时要避免自己覆盖自己",
        "getRandom 直接对 vals[0..size-1] 取随机下标即可, 不需要额外集合"
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "RandomizedSet",
              []
            ],
            [
              "insert",
              [
                1
              ]
            ],
            [
              "insert",
              [
                2
              ]
            ],
            [
              "insert",
              [
                2
              ]
            ],
            [
              "toArray",
              []
            ],
            [
              "getRandom",
              []
            ],
            [
              "remove",
              [
                1
              ]
            ],
            [
              "remove",
              [
                1
              ]
            ],
            [
              "getRandom",
              []
            ],
            [
              "insert",
              [
                2
              ]
            ],
            [
              "remove",
              [
                2
              ]
            ],
            [
              "insert",
              [
                5
              ]
            ],
            [
              "getRandom",
              []
            ],
            [
              "insert",
              [
                6
              ]
            ],
            [
              "remove",
              [
                5
              ]
            ],
            [
              "getRandom",
              []
            ],
            [
              "toArray",
              []
            ]
          ],
          "expect": [
            "null",
            "true",
            "true",
            "false",
            "[1,2]",
            "1",
            "true",
            "false",
            "2",
            "false",
            "true",
            "true",
            "5",
            "true",
            "true",
            "6",
            "[6]"
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "RandomizedSet"
            ],
            [
              "remove",
              [
                5
              ]
            ],
            [
              "insert",
              [
                -1
              ]
            ],
            [
              "insert",
              [
                3
              ]
            ],
            [
              "insert",
              [
                7
              ]
            ],
            [
              "remove",
              [
                3
              ]
            ],
            [
              "remove",
              [
                -1
              ]
            ],
            [
              "toArray"
            ],
            [
              "getRandom"
            ],
            [
              "insert",
              [
                9
              ]
            ],
            [
              "remove",
              [
                7
              ]
            ],
            [
              "getRandom"
            ],
            [
              "remove",
              [
                9
              ]
            ],
            [
              "insert",
              [
                0
              ]
            ],
            [
              "getRandom"
            ],
            [
              "toArray"
            ]
          ],
          "expect": [
            "null",
            "false",
            "true",
            "true",
            "true",
            "true",
            "true",
            "[7]",
            "7",
            "true",
            "true",
            "9",
            "true",
            "true",
            "0",
            "[0]"
          ],
          "hidden": true
        }
      ]
    }
  ]
});
