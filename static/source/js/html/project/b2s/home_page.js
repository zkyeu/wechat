define("home_page",["utility"],function(require,exports,module){
     var utility = require("utility"),
        regs = $.formVerify.utility.regs;
	//鼠标滑过
	;(function(){
		var $adv_box = $(".adv_box");
		$adv_box.hover(function(){
			var oMask=$(this).find(".discribe");
			oMask.show().stop().animate({"top":0},"fast");
		},function(){
			var oMask=$(this).find(".discribe");
			oMask.show().stop().animate({"top":188},"fast");
		});
	})();

	$(function(){  
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失  
        $(function () {  
            $(window).scroll(function(){  
                if ($(window).scrollTop()>100){  
                    $("#back-to-top").show();  
                }  
                else  
                {  
                    $("#back-to-top").hide();  
                }  
            });  
  
            //当点击跳转链接后，回到页面顶部位置  
  
            $("#back-to-top").click(function(){  
                $('body,html').animate({scrollTop:0},300);  
                return false;  
            });  
        });  
    });  

    //登录
        ;(function(){
        var forms = $("form[rel]");

        forms.each(function(i,v){
                $(v).formVerify({
                     rules:{
                    phone:{
                        required:[true,"请输入手机号"],
                        reg:[regs.stu,"请输入正确的手机号"]
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

    //登录切换
    ;(function(){
        var sBox = $(".s-box");
        $(".st_text").on("click","span",function(){
            var self = $(this),
                index = self.index();

            self.addClass("on_text").siblings().removeClass("on_text");
            sBox.eq(index).show().siblings(".s-box").hide().find("[rel]").val("").parent().siblings(".error-tips").hide();
        });

    })();

    //二维码显示
    // $(".show-img").mouseenter(function(){
    //     $(".hd-img").show();
    // });
    // $(".show-img").mouseleave(function(){
    //     $(".hd-img").hide();
    // });
});