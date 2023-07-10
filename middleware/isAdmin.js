module.exports = (req, res, next) => {
    if (req.session.currentUser) {
        req.app.locals.isLoggedIn = true;
        const { role } = req.session.currentUser;
        req.app.locals.isAdmin = role === 'Admin';
    } else {
        req.app.locals.isLoggedIn = false;
        req.app.locals.isAdmin = false;
    }
    next();
};