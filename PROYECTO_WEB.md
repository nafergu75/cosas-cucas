# Web de Cosas Cucas

Web de la tienda Cosas Cucas, indumentaria valenciana artesanal desde 1982.

- **En internet:** https://nafergu75.github.io/cosas-cucas/ y https://cosas-cucas.vercel.app
- **Repositorio:** https://github.com/nafergu75/cosas-cucas (rama `master`)
- **Carpeta local:** `C:\Users\NACHO PC\Desktop\documntos prueba\cosas-cucas`

Última revisión de este documento: 18-10-2026.

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
2. **Todas las colecciones (`#drops-archive`):** seis tarjetas en una fila. Al pulsar una se abre una ventana con la foto grande, el texto de la colección y la cuadrícula de fotos. **Las fotos van sin nombre, descripción ni precio** (cambio del 18-10-2026).
3. **Falleras Mayores y Corte de Honor:** fotos de las falleras de 2026 vestidas por Cosas Cucas.
4. **Deportivas falleras (`#zapatillas`).**
5. **Historia (`#historia`):** cronología y falleras mayores históricas.
6. **Editorial** y **Nuestra historia (`#dossier-historia`).**
7. **Decoración, vídeos, reseñas, boletín.**
8. **Contacto y Visítanos:** las dos tiendas. El mapa de Google solo se carga cuando el visitante lo pide (así no se ponen cookies de terceros sin permiso).

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

Cada pieza lleva `name`, `desc`, `price` e `image`. El nombre se sigue usando como texto alternativo de la foto, aunque ya no se vea. En Indumentaria Femenina cada pieza lleva además `material` (`espolin`, `seda` o `rayon`), que sale como etiqueta sobre la foto.

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

- **Espolín:** solo hay una foto (Marta Capella). Las nuevas van en `espolin/`.
- **Rayón:** el hueco de Indumentaria Femenina está vacío, a falta de fotos.
- **Textos de producto:** unas 90 descripciones largas siguen sin revisar. Ahora no se ven en la web, así que no corre prisa.

---

## Historial reciente

| Fecha | Cambio |
|---|---|
| 18-10-2026 | Colecciones: solo fotos, sin nombre, descripción ni precio |
| 07-10-2026 | Mapas de Google bajo demanda; política de privacidad al día |
| 07-10-2026 | Fuera "Próxima inauguración": la tienda de Burriana ya está abierta |
| 07-10-2026 | Probador virtual retirado |
| 07-10-2026 | Formularios por WhatsApp; telas en valenciano; redes y metadatos |
| 07-10-2026 | Fotos a tamaño web, favicon e imagen para redes |
| 07-10-2026 | Se publica solo la web, en GitHub Pages y Vercel |
| 07-10-2026 | Domicilio social: C/ Burriana 21, 46005 Valencia |
| 02-06-2026 | Fotos de falleras históricas corregidas |
