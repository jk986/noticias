// importar la conexion con destructuring
const { connection } = require("./database/connection");
//importar express
const express = require("express")
const cors = require ("cors");

// iniciar app
console.log("App de node arrancada");

// conectar a la db
connection();

// crear servidor node (peticiones y rutas)
const app = express();
const port = 3900;
// configurar cors 
app.use(cors());

// leer y convertir datos que recibo a objeto JS
app.use(express.json());

// rutas 
const rutas_article = require("./paths/articleP");
/*cargar rutas 
params prefijo ("/") <- carga las rutas 
desde la raiz de la url || ("/api") <- prefijo api y despues cargar rutas del archivo 
*/
app.use("/api",rutas_article);



//crear rutas prueba hardcodeadas
    app.listen(port,()=>{
        console.log('Servidor correindo en el puerto: '+port);
    })
//crea servidor y escuchar peticiones

app.get("/probando",(req,res) => {
    console.log('Se ha ejecutado el endpoint probando');

    // return res.status(200).send(``); como parametros van lineas de html o {doc:'jspon'}
    return res.status(200).send();
})
