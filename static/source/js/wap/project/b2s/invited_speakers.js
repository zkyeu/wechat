define("invited_speakers", ["fastclick", "utility"], function(require, exports, module) {
    require("fastclick");
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
                        // alert("短信发送成功，请查收！");
                        appPrompt({ "text": "短信发送成功，请查收！" });
                        return true;
                    } else {
                        // alert(r.info);
                        appPrompt({ "text": r.info});
                    }
                },
                error: function() {
                    // alert("短信发送失败，请重试！");
                    appPrompt({ "text": "短信发送失败，请重试！" });

                },
                sendBefore: function() {
                    var teleRe = /^1[0-9]{10}$/;
                    var tele = $(".js_input_tel").val();
                    // var passwordRe = /^\w+$/;
                    // var password = $(".js_password").val();
                    if (!tele.trim()) {
                        // alert("请输入您的手机号");
                        appPrompt({ "text": "请输入您的手机号" });
                        return;
                    }
                    if (!teleRe.test(tele.trim())) {
                        // alert("手机号格式不正确");
                        appPrompt({ "text": "手机号格式不正确" });
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
        $(".js_register").on("click", function() {
            var ajaxurl = $(".js_register").data("ajaxurl");
            var tele = $(".js_input_tel").val();
            var teleRe = /^1[0-9]{10}$/;
            var number = $(".js_input_captcha").val();
            var name = $(".js_input_name").val();
            // var nameRe = /^[\u4E00-\u9FA5\u9FA6-\u9FCB\u3400-\u4DB5\u20000-\u2A6D6\u2A700-\u2B734\u2B740-\u2B81D\uF900-\uFAD9]{2,10}$/;
            var nameRe = /^[\u4E00-\u9FA5\u4dae]{2,10}$/;
            if (!name.trim()) {
                // alert("请输入您的姓名");
                appPrompt({"text":"请输入您的姓名"});
                return;
            }
            if (!nameRe.test(name.trim())) {
                // alert("请输入正确的姓名");
                appPrompt({"text":"请输入正确的姓名"});
                return;
            }
            if (!tele.trim()) {
                // alert("请输入您的手机号");
                appPrompt({ "text": "请输入您的手机号" });
                return;
            }
            if (!teleRe.test(tele.trim())) {
                // alert("手机号格式不正确");
                appPrompt({ "text": "手机号格式不正确" });
                return;
            }
            if (!number.trim()) {
                // alert("请输入验证码");
                appPrompt({ "text": "请输入验证码" });
                return;
            }
            

            // document.getElementById("register").submit();
            $.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                    "realname":name,
                    "mobile": tele,
                    "sms_code": number,
                },
                dataType: "json",
                success: function(data) {
                    /*1:
					{
					    "status": 1,
					    "info": "注册成功",
					    "data": {
					        "redirect": "/Activity/ExpertLectures/signUpSetp2"
					    }
					}

					2.
					{
					    "status": 0,
					    "info": "注册失败",
					    "data": ""
					}*/

                    if (data.status == 1) {
                        /*appPrompt({
                        	"text": data.info,
                        	"cb": function(){
                        		window.location.href = data.data.redirect;
                        	}
                        });*/
                        window.location.href = data.data.redirect;
                    } else {
                        appPrompt({ "text": data.info });
                    }
                }
            });
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
