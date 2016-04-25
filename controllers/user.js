var User = require('../models/user.js');
var midFunction = require('./midFunction.js');
var fs = require('fs');

var PAGE_SIZE = 10;
var uploadDir = './public/';

var getProfile = function(req, res){
  User.findOne({name: req.params.name}, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在!');
      return res.redirect('/');
    }
    var currentPage = parseInt(req.params.page) || 1;
    midFunction.getByPage({author: user._id}, currentPage, function (err, count, docs) {
      if (err) {
        req.flash('error', err);
        //console.log(err);
        return res.redirect('/');
      }
      res.render('profile', {
        title: req.params.name,
        isIndex: false,
        articles: docs,
        user : req.session.user,
        visitUser: user,
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
    title: 'profileSet',
    user : req.session.user,
    success : req.flash('success').toString(),
    error : req.flash('error').toString()
  });
}
var setProfile_post = function (req, res){
  var condition = req.session.user.name;
  var _name = req.body.name && req.body.name.trim();
  if(!_name){
    req.flash('error','Username can not be null');
    return res.redirect('/user/settings/profile');
  }
  //console.log(req.body);
  var updates = {
    name: req.body.name || req.session.user.name,
    email: req.body.email || req.session.user.email,
    profilePic: (req.files.profilePic ? '/upload/'+req.files.profilePic.name : req.session.user.profilePic),
    about: req.body.about || req.session.user.about,
    url: req.body.url || req.session.user.url,
    location: req.body.location || req.session.user.location
  }

  //console.log(updates);
  User.findOne({name: updates.name}, function (err, user) {
    if(user){
        if(user.name!=condition){//判断是否为它原name值,就是同原名允许改
          req.flash('error', 'Username already exists');
          return res.redirect('/user/settings/profile');
        }
    }
    User.update({name : condition }, updates, function(err, Ouser){
      if(err){
        // console.log(err);
        if(req.files.profilePic){
          fs.unlink(uploadDir + req.files.profilePic.name, function(err){
            if(err)
              throw err;
          });
        }
        req.flash('error', 'Try again');
        return res.redirect('/user/settings/profile');
      }
      if(req.files.profilePic && (req.session.user.profilePic!='/images/default-logo.png')){

        fs.unlink(uploadDir + req.session.user.profilePic, function(err){          
          if(err)
            console.log(req.session.user.profilePic);
            //req.flash('error', 'Delete old picture failed!');
        });
      }
      User.findOne({name: updates.name}, function (err, user) {
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

