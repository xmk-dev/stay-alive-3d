const { Clock } = require('three');

const createClock = () => {
  const clock = new Clock();
  clock.start();
  return clock;
};

module.exports = { createClock };
