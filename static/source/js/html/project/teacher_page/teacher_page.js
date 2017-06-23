/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2016-01-12 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
  require("formCheck");
  require("silder");

  $(".m-reg form").formCheck({
    "focus" :true,
    "alertType":"bottom"
  });
  
  $(".m-log form").formCheck({
    "focus" :true,
    "alertType":"bottom",
    "json":{
      "user_name":{//手机号
        "reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
        "error":"用户名格式错误",
        "empty":"请输入用户名"
      },
      "username":{//手机号
        "reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
        "error":"用户名格式错误",
        "empty":"请输入用户名"
      }
    }
  });
  $("#formBottom").formCheck();
  $(".m-main .jsCheck").focusin(function() {
    $(this).closest('li').addClass('icon-btn');
  }).focusout(function() {
    if(!$(this).val()){
      $(this).closest('li').removeClass('icon-btn');
    }
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
});