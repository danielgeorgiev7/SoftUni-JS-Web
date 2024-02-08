const router = require('express').Router();

router.get('/catalog', (req, res) => {
    res.render('catalog');
});

router.get('/catalog/details/:itemId', (req, res) => {
    res.render('details');
});

router.get('/catalog/create', (req, res) => {
    res.render('create');
});

module.exports = router;