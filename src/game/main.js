const renderGame = (root) => {
  const tmp = document.createElement('h1', { innerText: 'WELCOME!' });
  tmp.innerText = 'WORKS!';
  root.appendChild(tmp);
};

module.exports = {
  renderGame,
};
