/* JavaQuest v2 引擎：进度 / 门控 / 存档 / 等级 / 成就徽章 */
(function () {
  const Q = window.JQ2 = { chapters: [], save: null };
  const KEY = 'javaQuest.v2.save';

  const blank = () => ({
    solved: {}, attempts: {}, xp: 0, badges: [], best: {},
    streak: { cur: 0, best: 0 }, boss: {}, createdAt: Date.now()
  });

  Q.load = function () {
    let raw = null;
    try { raw = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { raw = null; }
    Q.save = raw && typeof raw === 'object' ? raw : blank();
    const b = blank();
    for (const k of Object.keys(b)) if (Q.save[k] === undefined) Q.save[k] = b[k];
    Q.save.streak = Q.save.streak || { cur: 0, best: 0 };
    return Q.save;
  };
  Q.persist = () => localStorage.setItem(KEY, JSON.stringify(Q.save));
  Q.reset = () => { Q.save = blank(); Q.persist(); };

  // ---------- 门控 ----------
  // 关卡解锁: 第 1 关始终可打; 其余需前一关 AC
  Q.isUnlocked = function (ch, level) {
    if (level.order === 1) return true;
    const prev = Q.findLevel(ch, level.order - 1);
    return !!(prev && Q.save.solved[prev.id]);
  };
  Q.findLevel = function (ch, order) {
    const c = Q.chapters.find(x => x.ch === ch);
    return c ? c.levels.find(l => l.order === order) : null;
  };
  Q.levelById = function (id) {
    for (const c of Q.chapters) { const l = c.levels.find(x => x.id === id); if (l) return l; }
    return null;
  };
  Q.solvedCount = function () { return Object.keys(Q.save.solved).length; };
  Q.totalCount = function () { return Q.chapters.reduce((a, c) => a + c.levels.length, 0); };
  Q.allLevels = function () { return Q.chapters.flatMap(c => c.levels); };
  Q.isBoss = level => !!level && level.order === 15;
  Q.chapterDone = function (ch) {
    const c = Q.chapters.find(x => x.ch === ch);
    return !!c && c.levels.every(l => Q.save.solved[l.id]);
  };
  Q.doneChapters = () => Q.chapters.filter(c => Q.chapterDone(c.ch)).length;
  Q.modeStats = function (mode) {
    const ls = Q.allLevels().filter(l => l.mode === mode);
    return { total: ls.length, done: ls.filter(l => Q.save.solved[l.id]).length };
  };
  Q.bossStats = function () {
    const ls = Q.allLevels().filter(Q.isBoss);
    return { total: ls.length, done: ls.filter(l => Q.save.solved[l.id]).length };
  };

  // ---------- 成长 ----------
  const TITLES = [
    [0, '语法学徒'], [200, '循环行者'], [500, '结构匠人'], [900, '算法游侠'], [1400, '设计法师'],
    [2000, '递归领主'], [2800, '复杂度裁决者'], [4000, '架构使徒'], [6000, '🏆 JVM 之神']
  ];
  Q.title = xp => { let t = TITLES[0][1]; for (const [m, n] of TITLES) if (xp >= m) t = n; return t; };
  Q.nextTitle = xp => { for (const [m, n] of TITLES) if (xp < m) return { xp: m, name: n, need: m - xp }; return null; };
  Q.xpFor = level => 20 + level.order * 6 + (level.mode === 'stress' ? 25 : 0) + (level.mode === 'design' ? 30 : 0)
    + (Q.isBoss(level) ? 80 : 0);

  Q.classifyVerdict = v => ({ AC: '✅ 通过', WA: '❌ 答案错误', TLE: '⏱ 超时', MLE: '💾 内存超限', RE: '💥 运行时错误', CE: '🛠 编译错误', OLE: '📤 输出过多', SE: '⚠️ 系统错误' }[v] || v);

  // 记录一次提交(用于"首次即通过""不放弃"等成就)
  Q.recordAttempt = function (level) {
    Q.save.attempts[level.id] = (Q.save.attempts[level.id] || 0) + 1;
    return Q.save.attempts[level.id];
  };
  Q.attemptsOf = level => Q.save.attempts[level.id] || 0;

  // 通关结算: 返回 {xp, firstTry, newBadges}
  Q.award = function (level, meta) {
    meta = meta || {};
    const k = level.id;
    const attempts = Q.attemptsOf(level) || 1;
    const firstTry = !Q.save.solved[k] && attempts === 1;
    let gained = 0, result = null;
    if (!Q.save.solved[k]) {
      Q.save.solved[k] = { at: Date.now(), verdict: 'AC' };
      gained = Q.xpFor(level);
      Q.save.xp += gained;
      if (firstTry) { Q.save.streak.cur++; Q.save.streak.best = Math.max(Q.save.streak.best, Q.save.streak.cur); }
      else Q.save.streak.cur = 0;
      if (meta.ms && Number.isFinite(meta.ms)) {
        Q.save.best[k] = Q.save.best[k] ? Math.min(Q.save.best[k], meta.ms) : meta.ms;
      }
      if (Q.isBoss(level)) Q.save.boss[k] = { at: Date.now(), ms: meta.ms || 0, attempts };
      result = { xp: gained, firstTry };
    }
    const newBadges = Q.checkBadges();
    Q.persist();
    return result ? Object.assign(result, { newBadges }) : (newBadges.length ? { xp: 0, firstTry: false, newBadges } : null);
  };

  // ---------- 成就徽章 ----------
  Q.BADGES = [
    { id: 'first', icon: '🌱', name: '初次编译', desc: '通过第一关', test: () => Q.solvedCount() >= 1 },
    { id: 'chap1', icon: '🗺️', name: '首章通关', desc: '完整通过任意一章(15/15)', test: () => Q.doneChapters() >= 1 },
    { id: 'chap3', icon: '🧭', name: '三章连破', desc: '完整通过 3 个章节', test: () => Q.doneChapters() >= 3 },
    { id: 'chap14', icon: '🏛️', name: '十四柱', desc: '14 章全部通关', test: () => Q.doneChapters() >= 14 },
    { id: 'firsttry', icon: '⚡', name: '一击必杀', desc: '某关第一次提交就直接通过', test: () => Q.save.streak.best >= 1 },
    { id: 'streak10', icon: '🔥', name: '十连完美', desc: '连续 10 关首次提交即通过', test: () => Q.save.streak.best >= 10 },
    { id: 'stress', icon: '🌊', name: '算法深潜者', desc: '通过全部随机对拍关(42 关)', test: () => { const s = Q.modeStats('stress'); return s.total > 0 && s.done === s.total; } },
    { id: 'design', icon: '🏗️', name: '架构使徒', desc: '通过全部设计题关(42 关)', test: () => { const s = Q.modeStats('design'); return s.total > 0 && s.done === s.total; } },
    { id: 'boss1', icon: '👑', name: 'BOSS 终结者', desc: '击破任意一个章节 BOSS', test: () => Q.bossStats().done >= 1 },
    { id: 'boss14', icon: '💠', name: 'BOSS 全破', desc: '击破全部 14 个章节 BOSS', test: () => { const b = Q.bossStats(); return b.total > 0 && b.done === b.total; } },
    { id: 'persist', icon: '🐢', name: '稳如老狗', desc: '同一关失败 20 次后仍然拿下它', test: () => Q.allLevels().some(l => Q.save.solved[l.id] && Q.attemptsOf(l) >= 20) },
    { id: 'all', icon: '🏆', name: '全量通关', desc: '通过全部 210 关', test: () => Q.solvedCount() >= Q.totalCount() && Q.totalCount() > 0 }
  ];
  // 检查是否有新解锁的徽章(不写盘, 由 award 统一 persist)
  Q.checkBadges = function () {
    const got = [];
    for (const b of Q.BADGES) {
      if (Q.save.badges.includes(b.id)) continue;
      let ok = false;
      try { ok = !!b.test(); } catch { ok = false; }
      if (ok) { Q.save.badges.push(b.id); got.push(b); }
    }
    return got;
  };
  Q.badgeState = () => Q.BADGES.map(b => Object.assign({}, b, { unlocked: Q.save.badges.includes(b.id) }));
  Q.badgeCount = () => Q.save.badges.length;

  // ---------- BOSS 限时多阶段 ----------
  Q.BOSS_SECONDS = 600;   // 每章 BOSS 限时 10 分钟
  // 把判题返回的用例编排成"阶段": 公开用例归阶段1, 每个隐藏用例各占一个阶段
  Q.stagesOf = function (level, cases) {
    const list = [];
    const pub = (cases || []).filter(c => !c.hidden);
    const hid = (cases || []).filter(c => c.hidden);
    list.push({ name: '阶段 1 · 公开序列', cases: pub });
    hid.forEach((c, i) => list.push({ name: `阶段 ${i + 2} · 隐藏边界`, cases: [c] }));
    return list;
  };
})();
