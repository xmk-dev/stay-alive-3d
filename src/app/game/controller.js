import {
  CONTROLLER, LANES, KEYS_CODES, EVENTS,
} from './game-config';

export const handleKeyDown = (controller) => {
  window.addEventListener(EVENTS.KEY_DOWN, (e) => {
    e.preventDefault();
    switch (e.code) {
      case KEYS_CODES.ARROW_UP:
        return controller.startJump();
      case KEYS_CODES.ARROW_LEFT:
        if (controller.lane === LANES.LEFT) {
          return null;
        }
        if (controller.lane === LANES.CENTER) {
          controller.lane = LANES.LEFT;
        }
        if (controller.lane === LANES.RIGHT) {
          controller.lane = LANES.CENTER;
        }
        return null;
      case KEYS_CODES.ARROW_DOWN:
        return controller.startGoDown();
      case KEYS_CODES.ARROW_RIGHT:
        if (controller.lane === LANES.RIGHT) {
          return null;
        }
        if (controller.lane === LANES.CENTER) {
          controller.lane = LANES.RIGHT;
        }
        if (controller.lane === LANES.LEFT) {
          controller.lane = LANES.CENTER;
        }
        return null;
      default:
        return null;
    }
  });
};


export default () => {
  const controller = {
    jump: CONTROLLER.JUMP,
    lane: CONTROLLER.LANE,
    goDown: CONTROLLER.GO_DOWN,
    canJump: CONTROLLER.COULD_JUMP,
    startJump: () => {
      if (!controller.canJump) {
        return;
      }
      controller.jump = true;
      controller.canJump = false;
    },
    endJump: () => {
      controller.jump = false;
    },
    enableJump: () => {
      controller.canJump = true;
    },
    startGoDown: () => {
      controller.goDown = true;
    },
    endGoDown: () => {
      controller.goDown = false;
    },
  };

  handleKeyDown(controller);

  return controller;
};
