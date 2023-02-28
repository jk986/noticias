const express = require("express"); //para crear rutas
const router = express.Router();
const ArticleController = require("../controllers/articleC");

// ruta pruba 
router.get("/ruta-de-prueba",ArticleController.test);





 module.exports = router;