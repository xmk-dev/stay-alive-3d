const { PerspectiveCamera } = require('three');
const {
  CAMERA: {
    FIELD_OF_VIEW,
    NEAR,
    FAR,
    X,
    Y,
    Z,
    ROTATION_X,
    ROTATION_Y,
    ROTATION_Z,
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
  camera.rotation.set(ROTATION_X, ROTATION_Y, ROTATION_Z);

  return camera;
};

module.exports = { createCamera };
