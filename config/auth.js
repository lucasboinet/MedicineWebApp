module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  },
  ensureAuthenticatedAndAdmin: function(req, res, next) {
    if(req.isAuthenticated()){
      if(req.user.plan == "vip"){
        return next();
      }
      return res.redirect('/dashboard');
    }
    return res.redirect('/');
  }
};
