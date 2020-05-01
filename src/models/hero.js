import {
  AnimationMixer, SphereGeometry, MeshStandardMaterial, Mesh,
} from 'three';

import { loadModelFromUrl } from '../utils/model-loader-util';
import { HERO } from '../app/game/game-config';

export default async () => {
  // TODO: Improve that
  const heroModelUrl = 'https://raw.githubusercontent.com/gfxfundamentals/threejsfundamentals/master/threejs/resources/models/knight/KnightCharacter.gltf';
  const gltf = await loadModelFromUrl(heroModelUrl);
  const mixer = new AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[1], gltf.scene.children[0]);
  action.enabled = true;
  action.play();

  gltf.scene.rotateY(HERO.ROTATION_Y);
  gltf.scene.scale.set(HERO.SCALE, HERO.SCALE, HERO.SCALE);
  gltf.scene.position.set(HERO.X, HERO.Y, HERO.Z);

  gltf.scene.castShadow = true;
  gltf.scene.receiveShadow = true;

  gltf.scene.children.forEach((c) => {
    c.castShadow = true;
    c.receiveShadow = true;
  });

  return { gltf, mixer };
};

// // TODO: ANcoment above one after the shadow is fixed

// export default async () => {
//   const geometry = new SphereGeometry(0.2);
//   const material = new MeshStandardMaterial({ color: 0x3A3A3A, flatShading: true });

//   const globe = new Mesh(geometry, material);
//   globe.castShadow = true;
//   globe.receiveShadow = false;
//   globe.position.set(0, 0, 1);

//   return { gltf: { scene: globe }, mixer: { update: () => {} } };
// };
