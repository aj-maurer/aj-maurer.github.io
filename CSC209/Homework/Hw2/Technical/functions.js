//Classes in javascript? How to declare the equivalent of a member variable?
//Just use global variable?
var currentStylesheet;
var readMeIsShowing = false;

let tableObject1 = {
    name: "Zebra Cake",
    color: "black and white",
    taste: "waxy",
    score: 7
}
let tableObject2 = {
    name: "Oatmeal Cream Pie",
    color: "brown and white",
    taste: "grainy",
    score: 9
}
let tableObject3 = {
    name: "Moon Pie",
    color: "I forget",
    taste: "pie-like, presumably",
    score: 5
}
let tableObject4 = {
    name: "Mud Pie",
    color: "gross",
    taste: "gross",
    score: 2
}

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
    let stylesheet1 = "./Technical/styles1.css";
    let stylesheet2 = "./Technical/styles2.css";

    if (currentStylesheet == stylesheet1) {
        changeStyles(stylesheet2);
    } else {
        changeStyles(stylesheet1);
    }

    console.log(currentStylesheet);
}

function changeStyles(stylesheetFile) {
    currentStylesheet = stylesheetFile;
    document.getElementById("stylesheetLink").setAttribute("href", currentStylesheet);
}

function toggleReadMe() {
    let text = "This is the Read Me text."
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