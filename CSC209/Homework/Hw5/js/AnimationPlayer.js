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
    this.centerColor = "#26992f";
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
      let traceColor = this.getTraceColor(color);
      this.particles.push(
        new Particle(this.ctx, x, y, radius, angle, velocity, wiggle, color, traceOn, traceLength, traceColor)
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
      particle.traceColor = this.getTraceColor(particle.color);
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

  getTraceColor(color) {
    //color comes in as "rgb(r, g, b)"
    let rgbArray = color.slice(4, color.length - 1)
      .split(",")
      .map( element => element.trim());
    rgbArray = rgbArray.map( element => element.trim());
    console.log("original: " + rgbArray);
    let hslArray = this.rgbToHsl(rgbArray[0], rgbArray[1], rgbArray[2])
    let newSaturation = hslArray[1] * 0.5;
    let newLightness = hslArray[2] + (hslArray[2] / 2);
    hslArray[1] = newSaturation;
    hslArray[2] = newLightness;

    let newRgbArray = this.hslToRgb(hslArray[0], hslArray[1], hslArray[2]);

    console.log("new: " + newRgbArray);
    return `rgb(${newRgbArray[0]}, ${newRgbArray[1]}, ${newRgbArray[2]})`
  }

  //below from https://www.30secondsofcode.org/js/s/rgb-hex-hsl-hsb-color-format-conversion/
  rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  }

  //below from https://www.30secondsofcode.org/js/s/rgb-hex-hsl-hsb-color-format-conversion/
  hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }
}
