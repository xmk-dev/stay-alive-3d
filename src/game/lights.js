const { HemisphereLight, DirectionalLight } = require('three');
const {
  LIGHT: {
    INTENSITY,
    SKY_COLOR,
    GROUND_COLOR,
    SUN_LIGHT_COLOR,
    SUN_DIRECTION_X,
    SUN_DIRECTION_Y,
    SUN_DIRECTION_Z,
    SHADOW_RESOLUTION,
    NEAR,
    FAR,
  },
} = require('./constants');

const addLights = (scene) => {
  const sceneLight = new HemisphereLight(SKY_COLOR, GROUND_COLOR, INTENSITY);

  const sunLight = new DirectionalLight(SUN_LIGHT_COLOR, INTENSITY);
  sunLight.position.set(SUN_DIRECTION_X, SUN_DIRECTION_Y, SUN_DIRECTION_Z);
  sunLight.shadow.mapSize.height = SHADOW_RESOLUTION;
  sunLight.shadow.mapSize.width = SHADOW_RESOLUTION;
  sunLight.shadow.camera.near = NEAR;
  sunLight.shadow.camera.far = FAR;
  sunLight.castShadow = true;

  scene.add(sceneLight);
  scene.add(sunLight);
};

module.exports = { addLights };
