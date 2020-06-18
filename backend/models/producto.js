'use strict'
var mongoose=require('mongoose'); //para conectar con mongoDB
var Schema=mongoose.Schema;
var ProductoSchema=Schema({
    nombre:String,
    proovedor:String,
    precio:Number,
});
module.exports=mongoose.model("Producto",ProductoSchema);