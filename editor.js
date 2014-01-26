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

}
