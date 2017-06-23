define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    // 表单验证
    ;(function(){
        $("[rel=login]").formVerify({
            rules:{
                phone:{
                    required:[true,"请输入手机号"],
                    reg:[regs.phone,"请输入正确的手机号"]
                },
                password:{
                    required:[true,"请输入密码"],
                    reg:[regs.password,"请输入正确的密码"]
                }
            }
        });
    })();
});