/**
 * COSAS CUCAS — Cloudflare Worker: proxy seguro para la API de Anthropic
 * =========================================================================
 * Este Worker actúa de intermediario entre el chatbot (HTML) y la API de
 * Claude. La API key NUNCA sale al navegador — vive en el Worker como secret.
 *
 * DESPLIEGUE (5 minutos, cuenta gratis):
 * 1. Ve a https://dash.cloudflare.com → Workers & Pages → Create application
 * 2. "Create Worker" → dale un nombre (ej: cosascucas-chat) → Deploy
 * 3. Edita el worker con este código
 * 4. Ve a Settings → Variables → Add variable (secret):
 *      Name:  ANTHROPIC_API_KEY
 *      Value: sk-ant-api03-xxxxxxxxxxxxxxxx  ← tu clave de Anthropic
 * 5. Copia la URL del worker (ej: https://cosascucas-chat.miusuario.workers.dev)
 * 6. Pégala en index.html donde pone: const CHAT_ENDPOINT = '...'
 *
 * Tier gratuito: 100.000 peticiones/día — más que suficiente.
 * =========================================================================
 */

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {

    /* Pre-flight CORS */
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    if (!env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured in Worker secrets' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } }
      );
    }

    try {
      const body = await request.json();

      /* Llamada a Anthropic — claude-haiku-3-5 (rápido, económico).
         Cambia a claude-sonnet-4-5 si quieres más calidad de respuesta. */
      const upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method:  'POST',
        headers: {
          'Content-Type':    'application/json',
          'x-api-key':       env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model:      body.model      ?? 'claude-haiku-3-5',
          max_tokens: body.max_tokens ?? 512,
          system:     body.system,
          messages:   body.messages,
        }),
      });

      const data = await upstream.json();

      return new Response(JSON.stringify(data), {
        status: upstream.status,
        headers: { 'Content-Type': 'application/json', ...CORS },
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } }
      );
    }
  },
};
