import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const loadModelFromUrl = (url) => {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(url, resolve, null, reject);
  });
};
