import { Scene, Fog } from 'three';
import { FOG, SCENE } from './game-config';

const FOG_COLOR = 0xF0F0F0;
const FOG_NEAR = 7;
const FOG_FAR = 14;

export default (items = []) => {
  const scene = new Scene();

  items.forEach((item) => {
    scene.add(item);
  });

  scene.background = SCENE.BACKGROUND;
  scene.fog = new Fog(FOG_COLOR, FOG_NEAR, FOG_FAR);

  return scene;
};
