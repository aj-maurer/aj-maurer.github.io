let game;

function init() {
    if (game !== undefined && game.animate === true) {
        setAnimateButton(game.stopAnimation());
    }

    let width = document.getElementById("widthInput").value;
    let height = document.getElementById("heightInput").value;
    let clusters = document.getElementById("clusters").value;
    let radius = document.getElementById("radius").value;
    let pattern = document.getElementById("pattern").value;

    game = new GameOfLife(width, height, clusters, radius, pattern);
}

function step() {
    if (game.animate) {
        setAnimateButton(game.stopAnimation());
    }
    game.drawAll();
}

function toggleAnimation() {
    setAnimateButton(game.toggleAnimation());
}

function setAnimateButton(bool) {
    let button = document.getElementById("animateButton");
    button.innerHTML = bool ? "Pause animation" : "Play animation";
}

function setSpeed(speed) {
    game.setSpeed(speed);
}




