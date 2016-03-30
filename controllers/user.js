
var User = require('../models/user.js');
var Article = require('../models/article.js');

var getProfile = function(req, res){
  User.get(req.params.name, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在!');
      return res.redirect('/');
    }

    Article.get(user.name, function (err, docs) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('profile', {
        title: user.name,
        articles: docs,
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
      });
    });
  });
};

module.exports = {
  getProfile: getProfile
};

