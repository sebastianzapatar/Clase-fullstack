'use strict'
var validator1=require('validator');
var Article=require('../models/article');
var fs =require('fs');
var path=require('path');
const { default: validator } = require('validator');
const { resolve } = require('path');
const e = require('express');
var controller={
    datoscurso:(req,res)=>{
        console.log('hola mundo');
        return res.status(200).send({
            Profesor:'Sebastian Zapata',
            Curso:'Fullstack',
            horario:'martes-vienres 5-8pm',        
        });
    },// al ser un archivo json se separa con ,
    test:(req,res)=>{
        return res.status(200).send({
            message:'Soy la acción del controlador',
        })
    },
    save:(req,res)=>{
        //Recoger parametros
        var params=req.body;
        console.log(params);
        //Validar datos
        console.log(params.title);
        try{
            var validar_titulo=!validator1.isEmpty(params.title);//creamos la variable y dara true cuanto no este vacío
            var validar_contenido=!validator1.isEmpty(params.content);
            
        }
        catch(err){
            return res.status(200).send({
                status:'error',
                message:'Faltan datos por enviar',
            })
        }
        
        //Crear el objeto a guadar
        var article=new Article;
        
        //Se asignan los valores
        article.title=params.title;
        article.content=params.content;
        article.image=null;
        //Guardar
        article.save((err,articleStored)=>{
            if(err || !articleStored){
                return res.status(404).send({
                    status:'error',
                    message:'El artículo no se ha guardado',
                })
            }
            
        });
        //Devolver una respuesta
        if(validar_titulo && validar_contenido){
            return res.status(200).send({
                status:'success',
                article,
            })
        }
        else{
            return res.status(200).send({
                status:'error',
                message:'Los datos no son validos',
            })
        }

    },
    get_articles:(req,res)=>{
        //find
        var query=  Article.find({});
        var last=req.params.last;
        
        if(last || last!=undefined){
            query.limit(1);
        }
        console.log(last);
        query.sort('_id').exec((err,articles)=>{
            if(err){
                return res.status(200).send({
                    status:'error',
                    message:'Error al mirar los artículos',
                })
            }

            return res.status(200).send({
            status:'success',
           articles,
            })
        })
        
    },
    get_article:(req,res)=>{
        
        //Recoger el id url
        var id=req.params.id;
        if(!id || id==null){
            return res.status(404).send({
                status:'error',
                message:'No existe el artículo',
            })
        }
        //Comprabar que sea diferente a Null
        Article.findById(id,(err,Article)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error al devolver los datos',
                }) 
            }
             //Buscar el artículo y devolver
            if(!Article){
                return res.status(500).send({
                    status:'error',
                    message:'No existe el artículo',
                })
            }
            return res.status(200).send({
                status:'success',
               Article,
                })
        })
    },
    update:(req,res)=>{
        //recoger id artículo por la url
        var id=req.params.id;

        //recoger los datos que llegan por put
        var params=req.body
        try {
            var validar_titulo=!validator1.isEmpty(params.title);//creamos la variable y dara true cuanto no este vacío
            var validar_contenido=!validator1.isEmpty(params.content);
        } 
        catch (error) {
            return res.status(500).send({
                status:'error',
                message:'Faltan datos por enviar',
            })
        }
        //validar los datos
        if(validar_contenido && validar_titulo){
            Article.findOneAndUpdate({_id:id},params,{new:true},(err,ArticleUpdate)=>{
                if(err){
                    return res.status(500).send({
                        status:'error',
                        message:'No se actualizó',
                    })
                }
                if(!ArticleUpdate){
                    return res.status(500).send({
                        status:'error',
                        message:'No existe el artículo',
                    })
                }
                return res.status(200).send({
                    status:'success',
                    ArticleUpdate,
                    })
            });
        }
        else{
            return res.status(500).send({
                status:'error',
                message:'Validación no es correcta',
            })
        }
        //find and update

    },
    delete:(req,res)=>{
        //recoger datos
        var id=req.params.id;
        //find and delete
        Article.findByIdAndDelete({_id:id},(err,ArticleRemove)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error en la petición borrar',
                })
            }
            if(!ArticleRemove){
                return res.status(404).send({
                    status:'error',
                    message:'No se pudo eliminar, el id puede no existir',
                })
            }
            return res.status(200).send({
                status:'success',
                ArticleRemove,
                })
        })
        
    },
    upload:(req,res)=>{
        //Configurar la conexión
        //Recoger el archivo de la petición
        var file_name='Imagen no subida';

        if(!req.files){
            return res.status(404).send({
                status:'Error',
                message:file_name,
                })
        }
        // Conseguir el nombre y la extensión del archivo
        var file_path=req.files.file0.path;
        var file_split=file_path.split('\\');
        //Nombre del archivo
        var file_name=file_split[2];
        //Extensión del archivo
        var file_extension=file_name.split('.')[1];
        /*
        En linux o mac
        var file_split=file_path.spilt('/');
        */
        //Comprobar la extensión y solo admite imagenes
        if(file_extension != 'png' && file_extension != 'jpg'
        && file_extension != 'gif' && file_extension != 'jpeg'){
            //Borrar el archivo
            fs.unlink(file_path,(err)=>{
                
                    return res.status(404).send({
                        status:'error',
                        message:'La extensión de la imagen no es váida',
                    }) 

            });
        }
        else{
            var id=req.params.id;
            console.log(file_name);
            Article.findOneAndUpdate({_id:id},{image:file_name},
                {new:true},(err,ArticleUpdate)=>{
                    if(err || !ArticleUpdate){
                        return res.status(404).send({
                            status:'error',
                            message:'Error al guardar la imagen del artículo',
                        }) 
                    }
                    return res.status(200).send({
                        status:'success',
                        ArticleUpdate,
                        })  
            })
        }
        //Si todo es válido
        //Buscar el artículo, asignarle el nombre de la imagen y acutalizar
    },
    //Como obtener la imagen
    get_image:(req,res)=>{
        var file=req.params.nombreimagen;
        console.log(file);
        var path_file='./upload/articles/'+file;
        console.log(path_file);
        fs.exists(path_file,(exists)=>{
            console.log(exists);
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }
            else{
                return res.status(404).send({
                    status:'error',
                    message:'La imagen no existe',
                })
            }
        })
        
    },
    search:(req,res)=>{
        var buscar=req.params.buscar;
        Article.find({"$or":[
        {"title":{"$regex":buscar,"$options":"i"}},
        {"content":{"$regex":buscar,"$options":"i"}}
        ]}).sort([['date','desc']])
        .exec((err,articles)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:"error en la petición",
                })
            }
            else if(!articles){
                return res.status(404).send({
                    status:'error',
                    message:"No hay artículos",
                })
            }
            else{
                return res.status(200).send({
                    status:'Success',
                    message:articles,
                })
            }
        })
        
    }

}
//Fin del controlador
module.exports=controller;