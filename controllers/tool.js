var User = require('../models/user.js');

exports.pageInit = function(req, res, pageName, title, contents){
  res.render(pageName, {
    title: title,
    user: req.session.user,
    contents: contents,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
};
