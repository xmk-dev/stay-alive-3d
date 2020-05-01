export const redirectOnSameSite = (path) => {
  const { protocol, host } = window.location;
  window.location.replace(`${protocol}//${host}${path}`);
};
