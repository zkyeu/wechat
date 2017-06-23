/**
 * @authors wanghuihui@51talk.com
 */
define("bind",[""],function(require, exports, module) {
    var BindFn = function(){
        //头部
        this.header = $('._header');
        //尾
        this.footer = $('._footer');
        //内容
        this.main = $('._main');
        //遮罩
        this.maskId = $('#maskId')
        //弹窗
        this.prompId = $('#prompId');
        //绑定按钮
        this.bindId = $('#bindId');

        //用户名密码input
        this.userId = $('#userId');
        this.passwordId = $('#passwordId');

        //关闭按钮
        this.closeId = $('#closeId');
        //弹窗文案
        this.textId = $('#textId');
        //请求参数
        this.openId = $('#openId');
        //弹窗图片
        this.prompImg = $('#prompImg');
        //倒计时
        this.timeValue = 3;
        this._event();
    }
    BindFn.prototype = {
        _event : function(){
            var that = this;
            //背景填充
            this.bgFn();
            //判断是否绑定过
            if(is_bind){
                this.promptShow('您的微信已绑定不可重复绑定哦','img3');
                this.closeFn();
                setTimeout(function(){
                    wx.closeWindow();
                },1000);
            }
            //绑定按钮
            this.bindId.on('touchend',function(){
                that.userId.blur();
                that.passwordId.blur();
                if(that.userId.val() == '' || that.passwordId.val() == ''){
                    that.promptShow('账号和密码不能为空','img1');
                }else if(!that.isPhone(that.userId.val()) && !that.isEmail(that.userId.val())){
                    that.promptShow('用户名格式不正确','img1');
                }else{
                    //发请求
                    that.bindAjaxFn();
                }
            });
            //弹窗关闭按钮
            this.closeId.on('touchend',function(){
                that.promptHide();
            });
        },
        //绑定请求
        bindAjaxFn : function(){
            var that = this;
            $.ajax({
                type : 'POST',
                url : '/mobile/WXService/ajaxBind',
                data : {
                    username : this.userId.val(),
                    password : this.passwordId.val(),
                    open_id : this.openId.val()
                },
                dataType : 'json',
                success : function(data){
                    //绑定是否成功
                    if(data.status == 1){
                        that.promptShow('','img2');
                        that.textId.text('绑定成功，'+ that.timeValue-- +'关闭窗口');
                        that.clearTime = setInterval(function(){
                            that.setTimeFn();
                        },1000);
                        //关闭弹窗
                        that.closeFn();
                    }else{
                        that.promptShow(data.info,'img1');
                    }
                }
            });
        },
        //关闭弹窗
        closeFn : function(){
            var that = this;
            this.closeId.on('touchend',function(){
                if(is_bind != true){
                    clearTimeout(that.clearTime);
                    that.timeValue = 3;
                }
                wx.closeWindow();
            });
        },
        //适配背景
        bgFn : function(){
            this.mainHeight = $(window).height() - this.header.height() - this.footer.height();
            this.main.height(this.mainHeight);
            this.footer.css('opacity','1');
        },
        //弹窗显示
        promptShow : function(text,val){
            this.prompImg.addClass(val);
            this.maskId.show();
            this.prompId.show();
            this.maskId.css('opacity','0.5');
            this.textId.text(text);
        },
        //弹窗隐藏
        promptHide : function(){
            this.maskId.hide();
            this.prompId.hide();
            this.textId.text('');
        },
        //倒计时设置
        setTimeFn : function(){
            var that = this;
            this.textId.text('绑定成功，'+ this.timeValue-- +'关闭窗口');
            if(this.timeValue < 0){
                clearTimeout(this.clearTime);
                that.timeValue = 3;
                wx.closeWindow();
            }
        },
        //邮箱验证
        isEmail : function(str){
            var reg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
            return reg.test(str);
        },
        //手机号验证
        isPhone : function(str){
            var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
            return reg.test(str);
        }
    }
    new BindFn();
});
