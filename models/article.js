//article schema

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

var moment = require('moment');
var getYear = function(){return moment().format('YYYY');};
var getMonth = function(){return moment().format('MM');};
var getDay = function(){return moment().format('DD');};
var getAday = function(){return moment().format('HH:mm:ss');};

var articleSchema = new Schema({
  //name: String,
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
    //type: String,
    //default: getTime
    year: {
      type: String,
      default: getYear},
    month:  {
      type: String,
      default: getMonth},
    day:  {
      type: String,
      default: getDay},
    aday:  {
      type: String,
      default: getAday},
  }},{
  collection: 'articles'
});

articleSchema.virtual('time.full')
    .get(function(){
      return this.time.year+'-'+this.time.month+'-'+this.time.day+' '+this.time.aday})

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
