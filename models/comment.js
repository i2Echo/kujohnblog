//comment schema

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

var moment = require('moment');
var getTime = function(){return moment().format('YYYY-MM-DD HH:mm:ss');};

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
