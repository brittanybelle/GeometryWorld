function Line(stage) {
    var self = this;

    self.picked = false;

    self.render = function () {
        self.graphics.clear();

        // The following var's are in "player space" (referenced to visible grid, not canvas):
        var xFrom = 0;
        var xTo = gridWidth;
        var yFrom = this.yIntercept;
        var yTo = this.slope * xTo + this.yIntercept;

        var lineColour = self.picked ? "red" : "black";
        var lineWidth = self.picked ? 3 : 1;

        // Set graphics
        self.graphics.beginStroke(lineColour);
        self.graphics.setStrokeStyle(lineWidth);
        self.graphics.moveTo(xFrom * cellSize, canvas.height - yFrom * cellSize);
        self.graphics.lineTo(xTo * cellSize, canvas.height - yTo * cellSize);
    };

    function distanceToPoint(x, y) { // in player coordinates
        // xP, yP are in player coordinates
        var xP = x / cellSize;
        var yP = (canvas.height - y) / cellSize;
        return Math.abs(-self.slope * xP + yP + -self.yIntercept) / Math.sqrt(self.slope * self.slope + 1);
    }

    function onStageMouseDown(e) {
        self.picked = distanceToPoint(e.stageX, e.stageY) < 0.67;
        return self.picked;
    }

    stage.on("stagemousedown", onStageMouseDown);
}

Line.prototype = new createjs.Shape();
