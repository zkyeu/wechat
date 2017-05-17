/**
 * Created by liliang on 2017/01/04.
 */
define("defaultChat",["weixinUtil"],function(require,exports,module){
    var checkBrowser = require("weixinUtil");
    ;(function () {
        var height = window.innerHeight*0.9;
        $('.big-bg').attr("style","height:"+height+"px");
    })();

    if(checkBrowser.checkBrowser()!='Chrome'){
        $(".big-bg div input").attr({class:"disBtn",disabled:"disabled"});
        alert("当前浏览器不支持微信聊天，请使用谷歌浏览器操作！");
    }else{
        $(".big-bg div input").addClass("ablBtn");
    }

});