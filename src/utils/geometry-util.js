import { random, get } from 'lodash';

export const distortGeometry = (geometry, maxDistortionValue) => {
  get(geometry, 'vertices', []).forEach((vertex) => {
    vertex.x += random(-maxDistortionValue, maxDistortionValue);
    vertex.y += random(-maxDistortionValue, maxDistortionValue);
    vertex.z += random(-maxDistortionValue, maxDistortionValue);
  });
};
