define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    // 表单验证
    ;(function(){
        $("[rel=reg1]").formVerify({
            rules:{
                phone:{
                    required:[true,"请输入手机号"],
                    reg:[regs.phone,"请输入正确的手机号"]
                },
                verifycode:{
                    required:[true,"请输入手机验证码"],
                    reg:[regs.verifycode,"请输入正确的手机验证码"]
                },
                password:{
                    required:[true,"请输入密码"],
                    reg:[regs.password,"请输入正确的密码"]
                },
                invitecode:{
                    required:[true,"请输入班级邀请码"]
                }
            }
        });        
    })();

    // 倒计时
    ;(function(){
        var reg1 = $.formVerify.formlist.reg1;
        utility.deftime({
            url:$("[send-url]").attr("send-url"),
            tar:".send-verify>input[type=button]",
            success:function(r){
                if(r.status == 1){
                    reg1.verifycode.setState(false,"短信发送成功，请查收！");
                    return true;
                }else{
                    reg1.verifycode.setState(false,r.info);
                }
            },
            error:function(){
                reg1.verifycode.setState(false,"短信发送失败，请重试！");
            },
            sendBefore:function(){
                var phone = reg1.phone,
                    checkFlag = phone.trigger("blur").checkFlag;
                if(!checkFlag) return;
                return {
                    mobile : phone.val(),
                    sms_type : $("[send-type]").attr("send-type")
                }
            }
        });
    })();

});