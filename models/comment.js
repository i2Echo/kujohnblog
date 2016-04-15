//comment schema

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

var commentSchema = new Schema({

  from: {
    type: ObjectId,
    ref: 'User'
  },
  to: {
    type: ObjectId,
    ref: 'Article'
  },
  reply:{
    type: ObjectId,
    ref: 'Comment'
  },
  content: String,
  time:{
    type: String,
    default: getTime
  }},{
  collection: 'comments'
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
