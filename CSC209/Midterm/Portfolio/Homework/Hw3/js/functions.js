var currentStylesheet;
var readMeIsShowing = false;

let tableObject1 = {
  name: "Zebra Cake",
  color: "black and white",
  taste: "waxy",
  score: 7,
};
let tableObject2 = {
  name: "Oatmeal Cream Pie",
  color: "brown and white",
  taste: "grainy",
  score: 9,
};
let tableObject3 = {
  name: "Moon Pie",
  color: "I forget",
  taste: "pie-like?",
  score: 5,
};
let tableObject4 = {
  name: "Mud Pie",
  color: "gross",
  taste: "gross",
  score: 2,
};

let tableObjects = [tableObject1, tableObject2, tableObject3, tableObject4];

function populateTable() {
  const table = document.getElementById("tableBody");
  for (let i = 0; i < tableObjects.length; i++) {
    let row = table.insertRow();
    let name = row.insertCell(0);
    let color = row.insertCell(1);
    let taste = row.insertCell(2);
    let score = row.insertCell(3);
    name.innerHTML = tableObjects[i].name;
    color.innerHTML = tableObjects[i].color;
    taste.innerHTML = tableObjects[i].taste;
    score.innerHTML = tableObjects[i].score;
  }
}

function toggleStyles() {
  let stylesheet1 = "./css/styles1.css";
  let stylesheet2 = "./css/styles2.css";
  changeStyles(currentStylesheet == stylesheet1 ? stylesheet2 : stylesheet1);
  console.log(currentStylesheet);
}

function changeStyles(stylesheetFile) {
  currentStylesheet = stylesheetFile;
  document
    .getElementById("stylesheetLink")
    .setAttribute("href", currentStylesheet);
}

function toggleReadMe() {
  let text = "DID YOU KNOW: You can double-click an added button to delete it!";
  let readMeP = document.getElementById("readMeP");
  let readMeButton = document.getElementById("readMeButton");

  if (readMeIsShowing) {
    readMeP.innerHTML = "";
    readMeButton.innerHTML = "Read Me";
    readMeIsShowing = false;
  } else {
    readMeP.innerHTML = text;
    readMeButton.innerHTML = "Hide Read Me Text";
    readMeIsShowing = true;
  }
}

function addButton() {
  let side = document.getElementsByClassName("side")[0];
  let b = document.createElement("button");
  side.appendChild(b);
  b.innerHTML = "New button - click to change color";
  b.addEventListener("click", function () {changeColor(b)});
  b.addEventListener("dblclick", b.remove);
}

function changeColor(b) {
  b.style.backgroundColor = randomRgbColor();
  console.log("Color changed!");
}

//Below is from https://www.slingacademy.com/article/how-to-generate-random-color-in-javascript/
const randomRgbColor = () => {
  let r = Math.floor(Math.random() * 256); // Random between 0-255
  let g = Math.floor(Math.random() * 256); // Random between 0-255
  let b = Math.floor(Math.random() * 256); // Random between 0-255
  return "rgb(" + r + "," + g + "," + b + ")";
};
