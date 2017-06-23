define(function(require, exports, module) {
     var utility = require("utility"),
        regs = $.formVerify.utility.regs,
        promptDialog = utility.promptDialog;

    // 表单验证
    ;(function(){
        $("[rel=forgetpsw]").formVerify({
            rules:{
                selgrade: {
                    required: [true, "请选择年级"]
                },
                phone:{
                    required:[true,"请输入手机号"],
                    reg:[regs.phone,"请输入正确的手机号"]
                },
                verifycode:{
                    required:[true,"请输入手机验证码"],
                    reg:[regs.verifycode,"请输入正确的手机验证码"]
                },
                password:{
                    required:[true,"请输入新密码"],
                    reg:[regs.password,"请输入正确的密码"]
                }
            },
            errorHandler:function(flag, text){
                var tips = this.siblings(".err_tips");
                flag ? tips.hide() : tips.show();
            }
        });        
    })();

    // 倒计时
    ;(function(){
        var forgetpsw = $.formVerify.formlist.forgetpsw;
        utility.deftime({
            url:$(".box_send_code").attr("send-url"),
            tar:".send-verify",
            success:function(r){
                if(r.status == 1){
                    //forgetpsw.verifycode.setState(false,"短信发送成功，请查收！");
                    promptDialog({
                        content:"短信发送成功，请查收！"
                    });
                    return true;
                }else{
                    //forgetpsw.verifycode.setState(false,r.info);
                    promptDialog({
                        content:r.info,
                        myClass:"box_change_height",
                        width:"auto",
                        height:"auto",
                    });
                    if(r.data.length == 0){
                        setTimeout(function(){
                            window.location.reload();
                        },2000);
                    }else{
                        setTimeout(function(){
                            window.location.assign(r.data);
                        },2000);
                    }
                    
                }
            },
            error:function(){
                //forgetpsw.verifycode.setState(false,"短信发送失败，请重试！");
                 promptDialog({
                        content:"短信发送失败，请重试！"
                    })
            },
            sendBefore:function(){
                var phone = forgetpsw.phone,
                    checkFlag = phone.trigger("blur").checkFlag;
                if(!checkFlag) return;
                return {
                    mobile : phone.val(),
                    sms_type : $("[send-type]").attr("send-type")
                }
            }
        });
    })();


    //select 框选择

    (function(){
       var $select = $("select"),
           $select_class = $(".select_class"),
           $box_monkey_close = $(".box_monkey_close"),
           $sign_up = $(".sign_up"),
           $box_landing_confirm= $(".box_landing_confirm");
       $select.on("change",function(){
            var self = $(this),
                val = self.val();
                var text = self.find("option:selected").text();
                if(text == "请选择开学前年级"){
                    text = "请选择开学<span>前</span>年级";
                }
                $select_class.html(text);
       });
       $box_monkey_close.on("click",function(){
            $box_landing_confirm.removeClass("box_landing_confirm_open");
       });
       $sign_up .on("click",function(){
            $box_landing_confirm.css({"display":"block"});
            setTimeout(function(){
                $box_landing_confirm.addClass("box_landing_confirm_open");
            },100);
            
       })
    })();

})