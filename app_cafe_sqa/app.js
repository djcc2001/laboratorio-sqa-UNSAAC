const CLAVE_CARRITO = 'cafelab-carrito';

function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || '[]');
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

let carrito = cargarCarrito();

function guardarCarrito() {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  } catch {
    // El almacenamiento puede no estar disponible (por ejemplo, con file://).
  }
}

const listaCarrito = document.getElementById('cart-items');
const totalCarrito = document.getElementById('cart-total');
const contadores = document.querySelectorAll('[data-cart-count]');

function formatearPrecio(valor) {
  return `S/ ${valor.toFixed(2)}`;
}

function renderizarCarrito() {
  if (listaCarrito) {
    listaCarrito.replaceChildren();
    if (carrito.length === 0) {
      const item = document.createElement('li');
      item.className = 'empty';
      item.textContent = 'Tu carrito está vacío.';
      listaCarrito.append(item);
    } else {
      carrito.forEach((producto) => {
        const item = document.createElement('li');
        item.textContent = `${producto.nombre} × ${producto.cantidad}`;
        listaCarrito.append(item);
      });
    }
  }

  const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
  if (totalCarrito) totalCarrito.textContent = formatearPrecio(total);
  const unidades = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
  contadores.forEach((contador) => { contador.textContent = unidades; });
}

document.querySelectorAll('.add-btn').forEach((boton) => {
  boton.addEventListener('click', () => {
    const id = boton.dataset.id;
    const producto = carrito.find((item) => item.id === id);
    if (producto) {
      producto.cantidad += 1;
    } else {
      carrito.push({
        id,
        nombre: boton.closest('.product-card').querySelector('h3').textContent,
        precio: Number(boton.dataset.precio),
        cantidad: 1,
      });
    }
    guardarCarrito();
    renderizarCarrito();
  });
});

const botonVaciar = document.getElementById('clear-cart');
if (botonVaciar) {
  botonVaciar.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  });
}

const formulario = document.getElementById('contact-form');
if (formulario) {
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    document.getElementById('form-status').textContent = '¡Gracias! Tu mensaje fue recibido.';
    evento.target.reset();
  });
}

window.addEventListener('error', () => {
  document.body.innerHTML = `
    <main class="error-screen">
      <p>This page couldn't load</p>
      <div class="error-actions">
        <button type="button" id="reload-btn">Reload</button>
        <button type="button" id="back-btn">Back</button>
      </div>
    </main>`;
  document.getElementById('reload-btn').addEventListener('click', () => location.reload());
  document.getElementById('back-btn').addEventListener('click', () => history.back());
});

document.getElementById('menu-btn').addEventListener('click', () => {
  const menu = null;
  menu.abrir();
});

const catalogo = document.getElementById('catalogo-grid');
if (catalogo) {
  setTimeout(() => catalogo.classList.remove('is-pending'), 5000);
}

// Simula 2 s de trabajo sincrónico: bloquea el hilo principal al cargar.
const finBloqueo = Date.now() + 2000;
while (Date.now() < finBloqueo) {}

renderizarCarrito();
