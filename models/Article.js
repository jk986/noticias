// Crear modelo con mongoose
const {Schema,model} = require("mongoose");

const ArticleSchema = Schema({
    title: {
        type:String,
        require:true
    },
    content: {
        type:String,
        require: true
    },
    date: {
        type: date,
        default: Date.now()
    },
    image:{
        type:String,
        default: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.safexone.com%2Fimages%2Fold%2F&psig=AOvVaw3BlofwcqMzzfo0yE5T4ziK&ust=1677601985061000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPD_r8eQtv0CFQAAAAAdAAAAABAK"
    }
})
// params ("name of model", model schema, collection <- opcional )

module.exports = model("Article",ArticleSchema,"articles");