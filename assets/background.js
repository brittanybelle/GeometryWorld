
function renderBackground (stageParent, gridWidth, gridLeft, gridRight, gridTop, gridBottom, cellSize) {

	// create grid object
	var gridLines = new createjs.Shape();
	stageParent.addChild(gridLines);

	// draw the grid
	gridLines.graphics.beginStroke("blue");

	for(var i = 1; i < gridWidth; ++i) { // Rows
	    gridLines.graphics.moveTo(gridLeft, gridTop + i * cellSize);
	    gridLines.graphics.lineTo(gridRight, gridTop + i * cellSize);
	}

	for(var i = 1; i < gridHeight; ++i) { //Cols
	    gridLines.graphics.moveTo(gridLeft + i * cellSize, gridTop);
	    gridLines.graphics.lineTo(gridLeft + i * cellSize, gridBottom);
	}


	// next, add various background doodles.
	var backgroundDataCloud = {
	    images: ["assets/backgrounds/cloud.png"],
	    frames: {
	    	width:374,
	    	height:282,
	    	count:1
	    },
	    animations: { main: [0] }
	};

	var spriteSheetCloudBG = new createjs.SpriteSheet(backgroundDataCloud);

	var backgroundCloud = new createjs.Sprite(spriteSheetCloudBG);
		stageParent.addChild(backgroundCloud);
		backgroundCloud.x = 60;
		backgroundCloud.y = 60;

	stageParent.update();
}