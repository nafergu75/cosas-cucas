'use strict';
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT         = 4747;
const ROOT         = __dirname;

// ── API Keys ────────────────────────────────────────────────────────
const PIXELAPI_KEY   = process.env.PIXELAPI_KEY   || 'pk_live_2a872eb44b38c170216adf5936bba77deeff15e9440161d8';
const ANTHROPIC_KEY  = process.env.ANTHROPIC_KEY  || '';
const BRAVE_KEY      = process.env.BRAVE_KEY       || '';
const CONTACT_KEY    = process.env.CONTACT_KEY     || '';   // Web3Forms access key

const PIXELAPI_URL   = 'https://api.pixelapi.dev/v1/virtual-tryon';
const ANTHROPIC_URL  = 'https://api.anthropic.com/v1/messages';
const BRAVE_URL      = 'https://api.search.brave.com/res/v1/web/search';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022';

// ── System prompt de Cuca ───────────────────────────────────────────
const CUCA_SYSTEM = `Eres Cuca, la asistente virtual experta de Cosas Cucas, una tienda de indumentaria valenciana artesanal en Valencia, España, fundada en 1982 por Paquita Martorell. Actualmente la llevan sus hijas Noelia, María y Paqui.

INFORMACIÓN DE LA TIENDA:
- Tienda Principal: C/ Grabador Esteve 30, Valencia · Tel: 963 511 556 · WhatsApp: 667 775 501
- Tienda Cabañal: C/ Vicent Gallart 49, Valencia · Tel: 963 714 997
- Email: info@cosascucas.es · Web: cosas-cucas.es
- Instagram: @cosascucas | TikTok: @cosas.cucas1982 | Facebook: Cosas Cucas
- Horario: Lunes–Viernes 10:00–13:30 y 17:00–20:00 | Sábados 10:30–13:30
- Especialidades: cotillas, manteletas, delantales bordados, aderezos (peinetas, fermalls, arracades), telas exclusivas (seda, brocado, terciopelo, jacquard), trajes de Fallera Mayor, decoración textil, zapatillas CC con tela fallera
- Precios orientativos: cotilla desde 180€, manteleta bordada desde 250€, delantal desde 120€, traje completo desde 800€, aderezos desde 45€
- Plazo de confección: 2–6 semanas piezas sueltas, 2–4 meses traje completo

INSTRUCCIONES DE COMPORTAMIENTO:
- Prioridad de búsqueda: si recibes resultados de búsqueda recientes entre [BÚSQUEDA:…], úsalos para enriquecer tu respuesta con datos actualizados.
- Fuentes: cuando uses información externa, indica la fuente al final con "📌 Fuente: …".
- Tono: profesional pero cercano. Sin frases como "Como modelo de lenguaje" o "Como IA". Habla de forma natural y directa.
- Formato: sé concisa. Usa viñetas para respuestas complejas. Evita respuestas largas salvo que se pida detalle.
- Si hay información contradictoria entre fuentes, menciónalo brevemente.
- Siempre que hablen de la tienda o de pedir cita, ofrece los datos de contacto al final.
- Responde en el mismo idioma que el usuario (castellano o valenciano). Si escribe en valenciano, responde en valenciano.
- Para consultas sobre Fallas, indumentaria valenciana u otras culturas, puedes usar tu conocimiento general actualizado con los datos de búsqueda.

CONOCIMIENTO SOBRE LAS FALLAS DE VALENCIA (Wikipedia):
- Origen del término: del latín "facula" (antorcha). Primera referencia documental: 19 marzo 1777, calle San Narciso, Valencia.
- Origen popular: carpinteros quemaban restos de taller y "parots" (lámparas de aceite) la víspera de San José (19 marzo).
- Festival declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2016 (ID: 00859, criterios R1–R5).
- Fechas: 1–19 de marzo, con apertura oficial (La Crida) el último domingo de febrero.
- Suspensiones: 1886, 1898, 1937–1939 (Guerra Civil), 2020 (COVID), 2021 (pospuesta a septiembre), 2024 (parcial, incendio Campanar 22 febrero).
- Junta Central Fallera (JCF): fundada 1939, organismo rector, ~400 comisiones en Valencia.
- Expansión: Getafe (Madrid) desde 1962; Mar del Plata (Argentina) desde 1954; Baleares, Andalucía, Castilla-La Mancha.
- Monumentos: armazón de madera, cartón piedra y poliuretano, carácter satírico, textos en valenciano. Récord: Na Jordana 2001 (33 metros).
- La Despertà: petardos "tro de bac" al amanecer cada día de fiesta.
- Mascletà: 14:00 h Plaza del Ayuntamiento, 1–19 marzo, +120 dB, presupuesto 6.000–9.000 €.
- Plantà: fallas infantiles instaladas antes de las 8:00 h del 15 marzo; adultas antes 8:00 h del 16 marzo.
- Exposición del Ninot: ~800 figuras en Ciudad de las Artes; votación popular salva el "ninot indultat" (tradición desde 1934).
- Cabalgata del Ninot: desfile de carrozas satíricas.
- Ofrenda: 17–18 marzo, +100.000 participantes/día, manto floral de 14 metros en la Basílica de la Virgen de los Desamparados.
- Nit del Foc: noche 18–19 marzo, +20 minutos, 2.450 kg de pólvora, +1 millón espectadores, río Turia.
- Cremà: 19 marzo — infantiles ~22:00, infantil municipal 23:00, adultas medianoche, Sección Especial 00:30, municipal 01:00.
- Premios: Sección Especial (9 fallas); récord Convento Jerusalén-Matemático Marzal con 18 primeros puestos. Categorías Primera A hasta Séptima C. Premio "Ingenio y gracia". Premios de iluminación desde 1975 (G.T.E. Sylvania).
- Música: +300 bandas. Pasodobles: "Paquito el Chocolatero", "Amparito Roca", "Valencia", "El Fallero". Dulzaina y tamboril como instrumentos tradicionales.
- Indumentaria femenina: peinado de tres moños, traje con cotilla, falda, delantal bordado, manteleta, pañuelo de cuello. Estilos: siglo XVIII (afrancesado), coteta, farolet (siglo XIX). Peineta inspirada en la Dama de Elche.
- Indumentaria masculina: pantalón torrentí o saragüell, chaleco, mocador, dulzaina, tamboril.`;

