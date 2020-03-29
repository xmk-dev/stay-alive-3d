const { PerspectiveCamera } = require('three');
const {
  CAMERA: {
    FIELD_OF_VIEW, NEAR, FAR, X, Y, Z,
  },
} = require('./constants');

const createCamera = (root) => {
  const camera = new PerspectiveCamera(
    FIELD_OF_VIEW,
    root.offsetWidth / root.offsetHeight,
    NEAR,
    FAR,
  );

  camera.position.set(X, Y, Z);

  return camera;
};

module.exports = { createCamera };
