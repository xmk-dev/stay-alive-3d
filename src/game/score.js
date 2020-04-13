import { SCORE } from './constants';

export const createScore = (root) => {
  const scoreElementId = 'score';
  const valueElementId = 'score-value';
  const lifesElementId = 'score-lifes';
  const scoreDiv = document.createElement('div');
  scoreDiv.id = scoreElementId;
  const scoreValueDiv = document.createElement('div');
  scoreValueDiv.id = valueElementId;
  const scoreLifesDiv = document.createElement('div');
  scoreLifesDiv.id = lifesElementId;
  scoreValueDiv.innerHTML = '20';
  scoreLifesDiv.innerHTML = Array(SCORE.LIFES).fill(0).map(() => '❤️').join('');
  scoreDiv.appendChild(scoreValueDiv);
  scoreDiv.appendChild(scoreLifesDiv);
  root.appendChild(scoreDiv);

  const score = {
    value: SCORE.VALUE,
    lifes: SCORE.LIFES,
    incrementScore: (value = 0) => {
      score.value += value + SCORE.INCREASE_VALUE;
      score.updateScore();
    },
    decrementScore: () => {
      score.value -= SCORE.DECREASE_VALUE;
      score.lifes -= 1;
      score.updateScore();
    },
    updateScore: () => {
      document.getElementById(valueElementId).innerHTML = score.value;
      document.getElementById(lifesElementId).innerHTML = score.lifes ? Array(score.lifes).fill(0).map(() => '❤️').join('') : '';
    },
  };

  return score;
};
