import {
  BoxGeometry, MeshStandardMaterial, Mesh, Object3D,
} from 'three';
import { GROUND } from '../app/game/game-config';
import { distortGeometry } from '../utils/geometry-util';

export default () => {
  // TODO: move to constants
  const geometry = new BoxGeometry(
    GROUND.WIDTH,
    GROUND.HEIGHT,
    GROUND.DEPTH,
    GROUND.WIDTH_SEGMENTS,
    GROUND.HEIGHT_SEGMENTS,
    GROUND.DEPTH_SEGMENTS,
  );
  // TODO: use grounds as children of main mesh
  distortGeometry(geometry, 0.15);

  const material = new MeshStandardMaterial({
    color: GROUND.COLOR,
    flatShading: GROUND.FLAT_SHADING,
  });
  const groundPiece = new Mesh(geometry, material);

  groundPiece.castShadow = false;
  groundPiece.receiveShadow = true;

  const ground = new Object3D();
  ground.add(groundPiece);
  ground.position.set(GROUND.X, GROUND.Y, GROUND.Z);

  return ground;
};
