const router = require('express').Router();

router.get('/dashboard', (req, res) => {
    res.render('animals/dashboard');
});

router.get('/create', (req, res) => {
    res.render('animals/create');
});

router.get('/search', (req, res) => {
    res.render('animals/search');
});

module.exports = router;