var express = require('express');
var router = express.Router();

var index = require('../controllers/index.js');
var reg = require('../controllers/signup.js');
var login = require('../controllers/signin.js');
var checkLogin = require('../controllers/checkLogin.js');
var article = require('../controllers/article.js');
var user = require('../controllers/user.js');
var comment = require('../controllers/comment.js');

/* GET home page. */
router.get('/', index);
router.get('/page/:page', index);

router.get('/archives', article.getArchives);

router.get('/about', function(req,res){
  res.render('about',{
    title: 'About',
    user: req.session.user
  });
});

router.get('/signup', checkLogin.notLogin, reg.regGet);
router.post('/signup', checkLogin.notLogin, reg.regPost);

router.get('/signin', checkLogin.notLogin, login.loginGet);
router.post('/signin', checkLogin.notLogin, login.loginPost);

router.get('/signout', checkLogin.isLogin, login.logoutGet);

router.get('/post', checkLogin.isLogin, article.getPost);
router.post('/post', checkLogin.isLogin, article.savePost);

router.get('/article/:_id', article.getOneArticle);
router.post('/comment', checkLogin.isLogin, comment.saveCommentPost);

router.get('/user/:name', user.getProfile);
router.get('/:name/page/:page', user.getProfile);

router.get('/user/settings/articleManage', checkLogin.isLogin,article.getArticleManage);
router.get('/user/settings/articleManage/:page', checkLogin.isLogin,article.getArticleManage);
router.get('/articleManage/delArticle/:art_id', checkLogin.isLogin,article.delArticle);

router.get('/search',article.searchArticle);

router.get('/user/settings/profile', checkLogin.isLogin, user.setProfile_get);
router.post('/user/settings/profile', checkLogin.isLogin, user.setProfile_post);

module.exports = router;
