define(function(){
  placeholders(); 
  /*轮播图*/
    var index=$(".banner .iterm").index();
    var timer;
    index=-1;
    autoPlay();
    function autoPlay(){
       timer=setInterval(function(){
         if(index==1){ 
              index=-1;
          }
          index++;
          $(".banner").find(".iterm").eq(index).show().siblings(".iterm").hide();

        },3000);
    }
    $(".banner .iterm").on("mouseover",function(){
        clearInterval(timer);
    });
    $(".banner .iterm").on("mouseout",function(){
         autoPlay();
    });
   /*弹窗*/
   $(".banner_btn").on("click",function(){
        $(".mask,.mask_sp").show();
        placeholders();
        return false;
   });
   $(".close").on("click",function(){
        $(".mask,.mask_sp").hide();
        return false;
   });
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
/*表单*/
   var summerSell={
        init: function(){
          $(".getFreeBtn").on("click",this.getFree);
        },
        getFree: function(){
          var that=$(this);
          var phone=$(this).parent().siblings().find(".phone").val().trim();
          var pwd=$(this).parent().siblings().find(".pwd").val().trim();
          var phoneReg=/^1[0-9]{10}$/;
          var pwdReg=/^\w{6,20}$/;
          if(phone==""){
              alert("请填写手机号码！");
              return false;
            }
            if(!phoneReg.test(phone)){
                alert("请填写正确的手机号码！");
                return fales;
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

});