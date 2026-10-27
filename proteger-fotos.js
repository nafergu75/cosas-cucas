/* Protección de fotos y vídeos: sin el menú «Guardar imagen como…», sin arrastrarlas al escritorio
   y sin la pulsación larga del móvil que ofrece descargarlas. Vale también para las fotos que se
   cargan después (galería, noticias, visor), porque escucha en todo el documento.
   Es un freno para la mayoría, no un candado: ninguna web puede impedir una captura de pantalla,
   y quien sepa usar las herramientas del navegador sigue pudiendo llegar a la foto. */
(function () {
  var FOTO = 'img, video, picture';

  function esFoto(e) {
    return e.target instanceof Element && e.target.closest(FOTO);
  }

  document.addEventListener('contextmenu', function (e) { if (esFoto(e)) e.preventDefault(); });
  document.addEventListener('dragstart', function (e) { if (esFoto(e)) e.preventDefault(); });

  var estilo = document.createElement('style');
  estilo.textContent =
    'img, video { -webkit-user-drag: none; -webkit-touch-callout: none; }' +
    'img { -webkit-user-select: none; user-select: none; }';
  document.head.appendChild(estilo);
})();
