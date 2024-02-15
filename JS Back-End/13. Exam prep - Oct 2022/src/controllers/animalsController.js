const router = require('express').Router();
const postService = require('../services/postService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/dashboard', (req, res) => {
    res.render('animals/dashboard');
});

router.get('/create', async (req, res) => {
    try {
        res.render('animals/create');
    }
    catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('home', { error: message });
    }
});

router.post('/create', async (req, res) => {
    try {
        const data = {
            ...req.body,
            owner: req.user._id,
        }
        await postService.create(data);
        res.render('animals/dashboard');
    }
    catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('animals/create', { error: message, ...req.body });
    }
});

router.get('/search', (req, res) => {
    res.render('animals/search');
});

module.exports = router;