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
| `galeria.html` | Galería de fotos con filtros (mujer, niño, hombre). |
| `landing.html` | Página de captación «Trajes de fallera en Valencia». |
| `cartel-traslado.html` | Cartel del traslado a Burriana. |
| `aviso-legal.html`, `politica-privacidad.html` | Textos legales. |
| `404.html` | Página de error. |

`probador.html` e `inauguracion.html` están retiradas. Vercel redirige sus direcciones a la portada.

### Secciones de la portada (`index.html`)

1. **Portada (hero):** pase de fotos (7 s por foto) con las 14 de Julia Vizcayno, Fallera Mayor Infantil de València 2027, y las horizontales de la corte 2027 (las verticales de la corte no entran porque son pequeñas y a lo ancho se verían borrosas). Ya no salen las de pasarela ni la fachada. Cada foto lleva su punto de encuadre (`NOTICIA_FOCO`) porque en escritorio el hueco es vertical. Encima del título hay una píldora «Noticia» que lleva a la noticia.
2. **Apartado de Noticias (`#noticias`):** cabecera oscura «Noticias del taller» con accesos directos a cada noticia visible (los genera `buildNoticias()`), y entrada «Noticias» la primera del menú. Las noticias visibles alternan solas fondo oscuro / crema y carrusel a la derecha / izquierda, aunque alguna esté oculta. Para añadir una noticia nueva: copiar el bloque `section.noticia` (texto primero y carrusel después), sus textos en `t()` y una función como `buildMeri()` que llame a `renderCarousel`.
   - **Noticia de Julia (`#noticia`):** titular «Fallera Mayor Infantil de València 2027» y el texto que escribió Ignacio (tres párrafos; el último, «Julia, gracias por dejarnos tejer la historia de tu vida», va como dedicatoria en cursiva dorada, `.noticia__dedica`). Textos en `t().noticia.p1/p2/p3`. La píldora de la portada sigue diciendo «Vestimos a la Fallera Mayor Infantil de València 2027». Texto a la izquierda y carrusel grande a la derecha (fondo oscuro). El carrusel pasa solo cada 6 s con zoom lento, barra dorada, contador, flechas, miniaturas, deslizar con el dedo, teclado y pantalla completa. Tiene botón de pausa. También se para con el ratón encima (salvo en pantalla completa), fuera de pantalla o navegando con teclado, y no se mueve si el usuario tiene desactivadas las animaciones (la portada se queda entonces en la primera foto). Textos en `t().noticia`; fotos en `noticias/julia-vizcayno-NN.webp` (y `-mini` para las miniaturas); quedan 14 (faltan los números 06, 09, 13 y 16, que eran repetidas, y el 19, el retrato de estudio, quitado a petición de Ignacio). El orden, el encuadre en la portada y qué fotos son verticales se fijan en `NOTICIA_ORDEN`; los textos alternativos van en ese mismo orden. Las verticales (11 y 12) se ven enteras sobre un fondo difuminado de la propia foto.
   - **Noticia de la Corte de Honor 2027 (`#corte-2027`):** mismo formato que las demás. Bajo el carrusel, pie de foto con el nombre y la falla de la foto que se ve. Alejandra Blanco Beltrán (falla Mestre Rodrigo-General Avilés; ya la vestimos en 2026 como Fallera Mayor de su falla) y Laura Miquel Obarti (falla Avinguda de l'Oest). **Visible desde el 18-10-2026 con 10 fotos de Alejandra** (`noticias/corte-2027/alejandra-NN.webp`): 2 retratos de estudio de @edgfotografia y 8 de la Ofrenda 2026 de su Instagram (@alejandrablaancoo), con crédito y enlace a las dos publicaciones (`CORTE_CREDITOS`). **Faltan las de Laura.** Datos en `CORTE_2027` (JS) y textos en `t().corte`. Los dos carruseles usan el mismo código (`renderCarousel`, estado en `CAR`).
   - **Noticia de Meri (`#noticia-meri`):** «Los trajes de Meri, Fallera Mayor 2027 de Pinedo». Mª José Zalve Quilis, falla Mossén Josep Cuenca-Pinedo: exposición de sus trajes, todos confeccionados por Cosas Cucas («Almudena» azul marino, «Brunet» rosa antiguo, «Lazos» gris, «Lazos» verde exclusivo de la casa y el espolín «Tetuán» champán de la Compañía Valenciana de la Seda). Texto propio a partir de la publicación de Instagram de @jose_espolin_estudio (18-10-2026), con crédito y enlace. 14 fotos de esa publicación (`noticias/meri-zalve-NN.webp`), elegidas entre 20 quitando las repetidas; Ignacio autorizó usarlas citando al autor.
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

Las rutas de las fotos están en el objeto `IMG` (`fm1` a `fm16`).

- **Históricas (`fm`)**, en orden: Sandra Leiva Herrero (FM Infantil 1988), Monica Palmer (FM 1992), Maria Asensi (Corte FM Infantil 1993), Ana Belén Chardí (FM Infantil 1995), Carmen Serrano (FM Infantil 1998), Adriana Polo (FM 2001), Carmen Serrano (FM Infantil 2012) y Begoña Jiménez Tarazona (FM 2013).
- **De 2026 (`fmCurrent`):** fallas Exposición, Matías Perelló, Maestro Rodrigo, Blocs-Platja, Rosario, Conserva y La Manta al Coll (infantil). La de Maestro Rodrigo es Alejandra **Blanco** Beltrán (antes ponía «Blasco» por error; corregido el 18-10-2026).

Ojo: el número de `fm` no coincide con el orden de la lista. Monica Palmer usa `fm6`, Adriana Polo `fm1` y Carmen Serrano 2012 `fm5`.

---

## Carpetas de fotos

| Carpeta | Contenido |
|---|---|
| `pasarela/` | Fotos de colección (ya no salen en la portada) |
| `noticias/` | Noticia de Julia (`julia-vizcayno-NN.webp` y `-mini`), de Meri (`meri-zalve-NN`) y fotos de la corte en `noticias/corte-2027/` (`alejandra-NN`) |
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
- **Fotos de Laura Miquel Obarti (Corte de Honor 2027):** las cuatro publicaciones que pasó Ignacio son de su perfil de Instagram (@laura_miquel), que es privado: sin iniciar sesión no se pueden ver ni descargar. Hace falta que Ignacio las guarde en una carpeta del escritorio (solo las que sale ella sola vestida de fallera). Luego: WebP, `noticias/corte-2027/laura-NN.webp`, y añadirlas a `fotos` de Laura en `CORTE_2027` con `foco` y `vertical`. Decidir con Ignacio qué crédito llevan (su perfil es privado).
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

### 18-10-2026
- **Fotos de Alejandra en la noticia de la Corte:** 10 fotos de dos publicaciones de Instagram (retratos de @edgfotografia y la Ofrenda 2026 de @alejandrablaancoo), con crédito y enlace. La noticia ya se ve y queda en crema entre la de Julia y la de Meri. Las horizontales entran también en el pase de la portada.
- **Revisión del apartado de Noticias (8 arreglos):** el menú de escritorio pasa a hamburguesa por debajo de 980 px (con «Noticias» ya no cabía y el selector de idioma se salía de pantalla entre 769 y 958 px) y el selector y la hamburguesa van a la derecha; antetítulo en dorado oscuro sobre crema; foco de teclado visible en las miniaturas; hover de píldoras y créditos con buen contraste; nombre accesible para los accesos a noticias; tres textos alternativos de Meri corregidos (la joven de la foto 1, el «Tetuán» visto de lado y las medias caladas con la M).
- **Laura Miquel:** su perfil de Instagram es privado; pendiente de que Ignacio pase las fotos.
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
