import { HemisphereLight, DirectionalLight } from 'three';
import { LIGHT } from './constants';

export const addLights = (scene) => {
  const sceneLight = new HemisphereLight(LIGHT.SKY_COLOR, LIGHT.GROUND_COLOR, LIGHT.INTENSITY);

  const sunLight = new DirectionalLight(LIGHT.SUN_LIGHT_COLOR, LIGHT.INTENSITY);
  sunLight.position.set(LIGHT.SUN_DIRECTION_X, LIGHT.SUN_DIRECTION_Y, LIGHT.SUN_DIRECTION_Z);
  sunLight.shadow.mapSize.height = LIGHT.SHADOW_RESOLUTION;
  sunLight.shadow.mapSize.width = LIGHT.SHADOW_RESOLUTION;
  sunLight.shadow.camera.near = LIGHT.NEAR;
  sunLight.shadow.camera.far = LIGHT.FAR;
  sunLight.castShadow = true;

  scene.add(sceneLight);
  scene.add(sunLight);
};
