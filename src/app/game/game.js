import { GAME_DOM_ELEMENT_ID } from './game-config';
import createResizeHandler from '../../utils/resize-handler-util';
import { createObstacles } from './obstacles';
import { runAnimationLoop } from './animation';
import createController from './controller';
import createGround from '../../models/ground';
import createRenderer from './renderer';
import createHero from '../../models/hero';
import createRock from '../../models/rock';
import createTree from '../../models/tree';
import createCamera from './camera';
import createLights from './lights';
import createScene from './scene';
import createClock from './clock';
import createScore from './score';
import { ROUTES, LOCAL_STORAGE_USER_ID_KEY } from '../../config';
import { redirectOnSameSite } from '../../utils/window-util';
import { saveScore } from '../../api/score-api';

const init = async (root) => {
  const clock = createClock();
  const ground = createGround();
  const hero = await createHero();
  const score = createScore(root);
  const camera = createCamera(root);
  const renderer = createRenderer(root);
  const { sceneLight, sunLight } = createLights();
  const scene = createScene([sceneLight, sunLight, hero.gltf.scene, ground]);
  const obstacles = createObstacles([createRock, createTree], 50);

  const controller = createController(camera, renderer);
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

const endGame = async (scoreValue) => {
  const id = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);
  await saveScore(id, scoreValue);
  redirectOnSameSite(ROUTES.SCORE);
};

export const runGame = async () => {
  const props = await init(document.getElementById(GAME_DOM_ELEMENT_ID));

  await runAnimationLoop(props, endGame);
};
