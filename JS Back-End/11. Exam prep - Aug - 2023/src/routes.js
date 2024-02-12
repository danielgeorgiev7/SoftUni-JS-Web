const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const postsController = require('./controllers/postsController');
const profileController = require('./controllers/profileController');

router.use(homeController);
router.use('/auth', authController);
router.use('/posts', postsController);
router.use(profileController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;