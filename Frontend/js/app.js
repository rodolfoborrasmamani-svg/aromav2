// ==========================
// NAVEGACIÓN SPA
// ==========================
const enlaces = document.querySelectorAll(".nav-link");

enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function (evento) {
    evento.preventDefault();

    const vista = enlace.dataset.view;

    document.querySelectorAll(".view").forEach(function (seccion) {
      seccion.classList.remove("active");
    });

    document.getElementById("view-" + vista).classList.add("active");
  });
});

// ==========================
// PRODUCTOS
// Emojis añadidos para representar visualmente cada producto
// ==========================
const productos = [
  {
    id: 1,
    nombre: "Café Americano",
    descripcion: "Café negro clásico",
    precio: 12,
    emoji: "☕",
  },
  {
    id: 2,
    nombre: "Capuccino",
    descripcion: "Café con leche espumosa",
    precio: 18,
    emoji: "🍵",
  },
  {
    id: 3,
    nombre: "Latte",
    descripcion: "Café suave con leche",
    precio: 16,
    emoji: "🥛",
  },
  {
    id: 4,
    nombre: "Brownie",
    descripcion: "Postre de chocolate",
    precio: 10,
    emoji: "🍫",
  },
];

// ==========================
// ESTADO DEL CARRITO
// ==========================
let carrito = [];

function guardarCarrito() {
  localStorage.setItem("aroma_carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("aroma_carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// ==========================
// RENDER PRODUCTOS
// Se usa la nueva estructura HTML con clases mejoradas
// ==========================
function renderizarProductos() {
  const contenedor = document.getElementById("products-container");

  contenedor.innerHTML = "";

  productos.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="product-card">

        <!-- Área visual del producto (emoji como imagen) -->
        <div class="product-image">${producto.emoji}</div>

        <!-- Información del producto -->
        <div class="product-info">
          <h3>${producto.nombre}</h3>
          <p class="product-description">${producto.descripcion}</p>
          <span class="product-price">Bs. ${producto.precio}</span>

          <button class="btn-add" data-id="${producto.id}">
            + Agregar al carrito
          </button>
        </div>

      </div>
    `;
  });

  // EVENTOS BOTONES — lógica original sin cambios
  const botones = document.querySelectorAll(".btn-add");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const producto = productos.find((p) => p.id === id);

      const existente = carrito.find((p) => p.id === producto.id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }
      guardarCarrito();
      actualizarContador();
      renderizarCarrito();

      // Microinteracción: feedback visual en el botón
      this.textContent = "✓ Agregado";
      this.style.background = "#1b5e20";
      const btn = this;
      setTimeout(function () {
        btn.textContent = "+ Agregar al carrito";
        btn.style.background = "";
      }, 1000);
    });
  });
}

// ==========================
// CONTADOR CARRITO
// Actualiza el badge del navbar con animación
// ==========================
function actualizarContador() {
  const contador = document.getElementById("cart-count");

  // Total de unidades (suma de cantidades)
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contador.textContent = total;

  // Animación "bump" al actualizar
  contador.classList.remove("bump");
  void contador.offsetWidth; // Fuerza reflow para reiniciar la animación
  contador.classList.add("bump");
  setTimeout(() => contador.classList.remove("bump"), 300);
}

// ==========================
// RENDER CARRITO
// Muestra items con controles de cantidad y total
// ==========================
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-container");

  contenedor.innerHTML = "";

  // Carrito vacío
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛒</span>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega productos desde el menú</p>
      </div>
    `;
    return;
  }

  // Renderizar cada item
  carrito.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="cart-item">

        <!-- Emoji del producto -->
        <div class="cart-item-emoji">${producto.emoji}</div>

        <!-- Nombre y precio unitario -->
        <div class="cart-item-info">
          <p class="cart-item-name">${producto.nombre}</p>
          <p class="cart-item-price">Bs. ${producto.precio} c/u</p>
        </div>

        <!-- Controles de cantidad -->
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="decrease" data-id="${producto.id}">−</button>
          <span class="qty-value">${producto.cantidad}</span>
          <button class="qty-btn" data-action="increase" data-id="${producto.id}">+</button>
        </div>

        <!-- Subtotal del item -->
        <div class="cart-item-total">
          Bs. ${(producto.precio * producto.cantidad).toFixed(2)}
        </div>

      </div>
    `;
  });

  // Calcular total general
  const total = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);

  // Resumen y botón de checkout
  contenedor.innerHTML += `
    <div class="cart-summary">
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span>Bs. ${total.toFixed(2)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Envío</span>
        <span>Gratis 🎉</span>
      </div>
      <div class="cart-total-row">
        <span class="cart-total-label">Total</span>
        <span class="cart-total-amount">Bs. ${total.toFixed(2)}</span>
      </div>
      <button class="btn-checkout" onclick="alert('¡Pedido confirmado! Gracias por tu compra 🎉')">
        🛍️ Confirmar Pedido
      </button>
    </div>
  `;

  // Eventos para los botones + y −
  contenedor.querySelectorAll(".qty-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const accion = this.dataset.action;
      const item = carrito.find((p) => p.id === id);

      if (!item) return;

      if (accion === "increase") {
        item.cantidad += 1;
      } else if (accion === "decrease") {
        item.cantidad -= 1;
        // Si llega a 0, eliminar del carrito
        if (item.cantidad <= 0) {
          carrito = carrito.filter((p) => p.id !== id);
        }
      }
      guardarCarrito();
      actualizarContador();
      renderizarCarrito();
    });
  });
}

function inicializarFormularioContacto() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const mensaje = document.getElementById("contact-message");

    const errorNombre = document.getElementById("error-name");
    const errorEmail = document.getElementById("error-email");
    const errorMensaje = document.getElementById("error-message");

    const exito = document.getElementById("form-success");

    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorMensaje.textContent = "";
    exito.textContent = "";

    nombre.classList.remove("input-error");
    email.classList.remove("input-error");
    mensaje.classList.remove("input-error");

    let valido = true;

    if (nombre.value.trim() === "") {
      errorNombre.textContent = "El nombre es obligatorio";
      nombre.classList.add("input-error");
      valido = false;
    }

    if (nombre.value.trim() === "") {
      errorEmail.textContent = "El email es obligatorio";
      email.classList.add("input-error");
      valido = false;
    }

    if (nombre.value.trim() === "") {
      errorMensaje.textContent = "El mensaje es obligatorio";
      mensaje.classList.add("input-error");
      valido = false;
    }
    if (!valido) return;

    exito.textContent = "Mensaje enviado correctamente";
    form.reset();
  });
}

// ==========================
// INICIALIZAR
// ==========================
cargarCarrito();
renderizarProductos();
renderizarCarrito();
actualizarContador();
inicializarFormularioContacto();
