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

exports.getCount = function(condition, callback){
  var query = condition || {};

  Article.count(query, function(err, count) {
    if (err){
      return callback(err);
    }
    callback(null, count);
  });
}

exports.getNext = function(id, callback){
  Article.find({_id: {$gt: id}}).sort({_id: 1}).limit(1).exec(function(err, docs){
    if (err){
      throw err;
    }
    return callback(null, docs);
  });
}
exports.getPre = function(id, callback){
  Article.find({_id: {$lt: id}}).sort({_id: -1}).limit(1).exec(function(err, docs){
    if (err){
      throw err;
    }
    return callback(null, docs);
  });
}