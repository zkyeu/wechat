/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var dialog = require('minidialog');
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
	var validRule = {
		isNoEmpty: function(value) {
			if(!value) {
				return false;
			} else {
				return true;
			}
		},
		passwordVal: function(value) {
			var reg = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
			if(!reg.test(value)) {
				return false;
			} else {
				return true;
			}
		},
		isMobile: function(value) {
			var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
			if(!reg.test(value)) {
				return false;
			} else {
				return true;
			}
		}
	};
	//验证信息
	$('.advantage-guide__btn').on('click', function() {
		var tel = $('#tel').val(),
			password = $('#password').val();
		if(!validRule.isNoEmpty(tel)) {
			new dialog({
				html: '请输入手机号码',
				modal: true,
				autoHide: 1500
			});
			return false;
		};
		if(!validRule.isMobile(tel)) {
			new dialog({
				html: '请输入正确手机号码',
				modal: true,
				autoHide: 1500
			});
			return false;
		};
		if(!validRule.isNoEmpty(password)) {
			new dialog({
				html: '请输入密码',
				modal: true,
				autoHide: 1500
			});
			return false;
		}
		if(!validRule.passwordVal(password)) {
			new dialog({
				html: '请输入至少6位密码',
				modal: true,
				autoHide: 1500
			});
			return false;
		};
		$('#register').submit();
	});
	$('.fixedbar').on('click', function() {
		var guideTop = $('.advantage-guide').offset().top;
		document.body.scrollTop = guideTop;
		document.documentElement.scrollTop = guideTop;
	});
	// 计算文字显示行数
	var NumberRows = {
		show: function(text, more, fWidth) {
			if(!text.length) {return}
			var teacherTextLen = text.text().length,
				teacherWidth = text.width(),
				TextWidth = fWidth || 14,
				TextCount = teacherTextLen * TextWidth,
				TextLine = parseInt(TextCount / teacherWidth);
			if(TextLine >= 4) {
				text.addClass('line');
				more.show();
			} else {
				more.hide();
			}
		},
		hide: function(elem) {
			$(this).hide();
			elem.removeClass('line');
		}
	}
	//调用文字显示行数函数
	NumberRows.show($('.teacher-comment__text'), $('.teacher-comment__showmore'));
	NumberRows.show($('.learned-comment__text__en'), $('.learned-comment__text__showmore'), 10);
	//显示全部操作
	$('.teacher-comment__showmore').on('click', function() {
		NumberRows.hide.call(this, $('.teacher-comment__text'))
	});
	$('.learned-comment__text__showmore').on('click', function() {
		NumberRows.hide.call(this, $('.learned-comment__text__en'))
	});

	
	//本节课学到了什么对ul添加类
	var learnedLen = $('.learned-info li').length;
	if (learnedLen == 2) {
		$('.learned-info ul').removeClass('all').addClass('two');
	} else if (learnedLen == 1) {
		$('.learned-info ul').removeClass('all').addClass('one');
	}
	//分享弹层操作
	var shareGuide =  {
		maskShow: function() {
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			$('body,html').css({'height':clientHeight, 'overflow':'hidden'});
			$('.mask').css({'height': clientHeight}).show();
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		},
		hide: function() {
			$('body,html').removeAttr('style');
			$('.mask').hide();
		}
	};
	$('.mask .share-guide__close').on('click', function() {
		shareGuide.hide();
		$('.weixin-share-tips').show();
	});
	$('.weixin-share-tips').on('click', function() {
		$(this).hide();
		shareGuide.maskShow();
	});
	if($('.evaluation').length && $('.mask').length) {
		shareGuide.maskShow();
	}
	//滚动条是否到了底部
	$(window).on('scroll', function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
			offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
		if(scrollTop + clientHeight >= offsetHeight) {
			$('.fixedbar').hide();
		}else {
			$('.fixedbar').show();
		}
	})
});
