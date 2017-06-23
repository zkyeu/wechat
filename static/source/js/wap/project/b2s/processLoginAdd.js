define("processLoginAdd",["swiper-3.3.1.jquery.min","utility"],function(require, exports, module) {
    require("swiper-3.3.1.jquery.min");
    var utility = require("utility");
    var confirm = utility.promptDialog;
   ///////////////// swiper ///////////////////
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        autoplayDisableOnInteraction : false,
        loop: true,
        pagination: '.swiper-pagination',// 如果需要分页器
    })

/***倒计时***/
    ;(function(){
        var forgetpsw = $.formVerify.formlist.forgetpsw;
        utility.deftime({
            url:$("[send-url]").attr("send-url"),
            tar:".send-verify>input[type=button]",
            text:"发送验证码",
            success:function(r){
                if(r.status == 1){
                    alert("短信发送成功，请查收！");
                    //forgetpsw.verifycode.setState(false,"短信发送成功，请查收！");
                    return true;
                }else{
                    alert(r.info);
                    //forgetpsw.verifycode.setState(false,r.info);
                }
            },
            error:function(){
                alert("短信发送失败，请重试！");
                //forgetpsw.verifycode.setState(false,"短信发送失败，请重试！");
            },
            sendBefore:function(){
                // var phone = forgetpsw.phone,
                //     checkFlag = phone.trigger("blur").checkFlag;
                var teleRe = /^1[0-9]{10}$/;
                var tele = $(".telephone").val();
                if (!tele.trim()) {
                    alert("请输入您的手机号");
                    return;
                }
                if (!teleRe.test(tele.trim())) {
                    alert("手机号格式不正确");
                    return;
                }
                return {
                    mobile : tele,
                    sms_type : $("[send-type]").attr("send-type")
                }
            }
        });
    })();
    //立即报名
    $(".regbutton").on("click",function(){
        var tele = $(".telephone").val();
        var password = $(".password").val();
        var number = $(".number").val();
        var teleRe = /^1[0-9]{10}$/;
        var passwordRe = /^.{6,20}$/;
        if (!tele.trim()) {
            utility.promptDialog({content: "请输入您的手机号"});
            //alert("请输入您的手机号");
            return;
        }
        if (!teleRe.test(tele.trim())) {
            utility.promptDialog({content: "手机号码有误，请重新输入"});
            return;
        }
        if (!number.trim()) {
            utility.promptDialog({content: "请输入验证码"});
            return;
        }
        document.getElementById("processLogin").submit();
    });

    //性别按钮填入隐藏域
    $(".sex").on("tap","p",function(){
        $(this).addClass("cur").siblings().removeClass("cur");
       $(".sexname").val($(this).attr("sex"));
    })
});
