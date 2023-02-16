const Article = require("../models/Article");
const { validate } = require("../helpers/validate");
const fs = require("fs"); // filesystem
var path = require("path");

const create = (req, res) => {
  /* #swagger.tags = ['Article']
     #swagger.description = 'Crear nuevo articulo' */

  /* #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: "#/definitions/Article"}
  } */

  // 1) Traer parametros por post a guardar
  let params = req.body;

  // 2) Validar datos: que no esten vacios y longitud
  // https://www.npmjs.com/package/validator
  try {
    validate(params);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Body incompleto"
    })
  }

  // 3) Crear el objeto a guardar
  const article = new Article(params);

  // 4) Asignar valores a objeto basado en el modelo (manual o automatico)
  // Article.title = params.title; // manual
  // const Article = new Article(params); // automatico


  // 5) Guardar el articulo en la BB.DD.
  article.save((error, savedArticle) => {
    if (error || !savedArticle) {
      res.status(400).json({
        status: "error",
        message: "No se ha guardado el articulo"
      });
    }
    return res.status(200).json({
      status: "success",
      article: savedArticle
    })
  });
}

const listAll = (req, res) => {
  // * #swagger.tags = ['Article']
  // * #swagger.description = 'Listar todos los articulos'
  let query = Article.find({});

  query.sort({ date: -1 }).exec((error, articles) => {
    if (error || !articles) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado articulos"
      });
    }
    return res.status(200).send({
      status: "success",
      total: articles.length,
      articles
    });
  });
  // equivale a SELECT * de SQL .
  // 1er parametro son los filtros, el segundo es para ordenar los resultados segun fecha :1 mas viejo a mas nuevo y :-1 mas nuevo a mas viejo
  // y el tercero .exec() es el callback
}

const listLatest = (req, res) => {
  //   #swagger.tags = ['Article']
  //   #swagger.description = 'Listar ultimos n articulos.'

  /*   #swagger.parameters["limit"] = {
          in: "query",
          description: "Limite de articulos a listar. Valor por defecto: 5",
          type: "integer"
  }    */

  let limit = req.query.limit ?? 5;

  let query = Article.find({});
  query.sort({ date: -1 }).limit(limit).exec((error, articles) => {
    if (error || !articles) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado articulos"
      });
    }
    return res.status(200).send({
      status: "success",
      total: articles.length,
      articles
    });
  });
}

const listOne = (req, res) => {
  // * #swagger.tags = ['Article']
  // * #swagger.description = 'Listar un articulo'

  let id = req.params.id;
  Article.findById(id, (error, article) => {
    if (error || !article) {
      return res.status(404).json({
        status: "error",
        message: `No se ha encontrado el articulo con id ${id}`
      });
    }
    return res.status(200).json({
      status: "success",
      article
    })
  });
}

const deleteOne = (req, res) => {
  // * #swagger.tags = ['Article']
  // * #swagger.description = 'Eliminar un articulo por id'

  let id = req.params.id;
  Article.findByIdAndDelete({ _id: id }, (error, deletedArticle) => {
    if (error || !deletedArticle) {
      return res.status(500).json({
        status: "error",
        message: "Error al eliminar el articulo"
      });
    }

    return res.status(200).json({
      status: "success",
      article: deletedArticle,
      message: `Articulo eliminado exitosamente`
    });
  });
}

const edit = (req, res) => {
  // * #swagger.tags = ['Article']
  // * #swagger.description = 'Editar un articulo por id'

  let id = req.params.id;
  let params = req.body;

  try {
    validate(params);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Body incompleto"
    })
  }

  Article.findOneAndUpdate({ _id: id }, params, { new: true }, (error, editedArticle) => {
    // primero el id, despues los parametros a actualizar que mandamos x body,
    // tercero la opcion new: en true te manda el objeto actualizado y en false manda el objeto sin actualizar
    // y cuarto el callback
    if (error || !editedArticle) {
      return res.status(500).json({
        status: "error",
        message: "No se pudo editar el articulo"
      });
    }
    return res.status(200).json({
      status: "success",
      editedArticle,
      message: `Articulo con id ${id} editado exitosamente`
    })
  })
}

const uploadImage = (req, res) => {
  // * #swagger.tags = ['Article']
  // * #swagger.description = 'Subir imagen a un articulo por id'

  // Configurar multer > en la ruta POST
  // Recoger el fichero de imagen subido

  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "error",
      message: "Peticion invalida"
    });
  }

  // Conseguir el nombre del archivo
  let file = req.file.originalname;

  // Conseguir la extension del archivo
  let fileExtension = path.extname(file);

  // Comprobar extension correcta
  if (fileExtension != ".png" && fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".webp") {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        message: "Archivo invalido. Extensiones permitidas: .png, .jpg, .jpeg, .gif"
      });
    })
  } else {
    // Actualizar el articulo con la nueva imagen
    let id = req.params.id;

    Article.findOneAndUpdate({ _id: id }, { image: req.file.filename }, { new: true }, (error, editedArticle) => {
      if (error || !editedArticle) {
        return res.status(500).json({
          status: "error",
          message: "No se pudo editar el articulo"
        });
      }
      return res.status(200).json({
        status: "success",
        editedArticle,
        newImage: req.file,
        message: `Articulo con id ${id} editado exitosamente`
      })
    });
  }
}

// Armar URL de la imagen
const image = (req, res) => {
  // * #swagger.tags = ['Article']
  // * #swagger.description = 'Traer URL de imagen segun nombre de archivo'

  let fileName = req.params.fileName;
  let localPath = `./images/articles/${fileName}`;
  fs.stat(localPath, (error, exists) => { // stat comprueba si el file existe o no
    if (exists) {
      return res.sendFile(path.resolve(localPath));
    } else {
      return res.status(404).json({
        status: "error",
        message: "La imagen no existe"
      })
    }
  })
}

const search = (req, res) => {
  // * #swagger.tags = ['Article']
  // * #swagger.description = 'Buscar articulo(s)'

  // Sacar el string de busqueda
  let query = req.params.query;
  // Find OR
  Article.find({
    "$or": [
      { "title": { "$regex": query, "$options": "i" } },
      { "content": { "$regex": query, "$options": "i" } }
    ]
  })
    .sort({ fecha: -1 })
    .exec((error, foundArticles) => {
      if (error || !foundArticles || !foundArticles.length) {
        return res.status(404).json({
          status: "error",
          message: "No se han encontrado articulos"
        });
      }
      return res.status(200).json({
        status: "success",
        articulos: foundArticles
      })
    })
  // Ordenar
  // Ejecutar consulta
  // Devolver resultado
}

module.exports = {
  create,
  listAll,
  listLatest,
  listOne,
  deleteOne,
  edit,
  uploadImage,
  image,
  search
}
