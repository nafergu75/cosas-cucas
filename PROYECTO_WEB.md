# Web de Cosas Cucas

Web de la tienda Cosas Cucas, indumentaria valenciana artesanal desde 1982.

- **En internet:** https://nafergu75.github.io/cosas-cucas/ y https://cosas-cucas.vercel.app
- **Repositorio:** https://github.com/nafergu75/cosas-cucas (rama `master`)
- **Carpeta local:** `C:\Users\NACHO PC\Desktop\documntos prueba\cosas-cucas`

Última revisión de este documento: 18-10-2026.

> Este documento se pone al día cada vez que se termina un trabajo en la web: qué se pidió, qué se hizo y cuándo. El historial completo está al final.

---

## Datos del negocio

| | |
|---|---|
| Tienda principal | C/ Burriana, 21 · 46005 Valencia · 963 511 556 |
| Tienda Cabañal | C/ Vicent Gallart, 49 · 46011 Valencia · 963 714 997 |
| WhatsApp | 667 775 501 |
| Email | info@cosascucas.es |
| Instagram | @cosascucas |

Fundada por Paquita Martorell en el Cabañal. Hoy la llevan sus hijas Noelia y María (desde el 20-10-2026 Paqui ya no sale en la web).

---

## Cómo está hecha

- HTML, CSS y JavaScript sin frameworks ni compilación. Se edita el archivo y se sube.
- Fuentes: Playfair Display (títulos) y Space Grotesk (texto).
- Colores: crema `#F4EDD8`, dorado `#B5903A`, oscuro `#1A1714`.
- Dos idiomas, castellano y valenciano. Todos los textos están en el objeto `translations` de `index.html` (`es` y `ca`). Cualquier texto nuevo hay que ponerlo en los dos.
- No hay servidor propio ni base de datos. Los formularios y las citas van por WhatsApp.

### Páginas

| Archivo | Qué es |
|---|---|
| `index.html` | La web principal. Casi todo está aquí. |
| `galeria.html` | Galería en dos apartados. Al entrar solo se ven dos ventanas con foto de portada, «Indumentaria femenina» (52 fotos) e «Indumentaria masculina» (16); al pinchar una salen sus fotos («Pasarela» y «Nuestras falleras» / «Nuestros falleros»), con enlaces para volver o pasar a la otra. Enlaces directos `galeria.html#femenina` y `#masculina` (el botón atrás vuelve a las ventanas). Datos: `PASARELA` (con `tipo: 'masculina'` en las 3 de chicos), `GALERIA_TIENDA` (`cat: 'hombre'` va a masculina) y `HOMBRE` (fotos reales de `hombre/`; las generadas con ChatGPT no entran). |
| `landing.html` | Página de captación «Trajes de fallera en Valencia». |
| `cartel-traslado.html` | Cartel del traslado a Burriana. |
| `aviso-legal.html`, `politica-privacidad.html` | Textos legales. |
| `404.html` | Página de error. |

`probador.html` e `inauguracion.html` están retiradas. Vercel redirige sus direcciones a la portada.

### Secciones de la portada (`index.html`)

**Puntilla entre bloques (desde el 18-10-2026):** donde un bloque oscuro da paso a uno claro, o al revés, hay una franja `.puntilla` de encaje: fila de calados, ondas y una perla dorada en cada onda, con el color del bloque de arriba sobre el de abajo (`--arriba` / `--abajo` en el `style` del `div`). Está en seis cortes: Julia → Más noticias, Colecciones → Deportivas, Deportivas → Historia, Decoración → Vídeos, Vídeos → Reseñas y Visita → pie. Si se cambia el fondo de un bloque, hay que cambiar también esos colores.

