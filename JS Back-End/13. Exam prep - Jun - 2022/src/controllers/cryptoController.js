const router = require('express').Router();

router.get('/listings', (req, res) => {
    res.render('crypto/catalog');
});

router.get('/search', (req, res) => {
    res.render('crypto/search');
});

router.get('/create', (req, res) => {
    res.render('crypto/create');
});

module.exports = router;