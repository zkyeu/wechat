define(function(require){
    $(function(){
        function Page() {
            this.submitBtn = $("#submit");
            this.rName = $("#r_name");
            this.wMessage = $("#w_message");
            this.sName = $("#s_name");
            this.mask = $(".f-mask");
            this.errorTit = $(".f-error");
            this.errorTitText = $(".f-error-tit");
            this.closeBtn = $(".f-close");
            this.phoneTit = $(".m-phone");
            this.phoneNum = $("#phone_num");
            this.sendPhoneNum = $("#send");
            this.successTit = $(".m-success");
            this.reTel = /^1[0-9]{10}$/;
            this.test = 'k';
        }
        Page.api = '/ad/thanksgiving';
        $.extend(Page.prototype, {
            init: function() {
                this.bindEvents();
            },

            bindEvents: function() {
                this.submitBtn.on("click", $.proxy(this.handlesubmitBtnClick, this));
                this.rName.on("keyup", $.proxy(this.handleInputKeyup, this));
                this.wMessage.on("keyup", $.proxy(this.handleInputKeyup, this));
                this.sName.on("keyup", $.proxy(this.handleInputKeyup, this));
                this.closeBtn.on("click", $.proxy(this.handleCloseBtnClick, this));
                this.phoneNum.on("keyup", $.proxy(this.handlePhoneNumKeyup, this));
                this.sendPhoneNum.on("click", $.proxy(this.handleSendPhoneNumClick, this));
            },

            handlePhoneNumKeyup: function(e) {
                var target = $(e.currentTarget),
                    num = target.val();
                if (this.reTel.test(num)) {
                    this.sendPhoneNum.addClass("can_send");
                } else {
                    this.sendPhoneNum.removeClass("can_send");
                }
            },

            handleSendPhoneNumClick: function(e) {
                var target = $(e.currentTarget);
                if(!target.hasClass("can_send")) {
                    return;
                }
                this.phoneTit.hide();
                this.successTit.show();
                this.mask.show();
                var data = {
                    'r_name' : this.rName.val(),
                    'w_message' :  this.wMessage.val(),
                    'sName' : this.sName.val(),
                    'phone' : this.phoneNum.val()
                }
                this.sendRequest(Page.api, 'post', data, this.handleResponseSuccess, this.handleResponseError);

                WeChat(data.phone);
    
            },

            sendRequest: function(url, method, data, success, error) {
                $.ajax({
                  url: url,
                  type: method,
                  dataType: 'json',
                  data: data,
                  context: this,
                  success: success,
                  error: error
                });
            },

            handleCloseBtnClick: function() {
                this.mask.hide();
                this.errorTit.hide();
            },

            handlesubmitBtnClick: function(e) {
                var target = $(e.currentTarget);
                if(!target.hasClass('can_send')) {
                    return;
                }
                var rName = this.handleStrLength(this.rName.val(), 10),
                    wMessage = this.handleStrLength(this.wMessage.val(), 120);
                    sName = this.handleStrLength(this.sName.val(), 10);

                if(!rName) {
                    this.mask.show();
                    this.errorTit.show();
                    this.errorTitText.html("收件人姓名，最多5个汉字。");
                    return;
                }
                if(!wMessage) {
                    this.mask.show();
                    this.errorTit.show();
                    this.errorTitText.html("温馨寄语，最多60个汉字。");
                    return;
                }
                if(!sName) {
                    this.mask.show();
                    this.errorTit.show();
                    this.errorTitText.html("寄件人姓名，最多5个汉字。");
                    return;
                }
                this.mask.show();
                this.phoneTit.show();
            },

            handleInputKeyup: function() {
                if(this.rName.val().length > 0 && this.wMessage.val().length > 0 && this.sName.val().length > 0) {
                    this.submitBtn.addClass('can_send');
                } else {
                    this.submitBtn.removeClass('can_send');
                }
            },

            handleStrLength: function(s, m) {
                var tLength = 0;
                for(var i = 0; i < s.length; i++ ) {
                    var v = s.substring(0, i+1);
                    if(s.charCodeAt(i)>0 && s.charCodeAt(i)<128) {
                        tLength += 1;
                    } else {
                        tLength += 2;
                    }
                }
                if(tLength <= m) {
                    return true;
                } else {
                    this.rName.val();
                    return false;
                }
            },
        });

        var page = new Page();
            page.init();
    })
});