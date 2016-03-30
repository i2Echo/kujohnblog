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
  //hashedPassword: String,
  //salt: String,
  // 0: normal user
  // 1: verified user
  // 2: professional user
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 0
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

var userModel = mongoose.model('User', userSchema);

function User(user){
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
}

User.prototype.save = function(callback){
  var user ={
    name: this.name,
    password: this.password,
    email: this.email
  };

  var newUser = new userModel(user);
  newUser.save(function(err, user){
    if(err){
      return callback(err);
    }
    callback(null, user);
  });
};

User.get = function(name, callback){
  userModel.findOne({name: name}, function(err, user){
    if(err){
      return callback(err);
    }
    callback(null, user);
  });
};

module.exports = User;

