const multer = require('multer');

// Configuración del almacenamiento en memoria (puedes cambiar a diskStorage si querés guardar archivos)
const storage = multer.memoryStorage();

// Configurar multer con ese storage
const upload = multer({ storage });

// Middleware auxiliar para normalizar los datos del body
function normalizeTripBody(req, res, next) {
  // Convertir price a número (porque multer lo recibe como string)
  if (req.body.price) req.body.price = parseFloat(req.body.price);

  // Convertir archivos a un arreglo de nombres (o buffers/base64 según tu caso)
  if (req.files && req.files.length) {
    req.body.photos = req.files.map(f => f.originalname);
  } else {
    req.body.photos = [];
  }

  next();
}

module.exports = {
  upload,
  normalizeTripBody
};
