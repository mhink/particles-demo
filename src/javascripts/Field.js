import _ from "lodash";
import Point from "./Point";

export default class Field {
  constructor(name, fieldFn) {
    this.name = name;
    this.fieldFn = fieldFn;
    this.points = [];
  }

  addPoint(point) {
    this.points.push(point);
  }

  update() {
    _(this.points).forEach((point) => {
      var force = this.fieldFn(point);
      point.applyForce(force);
    }, this).value();
  }
}
