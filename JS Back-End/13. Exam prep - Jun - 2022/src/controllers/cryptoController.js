const router = require('express').Router();
const cryptoController = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/listings', (req, res) => {
    res.render('crypto/catalog');
});

router.get('/create', (req, res) => {
    res.render('crypto/create');
});

router.post('/create', async (req, res) => {
    try {
        const data = {
            ...req.body,
            owner: req.user._id,
        }

        await cryptoController.create(data);
        res.render('crypto/catalog');
    }
    catch (err) {
        console.log(err);
        const message = getErrorMessage(err);
        res.render('crypto/create', { error: message, ...req.body });
    }
});

router.get('/search', (req, res) => {
    res.render('crypto/search');
});

module.exports = router;