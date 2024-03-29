const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var userEngine,
  userWorld,
  backgroundImg,
  waterSound,
  pirateLaughSound,
  backgroundMusic,
  cannonExplosion;
var canvas, angle, tower, ground, cannon, boat;
var ballsArray = [];
var boatsArray = [];
var score = 0;
var boatAnimation = [];
var boatSpritedata, boatSpritesheet;

var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

var waterSplashAnimation = [];
var waterSplashSpritedata, waterSplashSpritesheet;

var isGameOver = false;
var isLaughing = false;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  backgroundMusic = loadSound("./assets/background_music.mp3");
  waterSound = loadSound("./assets/cannon_water.mp3");
  pirateLaughSound = loadSound("./assets/pirate_laugh.mp3");
  cannonExplosion = loadSound("./assets/cannon_explosion.mp3");
  towerImage = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");
  brokenBoatSpritedata = loadJSON("assets/boat/broken_boat.json");
  brokenBoatSpritesheet = loadImage("assets/boat/broken_boat.png");
  waterSplashSpritedata = loadJSON("assets/water_splash/water_splash.json");
  waterSplashSpritesheet = loadImage("assets/water_splash/water_splash.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  userEngine = Engine.create();
  userWorld = userEngine.userWorld;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 130, 100, angle);

  var boatFrames = boatSpritedata.frames;
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

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.1);
  }

  Engine.update(userEngine);
  ground.display();

  showBoats();

  for (var i = 0; i < ballsArray.length; i++) {
    showCannonBalls(ballsArray[i], i);
    for (var j = 0; j < boatsArray.length; j++) {
      if (ballsArray[i] !== undefined && boatsArray[j] !== undefined) {
        var collision = Matter.SAT.collides(ballsArray[i].body, boatsArray[j].body);
        if (collision.collided) {
          if (!boatsArray[j].isBroken && !ballsArray[i].isSink) {
            score += 5;
            boatsArray[j].remove(j);
            j--;
          }

          Matter.World.remove(userWorld, ballsArray[i].body);
          // ballsArray.splice(i, 1);
          delete ballsArray[i];
          i--;
        }
      }
    }
  }

  cannon.display();
  tower.display();

  fill("#6d4c41");
  textSize(40);
  text(`Score:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    ballsArray.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      if (!ball.isSink) {
        waterSound.play();
        ball.remove(index);
      }
    }
  }
}

function showBoats() {
  if (boatsArray.length > 0) {
    if (
      boatsArray[boatsArray.length - 1] === undefined ||
      boatsArray[boatsArray.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 100,
        170,
        170,
        position,
        boatAnimation
      );

      boatsArray.push(boat);
    }

    for (var i = 0; i < boatsArray.length; i++) {
      if (boatsArray[i]) {
        Matter.Body.setVelocity(boatsArray[i].body, {
          x: -0.9,
          y: 0
        });

        boatsArray[i].display();
        boatsArray[i].animate();
        var collision = Matter.SAT.collides(tower.body, boatsArray[i].body);
        if (collision.collided && !boatsArray[i].isBroken) {
          //Added isLaughing flag and setting isLaughing to true
          if (!isLaughing && !pirateLaughSound.isPlaying()) {
            pirateLaughSound.play();
            isLaughing = true;
          }

          isGameOver = true;
          gameOver();
        }
      } else {
        boatsArray[i];
      }
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boatsArray.push(boat);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    cannonExplosion.play();
    ballsArray[ballsArray.length - 1].shoot();
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}