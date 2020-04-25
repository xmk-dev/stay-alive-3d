import { Scene, FogExp2 } from 'three';
import { FOG, SCENE } from '../config';

export default (items = []) => {
  const scene = new Scene();

  items.forEach((item) => {
    scene.add(item);
  });

  scene.background = SCENE.BACKGROUND;
  scene.fog = new FogExp2(FOG.COLOR, FOG.DENSITY);

  return scene;
};
