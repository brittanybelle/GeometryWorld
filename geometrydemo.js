var gameFPS = 30;

// dealing with keyboard events; plus handy keycode shortcuts
window.addEventListener("keydown", dealWithKeyboard, false);
var keyCodeLeftArrow = "37";
var keyCodeUpArrow = "38";
var keyCodeRightArrow = "39";

//create stage
var canvas = document.getElementById("geoworld-canvas");
var stage = new createjs.Stage(canvas);

// determine grid parameters
var gridWidth = 30;
var gridHeight = gridWidth;
var cellSize = canvas.width / gridWidth;
var gridLeft = 0;
var gridRight = canvas.width;
var gridTop = 0;
var gridBottom = canvas.height;

// create grid object
var gridLines = new createjs.Shape();
stage.addChild(gridLines);

// draw the grid
gridLines.graphics.beginStroke("lightblue");

for(var i = 1; i < gridWidth; ++i) { // Rows
    gridLines.graphics.moveTo(gridLeft, gridTop + i * cellSize);
    gridLines.graphics.lineTo(gridRight, gridTop + i * cellSize);
}

for(var i = 1; i < gridHeight; ++i) { //Cols
    gridLines.graphics.moveTo(gridLeft + i * cellSize, gridTop);
    gridLines.graphics.lineTo(gridLeft + i * cellSize, gridBottom);
}

// Test line
var testLine = new Line(stage, $('#lineEditor'));
stage.addChild(testLine);
testLine.loadValuesFromForm();

// Create player character
var playerCharacter = new Player();
playerCharacter.initialize();
stage.addChild(playerCharacter);

// keyboard events
function dealWithKeyboard(event) {
    if (event.keyCode == keyCodeLeftArrow) { playerCharacter.moveLeft(); }
    if (event.keyCode == keyCodeRightArrow) { playerCharacter.moveRight(); }
    if (event.keyCode == keyCodeUpArrow) { playerCharacter.jump(); }
}

// Game loop
createjs.Ticker.setFPS(gameFPS);
createjs.Ticker.addEventListener("tick", function (tick) {
    testLine.render();
    playerCharacter.resolvePhysics();
    playerCharacter.render();
    stage.update();
});
