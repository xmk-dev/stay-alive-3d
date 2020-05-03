import './styles/main.css';
import './styles/bootstrap.css';
import { ROUTES } from './config';
import { redirectOnSameSite } from './utils/window-util';

(() => {
  const isSignedIn = !!localStorage.getItem('stayaliveuseridkey');
  const path = window.location.pathname;

  if (path.endsWith(ROUTES.AUTH)){
    return !isSignedIn ? null : redirectOnSameSite(ROUTES.SCORE);
  }

  if (path.endsWith(ROUTES.SCORE) || path.endsWith(ROUTES.GAME)) {
    return !isSignedIn ? redirectOnSameSite(ROUTES.AUTH) : null;
  }

  return redirectOnSameSite(ROUTES.AUTH);
})();
