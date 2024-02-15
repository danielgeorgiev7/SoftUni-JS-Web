const router = require('express').Router();
const { guestGuard } = require('../middlewares/guards');
const { getErrorMessage } = require('../utils/errorUtils');
const postService = require('../services/postService');
const searchService = require('../services/searchService');

router.get('/dashboard', async (req, res) => {
    const posts = await postService.getAll().lean();
    res.render('animals/dashboard', { posts });
});

router.get('/create', guestGuard, async (req, res) => {
    try {
        res.render('animals/create');
    }
    catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('home', { error: message });
    }
});

router.post('/create', guestGuard, async (req, res) => {
    try {
        const data = {
            ...req.body,
            owner: req.user._id,
        }
        await postService.create(data)
        res.redirect('/create');
    }
    catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('animals/create', { error: message, ...req.body });
    }
});

router.get('/details/:postId', async (req, res) => {
    try {
        const post = await postService.getOne(req.params.postId, { path: 'owner' }).lean();
        const isOwner = post.owner._id == req.user?._id;
        const hasDonated = !!post.donations.filter((donator) => donator._id == req.user?._id).length;
        res.render('animals/details', { ...post, isOwner, hasDonated });
    }
    catch (err) {
        // const message = getErrorMessage(err);
        // res.redirect('/animals/dashboard', { error: message });
    }
});

router.get('/edit/:postId', guestGuard, async (req, res) => {
    const post = await postService.getOne(req.params.postId).lean();
    try {
        res.render('animals/edit', post);
    }
    catch (err) {
        res.redirect('/posts/dashboard');
    }
});

router.post('/edit/:postId', guestGuard, async (req, res) => {
    try {
        await postService.updateOne(req.params.postId, req.body);
        res.redirect(`/animals/details/${req.params.postId}`);
    }
    catch (err) {
        const message = getErrorMessage(err);
        console.log(message)
        res.render('animals/edit', { error: message, ...req.body });
    }
});

router.get('/donate/:postId', guestGuard, async (req, res) => {
    try {
        await postService.updateOne(req.params.postId, { $push: { donations: req.user._id } })
        res.redirect(`/animals/details/${req.params.postId}`);
    }
    catch (err) {
        res.redirect('/animals/dashboard');
    }
});


router.get('/delete/:postId', guestGuard, async (req, res) => {
    try {
        const post = await postService.getOne(req.params.postId);
        if (post.owner._id != req.user._id) throw new Error('Unauthorized');

        await postService.deleteOne(req.params.postId)
            .then(res.redirect('/animals/dashboard'));
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.render('home', { error: message });
    }
});

router.get('/search', async (req, res) => {
    const { location } = req.query;
    const items = await searchService.search(location).lean();
    res.render('animals/search', { items, location });
});

module.exports = router;