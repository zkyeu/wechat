 
define(function(require,exports,module){

	$("#button").tap(function(){
		var reTel = /^1[0-9]{10}$/;
	  	var tel = $("#mobile").val();
		var mobileCode=$("#mobile_code").val();
		var mobileCodeReg=/^[0-9]{5}$/;
		if (tel == "") {
			alert("请填写手机号码");
			return false;
		}
		if (!reTel.test(tel)) {
			alert("请填写正确格式手机号码");
			return false;
		}
		if(mobileCode==""){
				alert("验证码不能为空");
				return false;
   		};
 		if(!mobileCodeReg.test(mobileCode)){
			alert("验证码错误");
			return false;
 		};
		$.ajax({
			type:"POST",
            dataType:"json",
            url: "/ajax/mobileCodeLogin",
            data: {
            	"mobile":$("#mobile").val(),
            	"mobile_code":$("#mobile_code").val(),
            	"act":$("#act").val()
            },
            success: function(res){
                if(res.status==1){
        			window.location.href=res.data;
                }else if(res.status==0){
                    alert(res.info);
                }

            }
		})
	});

	//获取验证码
	$(".code span").tap(function(){
			if (this.bAjax) {
				return;
			}
	 		var _this=this;
	 		var reTel = /^1[0-9]{10}$/;
	  	var mobile=$("#mobile").val();
	  	if(!reTel.test(mobile)){
	  			alert("请填写正确的手机号码！");
	  			return false;
	  	}else{
	  		this.bAjax=true;
	  		$(".code span").html("请稍等...");
	  		$(".code span").css({
				background_color:"#999"
			});
        $.ajax({
            type:"POST",
            dataType:"json",
            url: "/ajax/sendSmsNotCheckMobileExist",
            data: {"mobile":mobile},
            success: function(res){
                if(res.status==1){
        			$(".code span").css({
        				background_color:"#999"
        			})
                    timer(_this,120);
                }else{
                    _this.innerHTML="重新获取";
        				$(".code span").css({
        					background_color:"#ff6600"
        				})
                    _this.bAjax=false;
                    alert(res.info);
                }

            }
        }); 
    };
 });
	  //倒计时
    function timer(obj,count){
        obj.innerHTML="请稍等...";
        obj.timer=setInterval(function(){
            count--;
            if(count==0){
                obj.innerHTML= "重新获取";
                obj.bAjax=false;
                clearInterval(obj.timer);
            }else{
                var str=count+"秒";
                obj.innerHTML=str;
            }
        },1000);
    } 
		



	// 屏幕宽高
	
	var wHeight = $(window).height(),wWidth = $(window).width();

	if(wWidth<602){
		$(".section").css("width",wWidth);
		$(".section").css("height",wHeight);
	}else{
		$(".section").css("width","601");
		$(".section").css("height",wHeight);
	}
	// 点击晒出我的账单出引导图
	$(".summary .re-button img").tap(function(){
		// 1是在微信里 0不在
		if($("#isWeixin").val()==1){
			$(".share").show();
		}else if($("#isWeixin").val()==0){
			$(".share-bottom").show();
		}
	});
	$(".share").tap(function(){
		$(".share").hide();
	});
	$(".share-bottom").tap(function(){
		$(".share-bottom").hide();
	});
	$(".share-list").tap(function(){
		return false;
	})


	fullpage.initialize('#fullpage', {
		anchors: ['1', '2', '3', '4', '5','6'],
		menu: '#menu',
		css3:true
	});


	$('body').bind("touchmove",function(){
		if($("body").attr("class")==" fp-viewing-4"){
			$(".badge-bg1").addClass("badge-bg-r");
		}
	})
	
});
