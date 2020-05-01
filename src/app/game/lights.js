import { HemisphereLight, DirectionalLight } from 'three';
import { LIGHT } from './game-config';

// TODO: move to config
const SHADOW_NEAR = 1;
const SHADOW_FAR = 20;
const D = 5;

export default () => {
  const sceneLight = new HemisphereLight(LIGHT.SKY_COLOR, LIGHT.GROUND_COLOR, LIGHT.SCENE_INTENSITY);

  const sunLight = new DirectionalLight(LIGHT.SUN_LIGHT_COLOR, LIGHT.SUN_INTENSITY);
  sunLight.position.set(LIGHT.SUN_X, LIGHT.SUN_Y, LIGHT.SUN_Z);
  sunLight.shadow.mapSize.height = LIGHT.SHADOW_RESOLUTION;
  sunLight.shadow.mapSize.width = LIGHT.SHADOW_RESOLUTION;
  sunLight.castShadow = true;
  sunLight.shadow.camera.near = SHADOW_NEAR;
  sunLight.shadow.camera.far = SHADOW_FAR;
  sunLight.shadow.camera.left = - D;
  sunLight.shadow.camera.right = D;
  sunLight.shadow.camera.top = D;
  sunLight.shadow.camera.bottom = - D;

  return {
    sceneLight,
    sunLight,
  };
};
