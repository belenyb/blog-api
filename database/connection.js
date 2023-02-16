const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog") // Pasamos como parametro la URL de conexion a la BBDD
    // Si hay un error de conexion, debemos pasarle estos parametros a .connect:
    // useNewUrlParser: true
    // useUnifiedTopology: true
    // useCreateIndex: true
    mongoose.set('strictQuery', false);
    console.log("Conectado correctamente a la BB.DD.")
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la BB.DD.");
  }
}

module.exports = {
  connection
}
