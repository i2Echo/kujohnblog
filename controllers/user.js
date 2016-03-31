
var User = require('../models/user.js');
var Article = require('../models/article.js');
var multer  = require('multer');

var PAGE_SIZE = 10;

var getProfile = function(req, res){
  User.get(req.params.name, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在!');
      return res.redirect('/');
    }
    var currentPage = parseInt(req.params.page) || 1;

    Article.getByPage(user.name, currentPage, function (err, count, docs) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      //console.log(Math.ceil(count/2));
      res.render('profile', {
        title: user.name,
        isIndex: false,
        articles: docs,
        user : req.session.user,
        page: currentPage,
        pages: Math.ceil(count/PAGE_SIZE),
        isFirstPage: (currentPage-1)==0,
        isLastPage: ((currentPage-1) * PAGE_SIZE + docs.length) == count,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
      });
    });
  });
};
var uploadLogo = function(req, res){
  req.flash('success', '文件上传成功!');
}

module.exports = {
  getProfile: getProfile,
  uploadLogo: uploadLogo,
};

