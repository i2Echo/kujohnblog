var midFunction = require('./midFunction.js');

var PAGE_SIZE = 10;

module.exports = function (req, res) {
  var currentPage = parseInt(req.params.page) || 1;

  midFunction.getByPage(null, currentPage, function(err, count, docs){
    console.log(docs);
    console.log(count);
    res.render('index', {
      title: 'Home',
      isIndex: true,
      user: req.session.user,
      articles: docs,
      page: currentPage,
      pages: Math.ceil(count/PAGE_SIZE),
      isFirstPage: (currentPage-1)==0,
      isLastPage: ((currentPage-1) * PAGE_SIZE + docs.length) == count,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

};