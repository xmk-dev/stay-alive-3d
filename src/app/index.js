import createResizeHandler from '../utils/resize-handler';
import { createObstacles } from './obstacles';
import { runAnimationLoop } from './animation';
import createController from './controller';
import createGround from '../models/ground';
import createRenderer from './renderer';
import createHero from '../models/hero';
import createRock from '../models/rock';
import createCamera from './camera';
import createLights from './lights';
import createScene from './scene';
import createClock from './clock';
import createScore from './score';


export const init = async (root) => {
  const clock = createClock();
  const ground = createGround();
  const hero = await createHero();
  const score = createScore(root);
  const camera = createCamera(root);
  const renderer = createRenderer(root);
  const { sceneLight, sunLight } = createLights();
  const scene = createScene([sceneLight, sunLight, hero.gltf.scene, ground]);
  const obstacles = createObstacles([createRock], 50);

  const controller = createController(root, camera, renderer);
  createResizeHandler(root, renderer, camera);

  return {
    controller,
    obstacles,
    renderer,
    camera,
    ground,
    clock,
    scene,
    score,
    hero,
  };
};

export const runGame = async (root) => {
  const props = await init(root);

  runAnimationLoop(props);
};
