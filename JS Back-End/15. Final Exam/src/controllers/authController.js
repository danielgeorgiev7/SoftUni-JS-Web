const router = require('express').Router();
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');

// TODO Double check each

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie('auth', token);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        // TODO Add notifications if needed
        // const message = getErrorMessage(err);
        // res.render('auth/register', { error: message })
        res.redirect('/auth/register');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const loginData = req.body;
    try {
        const token = await authService.login(loginData);
        res.cookie('auth', token);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        // TODO Add notifications if needed
        // const message = getErrorMessage(err);
        // res.render('auth/register', { error: message })
        res.redirect('/auth/login');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;