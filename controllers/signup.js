var User = require('../models/user.js');
var crypto = require('crypto');

var regGet = function(req, res){
  res.render('signup', {
    title: 'Sign up',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
};

var regPost = function(req, res){
  var name = req.body.name && req.body.name.trim(),
      apassword = req.body.password && req.body.password,
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
  User.findOne({name: newUser.name}, function (err, user) {
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
      req.session.user = user;
      req.flash('success', 'User created success!');
      res.redirect('/');
    });
  });
};

module.exports = {
  regGet: regGet,
  regPost: regPost
};
