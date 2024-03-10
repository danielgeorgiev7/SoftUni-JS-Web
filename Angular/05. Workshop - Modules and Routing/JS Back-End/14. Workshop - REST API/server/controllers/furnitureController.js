const router = require('express').Router();
const furnitureService = require('../services/furnitureService');

router.get('/catalog', async (req, res) => {
    const furniture = await furnitureService.getAll();
    res.json(furniture);
});

router.post('/catalog', async (req, res) => {
    const furnitureData = req.body;
    const furniture = await furnitureService.create(furnitureData);
    res.json(furniture);
});

router.get('/catalog/:furnitureId', async (req, res) => {
    const furnitureId = req.params.furnitureId;
    const furniture = await furnitureService.getOne(furnitureId);
    res.json(furniture);
});

router.put('/catalog/:furnitureId', async (req, res) => {
    const furnitureId = req.params.furnitureId;
    const furniture = await furnitureService.update(furnitureId, req.body);
    res.json(furniture);
});

router.delete('/catalog/:furnitureId', async (req, res) => {
    const furnitureId = req.params.furnitureId;
    await furnitureService.delete(furnitureId);
    res.json({ ok: true });
});


module.exports = router;