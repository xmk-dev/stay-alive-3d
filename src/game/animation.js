let animationFrameId;

const getAnimationFrameId = () => animationFrameId;

const runAnimationLoop = ({ renderer, scene, camera }) => {
  animationFrameId = requestAnimationFrame(() => runAnimationLoop({ renderer, scene, camera }));
  renderer.render(scene, camera);
};

module.exports = { runAnimationLoop, getAnimationFrameId };
