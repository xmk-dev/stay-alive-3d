import './styles/main.css';
import './styles/bootstrap.css';
import { ROUTES, BASE_URL } from './config';
import { redirectOnSameSite } from './utils/window-util';

(() => {
  const isSignedIn = !!localStorage.getItem('stayaliveuseridkey');
  const url = window.location.href;

  if (url === `${BASE_URL}${ROUTES.AUTH}`) {
    return !isSignedIn ? null : redirectOnSameSite(ROUTES.SCORE);
  }

  if (
    url === `${BASE_URL}${ROUTES.SCORE}`
    || url === `${BASE_URL}${ROUTES.GAME}`
  ) {
    return !isSignedIn ? redirectOnSameSite(ROUTES.AUTH) : null;
  }

  return redirectOnSameSite(ROUTES.AUTH);
})();
