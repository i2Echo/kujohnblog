//user schema

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var getTime = function(){return moment().format('YYYY-MM-DD HH:mm:ss');};

var userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    lowercase:true
  },
  password: String,
  profilePic: {
    type: String,
    default: '/images/logo-default.png'
  },
  about:  {
    type: String,
    default: '未填写'
  },
  url:  {
    type: String,
    default: '未填写'
  },
  location:  {
    type: String,
    default: '未填写'
  },
  created:{
    type: String,
    default: getTime
  },
  updated:{
    type: String,
    default: getTime
  }},{
  collection: 'users'
});

var User = mongoose.model('User', userSchema);

module.exports = User;

