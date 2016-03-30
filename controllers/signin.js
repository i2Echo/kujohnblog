var User = require('../models/user.js');

var crypto = require('crypto');
var tool = require('./tool.js');

var loginGet = function(req, res){
  var pageName = 'signin',
        title = 'Sign in';    
    tool.pageInit(req, res, pageName, title);
};

var loginPost = function(req, res){
  var name = req.body.name,
      apassword = req.body.password;
      
  if (!name || !apassword){
    req.flash('error','Please input all text field');
    return res.redirect('/signin');
  }
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    name: name,
    password: password
  });
  User.get(newUser.name, function (err, user) {
    if(err){
      req.flash('error', err);
      return res.redirect('/')
    }
    if(!user){
      req.flash('error', 'User is not exists');
      return res.redirect('/signin');
    }
    if(user.password !== password){
      req.flash('error', 'Password error,please try again!');
      return res.redirect('/signin');
    }
    req.session.user = newUser;
    req.flash('success', 'Login success!');
    res.redirect('/');
  });
};
var logoutGet = function(req, res){
  req.session.user = null;
  req.flash('success', 'Logout success!');
  res.redirect('/');
};

module.exports = {
  loginGet: loginGet,
  loginPost: loginPost,
  logoutGet: logoutGet
};

