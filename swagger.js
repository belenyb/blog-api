const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/article']

const doc = {
  info: {
    version: "1.0.0",
    title: "Blog API",
    description: "Blog API documentation"
  },
  host: "localhost:3900",
  basePath: "/api",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "Article",
      "description": "Article endpoints"
    }
  ],
  definitions: {
    Article: {
      title: "Nuevo articulo",
      content: "Contenido del nuevo articulo",
      date: Date.now(),
      image: "default-image.png"
    }
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index");
})
