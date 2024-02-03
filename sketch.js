/* The Boat class defines the properties and methods for creating and animating boatsArray in a physics
simulation using Matter.js and p5.js. */
// PIRATES INVASION GAME

/* These lines of code are importing the necessary modules from the Matter.js library to create a
physics engine for the game. 
`Engine` is the main module that runs the physics simulation, --  UNIVERSE
`World`  is the module that contains all the objects in the simulation, -- EARTH
`Bodies` is the module that creates different types of bodies (such as rectangles, circles, etc.) --- LIVING|nnLIVING THINHS
`Constraint` is the module that creates constraints between bodies such as joints. -- ROPES, STRINGS, SPRINGS, ELASTIC BAND
*/
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

// creating variables to store simulated engine and userWorld
var userEngine, userWorld;
var tower, ground, cannonMachine, cannonBall, boat;

// creating variables to store images
var backgroundIMG,
  boatIMG,
  towerIMG,
  cannonBaseIMG,
  cannonPipeIMG,
  cannonBallIMG;

// creating variables to store sounds
var waterSound, pirateLaughSound, backgroundMusic, explosionSound;

var ballsArray = [];
var boatsArray = [];

var boatAnimation = [];
var boatSpritedata, boatSpritesheet;

var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

var waterSplashAnimation = [];
var waterSplashSpritedata, waterSplashSpritesheet;

/* These are variables being declared without any initial values. 
They will be used later in the code
to store and update values related to the game, such as the angle of the cannon, 
the player's score, whether the game is over or not, and whether the pirates are laughing or not. */
/**
 * This function displays an animated image of a boat at a certain position and angle.
 */
var angle;
var score;
var isGameOver;
var isLaughing;

v/**
 * The function sets the velocity of a body and releases it from being static, based on a new angle
 * and a predetermined velocity.
 */
var pirateLaughSound, backgroundMusic, waterSound, explosionSound;

/**
 * The function preloads various images and sounds for a game.
 */
function preload() {
  backgroundIMG = loadImage("./assets/background.gif");
  boatIMG = loadImage("./assets/boat.png");
  towerIMG = loadImage("./assets/tower.png");
  cannonBaseIMG = loadImage("./assets/cannon_base.png");
  cannonPipeIMG = loadImage("./assets/cannonpipe.png");

  waterSound = loadSound("./assets/cannon_water.mp3");
  pirateLaughSound = loadSound("./assets/pirate_laugh.mp3");
  backgroundMusic = loadSound("./assets/background_music.mp3");
  explosionSound = loadSound("./assets/cannon_explosion.mp3");

  boatSpritedata = loadJSON("./assets/boat/boat.json");
  brokenBoatSpritedata = loadJSON("./assets/boat/broken_boat.json");
  waterSplashSpritedata = loadJSON("./assets/water_splash/water_splash.json");

  boatSpritesheet = loadImage("./assets/boat/boat.png");
  brokenBoatSpritesheet = loadImage("./assets/boat/broken_boat.png");
  waterSplashSpritesheet = loadImage("./assets/water_splash/water_splash.png");
}
/**
 * The function sets up a physics engine using the Matter.js library and initializes variables for
 * angle, score, isGameOver, and isLaughing.
 */
