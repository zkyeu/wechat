define(function(require, exports, module) {
    $(".iterm").on("click",function(){ 
       var _this=$(this);
      var sib=_this.parents(".m_reg").siblings(".m_reg").find("input").val().trim();
       if(sib==""){
          $(".iterm").find("i").show();
       }
        $(this).find("i").hide();
        $(this).find("input").focus();

    });
    $("input").focus(function(){
        $(this).next().hide();
    });
     $(document).on("click", function(e){
      var m_Val=$(".m_iterm").find("input").val().trim();
      var p_Val=$(".p_iterm").find("input").val().trim();
      if(!($(e.target).parent().hasClass("iterm"))){
          if(m_Val==""){
             $(".m_iterm").find("i").show();
          }
          if(p_Val==""){
             $(".p_iterm").find("i").show();
          }
           e.stopPropagation(); 
      }
      
     });
     $(".getBtn").on("click",function(){
        var mobile=$(".mobile").val().trim();
        var mobile_reg=/^1[0-9]{10}$/;
        var pwd=$(".pwd").val().trim();
        if(mobile==""){
            alert("请填写手机号！");
            return false;
        }
        if(!mobile_reg.test(mobile)){
            alert("请填写正确的手机号！");
            return false;
        }
        if(pwd==""){
            alert("请填写密码！");
            return false;
        }else{
            $("#form1_reg").submit();
        }
     });

      
});