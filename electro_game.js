var WIDTH = 640;
var HEIGHT = 480;
var WALL_TOP = 0;
var WALL_LEFT = 0;
var WALL_BOTTOM = HEIGHT;
var WALL_RIGHT = WIDTH;

function initGameObjects() 
{
    myBall = new Rect(320, 240, 10, 10, 4, 2);
    myHuman = new Rect(100, 208, 4, 64, 0, 6);
    myComputer = new Rect(540, 208, 4, 64, 0, 6);
    myComputer.hit = false;
}

function drawOntoScreen() 
{
    clearScreen();
    drawRect(myBall);
    drawRect(myHuman);
    drawRect(myComputer);
}

function updateObjectPositions() 
{
    myBall.updateLocation(myBall.xSpeed, myBall.ySpeed);

    if (sKeyDown) 
    {
        myHuman.updateLocation(0, myHuman.ySpeed);
    }
    if (wKeyDown) 
    {
        myHuman.updateLocation(0, -myHuman.ySpeed);
    }

    if (isWithinRangeOfComputer(myBall)) 
    {
        if (myBall.center <= myComputer.center) 
        {
            myComputer.updateLocation(0, -myComputer.ySpeed);
        }
        if (myBall.center >= myComputer.center) 
        {
            myComputer.updateLocation(0, myComputer.ySpeed);
        }
    }
}

function isWithinRangeOfComputer(aBall)
{
    return aBall.x >= 330 && aBall.x <= 540;
}

function handleObjectCollisions() 
{
    // Human collides with walls
    if (myHuman.top <= WALL_TOP) 
    {
        myHuman.updateLocation(0, myHuman.ySpeed);
    }
    if (myHuman.bottom >= WALL_BOTTOM) 
    {
        myHuman.updateLocation(0, -myHuman.ySpeed);
    }

    // Computer collides with walls
    if (myComputer.top <= WALL_TOP) 
    {
        myComputer.updateLocation(0, myComputer.ySpeed);
    }
    if (myComputer.bottom >= WALL_BOTTOM) 
    {
        myComputer.updateLocation(0, -myComputer.ySpeed);
    }

    // Ball collides with walls
    if (myBall.left < WALL_LEFT || myBall.right > WALL_RIGHT) 
    {
        myBall.xSpeed = -myBall.xSpeed;
    } 
    if (myBall.top < WALL_TOP || myBall.bottom > WALL_BOTTOM) 
    {
        myBall.ySpeed = -myBall.ySpeed;
    }

    // Ball colides with paddles
    if (collisionDetected(myBall, myHuman) && !myHuman.hit)
    {
        myBall.xSpeed = -myBall.xSpeed;
        myHuman.hit = true;
        myComputer.hit = false;
    }
    if (collisionDetected(myBall, myComputer) && !myComputer.hit) 
    {
        myBall.xSpeed = -myBall.xSpeed;
        myComputer.hit = true;
        myHuman.hit = false;
    }
}
