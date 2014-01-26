$(function () {
    $("div.card").draggable({ revert: function (dropped) {
        return !dropped;
    } });
    $("#editorPane span.card").droppable({ drop: function (event, ui) {
        console.log(event, ui);
    } });
});
