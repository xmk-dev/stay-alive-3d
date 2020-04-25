import { round } from 'lodash';
import { SCORE } from '../config';

export default (root) => {
  const scoreElementId = 'score';
  const valueElementId = 'score-value';
  const lifesElementId = 'score-lifes';
  const scoreDiv = document.createElement('div');
  scoreDiv.id = scoreElementId;
  const scoreValueDiv = document.createElement('div');
  scoreValueDiv.id = valueElementId;
  const scoreLifesDiv = document.createElement('div');
  scoreLifesDiv.id = lifesElementId;
  scoreDiv.appendChild(scoreValueDiv);
  scoreDiv.appendChild(scoreLifesDiv);
  root.appendChild(scoreDiv);

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
      document.getElementById(valueElementId).innerHTML = round(score.value);
      document.getElementById(lifesElementId).innerHTML = score.lifes ? Array(score.lifes).fill(0).map(() => '❤️').join('') : '';
    },
  };

  score.updateScore();

  return score;
};
