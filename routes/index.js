var express = require('express');
var router = express.Router();

var index = require('../controllers/index.js');
var reg = require('../controllers/signup.js');
var login = require('../controllers/signin.js');
var checkLogin = require('../controllers/checkLogin.js');

/* GET home page. */
router.get('/', index);

router.get('/signup',reg.regGet);
router.post('/signup',reg.regPost);

router.get('/signin',login.loginGet);
router.post('/signin',login.loginPost);

router.get('/signout',login.logoutGet);

module.exports = router;
