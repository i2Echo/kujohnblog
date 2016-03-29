var User = require('../models/user.js');
var crypto = require('crypto');
var tool = require('./tool.js');

var regGet = function(req, res){
    var pageName = 'signup',
        title = 'Sign up';    
    tool.temp(req, res, pageName, title)
};

var regPost = function(req, res){
  var name = req.body.name,
      apassword = req.body.password,
      password_re = req.body['password-repeat'];
  if (!name||!apassword||!password_re){
    req.flash('error','Please input all fields');
    return res.redirect('/signup');
  }
  if (apassword != password_re){
    req.flash('error','Confirmation password is not identical!');
    return res.redirect('/signup');
  }
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    name: name,
    password: password,
    email:req.body.email
  });
  User.get(newUser.name, function (err, user) {
    if(err){
      req.flash('error', err);
      return res.redirect('/')
    }
    if(user){
      req.flash('error', 'Username already exists');
      return res.redirect('/signup');
    }

    newUser.save(function(err, user){
      if(err){
        req.flash('error', err);
        return res.redirect('/signup')
      }
      req.session.user = newUser;
      req.flash('success', 'User created success!');
      res.redirect('/');
    });
  });
};

module.exports = {
  regGet: regGet,
  regPost: regPost
};
