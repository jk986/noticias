// aqui mando llamar esas peticiones

const express = require("express"); //para crear rutas
const router = express.Router();
const ArticleController = require("../controllers/articleC");

// ruta pruba 
router.get("/ruta-de-prueba",ArticleController.test);

// rutas utiles
router.post("/crear",ArticleController.create);
router.get("/articles/:ultimos?",ArticleController.listArticles); // /:ultimos?  Esto es un parametro opcional
router.get("/article/:id",ArticleController.one);
router.delete("/article/:id",ArticleController.eliminar);
router.put("/article/:id",ArticleController.editar);




 module.exports = router;