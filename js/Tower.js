/* The Tower class creates a static tower object with a specified width and height, and displays an image of a tower. */

class Tower {
  /**
   * This is a constructor function that
   * 1. creates a rectangular body with given dimensions and options,
   * 2. adds it to the userWorld, and
   * 3. loads an image for it.
   * @param x - The x-coordinate of the rectangle's center.
   * @param y - The y parameter in the constructor represents the vertical position of the rectangle's
   * center in the physics engine's coordinate system.
   * @param width - The width of the rectangle body of the object being created.
   * @param height - The height of the rectangle body that is being created.
   */
  constructor(x, y, width, height) {
    var options = {
      isStatic: true,
    };
    this.ballImage = loadImage("assets/tower.png");
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    World.add(userWorld, this.body);
  }

  /**
   * This function displays an image of a ball at a given position and angle.
   */
  display() {
    /* `var pos = this.body.position;` is getting the position of the tower object's body in the physics
  engine's coordinate system and storing it in the `pos` variable. */
    var pos = this.body.position;
    var angle = this.body.angle;

    /* `push();` is a function in p5.js that saves the current drawing style settings and
   transformations to a stack so that they can be restored later with `pop();`. This allows for
   transformations and styles to be applied temporarily to a specific object or section of code
   without affecting the rest of the drawing. In this case, `push();` is used to save the current
   transformation state before translating and rotating the tower object, so that the image can be
   drawn at the correct position and angle without affecting the rest of the drawing. */
    //  1 STRAW TO DRINK 5  DIFFERENT DRINKS --- PUSH POP
    push();
    
    /* `translate(pos.x, pos.y);` is a function in p5.js that moves the origin (0,0) of the coordinate
    system to a new position specified by the `pos.x` and `pos.y` values. In this case, it is used
    to move the origin to the center of the tower object's body so that the image can be drawn at
    the correct position. */
    translate(pos.x, pos.y);
    
    /* `rotate(angle);` is a function in p5.js that rotates the coordinate system by a specified angle.
    In this case, it is used to rotate the tower object's image by the angle of the tower object's
    body in the physics engine's coordinate system, so that the image is drawn at the correct
    orientation. */
    rotate(angle);
    
    /* `imageMode(CENTER);` sets the mode for how images are drawn in p5.js. In this case, it sets the
    mode to draw the image from its center point, rather than from its top-left corner. */
    imageMode(CENTER);
    image(this.ballImage, 0, 0, this.width, this.height);
    
    /* `pop();` is a function in p5.js that restores the previous drawing style settings and
    transformations that were saved with `push();`. In this case, it is used to restore the previous
    transformation state after the tower object's image has been drawn, so that any subsequent drawing
    is not affected by the translation and rotation applied to the tower object. */
    pop();
  }
}
