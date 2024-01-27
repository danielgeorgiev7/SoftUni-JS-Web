const router = require('express').Router();
const movieService = require('../services/movieService');

router.get('/movie/create', (req, res) => {
    res.render('create');
});

router.post('/movie/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);
    }
    catch (err) {
        console.log(err.message);
        res.redirect('/create');
    }

    res.redirect('/');
});

router.get('/details/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    movie.ratingArr = new Array(Number(movie.rating)).fill(true);

    res.render('details', movie);

});

module.exports = router;
