//TODO: First frame after something is drawn doesn't follow the rules correctly,
// and result changes depending on 
// the order in which things were drawn. Fix it!

class GameOfLife {
  constructor(cellsWide, cellsHigh, clusters, clusterRadius, clusterPattern) {
    this.currentID = null;
    this.animate = false;
    this.speed =
      document.getElementById("speedSlider").max -
      document.getElementById("speedSlider").value;
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
    //fill array with cells
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
      }
    }
    this.setupInteraction();
    //Generate somewhat interesting random clusters of living cells
    this.generateClusters(
      this.clusters,
      this.clusterRadius,
      this.clusterPattern
    );
    this.step();
  }

  setupInteraction() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
  }

  removeListeners() {
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
  }
  
  onMouseDown() {
    this.dragging = true;
  }

  onMouseMove(e) {
    if (this.dragging) {
      let cell = this.getHoveredCell(e.offsetX, e.offsetY);
      if (this.animate) {
        cell.aliveNextFrame = 1;
      } else if (this.drawBlack) {
        cell.draw();
        //Add cell to array of cells to check
        if (!this.cellsToCheck.includes(cell)) {
          cell.alive = 1; //At this point cell.aliveNextFrame could be 0
          this.cellsToCheck.push(cell);
        }
      } else {
        //NOT WORKING
        //drawing white
        /*
      cell.alive = 0;
      cell.clear();
      if (!this.cellsToCheck.includes(cell)) {
        this.cellsToCheck.push(cell);
      }
        */
      }
    }
  }

  onMouseUp() {
    this.dragging = false;
    this.cellsToCheck.forEach((c) => {
      this.setNextFrame(c);
    });
    //this.cellsToCheck = [];
  }

  //x and y are canvas coordinates in pixels
  getHoveredCell(x, y) {
    let cellX = Math.floor(x / this.cellWidth);
    let cellY = Math.floor(y / this.cellHeight);

    if (cellX < 0) {
      cellX = 0;
    }
    if (cellX > this.cellsWide - 1) {
      cellX = this.cellsWide - 1;
    }
    if (cellY < 0) {
      cellY = 0;
    }
    if (cellY > this.cellsHigh - 1) {
      cellY = this.cellsHigh - 1;
    }

    return this.rows[cellY][cellX];
  }

  //Initialize random clusters of alive (black) cells
  // (just to have something to start with)
  generateClusters(numClusters, clusterRadius, pattern) {
    //Cluster centers
    let clusterPoints = [];
    let counter = 0;
    //Cluster centers randomly distributed
    for (let i = 0; i < numClusters; i++) {
      clusterPoints[i] = {
        x: Math.floor(Math.random() * this.cellsWide),
        y: Math.floor(Math.random() * this.cellsHigh),
      };
    }

    //For each cell in the cell grid, check which cluster point it is closest to
    // Cell is more likely to be black the closer it is to its closest cluster point's center
    for (let i = 0; i < this.cellsHigh; i++) {
      for (let j = 0; j < this.cellsWide; j++) {
        let cellPoint = {
          x: j,
          y: i,
        };
        let distance = this.cellsWide;
        let closestPoint;
        for (let k = 0; k < clusterPoints.length; k++) {
          let distanceToClusterPoint = this.getDistance(
            cellPoint,
            clusterPoints[k]
          );
          if (distanceToClusterPoint < distance) {
            closestPoint = clusterPoints[k];
            distance = distanceToClusterPoint;
          }
        }
        //Set aliveNextFrame based on how close the cell is to its closest cluster point's center
        let likelihood = Math.min(distance, clusterRadius) / clusterRadius;
        this.rows[i][j].aliveNextFrame = Math.random() > likelihood ? 1 : 0;
        
        //Add "overlay" of dead cells in a regular patern to make it more interesting
        if (counter === 0) {
          this.rows[i][j].aliveNextFrame = 0;
        }
        counter++;
        if (counter > pattern) {
          counter = 0;
        }
      }
    }
  }

  getDistance(point1, point2) {
    let distance = Math.sqrt(
      (point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2
    );
    return distance;
  }

  toggleAnimation() {
    this.animate = this.animate ? this.stopAnimation() : this.startAnimation();
    return this.animate;
  }

  startAnimation() {
    this.currentID = setInterval(() => {
      this.step();
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

  //Main loop
  step() {
    this.cellsToCheck = [];
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

  //draw one cell
  drawCell(cell) {
    if (cell.alive === 1) {
      cell.draw();
    }
  }

  //set whether cell is alive or dead next frame
  setNextFrame(cell) {
    let neighborCount = this.getNeighborCount(cell);
    if (cell.alive === 1) {
      if (neighborCount < 2 || neighborCount > 3) {
        cell.aliveNextFrame = 0;
      } else {
        cell.aliveNextFrame = 1;
      }
    } else if (neighborCount === 3) {
      cell.aliveNextFrame = 1;
    } //else {
      //cell.aliveNextFrame = 0;
    //}
  }

  //Get count of live neighbors
  getNeighborCount(cell) {
    let x = cell.x;
    let y = cell.y;
    //List of canvas edges the point is touching
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

  //returns array of the canvas edges the point is touching
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
