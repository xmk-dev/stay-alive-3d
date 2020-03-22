const { HemisphereLight, DirectionalLight, AmbientLight } = require('three');
const {
  LIGHT: {
    INTENSITY,
    SKY_COLOR,
    GROUND_COLOR,
    AMBIENT_COLOR,
    AMBIENT_INTENSITY,
    SUN_LIGHT_COLOR,
    SUN_DIRECTION_X,
    SUN_DIRECTION_Y,
    SUN_DIRECTION_Z,
    SHADOW_RESOLUTION,
    NEAR,
    FAR,
    SUN_VISIBILITY_DISTANCE,
  },
} = require('./constants');

const addLights = (scene) => {
  const sceneLight = new HemisphereLight(SKY_COLOR, GROUND_COLOR, INTENSITY);
  const ambientLight = new AmbientLight(AMBIENT_COLOR, AMBIENT_INTENSITY);

  const sunLight = new DirectionalLight(SUN_LIGHT_COLOR, INTENSITY);
  sunLight.position.set(SUN_DIRECTION_X, SUN_DIRECTION_Y, SUN_DIRECTION_Z);
  sunLight.shadow.camera.bottom = -SUN_VISIBILITY_DISTANCE;
  sunLight.shadow.camera.left = -SUN_VISIBILITY_DISTANCE;
  sunLight.shadow.camera.right = SUN_VISIBILITY_DISTANCE;
  sunLight.shadow.camera.top = SUN_VISIBILITY_DISTANCE;
  sunLight.shadow.mapSize.height = SHADOW_RESOLUTION;
  sunLight.shadow.mapSize.width = SHADOW_RESOLUTION;
  sunLight.shadow.camera.near = NEAR;
  sunLight.shadow.camera.far = FAR;
  sunLight.castShadow = true;

  scene.add(ambientLight);
  scene.add(sceneLight);
  scene.add(sunLight);
};

module.exports = { addLights };
