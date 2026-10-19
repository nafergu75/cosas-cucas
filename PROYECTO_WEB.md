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

Fundada por Paquita Martorell en el Cabañal. Hoy la llevan sus hijas Noelia, María y Paqui.

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
| `galeria.html` | Galería en dos apartados. Al entrar solo se ven dos ventanas con foto de portada, «Indumentaria femenina» (50 fotos) e «Indumentaria masculina» (16); al pinchar una salen sus fotos («Pasarela» y «Nuestras falleras» / «Nuestros falleros»), con enlaces para volver o pasar a la otra. Enlaces directos `galeria.html#femenina` y `#masculina` (el botón atrás vuelve a las ventanas). Datos: `PASARELA` (con `tipo: 'masculina'` en las 3 de chicos), `GALERIA_TIENDA` (`cat: 'hombre'` va a masculina) y `HOMBRE` (fotos reales de `hombre/`; las generadas con ChatGPT no entran). |
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
   - **«Más noticias» (`#mas-noticias`):** una tarjeta por cada noticia secundaria, con borde dorado, dos fotos una junto a otra, fecha y titular («Leer la noticia →»). En móvil la tarjeta va en horizontal (fotos a la izquierda). Las genera `buildNoticias()` a partir de `NOTICIAS_MAS` (id de la sección, textos y las fotos de la tarjeta con su encuadre). Una noticia sin contenido (la de la corte sin fotos) no saca tarjeta.
   - **Lector (`#lector`):** al pulsar una tarjeta, la noticia completa (texto y carrusel, fondo crema) se abre en un panel a pantalla completa como el de colecciones. Se cierra con la ×, con «Volver a las noticias», con Escape, pulsando fuera o con el botón atrás del móvil, y la página vuelve a donde estaba con el foco en la tarjeta. Mientras está abierto, el resto de la página queda inerte (`inert`). Cada noticia tiene su enlace directo (`…/#corte-2027`, `…/#noticia-meri`), que abre el lector al entrar; al cerrarlo desde ahí, la página queda en «Más noticias».
   - **Para añadir una noticia secundaria:** copiar dentro de `#lector` un bloque `section.noticia.noticia--crema` (texto y carrusel; el `h2.noticia__title` necesita su propio id), sus textos en `t()` (ES y VAL), una función como `buildMeri()` que llame a `renderCarousel` y que se llame en `renderAll()` antes de `buildNoticias()`, y una entrada en `NOTICIAS_MAS` con las fotos de la tarjeta y su encuadre.
   - **Noticia de Julia (`#noticia`):** titular «Fallera Mayor Infantil de València 2027» y el texto que escribió Ignacio (tres párrafos; el último, «Julia, gracias por dejarnos tejer la historia de tu vida», va como dedicatoria en cursiva dorada, `.noticia__dedica`). Textos en `t().noticia.p1/p2/p3`. Debajo de la dedicatoria, recuadro «En la prensa» (`t().noticia.prensaTag/prensa/prensaLink`) con el artículo de Official Press del 16-10-2026: en «Una Festa per a Tots» (Nuevo Centro) Julia estrenó su primer traje como FMI, un brocatel de seda y oro de fondo verde, de estilo del siglo XIX, confeccionado en Cosas Cucas (manteleta de Hijas de Carmen Esteve). Para añadir otra mención de prensa, el mismo recuadro. La píldora de la portada sigue diciendo «Vestimos a la Fallera Mayor Infantil de València 2027». Texto a la izquierda y carrusel grande a la derecha (fondo oscuro). El carrusel pasa solo cada 6 s con zoom lento, barra dorada, contador, flechas, miniaturas, deslizar con el dedo, teclado y pantalla completa. Tiene botón de pausa. También se para con el ratón encima (salvo en pantalla completa), fuera de pantalla o navegando con teclado, y no se mueve si el usuario tiene desactivadas las animaciones (la portada se queda entonces en la primera foto). Textos en `t().noticia`; fotos en `noticias/julia-vizcayno-NN.webp` (y `-mini` para las miniaturas); quedan 14 (faltan los números 06, 09, 13 y 16, que eran repetidas, y el 19, el retrato de estudio, quitado a petición de Ignacio). El orden, el encuadre en la portada y qué fotos son verticales se fijan en `NOTICIA_ORDEN`; los textos alternativos van en ese mismo orden. Las verticales (11 y 12) se ven enteras sobre un fondo difuminado de la propia foto.
   - **Noticia de la Corte de Honor 2027 (`#corte-2027`, en el lector):** mismo formato que las demás; su tarjeta lleva los retratos de Alejandra y Laura. Bajo el carrusel, pie de foto con el nombre y la falla de la foto que se ve. Alejandra Blanco Beltrán (falla Mestre Rodrigo-General Avilés; ya la vestimos en 2026 como Fallera Mayor de su falla) y Laura Miquel Obarti (falla Avinguda de l'Oest). **Visible desde el 18-10-2026 con 10 fotos de Alejandra** (`noticias/corte-2027/alejandra-NN.webp`): 2 retratos de estudio de @edgfotografia y 8 de la Ofrenda 2026 de su Instagram (@alejandrablaancoo), con crédito y enlace a las dos publicaciones (`CORTE_CREDITOS`; el texto dice que son las de Alejandra). **10 fotos de Laura** (`laura-NN.webp`) que pasó Ignacio en `Desktop/fotos  cosascucas/laura`, sin crédito por ahora. En total 20 fotos; el pie cambia de nombre y falla en la foto 11. Datos en `CORTE_2027` (JS, con el helper `fotosCorte(nombre, [[n, foco, vertical, portada]])`) y textos en `t().corte`. Los dos carruseles usan el mismo código (`renderCarousel`, estado en `CAR`).
   - **Noticia de Meri (`#noticia-meri`, en el lector):** «Los trajes de Meri, Fallera Mayor 2027 de Pinedo»; su tarjeta lleva el «Tetuán» y el «Almudena». Mª José Zalve Quilis, falla Mossén Josep Cuenca-Pinedo: exposición de sus trajes, todos confeccionados por Cosas Cucas («Almudena» azul marino, «Brunet» rosa antiguo, «Lazos» gris, «Lazos» verde exclusivo de la casa y el espolín «Tetuán» champán de la Compañía Valenciana de la Seda). Texto propio a partir de la publicación de Instagram de @jose_espolin_estudio (18-10-2026), con crédito y enlace. 14 fotos de esa publicación (`noticias/meri-zalve-NN.webp`), elegidas entre 20 quitando las repetidas; Ignacio autorizó usarlas citando al autor.
   - **Noticia de «Joyas de la Indumentaria» (`#noticia-joyas`, en el lector):** «Nuestros trajes en «Joyas de la Indumentaria»». II Exposición del Gremio Artesano de Sastres y Modistas de la Comunidad Valenciana en el Salón de Cristal del Ayuntamiento, del 2 al 5 de junio de 2026 (ampliada hasta el 12). Cosas Cucas llevó dos trajes (seda rosa y seda oscura de grandes flores, con pañuelo y delantal dorados). Datos contrastados con Actualidad Fallera, Valencia Extra y officialpress. 13 fotos de Ignacio (`Desktop/fotos  cosascucas/joyas exposicion`) en `noticias/joyas-NN.webp` (orden y verticales en `JOYAS_FOTOS`; fuera la 6 y la 7, primeros planos de la misma escena que la 5; la 2 y la 3 vienen de un vídeo de Instagram y se recortaron para quitar el botón de sonido; la 6 del carrusel es una seda en el telar), con el cartel al final y su crédito al Gremio. Su tarjeta lleva los dos trajes con el cartel de la casa y el traje oscuro. Pendiente: saber de quién son las fotos de la inauguración (11 y 12) y el vídeo de la 2 y la 3, por si hay que darle crédito. Ojo: la prensa nombra 14 talleres participantes y Cosas Cucas no sale en esa lista.
   - **Noticia de la tienda nueva (`#noticia-tienda`, en el lector):** «Cosas Cucas abre en la calle Burriana, 21» (julio de 2026; texto revisado por Ignacio). Cuenta el traslado desde Grabador Esteve, la zona (Ensanche, barrio de la Gran Vía, a un paso de Ruzafa), el ambiente fallero (Joaquín Costa-Burriana en la misma esquina, Almirante Cadarso-Conde Altea y Reino de Valencia-Duque de Calabria de Sección Especial a tres minutos, la fuente del Maestro Serrano al final de la calle) y la tienda. Datos de la zona contrastados con el Geoportal del Ayuntamiento, Junta Central Fallera y prensa (19-10-2026). No dice que sea Ruzafa (oficialmente es la Gran Vía) ni que la Ofrenda pase por allí. Fotos `noticias/tienda-NN.webp` (10): la fachada nueva, con los toldos negros (fotograma del reel de @cosascucass «¡Os esperamos en Burriana 21!», https://www.instagram.com/cosascucass/reel/DdYruMCMT4v/, enlazado al final de la noticia), siete del día de la apertura (carpeta del proyecto `fotos burriana/`, 1-7-2026; fuera dos casi repetidas) y dos de Ignacio (`Desktop/fotos  cosascucas/fotos tienda`); la tarjeta lleva la fachada nueva y el interior. **Ojo:** `fotos nuevas/foto fachada.jpeg` (y su copia en `fotos tienda/`) es la tienda VIEJA de Grabador Esteve; no usarla como Burriana (`IMG.d1` la define pero no se usa). En `fotos tienda/` de la web hay propuestas de fachada (una generada por IA) y la fachada antigua del local: no son fotos reales de la tienda y no se usan. Va entre Meri y «Joyas» (las tarjetas siguen el orden de fecha).
   - **Noticia del Premio Joia 2018 (`#noticia-joia`, en el lector):** «Premio Joia 2018 para Paquita Martorell». El Gremio Artesano de Sastres y Modistas de la Comunidad Valenciana le dio su Premio Joia el 15 de junio de 2018 (Hotel Ayre Astoria Palace; lo entregó el maestro mayor Fran Tochena; aguja de oro blanco de estilo barroco de Art Antic; menciones de honor: Tejedores Bartual y Guillermo Ortigueira) por más de 30 años de trayectoria. El 20 de septiembre de 2018 Cosas Cucas cerró el I Desfile de Indumentaria del Gremio en el Ateneo Mercantil. Fuentes: nota de prensa de NilValencia (ya retirada, recogida por los buscadores) y Actualidad Fallera; la fecha la dio Ignacio. 9 fotos de Ignacio (`Desktop/fotos  cosascucas/premi joia`) en `noticias/joia-NN.webp`; en internet no hay fotos del acto. Su tarjeta lleva una sola foto apaisada (la del photocall), en grande. **Pendiente:** en las fotos 7 y 9 el cartel de la casa dice «Desde 1981», y la web dice 1982 (título, Historia, aviso legal, datos estructurados). Mientras Ignacio no confirme el año, el texto de esta noticia no lo menciona.
3. **Todas las colecciones (`#drops-archive`):** seis tarjetas en una fila. Al pulsar una se abre una ventana con la foto grande, el texto de la colección y la cuadrícula de fotos. **Las fotos van sin nombre, descripción ni precio.** En Indumentaria Femenina primero se elige familia (ver más abajo).
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
- **Espolín:** foto de la tarjeta Marta Capella (`IMG.esp1`). **Ahora está vacía por dentro** a petición de Ignacio, hasta que pase todas las fotos de espolín.
- **Indumentaria Valenciana:** foto de la tarjeta `IMG.p8`. Tiene las 9 fotos que había en la colección, incluidas las de espolín y la de Marta Capella, que Ignacio pidió dejar aquí.
- Cuando lleguen las fotos de espolín: copiarlas en `espolin/`, añadir cada una a `products` (en `es` y `ca`) con `family:'espolin'`, y subir.
- Las demás colecciones no tienen `families` y muestran todas sus fotos directamente.

## Falleras Mayores

- **Falleras Mayores y Falleras Mayores Infantiles de València (sección Historia, `#fm-en-historia`):** desde el 18-10-2026 van en dos grupos con título, cada uno ordenado por año, y debajo las Cortes de Honor con su año. Datos en `FALLERAS_VALENCIA` y `CORTES_VALENCIA` (JS, junto a `buildHistoria()`); títulos en `t().historia.grupos / cargo / corte`. Fotos en `falleras-valencia/` (`fm-AAAA-nombre.webp`, `fmi-AAAA-nombre.webp`, `corte-AAAA.webp`). **Solo las que ha vestido Cosas Cucas**: Ignacio deja las fotos en `Desktop/fotos  cosascucas` (con nombre y cargo en el fichero) y se contrastan nombre y año con el histórico de fallas.com ([mayores](https://www.fallas.com/falleras-mayores-de-valencia/), [infantiles](https://www.fallas.com/historico-falleras-mayores-infantiles-de-valencia/)), que trae todas y no solo las de la casa.
  - Falleras Mayores de València: Mónica Palmer Cuenca (1992), Adriana Polo Escrich (2001), Begoña Jiménez Tarazona (2013).
  - Falleras Mayores Infantiles de València: Sandra Leiva Herrero (1988), Carmen Serrano Bononat (1992), María Asensi López (1993), Ana Belén Ferrer Chardí (1995), Ruth Galán García (1998), Julia Vizcayno Orero (2027; recorte de la foto 11 de su noticia).
  - Cortes de Honor de la Fallera Mayor de València: primero, tarjetas una a una (`CORTE_PERSONAS`: foto, nombre, año y falla): Marta Capella Guanter (Corte 2026, falla Carretera d'Escrivà-Cooperativa de Sant Ferran; fue candidata a FMV 2026, la elegida fue Carmen Prades y las demás forman la Corte), Laura Llobell López (Corte 2026, falla Exposició-Micer Mascó; foto de Tamayo; el nombre del archivo que dejó Ignacio pone 2027 por error), Alejandra Blanco Beltrán (Corte 2027, Mestre Rodrigo-General Avilés; foto de la Ofrenda de @alejandrablaancoo, con crédito) y Laura Miquel Obarti (Corte 2027, Avinguda de l'Oest), con fotos de la noticia recortadas en vertical. Ignacio quiere fotos de cuerpo entero con el traje completo, no retratos: tarjetas en 3:4. Debajo, las fotos de grupo de 1995, 1997 y 2012 (llevan impresos los nombres) y la foto «Fallera Xiqueta».
  - Para añadir una: convertir la foto a WebP en `falleras-valencia/` y añadir una línea a `FALLERAS_VALENCIA` (`tipo: 'mayor' | 'infantil'`, `anyo`, `nombre`, `foto`, y `foco` si hace falta encuadrar) o a `CORTES_VALENCIA`.
  - **Pendientes de identificar** (quitadas el 18-10-2026 porque su nombre no cuadraba): la foto `…_19adae8f.jpg` (mujer adulta, traje blanco; ponía «Carmen Serrano, FMI 2012», pero la FMI de 2012 fue Rocío Pascual Candel) y `…_ac29bca3.jpg` (mujer con traje rojo; ponía «Monica Palmer», cuya foto buena es otra).
- **De 2026 (`fmCurrent`, bloque `#falleras-mayores`):** fallas Exposición, Matías Perelló, Maestro Rodrigo, Blocs-Platja, Rosario, Conserva y La Manta al Coll (infantil). La de Maestro Rodrigo es Alejandra **Blanco** Beltrán (antes ponía «Blasco» por error; corregido el 18-10-2026).

---

## Carpetas de fotos

| Carpeta | Contenido |
|---|---|
| `pasarela/` | Fotos de colección (ya no salen en la portada) |
| `falleras-valencia/` | Falleras Mayores e Infantiles de València y Cortes de Honor (sección Historia) |
| `noticias/` | Noticia de Julia (`julia-vizcayno-NN.webp` y `-mini`), de Meri (`meri-zalve-NN`), de «Joyas de la Indumentaria» (`joyas-NN`), del Premio Joia 2018 (`joia-NN`) y fotos de la corte en `noticias/corte-2027/` (`alejandra-NN`, `laura-NN`) |
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
- **Espolín:** vacío hasta que Ignacio pase todas las fotos. Van en `espolin/` (ahora solo está la de Marta Capella, que es la foto del acceso).
- **Etiqueta "Espolín" en Indumentaria Valenciana:** dos de sus fotos (`p1` y Marta Capella) llevan la etiqueta dorada "Espolín" encima. Pendiente de decidir si se quita.
- **Rayón:** no hay ninguna pieza todavía.
- **Sello de Artesanía:** el archivo trae mucho margen blanco y se ve más pequeño que el del Gremio. Se puede recortar.
- **Sellos en otras páginas:** solo están en el pie de `index.html`, no en la galería ni en el resto.
- **Textos de producto:** unas 90 descripciones largas siguen sin revisar. Ahora no se ven en la web, así que no corre prisa.
- **Archivos sueltos en la carpeta** que no están en el repositorio (fotos, logos, vídeos, `fotos burriana/`, `fotos tienda/`…). No se han tocado.

---

## Historial de trabajos

Ordenado de lo más nuevo a lo más antiguo. Cada línea es un trabajo terminado y publicado.

### 19-10-2026
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
