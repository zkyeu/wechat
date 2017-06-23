define("b2sLogin_sso",["b2sApp","utility","rsa"],function(require,exports,module){
    
    var
    b2sApp = require("b2sApp"),
    utility = require("utility"),
    regs = $.formVerify.utility.regs;

    require("rsa");
    
    // tab切换
    var $b2sLoginHead = $(".b2s-form-head"),
        $b2sFormTab = $(".b2s-form-tab");
    $b2sLoginHead.on("click",".b2s-form-head-swtich li",function(){
        var $self = $(this);
        if($self.hasClass("cur")) return;
        $self.addClass("cur").siblings().removeClass("cur");
        $b2sLoginHead.toggleClass("cur");
        $b2sFormTab.toggleClass("cur");
    });

    // 自动登录
    var $b2sFormAuto = $(".b2s-form-auto");
    $b2sFormAuto.on("click","label",function(){
        var $self = $(this);
        window.setTimeout(function(){
            var isCheck = $self.siblings("input[type=checkbox]").prop("checked");
            $self.closest(".b2s-form-auto")[(isCheck ? "add" : "remove") + "Class"]("cur");
        },0);        
    });

    // 登录校验
    var checkFn = function(v){
        $(v).formVerify({
            rules:{
                phone:{
                    required:[true,"请输入手机号"],
                    reg:[regs.phone,"请输入正确的手机号"]
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
                var $self = $(this),
                    $err = $self.siblings(".b2s-form-error");
                !flag && $err.text(text);
                $err.closest("dl")[(flag ? "remove" : "add") + "Class"]("b2s-form-iserror");

                return;
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
        }).on("focus","input[rel]",function(){
            $(this).closest("dl").removeClass("b2s-form-iserror");
        }).on("click",".b2s-form-error",function(){
            $(this).siblings("input").trigger("focus");
        });
    }

    checkFn("[rel=stu]"),checkFn("[rel=tea]");

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

    // placeholder修复
    utility.placeHolderFix.init(58);
});