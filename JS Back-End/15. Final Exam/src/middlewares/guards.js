const guestGuard = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}


const userGuard = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }

    next();
}

module.exports = {
    guestGuard,
    userGuard,
}