import { SphereGeometry, MeshStandardMaterial, Mesh } from 'three';
import { HERO } from './constants';

export const addHero = (scene) => {
  // TODO: implement, this is temporary just for testing
  const geometry = new SphereGeometry(HERO.RADIUS, HERO.SIDES, HERO.TIERS);
  const material = new MeshStandardMaterial({ color: HERO.COLOR, flatShading: HERO.FLAT_SHADING });
  const hero = new Mesh(geometry, material);

  hero.castShadow = true;
  hero.receiveShadow = false;
  hero.position.set(HERO.X, HERO.Y, HERO.Z);

  scene.add(hero);

  return hero;
};
