import { SphereGeometry, MeshStandardMaterial, Mesh } from 'three';
import { distortVertex } from './utils';
import { GLOBE } from './constants';

export const addGlobe = (scene) => {
  const geometry = new SphereGeometry(GLOBE.RADIUS, GLOBE.SIDES, GLOBE.TIERS);
  const material = new MeshStandardMaterial({ color: GLOBE.COLOR, flatShading: GLOBE.FLAT_SHADING });

  geometry.vertices.forEach((v) => distortVertex(v, GLOBE.MAX_HEIGHT));

  const globe = new Mesh(geometry, material);
  globe.castShadow = false;
  globe.receiveShadow = true;
  globe.position.set(GLOBE.X, GLOBE.Y, GLOBE.Z);
  globe.rotateX(GLOBE.ROTATION_X);
  globe.rotateY(GLOBE.ROTATION_Y);
  globe.rotateZ(GLOBE.ROTATION_Z);

  scene.add(globe);

  return globe;
};
