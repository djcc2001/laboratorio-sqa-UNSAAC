# Bugs intencionales de CaféLab

Cinco defectos planificados para practicar reportes de QA. No hay otros bugs aparte de estos.

La insignia "Este sitio no tiene bugs" del encabezado es texto del ejercicio: es irónico, pero **no cuenta como un bug adicional**.

| ID | Tipo | Severidad |
|---|---|---|
| BUG-01 | Functional | Alta |
| BUG-02 | Visual | Media |
| BUG-03 | Content | Baja |
| BUG-04 | Performance | Media |
| BUG-05 | Crash | Alta |

---

## BUG-01 — El total ignora la cantidad

- **Tipo:** Functional
- **Ubicación:** `app.js`, función `renderizarCarrito()` (el `reduce` que calcula `total`). El total se muestra en `carrito.html`.
- **Pasos para reproducir:**
  1. Esperar a que aparezca el catálogo en `index.html`.
  2. Hacer clic dos veces en "Agregar al carrito" de **Café Origen**.
  3. Abrir `carrito.html` y mirar el total.
- **Resultado esperado:** `Total: S/ 48.00` (S/ 24.00 × 2).
- **Resultado obtenido:** `Total: S/ 24.00`, aunque la lista muestra `Café Origen × 2` y el contador indica 2 unidades.
- **Severidad:** Alta (afecta directamente el importe a pagar).

## BUG-02 — Precio y botón desbordados en móvil

- **Tipo:** Visual
- **Ubicación:** `styles.css`, bloque `@media (max-width: 599px)`. Solo afecta a las tarjetas del catálogo en `index.html`.
- **Pasos para reproducir:**
  1. Abrir `index.html` en escritorio: las tarjetas se ven bien.
  2. Reducir la ventana a menos de 600 px de ancho (o usar el modo dispositivo de DevTools).
  3. Observar cualquier tarjeta del catálogo.
- **Resultado esperado:** el precio aparece debajo de la descripción y el botón queda dentro de los bordes de la tarjeta.
- **Resultado obtenido:** el precio se superpone al nombre y el botón sobresale por ambos lados de la tarjeta. En `carrito.html` no ocurre.
- **Severidad:** Media.

## BUG-03 — Precio incompleto y errores de redacción

- **Tipo:** Content
- **Ubicación:** `index.html` y pie de página de ambas páginas.
- **Pasos para reproducir:**
  1. Revisar las tarjetas del catálogo, el pie de página y la sección "Contacto".
  2. Comparar los textos con lo esperado.
- **Resultado esperado:**
  - Precio completo en **Café Descafeinado**: `S/ 20.00`.
  - `Café de la casa` con tilde.
  - `Políticas de privacidad` con tilde.
  - Nota de contacto completamente en español.
- **Resultado obtenido:**
  - **Café Descafeinado** muestra solo `S/.` (sin monto; internamente se usa S/ 20.00 para el carrito).
  - `Cafe de la casa` (sin tilde).
  - `Politicas de privacidad` (sin tilde, en el pie de `index.html` y `carrito.html`).
  - La nota de contacto termina con `Thanks!`.
- **Severidad:** Baja.
- **Nota:** el texto en inglés de la pantalla de error pertenece a BUG-05, no a este bug.

## BUG-04 — Catálogo tardío y bloqueo del hilo principal

- **Tipo:** Performance
- **Ubicación:** `app.js`, `setTimeout` de 5000 ms para mostrar `#catalogo-grid` (en `index.html`) y bucle sincrónico `while (Date.now() < finBloqueo)` (se ejecuta al cargar en ambas páginas).
- **Pasos para reproducir:**
  1. Abrir DevTools → *Performance* o *Lighthouse* antes de recargar.
  2. Recargar la página y cronometrar cuándo aparece el catálogo.
  3. Observar la grabación de rendimiento durante la carga.
- **Resultado esperado:** el catálogo se muestra de inmediato (o con un indicador de carga) y no hay tareas largas que bloqueen el hilo principal.
- **Resultado obtenido:** ~5 s con la zona del catálogo vacía y sin indicador de carga; además, una tarea sincrónica de ~2 s bloquea el hilo principal durante la carga.
- **Severidad:** Media.

## BUG-05 — Pantalla de error al abrir el menú

- **Tipo:** Crash
- **Ubicación:** `app.js`, listener del botón `#menu-btn` (llamada a `menu.abrir()` sobre `null`) y manejador global `window.addEventListener('error')`. Presente en `index.html` y `carrito.html`.
- **Pasos para reproducir:**
  1. Cargar cualquiera de las dos páginas.
  2. Hacer clic en el botón "Menú" del encabezado.
  3. Mirar la consola del navegador.
- **Resultado esperado:** se abre un menú sin alterar el resto de la interfaz.
- **Resultado obtenido:** toda la interfaz se reemplaza por una pantalla negra con `This page couldn't load` y los botones `Reload` y `Back`. La consola muestra un `TypeError` no controlado.
- **Severidad:** Alta (deja la aplicación inutilizable hasta recargar).
