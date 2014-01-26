var gameFPS = 30;
var animationFrameRate = 350; // number of ms that passes between each animation update

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

// draw the background
renderBackground(stage, gridWidth, gridLeft, gridRight, gridTop, gridBottom, cellSize);

// line objects
var testLine = new Line(stage, 0, 0.75);
var secondLine = new Line(stage, 10, 1);
var listOfLines = [testLine, secondLine];
var cardController = new CardController(testLine, secondLine); // this is not the right interface design

// Create player character
var playerCharacter = new Player();
playerCharacter.initialize();
stage.addChild(playerCharacter);

// Define parameters for the "message box"
// (x, y) coords are located at top left corner of box; all measurements in pixels
textBoxPositionX = 20;
textBoxPositionY = 20;
textBoxWidth = 760;
textBoxHeight = 70;
textBoxBuffer = 10;
textBoxAlpha = 0.7;


//////////
// FOR DEBUGGING:
playerHasWon = true;
renderWinText(stage);
//////////

// Set up level/win conditions:
var goalPositionX = 740;
var goalPositionY = 60;
var goalRadius = 35;
var playerHasWon = false;
levelGoal = new LevelGoal();
levelGoal.initialize(stage, goalPositionX, goalPositionY, goalRadius);

// Game loop
var frameClock = 0;
createjs.Ticker.setFPS(gameFPS);
createjs.Ticker.addEventListener("tick", function (tick) {

    // Functions that run every tick (physics logic):
    testLine.render();
    secondLine.render();
    passKeyInfoToPlayerController(playerCharacter);
    playerCharacter.resolvePhysics(listOfLines);

    frameClock += tick.delta / animationFrameRate;
    while(frameClock >= 1) {

        // Functions that run less frequently (graphics/animations)
        levelGoal.animate();
        checkWinConditions(playerCharacter, goalPositionX, goalPositionY);

        //renderWinText(stage); // NOTE: will probably replace this with a more general text box/method

        frameClock -= 1;
    }

    stage.update();

});
