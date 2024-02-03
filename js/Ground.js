/* The Ground class creates a static rectangular body with specified dimensions and displays it on the
screen. */
class Ground {
 /**
  * This is a constructor function that creates a rectangle body with given dimensions and adds it to
  * the userWorld as a static object.
  * @param x - The x-coordinate of the rectangle's position in the userWorld.
  * @param y - The y parameter is the vertical position of the rectangle's top-left corner in the
  * coordinate system of the physics engine.
  * @param width - The width of the rectangle body that will be created.
  * @param height - The height of the rectangle body that will be created using this constructor.
  */
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    World.add(userWorld, this.body);
  }
  /**
   * The function displays a rectangle at the position of the body with a brown fill color.
   */
  display() {
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    fill("brown");
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
