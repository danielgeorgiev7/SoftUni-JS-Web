const router = require('express').Router();
const postsService = require('../services/postsService');

router.get('/', (req, res) => {
    const lastPosts = postsService.getLast(3);
    res.render('home');
});

module.exports = router;