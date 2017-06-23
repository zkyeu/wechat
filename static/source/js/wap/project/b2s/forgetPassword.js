define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    // 表单验证
    ;(function(){
        $("[rel=forgetpsw]").formVerify({
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
                    required:[true,"请输入新密码"],
                    reg:[regs.password,"请输入正确的密码"]
                },
                eqpassword:{
                    required:[true,"请再次输入新密码"],
                    reg:[regs.password,"请再次输入正确的新密码"],
                    equalto:["[rel=password]","两次输入新密码不一致"]
                }
            }
        });        
    })();

    // 倒计时
    ;(function(){
        var forgetpsw = $.formVerify.formlist.forgetpsw;
        utility.deftime({
            url:$("[send-url]").attr("send-url"),
            tar:".send-verify>input[type=button]",
            success:function(r){
                if(r.status == 1){
                    forgetpsw.verifycode.setState(false,"短信发送成功，请查收！");
                    return true;
                }else{
                    forgetpsw.verifycode.setState(false,r.info);
                }
            },
            error:function(){
                forgetpsw.verifycode.setState(false,"短信发送失败，请重试！");
            },
            sendBefore:function(){
                var phone = forgetpsw.phone,
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