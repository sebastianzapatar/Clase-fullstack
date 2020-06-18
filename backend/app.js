'use strict'
//Cargar modulos de node.js para crear un servidor
var express=require('express');
var bodyparser=require('body-parser');
//Ejecutar el express servidor http
var app=express();

//Cargar ficheros rutas
var articleroutes=require('./routes/article');
var personaroutes=require('./routes/estudiante');
var productoroutes=require('./routes/producto');
//Middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//CORS para permitir peticiones del frontend
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next(); 
});

//Añadir prefijos
app.use('/api',articleroutes);
app.use('/api',personaroutes);
app.use('/api',productoroutes);
//Ruta
/*
app.get('/probando',(req,res)=>{
    console.log('hola mundo');
    return res.status(200).send({
        Profesor:'Sebastian Zapata',
        Curso:'Fullstack',
        horario:'martes-vienres 5-8pm',
    }
        
    );
});
*/

//Exportar los modulos
module.exports=app;