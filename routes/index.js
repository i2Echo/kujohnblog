var express = require('express');
var router = express.Router();

var reg = require('../controllers/reg.js');
var login = require('../controllers/login.js');
var checkLogin = require('../controllers/checkLogin.js');
var addPageInfo = require('./addPageInfo.js');

var  indexPageInfo = new addPageInfo(req, res, 'index', 'Home');
/* GET home page. */
router.get('/', indexPageInfo);

router.get('/signup', checkLogin.checkLogin, reg.regGet);
router.post('/signup', checkLogin.checkLogin, reg.regPost);

router.get('/signin', checkLogin.checkLogin, login.loginGet);
router.post('/signin', checkLogin.checkLogin, login.loginPost);
router.get('/signout', checkLogin.checkLogin, login.logoutGet);

module.exports = router;
