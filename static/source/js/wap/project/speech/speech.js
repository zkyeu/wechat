/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){

	// 登陆验证
    var timer = null;
    var ajaxLock = false;
    var havenReg = false;
    //skip();
    function skip(){
        var number
        timer = setTimeout(function(){
            number= parseInt($("#skip span").text());
             $("#skip span").text(number-1);
             if(number>1){
                skip();
            }else if(number==1){
                 location.href="http://bbs.51talk.com/forum/detail/5965.html";
            }

        },1000);
        
    }



          var timer2;

      function waitTime(){
          var number;
          timer2 = setTimeout(function(){
              number= parseInt($("#vtip i").text());
              console.log(number);
               $("#vtip i").text(number-1);
               if(number>1){
                  waitTime();
              }else if(number==1){
                  $("#vtip").html("<a href='javascript:void(0)'>获取短信验证码</a>");
              }

          },1000); 
      }
      $("#vtip a").live("click",function(){
          $("#vtip").html("正在发送<i>60</i>s");
           waitTime();
           getCode();
      });
      

      function getCode(){
         var user_name = $("#mobile").val();
         ajaxLock = true;
         $.ajax({ 
                      type: "POST", 
                      dataType: "json", 
                      url:location.href + "/?send=true",
                      data: {mobile:user_name}, 
                      success: function(data) {
                        ajaLock = false;
                        if(data.status==1){
                            /*$("#code").parent().hide();
                            $("#code").attr("data-flag","1");*/
                        }else{
                            /*$("#code").parent().show();
                            $("#code").attr("data-flag","0");
                            //$("#vtip").html("<a href='javascript:void(0)'>获取短信验证码</a>")*/
                        }
                        //$('.submit').removeClass('noback');
                      }
                  });
      }
      function getValid(){
         var user_name = $("#mobile").val();
         ajaxLock = true;
         $.ajax({ 
                      type: "POST", 
                      dataType: "json", 
                      url:location.href + "/?checkMobile=true",
                      data: {mobile:user_name}, 
                      success: function(data) {
                        ajaLock = false;
                        if(data.status==1){
                            $("#code").parent().hide();
                            $("#code").attr("data-flag","1");
                        }else{
                            $("#code").parent().show();
                            $("#code").attr("data-flag","0");
                            //$("#vtip").html("<a href='javascript:void(0)'>获取短信验证码</a>")
                        }
                         ajaxLock = false;
                        $('.submit').removeClass('noback');
                      }
                  });
      }


       $("#mobile").live('blur',function(event){
          event.stopPropagation();
          if(ajaxLock == true){
            return;
          }
           var regMobile=/^1[0-9]{10}$/;
           var user_name = $(this).val();
            if (user_name == "") {
                  alert('请填写手机号码');
                  return false;   
              } else if (!regMobile.test(user_name)) {
                  alert('请填写正确的手机号码');
                  return false;   
              }else{
                  getValid();
              } 
      });
          $("a[name='register']").click(function(){
          var user_name = $("#mobile").val();
          var password = $("#password").val();
          var code = $("#code").val();
          var regMobile=/^1[0-9]{10}$/;
          var regPass=/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
          var regCode =/^([a-z0-9]{5})/;
          if($("#mobile").length>0){
                  if (user_name == "") {
                      alert('请填写手机号码');
                      return false;   
                  } else if (!regMobile.test(user_name)) {
                      alert('请填写正确的手机号码');
                      return false;   
                  } else if (code == "" && $("#code").attr("data-flag")==0) {
                      alert('请输入验证码');
                      return false;   
                  } else if (!regCode.test(code) && $("#code").attr("data-flag")==0) {
                      alert('请填写正确的验证码');
                      return false;   
                  }

                  else if(password=="") {
                      
                      alert('请填写密码');
                      return false;   
                  } else if(!regPass.test(password)) {
                      alert('密码为6-20位字母数字组合');
                      return false;   
                  } else if($("#group").val()==""){
                      alert('请选择组别');
                      return false;  
                  }
                  else {
                    //document.getElementById("regForm").submit();
                      var group = $("#group").val();
                           $.ajax({ 
                                  type: "POST", 
                                  dataType: "json", 
                                  url:location.href,
                                  data: {mobile:user_name,code:code,password:password,group:group}, 
                                  success: function(data) {
                                      if(data.status==0){
                                          $(".speech_mask").show();
                                          $("#success").show();
                                          $("#skip").show();
                                          skip();
                                         
                                      }else if(data.status==1){
                                          $(".speech_mask").show();
                                          $("#haven").show();
                                          $("#haven em").text(data.text);
                                          havenReg=true;
                                      }else if(data.status==2){
                                          $("#nobody").show();
                                      }else{
                                          alert(data.message);
                                      }
                                  }
                              });
                  }
          }else{
              if($("#group").val()==""){
                      alert('请选择组别');
                      return false;  
                  }
                  else {
                    //document.getElementById("regForm").submit();
                      var group = $("#group").val();
                           $.ajax({ 
                                  type: "POST", 
                                  dataType: "json", 
                                  url:location.href,
                                  data: {group:group}, 
                                  success: function(data) {
                                      if(data.status==0){
                                          $(".speech_mask").show();
                                          $("#success").show();
                                          $("#skip").show();
                                          skip();
                                         
                                      }else if(data.status==1){
                                          $(".speech_mask").show();
                                          $("#haven").show();
                                          havenReg=true;
                                          $("#haven em").text(data.text);
                                      }else if(data.status==2){
                                          $("#nobody").show();
                                      }else{
                                          alert(data.message);
                                      }
                                  }
                              });   
                      
                  }
          }
         
      });

    $("#close").click(function(){
        $(".speech_mask").hide();
        clearTimeout(timer);
        clearTimeout(timer2);
         $("#success").hide();
         $("#skip").hide();
         $("#haven").hide();
         $("#nobody").hide();
         $("#skip span").text(3);
         $("#vtip i").text(60);
         if(havenReg){
            $("#tips").show();
            $("#tips em").text($("#haven em").text());
            $(".OneS_logIn").hide();
         } 

    });

     $(".speech_icon,#group0").click(function(event){
          event.stopPropagation();

          if($(".speech_icon").hasClass('down')){
               $('.speech_list').show();
              $('.speech_icon').removeClass('down').addClass("up");
          }else{
             $('.speech_list').hide();
             $('.speech_icon').removeClass('up').addClass("down");
          }
         
      });
      $(document).click(function(){
           $('.speech_list').hide();
           $('#select').removeClass('up').addClass("down");
      });
    $(".speech_list li").click(function(event){
        event.stopPropagation();
        $("#group0").val($(this).text());
        var index = $(".speech_list li").index($(this));
        if(index==0){
            $("#group").val(1);
        }else if(index==1){
            $("#group").val(2);
        }else{
            $("#group").val(3);
        }
         $(".speech_list").hide();
         $('.speech_icon').removeClass('up').addClass("down");
    })
    // 验证码获取倒计时
    var wait = 60;
    function time(o) {
    	if (wait == 0) {
            o.attr("disabled", false);
            o.removeClass("y_code_down");          
            o.text("获取验证码");
            wait = 60; 
    	} else {
    		o.attr("disabled", true);
    		o.addClass("y_code_down");
    		o.text(wait + "秒后可重新获取");
    		wait--;  
            setTimeout(function() {time(o);}, 1000);
    	}
    };

    // if ($("#getCode").hasClass("reg_class") && $("#getCode").hasClass("come_reg")) {
    //     time($("#getCode"));
    // }

    
    
   

});
