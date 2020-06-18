'use strict'
var mongoose=require('mongoose'); //para conectar con mongoDB
var Schema=mongoose.Schema;
var PersonaSchema=Schema({
    nombre:String,
    apellido:String,
    direccion:String,
    
});
module.exports=mongoose.model("Persona",PersonaSchema);