// Electo Tennis
// Author: Samvel Stepanyan
// Version 0.3

initGameObjects();

function runGame() {
  drawOntoScreen();
  handleObjectCollisions();
  updateObjectPositions();
}

window.onload = init;
