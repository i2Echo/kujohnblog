var User = require('../models/user.js');

var crypto = require('crypto');

var loginGet = function(req, res){
  res.render('signin', {
    title: 'Sign in',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
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
    req.session.user = user;
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

