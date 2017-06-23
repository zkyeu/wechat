define("tea_reg_success3",["utility"],function(require,exports,module){
	 var utility = require("utility"),
        regs = $.formVerify.utility.regs;

        ;(function(){
	        $("[rel=reg]").formVerify({
	            rules:{
	                cnname:{
	                    required:[true,"请输入中文名"],
	                    reg:[regs.cnname,"请输入正确的中文名"]
	                },
	                enname:{
	                    required:[false,""],
	                    reg:[regs.enname,"请输入正确的英文名"]
	                },
	                class_code:{
	                	required:[true,"请输入班级邀请码"]
	                }
	            },
	            errorHandler:function(flag,text){
			        	var type = flag ? "hide" : "show";
			        	$(this).closest("ul").find(".error-tips").addClass("err-tips").text(text)[type]();
			    }
	        });        
	    })();

		 $(".info-sex .check-icon").on("click",function(){
		        var sexVal = $(this).attr('data-id');
		        $(".check-icon").removeClass("check-on");
		        $(this).addClass("check-on");
		        $(".info-sex").find('.sex-radio').val(sexVal);
		        var isUl = $(this).parent().parent().hasClass("group-ul");
		        if(isUl){
		            $('#applyForm .group-ul').parent().next().hide();
		        }
		  })
});