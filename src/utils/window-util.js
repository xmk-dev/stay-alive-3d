import { BASE_URL } from '../config';

export const redirectOnSameSite = async (path) => {
  window.location.replace(`${BASE_URL}${path}`);
};
