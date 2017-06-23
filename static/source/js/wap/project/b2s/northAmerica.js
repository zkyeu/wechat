/**
 *
 * @authors limengyao (limengyao@51talk.com)
 * @date    2017-03-14 15:43:30
 */
define(function(require,exports,module){
    require("swipe");
	//发送验证码
	var utility = require("utility");

	/***倒计时***/
    ;(function(){
        var forgetpsw = $.formVerify.formlist.forgetpsw;
        utility.deftime({
            url:$("[send-url]").attr("send-url"),
            tar:".send-verify>input[type=button]",
            text:"点击获取验证码",
            success:function(r){
                if(r.status == 1){
                	alert("短信发送成功，请查收！");
                    return true;
                }else{
                	alert(r.info);
                }
            },
            error:function(){
            	alert("短信发送失败，请重试！");
                
            },
            sendBefore:function(){
                var teleRe = /^1[0-9]{10}$/;
                var tele = $(".telephone").val();
                var passwordRe = /^\w+$/;
                var password = $(".password").val();
		        if (!tele.trim()) {
					alert("请输入您的手机号");
					return;
				}
				if (!teleRe.test(tele.trim())) {
					alert("手机号格式不正确");
					return;
				}
                return {
                    mobile : tele,
                    sms_type : $("[send-type]").attr("send-type")
                }
            }
        });
    })();
/***倒计时结束***/

	$(window).scroll(function(){
		var _top = $(this).scrollTop();
		if(_top>600){
			$(".fixbar").show();
		}else{
			$(".fixbar").hide();
		}
	})
	// 引用轮播
    window.mySwipe = new Swipe(document.getElementById('slider'), {
		speed: 1000,
		auto: 2500,
		continuous: true,
		stopPropagation: true,
		callback: function(index, elem) {
			$(".features .indexes>li").eq(index).addClass("active").siblings().removeClass('active');
		}
	});
    window.mySwipe = new Swipe(document.getElementById('stars'), {
		speed: 1000,
		auto: 2500,
		continuous: true,
		stopPropagation: true,
		callback: function(index, elem) {
			$(".stars .indexes>li").eq(index%2).addClass("active").siblings().removeClass('active');
		}
	});
	// 验证
	$(".regbutton").on("click",function(){
		var tele = $(".telephone").val();
		var password = $(".password").val();
		var number = $(".number").val();
		var teleRe = /^1[0-9]{10}$/;
		var passwordRe = /^\w+$/;
		if (!tele.trim()) {
			alert("请输入您的手机号");
			return;
		}
		if (!teleRe.test(tele.trim())) {
			alert("手机号格式不正确");
			return;
		}
		if (!number.trim()) {
			alert("请输入验证码");
			return;
		}
        if (!passwordRe.test(password.trim())) {
            alert("请输入您的密码");
            return;
        }
		document.getElementById("register").submit();
	});
	//分享弹层操作
	var shareGuide =  {
		maskShow: function() {
			var clientHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			$('.mask').css({'height': clientHeight}).show();
		},
		hide: function() {
			$('.mask').hide();
		}
	};
	
});
