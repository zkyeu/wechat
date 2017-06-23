define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    // 表单验证
    ;(function(){
        $("[rel=teachangepsw]").formVerify({
            rules:{
                oldpassword:{
                    required:[true,"请输入原密码"],
                    reg:[regs.password,"请输入正确的原密码"]
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

    

});