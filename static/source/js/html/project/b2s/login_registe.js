define("login_registe",["utility"],function(require,exports,module){
	 var utility = require("utility"),
        regs = $.formVerify.utility.regs;


	;(function(){

	    $("[rel=from]").formVerify({
	        rules:{
	            stu:{
	                required:[true,"请输入手机号或账号"],
	                reg:[regs.stu,"请输入正确的手机号或账号"]
	            },
	            password:{
	                required:[true,"请输入密码"],
	                reg:[regs.password,"请输入正确的密码"]
	            }
	        },
	        errorHandler:function(flag,text){
	        	var type = flag ? "hide" : "fadeIn";
	        	$(this).closest("ul").find("em").text(text).parent(".error-tips")[type]();
	        }
	    }).on({
	    	focus:function(){
	    		$(this).closest("ul").addClass("active").find(".error-tips").hide();
	    	},
	    	blur:function(){
	    		$(this).closest("ul").removeClass("active");
	    	}
	    },"[rel]").on("click",".clear_text",function(){
	    	$(this).siblings(".li_input").find("input").val("");
	    });

	})();

	;(function(){
		$(".return_reg").click(function(){
			$(".login_bg").hide();
			$(".reginste_bg").show();
		});
		$(".return_login").click(function(){
			$(".login_bg").show();
			$(".reginste_bg").hide();
		});
	})();
});