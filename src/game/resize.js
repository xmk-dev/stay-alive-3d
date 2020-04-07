const { EVENTS: { RESIZE } } = require('./constants');

const attachResizeListener = (root, renderer, camera) => {
  window.addEventListener(RESIZE, () => {
    const height = root.offsetHeight;
    const width = root.offsetWidth;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
};

module.exports = { attachResizeListener };
