import { MeshStandardMaterial, SphereGeometry, Mesh } from 'three';
import { distortVertex } from './utils';

export const createRock = () => {
  // TODO: move to constants
  const maxVertexHeight = 0.5;
  const color = 0xf0f0f0;
  const bigRadius = 1.7;
  const widthSegments = 5;
  const heightSegments = 7;

  const material = new MeshStandardMaterial({
    color,
    flatShading: true,
  });

  const rockGeometry = new SphereGeometry(
    bigRadius,
    widthSegments,
    heightSegments,
  );

  rockGeometry.vertices.forEach((v) => distortVertex(v, maxVertexHeight));

  const rock = new Mesh(rockGeometry, material);
  rock.castShadow = true;
  rock.receiveShadow = true;

  return rock;
};
