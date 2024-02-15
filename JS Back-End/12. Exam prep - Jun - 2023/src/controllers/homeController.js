const router = require('express').Router();
const postService = require('../services/postService');

router.get('/', async (req, res) => {
    const lastPosts = await postService.getLast(3).lean();
    res.render('home', { lastPosts });
});

module.exports = router;