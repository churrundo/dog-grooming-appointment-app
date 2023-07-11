module.exports = (req, res, next) => {
  if (req.session.currentUser) {
      req.app.locals.isLoggedOut = false;
  } else {
      req.app.locals.isLoggedOut = true;
  }
  next();
};