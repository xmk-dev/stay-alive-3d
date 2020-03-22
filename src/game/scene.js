const { Scene, Color } = require('three');
const { SCENE: { BACKGROUND_COLOR } } = require('./constants');

const createScene = () => {
  const scene = new Scene();
  scene.backterrain = new Color(BACKGROUND_COLOR);
  return scene;
};

module.exports = { createScene };
