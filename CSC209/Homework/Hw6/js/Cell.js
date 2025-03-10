class Cell {
  constructor(ctx, cellX, cellY, width, height) {
    this.ctx = ctx;
    //x and y are cell grid coordinates
    this.x = cellX;
    this.y = cellY;
    this.width = width;
    this.height = height;
    this.canvasPoint = {
      x: this.x * this.width,
      y: this.y * this.height,
    };
    this.alive = 0;
    this.aliveNextFrame = 0;
  }

  draw() {
    if(this.alive) {
      this.ctx.fillStyle = "#000000"
      this.ctx.fillRect(
        this.canvasPoint.x,
        this.canvasPoint.y,
        this.width,
        this.height
      );
    }
  }

  //Make this cell white
  clear() {
    this.ctx.fillStyle = "#ffffff"
    this.ctx.fillRect(
      this.canvasPoint.x,
      this.canvasPoint.y,
      this.width,
      this.height
    );
  }
}
