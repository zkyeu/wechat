define("lazyLoad", [], function(require, exports, module){
    ;(function($, w){
        var $src, $w, wh, lazy;

        $src = $("[_src]");
        $w = $(w);
        wh = $w.height();
        lazy = function(){
            if($src.filter("[_src]").length == 0) $w.off("scroll.k");
            var scrollTop = $w.scrollTop();
            $src.each(function(i,v){
                var $v = $(v),
                    $src = $v.attr("_src");
                if(!$src) return;
                var osTop = $v.offset().top,
                    otHeight = $v.height(),
                    flagT = scrollTop + wh > osTop,
                    flagD = scrollTop < osTop + otHeight;
                if(flagT && flagD){
                    $v.attr("src", $src).removeAttr("_src");
                }
            });
        }
        $w.on("scroll.k load", lazy);
    })(jQuery, window);
});
