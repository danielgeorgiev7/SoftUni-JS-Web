const router = require('express').Router();
const authService = require('../services/authService');
const { userGuard, guestGuard } = require('../middlewares/guards');
const { getErrorMessage } = require('../utils/errorUtils');

// TODO Double check each

router.get('/register', userGuard, (req, res) => {
    res.render('auth/register');
});

router.post('/register', userGuard, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie('auth', token);
        res.redirect('/');
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('auth/register', { error: message });
    }
});

router.get('/login', userGuard, (req, res) => {
    res.render('auth/login');
});

router.post('/login', userGuard, async (req, res) => {
    const loginData = req.body;
    try {
        const token = await authService.login(loginData);
        res.cookie('auth', token);
        res.redirect('/');
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('auth/login', { error: message });
    }
});

router.get('/logout', guestGuard, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;