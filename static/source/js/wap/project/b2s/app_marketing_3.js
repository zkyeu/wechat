define("app_marketing_3", ["fastclick", "utility", "swiper-3.3.1.jquery.min"], function(require, exports, module) {
    require("fastclick");
    FastClick.attach(document.body);
    var utility = require("utility");
    isAndroid = utility.checkPlat.isAndroid();

    (function() {
        /*var js_telephone = $('.js_telephone');
        var js_captcha = $('.js_captcha');
        var js_password = $('.js_password');
        
        $(".js_telephone").on("focus","",function(){
            setInterval(function(){
                js_telephone.scrollIntoView(false);
            },200)
        })
        $(".js_captcha").on("focus","",function(){
            setInterval(function(){
                js_captcha.scrollIntoView(false);
            },200)
        })
        $(".js_password").on("focus","",function(){
            setInterval(function(){
                js_password.scrollIntoView(false);
            },200)
        })*/
$(".js_test").on("focus","",function(){
    var _this = $(this),
        _top = _this.offset().top;
    document.body.scrollTop = _top;
})

        var mySwiper1 = new Swiper('.swiper-container_1', {
            autoplay: 3000, //可选选项，自动滑动
            autoplayDisableOnInteraction: false,
            loop: true,
            pagination: '.swiper-pagination', // 如果需要分页器
        });
        var mySwiper2 = new Swiper('.swiper-container_2', {
            autoplay: 3000, //可选选项，自动滑动
            autoplayDisableOnInteraction: false,
            loop: true,
            pagination: '.swiper-pagination', // 如果需要分页器
        });
        var mySwiper3 = new Swiper('.swiper-container_3', {
            autoplay: 3000, //可选选项，自动滑动
            autoplayDisableOnInteraction: false,
            loop: true,
            pagination: '.swiper-pagination', // 如果需要分页器
        });



        ///////////
        
        $(".js_password").on("focus","",function(){
            var _this = $(this),
                h = _this.offset().top - $("body").scrollTop();
            // alert(_this.offset().top);
            // alert($("body").scrollTop());
            // alert(h);
            // alert($(".js_dialog_con2").css("top"));
            // alert($(".js_dialog_con2").position().top);
            // $(".js_dialog_con2").css({"top":0-(h-parseInt($(".js_dialog_con2").css("top")))});
            // _this.scrollIntoView(true);
        })
        $(".js_password").on("blur","",function(){
            // alert(bodyScrollTop)
            // $("body").scrollTop("0");
            // $(window).scrollTop(0);
            // $('html, body').animate({scrollTop: bodyScrollTop}, 300); 
            // $(window).scrollTop("10px");
        })
        ///////////////
        //dialog
        var bodyScrollTop = null,
            js_apply = $(".js_apply"),
            js_consult = $(".js_consult"),
            js_select = $(".js_select"),
            js_dialog = $(".js_dialog"),
            js_dialog_con = $(".js_dialog_con"),
            js_dialog_con1 = $(".js_dialog_con1"),
            js_dialog_con2 = $(".js_dialog_con2"),
            js_dialog_con3 = $(".js_dialog_con3"),
            js_dialog_con4 = $(".js_dialog_con4"),
            js_dialog_close = $(".js_dialog_close"),
            dialogTop = null;

        // if(isAndroid){
            // var dialogTopIsUse = 1;
            $(".js_input").on("focus","",function(){
                var _this = $(this);
                // if(dialogTopIsUse == 1){
                //     dialogTop = parseInt(_this.parents(".js_dialog_con").css("top"));
                //     dialogTopIsUse = 0;
                // }
                console.log("获得焦点");
                console.log(_this.parents(".js_dialog_con").css("top"));
                console.log(dialogTop);
                _this.attr('use', '1');//自定义属性，值1表示当前input框获得焦点。
                // js_dialog_con.css({"top": -50});
                var _top = _this.parent().prev().offset().top;
                document.body.scrollTop = _top - 20;//-20留点空白
            })
            $(".js_input").on("blur","",function(){
                var _this = $(this),
                    num = 0;
                setTimeout(function(){

                    console.log("失去焦点");
                    console.log(dialogTop);
                    _this.attr('use', '0');//自定义属性，值0表示当前input框失去焦点。
                    for(var i = 0,len = $(".js_input").length;i<len;i++){
                        var use = $(".js_input").eq(i).attr("use");
                        if(use){
                            num = num + parseInt(use);
                        }
                    }
                    if(num == 0){
                        // js_dialog_con.css({"top": dialogTop});
                        // dialogTopIsUse = 1;
                        document.body.scrollTop = dialogTop;
                    }
                },200)
            })
        // }

        js_consult.on("click","",function(){
            bodyScrollTop = $("body").scrollTop();
            var _this = $(this),
                // ajaxurl = _this.data('ajaxurl'),
                isexist = _this.data('isexist'),
                userid = _this.data('userid');
            if(isexist == 1 || isexist == 2){
                return;
            }
            if(userid > 0){
                showDialogCon(1);
                showDialog();
            }else{
                showDialogCon(2);
                showDialog();
            }
        });


        //显示某个弹框
        function showDialogCon(num){
            js_dialog_con.addClass('disnone');
            if(num == 1){
                js_dialog_con1.removeClass('disnone');
                setTimeout(function(){
                    dialogConCenter(js_dialog_con1);
                },1)
            }else if(num == 2){
                js_dialog_con2.removeClass('disnone');
                setTimeout(function(){
                    dialogConCenter(js_dialog_con2);
                },1)
            }else if(num == 3){
                js_dialog_con3.removeClass('disnone');
                setTimeout(function(){
                    dialogConCenter(js_dialog_con3);
                },1)
            }else if(num == 4){
                js_dialog_con4.removeClass('disnone');
            }
        }
        //弹框左右上下居中显示
        function dialogConCenter(dom){
            var w = dom.width(),
                h = dom.height(),
                windowW = $(window).width(),
                windowH = $(window).height(),
                l = (windowW - w)/2,
                t = (windowH - h)/2;
            dialogTop = $(window).scrollTop();
                // alert(dialogTop);
                dom.css({
                    "left": l,
                    "top": t + dialogTop,
                    // "top": 0,
                });
                /*dom.css({
                    "left": ((windowW - w)/2),
                    "top": ((windowH - h)/2 + bodyScrollTop),
                });*/
        }
        //弹框关闭
        js_dialog_close.on("click", "", function() {
            js_dialog.addClass("disnone");
            controlScroll.unLock();
        });
        //弹框显示
        function showDialog(){
            js_dialog.removeClass("disnone");
            controlScroll.lock();
        }

        //弹框内的下拉列表
        js_select.on("click", "", function() {
            var ajaxurl = js_select.data("ajaxurl"),
                js_english_level = $(".js_english_level").val(),
                js_study_purpose = $(".js_study_purpose").val(),
                js_is_attend = $(".js_is_attend").val(),
                from_type = js_select.data("fromtype");
            if (js_english_level == 0) {
                appPrompt({"text":"请选择所有信息，以便课程顾问为孩子制定学习计划"});
                return;
            }
            if (js_study_purpose == 0) {
                appPrompt({"text":"请选择所有信息，以便课程顾问为孩子制定学习计划"});
                return;
            }
            if (js_is_attend == 0) {
                appPrompt({"text":"请选择所有信息，以便课程顾问为孩子制定学习计划"});
                return;
            }
            $.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                    "english_level":js_english_level,
                    "study_purpose":js_study_purpose,
                    "is_attend":js_is_attend,
                    "from_type":from_type,
                },
                dataType: "json",
                success: function(data) {
                    /*{
                        success:"",// -1 0
                        msg:"XXXXXX"
                    }*/
                    if(data.success == 0){
                        showDialogCon(4);
                        js_apply.addClass('marketing-btn-forbid');
                        js_consult.html("已提交咨询，请等待课程顾问联系您");
                        js_consult.attr({
                            "data-isexist": "1",
                        });
                    }else{
                        appPrompt({"text":data.msg});
                    }
                }
            });
            // selectStrNow = js_english_level.val();
            /*var _this = $(this),
                selectStrNow = _this.find('option:selected').text();
            _this.prev().html(selectStrNow);*/
        });


        //注册弹框跳转登录弹框
        $(".js_skip_register").on("click", "", function() {
            showDialogCon(3);
        });
        /***注册账号发送验证码***/
        (function() {
            utility.deftime({
                url: $(".js_send_captcha").data("captchaurl"),
                tar: ".js_send_captcha",
                text: "发送验证码",
                success: function(r) {
                    if (r.status == 1) {
                        // alert("短信发送成功，请查收！");
                        appPrompt({"text":"短信发送成功，请查收！"});
                        return true;
                    } else {
                        alert(r.info);
                    }
                },
                error: function() {
                    // alert("短信发送失败，请重试！");
                    appPrompt({"text":"短信发送失败，请重试！"});

                },
                sendBefore: function() {
                    var teleRe = /^1[0-9]{10}$/;
                    var tele = $(".js_telephone").val();
                    var passwordRe = /^\w+$/;
                    var password = $(".js_password").val();
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
            var ajaxurl = $(".js_register").data("ajaxurl");
            var tele = $(".js_telephone").val();
            var password = $(".js_password").val();
            var number = $(".js_captcha").val();
            var teleRe = /^1[0-9]{10}$/;
            var passwordRe = /^[\w+]{6,20}$/;
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

            // document.getElementById("register").submit();
            $.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                    "mobile":tele,
                    "password":password,
                    "mobile_code":number,
                },
                dataType: "json",
                success: function(data) {
                    /*{
                        success:"",// -1 0
                        msg:"XXXXXX"
                    }*/
                    if(data.success == 0){
                        showDialogCon(1);
                        js_consult.attr({
                            "data-userid": "123",
                        });
                    }else{
                        appPrompt({"text":data.msg});
                    }
                }
            });
        });
        // 注册账号验证 end


        /***登录账号发送验证码***/
        (function() {
            utility.deftime({
                url: $(".js_reg_send_captcha").data("captchaurl"),
                tar: ".js_reg_send_captcha",
                text: "发送验证码",
                success: function(r) {
                    if (r.status == 1) {
                        // alert("短信发送成功，请查收！");
                        appPrompt({"text":"短信发送成功，请查收！"});
                        return true;
                    } else {
                        alert(r.info);
                    }
                },
                error: function() {
                    // alert("短信发送失败，请重试！");
                    appPrompt({"text":"短信发送失败，请重试！"});

                },
                sendBefore: function() {
                    var teleRe = /^1[0-9]{10}$/;
                    var tele = $(".js_reg_telephone").val();
                    // var passwordRe = /^\w+$/;
                    // var password = $(".js_password").val();
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
                    return {
                        mobile: tele,
                        sms_type: $("[send-type2]").attr("send-type2")
                    }
                }
            });
        })();
        /***登录账号发送验证码结束***/
        // 登录验证 start
        $(".js_reg").on("click",function(){
            var ajaxurl = $(".js_reg").data("ajaxurl");
            var tele = $(".js_reg_telephone").val();
            // var password = $(".js_password").val();
            var number = $(".js_reg_captcha").val();
            var teleRe = /^1[0-9]{10}$/;
            // var passwordRe = /^\w+$/;
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
            /*if (!passwordRe.test(password.trim())) {
                // alert("请输入您的密码");
                appPrompt({"text":"请输入您的密码"});
                return;
            }*/
            // document.getElementById("register").submit();
            $.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                    "mobile":tele,
                    "mobile_code":number,
                },
                dataType: "json",
                success: function(data) {
                    /*{
                        success:"",// -1 0
                        msg:"XXXXXX"
                    }*/
                    if(data.success == 0){
                        showDialogCon(1);
                        js_consult.attr({
                            "data-userid": "123",
                        });
                    }else if(data.success == 1){
                        showDialogCon(4);
                        js_apply.addClass('marketing-btn-forbid');
                        js_consult.html("已提交咨询，请等待课程顾问联系您");
                        js_consult.attr({
                            "data-isexist": "1",
                        });
                    }else{
                        appPrompt({"text":data.msg});
                    }
                }
            });
        });
        // 登录验证 end

        //有弹框后禁止滑动
        var controlScroll = (function() {
                var dis = function(event) {
                        event.preventDefault();
                    },
                    body = document.body || document.documentElement;

                return {
                    lock: function(filter) {
                        body.addEventListener('touchmove', dis, false);
                    },
                    unLock: function(filter) {
                        body.removeEventListener('touchmove', dis, false);
                    }
                }
            })()
            

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
