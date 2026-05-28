// middleware/validar.js
// Middleware de validacion reutilizable con Joi

function validar(schema) {
  // Devuelve la funcion de middleware
  return (req, res, next) => {
    // Validar el body contra el schema
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // reportar TODOS los errores, no solo el primero
      stripUnknown: true, // ignorar campos desconocidos
    });

    if (error) {
      // Formatear los errores de Joi en un array legible
      const errores = error.details.map((d) => d.message);
      return res.status(422).json({
        ok: false,
        error: "Datos invalidos",
        detalles: errores,
      });
    }
    // Reemplazar req.body con los datos validados y limpios
    req.body = value;
    next();
  };
}
module.exports = validar;
