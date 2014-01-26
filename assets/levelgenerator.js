function LevelGoal() { }
LevelGoal.prototype = new createjs.Shape();
LevelGoal.prototype.initialize = function (stageParent, xPos, yPos, rad) {
// (this should be called once, when the level is first initialized)

	stageParent.addChild(this);

	this.x = xPos / 2; // need to add this factor b/c Shape()s have weird coord spaces
	this.y = yPos / 2;
	this.radius = rad;

    this.graphics.clear();
    this.graphics.beginFill("yellow").beginStroke("black").drawCircle( this.x, this.y, this.radius );
    this.currentAnimationStep = 0;

	stageParent.update();

}

LevelGoal.prototype.animate = function() {
	if (this.currentAnimationStep == 0) {
	    this.graphics.clear();
	    this.graphics.beginFill("yellow").beginStroke("orange").drawPolyStar( this.x, this.y, this.radius, 5, 2, 30 );
	    this.currentAnimationStep = 1;
	}
	else if (this.currentAnimationStep == 1) {
	    this.graphics.clear();
	    this.graphics.beginFill("yellow").beginStroke("orange").drawPolyStar( this.x, this.y, this.radius, 5, 2.5, 30 );
	    this.currentAnimationStep = 0;
	}
}

var checkWinConditions = function(playerObject, goalPositionX, goalPositionY) {
	// Note: player's x, y coords are defined to be located at the bottom, center of the sprite animation.
	// i.e. as follows (x, y coords are located at the 'x'):
	//  ___
	// |   |
	// |   |
	// |_x_| 
	//
	var upperBoundPlayer = playerObject.y + playerObject.height;
	var lowerBoundPlayer = playerObject.y;
	var rightBoundPlayer = playerObject.x + playerObject.width / 2;
	var leftBoundPlayer  = playerObject.x - playerObject.width / 2;
	if (!playerHasWon) {
		if ( leftBoundPlayer < goalPositionX && rightBoundPlayer > goalPositionX ){
			if ( upperBoundPlayer < goalPositionY && lowerBoundPlayer > goalPositionY ) {
				alert("YOU WINNNNNN");
				playerHasWon = true;
			}
		}
	}
}