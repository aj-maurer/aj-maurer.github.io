class GameOfLife {
  constructor(cellsWide, cellsHigh, clusters, clusterRadius, clusterPattern) {
    this.currentID = null;
    this.animate = false;
    this.speed = document.getElementById("speedSlider").max - document.getElementById("speedSlider").value;
    this.canvas = document.getElementById("myCanvas");
    this.dragging = false;
    this.cellsToCheck = [];
    this.drawBlack = true;
    this.ctx = this.canvas.getContext("2d");
    this.cellsWide = cellsWide;
    this.cellsHigh = cellsHigh;
    this.cellWidth = this.canvas.width / this.cellsWide;
    this.cellHeight = this.canvas.height / this.cellsHigh;
    if (clusters !== undefined) {
      this.clusters = clusters;
    }
    if (clusterRadius !== undefined) {
      this.clusterRadius = clusterRadius;
    }
    if (clusterPattern !== undefined) {
      this.clusterPattern = clusterPattern;

    }
    //Main array
    this.rows = [];
    //fill rows array with random 0 or 1 values
    for (let i = 0; i < this.cellsHigh; i++) {
      this.rows[i] = [];
      for (let j = 0; j < this.cellsWide; j++) {
        this.rows[i][j] = new Cell(
          this.ctx,
          j,
          i,
          this.cellWidth,
          this.cellHeight
        );
        //below is for overall randomness
        //this.rows[i][j].aliveNextFrame = Math.random() > 0.5 ? 1 : 0;
      }
    }
    this.setupInteraction(this.canvas);
    this.generateClusters(this.clusters, this.clusterRadius, this.clusterPattern);
    console.log("cellWidth: " + this.cellWidth + ", " + this.cellHeight);
    this.drawAll();
  }

  setupInteraction(canvas) {
    canvas.addEventListener("mousedown", this.onMouseDown.bind(this), false);
    canvas.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    canvas.addEventListener("mouseup", this.onMouseUp.bind(this), false);
    //canvas.addEventListener("mouseleave", this.onMouseLeave.bind(this), false);
  }

  onMouseDown() {
    this.dragging = true;
  }

  onMouseMove(e) {
    if(this.dragging) {
    let cell = this.getHoveredCell(e.offsetX, e.offsetY);
    //add cell to array of cells to check
    
    if (this.animate) {
      cell.aliveNextFrame = 1;
    } else if (this.drawBlack) {
      //drawing black
      cell.alive = 1;
      cell.draw();
      if (!this.cellsToCheck.includes(cell)) {
        this.cellsToCheck.push(cell);
      }
    } else {
      //NOT WORKING
      //drawing white
      cell.alive = 0;
      cell.clear();
      if (!this.cellsToCheck.includes(cell)) {
        this.cellsToCheck.push(cell);
      }
    }
    }
  }

  onMouseUp() {
    //check for all neighbors on mouseup?
    this.dragging = false;

    this.cellsToCheck.forEach((c) => {
      this.setNextFrame(c);
    })
  
    this.cellsToCheck = [];
  }

  /*
  onMouseLeave() {
    if (this.dragging) {
      this.onMouseUp();
    }
  }
*/

  //x and y are canvas coordinates in pixels
  getHoveredCell(x, y) {
    let cellX = Math.floor(x / this.cellWidth);
    let cellY = Math.floor(y / this.cellHeight);

    if (cellX < 0 ) {
      cellX = 0;
    }
    if (cellX > this.cellsWide - 1) {
      cellX = this.cellsWide - 1;
    }
    if (cellY < 0) {
      cellY = 0;
    }
    if (cellY > this.cellsHigh - 1) {
      cellY = this.cellsHigh -1;
    }

    return this.rows[cellY][cellX];
  }

  generateClusters(numClusters, clusterRadius, pattern) {
    //some random cluster centers
    //let numClusters = numClusters;
    //let clusterRadius = clusterRadius;
    //let pattern = pattern;

    let clusterPoints = [];
    let counter = 0;
    for (let i = 0; i < numClusters; i++) {
      clusterPoints[i] = {
        x: Math.floor(Math.random() * this.cellsWide),
        y: Math.floor(Math.random() * this.cellsHigh)
      }
    }

    //for each point in the cell grid, check which cluster point it is closest to
    for (let i = 0; i < this.cellsHigh; i++) {
      for (let j = 0; j < this.cellsWide; j++) {
        let cellPoint = {
          x: j,
          y: i
        }
        let distance = this.cellsWide;
        let closestPoint;
        for (let k = 0; k < clusterPoints.length; k++) {
          //
          let distanceToClusterPoint = this.getDistance(cellPoint, clusterPoints[k]);
          if ( distanceToClusterPoint < distance) {
            closestPoint = clusterPoints[k];
            distance = distanceToClusterPoint;
          }
        }
        //set aliveNextFrame based on how close the cell is to its closest cluster point's center
        let likelihood = Math.min(distance, clusterRadius) / clusterRadius;
        this.rows[i][j].aliveNextFrame = Math.random() > likelihood ? 1 : 0;
        if (counter === 0) {
          this.rows[i][j].aliveNextFrame = 0;
        }
        counter++;
        //TODO: what to call this?
        if (counter > pattern) {
          counter = 0;
        }
      }
    }
  }

  getDistance(point1, point2) {
    //square root of (x2-x1)**2 + (y2-y1)**2
    let distance = Math.sqrt((point2.x - point1.x)**2 + (point2.y - point1.y)**2);
    return distance;
    
  }

  toggleAnimation() {
    this.animate = this.animate ? this.stopAnimation() : this.startAnimation();
    return this.animate;
  }

  startAnimation() {
    this.currentID = setInterval(() => {
        this.drawAll();
      }, this.speed);
    this.animate = true;
    return this.animate;
  }
  
  stopAnimation() {
    if (this.currentID !== null) {
        clearInterval(this.currentID);
    }
    this.animate = false;
    return this.animate;
  }

  setSpeed(speed) {
    let a = this.animate;
    this.stopAnimation();
    this.speed = speed;
    if (a) {
      this.startAnimation();
    }
  }
  drawAll() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#000000";
    let cell;

    //must update alive status of all cells before looping through to check on neighbors
    //How to avoid two for loops here?
    for (let i = 0; i < this.cellsHigh; i++) {
        for (let j = 0; j < this.cellsWide; j++) {
            cell = this.rows[i][j];
            cell.alive = cell.aliveNextFrame;
        }
    }

    for (let i = 0; i < this.cellsHigh; i++) {
      for (let j = 0; j < this.cellsWide; j++) {
        cell = this.rows[i][j];
        this.drawCell(cell);
        this.setNextFrame(cell);
      }
    }
  }

  drawCell(cell) {
    if (cell.alive === 1) {
      cell.draw();
    }
  }

  //set whether cell is alive or dead next frame
  setNextFrame(cell) {
    //console.log(cell);
    let neighborCount = this.getNeighborCount(cell);
        if (cell.alive === 1) {
          if (neighborCount < 2 || neighborCount > 3) {
            cell.aliveNextFrame = 0;
          } else {
            //Need this for cells that are drawn in
            cell.aliveNextFrame = 1;
          }
        } else if (neighborCount === 3) {
          cell.aliveNextFrame = 1;
        } else {
          cell.aliveNextFrame = 0;
        }
  }

  getNeighborCount(cell) {
    let x = cell.x;
    let y = cell.y;
    let edges = this.checkEdges(cell);
    let neighborCount = 0;

    //If not at top edge
    if (!edges.top) {
      //check above center
      neighborCount += this.rows[y - 1][x].alive;
      if (!edges.left) {
        //check above left
        neighborCount += this.rows[y - 1][x - 1].alive;
      }
      if (!edges.right) {
        //check above right
        neighborCount += this.rows[y - 1][x + 1].alive;
      }
    }

    //If not at bottom edge
    if (!edges.bottom) {
      //check bottom center
      neighborCount += this.rows[y + 1][x].alive;
      if (!edges.left) {
        //check bottom left
        neighborCount += this.rows[y + 1][x - 1].alive;
      }
      if (!edges.right) {
        //check bottom right
        neighborCount += this.rows[y + 1][x + 1].alive;
      }
    }

    //If not at left edge
    if (!edges.left) {
      //check left
      neighborCount += this.rows[y][x - 1].alive;
    }

    //If not at right edge
    if (!edges.right) {
      //check right
      neighborCount += this.rows[y][x + 1].alive;
    }
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
