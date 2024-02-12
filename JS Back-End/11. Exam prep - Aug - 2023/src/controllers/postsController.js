const router = require('express').Router();

router.get('/all', (req, res) => {
    res.render('posts/all-posts');
});

router.get('/create', (req, res) => {
    res.render('posts/create');
});

module.exports = router;