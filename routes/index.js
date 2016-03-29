var express = require('express');
var router = express.Router();

var reg = require('../controllers/reg.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'blog' });
});

router.get('/signup', reg.regGet);
router.post('/signup', reg.regPost);


module.exports = router;
