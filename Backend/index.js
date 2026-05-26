// index.js — servidor principal de Aroma
const express = require("express");
const productos = require("./modules/productos");
const pedidos = require("./modules/pedidos");
const app = express();
const PORT = 3000;
// ── MIDDLEWARE ──────────────────────────────
app.use(express.json()); // leer body JSON
// Logging de peticiones
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
// ── RUTAS DE PRODUCTOS ──────────────────────
// GET /api/products — listar todos los disponibles
app.get("/api/products", (req, res) => {
  const resultado = productos.listarDisponibles();
  res.json(resultado);
});
// GET /api/products/all — listar todos (admin)
app.get("/api/products/all", (req, res) => {
  const resultado = productos.listarTodos();
  res.json(resultado);
});
// GET /api/products/:id — buscar por id
app.get("/api/products/:id", (req, res) => {
  const resultado = productos.buscarPorId(req.params.id);
  if (!resultado.ok) {
    return res.status(resultado.codigo).json(resultado);
  }
  res.json(resultado);
});
// POST /api/products — crear producto
app.post("/api/products", (req, res) => {
  const resultado = productos.crearProducto(req.body);
  if (!resultado.ok) {
    return res.status(resultado.codigo).json(resultado);
  }
  res.status(201).json(resultado);
});
// PUT /api/products/:id — actualizar producto
app.put("/api/products/:id", (req, res) => {
  const resultado = productos.actualizarProducto(req.params.id, req.body);
  if (!resultado.ok) {
    return res.status(resultado.codigo).json(resultado);
  }
  res.json(resultado);
});
// DELETE /api/products/:id — eliminar producto
app.delete("/api/products/:id", (req, res) => {
  const resultado = productos.eliminarProducto(req.params.id);
  if (!resultado.ok) {
    return res.status(resultado.codigo).json(resultado);
  }
  res.json(resultado);
});
// ── RUTAS DE PEDIDOS ────────────────────────
// GET /api/orders
app.get("/api/orders", (req, res) => {
  res.json(pedidos.listarPedidos());
});
// POST /api/orders
app.post("/api/orders", (req, res) => {
  const resultado = pedidos.crearPedido(req.body);
  if (!resultado.ok) return res.status(resultado.codigo).json(resultado);
  res.status(201).json(resultado);
});
// PUT /api/orders/:id/status
app.put("/api/orders/:id/status", (req, res) => {
  const resultado = pedidos.actualizarEstado(req.params.id, req.body.estado);
  if (!resultado.ok) return res.status(resultado.codigo).json(resultado);
  res.json(resultado);
});
// ── RUTA 404 ────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Ruta no encontrada" });
});
// ── MIDDLEWARE DE ERRORES ────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, error: "Error interno del servidor" });
});
// ── INICIAR SERVIDOR ─────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor Aroma corriendo en http://localhost:${PORT}`);
  console.log("Rutas disponibles:");
  console.log(" GET /api/products");
  console.log(" GET /api/products/:id");
  console.log(" POST /api/products");
  console.log(" PUT /api/products/:id");
  console.log(" DELETE /api/products/:id");
  console.log(" GET /api/orders");
  console.log(" POST /api/orders");
});
