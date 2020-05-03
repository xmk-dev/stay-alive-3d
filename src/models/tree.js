import {
  MeshStandardMaterial, SphereGeometry, CylinderGeometry, Mesh, Group,
} from 'three';
import { distortGeometry } from '../utils/geometry-util';
import { TREE } from '../app/game/game-config';

export default () => {
  const treeMaterial = new MeshStandardMaterial({
    color: TREE.treeColor,
    flatShading: TREE.FLAT_SHADING,
  });

  const treeGeometry = new SphereGeometry(
    TREE.TREE_RADIUS,
    TREE.TREE_WIDTH_SEGMENTS,
    TREE.TREE_HEIGHT_SEGMENTS,
  );

  distortGeometry(treeGeometry, TREE.DISTORTION_VALUE);

  const tree = new Mesh(treeGeometry, treeMaterial);
  tree.castShadow = TREE.CAST_SHADOW;
  tree.receiveShadow = TREE.RECEIVE_SHADOW;
  tree.translateY(TREE.WOOD_HEIGHT);

  const woodMaterial = new MeshStandardMaterial({
    color: TREE.woodColor,
    flatShading: TREE.FLAT_SHADING,
  });

  const woodGeometry = new CylinderGeometry(TREE.WOOD_RADIUS, TREE.WOOD_RADIUS, TREE.WOOD_HEIGHT);

  const wood = new Mesh(woodGeometry, woodMaterial);
  wood.castShadow = TREE.CAST_SHADOW;
  wood.receiveShadow = TREE.RECEIVE_SHADOW;
  wood.translateY(TREE.WOOD_HEIGHT / 2);

  const completeTree = new Group();
  completeTree.add(tree);
  completeTree.add(wood);

  return completeTree;
};
