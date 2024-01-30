const router = require('express').Router();

const rouletteManager = require('../managers/rouletteManager');

module.exports = router;


router.get('/roulette',async (req, res) => {

    const getNums = await rouletteManager.getPassedNumbers();

    res.json(getNums);
});

router.post('/roulette/:num', async (req, res) => {

    const num = await rouletteManager.addNumber(req.params)

    return num;
})

