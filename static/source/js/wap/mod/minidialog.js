define('minidialog', ['mask'], function(require, exports, module) {
	var mask = require('mask');
	var doc = document;
	/*
	 * author:liya(liya@51talk.com);
	 * @constructor minidialog
	 * @param options {object} 配置选项
	 * @param options.html {string} 必选,提示内容，可以是html
	 * @param options.modal {boolean} 是否显示蒙层
	 * @param options.modalCallback {function} 蒙层点击回调函数
	 * @param options.autoHide {number} 毫秒,自动remove弹窗时间
	 */
	function dialog(options) {
		this.options = {
			autoHide: 0,
			html: '',
			tapRemove: true,
			modal: false,
			modalCallback: function() {}
		};
		$.extend(this.options, options, true);
		this.init();
	}
	dialog.prototype = {
		init: function() {
			var self = this;
			this.modal = this.options.modal ?
				new mask({
					el: $('body'),
					click: function() {
						self.options.modalCallback.call(self);
					},
					css: {
						'z-index': 99
					}
				}).show() : $('<div>');
			this.dialog = $('<div class="js-minidialog"></div>');
			this.dialog.append(this.options.html);
			$(document.body).append(this.dialog);
			if(this.options.autoHide) {
				setTimeout(function() {
					self.remove();
				},this.options.autoHide);
			}
			this.dialog.css({
				'z-index':999,
				'top': $(window).height()/2 - this.dialog[0].clientHeight/2 +  document.body.scrollTop + 'px'
			});
			if(this.options.tapRemove) {
				this.handleEvents();
			}
		},
		tapEvent: function() {
			var self = this;
			return function() {
				self.remove();
			}
		},
		handleEvents: function() {
			if(this.options.modal) {
				this.tapEl = this.modal.mask;
			}else {
				this.tapEl = doc;
			}
			this.tapFunc = this.tapEvent();
			$(this.tapEl).on('click', this.tapFunc);
		},
		hide: function() {
			this.dialog.hide();
			this.modal.hide();
		},
		remove: function() {
			this.hide();
			this.dialog.remove();
			this.modal.remove();
			if(this.options.tapRemove) {
				$(this.tapEl).off('click', this.tapFunc);
			}
		}
	}
	return dialog;
})