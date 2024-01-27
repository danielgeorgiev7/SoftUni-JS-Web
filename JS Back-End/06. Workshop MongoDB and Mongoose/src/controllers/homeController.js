const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/', async (req, res) => {
    const movies = await movieService.getAll().lean();
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', (req, res) => {
    const movies = movieService.search(req.query);
    res.render('search', { movies, ...req.query });
});

router.all('/404', (req, res) => {
    res.render('404');
})

module.exports = router;
