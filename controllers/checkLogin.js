function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('info', 'notLogin');
    res.redirect('/signin');
  }
  if (req.session.user) {
    req.flash('info', 'isLogin');
    res.redirect('back');
  }
  next();
}

module.exports = checkLogin;
