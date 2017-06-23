define("stu_teaLogin",["utility"],function(require,exports,module){
	 var utility = require("utility"),
        regs = $.formVerify.utility.regs;
     ;(function(){
		var sBox = $(".s-box");
		$(".st_text").on("click","span",function(){
			var self = $(this),
				index = self.index();

			self.addClass("on_text").siblings().removeClass("on_text");
			sBox.eq(index).show().siblings(".s-box").hide().find("[rel]").val("").parent().siblings(".error-tips").hide();
		});

	})();

	//登录
		;(function(){
		var forms = $("form[rel]");

	    forms.each(function(i,v){
				$(v).formVerify({
			         rules:{
		            phone:{
		                required:[true,"请输入手机号"],
		                reg:[regs.phone,"请输入正确的手机号"]
		            },
		            stu:{
		                required:[true,"请输入手机号"],
		                reg:[regs.stu,"请输入正确的手机号"]
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
	    });
	})();
}); 