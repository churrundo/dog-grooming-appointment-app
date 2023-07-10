module.exports = (req, res, next) => {
    if (req.session.currentUser) {
        req.app.locals.isLoggedIn = true;
        const { role } = req.session.currentUser;
        req.app.locals.isUser = role === 'User';
    } else {
        req.app.locals.isLoggedIn = false;
        req.app.locals.isUser = false;
    }
    next();
};