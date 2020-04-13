import { FogExp2 } from 'three';
import { FOG } from './constants';

export const addFog = (scene) => {
  const fog = new FogExp2(FOG.COLOR, FOG.DENSITY);
  scene.fog = fog;
};
