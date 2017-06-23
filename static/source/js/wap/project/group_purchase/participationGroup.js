/**
 * @authors wanghuihui@51talk.com
 */
define("participationGroup",[""],function(require,exports,module){
    var GroupFn = function(){
        //level tab
        this.tabId = $('#tabId');
        //level 内容
        this.mainId = $('#mainId');
        //注册弹层tab
        this.regTabId = $('#regTabId');
        //注册
        this.registerId = $('#registerId');
        //登录
        this.loginId = $('#loginId');
        //注册手机号
        this.regPhone = $('#regPhone');
        //注册密码
        this.regPassword = $('#regPassword');
        //短信验证码
        this.smsCode = $('#smsCode');
        //短信验证码按钮
        this.getCode = $('#getCode');
        //发送验证码
        this.countDown = $('#countDown');
        //注册错误信息
        this.regError = $('#regError');
        //登录手机号
        this.loginPhone = $('#loginPhone');
        //登录密码
        this.loginPassword = $('#loginPassword');
        //登录错误信息
        this.loginError = $('#loginError');
        this.valPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
        //弹窗
        this.showtipssLayer = $('#showtipssLayer');
        this.showTips = $('#showTips');
        //弹窗内容
        this.contentId = $('#contentId');
        this.groupId = $('#groupId');
        this.productId = $('#productId');
        this.num = 60;
        this.partGroupBtn = $('#partGroupBtn');
        this.registerFrom = $('#registerFrom');
        this._event();
    };
    GroupFn.prototype = {
        _event : function(){
            var that = this;
            //获取设备高度
            this.documentHeight = $(window).height();
            //控制底部浮层显示隐藏
            
            $(document).on('scroll',function(){
                that.scrollTop = $(window).scrollTop();
                if(that.scrollTop >= 639){
                    that.partGroupBtn.addClass('fix-btn');
                }else{
                    that.partGroupBtn.removeClass('fix-btn');
                }
            });

            //判断是否是微信打开
            this.ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            if (this.ua.match(/MicroMessenger/i) == "micromessenger") {
                    //在微信中打开
                    this.showTips.css({'top':'0','margin-top':'0'});
            }
            
            //input获得焦点，错误信息清空
            this.showtipssLayer.find('input').on('focus',function(){
                $(this).parents('.r-content').find('.error').text('');
            });

            //点击空白处关闭弹窗
            this.showtipssLayer.on('touchend',function(){
                 $(this).addClass('hide');
                 that.clearInput();
            });
            this.showTips.on('touchend',function(event){
                var e=window.event || event;
                if(e.stopPropagation){
                    e.stopPropagation();
                }else{
                    e.cancelBubble = true;
                }
            });

            //tab
            this.tabId.find('li').on('touchend',function(){
                if(!$(this).hasClass('current')){
                    that.tabId.find('li').removeClass('current');
                    $(this).addClass('current');
                    that.mainId.find('div').addClass('hide');
                    that.mainId.find('div').eq($(this).index()).removeClass('hide');
                }
            });
 

            //弹层注册tab
            this.regTabId.find('li').on('touchend',function(){
                if($(this).hasClass('t-flag')){
                    that.regTabId.find('li').addClass('t-flag');
                    $(this).removeClass('t-flag');
                    that.contentId.find('.r-content').addClass('hide');
                    that.contentId.find('.r-content').eq($(this).index()).removeClass('hide');
                    that.contentId.find('.error').text('');
                }
            }); 

            //注册验证
            this.loginId.on('touchend',function(){
                that.vLogin = that.emptyFn(that.loginPhone,that.loginPassword,that.loginError);
                if(that.vLogin){
                    that.loginFn();
                }
            });

            //登录验证
            this.registerId.on('touchend',function(){
                that.vRegister = that.emptyFn(that.regPhone,that.regPassword,that.regError,that.smsCode);
                if(that.vRegister){
                    that.registerFn();
                }
            });  

            //获取短信验证码
            this.getCode.on('touchend',function(){
                that.vCode = that.emptyFn(that.regPhone,that.regPassword,that.regError);
                if(that.vCode){
                    that.smsFn();
                }
            });
           // 一键参团
            this.partGroupBtn.on('touchend',function(){
                that.group();
            });
        },
        
        //验证是否为空
        emptyFn : function(phone,passport,error,code){
            if(phone.val() == ''){
                error.text('请输入手机号');
            }else if(!this.valPhone.test(phone.val())){
                error.text('手机格式不正确');
            }else if(passport.val() == ''){
                error.text('请输入密码');
            }else if(code && code.val() == ''){
                error.text('请输入短信验证码');
            }else{
                return true;
            }
        },

        group : function(){
            var that = this;
            $.ajax({
                url : '/GroupBuy/registerOrLogin/',
                type : 'post',
                data : {
                    type : 'check'
                },
                dataType:"json",
                async:false,
                success : function(data){
                    if(data.status == 1){
                        window.location = '/GroupBuy/join?groupId='+ that.groupId.val();
                    }else{
                        that.showtipssLayer.removeClass('hide');
                    }
                }
            });
        },

        //清空input
        clearInput : function(){
            this.regPhone.val('');
            this.regPassword.val('');
            this.smsCode.val('');
            this.loginPhone.val('');
            this.loginPassword.val('');
        },

        //短信验证码请求
        smsFn : function(){
            var that = this;
            $.ajax({
                url:' /GroupBuy/sendSms/',
                type:"post",
                dataType:"json",
                async:false,
                data:{
                    mobile:this.regPhone.val()
                },
                success : function(data){
                    if(data.status==1){
                        that.backtime();
                        that.smsCode.focus();
                        return false;
                    }else{
                        that.regError.text(data.info);
                        return false;
                    }
                },
                error:function (rs) {
                    that.regError.text('系统开小差儿，请稍后再试');
                }
            });
        },

        //注册
        registerFn : function(){
            var that = this;
             $.ajax({
                url : '/GroupBuy/registerOrLogin/',
                type : "post",
                dataType : "json",
                async : false,
                data : {
                    mobile : that.regPhone.val(),
                    password : that.regPassword.val(),
                    mobileCode : that.smsCode.val(),
                    register_from : that.registerFrom.val(),
                    type : 'register'
                },
                success : function(data){
                    if(data.status ==1){
                        window.location = '/GroupBuy/join?groupId='+ that.groupId.val();
                        return false;
                    }else{
                        that.regError.text(data.info);
                    }
                },
                error:function (data) {
                    that.regError.text("系统开小差儿，请稍后再试");
                }
            });
        },

        //登录
        loginFn : function(){
            var that = this;
             $.ajax({
                url : '/GroupBuy/registerOrLogin/',
                type : "post",
                dataType : "json",
                async : false,
                data : {
                    mobile : that.loginPhone.val(),
                    password : that.loginPassword.val(),
                    type : 'login'
                },
                success : function(data){
                    if(data.status == 1){
                        window.location = '/GroupBuy/join?groupId='+ that.groupId.val();
                        return false;
                    }else{
                        that.loginError.text(data.info);
                    }
                },
                error:function (data) {
                    that.loginError.text("系统开小差儿，请稍后再试");
                }
            });
        },

       
        //切换成倒计时
        backtime : function(){
            var that = this;
            this.getCode.hide();
            this.countDown.show();
            this.clearTime = setInterval(function(){
                that.countDownFn();
            },1000);
        },
        
        //发送验证码倒计时
        countDownFn : function(){
            this.countDown.text('重新发送('+ --this.num +')');
            if(this.num < 0){
                clearInterval(this.clearTime);
                this.getCode.show();
                this.countDown.hide();
                this.countDown.text('重新发送(60)');
                this.num = 60;
            }
        }
    };
    new GroupFn();



    //开团倒计时
        var hour1 = $('#hour1'),
            hour2 = $('#hour2'),
            minute1 = $('#minute1'),
            minute2 = $('#minute2'),
            second1 = $('#second1'),
            second2 = $('#second2'),
            timestamp = new Date($('#nowTimeId').val()).getTime(),
            time_end = new Date($('#timeId').val()).getTime(), 
            value = (time_end - timestamp)/1000,
            intDiff = parseInt(value); //倒计时总秒数量
       
        function timer(intDiff) {
          window.setInterval(function () {
            var day = 0,
              hour = 0,
              minute = 0,
              second = 0,
              hour_1 = '0',
              hour_2 = '0',
              minute_1 = '0',
              minute_2 = '0',
              second_1 = '0',
              second_2 = '0';
            if (intDiff > 0) {
              hour = Math.floor(intDiff / (60 * 60));
              if(String(hour).split('').length == 1){
                hour_1 = 0;
                hour_2 = String(hour).split('')[0];
              }else{
                hour_1 = String(hour).split('')[0];
                hour_2 = String(hour).split('')[1];
              }
              
              minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
              if(String(minute).split('').length == 1){
                minute_1 = 0;
                minute_2 = String(minute).split('')[0];
              }else{
                minute_1 = String(minute).split('')[0];
                minute_2 = String(minute).split('')[1];
              }

              second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
              if(String(second).split('').length == 1){
                second_1 = 0;
                second_2 = String(second).split('')[0];
              }else{
                second_1 = String(second).split('')[0];
                second_2 = String(second).split('')[1];
              }

            }
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            hour1.html(hour_1);
            hour2.html(hour_2);

            minute1.html(minute_1);
            minute2.html(minute_2);

            second1.html(second_1);
            second2.html(second_2);
            intDiff--;
          }, 1000);
        }
        timer(intDiff);
});
