define(function(require, exports, module) {
	//点击链接分享显示弹窗
	var dialog = {
		mask: function() {
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			$('.mask').css({'height':clientHeight});
		},
		show: function(type, text) {
			var _self = this;
			_self.mask();
			if(type == 'link') {
				$('.alert .info').html(text);
				$('.alert').show();
				$('.friend-recommend__dialog').hide();
			} else {
				$('.alert').hide();
				$('.friend-recommend__dialog').show();
			}
			$('.mask').show();
		},
		hide: function(type, text) {
			$('.mask').hide();
		}
	}
	$('.friend-recommend__topbanner__icons .link').on('click', function() {
		dialog.show();
	});
	$('.friend-recommend__dialog__linkform .invite').on('click', function() {
		if($.browser.msie) {
			var text = $('.friend-recommend__dialog__linkform .shareurl').val();
			clipboardData.setData('Text',text);
			dialog.show('link', '复制成功，可以直接粘贴在相应位置');
		}else {
			dialog.show('link', '您使用的浏览器不支持直接复制，请选中链接并按下ctrl+c复制代码到剪贴板');
		}
	});
	$('.alert .title .close').on('click', function() {
		dialog.show();
	});
	$('.alert .infobox .btn').on('click', function() {
		dialog.show();
	});
	$('.friend-recommend__dialog .friend-recommend__dialog__close').on('click', function() {
		dialog.hide();
	});
	//扫码分享到顶部
	$('.friend-recommend__awardlst__table .share').on('click', function() {
		$('body,html').animate({scrollTop:0},400)
	});
	//滚动条设置
	$(".friend-recommend__awardlst__table .tbody").mCustomScrollbar({
      theme:"inset-3"
    });
    //分享
    var shareContent = "火遍全球的在线美国小学课程终于来中国啦！";
    var shareLink = $(".container").attr("data-url");
    window._bd_share_config={
      "common":{
        "bdSnsKey":{},
        "bdText":shareContent,
        "bdMini":"2",
        "bdMiniList":false,
        "bdPic":"http://static.51talk.com/static/images/html/friend_recommend/000.jpg;http://static.51talk.com/static/images/html/friend_recommend/001.jpg;http://static.51talk.com/static/images/html/friend_recommend/002.jpg;http://static.51talk.com/static/images/html/friend_recommend/003.jpg;",
        "bdUrl": shareLink,
        "bdStyle":"0",
        "bdSize":"16"
      },
      "share":{}
    };
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
})
