var Comment = require('../models/comment.js');
var midFunction = require('./midFunction.js');

var saveCommentPost = function (req, res) {
  if(req.body.info){
    req.flash('error', '评论为空');
    return res.redirect('back');
  }
  var currentUser = req.session.user,
      currentArticle = req.params.title,
      comment = new Comment({
        from: currentUser._id,
        title: req.body.title,
        category: req.body.category?req.body.category:"",
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
      midFunction.getPre(doc._id,function(err,predocs){
        midFunction.getNext(doc._id,function(err,nextdocs){
          res.render('article', {
            title: req.params.title,
            user: req.session.user,
            predoc: predocs?predocs[0]:null,
            nextdoc: nextdocs?nextdocs[0]:null,
            article: doc,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
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
  saveCommentPost: saveCommentPost,
  getPost: getPost,
  getOneArticle: getOneArticle
};