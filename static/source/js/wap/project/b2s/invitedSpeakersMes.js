define("invitedSpeakersMes",["utility",""],function(require, exports, module) {
    var utility = require("utility"),
        regs = $.formVerify.utility.regs,
        promptDialog = utility.promptDialog;
    var button = $(".choose_box").find("button");
        button.on("click",function(){
            var arrP = $(this).siblings(),
                arrP1 = arrP.eq(0).attr("hasid"),
                arrP2 = arrP.eq(1).attr("hasid"),
                arrP3 = arrP.eq(2).attr("hasid"),
                locationHref = $(this).attr("urlHref");
            if(!arrP1){
                //alert("1")
                promptDialog({
                         content:"请选择学校！"
                });
                return;
            }
            if(!arrP2){
                //alert("2")
                promptDialog({
                         content:"请选择年级！"
                });
                return;
            }
            if(!arrP3){
                //alert("3")
                promptDialog({
                         content:"请选择教材！"
                });
                return;
            }
            window.location.href=locationHref;
        });

    
});
