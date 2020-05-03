import { AnimationMixer } from 'three';

import { loadModelFromUrl } from '../utils/model-loader-util';
import { HERO } from '../app/game/game-config';

export default async () => {
  const heroModelUrl = HERO.URL;
  const gltf = await loadModelFromUrl(heroModelUrl);
  const hero = { gltf };

  if (HERO.PLAY_RUN_ANIMATION) {
    hero.mixer = new AnimationMixer(gltf.scene);
    const action = hero.mixer.clipAction(
      gltf.animations[HERO.RUN_ANIMATION_NUMBER],
      gltf.scene.children[0],
    );
    action.enabled = HERO.PLAY_RUN_ANIMATION;
    action.play();
  }

  gltf.scene.rotateY(HERO.ROTATION_Y);
  gltf.scene.scale.set(HERO.SCALE, HERO.SCALE, HERO.SCALE);
  gltf.scene.position.set(HERO.X, HERO.Y, HERO.Z);

  gltf.scene.castShadow = HERO.CAST_SHADOW;
  gltf.scene.receiveShadow = HERO.RECEIVE_SHADOW;

  gltf.scene.children.forEach((c) => {
    c.castShadow = HERO.CAST_SHADOW;
    c.receiveShadow = HERO.RECEIVE_SHADOW;
  });

  return hero;
};
