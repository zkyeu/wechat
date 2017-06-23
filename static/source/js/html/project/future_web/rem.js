define(function(require,exports,module){
  /*验证*/
  var reTel = /^1[0-9]{10}$/;
  var passTel = /^[\w\+\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
  $("#sha-reg").click(function(){
    var tel = $("#sha-tel").val();
    var passwd = $("#sha-psd").val();
    if (tel == "") {
      alert("请填写手机号码");
      return false;
    };
    if (!reTel.test(tel)) {
      alert("请填写正确格式手机号码");
      return false;
    };
    if (passwd == "") {
      alert("请填写密码");
      return false;
    };
    if(!passTel.test(passwd)){
      alert("请填写正确格式密码");
      return false;
    };
    document.getElementById("RegForm").submit();
  });
  /*兼容placeholder*/
    function isPlaceholder(){  
      var input = document.createElement('input');  
      return 'placeholder' in input;  
    }
    (function($){
      if(!isPlaceholder()){
        $("li input").each(//把input绑定事件 排除password框  
          function(){  
            if($(this).val()=="" && $(this).attr("placeholder")!=""){  
              $(this).val($(this).attr("placeholder"));  
              $(this).focus(function(){  
                if($(this).val()==$(this).attr("placeholder")) $(this).val("");  
              });  
              $(this).blur(function(){  
                if($(this).val()=="") $(this).val($(this).attr("placeholder"));  
              });  
            }  
        });  
      }  
    })(jQuery);
})