function setup() {
  createCanvas(1200, 600);

  /* These lines of code are creating a physics engine using the `Engine.create()` method from the
  Matter.js library and storing it in the `userEngine` variable. The `userWorld` variable is then
  assigned the value of `userEngine.userWorld`, which is the userWorld object associated with the physics
  engine. This userWorld object contains all the bodies and constraints in the simulation. */
  userEngine = Engine.create();
  userWorld = userEngine.world;

  /* These lines of code are initializing two variables `angle` and `score`. */
  angleMode(DEGREES);
  angle = -PI / 4;
  score = 0;

  /* These lines of code are initializing two variables `isGameOver` and `isLaughing` to `false`. 
  These variables will be used later in the code to keep track of whether the game is over or not and
  whether the pirates are laughing or not. */
  isGameOver = false;
  isLaughing = false;

  /* These lines of code are creating a rectangular body using the `Bodies.rectangle()` method from the
  Matter.js library and storing it in the `ground` variable. The `Bodies.rectangle()` method takes
  in five arguments: the `x` and `y` coordinates of the center of the rectangle, the width and
  height of the rectangle, and an options object that specifies whether the body is static or not.
  In this case, the rectangle has a center at `(0, height - 1)`, a width of `width * 2`, a height of
  `1`, and is set to be static (i.e. it will not move) using the `isStatic: true` option in the
  options object. The `World.add(userWorld, ground)` line adds the `ground` body to the `userWorld`
  userWorld object, which contains all the bodies and constraints in the simulation. This creates a
  ground body at the bottom of the canvas that will prevent other bodies from falling off the
  screen. */
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(userWorld, ground);

  /* These lines of code are creating a rectangular body using the `Bodies.rectangle()` method from the
  Matter.js library and storing it in the `tower` variable. The `Bodies.rectangle()` method takes in
  five arguments: the `x` and `y` coordinates of the center of the rectangle, the width and height
  of the rectangle, and an options object that specifies whether the body is static or not. In this
  case, the rectangle has a center at `(160, 350)`, a width of `160`, a height of `310`, and is set
  to be static (i.e. it will not move) using the `isStatic: true` option in the options object. The
  `World.add(userWorld, tower)` line adds the `tower` body to the `userWorld` userWorld object, which
  contains all the bodies and constraints in the simulation. */
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(userWorld, tower);

  /* The code is creating a new instance of a Cannon object with the following parameters: 
  - x-coordinate: 180
  - y-coordinate: 110
  - width: 130
  - height: 100
  - angle: the value of the variable "angle" */
  cannon = new Cannon(180, 110, 130, 100, angle);

  //   /* The code is creating a new instance of a Boat object with the following parameters:
  //  - 80: the x-coordinate of the boat's starting position
  //  - 100: the y-coordinate of the boat's starting position
  //  - 170: the width of the boat
  //  - 50: the height of the boat. */
  //   boat = new Boat(80, 100, 170, 50, -80);

  //   each frame, it extracts the position of the frame and uses it to get the corresponding image from
  //  the sprite sheet. The extracted images are then added to an array called `boatAnimation`. */
  var boatFrames = boatSpritedata.frames;
  console.log(boatFrames);
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSplashSpritedata.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }
}

/**
 * The function updates the physics engine and displays the player's score on the canvas.
 */
function draw() {
  background(189);

  /* 
  Displaying the `backgroundIMG` image on the canvas at position (0,0) with a width and height equal
  to the width and height of the canvas. 
  */
  image(backgroundIMG, 0, 0, width, height);

  /* The code is checking if the background music is not currently playing. If it is not playing, it
  will start playing the music and set the volume to 0.1. */
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.0005);
  }

  /* `Engine.update(engine);` is updating the physics engine by calculating the changes in position,
  velocity, and acceleration of all the bodies in the simulation based on the forces acting on them.
  It is typically called once per frame to update the simulation. */
  Engine.update(userEngine);

  /* These lines of code are displaying the player's score on the canvas. */
  fill("#6d4c41");
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`Score:${score}`, width - 200, 50);

  //display ground body
  push();
  fill("Blue");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  //display tower body
  push();
  fill("red");
  imageMode(CENTER);
  image(towerIMG, tower.position.x, tower.position.y, 160, 310);
  pop();

  //display cannon object
  cannon.display();

  /* `showBoats()` is a function that displays boatsArray on the screen and updates their position. It checks
if there are any boatsArray in the `boatsArray` and if there are, it updates their velocity and displays
them on the canvas using the `display()` method of the `Boat` object. If there are no boatsArray in the
`boatsArray`, it creates a new `Boat` object and adds it to the array. This function is called in
the `draw()` function to display and update the position of all the boatsArray in the game. */
  showBoats();

  /* This code is looping through the `ballsArray` array using a `for` loop. For each element in the
  array, it calls the `showCannonBalls()` function and passes in two arguments: the current element
  in the array (`ballsArray[i]`) and the index of that element (`i`). The `showCannonBalls()`
  function then displays the cannon ball on the canvas using the `display()` method of the
  `CannonBall` object. This loop is used to display all the cannon ballsArray in the `ballsArray` array
  on the canvas. */
  for (var i = 0; i < ballsArray.length; i++) {
    //function call to display each cannon ball acording to the positoion
    /* `showCannonBalls(ballsArray[i], i);` is calling the `showCannonBalls()` function and passing in
    two arguments: the current element in the `ballsArray` array (`ballsArray[i]`) and the index of
    that element (`i`). The `showCannonBalls()` function then displays the cannon ball on the canvas
    using the `display()` method of the `CannonBall` object. This loop is used to display all the
    cannon ballsArray in the `ballsArray` array on the canvas. */
    showCannonBalls(ballsArray[i], i);

    /* The above code is function call to a function named "collisionWithBoat" with a parameter "i". */
    detedctCollisionWithBoat(i);
  }
}

