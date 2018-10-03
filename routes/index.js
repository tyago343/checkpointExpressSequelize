var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */
 router.get('/articles', function(req, res, next){
 	Article.findAll({}).then(function(articulos){
 		if(articulos){
 			res.status(200)
 		return	res.json(articulos)
 		}
 		res.status(200)
 		res.json([])

 	})
 })
 router.get('/articles/:id', function(req, res, next){
 	var id = req.params.id;
 	Article.findOne({
 		where: {
 			id : id
 		}
 	}).then(function(articulo){
 		if(articulo){
 			res.status(200)
 		return	res.json(articulo)
 		}
 		res.status(404)
 		res.json([])
 	})
 })
 router.post('/articles', function(req, res, next){
 	var article = req.body
 	if(!article.content) return res.sendStatus(500)
 	Article.create(article).then(function(articulo){
 		if(articulo){
 			res.status(201)
 			res.json({
 				message : 'Created successfully',
 				article : articulo
 			})
 		}
 	})

 })
 router.put('/articles/:id', function(req, res, next){
 	var cambio = req.body
 	var id = req.params.id
 	var error = false;
 	if(!cambio.title) error = true
 	Article.findOne({
 		where : {
 			id : id
 		}
 	}).then(function(articulo){
 		if(!error){
 		return articulo.update({
 			title : cambio.title
 		})

 		
 		}
 	}).then(function(articulo){
 		if(articulo){
 		res.status(200)
 		res.json({
 			message : 'Updated successfully',
 			article : articulo
 		})
 			
 		}
 		if(error)return res.sendStatus(500)
 	})

 })


module.exports = router;
