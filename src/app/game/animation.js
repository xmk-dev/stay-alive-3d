import { ANIMATION, HERO, GROUND } from '../../config';
import { updateObstacles, hasCollided } from './obstacles';
import { round } from '../../utils/math-util';

const animationState = {
  id: -1,
  collided: false,
  timeSinceObstaclesUpdate: 0,
  runSpeed: ANIMATION.RUN_SPEED,
  lastGroundZ: GROUND.Z - GROUND.DEPTH / 2,
};

export const heroAnimation = async (controller, heroScene, heroMixer, timeDelta) => {
  heroMixer.update(timeDelta);

  if (controller.jump) {
    heroScene.position.y += ANIMATION.HERO_SHIFT_SPEED;
  }

  const heroPositionY = heroScene.position.y;

  if (heroPositionY > HERO.Y) {
    if (heroPositionY >= ANIMATION.END_JUMP_THRESHOLD) {
      controller.endJump();
    }

    const jumpMultiplier = controller.jump
      ? ANIMATION.JUMP_GRAVITY_MULTIPLIER
      : ANIMATION.NO_GRAVITY_MULTIPLIER;

    const goDownMultipier = controller.goDown && !controller.jump
      ? ANIMATION.GO_DOWN_GRAVITY_MULTIPLIER
      : ANIMATION.NO_GRAVITY_MULTIPLIER;

    heroScene.position.y -= ANIMATION.HERO_SHIFT_SPEED * jumpMultiplier * goDownMultipier;
  } else {
    controller.endGoDown();
    controller.enableJump();
  }

  const heroPositionX = heroScene.position.x;
  if (round(heroPositionX, 1) !== round(controller.lane, 1)) {
    const sideSign = controller.lane > heroPositionX ? 1 : -1;
    heroScene.position.x += sideSign * ANIMATION.HERO_CHANGE_LANE_SPEED;
  }

  heroScene.position.z -= animationState.runSpeed;

  if (animationState.collided) {
    heroScene.visible = false;
    setTimeout(() => {
      heroScene.visible = true;
      animationState.collided = false;
    }, ANIMATION.COLLISION_TIMEOUT_MS);
  }
};

export const obstaclesAnimation = async (
  obstacles, heroScene, scene, score, timeDelta, endGameCallback,
) => {
  animationState.timeSinceObstaclesUpdate += timeDelta;

  if (animationState.timeSinceObstaclesUpdate > ANIMATION.OBSTACLES_UPDATE_INTERVAL) {
    updateObstacles(obstacles, heroScene, scene);
    animationState.timeSinceObstaclesUpdate = 0;
  }

  if (animationState.collided) { return; }

  const collided = hasCollided(obstacles, heroScene);

  if (collided) {
    animationState.collided = true;
    score.decrementScore();
    if (!score.lifes) {
      endGameCallback(Math.round(score.value));
    }
  } else {
    score.incrementScore();
    animationState.runSpeed += ANIMATION.RUN_SPEED_INCREMENT;
  }
};

export const groundAnimation = async (ground, heroScene) => {
  const heroPositionZ = heroScene.position.z;

  if (Math.round(heroPositionZ) > animationState.lastGroundZ + ANIMATION.ADD_GROUND_THRESHOLD) {
    return;
  }

  ground.children = ground.children.filter((g) => g.position.z - GROUND.DEPTH < heroPositionZ);

  const lastGroundPiece = ground.children[0];
  const newGroundPiece = lastGroundPiece.clone();
  lastGroundPiece.position.set(0, 0, lastGroundPiece.position.z - GROUND.DEPTH);
  animationState.lastGroundZ -= GROUND.DEPTH;
  ground.add(newGroundPiece);
};

export const cameraAnimation = async (camera) => {
  camera.position.z -= animationState.runSpeed;
};

export const runAnimationLoop = async (props, endGameCallback) => {
  const {
    renderer, scene, camera, ground, score, hero, clock, controller, obstacles,
  } = props;
  const timeDelta = clock.getDelta();
  const heroScene = hero.gltf.scene;
  const heroMixer = hero.mixer;

  await obstaclesAnimation(obstacles, heroScene, scene, score, timeDelta, endGameCallback);
  heroAnimation(controller, heroScene, heroMixer, timeDelta);
  groundAnimation(ground, heroScene);
  cameraAnimation(camera);

  requestAnimationFrame(() => runAnimationLoop(props, endGameCallback));
  renderer.render(scene, camera);
};
