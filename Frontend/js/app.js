// function mostrarVista(vista) {
//   document.getElementById("view-home").classList.remove("active");
//   document.getElementById("view-menu").classList.remove("active");
//   document.getElementById("view-contact").classList.remove("active");
//   document.getElementById("view-" + vista).classList.add("active");
// }

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

// const persona = {
// id:1
// nombre: "Carlos",
// apellido: "Guzman",
// edad:21,

// id:2
// nombre: "Mariel",
// apellido: "Guzman",
// edad:35,

// }
const productos = [
  {
    id: 1,
    nombre: "Cafe americano",
    descripcion: "Cafe negro clasico",
    precio: 12,
    Image: "img / capuccino.jpg",
  },
  {
    id: 2,
    nombre: "Capuccino",
    descripcion: "Espresso con leche",
    precio: 18,
  },
  {
    id: 3,
    nombre: "Latte",
    descripcion: "Cafe con abundante leche",
    precio: 16,
  },
  {
    id: 4,
    nombre: "Brownie",
    descripcion: "Postre de chocolate",
    precio: 10,
  },
  {
    id: 5,
    nombre: "Cafe con leche",
    descripcion: "Cafe con un poco de leche",
    precio: 8,
  },
  {
    id: 6,
    nombre: "Te verde",
    descripcion: "Te adelgazante de sabor amargo",
    precio: 7,
  },
];
//  console.log(producto[2].nombre);
// console.log(producto[2].precio);

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

function actualizarContador() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;

  //CONTADOR CUANDO SUPERA A 1
  contador.classList.remove("contador-activo", "contador-normal");

  if (carrito.length > 1) {
    contador.classList.add("contador-activo");
  } else {
    contador.classList.add("contador-normal");
  }
}

function renderizarProductos() {
  const contenedor = document.getElementById("products-container");
  contenedor.innerHTML = "";
  productos.forEach(function (producto) {
    contenedor.innerHTML += `<div class="product-card">
    <h3>${producto.nombre}</h3>
    <p class="product-description">${producto.descripcion}</p>
    <span class="product-price">Bs. ${producto.precio}</span>
    <br>
    <button class="btn-add" data-id="${producto.id}">Agregar al carrito</button>
     <button class="btn-detail" data-id="${producto.id}">ver detalles</button>
  </div>`;

    //funcionamiento de botones que se añaden de los carritos
    const botones = document.querySelectorAll(".btn-add");

    botones.forEach(function (boton) {
      boton.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        // alert("Producto agregado:" + id);

        const producto = productos.find((p) => p.id == id);

        // carrito.push(producto);
        // carrito.push(producto);
        const existente = carrito.find((p) => p.id === producto.id);

        if (existente) {
          existente.cantidad += 1;
        } else {
          carrito.push({ ...producto, cantidad: 1 });
        }

        console.log(producto.nombre);
        alert(`${producto.nombre}:Añadido`);

        guardarCarrito();
        actualizarContador();
        renderizarCarrito();
      });
    });

    document.querySelectorAll(".btn-detail").forEach(function (boton) {
      boton.addEventListener("click", function () {
        const id = this.dataset.id;

        const producto = productos.find((p) => p.id == id);

        alert(
          `Nombre: ${producto.nombre}\nDescripción: ${producto.descripcion}\nPrecio: Bs. ${producto.precio}`,
        );
      });
    });

    // funcionamiento del boton de detalles

    // const botones = document.querySelectorAll(".btn-detail");
    // botones.forEach(function (boton) {
    //   boton.addEventListener("click", function () {
    //     const id = this.dataset.id;
    //     alert("Producto agregado:" + id);
    //   });
    // });
  });
}
// ==========================
// CONTADOR CARRITO
// ==========================
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;
}

// ==========================
// RENDER CARRITO
// ==========================
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-container");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="cart-item">
        <p>${producto.nombre} (x ${producto.cantidad})</p>
     
        <span> Bs. ${producto.precio * producto.cantidad}</span>
      </div>
    `;
  });

  const total = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);

  contenedor.innerHTML += `<h3>Total: Bs. ${total}</h3>
  `;
}

function inicializarformulariocontacto() {
  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("contact -name");
    const email = document.getElementById("contact -email");
    const mensaje = document.getElementById("contact -message");

    const errorNombre = document.getElementById("error -name");
    const errorEmail = document.getElementById("error -name");
    const errorMensaje = document.getElementById("error -name");

    const exito = document.getElementById("forms-sucess");
    errorNombre.textContent="";
    errorEmail.textContent="";
    errorMensaje.textContent="";
    exito.textContent="";

let valido = true;


 if (nombre.value.trim() === "") {
      errorNombre.textContent = "El nombre es obligatorio";
      valido = false;
    }

  
    if (email.value.trim() === "") {
      errorEmail.textContent = "El email es obligatorio";
      valido = false;
    }

   
    if (mensaje.value.trim() === "") {
      errorMensaje.textContent = "El mensaje es obligatorio";
      valido = false;
    }

    
  };
};
// ==========================
// INICIALIZAR
// ==========================
guardarCarrito();
cargarCarrito();
renderizarProductos();
renderizarCarrito();
actualizarContador();
