/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-04-27 15:43:30
 */
define(function(require,exports,module){
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
		var nickname = $(".nickname").val();
		var teleRe = /^1[0-9]{10}$/;
		var passwordRe = /^\w+$/;
/*		if(!nickname){
			alert("请输入孩子的昵称");
			return;
		}*/
		if (!tele.trim()) {
			alert("请输入您的手机号");
			return;
		}
		if (!teleRe.test(tele.trim())) {
			alert("手机号格式不正确");
			return;
		}
		if (!passwordRe.test(password.trim())) {
			alert("请输入您的密码");
			return;
		}
		document.getElementById("register").submit();
	})
});
