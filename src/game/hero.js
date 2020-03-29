const { SphereGeometry, MeshStandardMaterial, Mesh } = require('three');
const {
  HERO: {
    COLOR, RADIUS, SIDES, TIERS, FLAT_SHADING, X, Y, Z,
  },
} = require('./constants');

const addHero = (scene) => {
  // TODO: implement, this is temporary just for testing
  const geometry = new SphereGeometry(RADIUS, SIDES, TIERS);
  const material = new MeshStandardMaterial({ color: COLOR, flatShading: FLAT_SHADING });
  const hero = new Mesh(geometry, material);

  hero.castShadow = true;
  hero.receiveShadow = false;
  hero.position.set(X, Y, Z);

  scene.add(hero);

  return hero;
};

module.exports = { addHero };
