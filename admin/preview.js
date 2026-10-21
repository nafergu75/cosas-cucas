/* Vista previa de las noticias en el panel (Sveltia CMS 0.250.0). Versión final, 21-10-2026.
   Se carga con <script> clásico DESPUÉS de sveltia-cms.js: usa las globales CMS y html (HTM).
   Enseña cómo quedará la tarjeta de «Más noticias» (dos huecos 3:4 o uno 3:2), el aviso y el pase de la
   portada, el carrusel (3:2) con el encuadre de cada foto y el texto, en castellano o en valenciano.
   Avisa si una foto no tiene la forma o el tamaño de su hueco (mide naturalWidth/naturalHeight de la foto
   ya cargada), si falta un texto en un idioma, si un enlace no va a funcionar y qué noticia sale en portada.
   No guarda nada: solo mira. */
(function () {
  'use strict';
  if (!window.CMS || typeof window.html !== 'function') {
    console.warn('[preview.js] Sveltia no está cargado: la vista previa de noticias no se registra.');
    return;
  }
  var html = window.html;
  var React = CMS.React;
  var useState = React.useState;
  var useEffect = React.useEffect;

  /* ── Estilos del iframe de la vista previa (no hereda los del panel) ── */
  var CSS = [
    ':root{--crema:#fdfaf3;--tinta:#2a1f17;--suave:#6b5b4d;--oro:#a8823f;--osc:#1f1712;--aviso:#b3261e;--ok:#2e6b3a}',
    'body{margin:0;background:var(--crema);color:var(--tinta);font:15px/1.5 Georgia,"Times New Roman",serif}',
    '.pv{padding:18px 20px 40px;max-width:760px}',
    '.pv h2{font:600 12px/1.2 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--oro);margin:28px 0 10px;border-top:1px solid #e6dccb;padding-top:14px}',
    '.pv__bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font:13px system-ui,sans-serif}',
    '.chip{display:inline-block;padding:2px 9px;border-radius:99px;background:#efe6d6;color:var(--suave);font:12px system-ui,sans-serif}',
    '.chip--si{background:#dcefdc;color:var(--ok)}.chip--no{background:#f6dcda;color:var(--aviso)}.chip--oro{background:#f3e7cf;color:#7a5a20}',
    '.idioma{margin-left:auto;display:flex;border:1px solid #d9ccb6;border-radius:99px;overflow:hidden}',
    '.idioma button{border:0;background:transparent;padding:4px 12px;font:13px system-ui,sans-serif;cursor:pointer;color:var(--suave)}',
    '.idioma button[aria-pressed=true]{background:var(--tinta);color:#fff}',
    '.ante{font:600 12px system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--oro);margin:16px 0 4px}',
    '.tit{font-size:26px;line-height:1.2;margin:0 0 6px}',
    '.falta{color:var(--aviso);font:italic 13px system-ui,sans-serif}',
    /* Tarjeta: caja 3:2; con dos fotos, cada mitad es 3:4 (unos 170×227) y entre las dos va un filete dorado, como en la web */
    '.nota{width:340px;max-width:100%;background:#fff;border:1px solid #e6dccb;border-radius:6px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.06)}',
    '.nota__img{display:flex;aspect-ratio:3/2;background:#ddd}',
    '.nota__img>div{flex:1;position:relative;overflow:hidden}',
    '.nota__img>div+div{border-left:2px solid var(--oro)}',
    '.nota__img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
    '.nota__txt{padding:10px 14px 14px}.nota__txt .ante{margin-top:0}.nota__txt .tit{font-size:18px}',
    /* Carrusel: escenario 3:2. «Entera»: contain sobre la mini difuminada; «pequeña»: scale-down */
    '.car{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}',
    '.esc{position:relative;aspect-ratio:3/2;overflow:hidden;background:#0f0d0b;border-radius:4px}',
    '.esc img.g{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
    '.esc img.g--entera{object-fit:contain}.esc img.g--peq{object-fit:scale-down}',
    '.esc img.bg{position:absolute;inset:-10%;width:120%;height:120%;object-fit:cover;filter:blur(14px) brightness(.5)}',
    '.esc .num{position:absolute;left:6px;top:6px;background:rgba(0,0,0,.6);color:#fff;font:12px system-ui,sans-serif;padding:1px 7px;border-radius:99px}',
    '.marcas{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0 2px}',
    '.med{font:12px system-ui,sans-serif;color:var(--suave)}',
    '.av{margin:4px 0 0;padding:6px 8px;border-left:3px solid var(--aviso);background:#fbeceb;color:#7d1d17;font:13px/1.35 system-ui,sans-serif}',
    '.info{margin:6px 0 0;padding:6px 8px;border-left:3px solid var(--oro);background:#f6efe1;color:#5c4416;font:13px/1.35 system-ui,sans-serif}',
    '.ok{color:var(--ok);font:12px system-ui,sans-serif}',
    /* Portada: pase de fotos y aviso (píldora) */
    '.hero{position:relative;aspect-ratio:16/9;max-width:520px;background:var(--osc);border-radius:6px;overflow:hidden}',
    '.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.85}',
    '.pill{position:absolute;left:14px;bottom:14px;background:rgba(253,250,243,.95);border-radius:99px;padding:5px 14px;font:13px system-ui,sans-serif}',
    '.pill b{color:var(--oro);margin-right:6px}',
    /* Cuerpo */
    '.cuerpo p{margin:0 0 .8em}.cuerpo a{color:#7a5a20}',
    '.ded{font-style:italic;border-left:3px solid var(--oro);padding-left:12px;margin:0 0 1em}',
    '.prensa{border:1px solid #e6dccb;background:#fff;padding:10px 12px;margin:0 0 1em;border-radius:4px}',
    '.prensa small{display:block;font:600 11px system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--oro)}',
    '.link{display:inline-block;margin:0 0 1em;color:#7a5a20;font-weight:600}.link::after{content:" →"}',
    '.cred{font-size:13px;color:var(--suave)}',
    '.corte{margin:18px 0;padding:6px 10px;background:#f3e7cf;color:#7a5a20;font:12px system-ui,sans-serif;border-radius:4px}',
    '.fig{width:240px;aspect-ratio:3/4;position:relative;overflow:hidden;background:#ddd;margin:0 0 1em}',
    '.fig--alta{aspect-ratio:9/16}.fig img,.fig video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
    '[data-key-path]{cursor:pointer}'
  ].join('\n');
  CMS.registerPreviewStyle(CSS, { raw: true });

  /* ── Utilidades ── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var URL_VALIDA = /^(https?:\/\/|#|mailto:|tel:)/i;
  // Solo se enlaza lo que la web también enlazaría; lo demás no lleva href.
  function hrefSeguro(u) { u = String(u || '').trim(); return URL_VALIDA.test(u) ? u : undefined; }

  // Markdown limitado, el mismo que tiene que hacer la web:
  //  1) escapar el HTML;
  //  2) apartar los escapes del editor (guarda «\*», «\_», «\[»… cuando el carácter va suelto) para que salgan tal cual;
  //  3) apartar los enlaces [texto](url), solo con https://, http://, #, mailto: o tel: (si no, queda el texto);
  //  4) **negrita**, *cursiva* y _cursiva_ (el editor guarda la cursiva con guion bajo);
  //  5) devolver lo apartado. Párrafos separados por línea en blanco; un salto suelto es <br>.
  // Los enlaces se apartan antes de la negrita y la cursiva para que un «_» o un «*» de una dirección no se toquen.
  function md(texto) {
    var guarda = [];
    function apartar(h) { guarda.push(h); return '\u0000' + (guarda.length - 1) + '\u0000'; }
    function devolver(t) { return t.replace(/\u0000(\d+)\u0000/g, function (m, i) { return guarda[+i]; }); }
    function enLinea(t) {
      t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      t = t.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
      t = t.replace(/(^|[^\w])_([^_]+)_(?!\w)/g, '$1<em>$2</em>');
      return t;
    }
    var s = esc(texto);
    s = s.replace(/\\([\\`*_{}\[\]()#+\-.!~|])/g, function (m, c) { return apartar(c); });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, t, url) {
      var u = devolver(url).replace(/&amp;/g, '&');
      if (!URL_VALIDA.test(u)) return t;
      var fuera = /^https?:\/\//i.test(u);
      return apartar('<a href="' + esc(u) + '"' + (fuera ? ' target="_blank" rel="noopener"' : '') + '>' + enLinea(t) + '</a>');
    });
    s = enLinea(s);
    for (var n = 0; n < 3 && /\u0000\d+\u0000/.test(s); n++) s = devolver(s);
    return s.split(/\n\s*\n/).map(function (p) { return '<p>' + p.replace(/\\?\n/g, '<br>') + '</p>'; }).join('');
  }

  // Enlaces dentro del texto que no van a funcionar. ids = { id: {titulo, publicada} } de las noticias guardadas.
  function enlacesRaros(texto, ids) {
    var out = [], re = /\]\(([^)\s]+)\)/g, m;
    while ((m = re.exec(String(texto || '')))) {
      var u = m[1];
      if (/^[a-z0-9-]+$/i.test(u)) {
        out.push('El enlace «' + u + '» no lleva # delante y no funcionará. Si es otra noticia u otra parte de esta web, escríbelo así: #' + u + '.');
      } else if (/^https?:\/\/[^\/.]+(\/|$)/i.test(u)) {
        out.push('El enlace «' + u + '» no parece una web. Si es otra parte de esta web, escríbelo empezando por # (por ejemplo #' + u.replace(/^https?:\/\//i, '').replace(/\/$/, '') + ').');
      } else if (!URL_VALIDA.test(u)) {
        out.push('El enlace «' + u + '» no se publicará: tiene que empezar por https://, #, mailto: o tel:.');
      } else if (ids && /^#noticia-/.test(u)) {
        var o = ids[u.slice(1)];
        if (!o) out.push('No hay ninguna noticia con el nombre corto «' + u.slice(1) + '».');
        else if (!o.publicada) out.push('La noticia «' + o.titulo + '» no está publicada: el enlace no llevará a ningún sitio.');
      }
    }
    return out;
  }
  function tx(obj, lang) { return obj && typeof obj === 'object' ? (obj[lang] || '') : ''; }
  function pct(v, def) { var n = Number(v); return isFinite(n) && v !== '' && v != null ? Math.max(0, Math.min(100, n)) : def; }
  function url(getAsset, ruta) { if (!ruta) return ''; var a = getAsset(ruta); return (a && a.url) || ruta; }

  // Avisos según el hueco. d = {w, h} medidas reales de la foto. Reglas de inv_02 (apartado 6).
  function avisos(hueco, d, o) {
    o = o || {};
    var r = d.w / d.h, out = [];
    if (hueco === 'tarjeta2') {
      if (r > 1.05) out.push('Es horizontal y va en media tarjeta (hueco vertical 3:4): se pierde casi la mitad de la foto. Mejor una vertical.');
      if (d.w < 360) out.push('Muy pequeña (' + d.w + ' px de ancho): en la tarjeta se verá borrosa.');
    } else if (hueco === 'tarjeta1') {
      if (r < 1.2) out.push('Con una sola foto la tarjeta es horizontal (3:2) y esta foto no lo es: se recortará mucho. Pon una horizontal o añade una segunda foto vertical.');
      if (o.mini) out.push('Con una sola foto, deja vacía la versión pequeña: la tarjeta entera necesita la foto grande.');
      else if (d.w < 600) out.push('Pequeña para una tarjeta de una sola foto (' + d.w + ' px de ancho).');
    } else if (hueco === 'carrusel') {
      if (o.portada) {
        if (r < 1.4 && !o.entera) out.push('Para la noticia de portada las fotos tienen que ser horizontales 3:2 (por ejemplo 1600×1067). Esta se recortará mucho. Si quieres que se vea entera, marca «Mostrar entera».');
        // Una foto «entera» se ve a lo alto del escenario: allí cuenta el alto, no el ancho.
        if ((o.entera ? d.h : d.w) < 1000) out.push('Pequeña para la portada (' + d.w + '×' + d.h + '): se verá borrosa. Lo bueno es 1600×1067.');
      } else {
        if (r < 1.3 && !o.entera) out.push('No es horizontal y no tiene marcado «Mostrar entera»: en el carrusel (3:2) se le cortará arriba y abajo.');
        if (d.h < 700 && !o.pequena) out.push('Pequeña (' + d.w + '×' + d.h + '): se verá borrosa. Si es un recorte de prensa, marca «Foto pequeña».');
      }
      if (o.pase && r < 1.2) out.push('Está marcada para el pase de la portada y es vertical: allí se recorta mucho. Mejor una horizontal.');
    } else if (hueco === 'figura') {
      var ideal = o.alta ? 9 / 16 : 3 / 4;
      if (r > 1) out.push('Es horizontal y el hueco de la foto suelta es vertical (' + (o.alta ? '9:16' : '3:4') + ').');
      else if (Math.abs(r - ideal) > 0.12) out.push('No tiene la forma del hueco (' + (o.alta ? '9:16' : '3:4') + '): se recortará un poco.');
    } else if (hueco === 'poster') {
      var p = o.formato === '3:4' ? 3 / 4 : 9 / 16;
      if (Math.abs(r - p) > 0.05) out.push('La foto de portada del vídeo no tiene la forma del vídeo (' + (o.formato || '9:16') + ').');
    }
    return out;
  }

  /* Foto que se mide al cargar y enseña sus avisos */
  function Medida(props) {
    var st = useState(null), medida = st[0], setD = st[1];
    var src = props.src;
    // Solo vale la medida de la foto que se está enseñando ahora (si cambia la foto, se vuelve a medir).
    var d = medida && medida.src === src ? medida : null;
    var estilo = props.x === undefined && props.y === undefined ? undefined
      : 'object-position:' + pct(props.x, 50) + '% ' + pct(props.y, 50) + '%';
    var img = html`<img key=${src} class=${props.cls || ''} src=${src} alt="" style=${estilo}
      onLoad=${function (e) { setD({ src: src, w: e.target.naturalWidth, h: e.target.naturalHeight }); }}
      onError=${function () { setD({ src: src, error: true }); }} />`;
    var lista = d && !d.error ? avisos(props.hueco, d, props.o) : [];
    return props.render(img, d, lista);
  }

  function Avisos(p) {
    var d = p.d, lista = p.lista;
    if (!d) return html`<div class="med">Midiendo la foto…</div>`;
    if (d.error) return html`<div class="av">No se puede cargar esta foto.</div>`;
    return html`<div>
      <div class="med">${d.w} × ${d.h} px</div>
      ${lista.length ? lista.map(function (a, i) { return html`<div key=${i} class="av">${a}</div>`; }) : html`<div class="ok">Encaja bien en su hueco.</div>`}
    </div>`;
  }

  /* ── Plantilla ── */
  function NoticiaPreview(props) {
    var entry = props.entry, getAsset = props.getAsset;
    var st = useState('es'), lang = st[0], setLang = st[1];
    var stO = useState(null), otras = stO[0], setOtras = stO[1];
    var dRaw = entry.get('data');
    var d = dRaw && dRaw.toJS ? dRaw.toJS() : {};
    var fotos = Array.isArray(d.fotos) ? d.fotos : [];
    var tarjeta = Array.isArray(d.tarjeta) ? d.tarjeta : [];
    var cuerpo = Array.isArray(d.cuerpo) ? d.cuerpo : [];
    var otraLang = lang === 'es' ? 'ca' : 'es';
    var nombreLang = { es: 'castellano', ca: 'valenciano' };

    // Las noticias guardadas, para comprobar los enlaces y saber cuál sale en portada.
    useEffect(function () {
      var vivo = true;
      if (typeof props.getCollection !== 'function') return undefined;
      props.getCollection('noticias').then(function (lista) {
        if (!vivo) return;
        setOtras((lista || []).map(function (e) {
          var x = e.get('data'); x = x && x.toJS ? x.toJS() : {};
          return {
            id: x.id, fecha: x.fecha || '', portada: !!x.portada, publicada: x.publicada !== false,
            titulo: (x.titulo && (x.titulo.es || x.titulo.ca)) || x.id
          };
        }).filter(function (x) { return x.id; }));
      }).catch(function () {});
      return function () { vivo = false; };
    }, []);
    var ids = null;
    if (otras) { ids = {}; otras.forEach(function (o) { ids[o.id] = o; }); }

    function T(obj) {
      var v = tx(obj, lang);
      if (v) return v;
      return html`<span class="falta">Falta en ${nombreLang[lang]}</span>`;
    }
    function cambia(l) { return function (e) { e.preventDefault(); setLang(l); }; }
    function flecha(b) {
      return /[→>]\s*$/.test(tx(b.texto, lang)) ? html`<div class="av">Quita la flecha del texto: la web ya la pone.</div>` : null;
    }

    // Qué noticia sale en portada: la más reciente publicada con la casilla marcada (empate: la que va antes en la lista).
    function notaPortada() {
      if (!d.portada || !otras) return null;
      if (d.publicada === false) return html`<div class="info">Está marcada de portada pero sin publicar: no sale en ningún sitio.</div>`;
      var rivales = otras.filter(function (o) { return o.id !== d.id && o.portada && o.publicada; });
      var mas = rivales.filter(function (o) { return o.fecha > (d.fecha || ''); })
        .sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; })[0];
      if (mas) return html`<div class="info">Ahora sale en «Más noticias»: «${mas.titulo}» (${mas.fecha}) es más reciente y también está marcada de portada.</div>`;
      var igual = rivales.filter(function (o) { return o.fecha === d.fecha; })[0];
      if (igual) return html`<div class="info">Tiene la misma fecha que «${igual.titulo}», también de portada: sale en portada la que va antes en la lista.</div>`;
      var antes = rivales.filter(function (o) { return o.fecha < (d.fecha || ''); })
        .sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; })[0];
      if (antes) return html`<div class="info">Sale en portada. «${antes.titulo}» (${antes.fecha}) pasa sola a «Más noticias».</div>`;
      return html`<div class="info">Sale en portada.</div>`;
    }

    // Bloques arriba / segunda parte (desde la primera foto suelta o vídeo)
    var corte = cuerpo.findIndex(function (b) { return b && (b.tipo === 'figura' || b.tipo === 'video'); });

    function bloque(b, i) {
      if (!b) return null;
      var k = 'cuerpo.' + i;
      var t = b.tipo;
      if (t === 'parrafo') {
        var v = tx(b.texto, lang);
        if (!v) return html`<p key=${i} data-key-path=${k + '.texto.' + lang} class="falta">Párrafo sin texto en ${nombreLang[lang]}</p>`;
        return html`<div key=${i} data-key-path=${k + '.texto.' + lang}>
          <div dangerouslySetInnerHTML=${{ __html: md(v) }}></div>
          ${enlacesRaros(v, ids).map(function (a, j) { return html`<div key=${j} class="av">${a}</div>`; })}
        </div>`;
      }
      if (t === 'dedicatoria') return html`<p key=${i} class="ded" data-key-path=${k}>${T(b.texto)}</p>`;
      if (t === 'prensa') return html`<div key=${i} class="prensa" data-key-path=${k}>
          <small>${T(b.etiqueta)}</small><div>${T(b.texto)}</div>
          <a class="link" href=${hrefSeguro(b.url)} target="_blank" rel="noopener">${T(b.enlace_texto)}</a>
          ${b.url && !/^https?:\/\//i.test(b.url) ? html`<div class="av">La dirección tiene que empezar por https://</div>` : null}
          ${!b.url ? html`<div class="av">Falta la dirección de la noticia del periódico.</div>` : null}
        </div>`;
      if (t === 'enlace_noticia') {
        var o = b.noticia && ids ? ids[b.noticia] : null;
        return html`<div key=${i} data-key-path=${k}>
          <a class="link" href=${'#' + (b.noticia || '')}>${T(b.texto)}</a>
          <div class="med">Lleva a: ${b.noticia ? '#' + b.noticia : '(sin elegir)'}${o ? ' · «' + o.titulo + '»' : ''}</div>
          ${b.noticia && ids && !o ? html`<div class="av">No hay ninguna noticia con ese nombre corto.</div>` : null}
          ${o && !o.publicada ? html`<div class="av">Esa noticia no está publicada: el enlace no llevará a ningún sitio.</div>` : null}
          ${!b.noticia ? html`<div class="av">Elige a qué noticia lleva.</div>` : null}
          ${flecha(b)}
        </div>`;
      }
      if (t === 'enlace') return html`<div key=${i} data-key-path=${k}>
          <a class="link" href=${hrefSeguro(b.url)} target=${/^https?:\/\//i.test(b.url || '') ? '_blank' : undefined} rel="noopener">${T(b.texto)}</a><div class="med">${b.url || ''}</div>
          ${b.url && !URL_VALIDA.test(b.url) ? html`<div class="av">La dirección tiene que empezar por https:// o por #.</div>` : null}
          ${flecha(b)}
        </div>`;
      if (t === 'credito') {
        var c = tx(b.texto, lang);
        return html`<div key=${i} data-key-path=${k}>
          <div class="cred" dangerouslySetInnerHTML=${{ __html: c ? md(c) : '<p class="falta">Falta en ' + nombreLang[lang] + '</p>' }}></div>
          ${enlacesRaros(c, ids).map(function (a, j) { return html`<div key=${j} class="av">${a}</div>`; })}
        </div>`;
      }
      if (t === 'figura') {
        if (!b.foto) return html`<div key=${i} class="av" data-key-path=${k}>Foto suelta sin foto.</div>`;
        return html`<div key=${i} data-key-path=${k}>
          <${Medida} src=${url(getAsset, b.foto)} hueco="figura" o=${{ alta: !!b.alta }}
            render=${function (img, dd, lista) { return html`<div><div class=${'fig' + (b.alta ? ' fig--alta' : '')}>${img}</div><${Avisos} d=${dd} lista=${lista} /></div>`; }} />
          <div class="med">${T(b.alt)}</div></div>`;
      }
      if (t === 'video') {
        var vurl = b.video ? url(getAsset, b.video) : '';
        return html`<div key=${i} data-key-path=${k}>
          <div class=${'fig' + (b.formato === '3:4' ? '' : ' fig--alta')}>
            ${vurl ? html`<video src=${vurl} poster=${b.poster ? url(getAsset, b.poster) : undefined} controls muted preload="none" playsInline></video>` : null}
          </div>
          ${!b.video ? html`<div class="av">Falta el vídeo (MP4).</div>` : null}
          ${b.poster ? html`<${Medida} src=${url(getAsset, b.poster)} hueco="poster" o=${{ formato: b.formato }}
              render=${function (img, dd, lista) { return html`<div style="display:none">${img}</div><div class="med">Foto de portada del vídeo:</div><${Avisos} d=${dd} lista=${lista} />`; }} />`
            : html`<div class="av">Falta la foto de portada del vídeo.</div>`}
          <div class="med">${T(b.titulo)}</div></div>`;
      }
      return html`<div key=${i} class="av">Bloque de tipo desconocido: ${String(t)}</div>`;
    }

    var unaSola = tarjeta.length === 1;
    var conPase = fotos.filter(function (f) { return f && f.pase && f.foto; });
    var heroFoto = conPase[0] || fotos[0];

    return html`<div class="pv">
      <div class="pv__bar">
        <span class=${'chip ' + (d.publicada === false ? 'chip--no' : 'chip--si')}>${d.publicada === false ? 'Sin publicar' : 'Publicada'}</span>
        <span class=${'chip ' + (d.portada ? 'chip--oro' : '')}>${d.portada ? 'Marcada de portada' : 'Más noticias'}</span>
        <span class="chip">${d.fecha || 'sin fecha'}</span>
        <span class="chip">#${d.id || '…'}</span>
        <div class="idioma" role="group" aria-label="Idioma de la vista previa">
          <button type="button" aria-pressed=${lang === 'es'} onClick=${cambia('es')}>Castellano</button>
          <button type="button" aria-pressed=${lang === 'ca'} onClick=${cambia('ca')}>Valencià</button>
        </div>
      </div>
      ${notaPortada()}

      ${d.portada ? html`<div>
        <h2>Portada: pase de fotos y aviso</h2>
        <div class="hero" data-key-path="aviso">
          ${heroFoto && heroFoto.foto ? html`<img src=${url(getAsset, heroFoto.foto)} alt="" style=${'object-position:' + pct(heroFoto.x, 50) + '% ' + pct(heroFoto.y, 50) + '%'} />` : null}
          ${d.aviso ? html`<div class="pill"><b>${T(d.aviso.etiqueta)}</b>${T(d.aviso.texto)}</div>` : html`<div class="pill falta">Sin aviso de portada</div>`}
        </div>
        <div class="med">Fotos de esta noticia marcadas para el pase: ${conPase.length} de ${fotos.length}${conPase.length ? '' : ' (arriba se ve la primera del carrusel)'}</div>
      </div>` : null}

      <h2>Así sale la tarjeta en «Más noticias»</h2>
      <div class="nota">
        <div class="nota__img" data-key-path="tarjeta">
          ${tarjeta.length === 0 ? html`<div class="falta" style="padding:10px">Faltan las fotos de la tarjeta</div>` : null}
          ${tarjeta.slice(0, 2).map(function (f, i) {
            if (!f || !f.foto) return html`<div key=${i} class="falta" data-key-path=${'tarjeta.' + i + '.foto'}>Sin foto</div>`;
            return html`<div key=${i} data-key-path=${'tarjeta.' + i}>
              <${Medida} src=${url(getAsset, f.mini || f.foto)} x=${f.x} y=${f.y} hueco=${unaSola ? 'tarjeta1' : 'tarjeta2'}
                render=${function (img) { return img; }} /></div>`;
          })}
        </div>
        <div class="nota__txt">
          <div class="ante" data-key-path=${'antetitulo.' + lang}>${T(d.antetitulo)}</div>
          <div class="tit" data-key-path=${'titulo.' + lang}>${T(d.titulo)}</div>
        </div>
      </div>
      ${tarjeta.slice(0, 2).map(function (f, i) {
        if (!f || !f.foto) return null;
        return html`<div key=${i} style="margin-top:8px" data-key-path=${'tarjeta.' + i}>
          <div class="med">Foto ${i + 1} de la tarjeta${f.mini ? ' (versión pequeña)' : ''} · encuadre ${pct(f.x, 50)} % / ${pct(f.y, 50)} %</div>
          <${Medida} src=${url(getAsset, f.mini || f.foto)} hueco=${unaSola ? 'tarjeta1' : 'tarjeta2'} o=${{ mini: !!f.mini }}
            render=${function (img, dd, lista) { return html`<div style="display:none">${img}</div><${Avisos} d=${dd} lista=${lista} />`; }} />
        </div>`;
      })}

      <h2>Carrusel (hueco 3:2) · ${fotos.length} foto${fotos.length === 1 ? '' : 's'}</h2>
      <div class="car">
        ${fotos.map(function (f, i) {
          if (!f) return null;
          var k = 'fotos.' + i;
          if (!f.foto) return html`<div key=${i} class="av" data-key-path=${k}>Foto ${i + 1}: falta la foto.</div>`;
          var g = url(getAsset, f.foto), m = url(getAsset, f.mini || f.foto);
          // Como en la web: el encuadre solo se aplica si la foto no va entera, y el fondo difuminado solo va con «entera».
          return html`<div key=${i} data-key-path=${k}>
            <${Medida} src=${g} x=${f.entera ? undefined : f.x} y=${f.entera ? undefined : f.y} hueco="carrusel"
              cls=${'g' + (f.entera ? ' g--entera' : '') + (f.pequena ? ' g--peq' : '')}
              o=${{ portada: !!d.portada, entera: !!f.entera, pequena: !!f.pequena, pase: !!f.pase }}
              render=${function (img, dd, lista) { return html`<div>
                <div class="esc">${f.entera ? html`<img class="bg" src=${m} alt="" />` : null}${img}<span class="num">${i + 1}</span></div>
                <div class="marcas">
                  ${f.entera ? html`<span class="chip">entera</span>` : null}
                  ${f.pequena ? html`<span class="chip">pequeña</span>` : null}
                  ${f.fija ? html`<span class="chip">sin movimiento</span>` : null}
                  ${f.pase ? html`<span class="chip chip--oro">pase de portada</span>` : null}
                  ${f.entera ? null : html`<span class="chip">${pct(f.x, 50)} % / ${pct(f.y, 50)} %</span>`}
                </div>
                <div class="med">${T(f.alt)}</div>
                ${f.pie && tx(f.pie, lang) ? html`<div class="med"><i>${tx(f.pie, lang)}</i></div>` : null}
                <${Avisos} d=${dd} lista=${lista} />
              </div>`; }} />
          </div>`;
        })}
      </div>

      <h2>Texto de la noticia (${nombreLang[lang]})</h2>
      <div class="ante" data-key-path=${'antetitulo.' + lang}>${T(d.antetitulo)}</div>
      <div class="tit" data-key-path=${'titulo.' + lang}>${T(d.titulo)}</div>
      <div class="cuerpo">
        ${cuerpo.map(function (b, i) {
          var sep = i === corte ? html`<div key=${'c' + i} class="corte">Segunda parte de la noticia (debajo del carrusel, estilo revista)</div>` : null;
          return [sep, bloque(b, i)];
        })}
        ${corte === -1 && cuerpo.length ? html`<div class="med">Sin foto suelta ni vídeo: todo el texto va arriba, junto al carrusel.</div>` : null}
      </div>
      <div class="med" style="margin-top:16px">Para revisar el ${nombreLang[otraLang]}, pulsa «${otraLang === 'es' ? 'Castellano' : 'Valencià'}» arriba.</div>
    </div>`;
  }

  CMS.registerPreviewTemplate('noticias', NoticiaPreview);
})();
