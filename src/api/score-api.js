const SCORE_API_BASE_URL = 'https://marcinxkaminski-leaderboard.herokuapp.com';
const USERS_BASE_PATH = '/users';

export const fetchFromScoreApi = async (endpointPath, method = 'GET', body) => {
  const res = await fetch(`${SCORE_API_BASE_URL}${endpointPath}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const saveScore = (id, score) => (
  fetchFromScoreApi(USERS_BASE_PATH, 'PUT', { id, score })
);

export const getScores = (id) => (
  fetchFromScoreApi(`${USERS_BASE_PATH}/${id}`)
);
