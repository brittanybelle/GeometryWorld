function LevelGoal() { }
LevelGoal.prototype = new createjs.Shape();
LevelGoal.prototype.initialize = function (stageParent, xPos, yPos, rad) {
// (this should be called once, when the level is first initialized)

	stageParent.addChild(this);

	this.x = xPos;
	this.y = yPos;
	this.radius = rad;

    this.graphics.clear();
    this.graphics.beginFill("yellow").beginStroke("black").drawCircle( this.x, this.y, this.radius );
    this.currentAnimationStep = 0;

	stageParent.update();

}

LevelGoal.prototype.animate = function() {
	if (this.currentAnimationStep == 0) {
	    this.graphics.clear();
	    this.graphics.beginFill("yellow").beginStroke("black").drawPolyStar( this.x, this.y, this.radius, 5, 2.5, 30 );
	    this.currentAnimationStep = 1;
	}
	else if (this.currentAnimationStep == 1) {
	    this.graphics.clear();
	    this.graphics.beginFill("yellow").beginStroke("black").drawPolyStar( this.x, this.y, this.radius, 5, 2, 30 );
	    this.currentAnimationStep = 0;
	}
}

var checkWinConditions = function(playerObject, goalPositionX, goalPositionY) {
	var upperBoundPlayer = playerObject.y - playerObject.radius;
	var lowerBoundPlayer = playerObject.y + playerObject.radius;
	var rightBoundPlayer = playerObject.x + playerObject.radius;
	var leftBoundPlayer  = playerObject.x - playerObject.radius;
	if (!playerHasWon) {
		if ( leftBoundPlayer < goalPositionX && rightBoundPlayer > goalPositionX ){
			if ( upperBoundPlayer < goalPositionY && lowerBoundPlayer > goalPositionY ) {
				alert("YOU WINNNNNN");
				playerHasWon = true;
			}
		}
	}
}