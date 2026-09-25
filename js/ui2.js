/* JavaQuest v2 界面：关卡地图 / 编程关卡 / 判决面板 / 战绩 */
(function () {
  const Q = window.JQ2, API = window.API;
  const stage = () => document.getElementById('stage');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  function hud() {
    const s = Q.save;
    document.getElementById('player-hud').innerHTML =
      `<div class="hud"><span>${esc(Q.title(s.xp))}</span><b>${s.xp} XP</b>
       <span>🎯 ${Q.solvedCount()}/${Q.totalCount()} 关</span>
       <span>🏅 ${Q.badgeCount()}/${Q.BADGES.length}</span></div>`;
  }

  /* ------------------ 成就解锁提示 ------------------ */
  function toast(inner) {
    try {
      let box = document.getElementById('toasts');
      if (!box) {
        box = document.createElement('div');
        box.id = 'toasts'; box.className = 'toasts';
        (document.body || document.documentElement).appendChild(box);
      }
      const el = document.createElement('div');
      el.className = 'toast';
      el.innerHTML = inner;
      box.appendChild(el);
      if (typeof setTimeout === 'function') {
        setTimeout(() => { el.classList.add('out'); setTimeout(() => { if (el.remove) el.remove(); }, 400); }, 4600);
      }
    } catch { /* 提示失败不影响游戏 */ }
  }
  function toastBadges(list) {
    for (const b of list || []) toast(`🏅 解锁成就 <b>${esc(b.name)}</b><div class="view-sub">${esc(b.desc)}</div>`);
  }

  const STAGE_COLOR = { '基础语感': '#34d399', '组合运用': '#3b82f6', '综合拆解': '#a78bfa', '算法深潜': '#f59e0b', '创新挑战': '#f472b6' };
  const MODE_TAG = { method: '函数实现', stress: '⚡随机对拍', design: '🏗 系统设计', stdin: 'IO' };

  /* ------------------ 视图: 关卡地图 ------------------ */
  function viewMap() {
    if (!Q.chapters.length) { stage().innerHTML = '<div class="card">题库尚未加载。</div>'; return; }
    let html = `<div class="view-title">🗺 关卡地图</div>
      <div class="view-sub">14 章 · 每章 15 关严格递进：基础语感 → 组合运用 → 综合拆解 → 算法深潜 → 创新挑战(BOSS)。前一关通过才解锁下一关。</div>`;
    for (const c of Q.chapters) {
      const solved = c.levels.filter(l => Q.save.solved[l.id]).length;
      html += `<div class="card">
        <div class="chap-head">
          <span class="chap-title">第${c.ch}章 · ${esc(c.title)}</span>
          <span class="badge">${solved}/${c.levels.length}</span>
          <span class="badge" style="color:var(--dim)">${esc(c.courseRef || '')}</span>
        </div>
        <div class="sec-list">`;
      for (const l of c.levels) {
        const done = !!Q.save.solved[l.id];
        const unlocked = Q.isUnlocked(l.ch || c.ch, l);
        const color = STAGE_COLOR[l.stage] || '#93a0c4';
        const boss = Q.isBoss(l);
        html += `<div class="sec-card${boss ? ' boss' : ''}" style="${done ? 'border-color:var(--ok)' : (unlocked ? '' : 'opacity:.45')}"
            onclick="${unlocked ? `JQ2UI.open('${l.id}')` : `alert('先通过第 ${l.order - 1} 关')`}">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <b>${boss ? '👑 ' : ''}L${String(l.order).padStart(2, '0')} ${esc(l.title)}</b>
            <span style="font-size:11px;color:${color}">${esc(l.stage)}</span>
          </div>
          <div class="best ${done ? 'done' : ''}" style="font-size:12px">
            ${done ? '✔ 已通过' : (unlocked ? (boss ? '👑 限时 BOSS（多阶段）' : '⚔️ 可挑战') : '🔒 未解锁')} ·
            <span style="color:var(--purple)">${MODE_TAG[l.mode] || l.mode}</span> ·
            ${esc(l.judgeDesc || (l.totalTests + ' 用例'))}
          </div>
        </div>`;
      }
      html += `</div></div>`;
    }
    stage().innerHTML = html; hud();
  }

  /* ------------------ BOSS 限时多阶段 ------------------ */
  let bossTimer = null, bossDeadline = 0;
  function stopBossTimer() { if (bossTimer && typeof clearInterval === 'function') clearInterval(bossTimer); bossTimer = null; }
  function startBossTimer() {
    stopBossTimer();
    bossDeadline = Date.now() + Q.BOSS_SECONDS * 1000;
    if (typeof setInterval !== 'function') return;
    const tick = () => {
      const left = Math.max(0, bossDeadline - Date.now());
      const el = document.getElementById('bosstimer');
      if (el) {
        el.textContent = `⏳ ${String(Math.floor(left / 60000)).padStart(2, '0')}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`;
        el.style.color = left < 60000 ? 'var(--bad)' : 'var(--gold)';
      }
      if (left <= 0) {
        stopBossTimer();
        const m = document.getElementById('runmsg');
        if (m) m.textContent = '⌛ 挑战时间到！可以「提交评测」记录当前结果，或返回地图重新开战（计时会重置）。';
      }
    };
    tick();
    bossTimer = setInterval(tick, 500);
  }
  function bossExpired() { return bossDeadline > 0 && Date.now() > bossDeadline; }
  function stageChips(level, states) {
    const n = Math.max(1, level.totalTests || 1);
    let html = '';
    for (let i = 0; i < n; i++) {
      const st = states && states[i];
      const cls = st === true ? 'chip ok' : st === false ? 'chip bad' : 'chip';
      html += `<span class="${cls}">阶段 ${i + 1} · ${i === 0 ? '公开序列' : '隐藏边界'} ${st === true ? '✅' : st === false ? '❌' : '⏳'}</span>`;
    }
    return html;
  }

  /* ------------------ 视图: 编程关卡 ------------------ */
  let cur = null;   // {chapter, level}
  Q.openLevel = async function (id) {
    const chapter = Q.chapters.find(c => c.levels.some(l => l.id === id));
    const level = chapter.levels.find(l => l.id === id);
    cur = { chapter, level };
    const isBoss = Q.isBoss(level);
    const bossRecord = Q.save.boss[level.id];
    const draftKey = 'jq2.draft.' + id;
    const draft = localStorage.getItem(draftKey);
    const code = draft || level.starter || '';
    const color = STAGE_COLOR[level.stage] || '#93a0c4';
    stage().innerHTML = `
      <div class="quest-top">
        <button onclick="JQ2UI.view('map')">← 返回地图</button>
        <div class="progressbar"><i style="width:${(level.order / chapter.levels.length) * 100}%"></i></div>
        <span>第${chapter.ch}章 · L${level.order}/${chapter.levels.length}</span>
      </div>
      ${isBoss ? `<div class="card boss-card">
        <div class="boss-head">
          <span class="boss-title">👑 第${chapter.ch}章 BOSS · ${esc(level.title)}</span>
          <span id="bosstimer" class="boss-timer">⏳ ${String(Math.floor(Q.BOSS_SECONDS / 60)).padStart(2, '0')}:00</span>
        </div>
        <div class="view-sub">限时 <b>${Math.floor(Q.BOSS_SECONDS / 60)} 分钟</b>，多阶段挑战：先通过公开序列，再通过隐藏边界序列，<b>全部阶段通过</b>才算击破 BOSS。
        ${bossRecord ? `已击破记录：${Math.round((bossRecord.ms || 0) / 1000)} 秒 / ${bossRecord.attempts} 次提交。` : '计时从打开本关开始，返回地图再进入会重新计时。'}</div>
        <div class="boss-stages">${stageChips(level, null)}</div>
      </div>` : ''}
      <div class="card">
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <span class="chap-title">${esc(level.title)}</span>
          <span class="badge" style="color:${color}">${esc(level.stage)}</span>
          <span class="badge" style="color:var(--purple)">${MODE_TAG[level.mode] || level.mode}</span>
          ${(level.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join('')}
        </div>
        <p class="q-text" style="white-space:pre-wrap">${esc(level.q)}</p>
        <div class="view-sub" style="border-top:1px solid var(--line);padding-top:8px">
          <b>判题约定</b>（所有关卡通用）：判题器会反射调用你写的方法/类，<b>类名、方法名、参数顺序必须与题目一致</b>；
          返回值请用 <span class="kbd">return</span> 给出，<span class="kbd">System.out</span> 打印的内容不参与判定（可放心调试）；
          无返回值的方法（void）期望写作 <span class="kbd">null</span>；<span class="kbd">double</span> 整数结果显示为 <span class="kbd">1.0</span> 这种形式。
          本题判题方式：<b style="color:var(--purple)">${esc(level.judgeDesc || '')}</b>
        </div>
      </div>
      <div class="card">
        <div class="view-sub">📥 公开样例（提交时会追加隐藏用例${level.hasStress ? ' + 随机对拍' : ''}）</div>
        <div class="stat-grid">
          ${(level.samples || []).map(s => `<div class="stat" style="text-align:left">
            <b style="font-size:13px">${esc(s.name)}</b>
            <div style="font-size:12px">${s.args ? 'args: ' + esc(s.args.join(' | ')) : ''}${s.stdin ? 'stdin: ' + esc(s.stdin) : ''}</div>
            <div style="font-size:12px;color:var(--gold)">期望: ${esc(s.expect)}</div></div>`).join('') || '<div class="view-sub">本题无公开样例</div>'}
        </div>
      </div>
      <div class="card">
        <textarea id="codein" spellcheck="false">${esc(code)}</textarea>
        <div class="actions">
          <button onclick="JQ2UI.runSamples()">▶ 跑公开样例</button>
          <button onclick="JQ2UI.submit()" style="border-color:var(--gold);color:var(--gold)">🚀 提交评测</button>
          <button onclick="JQ2UI.resetCode()">↺ 恢复模板</button>
          <button onclick="JQ2UI.showHint()">💡 提示</button>
          <span id="runmsg" class="view-sub"></span>
        </div>
        <div id="verdict"></div>
      </div>
      ${level.hints && level.hints.length ? `<div class="card" id="hintbox" style="display:none">
        <b>💡 思路提示</b><div class="view-sub">${level.hints.map(h => '· ' + esc(h)).join('<br>')}</div></div>` : ''}`;
    document.getElementById('codein').addEventListener('input', e => localStorage.setItem(draftKey, e.target.value));
    document.getElementById('codein').addEventListener('keydown', e => {
      if (e.key === 'Tab') { e.preventDefault(); const t = e.target, s = t.selectionStart; t.value = t.value.slice(0, s) + '    ' + t.value.slice(t.selectionEnd); t.selectionStart = t.selectionEnd = s + 4; }
    });
    if (isBoss && !Q.save.solved[level.id]) startBossTimer(); else stopBossTimer();
    hud();
  };

  Q.runSamples = async function () {
    const msg = document.getElementById('runmsg');
    msg.textContent = '⏳ 编译并运行公开样例...';
    try {
      const r = await API.run(cur.level.id, document.getElementById('codein').value);
      msg.textContent = '';
      renderVerdict(r, true);
    } catch (e) { msg.textContent = '❌ ' + e.message; }
  };

  Q.submit = async function () {
    const msg = document.getElementById('runmsg');
    const level = cur.level, isBoss = Q.isBoss(level);
    if (isBoss && !Q.save.solved[level.id] && bossExpired()) {
      msg.textContent = '⌛ 本关挑战时间已到，本次不计入。返回地图重新进入可重新计时（提交次数会保留）。';
      return;
    }
    msg.textContent = '⏳ 编译中（首次约 1-3 秒）...';
    const attempt = Q.recordAttempt(level);   // 先记录提交次数，成就判定依赖它
    try {
      const r = await API.submit(level.id, document.getElementById('codein').value);
      msg.textContent = '';
      renderVerdict(r, false);
      if (isBoss && r.cases) renderStages(r);
      if (r.verdict === 'AC') {
        const res = Q.award(level, { ms: r.timeMs });
        stopBossTimer();
        hud();
        toastBadges(res && res.newBadges);
        if (res && res.xp > 0) {
          const nxt = Q.findLevel(cur.chapter.ch, level.order + 1);
          const timeUsed = Math.round((Q.BOSS_SECONDS * 1000 - Math.max(0, bossDeadline - Date.now())) / 1000);
          document.getElementById('verdict').insertAdjacentHTML('beforeend',
            `<div class="explain" style="border-left-color:var(--ok)">
              ${isBoss ? `👑 <b>BOSS 击破！</b>用时 ${timeUsed} 秒 · 第 ${attempt} 次提交` : '🎉 通关！'}+${Q.xpFor(level)} XP${nxt ? ` · 已解锁 <b>L${nxt.order} ${esc(nxt.title)}</b>` : ' · 本章全部完成！'}
              ${res.firstTry ? '<span class="chip ok">⚡ 一击必杀</span>' : ''}
              ${isBoss ? `<span class="chip ok">${Q.bossStats().done}/${Q.bossStats().total} BOSS</span>` : ''}
              <div class="view-sub" style="margin-top:6px">这一关你练的是：<b>${(cur.level.tags || []).map(esc).join(' · ') || esc(cur.level.stage)}</b>
              ${cur.level.mode === 'stress' ? '<br>本题用<b>随机对拍</b>验证：你的实现已在上百组随机数据上与参考实现一致，说明不是"碰巧过样例"。' : ''}
              ${cur.level.mode === 'design' ? '<br>这是<b>系统设计题</b>：你不只是写了一个函数，而是设计了一个能按操作序列正确演化的对象。' : ''}</div>
              ${nxt ? `<div style="margin-top:8px"><button onclick="JQ2UI.open('${nxt.id}')">▶ 挑战下一关</button></div>` : ''}
            </div>`);
        }
      } else if (isBoss) {
        const left = Math.max(0, bossDeadline - Date.now());
        msg.textContent = `第 ${attempt} 次提交未通过，剩余 ${String(Math.floor(left / 60000)).padStart(2, '0')}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`;
      }
    } catch (e) { msg.textContent = '❌ ' + e.message; }
  };

  // BOSS 阶段面板: 把用例编排成"公开序列 / 隐藏边界"多阶段
  function renderStages(r) {
    const stages = Q.stagesOf(cur.level, r.cases);
    const states = stages.map(s => s.cases.length > 0 && s.cases.every(c => c.verdict === 'AC'));
    const box = document.getElementById('bossstages');
    if (box) box.innerHTML = stageChips(cur.level, states);
    const passed = states.filter(Boolean).length;
    document.getElementById('verdict').insertAdjacentHTML('afterbegin',
      `<div class="card boss-card"><b>👑 BOSS 阶段进度 ${passed}/${stages.length}</b>
        <div class="view-sub">${stages.map((s, i) => `阶段 ${i + 1} ${s.name.split('· ')[1] || ''}：${states[i] ? '✅ 通过' : '❌ 未通过'}`).join(' · ')}</div></div>`);
  }

  // 错误诊断: 把判决翻译成"下一步该改什么", 让学生能自己修好
  function diagnose(c, level) {
    const v = c.verdict;
    if (v === 'TLE') return '⏱ 运行超时：算法复杂度可能过高。检查是否有多层嵌套循环、重复计算，或可以改用哈希表/前缀和/二分把 O(n²) 降到 O(n log n)。';
    if (v === 'MLE') return '💾 内存超限：检查是否创建了过大的数组、无限增长的集合，或在循环里不断 new 对象。';
    if (v === 'RE') return '💥 运行时错误：常见原因是数组越界、除以 0、空指针、递归过深。请检查下标范围与边界输入。';
    if (v === 'OLE') return '📤 输出过多：请只在需要时打印，本题返回值由 return 提供。';
    if (v === 'WA' && c.hidden) {
      return '❌ 隐藏用例未通过。隐藏用例专门考察边界（空输入、单元素、极值、重复元素、负数、溢出）。先自己把这些情况逐条过一遍，再回来看提示。';
    }
    if (v === 'WA') return '❌ 与期望值不一致：对照上面的「期望 / 实际」，先手工推演这一组输入应该得到什么，再看代码在哪一步偏了。';
    return '';
  }

  function renderVerdict(r, isRun) {
    const tone = r.verdict === 'AC' ? 'var(--ok)' : 'var(--bad)';
    let html = `<div class="card" style="border-color:${tone}">
      <div class="result-big" style="color:${tone};font-size:18px">
        ${Q.classifyVerdict(r.verdict)} ${r.total != null ? `· ${r.passed}/${r.total} 用例` : ''} · ${r.timeMs}ms
        ${isRun ? '<span class="chip">仅公开样例</span>' : '<span class="chip" style="border-color:var(--gold);color:var(--gold)">完整评测</span>'}
      </div>`;
    if (r.compile === false) {
      html += `<div class="view-sub">编译没通过。先按报错的行号定位语法问题（常见：少了分号、括号不配对、方法签名与题目要求不一致）。</div>
        <pre class="code" style="color:var(--bad)">${esc(r.message || '')}</pre>`;
    } else {
      html += `<div style="display:grid;gap:8px">`;
      for (const c of r.cases || []) {
        const ok = c.verdict === 'AC';
        html += `<div style="border:1px solid ${ok ? 'var(--line)' : 'var(--bad)'};border-radius:10px;padding:10px">
          <b style="color:${ok ? 'var(--ok)' : 'var(--bad)'}">${esc(c.name)} ${ok ? '✅' : '❌ ' + Q.classifyVerdict(c.verdict)}</b>
          ${c.hidden ? ' <span class="chip">隐藏用例</span>' : ''}
          ${c.timeMs != null ? `<span style="font-size:11px;color:var(--dim)"> ${c.timeMs}ms</span>` : ''}
          ${ok ? '' : (c.hidden
            ? `<div class="view-sub">${esc(diagnose(c, cur ? cur.level : {}))}</div>`
            : `<pre class="code">期望: ${esc(c.expect)}\n实际: ${esc(c.got) || '(空)'}${c.detail ? '\n' + esc(c.detail) : ''}</pre>
               <div class="view-sub">${esc(diagnose(c, cur ? cur.level : {}))}</div>`)}
        </div>`;
      }
      html += `</div>`;
    }
    html += `</div>`;
    document.getElementById('verdict').innerHTML = html;
    if (r.solution) {
      document.getElementById('verdict').insertAdjacentHTML('beforeend',
        `<details class="card"><summary style="cursor:pointer;color:var(--gold)">💡 查看参考实现（通关后开放）</summary><pre class="code">${esc(r.solution)}</pre></details>`);
    }
  }

  Q.resetCode = function () { document.getElementById('codein').value = cur.level.starter || ''; localStorage.removeItem('jq2.draft.' + cur.level.id); };
  Q.showHint = function () { const b = document.getElementById('hintbox'); if (b) b.style.display = b.style.display === 'none' ? '' : 'none'; };

  /* ------------------ 视图: 知识体系 / 战绩 ------------------ */
  const SYS = [
    ['语言基础与数据表示(第1章)', '进制与位运算 · 溢出与边界 · 字符串解析 · 浮点精度'],
    ['流程控制与状态机(第3章)', '分支覆盖 · 循环不变量 · 模拟与选择'],
    ['线性结构(第4章)', '数组原地操作 · 双指针 · 前缀和/差分 · 滑动窗口'],
    ['方法与递归(第5章)', '递归与回溯 · 分治 · 快速幂 · 大数'],
    ['内存与引用语义(第6章)', '值传递 vs 引用传递 · 深拷贝 · 对象生命周期'],
    ['数据结构选型(第12章)', '哈希 · 堆 · 平衡结构 · 字符串算法(KMP)'],
    ['算法设计(第10-12关)', '动态规划 · 贪心 · 图/树遍历 · 复杂度裁决'],
    ['系统设计(第13-15关 BOSS)', '缓存淘汰(LRU/LFU) · Trie · 状态机 · 资源调度']
  ];
  function viewRoute() {
    stage().innerHTML = `<div class="view-title">🧭 知识体系与关卡映射</div>
      <div class="view-sub">每章的 15 关不是平铺知识点，而是按「能独立解决同类问题」的能力曲线设计。</div>
      ${SYS.map(s => `<div class="card"><b style="color:var(--gold)">${esc(s[0])}</b><div class="view-sub">${esc(s[1])}</div></div>`).join('')}`;
    hud();
  }
  function viewBag() {
    const s = Q.save;
    const byStage = {};
    for (const c of Q.chapters) for (const l of c.levels) {
      byStage[l.stage] = byStage[l.stage] || { total: 0, done: 0 };
      byStage[l.stage].total++;
      if (s.solved[l.id]) byStage[l.stage].done++;
    }
    stage().innerHTML = `<div class="view-title">🎒 战绩</div>
      <div class="card"><div class="stat-grid">
        <div class="stat"><b>${s.xp}</b><span>XP</span></div>
        <div class="stat"><b>${Q.solvedCount()}/${Q.totalCount()}</b><span>已通关</span></div>
        <div class="stat"><b>${esc(Q.title(s.xp))}</b><span>称号</span></div>
        <div class="stat"><b>${Q.badgeCount()}/${Q.BADGES.length}</b><span>成就徽章</span></div>
      </div>
      ${Q.nextTitle(s.xp) ? `<div class="view-sub">下一称号「${esc(Q.nextTitle(s.xp).name)}」还需 ${Q.nextTitle(s.xp).need} XP</div>` : '<div class="view-sub">已达最高称号 🏆 JVM 之神</div>'}
      </div>
      <div class="card"><b>🏅 成就徽章</b>
        <div class="badge-wall">
          ${Q.badgeState().map(b => `<div class="badge-item ${b.unlocked ? 'on' : ''}">
            <span class="bi-icon">${b.unlocked ? b.icon : '🔒'}</span>
            <b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`).join('')}
        </div>
      </div>
      <div class="card"><b>👑 章节 BOSS 进度</b>
        <div class="view-sub">${Q.bossStats().done}/${Q.bossStats().total} 个 BOSS 已被击破${s.streak.best ? ` · 最佳连击 ${s.streak.best} 关首次即通过` : ''}</div>
        <div class="bar" style="width:100%;height:8px"><i style="width:${(Q.bossStats().done / Q.bossStats().total) * 100}%"></i></div>
      </div>
      <div class="card"><b>📊 阶段进度</b><div style="display:grid;gap:8px;margin-top:8px">
        ${Object.entries(byStage).map(([k, v]) => `<div>
          <div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:${STAGE_COLOR[k] || '#93a0c4'}">${esc(k)}</span><span>${v.done}/${v.total}</span></div>
          <div class="bar" style="width:100%;height:8px"><i style="width:${(v.done / v.total) * 100}%"></i></div>
        </div>`).join('')}
      </div></div>`;
    hud();
  }

  window.JQ2UI = Q;
  // 模板里用 JQ2UI.open(id) 打开关卡: 与 openLevel 是同一个入口
  Q.open = function (id) { return Q.openLevel(id); };
  Q.view = v => {
    stopBossTimer();   // 离开关卡视图即停表
    document.querySelectorAll('nav button[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === v));
    if (v === 'map') viewMap(); else if (v === 'route') viewRoute(); else viewBag();
  };

  /* ------------------ 启动 ------------------ */
  (async function boot() {
    Q.load();
    document.querySelectorAll('nav button[data-view]').forEach(b => b.addEventListener('click', () => Q.view(b.dataset.view)));
    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('确定重置全部关卡进度？（代码草稿也会清空）')) {
        Q.reset(); Object.keys(localStorage).filter(k => k.startsWith('jq2.draft.')).forEach(k => localStorage.removeItem(k)); Q.view('map');
      }
    });
    try {
      Q.chapters = await API.problems();
      for (const c of Q.chapters) for (const l of c.levels) l.ch = c.ch;
      Q.view('map');
    } catch (e) {
      stage().innerHTML = `<div class="card" style="border-color:var(--bad)">
        <b>无法连接评测服务</b>
        <div class="view-sub">请通过 <span class="kbd">node tools/serve.mjs 4319</span> 启动服务后访问 http://127.0.0.1:4319（不要用 file:// 直接打开）</div>
        <pre class="code">${esc(e.message)}</pre></div>`;
    }
  })();
})();
