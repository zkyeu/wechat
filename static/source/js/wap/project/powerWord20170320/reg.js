define(function(require, exports, module) {
  /*默认加载*/
  $("#verifycode").click();
  $(".subBtn").on("click",function(){
      var phoneReg=/^1[0-9]{10}$/;
      var imgCodeReg=/^[0-9a-zA-Z]{4}$/;
      var inforCodeReg=/^[0-9]{5}$/;
      var phone=$(".phone").val();
      var imgCode=$(".imgCode").val();
      var inforCode=$(".inforCode").val();
      var _this=$(".error");
      var register_from=$("#register_from").val();
      if( phone=="" ) {
          $(".error").fadeIn();
          $(".error .infor").html("请输入手机号！");
           maskHide(_this);
          return false;
      }
      if( !phoneReg.test(phone) ){
          $(".error").fadeIn();
          $(".error .infor").html("请输入正确的手机号！");
          maskHide(_this);
          return false;
      }
      if( inforCode=="" ) {
          $(".error").fadeIn();
          $(".error .infor").html("请输入短信验证码！");
           maskHide(_this);
          return false;
      }
      if( !inforCodeReg.test(inforCode) ){
          $(".error").fadeIn();
          $(".error .infor").html("请输入正确的短信验证码！");
          maskHide(_this);
          return false;
      }else{
        $.ajax({
            url:"/ajax/mobileCodeRegister",
            type:"post",
            dataType:"json",
            data:{mobile:phone,mobile_code:inforCode,register_from:register_from},
            success: function(res){
                if(res.status==1){
                    window.location.href="/landing/kingsoft_success";
                    return false;
                }
                if(res.status==0 || 2){
                    $(".error").fadeIn();
                    $(".error .infor").html(res.info);
                    maskHide(_this);
                    return false;
                }
            }
        });
      }
  });
  /*短信验证码*/
  $(".sendCode").on("click",function(){ 
      var subState=$(".sendCode").attr("data-state");
      if(subState==1){
          var phone=$(".phone").val();
          var imgCode=$(".imgCode").val();
          var phoneReg=/^1[0-9]{10}$/;
          var imgCodeReg=/^[0-9a-zA-Z]{4}$/;
          var _this=$(".error");
          var oBox=$(this);
           if( phone=="" ) {
              $(".error").fadeIn();
              $(".error .infor").html("请输入手机号！");
               maskHide(_this);
              return false;
          }
          if( !phoneReg.test(phone) ){
              $(".error").fadeIn();
              $(".error .infor").html("请输入正确的手机号！");
              maskHide(_this);
              return false;
          }
          if( imgCode=="" ) {
              $(".error").fadeIn();
              $(".error .infor").html("请输入图片验证码！");
               maskHide(_this);
              return false;
          }
          if( !imgCodeReg.test(imgCode) ){
              $(".error").fadeIn();
              $(".error .infor").html("请输入正确的图片验证码！");
              maskHide(_this);
              return false;
          }
          $.ajax({
            url:"/ajax/sendSmsNew",
            type:"post",
            dataType:"json",
            data:{mobile:phone,verify_code:imgCode},
            success: function(res){
                if(res.status==1){
                    $(".sendCode").attr("data-state","0");
                    oBox.html("请稍等...");
                    timeCount(oBox,60);
                    return false;
                }
                if(res.status==0 || 2){
                    $("#verifycode").click();
                    $(".sendCode").attr("data-state","1");
                    $(".error").fadeIn();
                    $(".error .infor").html(res.info);
                    maskHide(_this);
                    return false;
                }
            }
          });

       }else if(subState==0){
          return false;
      }
    });
/*出现error*/
  function maskHide(obj){
    setTimeout(function(){
      obj.fadeOut();
      obj.find(".infor").html();
    },2000);
  }
  /*倒计时*/
  function timeCount(obj,num){
    var timer=setInterval(function(){
      num--;
      if(num<=0){
          $(".sendCode").attr("data-state","1");
          obj.html("点击重新获取");
          clearInterval(timer);
          return  false;
      }
      $(".sendCode").attr("data-state","0");
      obj.html(num+"秒");

    },1000);

  };
  
    
});