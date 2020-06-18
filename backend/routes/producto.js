'use strict'
var express=require('express');
var ProductoController=require('../controllers/producto');
const producto = require('../models/Producto');
var router=express.Router();
//Rutas que sirven
router.post('/saveproducto',ProductoController.save);
router.get('/listarproducto/:last?',ProductoController.get_productos);
router.get('/getproducto/:id',ProductoController.get_producto);

module.exports=router;