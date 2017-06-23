define(function(require, exports, module) {
	var app = {
		nameEnReg: /^[A-Za-z]{2,20}$/,
		telReg: /^1(3|4|5|7|8)\d{9}$/,
		name: $('#name'),
		birthday: $('#birthday'),
		tel: $('#tel'),
		code: $('#code'),
		telcode: $('#telcode'),
		formName: $('.form-name'),
		formBirthday:$(".form-birthday"),
		formTel: $('.form-tel'),
		formCode: $('.form-code'),
		formTelCode: $('.form-telcode'),
		clear: $('.clear'),
		nameRecommend: $('.form-name__recommend'),
		verifyCode: $('.form-code__btn'),
		formTelcodeBtn: $('.form-telcode__btn'),
		submit: $('.sure'),
		countdown: 60,
		countdownOver: false,
		nowYear: '',
		nowMonth: '',
		nowDate: '',
		nameData: '',
		sexData: [
		    {'id': '1', 'value': '男孩', 'parentId': '0'},
		    {'id': '2', 'value': '女孩', 'parentId': '0'}
		],
		nameDataList: "",
		errorTips: $('<section class="error"></section>'),
		isEmpty: function(val) {
			if(!val) {
				return true;
			} else {
				return false;
			}
		},
		isNameEn: function(val) {
			if(!this.nameEnReg.test(val)) {
				return false;
			} else {
				return true
			}
		},
		isTel: function(val) {
			if(!this.telReg.test(val)) {
				return false;
			} else {
				return true;
			}
		},
		init: function() {
			this.bindEvents();
			this.setTime();
		},
		bindEvents: function() {
			this.name.on('blur', $.proxy(this.nameValidator, this));
			this.tel.on('blur', $.proxy(this.telValidator, this));
			// this.code.on('blur', $.proxy(this.codeValidator, this));
			// this.telcode.on('blur', $.proxy(this.telcodeValidator, this));
			this.name.on('input', $.proxy(this.clearShow, this));
			this.tel.on('input', $.proxy(this.clearShow, this));
			this.code.on('input', $.proxy(this.clearShow, this));
			this.telcode.on('input', $.proxy(this.clearShow, this));
			this.clear.on('click', $.proxy(this.clearHide, this));
			this.formTelcodeBtn.on('click', $.proxy(this.sendTelHandler, this));
			this.verifyCode.on('click', $.proxy(this.verifyCodeHandler, this));
			this.submit.on('click', $.proxy(this.submitValidator, this));
			this.nameRecommend.on('click', $.proxy(this.nameRecommendHandler, this));
		},
		nameValidator: function() {
			var nameVal = this.name.val(),
				isNameEn = this.isNameEn(nameVal);
			if(!isNameEn) {
				this.blurError(this.formName, '* 请输入正确英文名');
			} else {
				this.errorTips.remove();
			}
		},
		telValidator: function() {
			var telVal = this.tel.val(),
				isTel = this.isTel(telVal);
			if(!isTel) {
				this.blurError(this.formTel, '* 请输入正确手机号');
			} else {
				this.errorTips.remove();
			}
		},
		nameRecommendHandler: function() {
			$.ajax({
				url: '/NaTrial/getNickName',
				type: 'GET',
				async: true,
				dataType: 'json',
				context: this,
				success: function(res) {
					if(res.status == 1) {
						this.nameDataList = res.data;
						this.nameRecommendSelect(res.data);
					}
				}
			});
		},
		nameRecommendSelect: function(nameDataList) {
			var _self = this;
			new IosSelect(
				2, 
	            [this.sexData, nameDataList],
	            {
	                title: '推荐英文名',
	                itemHeight: 35,
	                relation: [1, 1],
	                callback: function (selectOneObj, selectTwoObj) {
	                	_self.name.val(selectTwoObj.value.split(' ')[0]);
	                	_self.nameDataList = nameDataList;
	                	_self.errorTips.remove();
	                }
	        });
		},
		verifyCodeHandler: function() {
			var imgSrc = this.verifyCode.attr('src').indexOf('?') == -1 ? this.verifyCode.attr('src') : this.verifyCode.attr('src').split('?')[0];
			this.verifyCode.attr({'src': imgSrc + '?' + new Date().getTime()});
		},
		sendTelHandler: function() {
			var telVal = this.tel.val(),
				codeVal = this.code.val(),
				telIsEmpty = this.isEmpty(telVal),
				verifyCodeIsEmpty = this.isEmpty(codeVal);
			if(telIsEmpty) {
				this.blurError(this.formTel, '* 请输入正确手机号');
				return false;
			}
			if(verifyCodeIsEmpty) {
				this.blurError(this.formCode, '* 请输入正确验证码');
				return false;
			}
			if(!this.countdownOver) {
				this.countDown();
				this.telCodeValidator(telVal, codeVal);
			}
		},
		telCodeValidator: function(mobile, imgcode) {
			var _self = this;
			$.ajax({
				url: "/Ajax/sendCheckCode",
				type: "POST",
				dataType: "json",
				data: {
					"mobile": mobile,
					"imgcode": imgcode
				},
				success: function(res) {
					if(res.status == 0) {
						_self.blurError(_self.formTelCode, '* ' + res.info);
					}
				}
			})
		},
		submitValidator: function() {
			var _self = this;
			var nameVal = this.name.val(),
				birthdayVal = this.birthday.val(),
				telVal = this.tel.val(),
				codeVal = this.code.val(),
				telCodeVal = this.telcode.val();
			var	isNameEmpty = this.isEmpty(nameVal),
				isNameEnVal = this.isNameEn(nameVal),
				isBirthdayEmpty = this.isEmpty(birthdayVal),
				isTelEmpty = this.isEmpty(telVal),
				isCodeEmpty = this.isEmpty(codeVal),
				isTelCodeEmpty = this.isEmpty(telCodeVal);
			var data = {
				"nick_name": nameVal,
				"birthday": birthdayVal,
				"mobile": telVal,
				"mobile_code": telCodeVal
			};
			if(isNameEmpty || !isNameEnVal) {
				this.blurError(this.formName, '* 请输入正确英文名');
				return false;
			}
			if(isBirthdayEmpty) {
				this.blurError(this.formBirthday, '* 请选择孩子的生日');
				return false;
			}
			if(isTelEmpty) {
				this.blurError(this.formTel, '* 请输入正确手机号');
				return false;
			}
			if(isCodeEmpty) {
				this.blurError(this.formCode, '* 请输入正确验证码');
				return false;
			}
			if(isTelCodeEmpty) {
				this.blurError(this.formTelCode, '* 请输入正确手机验证码');
				return false;
			};
			$.ajax({
				url: "/NaTrial/submitInfo",
				type: "POST",
				dataType: 'json',
				data: data,
				success: function(res) {
					if(res.status == 1) {
						location.href = res.info;
					}
					if(res.status == 0) {
						_self.blurError(_self.formTelCode, '* ' + res.info);
					}
				}
			});
		},
		setTime: function() {
			var now = new Date();
		    this.nowYear = now.getFullYear();
		    this.nowMonth = now.getMonth() + 1;
		    this.nowDate = now.getDate();
		    this.birthday.attr('data-year', this.nowYear);
		    this.birthday.attr('data-month', this.nowMonth);
		    this.birthday.attr('data-date', this.nowDate);
		},
		blurError: function(elem, text) {
			this.errorTips.appendTo(elem);
			this.errorTips.text(text);
		},
		clearShow: function(e) {
			var e = e.target ? e.target : e.srcElement;
			$(e).next().show();
		},
		clearHide: function(e) {
			var e = e.target ? e.target : e.srcElement,
				prevInput = $(e).prev();
			prevInput.val('');
			$(e).hide();
			this.errorTips.remove();
		},
		countDown: function() {
			if(this.countdown == 0) {
				this.formTelcodeBtn.text('重新获取验证码');
				this.formTelcodeBtn.removeClass('disabled').addClass('resend');
				this.countdown = 60;
				this.countdownOver = false;
				return false;
			} else {
				this.formTelcodeBtn.text(this.countdown + '秒后重试');
				this.formTelcodeBtn.addClass('disabled');
				this.countdown--;
				this.countdownOver = true;
			}
			setTimeout($.proxy(this.countDown, this), 1000)
		}
	}
	app.init();
	// 初始化时间
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;
	var nowDate = now.getDate();
	var dateForm = $(".form-birthday");
	var calendarInput = $('#birthday');
	//调用日历插件
	function formatYear (nowYear) {
	    var arr = [];
	    for (var i = 1990; i <= nowYear; i++) {
	        arr.push({
	            id: i + '',
	            value: i + '年'
	        });
	    }
	    return arr;
	}
	function formatMonth () {
	    var arr = [];
	    for (var i = 1; i <= 12; i++) {
	        arr.push({
	            id: i + '',
	            value: i + '月'
	        });
	    }
	    return arr;
	}
	function formatDate (count) {
	    var arr = [];
	    for (var i = 1; i <= count; i++) {
	        arr.push({
	            id: i + '',
	            value: i + '日'
	        });
	    }
	    return arr;
	}
	var yearData = formatYear(nowYear);
	var monthData = function (year, callback) {
	    callback(formatMonth());
	};
	var dateData = function (year, month, callback) {
	    if (/^1|3|5|7|8|10|12$/.test(month)) {
	        callback(formatDate(31));
	    }
	    else if (/^4|6|9|11$/.test(month)) {
	        callback(formatDate(30));
	    }
	    else if (/^2$/.test(month)) {
	        if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
	            callback(formatDate(29));
	        }
	        else {
	            callback(formatDate(28));
	        }
	    }
	    else {
	        throw new Error('month is illegal');
	    }
	}
	dateForm.on('click', function () {
	    var oneLevelId = calendarInput.attr('data-year');
	    var twoLevelId = calendarInput.attr('data-month');
	    var threeLevelId = calendarInput.attr('data-date');
	    var iosSelect = new IosSelect(3, 
	        [yearData, monthData, dateData],
	        {
	            title: '选择宝贝生日',
	            itemHeight: 35,
	            relation: [1, 1],
	            oneLevelId: oneLevelId,
	            twoLevelId: twoLevelId,
	            threeLevelId: threeLevelId,
	            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
	                calendarInput.attr('data-year', selectOneObj.id);
	                calendarInput.attr('data-month', selectTwoObj.id);
	                calendarInput.attr('data-date', selectThreeObj.id);
	                calendarInput.val(selectOneObj.id + '-' + selectTwoObj.id + '-' + selectThreeObj.id);
	            }
	    });
	});
});