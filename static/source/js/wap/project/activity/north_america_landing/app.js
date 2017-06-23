define(function(require, exports, module) {
  function appNa() {
    this.mobile = $('#tel');
    this.password = $('#password');
    this.sMobile = $('#s_tel');
    this.sPassword = $('#s_password');
    this.registerBtn = $('.register .btn');
    this.signBtn = $('.sign .btn');
  }
  $.extend(appNa.prototype, {
    init: function() {
      this.bindEvent();
    },
    bindEvent: function() {
      this.registerBtn.on('click', $.proxy(this.regFormSubmitHandler, this));
      this.signBtn.on('click', $.proxy(this.signFormSubmitHandler, this));
    },
    regFormSubmitHandler: function() {
      var mobile = this.mobile.val(),
          password = this.password.val();
      if(!this.isEmpty(mobile)) {
        alert('请输入手机号');
        return false;
      }
      if(!this.isTel(mobile)) {
        alert('请输入正确的手机号');
        return false;
      }
      if(!this.isEmpty(password)) {
        alert('设置您的密码');
        return false;
      }
      if(!this.passwordVal(password)) {
        alert('输入正确的密码格式');
        return false;
      }
      $('#reg_form').submit();
    },
    signFormSubmitHandler: function() {
      var mobile = this.sMobile.val(),
          password = this.sPassword.val();
      if(!this.isEmpty(mobile)) {
        alert('请输入手机号');
        return false;
      }
      if(!this.isTel(mobile)) {
        alert('请输入正确的手机号');
        return false;
      }
      if(!this.isEmpty(password)) {
        alert('设置您的密码');
        return false;
      }
      if(!this.passwordVal(password)) {
        alert('输入正确的密码格式');
        return false;
      }
      $('#s_reg_form').submit();
    },
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
    passwordVal: function(value) {
        var reg = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
        if(!reg.test(value)) {
            return false;
        } else {
            return true;
        }
    }
  });
  var AppNa = new appNa();
  AppNa.init();
})
