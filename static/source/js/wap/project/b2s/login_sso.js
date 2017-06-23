define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;
     //   require("http://one.frontend.com/static/js/rsa");
        require("rsa");
    // 表单验证
    ;(function(){
        $("[rel=login]").formVerify({
            rules:{
                phone:{
                    required:[true,"请输入手机号"],
                    reg:[regs.phone,"请输入正确的手机号"]
                },
                password:{
                    required:[true,"请输入密码"],
                    reg:[regs.password,"请输入正确的密码"]
                }
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
                                ssoController.getPublicKey();
                            }
                            var encrypt = new JSEncrypt();
                            encrypt.setPublicKey(public_key);
                            var encrypted = encrypt.encrypt(password);
                            this.find('#password').val(encrypted);
                            if(!encrypted || encrypted=="false"){
                              this.find('#password').val(hex_md5(password));
                            }
                            if(!login_la){
                                ssoController.preLogin();
                            }
                            // submit-fla=0表示不可再提交
                            var submitFlag = self.attr('submit-flag');
                            if(submitFlag  != 0){
                                self.attr('submit-flag',0);
                                self[0].submit();
                            }
                    }
            }
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
                    data: $("[rel=login]").serialize(),
                    type: 'get',
                    success: function(ret) {
                        $('.login_la').val(ret.res.la);
                    }
                });
            },
            feedBack: function(dataObj){
                $('[rel="login"]').attr('submit-flag',1);
                var data = eval(dataObj);
                
                if(data.code == 10000){
                    if(data.from_url){
                        window.location.href= data.from_url;
                    }else{
                        window.location.reload();
                    }
                }else{
                    $.formVerify.formlist["login"].password.setState(false,data.msg);            
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
            var loginForm=$("[rel=login]");
            $("body").append("<iframe id='ssoLoginFrame' name='ssoLoginFrame' width='0' height='0' style='display:none;'></iframe>");
            var hidden3='<input type="hidden" name="public_key" id="public_key" />'+
                        '<input type="hidden" name="la" class="login_la"  />'+
                        '<input type="hidden" name="group" id="group" value="4" />';
            loginForm.attr({
                "target" : "ssoLoginFrame",
                "action" : "http://login.51talk.com/sso/login"
            }).append(hidden3);

            // prelogin
            ssoController.preLogin();
            ssoController.getPublicKey();
           

            $('.input-t-style').focus(function(){
                ssoController.getPublicKey();
            });
        })();
    }
});