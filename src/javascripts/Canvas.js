const TWO_PI = Math.PI * 2;

export default class Canvas {
  constructor(id) {
    this.el  = document.getElementById(id);
    this.ctx = this.el.getContext("2d");
  }

  clear() {
    this.ctx.save();
    this.ctx.clearRect(0,0,this.el.width,this.el.height);
    this.ctx.restore();
  }

  draw(drawFn) {
    this.ctx.save();
    drawFn(this.ctx);
    this.ctx.restore();
  }

  drawPath(drawFn, strokeStyle, fillStyle) {
    this.draw((ctx) => {
      var path = new Path2D();
      drawFn(path, ctx);

      if(strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.stroke(path);
      }
      if(fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill(path);
      }
    });
  }

  drawCircle(x, y, strokeStyle, fillStyle) {
    this.drawPath((path) => {
      path.arc(x, y, 5, 0, TWO_PI, false);
    }, strokeStyle, fillStyle);
  }

  get midpointX() {
    return (this.el.width / 2);
  }

  get midpointY() {
    return (this.el.height / 2);
  }
}


