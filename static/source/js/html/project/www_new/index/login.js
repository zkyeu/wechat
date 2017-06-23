    //表单验证常用的正则表达式
    document.domain="51talk.com";
  var defaultJson={
    "email":{//邮箱
      "reg":/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i,
      "error":"邮箱格式不正确",
      "empty":"请填写邮箱"
    },
    "mobile":{//手机号
      "reg":/^1[0-9]{10}$/,
      "error":"请填写正确的手机号码",
      "empty":"手机号码不能为空"
    },
    "user_name":{
      "reg":/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i,
      "error":"邮箱格式不正确",
      "empty":"请填写邮箱"
    },
    "nick_name":{
      "reg":/^[A-Za-z\s]{2,20}$/i,
      "error":"请输入正确的英文名字",
      "empty":"英文名字不能为空"
    },
    "age":{
      "reg":/^(\d{1,2}|100)$/,
      "error":"年龄格式不正确",
      "empty":"年龄不能为空"
    },
    "address":{
      "reg":/[^\s]{1,}/,
      "error":"地址不能为空",
      "empty":"地址不能为空"
    },
    "zip_code":{
      "reg":/^[0-9]{6}$/,
      "error":"邮编格式错误",
      "empty":"邮编不能为空"
    },
    "password":{
      "reg":/^[\w\+\!\@\#\$\%\^\&\*\(\)]{6,20}$/,
      "error":"密码格式错误",
      "empty":"密码不能为空"
    },
    "recommen_mobile":{
      "reg":/^([a-z0-9]{6,20})$/,
      "error":"请填写正确的推荐手机号/推荐码",
      "empty":"推荐手机号/推荐码不能为空"
    },
    "qq":{
      "reg":/^[1-9]{1}[0-9]{4,}$/i,
      "error":"qq格式不正确",
      "empty":"qq不能为空",
      "choice":"QQ和Skype不能同时为空"
    }
  };
  $.fn.extend({
    formCheck:function(options){
      options=options || {};
      var defaults={
        "focus"    :false,
        "alertType"  :"alert",
        "enterSubmit":true,
        "json"     :defaultJson
      };
      
      var settings=$.extend(true,defaults,options);
      var type=settings.type;
      var alertType=settings.alertType;
      var enterSubmit=settings.enterSubmit;
      var json=settings.json;
      return this.each(function(index,ele){
        var oForm=$(ele);
        var oBtn=oForm.find(".jsSubmit");
        oBtn.click(function(){
          var aInput=oForm.find("[name].jsCheck");
          if(oForm.attr("submited")) return;
          var bOk=true;
          var errorMsg=null;
          var oNow=null;
          aInput.each(function(index,ele){
            var oInput=$(ele);
            var name=oInput.attr("name");
            var oBtn=oForm.find(".jsSubmit");
            var oInput=$(ele);
            var inputType=oInput.attr("type");
            if(inputType=="radio" || inputType=="checkbox"){
              var val=$.trim($("[name="+name+"]"+":checked").val());
            }else{
              var val=$.trim(oInput.val());
            }
            var regJson=json[name];
            var reg=regJson.reg;
            var error=regJson.error;
            var empty=regJson.empty;
            var prompt=regJson.prompt;
            var same=regJson.same;
            var choice=regJson.choice;
            //当前字段是否可以为空 empty 允许为空
            if(val=="" || val==oInput.attr("placeholder")){
              if(oInput.hasClass("jsEmpty")){
                return bOk=true;
              }else{
                if(oInput.hasClass("jsChoice")){
                  bOk=false;
                  errorMsg=choice;
                  oNow=oInput;
                  $(".jsChoice").each(function(){
                    if($.trim(this.value)){
                      bOk=true;
                      return false;
                    }
                  });
                  return bOk;
                }else{
                  errorMsg=empty;
                  oNow=oInput;
                  return bOk=false;
                }
              }
            }else{
              if(!reg.test(val)){
                errorMsg=error;
                oNow=oInput;
                return bOk=false;
              }
            }
            if(oInput.hasClass("jsSame")){
              if(oInput.val()!=aInput.eq(index-1).val()){
                errorMsg=same;
                oNow=oInput;
                return bOk=false;
              }
            }
            if(oInput.hasClass("jsAjax")){
              $.ajax({
                 type: "POST",
                 dataType:"json",
                 url: oInput.attr("data-url"),
                 async:false,
                 data: oInput.serializeArray(),
                 success: function(res){
                    if(!res.status){
                      errorMsg=res.msg;
                      oNow=oInput;
                      bOk=false;
                    }                             
                }    
              }); 
              return bOk;
            }
          });
          if(bOk){
            //收起错误信息
            hideAlert(alertType,aInput);
            _submit(oForm,settings.cb,alertType);
          }else{
            _alert(alertType,oNow,errorMsg);
          }
          
        });
        //增加回车提交功能
        if(enterSubmit){
          oForm.keydown(function(event){
              if(event.keyCode ==13){
                setTimeout(function(){
                  oBtn.click();
                },30);
              }
          });
        }
        //失去焦点时添加文本提示
        if(settings.focus){
          var aInput=oForm.find(".jsCheck");
          aInput.each(function(index,ele){
            var oInput=$(ele);
            var name=oInput.attr("name");
            var regJson=json[name];
            var reg=regJson.reg;
            var error=regJson.error;
            var empty=regJson.empty;
            var used=regJson.used;
            var prompt=regJson.prompt;

            oInput.focusin(function(){
              hideAlert(alertType,oInput);
            });
            oInput.focusout(function(){
              var val=oInput.val();
              if(val==""){
                //oInput.val("");
              }else{
                if(!(reg.test(val))){
                  _alert(alertType,oInput,error);
                }else{
                  //是否需要ajax及时校验
                  if(oInput.hasClass("jsAjax")){
                    $.ajax({
                       type: "POST",
                       dataType:"json",
                       url: oInput.attr("data-url"),
                       data: oInput.serializeArray(),
                       success: function(res){
                          if(!res.status){
                            _alert(alertType,oInput,res.msg);
                          }                             
                      }    
                    }); 
                  }
                  
                }
                
              }
              
            });
          });
        }
        
      });
    }
  });

  function _alert(alertType,oInput,error){
    switch(alertType){
      case "bottom":
        oInput.closest('li').addClass('u-error').find('.u-err').html(error);
        break;
      case "left":
        oInput.next().html(error).addClass("error").show();
        break;
      case "alert":
        alert(error);
        break;
      case "$alert":
        $.alert(error);
        break;
      default:
        alert(error);
        break;
    }
    
  }
  function hideAlert(alertType,oInput){
    oInput.each(function() {
      switch(alertType){
        case "bottom":
          $(this).closest('li').removeClass('u-error');
          break;
        case "left":
          oInput.next().hide();
          break;
      }
    });
    
  }
  function _submit(oForm,cb,alertType){
    if(cb){
      $.ajax({
                type: oForm.attr("method"),
                dataType: "json",
                url: oForm.attr("action"),
                data: oForm.serializeArray(),
                success: function(res){
                  cb(res);
                }
            });
    }else{
        oForm.submit();
    }
    
  }

//ssologin

window.ssoController = {
          preLogin:function(){
            $.ajax({
                    url: 'http://login.51talk.com/sso/prelogin',
                    dataType: 'jsonp',
                    jsonpCallback: 'preLoginCallBack',
                    data: $('#LoginForm').serialize(),
                    type: 'get',
                    success: function(ret) {
                        $('#login_la').val(ret.res.la);
                        //收起错误信息
                        $("#password2").removeAttr('name');
                $("#LoginForm").attr("submited",true).submit().find('li.u-error').removeClass('u-error').end().find('.jsSubmit').val("登录...");
                    }
                });
          },
          regBack:function(dataObj){
            var data = eval(dataObj);
            if(data.code == 10000){
              if(data.from_url){
                top.location.href= data.from_url;
              }else{
                top.location.reload();
              }
            }else{
            $(".m-reg [name='user_name']").blur().closest('li').addClass('u-error').find('.u-err').html(data.msg);
                     
            }
          },
          feedBack: function(dataObj){
            var data = eval(dataObj);
            if(data.code == 10000){
              if(data.from_url){
                top.location.href= data.from_url;
              }else{
                top.location.reload();
              }
            }else{
            $('#password').blur().closest('li').addClass('u-error').find('.u-err').html(data.msg);
            $("#password2").attr('name',"password2");
            $("#LoginForm").removeAttr("submited").find('.jsSubmit').val("登录");         
            }
          },
          getPublicKey:function(){
            var client_id = $('input[name=client]').val() || 1;
            if($("#public_key").val()){
              return;
            }
            $.ajax({
                    url: 'http://login.51talk.com/sso/publickey',
                    dataType: 'jsonp',
                    jsonpCallback: 'pubkeyCallBack',
                    data: {'client':client_id},
                    type: 'get',
                    success: function(ret) {
                        $("#public_key").val(ret.res.rsa_pub);
                    }
                });
          }
      };
      (function(){
        var loginForm=$("#LoginForm");
        $("body").append("<iframe id='ssoLoginFrame' name='ssoLoginFrame' width='0' height='0' style='display:none;'></iframe>");
          var hidden3='<input type="hidden" name="public_key" id="public_key" />'+
                      '<input type="hidden" name="la" id="login_la" />'+
                      '<input type="hidden" name="group" id="group" value="4" />';
          loginForm.attr({
              "target" : "ssoLoginFrame",
              "action" : "http://login.51talk.com/sso/login"
          }).append(hidden3);
          //$("#autologin").attr( "checked", true );
          // prelogin
          ssoController.getPublicKey();
          $('#username').blur(function(){
              $.ajax({
                  url: 'http://login.51talk.com/sso/prelogin',
                  dataType: 'jsonp',
                  jsonpCallback: 'preLoginCallBack',
                  data: loginForm.serialize(),
                  type: 'get',
                  success: function(ret) {
                      $('#login_la').val(ret.res.la);
                  }
              });
              return false;
          }).focus(function(){
            ssoController.getPublicKey();
          });
          $('#password').focus(function(){
            ssoController.getPublicKey();
          });
      })();


//登录 注册翻转
      $(".m-main .m-tab li").not(".crt").on("click",function(){
        var index=$(this).index();
        $('.m-ipts').find("input[name='mobile']").focus();
        $(".m-main").toggleClass('turn').children().css("z-index",3).eq(index).css("z-index",4);
      });
//登录
      $("#LoginForm").formCheck({
          "focus" :true,
          "alertType":"bottom",
          "json":{
            "username":{//手机号
              "reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
              "error":"用户名格式错误",
              "empty":"请输入用户名"
            },
            "user_name":{//手机号
              "reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
              "error":"用户名格式错误",
              "empty":"请输入用户名"
            },
            "password2":{
              "reg":/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/,
              "error":"密码格式错误",
              "empty":"密码不能为空"
            }
          }
      }).on("submit",function(){
          //及时验证用户名+密码
          var oForm=$(this);
          if(oForm.attr("submited")) return true;

          var login_la = $('#login_la').val();
              var public_key = $('#public_key').val();
              var password = $('#password2').val();

          if(!public_key){
                //$('#username').closest('li').addClass('u-error').find('.u-err').html("您的用户名或密码错误");
                ssoController.getPublicKey();

              }
              var encrypt = new JSEncrypt();
              encrypt.setPublicKey(public_key);
              var encrypted = encrypt.encrypt(password);
              $("#password").val(encrypted);
              if(!encrypted || encrypted=="false"){
                $("#password").val(hex_md5(password));
              }
              if(!login_la){
                ssoController.preLogin();
              }else{
                //收起错误信息
                $("#password2").removeAttr('name');
                oForm.attr("submited",true).submit().find('li.u-error').removeClass('u-error').end().find('.jsSubmit').val("登录...");
                /*oForm.attr("submited",true).find('li.u-error').removeClass('u-error').end().find('.jsSubmit').val("登录...");*/
               /* $.ajax({
                    "url":"http://login.51talk.com/sso/login",
                    type:"post",
                    data:{
                      client:$("[name='client']").val(),
                      la:$("[name='la']").val(),
                      password:encrypted,
                      'user_name':$("#username").val()
                    },
                    success:function(res){
                      if(res.code == 10000){
                        if(res.from_url){
                          top.location.href= res.from_url;
                        }else{
                          top.location.reload();
                        }
                      }else{
                        $('#password').blur().closest('li').addClass('u-error').find('.u-err').html(res.msg);
                        $("#password2").attr('name',"password2");
                        $("#LoginForm").removeAttr("submited").find('.jsSubmit').val("登录");         
                      }
                    }
                })*/
              }
              return false;
      });
//注册
$(".m-reg form").formCheck({
        "focus" :true,
        "alertType":"bottom"
      }).on("submit",function(){
        $(this).attr("submited", "true");
      });
        //注册手机号失焦判断
      var iptsInput = $(".m-ipts li").eq(0).find("input");
      iptsInput.blur(function(){
          var reTel = /^1[0-9]{10}$/;
          var tel = $(this).val();
          if (!reTel.test(tel)) {
            $(this).closest("dl").next(".u-err").show();
            $(this).closest("dl").next(".u-err").html("请填写正确的手机号码");
            return false;
          }

          var mobileName = iptsInput.val();
          $.ajax({
                  url: "http://login.51talk.com/ajax/mobilevalidate",
                  data: {"mobile":mobileName},
                  type: "POST",
                  dataType:"json",
                  success:function(res){
                    if(res.code!="10000") {
                      top.$(".notice-mast-box").show();
                      top.$(".m-notice").find("p").html(res.message);
                      $(".duosuo-success,.duosuo-fail").remove();
                    }         
                  }
          });
      });
      //注册登录优化--若您有推荐人/推荐码，请点这里--20160315--张天
      $(".referral-code").on("click",function(){
          $(this).hide();
          $(this).next("dl").show();
          $(".m-referral").removeClass("m-referral");
      });
      //点击提示框的换个号码注册
      $(".sub-left").on("click",function(){
          var subInputM = $(".m-ipts").find("input[name='mobile']");
          top.$(".notice-mast-box").hide();
          subInputM.focus();
          subInputM.val("");
      });
      //点击提示框的登录
      $(".sub-left").next("li").on("click",function(){
          var tel = $('.m-ipts').find("input[name='mobile']");
          var subInput = $(".m-log").find("input[name='user_name']");
          top.$(".notice-mast-box").hide();
          $(".m-main").toggleClass('turn').children().css("z-index",3).eq(1).css("z-index",4);

          if("placeholder" in document.createElement("input")){
            subInput.val(tel.val()).focus();
            $(".m-log").find("input[name='password']").focus();
          }else{
            subInput.val(tel.val()).next().focus();
            $(".m-log").find("input[name='password']").next().focus();
          }
          tel.val("");
      });


      //placeHoder

      (function(){

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


      })()