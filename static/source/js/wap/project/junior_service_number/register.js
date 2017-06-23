/**
 * Created by zhangnan on 2016/12/19.
 */
define(function(require,exports,module){
    var valPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
    var regMobile = $("#regMobile");//手机号
    var captchImg = $('#captchImg');//图片验证码
    var captch = $('#captch');//获取图片验证码
    var regSms = $("#regSms");//短信验证码
    var smsBtn = $("#smsBtn");//获取短信按钮
    var commitBtn = $("#commitBtn");//领取按钮

    //监听手机号
    $("#regMobile").keyup(function () {

        if(captch.val().length >= 4 && valPhone.test(regMobile.val())){
            // smsBtn.removeAttr("disabled");
            smsBtn.css("backgroundColor","#ff5a00");
        }else {
            // smsBtn.attr("disabled","disabled");
            smsBtn.css("backgroundColor","#ffae00");
        }
    }).focus(function () {
    });

    //监听验证码
    captch.keyup(function () {
        if(captch.val().length >= 4 && valPhone.test(regMobile.val())){
            // smsBtn.removeAttr("disabled");
            smsBtn.css("backgroundColor","#ff5a00");
        }else {
            // smsBtn.attr("disabled","disabled");
            smsBtn.css("backgroundColor","#ffae00");
        }
    });

    //验证码控制
    var imgUrl = '/mobile/activity/verify';
    // $("#captchImg").html('<img src="'+ imgUrl +'" class="captchaId">');

    $(".captchaId").on('tap',function(){
        this.src = imgUrl +'?'+ Math.random();
    });

    //重置手机号
    // $("#resetMobile").click(function () {
    //     $("#regMobile").val('');
    //     smsBtn.attr("disabled","disabled");
    //     smsBtn.css("color","#ddd");
    //     regMobile.focus();
    //     $("#resetMobile").hide();
    //     double12App_registerBtn.css("background","#ddd");
    // });

    //监听短信验证码
    $("#regSms").keyup(function () {
        if(regSms.val().length){
            // $("#resetSms").show();
        }
        if(regSms.val().length > 3 && valPhone.test(regMobile.val())){
            // commitBtn.removeAttr("disabled");
            commitBtn.css("backgroundColor","#ff5a00")
        }else{
            // smsBtn.attr("disabled","disabled");
            commitBtn.css("backgroundColor","#ffae00");
        }

    }).focus(function () {
        $("#resetMobile").hide();
        if(regSms.val().length){
            // $("#resetSms").show();
        }
    });

    //重置短信验证码
    // $("#resetSms").click(function () {
    //     $("#regSms").val('');
    //     regSms.focus();
    //     $("#resetSms").hide();
    //     double12App_registerBtn.css("background","#ddd");
    // });

    // {status:1,info:'aaaa',data:''}
    //获取短信验证码
    $("#smsBtn").click(function () {
        if(regMobile.val() && regMobile.val().length>0 && !valPhone.test(regMobile.val())){
            $(".showtips_layer").show();
            $(".showtips span").text("手机号码不对");
            return;
        }else if(captch.val().length<4){
            return;
        }
        $.ajax({
            url:'/mobile/activity/sendSmsNew',
            // url:'/templates/a.json',
            type:"post",
            dataType:"json",
            async:false,
            data:{
                mobile:regMobile.val(),
                verify_code:captch.val()
            },
            success : function(data){
                if(data.status==1){
                    // $(".captchaId").click();
                    backtime();
                    regSms.focus();
                    return false;
                }

                if(data.status==0){
                    $(".captchaId").triggerHandler("tap");
                    $(".showtips_layer").show();
                    $(".showtips span").text(data.info);
                    return false;
                }
            },
            error:function (rs) {
                $(".showtips_layer").show();
                $(".showtips span").text("系统罢工，请重试");
            }
        });

        function backtime() {
            var count = 60;
            var intv = setInterval(function () {
                if(count>1){
                    count--;
                    smsBtn.attr("disabled","disabled")
                    smsBtn.css("color","#ddd")
                    smsBtn.text("重新发送(" + count+")")
                }else{
                    clearInterval(intv);
                    smsBtn.removeAttr("disabled");
                    smsBtn.css("color","#ffffff;");
                    smsBtn.text("重新发送");
                }
            },1000);
        }

    });

    //立即抢购按钮
    commitBtn.click(function () {
        // if(!(regSms.val().length > 3 && valPhone.test(regMobile.val()))){
        //     return;
        // }
        if(!valPhone.test(regMobile.val()) ){
            $(".showtips_layer").show();
            $(".showtips span").text("手机号码不对");
            return;
        }
        $.ajax({
            url:'/mobile/activity/mobileCodeRegister',
            // url:'/templates/b.json',//0都发   ！0 没注册发送
            type:"post",
            dataType:"json",
            async:false,
            data:{
                mobile:regMobile.val(),
                mobile_code:regSms.val(),
                type:5
                // act:act.val()
            },
            success : function(data){
                if(data.status == 1 || data.status == 2){
                    window.location = data.data;
                    // switchStatus('success');
                    return false;
                }
                // if(data.status == 2){
                //     window.location = 'failure.html';
                //     // switchStatus();
                //     return false;
                // }
                if(data.status == 0){
                    // switchStatus('success');
                    $(".showtips_layer").show();
                    $(".showtips span").text(data.info);
                    // $(".captchaId").click();
                    return false;
                }
            },
            error:function (data) {
                $(".showtips_layer").show();
                $(".showtips span").text("系统罢工，请重试");
            }
        });

    });

    //返回信息弹层
    $("#closeLayer").click(function () {
        $(".captchaId").click();
        $(".showtips_layer").hide();
    });

    //切换页面状态
    function switchStatus(name){
        var headerNormal = $('.header');
        var headerSuccess= $('.header-success');
        var formContainer = $('#form-container');
        var advContent = $('.adv-cont');
        var hotArticle = $('.hot-article');
        var content = $('#content');
        var userCont = $('.user');
        var repeatTips = $('#repeat-tips');
        var logoCont = $('.logo');

        if( name == 'login'){
            headerNormal.show();
            headerSuccess.hide();
            advContent.show();
            hotArticle.hide();
            formContainer.show();userCont.show();repeatTips.hide();logoCont.show();
            content.removeClass('content-bg1');
        }else if(name == 'success'){
            headerNormal.hide();
            headerSuccess.show();
            advContent.hide();
            hotArticle.show();
            formContainer.hide();userCont.hide();repeatTips.hide();logoCont.hide();
            content.addClass('content-bg1');
        }else{
            headerNormal.show();
            headerSuccess.hide();
            advContent.hide();
            hotArticle.show();
            formContainer.hide();userCont.hide();repeatTips.show();logoCont.hide();
            content.removeClass('content-bg1');
        }

    }
    window.switchStatus = switchStatus;
});
