define("stu_compile",["utility"],function(require,exports,module){
	 var utility = require("utility"),
        regs = $.formVerify.utility.regs;
      // 表单验证
    ;(function(){
        $("[rel=reg]").formVerify({
            rules:{
                phone:{
                    required:[true,"请输入手机号"],
                    reg:[regs.phone,"请输入正确的手机号"]
                },
                verifycode:{
                    required:[true,"请输入手机验证码"],
                    reg:[regs.verifycode,"请输入正确的手机验证码"]
                }
            },
            errorHandler:function(flag,text){
		        	var type = flag ? "hide" : "show";
		        	$(this).closest("ul").find(".error-tips").addClass("err-tips").text(text)[type]();
		    }
        });        
    })();

    // 倒计时
    ;(function(){
        var reg = $.formVerify.formlist.reg;
        utility.deftime({
            url:$("[send-url]").attr("send-url"),
            tar:".dao_time",
            success:function(r){
                if(r.status == 1){
                    reg.verifycode.setState(false,"短信发送成功，请查收！");
                    return true;
                }else{
                    reg.verifycode.setState(false,r.info);
                }
            },
            error:function(){
                reg.verifycode.setState(false,"短信发送失败，请重试！");
            },
            sendBefore:function(){
                var phone = reg.phone,
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