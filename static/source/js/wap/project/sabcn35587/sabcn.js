define(function(require){
  /*验证*/
  var reTel = /^1[0-9]{10}$/;
  // var sltList=/^[124567]$/;
  $(".sabcn35587 .sumbit").click(function(){
    var tel=$(".iphone").val();
    var passwd=$(".passsword").val();
    var slt=$("#tea_experience").val();
    var register_from=$(".register_from").val();
    var formType=$(".form-type").val();
    var mobileCode=$(".phoneCode").val();
    var mobileCodeReg=/^[0-9]{5}$/;
    if(tel==""){
      alert("请填写手机号码");
      return false;
    }
    if(!reTel.test(tel)){
      alert("请填写正确格式手机号码"); 
      return false; 
    }
    if(mobileCode==""){
        alert("验证码不能为空");
        return false;
      };

    if(!mobileCodeReg.test(mobileCode)){
          alert("验证码错误");
          return false;
    };
    if(passwd==""){
      alert("请填写密码");
      return false;
    }
    if(slt== -1){
      alert("年级组不能为空");
      return false;
    }
    // if(!sltList.test(slt)){
    //   alert("年级组格式不正确");
    //   return false;
    // }
    var dataUrl=$(".sac-input").attr("data-url");
    $.ajax({
      url:dataUrl,
      type:'post',
      data:{mobile:tel, password:passwd, race_group:slt, registerName:register_from, type:formType,mobile_code:mobileCode},
      dataType:'json',
      success:function(msg){
        // msg = JSON.parse(msg);
        if(msg.status==0){
          alert(msg.info);
          return false;
        }else{
          location.href=msg.data;    
        }
      }
    });
  });
  /*select*/ 
  $(".sabcn35587 .select").click(function(e){
    $(".slt-list").show();
    $(document).click(function(){
      $(".slt-list").hide();
     });
     e.stopPropagation();
  });
  $(".slt-list li").click(function(){
    var str=$(this).text();
    var num=$(this).attr("num");
    $("#tea_experience").val(num);
    $(".select .text").text(str);
    $(".slt-list").hide();
  });
//获取验证码
  $(".getCode").click(function(){
      if (this.bAjax) {
        return;
      }
      var _this=this;
      var reTel = /^1[0-9]{10}$/;
      var mobile=$(".iphone").val();
      if(!reTel.test(mobile)){
          alert("请填写正确的手机号码！");
          return false;
      }else{
        this.bAjax=true;
        $(".getCode").html("请稍等...");
        $.ajax({
            type:"POST",
            dataType:"json",
            url: "/Ajax/sendSms",
            data: {"mobile":mobile},
            success: function(res){
                if(res.status==1){
                    timer(_this,60);

                }else{
                    _this.innerHTML="重新获取";
                    _this.bAjax=false;
                    alert(res.info);
                }

            }
        }); 
    };
 });
    $(".getCodes").click(function(){
      if (this.bAjax) {
        return;
      }
      var _this=this;
      var reTel = /^1[0-9]{10}$/;
      var mobile=$(".iphone").val();
      var imgCode = $('#authCode').val();
      if(!reTel.test(mobile)){
          alert("请填写正确的手机号码！");
          return false;
      }else if(!imgCode||(imgCode.length && imgCode.length<1)){
            alert("请填写图形验证码！");
            return false;

      }else{
        this.bAjax=true;
        $(this).html("请稍等...");
        $.ajax({
            type:"GET",
            dataType:"jsonp",
            url: "http://www.51talk.com/passport/getMobileCode",
            data: {"mobile":mobile,authCode:imgCode},
            success: function(res){
                if(res.status==1){
                    timer(_this,120);

                }else{
                    _this.innerHTML="重新获取";
                    _this.bAjax=false;
                    alert(res.info);
                    if(res.status==2){
                      $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                    }
                }

            }
        }); 
    };
 });
    //倒计时
    function timer(obj,count){
        obj.innerHTML="请稍等...";
        obj.timer=setInterval(function(){
            count--;
            if(count==0){
                obj.innerHTML= "重新获取";
                obj.bAjax=false;
                clearInterval(obj.timer);
            }else{
                var str=count+"秒";
                obj.innerHTML=str;
            }
        },1000);
    } 
      

});