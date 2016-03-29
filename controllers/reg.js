var User = require('../models/user.js');
var crypto = require('crypto');

var regGet = function(req, res){
  res.render('signup', {
    title: 'Sign up',
    //user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
};

var regPost = function(req, res){
  var name = req.body.name,
      apassword = req.body.password,
      password_re = req.body['password-repeat'];
  if (apassword != password_re){
    req.flash('error','password isnt same');
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
      req.flash('error', 'user aleardy exiters');
      return res.redirect('/signup');
    }

    newUser.save(function(err, user){
      if(err){
        req.flash('error', err);
        return res.redirect('/signup')
      }
      console.log(req.body);
      req.session.user = newUser;
      req.flash('success', 'user be created!');
      res.redirect('/');
    });
  });
};

module.exports = {
  regGet: regGet,
  regPost: regPost
};
