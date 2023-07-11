const User = require('../models/User.model')

module.exports = (req, res, next) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .then((userFromDB) => {
        req.user = userFromDB;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    res.redirect("/login");
  }
};