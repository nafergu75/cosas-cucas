// Prueba el asistente de la portada sin navegador: saca de index.html la base de respuestas (KB)
// y el buscador (findAnswer) tal como están publicados, y pasa la batería de preguntas de
// herramientas/asistente-preguntas.json ({ "pregunta": "id esperado" }; null = debe decir que no entiende).
// Uso: node herramientas/probar-asistente.mjs        → solo los fallos y el total
//      node herramientas/probar-asistente.mjs -v     → todas las preguntas
// Además avisa de respuestas sin texto en valenciano y de enlaces a páginas que no existen.
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(raiz, 'index.html'), 'utf8');
const ini = html.indexOf('  var KB = [');
const fin = html.indexOf('  /* Referencias DOM */', ini);
if (ini < 0 || fin < 0) { console.error('No encuentro la base del asistente en index.html'); process.exit(1); }

const ctx = { document: { documentElement: { lang: 'es' } } };
vm.createContext(ctx);
vm.runInContext(`function lg(){return document.documentElement.lang==='ca'?'ca':'es'}
function L(v){return (v&&typeof v==='object')?(v[lg()]||v.es):v}
${html.slice(ini, fin)}
this.KB=KB; this.findAnswer=findAnswer; this.SUGGS=SUGGS;`, ctx);

const verbose = process.argv.includes('-v');
const bateria = JSON.parse(fs.readFileSync(path.join(raiz, 'herramientas', 'asistente-preguntas.json'), 'utf8'));
let bien = 0, mal = 0;
for (const [lang, preguntas] of Object.entries(bateria)) {
  ctx.document.documentElement.lang = lang;
  for (const [p, esperado] of Object.entries(preguntas)) {
    const r = ctx.findAnswer(p);
    const id = r ? r.id : null;
    const ok = id === esperado;
    ok ? bien++ : mal++;
    if (!ok || verbose) console.log(`${ok ? 'ok  ' : 'MAL '} [${lang}] ${p}  →  ${id}${ok ? '' : `  (esperaba ${esperado})`}`);
  }
}
// las sugerencias del panel también tienen que encontrar respuesta
for (const lang of ['es', 'ca']) {
  ctx.document.documentElement.lang = lang;
  for (const s of ctx.SUGGS[lang]) if (!ctx.findAnswer(s)) { mal++; console.log(`MAL  [${lang}] sugerencia sin respuesta: ${s}`); }
}
// cada respuesta en los dos idiomas; ids sin repetir; enlaces a páginas que existen
const ids = new Set();
for (const e of ctx.KB) {
  if (ids.has(e.id)) { mal++; console.log('MAL  id repetido: ' + e.id); }
  ids.add(e.id);
  for (const lg of ['es', 'ca']) {
    if (!e.body[lg]) { mal++; console.log(`MAL  ${e.id}: falta el texto en ${lg}`); }
    for (const [, href] of (e.body[lg] || '').matchAll(/href=['"]([^'"#?]*)/g)) {
      if (!href || /^(https?:|tel:|mailto:)/.test(href)) continue;
      if (!fs.existsSync(path.join(raiz, href + '.html')) && !fs.existsSync(path.join(raiz, href))) { mal++; console.log(`MAL  ${e.id} (${lg}): enlace a una página que no existe: ${href}`); }
    }
  }
}
console.log(`\n${bien} preguntas bien, ${mal} fallos · ${ctx.KB.length} respuestas en la base`);
process.exit(mal ? 1 : 0);
