var playerTimeConstant = 1;
var jumpAmount = 7;

// Initialize sprite sheet data:
var data = {
	framerate: 2,
    images: ["assets/FinalSpriteSheetMathBot.png"],
    frames: {
    	width:125,
    	height:170,
    	count:4},
    animations: {
    	idle:[0],
    	jump:[2],
    	moveLeft:[1],
    	moveRight:[3]}
};

var spriteSheet = new createjs.SpriteSheet(data);

function Player() { };

Player.prototype = new createjs.Sprite(spriteSheet, "idle");

Player.prototype.initialize = function () {

//	this.radius = 15;

	this.x = 10;
	this.y = 10;

	this.xDirection = 0;
	this.xSpeed = 4;

	this.yVelocity = 0;
	this.gravity = 0.3;
	this.isJumping = true;

//	this.setBounds(0, 0, 10, 10);

};

Player.prototype.resolvePhysics = function (LineObject) {

	// Update x-position
	this.x = this.x + this.xDirection * this.xSpeed;

	// Update y-position
	this.yVelocity = this.yVelocity + this.gravity * playerTimeConstant;
	this.y = this.y + this.yVelocity * playerTimeConstant;

	// Check collisions ("testLine" only)
	if (this.y > canvas.height/2 - (LineObject.slope * (this.x) + LineObject.yIntercept*cellSize/2) ) {
		this.y = canvas.height/2 - (LineObject.slope * (this.x) + LineObject.yIntercept*cellSize/2);
		this.isJumping = false;
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
		this.yVelocity = 0;
	}

	if (this.y > gridBottom/2) {
		this.y = gridBottom/2;
		this.yVelocity = 0;
		this.isJumping = false;
	}
};

Player.prototype.renderLeft  = function () {
	if (!this.isJumping) {
		this.gotoAndPlay("moveLeft");
	}
};

Player.prototype.renderRight = function () { 
	if (!this.isJumping) {
		this.gotoAndPlay("moveRight");
	} 
};

Player.prototype.jump = function () {
	if (!this.isJumping) {
		this.gotoAndPlay("jump");
		this.yVelocity -= jumpAmount;
	}
};
