const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const postsController = require('./controllers/postsController');

router.use(homeController);
router.use('/auth', authController);
router.use('/posts', postsController);

router.get('*', async (req, res) => {
    res.render('404');
});

module.exports = router;