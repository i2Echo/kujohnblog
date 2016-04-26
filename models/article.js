//article schema

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

var moment = require('moment');
var getTime = function(){return moment().format('YYYY-MM-DD HH:mm:ss');};

var articleSchema = new Schema({
   author: {
     type: ObjectId,
     ref: 'User'
   },
  title: String,
  category: String,
  content: String,
  pv: {
    type: Number,
    default: 0
  },
  time:{
    type: String,
    default: getTime
  }},{
  toJSON: {virtuals: true}
  },{
  collection: 'articles'
});

articleSchema.virtual('time_year').get(function(){return moment(this.time).format('YYYY')});
articleSchema.virtual('time_month').get(function(){return moment(this.time).format('MM')});
articleSchema.virtual('time_day').get(function(){return moment(this.time).format('DD')});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
