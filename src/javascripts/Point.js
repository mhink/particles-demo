export default class Point {
  constructor(name, canvas, yPos, mass, x0, v0, a0, bounds, debug) {
    this.name = name;
    this.canvas = canvas;
    this.mass = mass;
    this.xPos = x0;
    this.yPos = yPos;
    this.velocity = v0;
    this.acceleration = a0;
    this.bounds = bounds;
    this.accelerationStack = [];
    this.debug = (debug || false);
    this.lastAcceleration = 0;
  }

  applyForce(force) {
    this.accelerationStack.push(force / this.mass);
  }

  applyAcceleration() {
    this.lastAccelerationStack = this.accelerationStack.slice();
    _(this.accelerationStack).each((acc) => {
      this.lastAcceleration += acc;
      this.velocity += acc;
    }).value();
    this.accelerationStack = [];
  }

  applyVelocity() {
    this.xPos += this.velocity;

    if(this.xPos < this.bounds.low) {
      this.xPos = this.bounds.low;
      this.velocity = -(this.velocity * 0.9); // bounce back
    }

    if(this.xPos > this.bounds.high) {
      this.xPos = this.bounds.high;
      this.velocity = -(this.velocity * 0.9); // bounce back
    }
  }

  debug(msg) {
    console.log(msg);
    console.log(this);
  }

  draw() {
    var strokeStyle = "rgb(255,0,0)";
    var fillStyle   = "rgb(255,0,0)";
    this.canvas.drawCircle(this.xPos, this.yPos, strokeStyle, fillStyle);
    if(this.debug) {
      this.canvas.drawPath((path, ctx) => {
        path.moveTo(this.xPos, this.yPos - 10);
        var scaledVelocity = (this.velocity * 5);
        path.lineTo(this.xPos + scaledVelocity, this.yPos - 10);
      }, "rgb(255, 0,0)");

      _(this.lastAccelerationStack).each((acc, ix) => {
        this.canvas.drawPath((path, ctx) => {
          path.moveTo(this.xPos, this.yPos - (20 * ix));
          var scaledAcc = (acc * 5);
          path.lineTo(this.xPos + scaledAcc, this.yPos - (20 * ix));
        }, "rgb(0, 255,0)");
      });
    }
  }
}
