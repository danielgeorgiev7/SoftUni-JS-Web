const Item = require('../models/Item');
const router = require('express').Router();
const { userGuard, guestGuard } = require('../middlewares/guards');
const { getErrorMessage } = require('../utils/errorUtils');
const searchService = require('../services/searchService');


router.get('/catalog', async (req, res) => {
    try {
        const items = await Item.find().lean();
        res.render('catalog', { items });
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('home', { error: message });
    }
});

router.get('/catalog/details/:itemId', async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId).lean();
        const hasBought = item.buyingList.map((buyerId) => buyerId == req.user?._id);
        const isOwner = item.owner == req.user?._id;
        res.render('details', { ...item, isOwner, hasBought });
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('catalog', { error: message });
    }
});

router.get('/catalog/details/:itemId/buy', guestGuard, async (req, res) => {
    try {
        Item.findByIdAndUpdate(req.params.itemId, { $push: { buyingList: req.user._id } })
            .then(res.redirect(`/catalog/details/${req.params.itemId}`));
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('catalog', { error: message });
    }
});


router.get('/catalog/details/:itemId/edit', guestGuard, async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.render('edit', item);
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('catalog', { error: message });
    }
});

router.post('/catalog/details/:itemId/edit', guestGuard, async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        if (req.user._id != item.owner) throw new Error('Unauthorized');

        Object.assign(item, req.body);

        await item.save()
        res.redirect(`/catalog/details/${req.params.itemId}`);
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('edit', { ...req.body, error: message });
    }
});


router.get('/catalog/details/:itemId/delete', guestGuard, async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);

        if (req.user._id != item.owner) throw new Error('Unauthorized');

        await item.deleteOne()
            .then(res.redirect('/catalog'));
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('catalog', { error: message });
    }
});

router.get('/catalog/create', guestGuard, (req, res) => {
    res.render('create');
});

router.post('/catalog/create', async (req, res) => {
    const itemData = {
        ...req.body,
        owner: req.user._id
    };

    try {
        await Item.create(itemData);
        res.redirect('/catalog');
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('create', { ...req.body, error: message });
    }
});

router.get('/catalog/search', async (req, res) => {
    const { name, type } = req.query;
    const items = await searchService.search(name, type).lean();
    res.render('search', { items, name, type });
});

module.exports = router;