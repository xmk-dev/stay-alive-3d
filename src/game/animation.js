const {
  Math: { lerp },
} = require('three');
const {
  ANIMATION: {
    GLOBE_SPEED,
    HERO_SPEED,
    GRAVITY,
    TREE_CREATE_INTERVAL,
    JUMP_VALUE,
    BOUNCE_VALUE,
  },
  HERO: { Y: HERO_Y },
} = require('./constants');
const { addPathTree } = require('./tree');

const animation = {
  jumpValue: 0,
};

const heroAnimation = (controller, hero, clock) => {
  const shiftSpeed = 3;
  if (animation.jumpValue >= JUMP_VALUE) {
    controller.endJump();
  }
  if (controller.jump) {
    animation.jumpValue += BOUNCE_VALUE;
  }
  if (controller.goDown) {
    if (hero.position.y > HERO_Y) {
      animation.jumpValue -= GRAVITY;
    } else {
      controller.endGoDown();
    }
  }
  if (hero.position.y <= HERO_Y) {
    controller.enableJump();
    animation.jumpValue = Math.random() * BOUNCE_VALUE + GRAVITY;
  }
  hero.position.y += animation.jumpValue;
  animation.jumpValue -= GRAVITY;
  hero.position.x = lerp(
    hero.position.x,
    controller.lane,
    shiftSpeed * clock.getDelta(),
  );
  hero.rotation.x -= HERO_SPEED;
};

const globeAnimation = (globe) => {
  globe.rotation.x += GLOBE_SPEED;
};

const runAnimationLoop = (props) => {
  const {
    renderer, scene, camera, globe, hero, clock, controller,
  } = props;

  heroAnimation(controller, hero, clock);
  globeAnimation(globe);


  if (clock.getElapsedTime() > TREE_CREATE_INTERVAL) {
    clock.start();
    addPathTree(globe, hero);
  }

  // doTreeLogic();
  // doExplosionLogic();

  requestAnimationFrame(() => runAnimationLoop(props));
  renderer.render(scene, camera);
};

module.exports = { runAnimationLoop };
