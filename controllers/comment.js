var Comment = require('../models/comment.js');

var saveCommentPost = function (req, res) {
  if(!req.body.info){
    req.flash('error', '评论不能为空');
    return res.redirect('back');
  }
  var currentUser = req.session.user,
      currentArticle = req.session.art_id,
      comment = new Comment({
        from: currentUser._id,
        to: currentArticle,
        content: req.body.info
      });

  comment.save(function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('back');
    }
    req.flash('success', 'Comment success!');
    res.redirect('back');
  });
};

var getComment = function (condition, callback){
  var query = condition || {};
  var sort = {time: 1};
  Comment.count(query, function(err, count){
    Comment.find(query).populate('from', 'name profilePic').sort(sort).exec(function(err, comments){
      if (err){
        return callback(err);
      }
      callback(null, count, comments);
    });
  });
};


module.exports = {
  saveCommentPost: saveCommentPost,
  getComment: getComment
};