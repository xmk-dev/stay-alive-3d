const { CylinderGeometry, MeshBasicMaterial, Mesh } = require('three');

const createTree = () => {
  //  TODO: implement, this is temporary for tests
  // https://medium.com/@joshmarinacci/procedural-geometry-trees-896cc06f54ce
  // https://codepen.io/Yakudoo/pen/pgPgeb
  // https://www.html5gamedevs.com/topic/22218-low-polygon-tree-demo-need-help/
  const geometry = new CylinderGeometry(5, 5, 20, 32);
  const material = new MeshBasicMaterial({ color: 0xffff00 });
  const tree = new Mesh(geometry, material);
  return tree;
};

module.exports = { createTree };
