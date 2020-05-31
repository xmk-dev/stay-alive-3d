import { random } from './math-util';

export const distortGeometry = (geometry, maxDistortionValue) => {
  if (!maxDistortionValue) { return; }
  geometry.vertices.forEach((vertex) => {
    vertex.x += random(-maxDistortionValue, maxDistortionValue);
    vertex.y += random(-maxDistortionValue, maxDistortionValue);
    vertex.z += random(-maxDistortionValue, maxDistortionValue);
  });
};
