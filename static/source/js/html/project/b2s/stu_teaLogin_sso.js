define("stu_teaLogin_sso",["utility","rsa"],function(require,exports,module){
     var utility = require("utility"),
        regs = $.formVerify.utility.regs;
        require("rsa");
    //鼠标滑过
    ;(function(){
        var $adv_box = $(".adv_box");
        $adv_box.hover(function(){
            var oMask=$(this).find(".discribe");
            oMask.show().stop().animate({"top":0},"fast");
        },function(){
            var oMask=$(this).find(".discribe");
            oMask.show().stop().animate({"top":188},"fast");
        });
    })();

    $(function(){  
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失  
        $(function () {  
            $(window).scroll(function(){  
                if ($(window).scrollTop()>100){  
                    $("#back-to-top").show();  
                }  
                else  
                {  
                    $("#back-to-top").hide();  
                }  
            });  
  
            //当点击跳转链接后，回到页面顶部位置  
  
            $("#back-to-top").click(function(){  
                $('body,html').animate({scrollTop:0},300);  
                return false;  
            });  
        });  
    });  

    //登录
        ;(function(){
        var checkFn = function(v){
                $(v).formVerify({
                    rules:{
                        phone:{
                            required:[true,"请输入手机号"],
                            reg:[regs.stu,"请输入正确的手机号"]
                        },
                        stu:{
                            required:[true,"请输入手机号"],
                            reg:[regs.stu,"请输入正确的手机号"]
                        },
                        password:{
                            required:[true,"请输入密码"],
                            reg:[regs.password,"请输入正确的密码"]
                        }
                    },
                    errorHandler:function(flag,text){
                        var type = flag ? "hide" : "fadeIn";
                        $(this).closest("ul").find("em").text(text).parent(".error-tips")[type]();
                    },
                    submitHandler:function(){
                        var self = this,
                            flag = self.checkFlag;
                           
                        if(flag){
                            var login_la = $('.login_la').val();
                            var public_key = $('#public_key').val();
                            //获取当前正在登录的密码
                            var password = this.find('input[rel="password"]').val();
                          
                            if(!public_key){
                                //$('#username').closest('li').addClass('u-error').find('.u-err').html("您的用户名或密码错误");
                                ssoController.getPublicKey();

                            }
                            var encrypt = new JSEncrypt();
                            encrypt.setPublicKey(public_key);
                            var encrypted = encrypt.encrypt(password);
                            this.find('.jm_password').val(encrypted);
                            if(!encrypted || encrypted=="false"){
                              this.find('.jm_password').val(hex_md5(password));
                            }
                            if(!login_la){
                                ssoController.preLogin();
                            }else{
                                //收起错误信息
                             //   $("#password2").removeAttr('name');
                               //         oForm.attr("submited",true).submit().find('li.u-error').removeClass('u-error').end().find('.jsSubmit').val("登录...");
                            }
                           // submit-fla=0表示不可再提交
                           var submitFlag = self.attr('submit-flag');
                            if(submitFlag  != 0){
                                self.attr('submit-flag',0);
                                self[0].submit();
                            }
                        }
                    }
                }).on({
                    focus:function(){
                        $(this).closest("ul").addClass("active").find(".error-tips").hide();
                    },
                    blur:function(){
                        $(this).closest("ul").removeClass("active");
                    }
                },"[rel]").on("click",".clear_text",function(){
                    $(this).siblings(".li_input").find("input").val("");
                });
            }

        checkFn("[rel=stu]"),checkFn("[rel=tea]");

       
    })();

    //登录切换
    ;(function(){
        var sBox = $(".s-box");
        $(".st_text").on("click","span",function(){
            var self = $(this),
                index = self.index();

            self.addClass("on_text").siblings().removeClass("on_text");
            //self.addClass("on_text").removeAttr('id').siblings().removeClass("on_text").attr("id","LoginForm");
            sBox.eq(index).show().siblings(".s-box").hide().find("[rel]").val("").parent().siblings(".error-tips").hide();
        });

    })();
    //sso相关
    if($('#b2sSsoId').val() == 'true'){
        window.ssoController = {
            preLogin:function(){
                $.ajax({
                    url: 'http://login.51talk.com/sso/prelogin',
                    dataType: 'jsonp',
                    jsonpCallback: 'preLoginCallBack',
                    data: $('#teaLoginForm').serialize(),
                    type: 'get',
                    success: function(ret) {
                        $('.login_la').val(ret.res.la);
                    }
                });
            },
            feedBack: function(dataObj){
                var data = eval(dataObj);

                //设置登录按钮为可提交状态

                var loginFormId = data.role == "student" ? "stuLoginForm" : "teaLoginForm";
                $('#'+ loginFormId).attr('submit-flag',1);

                if(data.code == 10000){
                    if(data.from_url){
                        window.location.href= data.from_url;
                    }else{
                        window.location.reload();
                    }
                }else{
                    var roleV = '';
                    var roleV = data.role == "student" ? "stu" : "tea";
                    $.formVerify.formlist[roleV].password.setState(false,data.msg);            
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
        //动态插入iframe为sso跨域做准备
        (function(){
            var loginForm=$("#LoginForm");
            $("body").append("<iframe id='ssoLoginFrame' name='ssoLoginFrame' width='0' height='0' style='display:none;'></iframe>");
            var hidden3='<input type="hidden" name="public_key" id="public_key" />'+
                        '<input type="hidden" name="la" class="login_la"  />'+
                        '<input type="hidden" name="group" id="group" value="4" />';
            $('#teaLoginForm, #stuLoginForm').attr({
                "target" : "ssoLoginFrame",
                "action" : "http://login.51talk.com/sso/login"
            }).append(hidden3);

            // prelogin
            ssoController.preLogin();
            ssoController.getPublicKey();
           

            $('input[name="user_name"],input[name="password"]').focus(function(){
                ssoController.getPublicKey();
            });
        })();
    }
    //二维码显示
    // $(".show-img").mouseenter(function(){
    //     $(".hd-img").show();
    // });
    // $(".show-img").mouseleave(function(){
    //     $(".hd-img").hide();
    // });

});