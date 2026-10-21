// Comprueba que dos versiones de la portada acaban igual después de ejecutar el JavaScript:
// el contenido de cada bloque, el número de elementos y el texto visible, en castellano y en valenciano.
// Uso: node herramientas/comparar-dom.mjs <url-antes> <url-despues>
import { abrirPestana } from './cdp.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOQUES = JSON.parse(fs.readFileSync(path.join(RAIZ, 'herramientas', 'prerender-bloques.json'), 'utf8'));
const [A, B] = process.argv.slice(2);
const t = await abrirPestana();
await t.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

async function foto(url, lang) {
  const sid = (await t.send('Page.addScriptToEvaluateOnNewDocument', { source: `try{localStorage.setItem('cc-lang',${JSON.stringify(lang)})}catch(e){}` })).identifier;
  await t.ir(url);
  await t.evaluar(`new Promise(r=>{const fin=Date.now()+10000;const c=()=>(typeof DATOS!=='undefined'&&DATOS.noticias)||Date.now()>fin?r():setTimeout(c,100);c();})`);
  /* hasta que la página deja de cambiar (llegan las Falleras Mayores, el chat…): mismo número de
     elementos y de texto en tres medidas seguidas, como mucho 10 s */
  await t.evaluar(`new Promise(r=>{let prev='',iguales=0;const fin=Date.now()+10000;const c=()=>{const k=document.querySelectorAll('body *').length+'/'+document.body.innerText.length;iguales=k===prev?iguales+1:0;prev=k;if(iguales>=3||Date.now()>fin)r();else setTimeout(c,300);};c();})`);
  const r = await t.evaluar(`(() => {
    const norm = h => h.replace(/\\s+data-pre(="")?/g, '').replace(/\\s+/g, ' ').trim();
    const b = {};
    for (const id of ${JSON.stringify(BLOQUES)}) { const el = document.getElementById(id); b[id] = el ? norm(el.innerHTML) : null; }
    return { lang: document.documentElement.lang, preCa: document.documentElement.classList.contains('pre-ca'),
             n: document.querySelectorAll('body *').length, texto: document.body.innerText.length, b,
             h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim()) };
  })()`);
  await t.send('Page.removeScriptToEvaluateOnNewDocument', { identifier: sid });
  return r;
}
let mal = 0;
for (const lang of ['es', 'ca']) {
  const a = await foto(A, lang), b = await foto(B, lang);
  const dif = Object.keys(a.b).filter(k => a.b[k] !== b.b[k]);
  console.log(`[${lang}] idioma ${a.lang}/${b.lang} · elementos ${a.n}/${b.n} · texto ${a.texto}/${b.texto} · pre-ca quitado: ${!b.preCa} · h1 después: ${JSON.stringify(b.h1)}`);
  if (dif.length) { mal++; console.log('   bloques distintos:', dif.join(', ')); dif.slice(0, 3).forEach(k => console.log('   ', k, '\n     antes:', (a.b[k] || '').slice(0, 200), '\n     después:', (b.b[k] || '').slice(0, 200))); }
  if (a.n !== b.n || b.preCa) mal++;
}
console.log('errores de consola:', t.errores.length ? t.errores : 'ninguno');
await t.cerrar();
console.log(mal ? 'HAY DIFERENCIAS' : 'IGUAL');
