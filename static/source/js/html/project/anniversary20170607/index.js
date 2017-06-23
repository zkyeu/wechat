define(function(){
  placeholders();
  /*轮播图*/
  var index=$(".banner").find(".iterm").index();
  var index=0;
  var timer=null;
  var iNow=0;
  var count=$(".slider").find(".slider_btn").length;
  var aLi=$(".banner").find(".iterm");
  autoPlay();
  function autoPlay(){
    timer=setInterval(function(){
      index++;
      if(index==2){
          index=0;
      }
      $(".banner").find(".iterm").eq(index).animate({"opacity":"1","z-index":"1"}).siblings(".iterm").animate({"opacity":"0","z-index":"0"});
      $(".slider").find(".slider_btn").eq(index).addClass("active").siblings(".slider_btn").removeClass("active");
    },3000);
  }
  $(".banner").on("mouseenter",function(){ 
      clearInterval(timer);
  });
  $(".banner").on("mouseleave",function(){ 
      autoPlay();
  });
  $(".slider").find(".slider_btn").on("click",function(){
      var index=$(".slider").find(".active").index();
      $(this).addClass("active").siblings().removeClass("active");
      $(".banner").find(".iterm").eq(index).animate({"opacity":"1","z-index":"1"}).siblings(".iterm").animate({"opacity":"0","z-index":"0"});
      clearInterval(timer);
  });
  $(".arrow_l").on("click",function(){
      slide("prev");
      clearInterval(timer);
  });
  $(".arrow_r").on("click",function(){
      slide("next");
      clearInterval(timer);
  });
  function slide(type){
      if(aLi.eq(iNow).is(":animated")) return;
      aLi.eq(iNow).css({"z-index":0}).animate({"opacity":0});
      if(type==="next"){
        iNow++;
      }else if(type==="prev"){
        iNow--;
      }else{
        iNow=type;
      }
      if(iNow<0){
        iNow=count-1;
      }else if(iNow===count){
        iNow=0;
      }
      aLi.eq(iNow).css({"z-index":1,"opacity":0.7}).animate({"opacity":1});
      $(".slider").find(".slider_btn").eq(iNow).addClass("active").siblings(".slider_btn").removeClass("active");

  }
   /*form验证*/
   var summerSell={
        init: function(){
          $(".getFreeBtn").on("click",this.getFree);
        },
        getFree: function(){
          var that=$(this);
          var phone=$(this).parents(".orderBtn2").siblings(".window-form").find(".phone").val();
          var pwd=$(this).parents(".orderBtn2").siblings(".window-form").find(".pwd").val();
          var phoneReg=/^1[0-9]{10}$/;
          var pwdReg=/^\w{6,20}$/;
          console.log("phone:"+phone);
          if(phone==""){
              alert("请填写手机号码！");
              return false;
            }
            if(!phoneReg.test(phone)){
                alert("请填写正确的手机号码！");
                return false;
            }
            if(pwd==""){
              alert("请填写密码！");
              return false;
            }
            if(!pwdReg.test(pwd)){
              alert("请填写6到20位的密码！");
              return false;
            }
            else{
              $(this).parents(".summerForm").submit();
            }
          }         
    };
    summerSell.init();
   /*浮层*/
    $(".freeEntery").on("click",function(){
      $("#mask,#openWidnow").show();
      placeholders();
      return false;
    });
    $("#mask").on("click",function(){
        $("#mask,#openWidnow").hide();
    });
    /*placeholders*/
    function placeholders(){
       if("placeholder" in document.createElement("input")) return;
      var defaultColor="#ccc";
      $(":input:visible").each(function(){
        var oInput=$(this);
        var placeholder=oInput.attr("placeholder");
        if(!placeholder) return true;
        if(this.type.toLowerCase()=="textarea"){
          var oSpan=$('<textarea>');
        }else{
          var oSpan=$('<input>');
        }
        oSpan.addClass(oInput.attr("class")).val(placeholder).css("color",defaultColor);
        oInput.after(oSpan);
        oSpan.focus(function(){
          oSpan.hide();
          oInput.show().focus();
        });
        oInput.blur(function(){
          if(this.value==""){
            oInput.hide();
            oSpan.show();
          }
        });
        if(this.value==""){
          oSpan.show();
          oInput.hide();
        }else{
          oSpan.hide();
        }
      });
   }

});