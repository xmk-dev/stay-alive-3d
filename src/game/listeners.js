/* eslint-disable no-console */
const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls');
const { DeviceOrientationControls } = require('three/examples/jsm/controls/DeviceOrientationControls');

const { EVENTS: { RESIZE, KEY_DOWN }, KEYS_CODES } = require('./constants');

const attachListeners = (root, { renderer, camera }) => {
  const orbitControls = new OrbitControls(camera, renderer.domElement); // TODO: disable it after test
  const deviceOrientationControls = new DeviceOrientationControls(camera, renderer.domElement);

  window.addEventListener(RESIZE, () => {
    const height = root.offsetHeight;
    const width = root.offsetWidth;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  window.addEventListener(KEY_DOWN, (e) => {
    e.preventDefault();
    switch (e.code) {
      case KEYS_CODES.ARROW_UP:
      case KEYS_CODES.KEY_W:
        console.log('move player forwards');
        return;

      case KEYS_CODES.ARROW_LEFT:
      case KEYS_CODES.KEY_A:
        console.log('move player left');
        return;

      case KEYS_CODES.ARROW_DOWN:
      case KEYS_CODES.KEY_S:
        console.log('move player backwards');
        return;

      case KEYS_CODES.ARROW_RIGHT:
      case KEYS_CODES.KEY_D:
        console.log('move player right');
        return;

      case KEYS_CODES.SPACE:
        console.log('shoot');
        return;

      default:
        console.log(e.code);
    }
  });
};

module.exports = { attachListeners };
