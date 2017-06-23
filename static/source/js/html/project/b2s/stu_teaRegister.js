define("stu_teaRegister",["utility"],function(require,exports,module){
	 var utility = require("utility"),
        regs = $.formVerify.utility.regs;

//注册
	;(function(){
		var forms = $("form[rel]");

	    forms.each(function(i,v){
			$(v).formVerify({
		        rules:{
		            phone:{
		                required:[true,"请输入手机号"],
		                reg:[regs.phone,"请输入正确的手机号"]
		            },
		            verifycode:{
		                required:[true,"请输入验证码"],
		                reg:[regs.verifycode,"请输入正确的验证码"]
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



    ;(function(){
    	var forms = $.formVerify.formlist,
    		deftime = function(form,formobj){
		        utility.deftime({
		            url:form.find("[send-url]").attr("send-url"),
		            tar:form.find(".js-time"),
		            success:function(r){
		                if(r.status == 1){
		                    formobj.verifycode.setState(false,"短信发送成功，请查收！");
		                    return true;
		                }else{
		                    formobj.verifycode.setState(false,r.info);
		                }
		            },
		            error:function(){
		                formobj.verifycode.setState(false,"短信发送失败，请重试！");
		            },
		            sendBefore:function(){
		                var phone = formobj.phone,
		                    checkFlag = phone.trigger("blur").checkFlag;
		                if(!checkFlag) return;
		                return {
		                    mobile : phone.val(),
		                    sms_type : form.find("[send-type]").attr("send-type")
		                }
		            }
		        });
    		}

    	for(var x in forms){
    		var form = forms[x];
    		deftime($("[rel="+x+"]"),form);
    	}


    })();



	// ;(function(){
	// 	var sBox = $(".s-box");
	// 	$(".st_text").on("click","span",function(){
	// 		var self = $(this),
	// 			index = self.index();

	// 		self.addClass("on_text").siblings().removeClass("on_text");
	// 		sBox.eq(index).show().siblings(".s-box").hide().find("[rel]").val("").parent().siblings(".error-tips").hide();
	// 	});

	// })();

	
	
});