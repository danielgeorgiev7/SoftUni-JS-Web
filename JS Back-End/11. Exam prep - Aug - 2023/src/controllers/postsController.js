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

    console.log(req.body);
    try {
        await postsService.create(data);
        res.redirect('/posts/all');
    }
    catch (err) {
        const message = getErrorMessage(err);
        res.render('posts/create', { error: message, ...req.body })
    }
});

module.exports = router;