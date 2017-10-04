'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Asegurate que tu Postgres este corriendo!

var User = require('./user');

//---------VVVV---------  tu código aquí abajo  ---------VVV----------

var Article = db.define('article', {


});

//---------^^^---------  tu código aquí arriba  ---------^^^----------

module.exports = Article;
