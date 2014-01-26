
function Player() {
}

Player.prototype = new createjs.Shape();

Player.prototype.initialize = function () {

	this.x = 10;
	this.y = 10;

	this.vx = 0;
	this.vy = 0;

	this.ax = 0;
	this.ay = 0;

	this.radius = 15;
	this.gravity = 0.3;

};

var timeConstant = 1;

Player.prototype.resolvePhysics = function (LineObject) {

	// Update position
	this.x = this.x + this.vx * timeConstant;
	this.y = this.y + this.vy * timeConstant;

	// Update speed
	this.vx = this.vx + this.ax * timeConstant;
	this.vy = this.vy + this.gravity * timeConstant;

	// Update acceleration
	this.ax = -this.vx / timeConstant;

	// Check collisions ("testLine" only)
	if (this.y > canvas.height/2 - (LineObject.slope * (this.x) + LineObject.yIntercept*cellSize/2) ) {
		this.y = canvas.height/2 - (LineObject.slope * (this.x) + LineObject.yIntercept*cellSize/2);
		//console.log("yInt = " + LineObject.yIntercept + "    slope = " + LineObject.slope);
	}

	// Check that the player stays on the canvas...
	if (this.x > gridRight/2) { // I don't know why we need to divide by 2 here... it is mysterious
		this.x = gridRight/2;
		this.vx = 0;
	}

	if (this.x < gridLeft) {
		this.x = gridLeft;
		this.vx = 0;
	}

	if (this.y < gridTop) {
		this.y = gridTop;
		this.vy = 0;
	}

	if (this.y > gridBottom/2) {
		this.y = gridBottom/2;
		this.vy = 0;
	}

	console.log("x position = " + this.x + "  ;  y position = " + this.y);

}

Player.prototype.render = function () {

	// draw the player
    this.graphics.clear();
    this.graphics.beginFill("red").drawCircle( this.x, this.y, this.radius );

};

Player.prototype.moveLeft = function() {
	this.ax -= 5;
}

Player.prototype.moveRight = function() {
	this.ax += 5;
}

Player.prototype.jump = function () {
	if (this.vy == 0) {
		this.vy -= 5;
	}
}

Player.prototype.tick = function (event) {

};

