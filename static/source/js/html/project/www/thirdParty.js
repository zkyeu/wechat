/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	require("formCheck");
	require("silder");

	//微博 微信 下拉
	$(".jsMore").hover(function(){
		$(this).find('.jsUl').show();
	},function(){
		$(this).find('.jsUl').hide();
	});
	//官网首页右侧 在线咨询+官方微信
	$(".m-ntkf,.m-wx").each(function() {
		var aLi=$(this).children();
		var oLi1=aLi.eq(0);
		var oLi2=aLi.eq(1);

		oLi1.mouseover(function() {
			aLi.toggle();
		});
		oLi2.mouseout(function() {
			aLi.toggle();
		});
	});
	//客服聊天点击统计
	$(".u-b-ntkf").on("click",function(){
		var type=$(this).attr("data-type");
		var url=$(this).attr("data-url");
		$.ajax({
            url: url,
            data: {"type":type},
            type: "POST"
        });
	});
	//手机二维码点击
	$('#open_download').click(function(){
		window.open('http://www.51talk.com/app/download_app.php');
	});

	//回到顶部
	(function(){
		$("body").append('<div id="u-gotop"><a href="javascript:;" title="回到顶部">回到顶部</a></div>');
	    $(window).on("load scroll",function(){
	        if($(window).scrollTop()>1500){
	            $("#u-gotop").fadeIn();
	        }else{
	            $("#u-gotop").fadeOut();
	        }
	    });
	    $("#u-gotop").on("click",function(){
	        $("body,html").animate({scrollTop: 0}, "fast");
	    });
	})();
	//在线咨询弹窗
	// (function(){
	// 	var timer=null;
	// 	var sAlertOnline='<div class="alert_online">'+
	// 				'<a href="javascript:;" class="u-close"></a>'+
	// 				'<a href="javascript:;" class="u-btn"></a>'+
	// 			'</div>';
	// 	var oAlertOnline=$(sAlertOnline);
	// 	oAlertOnline.find('.u-close').on("click",function(){
	// 		oAlertOnline.fadeOut();
	// 		localStorage.qqzx_close=1;
	// 	}).end().find('.u-btn').on("click",function(){
	// 		//打开qq企业客服
	// 		window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=4006320051&aty=0&a=0&curl=&ty=1', '_blank', 'height=544px, width=644px,toolbar=no,scrollbars=no,menubar=no,status=no');
	// 	});
	// 	if(localStorage.qqzx_close!=1){
	// 		timer=setTimeout(function(){
	// 			$("body").append(oAlertOnline.show());
	// 		},30000);
	// 		$(".video_play").on("click", function(){
	//         	clearTimeout(timer);
	//         });
	// 	}
	// })();
	
	//qq微信第三方登录优化
	$(".thirdParty form").formCheck({
		"focus"	:true,
		"alertType":"bottom",
		"json":{
			"user_name":{//手机号
				"reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
				"error":"用户名格式错误",
				"empty":"请输入用户名"
			},
			"username":{//手机号
				"reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
				"error":"用户名格式错误",
				"empty":"请输入用户名"
			}
		}
	}).on("submit",function(){
		//及时验证用户名+密码
		var oForm=$(".thirdParty form");
		if(oForm.attr("submited"))return true;
		var aInput=oForm.find('input[name="user_name"],input[name="password"]');
		$.ajax({
			url: '/user/ajax_login.php',
			type: 'POST',
			dataType: 'json',
			data: aInput.serializeArray(),
			success:function(res){
				if(res.status==1){
					//收起错误信息
					oForm.find('li.u-error').removeClass('u-error');
					oForm.find('.jsSubmit').val("登录...");
					oForm.attr("submited",true).submit();
				}else{
					aInput.eq(res.type).closest('li').addClass('u-error').find('.u-err').html(res.msg);
				}
			}
		});
		return false;
	});

	$(".qq_inner_l form").formCheck({
		"focus"	:true,
		"alertType":"bottom"
	});

	$(".qq_inner_r form").formCheck({
		"focus"	:true,
		"alertType":"bottom",
		"json":{
			"user_name":{//手机号
				"reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
				"error":"用户名格式错误",
				"empty":"请输入用户名"
			},
			"username":{//手机号
				"reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
				"error":"用户名格式错误",
				"empty":"请输入用户名"
			}
		}
	}).on("submit",function(){
		//及时验证用户名+密码
		var oForm=$(".qq_inner_r form");
		if(oForm.attr("submited"))return true;
		var aInput=oForm.find('input[name="user_name"],input[name="password"]');
		$.ajax({
			url: '/user/ajax_login.php',
			type: 'POST',
			dataType: 'json',
			data: aInput.serializeArray(),
			success:function(res){
				if(res.status==1){
					//收起错误信息
					oForm.find('li.u-error').removeClass('u-error');
					oForm.find('.jsSubmit').val("登录...");
					oForm.attr("submited",true).submit();
				}else{
					aInput.eq(res.type).closest('li').addClass('u-error').find('.u-err').html(res.msg);
				}
			}
		});
		return false;
	});
	//兼容placeholder
	(function(){
		if("placeholder" in document.createElement("input")) return;
		var defaultColor="#ccc";
		$(":input:visible").each(function(){
			var oInput=$(this);
			var placeholder=oInput.attr("placeholder");
			if(!placeholder) return true;
			if(this.type.toLowerCase()=="textarea"){
				var oSpan=$('<textarea>');
			}else{
				var oSpan=$('<input>');
			}
			oSpan.addClass(oInput.attr("class")).val(placeholder).css("color",defaultColor);
			oInput.after(oSpan);
			oSpan.focus(function(){
				oSpan.hide();
				oInput.show().focus();
			});
			oInput.blur(function(){
				if(this.value==""){
					oInput.hide();
					oSpan.show();
				}
			});
			if(this.value==""){
				oSpan.show();
				oInput.hide();
			}else{
				oSpan.hide();
			}
		});
	})();

});
