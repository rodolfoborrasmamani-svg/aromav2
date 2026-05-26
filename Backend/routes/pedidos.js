// routes/pedidos.js ACTUALIZADO
const express = require("express");
const router = express.Router();
const pedidos = require("../modules/pedidos");
const validar = require("../middleware/validar");
const schemas = require("../schemas/pedidos");

// GET / — listar todos los pedidos
router.get("/", (req, res) => {
  res.json(pedidos.listarPedidos());
});

// GET /:id — obtener un pedido especifico
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0)
    return res.status(400).json({ ok: false, error: "Id invalido" });
  const r = pedidos.buscarPorId(id);
  if (!r.ok) return res.status(r.codigo).json(r);
  res.json(r);
});

// POST / — crear pedido (Joi valida items)
router.post("/", validar(schemas.crearPedido), (req, res) => {
  const resultado = pedidos.crearPedido(req.body);
  if (!resultado.ok) return res.status(resultado.codigo || 400).json(resultado);
  res.status(201).json(resultado);
});

// PUT /:id/status — cambiar estado
router.put("/:id/status", validar(schemas.actualizarEstado), (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0)
    return res.status(400).json({ ok: false, error: "Id invalido" });
  const resultado = pedidos.actualizarEstado(id, req.body.estado);
  if (!resultado.ok) return res.status(resultado.codigo).json(resultado);
  res.json(resultado);
});

module.exports = router;
