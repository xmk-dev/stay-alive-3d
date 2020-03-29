const { WebGLRenderer } = require('three');
const {
  RENDERER: {
    ALPHA, ANTIALIAS, SHADOW_MAP,
  },
} = require('./constants');

const createRenderer = (root) => {
  const renderer = new WebGLRenderer({
    alpha: ALPHA,
    antialias: ANTIALIAS,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(root.offsetWidth, root.offsetHeight);
  renderer.shadowMap.enabled = SHADOW_MAP;

  root.appendChild(renderer.domElement);

  return renderer;
};

module.exports = { createRenderer };
