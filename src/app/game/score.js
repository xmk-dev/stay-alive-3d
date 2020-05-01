import { round } from 'lodash';
import { SCORE } from './game-config';

export default () => {
  const score = {
    value: SCORE.VALUE,
    lifes: SCORE.LIFES,
    incrementScore: async (value = 0) => {
      score.value += value + SCORE.INCREASE_VALUE;
      score.updateScore();
    },
    decrementScore: async () => {
      score.value -= SCORE.DECREASE_VALUE;
      score.lifes -= 1;
      score.updateScore();
    },
    updateScore: async () => {
      document.getElementById(SCORE.VALUE_DOM_ELEMENT_ID).innerHTML = round(score.value);
      document.getElementById(SCORE.LIFES_DOM_ELEMENT_ID).innerHTML = score.lifes ? Array(score.lifes).fill(0).map(() => '❤️').join('') : '';
    },
  };

  score.updateScore();

  return score;
};
