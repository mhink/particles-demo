export default class Axis {
  constructor(canvas) {
    this.canvas = canvas;
  }

  draw() {
    this.canvas.drawPath((path, ctx) => {

      path.moveTo(20, 120);
      path.lineTo(620, 120);

      this.drawTick(100);
      this.drawTick(200);
      this.drawTick(300);
      this.drawTick(400);
      this.drawTick(500);
    }, "rgb(0,0,0)");

    this.canvas.drawCircle(20, this.canvas.midpointY, "rgb(0,0,0)", "rgb(0,0,0)");
  }

  drawTick(tickX, style) {
    this.canvas.drawPath((path, ctx) => {
      ctx.font = "12px sans-serif";
      path.moveTo(tickX + 20, 120);
      path.lineTo(tickX + 20, 130);
      ctx.fillText(tickX.toString(), tickX + 10, 140);
    }, (style || "rgb(0,0,0)"));
  }
}
