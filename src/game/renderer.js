import { WebGLRenderer } from 'three';
import { RENDERER } from './constants';

export const createRenderer = (root) => {
  const renderer = new WebGLRenderer({
    alpha: RENDERER.ALPHA,
    antialias: RENDERER.ANTIALIAS,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(root.offsetWidth, root.offsetHeight);
  renderer.shadowMap.enabled = RENDERER.SHADOW_MAP;

  root.appendChild(renderer.domElement);

  return renderer;
};
