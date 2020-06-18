'use strict'
var express=require('express');
var PersonaController=require('../controllers/estudiante');
var router=express.Router();
//Rutas que sirven
router.post('/saveestudiante',PersonaController.save);
router.get('/listartudiante/',PersonaController.get_personas);


module.exports=router;