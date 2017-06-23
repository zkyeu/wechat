/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2017-02-17 12:10:30
 * @version 1.0.0
 */
define(function(require, exports, module) {
    require('jweixin-1.0.0');
    var upload = require('uploadvideo');
    var wait = 120;
    //页面元素
    var j_modal_box = $('#j_modal_box');
    var j_login_form = $('#j_login_form');
    var j_reg_form = $('#j_reg_form');
    var j_login_info = $('#j_login_info');
    var j_reg_info = $('#j_reg_info');

    /*添加推荐英文名2*/
    var regs = {
        regMobile: /^1[0-9]{10}$/,
        regPass: /^([\w\+\!\@\#\$\%\^\&\*\(\)]{6,20})$/
    }

    //去空格
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    // 我要参赛按钮
    $('#j_join_btn,#j_banner_join').click(function() { 
        var loginStatus = $('#j_login_status').val();
        if (loginStatus == 0) {
            j_modal_box.removeClass('hide');
            j_login_form.removeClass('hide');
        } else {
            location.href = $('#j_join_btn').attr('data-url');
        }
    });

    $("#intro p").click(function(){
        $(this).hide();
        $(this).next().removeClass("hide");
    });

    // 登陆验证
    $("#j_reg_btn").click(function() {
        var j_mobile = $("#j_reg_form input[name='mobile']");
        var j_mobile_code = $("#j_reg_form input[name='mobile_code']");
        var j_password = $("#j_reg_form input[name='password']");

        var mobile = j_mobile.val().trim();
        var mobile_code = j_mobile_code.val().trim();
        var password = j_password.val().trim();
        var recommen_mobile = $("#intro input").val();


        if (mobile == '') {
            showErrorTip(j_reg_info, '请填写手机号', j_mobile);
            return false;
        } else if (!regs.regMobile.test(mobile)) {
            showErrorTip(j_reg_info, '请填写正确的手机号码', j_mobile);
            return false;
        } else if (mobile_code == '') {
            showErrorTip(j_reg_info, '请填写验证码', j_mobile_code);
            return false;
        } else if (password == "") {
            showErrorTip(j_reg_info, '密码不能为空', j_password);
            return false;
        } else if (!regs.regPass.test(password)) {
            showErrorTip(j_reg_info, '密码为6-20位字母数字组合', j_password);
            return false;
        }

        hideErrorTip(j_reg_info);

        $.ajax({
            type: 'post',
            url: '/ajax/mobileCodeRegister',
            data: {
                mobile: mobile,
                mobile_code: mobile_code,
                password: password,
                recommen_mobile : recommen_mobile
            },
            dataType: 'json',
            success: function(data) {
                // console.log("注册信息===" + JSON.stringify(data));
                if (data.status == 0) {
                    // alert(data.info);
                    showErrorTip(j_reg_info, data.info);
                } else {
                    location.href = $('#j_join_btn').attr('data-url');
                }
            },
            error: function() {
                alert('网络异常，请稍后重试');
            }
        });
    });

    // 验证码获取倒计时
    function time(o) {
        if (wait == 0) {
            o.removeClass("y_code_down");
            o.text("获取验证码");
            wait = 120;
        } else {
            o.addClass("y_code_down");
            o.text(wait + "s");
            wait--;
            setTimeout(function() {
                time(o);
            }, 1000);
        }
    };

    $("#j_getCode").click(function() {
        if ($(this).hasClass("y_code_down")) return false;
        var index = $(this);
        var j_mobile = $("#j_reg_form input[name='mobile']");
        var mobile = j_mobile.val().trim() || "";

        if (mobile == '') {
            showErrorTip(j_reg_info, '请填写手机号', j_mobile);
            return false;
        } else if (!regs.regMobile.test(mobile)) {
            showErrorTip(j_reg_info, '请填写正确的手机号码', j_mobile);
            return false;
        }

        hideErrorTip(j_reg_info);

        $.ajax({
            url: '/ajax/sendSms',
            data: {
                mobile: mobile
            },
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.status == 0) {
                    showErrorTip(j_reg_info, data.info);
                } else {
                    time(index);
                }
            },
            error: function() {
                alert('网络异常，短信发送失败');
            }
        });
    });
    $("#j_getCodes").click(function() {
        if ($(this).hasClass("y_code_down")) return false;
        var index = $(this);
        var j_mobile = $("#j_reg_form input[name='mobile']");
        var mobile = j_mobile.val().trim() || "";
        var imgCode = $('#authCode').val();
        if (mobile == '') {
            showErrorTip(j_reg_info, '请填写手机号', j_mobile);
            return false;
        } else if (!regs.regMobile.test(mobile)) {
            showErrorTip(j_reg_info, '请填写正确的手机号码', j_mobile);
            return false;
        }else if(!imgCode||(imgCode.length && imgCode.length<1)){
            showErrorTip(j_reg_info, "请填写验证码");
            return false;

        }

        hideErrorTip(j_reg_info);

        $.ajax({
            type:"GET",
            dataType:"jsonp",
            url: "http://www.51talk.com/passport/getMobileCode",
            data: {
                mobile: mobile,
                authCode:imgCode
            },
           
            success: function(data) {
                if (data.status == 0) {
                    showErrorTip(j_reg_info, data.info);
                    
                }else if(data.status==2){
                     showErrorTip(j_reg_info, data.info);
                    $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                }else {
                    time(index);
                }
            },
            error: function() {
                alert('网络异常，短信发送失败');
            }
        });
    });

    // 立即注册
    $("#j_reg_link").click(function() {
        j_login_form.find(".f-item input.f-text").val('');
        j_reg_form.removeClass('hide');
        j_login_form.addClass('hide');
    });

    //立即登录
    $("#j_login_link").click(function() {
        j_reg_form.find(".f-item input.f-text").val('');
        j_reg_form.addClass('hide');
        j_login_form.removeClass('hide');
    });

    // 注册验证
    $("#j_login_btn").click(function() {

        var j_user_name = $("#j_login_form input[name='user_name']");
        var j_password = $("#j_login_form input[name='password']");
        var user_name = j_user_name.val().trim();
        var password = j_password.val().trim();

        if (user_name == '') {
            showErrorTip(j_login_info, '请填写手机号', j_user_name);
            return false;
        } else if (!regs.regMobile.test(user_name)) {
            showErrorTip(j_login_info, '请填写正确的手机号码', j_user_name);
            return false;
        } else if (password == "") {
            showErrorTip(j_login_info, '密码不能为空', j_password);
            return false;
        } else if (!regs.regPass.test(password)) {
            showErrorTip(j_login_info, '密码为6-20位字母数字组合', j_password);
            return false;
        }

        hideErrorTip(j_login_info);

        $.ajax({
            type: 'post',
            url: '/ajax/ajaxLogin',
            data: {
                user_name: user_name,
                password: password
            },
            dataType: 'json',
            success: function(data) {
                // console.log("登录信息===" + JSON.stringify(data));
                if (data.status == 0) {
                    //alert(data.info);
                    showErrorTip(j_login_info, data.info);
                } else {
                    location.href = $('#j_join_btn').attr('data-url');
                }
            },
            error: function() {
                alert('网络异常，请稍后重试');
            }
        });
    });

    //显示错误提示
    function showErrorTip(infoEle, error, inputEle) {
        $('.f-text-error').removeClass('f-text-error');
        if (inputEle != undefined) {
            inputEle.addClass('f-text-error');
        }
        infoEle.html(error).removeClass('hide');
    }

    function hideErrorTip(infoEle) {
        $('.f-text-error').removeClass('f-text-error');
        infoEle.addClass('hide').html('');
    }

    //提示框
    $('.d-modal').on('click', function(e) {
        var target = $(e.target);
        if (target.closest(".tip").length == 0 || target.hasClass('close')) {
            $(this).addClass("hide");
            $(this).find('.tip').addClass('hide');
        }
    });
     //低版本浏览器有提示
    (function($){
        if ($.browser.msie  && parseInt($.browser.version, 10) < 10) {
            alert("您当前的浏览器版本过低，为保障信息完整展示，建议立即升级浏览器!");
        } 
    })(jQuery);
    //年级切换
    $(".vedio_nav li").on("click",function(){
        var index=$(this).index();
        var _this=$(this);
        if($(".vedio_nav").attr("data-sta")==1){
            _this.addClass("active").siblings().removeClass("active");
        }else if($(".vedio_nav").attr("data-sta")==0){
            _this.find("a").addClass("active").parent().siblings().find("a").removeClass("active");
        }
        $(".vedio_main").find(".vedio_foot").eq(index).show().siblings().hide();
        return false;
    });
    //分享
    $(".shareEntryLoad").on("click",function(){
         $(".share_mask,.shareList_center").removeClass("hide");
    });
    $(".share_mask").on("click",function(){
        $(".share_mask,.shareList_center,.shareTo").addClass("hide");
    });
    $(".shareEntry").on("click",function(){
        $(".shareList").addClass("animated side");
    });
    //播放
    $(".picVideo video,.picVideo .player").on("click",function(){
        var oSrc=$(".picVideo video").find("source").attr("src");
       // console.log(oSrc);
        var oVideo=$(".video_mask").find(".videoMain").get(0);
        $(".video_mask").show();
        $(".video_mask").find(".videoMain").find("source").attr("src",oSrc);
        $(".video_mask").find(".videoMain").get(0).autoplay=true;
        $(".video_mask").find(".videoMain").show().get(0).load();
    });
    $("video").parent(".video_mask").on("click",function(){
        $(this).hide();
        $(this).find("video").get(0).pause();
    });
    //上传视频
    $(".startUpload").on("click",function(){
        $(".upload_module").show();
    });
    function stopBubble(e) {
        if (e && e.stopPropagation) {  
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
    }
    $(".video_mask").on("click",function(e){
        $(this).hide();
        $(this).closest("video").hide();
    });
    $(".videoMain").on("click",function(){
            stopBubble();
    });

    //上传窗口
    $(".upload_module").on("click",function(event){
        $(".progress").hide().html("");
        $(".upload_module").hide();
    });
    $(".uploadIn .main,.uploadIn .stsOut").on("click",function(event){
        event.stopPropagation();
        return;
    })
    $(".upload_module").find(".uploadIn").on("click",function(e){ 
        stopBubble();
    });

    //点击上传视频做格式判断并且显示进度条
    var nameVal=$(".inputbox").val();
    if ($("#fileToUpload").length>0) {
        var uploadvideo = new upload({
            fileElement: "#fileToUpload",
            nameVal: nameVal,
            form: "#videoForm",
            bar: {
                show: true,
                barele: ".bar"
            }
        });

    }
    
    //搜索
    $(".default .searchBtn").on("click",function(){
        $(this).parent(".default").hide();
        $(this).parent(".default").siblings(".searching").show();
    });
    function searching(){ 
        var searVal=$(".searBox").val();
        $("#videoForm").submit();
          
    }
    $(".searching .searchBtn").on("click",function(){
        searching();
    });
    //判断搜索状态并控制搜索框样式
    var searStatus=$(".search_box").attr("search_status");
    if(searStatus==1){
        $(".search_box").find(".default").hide();
        $(".search_box").find(".default").siblings(".searching").show();
    }else if(searStatus==0){
        return false;
    }
    //分享出去
    var shareTitle="我家宝贝正在参加51Talk之星演讲比赛，喜欢的给点个赞呗！";
    var shareContent={
        shareContent_sina:"#我家宝贝正在参加51Talk之星演讲比赛，喜欢的给点个赞呗！#，助我赴美国与精英面对面！赢百万奖学金！猛戳 @51Talk无忧英语网，领取大奖吧",
        shareContent_other:"快看我在2017年第一届51Talk之星大赛复赛的精彩表演，助我赴美国与精英面对面！赢百万奖学金！"
    };
    var shareUrl="http://wap.51talk.com/activity/shareSpeechVideo?vid="+$(".shareEntry").attr("share_vid");
    var sharePic="http://static.51talk.com/static/images/wap/speech_20170410/shareImg.jpg";    
    function SetShareUrl(cmd, config) {   
         config.bdDesc = (cmd == "tsina" ? shareContent.shareContent_sina : shareContent.shareContent_other);         
         config.bdText = (cmd == "tsina" ? shareContent.shareContent_sina : shareTitle);
        return config;
    }

    var wx_tit = shareTitle;
    var wx_des =shareContent.shareContent_other; 
    var wx_img = sharePic;
    var wx_link = shareUrl;
    
    if ($("#sharePage").length > 0 && $(".shareEntry").attr("is_weixin") == 1) {
       
        $(".o_weixin,.o_sqq,.o_tsina,.o_qzone").on("click",function(){
             $(".shareList_center").addClass("hide");
             $(".shareTo").removeClass("hide").addClass("animated fadeIn");
        });
        $.ajax({
            url: "/Ajax/smallBeauty",
            type: "post",
            dataType: "json",
            success: function(res) {
                wx.config({
                    debug: false,
                    appId: res.data.appId,
                    timestamp: res.data.timestamp,
                    nonceStr: res.data.nonceStr,
                    signature: res.data.signature,
                    jsApiList: ['checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'openCard'
                    ]
                });

                wx.ready(function() {
                    wx.onMenuShareAppMessage({  //分享给朋友
                        title: wx_tit,
                        desc: wx_des,
                        link: wx_link,
                        imgUrl: wx_img
                    });
                    wx.onMenuShareQQ({ //qq
                        title: wx_tit,
                        desc: wx_des,
                        link: wx_link,
                        imgUrl: wx_img
                    });
                    wx.onMenuShareTimeline({  //朋友圈
                        title: wx_tit,
                        desc: wx_des,
                        link: wx_link,
                        imgUrl: wx_img
                    });
                    wx.onMenuShareQZone({  //qq空间
                        title: wx_tit,
                        desc: wx_des,
                        link: wx_link,
                        imgUrl: wx_img
                    });
                    wx.onMenuShareWeibo({  //微博
                        title: wx_tit,
                        desc: shareContent.shareContent_sina,
                        link: wx_link,
                        imgUrl: wx_img
                    });

                });
            }
        });
    }else{
        window._bd_share_config = {
            common: {
                bdText: shareTitle,
                bdDesc: '',
                bdUrl: shareUrl,
                bdPic: sharePic,
                onBeforeClick: SetShareUrl
            },
            share: [{
                "bdSize": 32
            }]
        }

        with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];


    }

});