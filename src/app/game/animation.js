import { round } from 'lodash';
import { ANIMATION, HERO, GROUND } from './game-config';
import { updateObstacles, hasCollided } from './obstacles';

const animationState = {
  id: -1,
  collided: false,
  timeSinceObstaclesUpdate: 0,
  lastGroundZ: GROUND.Z - GROUND.DEPTH / 2,
};

export const heroAnimation = async (controller, hero, timeDelta) => {
  const heroScene = hero.gltf.scene;

  hero.mixer.update(timeDelta);

  if (heroScene.position.y >= ANIMATION.END_JUMP_THRESHOLD) {
    controller.endJump();
  }

  if (controller.jump) {
    heroScene.position.y += ANIMATION.HERO_SHIFT_SPEED;
  }

  if (heroScene.position.y > HERO.Y) {
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

  if (round(heroScene.position.x, 1) !== controller.lane) {
    const sideSign = controller.lane > heroScene.position.x ? 1 : -1;
    heroScene.position.x += sideSign * ANIMATION.HERO_SHIFT_SPEED;
  }

  heroScene.position.z -= ANIMATION.RUN_SPEED;

  if (animationState.collided) {
    heroScene.visible = false;
    setTimeout(() => {
      heroScene.visible = true;
      animationState.collided = false;
    }, ANIMATION.COLLISION_TIMEOUT_MS);
  }
};

export const obstaclesAnimation = async (
  obstacles, hero, scene, score, timeDelta, endGameCallback,
) => {
  animationState.timeSinceObstaclesUpdate += timeDelta;

  const heroScene = hero.gltf.scene;

  if (animationState.timeSinceObstaclesUpdate > ANIMATION.OBSTACLES_UPDATE_INTERVAL) {
    updateObstacles(obstacles, heroScene, scene);
    animationState.timeSinceObstaclesUpdate = 0;
  }

  const collided = hasCollided(obstacles, heroScene);

  if (collided) {
    score.decrementScore();
    animationState.collided = true;
    if (!score.lifes) {
      await endGameCallback(round(score.value));
    }
  }
};

export const groundAnimation = (ground, hero) => {
  const heroScene = hero.gltf.scene;

  if (round(heroScene.position.z) > animationState.lastGroundZ + ANIMATION.ADD_GROUND_THRESHOLD) {
    return;
  }

  ground.children = ground.children.filter(
    (groundPiece) => groundPiece.position.z - GROUND.DEPTH < heroScene.position.z,
  );

  const lastGroundPiece = ground.children[0];
  const newGroundPiece = lastGroundPiece.clone();
  lastGroundPiece.position.set(0, 0, lastGroundPiece.position.z - GROUND.DEPTH);
  animationState.lastGroundZ -= GROUND.DEPTH;
  ground.add(newGroundPiece);
};

export const cameraAnimation = (camera) => {
  camera.position.z -= ANIMATION.RUN_SPEED;
};

export const runAnimationLoop = async (props, endGameCallback) => {
  const {
    renderer, scene, camera, ground, score, hero, clock, controller, obstacles,
  } = props;
  const timeDelta = clock.getDelta();

  score.incrementScore();

  await obstaclesAnimation(obstacles, hero, scene, score, timeDelta, endGameCallback);
  heroAnimation(controller, hero, timeDelta);
  groundAnimation(ground, hero);
  cameraAnimation(camera);

  animationState.id = requestAnimationFrame(() => runAnimationLoop(props, endGameCallback));
  renderer.render(scene, camera);
};
