define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;
    
    // 表单验证
    ;(function(){
        $("[rel=reg2]").formVerify({
            rules:{
                cnname:{
                    required:[true,"请输入中文名"],
                    reg:[regs.cnname,"请输入正确的中文名"]
                },
                enname:{
                    required:[true,"请输入英文名"],
                    reg:[regs.enname,"请输入正确的英文名"]
                }
            }
        }).on("click",".mo-radio [data-sex]",function(){
            // 男女选择
            var self = $(this);
            if(self.hasClass("isChecked")) return;
            self.addClass("isChecked").siblings("[data-sex]").removeClass("isChecked")
            .closest("dd").find("[rel=sex]")
            .val(self.attr("data-sex"));
        });
    })();

    
});