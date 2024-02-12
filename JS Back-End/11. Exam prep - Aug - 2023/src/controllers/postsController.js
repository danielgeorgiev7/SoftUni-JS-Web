const postsService = require('../services/postsService');
const { getErrorMessage } = require('../utils/errorUtils');
const router = require('express').Router();

router.get('/all', async (req, res) => {
    const creatures = await postsService.getAll();
    res.render('posts/all-posts', { creatures });
});

router.get('/create', (req, res) => {
    res.render('posts/create');
});

router.post('/create', async (req, res) => {
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
        const creature = await postsService
            .getOne(req.params.postId,
                { path: 'votes', select: 'email' },
                { path: 'owner', select: 'firstName lastName' }
            );
        const isOwner = creature.owner._id == req.user._id;
        const ownerFullname = `${creature.owner.firstName} ${creature.owner.lastName}`
        const hasVoted = creature.votes.filter((voter) => voter._id == req.user._id);
        const votesCount = creature.votes.length;
        const votersEmails = [];
        creature.votes.map(voter => votersEmails.push(voter.email));
        votersEmails.join(', ');
        res.render('posts/details', { ...creature, isOwner, ownerFullname, hasVoted, votesCount, votersEmails });
    }
    catch (err) {
        //TODO render to /all when image validation is added
    }
});

router.get('/edit/:postId', async (req, res) => {
    const creature = await postsService.getOne(req.params.postId);
    try {
        res.render('posts/edit', creature);
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('posts/all', { error: message, ...creature });
    }
});

router.post('/edit/:postId', async (req, res) => {
    try {
        await postsService.updateOne(req.params.postId, req.body);
        res.redirect(`/posts/details/${req.params.postId}`);
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('posts/edit', { error: message, ...req.body });
    }
});

router.get('/vote/:postId', async (req, res) => {
    try {
        const creature = await postsService.updateOne(req.params.postId, { $push: { votes: req.user._id } })
        res.redirect(`/posts/details/${req.params.postId}`);
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('posts/details', { error: message, ...creature });
    }
});


router.get('/delete/:postId', async (req, res) => {
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