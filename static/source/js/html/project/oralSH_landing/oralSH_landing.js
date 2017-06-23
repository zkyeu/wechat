 
define(function(require,exports,module){
    require("placeholder");
    //选择年级
    $(".sh_selectClass").click(function(e){
         $(".sh_selectClass").addClass("sh_arrow_class"); 
         $(".sh_classList").show();
         $(".sh_groupList").hide();
         $(document).click(function(){
          $(".sh_classList").hide();
          $(".sh_selectClass").removeClass("sh_arrow_class"); 
         });
          e.stopPropagation();
    });

    $(".sh_classList").find("a").click(function(){
        var ThisTxt=$(this).text();
        var grade = $(this).attr('data');
        $("input[name='sh_class_box']").val(":  "+ThisTxt).attr('grade', grade);
        $(".sh_classList").hide();
         
    });

  //选择年级组
    $(".sh_selectGroup").click(function(e){
        $(".sh_selectGroup").addClass("sh_arrow_group"); 
        $(".sh_groupList").show();
        $(".sh_classList").hide();
         $(document).click(function(){
          $(".sh_groupList").hide();
           $(".sh_selectGroup").removeClass("sh_arrow_group"); 
         })
          e.stopPropagation();
    });
    
    $(".sh_groupList").find("a").click(function(){
        var ThisTxt=$(this).text();
        var group = $(this).attr('data');
        $(".sh_group_box").val(":  "+ThisTxt).attr('group', group);
        $(".sh_groupList").hide();
        
    });

  //获取验证码
  $("#sh_getCode").click(function(){
    var mobileNum=$("#mobile").val();
    var _this=this;
    this.bAjax=true;
    this.innerHTML="请稍等...";
    $.ajax({
      type:"POST",
      dataType:"json",
      url: "/Ajax/sendSms",
      data: {"mobile":mobileNum},
      success: function(res){
        if(res.status){
          timer(_this,60);
        }else{
          _this.innerHTML="重新获取验证码";
          _this.bAjax=false;
          alert(res.info);
        }

      }
    });

  });
  //获取验证码
  $("#sh_getCodes").click(function(){
    var mobileNum=$("#mobile").val();
    var imgCode = $('#authCode').val();
    var reTel = /^1[0-9]{10}$/;
    if(!reTel.test(mobileNum)){
        alert("请填写正确的手机号码！");
        return false;
    } 
    if(!imgCode||(imgCode.length && imgCode.length<1)){
      alert("请填写图形验证码！");
      return false;

    }
    var _this=this;
    this.bAjax=true;
    this.innerHTML="请稍等...";
    $.ajax({
      type:"GET",
      dataType:"jsonp",
      url: "http://www.51talk.com/passport/getMobileCode",
      data: {"mobile":mobileNum,authCode:imgCode},
      success: function(res){
        if(res.status == 1){
          timer(_this,120);
        }else{
          _this.innerHTML="重新获取验证码";
          _this.bAjax=false;
          alert(res.info);
          if(res.status==2){
            $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
          }
        }

      }
    });

  });
//倒计时
  function timer(obj,count){
    obj.innerHTML=count+"秒后重新获取";
    obj.timer=setInterval(function(){
      count--;
      if(count<=0){
        obj.innerHTML= "重新获取验证码";
        obj.bAjax=false;
        clearInterval(obj.timer);
      }else{
        var str=count+"秒后重新获取";
        obj.innerHTML=str;
      }
    },1000);
  } 
//报名验证  
$("#sh_submit").click(function(){
  var user_name=$(".user_name").val();
  var school_name=$(".school_name").val();
  var sh_class_box=$(".sh_class_box").attr('grade');
  var sh_group_box=$(".sh_group_box").attr('group');
  var mobileNum=$("#mobile").val();
  var mobileNum_reg=/^1[0-9]{10}$/;
  var message_reg = /^[0-9]{5}$/;
  var message=$(".message").val();
  var pwd_reg=/^[0-9]{6}$/;
  var password=$(".password").val();
  var parents=$(".parents").val();
  var unifyCode=$(".unifyCode").val();
  var register_from=$("#register_from").val();
  
  if(user_name==""){
    alert("学生姓名不能为空！");
    return false;
  }else if(school_name==""){
    alert("学校名称不能为空！");
    return false;
  }else if(sh_class_box==""){
    alert("请选择您所在年级！");
    return false;
  }else if(sh_group_box==""){
    alert("请选择您所在年级组！");
    return false;
  }else if(!mobileNum_reg.test(mobileNum)||mobileNum==""){
    alert("请填写正确的手机号码！")
    return false;
  }else if(!message_reg.test(message)||message==""){
    alert("请填写正确的短信验证码！");
    return false;
  }else if(!pwd_reg.test(password)||password==""){
    alert("请填写6位数字的密码！");
    return false;
  }else{
     $.ajax({
        type:'post',
        dataType:'json',
        cache:false,
        url:"/Ajax/shanghaiEnglishMatch",
        data:{
          "user_name":user_name,
          "school_name":school_name,
          "sh_class_box":sh_class_box,
          "sh_group_box":sh_group_box,
          "mobile":mobileNum,
          "message":message,
          "password":password,
          "parents":parents,
          "unifyCode":unifyCode,
          "register_from":register_from
        },
        success: function (data) {
                if (data.status==1) {
                    window.location.href=data.data.url;
                    return false;
                } else if(data.status==0){
                     alert("登录失败，请重新登录！");
                }
            }

    });
  }

});


}); 
