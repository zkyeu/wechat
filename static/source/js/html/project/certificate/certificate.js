define(function(require,exports,module){
	$('.tab a').on('click',function(){
		var _self = $(this),
			index = _self.index();
		if(index == 2){
			index = 1;
		}
		_self.addClass('current').siblings().removeClass('current');
		$('.switch').eq(index).show().siblings('.switch').hide();
	})
	function pay(elem){
		$(this).addClass('current').siblings().removeClass('current')
		elem.removeClass('current');
	}
	$('.platform .lst li').on('click',function(){
		pay.call(this,$('.bank-payment .lst li'));
	})
	$('.bank-payment .lst li').on('click',function(){
		pay.call(this,$('.platform .lst li'));
	})
	//显示隐藏确认付款层
	var oRuler=$(".banks-list").eq(0);
    $(window).on("load scroll",function(){
        if(oRuler.length==0) return;
        var oFooter=$(".g-ft");
        if(oRuler.offset().top-$(window).scrollTop()<$(window).height()-200){
            $(".payment-bg").show();
        }else{
            $(".payment-bg").hide();
        }
        if(oFooter.offset().top-$(window).scrollTop()<$(window).height()){
            if($.browser.version==6.0){
                $(".payment-bg").css("top",oFooter.offset().top-86);
            }else{
                $(".payment-bg").css("bottom",$(window).height()-oFooter.offset().top+$(window).scrollTop());
            }
            
        }else{
            if($.browser.version==6.0){
                $(".payment-bg").css("top","");
            }else{
                $(".payment-bg").css("bottom",0);
            }
            
        }
        
    });
    var mask = $('.mask'),
    	editAddress = $('.mask .edit-address'),
    	payResult = $('.mask .pay-result');
	var clientHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
	//点击编辑弹窗
	$('.address').delegate('.edit', 'click', function() {
		mask.css({'height':clientHeight}).show();
		editAddress.show();
	})
	//关闭弹窗
	$('.edit-address .close, .edit-address .cancel,.pay-result .close').on('click',function(){
		mask.hide();
	});
	var validate = {
		isEmpty: function(value) {
			if(!value) {
				return false;
			}else{
				return true;
			}
		},
		isChinese: function(value) {
			var reg = /^[(a-zA-Z)|(\u4e00-\u9fa5)]{2,128}$/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		},
		isMobile: function(value) {
			var reg = /(^1[3|5|8][0-9]{9}$)/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		},
		isEmail: function(value) {
			var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		},
		isPassword: function(value) {
			//密码正则
			var reg = /[0-9|A-Z|a-z]{6,16}/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		}
	};
	$('.edit-address .submit').on('click',function(){
		var data = {},
			nameVal = $('#real_name').val(),
			addressVal = $('#user_addr').val(),
			telVal = $('#user_mobile').val();
		$('.from input').each(function(index,elem){
			var val = $(elem).val(),
				name = $(elem).attr('id');
			data[name] = val;
		});
		if(!validate.isEmpty(nameVal)){
			alert('收件人不能为空')
			return false;
		}
		else if(!validate.isChinese(nameVal)) {
			alert('收件人不能包含特殊字符!')
			return false;
		}
		else if(!validate.isEmpty(addressVal)){
			alert('地址不能为空')
			return false;
		}
		else if(!validate.isEmpty(telVal)){;
			alert('手机号码不能为空')
			return false;
		}
		if(!validate.isMobile(telVal)){
			alert('请输入正确的手机号码')
			return false;
		}
		$.ajax({
			url: '/Ajax/saveUserAddr',
			type: 'POST',
			dataType: 'json',
			cache: false,
			data: data,
			success: function(res) {
				if(res.status == 1) {
					mask.hide();
					$('.order .address').html(res.data + '<i class="edit"></i>');
					$('[name="real_name"]').val($('#real_name').val());
					$('[name="user_addr"]').val($('#user_addr').val());
					$('[name="mobile"]').val($('#user_mobile').val());
				}
			},
			error: function() {
				alert('请求发生错误');
			}
		})
	});
	//点击确认付款弹窗
	$('.payment-bg .pay-btn').on('click', function() {
		var paymentCurrent = $('.payment li').hasClass('current');
		var realName = $('[name="real_name"]').val(),
			userAddr = $('[name="user_addr"]').val(),
			mobile = $('[name="mobile"]').val();
		if(!realName || !userAddr || !mobile) {
			alert('请填写收件人信息');
			return false;
		}
		if(!paymentCurrent) {
			alert('请选择支付方式');
			return false;
		}
		mask.css({'height':clientHeight}).show();
		payResult.show();
	});
	//分享页面注册接口
	var regDate = {};
	$('.register .btn').on('click',function() {
		var emailVal = $('#email').val(),
			telVal = $('#tel').val(),
			passwordVal = $('#password').val();
		$('.register input').each(function(index, elem) {
			var val = $(elem).val(),
				name = $(elem).val();
			regDate[name] = val;
		});
		//判断邮箱
		if(!validate.isEmpty(emailVal)) {
			alert('请输入邮箱');
			return false;
		}else if(!validate.isEmail(emailVal)) {
			alert('请输入正确的邮箱格式');
			return false;
		}
		//判断手机
		if(!validate.isEmpty(telVal)) {
			alert('请输入手机号');
			return false;
		}else if(!validate.isMobile(telVal)) {
			alert('请输入正确的手机号码');
			return false;
		}
		//判断密码
		if(!validate.isEmpty(passwordVal)) {
			alert('请输入密码');
			return false;
		}else if(!validate.isPassword(passwordVal)){
			alert('请输入正确的密码格式');
			return false;
		};
		//请求接口 待定
		$('#formBottom').submit();
	});
	//薅羊毛左侧引导浮层定位显示
	if($(".certificate").length){
    var contentOffsetLeft = $('.certificate').offset().left,
        layerOffsetLeft = contentOffsetLeft - 146 - 28;
    $('.scan-code').css({'left': layerOffsetLeft});
    //薅羊毛引导浮层交互
    if($('.scan-code').length) {
    	$(window).on('scroll', function() {
        var scanCode = $('.scan-code').offset().top;
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop >= scanCode) {
            $('.scan-code').css({'position':'fixed', 'top': '10px', 'left': layerOffsetLeft});
        }
        if (scrollTop <= 140) {
            $('.scan-code').css({'position':'absolute', 'top': 'auto', 'left': layerOffsetLeft})
        }
      });
    }
  }
	// //分享给好友
	//   var ShareId = "";
	//   var shareContent = "@51talk 无忧英语-51Talk外教和服务挺不错，我向我的好友推荐了51Talk！你也来试试吧！";
	//   $(".share a").mouseover(function () {ShareId = $(this).parent().attr("data-id");});
	//   window._bd_share_config = {
	//       "common": {
	//           onBeforeClick:function(cmd, config){
	//             if (ShareId)
	//               config.bdUrl = "http://shiyousan.com/post/" + ShareId;    
	//             return config;
	//           },
	//           "bdSnsKey":{},
	//           "bdText":shareContent,
	//           "bdMini":"2",
	//           "bdMiniList":false,
	//           "bdPic":"",
	//           "bdStyle":"0",
	//           "bdSize":"24"
	//       },
	//       "share": {}
	//   };
	//   with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+ ~(-new Date() / 36e5)];
})