define("verification2", ["fastclick","utility"], function(require, exports, module) {
    require("fastclick"); //去除click延迟
    FastClick.attach(document.body);
    var utility = require("utility");

    (function() {
        $(".js_password").on({
            "focus":function(){
                // console.log("获得焦点");
                $(".verification-bottom").addClass("disnone");
            },
            "blur":function(){
                // console.log("失去焦点");
                $(".verification-bottom").removeClass("disnone");
            },
        })
        //下拉列表
        var js_select2 = $(".js_select2");
        js_select2.on("click", "", function() {
            var ajaxurl = js_select2.data("ajaxurl"),
                js_grade2 = $(".js_grade2").val(),
                js_study_grade2 = $(".js_study_grade2").val();
            var password = $(".js_password").val();
            var passwordRe = /^[\w+]{6,20}$/;
            if (js_grade2 == 0) {
                appPrompt({"text":"请选择孩子所在年级"});
                return;
            }
            if (js_study_grade2 == 0) {
                appPrompt({"text":"请选择学校何时开始教授英语"});
                return;
            }
            if (!password.trim()) {
                // alert("请输入您的手机号");
                appPrompt({"text":"请输入您的密码"});
                return;
            }
            if (!passwordRe.test(password.trim())) {
                // alert("请输入您的密码");
                appPrompt({"text":"密码长度不正确"});
                return;
            }
            
            $("#js_form").submit();
            /*$.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                    "grade":js_grade2,
                    "current_grade":js_study_grade2,
                    "password":password,
                },
                dataType: "json",
                success: function(data) {
                    
                    if(data.success == 0){
                        showBuy();//mengyao写。
                    }else{
                        appPrompt({"text":data.msg});
                    }
                }
            });*/
            
        });

        //弹框上的提示层
        window.appPrompt = function(obj) {
                var defaults = {
                    "class": "",
                    "id": "",
                    "setTimeout": 2000,
                    "text": "请重试",
                    "cb": null
                };
                var _obj = $.extend({}, defaults, obj);
                var _dom = null;
                if (!_dom) {
                    _dom = $('<div class="appPrompt ' + _obj.class + '" id="' + _obj.id + '"><span>' + _obj.text + '</span></div>');
                    _dom.appendTo('body');
                }
                _dom.css('display', 'blcok');
                setTimeout(function() {
                    _dom.css('display', 'none');
                    if (_obj.cb) {
                        _obj.cb();
                    }
                }, _obj.setTimeout)
            }
            // appPrompt({"text":"啊啊啊啊啊","class":"aaa","cb":function(){alert(123)}});

    })()

});
