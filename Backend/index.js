// index.js — version final de produccion
require("dotenv").config(); // PRIMERA linea siempre
const express = require("express");
const cors = require("cors");
const productosRouter = require("./routes/productos");
const pedidosRouter = require("./routes/pedidos");
const app = express();
const PORT = process.env.PORT || 3000;
// ── CORS ─────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
// ── MIDDLEWARE ───────────────────────────────────────────────────
app.use(express.json());
// Logging solo en desarrollo
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}
// ── RUTAS ────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "API Cafeteria Aroma",
    version: "1.0.0",
    entorno: process.env.NODE_ENV || "development",
  });
});
app.use("/api/products", productosRouter);
app.use("/api/orders", pedidosRouter);
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Ruta no encontrada" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, error: "Error interno" });
});
// ── INICIAR ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor Aroma en puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
  console.log(`CORS origin: ${process.env.CORS_ORIGIN || "*"}`);
});
