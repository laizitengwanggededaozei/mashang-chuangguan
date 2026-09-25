/* JavaQuest v2 API 客户端 */
window.API = {
  async _post(url, problemId, code) {
    const r = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemId, code })
    });
    let j = null;
    try { j = await r.json(); } catch { j = null; }
    if (!r.ok) throw new Error((j && j.error) || ('评测接口失败 ' + r.status));
    return j;
  },
  async problems() {
    const r = await fetch('/api/problems');
    if (!r.ok) throw new Error('题库接口失败 ' + r.status);
    return (await r.json()).chapters || [];
  },
  submit: (problemId, code) => window.API._post('/api/judge', problemId, code),
  run: (problemId, code) => window.API._post('/api/run', problemId, code)
};
