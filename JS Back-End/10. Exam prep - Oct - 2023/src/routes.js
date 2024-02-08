const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const catalogController = require('./controllers/catalogController');

router.use(homeController);
router.use(catalogController);
router.use('/auth', authController);

module.exports = router;