/**
 * The function creates a new cannon ball object and adds it to an array when the down arrow key is
 * pressed.
 */
function keyPressed() {
  /* `if (keyCode === DOWN_ARROW) {` is checking if the key that was pressed is the down arrow key. If
  it is, then the code inside the block will be executed. In this case, it creates a new cannon ball
  object and adds it to an array. */
  if (keyCode === DOWN_ARROW) {
    /* `var cannonBall = new CannonBall(cannon.x, cannon.y);` is creating a new `CannonBall` object and
    storing it in the `cannonBall` variable. The `CannonBall` object is created using the
    `CannonBall` constructor function and is passed the `x` and `y` coordinates of the cannon as
    arguments. This creates a new cannon ball object at the position of the cannon. */
    var cannonBall = new CannonBall(cannon.x, cannon.y);

    /* `cannonBall.trajectory = [];` is initializing an empty array called `trajectory` for the
    `cannonBall` object. This array will be used later in the code to store the trajectory of the
    cannon ball as it moves through the air. */
    cannonBall.trajectory = [];

    /* `Matter.Body.setAngle(cannonBall.body, cannon.angle);` is setting the angle of the `cannonBall`
    object's body to the same angle as the `cannon` object. This ensures that the cannon ball is
    fired in the direction of the cannon's angle. */
    Matter.Body.setAngle(cannonBall.body, cannon.angle);

    /* `ballsArray.push(cannonBall);` is adding a new `CannonBall` object to the `ballsArray` array.
    This is done when the down arrow key is pressed, creating a new cannon ball object and adding it
    to the array. */
    ballsArray.push(cannonBall);
  }
}

/**
 * The function checks for collisions between ballsArray and boatsArray, and removes the boat and ball if a
 * collision occurs.
 * @param index - The index parameter is the index of the ball in the ballsArray array that is being checked
 * for collision with the boatsArray.
 */
