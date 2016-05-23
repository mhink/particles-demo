import Point from "./Point";
import Canvas from "./Canvas";
import Axis from "./Axis";
import Field from "./Field";

import {
} from "./utils";

class App {
  constructor() {
    this.time = 0;

    this.canvas = new Canvas("main-canvas");
    this.axis = new Axis(new Canvas("axis-canvas"));

    this.sineField = new Field("sine", function(point) {
      var force = 0.5 * Math.sin(Math.PI * (point.xPos / 300));
      return force;
    });

    this.frictionField = new Field("friction", function(point) {
      return -(point.velocity * 0.05 * point.mass);
    });

    var point1 = new Point("point1", this.canvas, this.canvas.midpointY, 1, 100, 0, 2, {
      low: 20,
      high: 620
    });

    this.sineField.addPoint(point1);
    this.frictionField.addPoint(point1);
    this.points = [];
    this.points.push(point1);

    this.axis.draw();

    setInterval(this.update.bind(this), 10);
  }

  update() {
    this.time += 1;
    this.canvas.clear();

    this.sineField.update();
    this.frictionField.update();

    _(this.points).each((point) => {
      point.applyAcceleration();
      point.applyVelocity();
      point.draw();
    }).value();
  }

  render() {
  }
};

export default new App();
