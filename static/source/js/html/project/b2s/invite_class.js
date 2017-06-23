define(function(require,exports,module){  
    $.extend({
        confirm: function(option) {
            var msg = option.msg,
                type = option.type || 'alert',
                sSure = option.sureText || "确定",
                sCancel = option.cancelText || "取消",
                isReverse = option.isReverse || false,
                fnCancel = option.fnCancel || function(){},
                fnSure = option.fnSure || function(){},
                addClass = option.addClass || "";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd p:first").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert '+addClass+'" id="m-confirm" style="display:block;">' +
                        '<div class="in">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭"></a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        '<p class="f-tac">'+msg+'</p>' +
                        '</div>' +
                        '<div class="ft f-tac">' +
                        '<span class="u-btn jsCancel">' + sCancel + '</span>' +
                        '<i>&nbsp;&nbsp;</i>' +
                        '<span class="u-btn jsSure">' + sSure + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                $("body").append(sConfirm);
            }
            if(type == 'alert'){
                $("#m-confirm").find(".ft i").hide();
                $("#m-confirm").find(".jsCancel").hide();
            }else{
                var oI=$("#m-confirm").find(".ft i");
                $("#m-confirm").find(".jsCancel").show();
                oI.show();

                if(!isReverse){
                    oI.after($("#m-confirm").find(".jsSure"));
                    oI.before($("#m-confirm").find(".jsCancel"));
                }else{
                    oI.after($("#m-confirm").find(".jsCancel"));
                    oI.before($("#m-confirm").find(".jsSure"));
                }
            }
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel.call(this);
            });
            $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnSure && fnSure();
            });
        }
    });

    $('#invite_Form .invite-submit').click(function(){
            var $form = $('#invite_Form');
            var invit_code = $.trim($form.find('.invit_code').val());
            var regInvite = /^[0-9]{4,6}$/;
            var isFail = false;
            if(invit_code == ''){
                $form.find('.invite_error').show();
                isFail = true;
            }
            if(!regInvite.test(invit_code)){
                $form.find('.invite_error').show();
                isFail = true;
            }
            if(isFail){
                return false;
            }else{
                $form.submit();
            }
    })

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

    var send_flag = false;

    $(".sendCode").click(function(){
      var index = $(this);
      if(!send_flag){
        index.css("color", "#9aafc7");
        index.css("border-color", "#9aafc7");
        $.ajax({
            url: '/ajax/sendMobileCode',
            data: {mobile:$(this).attr("data-tel"),sms_type: 1},
            dataType: 'json',
            type: 'post',
            success: function(rs){},
            error: function(){
                $.confirm({msg: '获取验证码失败'})
                clearInterval(timer);;
                send_flag = false;
                index.css("color", "#74c472");
                index.css("border-color", "#74c472");
                index.html("获取验证码");
            }
        });
        send_flag = true;
        var num = 60;
        var timer = setInterval(function(){
          num--;
          index.html(num+"s后重新发送");
          if (num == 0) {
            send_flag = false;
            clearInterval(timer);;
          }
        },1000);
      }
    });
});