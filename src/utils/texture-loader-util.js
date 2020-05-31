import { TextureLoader } from 'three';

export const loadTextureFromUrl = (url) => {
  const loader = new TextureLoader();

  return new Promise((resolve, reject) => {
    loader.load(url, resolve, null, reject);
  });
};
