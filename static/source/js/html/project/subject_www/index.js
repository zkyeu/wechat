/**
 *
 * 
 */
define(function(require,exports,module){
  var homeStuPage = $(".homepage .stu").find(".home-relat")[0];
  var homeLearPage = $(".homepage .learning").find(".home-relat")[0];
  var homeMarkPage = $(".homepage .mark").find(".home-relat")[0];
  var homeServPage = $(".homepage .service").find(".home-relat")[0];
  if(homeStuPage) {
    var offsetStu=$(".homepage .stu").find(".home-relat").offset().top-$(window).height(); 
  }
  if(homeLearPage){
    var offsetLear=$(".homepage .learning").find(".home-relat").offset().top-$(window).height();
  }
  if(homeMarkPage){
    var offsetMark=$(".homepage .mark").find(".home-relat").offset().top-$(window).height();  
  }
  if(homeServPage){
    var offsetSer=$(".homepage .service").find(".home-relat").offset().top-$(window).height();  
  }
  $(window).scroll(function(){
    if($(window).scrollTop()>offsetStu){
      $(".homepage .stu").addClass("stu-animation");
    }
    if($(window).scrollTop()>offsetLear){
      $(".homepage .learning").addClass("lear-animation");
    }
    if($(window).scrollTop()>offsetMark){
      $(".homepage .mark").addClass("mark-animation");
    }
    if($(window).scrollTop()>offsetSer){
      $(".homepage .service").addClass("ser-animation");
    }
  });

/*视频播放*/
  $("[data-vedioSrc]").on("click",function(){
      $(".video-list").attr({
        "data-vedio":$(this).attr("data-vedioSrc"),
      })
      var oBtn=$(this);
      var src=oBtn.attr("data-vedioSrc");
      var width=oBtn.attr("data-width") || 800;
      var height=oBtn.attr("data-height") || 450;
      //视频来源地址
      var source=oBtn.attr("data-source") || "";
      if(!src)return;
      if($("#ckplayerDialog").length==0){
        $("body").append(
              '<div id="ckplayerDialog">'+
                  '<a class="close" href="javascript:;"></a>'+
                  '<a class="source"></a>'+
                  '<div id="playerContent"></div>'+
                '</div>'+
              '<div id="j-mask"></div>'
        );
        $("#ckplayerDialog").find('.close').add('#j-mask').on("click",function(){
          $("#ckplayerDialog").hide();
          $("#j-mask").fadeOut();
        });
      }
      CKobject.embed(
          src,
          'playerContent',
          'ckplayer_playerContent',
          width,
          height,
          false,
          {f: src, c: 0, b: 1, p: 1},
          [src],
          {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
      );
      $("#ckplayerDialog").css({
        "display":"block",
        "width":width,
        "height":height
      }).find(".source").html(source);
      $("#j-mask").height($(document).height()).show();
  });

/*轮播*/
  var index=0;
  var adLeg=$(".process_b_l li").length;
  function slide(index){
    var removeCls= $(".process_b_l li").removeAttr("class");
    var numLi=$(".process_b_l li").eq(index);
    $(".spot_list span").eq(index).addClass("spot_blue").siblings().removeClass("spot_blue");
    $(".process_t_l li").eq(index).addClass("p_t_bg").siblings().removeClass("p_t_bg");
    if(index==0){
      removeCls;
      numLi.addClass("p_list_c");
      numLi.next("li").addClass("p_list_r");
      $(".process_b_l li:last").addClass("p_list_l");
    }
    if(index==1){
      removeCls;
      numLi.addClass("p_list_c");
      numLi.prev("li").addClass("p_list_l");
      numLi.next("li").addClass("p_list_r");
    }
    if(index==2){
      removeCls;
      numLi.addClass("p_list_c");
      $(".process_b_l li:first").addClass("p_list_r");
      numLi.prev("li").addClass("p_list_l");
    }
  }
  $(".spot_list span,.process_t_l li,.process_b_l li").click(function(){
    var index=$(this).index();
    slide(index);
  });
  setInterval(function(){
    slide(index);
    index++; 
    if(index==adLeg){
      index=0;
    }
  },2000);

/*banner*/
  var reTel = /^1[0-9]{10}$/;  
  var mobile=$(".layer-test-pho").find("input[name='phone']");
  var passwd=$(".layer-test-pho").find("input[name='password']");
  var mobileL=$(".layer-test-login").find("input[name='phone']");
  var passwdL=$(".layer-test-login").find("input[name='password']");
  var msgCode=$("input[name='msgcode']");
  var phoCode=$("input[name='phocode']");
  $("input").select(function(){});
  mobile.next(".u-err").click(function(){
    $(this).hide();
    mobile.trigger("select");
  });
  passwd.next(".u-err").click(function(){
    $(this).hide();
    passwd.trigger("select");
  });
  mobileL.next(".u-err").click(function(){
    $(this).hide();
    mobileL.trigger("select");
  });
  passwdL.next(".u-err").click(function(){
    $(this).hide();
    passwdL.trigger("select");
  });
  msgCode.next(".u-err").click(function(){
    $(this).hide();
    msgCode.trigger("select");
  }); 
  phoCode.next(".u-err").click(function(){
    $(this).hide();
    phoCode.trigger("select");
  }); 

/*注册*/
  $("#registerBtn").click(function(){
    var mobileText=mobile.val();
    var passwdText=passwd.val();
    var msgCodeText=msgCode.val();
    var dataRegUrl=$(this).attr("data-url-reg");
    if(mobileText==""){
      $(".error1").show().html("请输入手机号码");
    }else if(!reTel.test(mobileText)){
      $(".error1").show().html("您输入的手机号码有误");
    }
    if(msgCodeText==""){
      $(".error2").show().html("请输入短信验证码");  
    }
    if(passwdText==""){
      $(".error3").show().html("请输入密码");
    }
    $.ajax({
      url:dataRegUrl,
      type:'post',
      data:{mobileText:mobileText,passwdText:passwdText,msgCodeText:msgCodeText},
      dataType:'json',
      success:function(res){
        // 系统出错
        if(res.status==0){
          alert(res.info);
          return false;
        }else{
          $(".layer-test-pho .p-test").hide();
          $(".layer-success").show();
        }
      }
    });
  });

/*登录*/
  $("#loginBtn").click(function(){
    var mobileText=mobileL.val();
    var passwdText=passwdL.val();
    var dataLayerUrl=$(this).attr("data-url-layer");
    if(mobileText==""){
      $(".error5").show().html("请输入手机号码");
    }else if(!reTel.test(mobileText)){
      $(".error5").show().html("您输入的手机号码有误");
    }
    if(passwdText==""){
      $(".error6").show().html("请输入密码");
    }
    $.ajax({
      url:dataLayerUrl,
      type:'post',
      data:{},
      dataType:'json',
      success:function(res){
        if(res.status==0){
          alert(res.info);
          return false;
        }else if(res.status==1){
          $(".layer-pay-users").show();
          return false;
        }else if(res.status==2){
          $(".layer-t-users").show();
          return false;
        }
      }
    });
  });
/*短信验证码*/
  $(".code-li .pho-t").click(function(){
    var mobile=$(".layer-test-pho").find("input[name='phone']");
    var mobileText=mobile.val();
    if(!reTel.test(mobileText)){
      $(".error1").show().html("请填写正确的手机号码");
      return false;
    }else{
      $(".layer-send-code").show(); 
    }
  });

/*倒计时*/
  function timer(obj,count){
    //obj.innerHTML=count+"秒后重新获取";
    obj.timer=setInterval(function(){
        count--;
        if(count==0){
            obj.innerHTML= "重新获取";
            isGetingCode=false;
            clearInterval(obj.timer);
            $(obj).removeClass('countdown');
        }else{
            var str="倒计时"+count+"s";
            obj.innerHTML=str;
        }
    },1000);
  }

/*图片验证*/
  $("#sendBtn").click(function(){
    var phoCodeText=phoCode.val();
    var dataCodeUrl=$(this).attr("data-url-code");
    if(phoCodeText==""){
      $(".error4").show().html("请填写图片验证码");  
    }
    $.ajax({
      url:dataCodeUrl,
      type:'post',
      data:{phoCodeText:phoCodeText},
      dataType:'json',
      success:function(res){
        if(res.status==0){
          alert(res.info);
          return false;
        }else{
          $(".layer-send-code").hide();
          var isGetingCode = false; 
          if (!isGetingCode) {
            isGetingCode = true;
            var mobile=$("#mobile").val();
            var _this=this;
            this.innerHTML="请稍等...";
            $.ajax({
                type:"POST",
                dataType:"json",
                url: "http://wap.51talk.com/Ajax/sendSms",
                data: {"mobile":mobile},
                success: function(res){
                  if(res.status){
                      timer(_this,60);
                  }else{
                      _this.innerHTML="重新获取";
                      isGetingCode = false;
                      alert(res.info);
                  }
                }
            }); 
          }
        }
      }
    });
  });

/*切换/其它点击事件*/
  $(".reg-list").on("click","li",function(){
    var index=$(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".reg-chg").find(".change").eq(index).show().siblings().hide();
  });
  $(".gra-list li").click(function(){
    var index=$(this).index();
    $(this).addClass("check").siblings().removeClass("check");
    $(".gra-nr").find(".qr-list").eq(index).show().siblings().hide();
  });
  $(".layer-grade .delete").click(function(){
    $(".layer-grade").hide();  
  });
  $(".suc-href").click(function(){
    $(".layer-grade").show();
  });
  $(".layer-success .l-reg-btn").click(function(){
    $(".reg-list li").trigger("click");
  });
  $(".select-up").click(function(){
    $(this).toggleClass("select-down");
    if($(this).hasClass("select-down")){
      $(this).siblings(".radio").attr('checked',true);
    }else{
      $(this).siblings(".radio").attr('checked',false);
    }
  });
});
