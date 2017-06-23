/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2017-02-17 12:10:30
 * @version 1.0.0
 */
define(function(require, exports, module) {
    var wait = 60;

    //页面元素
    var j_modal_box = $('#j_modal_box');
    var j_login_form = $('#j_login_form');
    var j_reg_form = $('#j_reg_form');
    var j_login_info = $('#j_login_info');
    var j_reg_info = $('#j_reg_info');

    /*添加推荐英文名2*/
    var regs = {
        regMobile: /^1[0-9]{10}$/,
        regPass: /^([\w\+\!\@\#\$\%\^\&\*\(\)]{6,20})$/
    }

    //去空格
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    // 我要参赛按钮
    $('#j_join_btn,#j_banner_join').click(function() {
        var loginStatus = $('#j_login_status').val();
        if (loginStatus == 0) {
            j_modal_box.removeClass('hide');
            j_login_form.removeClass('hide');
        } else {
            location.href = $('#j_join_btn').attr('data-url');
        }
    });

    $("#intro p").click(function(){
        $(this).hide();
        $(this).next().removeClass("hide");
    });

    // 登陆验证
    $("#j_reg_btn").click(function() {
        var j_mobile = $("#j_reg_form input[name='mobile']");
        var j_mobile_code = $("#j_reg_form input[name='mobile_code']");
        var j_password = $("#j_reg_form input[name='password']");

        var mobile = j_mobile.val().trim();
        var mobile_code = j_mobile_code.val().trim();
        var password = j_password.val().trim();
        var recommen_mobile = $("#intro input").val();


        if (mobile == '') {
            showErrorTip(j_reg_info, '请填写手机号', j_mobile);
            return false;
        } else if (!regs.regMobile.test(mobile)) {
            showErrorTip(j_reg_info, '请填写正确的手机号码', j_mobile);
            return false;
        } else if (mobile_code == '') {
            showErrorTip(j_reg_info, '请填写验证码', j_mobile_code);
            return false;
        } else if (password == "") {
            showErrorTip(j_reg_info, '密码不能为空', j_password);
            return false;
        } else if (!regs.regPass.test(password)) {
            showErrorTip(j_reg_info, '密码为6-20位字母数字组合', j_password);
            return false;
        }

        hideErrorTip(j_reg_info);

        $.ajax({
            type: 'post',
            url: '/ajax/mobileCodeRegister',
            data: {
                mobile: mobile,
                mobile_code: mobile_code,
                password: password,
                recommen_mobile : recommen_mobile
            },
            dataType: 'json',
            success: function(data) {
                // console.log("注册信息===" + JSON.stringify(data));
                if (data.status == 0) {
                    // alert(data.info);
                    showErrorTip(j_reg_info, data.info);
                } else {
                    location.href = $('#j_join_btn').attr('data-url');
                }
            },
            error: function() {
                alert('网络异常，请稍后重试');
            }
        });
    });

    // 验证码获取倒计时
    function time(o) {
        if (wait == 0) {
            o.removeClass("y_code_down");
            o.text("获取验证码");
            wait = 60;
        } else {
            o.addClass("y_code_down");
            o.text(wait + "s");
            wait--;
            setTimeout(function() {
                time(o);
            }, 1000);
        }
    };

    $("#j_getCode").click(function() {
        if ($(this).hasClass("y_code_down")) return false;
        var index = $(this);
        var j_mobile = $("#j_reg_form input[name='mobile']");
        var mobile = j_mobile.val().trim() || "";

        if (mobile == '') {
            showErrorTip(j_reg_info, '请填写手机号', j_mobile);
            return false;
        } else if (!regs.regMobile.test(mobile)) {
            showErrorTip(j_reg_info, '请填写正确的手机号码', j_mobile);
            return false;
        }

        hideErrorTip(j_reg_info);

        $.ajax({
            url: '/ajax/sendSms',
            data: {
                mobile: mobile
            },
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.status == 0) {
                    showErrorTip(j_reg_info, data.info);
                } else {
                    time(index);
                }
            },
            error: function() {
                alert('网络异常，短信发送失败');
            }
        });
    });

    // 立即注册
    $("#j_reg_link").click(function() {
        j_login_form.find(".f-item input.f-text").val('');
        j_reg_form.removeClass('hide');
        j_login_form.addClass('hide');
    });

    //立即登录
    $("#j_login_link").click(function() {
        j_reg_form.find(".f-item input.f-text").val('');
        j_reg_form.addClass('hide');
        j_login_form.removeClass('hide');
    });

    // 注册验证
    $("#j_login_btn").click(function() {

        var j_user_name = $("#j_login_form input[name='user_name']");
        var j_password = $("#j_login_form input[name='password']");
        var user_name = j_user_name.val().trim();
        var password = j_password.val().trim();

        if (user_name == '') {
            showErrorTip(j_login_info, '请填写手机号', j_user_name);
            return false;
        } else if (!regs.regMobile.test(user_name)) {
            showErrorTip(j_login_info, '请填写正确的手机号码', j_user_name);
            return false;
        } else if (password == "") {
            showErrorTip(j_login_info, '密码不能为空', j_password);
            return false;
        } else if (!regs.regPass.test(password)) {
            showErrorTip(j_login_info, '密码为6-20位字母数字组合', j_password);
            return false;
        }

        hideErrorTip(j_login_info);

        $.ajax({
            type: 'post',
            url: '/ajax/ajaxLogin',
            data: {
                user_name: user_name,
                password: password
            },
            dataType: 'json',
            success: function(data) {
                // console.log("登录信息===" + JSON.stringify(data));
                if (data.status == 0) {
                    //alert(data.info);
                    showErrorTip(j_login_info, data.info);
                } else {
                    location.href = $('#j_join_btn').attr('data-url');
                }
            },
            error: function() {
                alert('网络异常，请稍后重试');
            }
        });
    });

    //显示错误提示
    function showErrorTip(infoEle, error, inputEle) {
        $('.f-text-error').removeClass('f-text-error');
        if (inputEle != undefined) {
            inputEle.addClass('f-text-error');
        }
        infoEle.html(error).removeClass('hide');
    }

    function hideErrorTip(infoEle) {
        $('.f-text-error').removeClass('f-text-error');
        infoEle.addClass('hide').html('');
    }

    //提示框
    $('.d-modal').on('click', function(e) {
        var target = $(e.target);
        if (target.closest(".tip").length == 0 || target.hasClass('close')) {
            $(this).addClass("hide");
            $(this).find('.tip').addClass('hide');
        }
    });
     //低版本浏览器有提示
    (function($){
        if ($.browser.msie  && parseInt($.browser.version, 10) < 10) {
            alert("您当前的浏览器版本过低，为保障信息完整展示，建议立即升级浏览器!");
        } 
    })(jQuery);
});