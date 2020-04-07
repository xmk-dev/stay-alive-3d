const { Vector3 } = require('three');
const {
  HERO: { RADIUS: HERO_SIZE },
} = require('./constants');

const heroAndTreesCollision = (trees, hero) => !!trees.find((tree) => {
  const treePos = new Vector3();
  treePos.setFromMatrixPosition(tree.matrixWorld);
  if (treePos.distanceTo(hero.position) <= HERO_SIZE) {
    return true;
  }
  return false;
});

module.exports = { heroAndTreesCollision };
