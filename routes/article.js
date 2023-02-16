const express = require("express");
const multer = require("multer");
const router = express.Router();
const ArticleController = require("../controllers/article");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/articles/") // indica a donde guardarlos, el primer parametro siempre es null
  },
  filename: function (req, file, cb) {
    cb(null, "article" + Date.now() + file.originalname)
    // le paso el nombre personalizado que quiero que tenga el archivo
  }
}); // Configura donde guardar los archivos
const uploads = multer({ storage: storage });

router.post("/create", ArticleController.create);
router.get("/articles", ArticleController.listAll);
router.get("/articles/latest", ArticleController.listLatest);
router.get("/article/:id", ArticleController.listOne);
router.delete("/article/:id", ArticleController.deleteOne);
router.put("/article/:id", ArticleController.edit);
router.post("/upload-image/:id", [uploads.single("file")], ArticleController.uploadImage)
// "file" es el nombre del campo/key donde vamos a mandar el archivo en postman
router.get("/image/:fileName", ArticleController.image);
router.get("/search/:query", ArticleController.search);

module.exports = router;
