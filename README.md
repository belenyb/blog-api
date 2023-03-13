# Blog API
API Rest con Node.js para Blog

## Tecnologias
- Node
- Express
- Mongoose
- Cors
- Multer
- Validator
- Swagger Autogen
- Swagger UI Express

## Referencias a API

### Status codes
| Parameter | Description                |
| :-------- | :------------------------- |
| `200`     | OK                         |
| `201`     | CREATED                    |
| `400`     | BAD REQUEST                |
| `404`     | NOT FOUND                  |
| `500`     | INTERNAL SERVER ERROR      |

### Swagger
Documentacion y testeo de servicios web RESTful alojado en `localhost:3001/docs` creado con Swagger Autogen y Swagger UI Express. Se genera automaticamente al inicializarse la aplicacion.

![Swagger Screenshot](./images/swagger-screenshots/swagger.png?raw=true "Swagger")

### Endpoints
Creados con Express, Cors, Multer y Validator.
#### 1. Crear nuevo articulo

```http
POST /api/create
```
- Parameter: body
- Type: string
- Description:
  ```
  {
    "title": "Nuevo articulo",
    "content": "Contenido del nuevo articulo",
    "date": 1676489054593,
    "image": "default-image.png"
  }
  ```

#### 2. Listar todos los articulos

```http
GET /api/articles
```
Ejemplo de respuesta:
```
{
  "status": "success",
  "total": 1,
  "articles": [
    {
      "_id": "63ed1e410c5b2e5aa86c2e22",
      "title": "Reclamo por la falta de luz: hay tres detenidos por los incidentes en el corte de la Autopista Dellepiane",
      "content": "La protesta lleva más de siete horas y generó un caos de tránsito. Los manifestantes comenzaron un enfrentamiento a piedrazos con la Policía de la Ciudad tras ser desalojados de la autopista. Reclaman que no tienen luz ni agua desde hace días.",
      "date": "2023-02-15T18:01:20.358Z",
      "image": "article1676484238897articulo-3.jpg",
      "__v": 0
    }
  ]
}
```

#### 3. Listar los ultimos articulos

```http
GET /api/articles/latest
```

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :-----------------------------------------------------------------|
| `limit`   | `integer`| **Optional query param**. Limite de articulos a listar. Valor por defecto: `5`. |

#### 4. Mostrar un articulo por id

```http
GET /api/article/{id}
```

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :-----------------------------------------------------------------|
| `id`      | `string `| **Required path param**. Id del articulo a mostrar. Ej: `63ed1e410c5b2e5aa86c2e22`      |

#### 5. Eliminar un articulo por id

```http
DELETE /api/article/{id}
```

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :-----------------------------------------------------------------|
| `id`      | `string `| **Required path param**. Id del articulo a eliminar. Ej: `63ed1e410c5b2e5aa86c2e22`      |

#### 6. Editar un articulo por id

```http
PUT /api/article/{id}
```

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :-----------------------------------------------------------------|
| `id`      | `string `| **Required path param**. Id del articulo a editar. Ej: `63ed1e410c5b2e5aa86c2e22`      |

#### 7. Subir imagen a un articulo por id

```http
POST /api/upload-image/{id}
```

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :-----------------------------------------------------------------|
| `id`      | `string `| **Required path param**. Id del articulo. Ej: `63ed1e410c5b2e5aa86c2e22`      |

#### 8. Obtener URL de imagen segun nombre de archivo

```http
GET /api/image/{fileName}
```

| Parameter | Type     | Description                                                                                   |
| :-------- | :------- | :---------------------------------------------------------------------------------------------|
| `fileName`| `string `| **Required path param**. Nombre de la imagen. Ej: `article1676484089551articulo-2.jpeg`       |


#### 9. Buscar articulo(s)

```http
GET /api/search/{query}
```

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :-----------------------------------------------------------------|
| `query   `| `string `| **Required path param**. Nombre de la imagen. Ej: `precio`        |

Ejemplo de respuesta con status `200`:
```
{
  "status": "success",
  "articulos": [
    {
      "_id": "63ed1d4a009e05adae15fb21",
      "title": "Shell aumentó un 4% en promedio el precio de sus combustibles",
      "content": "La petrolera Raízen Argentina, licenciataria de la marca Shell, aplicó el aumento del 4% en los combustibles a partir de la hora cero de este miércoles, en el marco del acuerdo alcanzado por el Gobierno nacional con las petroleras en noviembre pasado.",
      "date": "2023-02-15T17:56:18.273Z",
      "image": "article1676484089551articulo-2.jpeg",
      "__v": 0
    }
  ]
}
```

## Referencias a base de datos
Base de datos creada utilizando `MongoDB Compass` y `Mongoose`.
