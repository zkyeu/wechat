define(function(require,exports,module){
    ;(function(){
        var utility = require("utility"),
            regs = $.formVerify.utility.regs;
        $("[rel=heck_login]").formVerify({
            rules:{
                enname:{
                    required:[true,"请输入用户名"],
                    reg:[regs.enname,"请输入正确的用户名"]
                },
                password:{
                    required:[true,"请输入密码"],
                    reg:[regs.password,"密码错误"]
                }
            },
            errorHandler:function(flag,text){
                // for wap b2s reg
                var tip = this.next(".error-tips");
                flag ? tip.html("").hide() : tip.html(text).fadeIn();
            }
        })
    })();
});