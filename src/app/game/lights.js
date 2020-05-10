import { HemisphereLight, DirectionalLight } from 'three';
import { LIGHTS } from '../../config';

export default () => {
  const sceneLight = new HemisphereLight(
    LIGHTS.SKY_COLOR,
    LIGHTS.GROUND_COLOR,
    LIGHTS.SCENE_INTENSITY,
  );

  const sunLight = new DirectionalLight(LIGHTS.SUN_LIGHT_COLOR, LIGHTS.SUN_INTENSITY);
  sunLight.position.set(LIGHTS.SUN_X, LIGHTS.SUN_Y, LIGHTS.SUN_Z);
  sunLight.shadow.mapSize.height = LIGHTS.SHADOW_RESOLUTION;
  sunLight.shadow.mapSize.width = LIGHTS.SHADOW_RESOLUTION;
  sunLight.shadow.camera.bottom = -LIGHTS.SHADOW_RADIUS;
  sunLight.shadow.camera.left = -LIGHTS.SHADOW_RADIUS;
  sunLight.shadow.camera.right = LIGHTS.SHADOW_RADIUS;
  sunLight.shadow.camera.top = LIGHTS.SHADOW_RADIUS;
  sunLight.shadow.camera.near = LIGHTS.SHADOW_NEAR;
  sunLight.shadow.camera.far = LIGHTS.SHADOW_FAR;
  sunLight.castShadow = LIGHTS.CAST_SHADOW;

  return [
    sceneLight,
    sunLight,
  ];
};
