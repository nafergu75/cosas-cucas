// Escribe en index.html, en castellano, el texto que la portada pinta con JavaScript al cargar
// (títulos, presentación, historia, tiendas, horario, pie…). Así Google, Bing y los asistentes de IA
// lo leen sin ejecutar JavaScript y la página no da un salto al cargar. Al cargar, el JavaScript
// lo vuelve a escribir igual (o en valenciano), así que no cambia nada de lo que se ve.
//
// Solo toca los bloques de la lista BLOQUES, y solo si en index.html están vacíos o ya son
// prerenderizados (marcados con data-pre). Las noticias, Falleras Mayores y demás datos del panel
// NO se escriben aquí: cambian desde el panel y se quedarían viejos.
//
// Uso (con la web servida en local y Chrome abierto con --remote-debugging-port=9344):
//   node herramientas/prerender.mjs http://localhost:3457/            → solo informa
//   node herramientas/prerender.mjs http://localhost:3457/ --escribir → actualiza index.html
// Volver a ejecutarlo después de cambiar textos de `translations` en index.html.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { abrirPestana } from './cdp.mjs';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INDEX = path.join(RAIZ, 'index.html');
const URL_WEB = process.argv[2] || 'http://localhost:3457/';
const ESCRIBIR = process.argv.includes('--escribir');
const LISTAR = process.argv.includes('--candidatos');

// Bloques que se escriben en la página (id del elemento)
const BLOQUES = JSON.parse(fs.readFileSync(path.join(RAIZ, 'herramientas', 'prerender-bloques.json'), 'utf8'));

const t = await abrirPestana();
await t.send('Page.addScriptToEvaluateOnNewDocument', { source: "try{localStorage.removeItem('cc-lang')}catch(e){}" });
await t.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await t.ir(URL_WEB);
// DATOS es una constante del script (no está en window): se espera a que lleguen las noticias, como mucho 10 s
await t.evaluar(`new Promise(r=>{const fin=Date.now()+10000;const c=()=>(typeof DATOS!=='undefined'&&DATOS.noticias)||Date.now()>fin?r():setTimeout(c,100);c();})`);
await t.esperar(800);

const fuente = fs.readFileSync(INDEX, 'utf8');
const res = await t.evaluar(`(() => {
  const src = new DOMParser().parseFromString(${JSON.stringify(fuente)}, 'text/html');
  const vacio = el => !el.children.length && !el.textContent.trim();
  const out = [];
  for (const el of src.querySelectorAll('body [id]')) {
    const vivo = document.getElementById(el.id);
    if (!vivo || !(vacio(el) || el.hasAttribute('data-pre'))) continue;
    const html = vivo.innerHTML.trim();
    if (!html) continue;
    out.push({ id: el.id, tag: el.tagName.toLowerCase(), len: html.length, html, texto: vivo.textContent.replace(/\\s+/g, ' ').trim().slice(0, 70) });
  }
  return { lang: document.documentElement.lang, out };
})()`);
await t.cerrar();
if (res.lang !== 'es') throw new Error('La página no está en castellano: ' + res.lang);

if (LISTAR) {
  for (const c of res.out) console.log(`${c.id.padEnd(28)} <${c.tag}> ${String(c.len).padStart(6)}  ${c.texto}`);
} else {

let html = fuente, hechos = 0;
for (const id of BLOQUES) {
  const c = res.out.find(x => x.id === id);
  if (!c) { console.log('  (sin contenido o no vacío en la fuente):', id); continue; }
  // etiqueta de apertura con ese id y SU cierre (contando las etiquetas iguales que haya dentro:
  // un bloque ya prerenderizado puede llevar otros <div> dentro)
  const ini = html.search(new RegExp(`<${c.tag}\\b[^>]*\\bid="${id}"[^>]*>`));
  if (ini < 0) throw new Error('No encuentro el bloque en index.html: ' + id);
  const abre = html.slice(ini).match(new RegExp(`^<${c.tag}\\b[^>]*>`))[0];
  const rx = new RegExp(`<${c.tag}\\b[^>]*>|</${c.tag}>`, 'g');
  rx.lastIndex = ini + abre.length;
  let nivel = 1, m;
  while ((m = rx.exec(html))) {
    if (m[0][1] === '/') { if (--nivel === 0) break; } else if (!m[0].endsWith('/>')) nivel++;
  }
  if (!m) throw new Error('Sin cierre en index.html: ' + id);
  const dentro = html.slice(ini + abre.length, m.index);
  const yaPre = /\sdata-pre/.test(abre);
  if (!yaPre && dentro.replace(/<!--[\s\S]*?-->/g, '').trim()) throw new Error('El bloque no está vacío en index.html: ' + id);
  const abreNueva = yaPre ? abre : abre.replace(/\s*>$/, ' data-pre>');
  html = html.slice(0, ini) + abreNueva + c.html + html.slice(m.index);
  hechos++;
}
console.log(`${hechos} de ${BLOQUES.length} bloques`);
if (ESCRIBIR) { fs.writeFileSync(INDEX, html); console.log('index.html actualizado'); }
}
