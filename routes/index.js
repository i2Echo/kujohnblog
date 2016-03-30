var express = require('express');
var router = express.Router();

var index = require('../controllers/index.js');
var reg = require('../controllers/signup.js');
var login = require('../controllers/signin.js');
var checkLogin = require('../controllers/checkLogin.js');
var article = require('../controllers/article.js');
var user = require('../controllers/user.js');

/* GET home page. */
router.get('/', index);

router.get('/signup', checkLogin.notLogin, reg.regGet);
router.post('/signup', checkLogin.notLogin, reg.regPost);

router.get('/signin', checkLogin.notLogin, login.loginGet);
router.post('/signin', checkLogin.notLogin, login.loginPost);

router.get('/signout', checkLogin.isLogin, login.logoutGet);

router.get('/post', checkLogin.isLogin, article.getPost);
router.post('/post', checkLogin.isLogin, article.savePost);

router.get('/article/:_id', article.getOneArticle);

router.get('/user/:name', checkLogin.isLogin, user.getProfile);


module.exports = router;
