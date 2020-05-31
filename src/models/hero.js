import { AnimationMixer } from 'three';
import { loadModelFromUrl } from '../utils/gltf-loader-util';
import { HERO } from '../config';

export default async () => {
  const gltf = await loadModelFromUrl(HERO.MODEL_PATH);
  const { scene } = gltf;
  const mixer = new AnimationMixer(scene);
  const animations = gltf.animations.reduce((acc, a) => ({
    ...acc,
    [a.name]: mixer.clipAction(a, scene.children[0]),
  }), {});

  // eslint-disable-next-line no-underscore-dangle
  animations.Run_swordAttack._clip.duration *= 2;
  animations.Run_swordAttack.timeScale = 0.3;
  animations.Run_swordAttack.repetitions = 1;
  animations.Roll_sword.timeScale = 2;
  animations.Roll_sword.repetitions = 1;

  scene.rotateY(HERO.ROTATION_Y);
  scene.castShadow = HERO.CAST_SHADOW;
  scene.receiveShadow = HERO.RECEIVE_SHADOW;
  scene.position.set(HERO.X, HERO.Y, HERO.Z);
  scene.scale.set(HERO.SCALE, HERO.SCALE, HERO.SCALE);
  scene.children.forEach((c) => {
    c.castShadow = HERO.CAST_SHADOW;
    c.receiveShadow = HERO.RECEIVE_SHADOW;
  });

  return { scene, mixer, animations };
};
