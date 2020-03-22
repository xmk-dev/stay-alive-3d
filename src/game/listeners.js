/* eslint-disable no-console */
const { EVENTS: { RESIZE, KEY_DOWN }, KEYS_CODES } = require('./constants');

const attachListeners = (root, { renderer, camera }) => {
  window.addEventListener(RESIZE, () => {
    const height = root.offsetHeight;
    const width = root.offsetWidth;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  window.addEventListener(KEY_DOWN, (e) => {
    e.preventDefault();
    switch (e.code) {
      case KEYS_CODES.ARROW_UP:
      case KEYS_CODES.KEY_W:
        console.log('move forwards');
        return;

      case KEYS_CODES.ARROW_LEFT:
      case KEYS_CODES.KEY_A:
        console.log('move left');
        return;

      case KEYS_CODES.ARROW_DOWN:
      case KEYS_CODES.KEY_S:
        console.log('move backwards');
        return;

      case KEYS_CODES.ARROW_RIGHT:
      case KEYS_CODES.KEY_D:
        console.log('move right');
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
