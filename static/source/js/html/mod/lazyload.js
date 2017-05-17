/**
 * 
 * @authors Saturday (zhouling@51talk.com)
 * @date    2014-09-19 10:46:34
 * @version 1.0.0
 */
define("lazyload",[],function(require,exports,module){
    var oWin=$(window);
    var aImg=$("img");
    oWin.on("load scroll resize",function(){
        var scrollT=oWin.scrollTop();
        aImg.each(function(){
            if(this.src)return true;
            var oImg=$(this);
            if(scrollT+oWin.height()>=oImg.offset().top){
                this.src=this.getAttribute("_src");
                this.removeAttribute("_src");
            }
        });
        
    });
});
