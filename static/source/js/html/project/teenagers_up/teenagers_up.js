/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
/*导航切换*/
  $(".f_nav").on("click","li",function(){
    $(this).addClass("on").siblings().removeClass("on");
    $(".youth").eq($(this).prevAll().length).show().siblings(".youth").hide();
  });

/*课程切换*/
  $(".m_course").each(function(){
    var $advLi=$(this).find(".advList").find("li");
    var $tabDivs = $(this).find(".tabDivs").children();
    var oldIndex = 0;
    var $jb_sts=$(this).find(".jb_st").children();
    $advLi.mouseover(function(){
        var index = $(this).index();
        $advLi.eq(oldIndex).find('span').removeClass('tab_color');
        $advLi.eq(oldIndex).find('i').removeClass('tabon'+oldIndex);
        $(this).children('i').addClass('tabon'+index);
        $(this).children('span').addClass('tab_color');

        $tabDivs.removeClass('tabDesc').eq(index).addClass('tabDesc');
        $('.sanjiao').removeClass('tab_sanjiao'+oldIndex).addClass('tab_sanjiao'+index);

        $jb_sts.removeClass();
         
        $jb_sts.eq(index).removeClass("jb_stno");
        $jb_sts.eq(index).addClass("jb_stbk");
        
        
      }).mouseout(function(){
        oldIndex = $(this).index();
      });
  });

/*首页课程体系详情切换*/
$(".m_courseList").on("click","li",function(){
  $(".f_nav li").eq($(this).prevAll().length+1).addClass("on").siblings().removeClass("on");
  $(".youth").eq($(this).prevAll().length+1).show().siblings(".youth").hide();  
});

/*弹出层*/
$('.imgBtn,.expriceBtn,.cl-reg,.plen-btn,.wt_btn').click(function(){
  $('.mask,.openWidnow').show();
});
$(".mask").on("click",function(){
  $('.mask,.openWidnow').hide();
  $(this).hide();
});
/*获取验证码*/
$(".tel_btn").click(function(){
  if (this.bAjax) {
    return;
  }
  var _this=this;
  var reTel = /^1[0-9]{10}$/;
  var mobile=$("#mobile3").val();
  if(!reTel.test(mobile)){
      alert("请填写正确的手机号码！");
      return false;
  }else{
    this.bAjax=true;
    $(".tel_btn").html("请稍等...");
    var dataUrl = $(".mobileCode").attr("data-url");
    $.ajax({
          type:'post',
          dataType:'json',
          url:dataUrl,
          data:{
            "mobile":mobile
          },
          success:function(data){
            if(data.status==1){
                 timer(_this,60);
            }else{
               _this.innerHTML="重新获取";
                _this.bAjax=false;
                alert(res.info)
            }
          }
    }); 
  }
});
/*获取验证码*/
$(".tel_btns").click(function(){
  if (this.bAjax) {
    return;
  }
  var _this=this;
  var reTel = /^1[0-9]{10}$/;
  var mobile=$("#mobile3").val();
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
    var dataUrl = $(".mobileCode").attr("data-url");
    $.ajax({
          type:"GET",
          dataType:"jsonp",
          url: "http://www.51talk.com/passport/getMobileCode",
          data:{
            "mobile":mobile,
            authCode:imgCode
          },
          success:function(data){
            if(data.status==1){
                 timer(_this,120);
            }else{
               _this.innerHTML="重新获取";
                _this.bAjax=false;
                alert(data.info)
                if(data.status==2){
                  $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                }
            }
          }
    }); 
  }
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
  };
/*底部注册验证*/
  $("#submit1").on("click",function(){
    var mobile=$("#mobile3").val();
    var mobileReg=/^1[0-9]{10}$/;
    var password=$("#password3").val();
    var passwordReg=/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
    var mobileCode=$("#mobileCode").val();
    var mobileCodeReg=/^[0-9]{5}$/;
    if(mobile==""){
          alert("手机号码不能为空");
          return false;
    };
    if(!mobileReg.test(mobile)){
          alert("请填写正确的手机号码");
          return false;
    };
    if(mobileCode==""){
          alert("验证码不能为空");
          return false;
    };
    if(!mobileCodeReg.test(mobileCode)){
          alert("验证码错误");
          return false;
    };
    if(password==""){
          alert("密码不能为空");
          return false;
    };
    if(!passwordReg.test(password)){
          alert("密码格式错误");
          return false;
    }else{
        document.getElementById("RegForm1").submit();
    }
  });
  $("#submit2").on("click",function(){
    var email=$(".email").val();
    var emailReg=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
    var iphone=$(".iphone").val();
    var iphoneReg=/^1[0-9]{10}$/;
    var password=$(".password").val();
    var passwordReg=/^[\w\+\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
    if(email==""){
          alert("邮箱不能为空");
          return false;
    };
    if(!emailReg.test(email)){
          alert("请填写正确的邮箱地址");
          return false;
    };
    if(iphone==""){
          alert("手机号码不能为空");
          return false;
    };
    if(!iphoneReg.test(iphone)){
          alert("请填写正确的手机号码");
          return false;
    };
    if(password==""){
          alert("密码不能为空");
          return false;
    };
    if(!passwordReg.test(password)){
          alert("密码格式错误");
          return false;
    }else{
        document.getElementById("b-regForm").submit();
    }
  });
});
