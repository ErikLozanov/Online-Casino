const mongoose = require('mongoose');


const rouletteSchema = new mongoose.Schema({
    passedNumber: {
        type: Number,
        // required: [true, 'passedNumber is required!'],
    }
});


const Roulette = mongoose.model('Roulette', rouletteSchema);

module.exports = Roulette;