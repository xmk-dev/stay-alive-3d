import './styles/main.css';
import './styles/bootstrap.css';
import { ROUTES } from './config';
import { redirectOnSameSite } from './utils/window-util';

(() => {
  const isSignedIn = !!localStorage.getItem('stayaliveuseridkey');
  switch (window.location.pathname) {
    case ROUTES.AUTH:
      return !isSignedIn ? null : redirectOnSameSite(ROUTES.SCORE);

    case ROUTES.SCORE:
      return !isSignedIn ? redirectOnSameSite(ROUTES.AUTH) : null;

    case ROUTES.GAME:
      return !isSignedIn ? redirectOnSameSite(ROUTES.AUTH) : null;

    default:
      return redirectOnSameSite(ROUTES.AUTH);
  }
})();
