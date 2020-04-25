import { MeshStandardMaterial, SphereGeometry, Mesh } from 'three';
import { distortGeometry } from '../utils/geometry';

export default () => {
  // TODO: move to constants
  const maxVertexHeight = 0.03;
  const color = 0xf0f0f0;
  const bigRadius = 0.4;
  const widthSegments = 9;
  const heightSegments = 6;

  const material = new MeshStandardMaterial({
    color,
    flatShading: true,
  });

  const rockGeometry = new SphereGeometry(
    bigRadius,
    widthSegments,
    heightSegments,
  );

  distortGeometry(rockGeometry, maxVertexHeight);

  const rock = new Mesh(rockGeometry, material);
  rock.castShadow = true;
  rock.receiveShadow = true;

  return rock;
};
