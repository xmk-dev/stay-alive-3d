import { EVENTS } from './constants';

export const attachResizeListener = (root, renderer, camera) => {
  window.addEventListener(EVENTS.RESIZE, () => {
    const height = root.offsetHeight;
    const width = root.offsetWidth;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
};
