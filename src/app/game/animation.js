import { ANIMATION, HERO, GROUND } from '../../config';
import { updateObstacles, hasCollided } from './obstacles';
import { round } from '../../utils/math-util';
import {
  playAnimation, playAnimationOnce, switchAnimation, stopAnimation,
} from '../../utils/animation-util';

const animationState = {
  id: -1,
  collided: false,
  timeSinceObstaclesUpdate: 0,
  runSpeed: ANIMATION.RUN_SPEED,
  lastGroundZ: GROUND.Z - GROUND.DEPTH / 2,
  heroAnimationName: '',
  isPerformingHeroRoll: false,
};

export const heroAnimation = async (controller, hero, timeDelta) => {
  hero.mixer.update(timeDelta);

  if (!animationState.heroAnimationName) {
    animationState.heroAnimationName = playAnimation(hero.animations.Run, true);
  }

  if (controller.jump) {
    hero.scene.position.y += ANIMATION.HERO_SHIFT_SPEED;
  }

  const heroPositionX = hero.scene.position.x;
  if (round(heroPositionX, 1) !== round(controller.lane, 1)) {
    const sideSign = controller.lane > heroPositionX ? 1 : -1;
    hero.scene.position.x += sideSign * ANIMATION.HERO_CHANGE_LANE_SPEED;
  }

  hero.scene.position.z -= animationState.runSpeed;

  if (animationState.collided) {
    hero.scene.visible = false;
    setTimeout(() => {
      hero.scene.visible = true;
      animationState.collided = false;
    }, ANIMATION.COLLISION_TIMEOUT_MS);
  }

  const heroPositionY = hero.scene.position.y;

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

    hero.scene.position.y -= ANIMATION.HERO_SHIFT_SPEED * jumpMultiplier * goDownMultipier;
  } else {
    if (!controller.canJump && !animationState.isPerformingHeroRoll) {
      animationState.isPerformingHeroRoll = true;
      animationState.heroAnimationName = await playAnimationOnce(hero.animations.Roll_sword);
      animationState.heroAnimationName = switchAnimation(
        hero.animations.Roll_sword, hero.animations.Run, true,
      );
    } else {
      animationState.isPerformingHeroRoll = false;
    }
    controller.endGoDown();
    controller.enableJump();
  }
};

export const obstaclesAnimation = async (
  obstacles, hero, scene, score, timeDelta, endGameCallback,
) => {
  animationState.timeSinceObstaclesUpdate += timeDelta;

  if (animationState.timeSinceObstaclesUpdate > ANIMATION.OBSTACLES_UPDATE_INTERVAL) {
    updateObstacles(obstacles, hero.scene, scene);
    animationState.timeSinceObstaclesUpdate = 0;
  }

  if (animationState.collided) { return; }

  const collided = hasCollided(obstacles, hero.scene);

  if (collided) {
    animationState.collided = true;
    score.decrementScore();
    if (!score.lifes) {
      setTimeout(async () => {
        score.displayGameOverDOM();
        hero.scene.visible = true;
        animationState.collided = false;
        animationState.runSpeed = 0;
        stopAnimation(hero.animations[animationState.heroAnimationName]);
        animationState.heroAnimationName = await playAnimationOnce(hero.animations.Run_swordAttack);
        endGameCallback(Math.round(score.value));
      }, ANIMATION.DEAD_ANIMATION_TIMEOUT);
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

  await obstaclesAnimation(obstacles, hero, scene, score, timeDelta, endGameCallback);
  heroAnimation(controller, hero, timeDelta);
  groundAnimation(ground, hero.scene);
  cameraAnimation(camera);

  requestAnimationFrame(() => runAnimationLoop(props, endGameCallback));
  renderer.render(scene, camera);
};
