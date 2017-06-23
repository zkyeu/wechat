define(function(require, exports, module) {

    ;
    (function() {
        
        var js_solve = $("#js_solve");
        js_solve.on("click", "li", function() {
            var _this = $(this);
            _this.addClass('selected');
            js_solve.off();
        })

    })();

});
