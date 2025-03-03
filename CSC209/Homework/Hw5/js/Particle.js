class Particle {
  constructor(
    ctx,
    startX,
    startY,
    radius,
    angle,
    velocity,
    wiggle,
    color,
    traceOn,
    traceLength,
    traceColor,
    behavior
  ) {
    this.ctx = ctx;
    this.x = startX;
    this.y = startY;
    this.radius = radius;
    this.angle = angle;
    this.velocity = velocity;
    this.lineLength = velocity * 20;
    this.counter = 0;
    this.counterInterval = Math.random() * 0.2;
    this.offscreenLength = Math.max(this.radius, this.lineLength);
    this.wiggle = wiggle;
    this.color = color;
    this.trace = [];
    this.traceOn = traceOn;
    this.traceLength = traceLength;
    this.traceColor = traceColor;
    this.behavior = behavior;
  }

  move() {
    //Before moving, add the current position to the end of the trace array
    let oldPos = { x: this.x, y: this.y };
    this.trace.push(oldPos);
    //Remove the first element in the array (i.e. the oldest part of the trace).
    // This is a while loop in case traceLength is shortened by an arbitrary amount
    // between the last frame and this one.
    while (this.trace.length > this.traceLength) {
      this.trace.shift();
    }

    //Move the particle along a line pointing in angle direction
    let xMove = Math.cos(this.angle) * this.velocity;
    let yMove = Math.sin(this.angle) * this.velocity;
    this.x += xMove;
    this.y += yMove;

    switch (this.behavior) {
      case "wrap":
        //Wrap around if the particle goes off the screen
        if (this.x > this.ctx.canvas.width + this.offscreenLength) {
          this.x = -this.offscreenLength;
        }
        if (this.x < -this.offscreenLength) {
          this.x = this.ctx.canvas.width + this.offscreenLength;
        }
        if (this.y > this.ctx.canvas.height + this.offscreenLength) {
          this.y = -this.offscreenLength;
        }
        if (this.y < -this.offscreenLength) {
          this.y = this.ctx.canvas.height + this.offscreenLength;
        }
        break;
      case "bounce":
        //Cause particles to bounce when they hit the edge of the canvas.
        // "Pops in" any particles currently on or over the edge.
        if (
          //Left or right edge
          this.x + this.radius > this.ctx.canvas.width ||
          this.x - this.radius < 0
        ) {
          this.angle = Math.PI - this.angle;
          //"pop in"
          while (this.x + this.radius > this.ctx.canvas.width) {
            this.x--;
          }
          while (this.x - this.radius < 0) {
            this.x++;
          }
        }
        if (
          //Top or bottom
          this.y + this.radius > this.ctx.canvas.height ||
          this.y - this.radius < 0
        ) {
          this.angle = -this.angle;
          //"pop in"
          while (this.y + this.radius > this.ctx.canvas.height) {
            this.y--;
          }
          while (this.y - this.radius < 0) {
            this.y++;
          }
        }
        break;
      default:
    }
  }

  //Move angle back and forth on a sine wave.
  // counterInterval controls speed, wiggle controls intensity
  rotate() {
    this.counter += this.counterInterval;
    this.angle += Math.sin(this.counter) * (this.wiggle / 300);
  }

  //Draw this particle
  draw() {
    let c = this.ctx;
    c.fillStyle = this.color;
    this.lineLength = this.velocity * 20;

    if (this.traceOn) {
      //Draw the trace
      this.trace.forEach((element) => {
        c.strokeStyle = this.traceColor;
        c.beginPath();
        c.arc(element.x, element.y, this.radius, 0, 2 * Math.PI);
        c.stroke();
      });
    }

    //Draw the circle
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();

    //Draw the arrow
    c.strokeStyle = "black";
    c.beginPath();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.moveTo(0, 0);
    c.lineTo(this.lineLength, 0);
    c.lineTo(this.lineLength - 5, 5);
    c.moveTo(this.lineLength, 0);
    c.lineTo(this.lineLength - 5, -5);
    c.stroke();

    //Reset the transform to default so future draw calls don't build on this
    c.resetTransform();
  }
}
