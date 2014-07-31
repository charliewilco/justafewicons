$(document).ready(function() {
    $('.controller input[type="radio"]').on("click", function() {
        $(".grid img")
                .removeClass()
                .addClass( '' + ($(this).attr('id')) );
    });
});
