define(function(){
   var mobileReg=/^1[0-9]{10}$/;
   var mobile=$(".mobile").val();
   $("#freeBtn").on("click",function(){
      var mobilecodeReg=/^[0-9]{5}$/;
      var mobilecode=$(".mobilecode").val();
      var mobile=$(".mobile").val();
      var pwd=$(".pwd").val();
      if(mobile==""){
          alert("请填写手机号！");
          return false;
      }
      if(!mobileReg.test(mobile)){
          alert("请填写正确格式的手机号！");
          return false;
      }
      if(mobilecode==""){
          alert("请填写验证码！");
          return false;
      }
      if(!mobilecodeReg.test(mobilecode)){
          alert("请填写正确的验证码！");
          return false;
      }
      if(pwd==""){
          alert("请填写密码！");
          return false;
      }
      $("#form1_reg").submit();
   });
   /*获取验证码*/
   $(".getCode").on("click",function(){
        var mobile=$(".mobile").val();
        var _this=$(".getCode");
        var state=_this.attr("data_state");
        if(state==1){
             if(mobile==""){
                  alert("请填写手机号！");
                  return false;
              }
              if(!mobileReg.test(mobile)){
                  alert("请填写正确格式的手机号！");
                  return false;
              }
              $.ajax({
                url:"/ajax/sendSms",
                type:"post",
                dataType:"json",
                data:{mobile:mobile},
                success:function(res){
                    if(res.status==1){
                        _this.html("请稍等...");
                        timeCount(_this,60);
                        _this.attr("data_state","0");
                        return false;
                    }
                    if(res.status==0){
                        alert(res.info);
                        return false;
                    }
                }
              });

        }else{
          return false;
        }
   });
      /*获取验证码*/
   $(".getCodes").on("click",function(){
        var mobile=$(".mobile").val();
        var _this=$(this);
        var state=_this.attr("data_state");
        var imgCode = $('#authCode').val();
        if(state==1){
             if(mobile==""){
                  alert("请填写手机号！");
                  return false;
              }
              if(!mobileReg.test(mobile)){
                  alert("请填写正确格式的手机号！");
                  return false;
              }
              if(!imgCode||(imgCode.length && imgCode.length<1)){
                      alert("请填写图形验证码！");
                      return false;

              }
              $.ajax({
                url:"http://www.51talk.com/passport/getMobileCode",
                type:"GET",
                dataType:"jsonp",
                data:{mobile:mobile,authCode:imgCode},
                success:function(res){
                    if(res.status==1){
                        _this.html("请稍等...");
                        timeCount(_this,120);
                        _this.attr("data_state","0");
                        return false;
                    }else{
                      alert(res.info);
                      if(res.status==2){
                        $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                      }
                  }
                    
                    
                }
              });

        }else{
          return false;
        }
   });
/*倒计时*/
  function timeCount(obj,num){
    var timer=setInterval(function(){
        num--;
        if(num<=0){
            obj.html("重新获取验证码");
            clearInterval(timer);
            obj.attr("data_state","1");
            return false;
        }
        obj.html(num+"秒");
    },1000);
  }
 

});