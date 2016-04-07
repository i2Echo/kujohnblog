var Article = require('../models/article.js');
var midFunction = require('./midFunction.js');

var savePost = function (req, res) {
  var currentUser = req.session.user,
      article = new Article({
        author: currentUser._id,
        title: req.body.title,
        content: req.body.content
      });

  //console.log(article.author);
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

  midFunction.getCount({author: req.session.user._id},function(err, count){
    res.render('post', {
      title: 'Post',
      count: count,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

var getOneArticle = function (req, res){
  var id = req.params._id;
  if (id.match(/^[0-9a-fA-F]{24}$/))
    Article.findByIdAndUpdate({_id: id}, { $inc: { pv: 1 }}).populate('author', 'name').exec(function(err, doc){
      console.log(doc.author)
      res.render('article', {
        title: req.params.title,
        user: req.session.user,
        article: doc,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  else{
    req.flash('err', 'Article not exists');
    res.redirect('back');
  }
};

module.exports = {
  savePost: savePost,
  getPost: getPost,
  getOneArticle: getOneArticle
};