'use strict'
var mongoose=require('mongoose'); //para conectar con mongoDB
var Schema=mongoose.Schema;//para generar el schema de la base de datos
var ArticleSchema=Schema({ //creamos el archivo json
    title:String,
    content:String,
    date:{type:Date, default:Date.now},
    image:String,
});
module.exports=mongoose.model('Article',ArticleSchema); //para exportar y poderlo usar en otros modulos
//articles--> Guardar documentos de este tipo y con esta estructura dentro de la conexión