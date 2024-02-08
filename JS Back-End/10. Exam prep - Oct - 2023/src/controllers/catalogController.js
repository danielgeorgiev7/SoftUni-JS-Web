const itemService = require('../services/itemService');
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

router.post('/catalog/create', async (req, res) => {
    const itemData = {
        ...req.body,
        owner: req.user._id
    };

    try {
        await itemService.create(itemData);
        res.redirect('/catalog');
    }
    catch (err) {
        console.log(err);
        res.redirect('/catalog/create');
    }
});

module.exports = router;