function detedctCollisionWithBoat(index) {
  /* The code is using a for loop to iterate through an array called "boatsArray" and perform some
 action on each element in the array. The loop starts at index 0 and continues until it reaches the
 end of the array (determined by the length of the array). */
  for (var i = 0; i < boatsArray.length; i++) {
    /* The code is checking if the elements at the specified index in the arrays "ballsArray" and
  "boatsArray" are not undefined. If both elements are not undefined, the code inside the if statement
  will be executed. */
    if (ballsArray[index] !== undefined && boatsArray[i] !== undefined) {
      /* The above code is using the Matter.js library to check for collisions between two bodies - one
      from an array of ballsArray and the other from an array of boatsArray. The SAT (Separating Axis Theorem)
      method is used to perform the collision detection. The result of the collision detection is
      stored in the `collision` variable. */
      var collision = Matter.SAT.collides(
        ballsArray[index].body,
        boatsArray[i].body
      );

      /* The code is checking if there has been a collision and if so, it will execute some code that
      is represented by the " */
      if (collision.collided) {
        //if index = 0, ballsArray[0] = the 1st ball  ----- index = 0
        //if we have 4 boatsArray available in boatsArray  ----- i = 0, 1, 2, 3
        //if ( ballsArray[0] = the 1st ball    COLLIDED  with  boatsArray[0] = the 1st boat)
        //OR
        //if ( ballsArray[0] = the 1st ball    COLLIDED  with  boatsArray[1] = the 2nd boat)
        //OR
        //if ( ballsArray[0] = the 1st ball    COLLIDED  with  boatsArray[2] = the 3rd boat)
        //OR
        //if ( ballsArray[0] = the 1st ball    COLLIDED  with  boatsArray[3] = the 4nd boat)

        /* The above code is likely attempting to remove an element from an array called `boatsArray`
        at the index `i`. However, the method `remove()` is not a built-in method for arrays in
        JavaScript, so it may not work as intended. */
        boatsArray[i].remove(i);

        /* The above code is removing a body from the Matter.js userWorld and deleting it from an array
        called `ballsArray`. The specific body being removed is determined by the `index` variable. */
        Matter.World.remove(userWorld, ballsArray[index].body);

        /* The above code is deleting an element from an array called `ballsArray` at a specific index
        `index`. The `delete` keyword is used to remove the element at the specified index, but it
        does not change the length of the array. The deleted element will be replaced with
        `undefined`. */
        delete ballsArray[index];
      }
    }
  }
}

/* The `showCannonBalls()` function takes in two parameters `ball` and `index`. It is used to display
each cannon ball on the canvas by calling the `display()` method of the `CannonBall` object. The
`ball` parameter represents a single cannon ball object from the `ballsArray`, and the `index`
parameter represents the index of that object in the array. The function checks if the `ball`
parameter is truthy (i.e. not null or undefined) and if it is, it calls the `display()` method of
the `CannonBall` object to display it on the canvas. This function is called in the `draw()`
function to display all the cannon ballsArray in the `ballsArray`. */
function showCannonBalls(ball, index) {
  /* `if (ball) {` is checking if the `ball` variable is truthy (i.e. not null, undefined, 0, false, or
  an empty string). If `ball` is truthy, then the code inside the block will be executed. This is
  done to ensure that only existing cannon ballsArray are displayed on the canvas, and not null or
  undefined values in the `ballsArray`. */
  if (ball) {
    /* The code is calling two methods on an object named "ball". The first method "display()" is
    displaying the ball on the screen and the second method "animate()" is animating the ball,
    possibly by changing its position or size over time. */
    ball.display();
    ball.animate();
    /* The above code is checking if the x-coordinate of the ball's position is greater than or equal
    to the width of the canvas or if the y-coordinate of the ball's position is greater than or
    equal to the height of the canvas minus 50. If either of these conditions is true, it plays a
    water sound and removes the ball from the canvas. */
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      waterSound.play();
      waterSound.setVolume(0.03);
      ball.remove(index);
    }
  }
}

//function to shoot the cannon ball
/**
 * The function triggers the shoot method of the last ball in an array when the down arrow key is
 * released.
 */
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    /* `ballsArray[ballsArray.length - 1].shoot();` is calling the `shoot()` method of the last element in the
    `ballsArray` array. This is done when the down arrow key is released, triggering the cannon ball to
    be fired in the direction of the cannon's angle. */
    ballsArray[ballsArray.length - 1].shoot();
    explosionSound.play();
    explosionSound.setVolume(0.05);
  }
}

/**
 * The function displays boatsArray on the screen and updates their position.
 */
