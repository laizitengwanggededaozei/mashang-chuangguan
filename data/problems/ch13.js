window.JQ_PROBLEMS = window.JQ_PROBLEMS || [];
window.JQ_PROBLEMS.push({
  "ch": 13,
  "title": "阶段项目: 回合制 RPG 战斗系统",
  "courseRef": "黑马第13章-阶段项目篇",
  "levels": [
    {
      "id": "ch13-L01",
      "order": 1,
      "stage": "基础语感",
      "title": "最小伤害结算",
      "tags": [
        "伤害计算",
        "边界",
        "分支"
      ],
      "q": "回合制战斗中最基础的伤害公式:实现方法 damage(int atk, int def),返回一次普通攻击造成的伤害。规则:基础伤害 = atk − def;为了保证每次攻击至少留下 1 点效果,若结果小于 1 则按 1 返回。约束:0 ≤ atk ≤ 100000,0 ≤ def ≤ 100000。边界:防御力高于攻击力时必须返回 1(而不是 0 或负数);攻防相等也返回 1;两者都为 0 同样返回 1。要求 O(1)。",
      "mode": "method",
      "entry": {
        "method": "damage",
        "params": [
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int damage(int atk, int def) {\n        // TODO: 用 Math.max(1, atk - def) 兜住下限\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int damage(int atk, int def) {\n        int d = atk - def;\n        return d < 1 ? 1 : d;\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "50",
            "30"
          ],
          "expect": "20",
          "cmp": "exact"
        },
        {
          "name": "破防为零",
          "args": [
            "20",
            "20"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "高防御",
          "args": [
            "5",
            "100"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "双方为零",
          "args": [
            "0",
            "0"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "不要写成 if (d < 0) return 0, 下界是 1 而不是 0",
        "一行 Math.max 即可, 注意不要用 abs 掩盖负数"
      ]
    },
    {
      "id": "ch13-L02",
      "order": 2,
      "stage": "基础语感",
      "title": "暴击期望伤害",
      "tags": [
        "期望值",
        "整数除法",
        "精度"
      ],
      "q": "角色有暴击率,需要计算多次攻击的平均伤害:实现 critDamage(int atk, int critRate, int critMul)。普通伤害为 atk;暴击伤害为 atk * critMul / 100 向下取整(整数除法);期望 = (普通伤害 * (100 − critRate) + 暴击伤害 * critRate) / 100 向下取整。约束:0 ≤ atk ≤ 100000,0 ≤ critRate ≤ 100,100 ≤ critMul ≤ 500。边界:critRate=0 时期望必须恰好等于 atk(不允许出现精度损失);critRate=100 时期望必须等于暴击伤害。请全程使用 long 中间量,禁止使用浮点数。",
      "mode": "method",
      "entry": {
        "method": "critDamage",
        "params": [
          "int",
          "int",
          "int"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int critDamage(int atk, int critRate, int critMul) {\n        // TODO: 先算暴击伤害(向下取整), 再加权平均\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int critDamage(int atk, int critRate, int critMul) {\n        long base = atk;\n        long crit = base * critMul / 100L;\n        return (int) ((base * (100L - critRate) + crit * critRate) / 100L);\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "100",
            "30",
            "200"
          ],
          "expect": "130",
          "cmp": "exact"
        },
        {
          "name": "零暴击率",
          "args": [
            "77",
            "0",
            "200"
          ],
          "expect": "77",
          "cmp": "exact"
        },
        {
          "name": "必暴",
          "args": [
            "100",
            "100",
            "250"
          ],
          "expect": "250",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "取整方向",
          "args": [
            "1",
            "50",
            "101"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "critMul 的除法必须先做, 顺序错了期望会偏大",
        "critRate=0 时暴击项权重为 0, 结果必须精确等于 atk"
      ]
    },
    {
      "id": "ch13-L03",
      "order": 3,
      "stage": "基础语感",
      "title": "经验与升级",
      "tags": [
        "模拟",
        "循环",
        "长整型"
      ],
      "q": "战斗结束后要结算经验:实现 levelUp(int level, long exp)。角色从等级 level 出发,升到 L 级所需经验为 100 * L * L(L 为当前等级,例如 1 级升 2 级需要 100,2 级升 3 级需要 400)。经验足够就立即升级并扣除,剩余经验继续参与下一次判定,直到不足以升级为止。返回 int[]{ 最终等级, 剩余经验 }。约束:1 ≤ level ≤ 200,0 ≤ exp ≤ 10^12,等级允许一直升到经验不足为止(可能远超 200)。边界:exp=0 时原地返回;恰好等于需求时必须升级且剩余为 0;经验足够连升多级时不能只升一级。注意需求随等级平方增长,累加时必须用 long。",
      "mode": "method",
      "entry": {
        "method": "levelUp",
        "params": [
          "int",
          "long"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] levelUp(int level, long exp) {\n        // TODO: while (exp >= need) { exp -= need; level++; need = 100L*level*level; }\n        return new int[]{level, 0};\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] levelUp(int level, long exp) {\n        int lv = level;\n        long need = 100L * lv * lv;\n        while (exp >= need) { exp -= need; lv++; need = 100L * lv * lv; }\n        return new int[]{ lv, (int) exp };\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1",
            "150"
          ],
          "expect": "[2,50]",
          "cmp": "exact"
        },
        {
          "name": "零经验",
          "args": [
            "5",
            "0"
          ],
          "expect": "[5,0]",
          "cmp": "exact"
        },
        {
          "name": "恰好升级",
          "args": [
            "2",
            "400"
          ],
          "expect": "[3,0]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "连升多级",
          "args": [
            "1",
            "1000000"
          ],
          "expect": "[31,54500]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "需求是 100L*level*level, 用 int 计算会在高等级溢出",
        "每升一级都要用新等级重新计算需求, 不能沿用旧值"
      ]
    },
    {
      "id": "ch13-L04",
      "order": 4,
      "stage": "组合运用",
      "title": "背包容量与最大战力",
      "tags": [
        "动态规划",
        "0/1背包",
        "空间优化"
      ],
      "q": "出发前要装背包:实现 maxValue(int capacity, int[] weights, int[] values),weights[i] 与 values[i] 分别是第 i 件装备的重量与战力,每件装备最多带一份,求总重量不超过 capacity 时的最大总战力。约束:0 ≤ capacity ≤ 1000,0 ≤ 装备数 ≤ 100,1 ≤ weights[i] ≤ 1000,0 ≤ values[i] ≤ 10000;weights 与 values 长度相同。边界:capacity=0 或没有装备时返回 0;单件超重的装备不能装;恰好装满与不装满都允许。要求 O(n * capacity) 时间、O(capacity) 空间。",
      "mode": "method",
      "entry": {
        "method": "maxValue",
        "params": [
          "int",
          "int[]",
          "int[]"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int maxValue(int capacity, int[] weights, int[] values) {\n        // TODO: 一维 dp, 容量从大到小枚举, 保证每件只用一次\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int maxValue(int capacity, int[] weights, int[] values) {\n        int[] dp = new int[capacity + 1];\n        for (int i = 0; i < weights.length; i++)\n            for (int c = capacity; c >= weights[i]; c--)\n                if (dp[c - weights[i]] + values[i] > dp[c]) dp[c] = dp[c - weights[i]] + values[i];\n        return dp[capacity];\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "10",
            "5,4,6,3",
            "10,40,30,50"
          ],
          "expect": "90",
          "cmp": "exact"
        },
        {
          "name": "单件超重",
          "args": [
            "3",
            "5",
            "100"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "容量为零",
          "args": [
            "0",
            "1,2",
            "10,20"
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "恰好装满",
          "args": [
            "6",
            "2,2,2",
            "3,4,5"
          ],
          "expect": "12",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "一维滚动数组必须从 capacity 倒着枚举到 weights[i], 正序会把同一件装备算两次",
        "没有装备时要返回 0, 注意 dp 初值本来就是 0"
      ]
    },
    {
      "id": "ch13-L05",
      "order": 5,
      "stage": "组合运用",
      "title": "战斗前的属性加成",
      "tags": [
        "字符串解析",
        "四舍五入",
        "不可变性"
      ],
      "q": "战斗前会叠加多种增益:实现 finalStats(int[] base, String[] buffs)。base 依次是基础攻击力、防御力、速度。buffs 中每个元素形如 \"KEY:VALUE\" 或 \"KEY:VALUE*N\",以英文半角冒号分隔:KEY 为 POW/DEF/SPD 时对应属性乘以 VALUE(可以是小数);KEY 为 ALL 时三项属性先各加 VALUE*N(N 缺省为 1)。所有加成按数组顺序作用,乘区只乘、加区只加,两者互不干扰,最后一次性取整。返回 int[]{ 攻, 防, 速 }。约束:buffs 长度 ≤ 20,基础值 ≤ 10000,结果不超过 10^7。取整规则:先算 (base + 加区总和) * 乘区,再对 double 结果四舍五入(与 Math.round 一致,不要用强制类型转换截断)。边界:buffs 为空时原样返回;没有乘区时乘数视为 1.0;同一属性的乘区要连乘而不是覆盖。",
      "mode": "method",
      "entry": {
        "method": "finalStats",
        "params": [
          "int[]",
          "String[]"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] finalStats(int[] base, String[] buffs) {\n        // TODO: 先累加加区, 再连乘乘区, 最后 Math.round\n        return new int[]{0, 0, 0};\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] finalStats(int[] base, String[] buffs) {\n        double[] mul = new double[]{ 1.0, 1.0, 1.0 };\n        long flat = 0L;\n        for (String b : buffs) {\n            if (b == null) continue;\n            int i = 0;\n            while (i < b.length() && b.charAt(i) == ' ') i++;\n            int j = i;\n            while (j < b.length() && b.charAt(j) != ':') j++;\n            String key = j < b.length() ? b.substring(i, j) : b.substring(i);\n            String val = j < b.length() ? b.substring(j + 1) : \"\";\n            int s = val.indexOf('*');\n            String main = s < 0 ? val : val.substring(0, s);\n            int times = s < 0 ? 1 : Integer.parseInt(val.substring(s + 1).trim());\n            if (key.equals(\"ALL\")) flat += (long) Integer.parseInt(main.trim()) * times;\n            else if (key.equals(\"POW\")) mul[0] *= Double.parseDouble(main.trim());\n            else if (key.equals(\"DEF\")) mul[1] *= Double.parseDouble(main.trim());\n            else if (key.equals(\"SPD\")) mul[2] *= Double.parseDouble(main.trim());\n        }\n        int[] r = new int[3];\n        for (int t = 0; t < 3; t++) r[t] = (int) Math.round((base[t] + flat) * mul[t]);\n        return r;\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "100,50,30",
            "POW:1.5|ALL:10*2"
          ],
          "expect": "[180,70,50]",
          "cmp": "exact"
        },
        {
          "name": "无增益",
          "args": [
            "80,40,20",
            ""
          ],
          "expect": "[80,40,20]",
          "cmp": "exact"
        },
        {
          "name": "乘区连乘",
          "args": [
            "100,100,100",
            "POW:1.1|POW:1.1"
          ],
          "expect": "[121,100,100]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "四舍五入",
          "args": [
            "1,2,3",
            "DEF:1.5"
          ],
          "expect": "[1,3,3]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先定位冒号分隔 KEY 与 VALUE, 再在 VALUE 里找星号拆出次数 N",
        "乘区累乘、加区累加, 两者在最后一步才合并, 顺序不能颠倒"
      ]
    },
    {
      "id": "ch13-L06",
      "order": 6,
      "stage": "组合运用",
      "title": "命中判定与伤害段数",
      "tags": [
        "模拟",
        "区间夹取",
        "统计"
      ],
      "q": "一次攻击会打出多段伤害,每段独立判定是否命中:实现 hitCount(int acc, int eva, int[] rolls)。实际命中率 rate 取 (acc − eva) 的百分比,但被夹在 [5, 95] 之间(即至少 5%,至多 95%)。rolls 中每个元素是一次独立判定的随机点数(0 ≤ roll ≤ 99),当 roll < rate 时该段命中。返回命中段数。约束:0 ≤ acc,eva ≤ 500,rolls 长度 ≤ 1000。边界:acc 远大于 eva 时命中率封顶 95,不会百发百中;acc 远小于 eva 时命中率保底 5,不会完全打不中;rolls 为空数组时返回 0。",
      "mode": "method",
      "entry": {
        "method": "hitCount",
        "params": [
          "int",
          "int",
          "int[]"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int hitCount(int acc, int eva, int[] rolls) {\n        // TODO: 先夹取命中率, 再统计 roll < rate 的段数\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int hitCount(int acc, int eva, int[] rolls) {\n        int rate = acc - eva;\n        if (rate < 5) rate = 5;\n        if (rate > 95) rate = 95;\n        int hits = 0;\n        for (int r : rolls) if (r < rate) hits++;\n        return hits;\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "120",
            "60",
            "10,59,60,90"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "保底命中",
          "args": [
            "0",
            "200",
            "4,5,0"
          ],
          "expect": "2",
          "cmp": "exact"
        },
        {
          "name": "封顶命中",
          "args": [
            "999",
            "0",
            "94,95,99"
          ],
          "expect": "1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "无判定段",
          "args": [
            "50",
            "50",
            ""
          ],
          "expect": "0",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "先夹取得到 rate, 再逐段比较, 不要在中途重新计算 rate",
        "比较是严格小于 roll < rate, roll 恰好等于 rate 算未命中"
      ]
    },
    {
      "id": "ch13-L07",
      "order": 7,
      "stage": "综合拆解",
      "title": "战斗中的最小药水数",
      "tags": [
        "前缀和",
        "贪心",
        "long"
      ],
      "q": "角色连续经历若干场战斗:实现 minPotions(int startHp, int potion, int[] changes)。角色初始血量 startHp,changes[i] 是第 i 场战斗的血量净变化(负数表示受伤,正数表示回复);角色在任意时刻血量必须 ≥ 1,血量没有上限。每瓶药水可以在任意时刻立即回复 potion 点血量,请返回保证所有战斗顺利进行所需的最少药水瓶数(返回 long)。约束:1 ≤ startHp ≤ 10^9,1 ≤ potion ≤ 10^9,1 ≤ n ≤ 100000,−10^9 ≤ changes[i] ≤ 10^9。要点:把血量写成 startHp + 前缀和,约束等价于 startHp + 最小前缀和 ≥ 1;若还差 need 点血,则需要 ceil(need / potion) 瓶。边界:全程血量都 ≥ 1 时返回 0;恰好整除时不要多算一瓶。要求 O(n)。",
      "mode": "method",
      "entry": {
        "method": "minPotions",
        "params": [
          "int",
          "int",
          "int[]"
        ],
        "ret": "long"
      },
      "starter": "public class Main {\n    public static long minPotions(int startHp, int potion, int[] changes) {\n        // TODO: 求前缀和最小值, 再对缺口做向上取整除法\n        return 0L;\n    }\n}\n",
      "solution": "public class Main {\n    public static long minPotions(int startHp, int potion, int[] changes) {\n        long min = 0L, sum = 0L;\n        for (int x : changes) {\n            sum += x;\n            if (sum < min) min = sum;\n        }\n        long need = 1L - startHp - min;\n        if (need <= 0) return 0L;\n        return (need + potion - 1) / potion;\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "10",
            "4",
            "-5,-12,-9"
          ],
          "expect": "5",
          "cmp": "exact"
        },
        {
          "name": "无需药水",
          "args": [
            "100",
            "10",
            "-50,20,-30"
          ],
          "expect": "0",
          "cmp": "exact"
        },
        {
          "name": "恰好整除",
          "args": [
            "1",
            "5",
            "-10"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "需要向上取整",
          "args": [
            "1",
            "4",
            "-10"
          ],
          "expect": "3",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "极大缺口",
          "args": [
            "1",
            "1",
            "-1000000000"
          ],
          "expect": "1000000000",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "前缀和最小值要包含空前缀 0, 否则会漏掉第一场就掉光的情况",
        "向上取整写法 (need + potion - 1) / potion, 且 need ≤ 0 时直接返回 0"
      ]
    },
    {
      "id": "ch13-L08",
      "order": 8,
      "stage": "综合拆解",
      "title": "最大连击段",
      "tags": [
        "滑动窗口",
        "双指针",
        "单调性"
      ],
      "q": "连击系统:实现 bestCombo(int[] dmg, int stamina),dmg[i] 是第 i 次攻击的伤害,stamina 是本次连击允许的最大攻击次数。一段连击是数组的一个连续子数组,必须同时满足:1) 段内伤害严格递增(后一个严格大于前一个);2) 段长不超过 stamina。返回 int[]{ 段起点下标, 段终点下标, 段内伤害总和 }。若存在多个总和最大的段,返回起点下标最小的那一段(评测按值精确比较)。约束:1 ≤ n ≤ 100000,−10^4 ≤ dmg[i] ≤ 10^4,1 ≤ stamina ≤ n。要点:枚举段终点 r,段和 = pre[r+1] − pre[j],要让段和最大就要在合法窗口内取最小的 pre[j],用单调队列维护窗口最小值即可 O(n)。边界:stamina 为 1 时只能返回单个元素;递增链一被打破就必须把窗口左界重置到当前位置;元素可能全为负数,此时答案仍是其中最大的单个元素(不要初始化为 0)。",
      "mode": "method",
      "entry": {
        "method": "bestCombo",
        "params": [
          "int[]",
          "int"
        ],
        "ret": "int[]"
      },
      "starter": "public class Main {\n    public static int[] bestCombo(int[] dmg, int stamina) {\n        // TODO: 前缀和 + 单调队列, 枚举终点 r 并取窗口内最小前缀和\n        return new int[]{0, 0, 0};\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] bestCombo(int[] dmg, int stamina) {\n        int n = dmg.length;\n        long[] pre = new long[n + 1];\n        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + dmg[i];\n        int[] dq = new int[n + 1];\n        int head = 0, tail = 0;\n        int runStart = 0;\n        long bestSum = Long.MIN_VALUE;\n        int bestL = 0, bestR = 0;\n        for (int r = 0; r < n; r++) {\n            if (r > 0 && dmg[r] <= dmg[r - 1]) runStart = r;\n            int lo = Math.max(runStart, r - stamina + 1);\n            while (tail > head && pre[dq[tail - 1]] >= pre[r]) tail--;\n            dq[tail++] = r;\n            while (head < tail && dq[head] < lo) head++;\n            int j = dq[head];\n            long sum = pre[r + 1] - pre[j];\n            if (sum > bestSum) { bestSum = sum; bestL = j; bestR = r; }\n        }\n        return new int[]{ bestL, bestR, (int) bestSum };\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "1,2,3,2,5",
            "3"
          ],
          "expect": "[3,4,7]",
          "cmp": "exact"
        },
        {
          "name": "单次连击",
          "args": [
            "5,-1,9",
            "1"
          ],
          "expect": "[2,2,9]",
          "cmp": "exact"
        },
        {
          "name": "全等元素",
          "args": [
            "7,7,7",
            "3"
          ],
          "expect": "[0,0,7]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "超长递增链",
          "args": [
            "1,2,3,4,5",
            "2"
          ],
          "expect": "[3,4,9]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全为负伤",
          "args": [
            "-5,-1,-9",
            "2"
          ],
          "expect": "[1,1,-1]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "不要只比较\"以 r 结尾的整段\", 合法段可以是该递增段内长度不超过 stamina 的任意后缀",
        "单调队列里存下标, 队首是窗口内前缀和最小的位置; 相等前缀和时保留更靠前的下标"
      ]
    },
    {
      "id": "ch13-L09",
      "order": 9,
      "stage": "综合拆解",
      "title": "战斗日志解析与统计",
      "tags": [
        "字符串解析",
        "状态机",
        "哨兵编码"
      ],
      "q": "把一场战斗的日志还原成统计数据:实现 parseLog(String log)。log 由若干行组成,行之间用换行符分隔,每行是以下三种之一:\"R dmg\"(受到 dmg 点伤害)、\"HEAL amount\"(回复 amount 点血量)、\"POTION\"(使用一瓶药水,无参数)。规则:初始血量 100,血量上限 100(回复后不得超过上限),受到伤害后不得低于 0。每遇到一行 R 就计一个回合;每当一次伤害让血量首次变为 0,胜利计数加一(血量已经是 0 时继续挨打只加回合数,不重复计胜)。POTION 行累加药水数。空行与首尾空白要跳过。请返回哨兵编码 hp*1000000 + wins*10000 + rounds*100 + potions。约束:行数 ≤ 1000,dmg 与 amount 在 [1, 200] 内。边界:空串返回 100000000;回复不能突破上限 100。",
      "mode": "method",
      "entry": {
        "method": "parseLog",
        "params": [
          "String"
        ],
        "ret": "int"
      },
      "starter": "public class Main {\n    public static int parseLog(String log) {\n        // TODO: 按行扫描, 维护 hp/wins/rounds/potions\n        return 0;\n    }\n}\n",
      "solution": "public class Main {\n    public static int parseLog(String log) {\n        String[] lines = log.split(String.valueOf((char) 10), -1);\n        int hp = 100, wins = 0, rounds = 0, potions = 0;\n        for (String raw : lines) {\n            String line = raw.trim();\n            if (line.length() == 0) continue;\n            String[] p = line.split(\" \", -1);\n            if (p[0].equals(\"R\")) {\n                rounds++;\n                int dmg = Integer.parseInt(p[1].trim());\n                if (hp > 0) {\n                    hp -= dmg;\n                    if (hp < 0) hp = 0;\n                    if (hp == 0) wins++;\n                }\n            } else if (p[0].equals(\"HEAL\")) {\n                int amt = Integer.parseInt(p[1].trim());\n                hp += amt;\n                if (hp > 100) hp = 100;\n            } else if (p[0].equals(\"POTION\")) {\n                potions++;\n            } else {\n                throw new RuntimeException(\"bad command: \" + line);\n            }\n        }\n        return hp * 1000000 + wins * 10000 + rounds * 100 + potions;\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "R 30\nR 70\nHEAL 40\nPOTION\nR 150"
          ],
          "expect": "20301",
          "cmp": "exact"
        },
        {
          "name": "空日志",
          "args": [
            ""
          ],
          "expect": "100000000",
          "cmp": "exact"
        },
        {
          "name": "回复封顶",
          "args": [
            "R 10\nHEAL 50\nPOTION\nPOTION"
          ],
          "expect": "100000102",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "死亡后继续挨打",
          "args": [
            "R 100\nR 50\nR 50\nPOTION"
          ],
          "expect": "10301",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "hints": [
        "用 split(String.valueOf((char)10), -1) 切行, 避免正则与转义问题",
        "wins 只在血量由正变 0 的那一刻加一, 所以要先看扣血前的 hp 是否大于 0"
      ]
    },
    {
      "id": "ch13-L10",
      "order": 10,
      "stage": "算法深潜",
      "title": "伪随机序列的可复现性",
      "tags": [
        "线性同余",
        "溢出",
        "随机对拍"
      ],
      "q": "战斗中的暴击与命中都依赖伪随机数,服务端与客户端必须算出完全相同的序列:实现 lcg(int seed, int a, int c, int m, int n),按 x[i] = (x[i-1] * a + c) mod m 生成序列,初值 x[0] = seed,返回 int[]{ x[1], x[2], ..., x[n] }(不包含 seed 本身)。约束:1 ≤ m ≤ 2^31 − 1,0 ≤ a,c ≤ 10^9,|seed| ≤ 10^9,0 ≤ n ≤ 256。要点:中间乘积必须用 64 位处理,严禁用 double 或 32 位 int 直接相乘,否则模运算会算错。边界:n=0 返回空数组;seed 为负数时必须先取模修正到 [0, m) 区间。本题使用随机对拍:你的实现会与 BigInteger 参考实现在大量随机用例上比对。",
      "mode": "stress",
      "entry": {
        "method": "lcg",
        "params": [
          "int",
          "int",
          "int",
          "int",
          "int"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] lcg(int seed, int a, int c, int m, int n) {\n        // TODO: 用 long 保存状态, 先修正 seed 再迭代 n 次\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] lcg(int seed, int a, int c, int m, int n) {\n        if (n <= 0) return new int[0];\n        int[] r = new int[n];\n        long x = seed % (long) m;\n        if (x < 0) x += m;\n        long A = a, C = c, M = m;\n        for (int i = 0; i < n; i++) {\n            x = (x * A + C) % M;\n            r[i] = (int) x;\n        }\n        return r;\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "7",
            "1103515245",
            "12345",
            "2147483647",
            "3"
          ],
          "expect": "[1282168119,317105233,60898434]",
          "cmp": "exact"
        },
        {
          "name": "小模数",
          "args": [
            "0",
            "5",
            "3",
            "100",
            "4"
          ],
          "expect": "[3,18,93,68]",
          "cmp": "exact"
        },
        {
          "name": "零长度",
          "args": [
            "1",
            "2",
            "3",
            "100",
            "0"
          ],
          "expect": "[]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "负种子",
          "args": [
            "-5",
            "3",
            "7",
            "97",
            "2"
          ],
          "expect": "[89,80]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 300,
        "seed": 20261313,
        "gen": "public class Gen {\n    public static String[] gen(java.util.Random r) {\n        int mode = r.nextInt(3);\n        int m, a, c;\n        if (mode == 0) { m = 2 + r.nextInt(99); a = r.nextInt(1000); c = r.nextInt(1000); }\n        else if (mode == 1) { m = 2147483647; a = 1 + r.nextInt(100000); c = r.nextInt(100000); }\n        else { m = 1000000000 + r.nextInt(1000000); a = 1000000000 + r.nextInt(1000000); c = 1000000000 + r.nextInt(1000000); }\n        int seed = r.nextInt(2000000) - 1000000;\n        int n = r.nextInt(60);\n        return new String[]{ String.valueOf(seed), String.valueOf(a), String.valueOf(c), String.valueOf(m), String.valueOf(n) };\n    }\n}",
        "ref": "public class Ref {\n    public static int[] lcg(int seed, int a, int c, int m, int n) {\n        if (n <= 0) return new int[0];\n        int[] r = new int[n];\n        java.math.BigInteger BM = java.math.BigInteger.valueOf(m);\n        java.math.BigInteger x = java.math.BigInteger.valueOf(seed).mod(BM);\n        for (int i = 0; i < n; i++) {\n            x = x.multiply(java.math.BigInteger.valueOf(a)).add(java.math.BigInteger.valueOf(c)).mod(BM);\n            r[i] = x.intValue();\n        }\n        return r;\n    }\n}"
      },
      "hints": [
        "seed % m 在 Java 里可能是负数, 要判断后加回 m",
        "m 取到 2^31-1 时 x*a 可达 2^61 量级, long 刚好够用"
      ]
    },
    {
      "id": "ch13-L11",
      "order": 11,
      "stage": "算法深潜",
      "title": "战斗结算与朴素模拟一致性",
      "tags": [
        "回合制模拟",
        "随机对拍",
        "边界"
      ],
      "q": "把一场多人混战结算写成一个纯函数:实现 rounds(int[] players, int[] enemies)。players[i] 是我方第 i 名角色的攻击力,enemies[j] 是敌方第 j 名的攻击力,双方全员满血 120。回合循环如下:我方按 0,1,2... 的顺序各攻击一次,我方第 i 名攻击敌方第 (i mod 敌方人数) 名;随后敌方按 0,1,2... 的顺序各攻击一次,敌方第 j 名攻击我方第 (j mod 我方人数) 名。攻击已经阵亡的单位不产生任何效果。只要我方有一名角色阵亡就立即判负,返回 −1。若敌方全灭则结束,并返回归属判定:当我方第一名角色的攻击力严格大于敌方攻击力总和时返回 1,否则返回 2。约束:0 ≤ 我方人数 ≤ 6,1 ≤ 敌方人数 ≤ 3,攻击力在 [1, 200](我方)与 [1, 80](敌方)。边界:我方为空时直接返回 −1;先检查敌方是否全灭,再结算敌方回合(被打死的那一轮敌方不能反击)。本题使用随机对拍:你的实现会与参考实现在大量随机用例上比对。",
      "mode": "stress",
      "entry": {
        "method": "rounds",
        "params": [
          "int[]",
          "int[]"
        ],
        "ret": "int"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int rounds(int[] players, int[] enemies) {\n        // TODO: 维护双方血量数组, 逐回合模拟直到一方倒下\n        return -1;\n    }\n}\n",
      "solution": "public class Main {\n    public static int rounds(int[] players, int[] enemies) {\n        if (players.length == 0) return -1;\n        int[] ph = new int[players.length];\n        for (int i = 0; i < players.length; i++) ph[i] = 120;\n        int[] eh = new int[enemies.length];\n        for (int j = 0; j < enemies.length; j++) eh[j] = 120;\n        int killed = 0;\n        while (true) {\n            for (int i = 0; i < players.length; i++) {\n                int t = i % enemies.length;\n                if (eh[t] > 0) { eh[t] -= players[i]; if (eh[t] <= 0) { eh[t] = 0; killed++; } }\n            }\n            if (killed == enemies.length) break;\n            for (int j = 0; j < enemies.length; j++) {\n                int t = j % players.length;\n                if (ph[t] > 0) { ph[t] -= enemies[j]; if (ph[t] <= 0) ph[t] = 0; }\n            }\n            int alive = 0;\n            for (int i = 0; i < players.length; i++) if (ph[i] > 0) alive++;\n            if (alive < players.length) return -1;\n        }\n        long total = 0L;\n        for (int x : enemies) total += x;\n        return players[0] > total ? 1 : 2;\n    }\n}",
      "tests": [
        {
          "name": "样例",
          "args": [
            "50,60",
            "20,20"
          ],
          "expect": "1",
          "cmp": "exact"
        },
        {
          "name": "我方阵亡",
          "args": [
            "1",
            "80,80,80"
          ],
          "expect": "-1",
          "cmp": "exact"
        },
        {
          "name": "无我方角色",
          "args": [
            "",
            "10"
          ],
          "expect": "-1",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "总和判定",
          "args": [
            "30,30",
            "20,20"
          ],
          "expect": "2",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20261414,
        "gen": "public class Gen {\n    public static String[] gen(java.util.Random r) {\n        StringBuilder p = new StringBuilder(), e = new StringBuilder();\n        int np = 1 + r.nextInt(4);\n        int ne = 1 + r.nextInt(3);\n        for (int i = 0; i < np; i++) { if (i > 0) p.append((char) 44); p.append(1 + r.nextInt(120)); }\n        for (int j = 0; j < ne; j++) { if (j > 0) e.append((char) 44); e.append(1 + r.nextInt(60)); }\n        return new String[]{ p.toString(), e.toString() };\n    }\n}",
        "ref": "public class Ref {\n    public static int rounds(int[] players, int[] enemies) {\n        int[] ph = new int[players.length];\n        java.util.Arrays.fill(ph, 120);\n        int[] eh = new int[enemies.length];\n        java.util.Arrays.fill(eh, 120);\n        int np = players.length;\n        int pc = np == 0 ? -1 : 0;\n        if (pc == -1) return -1;\n        int cnt = 0;\n        while (true) {\n            for (int i = 0; i < np; i++) {\n                int t = i % enemies.length;\n                if (eh[t] > 0) { eh[t] -= players[i]; if (eh[t] <= 0) { eh[t] = 0; cnt++; } }\n            }\n            if (cnt == enemies.length) break;\n            for (int j = 0; j < enemies.length; j++) {\n                int t = j % np;\n                if (ph[t] > 0) { ph[t] -= enemies[j]; if (ph[t] <= 0) ph[t] = 0; }\n            }\n            boolean dead = false;\n            for (int i = 0; i < np; i++) if (ph[i] <= 0) dead = true;\n            if (dead) return -1;\n        }\n        int total = 0;\n        for (int x : enemies) total += x;\n        return players[0] > total ? 1 : 2;\n    }\n}"
      },
      "hints": [
        "打完我方所有角色后要先判断敌方是否全灭, 再决定是否结算敌方回合",
        "攻击已阵亡的目标没有效果, 但出手顺序照常推进"
      ]
    },
    {
      "id": "ch13-L12",
      "order": 12,
      "stage": "算法深潜",
      "title": "排行榜名次结算",
      "tags": [
        "二分查找",
        "归并",
        "随机对拍"
      ],
      "q": "关卡结束要把新的战绩插入排行榜:实现 rankAfter(long[] scores, long[] newScores)。scores 是当前榜单上所有玩家的积分,已按非降序排列;newScores 是依次提交的 m 条新成绩。对每条新成绩,先把榜单上积分严格大于它的玩家数记为 c,则它的名次为 c + 1。多条新成绩互不影响,也不插入榜单本身:每条都只与原始榜单比较,新成绩之间不互相计数。返回 int[]{ 第 1 条的名次, 第 2 条的名次, ... }。约束:0 ≤ 榜单人数 ≤ 1e5,1 ≤ 提交条数 ≤ 1e5,积分在 [−1e9, 1e9]。边界:空榜单时任何成绩名次都是 1;并列按严格大于计数(与榜单中同分玩家并列)。单次查询要求 O(log n),整体 O(m log n)。本题使用随机对拍:你的实现会与 O(n*m) 参考实现在大量随机用例上比对。",
      "mode": "stress",
      "entry": {
        "method": "rankAfter",
        "params": [
          "long[]",
          "long[]"
        ],
        "ret": "int[]"
      },
      "limits": {
        "timeMs": 4000,
        "memMb": 256
      },
      "starter": "public class Main {\n    public static int[] rankAfter(long[] scores, long[] newScores) {\n        // TODO: 对每个新成绩二分出第一个严格小于它的位置\n        return new int[0];\n    }\n}\n",
      "solution": "public class Main {\n    public static int[] rankAfter(long[] scores, long[] newScores) {\n        int n = scores.length, m = newScores.length;\n        int[] res = new int[m];\n        for (int t = 0; t < m; t++) {\n            long v = newScores[t];\n            // 榜单升序: 二分找到第一个 > v 的下标 lo, 则严格大于 v 的个数为 n - lo\n            int lo = 0, hi = n;\n            while (lo < hi) {\n                int mid = (lo + hi) >>> 1;\n                if (scores[mid] > v) hi = mid; else lo = mid + 1;\n            }\n            res[t] = (n - lo) + 1;\n        }\n        return res;\n    }\n}\n",
      "tests": [
        {
          "name": "样例",
          "args": [
            "80,90,90,100",
            "95,80"
          ],
          "expect": "[2,4]",
          "cmp": "exact"
        },
        {
          "name": "空榜单",
          "args": [
            "",
            "5,1"
          ],
          "expect": "[1,1]",
          "cmp": "exact"
        },
        {
          "name": "最低分",
          "args": [
            "10,20",
            "1,20"
          ],
          "expect": "[3,1]",
          "cmp": "exact",
          "hidden": true
        },
        {
          "name": "全是并列",
          "args": [
            "5,5,5",
            "5,4"
          ],
          "expect": "[1,4]",
          "cmp": "exact",
          "hidden": true
        }
      ],
      "stress": {
        "iterations": 250,
        "seed": 20261515,
        "gen": "public class Gen {\n    public static String[] gen(java.util.Random r) {\n        int n = r.nextInt(6);\n        int m = 1 + r.nextInt(6);\n        StringBuilder a = new StringBuilder();\n        long lo = r.nextInt(20) - 10;\n        for (int i = 0; i < n; i++) { if (i > 0) a.append((char) 44); a.append(lo); lo += r.nextInt(3); }\n        StringBuilder b = new StringBuilder();\n        for (int j = 0; j < m; j++) { if (j > 0) b.append((char) 44); b.append(r.nextInt(30) - 15); }\n        return new String[]{ a.toString(), b.toString() };\n    }\n}",
        "ref": "public class Ref {\n    public static int[] rankAfter(long[] scores, long[] newScores) {\n        int n = scores.length, m = newScores.length;\n        int[] res = new int[m];\n        for (int j = 0; j < m; j++) {\n            int cnt = 0;\n            for (int i = 0; i < n; i++) if (scores[i] > newScores[j]) cnt++;\n            res[j] = cnt + 1;\n        }\n        return res;\n    }\n}"
      },
      "hints": [
        "名次 = 严格大于它的分数个数 + 1, 并列分数不互相垫高名次",
        "把新成绩并入榜单后二分第一个严格小于它的位置, 结果用 1-based 名次"
      ]
    },
    {
      "id": "ch13-L13",
      "order": 13,
      "stage": "创新挑战",
      "title": "设计用户注册与登录服务",
      "tags": [
        "设计",
        "哈希表",
        "输入校验"
      ],
      "q": "实现 class UserService(类名不可改,public class Main 保留占位),模拟课程项目里的注册登录业务:register(String username, String password) 与 login(String username, String password) 返回 boolean,userCount() 返回当前注册人数。注册规则:用户名长度必须为 3..10,只能由英文字母、数字和下划线组成;密码长度必须为 6..16;用户名忽略大小写后不得等于保留字 admin 或 system;同名用户(大小写敏感)不能重复注册。任一条不满足则注册失败返回 false,且不得改变已注册数据。登录规则:用户名或密码不匹配一律返回 false(包括未注册的用户)。判题按操作序列调用,无返回值或返回 void 的操作在期望中写 null。",
      "mode": "design",
      "entry": {
        "className": "UserService"
      },
      "ops": [
        [
          "UserService",
          [],
          []
        ],
        [
          "register",
          [
            "to",
            "123456"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "register",
          [
            "admin",
            "123456"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "register",
          [
            "tom",
            "123"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "register",
          [
            "tom",
            "123456"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "register",
          [
            "tom",
            "abcdef"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "login",
          [
            "tom",
            "123456"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "login",
          [
            "tom",
            "abcdef"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "login",
          [
            "jerry",
            "123456"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "register",
          [
            "t_m1",
            "pass01"
          ],
          [
            "String",
            "String"
          ]
        ],
        [
          "userCount",
          [],
          []
        ],
        [
          "login",
          [
            "T_M1",
            "pass01"
          ],
          [
            "String",
            "String"
          ]
        ]
      ],
      "expect": [
        "null",
        "false",
        "false",
        "false",
        "true",
        "false",
        "true",
        "false",
        "false",
        "true",
        "2",
        "false"
      ],
      "opSets": [
        {
          "name": "操作序列",
          "ops": [
            [
              "UserService",
              [],
              []
            ],
            [
              "register",
              [
                "to",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "admin",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "tom",
                "123"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "tom",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "tom",
                "abcdef"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "tom",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "tom",
                "abcdef"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "jerry",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "t_m1",
                "pass01"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "userCount",
              [],
              []
            ],
            [
              "login",
              [
                "T_M1",
                "pass01"
              ],
              [
                "String",
                "String"
              ]
            ]
          ],
          "expect": [
            "null",
            "false",
            "false",
            "false",
            "true",
            "false",
            "true",
            "false",
            "false",
            "true",
            "2",
            "false"
          ]
        },
        {
          "name": "隐藏: 长度与字符边界",
          "hidden": true,
          "ops": [
            [
              "UserService",
              [],
              []
            ],
            [
              "register",
              [
                "abc",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "admin",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "abcdefghijk",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "a b",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "ok_1",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "ok_1",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "OK_1",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "abc",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "abc",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "userCount",
              [],
              []
            ],
            [
              "login",
              [
                "abc",
                "12345"
              ],
              [
                "String",
                "String"
              ]
            ]
          ],
          "expect": [
            "null",
            "true",
            "false",
            "false",
            "false",
            "true",
            "true",
            "false",
            "true",
            "false",
            "2",
            "false"
          ]
        },
        {
          "name": "隐藏: 保留字与密码长度",
          "hidden": true,
          "ops": [
            [
              "UserService",
              [],
              []
            ],
            [
              "register",
              [
                "SYSTEM",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "abcdefghij",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "abcdefghij",
                "1234567890123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "ok2",
                "1234567890123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "ok3",
                "12345678901234567"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "ok2",
                "1234567890123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "ok2",
                "123456789012345"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "login",
              [
                "nobody",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "register",
              [
                "ok4",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ],
            [
              "userCount",
              [],
              []
            ],
            [
              "login",
              [
                "ok4",
                "123456"
              ],
              [
                "String",
                "String"
              ]
            ]
          ],
          "expect": [
            "null",
            "false",
            "true",
            "false",
            "true",
            "false",
            "true",
            "false",
            "false",
            "true",
            "3",
            "true"
          ]
        }
      ],
      "cmp": "exact",
      "starter": "class UserService {\n    // TODO: 用哈希表保存 用户名 -> 密码, 并校验用户名/密码的合法性\n    public boolean register(String username, String password) { return false; }\n    public boolean login(String username, String password) { return false; }\n    public int userCount() { return 0; }\n}\n\npublic class Main { }",
      "solution": "import java.util.*;\n\nclass UserService {\n    private final Map<String, String> users = new LinkedHashMap<String, String>();\n\n    private boolean legalName(String u) {\n        if (u == null || u.length() < 3 || u.length() > 10) return false;\n        String low = u.toLowerCase();\n        if (low.equals(\"admin\") || low.equals(\"system\")) return false;\n        for (int i = 0; i < u.length(); i++) {\n            char c = u.charAt(i);\n            if (!(Character.isLetterOrDigit(c) || c == '_')) return false;\n        }\n        return true;\n    }\n\n    private boolean legalPwd(String p) {\n        return p != null && p.length() >= 6 && p.length() <= 16;\n    }\n\n    public boolean register(String username, String password) {\n        if (!legalName(username) || !legalPwd(password)) return false;\n        if (users.containsKey(username)) return false;\n        users.put(username, password);\n        return true;\n    }\n\n    public boolean login(String username, String password) {\n        String p = users.get(username);\n        return p != null && p.equals(password);\n    }\n\n    public int userCount() { return users.size(); }\n}\n\npublic class Main { }",
      "tests": [],
      "hints": [
        "合法性检查要在重复检查之前完成, 否则失败路径可能污染数据",
        "保留字比较用 toLowerCase(), 但用户名本身的大小写要原样保存"
      ]
    },
    {
      "id": "ch13-L14",
      "order": 14,
      "stage": "创新挑战",
      "title": "设计战斗角色继承结构",
      "tags": [
        "设计",
        "继承",
        "多态"
      ],
      "q": "用继承结构表达敌我双方的角色(课程项目的准备工作):在同一文件中实现抽象类 Role,以及它的两个子类 Warrior(战士)与 Mage(法师),类名不可改。要求:Role 的构造签名为 Role(String name, int hp),对外提供 getName() 返回名字、getHp() 返回当前血量、getAtk() 返回攻击力、getDef() 返回防御力、hurt(int dmg) 扣血(hurt 后血量不得小于 0)。Warrior 的构造签名为 Warrior(String name),满血 180、攻击力 28、防御力 14;Mage 的构造签名为 Mage(String name),满血 110、攻击力 42、防御力 5。Warrior 与 Mage 必须继承 Role 并复用 Role 中的血量逻辑,不得各自重新维护一份血量字段。判题按操作序列调用,无返回值或返回 void 的操作在期望中写 null。",
      "mode": "design",
      "entry": {
        "className": "Warrior"
      },
      "ops": [
        [
          "Warrior",
          [
            "A"
          ],
          [
            "String"
          ]
        ],
        [
          "getName",
          [],
          []
        ],
        [
          "getHp",
          [],
          []
        ],
        [
          "getAtk",
          [],
          []
        ],
        [
          "getDef",
          [],
          []
        ],
        [
          "hurt",
          [
            200
          ],
          [
            "int"
          ]
        ],
        [
          "getHp",
          [],
          []
        ],
        [
          "hurt",
          [
            10
          ],
          [
            "int"
          ]
        ],
        [
          "getHp",
          [],
          []
        ],
        [
          "getAtk",
          [],
          []
        ]
      ],
      "expect": [
        "null",
        "\"A\"",
        "180",
        "28",
        "14",
        "null",
        "0",
        "null",
        "0",
        "28"
      ],
      "opSets": [
        {
          "name": "操作序列",
          "ops": [
            [
              "Warrior",
              [
                "A"
              ],
              [
                "String"
              ]
            ],
            [
              "getName",
              [],
              []
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "getAtk",
              [],
              []
            ],
            [
              "getDef",
              [],
              []
            ],
            [
              "hurt",
              [
                200
              ],
              [
                "int"
              ]
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "hurt",
              [
                10
              ],
              [
                "int"
              ]
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "getAtk",
              [],
              []
            ]
          ],
          "expect": [
            "null",
            "\"A\"",
            "180",
            "28",
            "14",
            "null",
            "0",
            "null",
            "0",
            "28"
          ]
        },
        {
          "name": "隐藏: 恰好击倒与零伤害",
          "hidden": true,
          "ops": [
            [
              "Warrior",
              [
                "Z"
              ],
              [
                "String"
              ]
            ],
            [
              "getName",
              [],
              []
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "getAtk",
              [],
              []
            ],
            [
              "getDef",
              [],
              []
            ],
            [
              "hurt",
              [
                180
              ],
              [
                "int"
              ]
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "hurt",
              [
                0
              ],
              [
                "int"
              ]
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "getAtk",
              [],
              []
            ]
          ],
          "expect": [
            "null",
            "\"Z\"",
            "180",
            "28",
            "14",
            "null",
            "0",
            "null",
            "0",
            "28"
          ]
        },
        {
          "name": "隐藏: 分段扣血",
          "hidden": true,
          "ops": [
            [
              "Warrior",
              [
                "Boss"
              ],
              [
                "String"
              ]
            ],
            [
              "getName",
              [],
              []
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "getAtk",
              [],
              []
            ],
            [
              "getDef",
              [],
              []
            ],
            [
              "hurt",
              [
                30
              ],
              [
                "int"
              ]
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "hurt",
              [
                30
              ],
              [
                "int"
              ]
            ],
            [
              "getHp",
              [],
              []
            ],
            [
              "getAtk",
              [],
              []
            ]
          ],
          "expect": [
            "null",
            "\"Boss\"",
            "180",
            "28",
            "14",
            "null",
            "150",
            "null",
            "120",
            "28"
          ]
        }
      ],
      "cmp": "exact",
      "starter": "abstract class Role {\n    // TODO: 在 Role 中保存 name 与 hp, 并提供受击方法 hurt(int)\n    // 提示: 两个子类都不重写 getName/getHp/hurt, 所以这些方法必须在这里就能编译\n    public String getName() { return \"\"; }\n    public int getHp() { return 0; }\n    public int getAtk() { return 0; }\n    public int getDef() { return 0; }\n    public void hurt(int dmg) { }\n}\n\nclass Warrior extends Role {\n    // TODO: 战士: 满血 180, 攻击 28, 防御 14\n}\n\nclass Mage extends Role {\n    // TODO: 法师: 满血 110, 攻击 42, 防御 5\n}\n\npublic class Main { }",
      "solution": "abstract class Role {\n    private final String name;\n    private int hp;\n    protected Role(String name, int hp) { this.name = name; this.hp = hp; }\n    public String getName() { return name; }\n    public int getHp() { return hp; }\n    public int getAtk() { return 0; }\n    public int getDef() { return 0; }\n    public void hurt(int dmg) { hp -= dmg; if (hp < 0) hp = 0; }\n}\n\nclass Warrior extends Role {\n    public Warrior(String name) { super(name, 180); }\n    public int getAtk() { return 28; }\n    public int getDef() { return 14; }\n}\n\nclass Mage extends Role {\n    public Mage(String name) { super(name, 110); }\n    public int getAtk() { return 42; }\n    public int getDef() { return 5; }\n}\n\npublic class Main { }",
      "tests": [],
      "hints": [
        "把 name 与 hp 放在 Role 里, 两个子类只负责给出自己的满血与属性",
        "hurt 扣过头时必须夹到 0, 不能留负数"
      ]
    },
    {
      "id": "ch13-L15",
      "order": 15,
      "stage": "创新挑战",
      "title": "BOSS: 设计回合制战斗引擎 BattleEngine",
      "tags": [
        "设计",
        "状态机",
        "回合结算"
      ],
      "q": "本章 BOSS:实现 class BattleEngine,把战斗回合的推进、结算与胜负判定封装成一个对象。构造签名 BattleEngine(String[] bossStats),bossStats 是形如 \"hp=1500\" 的配置项数组(可能为 null):若其中存在键名 hp 的项,则 BOSS 初始血量取该值,否则为 1000。addPlayer(String name, int hp, int atk):名字为 null、已存在、队伍已满(最多 4 人)、hp ≤ 0 或 atk ≤ 0 时返回 false;否则加入并返回 true。attack(String name, int dmg):若该角色不存在或已阵亡、或 BOSS 已阵亡、或 dmg ≤ 0,则返回 0 且不产生任何副作用(不计毒、不推进回合);否则本次实际伤害 = 角色攻击力 + dmg,对 BOSS 扣血,并返回真实扣掉的血量(不会超过 BOSS 剩余血量,也不会为负)。一次成功攻击之后依次发生:1) 所有中毒且存活的我方角色各扣 30 点血,其中毒层数减 1;2) 进入敌方回合。heal(String name, int amount):角色不存在、已阵亡或 amount ≤ 0 返回 false,否则回血(不超过加入时的满血)并返回 true。敌方回合规则:BOSS 对每名存活角色造成 50 点伤害,但除第一个存活角色(按加入顺序)以外的存活角色只受到 30 点伤害。BOSS 已阵亡或我方全灭时不发生任何攻击。以上流程在每次成功 attack 后必定完整执行一次。status(String name):返回 \"名字 HP=血量 状态\",状态为 ALIVE(存活且无中毒)、POISON(存活且中毒层数 > 0)、DEAD(血量为 0),BOSS 用名字 \"BOSS\" 查询,血量即剩余血量;名字不存在时返回 \"MISSING\"。deadCount():返回我方已阵亡人数。winner():双方都还活着返回 \"NONE\",BOSS 阵亡返回 \"HEROES\",我方全灭返回 \"BOSS\"。判题按操作序列调用,无返回值或返回 void 的操作在期望中写 null。",
      "mode": "design",
      "entry": {
        "className": "BattleEngine"
      },
      "ops": [
        [
          "BattleEngine",
          [
            "hp=1500"
          ],
          [
            "String[]"
          ]
        ],
        [
          "addPlayer",
          [
            "A",
            100,
            20
          ],
          [
            "String",
            "int",
            "int"
          ]
        ],
        [
          "addPlayer",
          [
            "B",
            100,
            10
          ],
          [
            "String",
            "int",
            "int"
          ]
        ],
        [
          "addPlayer",
          [
            "C",
            100,
            10
          ],
          [
            "String",
            "int",
            "int"
          ]
        ],
        [
          "addPlayer",
          [
            "D",
            100,
            10
          ],
          [
            "String",
            "int",
            "int"
          ]
        ],
        [
          "addPlayer",
          [
            "E",
            100,
            10
          ],
          [
            "String",
            "int",
            "int"
          ]
        ],
        [
          "status",
          [
            "A"
          ],
          [
            "String"
          ]
        ],
        [
          "attack",
          [
            "A",
            20
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "status",
          [
            "A"
          ],
          [
            "String"
          ]
        ],
        [
          "status",
          [
            "B"
          ],
          [
            "String"
          ]
        ],
        [
          "status",
          [
            "BOSS"
          ],
          [
            "String"
          ]
        ],
        [
          "heal",
          [
            "B",
            999
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "status",
          [
            "B"
          ],
          [
            "String"
          ]
        ],
        [
          "heal",
          [
            "X",
            10
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "attack",
          [
            "X",
            10
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "status",
          [
            "X"
          ],
          [
            "String"
          ]
        ],
        [
          "deadCount",
          [],
          []
        ],
        [
          "winner",
          [],
          []
        ],
        [
          "attack",
          [
            "A",
            0
          ],
          [
            "String",
            "int"
          ]
        ],
        [
          "status",
          [
            "A"
          ],
          [
            "String"
          ]
        ]
      ],
      "expect": [
        "null",
        "true",
        "true",
        "true",
        "true",
        "false",
        "\"A HP=100 ALIVE\"",
        "40",
        "\"A HP=50 ALIVE\"",
        "\"B HP=70 ALIVE\"",
        "\"BOSS HP=1460 ALIVE\"",
        "true",
        "\"B HP=100 ALIVE\"",
        "false",
        "0",
        "\"MISSING\"",
        "0",
        "\"NONE\"",
        "0",
        "\"A HP=50 ALIVE\""
      ],
      "opSets": [
        {
          "name": "公开序列",
          "ops": [
            [
              "BattleEngine",
              [
                "hp=1500"
              ],
              [
                "String[]"
              ]
            ],
            [
              "addPlayer",
              [
                "A",
                100,
                20
              ],
              [
                "String",
                "int",
                "int"
              ]
            ],
            [
              "addPlayer",
              [
                "B",
                100,
                10
              ],
              [
                "String",
                "int",
                "int"
              ]
            ],
            [
              "addPlayer",
              [
                "C",
                100,
                10
              ],
              [
                "String",
                "int",
                "int"
              ]
            ],
            [
              "addPlayer",
              [
                "D",
                100,
                10
              ],
              [
                "String",
                "int",
                "int"
              ]
            ],
            [
              "addPlayer",
              [
                "E",
                100,
                10
              ],
              [
                "String",
                "int",
                "int"
              ]
            ],
            [
              "status",
              [
                "A"
              ],
              [
                "String"
              ]
            ],
            [
              "attack",
              [
                "A",
                20
              ],
              [
                "String",
                "int"
              ]
            ],
            [
              "status",
              [
                "A"
              ],
              [
                "String"
              ]
            ],
            [
              "status",
              [
                "B"
              ],
              [
                "String"
              ]
            ],
            [
              "status",
              [
                "BOSS"
              ],
              [
                "String"
              ]
            ],
            [
              "heal",
              [
                "B",
                999
              ],
              [
                "String",
                "int"
              ]
            ],
            [
              "status",
              [
                "B"
              ],
              [
                "String"
              ]
            ],
            [
              "heal",
              [
                "X",
                10
              ],
              [
                "String",
                "int"
              ]
            ],
            [
              "attack",
              [
                "X",
                10
              ],
              [
                "String",
                "int"
              ]
            ],
            [
              "status",
              [
                "X"
              ],
              [
                "String"
              ]
            ],
            [
              "deadCount",
              [],
              []
            ],
            [
              "winner",
              [],
              []
            ],
            [
              "attack",
              [
                "A",
                0
              ],
              [
                "String",
                "int"
              ]
            ],
            [
              "status",
              [
                "A"
              ],
              [
                "String"
              ]
            ]
          ],
          "expect": [
            "null",
            "true",
            "true",
            "true",
            "true",
            "false",
            "\"A HP=100 ALIVE\"",
            "40",
            "\"A HP=50 ALIVE\"",
            "\"B HP=70 ALIVE\"",
            "\"BOSS HP=1460 ALIVE\"",
            "true",
            "\"B HP=100 ALIVE\"",
            "false",
            "0",
            "\"MISSING\"",
            "0",
            "\"NONE\"",
            "0",
            "\"A HP=50 ALIVE\""
          ]
        },
        {
          "name": "隐藏边界序列",
          "ops": [
            [
              "BattleEngine",
              [
                "mp=999"
              ]
            ],
            [
              "addPlayer",
              [
                "A",
                100,
                2000
              ]
            ],
            [
              "addPlayer",
              [
                "B",
                10,
                10
              ]
            ],
            [
              "addPlayer",
              [
                "C",
                10,
                10
              ]
            ],
            [
              "addPlayer",
              [
                "D",
                10,
                10
              ]
            ],
            [
              "addPlayer",
              [
                "E",
                10,
                10
              ]
            ],
            [
              "status",
              [
                "BOSS"
              ]
            ],
            [
              "attack",
              [
                "A",
                0
              ]
            ],
            [
              "status",
              [
                "A"
              ]
            ],
            [
              "attack",
              [
                "A",
                2000
              ]
            ],
            [
              "winner"
            ],
            [
              "status",
              [
                "BOSS"
              ]
            ],
            [
              "deadCount"
            ],
            [
              "attack",
              [
                "A",
                10
              ]
            ],
            [
              "heal",
              [
                "A",
                5
              ]
            ],
            [
              "status",
              [
                "A"
              ]
            ]
          ],
          "expect": [
            "null",
            "true",
            "true",
            "true",
            "true",
            "false",
            "\"BOSS HP=1000 ALIVE\"",
            "0",
            "\"A HP=100 ALIVE\"",
            "1000",
            "\"HEROES\"",
            "\"BOSS HP=0 DEAD\"",
            "0",
            "0",
            "true",
            "\"A HP=100 ALIVE\""
          ],
          "hidden": true
        }
      ],
      "cmp": "exact",
      "starter": "import java.util.*;\n\nclass BattleEngine {\n    // TODO: 构造参数是可选的配置项数组, 形如 \"hp=1500\"\n    public BattleEngine(String[] bossStats) { }\n    public boolean addPlayer(String name, int hp, int atk) { return false; }\n    public int attack(String name, int dmg) { return 0; }\n    public boolean heal(String name, int amount) { return false; }\n    public String status(String name) { return \"\"; }\n    public int deadCount() { return 0; }\n    public String winner() { return \"\"; }\n}\n\npublic class Main { }",
      "solution": "import java.util.*;\n\nclass BattleEngine {\n    private static final class Hero {\n        final String name;\n        final int maxHp;\n        final int atk;\n        int hp;\n        int poison;\n        Hero(String n, int h, int a) { name = n; maxHp = h; atk = a; hp = h; poison = 0; }\n    }\n\n    private final Map<String, Hero> heroes = new LinkedHashMap<String, Hero>();\n    private int bossHp = 1000;\n\n    public BattleEngine(String[] bossStats) {\n        if (bossStats == null) return;\n        for (String s : bossStats) {\n            if (s == null) continue;\n            int e = s.indexOf('=');\n            if (e > 0 && s.substring(0, e).trim().equals(\"hp\")) {\n                bossHp = Integer.parseInt(s.substring(e + 1).trim());\n                break;\n            }\n        }\n    }\n\n    private int aliveCount() {\n        int c = 0;\n        for (Hero h : heroes.values()) if (h.hp > 0) c++;\n        return c;\n    }\n\n    public boolean addPlayer(String name, int hp, int atk) {\n        if (name == null || heroes.containsKey(name) || heroes.size() >= 4) return false;\n        if (hp <= 0 || atk <= 0) return false;\n        heroes.put(name, new Hero(name, hp, atk));\n        return true;\n    }\n\n    private void enemyTurn() {\n        if (bossHp <= 0) return;\n        int alive = aliveCount();\n        if (alive == 0) return;\n        boolean first = true;\n        for (Hero h : heroes.values()) {\n            if (h.hp <= 0) continue;\n            h.hp -= (first ? 50 : 30);\n            if (h.hp < 0) h.hp = 0;\n            first = false;\n            if (bossHp <= 0) return;\n        }\n    }\n\n    public int attack(String name, int dmg) {\n        Hero h = heroes.get(name);\n        if (h == null || h.hp <= 0 || bossHp <= 0 || dmg <= 0) return 0;\n        long raw = (long) h.atk + dmg;\n        int dealt = (int) Math.min(raw, (long) bossHp);\n        bossHp -= dealt;\n        if (bossHp < 0) bossHp = 0;\n        for (Hero x : heroes.values()) {\n            if (x.hp > 0 && x.poison > 0) {\n                x.poison--;\n                x.hp -= 30;\n                if (x.hp < 0) x.hp = 0;\n            }\n        }\n        enemyTurn();\n        return dealt;\n    }\n\n    public boolean heal(String name, int amount) {\n        Hero h = heroes.get(name);\n        if (h == null || h.hp <= 0 || amount <= 0) return false;\n        h.hp += amount;\n        if (h.hp > h.maxHp) h.hp = h.maxHp;\n        return true;\n    }\n\n    public String status(String name) {\n        int hp;\n        int poison = 0;\n        if (\"BOSS\".equals(name)) hp = bossHp;\n        else {\n            Hero h = heroes.get(name);\n            if (h == null) return \"MISSING\";\n            hp = h.hp;\n            poison = h.poison;\n        }\n        String tag = hp <= 0 ? \"DEAD\" : (poison > 0 ? \"POISON\" : \"ALIVE\");\n        return name + \" HP=\" + hp + \" \" + tag;\n    }\n\n    public int deadCount() {\n        int c = 0;\n        for (Hero h : heroes.values()) if (h.hp <= 0) c++;\n        return c;\n    }\n\n    public String winner() {\n        if (bossHp > 0 && aliveCount() > 0) return \"NONE\";\n        if (bossHp <= 0) return \"HEROES\";\n        return \"BOSS\";\n    }\n}\n\npublic class Main { }",
      "tests": [],
      "hints": [
        "先判定这次攻击是否有效, 有效才扣血、结算中毒并推进敌方回合",
        "敌方回合只对存活角色结算: 第一个存活角色吃 50, 其余吃 30",
        "返回值是真实扣掉的血量, 要用 Math.min 与 BOSS 剩余血量比较"
      ]
    }
  ]
});
