import { PerspectiveCamera } from 'three';
import { CAMERA } from '../config';

export default (root) => {
  // const camera = new PerspectiveCamera(
  //   CAMERA.FIELD_OF_VIEW,
  //   root.offsetWidth / root.offsetHeight,
  //   1,
  //   10000,
  // );
  const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 5;


  return camera;
};
