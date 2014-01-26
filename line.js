function Line(stage, editorForm) {
    var self = this;

    self.picked = false;
    self.editor = new Editor(editorForm);

    self.render = function () {
        self.graphics.clear();

        // The following var's are in "player space" (referenced to visible grid, not canvas):
        var xFrom = 0;
        var xTo = gridWidth;
        var yFrom = self.yIntercept;
        var yTo = self.slope * xTo + self.yIntercept;

        var lineColour = self.picked ? "red" : "black";
        var lineWidth = self.picked ? 3 : 1;

        // Set graphics
        self.graphics.beginStroke(lineColour);
        self.graphics.setStrokeStyle(lineWidth);
        self.graphics.moveTo(xFrom * cellSize, canvas.height - yFrom * cellSize);
        self.graphics.lineTo(xTo * cellSize, canvas.height - yTo * cellSize);
    };

    self.loadValuesFromForm = function () {
        self.yIntercept = self.editor.getYIntercept();
        self.slope = self.editor.getSlope();
    };

    function distanceToPoint(x, y) { // in player coordinates
        // xP, yP are in player coordinates
        var xP = x / cellSize;
        var yP = (canvas.height - y) / cellSize;
        return Math.abs(-self.slope * xP + yP + -self.yIntercept) / Math.sqrt(self.slope * self.slope + 1);
    }

    function onStageMouseDown(e) {
        self.picked = distanceToPoint(e.stageX, e.stageY) < 0.67;
        self.editor.setPicked(self.picked);
        return self.picked;
    }

    stage.on("stagemousedown", onStageMouseDown);
}

Line.prototype = new createjs.Shape();
