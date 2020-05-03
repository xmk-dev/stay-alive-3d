import { BASE_URL } from '../config';

export const redirectOnSameSite = (path) => {
  window.location.replace(`${BASE_URL}${path}`);
};
