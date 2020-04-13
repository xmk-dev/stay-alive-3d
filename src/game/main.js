import { createController } from './controller';
import { attachResizeListener } from './resize';
import { runAnimationLoop } from './animation';
import { createObstacles } from './obstacles';
import { createRenderer } from './renderer';
import { createCamera } from './camera';
import { createScene } from './scene';
import { createClock } from './clock';
import { createScore } from './score';
import { addLights } from './lights';
import { createRock } from './rock';
import { addGlobe } from './globe';
import { addHero } from './hero';
import { addFog } from './fog';

export const init = (root) => {
  const scene = createScene();
  const clock = createClock();
  const hero = addHero(scene);
  const globe = addGlobe(scene);
  const score = createScore(root);
  const camera = createCamera(root);
  const renderer = createRenderer(root);
  const rocks = createObstacles(createRock);
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
    rocks,
    hero,
  };
};

export const runGame = (root) => {
  const game = init(root);

  runAnimationLoop(game);
};
