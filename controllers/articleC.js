//          aquivan las peticiones con sus metodos

//exports
const validator = require("validator");
const { findOneAndUpdate } = require("../models/Article");
const Article = require("../models/Article")


const test = (req,res) => {
    return res.status(200).json({
        mensaje:'Prueba controlador articles'
    });
}

const create = (req,res) => {
    // recoger los parametors por post a guardar
    let params = req.body;
    // validar los datos 
    try {
        let validar_title = !validator.isEmpty(params.title) && validator.isLength(params.title,{min:5,max:undefined});
        let validar_content =!validator.isEmpty(params.content);

        if(!validar_title || !validar_content){
            throw new Error("No se ha validado la información!! ");
        }
        
    } catch (error) {
        return res.status(400).json({
            status:"error",
            mensaje:'Faltan datos por enviar'
        });
    }
    // crear el objeto a guardar
    const article = new Article(params);
    // asignar valores a objeto basado en el objeto (Manual o Automatico)


    // guardar el articulo en la base de datos
    article.save( (err,artSaved) =>{
        if(err || !artSaved){
            return res.status(400).json({
                status:"error",
                mensaje:'No se ha gaurdado el articulo'
            });
        }

        // devover resultado
        return res.status(200).json({
            status:'succes!',
            article: artSaved,
            mensaje:'Articulo guardado con exito'
        });

    });
}

const listArticles = (req,res) => {
    let consulta = Article.find({});

    if(req.params.ultimos){
            //establece limite de resultados
        consulta.limit(1);
    }
        //ordena del mas nuevo al mas antiguo
    consulta.sort({date:-1}).exec((err,articles)=>{
        if(err || !articles){
            return req.status(400).json({
                status:"error",
                mensaje:"No se encontaron articulos"
            })
        }

        return res.status(200).json({
            status:"succes",
            paremtro_url: req.params.ultimos,
            contador:articles.length,
            articles
        })
    });
}

const one = (req,res) => {
    // Recoger id por url
    let id = req.params.id; 
    // buscar articulo
    Article.findById(id,(err,article)=>{
        // si no existe devolver error
        if(err || !article){
            return req.status(400).json({
                status:"error",
                mensaje:"No se ha encontrado el artículo"
            })
        }
        // si existe, devolver resultado
        return res.status(200).json({
            status:"succes!",
            article
        })
    });


}


const eliminar = (req,res) => {
    let id = req.params.id;

    Article.findOneAndDelete({_id:id},(err,articleDel)=>{
        if(err||!articleDel){
            return res.status(400).json({
                status:"error",
                mensaje: "error borrar *.* "
            })
        }
        return res.status(200).json({
            status: "succes!",
            articulo: articleDel,
            mensaje: "Borrado..."
        })
    });
} 

const editar = (req,res) => {
    // recoger id
    let id = req.params.id;
    //recoger datos del body
    let params = req.body;
    //validar datos 
    try {
        let validar_title = !validator.isEmpty(params.title) && validator.isLength(params.title,{min:5,max:undefined});
        let validar_content =!validator.isEmpty(params.content);

        if(!validar_title || !validar_content){
            throw new Error("No se ha validado la información!! ");
        }
        
    } catch (error) {
        return res.status(400).json({
            status:"error",
            mensaje:'Faltan datos por enviar'
        });
    }
    //buscar y actualozar articulo ------ Con {new:true}  me devuelve el articulo actualizado 
    Article.findOneAndUpdate({_id:id},req.body,{new:true},(err,articleSaved)=>{
        if(err||!articleSaved){
            return res.status(500).json({
                status:"error",
                mensaje: "Error al actualizar"
            
            });
        }
            //devolver espuesta
        return res.status(200).json({
            status:"succes!",
            ariculo:articleSaved
        })
    });

}

// aqui exporto los metodos
module.exports = {
    test,
    create,
    listArticles,
    one,
    eliminar,
    editar
}