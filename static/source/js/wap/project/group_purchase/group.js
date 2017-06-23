/**
 * @authors wanghuihui@51talk.com
 */
define("group",[""],function(require,exports,module){
    var GroupFn = function(){
        this.topBuy = $('#topBuy');
        this.bBuy = $('#bBuy');
        //拼团人数
        this.groupNum = $('#groupNum');
        //底部拼团按钮
        this.groupBuy = $('#groupBuy');
        //选择拼团人数
        this.choseClass = $('#choseClass');
        //单独购买按钮遮罩
        this.mask = $('#mask');
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
        //底部浮层
        this.flooerId = $('#flooerId');
        //一键拼团按钮
        this.groupBtnId = $('#groupBtnId');

        this.registerFrom = $('#registerFrom');
        this.productId = $('#productId');
        this.sureBtn = $('#sureBtn');
        this.closeBtn = $('#closeBtn');
        this.sinBuy = $('#sinBuy');

        this.num = 60;


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
                if(that.scrollTop >= that.documentHeight){
                    that.flooerId.show();
                    that.showClassFn(); 
                    return false;
                }else{
                    that.flooerId.hide();
                }
            });

            //判断是否是微信打开
            this.ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            if (this.ua.match(/MicroMessenger/i) == "micromessenger") {
                    //在微信中打开
                    this.showTips.css({'top':'0','margin-top':'0'});
            }

            //选择拼团人数
            this.choseClassFn(this.topBuy);
            this.choseClassFn(this.bBuy);

            //input获得焦点，错误信息清空
            this.showtipssLayer.find('input').on('focus',function(){
                $(this).parents('.r-content').find('.error').text('');
            });

            //点击空白处关闭弹窗
            this.showtipssLayer.on('touchend',function(){
                $(this).addClass('hide');
                that.mask.addClass('hide');
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
            //一键开团
            this.groupBtnId.on('touchend',function(){
                that.group();
            });
            this.sureBtn.on('touchend',function(){
                that.group();
                that.choseClass.addClass('hide');
            });
            //单独购买
            this.sinBuy.on('touchend',function(){
                that.group(true);
            });

            //关闭选择类型弹窗
            this.closeBtn.on('touchend',function(){
                that.choseClass.addClass('hide');
            });
        },
        //选择开团人数
        choseClassFn : function(ele){
            var that = this;
            ele.find('div').find('span').on('touchend',function(){
                if(!$(this).hasClass('current')){
                    that.topBuy.find('span').removeClass('current');
                    that.bBuy.find('span').removeClass('current');
                    that.indexNumber = $(this).parent().index();
                    that.topBuy.find('div').eq(that.indexNumber).find('span').addClass('current')
                    that.bBuy.find('div').eq(that.indexNumber).find('span').addClass('current')
                    that.groupNum.val($(this).attr('data-num'));
                }
            });

        },
        showClassFn:function(){
            var that = this;
            that.groupBuy.off('touchend').on('touchend',function(){
                that.choseClass.removeClass('hide');
                return false;
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

        group : function(flag){
            var that = this;
            if(flag){
                this.locationHref = '/GroupBuy/buy';
            }else{
                this.locationHref = '/GroupBuy/open';
            }
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
                        window.location = that.locationHref + '?productId='+ that.productId.val()+'&groupType='+that.groupNum.val();
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
                        window.location = '/GroupBuy/open?productId='+ that.productId.val()+'&groupType='+that.groupNum.val();
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
                    register_from : that.registerFrom.val(),
                    type : 'login'
                },
                success : function(data){
                    if(data.status == 1){
                        window.location = '/GroupBuy/open?productId='+ that.productId.val()+'&groupType='+that.groupNum.val();
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
        
        //倒计时
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
});
