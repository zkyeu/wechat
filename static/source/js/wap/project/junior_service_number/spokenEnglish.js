/**
 * @authors wanghuihui@51talk.com
 */
define("spokenEnglish",[""],function(require,exports,module){
    var ClassFn = function(){
        //立即抢购悬浮层
        this.purchaseId = $('#purchaseId');
        //班级隐藏域
        this.gradeId = $('#gradeId');
        //选择班级下拉列表
        this.selectId = $('#selectId');
        //立即抢购
        this.payId = $('#payId');
        //短信验证码按钮
        this.codeBtn = $('#codeBtn');
        //手机号
        this.phoneId = $('#phoneId');
        //图片验证码
        this.imgCode = $('#imgCode');
        //短信验证码
        this.smsCode = $('#smsCode');
        this.valPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
        //倒计时
        this.countDown = $('#countDown');
        this.registerFrom = $('#register_from'); 
        this.num = 60;
        this._event();
    };
    ClassFn.prototype = {
        _event : function(){
            var that = this;
            //获取设备高度
            this.documentHeight = $(window).height();
            //控制底部浮层显示
            $(document).on('scroll',function(){
                that.scrollTop = $(window).scrollTop();
                if(that.scrollTop >= that.documentHeight){
                    that.purchaseId.show();
                }else{
                    that.purchaseId.hide();
                }
            });

            //获取班级value
            this.selectId.on('change',function(){
                that.gradeId.val($(this).attr('value'));
            });

            //获取短信验证码，验证信息
            this.codeBtn.on('touchend',function(){
                //that.blurFn();
                if(that.phoneId.val() == ''){
                    alert('请输入手机号');
                }else if(!that.valPhone.test(that.phoneId.val())){
                    alert('请输入正确的手机号')
                }else if(that.imgCode.val() == ''){
                    alert('请输入图片验证码');
                }else{
                    that.smsFn();
                }
            });
            $('#verifycode').on('touchend',function(){
                $(this).attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
            });
            //立即注册，验证信息
            this.payId.on('touchend',function(){
                that.blurFn();
                if(that.phoneId.val() == ''){
                    alert('请输入手机号');
                }else if(!that.valPhone.test(that.phoneId.val())){
                    alert('请输入正确的手机号')
                }else if(that.imgCode.val() == ''){
                    alert('请输入图片验证码');
                }else if(that.smsCode.val() == ''){
                    alert('请输入短信验证码');
                }else if(that.gradeId.val() == ''){
                    alert('请选择孩子年级');
                }else{
                    that.commitFn();
                }
            });
        },

        //短信验证码请求
        smsFn : function(){
            var that = this;
            $.ajax({
                url:'http://www.51talk.com/passport/getMobileCode',
                type:"get",
                dataType:"jsonp",
                async:false,
                data:{
                    mobile:this.phoneId.val(),
                    authCode:this.imgCode.val(),
                    type:'reg_or_login'
                },
                success : function(data){
                    if(data.status==1){
                        that.backtime();
                        that.smsCode.focus();
                        return false;
                    }else{
                        if(data.status==2){
                            $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                        }
                        alert(data.info);
                        return false;
                    }
                },
                error:function (rs) {
                    alert('系统开小差儿，请稍后再试')
                }
            });
        },

        //立即抢购请求
        commitFn : function(){
            var that = this;
             $.ajax({
                url : '/ajax/mobileCodeRegister',
                type : "post",
                dataType : "json",
                async : false,
                data : {
                    mobile : that.phoneId.val(),
                    mobile_code : that.smsCode.val(),
                    grade : that.gradeId.val(),
                    register_from : that.registerFrom.val()
                },
                success : function(data){
                    if(data.status == 1 || data.status == 2){
                        window.location = data.data;
                        return false;
                    }
                    if(data.status == 0){
                        alert(data.info);
                        return false;
                    }
                },
                error:function (data) {
                    alert("系统开小差儿，请稍后再试");
                }
            });
        },

        //input失去焦点
        blurFn : function(){
            this.phoneId.blur();
            this.imgCode.blur();
            this.smsCode.blur();
        },

        //切换成倒计时
        backtime : function(){
            var that = this;
            this.codeBtn.hide();
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
                this.codeBtn.show();
                this.countDown.hide();
                this.countDown.text('重新发送(60)');
                this.num = 60;
            }
        },
    };
    new ClassFn();
});
