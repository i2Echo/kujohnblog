//var User = require('../models/user.js');
var Article = require('../models/article.js');

//module.exports = function (req, res) {
//
//    Article.getByName(null,function(err, docs){
//        res.render('index', {
//            title: 'Home',
//            user: req.session.user,
//            articles: docs,
//            success: req.flash('success').toString(),
//            error: req.flash('error').toString()
//        });
//    });
//};

module.exports = function (req, res) {

    var currentPage = parseInt(req.params.page) || 1;

    Article.getByPage(null, currentPage, function(err, count, docs){
      //console.log(req.params.page);
      res.render('index', {
          title: 'Home',
          user: req.session.user,
          articles: docs,
          page: currentPage,
          pages: Math.ceil(count/2),
          isFirstPage: (currentPage-1)==0,
          isLastPage: ((currentPage-1) * 2 + docs.length) == count,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
      });
    });
};