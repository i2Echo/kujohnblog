//var User = require('../models/user.js');
var Article = require('../models/article.js');

module.exports = function (req, res) {

    Article.get(null,function(err, docs){
        res.render('index', {
            title: 'Home',
            user: req.session.user,
            articles: docs,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};
