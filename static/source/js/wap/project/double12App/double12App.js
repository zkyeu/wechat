/**
 * Created by li on 2016/11/29.
 */
define(function(require,exports,module){
    var valPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
    var regMobile = $("#regMobile");//手机号
    var captchImg = $('#captchImg');//图片验证码
    var captch = $('#captch');//获取图片验证码
    var regSms = $("#regSms");//短信验证码
    var smsBtn = $("#smsBtn");//获取短信按钮
    var double12App_registerBtn = $("#double12App_registerBtn");//注册按钮
    var resetMobile = $("#resetMobile");
    var resetSms = $("#resetSms");

    //监听手机号
    $("#regMobile").keyup(function () {
        if(regMobile.val().length>0){
            $("#resetMobile").show();
        }else {
            $("#resetMobile").hide();
        }

        if(captch.val().length >= 4 && valPhone.test(regMobile.val())){
            smsBtn.removeAttr("disabled");
            smsBtn.css("color","#ff8200");
        }else {
            smsBtn.attr("disabled","disabled");
            smsBtn.css("color","#ddd");
        }
    }).focus(function () {
        if(regMobile.val().length){
            $("#resetMobile").show();
        }
        $("#resetSms").hide();
    });

    //监听验证码
    captch.keyup(function () {
        if(captch.val().length >= 4 && valPhone.test(regMobile.val())){
            smsBtn.removeAttr("disabled");
            smsBtn.css("color","#ff8200");
        }else {
            smsBtn.attr("disabled","disabled");
            smsBtn.css("color","#ddd");
        }
    });

    //验证码控制
    var imgUrl = '/ajax/verify';
    $("#captchImg").html('<img src="'+ imgUrl +'" class="captchaId">');

    $(".captchaId").on('tap',function(){
        this.src = imgUrl +'?'+ Math.random();
    });
    
    //重置手机号
    $("#resetMobile").click(function () {
        $("#regMobile").val('');
        smsBtn.attr("disabled","disabled");
        smsBtn.css("color","#ddd");
        regMobile.focus();
        $("#resetMobile").hide();
        double12App_registerBtn.css("background","#ddd");
    });

    //监听短信验证码
    $("#regSms").keyup(function () {
        if(regSms.val().length){
            $("#resetSms").show();
        }
        if(regSms.val().length > 3 && valPhone.test(regMobile.val())){
            double12App_registerBtn.css("background","#ff8200")
        }else{
            double12App_registerBtn.css("background","#ddd");
        }

    }).focus(function () {
        $("#resetMobile").hide();
        if(regSms.val().length){
            $("#resetSms").show();
        }
    });

    //重置短信验证码
    $("#resetSms").click(function () {
        $("#regSms").val('');
        regSms.focus();
        $("#resetSms").hide();
        double12App_registerBtn.css("background","#ddd");
    });

    //获取短信验证码
    $("#smsBtn").click(function () {
        $.ajax({
            url:'/ajax/sendSmsNew/0',
            type:"post",
            dataType:"json",
            async:false,
            data:{
                mobile:regMobile.val(),
                verify_code:captch.val()
            },
            success : function(data){
                if(data.status==1){
                    $(".captchaId").click();
                    backtime();
                    regSms.focus();
                    return false;
                }

                if(rs.status==0){
                    $(".captchaId").triggerHandler("tap");
                    $(".showtips_layer").show();
                    $(".showtips span").text(rs.info);
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
                    smsBtn.text(count+"秒冲刺")
                }else{
                    clearInterval(intv);
                    smsBtn.removeAttr("disabled");
                    smsBtn.css("color","#ff8200");
                    smsBtn.text("重新发送");
                }
            },1000);
        }

    });

    //立即抢购按钮
    double12App_registerBtn.click(function () {
        if(!valPhone.test(regMobile.val()) ){
            $(".showtips_layer").show();
            $(".showtips span").text("手机号码不对");
            return;
        }
        $.ajax({
            url:'/ajax/mobileCodeLogin',//0都发   ！0 没注册发送
            type:"post",
            dataType:"json",
            async:false,
            data:{
                mobile:regMobile.val(),
                mobile_code:regSms.val()
            },
            success : function(data){
                if(data.status == 1){
                    $(".captchaId").click();
                	window.location = "/landing/double12";
                    return false;
                }
                if(data.status==0){
                    $(".showtips_layer").show();
                    $(".showtips span").text(data.info);
                    $(".captchaId").click();
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
});