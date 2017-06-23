define(function(require,exports,module){
    function UserAction(){
        this.iNow = 0;
        this.regs= {
            mobile: {
                reg: /^1\d{10}$/,
                tip: '请填写正确的手机号码'
            },
            password: {
                reg: /^\w{6,20}$/,
                tip: '密码需设置为6到20位字符或数字'
            },
            code: {
                reg: /^\d{5}$/,
                tip: '验证码输入错误'
            }
        };
        this.eles = {
            form: $('#form'),
            submit: $('#subBtn'),
            type: $('#hideInput'),
            tel: $('#tel'),
            pwd: $('#pwd'),
            code: $('#code'),
            codeBtn: $('#codeBtn'),
            verifyDiv: $('#verifyCode'),
            dots: $('#dots a'),
            starList: $('#starList')
        };
    }

    $.extend(UserAction.prototype,{
        init: function(){
            this.setType();
            this.bindEvents();
            setInterval($.proxy(this.slide,this),3000);
        },
        //是否需要验证码
        setType: function(){
            var val = $.trim(this.eles.type.val())-0;
            this.hasCode = val ? true : false
        },
        subForm: function(){
            var bl = this.verifyTel();
            if(bl !== false){
                this.verifyCode();
            }
        },
        verifyTel: function(){
            var tel = $.trim(this.eles.tel.val());
            if(!this.regs.mobile.reg.test(tel)){
                alert(this.regs.mobile.tip);
                return false;
            }
        },
        verifyCode: function(){
            var pwd = $.trim(this.eles.pwd.val());
            if(!this.regs.password.reg.test(pwd)){
                alert(this.regs.password.tip);
                return false;
            }
            if(this.hasCode){
                var code = $.trim(this.eles.code.val());
                if(!this.regs.code.reg.test(code)){
                    alert(this.regs.code.tip);
                    return false;
                }
            }
            this.eles.form.submit();
        },
        //获取验证码
        getCode: function(){
            if(this.hasSend){
                return false;
            }
            var tel = $.trim(this.eles.tel.val());
            var bl = this.verifyTel();
            var self = this;
            if(bl === false){
                return false;
            }
            
            this.hasSend = true;
            $.ajax({
                url: '/Ajax/sendSms',
                type: 'POST',
                dataType: 'json',
                data: {mobile: tel},
                success: function(rs){
                    self.dealSucc(rs);
                }
            })
        },
        dealSucc: function(rs){
            var self = this;
            if(rs.status == 1){
                self.eles.codeBtn.text('请等待...');
                var n = 59;
                var timer = setInterval(function(){
                    if(n>0){
                        this.eles.codeBtn.text(n+'秒');
                        n--;
                    }else{
                        clearInterval(timer);
                        this.eles.codeBtn.text('重新获取');
                        this.hasSend = false;
                    }
                }.bind(self),1000);
            }else{
                this.hasSend = false;
                alert(rs.info);
            }
        },
        bindEvents: function(){
            this.eles.submit.off('tap').on('tap',$.proxy(this.subForm,this));
            if(this.hasCode){
                this.eles.codeBtn.off('tap').on('tap',$.proxy(this.getCode,this));
            }else{
                this.eles.verifyDiv.remove();
            }
        },
        //滑动
        slide: function (){
            var self = this;
            this.iNow++;
            this.eles.dots.eq(this.iNow%2).addClass("active").siblings().removeClass("active");
            this.eles.starList.animate({'transform':'translateX('+(-100/3)*(this.iNow)+'%)'},{complete: function(){
                if(self.iNow==2){
                    self.iNow=0;
                    self.eles.starList.css({
                        'transform': 'translateX(0%)'
                    })
                }
            }})
        }
    })

    var user = new UserAction();
    user.init();

})