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
  // Cambiar color si hay más de 1 producto
  // if (carrito.length > 1) {
  //   contador.style.backgroundColor = "red";
  //   contador.style.color = "white";
  // } else {
  //   contador.style.backgroundColor = "gray";
  //   contador.style.color = "black";
  // }
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
        carrito.push(producto);
        console.log(producto.nombre);
        alert(`${producto.nombre}:Añadido`);

        actualizarContador();
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

renderizarProductos();
