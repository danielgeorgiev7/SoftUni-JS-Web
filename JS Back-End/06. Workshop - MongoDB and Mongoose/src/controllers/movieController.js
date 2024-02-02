const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');

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
    const movie = await movieService.getOne(movieId).lean();

    // const casts = await castService.getByIds(movie.casts).lean();

    movie.ratingArr = new Array(Number(movie.rating)).fill(true);
    res.render('details', movie);
});

router.get('/details/:movieId/attach', async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();
    res.render('movie/attach', { ...movie, casts });
});


router.post('/details/:movieId/attach', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attach(movieId, castId);

    res.redirect(`/details/${movieId}/attach`);
});

module.exports = router;
