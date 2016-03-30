var Article = require('../models/article.js');

var savePost = function (req, res) {
  var currentUser = req.session.user,
      article = new Article({
        name: currentUser.name,
        title: req.body.title,
        content: req.body.content
      });
  article.save(function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', 'Post success!');
    res.redirect('/');
  });
};

var getPost = function (req, res) {
  res.render('post', {
    title: 'Post',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
};

var getOneArticle = function (req, res){
  var _id = req.params._id;
  Article.get(_id,function(err, doc){
    res.render('index', {
      title: 'Home',
      user: req.session.user,
      article: doc,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

module.exports = {
  savePost: savePost,
  getPost: getPost,
  getOneArticle: getOneArticle
};