function showBoats() {
  /* The code is checking if the length of the `boatsArray` is greater than 0. If it is, then the
code inside the if statement will be executed. */
  if (boatsArray.length > 0) {
    /* The code is checking if the last element of the `boatsArray` is undefined or if the
    x-coordinate of the body of the last boat in the array is less than the width of the canvas
    minus 300. */
    if (
      boatsArray.length < 4 ||
      boatsArray[boatsArray.length - 1].body.position.x < width - 300
    ) {
      /* The code is declaring an array called `positionsArray` with four elements and assigning it
    some values. It is also declaring a variable called `position` and assigning it a random value
    from the `positionsArray`.  */
      var positionsArray = [-40, -60, -70, -20];
      var position = random(positionsArray);
      /* The code is creating a new object called "boat" using the constructor function "Boat". The
      constructor function takes in five arguments: "width", "height", "170", "170", and "position". The
      values of "width" and "height" are used to set the position of the boat on the canvas, while the
      values of "170" and "170" are used to set the size of the boat. The "position" argument is used to
      determine the direction the boat is facing. */
      var boat = new Boat(
        width,
        height - 100,
        170,
        170,
        position,
        boatAnimation
      );

      /* The code is adding a new element (boat) to the end of an array called boatsArray using
      the push() method in JavaScript. */
      boatsArray.push(boat);
    }

    /* The code is using a for loop to iterate through an array called "boatsArray". For each
    element in the array that is not null or undefined, it is setting the velocity of the body
    associated with that element using the Matter.js physics engine. Specifically, it is setting the
    velocity to move to the left at a speed of 0.9 pixels per frame in the x direction and 0 pixels
    per frame in the y direction. Finally, it is calling the "display" method on the boat object
    associated with that element to render it on the screen. */
    for (var i = 0; i < boatsArray.length; i++) {
      if (boatsArray[i] != null) {
        Matter.Body.setVelocity(boatsArray[i].body, {
          x: -1.5,
          y: 0,
        });
        boatsArray[i].display();
        boatsArray[i].animate();

        /* The above code is checking for collision between two objects using the Separating Axis Theorem
      (SAT) algorithm. It is checking for collision between the "tower" object and the "body" of the
      i-th element in the "boatsArray" array. The result of the collision check is stored in the
      "collision" variable. */
        var collision = Matter.SAT.collides(this.tower, boatsArray[i].body);

        /* The above code is checking if there is a collision between two objects and if the boat at index i is
      not already broken. */
        if (collision.collided && !boatsArray[i].isBroken) {
          //Added isLaughing flag and setting isLaughing to true
          if (!isLaughing && !pirateLaughSound.isPlaying()) {
            pirateLaughSound.play();
            pirateLaughSound.setVolume(0.03);
            isLaughing = true;
          }
          isGameOver = true;
          /* The above code is not valid JavaScript code. It contains an undefined function `gameOver()`
       and an invalid character `#`. */
          gameOver();
        }
      }
    }
  } else {
    /* The code is creating a new instance of a Boat object and adding it to an array called
  boatsArray. The Boat object is being initialized with the parameters of width, height - 60, 170,
  170, and -60. */
    var boat = new Boat(width, height - 60, 170, 170, -6, boatAnimation);
    boatsArray.push(boat);
  }
}

/**
 * The function displays a pop-up message using the SweetAlert library with a "Game Over" message and a
 * "Play Again" button that reloads the page when clicked.
 */
function gameOver() {
  /* The above code is displaying a pop-up message using the SweetAlert library with a title, text, and
  image. It also includes a "Play Again" button. When the "Play Again" button is clicked, the page
  will be reloaded. */
  swal(
    {
      title: `Game Over!!!`,
      text: "thanks for playing",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again",
    },
    /* This code is a function in JavaScript that takes a boolean parameter called `isConfirm`. If
   `isConfirm` is true, the function will reload the current page using the `location.reload()`
   method. */
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

/* The above code is demonstrating how to create an empty array and how to initialize an array with
values. It also shows how to access and modify values in an array using index notation.
Additionally, it explains how to calculate the length of an array and how indexing works in arrays. */

// array1 = []; // empty array
// sample = [23, 56, 76, 453];//this array contains 4 items
// sample[0] = 23
// sample [1] = 56;
// sample [2] = 76
// sample[3]  = 453;

// the length of an array is calculated by the number of items
// so,   sample.length = 4

// in Arrays, the values are stored in indexed cells. the indexing always must start from 0
// so, here, sample.length - 1 = 3 = last item in the array

// when we run a loop over any complete Array, the loop must run equal times to the number of items in the array
// for(i = 0; i < sample.length - 1; i ++){
//   print(sample[i]);
//   print(sample[i]);
//}}
