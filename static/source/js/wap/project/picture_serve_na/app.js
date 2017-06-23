define(function(require, exports, module) {
	var app = {
		formTel: $('.form-tel'),
		tel: $('#tel'),
		registerForm: $('.picture-serve__form form'),
		selectAge: $('.picture-serve__form .select-age'),
		selectOption: $('.picture-serve__form .select-option'),
		select: $('.picture-serve__form .select'),
		formSubmit: $('.picture-serve__form .btn'),
		telReg: /^1[0-9]\d{9}$/,
		errorTips: $('<section class="error"></section>'),
		init: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			this.select.on('change', $.proxy(this.selectHandler, this));
			this.formSubmit.on('click', $.proxy(this.formSubmitCheck, this));
		},
		formSubmitCheck: function() {
			var selectText = this.selectOption.text();
			var isSelected = this.selectOption.attr('data-select');
			if(!this.tel.val()) {
				this.errorTips.appendTo(this.formTel);
				this.errorTips.text('请输入接收手机号');
				return false;
			} else {
				this.errorTips.remove();
			}
			if(!this.telReg.test(this.tel.val())) {
				this.errorTips.appendTo(this.formTel);
				this.errorTips.text('请输入正确的手机号');
				return false;
			} else {
				this.errorTips.remove();
			}
			if(!isSelected) {
				this.errorTips.appendTo(this.selectAge);
				this.errorTips.text('请选择孩子年龄');
				return false;
			} else if(selectText === '请选择适用年龄') {
				this.errorTips.appendTo(this.selectAge);
				this.errorTips.text('请选择孩子年龄');
				return false;
			} else {
				this.errorTips.remove();
			}
			this.registerForm.submit();
		},
		selectHandler: function() {
			var selectedText = this.select.find('option:selected').text();
			this.selectOption.text(selectedText).css({'color':'#000'}).attr({'data-select': true});
		}
	}
	app.init();
});