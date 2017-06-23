define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;
        //更改手机号提示输入新手机号
    var $active_numbr = $(".active_numbr");
        valNumber = $active_numbr.text(),
        $change_next = $(".change_next"),
        input_number = $(".input_number").find("input").eq(0),
         $change_number = $(".change_number");
    // 表单验证
    ;(function(){
        $("[rel=studentEnter]").formVerify({
            rules:{
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
                    reg:[regs.password,"请输入正确的新密码"]
                }
            },
            submitHandler:function(){
                var checkFlag = this.checkFlag;
                if(!checkFlag) return;
                var formType = $("[name=formType]").attr("formtype");
                //console.log(formType);
                if(!!formType){
                    //console.log(formType); 
                    switch(formType){
                        case "studentEnter1":// 下一步 弹窗
                        //alert(aa);
                            if(input_number.val() == valNumber ){
                                utility.promptDialog({
                                    content:"该手机号与当前绑定手机号相同",
                                    myClass:"change_number_next_dialog",
                                    width:"auto",
                                    height:"auto",
                                });
                                return false;
                            }else{
                                var number_url = $change_next.attr("number-url");
                               // alert(number_url);
                                $.ajax({
                                    url: number_url,
                                    type: "get",
                                    cache: false,
                                    data: {
                                        change_number: input_number.val()
                                    },
                                    dataType: "json",
                                    success: function(data) {
                                        var status = data.status;
                                        if (status == 1) {//填写错误
                                            utility.promptDialog({
                                                content:data.info,
                                                myClass:"change_number_next_dialog",
                                                //lineHight:40,
                                                width:"auto",
                                                height:"auto",
                                            });
                                        }
                                        if (status == 0) {
                                            //this[0].submit();
                                            window.location.assign("/wap/editMobile");
                                        }
                                    }
                                });

                            }
                        break;

                        case "studentEnter2": //验证码
                            var codeurl =  $change_number.eq(1).attr("codeurl");
                            console.log(codeurl);
                            $.ajax({
                                    url: codeurl,
                                    type: "get",
                                    cache: false,
                                    dataType: "json",
                                    data:{
                                        codevalue:$(".input-t-style").eq(1).val(),
                                    },
                                    success: function(data) {
                                        var status = data.status;
                                        if (status == 1) {//填写错误
                                            //console.log(status+"==============,"+data.info);
                                            utility.promptDialog({
                                                content:data.info,
                                                //content:"填写错误",
                                                width:"auto",
                                                height:"auto",
                                                myClass:"change_number_next_dialog",
                                                //showTime:20000,
                                                //lineHight:40,
                                            });
                                        }

                                        if (status == 0) {
                                            //this[0].submit();
                                            utility.promptDialog({
                                                content:"修改成功",
                                                width:"auto",
                                                height:"auto",
                                                myClass:"change_number_next_dialog",
                                            });
                                            //console.log("为零 判断成功");
                                            setTimeout(function(){
                                                window.location.assign("/wap/teaAccountCenter");
                                            },2000);
                                        }
                                    }
                                });
                        break;
                    }
                    return false;
                }else{
                    // 其他 表单提交
                    //console.log("表单提交");
                    this[0].submit();
                }
            }
        });        
    })();

    //倒计时
    ;(function(){
        var studentEnter = $.formVerify.formlist.studentEnter;
        utility.deftime({
            url:$("[send-url]").attr("send-url"),
            tar:".send-verify>input[type=button]",
            success:function(r){
                if(r.status == 1){
                    studentEnter.verifycode.setState(false,"短信发送成功，请查收！");
                    return true;
                }else{
                    studentEnter.verifycode.setState(false,r.info);
                }
            },
            error:function(){
                studentEnter.verifycode.setState(false,"短信发送失败，请重试！");
            },
            sendBefore:function(){
                //if($(".change_number").length!=0)
                var phone = studentEnter.phone,
                    checkFlag = phone.trigger("blur").checkFlag;
                if(!checkFlag) return;
                return {
                    mobile : phone.val(),
                    sms_type : $("[send-type]").attr("send-type")
                }
            }
        });
    })();
});