import { WebGLRenderer, BasicShadowMap } from 'three';

// TODO: Move to constants
const RENDERER = {
  ANTIALIAS: false,
  SHADOW_MAP_ENABLED: true,
}

export default (root) => {
  const renderer = new WebGLRenderer({ antialias: RENDERER.ANTIALIAS });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(root.offsetWidth, root.offsetHeight);
  renderer.shadowMap.enabled = RENDERER.SHADOW_MAP_ENABLED;

  root.appendChild(renderer.domElement);

  return renderer;
};
