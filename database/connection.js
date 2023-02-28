// esto va a hacer posible la conexion 
const mongose = require("mongoose");

// metodo para la conexion

const connection  = async() => {
    try {
        mongose.set("strictQuery", false);
        //como parametro va la ruta de conexion a la bbdd
        await mongose.connect("mongodb://127.0.0.1:27017/my_blog");

        // Parametros a pasar dentro del objeto en caso de aviso
        /*
            useNewUrlParser : true
            useUnifiedTopology: true
            useCreateIndex: true
        */
        console.log('Conectado correctamente');
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la BBDD")
    }
}

module.exports = {
    connection
}