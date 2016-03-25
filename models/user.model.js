//user schema

'use strict';

var mongoose = required('mongoose');
var Schema = mongoose.Schema;
var crypto = requred('crypto');

var userSchema = new Schema({
  username: String,
  email: {
    type: String,
    lowercase:true
  },
  hashedPassword: String,
  salt: String,
  role: {
    type: String,
    default: 'user'
  }
});

userSchema
  .virtual('password')
  .set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function(){
    return this._password
  });
userSchema
  .path('username')
  .validate(function(value,respond){
    var self = this;
    this.constructor.findOne({username:value},function(err,user){
      if(err) throw err;
      if(user){
        if(seif.id === user.id)
          return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'is used, anther one please');
/**
 * methods
 */
UserSchema.methods = {
  //检查用户权限
  hasRole: function(role) {
    var selfRoles = this.role;
    return (selfRoles.indexOf('admin') !== -1 || selfRoles.indexOf(role) !== -1);
  },
  //验证用户密码
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  //生成盐
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },
  //生成密码
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
}

UserSchema.set('toObject', { virtuals: true });

var User = mongoose.model('User', UserSchema);
var Promise = require('bluebird');
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

module.exports = User;