import { Spherical, Vector3, Box3 } from 'three';
import { round } from 'lodash';
import { OBSTACLES } from './constants';

export const obstaclesState = {
  positions: {},
  collided: {},
};

export const createObstaclePositionKey = (phi, theta) => (
  `${round(phi, 1)}-${round(theta, 1)}`
);

export const getObstacleSphericalAngles = (globe) => {
  // TODO: Move to config
  const obstaclesPositions = {
    LEFT: 4.84,
    CENTER: 4.7,
    RIGHT: 4.57,
  };

  const obstaclePhiIndex = Math.floor(Math.random() * Object.keys(obstaclesPositions).length);
  const phi = Object.values(obstaclesPositions)[obstaclePhiIndex];
  const theta = globe.rotation.x;
  return { phi, theta };
};

export const createObstacles = (obstacleCreator) => {
  const base = obstacleCreator();

  return {
    base,
    used: [],
    available: Array(OBSTACLES.COUNT)
      .fill(0)
      .map(() => base.clone())
      .map((o) => Object.assign(o, { visible: false })),
  };
};

export const addObstacle = (obstacles, globe) => {
  // TODO: move to config
  const worldRadius = 30;

  const newObstacle = obstacles.available.pop();

  if (!newObstacle) { return; }

  let angles;
  let posKey;
  // TODO: move to config
  let retries = 3;
  let isObstaclePositionValid = false;
  while (!isObstaclePositionValid && retries) {
    angles = getObstacleSphericalAngles(globe);
    posKey = createObstaclePositionKey(angles.phi, angles.theta);
    isObstaclePositionValid = posKey && !Object.values(obstaclesState.positions).includes(posKey);
    retries -= 1;
  }

  if (!isObstaclePositionValid || !angles.phi || !angles.theta) { return; }

  obstaclesState.positions[newObstacle.uuid] = posKey;

  const spherical = new Spherical(worldRadius, angles.phi, angles.theta);

  newObstacle.position.setFromSpherical(spherical);
  obstacles.used.push(newObstacle);
  newObstacle.visible = true;

  globe.add(newObstacle);
};

export const updateObstacles = (obstacles, globe, hero) => {
  const usedObstaclesIndexesToRemove = obstacles.used.map((obstacle, index) => {
    const obstaclePosition = new Vector3();
    obstaclePosition.setFromMatrixPosition(obstacle.matrixWorld);
    return obstaclePosition.z > hero.position.z && obstacle.visible ? index : null;
  });

  let removedCount = 0;
  usedObstaclesIndexesToRemove.forEach((indexToRemove) => {
    if (indexToRemove === null) { return; }

    const index = indexToRemove - removedCount;
    const obstacleUuid = obstacles.used[index].uuid;
    obstacles.used[index].visible = false;
    delete obstaclesState.positions[obstacleUuid];
    delete obstaclesState.collided[obstacleUuid];
    obstacles.available.push(obstacles.used[index]);
    obstacles.used.splice(indexToRemove - removedCount, 1);
    removedCount += 1;
  });
};

export const hasCollided = (obstacles, hero) => !!obstacles.used.find((obstacle) => {
  if (obstaclesState.collided[obstacle.uuid] || !obstacle.visible) { return false; }

  const obstaclePosition = new Vector3();
  obstaclePosition.setFromMatrixPosition(obstacle.matrixWorld);
  const collided = obstaclePosition.distanceTo(hero.position) < hero.geometry.parameters.radius;

  if (collided) {
    obstaclesState.collided[obstacle.uuid] = collided;
  }

  return collided;
});
