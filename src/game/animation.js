import { Math as ThreeMath } from 'three';
import { ANIMATION, HERO } from './constants';
import { updateObstacles, addObstacle, hasCollided } from './obstacles';

const animationState = {
  id: -1,
  jumpValue: 0,
  rollingSpeed: 0,
  obstaclesAddSpeed: 0,
};

export const heroAnimation = (controller, hero, clock) => {
  const shiftSpeed = 3;

  if (animationState.jumpValue >= ANIMATION.JUMP_VALUE) {
    controller.endJump();
  }

  if (controller.jump) {
    animationState.jumpValue += ANIMATION.BOUNCE_VALUE;
  }

  if (controller.goDown) {
    if (hero.position.y > HERO.Y) {
      animationState.jumpValue -= ANIMATION.GRAVITY;
    } else {
      controller.endGoDown();
    }
  }

  if (hero.position.y <= HERO.Y) {
    controller.enableJump();
    animationState.jumpValue = Math.random() * ANIMATION.BOUNCE_VALUE + ANIMATION.GRAVITY;
  }

  hero.position.y += animationState.jumpValue;
  animationState.jumpValue -= ANIMATION.GRAVITY;
  hero.rotation.x -= ANIMATION.HERO_SPEED;
  hero.position.x = ThreeMath.lerp(
    hero.position.x,
    controller.lane,
    shiftSpeed * clock.getDelta(),
  );
};

export const globeAnimation = (globe) => {
  globe.rotation.x += ANIMATION.GLOBE_SPEED;
};

const obstaclesAnimation = (clock, rocks, globe, hero) => {
  if (clock.getElapsedTime() > ANIMATION.OBSTACLES_UPDATE_INTERVAL) {
    clock.start();

    // TODO: split adding from removing in different intervals
    addObstacle(rocks, globe);
    if (Math.random() > 0.4) {
      addObstacle(rocks, globe);
    }

    updateObstacles(rocks, globe, hero);
  }
};

const handleCollisions = (rocks, hero, score) => {
  const collisions = [hasCollided(rocks, hero)];
  collisions.forEach((collision) => {
    if (!collision) { return; }
    score.decrementScore();
  });
};

const handleGameOver = (score, endGameCallback) => {
  if (score.lifes === 0) {
    cancelAnimationFrame(animationState.id);
    endGameCallback();
  }
};

export const runAnimationLoop = (props, endGameCallback) => {
  const {
    renderer, scene, camera, globe, hero, clock, controller, rocks, score,
  } = props;

  handleGameOver(score, endGameCallback);
  globeAnimation(globe);
  heroAnimation(controller, hero, clock);
  obstaclesAnimation(clock, rocks, globe, hero);
  handleCollisions(rocks, hero, score);

  score.incrementScore();

  animationState.id = requestAnimationFrame(() => runAnimationLoop(props));
  renderer.render(scene, camera);
};
