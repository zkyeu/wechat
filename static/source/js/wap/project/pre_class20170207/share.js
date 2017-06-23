define(function(require, exports, module){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 140,
            modifier: 1,
            slideShadows : true
        }
    });

    $(function() {
        $(".listen_wrap").click(function() {
            var oP = $(this),
                src = oP.data("src"),
                playBtn = oP.find(".listen_btn");

            if(!src) {return};
            if(!oP.hasClass('havaCreateAudio') && src) {
                var oAudio = document.createElement("audio");
                oP.addClass('havaCreateAudio');
                oP.append(oAudio);
                oAudio.src = src;
                oAudio.addEventListener('ended',function() {
                    playBtn.removeClass('pause_btn');
                }, false);
                oAudio.addEventListener('pause',function() {
                }, false);
                oAudio.addEventListener('play',function() {
                }, false);
            }

            var n_oAudio = oP.find('audio')[0];
            if(playBtn.hasClass('pause_btn')) {
                n_oAudio.pause();
                playBtn.removeClass('pause_btn');
            } else {
                n_oAudio.play();
                playBtn.addClass('pause_btn');
            }
        });

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
            this.formSend = $("#f-register");
            this.registerBtn = $(".p-advantage-guide_btn");
            this.mask = $(".f-mask");
            this.maskTipsText = this.mask.find(".tips-text");
            this.maskCloseBtn = this.mask.find(".close_btn");
            this.engChiCard = $(".slide").find(".card_wrap");
        }

        $.extend(Page.prototype, {
            init: function() {
                this.bindEvents();
            },

            bindEvents: function() {
                this.registerBtn.on('click', $.proxy(this.registerBtnClick, this));
                this.maskCloseBtn.on('click', $.proxy(this.handleMaskCloseBtnClick, this));
                this.engChiCard.on('click', '.eng_card, .chi_card', $.proxy(this.hangleEngChiCardClick, this));
            },

            hangleEngChiCardClick: function(e) {
                var _target = $(e.target);
                if(!_target.closest('.listen_wrap').length == 0) {
                    return;
                }
                var target = $(e.currentTarget),
                    targetSiblings = target.siblings();

                if(target.hasClass('sentence') && !target.hasClass('havaed_translate')) {
                    var english = unescape(target.find('p').text());
                    $.ajax({
                        url: 'translate?q=' + english,
                        type: 'GET',
                        dataType: 'json',
                        success: function(res) {
                            target.addClass('havaed_translate');
                            targetSiblings.find('p').text(res.data);
                            target.hide();
                            targetSiblings.show();
                        },
                        error: function() {
                            target.hide();
                            targetSiblings.show();
                        }
                    }) 
                } else {
                    target.hide();
                    targetSiblings.show();
                }
            },

            handleMaskTips: function(text) {
                this.maskTipsText.html(text);
                this.mask.show();
            },

            handleMaskCloseBtnClick: function() {
                this.mask.hide();
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