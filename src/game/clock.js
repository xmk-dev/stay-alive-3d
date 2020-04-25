import { Clock } from 'three';

export default () => {
  const clock = new Clock();
  clock.start();
  return clock;
};
