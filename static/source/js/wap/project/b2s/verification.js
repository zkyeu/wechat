define("verification", ["fastclick","utility"], function(require, exports, module) {
    require("fastclick"); //去除click延迟
    FastClick.attach(document.body);
    var utility = require("utility");

    (function() {
        
        /***注册账号发送验证码***/
        (function() {
            utility.deftime({
                url: $(".js_send_captcha").data("captchaurl"),
                tar: ".js_send_captcha",
                text: "发送验证码",
                success: function(r) {
                    if (r.status == 1) {
                        appPrompt({"text":"短信发送成功，请查收！"});
                        return true;
                    } else {
                        appPrompt(r.info);
                    }
                },
                error: function() {
                    appPrompt({"text":"短信发送失败，请重试！"});

                },
                sendBefore: function() {
                    var teleRe = /^1[0-9]{10}$/;
                    var tele = $(".js_telephone").val();
                    // var passwordRe = /^\w+$/;
                    // var password = $(".js_password").val();
                    if (!tele.trim()) {
                        appPrompt({"text":"请输入您的手机号"});
                        return;
                    }
                    if (!teleRe.test(tele.trim())) {
                        appPrompt({"text":"手机号格式不正确"});
                        return;
                    }
                    return {
                        mobile: tele,
                        sms_type: $("[send-type]").attr("send-type")
                    }
                }
            });
        })();
        /***注册账号发送验证码结束***/

        // 注册账号验证 start
        $(".js_register").on("click",function(){
            // var ajaxurl = $(".js_register").data("ajaxurl");
            var tele = $(".js_telephone").val();
            // var password = $(".js_password").val();
            var number = $(".js_captcha").val();
            var teleRe = /^1[0-9]{10}$/;
            // var passwordRe = /^[\w+]{6,20}$/;
            if (!tele.trim()) {
                // alert("请输入您的手机号");
                appPrompt({"text":"请输入您的手机号"});
                return;
            }
            if (!teleRe.test(tele.trim())) {
                // alert("手机号格式不正确");
                appPrompt({"text":"手机号格式不正确"});
                return;
            }
            if (!number.trim()) {
                // alert("请输入验证码");
                appPrompt({"text":"请输入验证码"});
                return;
            }

            $("#js_form").submit();
            /*$.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                    "mobile":tele,
                    // "password":password,
                    "mobile_code":number,
                },
                dataType: "json",
                success: function(data) {
                    
                    if(data.success == 0){
                        //登录、有信息、有密码，直接去支付
                    }else if(data.success == 1){
                        //登录、无信息信息、有密码，直接去完善信息
                    }else if(data.success == 2){
                        //登录、无信息信息、无密码，直接去完善信息和密码
                    }else{
                        appPrompt({"text":data.msg});
                    }
                }
            });*/
        });
        // 注册账号验证 end

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
