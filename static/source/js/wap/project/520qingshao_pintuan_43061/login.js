/**
 * Created by zhangnan on 2017.05.
 */
define(function(require,exports,module){
    var themeColor = '#ff9900';
    var disabledColor = 'grey'
    var valPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
    var regMobile = $("#regMobile");//手机号
    var captchImg = $('#captchImg');//图片验证码
    var captch = $('#captch');//获取图片验证码
    var regSms = $("#regSms");//短信验证码
    var smsBtn = $("#smsBtn");//获取短信按钮

    var commitBtn = $("#commitBtn");//领取按钮
    // var descTxt= $('#desc-txt'); //套餐说明
    // var pintuanBtn = $('#pintuan'); //和好友一起拼团按钮

    //监听手机号
    $("#regMobile").keyup(function () {
        if(captch.val().length >= 4 && valPhone.test(regMobile.val())){
            smsBtn.css("backgroundColor",themeColor);
        }else {
            smsBtn.css("backgroundColor",disabledColor);
        }
    }).focus(function () {
    });

    //监听验证码
    captch.keyup(function () {
        if(captch.val().length >= 4 && valPhone.test(regMobile.val())){
            // smsBtn.removeAttr("disabled");
            smsBtn.css("backgroundColor",themeColor);
        }else {
            // smsBtn.attr("disabled","disabled");
            smsBtn.css("backgroundColor",disabledColor);
        }
    });

    // //显示描述信息
    // descTxt.click(function(){
    //     $('.introduce').removeClass('hide');
    // });
    //
    // //关闭描述信息
    // $('#introduceCloseBtn').click(function(){
    //     $('.introduce').addClass('hide');
    // });


    //倒计时
    var curTime = $('#cur-time').val();
    // var curTime = new Date().getTime();
    var endTime = 1495382400000;
    updateTime();
    setInterval(updateTime,30*1000);

    function updateTime(){
        var rst = [];
        var days = '00',hours = '00',minutes = '00';
        if(curTime<endTime){
            var d = Math.floor((endTime-curTime)/(3600*1000*24));
            days = '' + d<10?('0'+d):d;

            var h = Math.floor((endTime-curTime)/(3600*1000))-d*24;
            hours = '' + h<10?('0'+h):h;

            var m = Math.floor((endTime-curTime)/(60*1000)-d*24*60-h*60);
            minutes = '' + m<10?('0'+m):m;
        }
        $('#days').text(days),$('#hours').text(hours),$('#minutes').text(minutes);
    }

    // // 点击课程，状态变化
    // $('.courses img').click(function(){
    //     var activateImg = $(this);
    //     $('.courses img').forEach(function(item){
    //         var curItem = $(item);
    //         if(activateImg[0]){
    //             item == activateImg[0]?(curItem.addClass('active')):(curItem.removeClass('active'));
    //         }
    //      });
    // });

    // //点击拼团分享
    // pintuanBtn.click(function(){
    //     $('.share-cont').removeClass('hide');
    //     $('.weixin-share-cont').removeClass('hide');
    // });
    // $('#cancle-share').click(function(){
    //     $('.share-cont').addClass('hide');
    //     $('.weixin-share-cont').addClass('hide');
    // });

    //验证码控制
    var imgUrl = '/ajax/verify';
    $("#captchImg").html('<img src="'+ imgUrl +'" class="captchaId">');

    $(".captchaId").on('tap',function(){
        this.src = imgUrl +'?'+ Math.random();
    });

    //监听短信验证码
    $("#regSms").keyup(function () {
        if(regSms.val().length){
            // $("#resetSms").show();
        }
        if(regSms.val().length > 3 && valPhone.test(regMobile.val())){
            commitBtn.css("backgroundColor",themeColor)
        }else{
            commitBtn.css("backgroundColor",disabledColor);
        }

    }).focus(function () {
        $("#resetMobile").hide();
        if(regSms.val().length){
            // $("#resetSms").show();
        }
    });

    //获取短信验证码
    $("#smsBtn").click(function () {
        if(regMobile.val() && regMobile.val().length>0 && !valPhone.test(regMobile.val())){
            $(".showtips_layer").show();
            $(".showtips span").text("手机号码不对");
            return;
        }
        else if(captch.val().length<4){
            return;
        }
        $.ajax({
            url:'/ajax/sendSmsNew/0',
            // url:'/templates/a.json',
            type:"post",
            // type:"get",
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

    //提交按钮
    commitBtn.click(function () {
        // if(!(regSms.val().length > 3 && valPhone.test(regMobile.val()))){
        //     return;
        // }
        if(!valPhone.test(regMobile.val()) ){
            $(".showtips_layer").show();
            $(".showtips span").text("手机号码不对");
            return;
        }
        if(!regSms.val() || regSms.val() == ''){
            $(".showtips_layer").show();
            $(".showtips span").text("请输入验证码");
            return;
        }
        $.ajax({
            url:'/ajax/mobileCodeRegister',
            // url:'/templates/b.json',//0都发   ！0 没注册发送
            type:"post",
            // type:"get",
            dataType:"json",
            async:false,
            data:{
                mobile:regMobile.val(),
                mobile_code:regSms.val(),
                register_from:$('#register_from').val()
                // type:5
                // act:act.val()
            },
            success : function(data){
                if(data.status == 1 || data.status == 2){
                    window.location = data.data;
                    // switchStatus('success');
                    return false;
                }
                if(data.status == 0){
                    $(".showtips_layer").show();
                    $(".showtips span").text(data.info);
                    // switchStatus('success');
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


    $(".showtips_layer").click(function () {
        $(".showtips_layer").hide();
        $(".captchaId").click();
    });
});
