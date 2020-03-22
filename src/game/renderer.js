const { WebGLRenderer } = require('three');

const createRenderer = (root) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(root.offsetWidth, root.offsetHeight);
  renderer.shadowMap.enabled = true;

  root.appendChild(renderer.domElement);

  return renderer;
};

module.exports = { createRenderer };
