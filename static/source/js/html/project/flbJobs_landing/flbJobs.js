
define(function(require,exports,module){
    require("placeholder");
    $(".fj_ETE,.fj_TTC,.fj_MS").find("i").on("click",function(){
         $(this).addClass("btn_active").parent().siblings().find("i").removeClass("btn_active");
         $(this).parent().siblings("em").hide();

    });
    $("input[name='firstName']").focus(function(){
      $(".tip1").hide();
      $(".tip1").siblings("input").css("border","1px solid #ccc");
    });
    $("input[name='lastName']").focus(function(){
      $(".tip2").hide();
      $(".tip2").siblings("input").css("border","1px solid #ccc");
    });
    $("input[name='email']").focus(function(){
      $(".tip3").hide();
      $(".tip3").siblings("input").css("border","1px solid #ccc");
    });    
    $("input[name='mobile']").focus(function(){
      $(".tip4").hide();
      $(".tip4").siblings("input").css("border","1px solid #ccc");
    }); 
    $(".fj_select").change(function(){
     var ICSelected=$(".fj_select").find("option:selected").attr("data");
     $("input[name='fj_IC']").val(ICSelected);
     var fj_IC_val=$("input[name='fj_IC']").val();
      if(fj_IC_val=="0"){
             $(".tip5").show();
         }else{
            $(".tip5").hide();
         }
       });

    $(".fj_submit").on("click",function(){
        var firstName=$("input[name='firstName']").val();
        var lastName=$("input[name='lastName']").val();
        var email=$("input[name='email']").val();
        var mobile=$("input[name='mobile']").val();
        var regMobile=/^\d{1,}$/;
        var regEmail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
        //Internet情况
        var ICSelected=$(".fj_select").find("option:selected").attr("data");
        $("input[name='fj_IC']").val(ICSelected);
        var fj_IC_val=$("input[name='fj_IC']").val();

        //教学经验情况
        var ETEval=$(".fj_ETE").find(".btn_active").attr("data");
         $("input[name='fj_ETE']").val(ETEval);
          var fj_ETE_val=$("input[name='fj_ETE']").val();

        //证书情况
         var TTCval=$(".fj_TTC").find(".btn_active").attr("data");
         $("input[name='fj_TTC']").val(TTCval); 
         var fj_TTC_val=$("input[name='fj_TTC']").val(); 


         //ms情况
         var MSval=$(".fj_MS").find(".btn_active").attr("data");
         $("input[name='fj_MS']").val(MSval);
         var fj_MS_val=$("input[name='fj_MS']").val();

         if(firstName==""){
              $(".tip1").show();
              $(".tip1").siblings("input").css("border","1px solid #f00");
              return false;
         };
         if(lastName==""){
              $(".tip2").show();
              $(".tip2").siblings("input").css("border","1px solid #f00");
              return false;
         }
        if(!regEmail.test(email)){
              $(".tip3").show();
              $(".tip3").siblings("input").css("border","1px solid #f00");
              return false;
         }
       if(!regMobile.test(mobile)){
              $(".tip4").show();
              $(".tip4").siblings("input").css("border","1px solid #f00");
              return false;
         }
         if(fj_IC_val=="0"){
             $(".tip5").show();
              return false;
         }
        if(fj_ETE_val==""){
            $(".checkTip6").show();
              return false;
        }
        if(fj_TTC_val==""){
            $(".checkTip7").show();
              return false;
        }
        if(fj_MS_val==""){
            $(".checkTip8").show();
              return false;
        }else{
          $.ajax({
              url:"/ajax/delCoruse",
              data:{
                  
              },
              type:'post',
              cache:false,
              dataType:'json',
              success: function(data) {
                  if (data.status!=0) {
                      window.location.href='/user/trial';
                      return false;
                  } else {
                      alert(data.info);
                      return false;
                  }
              },
              error: function() {
                  alert('网络异常，取消失败');
              }
          });  



        }


    });



});
