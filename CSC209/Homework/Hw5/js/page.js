animationPlayer = new AnimationPlayer();

function start() {
  animationPlayer.runAnimation();
}

//Not used
function stop() {
  animationPlayer.stopAnimation();
}

// All the inputs are added below using js
// This is a lot of typing, may be easier to just do it in HTML
function addInputs() {
  let container = document.getElementById("inputContainer");

  //Number input
  let numberSelector = document.createElement("INPUT");
  numberSelector.setAttribute("type", "number");
  numberSelector.setAttribute("label", "Number of particles");
  numberSelector.setAttribute("min", 0);
  let numberLabel = document.createElement("label");
  numberLabel.appendChild(numberSelector);
  numberLabel.appendChild(document.createTextNode("Number of particles"));
  container.appendChild(numberLabel);

  //Number submit button
  let numberSubmitButton = document.createElement("INPUT");
  numberSubmitButton.setAttribute("type", "button");
  numberSubmitButton.addEventListener("click", function () {
    animationPlayer.runAnimation(numberSelector.value);
  });
  numberSubmitButton.value = "Add particles";
  container.appendChild(numberSubmitButton);

  //Checkbox
  let toggleReplaceCheckbox = document.createElement("INPUT");
  toggleReplaceCheckbox.setAttribute("type", "checkbox");
  toggleReplaceCheckbox.setAttribute("id", "replaceToggle");
  toggleReplaceCheckbox.addEventListener("click", function () {
    animationPlayer.toggleReplace();
    numberSubmitButton.value = animationPlayer.replace ? "Replace particles" : "Add particles"
  });
  let checkboxLabel = document.createElement("label");
  checkboxLabel.appendChild(toggleReplaceCheckbox);
  checkboxLabel.appendChild(
    document.createTextNode("Replace current particles on submit")
  );
  container.appendChild(checkboxLabel);

  //Slider for wiggliness
  let wiggleSlider = document.createElement("input");
  wiggleSlider.setAttribute("type", "range");
  wiggleSlider.setAttribute("min", 0);
  wiggleSlider.setAttribute("max", 10);
  wiggleSlider.setAttribute("value", 5);
  wiggleSlider.oninput = function () {
    animationPlayer.setWiggle(this.value);
  };
  let wiggleLabel = document.createElement("label");
  wiggleLabel.appendChild(wiggleSlider);
  wiggleLabel.appendChild(document.createTextNode("Wiggliness"));
  container.appendChild(wiggleLabel);

  //Slider for velocity
  let velocitySlider = document.createElement("input");
  velocitySlider.setAttribute("type", "range");
  velocitySlider.setAttribute("min", 0);
  velocitySlider.setAttribute("max", 50);
  velocitySlider.setAttribute("value", 50);
  velocitySlider.oninput = function () {
    animationPlayer.setMaxVelocity(this.value / 10);
  };
  let velocityLabel = document.createElement("label");
  velocityLabel.appendChild(velocitySlider);
  velocityLabel.appendChild(document.createTextNode("Max forward velocity"));
  container.appendChild(velocityLabel);

  //Checkbox for trace on/off
  let traceCheckbox = document.createElement("INPUT");
  traceCheckbox.setAttribute("type", "checkbox");
  traceCheckbox.setAttribute("id", "traceToggle");
  traceCheckbox.addEventListener("click", function () {
    animationPlayer.toggleTrace();
  });
  let traceLabel = document.createElement("label");
  traceLabel.appendChild(traceCheckbox);
  traceLabel.appendChild(
    document.createTextNode("Trace on/off")
  );
  container.appendChild(traceLabel);

  //Slider for trace length
  let traceSlider = document.createElement("input");
  traceSlider.setAttribute("type", "range");
  traceSlider.setAttribute("min", 10);
  traceSlider.setAttribute("max", 60);
  traceSlider.setAttribute("value", 30);
  traceSlider.oninput = function () {
    animationPlayer.setTraceLength(this.value);
  };
  let traceSliderLabel = document.createElement("label");
  traceSliderLabel.appendChild(traceSlider);
  traceSliderLabel.appendChild(document.createTextNode("Trace length"));
  container.appendChild(traceSliderLabel);

  //Background color picker
  let bgColorPicker = document.createElement("input");
  bgColorPicker.setAttribute("type", "color");
  bgColorPicker.setAttribute("value", animationPlayer.backgroundColor);
  bgColorPicker.oninput = function () {
    animationPlayer.setBGColor(this.value);
  };
  let bgColorLabel = document.createElement("label");
  bgColorLabel.appendChild(bgColorPicker);
  bgColorLabel.appendChild(document.createTextNode("Background color"));
  container.appendChild(bgColorLabel);

  //Particle color picker
  let colorPicker = document.createElement("input");
  colorPicker.setAttribute("type", "color");
  colorPicker.setAttribute("value", animationPlayer.centerColor);
  colorPicker.oninput = function () {
    animationPlayer.setColor(this.value);
  };
  let colorLabel = document.createElement("label");
  colorLabel.appendChild(colorPicker);
  colorLabel.appendChild(document.createTextNode("Particle color theme"));
  container.appendChild(colorLabel);

  //Pause button
  let pauseButton = document.createElement("INPUT");
  pauseButton.setAttribute("type", "button");
  pauseButton.addEventListener("click", function () {
    animationPlayer.togglePause();
  });
  pauseButton.value = "Play/Pause";
  container.appendChild(pauseButton);

  let behaviors = [
    "wrap",
    "bounce"
  ];

  let behaviorSelector = document.createElement("select");
  behaviors.forEach( (element) => {
    let option = document.createElement("option");
    option.value = element;
    option.innerHTML = element;
    behaviorSelector.appendChild(option);
  });
  behaviorSelector.onchange = function(){
    animationPlayer.setBehavior(behaviorSelector.value);
  }
  console.log(behaviorSelector.value);
  let behaviorLabel = document.createElement("label");
  behaviorLabel.appendChild(behaviorSelector);
  behaviorLabel.appendChild(document.createTextNode("Edge behavior"));
  container.appendChild(behaviorLabel);
  }
  

  function testInput() {
    console.log("test!");
  }
