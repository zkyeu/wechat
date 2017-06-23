define(function(require,exports,module){
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