1. **Portada (hero):** pase de fotos (7 s por foto) con las 14 de Julia Vizcayno, Fallera Mayor Infantil de València 2027, y las horizontales grandes de la corte 2027 (las verticales no entran porque en móvil el hueco es apaisado y se quedarían en una franja; las marcadas `portada: false` son pequeñas para el hueco de escritorio, de unos 712×828 px). Ya no salen las de pasarela ni la fachada. Cada foto lleva su punto de encuadre (`NOTICIA_FOCO`) porque en escritorio el hueco es vertical. Encima del título hay una píldora «Noticia» que lleva a la noticia.
2. **Apartado de Noticias (`#noticias`):** entrada «Noticias» la primera del menú. Desde el 18-10-2026 la página muestra tres piezas y un lector aparte:
   - Cabecera oscura «Noticias Cosas Cucas» (antes «Noticias del taller»; cambiado el 19-10-2026).
   - **Noticia principal (Julia)** entera, con texto y carrusel.
   - **«Más noticias» (`#mas-noticias`):** una tarjeta por cada noticia secundaria, con borde dorado, dos fotos una junto a otra, fecha y titular («Leer la noticia →»). En móvil la tarjeta va en vertical (fotos arriba, texto debajo). Las genera `buildNoticias()` a partir de `NOTICIAS_MAS` (id de la sección, textos y las fotos de la tarjeta con su encuadre). Una noticia sin contenido (la de la corte sin fotos) no saca tarjeta.
   - **Lector (`#lector`):** al pulsar una tarjeta, la noticia completa (texto y carrusel, fondo crema) se abre en un panel a pantalla completa como el de colecciones. Se cierra con la ×, con «Volver a las noticias», con Escape, pulsando fuera o con el botón atrás del móvil, y la página vuelve a donde estaba con el foco en la tarjeta. Mientras está abierto, el resto de la página queda inerte (`inert`). Cada noticia tiene su enlace directo (`…/#corte-2027`, `…/#noticia-meri`), que abre el lector al entrar; al cerrarlo desde ahí, la página queda en «Más noticias».
   - **Para añadir una noticia secundaria:** copiar dentro de `#lector` un bloque `section.noticia.noticia--crema` (texto y carrusel; el `h2.noticia__title` necesita su propio id), sus textos en `t()` (ES y VAL), una función como `buildMeri()` que llame a `renderCarousel` y que se llame en `renderAll()` antes de `buildNoticias()`, y una entrada en `NOTICIAS_MAS` con las fotos de la tarjeta y su encuadre.
   - **Noticias largas, maquetación tipo revista (`.revista`):** si el texto es mucho más alto que el carrusel y deja hueco blanco debajo de las fotos, se añade la clase `revista` al `div.noticia__inner`, se dejan arriba el título y los primeros párrafos (los que acaben más o menos a la altura del carrusel) y el resto va en un `div.revista__segunda` al final del `noticia__inner`: un vídeo (`figure.noticia__video`) o una foto vertical (`figure.revista__figura`, 3:4; con `revista__figura--alta`, 9:16) y al lado `div.revista__texto` con los demás párrafos, créditos y enlaces. Ocupa todo el ancho tras una línea fina; en móvil, todo en una columna. La llevan Amanda, la tienda, la Desfilada y el Premio Joia (20-10-2026). En las demás el texto y el carrusel ya acaban casi a la vez.
   - **REGLA DE IGNACIO (20-10-2026): al renovar la noticia principal, la anterior pasa a «Más noticias».** Cada vez que se pone una noticia principal nueva (la primera, la que va entera arriba), la que estaba no se borra: se guarda automáticamente como noticia de «Más noticias», sin perder nada (textos ES y VAL, fotos, carrusel, recuadro «En la prensa», créditos y enlaces). Hacerlo siempre, aunque no se pida. Pasos:
     1. Pasar su texto y su carrusel a una sección nueva dentro de `#lector` (`section.noticia.noticia--crema` con ids propios, p. ej. `#noticia-julia`), con sus textos en una clave nueva de `t()` (p. ej. `t().julia`, sacados de `t().noticia`) y su función `buildX()` con `renderCarousel` y sus fotos (hoy `NOTICIA_FOTOS` / `NOTICIA_ORDEN`, de `buildNoticia()`), llamada en `renderAll()` antes de `buildNoticias()`.
     2. Añadir su tarjeta en `NOTICIAS_MAS` en el sitio que le toque por fecha (de la más nueva a la más antigua), con dos fotos verticales 3:4 para la portada de la tarjeta.
     3. La nueva noticia principal ocupa `#noticia` (textos en `t().noticia`). La antigua tendrá su propio enlace directo (`#noticia-…`).
     4. Revisar el pase de fotos de la portada (hero), que hoy usa las fotos de la noticia principal: preguntar a Ignacio si pasa a las de la nueva.
     5. Probarlo en ES y VAL, publicarlo y anotarlo en el historial.
   - **Noticia de Julia (`#noticia`):** titular «Fallera Mayor Infantil de València 2027» y el texto que escribió Ignacio (tres párrafos; el último, «Julia, gracias por dejarnos tejer la historia de tu vida», va como dedicatoria en cursiva dorada, `.noticia__dedica`). Textos en `t().noticia.p1/p2/p3`. Debajo de la dedicatoria, recuadro «En la prensa» (`t().noticia.prensaTag/prensa/prensaLink`) con el artículo de Official Press del 16-10-2026: en «Una Festa per a Tots» (Nuevo Centro) Julia estrenó su primer traje como FMI, un brocatel de seda y oro de fondo verde, de estilo del siglo XIX, confeccionado en Cosas Cucas (manteleta de Hijas de Carmen Esteve). Para añadir otra mención de prensa, el mismo recuadro. La píldora de la portada sigue diciendo «Vestimos a la Fallera Mayor Infantil de València 2027». Texto a la izquierda y carrusel grande a la derecha (fondo oscuro). El carrusel pasa solo cada 6 s con zoom lento, barra dorada, contador, flechas, miniaturas, deslizar con el dedo, teclado y pantalla completa. Tiene botón de pausa. También se para con el ratón encima (salvo en pantalla completa), fuera de pantalla o navegando con teclado, y no se mueve si el usuario tiene desactivadas las animaciones (la portada se queda entonces en la primera foto). Textos en `t().noticia`; fotos en `noticias/julia-vizcayno-NN.webp` (y `-mini` para las miniaturas); quedan 14 (faltan los números 06, 09, 13 y 16, que eran repetidas, y el 19, el retrato de estudio, quitado a petición de Ignacio). El orden, el encuadre en la portada y qué fotos son verticales se fijan en `NOTICIA_ORDEN`; los textos alternativos van en ese mismo orden. Las verticales (11 y 12) se ven enteras sobre un fondo difuminado de la propia foto.
   - **Noticia de la Corte de Honor 2027 (`#corte-2027`, en el lector):** mismo formato que las demás; su tarjeta lleva los retratos de Alejandra y Laura. Bajo el carrusel, pie de foto con el nombre y la falla de la foto que se ve. Alejandra Blanco Beltrán (falla Mestre Rodrigo-General Avilés; ya la vestimos en 2026 como Fallera Mayor de su falla) y Laura Miquel Obarti (falla Avinguda de l'Oest). **Visible desde el 18-10-2026 con 10 fotos de Alejandra** (`noticias/corte-2027/alejandra-NN.webp`): 2 retratos de estudio de @edgfotografia y 8 de la Ofrenda 2026 de su Instagram (@alejandrablaancoo), con crédito y enlace a las dos publicaciones (`CORTE_CREDITOS`; el texto dice que son las de Alejandra). **10 fotos de Laura** (`laura-NN.webp`) que pasó Ignacio en `Desktop/fotos  cosascucas/laura`, sin crédito por ahora. En total 20 fotos; el pie cambia de nombre y falla en la foto 11. Datos en `CORTE_2027` (JS, con el helper `fotosCorte(nombre, [[n, foco, vertical, portada]])`) y textos en `t().corte`. Los dos carruseles usan el mismo código (`renderCarousel`, estado en `CAR`).
   - **Noticia de Meri (`#noticia-meri`, en el lector):** «Los trajes de Meri, Fallera Mayor 2027 de Pinedo»; su tarjeta lleva el «Tetuán» y el «Almudena». Mª José Zalve Quilis, falla Mossén Josep Cuenca-Pinedo: exposición de sus trajes, todos confeccionados por Cosas Cucas («Almudena» azul marino, «Brunet» rosa antiguo, «Lazos» gris, «Lazos» verde exclusivo de la casa y el espolín «Tetuán» champán de la Compañía Valenciana de la Seda). Texto propio a partir de la publicación de Instagram de @jose_espolin_estudio (18-10-2026), con crédito y enlace. 14 fotos de esa publicación (`noticias/meri-zalve-NN.webp`), elegidas entre 20 quitando las repetidas; Ignacio autorizó usarlas citando al autor.
   - **Noticia de «Joyas de la Indumentaria» (`#noticia-joyas`, en el lector):** «Nuestros trajes en «Joyas de la Indumentaria»». II Exposición del Gremio Artesano de Sastres y Modistas de la Comunidad Valenciana en el Salón de Cristal del Ayuntamiento, del 2 al 5 de junio de 2026 (ampliada hasta el 12). Cosas Cucas llevó dos trajes (seda rosa y seda oscura de grandes flores, con pañuelo y delantal dorados). Datos contrastados con Actualidad Fallera, Valencia Extra y officialpress. 13 fotos de Ignacio (`Desktop/fotos  cosascucas/joyas exposicion`) en `noticias/joyas-NN.webp` (orden y verticales en `JOYAS_FOTOS`; fuera la 6 y la 7, primeros planos de la misma escena que la 5; la 2 y la 3 vienen de un vídeo de Instagram y se recortaron para quitar el botón de sonido; la 6 del carrusel es una seda en el telar), con el cartel al final y su crédito al Gremio. Su tarjeta lleva los dos trajes con el cartel de la casa y el traje oscuro. Pendiente: saber de quién son las fotos de la inauguración (11 y 12) y el vídeo de la 2 y la 3, por si hay que darle crédito. Ojo: la prensa nombra 14 talleres participantes y Cosas Cucas no sale en esa lista.
   - **Noticia de Amanda (`#noticia-amanda`, en el lector; primera tarjeta):** «Los trajes de Amanda, Fallera Mayor Infantil 2027 de la falla Malvarrosa». Amanda Dàries Ricart, FMI 2027 de la falla Avinguda Malva-rosa-Antoni Ponz-Cavite (cargo y apellidos confirmados por Ignacio; la web de la falla aún no tiene la ficha 2027), presentó en una exposición los trajes de su reinado, todos de Cosas Cucas. Traje verde: tela de la Compañía Valenciana de la Seda, modelo «Carpio» (dato de Ignacio). Su hermana Julia (FMI de la falla 2023, Corte de Honor infantil de València 2024) también la vistió Cosas Cucas; familia que siempre ha confiado en la casa. Datos de la falla (1944, casal en Av. Malvarrosa 92 desde los 60, 2027 infantil en Especial con Xavi Gurrea y grande en 1ªB con Ferni Llopis, 3.ª en calles iluminadas categoría A en 2026) contrastados con fallamalvarrosa.com y prensa el 20-10-2026. 20 fotos en `noticias/amanda-NN.webp` (5 de WhatsApp con la historia del traje verde: telar, Amanda mirando la tela, la prueba, el traje terminado; y 15 de la exposición) y el reel de Instagram como vídeo (`noticias/amanda-video.mp4`, 720×1280, sin audio, desde `Desktop/instagram cosascucas/2026-10 reel amanda falla malvarrosa`). Sin fecha ni lugar de la exposición ni crédito del fotógrafo (no los dio Ignacio).
   - **Noticia de la tienda nueva (`#noticia-tienda`, en el lector):** «Cosas Cucas abre en la calle Burriana, 21» (julio de 2026; texto revisado por Ignacio). Cuenta el traslado desde Grabador Esteve, la zona (Ensanche, barrio de la Gran Vía, a un paso de Ruzafa), el ambiente fallero (Joaquín Costa-Burriana en la misma esquina, Almirante Cadarso-Conde Altea y Reino de Valencia-Duque de Calabria de Sección Especial a tres minutos, la fuente del Maestro Serrano al final de la calle) y la tienda. Datos de la zona contrastados con el Geoportal del Ayuntamiento, Junta Central Fallera y prensa (19-10-2026). No dice que sea Ruzafa (oficialmente es la Gran Vía) ni que la Ofrenda pase por allí. Fotos `noticias/tienda-NN.webp` (10): la fachada nueva, con los toldos negros (fotograma del reel de @cosascucass «¡Os esperamos en Burriana 21!», https://www.instagram.com/cosascucass/reel/DdYruMCMT4v/, enlazado al final de la noticia), siete del día de la apertura (carpeta del proyecto `fotos burriana/`, 1-7-2026; fuera dos casi repetidas) y dos de Ignacio (`Desktop/fotos  cosascucas/fotos tienda`); la tarjeta lleva la fachada nueva y el interior. **Ojo:** `fotos nuevas/foto fachada.jpeg` (y su copia en `fotos tienda/`) es la tienda VIEJA de Grabador Esteve; no usarla como Burriana (`IMG.d1` la define pero no se usa). En `fotos tienda/` de la web hay propuestas de fachada (una generada por IA) y la fachada antigua del local: no son fotos reales de la tienda y no se usan. Va entre Meri y «Joyas» (las tarjetas siguen el orden de fecha).
   - **Noticia de la VI Desfilada (`#noticia-desfilada`, en el lector):** «Cosas Cucas en la VI Desfilada d'Indumentària Valenciana». Viernes 19-06-2026, 19.30, Palau de l'Exposició de València; pasarela del Gremio Artesano de Sastres y Modistas (organizador confirmado en [Actualidad Fallera](https://www.actualidadfallera.es/es/fallasdevalencia/elegancia-y-tradicion/8488-amparo-fabra-rindio-tributo-a-la-indumentaria-valenciana)); fecha, hora, lugar y las ocho casas participantes salen del cartel (foto 1). Que Cosas Cucas estuvo en la I edición (2018, Ateneo Mercantil, a beneficio de Aspanion) está en [Official Press](https://officialpress.es/desfile-solidario-de-indumentaria-valenciana-a-favor-de-los-ninos-de-aspanion/) y en la web del Ateneo. 18 fotos del carrusel de @cosascucass del 22-06-2026, en su orden (`DESFILADA_FOTOS`; la 1, el cartel, con `fija`). Las fotos 15-18 llegaron a Instagram más pequeñas (627 px) y parecen de fotógrafo: **pendiente saber el autor para darle crédito**. En la segunda fila (maquetación tipo revista), el vídeo del desfile (`noticias/desfilada-video.mp4`, 33 s, de la publicación del 23-06-2026, con portada `desfilada-video-poster.webp`) y el enlace a esa publicación; si el archivo del vídeo no está, el reproductor se quita solo y queda el enlace. Su tarjeta lleva la fallera con mantilla y la niña del traje verde agua. **Texto pendiente de revisar por Ignacio.** Arreglos de la revisión (19-10-2026): «para grandes y pequeños… y un niño» (solo desfiló un niño), «gracias a quienes desfilaron con nuestros trajes» (también desfilaron chicos), crédito del cartel al Gremio, «photocall» en los textos de las fotos 16-18, el vídeo `noticias/desfilada-video.mp4` (el de `fotos cosascucas/desfilada-cosas-cucas.mp4`, con `+faststart`) en el repositorio y el vídeo dentro del recorrido con Tab del lector.
   - **Noticia del Premio Joia 2018 (`#noticia-joia`, en el lector):** «Premio Joia 2018 para Paquita Martorell». El Gremio Artesano de Sastres y Modistas de la Comunidad Valenciana le dio su Premio Joia el 15 de junio de 2018 (Hotel Ayre Astoria Palace; lo entregó el maestro mayor Fran Tochena; aguja de oro blanco de estilo barroco de Art Antic; menciones de honor: Tejedores Bartual y Guillermo Ortigueira) por más de 30 años de trayectoria. El 20 de septiembre de 2018 Cosas Cucas cerró el I Desfile de Indumentaria del Gremio en el Ateneo Mercantil. Fuentes: nota de prensa de NilValencia (ya retirada, recogida por los buscadores) y Actualidad Fallera; la fecha la dio Ignacio. 9 fotos de Ignacio (`Desktop/fotos  cosascucas/premi joia`) en `noticias/joia-NN.webp`; en internet no hay fotos del acto. Su tarjeta lleva una sola foto apaisada (la del photocall), en grande. **Pendiente:** en las fotos 7 y 9 el cartel de la casa dice «Desde 1981», y la web dice 1982 (título, Historia, aviso legal, datos estructurados). Mientras Ignacio no confirme el año, el texto de esta noticia no lo menciona.
3. **Todas las colecciones (`#drops-archive`):** seis tarjetas en una fila. Al pulsar una se abre una ventana con la foto grande, el texto de la colección y la cuadrícula de fotos. **Las fotos van sin nombre, descripción ni precio**, salvo en la familia Espolín, que lleva el modelo de la tela (ver más abajo). En Indumentaria Femenina primero se elige familia (ver más abajo).
4. **Falleras Mayores y Corte de Honor:** fotos de las falleras de 2026 vestidas por Cosas Cucas.
5. **Deportivas falleras (`#zapatillas`).**
6. **Historia (`#historia`):** cronología y falleras mayores históricas.
7. **Editorial** y **Nuestra historia (`#dossier-historia`).**
8. **Decoración, vídeos, reseñas, boletín.**
9. **Contacto y Visítanos:** las dos tiendas. El mapa de Google solo se carga cuando el visitante lo pide (así no se ponen cookies de terceros sin permiso).
10. **Pie:** logo, texto de la casa, redes sociales y dos sellos sobre placa blanca: Artesanía Comunitat Valenciana (`ARTESANIA-COMUNIDAD-VALENCIANA-NUEVA.webp`) y 775 aniversario del Gremio Artesano de Sastres y Modistas de Valencia (`gremio-sastres-775-aniversario.webp`). Después, tiendas, colecciones y enlaces de información.

Además hay un chatbot que responde con una base de preguntas y respuestas escrita en la propia página. No usa ninguna API de pago.

---

## Colecciones

Están en `translations.es.drops` y `translations.ca.drops`.

| # | id | Nombre |
|---|---|---|
| 1 | `falles-2027-mujer` | Indumentaria Femenina |
| 2 | `hombre-2027` | Indumentaria Masculina |
| 3 | `aderezos-peinetas` | Aderezos y Peinetas |
| 4 | `telas-bordados` | Telas Valencianas (con filtros seda/rayón y brocatel/damasco) |
| 5 | `manteletas-mantillas` | Manteletas y Mantillas |
| 6 | `semana-santa` | Semana Santa |

Cada pieza lleva `name`, `desc`, `price` e `image`. El nombre se sigue usando como texto alternativo de la foto, aunque ya no se vea. En Indumentaria Femenina cada pieza lleva además `material` (`espolin`, `seda` o `rayon`).

### Familias dentro de Indumentaria Femenina

Al abrir la colección salen dos tarjetas con foto: **Espolín** e **Indumentaria Valenciana**. La clienta pulsa una y debajo aparecen solo las fotos de esa familia. Puede cambiar de una a otra sin cerrar la ventana.

- Se configura con `families` dentro de la colección (en `es` y en `ca`).
- Cada pieza sale en la familia que diga su campo `family`. Las piezas sin `family` van a la familia marcada con `rest:true` (Indumentaria Valenciana). El `material` de la pieza ya no decide la familia.
- **Espolín:** foto de la tarjeta Marta Capella (`IMG.esp1`, `espolin/esp-marta-capella-1.webp`). Desde el 20-10-2026 tiene 9 fotos (piezas `e1`…`e9` con `family:'espolin'`, en `es` y `ca`; en ordenador, 3 filas completas): Marta Capella con espolín «Espigas de Montserrat» y banda (según Official Press lo llevó en su Elección; tela de la Compañía Valenciana de la Seda), Marta con el mismo espolín y jubón verde de manga larga, «Espigas Belmonte» en azul antiguo, «Árabe» en rojo Valentino, «Lidón» de fondo borgoña (de frente y de lado), «Lidón» de fondo coral (fallera con banda, foto de Tamayo; el archivo decía «lion» e Ignacio confirmó que es Lidón), «Carpio» en gris antiguo (niña) y «Tetuán» en maniquí (lleva la firma de Jose Espolín en la foto). La foto de Laura con espolín azul noche y mantilla pasó a la Galería a petición de Ignacio. Los textos alternativos salen del nombre de cada archivo que dejó Ignacio; los nombres de modelo no se traducen. **Debajo de cada foto se ve el modelo** (y, en pequeño y dorado, el color si lo daba el archivo): campos `modelo` y `color` de la pieza (el color, en ES y VAL); la tarjeta lo pinta solo si la pieza trae `modelo` (pedido por Ignacio el 20-10-2026). Fotos en `espolin/esp-*.webp`; los originales, en `_originales/espolin/`.
- **Indumentaria Valenciana:** foto de la tarjeta `IMG.p8`. Tiene 9 fotos: la primera, la fallera con mantilla de encaje y ramo de rosas (`p17`, `coleccion 2027/fallera-mantilla-ramo.webp`, añadida el 19-10-2026; el fichero original se llamaba `fallera-mantilla-ramo-iricharl.jpg`), y las 8 que había en la colección, incluidas las de espolín, que Ignacio pidió dejar aquí. La de Marta Capella se quitó el 20-10-2026 a petición de Ignacio: ya sale en la familia Espolín.
- Para añadir más fotos de espolín: convertirlas a WebP en `espolin/`, añadir cada una a `products` (en `es` y `ca`) con `family:'espolin'` y su texto alternativo (sale del nombre del archivo), guardar el original en `_originales/espolin/` y subir.
- Las demás colecciones no tienen `families` y muestran todas sus fotos directamente.

## Falleras Mayores

- **Falleras Mayores y Falleras Mayores Infantiles de València (sección Historia, `#fm-en-historia`):** desde el 18-10-2026 van en dos grupos con título, cada uno ordenado por año, y debajo las Cortes de Honor con su año. Datos en `FALLERAS_VALENCIA` y `CORTES_VALENCIA` (JS, junto a `buildHistoria()`); títulos en `t().historia.grupos / cargo / corte`. Fotos en `falleras-valencia/` (`fm-AAAA-nombre.webp`, `fmi-AAAA-nombre.webp`, `corte-AAAA.webp`). **Solo las que ha vestido Cosas Cucas**: Ignacio deja las fotos en `Desktop/fotos  cosascucas` (con nombre y cargo en el fichero) y se contrastan nombre y año con el histórico de fallas.com ([mayores](https://www.fallas.com/falleras-mayores-de-valencia/), [infantiles](https://www.fallas.com/historico-falleras-mayores-infantiles-de-valencia/)), que trae todas y no solo las de la casa.
  - Falleras Mayores de València: Mónica Palmer Cuenca (1992), Adriana Polo Escrich (2001), Begoña Jiménez Tarazona (2013).
  - Falleras Mayores Infantiles de València: Sandra Leiva Herrero (1988), Carmen Serrano Bononat (1992), María Asensi López (1993), Ana Belén Ferrer Chardí (1995), Ruth Galán García (1998), Julia Vizcayno Orero (2027; recorte de la foto 11 de su noticia).
  - Cortes de Honor de la Fallera Mayor de València: primero, tarjetas una a una (`CORTE_PERSONAS`: foto, nombre, año y falla; 4 por fila, 3 en tableta y 2 en móvil, con la última fila centrada si queda incompleta). La primera es de fuera de València: **Blanca Nebot Campos, Corte de Honor de Vila-real 2025** (dama de la Corte de Honor de la Reina de las Fiestas de Vila-real 2025, Nadia Alba Costa; fiestas patronales, no Fallas; sin falla; confirmado en vila-real.es y prensa el 20-10-2026). Su pieza lleva `cargo` (ES/VAL, sustituye a «Corte de Honor») y `lugar` (ES/VAL, en vez de la falla); foto `falleras-valencia/corte-2025-vila-real-blanca-nebot-campos.webp`, original en `_originales/falleras-valencia/`. Después: Marta Capella Guanter (Corte 2026, falla Carretera d'Escrivà-Cooperativa de Sant Ferran; fue candidata a FMV 2026, la elegida fue Carmen Prades y las demás forman la Corte), Laura Llobell López (Corte 2026, falla Exposició-Micer Mascó; foto de Tamayo; el nombre del archivo que dejó Ignacio pone 2027 por error), Alejandra Blanco Beltrán (Corte 2027, Mestre Rodrigo-General Avilés; foto de la Ofrenda de @alejandrablaancoo, con crédito) y Laura Miquel Obarti (Corte 2027, Avinguda de l'Oest), con fotos de la noticia recortadas en vertical. Ignacio quiere fotos de cuerpo entero con el traje completo, no retratos: tarjetas en 3:4. Debajo, las fotos de grupo de 1995, 1997 y 2012 (llevan impresos los nombres) y la foto «Fallera Xiqueta».
  - Para añadir una: convertir la foto a WebP en `falleras-valencia/` y añadir una línea a `FALLERAS_VALENCIA` (`tipo: 'mayor' | 'infantil'`, `anyo`, `nombre`, `foto`, y `foco` si hace falta encuadrar) o a `CORTES_VALENCIA`.
  - **Pendientes de identificar** (quitadas el 18-10-2026 porque su nombre no cuadraba): la foto `…_19adae8f.jpg` (mujer adulta, traje blanco; ponía «Carmen Serrano, FMI 2012», pero la FMI de 2012 fue Rocío Pascual Candel) y `…_ac29bca3.jpg` (mujer con traje rojo; ponía «Monica Palmer», cuya foto buena es otra).
- **Reinas de Burriana (Historia, debajo de las Cortes de Honor; `REINAS_BURRIANA`, `t().historia.burrianaLabel`):** una foto por año, centrada, con el nombre y el cargo de cada reina debajo. Desde el 20-10-2026: Claudia Sabater Llopis, Reina Fallera de Burriana 2025 (traje rojo), y Valeria Cuadros Marco, Reina Fallera Infantil de Burriana 2025 (traje verde), con su corte detrás (`falleras-valencia/reinas-burriana-2025.webp`; original en `_originales/falleras-valencia/`). Datos contrastados en burriana.es y elperiodic.com; según el Ayuntamiento, **los trajes de las dos Reinas 2025 los hizo Cosas Cucas** (los de las Cortes, Siglo XVIII; los de las Damas de la Ciudad, L'Armari de Fallera). En valenciano, «Borriana». Para añadir otro año: una entrada más en `REINAS_BURRIANA` (`anyo`, `foto`, `alt` ES/VAL y `personas` con `nombre` y `cargo` ES/VAL).
- **Indumentaria regional (Historia, debajo de las Reinas de Burriana; `INDUMENTARIA_REGIONAL`, `buildRegional()`):** una ventana por localidad, con el mismo aspecto que las familias de Indumentaria Femenina (Espolín / Indumentaria Valenciana): foto de portada y nombre; al pinchar, debajo salen sus fotos con su descripción. Creado el 20-10-2026 a petición de Ignacio. **Localidades:** Burriana (Alejandra Morcillo Ballester, Corte de Honor 2025 de la falla Societat Centre Espanya; no de la corte de la Reina Fallera; confirmado en elperiodic.com, 16-02-2025), Navajas (Elena Sáez Martínez, Reina de las Fiestas de Navajas 2025), Almenara (Sara Royo, festera de las Fiestas Patronales 2024; en Almenara no hay reina ni festera mayor, sino varias parejas de festeras y festeros de la quinta; ninguna fuente pública da sus nombres, va como dice el archivo), Segorbe (Ariadna Llop Joli, Corte de Honor Infantil de las Fiestas Patronales de Segorbe 2023, de la Reina Infantil Manuela Guillén Escrig; el archivo decía «Adriana», pero el libro oficial de fiestas del Ayuntamiento, InfoPalancia y El Periódico de Aquí dicen «Ariadna») y Vila-real (Blanca Nebot Campos, Corte de Honor de las Fiestas de Vila-real 2025); las dos fotos estaban antes en Falleras Mayores y en las tarjetas de la Corte de Honor, y Ignacio pidió pasarlas aquí. Si algún día no quedara ninguna localidad, sale el título y «Muy pronto, la indumentaria de cada localidad» (`t().historia.regionalVacio`). Ignacio deja los originales en `indumentaria regional/` (con espacio; **no se publica**) con la descripción en el nombre del archivo; las versiones para la web van en `indumentaria-regional/` (con guion; añadida a `.vercelignore` el 20-10-2026) y se añade la localidad o la foto: `{ id, nombre: { es, ca }, portada, fotos: [ { img, texto: { es, ca } } ] }`. Ventanas centradas, 3 por fila (2 en tableta y móvil).
- **De 2026 (`fmCurrent`, bloque `#falleras-mayores`):** fallas Exposición (Laura Llobell López; nombre en el pie desde el 20-10-2026, dato de Ignacio), Matías Perelló-Luis Santángel (Cristina Huerta Pérez), Maestro Rodrigo, Rosario, Conserva y La Manta al Coll (infantil). Después, las de 2025: María Chuliá Zaragoza, falla Blocs-Platja (`IMG.fm10`; el archivo pone 2026, pero Ignacio dice que fue Fallera Mayor 2025; nombre y año corregidos el 20-10-2026), Alba Carrero Macián, falla José María Haro-Poeta Mas y Ros (`IMG.fm17`), y detrás las seis de 2023-2025 (ver la línea siguiente). La de Maestro Rodrigo es Alejandra **Blanco** Beltrán (antes ponía «Blasco» por error; corregido el 18-10-2026).
  - **Desde el 20-10-2026, 15 fotos** (en ordenador, 5 filas de 3 completas; en móvil van de 2 en 2 y la última sale centrada: para que cuadre también en móvil harían falta 18). Detrás de las de 2026, por año: Marta Capella Guanter (FM 2025, Carretera Escrivá-Cooperativa San Fernando / Carretera d'Escrivà-Cooperativa de Sant Ferran; usa `IMG.esp1`), Begoña Sancho Lozano (FM 2025, Plaça del Mercat de Turís; confirmado en la web del Ayuntamiento de Turís), Ana María Villalba Layunta (FM 2024, Plaza Jesús / Plaça Jesús; confirmado en la ficha de la JCF; el archivo decía «Ana Villalba»), Carolina San Ramón Quilis (**Fallera Mayor Infantil 2024**, Mossén Josep Cuenca-Pinedo: el archivo decía «Fallera Mayor», pero la JCF la da como infantil e Ignacio eligió seguir a la JCF), Laura Castillo Llorens (FM 2023, Doctor García Brustenga-Vicente Barrera Cambra) y Teresa Alepuz (FM 2023, Santa Bárbara / Santa Bàrbara de Benifaió). De Marta (2025), Laura Castillo y Teresa no hay fuente pública del cargo: van como dice el nombre del archivo. Fotos `falleras mayores/fm-AAAA-nombre.webp` (`IMG.fm18`…`fm22`); originales en `_originales/falleras mayores/`.
  - **Rejilla:** 6 columnas y cada tarjeta ocupa 2 (3 por fila); si la última fila queda con 1 o 2 tarjetas, van centradas. En móvil (2 por fila), si sobra una, va centrada. El cargo va en su propia línea (`.fm-detail-year` en bloque) para que «Fallera Mayor Infantil 2024» no se separe al partirse.
  - **También en `landing.html`** (sección «Falleras Mayores vestidas por Cosas Cucas», mismas 15 y mismo orden; rejilla `.fm-grid` de `styles.css`: 4 por fila, 2 en tableta, 1 en móvil, con la última fila centrada). Desde el 20-10-2026 su antetítulo es «Indumentaria de Honor» (antes «… 2026») y el subtítulo «Confección exclusiva de Cosas Cucas.», como en la portada, porque ya no son solo de este año.

---

## Carpetas de fotos

| Carpeta | Contenido |
|---|---|
| `pasarela/` | Fotos de colección (ya no salen en la portada) |
| `falleras-valencia/` | Falleras Mayores e Infantiles de València y Cortes de Honor (sección Historia) |
| `noticias/` | Noticia de Julia (`julia-vizcayno-NN.webp` y `-mini`), de Meri (`meri-zalve-NN`), de «Joyas de la Indumentaria» (`joyas-NN`), del Premio Joia 2018 (`joia-NN`), de la VI Desfilada (`desfilada-NN`, `desfilada-video.mp4` y su portada), de Amanda (`amanda-NN`, `amanda-video.mp4` y su portada) y fotos de la corte en `noticias/corte-2027/` (`alejandra-NN`, `laura-NN`) |
| `coleccion 2027/` | Indumentaria femenina |
| `espolin/` | Trajes de espolín |
| `hombre/` | Indumentaria masculina |
| `aderezos/` | Aderezos y peinetas |
| `telas/probador digital/` | Catálogo de telas |
| `semana santa/` | Semana Santa |
| `falleras mayores/` | Falleras mayores (el nombre del archivo dice quién es) |
| `galeria/` | Fotos de la galería |
| `historia/` | Tienda y taller |
| `decoracion/` | Interiorismo |

---

## Publicar cambios

1. Editar los archivos.
2. Comprobar en local: `python -m http.server 8765` en la carpeta y abrir http://localhost:8765.
3. Subir **solo los archivos tocados**: `git add index.html` (nunca `git add .`) y después `git commit` y `git push origin master`.
4. GitHub Pages se publica solo con cada `push` (`.github/workflows/pages.yml`). En Vercel: `vercel --prod` desde la carpeta.

**Qué se publica:** `.vercelignore` es una lista blanca que sirve para las dos webs. Si una página empieza a usar una foto suelta de la raíz o una carpeta nueva, hay que añadir su línea `!/...` o no se verá en internet. Los `.md`, PDF, Word, Excel y scripts nunca se publican.

---

## Pendiente

- **Reglas de móvil pisadas (de antes):** unas 20 reglas del bloque `@media (max-width: 768px)` y del de 480px no se aplican porque las reglas de escritorio de Historia, Vídeos, Decoración, Galería, Reseñas, Deportivas… van después. Ya no hace que la página se salga del ancho, pero esas secciones no se ven en móvil como se pensó. Queda propuesto como tarea aparte.
- **Crédito de las fotos de Laura:** van sin crédito. Si Ignacio quiere, se añade una línea (por ejemplo «Fotos cedidas por Laura Miquel») en `CORTE_CREDITOS`/`t().corte`.
- **Texto de la noticia de la Corte:** no hay nada publicado sobre Laura aparte del nombre y la falla. Si Ignacio quiere contar algo de ella (desde cuándo la viste la casa, qué trajes son), se añade al párrafo 2.
- **Etiqueta "Espolín" en Indumentaria Valenciana:** una de sus fotos (`p1`) lleva la etiqueta dorada "Espolín" encima. Pendiente de decidir si se quita.
- **Rayón:** no hay ninguna pieza todavía.
- **Sello de Artesanía:** el archivo trae mucho margen blanco y se ve más pequeño que el del Gremio. Se puede recortar.
- **Sellos en otras páginas:** solo están en el pie de `index.html`, no en la galería ni en el resto.
- **Textos de producto:** unas 90 descripciones largas siguen sin revisar. Ahora no se ven en la web, así que no corre prisa.
- **Archivos sueltos en la carpeta** que no están en el repositorio (fotos, logos, vídeos, `fotos burriana/`, `fotos tienda/`…). No se han tocado.

### Al dar la web por definitiva: auditoría y blindaje de seguridad (orden de Ignacio, 20-10-2026)

**No ejecutar todavía.** Ignacio la dejó guardada el 20-10-2026 mientras se termina la web. Se ejecuta SOLO cuando él diga que la web está definitiva. Llegado ese momento, seguir esta orden tal cual: empezar por la FASE 1 sin modificar ningún archivo, entregarle el informe y pedirle confirmación antes de cada fase con cambios.

```text
Actúa como un ingeniero sénior de ciberseguridad web especializado en sitios estáticos, HTML/CSS/JavaScript sin frameworks, alojados en Vercel y GitHub Pages.

Mi web es HTML estático hecho a mano:
- Archivo principal: index.html, con CSS y JavaScript embebidos o en archivos locales.
- Otras páginas: galeria.html, landing.html, aviso legal, política de privacidad y 404.html.
- No usa WordPress, React, Next.js, Laravel, Wix, base de datos ni proceso de compilación.
- Está publicada en dos sitios con los mismos archivos:
  1. Vercel: https://cosas-cucas.vercel.app
  2. GitHub Pages: https://nafergu75.github.io/cosas-cucas
- El archivo server.js de Node.js es solo para uso local: asistente «Cuca» con IA y formulario. No está publicado ni debe exponerse.
- El chat público usa respuestas guardadas en la propia página.
- El formulario de contacto abre WhatsApp con un mensaje predefinido.

OBJETIVO:
Auditar y blindar la web pública frente a ataques, manipulación, inyección de código, robo masivo de imágenes, hotlinking, phishing, suplantación y accesos no autorizados. Proteger también el código, diseño, estructura, textos, imágenes y repositorio, sin romper el diseño, el carrusel, el lector, el chat local ni la experiencia en castellano y valenciano.

IMPORTANTE:
- No modifiques nada en la primera fase.
- No inventes archivos, rutas, dependencias ni configuraciones: inspecciona primero el proyecto real.
- Ten en cuenta que GitHub Pages no permite cabeceras HTTP personalizadas; aplica allí únicamente soluciones compatibles con HTML estático.
- En Vercel, usa vercel.json para cabeceras de seguridad.
- No rompas el SEO, la accesibilidad, el rendimiento ni las funciones existentes.
- Trabaja por fases y pídeme confirmación antes de cambios estructurales importantes.

FASE 1 — AUDITORÍA ESTÁTICA
Analiza todos los archivos públicos y el repositorio:
1. index.html, galeria.html, landing.html, páginas legales y 404.
2. CSS, JavaScript, imágenes, fuentes, iconos, vídeos y cualquier recurso externo.
3. Enlaces, formularios, atributos target, iframes, scripts externos, metadatos y comentarios.
4. Posibles fugas de información: correos personales, teléfonos, rutas internas, claves, tokens, comentarios de desarrollo, nombres de archivos sensibles, backups, archivos .env, .git expuesto o configuraciones.
5. Riesgos de XSS mediante contenido dinámico, innerHTML, document.write, eval, setTimeout con strings, URLs manipulables o datos insertados sin escapar.
6. Riesgos de clickjacking, iframe embedding, mixed content, enlaces inseguros http://, target="_blank" sin rel seguro, y recursos de terceros innecesarios.
7. Riesgos de exposición del repositorio: archivos que no deberían publicarse, historial con secretos, server.js accesible, credenciales, claves API o datos privados.

Entrega un informe con:
- Nivel de riesgo: crítico, alto, medio o bajo.
- Archivo y línea.
- Problema detectado.
- Impacto real.
- Solución concreta.
- Prioridad.
- Si requiere cambios en Vercel, GitHub, Cloudflare o solo en el HTML.

No hagas cambios todavía.

FASE 2 — CABECERAS DE SEGURIDAD EN VERCEL
Crea o corrige vercel.json para aplicar cabeceras a todas las rutas públicas. Usa primero Content-Security-Policy-Report-Only para verificar que no rompe nada; después propón la versión enforce.

Configura como mínimo:
- Strict-Transport-Security.
- X-Content-Type-Options: nosniff.
- Referrer-Policy.
- Permissions-Policy mínima.
- X-Frame-Options: DENY o CSP frame-ancestors 'none', salvo que la web necesite insertarse en otro sitio.
- Content-Security-Policy adaptada al proyecto real.
- CSP que permita solo los orígenes realmente necesarios: 'self', imágenes locales, WhatsApp si se usa, fuentes o CDN usados, y ningún comodín innecesario.
- CSP que controle script-src, style-src, img-src, connect-src, font-src, frame-src, object-src, base-uri y form-action.
- Reglas de caché adecuadas para HTML, CSS, JS e imágenes.
- Cabeceras para impedir que los navegadores interpreten incorrectamente tipos de archivo.

Explica cada cabecera, su efecto y cómo probarla. No apliques una CSP restrictiva sin antes analizar todos los scripts, estilos, imágenes y recursos externos usados en index.html, galeria.html y landing.html.

FASE 3 — MEDIDAS DENTRO DEL HTML PARA GITHUB PAGES
Como GitHub Pages no permite cabeceras personalizadas, implementa en el HTML lo que sea compatible:
- Meta CSP solo si es útil y no interfiere con Vercel; explica sus limitaciones.
- Revisa que todos los recursos usen HTTPS.
- Añade rel="noopener noreferrer" a enlaces externos con target="_blank".
- Evita iframes innecesarios y controla los existentes con sandbox y allowlist.
- Elimina scripts externos innecesarios.
- Sustituye http:// por https:// en todos los recursos y enlaces.
- Revisa el formulario de WhatsApp para que no permita inyección de contenido ni manipulación peligrosa de parámetros.
- Escapa o valida cualquier dato que se inserte dinámicamente en el DOM.
- Evita exponer información técnica, rutas internas o comentarios sensibles.

FASE 4 — PROTECCIÓN DE IMÁGENES
Implementa una protección realista y multicapa para las imágenes de la web:
1. Revisa cómo se sirven actualmente: rutas, formatos, tamaños, nombres y accesibilidad pública.
2. Impide el hotlinking en Vercel si es técnicamente viable; si no, propón la solución con Cloudflare o cambio de CDN.
3. Añade marca de agua visible a las imágenes originales o a las versiones públicas.
4. Sirve en la web versiones optimizadas, comprimidas y de resolución limitada; guarda los originales fuera del repositorio público.
5. Renombra imágenes sensibles con nombres no descriptivos o UUID si procede.
6. Evita exponer imágenes originales en alta resolución si no son necesarias.
7. Añade aviso visible de propiedad intelectual y política de uso.
8. Implementa medidas disuasorias sin romper accesibilidad:
   - Bloqueo de arrastre de imágenes.
   - Bloqueo de clic derecho sobre imágenes.
   - Prevención de selección de imágenes.
   - Overlay transparente sobre imágenes de galería cuando no perjudique la usabilidad.
9. No prometas protección total: explica que las capturas de pantalla y las herramientas del navegador no se pueden bloquear al 100%.
10. Si hay imágenes especialmente valiosas, propón la mejor opción entre marca de agua, CDN protegido, Cloudflare, imágenes de baja resolución o venta/descarga controlada.

FASE 5 — PROTECCIÓN DEL CÓDIGO, DISEÑO Y ESTRUCTURA
- Minifica CSS y JavaScript de producción sin romper funcionalidad.
- No ofusques de forma agresiva si dificulta el mantenimiento; propón solo una opción razonable.
- Elimina comentarios sensibles, rutas internas, datos personales innecesarios, claves, tokens y código de pruebas del código publicado.
- No publiques mapas de código fuente.
- Revisa que no existan archivos accesibles como .env, .git, backups, configuraciones, server.js, documentación interna, notas o archivos temporales.
- Añade o revisa robots.txt para controlar la indexación de páginas o recursos que no deban aparecer en buscadores.
- Revisa sitemap.xml si existe.
- Añade meta robots o X-Robots-Tag cuando corresponda.
- Comprueba que la página 404 no revele información sensible.
- Revisa favicon, manifest, metadatos y Open Graph para que no expongan rutas privadas.

FASE 6 — REPOSITORIO GITHUB Y DESPLIEGUE
- Audita el repositorio nafergu75/cosas-cucas.
- Comprueba que no haya secretos, claves API, contraseñas, tokens, correos privados innecesarios ni datos personales en el historial.
- Revisa .gitignore y añade exclusiones para:
  - .env
  - node_modules
  - backups
  - archivos temporales
  - imágenes originales privadas
  - credenciales
  - logs
  - system files
- Revisa permisos del repositorio, colaboradores, tokens de acceso personal y claves SSH.
- Comprueba que el despliegue no publique carpetas o archivos privados.
- Recomienda cómo mantener server.js y cualquier clave de IA fuera del repositorio público.
- Si hay GitHub Actions, revisa permisos mínimos, secretos y riesgo de modificación del despliegue.

FASE 7 — PROTECCIÓN CONTRA PHISHING Y SUPLANTACIÓN
- Comprueba que el dominio, si existe, tenga DNS seguro y HTTPS correcto.
- Revisa que no haya mixed content.
- Añade aviso legal claro de titularidad de la web, textos, imágenes y marca.
- Revisa que los enlaces a WhatsApp usen el número correcto y no permitan suplantación sencilla.
- Recomienda medidas para detectar copias fraudulentas de la web, como búsquedas periódicas del nombre, alertas de Google, vigilancia de dominios parecidos y registro de marca si procede.

FASE 8 — PRUEBAS FINALES
Después de cada cambio:
1. Indica archivos creados o modificados.
2. Explica el cambio en lenguaje claro.
3. Explica cómo probarlo en Vercel y GitHub Pages.
4. Comprueba que el carrusel, lector, chat local, formulario de WhatsApp, galería, landing, páginas legales y 404 siguen funcionando.
5. Comprueba escritorio y móvil.
6. Indica cómo revertir el cambio si algo falla.
7. Entrega un checklist final con estado: implementado, pendiente, requiere acción externa o no aplicable en GitHub Pages.

REGLA FINAL:
Prioriza en este orden:
1. Evitar fuga de secretos y archivos privados.
2. Prevenir XSS, inyección y manipulación del DOM.
3. Aplicar cabeceras de seguridad en Vercel.
4. Proteger imágenes contra hotlinking, descarga masiva y reutilización.
5. Reducir exposición del código y la estructura.
6. Añadir medidas disuasorias de copia.
7. Mejorar monitorización, backups y respuesta ante incidentes.

Empieza ahora con la FASE 1. No modifiques ningún archivo todavía. Analiza el proyecto real y entrégame el informe de vulnerabilidades, riesgos y plan de remediación priorizado.
```

---

## Historial de trabajos

Ordenado de lo más nuevo a lo más antiguo. Cada línea es un trabajo terminado y publicado.

### 20-10-2026
- **Falleras Mayores:** Lourdes Serrano Bono, Fallera Mayor Infantil 2024 de la falla Alemania-El Bachiller (VAL «Alemanya-El Batxiller»; ficha de la JCF; luego fue Corte de Honor Infantil de València 2025), detrás de Carolina San Ramón, en la portada (ES y VAL) y en `landing.html` (`IMG.fm25`). Son 17.
- **Indumentaria regional:** nuevas localidades Almenara (Sara Royo, festera 2024) y Segorbe (Ariadna Llop Joli, Corte de Honor Infantil de las Fiestas Patronales de Segorbe 2023, de la Reina Infantil Manuela Guillén Escrig; el archivo decía «Adriana», pero el libro oficial de fiestas del Ayuntamiento, InfoPalancia y El Periódico de Aquí dicen «Ariadna»). Cinco ventanas por orden alfabético. Navajas tiene una segunda foto: Natalia Corbatón Cubells, dama de la Corte de Honor de la Reina de las Fiestas de Navajas 2023, Rebeca Rodríguez Zapata (InfoPalancia, 8-09-2023).
- **Indumentaria regional › Burriana:** Alejandra Morcillo Ballester, Corte de Honor 2025 de la falla Societat Centre Espanya. Las fotos del bloque pasan a la carpeta publicada `indumentaria-regional/` (Ignacio había movido las de Elena y Blanca a su carpeta de originales `indumentaria regional/`, que no se publica, y en la siguiente publicación se habrían perdido).
- **Indumentaria regional, primeras localidades:** Navajas (Elena Sáez Martínez, Reina de las Fiestas 2025) y Vila-real (Blanca Nebot Campos, Corte de Honor de las Fiestas 2025). Elena sale de Falleras Mayores (portada y `landing.html`; quedan 16) y Blanca de las tarjetas de la Corte de Honor (quedan 4), a petición de Ignacio.
- **Indumentaria regional, visible:** Ignacio no lo veía (estaba oculto por no tener fotos). Ahora sale con su título y «Muy pronto, la indumentaria de cada localidad» (VAL «Molt prompte, la indumentària de cada localitat») hasta que lleguen las primeras fotos.
- **Reinas de Burriana:** el título del bloque pasa a ser solo «Reinas de Burriana» (VAL «Reines de Borriana»), sin «y Corte de Honor», a petición de Ignacio.
- **Falleras Mayores, Miranda Muñoz Gómez:** las dos fotos de la niña (el retrato de estudio, antes «Falla La Manta al Coll · Alguenet · Fallera Infantil 2026», y la de la tienda, antes «Falla Maestro Rodrigo · General Avilés · Fallera Mayor 2026», que no era) son de Miranda Muñoz Gómez, **Fallera Mayor Infantil 2026 de la falla La Manta al Coll de Alginet** (dato de Ignacio; confirmado en La Veu d'Alginet, 25-01-2026: «La Falla La Manta al Coll proclama Miranda Muñoz com a Fallera Major Infantil 2026», en valenciano «Miranda Muñoz i Gómez»; el «algunet» del archivo era errata de Alginet). Van juntas, con nombre y cargo, en la portada (ES y VAL) y en `landing.html`. La de la tienda pasa a `falleras mayores/fmi-2026-la-manta-al-coll-miranda-munoz-gomez.webp` (`IMG.fm8`); original en `_originales/falleras mayores/`. Según la web de la falla Maestro Rodrigo, su Fallera Mayor Infantil 2026 fue Sofía Gardey Aparisi.
- **Historia, dos bloques nuevos debajo de las Cortes de Honor:** «Reinas de Burriana y Corte de Honor» (VAL «Reines de Borriana i Cort d'Honor»), con la foto de Claudia Sabater Llopis y Valeria Cuadros Marco, Reinas Falleras de Burriana 2025, y «Indumentaria regional» (VAL «Indumentària regional»), con una ventana por localidad, preparado y oculto hasta que lleguen fotos. Probado con localidades de prueba en el navegador (no guardadas).
- **Falleras Mayores:** Elena Sáez Martínez, **Reina de las Fiestas de Navajas 2025** (fiestas patronales de la Virgen de la Luz; lo dice el programa oficial «Fiestas 2026» del Ayuntamiento, que la nombra como reina saliente con «su Corte de Honor 2025»). Pie «Navajas · Elena Sáez Martínez» / «Reina de las Fiestas 2025» (VAL «Reina de les Festes 2025»), detrás de las dos de Begoña (`IMG.fm24`, `falleras mayores/reina-navajas-elena-saez-martinez.webp`; original en `_originales/falleras mayores/`). También en `landing.html`. Son 17: en ordenador, 5 filas de 3 y 2 centradas al final.
- **Falleras Mayores:** segunda foto de Begoña Sancho Lozano (FM 2025, Plaça del Mercat de Turís), con el mismo espolín y jubón gris de manga larga (`IMG.fm23`, `falleras mayores/fm-2025-begona-sancho-lozano-2.webp`), al lado de la primera, en la portada (ES y VAL) y en `landing.html`.
- **Cortes de Honor (Historia):** nueva tarjeta, Blanca Nebot Campos, «Corte de Honor de Vila-real · 2025» y «Fiestas patronales de Vila-real» (dama de la Reina de las Fiestas de Vila-real 2025; Ignacio dio el año y que es de Vila-real; lo demás, contrastado en la web del Ayuntamiento y en prensa). Va la primera (por año). Las tarjetas pasan a centrar la última fila (5: 4 + 1 en ordenador).
- **Falleras Mayores:** la foto de la falla Blocs · Platja es de María Chuliá Zaragoza, Fallera Mayor **2025** (no 2026, como decía el pie). Nombre y año en el pie y pasa al grupo de 2025, en la portada (ES y VAL) y en `landing.html`.
- **Falleras Mayores:** la de la falla Exposición lleva ya su nombre en el pie, Laura Llobell López (dato de Ignacio), en la portada (ES y VAL) y en `landing.html`.
- **Espolín vuelve a 9 fotos:** Ignacio añadió «Lidón · fondo coral» (`espolin/esp-lidon-coral.webp`, pieza `e9`, detrás de las dos de Lidón borgoña) para que cuadren las filas.
- **La foto de Laura (espolín azul noche, mantilla y ramo) pasa de Espolín a la Galería** (pedido por Ignacio): `galeria/fallera-espolin-azul-mantilla.webp` en «Nuestras falleras» de Indumentaria femenina. Espolín queda con 8 fotos (3 + 3 + 2 en ordenador) y la galería con 37 fotos de clientas (en ordenador, 9 filas de 4 y una suelta).
- **Espolín con el nombre del modelo bajo cada foto** (pedido por Ignacio): «Espigas de Montserrat», «Espigas Belmonte · azul antiguo», «Árabe · rojo Valentino», «Lidón · fondo borgoña», «Carpio · gris antiguo» y «Tetuán», en ES y VAL (el color traducido; el modelo no). Solo en Espolín; las demás colecciones siguen sin textos. Falta el modelo de la foto de Laura.
- **Marta Capella fuera de Indumentaria Valenciana** (pedido por Ignacio): la pieza `esp1` se quita en ES y VAL porque la foto ya sale en la familia Espolín (`e1`); Indumentaria Valenciana queda con 9. `IMG.esp1` se sigue usando (tarjeta de Espolín, `e1` y la rejilla de Falleras Mayores).
- **Galería › Indumentaria femenina › Nuestras falleras:** nueva foto, la chica del espolín «Espigas Belmonte» en azul antiguo, de perfil ante una puerta de madera (Ignacio la dejó en `galeria/`; WebP `galeria/espolin-espigas-belmonte-perfil.webp`, original en `_originales/galeria/`). Son 36 fotos de clientas: filas completas de 4, de 3 y de 2.
- **Nuestra historia, la tienda nueva a la vista:** Ignacio no veía la tienda nueva en el bloque (la foto grande es la tienda antigua de Grabador Esteve; solo el texto hablaba de Burriana). Debajo del bloque, a todo el ancho, una franja con tres fotos de Burriana, 21 (fachada con los toldos negros, la tienda vista desde el escaparate y la pared de brocados: `noticias/tienda-01`, `-10` y `-03`) y el pie «Nuestra nueva casa: calle Burriana, 21 · 46005 Valencia» (`t().dossier.nuevaCaption`; textos alternativos de `t().tienda.alts`). En móvil, la foto ancha arriba y las dos verticales debajo. Queda como un «antes y ahora».
- **Espolín y Falleras Mayores, fotos nuevas de Ignacio:** la familia Espolín de Indumentaria Femenina, que estaba vacía, tiene ya 9 fotos (carpeta `espolin/`); la rejilla de Falleras Mayores vestidas por Cosas Cucas pasa de 9 a 15 con seis falleras mayores de falla de 2023 a 2025 (carpeta `falleras mayores/`). Nombres de fallas, falleras y telas contrastados en internet (JCF, Ayuntamiento de Turís, Ayuntamiento de Benifaió, Official Press); Carolina San Ramón va como Fallera Mayor Infantil 2024 por decisión de Ignacio. Última fila de la rejilla centrada si queda incompleta. `IMG.esp1` apunta al WebP nuevo (Ignacio renombró `espolin/marta capella.jpeg`); fuera `IMG.fm15/fm16`, que no se usaban. Originales a `_originales/`. También en `landing.html`. Revisión independiente (fotos frente a textos, código y valenciano): sin textos cambiados; arreglado el cargo largo que se partía en móvil. Probado en ES y VAL a 1440 y 390 px, sin errores. **Pendiente de Ignacio:** la foto de Marta Capella con banda sale ahora en las dos familias (Espolín e Indumentaria Valenciana, donde pidió dejarla cuando Espolín estaba vacía).
- **Formato tipo revista en las noticias largas:** el de Amanda pasa a ser una pieza común (`.revista`, ver «Noticias largas» arriba) y se aplica a la Desfilada (vídeo del desfile con los tres últimos párrafos, el crédito del cartel y el enlace a Instagram), la tienda (fachada nueva con los toldos negros en vertical, con los tres últimos párrafos y el enlace al reel) y el Premio Joia (los trajes expuestos con el cartel de la casa, con el último párrafo). Hueco blanco bajo las fotos a 1440 px: Desfilada de 870 a 72, tienda de 658 a 127 y Joia de 290 a 180. Probado en ES y VAL a 1440, 900 y 390 px, sin errores. Meri, «Joyas» y la Corte no lo necesitan (el texto y el carrusel acaban casi a la vez).
- **Amanda, maquetación tipo revista:** arriba, título y dos primeros párrafos junto al carrusel (acaban casi a la misma altura); debajo, a todo el ancho y tras una línea, el vídeo vertical con el resto del texto al lado (`.am-revista`, `.am-segunda`). En móvil, todo en una columna. Antes el texto largo dejaba más de 1.000 px vacíos bajo las fotos. Si gusta, se puede usar en otras noticias largas.
- **Amanda, zapatos:** los zapatos de la exposición son de Trinidad Meléndez (etiqueta en las fotos), firma que colabora con Cosas Cucas; ahora el texto lo dice (ES y VAL).
- **Orden de seguridad guardada:** auditoría y blindaje en 8 fases (secretos, XSS, cabeceras en Vercel, imágenes, código, repositorio, suplantación y pruebas), en «Pendiente». Se ejecuta cuando Ignacio dé la web por definitiva, empezando por la FASE 1 sin tocar nada.
- **Revisión de la noticia de Amanda (ya publicada):** cinco textos alternativos del carrusel estaban cambiados de foto y dos se precisan; «La tela de su traje verde es de la Compañía…» (antes «Su traje verde es de…»); «planta en la sección Especial» (antes «vuelve», y ya estaba en Especial); en VAL «Compañía» sin traducir, como en el resto de la web; la portada de los vídeos (Amanda y Desfilada) se pide al abrir la noticia y no en cada visita (`data-poster`).
- **Nuestra Historia:** la foto grande (`historia/cosascucas_1.jpg`, la de las sillas tapizadas doradas) es la tienda antigua de C/ Grabador Esteve, 30 · 46004; el pie decía Burriana, 21 y ahora dice «Nuestra tienda de la calle Grabador Esteve, 30 · 46004 Valencia» (VAL «Gravador Esteve»). Nuevo bloque «Una casa nueva en Burriana» (`block3Title/p1/p2` en `t().dossier`, ES y VAL) con el paso a la tienda de Burriana, 21 (1-7-2026) y la del Cabañal, que sigue en Vicent Gallart, 49.
- **Noticia de Amanda Dàries Ricart, FMI 2027 de la falla Malvarrosa:** primera tarjeta de «Más noticias», con texto en ES y VAL, 20 fotos (la historia del traje verde de la Compañía Valenciana de la Seda, modelo «Carpio», y la exposición de los trajes de su reinado) y el reel como vídeo.
- **Fuera Paqui de los textos:** donde salían las tres hijas («Noelia, María y Paqui») ahora pone «Noelia y María»: bloque editorial de la portada, Historia, noticia del Premio Joia (ES y VAL), `landing.html` y las instrucciones del asistente Cuca (`server.js`). El bloque «Nuestra Historia» ya decía solo «Noelia y María».
- **Regla nueva:** cuando se renueve la noticia principal, la anterior pasa automáticamente a «Más noticias» (pasos en el apartado de Noticias, arriba).
- **Aderezos y Peinetas:** foto de la «Peineta Dorada con Rosas — Conjunto de Gala» (`a4`) cambiada por la versión retocada que dejó Ignacio en la carpeta del proyecto (746×811), ahora `aderezos/peineta-dorada-rosas.jpg`. **Ojo:** al cambiar una foto hay que darle un nombre nuevo; con el mismo nombre los navegadores siguen enseñando la vieja (Vercel la guarda en caché un día y hasta una semana más mientras revalida).
- **Carruseles de las noticias, siempre en marcha:** ya no se paran con el ratón encima (en el lector el ratón solía quedarse sobre el carrusel al abrir la noticia y parecía estático) ni cuando el sistema tiene las animaciones reducidas (entonces van sin el zoom lento, con la barra y el botón de pausa a la vista). Se siguen parando con el botón de pausa, al navegar con el teclado dentro del carrusel y cuando no se ven en pantalla.

### 19-10-2026
- **Noticia «Cosas Cucas en la VI Desfilada d'Indumentària Valenciana»:** sexta tarjeta de «Más noticias», entre la de la tienda y la de «Joyas» (por fecha), con su noticia en el lector: texto en ES y VAL a partir del cartel, del texto de Cosas Cucas en Instagram y de la prensa; carrusel con las 18 fotos de la publicación del 22-06-2026 (WebP 900×1200 y mini 360×480) y, bajo el texto, el vídeo del desfile con su portada y el enlace a Instagram. Al cerrar el lector se para cualquier vídeo. Pendiente: crédito de las fotos 15-18 y revisión del texto.
- **Indumentaria Valenciana (Todas las colecciones › Indumentaria Femenina):** nueva foto, la fallera con mantilla de encaje blanco y ramo de rosas, la primera de la familia.
- **Falleras Mayores: Alba Carrero Macián (2025):** nueva tarjeta «Falla José María Haro-Poeta Mas y Ros · Alba Carrero Macián» / «Fallera Mayor 2025», la novena (rejilla completa de 3×3 en escritorio). La foto es un fotograma de su reel de @cosascucass (29-11-2024), el retrato sonriendo, a 720×1280 (lo que da el vídeo), con un poco de limpieza y enfoque. Datos del texto del reel. También en `landing.html`.
- **Falleras Mayores 2026, pie de Matías Perelló:** la tarjeta pasa a «Falla Matías Perelló-Luis Santángel · Cristina Huerta Pérez» / «Fallera Mayor 2026» (en VAL, «Lluís Santàngel»); antes no llevaba nombre y el «·» hacía parecer que Luis Santángel era una persona. Nombre y falla, del texto del reel de @cosascucass (21-10-2025). La foto no cambia. También en `landing.html`.
- **Bloque Falleras Mayores 2026:** el subtítulo pasa a «Confección exclusiva de Cosas Cucas» («Confecció exclusiva de Cosas Cucas» en VAL), en lugar de «Las Falleras Mayores de las fiestas 2026, vestidas con nuestros diseños exclusivos».
- **Corte de Honor una a una en Historia:** tarjetas con foto, nombre, año y falla de Marta Capella Guanter y Laura Llobell López (Corte de la FMV 2026) y de Alejandra Blanco Beltrán y Laura Miquel Obarti (Corte 2027), encima de las fotos de grupo.
- **Galería en dos apartados:** al entrar, dos ventanas con foto (la fallera del traje verde y el chico del jubón marrón) para «Indumentaria femenina» e «Indumentaria masculina»; al pinchar se ven sus fotos, cada foto en el suyo (las niñas en femenina, los niños en masculina). La masculina se completa con las 12 fotos reales de falleros de la carpeta `hombre/`. Fuera los filtros Todas/Mujer/Hombre/Niño, la animación GSAP y la sección vacía de Instagram. Corregidos tres pies de la pasarela que no cuadraban con la foto (p. ej. «Manteleta bordada a mano» en un niño). Pendiente: los pies de la pasarela dicen «Falles 2027», pero la foto de grupo enseña el cartel del I Desfile de Indumentaria del Gremio (Ateneo Mercantil); y en «Nuestras falleras» hay una captura de pantalla de móvil (`WhatsApp Image 2026-05-07 at 19.39.010.jpeg`).
- **Noticia «Cosas Cucas abre en la calle Burriana, 21»:** quinta tarjeta de «Más noticias», con texto en ES y VAL sobre el traslado, la zona y el ambiente fallero, y diez fotos de la tienda (siete del día de la apertura). La cabecera del apartado pasa a «Noticias Cosas Cucas». En escritorio la rejilla pasa a seis medias columnas para que la última fila, si no está llena, vaya centrada.
- **Julia en la prensa:** recuadro «En la prensa» en su noticia con el artículo de Official Press sobre el traje que estrenó en «Una Festa per a Tots» (confeccionado en Cosas Cucas), con enlace.
- **Noticia del Premio Joia 2018 a Paquita Martorell:** cuarta tarjeta de «Más noticias» (en escritorio, la cuarta va centrada debajo de las otras tres), con texto en ES y VAL y 9 fotos de Ignacio.
- **Semana Santa en filas completas:** 18 fotos (seis filas de 3 en escritorio, nueve de 2 en tablet). Se quitó la 19 («Mantilla Negra de Encaje Floral y Medalla de Cofradía», `ss19`), que se quedaba sola en la última fila; su ruta sigue en `IMG.ss19` por si se recupera.
- **Telas Valencianas sin el cartel «Nueva»:** quitado de las nueve telas que lo llevaban (t17 a t25, también «Nova» en VAL). Siguen «Exclusivo» (Calanda) y «Destacada» (Sinfonía).
- **Arreglos de la revisión de «Joyas»:** el cartel de la exposición va sin el zoom lento (se comía los logos del pie) y las dos fotos pequeñas de la inauguración ya no se amplían (clases `nf__slide--fija` y `nf__slide--peq`, con `fija` y `peq` en los datos del carrusel). Tarjetas de «Más noticias»: dos columnas hasta 860 px con la tercera centrada debajo, y tres desde 861 px.
- **Portadas de «Más noticias» con las fotos enteras:** la portada de cada tarjeta pasa a 3:2, que es lo que ocupan dos fotos verticales 3:4 juntas, así que se ven sin recortar; en móvil la tarjeta va en vertical (fotos arriba, texto debajo) en vez de en tiras estrechas. En la de Meri, el «Lazos» verde en lugar del «Almudena» (tras quitarle el marco, el «Almudena» perdía el bajo). Se probó una galería en mosaico dentro de las noticias, pero Ignacio prefirió quedarse con el carrusel.
- **Noticia «Joyas de la Indumentaria»:** tercera tarjeta de «Más noticias» con su noticia en el lector: Cosas Cucas expuso dos trajes en la II Exposición del Gremio de Sastres y Modistas (Salón de Cristal del Ayuntamiento, junio de 2026). Texto en ES y VAL a partir de la prensa y de las fotos de Ignacio; 13 fotos con el cartel.

### 18-10-2026
- **Puntilla entre bloques y publicación de todo lo del día:** remate de encaje en los seis cambios de oscuro a claro y de claro a oscuro de la portada. Últimos arreglos de la verificación: dos columnas de tarjetas hasta 800 px y «Llegir la notícia →» sin salirse en móviles de 320 px. En el pase de la portada la foto que se va ya no cambia a la siguiente en mitad del fundido (fallo que venía de mayo). Con el enlace directo a una noticia, el chat también queda inerte detrás del lector.
- **Falleras Mayores de València separadas de las Infantiles:** en Historia, dos grupos con título (ordenados por año) y las Cortes de Honor con su año (1995, 1997, 2012). Con las fotos con nombre que dejó Ignacio salieron fotos cambiadas en la web: la de «Adriana Polo» era María Asensi, la de «María Asensi» era Ruth Galán, Carmen Serrano Bononat fue FMI en 1992 (no 1998) y María Asensi fue FMI, no corte. Nombres y años contrastados con fallas.com. Dos fotos sin identificar quedan fuera hasta saber quiénes son. Añadida Julia Vizcayno Orero como Fallera Mayor Infantil 2027 y cambiada la foto de Carmen Serrano Bononat por una de más resolución que dejó Ignacio.
- **Revisión del nuevo diseño de noticias (25 hallazgos):** al cerrar el lector tras llegar por el menú o la píldora de la portada, la página ya no sube sola al ancla; con el enlace directo, al cerrar queda en «Más noticias» y el foco va a la × al abrir; resto de la página inerte con el lector abierto y Tab sin escaparse; tarjetas: nombre accesible = titular, «Leer la noticia →» y la fecha sin partirse en móvil, dos columnas entre 601 y 800 px, filete dorado entre fotos que no desaparece con el hover y cara de Alejandra centrada; «Más noticias» en crema claro para no fundirse con «Todas las colecciones»; barra del lector alineada con el texto en móvil y sin doble línea. Fotos de Meri sin el marco blanco de Instagram (8 de las 14, también en el carrusel). Fuera restos del diseño anterior (`.noticia__inner--alt`).
- **Noticias reorganizadas:** Julia queda arriba como noticia principal y las demás pasan a «Más noticias», con tarjetas de foto y titular que abren la noticia completa en un lector a pantalla completa (se cierra también con el botón atrás y cada noticia tiene enlace directo). Fuera las píldoras de acceso de la cabecera. Al cerrar el lector o el modal de colecciones la página vuelve a su sitio de golpe (antes se veía bajar la página entera desde arriba).
- **Revisión de las fotos de Laura:** encuadre de la 5 y la 8 en la portada para tablet (se cortaban la frente y el moño), y miniaturas más ligeras.
- **Fotos de Laura en la noticia de la Corte:** Ignacio dejó 11 en `Desktop/fotos  cosascucas/laura`, todas de ella sola vestida de fallera. Entran 10 (se quita `laura-fallera-01`, casi igual que la `-03` del claustro). WebP a 1200 px de alto las verticales; la cuadrada se trata como vertical para verla entera. En la portada entran la de blanco y negro y la del traje azul en casa; la de la mantilla sonriendo mide 960 px y se queda fuera. El crédito ahora dice «Fotos de Alejandra en Instagram».
- **Fotos de Alejandra en la noticia de la Corte:** 10 fotos de dos publicaciones de Instagram (retratos de @edgfotografia y la Ofrenda 2026 de @alejandrablaancoo), con crédito y enlace. La noticia ya se ve y queda en crema entre la de Julia y la de Meri. Las horizontales entran también en el pase de la portada.
- **Revisión del apartado de Noticias (8 arreglos):** el menú de escritorio pasa a hamburguesa por debajo de 980 px (con «Noticias» ya no cabía y el selector de idioma se salía de pantalla entre 769 y 958 px) y el selector y la hamburguesa van a la derecha; antetítulo en dorado oscuro sobre crema; foco de teclado visible en las miniaturas; hover de píldoras y créditos con buen contraste; nombre accesible para los accesos a noticias; tres textos alternativos de Meri corregidos (la joven de la foto 1, el «Tetuán» visto de lado y las medias caladas con la M).
- **Portada sin el pase antiguo:** fuera las fotos de pasarela y la de la fachada; ahora pasan las fotos de Julia, cada una con su encuadre, y pasarán las de la corte cuando estén.
- **Bloque Corte de Honor 2027 preparado y oculto** hasta tener fotos: Alejandra Blanco Beltrán (falla Mestre Rodrigo-General Avilés) y Laura Miquel Obarti (falla Avinguda de l'Oest). Nombres y fallas comprobados en prensa (officialpress.es y otros).
- **Texto de la noticia escrito por Ignacio:** sustituye al anterior; la última frase va como dedicatoria. Traducido al valenciano.
- **Fuera el retrato de estudio:** se quita la última foto (Julia de cerca, retrato de estudio). Quedan 14.
- **Apartado de Noticias y noticia de Meri:** cabecera «Noticias del taller» con accesos, «Noticias» en el menú y alternancia automática de fondos. Nueva noticia de Mª José Zalve (Meri), Fallera Mayor 2027 de Pinedo, a partir de la publicación de Instagram de @jose_espolin_estudio, con 14 de sus 20 fotos y crédito al autor.
- **Segunda noticia (Corte de Honor 2027) preparada:** mismo formato que la de Julia, fondo crema y carrusel a la izquierda, con pie de foto (nombre y falla). Oculta hasta tener fotos. El carrusel pasa a ser un componente que usan las dos noticias. Revisión independiente antes de publicar: corregido el foco de teclado sobre crema y el encuadre de fotos verticales de la corte (marcar `vertical: true` y `foco` al añadirlas).
- **Titular y texto de la noticia:** el titular queda en «Fallera Mayor Infantil de València 2027» (sin «Vestimos»). Texto nuevo, más emotivo, con lo que contó Ignacio: Julia venía a la tienda desde bien pequeña, entre telas y modistas, y Cosas Cucas la ha vestido en toda su trayectoria fallera, que culmina ahora. Castellano y valenciano.
- **Fuera las fotos repetidas (15 en total):** se quita una de cada pareja casi igual: llegada por la alfombra roja, saludo a la alcaldesa, saludo con la mano en el salón y el ramo. Se deja la que tiene a Julia más grande o sonriendo de frente.
- **Pase de la portada más lento:** 7 s por foto y fundido de 2 s (antes 4 s y 1,4 s; Ignacio lo veía demasiado deprisa).
- **Más fotos de Julia (19 en total):** 7 nuevas que pasó Ignacio: llegada por la alfombra roja, saludo a la alcaldesa (dos casi iguales), de espaldas con el lazo, saludo a la Fallera Mayor y un retrato de estudio (`Julia-Vizcayno-Orero-No-225-…`, parece sacado de una web: conviene confirmar permiso y autoría). Orden del carrusel siguiendo el día: escaleras, llegada y saludos, salón, mesa presidencial, ramo y retrato al final.
- **Noticia destacada:** «Vestimos a la Fallera Mayor Infantil de València 2027», Julia Vizcayno Orero, falla Rosari-Plaça Calabuig, con un carrusel de 12 fotos del día de su proclamación en el Ayuntamiento (14-10-2026): las 8 primeras de la tarde y 4 más que pasó Ignacio después (alfombra roja con el ramo y dos verticales). Datos comprobados en eldiario.es y 7 Televalencia. Píldora «Noticia» en la portada. Castellano y valenciano.
- **Arreglo en móvil:** el formulario de contacto no pasaba a una columna y toda la página se salía del ancho del teléfono. Corregido.
- **Nombre corregido:** Alejandra Blanco Beltrán (ponía «Blasco»), en `index.html` y en `landing.html`.
- **Revisión a fondo antes de publicar** (5 revisores y un verificador por fallo): 19 fallos confirmados y corregidos o anotados. Lo principal: el pase de la portada cortaba la cabeza de Julia en tablets en vertical (ahora el encuadre va al 25 % de arriba), botón de pausa en el carrusel, el pase ya no se queda parado en pantalla completa, etiquetas accesibles y diapositivas ocultas para lectores de pantalla, textos alternativos de la portada al cambiar de idioma, ancla de Falleras Mayores bajo la cabecera, y en escritorio la página se salía 20 px por la derecha por el rótulo de la foto editorial.
- **Espolín vacío y fotos a Indumentaria Valenciana:** el acceso a Espolín se mantiene con su foto pero no muestra ninguna dentro hasta que lleguen todas las de espolín. Las 9 fotos que había pasan a Indumentaria Valenciana. Desde ahora la familia de cada foto se indica con `family` y no depende del tipo de tela.
- **Familias en Indumentaria Femenina:** dos accesos con foto, Espolín e Indumentaria Valenciana; al elegir uno se ven solo sus fotos. Funciona en castellano y valenciano, y en móvil. Las piezas en valenciano se han puesto al día con las de castellano (antes no tenían material ni la foto de Marta Capella).
- **Pie:** sello del 775 aniversario del Gremio Artesano de Sastres y Modistas de Valencia, al lado del de Artesanía.
- **Pie:** sello de Artesanía Comunitat Valenciana bajo las redes sociales.
- **Colecciones:** las fotos se muestran solas, sin nombre, descripción ni precio.
- **Documentación:** creado este archivo (`PROYECTO_WEB.md`). No se publica en la web.
- Publicado en GitHub Pages y en Vercel.

### 07-10-2026 · Revisión general
- Mapas de Google bajo demanda y política de privacidad adaptada a lo que hace la web.
- Fuera el aviso de "Próxima inauguración": la tienda de Burriana ya está abierta.
- Probador virtual retirado (y redirección de su dirección a la portada).
- Formularios por WhatsApp; nombres de telas en valenciano; redes y metadatos.
- Fotos de pasarela y portada reducidas a tamaño web; favicon e imagen para compartir en redes.
- Publicación limitada a los archivos de la web, igual en GitHub Pages y Vercel (`.vercelignore`).
- Domicilio social en C/ Burriana 21 en los textos legales.
- Revisión de rutas de imágenes, dirección y seguridad del servidor.

### 02-06-2026
- Fotos de falleras históricas corregidas: Monica Palmer, Adriana Polo y Carmen Serrano 2012 tenían la foto cambiada.
- Fotos de falleras mayores en cuadrado, con nombre y año debajo bien alineados.
- Nuevas falleras históricas: Sandra Leiva Herrero (1988) y Begoña Jiménez Tarazona (2013).
- Primera foto de espolín: Marta Capella, Falla Carretera Escrivá (2025).
- Mensaje parpadeante de "Próxima apertura" en la portada (retirado el 07-10).

### 29-05-2026
- Cartel del traslado a Burriana (`cartel-traslado.html`).

### 20-05-2026
- Dirección nueva en toda la web: de Grabador Esteve 30 a C/ Burriana 21, 46005, con mapas actualizados.
- Menú superior con píldora dorada que se desliza al cambiar de sección.
- Página y aviso de inauguración con fondo animado (retirados el 07-10).
- La fachada nueva (`tienda nueva.jpeg`) pasa a ser la primera foto de la portada.

### 14-05-2026
- Indumentaria Femenina: subtítulo "Fallas 2027 · La Luz de la Tradición" y texto nuevo.
- Cada colección tiene su propio título en la portada, para que no se repita el texto.

### 13-05-2026
- Historia de la casa traducida entera al valenciano; fuera el texto "Memoria Descriptiva".
- Nueva fallera infantil 2026: Falla La Manta al Coll.
- Formulario de contacto sin abrir el correo del visitante (más tarde, el 07-10, pasó a WhatsApp).

### 12-05-2026
- Colecciones reorganizadas en 6 familias, todas en una fila: Indumentaria Femenina, Indumentaria Masculina, Aderezos y Peinetas, Telas Valencianas, Manteletas y Mantillas (nueva) y Semana Santa.
- Tarjetas de colecciones del mismo tamaño, con borde y letras doradas.
- Indumentaria Femenina: piezas clasificadas por material (espolín, seda, rayón) y descripciones de cada traje.
- Falleras Mayores: fotos de 2026 con nombre de la falla; históricas con nombre y año reales.
- Sección "Nuestra historia" con el contenido del dossier; fotos del taller; fuera el bloque de artesanas colaboradoras.
- Ventana de colecciones con foto de cabecera y galería.
- Arreglos de móvil: cabecera compacta, bloques apilados, chatbot bien colocado.
- Menú con "Contacto" en lugar de "Contacto y Visítanos".
- 9 telas nuevas en el catálogo (t17 a t25) y 9 fotos nuevas en la galería.

### 11-05-2026
- Portada con pase automático de fotos de pasarela.
- Galería con filtros Todas, Mujer, Hombre y Niño, y fotos clasificadas una a una.
- Reseñas de clientas con tarjetas apiladas.
- Deportivas falleras en carrusel automático.
- Semana Santa: 19 fotos con su descripción.
- Telas: 16 telas reales de Cosas Cucas y filtros seda/rayón y brocatel/damasco.
- Chatbot con diccionario del traje de fallera, gratuito y sin APIs de pago.
- Foto editorial de Noelia, María y Paqui con la Fallera Mayor.
- Publicación en GitHub Pages.

### 05/06-05-2026 · Arranque
- Primera versión completa de la web: todas las secciones, fotos, Semana Santa, pie, formulario y páginas legales.
- Galerías y colecciones adaptadas a móvil (incluido el scroll en iPhone).
- Publicación en Vercel e imagen para compartir en redes.
- Solo WhatsApp como botón de la portada.
- Varias versiones del probador virtual (retirado después, el 07-10).
