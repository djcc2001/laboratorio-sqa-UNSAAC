# CaféLab

Tienda de café ficticia (marca inventada) creada como **ejercicio educativo de QA**. Es un sitio estático con HTML, CSS y JavaScript puro: sin frameworks, sin dependencias externas y sin proceso de build.

## Estructura

- `index.html`: inicio, catálogo de 6 cafés y formulario de contacto.
- `carrito.html`: página independiente del carrito, con resumen y opción de vaciarlo.
- `styles.css`: estilos compartidos por ambas páginas.
- `app.js`: lógica compartida; el carrito se guarda en `localStorage` para conservarse entre páginas y recargas.
- `assets/productos.svg`: sprite local con las ilustraciones y los iconos, reutilizados con `<use>`.

## Aviso

Este proyecto contiene **5 bugs intencionales**, uno por cada tipo de la clasificación de AcademyBugs: Functional, Visual, Content, Performance y Crash. No están ahí por accidente: el objetivo es encontrarlos, reproducirlos y reportarlos. Están descritos en [BUGS.md](BUGS.md).

La insignia "Este sitio no tiene bugs" es parte del ejercicio y **no** es un bug adicional.

El catálogo aparece a los ~5 segundos y la carga bloquea el hilo principal ~2 segundos: ambos comportamientos son parte del ejercicio.

## Ejecutar en local

Opción recomendada, desde esta carpeta:

```bash
python3 -m http.server 8000
```

Luego abre <http://localhost:8000>. Para el carrito, entra en <http://localhost:8000/carrito.html>.

También puedes abrir `index.html` directamente en el navegador; usar un servidor local se parece más a un despliegue real y evita diferencias con `file://`.

Para las pruebas de rendimiento, abre DevTools (pestaña *Performance* o *Lighthouse*) antes de recargar la página.
