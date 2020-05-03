import { PerspectiveCamera } from 'three';
import { CAMERA } from './game-config';

export default () => {
  const camera = new PerspectiveCamera(
    CAMERA.FIELD_OF_VIEW,
    window.innerWidth / window.innerHeight,
    CAMERA.NEAR,
    CAMERA.FAR,
  );

  camera.position.set(CAMERA.X, CAMERA.Y, CAMERA.Z);

  return camera;
};
