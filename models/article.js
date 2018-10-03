'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Asegurate que tu Postgres este corriendo!

var User = require('./user');

//---------VVVV---------  tu código aquí abajo  ---------VVV----------

var Article = db.define('article', {
	title : {
		type : Sequelize.STRING,
		validate : {
			len : 1
		}
	},
	content : {
		type : Sequelize.TEXT,
		allowNull : false
	},
	version : {
		type : Sequelize.INTEGER,
		defaultValue : 0

	},
	tags : {
		type : Sequelize.ARRAY(Sequelize.STRING),
		defaultValue : [],
		get() {
			var tags = this.getDataValue('tags')
			return tags.join(', ')
		}

	}

},
{
  getterMethods: {
    snippet() {
    if(this.content == undefined) return ''
      return this.content.substring(0,23) + '...'
    }
  }
});


Article.prototype.truncate = function(leng){
	
	this.content =  this.content.substring(0, leng)
};
Article.findByTitle = function(search){
	
	return Article.findOne({
		where : {
			title : search
		}
	})
	
}

Article.belongsTo(User, {as : 'author'})

Article.hook('beforeUpdate', function(article){
	 article.version += 1
})
//---------^^^---------  tu código aquí arriba  ---------^^^----------

module.exports = Article;
