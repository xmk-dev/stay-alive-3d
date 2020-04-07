const { SphereGeometry, MeshStandardMaterial, Mesh } = require('three');
const { distortVertex } = require('./utils');
const {
  GLOBE: {
    COLOR,
    RADIUS,
    SIDES,
    TIERS,
    FLAT_SHADING,
    MAX_HEIGHT,
    ROTATION_X,
    ROTATION_Y,
    ROTATION_Z,
    X,
    Y,
    Z,
  },
} = require('./constants');

const addGlobe = (scene) => {
  const geometry = new SphereGeometry(RADIUS, SIDES, TIERS);
  const material = new MeshStandardMaterial({ color: COLOR, flatShading: FLAT_SHADING });

  geometry.vertices.forEach((v) => distortVertex(v, MAX_HEIGHT));

  const globe = new Mesh(geometry, material);
  globe.castShadow = false;
  globe.receiveShadow = true;
  globe.position.set(X, Y, Z);
  globe.rotateX(ROTATION_X);
  globe.rotateY(ROTATION_Y);
  globe.rotateZ(ROTATION_Z);

  scene.add(globe);

  return globe;
};

module.exports = { addGlobe };
