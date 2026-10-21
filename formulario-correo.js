/* ═══════════════════════════════════════════════════════════════════
   FORMULARIO DE CORREO — Cosas Cucas
   ─────────────────────────────────────────────────────────────────
   Los botones con data-correo («Pedir cita», «Consultar proyecto»,
   «Pedir asesoramiento», «Pedir mi par»…) abren una ventanita con nombre,
   teléfono, correo y mensaje. Al enviar, el mensaje llega a
   info@cosascucas.es a través de FormSubmit (formsubmit.co: gratis y sin
   cuenta), sin abrir el correo de la clienta.

   data-correo = "cita" | "proyecto" | "consulta" (cambia el texto de ayuda
   del mensaje). data-correo-extra (opcional) se añade al asunto, por
   ejemplo la colección desde la que se pide la cita.

   APAGADO (ACTIVO = false) desde el 20-10-2026: el dominio cosascucas.es no
   resuelve (los servidores de IONOS rechazan las consultas), así que a
   info@ no llega ningún correo. Mientras esté apagado, el script no hace
   nada y cada botón sigue con su enlace de siempre.

   PARA ACTIVARLO, cuando info@cosascucas.es vuelva a recibir correo:
   1. ACTIVO = true.
   2. Subir el ?v= de este archivo en index.html y landing.html (caché).
   3. Añadir FormSubmit a politica-privacidad.html.
   4. Publicar y mandar un mensaje de prueba desde la web. FormSubmit envía
      a info@ un correo «Activate Form»: hasta que se pulsa ese enlace no
      entrega nada.
═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ACTIVO = false;
  var DESTINO = 'https://formsubmit.co/ajax/info@cosascucas.es';
  var WHATSAPP = '34667775501';

  if (!ACTIVO || !window.fetch) return;

  var T = {
    es: {
      intro: 'Déjanos tus datos y te contestamos lo antes posible.',
      nombre: 'Nombre', telefono: 'Teléfono (opcional)', correo: 'Correo electrónico', mensaje: 'Mensaje',
      ph: {
        cita: '¿Qué día y hora te vienen mejor? ¿Qué traje o pieza te interesa?',
        proyecto: 'Cuéntanos qué te gustaría (cortinas, tapizado, colcha…) y las medidas si las tienes.',
        consulta: 'Escribe aquí tu consulta.'
      },
      privacidad: 'He leído y acepto la <a href="politica-privacidad.html" target="_blank" rel="noopener">política de privacidad</a>.',
      enviar: 'Enviar', enviando: 'Enviando…', cerrar: 'Cerrar',
      faltan: 'Escribe tu nombre, tu correo y el mensaje.',
      malCorreo: 'Revisa el correo electrónico.',
      faltaPriv: 'Marca la casilla de la política de privacidad.',
      ok: 'Mensaje enviado. Te contestaremos lo antes posible.',
      error: 'No se ha podido enviar. Prueba otra vez o escríbenos por WhatsApp al '
    },
    ca: {
      intro: "Deixa'ns les teues dades i et contestarem com més prompte millor.",
      nombre: 'Nom', telefono: 'Telèfon (opcional)', correo: 'Correu electrònic', mensaje: 'Missatge',
      ph: {
        cita: "Quin dia i hora et van millor? Quin vestit o peça t'interessa?",
        proyecto: "Conta'ns què t'agradaria (cortines, entapissat, colxa…) i les mesures si les tens.",
        consulta: 'Escriu ací la teua consulta.'
      },
      privacidad: 'He llegit i accepte la <a href="politica-privacidad.html" target="_blank" rel="noopener">política de privacitat</a>.',
      enviar: 'Enviar', enviando: "S'està enviant…", cerrar: 'Tancar',
      faltan: 'Escriu el teu nom, el teu correu i el missatge.',
      malCorreo: 'Revisa el correu electrònic.',
      faltaPriv: 'Marca la casella de la política de privacitat.',
      ok: 'Missatge enviat. Et contestarem com més prompte millor.',
      error: "No s'ha pogut enviar. Torna-ho a provar o escriu-nos per WhatsApp al "
    }
  };

  function lang() { return document.documentElement.lang === 'ca' ? 'ca' : 'es'; }

  var CSS = '' +
    '.ccf{position:fixed;inset:0;z-index:5000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(26,23,20,.55)}' +
    '.ccf[hidden]{display:none}' +
    '.ccf__box{position:relative;width:100%;max-width:480px;max-height:calc(100vh - 32px);overflow:auto;background:#F4EDD8;color:#1A1714;border:1px solid #B5903A;padding:32px 28px 26px;font-family:"Space Grotesk",system-ui,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.35)}' +
    '.ccf__x{position:absolute;top:10px;right:10px;width:36px;height:36px;border:0;background:none;font-size:22px;line-height:1;color:#1A1714;cursor:pointer}' +
    '.ccf__t{font-family:"Playfair Display",Georgia,serif;font-weight:400;font-size:1.6rem;margin:0 36px 6px 0}' +
    '.ccf__intro{font-size:.9rem;color:#5b5140;margin:0 0 18px}' +
    '.ccf label{display:block;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#5b5140;margin:12px 0 5px}' +
    '.ccf input[type=text],.ccf input[type=email],.ccf input[type=tel],.ccf textarea{width:100%;box-sizing:border-box;border:1px solid #cbbd97;background:#FDFAF3;padding:10px 12px;font:inherit;font-size:.95rem;color:#1A1714}' +
    '.ccf textarea{min-height:110px;resize:vertical}' +
    '.ccf input:focus,.ccf textarea:focus{outline:2px solid #B5903A;outline-offset:1px}' +
    '.ccf__priv{display:flex;gap:10px;align-items:flex-start;font-size:.85rem;margin:16px 0 0;text-transform:none!important;letter-spacing:0!important;color:#1A1714!important}' +
    '.ccf__priv input{margin-top:3px;accent-color:#B5903A}' +
    '.ccf__priv a{color:#8a6a22}' +
    '.ccf__hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;overflow:hidden}' +
    '.ccf__send{margin-top:18px;width:100%;padding:13px 18px;border:0;background:#B5903A;color:#fff;font:inherit;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}' +
    '.ccf__send[disabled]{opacity:.6;cursor:wait}' +
    '.ccf__msg{font-size:.9rem;margin:12px 0 0;min-height:1.2em}' +
    '.ccf__msg--mal{color:#a1301f}.ccf__msg--bien{color:#5c7a2e}' +
    '.ccf__msg a{color:inherit}' +
    '@media (max-width:480px){.ccf__box{padding:28px 18px 20px}.ccf__t{font-size:1.35rem}}';

  var caja, titulo, intro, f, msg, enviarBtn, origen, tipo, extra, asunto;

  function crear() {
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    caja = document.createElement('div');
    caja.className = 'ccf';
    caja.hidden = true;
    caja.innerHTML =
      '<div class="ccf__box" role="dialog" aria-modal="true" aria-labelledby="ccf-t">' +
        '<button type="button" class="ccf__x">×</button>' +
        '<h2 class="ccf__t" id="ccf-t"></h2>' +
        '<p class="ccf__intro"></p>' +
        '<form novalidate>' +
          '<label for="ccf-nombre"></label><input type="text" id="ccf-nombre" name="nombre" autocomplete="name" required>' +
          '<label for="ccf-tel"></label><input type="tel" id="ccf-tel" name="telefono" autocomplete="tel">' +
          '<label for="ccf-correo"></label><input type="email" id="ccf-correo" name="correo" autocomplete="email" required>' +
          '<label for="ccf-msj"></label><textarea id="ccf-msj" name="mensaje" required></textarea>' +
          '<div class="ccf__hp" aria-hidden="true"><input type="text" name="_honey" tabindex="-1" autocomplete="off"></div>' +
          '<label class="ccf__priv"><input type="checkbox" id="ccf-priv" required><span></span></label>' +
          '<button type="submit" class="ccf__send"></button>' +
          '<p class="ccf__msg" role="status" aria-live="polite"></p>' +
        '</form>' +
      '</div>';
    document.body.appendChild(caja);

    titulo = caja.querySelector('.ccf__t');
    intro = caja.querySelector('.ccf__intro');
    f = caja.querySelector('form');
    msg = caja.querySelector('.ccf__msg');
    enviarBtn = caja.querySelector('.ccf__send');

    caja.querySelector('.ccf__x').addEventListener('click', cerrar);
    caja.addEventListener('mousedown', function (e) { if (e.target === caja) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (caja.hidden) return;
      /* Escape cierra solo esta ventanita, no la de colecciones que pueda haber debajo */
      if (e.key === 'Escape') { e.stopImmediatePropagation(); cerrar(); return; }
      if (e.key === 'Tab') {  /* el foco no sale de la ventanita */
        var fs = caja.querySelectorAll('button, input:not([tabindex="-1"]), textarea, a[href]');
        var a = fs[0], z = fs[fs.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    }, true);
    f.addEventListener('submit', enviar);
  }

  function textos() {
    var t = T[lang()];
    caja.querySelector('.ccf__x').setAttribute('aria-label', t.cerrar);
    intro.textContent = t.intro;
    caja.querySelector('label[for="ccf-nombre"]').textContent = t.nombre;
    caja.querySelector('label[for="ccf-tel"]').textContent = t.telefono;
    caja.querySelector('label[for="ccf-correo"]').textContent = t.correo;
    caja.querySelector('label[for="ccf-msj"]').textContent = t.mensaje;
    caja.querySelector('#ccf-msj').placeholder = t.ph[tipo] || t.ph.consulta;
    caja.querySelector('.ccf__priv span').innerHTML = t.privacidad;
    enviarBtn.textContent = t.enviar;
  }

  function avisar(texto, clase, conWhatsApp) {
    msg.className = 'ccf__msg' + (clase ? ' ccf__msg--' + clase : '');
    msg.textContent = texto;
    if (conWhatsApp) {
      var a = document.createElement('a');
      a.href = 'https://wa.me/' + WHATSAPP;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = '667 775 501';
      msg.appendChild(a);
      msg.appendChild(document.createTextNode('.'));
    }
  }

  function abrir(btn) {
    if (!caja) crear();
    origen = btn;
    tipo = btn.getAttribute('data-correo') || 'consulta';
    extra = btn.getAttribute('data-correo-extra') || '';
    var nombreBoton = (btn.textContent || '').replace(/\s+/g, ' ').trim();
    asunto = 'Web Cosas Cucas · ' + (nombreBoton || 'Consulta') + (extra ? ' · ' + extra : '');
    titulo.textContent = nombreBoton || T[lang()].enviar;
    textos();
    avisar('', '');
    enviarBtn.disabled = false;
    f.hidden = false;
    caja.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    setTimeout(function () { caja.querySelector('#ccf-nombre').focus(); }, 30);
  }

  function cerrar() {
    caja.hidden = true;
    document.documentElement.style.overflow = '';
    if (origen && origen.focus) origen.focus();
  }

  function enviar(e) {
    e.preventDefault();
    var t = T[lang()];
    var nombre = f.nombre.value.trim();
    var tel = f.telefono.value.trim();
    var correo = f.correo.value.trim();
    var mensaje = f.mensaje.value.trim();
    if (!nombre || !correo || !mensaje) { avisar(t.faltan, 'mal'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) { avisar(t.malCorreo, 'mal'); return; }
    if (!caja.querySelector('#ccf-priv').checked) { avisar(t.faltaPriv, 'mal'); return; }

    enviarBtn.disabled = true;
    enviarBtn.textContent = t.enviando;
    avisar('', '');

    fetch(DESTINO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: asunto,
        _template: 'table',
        _captcha: 'false',
        _honey: f._honey.value,
        'Nombre': nombre,
        'Teléfono': tel || '—',
        'email': correo,        /* FormSubmit lo usa como dirección de respuesta */
        'Mensaje': mensaje,
        'Página': location.origin + location.pathname,
        'Idioma': lang() === 'ca' ? 'Valenciano' : 'Castellano'
      })
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (d) {
        if (d && (d.success === true || d.success === 'true')) {
          f.reset();
          enviarBtn.textContent = t.enviar;
          avisar(t.ok, 'bien');
        } else {
          throw new Error(d && d.message ? d.message : 'sin respuesta');
        }
      })
      .catch(function () {
        enviarBtn.disabled = false;
        enviarBtn.textContent = t.enviar;
        avisar(t.error, 'mal', true);
      });
  }

  /* Delegado en el documento: vale también para los botones que se pintan con JS
     (reseñas, ventana de colecciones, pie) y para los que se repintan al cambiar de idioma.
     En fase de captura y parando la propagación, para que el desplazamiento suave de los
     enlaces #contacto (landing) no se dispare a la vez que la ventanita. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-correo]');
    if (!btn) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
    e.preventDefault();
    e.stopPropagation();
    abrir(btn);
  }, true);
})();
