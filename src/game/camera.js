const { PerspectiveCamera } = require('three');
const {
  CAMERA: {
    FIELD_OF_VIEW, NEAR_PLANE, FAR_PLANE, POSITION_X, POSITION_Y, POSITION_Z,
  },
} = require('./constants');

const createCamera = (root) => {
  const camera = new PerspectiveCamera(
    FIELD_OF_VIEW,
    root.offsetWidth / root.offsetHeight,
    NEAR_PLANE,
    FAR_PLANE,
  );

  camera.position.set(POSITION_X, POSITION_Y, POSITION_Z);

  return camera;
};

module.exports = { createCamera };
