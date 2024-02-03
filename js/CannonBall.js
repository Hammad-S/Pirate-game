/* The CannonBall class defines the properties and methods for a cannonball object in a game. */
class CannonBall {
/**
 * This is a constructor function that creates a cannonball object with specified properties and adds
 * it to the userWorld.
 * @param x - The x-coordinate of the center of the circle body.
 * @param y - The parameter "y" represents the vertical position of the center of the circle that is
 * being created by the Bodies.circle function. It is used to specify the initial y-coordinate of the
 * cannonball's position in the game userWorld.
 */
  constructor(x, y) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
      isStatic: true,
    };
    this.r = 30;
    this.speed = 0.05;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.animation = [this.image];
    this.tower = loadImage("./assets/tower.png");
    this.trajectory = [];
    this.isSink = false;
    World.add(userWorld, this.body);
  }
  /**
   * The animate function increases the speed by 0.05 and limits it to 1.1.
   */

  animate() {
    this.speed += 0.05 % 1.1;
  }

  /**
   * The "remove" function sets a ball's velocity to zero, triggers a water splash animation, removes
   * the ball from the userWorld after a delay, and deletes it from the ballsArray array.
   * @param index - The index parameter is the index of the ball that needs to be removed from the ballsArray
   * array. It is used to access the specific ball object and remove it from the userWorld and the ballsArray
   * array.
   */
  remove(index) {
    this.isSink = true;
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

    this.animation = waterSplashAnimation;
    this.speed = 0.05;
    this.r = 150;
    setTimeout(() => {
      Matter.World.remove(userWorld, this.body);
      delete ballsArray[index];
    }, 1000);
  }

  shoot() {
    var newAngle = cannon.angle - 0.5;
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(20);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, 0 + 4, this.r, this.r);
    pop();

    if (this.body.velocity.x > 0 && this.body.position.x > 10 && !this.isSink) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}