const MIME = {
  '.html':'text/html;charset=utf-8', '.css':'text/css', '.js':'application/javascript',
  '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg', '.gif':'image/gif', '.svg':'image/svg+xml',
  '.woff2':'font/woff2', '.woff':'font/woff', '.ttf':'font/ttf',
  '.ico':'image/x-icon', '.webp':'image/webp', '.mp4':'video/mp4',
};

/* ── helpers ───────────────────────────────────────────────────── */
function jsonRes(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

function bufferBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let length = 0;
    const MAX_SIZE = 5 * 1024 * 1024; // Límite de 5MB
    req.on('data', c => {
      length += c.length;
      if (length > MAX_SIZE) {
        req.destroy();
        reject(new Error('Payload Too Large'));
      }
      chunks.push(c);
    });
    req.on('end',  () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// ── Rate Limiting ───────────────────────────────────────────────
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 30; // 30 peticiones por minuto por IP

function checkRateLimit(ip) {
  const now = Date.now();
  const userLimiter = rateLimit.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  if (now > userLimiter.resetTime) {
    userLimiter.count = 0;
    userLimiter.resetTime = now + RATE_LIMIT_WINDOW;
  }
  userLimiter.count++;
  rateLimit.set(ip, userLimiter);
  return userLimiter.count <= MAX_REQUESTS;
}

async function braveSearch(query) {
  if (!BRAVE_KEY) return null;
  try {
    const r = await fetch(
      `${BRAVE_URL}?q=${encodeURIComponent(query)}&count=4&search_lang=es&country=es`,
      { headers: { 'Accept': 'application/json', 'X-Subscription-Token': BRAVE_KEY } }
    );
    if (!r.ok) return null;
    const data = await r.json();
    const results = (data.web?.results || []).slice(0, 4);
    if (!results.length) return null;
    return results
      .map(x => `• ${x.title}: ${x.description || ''} (${x.url})`)
      .join('\n');
  } catch (err) {
    console.error('[braveSearch]', err.message);
    return null;
  }
}

/* ── servidor ──────────────────────────────────────────────────── */
http.createServer(async (req, res) => {

  // ── CORS y Cabeceras de Seguridad ────────────────────────────
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:4747', 'http://127.0.0.1:4747',
    'https://cosascucas.es', 'https://www.cosascucas.es',
    'https://cosas-cucas.es', 'https://www.cosas-cucas.es'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Api-Key');
  
  // Cabeceras de Seguridad recomendadas
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  // ── Rate Limiting (Solo rutas API) ───────────────────────────
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (req.url.startsWith('/api/') && !checkRateLimit(ip)) {
    return jsonRes(res, 429, { error: 'Demasiadas peticiones. Por favor, espera un minuto.' });
  }

  // ── POST /api/try-on ─────────────────────────────────────────
  if (req.url === '/api/try-on' && req.method === 'POST') {
    const apiKey = PIXELAPI_KEY || req.headers['x-api-key'] || '';
    if (!apiKey) {
      return jsonRes(res, 503, {
        error: 'API key no configurada. Reinicia el servidor con: PIXELAPI_KEY=pk_live_… node server.js  — o configúrala en el probador.',
      });
    }
    try {
      const body        = await bufferBody(req);
      const contentType = req.headers['content-type'] || '';
      const apiRes = await fetch(PIXELAPI_URL, {
        method:  'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': contentType },
        body,
      });
      const text = await apiRes.text();
      res.writeHead(apiRes.status, { 'Content-Type': 'application/json' });
      res.end(text);
    } catch (err) {
      console.error('[/api/try-on]', err.message);
      if (err.message === 'Payload Too Large') {
        jsonRes(res, 413, { error: 'El archivo enviado es demasiado grande (máx. 5MB)' });
      } else {
        jsonRes(res, 500, { error: 'Error interno del servidor' });
      }
    }
    return;
  }

  // ── GET /api/try-on-status ───────────────────────────────────
  if (req.url === '/api/try-on-status' && req.method === 'GET') {
    return jsonRes(res, 200, { configured: !!PIXELAPI_KEY });
  }

  // ── POST /api/chat ───────────────────────────────────────────
  if (req.url === '/api/chat' && req.method === 'POST') {
    if (!ANTHROPIC_KEY) {
      return jsonRes(res, 503, { error: 'ANTHROPIC_KEY no configurada' });
    }
    try {
      const raw = await bufferBody(req);
      const { message, history = [] } = JSON.parse(raw.toString());

      if (!message || typeof message !== 'string') {
        return jsonRes(res, 400, { error: 'message requerido' });
      }

      // Búsqueda web opcional
      const searchSnippets = await braveSearch(message);
      let userContent = message;
      if (searchSnippets) {
        userContent += `\n\n[BÚSQUEDA: resultados recientes de internet:\n${searchSnippets}]`;
      }

      // Limitar historial a los últimos 10 mensajes para no exceder tokens
      const recentHistory = history.slice(-10).filter(
        m => m.role && m.content && typeof m.content === 'string'
      );

      const apiRes = await fetch(ANTHROPIC_URL, {
        method: 'POST',
        headers: {
          'x-api-key':         ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01',
          'content-type':      'application/json',
        },
        body: JSON.stringify({
          model:      ANTHROPIC_MODEL,
          max_tokens: 700,
          system:     CUCA_SYSTEM,
          messages:   [...recentHistory, { role: 'user', content: userContent }],
        }),
      });

      const data = await apiRes.json();
      if (!apiRes.ok) {
        console.error('[/api/chat] Anthropic error:', data);
        return jsonRes(res, 502, { error: data.error?.message || 'Error en la IA' });
      }

      const reply = data.content?.[0]?.text || 'Lo siento, no pude procesar la consulta.';
      return jsonRes(res, 200, { response: reply, searched: !!searchSnippets });

    } catch (err) {
      console.error('[/api/chat]', err.message);
      if (err.message === 'Payload Too Large') {
        return jsonRes(res, 413, { error: 'Mensaje demasiado largo.' });
      }
      return jsonRes(res, 500, { error: 'Error interno del servidor al procesar la solicitud.' });
    }
  }

  // ── GET /api/chat-status ─────────────────────────────────────
  if (req.url === '/api/chat-status' && req.method === 'GET') {
    return jsonRes(res, 200, { ai: !!ANTHROPIC_KEY, search: !!BRAVE_KEY });
  }

  // ── GET /api/contact-status ───────────────────────────────────
  if (req.url === '/api/contact-status' && req.method === 'GET') {
    return jsonRes(res, 200, { configured: !!CONTACT_KEY });
  }

  // ── GET /api/telas ────────────────────────────────────────────
  if (req.url === '/api/telas' && req.method === 'GET') {
    try {
      const telasDir = path.join(ROOT, 'telas');
      const files = await fs.promises.readdir(telasDir);
      const images = files.filter(f => f.match(/\.(jpg|jpeg|png)$/i));
      return jsonRes(res, 200, images);
    } catch (err) {
      console.error('[/api/telas]', err.message);
      return jsonRes(res, 500, { error: 'No se pudieron cargar las telas' });
    }
  }

  // ── POST /api/contact ─────────────────────────────────────────
  if (req.url === '/api/contact' && req.method === 'POST') {
    try {
      const raw = await bufferBody(req);
      const { name, email, subject, message } = JSON.parse(raw.toString());
      if (!name || !email || !message) {
        return jsonRes(res, 400, { error: 'Faltan campos requeridos' });
      }
      if (!CONTACT_KEY) {
        // Sin clave → el cliente usa mailto como fallback
        return jsonRes(res, 503, { error: 'CONTACT_KEY no configurada', fallback: true });
      }
      const apiRes = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: CONTACT_KEY,
          name,
          email,
          subject:   subject || 'Consulta desde cosascucas.es',
          message,
          from_name: 'Web Cosas Cucas',
          replyto:   email,
        }),
      });
      const data = await apiRes.json();
      if (data.success) return jsonRes(res, 200, { ok: true });
      return jsonRes(res, 500, { error: data.message || 'Error al enviar el mensaje' });
    } catch (err) {
      console.error('[/api/contact]', err.message);
      if (err.message === 'Payload Too Large') {
        return jsonRes(res, 413, { error: 'El mensaje supera el tamaño permitido.' });
      }
      return jsonRes(res, 500, { error: 'Error interno al enviar el mensaje de contacto.' });
    }
  }

  // ── Archivos estáticos ───────────────────────────────────────
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  // Normalizar la ruta para evitar Path Traversal (ej. ../../etc/passwd)
  const full = path.normalize(path.join(ROOT, p));
  if (!full.startsWith(ROOT)) { res.writeHead(403); return res.end(); }

  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext  = path.extname(full).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });

}).listen(PORT, () => {
  console.log(`\n✦ Cosas Cucas · servidor listo`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   PIXELAPI_KEY:  ${PIXELAPI_KEY  ? '✓ configurada' : '✗ no configurada'}`);
  console.log(`   ANTHROPIC_KEY: ${ANTHROPIC_KEY ? '✓ configurada' : '✗ no configurada  →  ANTHROPIC_KEY=sk-ant-… node server.js'}`);
  console.log(`   BRAVE_KEY:     ${BRAVE_KEY     ? '✓ configurada (búsqueda web activa)' : '✗ no configurada  →  opcional, activa búsqueda en tiempo real'}`);
  console.log(`   CONTACT_KEY:   ${CONTACT_KEY   ? '✓ configurada (formulario activo)'   : '✗ no configurada  →  CONTACT_KEY=xxxxxxxx node server.js  (Web3Forms)'}\n`);
  console.log(`   Web3Forms key: web3forms.com/create  →  introduce info@cosascucas.es, recibe la clave por email\n`);
});
