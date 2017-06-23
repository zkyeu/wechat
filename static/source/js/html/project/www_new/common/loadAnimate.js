/**
 * 
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-11-09 10:46:34
 * @version 1.0.0
 */
define("loadAnimate", [], function(require,exports,module){
    alert("我是动画插件");
    var oWin=$(window);
    var aniItem=$("[data-ani]");
    oWin.on("load scroll resize",function(){
        var scrollT=oWin.scrollTop();
        aniItem.each(function(){
            if(this.src)return true;
            var oImg=$(this);
            if(scrollT+oWin.height()>=oImg.offset().top){
                this.src=this.getAttribute("_src");
                this.removeAttribute("_src");
            }
        });
        
    });
});
