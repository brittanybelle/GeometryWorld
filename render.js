function renderLine(lineToBeRendered) {
    lineToBeRendered.graphics.clear();

    // The following var's are in "player space" (referenced to visible grid, not canvas):
    var xFrom = 0;
    var xTo = gridWidth;
    var yFrom = lineToBeRendered.yIntercept;
    var yTo = lineToBeRendered.slope*xTo + lineToBeRendered.yIntercept;

    // Set graphics
    lineToBeRendered.graphics.beginStroke("black");
    lineToBeRendered.graphics.moveTo( xFrom*cellSize, canvas.height - yFrom*cellSize );
    lineToBeRendered.graphics.lineTo( xTo*cellSize, canvas.height - yTo*cellSize );

}