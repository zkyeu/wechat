/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
    function onBridgeReady(){
     WeixinJSBridge.call('hideOptionMenu');
    }

    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    }else{
        onBridgeReady();
    }
    
	$(function(){
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
                var reg = /^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i;
                if(!reg.test(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        };
        function Page() {
        	this.mask = $(".f-mask");
      		this.maskCloseBtn = this.mask.find(".close_btn");
      		this.maskTipsText = this.mask.find(".tips-text");
      		this.registerBtn = $(".p-register_send");
        }

        Page.api = "/nat/wx/bindaccount";

        $.extend(Page.prototype, {
            init: function() {
                this.bindEvents();
            },

            bindEvents: function() {
                this.registerBtn.on('click', $.proxy(this.registerBtnClick, this));
                this.maskCloseBtn.on('click', $.proxy(this.handleMaskCloseBtnClick, this));
            },

            handleMaskCloseBtnClick: function() {
                this.mask.hide();
            },

            handleMaskTips: function(text) {
                this.maskTipsText.html(text);
                this.mask.show();
            },

            registerBtnClick: function() {
                var tel = $('#mobile').val(),
                    password = $('#password').val(),
                    user_open_id = $("#user_open_id").val();
                if(!validRule.isNoEmpty(tel)) {
                    this.handleMaskTips("请输入手机号码或邮箱");
                    return false;
                };
                if(!validRule.isMobile(tel)) {
                    this.handleMaskTips("请输入正确手机号码或邮箱");
                    return false;
                };
                if(!validRule.isNoEmpty(password)) {
                    this.handleMaskTips("请输入密码");
                    return false;
                }
                if(!validRule.passwordVal(password)) {
                    this.handleMaskTips("请输入至少6位密码");
                    return false;
                };

                var data = {
                	'tel': tel,
                	'password': password,
                    'user_open_id': user_open_id
                }
                var that = this;

                $.ajax({
                    url: Page.api,
                    type: 'post',
                    dataType: 'json',
                    data: data,
                    context: this,
                    success: function(res) {
                        var status = res.status;
                        var data = res.data;
                        if (status === 1) {
                          window.location.href = data;
                        } else {
                            that.handleMaskTips(res.info);
                        }
                    }
                });
            }
        })

        var page = new Page();
        page.init();
    });  
});
