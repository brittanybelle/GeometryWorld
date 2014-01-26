var gameFPS = 30;
var animationFrameRate = 700; // number of ms that passes between each animation update

// Listen for 'keydown' and 'keyup' events
window.addEventListener("keydown", dealWithKeyDown, false);
window.addEventListener("keyup", dealWithKeyUp, false);

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
var testLine = new Line(stage, 0, 0.75);
var secondLine = new Line(stage, 10, 1);

var cardController = new CardController(testLine, secondLine); // this is not the right interface design

// Create player character
var playerCharacter = new Player();
playerCharacter.initialize();
stage.addChild(playerCharacter);

// Set up level/win conditions:
var goalPositionX = 370;
var goalPositionY = 30;
var goalRadius = 35;
var playerHasWon = false;
levelGoal = new LevelGoal();
levelGoal.initialize(stage, goalPositionX, goalPositionY, goalRadius);

var frameClock = 0;

// Game loop
createjs.Ticker.setFPS(gameFPS);
createjs.Ticker.addEventListener("tick", function (tick) {

    // Functions that run every tick (physics logic):
    testLine.render();
    secondLine.render();
    passKeyInfoToPlayerController(playerCharacter);
    playerCharacter.resolvePhysics(testLine);

    frameClock += tick.delta / animationFrameRate;
    while(frameClock >= 1) {

        // Functions that run less frequently (graphics/animations)
        levelGoal.animate();
        checkWinConditions(playerCharacter, goalPositionX, goalPositionY);

        frameClock -= 1;
    }

    stage.update();

});
