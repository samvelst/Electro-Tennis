var WIDTH = 640;
var HEIGHT = 480;
var WALL_TOP = 0;
var WALL_LEFT = 0;
var WALL_BOTTOM = HEIGHT;
var WALL_RIGHT = WIDTH;

function initGameObjects() {
  myBall = new Rect(320, 240, 10, 10, 4, 2);
  myHuman = new Rect(100, 208, 4, 64, 0, 6);
  myComputer = new Rect(540, 208, 4, 64, 0, 5);
  myHuman.points = 0;
  myComputer.points = 0;
  myComputer.hit = false;
  myHuman.hasBall = true;
}

function drawOntoScreen() {
  clearScreen();
  drawRect(myBall);
  drawRect(myHuman);
  drawRect(myComputer);
  drawScore(myHuman, myComputer);
  if (myHuman.hasBall && myHuman.points == 0 && myComputer.points == 0) {
    drawInstructions();
  }
}

function drawScore(player1, player2) {
  drawText(player1.points, WIDTH/2 - 15, 25);
  drawText(player2.points, WIDTH/2 + 5, 25);
}

function drawInstructions() {
  drawText('Press Space!', WIDTH/2 - 30, 150);
}

function updateObjectPositions() {
  if (myHuman.hasBall) {
    myBall.updateLocation(myHuman.right + 1, 
        myHuman.top+(myHuman.h/2));
  } else if (myComputer.hasBall) {
    myBall.updateLocation(myComputer.left - (myBall.w + 1), 
        myComputer.top+(myComputer.h/2));
  } else {
    myBall.updateLocation(myBall.x + myBall.xSpeed,
        myBall.y + myBall.ySpeed);
  }

  if (sKeyDown) {
    myHuman.updateLocation(myHuman.x, myHuman.y + myHuman.ySpeed);
  } else if (wKeyDown) {
    myHuman.updateLocation(myHuman.x, myHuman.y - myHuman.ySpeed);
  }

  if (spaceKeyDown && myHuman.hasBall) {
    myHuman.hasBall = false;
  } else if (myComputer.hasBall) {
    myComputer.hasBall = false;
  }

  if (isWithinRangeOfComputer(myBall)) {
    if (myBall.center <= myComputer.center) {
      myComputer.updateLocation(myComputer.x, 
          myComputer.y - myComputer.ySpeed);
    }
    if (myBall.center >= myComputer.center) {
      myComputer.updateLocation(myComputer.x, 
          myComputer.y + myComputer.ySpeed);
    }
  }
}

function isWithinRangeOfComputer(aBall) {
  return aBall.x >= 330 && aBall.x <= 540;
}

function handleObjectCollisions() {
  if (myHuman.top <= WALL_TOP) {
    myHuman.updateLocation(myHuman.x, 0);
  } else if (myHuman.bottom >= WALL_BOTTOM) {
    myHuman.updateLocation(myHuman.x, WALL_BOTTOM - myHuman.h);
  }

  if (myComputer.top <= WALL_TOP) {
    myComputer.updateLocation(myComputer.x, 0);
  } else if (myComputer.bottom >= WALL_BOTTOM) {
    myComputer.updateLocation(myComputer.x, WALL_BOTTOM - myComputer.h);
  }

  if (myBall.left < WALL_LEFT) {
    myComputer.points += 1;
    myHuman.hasBall = true;
  } else if (myBall.right > WALL_RIGHT) {
    myHuman.points += 1;
    myComputer.hasBall = true;
  } else if (myBall.top < WALL_TOP || myBall.bottom > WALL_BOTTOM) {
    myBall.ySpeed = -myBall.ySpeed;
  }

  if (collisionDetected(myBall, myHuman) && !myHuman.hit) {
    myBall.xSpeed = -myBall.xSpeed;
    myHuman.hit = true;
    myComputer.hit = false;
  } else if (collisionDetected(myBall, myComputer) && !myComputer.hit) {
    myBall.xSpeed = -myBall.xSpeed;
    myComputer.hit = true;
    myHuman.hit = false;
  }
}
