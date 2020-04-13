import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls';
import {
  CONTROLLER, LANES, KEYS_CODES, EVENTS,
} from './constants';

export const handleKeyDown = (root, controller) => {
  root.addEventListener(EVENTS.KEY_DOWN, (e) => {
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
        return controller.startJump();
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
        return controller.startJump();
      case KEYS_CODES.SPACE:
        return controller.startShooting();
      default:
        return null;
    }
  });
};


export const createController = (root, camera, renderer) => {
  // eslint-disable-next-line no-new
  new OrbitControls(camera, renderer.domElement);
  // eslint-disable-next-line no-new
  new DeviceOrientationControls(camera, renderer.domElement);

  const controller = {
    jump: CONTROLLER.JUMP,
    lane: CONTROLLER.LANE,
    shoot: CONTROLLER.SHOOT,
    goDown: CONTROLLER.GO_DOWN,
    couldJump: CONTROLLER.COULD_JUMP,
    startJump: () => {
      if (!controller.couldJump) {
        return;
      }
      controller.jump = true;
      controller.couldJump = false;
    },
    endJump: () => {
      controller.jump = false;
    },
    enableJump: () => {
      controller.couldJump = true;
    },
    startGoDown: () => {
      controller.goDown = true;
    },
    endGoDown: () => {
      controller.goDown = false;
    },
    startShooting: () => {
      controller.shoot = true;
    },
    endShooting: () => {
      controller.shoot = false;
    },
  };

  handleKeyDown(root, controller);

  return controller;
};
