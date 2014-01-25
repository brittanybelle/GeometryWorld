function Line() {
}

Line.prototype = new createjs.Shape();

Line.prototype.render = function () {
    this.graphics.clear();

    // The following var's are in "player space" (referenced to visible grid, not canvas):
    var xFrom = 0;
    var xTo = gridWidth;
    var yFrom = this.yIntercept;
    var yTo = this.slope*xTo + this.yIntercept;

    // Set graphics
    this.graphics.beginStroke("black");
    this.graphics.moveTo( xFrom*cellSize, canvas.height - yFrom*cellSize );
    this.graphics.lineTo( xTo*cellSize, canvas.height - yTo*cellSize );

};
