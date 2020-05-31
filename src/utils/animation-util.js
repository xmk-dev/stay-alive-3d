export const MS_IN_SEC = 1000;

export const stopAnimation = (animation) => {
  animation.stop();
};

export const playAnimation = (animation, playInLoop = false) => {
  animation.enabled = true;
  animation.play(playInLoop);

  // eslint-disable-next-line no-underscore-dangle
  return animation._clip.name;
};

export const playAnimationOnce = (animation) => new Promise((resolve, reject) => {
  try {
    playAnimation(animation, false);
    // eslint-disable-next-line no-underscore-dangle
    setTimeout(() => resolve(animation._clip.name), animation._clip.duration * MS_IN_SEC);
  } catch (err) {
    reject(err);
  }
});

export const switchAnimation = (prevAnimation, nextAnimation, playInLoop = false) => {
  stopAnimation(prevAnimation);
  playAnimation(nextAnimation, playInLoop);

  // eslint-disable-next-line no-underscore-dangle
  return nextAnimation._clip.name;
};
