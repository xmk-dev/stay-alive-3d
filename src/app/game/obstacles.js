import { Spherical, Vector3, Box3 } from 'three';
import {
  round, shuffle,
} from 'lodash';
import { OBSTACLES, LANES } from './game-config';

// TODO: move to constants
const ROW_DISTANCE = 3;
const MIN_INVISIBLE_ROWS = 8;
const OBSTACLE_Y = -0.75;

export const obstaclesState = {
  currentPositionZ: -20,
  collisions: {},
  positions: {},
};

export const shouldAddObstacle = (hero) => hero.position.z < obstaclesState.currentPositionZ + ROW_DISTANCE * MIN_INVISIBLE_ROWS;

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
  const availableLane = shuffle(LANES).find(
    (x) => !Object
      .values(obstaclesState.positions)
      .includes(getPositionKey(x, obstaclesState.currentPositionZ)),
  );

  if (Number.isNaN(availableLane)) { return false; }

  obstaclesState.positions[obstacle.uuid] = getPositionKey(availableLane, obstaclesState.currentPositionZ);
  obstacle.position.set(availableLane, OBSTACLE_Y, obstaclesState.currentPositionZ);
  obstaclesState.collisions[obstacle.uuid] = false;
  obstacle.visible = true;
  scene.add(obstacle);
  obstacles.used.push(obstacle);

  return true;
};

export const addObstacles = (obstacles, hero, scene) => shuffle(obstacles.available).filter((obstacle, i) => {
  if (!shouldAddObstacle(hero)) { return true; }

  let isAdded = false;

  if (Math.random() > 0.5) {
    isAdded = addObstacle(obstacle, obstacles, scene);
  }

  if (Math.random() > 0.2) {
    obstaclesState.currentPositionZ -= ROW_DISTANCE;
  }

  return !isAdded;
});

export const removeObstacle = (obstacle, obstacles, scene) => {
  delete obstaclesState.collisions[obstacle.uuid];
  delete obstaclesState.positions[obstacle.uuid];
  obstacle.visible = false;
  scene.remove(obstacle);
  obstacles.available.push(obstacle);
};

export const removeInvisibleObstacles = (obstacles, hero, scene) => obstacles.used.filter((obstacle) => {
  const isBehindHero = hero.position.z < obstacle.position.z - ROW_DISTANCE;

  if (isBehindHero) {
    removeObstacle(obstacle, obstacles, scene);
  }

  return !isBehindHero;
});

export const updateObstacles = (obstacles, hero, scene) => {
  obstacles.used = removeInvisibleObstacles(obstacles, hero, scene);

  if (!shouldAddObstacle(hero)) { return; }

  obstacles.available = addObstacles(obstacles, hero, scene);
};

export const hasCollided = (obstacles, hero) => {
  const heroBox = new Box3().setFromObject(hero);

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
