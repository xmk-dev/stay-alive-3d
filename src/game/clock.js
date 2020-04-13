import { Clock } from 'three';

export const createClock = () => {
  const clock = new Clock();
  clock.start();
  return clock;
};
