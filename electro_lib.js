var ctx;
var WIDTH; 
var HEIGHT;
var intervalId = 0;
var wKeyDown = false;
var sKeyDown = false;
var spaceKeyDown = false;

function Rect(x, y, w, h, xSpeed, ySpeed) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.xSpeed = xSpeed; 
  this.ySpeed = ySpeed;

  this.top = this.y;
  this.left = this.x;
  this.bottom = this.y + this.h;
  this.right = this.x + this.w;
  this.center = this.y + (this.h / 2);

  this.hit = false;
  this.hasBall = false;

  this.updateLocation = function (x, y) {
    this.x = x;
    this.y = y;
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.y + this.h;
    this.right = this.x + this.w;
    this.center = this.y + (this.h / 2);
  }
}

function drawRect(aRect) {
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.rect(aRect.x, aRect.y, aRect.w, aRect.h);
  ctx.closePath();
  ctx.fill();
}

function drawText(aString, x, y) {
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(aString, x, y);
}

function clearScreen() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function onKeyDown(evt) {
  if (evt.keyCode == 87) wKeyDown = true;
  if (evt.keyCode == 83) sKeyDown = true;
  if (evt.keyCode == 32) spaceKeyDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 87) wKeyDown = false;
  if (evt.keyCode == 83) sKeyDown = false;
  if (evt.keyCode == 32) spaceKeyDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function collisionDetected(a, b) {
  var xCollision = false;
  var yCollision = false;

  if ((a.top >= b.top && a.top <= b.bottom) 
      || (a.bottom >= b.top && a.bottom <= b.bottom)) {
        yCollision = true;
      } 

  if ((a.left >= b.left && a.left <= b.right) 
      || (a.right >= b.left && a.right <= b.right)) {
        xCollision = true;
      }

  return (xCollision && yCollision);
}

/* Initializes main game */
function init() {
  ctx = $("#canvas")[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  intervalId = setInterval(runGame, 10);
  return intervalId;
}
