const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

// Conectar a la BB.DD.
connection();

// Crear servidor Node
const app = express();
const port = process.env.PORT || 3001;

// Configurar CORS
app.use(cors()); // Los middlewares se ejecutan antes que otras funciones. En este caso, el middleware cors se ejecuta antes de las rutas, evitando errores de cors

// Convertir body a objeto js
app.use(express.json()); // Recibir datos con content-type application/json
app.use(express.urlencoded({extended: true})); // Recibir datos con content-type form-urlencoded

// Rutas
const article_routes = require("./routes/article");
app.use("/api", article_routes);

// Crear servidor y escuchar peticiones http
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
})

// Creacion swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// require("./routes/article")(app)
