const { createRenderer } = require('./renderer');
const { createCamera } = require('./camera');
const { createScene } = require('./scene');
const { addLights } = require('./lights');
const { addFog } = require('./fog');
const { attachListeners } = require('./listeners');
const { runAnimationLoop } = require('./animation');
const { addHero } = require('./hero');
const { addGlobe } = require('./globe');

const init = (root) => {
  const scene = createScene();
  const camera = createCamera(root);
  const renderer = createRenderer(root);

  addLights(scene);
  addFog(scene);

  const globe = addGlobe(scene);
  const hero = addHero(scene);

  return {
    renderer, camera, scene, globe, hero,
  };
};

const runGame = (root) => {
  const game = init(root);

  game.camera.position.set(0, -30, 18);

  attachListeners(root, game);
  runAnimationLoop(game);
};

module.exports = {
  runGame,
};
