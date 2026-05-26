// routes/productos.js ACTUALIZADO
const express = require("express");
const router = express.Router();
const productos = require("../modules/productos");
const validar = require("../middleware/validar");
const schemas = require("../schemas/productos");

// GET / — sin cambios, no valida body
router.get("/", (req, res) => {
  const disponible = req.query.disponible;
  if (disponible === "false") {
    return res.json(productos.listarTodos());
  }
  res.json(productos.listarDisponibles());
});

// GET /:id — sin cambios
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0)
    return res.status(400).json({ ok: false, error: "Id invalido" });
  const r = productos.buscarPorId(id);
  if (!r.ok) return res.status(r.codigo).json(r);
  res.json(r);
});

// POST / — Joi valida ANTES de llegar al handler
// validar(schemas.crearProducto) es el middleware
router.post("/", validar(schemas.crearProducto), (req, res) => {
  // req.body ya esta validado y limpio
  const resultado = productos.crearProducto(req.body);
  res.status(201).json(resultado);
});

// PUT /:id — Joi valida el body (campos opcionales)
router.put("/:id", validar(schemas.actualizarProducto), (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0)
    return res.status(400).json({ ok: false, error: "Id invalido" });
  const resultado = productos.actualizarProducto(id, req.body);
  if (!resultado.ok) return res.status(resultado.codigo).json(resultado);
  res.json(resultado);
});

// DELETE /:id — sin cambios
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0)
    return res.status(400).json({ ok: false, error: "Id invalido" });
  const r = productos.eliminarProducto(id);
  if (!r.ok) return res.status(r.codigo).json(r);
  res.json(r);
});

module.exports = router;
