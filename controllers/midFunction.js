var Article = require('../models/article.js');

exports.getByPage = function (condition, currentPage, callback){
  var query = condition || {};

  var pageSize = 10;
  var sort = {time: -1};
  //var currentPage = 1;
  var skipNum = (currentPage - 1)*pageSize;
  Article.count(query, function(err, count){
    Article.find(query).populate('author', 'name').skip(skipNum).limit(pageSize).sort(sort).exec(function(err, docs){
      if (err){
        return callback(err);
      }
      callback(null, count, docs);
    });
  });
};