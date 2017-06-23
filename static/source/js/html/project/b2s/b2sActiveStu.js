define("b2sActiveStu",["utility"],function(require,exports,module){
    var
    utility = require("utility"),
    regs = $.formVerify.utility.regs;

	//校验
	;(function(){
		var forms = $("form[rel]");

	    ;(function(){
	        var forms = $("form[rel]");
            forms.formVerify({
                rules:{
		            cnname:{
		                required:[true,"请输入学生姓名"],
		                reg:[regs.cnname,"请输入正确的学生姓名"]
		            },
		            activeorphone:{
		                required:[true,"请输入邀请码"],
		                reg:[regs.activeorphone,"请输入正确的邀请码"]
		            }
                },
                errorHandler:function(flag,text){
                    var $self = $(this),
                        $err = $self.siblings(".b2s-form-error");
                    !flag && $err.text(text);
                    $err.closest("dl")[(flag ? "remove" : "add") + "Class"]("b2s-form-iserror");

                    return;
                    var type = flag ? "hide" : "fadeIn";
                    $(this).closest("ul").find("em").text(text).parent(".error-tips")[type]();
                }
            }).on("focus","input[rel]",function(){
                $(this).closest("dl").removeClass("b2s-form-iserror");
            }).on("click",".b2s-form-error",function(){
                $(this).siblings("input").trigger("focus");
            });
	        
	    })();


	})();

	// placeholder修复
    utility.placeHolderFix.init(58);
});