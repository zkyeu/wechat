define(function(require,exports){ 
 //confirm弹层
    $.extend({
        confirm: function(option) {
            var msg = option.msg,
                type = option.type || 'alert',
                sSure = option.sureText || "确定",
                sCancel = option.cancelText || "取消",
                isReverse = option.isReverse || false,
                fnCancel = option.fnCancel || function(){},
                fnSure = option.fnSure || function(){},
                addClass = option.addClass || "";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd p:first").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert '+addClass+'" id="m-confirm" style="display:block;">' +
                        '<div class="in">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭"></a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        '<p class="f-tac">'+msg+'</p>' +
                        '</div>' +
                        '<div class="ft f-tac">' +
                        '<span class="u-btn jsCancel">' + sCancel + '</span>' +
                        '<i>&nbsp;&nbsp;</i>' +
                        '<span class="u-btn jsSure">' + sSure + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                $("body").append(sConfirm);
            }

            if(type == 'alert'){
                
                $("#m-confirm").find(".ft i").hide();
                $("#m-confirm").find(".jsCancel").hide();
            }else{
                
                var oI=$("#m-confirm").find(".ft i");
                $("#m-confirm").find(".jsCancel").show();
                oI.show();

                if(!isReverse){
                    oI.after($("#m-confirm").find(".jsSure"));
                    oI.before($("#m-confirm").find(".jsCancel"));
                }else{
                    oI.after($("#m-confirm").find(".jsCancel"));
                    oI.before($("#m-confirm").find(".jsSure"));
                }
            }
            
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel.call(this);
            });
            $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnSure && fnSure();
            });
        },
        jsInputOk: function (){
            $('body').on('focus','.jsInputOk',function(){
                $(this).next().next().hide();
            }).on('blur','.jsInputOk',function(){
                var val = $.trim($(this).val());
                if(val == ''){
                    $(this).next().next().show();
                }
                if($(this).hasClass("tel")){
                    if(!reRule.tel.re.test(val)){
                        $(this).next().next().show();
                    }
                }
                if($(this).hasClass("email")){
                    if(!reRule.email.re.test(val)){
                        $(this).next().next().show();
                    }
                }
                if($(this).hasClass("telemail")){
                    if(!reRule.telemail.re.test(val)){
                        $(this).next().next().show();
                    }
                }
            })
        },
        createInput: function(obj) {
            var str = '<div class="info-content"><div class="label"><span>' 
                + obj.label 
                + '</span></div><div class="info-txt"><input class="txt jsBlank" type="text" name="'
                + obj.name
                + '" placeholder="'
                + obj.holder
                + '"/><p class="err-tips"><i class="err-icon"></i><span>'
                + obj.tip
                + '</span></p></div></div>';
            return str;
        },
        createOption: function (obj){
            var str = '';
            for (key in obj)
                str += '<option value="' + obj[key] + '">' + key + '</option>'
            return str;
        },
        createSelect: function(obj){
            var str = '<div class="info-content"><div class="label"><span>' 
                + obj.label 
                + '</span></div><div class="info-txt"><select name="'
                + obj.name
                + '" class="txt jsChange" >';

            str += $.createOption(obj.select);
            str += '</select><p class="err-tips"><i class="err-icon"></i><span>'
                +  obj.holder
                +  '</span></p></div></div>';
            return str;
        },
        createR: function(obj){
            var str = '';
            for(var prop in obj){
                str += '<strong><span class="tenIcon check-icon" data-id="'
                    + obj[prop]
                    + '"></span><span>'
                    + prop
                    + '</span></strong>';
            }
            return str;
        },
        createRadio: function(obj){
            var str = '<div class="info-content"><div class="label"><span>'
                + obj.label
                + '</span></div><div class="info-txt"><div class="sexSel">';

            str += $.createR(obj.radio);
            str += '</div><input type="hidden" name="'
                + obj.name
                + '"><p class="err-tips"><i class="err-icon"></i><span>'
                + obj.tip
                + '</span></p></div></div>';
            return str;
        }
    });

    function getSms(rs){
        if(rs.status == 1){
            var str = '秒重新获取';
            var num = 59;
            var $code = $('.sendCode');
            $code.text('59'+str);
            var timer = setInterval(function(){
                num--;
                if(num<1){
                    clearInterval(timer);
                    $code.text('获取验证码');
                }else{
                    $code.text(num+str);
                }
            },1000);
        }else{
            $.confirm({msg: rs.info});
        }
    }
//发送验证码
 $('.sendCode').click(function(){
        if($(this).text() == '获取验证码'){
            var reg = /^1[0-9]{10}$/;
            var mobile = $.trim($('.tel').val());
            var isApply = ($(this).closest("#applyForm").length>0)? true : false;
            var isTeacher = ($(this).closest("#regist_teacher_Form").length>0)? true : false;
            var isFindPassword = ($(this).closest("#find_password_Form").length>0)? true : false;
            var ismModifyPassword = ($(this).closest("#modify_password_Form").length>0)? true : false;
            var $sms_type = $("[name=sms_type]").val();
            var sms_type = 1;
            if(isApply){
                sms_type = 2;
            }
            if(isTeacher){
                sms_type = 3;
            }
            if(isFindPassword){
                 sms_type = 5;
                var error = $('.find-error');
            }
            if(ismModifyPassword){
                 mobile = $.trim($('.modify-mobile-text').text());
                 sms_type = 5;
            }
            if(mobile == '' || !reg.test(mobile)){
                switch(sms_type){
                    case 1:
                    case 3:
                        $('.tel').next().next().show();
                        break;
                    case 2:
                        $('#applyForm .tel').parent().next().next().show();
                        break;
                    case 5:
                        error.show();
                }

            }else{
                sms_type = !!$sms_type ? $sms_type : sms_type;
                $.ajax({
                    url: '/ajax/sendMobileCode',
                    data: {mobile:mobile,sms_type: sms_type},
                    dataType: 'json',
                    type: 'post',
                    success: function(rs){
                        getSms(rs);
                    },
                    error: function(){
                        $.confirm({msg: '获取验证码失败'})
                    }
                })
            }
        }
    })

//表单验证
 $('#new_student_Form .to_class').click(function(){
        var $form = $('#new_student_Form');
        var stu_tel = $.trim($form.find('.stu_tel').val());
        var stu_code = $.trim($form.find('.stu_code').val());
        var stu_pass = $.trim($form.find('.stu_pass').val());
        var isFail = false;
        if(stu_tel == ''){
            $form.find('.stu_tel').siblings('.info-tip').show();
            isFail = true;
        }
        if(stu_code == ''){
            $form.find('.stu_code').siblings('.info-tip').show();
            isFail = true;
        }
        if(stu_pass == ''){
            $form.find('.stu_pass').siblings('.info-tip').show();
            isFail = true;
        }
        if(isFail){
            return false;
        }else{
            $form.submit();
        }
    });
 
});