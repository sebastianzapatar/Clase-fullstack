'use strict'
var express=require('express');
var ArticleController=require('../controllers/article');
var router=express.Router();
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./upload/articles'});
//Rutas que sirven
router.post('/save',ArticleController.save);
router.get('/eliminar/:id',ArticleController.delete);
router.get('/listar/:last?',ArticleController.get_articles);
router.get('/buscarID/:id',ArticleController.get_article);
router.put('/actualizar/:id',ArticleController.update);
router.post('/subir-imagen/:id',md_upload,ArticleController.upload);
router.get('/obtener-imagen/:nombreimagen',ArticleController.get_image);
router.get('/buscar/:buscar',ArticleController.search);
//Rutas de pruebas
router.get('/test',ArticleController.test);
router.post('/test1',ArticleController.datoscurso);

module.exports=router;
