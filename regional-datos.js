/* Indumentaria regional: una ventana por localidad en la portada (Historia, «Indumentaria
   regional») y su propia página, indumentaria-regional.html#<id>, con las fotos en grande.
   Lo usan las dos páginas.

   · Fotos para la web en indumentaria-regional/ (WebP); los originales de Ignacio, en la
     carpeta «indumentaria regional» (con espacio), que NO se publica.
   · Cada foto: img, nombre (de la persona) y cargo en castellano (es) y valenciano (ca).
   · Orden: localidades por orden alfabético; dentro, de la más reciente a la más antigua.
   · AL CAMBIAR ESTE ARCHIVO, SUBIR EL NÚMERO «?v=» DE regional-datos.js EN index.html Y EN
     indumentaria-regional.html: los .js se guardan un día en la caché del navegador. */
window.INDUMENTARIA_REGIONAL = [
  { id: "almenara", nombre: { es: "Almenara", ca: "Almenara" },
    portada: "indumentaria-regional/almenara-sara-royo.webp",
    fotos: [
      { img: "indumentaria-regional/almenara-sara-royo.webp",
        nombre: "Sara Royo", cargo: { es: "Festera de Almenara 2024", ca: "Festera d'Almenara 2024" } },
    ] },
  { id: "burriana", nombre: { es: "Burriana", ca: "Borriana" },
    portada: "indumentaria-regional/burriana-alejandra-morcillo-ballester.webp",
    fotos: [
      { img: "indumentaria-regional/burriana-alejandra-morcillo-ballester.webp",
        nombre: "Alejandra Morcillo Ballester", cargo: { es: "Falla Societat Centre Espanya · Corte de Honor 2025", ca: "Falla Societat Centre Espanya · Cort d'Honor 2025" } },
    ] },
  { id: "navajas", nombre: { es: "Navajas", ca: "Navajas" },
    portada: "indumentaria-regional/navajas-elena-saez-martinez.webp",
    fotos: [
      { img: "indumentaria-regional/navajas-carla-bernat-garcia.webp",
        nombre: "Carla Bernat García", cargo: { es: "Corte de Honor de la Reina de las Fiestas de Navajas 2026", ca: "Cort d'Honor de la Reina de les Festes de Navajas 2026" } },
      { img: "indumentaria-regional/navajas-carla-bernat-garcia-2.webp",
        nombre: "Carla Bernat García", cargo: { es: "Corte de Honor de la Reina de las Fiestas de Navajas 2026", ca: "Cort d'Honor de la Reina de les Festes de Navajas 2026" } },
      { img: "indumentaria-regional/navajas-elena-saez-martinez.webp",
        nombre: "Elena Sáez Martínez", cargo: { es: "Reina de las Fiestas de Navajas 2025", ca: "Reina de les Festes de Navajas 2025" } },
      { img: "indumentaria-regional/navajas-elena-saez-martinez-2.webp",
        nombre: "Elena Sáez Martínez", cargo: { es: "Reina de las Fiestas de Navajas 2025", ca: "Reina de les Festes de Navajas 2025" } },
      { img: "indumentaria-regional/navajas-natalia-corbaton-cubells.webp",
        nombre: "Natalia Corbatón Cubells", cargo: { es: "Corte de Honor de la Reina de las Fiestas de Navajas 2023", ca: "Cort d'Honor de la Reina de les Festes de Navajas 2023" } },
      { img: "indumentaria-regional/navajas-ana-castillo-carsi.webp",
        nombre: "Ana Castillo Carsí", cargo: { es: "Reina de las Fiestas de Navajas 2018", ca: "Reina de les Festes de Navajas 2018" } },
    ] },
  { id: "segorbe", nombre: { es: "Segorbe", ca: "Segorbe" },
    portada: "indumentaria-regional/segorbe-ariadna-llop-joli.webp",
    fotos: [
      { img: "indumentaria-regional/segorbe-ariadna-llop-joli.webp",
        nombre: "Ariadna Llop Joli", cargo: { es: "Corte de Honor Infantil de las Fiestas de Segorbe 2023", ca: "Cort d'Honor Infantil de les Festes de Segorbe 2023" } },
    ] },
  { id: "vila-real", nombre: { es: "Vila-real", ca: "Vila-real" },
    portada: "indumentaria-regional/vila-real-blanca-nebot-campos.webp",
    fotos: [
      { img: "indumentaria-regional/vila-real-blanca-nebot-campos.webp",
        nombre: "Blanca Nebot Campos", cargo: { es: "Corte de Honor de las Fiestas de Vila-real 2025", ca: "Cort d'Honor de les Festes de Vila-real 2025" } },
    ] },
  { id: "vinaros", nombre: { es: "Vinaròs", ca: "Vinaròs" },
    portada: "indumentaria-regional/vinaros-carla-2023.webp",
    fotos: [
      { img: "indumentaria-regional/vinaros-carla-2023.webp",
        nombre: "Carla Aragüete Sales", cargo: { es: "Dama de las Fiestas de Sant Joan y Sant Pere de Vinaròs 2023", ca: "Dama de la Fira i Festes de Sant Joan i Sant Pere de Vinaròs 2023" } },
      { img: "indumentaria-regional/vinaros-julia-2023.webp",
        nombre: "Julia Royo Sales", cargo: { es: "Dama infantil de las Fiestas de Sant Joan y Sant Pere de Vinaròs 2023", ca: "Dama infantil de la Fira i Festes de Sant Joan i Sant Pere de Vinaròs 2023" } },
    ] },
];
