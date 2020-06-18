'use strict'
var mongoose=require('mongoose');
var app=require('./app');
var port=3900;
mongoose.connect('mongodb://localhost:27017/fullstack',{userNewUrlParser:true})/*El primer campo la dirección 
del servidor y el segundo son opciones*/
    .then(()=>{ // se hace con proramación funcional para darle más orden
        console.log('En la buena parcero conecto');


        //Crear el servidor y ponerme a escuchar peticiones http
       
        app.listen(port,()=>{
            console.log('Servidor corriendo en http://localhost:'+port);
        })
    })