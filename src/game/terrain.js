const {
  MeshLambertMaterial, Mesh, BoxGeometry, Vector3,
} = require('three');
const {
  TERRAIN: {
    COLOR, GEOMETRY_HEIGHT, GEOMETRY_WIDTH, GEOMETRY_DEPTH, ROTATE_X, FLAT_SHADING,
  },
} = require('./constants');

const createTerrain = (scene) => {
  const geometry = new BoxGeometry(GEOMETRY_WIDTH, GEOMETRY_HEIGHT, GEOMETRY_DEPTH);
  const material = new MeshLambertMaterial({ color: COLOR, flatShading: FLAT_SHADING });

  geometry.computeFaceNormals();

  const terrain = new Mesh(geometry, material);
  terrain.rotateX(ROTATE_X);
  terrain.castShadow = false;
  terrain.receiveShadow = true;

  scene.add(terrain);
};

const updateTerrain = (camera, terrain) => {
  const world = new Vector3();
  camera.getWorldPosition(world);

  terrain.position.x = world.x;
  terrain.position.z = world.z;
};

module.exports = { createTerrain, updateTerrain };
