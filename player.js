
function Player() {
}

Player.prototype = new createjs.Shape();

Player.prototype.initialize = function () {

	this.x = 100;
	this.y = 100;
	this.radius = 15;
	this.speed = 10;

};

Player.prototype.render = function () {

	// draw the player
    this.graphics.clear();
    this.graphics.beginFill("red").drawCircle( this.x, this.y, this.radius );

};

Player.prototype.moveLeft = function() {
	this.x -= this.speed;
}

Player.prototype.moveRight = function() {
	this.x += this.speed;
}

Player.prototype.tick = function (event) {

};

