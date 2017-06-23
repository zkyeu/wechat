define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    // 表单验证
    ;(function(){
        $("[rel=login]").formVerify({
            rules:{
                userName:{
                    required:[true,"请输入用户名"],
                    reg:["(^1\\d{10}$)|(^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$)","请输入正确的用户名"]
                    // reg:["(^1[0-9]{10}$)","请输入正确的用户名"]
                    // |^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$|ix
                },
                password:{
                    required:[true,"请输入密码"],
                    reg:[regs.password,"请输入正确的密码"]
                }
            }
        });
    })();
});