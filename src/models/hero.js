import { AnimationMixer } from 'three';

import { loadModelFromUrl } from '../utils/model-loader-util';
import { HERO } from '../app/game/game-config';

export default async () => {
  const heroModelUrl = HERO.URL;
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
