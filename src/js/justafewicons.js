$(document).ready(function() {
    $('.controller input[type="radio"]').on("click", function() {
        $("svg")
            .removeClass()
            .attr( 'class', $(this).attr('id') );
    });
});
