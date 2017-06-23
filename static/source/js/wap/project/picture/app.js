define(function(require, exports, module) {
	var app = {
		registerForm: $('#register'),
		submitBtn: $('.picture-form__submit'),
		coverImg: $('.picture-wrap__cover img'),
		coverMask: $('.picture-wrap__cover .mask'),
		telReg: /^1[0-9]\d{9}$/,
		telPas: /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/,
		tel: $('#tel'),
		password: $('#password'),
		unLockBtn: $('.picture-unlock'),
		shareGuide: $('.share-mask'),
		shareGuideClose: $('.share-guide .sure'),
		bodyHeight: document.documentElement.scrollHeight || document.body.scrollHeight,
		errorTipsMark: $("#error_tips"),
		init: function() {
			this.shareGuide.height(this.bodyHeight);
			this.setMaskHeight();
			this.bindEvents();
		},
		bindEvents: function() {
			this.unLockBtn.on('click', $.proxy(this.unLockHandler, this));
			this.shareGuideClose.on('click', $.proxy(this.closeGuideHandler, this));
			this.submitBtn.on('click', $.proxy(this.registerFormHandler, this));
			this.errorTipsMark.on('click', '.sure_btn', $.proxy(this.handleCloseErrorTipsMark, this));
		},
		handleCloseErrorTipsMark: function() {
			this.errorTipsMark.hide();
		},
		registerFormHandler: function(e) {
			var target = $(e.currentTarget);
			
			if(!this.tel.val()) {
				this.errorTipsMark.find('.error_txt').html('请输入手机号');
				this.errorTipsMark.show();
				return false;
			} else if (!this.telReg.test(this.tel.val())) {
				this.errorTipsMark.find('.error_txt').html('请输入正确的手机号');
				this.errorTipsMark.show();
				return false;
			}
			if(!this.password.val()) {
				this.errorTipsMark.find('.error_txt').html('请输入密码');
				this.errorTipsMark.show();
				return false;
			} else if(!this.telPas.test(this.password.val())) {
				this.errorTipsMark.find('.error_txt').html('请输入6-20位的密码');
				this.errorTipsMark.show();
				return false;
			}
			this.registerForm.submit();
		},
		unLockHandler: function() {
			this.shareGuide.show();
		},
		closeGuideHandler: function() {
			this.shareGuide.hide();
		},
		countImageHandler: function() {
			var imgHeight = this.coverImg.height();
			return imgHeight;
		},
		setMaskHeight: function() {
			var imgHeight = this.countImageHandler() - 1;
			this.coverMask.css({'height': imgHeight});
		}
	};
	app.init();
});