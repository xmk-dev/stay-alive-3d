import { MeshStandardMaterial, SphereGeometry, CylinderGeometry, Mesh, Group } from 'three';
import { distortGeometry } from '../utils/geometry-util';

export default () => {
    // TODO: move to constants
    const maxVertexHeight = 0.05;
    const treeColor = 0x33ff33;
    const woodColor = 0x23190f;
    const treeRadius = 0.25;
    const treeWidthSegments = 8;
    const treeHeightSegments = 8;
    const woodRadius = 0.05;
    const woodHeight = 1;

    const treeMaterial = new MeshStandardMaterial({
        color: treeColor,
        flatShading: true,
    });

    const treeGeometry = new SphereGeometry(
        treeRadius,
        treeWidthSegments,
        treeHeightSegments,
    );

    distortGeometry(treeGeometry, maxVertexHeight);

    const tree = new Mesh(treeGeometry, treeMaterial);
    tree.castShadow = true;
    tree.receiveShadow = true;
    tree.translateY(woodHeight);

    const woodMaterial = new MeshStandardMaterial({
        color: woodColor,
        flatShading: true,
    });

    const woodGeometry = new CylinderGeometry(woodRadius, woodRadius, woodHeight);

    const wood = new Mesh(woodGeometry, woodMaterial);
    wood.castShadow = true;
    wood.receiveShadow = true;
    wood.translateY(woodHeight / 2);

    const completeTree = new Group();
    completeTree.add(tree);
    completeTree.add(wood);


    return completeTree;
};
