//article schema

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

var moment = require('moment');
//var getTime = function(){return moment().format('YYYY-MM-DD HH:mm:ss');};

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
      default: moment().format('YYYY')},
    month:  {
      type: String,
      default: moment().format('MM')},
    day:  {
      type: String,
      default: moment().format('DD')},
    hour:  {
      type: String,
      default: moment().format('HH:mm:ss')},
  }},{
  collection: 'articles'
});

articleSchema.virtual('time.full')
    .get(function(){
      return this.time.year+'-'+this.time.month+' '+this.time.hour})

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
