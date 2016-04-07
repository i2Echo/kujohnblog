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
  // name: {
  //   type: ObjectId,
  //   ref: 'User'
  // },
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

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
