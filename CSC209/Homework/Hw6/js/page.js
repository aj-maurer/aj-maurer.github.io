let game = new GameOfLife(60, 60);

function step() {
    game.animate = game.stopAnimation();
    setAnimateButton(game.animate);
    game.drawAll();
}

function toggleAnimation() {
    game.toggleAnimation();
    setAnimateButton(game.animate);
}

function setAnimateButton(bool) {
    let button = document.getElementById("animateButton");
    button.innerHTML = bool ? "Pause animation" : "Play animation";
}


