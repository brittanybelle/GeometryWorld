var gameFPS = 30;

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
var testLine = new Line(stage, $('#editorPane'));
stage.addChild(testLine);
testLine.loadValuesFromForm();

// Create player character
var playerCharacter = new Player();
playerCharacter.initialize();
stage.addChild(playerCharacter);

// Game loop
createjs.Ticker.setFPS(gameFPS);
createjs.Ticker.addEventListener("tick", function (tick) {
    testLine.render();
    passKeyInfoToPlayerController(playerCharacter);
    playerCharacter.resolvePhysics(testLine);
    playerCharacter.render();
    stage.update();
});

$(function () {
    $("div.card").draggable({ revert: function (dropped) { return !dropped; } });
    $("#editorPane span.card").droppable({ drop: function (event, ui) { console.log(event, ui); } });
});
