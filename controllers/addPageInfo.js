
module.exports = function (req, res, pageName, title) {
  this.req = req;
  this.res = res;
  this.pagName = pageName;
  this.title = title;

  this.res.render(this.pageName, {
    title: this.title,
    user: this.req.session.user,
    success: this.req.flash('success').toString(),
    error: this.req.flash('error').toString(),
    info: this.req.flash('info').toString()
  });
};
