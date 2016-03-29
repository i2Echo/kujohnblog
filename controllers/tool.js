exports.temp = function(req, res, pageName, title){
    res.render(pageName, {
        title: title,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        info: req.flash('info').toString()
    });
};