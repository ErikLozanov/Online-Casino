const Roulette = require('../models/Roulette');

exports.addNumber = async(passedNumber) => {
  const createdNum =  await Roulette.create(passedNumber);

  return createdNum;
}

exports.getPassedNumbers = async() => {
    const allNums = await Roulette.find();

    return allNums
}

