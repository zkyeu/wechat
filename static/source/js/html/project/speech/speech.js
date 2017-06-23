define(function(require,exports,module){
	require("placeholder");
      // 登陆验证
      var timer = null;
      //skip();
      var ajaxLock = false;
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
      var havenReg = false;
      var havenSucess = false;
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
         if($(this).hasClass('noback') && $("#mobile").val()!=""){
          return;
         }
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
                  }else if (code == "" && $("#code").attr("data-flag")==0) {
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
                                          $(".login").hide();
                                          $(".win2").show();
                                          $("#success").show();
                                          $("#skip").show();
                                          havenSucess = true;
                                          skip();
                                         
                                      }else if(data.status==1){
                                          $(".login").hide();
                                          $(".win2").show();
                                          $("#haven em").text(data.text);
                                          $("#haven").show();
                                          havenReg = true;
                                      }else if(data.status==2){
                                          $(".login").hide();
                                          $(".win2").show();
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
                                          $(".login").hide();
                                          $(".win2").show();
                                          $("#success").show();
                                          $("#skip").show();
                                          havenSucess = true;
                                          skip();
                                      }else if(data.status==1){
                                          $(".login").hide();
                                          $(".win2").show();
                                          $("#haven em").text(data.text);
                                          $("#haven").show();
                                          havenReg = true;

                                      }else if(data.status==2){
                                          $(".login").hide();
                                          $(".win2").show();
                                          $("#nobody").show();
                                      }else{
                                          alert(data.message);
                                      }
                                  }
                              });   
                      
                  }
          }
         
      });
      
      $(".btn").click(function(){
          $.ajax({
            url:location.href+"?test=test",
            dataType: "json", 
            data:{group:1},
            type:"POST"
          });
          $(".m-dialog").show();
          if(havenReg){
            $('.login').hide();
             $(".win2").show();
            $(".win2 #haven").show();
          }
          if(havenSucess){
             $('.login').hide();
             $(".win2").show();
             $(".win2 #success").show();
          }
      });

      $("#close").click(function(){
          $(".m-dialog").hide();
          clearTimeout(timer);
          clearTimeout(timer2);
          $('.login').show();
          $(".win2").hide();
          $(".win2 #success").hide();
           $(".win2 #skip").hide();
           $(".win2 #haven").hide();
           $(".win2 #nobody").hide();
           $(".win2 #skip span").text(3)
           $(".win2 #vtip i").text(60);

      });
      $(".speech_icon,#group0").click(function(event){
          event.stopPropagation();
          if($(".speech_icon").hasClass('down')){
               $('.speech_list').show();
              $('#select').removeClass('down').addClass("up");
          }else{
             $('.speech_list').hide();
             $('#select').removeClass('up').addClass("down");
          }
         
      });
      $(document).click(function(){
           $('.speech_list').hide();
           $('#select').removeClass('up').addClass("down");
      });
      $(".speech_list li").click(function(event){
          //event.stopPropagation();
          $("#group0").val($(this).text());
          var index = $(".speech_list li").index($(this));
          if(index==0){
              $("#group").val(1);
          }else if(index==1){
              $("#group").val(2);
          }else{
              $("#group").val(3);
          }
          $("#group").focus().blur();
           $('#select').addClass('down').removeClass("up");
           $(".speech_list").hide();

      })
});