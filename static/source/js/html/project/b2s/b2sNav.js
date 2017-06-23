define("b2sNav",[],function(require,exports,module){
    var b2sNav = $("[data-init=b2sNav]"),
        b2sNavs = b2sNav.find(".b2s-nav-in > ul"),
        b2sNavsLi = b2sNavs.children("li:not('.line')"),
        b2sNavLine = b2sNav.find(".b2s-nav-line"),
        b2sNavCur = b2sNavsLi.filter(".cur"),
        getStyle = function(){
            var self = $(this);
            if(!self[0]) return {};
            return {
                left : self.offset().left - b2sNavs.offset().left,
                width : self.outerWidth()
            }
        },
        getCur = function(type){
            return b2sNavLine.stop()[type](getStyle.call(b2sNavCur));
        }

    getCur("css").show();

    b2sNavsLi.on("mouseenter",function(){
        b2sNavLine.stop().animate(getStyle.call(this));
    });

    b2sNavs.on("mouseleave",function(e){
        getCur("animate");
    });

});