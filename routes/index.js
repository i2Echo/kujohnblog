var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'blog' });
});


/* GET article page. */
router.get('/profile', function(req, res){
  res.render('profile', { title: 'I am a title'})
});

module.exports = router;
