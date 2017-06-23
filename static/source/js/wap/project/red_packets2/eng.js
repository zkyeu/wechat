/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/;
	$("#reg1").click(function(){
		var tel = $("#reg1_tel").val();
		var passwd = $("#reg1_passwd").val();
		if (tel == "") {
			alert("请填写手机号码");
			return false;
		}
		if (!reTel.test(tel)) {
			alert("请填写正确格式手机号码");
			return false;
		}
		if (passwd == "") {
			alert("请填写密码");
			return false;
		}
		document.getElementById("reg1_form").submit();
	});
	$(".topImg_red").click(function(){
		$(".mask").eq(0).removeClass("hide");
		
	});
	

	$("#reg2").click(function(){
		var tel = $("#reg2_tel").val();
		var passwd = $("#reg2_passwd").val();
		if (tel == "") {
			alert("请填写手机号码");
			return false;
		}
		if (!reTel.test(tel)) {
			alert("请填写正确格式手机号码");
			return false;
		}
		if (passwd == "") {
			alert("请填写密码");
			return false;
		}
		$.ajax({ 
	        type:"POST", 
	        dataType:"json", 
	        url:"/Ajax/wapRedEnvelope",
	        data:{
	        	mobile:tel,
	        	password:passwd
	        }, 
	        success: function(data) {
	            if(data.status){
	            	$(".mask").eq(0).addClass("hide");
	                $(".mask").eq(1).removeClass("hide");
	                var timer=0;
					var n = 0;
					var now = $(".mask_success span").html();
					timer = setInterval(function(){
						n++;
						$(".mask_success span").html(now-n);
						if(n==3) {
							clearInterval(timer);
							location.href=$(".active").attr("href");
							return;
						};
					},1000);
	            }else{
	                alert(data.info);
	            }
	        }
	    });
		
	});
})