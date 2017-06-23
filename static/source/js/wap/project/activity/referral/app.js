'use strict';
define(function(require, exports, module) {
	function app() {
		this.tel = $('.index .form #tel');
		this.name = $('.index .form #name');
		this.telWrap = $('.index .form .tel');
		this.nameWrap = $('.index .form .name');
		this.submit = $('.index .button');
		this.stuNum = $('#stu_num');
	}
	$.extend(app.prototype, {
		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			this.tel.on('input', $.proxy(this.inputBlurHandler, this));
			this.name.on('input', $.proxy(this.inputBlurHandler, this));
			this.submit.on('click', $.proxy(this.submitHandler, this));
		},
		api: '/ajax/getEBook',
		isEmpty: function(val) {
			if(!val) {
				return false;
			} else {
				return true;
			}
		},
		isTel: function(val) {
			var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
			if(!reg.test(val)) {
					return false;
			} else {
					return true;
			}
		},
		errorTipsHandler: function(text) {
			var error = '<section class="error">'+ text +'</section>';
			return error;
		},
		inputBlurHandler: function(e) {
			var target = $(e.currentTarget);
			target.next('.error').remove();
		},
		submitHandler: function() {
			var tel = this.tel.val(),
					name = this.name.val(),
					stuNum = this.stuNum.val();
			var isTelEmpty = this.isEmpty(tel),
					isNameEmpty = this.isEmpty(name),
					isValidateTel = this.isTel(tel);
			if(!isTelEmpty) {
				var errorTip = this.errorTipsHandler('请输入好友手机号');
				$(errorTip).appendTo(this.telWrap);
				return false;
			}
			if(!isNameEmpty) {
				var errorTip = this.errorTipsHandler('请输入您的姓名');
				$(errorTip).appendTo(this.nameWrap);
				return false;
			}
			if(!isValidateTel) {
				var errorTip = this.errorTipsHandler('请输入正确的手机号');
				$(errorTip).appendTo(this.telWrap);
				return false;
			};
			var data = {
				'tel': tel,
				'name': name,
				'stu_num': stuNum
			}
			this.sendRequest(this.api, 'POST', 'json', data, this.sendRequestSuccess, this.sendRequestError);
		},
		sendRequest:function(url, type, dataType, data, success, error) {
			$.ajax({
				url: url,
				type: type,
				dataType: dataType,
				data: data,
				context: this,
				success: success,
				error: error
			})
		},
		sendRequestSuccess: function(res) {
			if(res.status == 0) {
				alert(res.info)
				return false;
			}
			if(res.status == 1) {
				location.href = res.data.url;
			}
		},
		sendRequestError: function(res) {
			console.log(res)
		}
	})
	var App = new app();
	App.init();
})
