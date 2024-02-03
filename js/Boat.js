/* The Boat class defines the properties and methods for creating and animating boatsArray in a physics
engine using JavaScript. */
class Boat {
  constructor(x, y, width, height, boatPos, boatAnimation) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
      label: "boat"
    };
    this.animation = boatAnimation;
    this.speed = 0.05;
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;

    this.boatPosition = boatPos;
    this.isBroken = false;

    World.add(userWorld, this.body);
  }
  /**
   * The animate function increases the speed by 0.05 and limits it to 1.1.
   */
  animate() {
    this.speed += 0.05 % 1.1;
  }

  /**
   * The "remove" function sets the animation, speed, width, and height of a boat object, removes it
   * from the Matter.js userWorld after a delay, and deletes it from the boatsArray array.
   * @param index - The index parameter is the index of the boat object that needs to be removed from
   * the boatsArray array.
   */
  remove(index) {
    this.animation = brokenBoatAnimation;
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    this.isBroken = true;
    setTimeout(() => {
      Matter.World.remove(userWorld, boatsArray[index].body);
      // boatsArray.splice(index, 1);
      delete boatsArray[index];
    }, 2000);
  }

/**
 * This function displays an animated image of a boat at a certain position and angle.
 */
  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.boatPosition, this.width, this.height);
    noTint();
    pop();
  }
}