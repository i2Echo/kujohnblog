var Article = require('../models/article.js');
var midFunction = require('./midFunction.js');
var comment = require('./comment.js');

var savePost = function (req, res) {
  if(!req.body.title||!req.body.content){
    req.flash('error', '标题或内容未填写');
    return res.redirect('/post');
  }
  var currentUser = req.session.user,
      article = new Article({
        author: currentUser._id,
        title: req.body.title,
        category: req.body.category?req.body.category:"",
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
      midFunction.getPre(doc._id,function(err,predocs){
        midFunction.getNext(doc._id,function(err,nextdocs){
          comment.getComment({to: id},function(err, count, comments){
            //console.log(comments[0].from);
            req.session.art_id = doc._id;
            res.render('article', {
              title: req.params.title,
              user: req.session.user,
              predoc: predocs?predocs[0]:null,
              nextdoc: nextdocs?nextdocs[0]:null,
              article: doc,
              comentCount: count,
              comments: comments,
              success: req.flash('success').toString(),
              error: req.flash('error').toString()
            });
          });
        });
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