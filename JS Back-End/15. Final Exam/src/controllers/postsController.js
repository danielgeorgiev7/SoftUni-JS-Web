const router = require('express').Router();
const postsService = require('../services/postsService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/dashboard', async (req, res) => {
    const posts = await postsService.getAll().lean();
    res.render('posts/dashboard', { posts });
});

router.get('/create', (req, res) => {
    res.render('posts/create');
});

router.post('/create', async (req, res) => {
    try {
        const data = {
            owner: req.user._id,
            ...req.body
        };
        await postsService.create(data);
        res.redirect('/posts/dashboard');
    } catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('posts/create', { error: message, ...req.body });
    }
});

router.get('/details/:postId', (req, res) => {
});

router.get('/edit/:postId', (req, res) => {
});

router.get('/delete/:postId', (req, res) => {
});

router.get('/like/:postId', (req, res) => {
});

router.get('/search', (req, res) => {
    res.render('posts/search');
});


module.exports = router;