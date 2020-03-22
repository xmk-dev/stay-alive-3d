const { Fog } = require('three');
const { FOG: { COLOR, NEAR, FAR } } = require('./constants');

const addFog = (scene) => {
  const fog = new Fog(COLOR, NEAR, FAR);
  scene.fog = fog;
};

module.exports = { addFog };
