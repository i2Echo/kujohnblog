function isLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'not Login');
    res.redirect('/signin');
  }
  next();

}
function notLogin(req, res, next){
  if (req.session.user) {
    req.flash('error', 'is Login');
    res.redirect('back');
  }
  next();
}
module.exports = {
  notLogin: notLogin,
  isLogin: isLogin
};
