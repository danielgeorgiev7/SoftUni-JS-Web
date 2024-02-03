const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    console.log(token);

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.isAuthenticated = true; // avtomatichno se chete ot handlebars

        next();
    }
    catch (err) {
        console.log(err)
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
};