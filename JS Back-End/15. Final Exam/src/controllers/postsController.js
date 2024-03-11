const router = require('express').Router();
const { guestGuard } = require('../middlewares/guards');
const postsService = require('../services/postsService');
const searchService = require('../services/searchService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/dashboard', async (req, res) => {
    const posts = await postsService.getAll().lean();
    res.render('posts/dashboard', { posts });
});

router.get('/create', guestGuard, (req, res) => {
    res.render('posts/create');
});

router.post('/create', guestGuard, async (req, res) => {
    try {
        const data = {
            owner: req.user._id,
            ...req.body
        };
        await postsService.create(data);
        res.redirect('/posts/dashboard');
    } catch (err) {
        // console.log(err);
        const message = getErrorMessage(err);
        res.render('posts/create', { error: message, ...req.body });
    }
});

router.get('/details/:postId', async (req, res) => {
    try {
        const post = await postsService.getOne(req.params.postId).lean();
        const isOwner = post.owner == req.user?._id;
        const hasLiked = !!post.likedList.filter((likedPerson) => likedPerson._id == req.user?._id).length;
        res.render('posts/details', { ...post, isOwner, hasLiked });
    }
    catch (err) {
        // console.log(err);
        res.redirect('/posts/dashboard');
    }
});

router.get('/edit/:postId', guestGuard, async (req, res) => {
    const post = await postsService.getOne(req.params.postId).lean();
    try {
        res.render('posts/edit', post);
    }
    catch (err) {
        // console.log(err);
        res.redirect('/posts/dashboard');
    }
});

router.post('/edit/:postId', guestGuard, async (req, res) => {
    try {
        const post = await postsService.getOne(req.params.postId);
        if (post.owner != req.user._id) throw new Error('Unauthorized');

        await postsService.updateOne(req.params.postId, req.body);
        res.redirect(`/posts/details/${req.params.postId}`);
    }
    catch (err) {
        // console.log(err);
        const message = getErrorMessage(err);
        res.render('posts/edit', { error: message, ...req.body });
    }
});

router.get('/delete/:postId', guestGuard, async (req, res) => {
    try {
        const post = await postsService.getOne(req.params.postId);
        if (post.owner != req.user._id) throw new Error('Unauthorized');

        await postsService.deleteOne(req.params.postId)
        res.redirect('/posts/dashboard')
    }
    catch (err) {
        // console.log(err);
        const message = getErrorMessage(err);
        res.render('home', { error: message });
    }
});

router.get('/like/:postId', guestGuard, async (req, res) => {
    try {
        const post = await postsService.getOne(req.params.postId);
        if (post.owner == req.user._id) throw new Error('User cannot like own post');
        const hasLiked = !!post.likedList.filter((likedPerson) => likedPerson._id == req.user?._id).length;
        if (hasLiked) throw new Error('User has already liked this post');

        await postsService.updateOne(req.params.postId, { $push: { likedList: req.user._id } })
        res.redirect(`/posts/details/${req.params.postId}`);
    }
    catch (err) {
        // console.log(err);
        res.redirect('/posts/dashboard');
    }
});

router.get('/search', async (req, res) => {
    const { name } = req.query;
    const items = await searchService.search(name).lean();
    res.render('posts/search', { items, name });
});


module.exports = router;