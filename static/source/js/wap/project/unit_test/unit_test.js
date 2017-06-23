define(function(require){
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
                var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
                if(!reg.test(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        };
        function Page() {
            this.sentence = $(".geted_sentence");
            this.sentenceShowAllBtn = this.sentence.find(".u-show-all");
            this.registerModule = $(".p-advantage-guide");
            this.registerBtn = $(".p-advantage-guide_btn");
            this.mask = $(".f-mask");
            this.formSend = $("#f-register");
            this.maskTipsText = this.mask.find(".tips-text");
            this.maskCloseBtn = this.mask.find(".close_btn");
            this.bottomTips = $(".bottom_tips");
            this.shareTips = $('.share-guide');
            this.shareTipsCloseBtn = $(".share-guide_close");
        }

        $.extend(Page.prototype, {
            init: function() {
                this.handleShowSentence();
                this.bindEvents();
                $(window).on('scroll', $.proxy(this.handleScroll, this));
            },

            handleScroll: function() {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                    clientHeight = document.body.clientHeight,
                    offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;

                if(scrollTop + clientHeight >= offsetHeight) {
                    this.bottomTips.hide();
                }else {
                    this.bottomTips.show();
                }
            },

            handleShowSentence: function() {
                var sentencesLen = this.sentence.find('p').length;
                if(sentencesLen < 3) {
                    this.sentenceShowAllBtn.hide(); 
                } else {
                    this.sentence.find('p').each(function(index, elem) {
                        if(index > 3) {
                            $(elem).addClass('havedHide');
                            $(elem).hide();
                        }
                    })
                    this.sentenceShowAllBtn.show(); 
                }
            },

            bindEvents: function() {
                this.sentenceShowAllBtn.on('click', $.proxy(this.handleSentenceShowAllBtnClick, this));
                this.registerBtn.on('click', $.proxy(this.registerBtnClick, this));
                this.maskCloseBtn.on('click', $.proxy(this.handleMaskCloseBtnClick, this));
                this.bottomTips.on('click', $.proxy(this.hangleBottomTipsClick, this));
                this.shareTipsCloseBtn.on('click', $.proxy(this.handleShareTipsCloseBtnClick, this));
            },

            handleShareTipsCloseBtnClick: function() {
                this.shareTips.hide();
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
                    password = $('#password').val();
                if(!validRule.isNoEmpty(tel)) {
                    this.handleMaskTips("请输入手机号码");
                    return false;
                };
                if(!validRule.isMobile(tel)) {
                    this.handleMaskTips("请输入正确手机号码");
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
                this.formSend.submit();
            },

            handleSentenceShowAllBtnClick: function() {  
                this.sentence.find('.havedHide').show();
                this.sentenceShowAllBtn.hide();
            },

            hangleBottomTipsClick: function() {
                var guideOffsetTop = this.registerModule.offset().top;
                document.body.scrollTop = guideOffsetTop;
                document.documentElement.scrollTop = guideOffsetTop;
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
            }
        })

        var page = new Page();
        page.init();
    });       
});