const router = require('express').Router();
const postService = require('../services/postService');

router.get('/', (req, res) => {
    const lastPosts = postService.getLast(3);
    res.render('home');
});

module.exports = router;