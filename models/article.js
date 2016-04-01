//article schema

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var ObjectId = Schema.Types.ObjectId;

var getTime = function() {
  var date = new Date();

  var time = date.getFullYear() + "-" +(date.getMonth() + 1) + "-" + date.getDate() + " " +
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())+
      ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  console.log(time);
  return time;
};

var articleSchema = new Schema({
  name: String,
  title: String,
  content: String,
  pv: {
    type: Number,
    default: 0
  },
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
  newUser.save(function(err, article){
    if(err){
      return callback(err);
    }
    callback(null, article);
  });
};

Article.getByName = function get(name, callback){
  var query = {};
  if(name){
    query.name = name;
  }
  articleModel.find(query).sort({time: -1}).exec(function(err, docs){
    if(err) {
          return callback(err);
    }
    callback(null, docs);
  });
};

Article.getOne = function getOne(_id, callback){
  articleModel.findByIdAndUpdate(_id, { $inc: { pv: 1 }}, function(err, doc){
    if(err) {
      return callback(err);
    }
    callback(null, doc);
  });
};

Article.getByPage = function getByPage(condition, currentPage, callback){
  var query = {};
  if(condition){
    query.name = condition;
  }
  var pageSize = 10;
  var sort = {time: -1};
  //var currentPage = 1;
  var skipNum = (currentPage - 1)*pageSize;
  articleModel.count(query, function(err, count){

    articleModel.find(query).skip(skipNum).limit(pageSize).sort(sort).exec(function(err, docs){
      if (err){
        return callback(err);
      }
      callback(null, count, docs);
    });
  });
};

module.exports = Article;
