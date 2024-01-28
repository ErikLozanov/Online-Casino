const router = require('express').Router();

const userController = require('./controllers/userController');
const rouletteController = require('./controllers/rouletteController');

router.use('/users', userController);
router.use('/games', rouletteController);

module.exports = router;