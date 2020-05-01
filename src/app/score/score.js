import { ROUTES } from '../../config';
import { getScores } from '../../api/score-api';
import { redirectOnSameSite } from '../../utils/window-util';

const SCORE_VALUE_DOM_ELEMENT_ID = 'score-value';
const HIGHEST_SCORE_VALUE_DOM_ELEMENT_ID = 'highest-score-value';

export const attachPlayHandler = () => {
  document.getElementById('play-button').addEventListener('click', () => {
    redirectOnSameSite(ROUTES.GAME);
  });
};

export const initScores = async () => {
  const id = localStorage.getItem('stayaliveuseridkey');

  let scoreValue;
  let highestScoreValue;
  try {
    const { lastScore, maxScore } = await getScores(id);
    scoreValue = lastScore;
    highestScoreValue = maxScore;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  document.getElementById(SCORE_VALUE_DOM_ELEMENT_ID).innerHTML = scoreValue || 0;
  document.getElementById(HIGHEST_SCORE_VALUE_DOM_ELEMENT_ID).innerHTML = highestScoreValue || 0;
};
