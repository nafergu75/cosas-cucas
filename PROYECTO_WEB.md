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

1. **Portada (hero):** pase de fotos de pasarela. La primera es la fachada nueva (`tienda nueva.jpeg`).
2. **Todas las colecciones (`#drops-archive`):** seis tarjetas en una fila. Al pulsar una se abre una ventana con la foto grande, el texto de la colección y la cuadrícula de fotos. **Las fotos van sin nombre, descripción ni precio.** En Indumentaria Femenina primero se elige familia (ver más abajo).
3. **Falleras Mayores y Corte de Honor:** fotos de las falleras de 2026 vestidas por Cosas Cucas.
4. **Deportivas falleras (`#zapatillas`).**
5. **Historia (`#historia`):** cronología y falleras mayores históricas.
6. **Editorial** y **Nuestra historia (`#dossier-historia`).**
7. **Decoración, vídeos, reseñas, boletín.**
8. **Contacto y Visítanos:** las dos tiendas. El mapa de Google solo se carga cuando el visitante lo pide (así no se ponen cookies de terceros sin permiso).
9. **Pie:** logo, texto de la casa, redes sociales y dos sellos sobre placa blanca: Artesanía Comunitat Valenciana (`ARTESANIA-COMUNIDAD-VALENCIANA-NUEVA.webp`) y 775 aniversario del Gremio Artesano de Sastres y Modistas de Valencia (`gremio-sastres-775-aniversario.webp`). Después, tiendas, colecciones y enlaces de información.

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
- **De 2026 (`fmCurrent`):** fallas Exposición, Matías Perelló, Maestro Rodrigo, Blocs-Platja, Rosario, Conserva y La Manta al Coll (infantil).

Ojo: el número de `fm` no coincide con el orden de la lista. Monica Palmer usa `fm6`, Adriana Polo `fm1` y Carmen Serrano 2012 `fm5`.

---

## Carpetas de fotos

| Carpeta | Contenido |
|---|---|
| `pasarela/` | Pase de la portada y fotos de colección |
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
