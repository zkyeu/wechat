define(function(require, exports, module) {
    require("appPrompt");
    ;
    (function() {
        
        //限制文本域中输入的个数
        var js_textarea = $(".js_textarea"),
            maxLength = js_textarea.data("maxlength");

        js_textarea.on("input","",function(){
            var _this = $(this);
            checkLength(_this,maxLength);
        })

        var checkLength = function(dom,num){
            var val = dom.val(),
                len = val.length;
            val = len > num ? val.substring(0,num) : val;
            js_textarea.val(val);
            $(".js_textareaRemaining").html(val.length+"/"+num);
        }

        /*var js_dialog = $("#js_dialog"), //dialog灰色层
            js_dialog_close = $(".js_dialog_close"); //关闭dialog按钮*/
            

        //点击按钮显示弹出框
        /*$(".consult-input").on("click", "", function() {
            dialog_show("aaa");
        })*/

        /*//点击按钮关闭弹出框
        js_dialog_close.on("click", "", function() {
            dialog_close();
        })

        //显示dialog，str为区别显示哪个弹出框。
        window.dialog_show = function(str) {
            $(".js_prompt").html(str);
            js_dialog.removeClass('disnone');
        }

        //关闭dialog。
        window.dialog_close = function(str) {
            js_dialog.addClass('disnone');
        }*/


    })();

});
