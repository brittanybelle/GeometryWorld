function Editor(formBox) {
    var self = this;

    self.setPicked = function (picked) {
        if (picked) {
            formBox.show();
        } else {
            formBox.hide();
        }
    };

    self.getYIntercept = function () {
        return parseFloat(formBox.find("input[name='yIntercept']").val());
    };

    self.getSlope = function () {
        return parseFloat(formBox.find("input[name='slope']").val());
    };

    self.move = function (y, slope) {
        var canvasOffset = $("#geoworld-canvas").offset();
        var formBoxHeight = formBox.height();

        if (slope < 0) {
            // Position box above: Move top up by height of form box
            y = y - formBoxHeight;
        }

        // Clamp formBox to screen
        if (y < 0) {
            y = 0;
        } else if (y > canvas.height - formBoxHeight) {
            y = canvas.height - formBoxHeight;
        }

        formBox.css({ position: "absolute", left: canvasOffset.left, top: canvasOffset.top + y });
    };
}
