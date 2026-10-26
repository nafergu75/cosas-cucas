/* Páginas de servicio (decoracion.html, trajes-a-medida.html, espolin.html, indumentaria-infantil.html):
   idioma, cabecera compacta y visor de fotos. Cada página define antes, en un <script> propio:
     window.CC_VAL = { clave: 'texto en valenciano', … }   (las claves de data-t, data-t-alt, data-t-aria y data-t-href)
     window.CC_META_VAL = { title: '…', desc: '…' }         (título y descripción en valenciano)
   El castellano está escrito en la página. La elección se guarda en cc-lang, la misma clave que la
   portada, así que se mantiene al ir y volver. */

(function () {
  var VAL = window.CC_VAL || {};
  var META_VAL = window.CC_META_VAL || {};
  try {
    var desc = document.querySelector('meta[name="description"]');
    var ES = { title: document.title, desc: desc ? desc.content : '' };
    var textos = [].slice.call(document.querySelectorAll('[data-t]'));
    var alts = [].slice.call(document.querySelectorAll('[data-t-alt]'));
    var arias = [].slice.call(document.querySelectorAll('[data-t-aria]'));
    var hrefs = [].slice.call(document.querySelectorAll('[data-t-href]'));
    textos.forEach(function (el) { el._es = el.innerHTML; });
    alts.forEach(function (el) { el._es = el.alt; });
    arias.forEach(function (el) { el._es = el.getAttribute('aria-label'); });
    hrefs.forEach(function (el) { el._es = el.getAttribute('href'); });
    // si falta una traducción, se queda el castellano (nunca «undefined»)
    var val = function (k, es) { return VAL[k] !== undefined ? VAL[k] : es; };

    var poner = function (lang) {
      var ca = lang === 'ca';
      textos.forEach(function (el) { el.innerHTML = ca ? val(el.dataset.t, el._es) : el._es; });
      alts.forEach(function (el) { el.alt = ca ? val(el.dataset.tAlt, el._es) : el._es; });
      arias.forEach(function (el) { el.setAttribute('aria-label', ca ? val(el.dataset.tAria, el._es) : el._es); });
      hrefs.forEach(function (el) { el.setAttribute('href', ca ? val(el.dataset.tHref, el._es) : el._es); });
      document.documentElement.lang = ca ? 'ca' : 'es';
      document.title = ca && META_VAL.title ? META_VAL.title : ES.title;
      if (desc) desc.content = ca && META_VAL.desc ? META_VAL.desc : ES.desc;
      [].forEach.call(document.querySelectorAll('.nav__lang button'), function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
      });
      // para lo que la página pinta con datos (por ejemplo la lista de Falleras Mayores Infantiles)
      window.CC_LANG = lang;
      document.dispatchEvent(new CustomEvent('cc-idioma', { detail: lang }));
    };
    window.CC_LANG = 'es';

    var inicial = 'es';
    try { if (localStorage.getItem('cc-lang') === 'ca') inicial = 'ca'; } catch (e) {}
    if (inicial === 'ca') poner('ca');

    var selector = document.querySelector('.nav__lang');
    if (selector) selector.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (!b) return;
      poner(b.dataset.lang);
      try { localStorage.setItem('cc-lang', b.dataset.lang); } catch (err) {}
    });
  } finally {
    document.documentElement.classList.remove('pre-ca'); // la página nunca se queda oculta
  }
})();

/* Cabecera compacta al bajar */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var onScroll = function () { nav.classList.toggle('nav--shrunk', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* Visor: las fotos de .ideas se abren en grande; flechas del teclado y Esc para cerrar.
   Se pasa de una foto a otra dentro de la misma rejilla. Funciona también con fotos que la
   página añade después (se buscan al hacer clic). */
(function () {
  var visor = document.getElementById('visor');
  if (!visor || typeof visor.showModal !== 'function') return;
  var botones = [];
  var img = document.getElementById('visor-img');
  var pie = document.getElementById('visor-pie');
  var cuenta = document.getElementById('visor-cuenta');
  var actual = 0;
  function mostrar(i) {
    actual = (i + botones.length) % botones.length;
    var foto = botones[actual].querySelector('img');
    var texto = botones[actual].querySelector('span');
    img.src = foto.currentSrc || foto.src;
    img.alt = foto.alt;
    // pie de dos líneas (nombre y cargo): en el visor van seguidos con « · »
    pie.textContent = !texto ? '' : texto.children.length
      ? [].map.call(texto.children, function (c) { return c.textContent; }).join(' · ')
      : texto.textContent;
    cuenta.textContent = (actual + 1) + ' / ' + botones.length;
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.ideas button');
    if (!b) return;
    botones = [].slice.call(b.closest('.ideas').querySelectorAll('button'));
    mostrar(botones.indexOf(b));
    visor.showModal();
  });
  document.getElementById('visor-cerrar').addEventListener('click', function () { visor.close(); });
  document.getElementById('visor-ant').addEventListener('click', function () { mostrar(actual - 1); });
  document.getElementById('visor-sig').addEventListener('click', function () { mostrar(actual + 1); });
  visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });
  visor.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(actual - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(actual + 1); }
  });
  visor.addEventListener('close', function () { botones[actual].focus(); });
})();
