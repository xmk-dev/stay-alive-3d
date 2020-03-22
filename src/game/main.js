const { createRenderer } = require('./renderer');
const { createCamera } = require('./camera');
const { createTerrain } = require('./terrain');
const { createScene } = require('./scene');
const { addLights } = require('./lights');
const { addFog } = require('./fog');
const { attachListeners } = require('./listeners');
const { runAnimationLoop } = require('./animation');

const init = (root) => {
  const renderer = createRenderer(root);
  const camera = createCamera(root);
  const scene = createScene();

  const terrain = createTerrain(scene);

  addLights(scene);
  addFog(scene);

  return {
    renderer, camera, scene, terrain,
  };
};

const runGame = (root) => {
  const game = init(root);

  attachListeners(root, game);
  runAnimationLoop(game);
};

module.exports = {
  runGame,
};
