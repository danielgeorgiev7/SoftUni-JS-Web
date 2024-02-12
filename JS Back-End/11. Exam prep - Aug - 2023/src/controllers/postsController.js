const postsService = require('../services/postsService');
const { getErrorMessage } = require('../utils/errorUtils');
const { guestGuard } = require('../middlewares/guards');
const router = require('express').Router();

router.get('/all', async (req, res) => {
    const posts = await postsService.getAll();
    res.render('posts/all-posts', { posts });
});

router.get('/create', guestGuard, (req, res) => {
    res.render('posts/create');
});

router.post('/create', guestGuard, async (req, res) => {
    const data = {
        ...req.body,
        owner: req.user._id
    };

    try {
        await postsService.create(data);
        res.redirect('/posts/all');
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('posts/create', { error: message, ...req.body })
    }
});

router.get('/details/:postId', async (req, res) => {
    try {
        const post = await postsService
            .getOne(req.params.postId,
                { path: 'votes', select: 'email' },
                { path: 'owner', select: 'firstName lastName' }
            );
        const isOwner = post.owner._id == req.user?._id;
        const ownerFullname = `${post.owner.firstName} ${post.owner.lastName}`
        const hasVoted = post.votes.filter((voter) => voter._id == req.user?._id);
        const votesCount = post.votes.length;
        const votersEmailsArr = [];
        post.votes.map(voter => votersEmailsArr.push(voter.email));
        const votersEmails = votersEmailsArr.join(', ');
        res.render('posts/details', { ...post, isOwner, ownerFullname, hasVoted, votesCount, votersEmails });
    }
    catch (err) {
        res.redirect('/posts/all');
    }
});

router.get('/edit/:postId', guestGuard, async (req, res) => {
    const post = await postsService.getOne(req.params.postId);
    try {
        res.render('posts/edit', post);
    }
    catch (err) {
        res.redirect('/posts/all');
    }
});

router.post('/edit/:postId', guestGuard, async (req, res) => {
    try {
        await postsService.updateOne(req.params.postId, req.body);
        res.redirect(`/posts/details/${req.params.postId}`);
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('posts/edit', { error: message, ...req.body });
    }
});

router.get('/vote/:postId', guestGuard, async (req, res) => {
    try {
        await postsService.updateOne(req.params.postId, { $push: { votes: req.user._id } })
        res.redirect(`/posts/details/${req.params.postId}`);
    }
    catch (err) {
        res.redirect('/posts/all');

    }
});


router.get('/delete/:postId', guestGuard, async (req, res) => {
    try {
        const post = await postsService.getOne(req.params.postId);
        if (post.owner._id != req.user._id) throw new Error('Unauthorized');

        await postsService.deleteOne(req.params.postId)
            .then(res.redirect('/posts/all'));
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('home', { error: message });
    }
});

module.exports = router;