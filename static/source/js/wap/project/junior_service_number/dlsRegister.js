/**
 * @authors wanghuihui@51talk.com
 * 图片验证码、短信验证码、点击领取交互
 */
define(function(require,exports,module){
    var ReceiveFn = function(){
        this.valPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
        this.regMobile = $("#regMobile");//手机号
        this.captchImg = $('#captchImg');//图片验证码
        this.captch = $('#captch');//获取图片验证码
        this.regSms = $("#regSms");//短信验证码
        this.smsBtn = $("#smsBtn");//获取短信按钮
        this.commitBtn = $("#commitBtn");//领取按钮
        //弹窗盒子
        this.showtipsLayer = $('.showtips_layer');
        this.showtips = $('.showtips'); 

        this.closeLayer = $('#closeLayer'); //弹窗关闭按钮
        this.countDown = $('#countDown'); //倒计时
        this.num = 60;
        this._event();
    };
    ReceiveFn.prototype = {
        _event : function(){
            var that = this;

            //验证码控制
            var imgUrl = '/mobile/activity/verify';
            this.captchImg.on('touchend',function(){
                this.src = imgUrl +'?'+ Math.random();
            });

            //点击领取
            this.commitBtn.on('touchend',function(){
                that.blurFn();
                that.nullValue = that.regMobile.val() && that.regMobile.val().length>0 && that.valPhone.test(that.regMobile.val());
                if(!that.nullValue){
                    that.showFn('手机格式不正确！');
                }else if(that.captch.val() == ''){
                    that.showFn('请输入图片验证码');
                }else if(that.regSms.val() == ''){
                    that.showFn('请输入短信验证码');
                }else{
                    that.commitFn();
                }
                
            });
            
            //短信验证码
            this.smsBtn.on('touchend',function(){
                that.blurFn();
                that.nullValue = that.regMobile.val() && that.regMobile.val().length>0 && that.valPhone.test(that.regMobile.val());
                if(!that.nullValue){
                    that.showFn('手机格式不正确！');
                }else{
                    that.smsFn();
                }
            })
        },

        //显示弹层
        showFn : function(value){
            this.showtipsLayer.show();
            this.showtips.find('span').text(value);
            this.closeFn();
        },

        //关闭弹层
        closeFn : function(){
            var that = this;
            this.closeLayer.off('touchend').on('touchend',function(){
                that.showtipsLayer.hide();
            });
        },

        //发送短信验证码
        smsFn : function(){
            var that = this;
            $.ajax({
                url:'/mobile/activity/sendSmsNew',
                type:"post",
                dataType:"json",
                async:false,
                data:{
                    mobile:this.regMobile.val(),
                    verify_code:this.captch.val()
                },
                success : function(data){
                    if(data.status==1){
                        that.backtime();
                        that.regSms.focus();
                        return false;
                    }
                    if(data.status==0){
                        that.showFn(data.info)
                        return false;
                    }
                },
                error:function (rs) {
                    that.showFn('系统罢工，请重试')
                }
            });
        },

        //切换成倒计时
        backtime : function(){
            var that = this;
            this.smsBtn.hide();
            this.countDown.show();
            this.clearTime = setInterval(function(){
                that.countDownFn();
            },1000);
        },

        //倒计时
        countDownFn : function(){
            this.countDown.text('重新发送('+ --this.num +')');
            if(this.num < 0){
                clearInterval(this.clearTime);
                this.smsBtn.show();
                this.countDown.hide();
                this.countDown.text('重新发送(60)');
                this.num = 60;
            }
        },

        //点击领取
        commitFn : function(){
            var that = this;
             $.ajax({
                url : '/mobile/activity/mobileCodeRegister',
                type : "post",
                dataType : "json",
                async : false,
                data : {
                    mobile : that.regMobile.val(),
                    mobile_code : that.regSms.val(),
                    is_dls : 1
                },
                success : function(data){
                    if(data.status == 1 || data.status == 2){
                        window.location = data.data;
                        return false;
                    }
                    if(data.status == 0){
                        that.showFn(data.info);
                        return false;
                    }
                },
                error:function (data) {
                    that.showFn("系统罢工，请重试");
                }
            });
        },

        //input失去焦点
        blurFn : function(){
            this.regMobile.blur();
            this.captch.blur();
            this.regSms.blur();
        }
    };
    new ReceiveFn();
});