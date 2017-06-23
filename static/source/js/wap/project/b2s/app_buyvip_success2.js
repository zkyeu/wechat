define(function(require, exports, module) {

    ;
    (function() {
        $(document).ready(function() {
            var href = $("#success_href").data("href"),
                text = $("#success_href").data("text");
            alert(text);
            // window.location.href = href;
            window.location.replace(href);
        })


    })();

});
