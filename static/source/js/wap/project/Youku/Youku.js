 
    
define(function(require,exports,module){

  $("#freeBtn").click(function(){
    var reTel = /^1[0-9]{10}$/;
    var tel = $(".reg1_tel").val();
    var passwd = $(".reg1_passwd").val();
    var mobileCode=$("input[name='mobile_code']").val();
    var mobileCodeReg=/^[0-9]{5}$/;
    if (tel == "") {
      alert("请填写手机号码");
      return false;
    }
    if (!reTel.test(tel)) {
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
    if (passwd == "") {
      alert("请填写密码");
      return false;
    }
    document.getElementById("reg1_form").submit();
  });

//获取验证码
  $(".tel_btn").click(function(){
      if (this.bAjax) {
        return;
      }
      var _this=this;
      var reTel = /^1[0-9]{10}$/;
      var mobile=$(".reg1_tel").val();
      if(!reTel.test(mobile)){
          alert("请填写正确的手机号码！");
          return false;
      }else{
        this.bAjax=true;
        $(".tel_btn").html("请稍等...");
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

    $(".tel_btn1").click(function(){
        if (this.bAjax) {
            return;
        }
        var _this=this;
        var reTel = /^1[0-9]{10}$/;
        var mobile=$(".reg1_tel").val();
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
                url:"http://www.51talk.com/passport/getMobileCode",
                data:{
                    authCode:imgCode,
                    mobile:mobile
                },
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

 
