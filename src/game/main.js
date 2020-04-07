const { createController } = require('./controller');
const { attachResizeListener } = require('./resize');
const { runAnimationLoop } = require('./animation');
const { createRenderer } = require('./renderer');
const { createCamera } = require('./camera');
const { createScene } = require('./scene');
const { createClock } = require('./clock');
const { createScore } = require('./score');
const { addLights } = require('./lights');
const { addGlobe } = require('./globe');
const { addHero } = require('./hero');
const { addFog } = require('./fog');

const init = (root) => {
  const scene = createScene();
  const clock = createClock();
  const hero = addHero(scene);
  const globe = addGlobe(scene);
  const score = createScore(root);
  const camera = createCamera(root);
  const renderer = createRenderer(root);
  const controller = createController(root, camera, renderer);

  // addFog(scene);
  addLights(scene);
  attachResizeListener(root, renderer, camera);

  return {
    controller,
    renderer,
    camera,
    clock,
    scene,
    globe,
    score,
    hero,
  };
};

const runGame = (root) => {
  const game = init(root);

  runAnimationLoop(game);
};

module.exports = {
  runGame,
};
