/* The Cannon class displays a cannon with a base that can be rotated using the left and right arrow
keys. */
class Cannon {
  /**
   * This is a constructor function that initializes properties for a cannon object in JavaScript.
   * @param x - The x-coordinate of the cannon's position on the canvas.
   * @param y - The parameter "y" represents the vertical position of the cannon on the screen or
   * canvas.
   * @param width - The width of the cannon.
   * @param height - The `height` parameter in the constructor is used to set the height of the cannon
   * object being created. It is a numeric value that determines the vertical size of the cannon.
   * @param angle - The angle parameter represents the angle at which the cannon is positioned. It is
   * likely measured in degrees or radians and determines the direction in which the cannon will fire.
   */
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannonBaseIMG = loadImage("./assets/cannon_base.png");
    this.cannonPipeIMG = loadImage("./assets/cannonpipe.png");
  }
  display() {
    /* The code block is checking if the right or left arrow keys are being pressed and updating the
  `angle` property of the `Cannon` object accordingly. If the right arrow key is pressed and the
  current angle is less than 0.6, the angle is increased by 0.01. If the left arrow key is pressed
  and the current angle is greater than -1, the angle is decreased by 0.01. This allows the user to
  rotate the cannon base left and right using the arrow keys. */
    if (keyIsDown(RIGHT_ARROW) && this.angle < 0.6) {
      this.angle += 0.01;
    }

    if (keyIsDown(LEFT_ARROW) && this.angle > -1) {
      this.angle -= 0.01;
    }

    /* This is the `display()` method of the `Cannon` class in JavaScript. It is responsible for
 displaying the cannon on the canvas. */
    fill("#676e6a");
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannonPipeIMG, 0, 0, this.width, this.height);
    pop();
    image(this.cannonBaseIMG, 70, 20, 200, 200, PI, TWO_PI);
    noFill();
  }
}
