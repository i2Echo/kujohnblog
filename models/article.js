//article schema

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

var getTime = function() {
  var date = new Date();

  var time = date.getFullYear() + "-" +(date.getMonth() + 1) + "-" + date.getDate() + " " +
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())+
      ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return time;
};

var articleSchema = new Schema({
  name: String,
  title: String,
  content: String,
  time:{
    type: String,
    default: getTime
  }},{
  collection: 'articles'
});

var articleModel = mongoose.model('Article', articleSchema);

function Article(article){
  this.name = article.name;
  this.title = article.title;
  this.content = article.content;
}

Article.prototype.save = function save(callback){
  var article = {
    name: this.name,
    title: this.title,
    content: this.content
  };
  var newUser = new articleModel(article);
  newUser.save(function(err, user){
    if(err){
      return callback(err);
    }
    callback(null, article);
  });
};

Article.get = function get(name, callback){
  var query = {};
  if(name){
    query.name = name;
  }
  articleModel.find(query, function(err, docs){
    if(err) {
      return callback(err);
    }
    callback(null, docs);
  });
};

Article.getOne = function getOne(_id, callback){
  articleModel.findOne({_id: _id}, function(err, doc){
    if(err) {
      return callback(err);
    }
    callback(null, doc);
  });
};


module.exports = Article;
