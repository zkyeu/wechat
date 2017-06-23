/**
 *
 * @authors vincent (wuyan@51talk.com)
 * @date    2017-05-27 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
    
    var tmall_landing = {
        init: function(){
            this.ajax_able = true;//是否可以调用ajax接口
            $("#login").on("click", this.login);//登录页面登录功能
            $("#commitBtn").on("click", this.activateCode);//激活码激活按钮
            $("#register").on("click", this.register);//注册页面注册功能
            $(".get_code").on("click", this.getCode);//获取手机验证码
        },
        activateCode: function(){
            var mobile = $("#reg1_tel").val();
            var imgCode = $('#authCode').val();
            
            if(!mobile){
               $(".error-mode").find("span").html("请填写验证码").end().css({"display":"block"});
               return false; 
            }
            if(!imgCode||(imgCode.length && imgCode.length<1)){
                $(".error-mode").find("span").html("请填写图片验证码").end().css({"display":"block"});
                return false;
            }
            $(".error-mode").css({"display":"none"});

            $.ajaxRequest("/ajax/tmallCode",{  tmall_code: mobile, verify_code: imgCode},function(res){
                if(res.status == 1){
                    window.location = res.data;
                }
            },function(res){
                if(res.status == 0){
                    $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                    $(".error-mode").find("span").html(res.info).end().css({"display":"block"});
                }
               
            });
        },
        register: function(){
            var mobile = $("#reg1_tel").val();
            var imgCode = $('#authCode').val();
            var tel_code = $('#tel_code').val();
            var reTel = /^1[0-9]{10}$/;
            if(!mobile){
               $(".tel_mode").find("span").html("请填写手机号").end().css({"display":"block"});
               return false; 
            }
            if(!reTel.test(mobile)){
                $(".tel_mode").find("span").html("请填写正确的手机号码！").end().css({"display":"block"});
                return false;
            }
            $(".tel_mode").css({"display":"none"});
            if(!imgCode||(imgCode.length && imgCode.length<1)){
                $(".all_mode").find("span").html("请填写图片验证码").end().css({"display":"block"});
                return false;
            }
            if(!tel_code){
               $(".all_mode").find("span").html("请填写手机验证码").end().css({"display":"block"});
               return false; 
            }
            $(".error-mode").css({"display":"none"});
            $.ajaxRequest("/ajax/mobileCodeRegister",{ mobile: mobile, mobile_code: tel_code},function(res){
                if(res.status == 1){
                    window.location = res.data;
                }
            },function(res){
                if(res.status == 0){
                    $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                    $(".all_mode").find("span").html(res.info).end().css({"display":"block"});
                }else if(res.status == 2){
                    $(".tel_mode").find("span").html(res.info).end().css({"display":"block"});
                }
               
            });
        },
        getCode: function(){
            if (this.bAjax) {
                return;
            }
            var _this=this;
            var reTel = /^1[0-9]{10}$/;
            var mobile=$("#reg1_tel").val();
            var imgCode = $('#authCode').val();
            if(!reTel.test(mobile)){
                $(".tel_mode").find("span").html("请填写正确的手机号码！").end().css({"display":"block"});
                return false;
            }else if(!imgCode||(imgCode.length && imgCode.length<1)){
                $(".all_mode").find("span").html("请填写图片验证码").end().css({"display":"block"});
                return false;
            }else{
                this.bAjax=true;
                $(this).html("请稍等...");
                $.ajax({
                    type:"GET",
                    dataType:"jsonp",
                    url:"http://www.51talk.com/passport/getMobileCode",
                    data: {"mobile":mobile,"authCode":imgCode, type:"reg_or_login"},
                    success: function(res){
                        
                        if(res.status==1){
                            tmall_landing.timer(_this,120);
                            $(".tel_mode").css({"display":"none"});
                            var content = $(".all_mode").find("span").html();
                            if(content.indexOf("图片") > -1 || content.indexOf("过期") > -1){
                                $(".all_mode").css({"display":"none"});
                            }
                        }else{
                            _this.innerHTML="重新获取";
                            _this.bAjax=false;
                            $(".all_mode").find("span").html(res.info).end().css({"display":"block"});
                            if(res.status==2){
                                $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                            }
                        }

                    }
                });
            };
        },
        timer: function(obj,count){
            obj.innerHTML="请稍等...";
            obj.timer=setInterval(function(){
                count--;
                if(count==0){
                    obj.innerHTML= "重新获取";
                    obj.bAjax=false;
                    clearInterval(obj.timer);
                }else{
                    var str=count+"秒";
                    obj.innerHTML=str;
                }
            },1000);
        },
        login: function(){
            var reTel = /^1[0-9]{10}$/;
            var reEmail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
            var tel = $("#reg1_tel").val();
            var pwd = $("#password").val();
           
            if (tel == "") {
                $(".error-mode").find("span").html("请填写账号").end().css({"display":"block"});
                return false;
            }
            if(tel.indexOf("@") != -1){
                if (!reEmail.test(tel)) {
                    $(".error-mode").find("span").html("请填写正确格式邮箱号码").end().css({"display":"block"});
                    return false;
                }
            }else{
                if (!reTel.test(tel)) {
                    $(".error-mode").find("span").html("请填写正确格式手机号码").end().css({"display":"block"});
                    return false;
                }
            }
            if (pwd == "") {
                $(".error-mode").find("span").html("请填写密码").end().css({"display":"block"});
                return false;
            }
            $(".error-mode").css({"display":"none"});
            
            

            $.ajaxRequest("/ajax/ajaxLogin",{user_name: tel, password: pwd},function(res){
                if(res.status == 1){
                    window.location = res.data;
                }
            },function(res){
                $(".error-mode").find("span").html(res.info).end().css({"display":"block"});
            });
        }
    
        
    };
    $.extend(true,$,{
        ajaxRequest: function(url, params, callback, errorCallback, settings){
            if(tmall_landing.ajax_able){
                tmall_landing.ajax_able = false;
                $.ajax({
                    url: url,
                    type: (settings && settings.method) || "POST",
                    dataType: (settings && settings.dataType) || "json",
                    data: params,
                    success: function(response){
                        tmall_landing.ajax_able = true;
                        if(response.status == 1){
                            !!callback && callback(response);
                        }else if(response.status == -1){
                            window.location.href = response.data;
                        }else{
                            !!errorCallback && errorCallback(response);
                        }
                    },
                    error: function(){
                        tmall_landing.ajax_able = true;
                        console.log("fail")
                    }
                })
            }
        }
        
    });
    $(function(){
       
        tmall_landing.init();
    });
});



