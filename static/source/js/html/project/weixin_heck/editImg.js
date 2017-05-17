define("editImg",["editImgFn"],function(require,exports,module){
    /*编辑图片old*/
    /*require("feather");
     require("feathercontrols_zh_hans");
     exports.init = function(o){
     return new Aviary.Feather({
     apiKey: '121285904@qq.com',//apikey可以免费申请，https://creativesdk.adobe.com/docs/web/#/index.html
     apiVersion: 3,
     // theme: 'dark', // Check out our new 'light' and 'dark' themes!
     tools: 'orientation,draw,text',//这里设置为all，可以显示所有的工具
     // initTool: 'text',//默认展开的工具
     language: 'zh_HANS',//简体中文
     appendTo: o.container,
     onSave: function (imageID, newURL) {
     // 弹出保存窗口
     // AV.controlsWidgetInstance.messager.show("avpw_aviary_beensaved", !0);
     typeof(o.save) == "function" && o.save.apply(null, arguments);
     // $("#image1").attr("src", "data:image/jpg;base64," + newURL);
     },
     onError: function (errorObj) {
     alert(errorObj.message);
     }
     });
     }
     */

    /*编辑图片new*/
    var editImgFn = require("editImgFn");
    window.editImgFn = editImgFn;
    exports.initNew = function(o){
        var defaults = {
            tools : ["pencil", "text", "rotate", "rubberNew", "draft", "seal", "rect", "cut", "save"]
        },
        configs = $.extend({}, defaults, o);
        editImgFn.init(configs);
    }
});

