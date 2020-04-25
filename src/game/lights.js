import { HemisphereLight, DirectionalLight } from 'three';
import { LIGHT } from '../config';

export default () => {
  const sceneLight = new HemisphereLight(LIGHT.SKY_COLOR, LIGHT.GROUND_COLOR, LIGHT.SCENE_INTENSITY);

  const sunLight = new DirectionalLight(LIGHT.SUN_LIGHT_COLOR, LIGHT.SUN_INTENSITY);
  sunLight.position.set(LIGHT.SUN_X, LIGHT.SUN_Y, LIGHT.SUN_Z);
  sunLight.shadow.mapSize.height = LIGHT.SHADOW_RESOLUTION;
  sunLight.shadow.mapSize.width = LIGHT.SHADOW_RESOLUTION;
  sunLight.castShadow = true;

  return {
    sceneLight,
    sunLight,
  };
};
