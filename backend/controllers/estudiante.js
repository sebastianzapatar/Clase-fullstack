'use strict'
var validator1=require('validator');
var Persona=require('../models/estudiante');
const { default: validator } = require('validator');
var controller={
    save:(req,res)=>{
        //Recoger parametros
        var params=req.body;
        console.log(params);
        //Validar datos
        
        try{
            var validar_nombre=!validator1.isEmpty(params.nombre);//creamos la variable y dara true cuanto no este vacío
            var validar_apellido=!validator1.isEmpty(params.apellido);
            var validar_direccion=!validator1.isEmpty(params.direccion);
        }
        catch(err){
            return res.status(200).send({
                status:'error',
                message:'Faltan datos por enviar',
            })
        }
        
        //Crear el objeto a guadar
        var persona=new Persona;
        
        //Se asignan los valores
        persona.nombre=params.nombre;
        persona.apellido=params.apellido;
        persona.direccion=params.direccion;
        //Guardar
        persona.save((err,PersonaStored)=>{
            if(err || !PersonaStored){
                return res.status(404).send({
                    status:'error',
                    message:'La persona no se ha guardado',
                })
            }
            
        });
        //Devolver una respuesta
        if(validar_nombre && validar_nombre && validar_direccion){
            return res.status(200).send({
                status:'success',
                persona,
            })
        }
        else{
            return res.status(200).send({
                status:'error',
                message:'Los datos no son validos',
            })
        }

    },
    get_personas:(req,res)=>{
        //find
        Persona.find({}).sort('_id').exec((err,personas)=>{
            if(err){
                return res.status(200).send({
                    status:'error',
                    message:'Error al mirar los artículos',
                })
            }

            return res.status(200).send({
            status:'success',
           personas,
            })
        })
        
    }
};
module.exports=controller;