import { WebGLRenderer, BasicShadowMap } from 'three';
import { RENDERER } from '../config';

export default (root) => {
  const renderer = new WebGLRenderer({ antialias: RENDERER.ANTIALIAS });

  // TODO: move that to constants
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(root.offsetWidth, root.offsetHeight);
  renderer.shadowMap.type = BasicShadowMap;
  renderer.shadowMap.enabled = true;

  root.appendChild(renderer.domElement);

  return renderer;
};
