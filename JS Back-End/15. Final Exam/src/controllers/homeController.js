const router = require('express').Router();

router.get('/', (req, res) => {
    const lastPosts = postsService.getLast(3);
    res.render('home');
});

module.exports = router;