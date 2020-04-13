import { PerspectiveCamera } from 'three';
import { CAMERA } from './constants';

export const createCamera = (root) => {
  const camera = new PerspectiveCamera(
    CAMERA.FIELD_OF_VIEW,
    root.offsetWidth / root.offsetHeight,
    CAMERA.NEAR,
    CAMERA.FAR,
  );

  camera.position.set(CAMERA.X, CAMERA.Y, CAMERA.Z);
  camera.rotation.set(CAMERA.ROTATION_X, CAMERA.ROTATION_Y, CAMERA.ROTATION_Z);

  return camera;
};
