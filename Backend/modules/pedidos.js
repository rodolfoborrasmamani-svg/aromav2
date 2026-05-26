// modules/pedidos.js — ACTUALIZADO
const fs = require("fs");
const path = require("path");
const { respuestaOk, respuestaError } = require("./utilidades");

// Importar modulo de productos para consultar precios
const productosModule = require("./productos");

const archivoPedidos = path.join(__dirname, "../data/pedidos.json");

function cargarPedidos() {
  try {
    return JSON.parse(fs.readFileSync(archivoPedidos, "utf8"));
  } catch {
    return [];
  }
}

function guardarPedidos(pedidos) {
  fs.writeFileSync(archivoPedidos, JSON.stringify(pedidos, null, 2));
}

function listarPedidos() {
  const todos = cargarPedidos();
  return respuestaOk(todos, todos.length + " pedidos");
}

function buscarPorId(id) {
  const todos = cargarPedidos();
  const pedido = todos.find((p) => p.id === parseInt(id));
  if (!pedido) return respuestaError("Pedido no encontrado", 404);
  return respuestaOk(pedido);
}

function crearPedido(datos) {
  const todos = cargarPedidos();
  const maxId = todos.reduce((m, p) => (p.id > m ? p.id : m), 0);
  // Calcular precio de cada item consultando el catalogo
  let total = 0;
  const itemsConPrecio = [];

  for (const item of datos.items) {
    const prod = productosModule.buscarPorId(item.product_id);
    if (!prod.ok) {
      return respuestaError(
        `Producto id ${item.product_id} no encontrado`,
        400,
      );
    }
    const precio_unit = prod.datos.precio;
    total += precio_unit * item.cantidad;
    itemsConPrecio.push({
      product_id: item.product_id,
      nombre: prod.datos.nombre,
      cantidad: item.cantidad,
      precio_unit,
      subtotal: parseFloat((precio_unit * item.cantidad).toFixed(2)),
    });
  }

  const pedido = {
    id: maxId + 1,
    items: itemsConPrecio,
    total: parseFloat(total.toFixed(2)),
    estado: "pending",
    nota: datos.nota || "",
    creadoEn: new Date().toISOString(),
  };

  todos.push(pedido);
  guardarPedidos(todos);
  return respuestaOk(pedido, "Pedido creado con total Bs. " + pedido.total);
}

function actualizarEstado(id, nuevoEstado) {
  const todos = cargarPedidos();
  const idx = todos.findIndex((p) => p.id === parseInt(id));
  if (idx === -1) return respuestaError("Pedido no encontrado", 404);
  todos[idx].estado = nuevoEstado;
  todos[idx].actualizadoEn = new Date().toISOString();
  guardarPedidos(todos);
  return respuestaOk(todos[idx], "Estado actualizado a " + nuevoEstado);
}

module.exports = { listarPedidos, buscarPorId, crearPedido, actualizarEstado };
