import { SCORE } from '../../config';

export default () => {
  const score = {
    value: SCORE.VALUE,
    lifes: SCORE.LIFES,
    incrementScore: async (value = 0) => {
      score.value += value + SCORE.INCREASE_VALUE;
      score.updateScoreDOM();
    },
    decrementScore: async () => {
      score.value -= SCORE.DECREASE_VALUE;
      score.lifes -= SCORE.LIFES_DECREASE_VALUE;
      score.updateScoreDOM();
    },
    updateScoreDOM: async () => {
      document.getElementById(SCORE.VALUE_DOM_ELEMENT_ID).innerHTML = Math.round(score.value);
      document.getElementById(SCORE.LIFES_DOM_ELEMENT_ID).innerHTML = score.lifes ? Array(score.lifes).fill(0).map(() => '❤️').join('') : '';
    },
    displayGameOverDOM: async () => {
      document.getElementById(SCORE.GAME_OVER_DOM_ELEMENT_ID).style.visibility = 'visible';
    },
  };

  score.updateScoreDOM();

  return score;
};
