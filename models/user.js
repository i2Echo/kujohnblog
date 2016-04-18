//user schema

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  url:  {
    type: String,
    default: '未填写'
  },
  location:  {
    type: String,
    default: '未填写'
  },
  created:{
    type: Date,
    default: Date.now
  },
  updated:{
    type: Date,
    default: Date.now
  }},{
  collection: 'users'
});

var User = mongoose.model('User', userSchema);

module.exports = User;

