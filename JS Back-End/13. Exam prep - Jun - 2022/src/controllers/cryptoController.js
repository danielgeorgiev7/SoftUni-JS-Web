const router = require('express').Router();
const { guestGuard } = require('../middlewares/guards');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/listings', async (req, res) => {
    try {
        const posts = await cryptoService.getAll().lean();
        res.render('crypto/catalog', { posts });
    }
    catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

router.get('/create', guestGuard, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', guestGuard, async (req, res) => {
    try {
        const data = {
            ...req.body,
            owner: req.user._id,
        }

        await cryptoService.create(data);
        res.redirect('/crypto/listings');
    }
    catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('crypto/create', { error: message, ...req.body });
    }
});

router.get('/listings/:postId', async (req, res) => {
    try {
        const post = await cryptoService.getOne(req.params.postId).lean();
        if (!post) throw new Error('No post found');
        const isOwner = post.owner == req.user?._id;
        const hasBought = !!post.buyerList.filter((buyer) => buyer._id == req.user?._id).length;
        res.render('crypto/details', { ...post, isOwner, hasBought });
    }
    catch (err) {
        console.log(err);
        res.redirect('/crypto/listings');
    }
});

router.get('/listings/:postId/edit', guestGuard, async (req, res) => {
    try {
        const post = await cryptoService.getOne(req.params.postId).lean();
        const selected = {
            "crypto-wallet": false,
            "credit-card": false,
            "debit-card": false,
            "paypal": false,
        }
        selected[post.payment] = true;
        res.render('crypto/edit', post);
    }
    catch (err) {
        console.log(err);
        res.redirect('/crypto/listings');
    }
});

router.post('/listings/:postId/edit', guestGuard, async (req, res) => {
    try {
        await cryptoService.updateOne(req.params.postId, req.body);
        res.redirect(`/crypto/listings/${req.params.postId}`);
    }
    catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('crypto/edit', { error: message, ...req.body });
    }
});

router.get('/listings/:postId/buy', guestGuard, async (req, res) => {
    try {
        await cryptoService.updateOne(req.params.postId, { $push: { buyerList: req.user._id } })
        res.redirect(`/crypto/listings/${req.params.postId}`);
    }
    catch (err) {
        console.log(err);
        res.redirect('/crypto/listings');
    }
});


router.get('/listings/:postId/delete', guestGuard, async (req, res) => {
    try {
        const post = await cryptoService.getOne(req.params.postId);
        if (post.owner != req.user._id) throw new Error('Unauthorized');
        await cryptoService.deleteOne(req.params.postId)
            .then(res.redirect('/crypto/listings'));
    }
    catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('home', { error: message });
    }
});

router.get('/search', async (req, res) => {

});

module.exports = router;