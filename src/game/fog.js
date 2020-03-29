const { FogExp2 } = require('three');
const { FOG: { COLOR, DENSITY } } = require('./constants');

const addFog = (scene) => {
  const fog = new FogExp2(COLOR, DENSITY);
  scene.fog = fog;
};

module.exports = { addFog };
