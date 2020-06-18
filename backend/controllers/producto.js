//Controlador
'use strict' 
var validator1=require('validator');//Para validar los datos en el futuro
var Producto=require('../models/Producto'); //Para importar el modelo
const { default: validator } = require('validator'); //creamos el archivo para validar
const { request } = require('../app');
var controller={
    save:(req,res)=>{
        //recoger los datos
        var params=req.body;
        console.log(params);
        //Validar los datos
        try{
            var validar_nombre=!validator1.isEmpty(params.nombre);
            var validar_proovedor=!validator1.isEmpty(params.proovedor);
            var validar_precio=!validator1.isEmpty(params.precio);
        }
        catch(err){
            return res.status(200).send({
                status:'error',
                message:'No se enviaron todos los datos',
            })
        }
        //Crear el objeto
        var producto=new Producto;
        //Llenamos el objeto
        producto.nombre=params.nombre;
        producto.proovedor=params.proovedor;
        producto.precio=params.precio;
        //Guardamos los datos
        producto.save((err,ProductoStored)=>{
            if(err || !ProductoStored){
                return res.status(404).send({
                    status:'error',
                    message:'No se ha guardado el producto',
                })  
            }
        })
        if(validar_nombre && validar_proovedor && validar_precio){
            return res.status(200).send({
                status:'Exitoso',
                producto,
            })
        }

    },
    get_productos:(req,res)=>{
        //find
        var last=req.params.last;
        var query=  Producto.find({});
        if(last!=null || last!=undefined){
            query.limit(2);
        }
        query.sort('-nombre').exec((err,Productos)=>{
            if(err){
                return res.status(200).send({
                    status:'error',
                    message:'Error al mirar los productos',
                })
            }

            return res.status(200).send({
            status:'success',
            Productos,
            })
        })
        
    },
    get_producto:(req,res)=>{
        //Coger el id
        var id=req.params.id;
        //Validamos
        if(!id && id!=undefined){
            return res.status(404).send({
                status:'error',
                message:'No hay id',
            }) 
        }
        //Retornamos el valor
        Producto.findById(id,(err,Producto1)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error al devolver los datos',
                }) 
            }
             //Buscar el artículo y devolver
            if(!Producto1){
                return res.status(500).send({
                    status:'error',
                    message:'No existe el producto',
                })
            }
            return res.status(200).send({
                status:'success',
               Producto1,
                })
        })
        
    },
};
module.exports=controller;
