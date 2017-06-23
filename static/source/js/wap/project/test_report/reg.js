define(function(require,exports,module){
    /*表单验证*/
    $(".subBtn").on("click",function() {
        var phoneReg=/^1[0-9]{10}$/;
        var phone=$(".phone").val();
        var pwd=$(".pwd").val();
        if(phone=="" || !phoneReg.test(phone)){
            alert("请填写正确手机号码！");
            return false;
        } 
        if(pwd==""){
            alert("请填写密码!");
            return false;
        }
         document.getElementById("reg1_form").submit();
    });
    /*位置固定*/
    $(window).scroll(function(){
        var oTop=$(window).scrollTop();
        var oDoc=$(document).height();
        var oWinHeight=$(window).height();
        var oHight=$(".footerFix").height();
        if(oTop+oHight>=oDoc-oWinHeight){
             $(".footerFix").removeClass("footerCopy");
             $(".footerMask").hide();
        }else{
             $(".footerFix").addClass("footerCopy");
             $(".footerMask").show();
             
        }
  });

});
 