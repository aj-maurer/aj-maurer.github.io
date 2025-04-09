//Class names for checks and crosses
let CHECK = "fa fa-check"
let CROSS = "fa fa-remove"

//Arrays of table information, one array for each column
let NAME = [
    "Larry",
    "Moe",
    "Curly",
    "Shemp",
    "Charles Wadsworth Pennington IV"
]
let SASSY = [
    CHECK,
    CHECK,
    CROSS,
    CROSS,
    CROSS
]
let CLASSY = [
    CROSS,
    CHECK,
    CHECK,
    CROSS,
    CHECK
]

//Number of rows
let NRROWS = 5;

//Generate the table
function addRows() {
    let table = document.getElementById("comparisonTable");
    for (let i = 0; i < NRROWS; i++) {
        //Add a row and add cells
        let row = table.insertRow();
        let name = row.insertCell(0);
        let sassy = row.insertCell(1);
        let classy = row.insertCell(2);

        //Create "<i>" elements for sassy and classy columns
        let sassyI = document.createElement("i");
        sassyI.className = SASSY[i];
        let classyI = document.createElement("i");
        classyI.className = CLASSY[i];

        //Set innerHTML for "name" column
        name.innerHTML = NAME[i];

        //Append correct <i> element to "sassy" and "classy" columns
        sassy.appendChild(sassyI);
        classy.appendChild(classyI);
    }
}