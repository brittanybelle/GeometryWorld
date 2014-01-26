function CardController(/* shapes */) { // this is not the right interface design
    var self = this;

    self.shapes = arguments;

    self.dropCard = function (source, target) {
        var newValue = $(source).text();
        $(source).remove();
        $(target).text(newValue);
        $.each(self.shapes, function (k, v) { v.loadValuesFromForm() });
    };

    $(function () {
        $("div.card").draggable({
            revert: function (dropped) {
                return !dropped;
            },
            revertDuration: 200
        });

        $("#editorPane span.card").droppable({
            activeClass: "ui-state-active",
            hoverClass: "ui-state-hover",
            tolerance: "pointer",
            drop: function (event, ui) {
                self.dropCard(ui.draggable, this);
            }
        });
    });

}
