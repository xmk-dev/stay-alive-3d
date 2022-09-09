import './styles/main.css';
import './styles/bootstrap.css';
import { ROUTES } from './config';
import { redirectOnSameSite } from './utils/window-util';

(() => {
  const isSignedIn = !!localStorage.getItem('stayaliveuseridkey');
  const path = window.location.pathname;

  // if (path.includes(ROUTES.AUTH)) {
  //   return !isSignedIn ? null : redirectOnSameSite(ROUTES.SCORE);
  // }

  // if (path.includes(ROUTES.SCORE) || path.includes(ROUTES.GAME)) {
  //   return !isSignedIn ? redirectOnSameSite(ROUTES.AUTH) : null;
  // }

  return redirectOnSameSite(ROUTES.GAME);
})();
