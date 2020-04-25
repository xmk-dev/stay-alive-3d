import { Math as ThreeMath } from 'three';
import { round } from 'lodash';
import { ANIMATION, HERO, GROUND } from '../config';
import { updateObstacles, hasCollided } from './obstacles';

const SPEED = 0.08;
const ADD_GROUND_OFFSET = 300;
const animationState = {
  id: -1,
  timeSinceObstaclesUpdate: 0,
  lastGroundZ: GROUND.Z - GROUND.DEPTH / 2,
};

export const heroAnimation = async (controller, hero, timeDelta) => {
  // TODO: Move to constants
  const shiftSpeed = 0.04;
  const heroScene = hero.gltf.scene;

  hero.mixer.update(timeDelta);

  if (heroScene.position.y >= 0.1) {
    controller.endJump();
  }

  if (controller.jump) {
    heroScene.position.y += shiftSpeed;
  }

  if (heroScene.position.y > HERO.Y) {
    const jumpMultiplier = controller.jump ? 0.2 : 1;
    const goDownMultipier = controller.goDown && !controller.jump ? 2 : 1;
    heroScene.position.y -= shiftSpeed * jumpMultiplier * goDownMultipier;
  } else {
    controller.endGoDown();
    controller.enableJump();
  }

  if (round(heroScene.position.x, 1) !== controller.lane) {
    const sideSign = controller.lane > heroScene.position.x ? 1 : -1;
    heroScene.position.x += sideSign * shiftSpeed;
  }

  heroScene.position.z -= SPEED;
};

export const obstaclesAnimation = (obstacles, hero, scene, score, timeDelta) => {
  animationState.timeSinceObstaclesUpdate += timeDelta;

  const heroScene = hero.gltf.scene;

  if (animationState.timeSinceObstaclesUpdate > ANIMATION.OBSTACLES_UPDATE_INTERVAL) {
    updateObstacles(obstacles, heroScene, scene);
    animationState.timeSinceObstaclesUpdate = 0;
  }

  const collided = hasCollided(obstacles, heroScene);

  if (collided) {
    score.decrementScore();
  }
};

export const groundAnimation = (ground, hero) => {
  const heroScene = hero.gltf.scene;

  if (round(heroScene.position.z) > animationState.lastGroundZ + ADD_GROUND_OFFSET) { return; }

  ground.children = ground.children.filter((groundPiece) => groundPiece.position.z - GROUND.DEPTH < heroScene.position.z);

  const lastGroundPiece = ground.children[0];
  const newGroundPiece = lastGroundPiece.clone();
  lastGroundPiece.position.set(0, 0, lastGroundPiece.position.z - GROUND.DEPTH);
  animationState.lastGroundZ -= GROUND.DEPTH;
  ground.add(newGroundPiece);
};

export const cameraAnimation = (camera) => {
  camera.position.z -= SPEED;
};

export const runAnimationLoop = (props) => {
  const {
    renderer, scene, camera, ground, score, hero, clock, controller, obstacles,
  } = props;
  const timeDelta = clock.getDelta();

  score.incrementScore();

  cameraAnimation(camera);
  groundAnimation(ground, hero);
  heroAnimation(controller, hero, timeDelta);
  obstaclesAnimation(obstacles, hero, scene, score, timeDelta);

  animationState.id = requestAnimationFrame(() => runAnimationLoop(props));
  renderer.render(scene, camera);
};
