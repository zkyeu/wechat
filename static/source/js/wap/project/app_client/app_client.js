define(function(require, exports, module) {
	var app = {
		weChat: $('.wechat'),
		weChatMoments: $('.wechat-moments'),
		weiboIcon: $('.weibo'),
		qqIcon: $('.qq'),
		mask: $('.mask'),
		close: $('.mask .detail-close'),
		detail: $('.detail'),
		init: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			this.detail.on('click', $.proxy(this.countHeight, this));
			this.close.on('click', $.proxy(this.dialogHide, this));
			this.weChat.on('click', $.proxy(this.weChatHandler, this));
			this.weChatMoments.on('click', $.proxy(this.weChatMomentsHandler, this));
			this.weiboIcon.on('click', $.proxy(this.weiboIconHandler, this));
			this.qqIcon.on('click', $.proxy(this.qqIconHandler, this));
		},
		weChatHandler: function() {
			__sdonclick('wechat');
		},
		weChatMomentsHandler: function() {
			__sdonclick('weChatMoments');
		},
		weiboIconHandler: function() {
			__sdonclick('weibo');
		},
		qqIconHandler: function() {
			__sdonclick('qq');
		},
		countHeight: function() {
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			this.mask.css({'height': clientHeight}).show();
		},
		dialogHide: function() {
			this.mask.hide();
		}
	}
	app.init();
});