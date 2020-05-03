import { Box3 } from 'three';
import { shuffle } from 'lodash';
import { OBSTACLES, LANES } from './game-config';

export const obstaclesState = {
  currentPositionZ: OBSTACLES.START_Z_POSITION,
  collisions: {},
  positions: {},
};

export const shouldAddObstacle = (hero) => (
  hero.position.z < (
    obstaclesState.currentPositionZ
    + OBSTACLES.ROW_DISTANCE
    * OBSTACLES.MIN_INVISIBLE_ROWS
  )
);

export const getPositionKey = (x, z) => `${x}-${z}`;

export const createObstacles = (creators, countForType) => {
  const bases = creators.map((creator) => creator());

  return {
    used: [],
    available: bases.map((base) => Array(countForType)
      .fill(0)
      .map(() => Object.assign(base.clone(), { visible: false }))).flat(),
  };
};

export const addObstacle = (obstacle, obstacles, scene) => {
  const { currentPositionZ } = obstaclesState;
  const availableLane = shuffle(LANES).find(
    (x) => !Object
      .values(obstaclesState.positions)
      .includes(getPositionKey(x, currentPositionZ)),
  );

  if (Number.isNaN(availableLane)) { return false; }

  obstaclesState.positions[obstacle.uuid] = getPositionKey(availableLane, currentPositionZ);
  obstacle.position.set(availableLane, OBSTACLES.OBSTACLE_Y, currentPositionZ);
  obstaclesState.collisions[obstacle.uuid] = false;
  obstacle.visible = true;
  scene.add(obstacle);
  obstacles.used.push(obstacle);

  return true;
};

export const addObstacles = (obstacles, hero, scene) => shuffle(obstacles.available).filter(
  (obstacle) => {
    if (!shouldAddObstacle(hero)) { return true; }

    let isAdded = false;

    if (Math.random() > OBSTACLES.ADD_OBSTACLE_PROBABILITY) {
      isAdded = addObstacle(obstacle, obstacles, scene);
    }

    if (Math.random() > OBSTACLES.CHANGE_ROW_PROBABILITY) {
      obstaclesState.currentPositionZ -= OBSTACLES.ROW_DISTANCE;
    }

    return !isAdded;
  },
);

export const removeObstacle = (obstacle, obstacles, scene) => {
  delete obstaclesState.collisions[obstacle.uuid];
  delete obstaclesState.positions[obstacle.uuid];
  obstacle.visible = false;
  scene.remove(obstacle);
  obstacles.available.push(obstacle);
};

export const removeInvisibleObstacles = (obstacles, hero, scene) => obstacles.used.filter(
  (obstacle) => {
    const isBehindHero = hero.position.z < obstacle.position.z - OBSTACLES.ROW_DISTANCE;

    if (isBehindHero) {
      removeObstacle(obstacle, obstacles, scene);
    }

    return !isBehindHero;
  },
);

export const updateObstacles = (obstacles, hero, scene) => {
  obstacles.used = removeInvisibleObstacles(obstacles, hero, scene);

  if (!shouldAddObstacle(hero)) { return; }

  obstacles.available = addObstacles(obstacles, hero, scene);
};

export const hasCollided = (obstacles, hero) => {
  const heroBoxBase = hero.children && hero.children.length ? hero.children[0] : hero;
  const heroBox = new Box3().setFromObject(heroBoxBase);

  return !!obstacles.used.find((obstacle) => {
    if (obstaclesState.collisions[obstacle.uuid]) { return false; }

    const obstacleBox = new Box3().setFromObject(obstacle);

    const collided = obstacleBox.intersectsBox(heroBox);

    if (collided) {
      obstaclesState.collisions[obstacle.uuid] = true;
    }

    return collided;
  });
};
