const THREE = require('three');
const {
  CAMERA: { Z: CAMERA_Z },
  LANES,
} = require('./constants');
const { distortVertex } = require('./utils');

const createRock = () => {
  const maxVertexHeight = 0.5;
  const color = 0xf0f0f0;
  const bigRadius = 1.7;
  const widthSegments = 5;
  const heightSegments = 7;

  const material = new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
  });

  const rockGeometry = new THREE.SphereGeometry(
    bigRadius,
    widthSegments,
    heightSegments,
  );


  rockGeometry.vertices.forEach((v) => distortVertex(v, maxVertexHeight));

  const rock = new THREE.Mesh(rockGeometry, material);
  rock.castShadow = true;
  rock.receiveShadow = true;

  return rock;
};


const createRocks = () => ({
  rocksAvailable: Array(50).fill(0).map(createRock),
  rocksUsed: [],
  updateRocks: () => {},
});

const worldRadius = 30;
const rocksAvailable = Array(50).fill(0).map(createRock);

const rocksUsed = [];

function addTree(globe, hero) {
  if (rocksAvailable.length === 0) {
    console.log('NOT AVAILABLE!');
    return;
  }

  const obstacklePosition = {
    LEFT: 4.84,
    CENTER: 4.7,
    RIGHT: 4.57,
  };

  const obstackleDistanceOffset = [
    10,
    8,
    6,
    4,
    2,
    0,
  ];

  const phi = Object.values(obstacklePosition)[Math.floor(Math.random() * 3)];
  const sphericalHelper = new THREE.Spherical(worldRadius, phi, globe.rotation.x + obstackleDistanceOffset[Math.floor(Math.random() * 6)]);
  const newTree = rocksAvailable.pop();
  newTree.visible = true;
  rocksUsed.push(newTree);
  newTree.position.setFromSpherical(sphericalHelper);
  console.log('ADDED: ', sphericalHelper.radius, phi, sphericalHelper.theta);
  console.log(rocksAvailable);


  globe.add(newTree);
}

function addPathTree(globe, hero) {
  addTree(globe, hero);

  if (Math.random() > 0.5) {
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
    addTree(globe, hero);
  }

  const treesToRemove = [];
  let oneTree;
  const treePos = new THREE.Vector3();
  rocksUsed.forEach((element, index) => {
    oneTree = rocksUsed[index];
    treePos.setFromMatrixPosition(oneTree.matrixWorld);
    if (treePos.z > hero.position.z && oneTree.visible) { // gone out of our view zone
      treesToRemove.push(oneTree);
    }
  });
  let fromWhere;
  treesToRemove.forEach((element, index) => {
    oneTree = treesToRemove[index];
    fromWhere = rocksUsed.indexOf(oneTree);
    rocksUsed.splice(fromWhere, 1);
    rocksAvailable.push(oneTree);
    oneTree.visible = false;
    console.log('remove tree');
  });
}

module.exports = { createRock, addPathTree };
