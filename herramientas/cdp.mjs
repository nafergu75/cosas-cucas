// Conexión mínima con Chrome (DevTools Protocol) para las herramientas de la web.
// Chrome tiene que estar abierto con --remote-debugging-port (por defecto 9344).
export async function abrirPestana(puerto = 9344) {
  const tab = await (await fetch(`http://127.0.0.1:${puerto}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pend = new Map(), oyentes = [];
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } else oyentes.forEach(f => f(m));
  });
  const send = (method, params = {}) => new Promise((res, rej) => {
    const i = ++id;
    pend.set(i, m => (m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result)));
    ws.send(JSON.stringify({ id: i, method, params }));
  });
  const evaluar = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  const errores = [];
  oyentes.push(m => {
    if (m.method === 'Runtime.exceptionThrown') errores.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errores.push(m.params.entry.text + ' ' + (m.params.entry.url || ''));
  });
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  const esperar = ms => new Promise(r => setTimeout(r, ms));
  async function ir(url) {
    await send('Page.navigate', { url: 'about:blank' });
    await esperar(150);
    const cargada = new Promise(r => { const f = m => { if (m.method === 'Page.loadEventFired') { oyentes.splice(oyentes.indexOf(f), 1); r(); } }; oyentes.push(f); });
    await send('Page.navigate', { url });
    await Promise.race([cargada, esperar(20000)]);
    await evaluar(`new Promise(r=>{const c=()=>document.readyState==='complete'?r():setTimeout(c,100);c();})`);
  }
  async function cerrar() { ws.close(); await fetch(`http://127.0.0.1:${puerto}/json/close/${tab.id}`).catch(() => {}); }
  return { send, evaluar, ir, cerrar, errores, esperar };
}
