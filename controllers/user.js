
var User = require('../models/user.js');
var Article = require('../models/article.js');
var multer  = require('multer');
var fs = require('fs');

var PAGE_SIZE = 10;
var uploadDir = './public/upload/';

var getProfile = function(req, res){
  User.get(req.params.name, function (err, user) {
    //console.log(req.params.name);
    if (!user) {
      req.flash('error', '用户不存在!');
      return res.redirect('/');
    }
    var currentPage = parseInt(req.params.page) || 1;

    Article.getByPage(user.name, currentPage, function (err, count, docs) {
      if (err) {
        //req.flash('error', err);
        console.log(err);
        return res.redirect('/');
      }
      //console.log(Math.ceil(count/2));
      res.render('profile', {
        title: user.name,
        isIndex: false,
        articles: docs,
        user : req.session.user,
        page: currentPage,
        count: count,
        pages: Math.ceil(count/PAGE_SIZE),
        isFirstPage: (currentPage-1)==0,
        isLastPage: ((currentPage-1) * PAGE_SIZE + docs.length) == count,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
      });
    });
  });
};

var setProfile_get = function (req, res){
  res.render('userSetting', {
    title: 'profileSettings',
    user : req.session.user,
    success : req.flash('success').toString(),
    error : req.flash('error').toString()
  });
}
var setProfile_post = function (req, res){
  var condition = req.session.user.name;
  if(!req.body.name){
    req.flash('error','Username can not be null');
    return res.redirect('/user/settings/profile');
  }
  console.log(req.body);
  var updates = {
    name: req.body.name,
    email: req.body.email,
    profilePic: (req.files.profilePic ? '/upload/'+req.files.profilePic.name : ''),
    url: req.body.url,
    location: req.body.location
  }
  for (var key in updates){
    if (!updates[key]){
      delete updates[key];
    }
  }
  console.log(updates);
  User.get(updates.name, function (err, user) {
    if(user){
      if(user.name!=condition){
        req.flash('error', 'Username already exists');
        return res.redirect('/user/settings/profile');
      }
      delete updates.name;
    }
    User.update({name : condition }, updates, function(err, Ouser){
      if(err){
        console.log(err);
        if(req.files.profilePic){
          fs.unlink(uploadDir + req.files.profilePic.name, function(err){
            if(err)
              throw err;
          });
        }
        req.flash('error', 'Try again');
        return res.redirect('/user/settings/profile');
      }
      Article.updateArticel(Ouser.name, {name: updates.name}, function(err, callback){
        if(err){
          req.flash('error', 'Error, Try again');
          return res.redirect('/user/settings/profile');
        }
      });
      User.get(condition, function (err, user) {
        req.session.user = user;
        req.flash('success', 'Update success!');
        res.redirect('/user/'+user.name);
      });
    });
  });
}

module.exports = {
  getProfile: getProfile,
  setProfile_post: setProfile_post,
  setProfile_get: setProfile_get
};

