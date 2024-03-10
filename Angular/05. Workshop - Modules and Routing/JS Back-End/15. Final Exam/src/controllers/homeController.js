const router = require('express').Router();
const postsService = require('../services/postsService');

router.get('/', async (req, res) => {
    const posts = await postsService.getLast(3).lean();
    res.render('home', { posts });
});

module.exports = router;