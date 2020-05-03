import { Scene, Fog } from 'three';
import { SCENE } from './game-config';

export default (items = []) => {
  const scene = new Scene();

  (items || []).forEach((item) => {
    scene.add(item);
  });

  scene.background = SCENE.BACKGROUND;
  scene.fog = new Fog(SCENE.FOG_COLOR, SCENE.FOG_NEAR, SCENE.FOG_FAR);

  return scene;
};
