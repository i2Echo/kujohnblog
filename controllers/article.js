var Article = require('../models/article.js');
var User = require('../models/user.js');
var midFunction = require('./midFunction.js');
var comment = require('./comment.js');

var moment = require('moment');
const PAGE_SIZE = 10;

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
var getArticleManage = function(req, res){
  User.findOne({name: req.session.user.name}, function (err, user) {
    if (!user){
      req.flash('error', '用户不存在!');
      return res.redirect('/');
    }
    var currentPage = parseInt(req.params.page) || 1;
    midFunction.getByPage({author: user._id}, currentPage, function (err, count, docs) {
      if (err) {
        req.flash('error', err);
        //console.log(err);
        return res.redirect('back');
      }
      res.render('userSetting', {
        title: 'articleManage',
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
var delArticle = function(req, res){
  Article.findOneAndRemove({_id: req.params.art_id}).exec(function(err, callback){
    if (err) {
      req.flash('error', err);
      return res.redirect('back');
    }
    req.flash('success', '文章删除成功');
    return res.redirect('back');
  });
}
var searchArticle = function(req, res){
  var query = new RegExp(req.query.search, 'i');
  Article.find({ '$or' : [{ 'title' : query }, {'content' : query}]}).populate('author', 'name').exec(function (err, docs) {
    if (err) {
      req.flash('error', err);
      return res.redirect('back');
    }
    res.render('search', {
      title: 'search',
      articles: docs,
      user: req.session.user,
      count: docs.length,
      success : req.flash('success').toString(),
      error : req.flash('error').toString()
    });
  });
}
//var getArchives = function(req, res){
//  Article.find()
//}

module.exports = {
  savePost: savePost,
  getPost: getPost,
  getOneArticle: getOneArticle,
  getArticleManage: getArticleManage,
  delArticle: delArticle,
  searchArticle: searchArticle
};