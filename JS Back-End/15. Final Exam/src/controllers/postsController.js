const router = require('express').Router();

router.get('/dashboard', (req, res) => {
    res.render('posts/dashboard');
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