var winSound = new Audio("assets/sound/win.wav");

function LevelGoal() { }
LevelGoal.prototype = new createjs.Shape();
LevelGoal.prototype.initialize = function (stageParent, rad) {
// (this should be called once, when the level is first initialized)

	stageParent.addChild(this);

    this.radius = rad;

    this.graphics.clear();
    this.currentAnimationStep = 0;

}

LevelGoal.prototype.reset = function (level) {
	var xPos = levelData[level].goalPosition.x;
	var yPos = levelData[level].goalPosition.y;
    this.x = xPos / 2; // need to add this factor b/c Shape()s have weird coord spaces
    this.y = yPos / 2;
};

LevelGoal.prototype.animate = function() {
	if (this.currentAnimationStep == 0) {
	    this.graphics.clear();
	    this.graphics.beginFill("yellow").beginStroke("orange").setStrokeStyle(3).drawPolyStar( this.x, this.y, this.radius, 5, 2, 30 );
	    this.currentAnimationStep = 1;
	}
	else if (this.currentAnimationStep == 1) {
	    this.graphics.clear();
	    this.graphics.beginFill("yellow").beginStroke("orange").setStrokeStyle(3).drawPolyStar( this.x, this.y, this.radius, 5, 2.5, 30 );
	    this.currentAnimationStep = 0;
	}
}

var checkWinConditions = function (playerObject, currentLevel) {
	// Note: player's x, y coords are defined to be located at the bottom, center of the sprite animation.
	// i.e. as follows (x, y coords are located at the 'x'):
	//  ___
	// |   |
	// |   |
	// |_x_| 
	//
	var goalPositionX = levelData[currentLevel].goalPosition.x;
	var goalPositionY = levelData[currentLevel].goalPosition.y;
	var upperBoundPlayer = playerObject.y - playerObject.height;
	var lowerBoundPlayer = playerObject.y;
	var rightBoundPlayer = playerObject.x + playerObject.width / 2;
	var leftBoundPlayer  = playerObject.x - playerObject.width / 2;

	var touchingGoal = (
		   (leftBoundPlayer < goalPositionX && rightBoundPlayer > goalPositionX)
		&& (upperBoundPlayer < goalPositionY && lowerBoundPlayer > goalPositionY)
	);

	return touchingGoal;
};

function processLevelState(playerObject) { // a perfectly good name for having three hours left
	if (playerHasWon) {
		return;
	}

	if (checkWinConditions(playerObject, currentLevel)) {
		console.log("TRIGGER (" + currentLevel + ")");
		winSound.play();

		if (currentLevel >= levelData.length-1) {
			currentTextId = "win";
			playerHasWon = true;
			console.log("No more levels");
			return;
		}

		currentLevel += 1;
		currentTextId = "level" + currentLevel;
		levelGoal.reset(currentLevel);
	}
}


var renderTextBoxGraphic;
var renderTextText;

function renderText(stageParent, currentTextId) {
	// Hacks
	if (typeof renderTextBoxGraphic == "undefined") {
		renderTextBoxGraphic = new createjs.Shape();
		stageParent.addChild(renderTextBoxGraphic);
	}
	if (typeof renderTextText == "undefined") {
		renderTextText = new createjs.Text("no text", "20px Arial", "black");
		stageParent.addChild(renderTextText);
	}

	var currentTextData = textData[currentTextId];
	var visible = typeof currentTextData != "undefined";

	renderTextBoxGraphic.visible = visible;
	renderTextText.visible = visible;

	if (visible) {
		renderTextText.text = currentTextData.textContent;

		renderTextText.x = textBoxPositionX + textBoxWidth / 2;
		renderTextText.y = textBoxPositionY + textBoxBuffer;
		renderTextText.lineWidth = textBoxWidth;
		renderTextText.textAlign = "center";
	//		renderTextText.maxWidth =

		renderTextBoxGraphic.graphics.clear();
		renderTextBoxGraphic.graphics.beginFill("rgba(255,215,0,0.5)").beginStroke("orange").setStrokeStyle(1).drawRect(textBoxPositionX, textBoxPositionY, textBoxWidth, textBoxHeight);
	}
}

var levelData = [
	{ goalPosition: {x: 740, y: 60} },
	{ goalPosition: {x: 20, y: 300} },
];

var textData = {
	"level1": {
		textContent: "this is level 2 text"
	},
	"win": {
		textContent: "this is the song that never ends it goes on and on my friend \n some people started singing it not knowing what it was and now they'll"
	}
};
