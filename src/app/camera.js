import { PerspectiveCamera } from 'three';
// import { CAMERA } from '../config';

// TODO: Move to constants
const CAMERA = {
  FIELD_OF_VIEW: 40,
  NEAR: 1,
  FAR: 5000,
  X: 0,
  Y: 0,
  Z: 5,
};

export default (root) => {
  const camera = new PerspectiveCamera(CAMERA.FIELD_OF_VIEW, window.innerWidth / window.innerHeight, CAMERA.NEAR, CAMERA.FAR);
  camera.position.set(CAMERA.X, CAMERA.Y, CAMERA.Z);

  return camera;
};
