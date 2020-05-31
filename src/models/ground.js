import {
  BoxGeometry, MeshStandardMaterial, Mesh, Object3D,
} from 'three';
import { GROUND } from '../config';
import { distortGeometry } from '../utils/geometry-util';
import { loadTextureFromUrl } from '../utils/texture-loader-util';

export default async () => {
  const geometry = new BoxGeometry(
    GROUND.WIDTH,
    GROUND.HEIGHT,
    GROUND.DEPTH,
    GROUND.WIDTH_SEGMENTS,
    GROUND.HEIGHT_SEGMENTS,
    GROUND.DEPTH_SEGMENTS,
  );

  distortGeometry(geometry, GROUND.DISTORTION_VALUE);

  const texture = await loadTextureFromUrl(GROUND.TEXTURE_PATH);
  const material = new MeshStandardMaterial({
    map: texture,
    color: GROUND.COLOR,
    flatShading: GROUND.FLAT_SHADING,
  });
  const groundPiece = new Mesh(geometry, material);

  groundPiece.castShadow = GROUND.CAST_SHADOW;
  groundPiece.receiveShadow = GROUND.RECEIVE_SHADOW;

  const ground = new Object3D();
  ground.add(groundPiece);
  ground.position.set(GROUND.X, GROUND.Y, GROUND.Z);

  return ground;
};
