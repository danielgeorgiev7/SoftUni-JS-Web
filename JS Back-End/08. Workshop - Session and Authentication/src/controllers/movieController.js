const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/movie/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/movie/create', isAuth, async (req, res) => {
    const newMovie = {
        ...req.body,
        owner: req.user._id
    }

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
    const isOwner = movie.owner == req.user._id;

    // const casts = await castService.getByIds(movie.casts).lean();

    movie.ratingArr = new Array(Number(movie.rating)).fill(true);
    res.render('movie/details', { ...movie, isOwner });
});

router.get('/details/:movieId/attach', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();
    res.render('movie/attach', { ...movie, casts });
});


router.post('/details/:movieId/attach', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attach(movieId, castId);

    res.redirect(`/details/${movieId}/attach`);
});

router.get('/movie/:movieId/edit', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();

    res.render('movie/edit', { ...movie });
})

module.exports = router;
