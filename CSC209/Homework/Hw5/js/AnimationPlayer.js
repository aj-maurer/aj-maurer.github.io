class AnimationPlayer {
  constructor() {
    this.currentID = null;
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.replace = false;
    this.globalWiggle = 5;
    this.maxVelocity = 5;
    this.globalTraceOn = false;
    this.globalTraceLength = 20;
    //this.globalTraceColor = "#eeeeee"
    this.backgroundColor = "#999999";
    this.centerColor = "#ffffff";
    this.colorVariation = 50;
    this.animationSpeed = 30;
    this.paused = false;
  }

  //Starts or restarts the animation
  runAnimation(numParticles = 10) {
    this.stopAnimation();
    if (this.replace) {
      this.particles = [];
    }
    for (let i = 0; i < numParticles; i++) {
      let x = Math.random() * this.canvas.width;
      let y = Math.random() * this.canvas.height;
      let radius = 20;
      let angle = Math.random() * this.degToRad(360);
      let velocity = Math.random() * this.maxVelocity;
      let wiggle = this.globalWiggle;
      let color = this.getAnalogousColor(this.centerColor);
      let traceOn = this.globalTraceOn;
      let traceLength = this.globalTraceLength;
      this.particles.push(
        new Particle(this.ctx, x, y, radius, angle, velocity, wiggle, color, traceOn, traceLength)
      );
    }
    //TODO: Had to use arrow function here because setInterval is being used within a class,
    // need to better understand why this works this way
    // https://www.w3schools.com/js/js_arrow_function.asp
    this.currentID = setInterval(() => {
      this.drawAnimation(this.ctx, this.particles);
    }, this.animationSpeed);
  }

  //Draws each frame
  drawAnimation(context, particles) {
    if (this.paused) {
      return;
    }
    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    particles.forEach(this.drawParticle);
  }

  //runs each frame
  drawParticle(particle) {
    particle.draw();
    particle.move();
    particle.rotate();
  }

  stopAnimation() {
    clearInterval(this.currentID);
  }

  togglePause() {
    this.paused = this.paused ? false : true;
  }

  toggleReplace() {
    this.replace = this.replace ? false : true;
  }

  setWiggle(wiggle) {
    //Set global wiggle for particles to be created in the future
    this.globalWiggle = wiggle;
    //Update wiggle for current particles
    this.particles.forEach((particle) => {
      particle.wiggle = this.globalWiggle;
    });
  }

  setMaxVelocity(velocity) {
    //Set max speed for particles created in the future
    this.maxVelocity = velocity;
    //Update velocities of current particles so that none have a velocity greater than the max
    this.particles.forEach((particle) => {
      particle.velocity = Math.random() * this.maxVelocity;
    });
  }

  setTraceLength(length) {
    this.globalTraceLength = length;

    this.particles.forEach( (particle) => {
        particle.traceLength = this.globalTraceLength;
    });
  }

  toggleTrace() {
    this.globalTraceOn = this.globalTraceOn ? false : true;

    console.log("trace: " + this.globalTraceOn);
    this.particles.forEach( (particle) => {
        particle.traceOn = this.globalTraceOn;
    });
  }

  /*
  setTraceColor(color) {
    this.globalTraceColor = color;

    this.particles.forEach( (particle) => {
        particle.traceColor = this.globalTraceColor;
    });
  }
*/

  setBGColor(color) {
    this.backgroundColor = color;
  }

  setColor(color) {
    //Set "center color" for future particles
    this.centerColor = color;

    //Set randomized similar colors for current particles based on updated "center color"
    this.particles.forEach((particle) => {
      particle.color = this.getAnalogousColor(this.centerColor);
    });
  }

  //Utility functions---------------------------

  degToRad(deg) {
    return deg * (Math.PI / 180);
  }

  getAnalogousColor() {
    let centerColorRGB = this.hexToRgbValue(this.centerColor);
    let newR = this.modifyComponentValue(centerColorRGB.r);
    let newG = this.modifyComponentValue(centerColorRGB.g);
    let newB = this.modifyComponentValue(centerColorRGB.b);
    return `rgb(${newR}, ${newG}, ${newB})`;
  }

  modifyComponentValue(c) {
    let newC =
      c + (Math.random() * this.colorVariation - this.colorVariation / 2);
    //TODO: Make sure it's an int and between 0 and 255
    return newC;
  }

  //below is from https://itsourcecode.com/javascript-tutorial/javascript-hex-to-rgb-the-magic-of-color-conversion/
  hexToRgbValue(hex) {
    // Remove the hash symbol, if present
    hex = hex.replace(/^#/, "");

    // Parse the hex values into their respective components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    let rgb = { r, g, b };

    console.log(rgb);

    // Return the RGB values as an object
    return rgb;
  }
}
