class GameOfLife {
  constructor(cellsWide, cellsHigh) {
    this.animate = true;
    this.speed = 100;
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.cellsWide = cellsWide;
    this.cellsHigh = cellsHigh;
    this.cellWidth = this.canvas.width / cellsWide;
    this.cellHeight = this.canvas.height / cellsHigh;
    //Main array
    this.rows = [];
    //fill rows array with random 0 or 1 values
    for (let i = 0; i < this.cellsHigh; i++) {
      this.rows[i] = [];
      for (let j = 0; j < this.cellsWide; j++) {
        //let canvasPoint = this.getCanvasPoint(j, i);
        this.rows[i][j] = new Cell(
          this.ctx,
          j,
          i,
          this.cellWidth,
          this.cellHeight
        );
        this.rows[i][j].aliveNextFrame = Math.random() > 0.9 ? 1 : 0;
      }
    }
    console.log(this.rows.length);
    this.drawAll();

    if (this.animate) {
        this.currentID = setInterval(() => {
            this.drawAll();
          }, this.speed);
    }
  }

  drawAll() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#000000";
    //draw this frame
    let cell;

    //must update alive status of all cells before looping through to check on neighbors
    for (let i = 0; i < this.cellsHigh; i++) {
        for (let j = 0; j < this.cellsWide; j++) {
            cell = this.rows[i][j];
            cell.alive = cell.aliveNextFrame;
        }
    }

    for (let i = 0; i < this.cellsHigh; i++) {
      for (let j = 0; j < this.cellsWide; j++) {
        cell = this.rows[i][j];
        //cell.alive = cell.aliveNextFrame;
        let neighborCount = this.getNeighborCount(cell);
        if (cell.alive === 1) {
          cell.draw();
          if (neighborCount < 2 || neighborCount > 3) {
            cell.aliveNextFrame = 0;
          }
        } else if (neighborCount === 3) {
          cell.aliveNextFrame = 1;
        }
      }
    }
  }

  getNeighborCount(cell) {
    let x = cell.x;
    let y = cell.y;
    let edges = this.checkEdges(cell);
    let neighborCount = 0;

    if (!edges.top) {
      //above center
      neighborCount += this.rows[y - 1][x].alive;
      if (!edges.left) {
        //above left
        neighborCount += this.rows[y - 1][x - 1].alive;
      }
      if (!edges.right) {
        //above right
        neighborCount += this.rows[y - 1][x + 1].alive;
      }
    }

    if (!edges.bottom) {
      //bottom center
      neighborCount += this.rows[y + 1][x].alive;
      if (!edges.left) {
        //bottom left
        neighborCount += this.rows[y + 1][x - 1].alive;
      }
      if (!edges.right) {
        //bottom right
        neighborCount += this.rows[y + 1][x + 1].alive;
      }
    }

    if (!edges.left) {
      //left
      neighborCount += this.rows[y][x - 1].alive;
    }

    if (!edges.right) {
      //right
      neighborCount += this.rows[y][x + 1].alive;
    }
    //neighborCount +=
    //this.rows[y - 1][x - 1].alive +
    //this.rows[y - 1][x].alive +
    //this.rows[y - 1][x + 1].alive +
    //to left and right
    //this.rows[y][x - 1].alive +
    //this.rows[y][x + 1].alive;
    //below
    //this.rows[y + 1][x - 1].alive,
    //this.rows[y + 1][x].alive,
    //this.rows[y + 1][x + 1];

    console.log(neighborCount);
    return neighborCount;
  }

  checkEdges(cell) {
    let edges = {
      top: cell.y === 0,
      bottom: cell.y === this.cellsHigh - 1,
      left: cell.x === 0,
      right: cell.x === this.cellsWide - 1,
    };
    return edges;
  }
}
