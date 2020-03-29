const { SphereGeometry, MeshStandardMaterial, Mesh } = require('three');
const {
  GLOBE: {
    COLOR, RADIUS, SIDES, TIERS, FLAT_SHADING, MAX_HEIGHT, ROTATION_Z, X, Y, Z,
  },
} = require('./constants');

const addGlobe = (scene) => {
  const geometry = new SphereGeometry(RADIUS, SIDES, TIERS);
  const material = new MeshStandardMaterial({ color: COLOR, flatShading: FLAT_SHADING });

  geometry.vertices.forEach((vertex) => {
    const height = (Math.random() * MAX_HEIGHT) - (MAX_HEIGHT / 2);
    const offset = vertex.clone().normalize().multiplyScalar(height);
    vertex.add(offset);
    return vertex;
  });

  const globe = new Mesh(geometry, material);
  globe.castShadow = false;
  globe.receiveShadow = true;
  globe.rotateZ(ROTATION_Z);
  globe.position.set(X, Y, Z);

  scene.add(globe);

  return globe;
};

module.exports = { addGlobe };
