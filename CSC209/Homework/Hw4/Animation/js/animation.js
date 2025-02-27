   
function moveRed()
{   
    if (typeof stepRedId !== "undefined") {
        clearInterval(stepRedId);
        console.log("interval cleared");
    }
    var redSquare = document.getElementById("redSq");   
    var redPos = 0;
    var speedSelector = document.getElementById("redSpeed");
    var speed = speedSelector.value;
    console.log(speed);
    var stepRedId = setInterval(stepRed, speed);
    console.log("typeof stepRedId: "  + typeof stepRedId + ", Value of stepRedId: " + stepRedId);

    function stepRed() {
        if (redPos == 350) {
            clearInterval(stepRedId);
        } else {
            redPos++; 
            redSquare.style.top = redPos + 'px'; 
            redSquare.style.left = redPos + 'px';
        }
    }
}


