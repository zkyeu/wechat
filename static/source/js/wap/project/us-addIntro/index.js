/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-04-27 15:43:30
 */
define("index",["swipe"],function(require,exports,module){
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
		var introNum = $(".introNum").val();
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
		if (!passwordRe.test(password.trim())) {
			alert("请输入您的密码");
			return;
		}
		if (!introNum.trim()) {
			document.getElementById("register").submit();
			return;
		}
		if (!teleRe.test(introNum.trim())) {
			alert("推荐人联系方式不正确");
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
	shareGuide.maskShow();
	$('.mask .share-guide__close').on('click', function() {
		shareGuide.hide();
	});
	/*console.log(wx.onMenuShareTimeline)
	wx.config({
		debug: true,
		appId: 'wx0716d01ab673d2d8',
		jsApiList: [
			'onMenuShareTimeline',
	        'onMenuShareAppMessage',
	        'onMenuShareQQ',
	        'onMenuShareWeibo',
	        'onMenuShareQZone',
		]
	})
	wx.onMenuShareTimeline({
		title: '测试标题',
		link: '测试连接',
		imgUrl: 'imgUrl',
		success: function() {
			alert(1);
		},
		cancel: function() {
			alert(2);
		}
	});*/

		var wx_tit="体验51Talk美国小学，赢迪士尼门票";
		var wx_des="推荐5-12岁小朋友体验51Talk美国小学课程，去迪士尼过圣诞夜!";
		var wx_img="http://static.51talk.com/static/images/wap/usIntro/p2.jpg";
		var wx_link='http://wap.51talk.com/Landing/smallBeauty';

	  $.ajax({
	  	url:"/Ajax/smallBeauty",
	  	type:"post",
	  	dataType: "json",
	  	success:function(res){
	  				  wx.config({
						    debug: false, 
						    appId: res.data.appId, 
						    timestamp:res.data.timestamp , 
						    nonceStr: res.data.nonceStr, 
						    signature: res.data.signature,
						    jsApiList: ['checkJsApi',
						                'onMenuShareTimeline',
						                'onMenuShareAppMessage',
						                'onMenuShareQQ',
						                'onMenuShareWeibo',
						                'hideMenuItems',
						                'showMenuItems',
						                'hideAllNonBaseMenuItem',
						                'showAllNonBaseMenuItem',
						                'openCard'] 
						    });

  				  	  wx.ready(function () {
                    wx.onMenuShareAppMessage({
                      title: wx_tit,
                      desc: wx_des,
                      link: wx_link,
                      imgUrl: wx_img
                    });
                   	wx.onMenuShareQQ({
                      title: wx_tit,
                      desc: wx_des,
                      link: wx_link,
                      imgUrl: wx_img
                    });
                    wx.onMenuShareTimeline({
                      title: wx_tit,
                      desc: wx_des,
                      link: wx_link,
                      imgUrl: wx_img
                   });
                });
	  	}
	  })

});
