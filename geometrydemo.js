
//create stage
var canvas = document.getElementById("geoworld-canvas");
var stage = new createjs.Stage(canvas);

// determine grid parameters
var gridWidth = 50;
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
var testLine = new Line();
stage.addChild(testLine);
testLine.yIntercept = 0;    //player space
testLine.slope = 1;			//player space



testLine.yIntercept = 15;
testLine.slope = 5;

testLine.render();
stage.update();
