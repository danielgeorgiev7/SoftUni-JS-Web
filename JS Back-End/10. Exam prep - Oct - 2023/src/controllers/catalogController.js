const Item = require('../models/Item');
const itemService = require('../services/itemService');
const router = require('express').Router();

router.get('/catalog', async (req, res) => {
    try {
        const items = await Item.find().lean();
        res.render('catalog', { items });
    } catch (err) {
        console.log(err);
        res.render('/');
    }
});

router.get('/catalog/details/:itemId', async (req, res) => {
    try {
        console.log(req.params);
        const item = await Item.findById(req.params.itemId).lean();
        const isOwner = item.owner == req.user._id;
        res.render('details', { ...item, isOwner, });
    } catch (err) {
        console.log(err);
        res.redirect('/catalog');
    }
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