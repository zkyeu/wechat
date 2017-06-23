define("formCommon",["utility"],function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    // 表单验证
    ;(function(){
        $("[rel=from]").formVerify({
            rules:{
                // 学生登录
                stu : {
                    required:[true,"请输入手机号或账号"],
                    reg:[regs.stu,"请输入正确的手机号或账号"]
                },
            	// 老师学生注册第1步 register_step1
                phone:{
                    required:[true,"请输入手机号"],
                    reg:[regs.phone,"请输入正确的手机号"]
                },
                verifycode:{
                    required:[true,"请输入手机验证码"],
                    reg:[regs.verifycode,"请输入正确的手机验证码"]
                },
                password:{
                    required:[true,"请输入密码"],
                    reg:[regs.password,"请输入正确的密码"]
                },
                eqpassword:{
                    required:[true,"请再次输入新密码"],
                    reg:[regs.password,"请再次输入正确的新密码"],
                    equalto:["[rel=password]","两次输入新密码不一致"]
                },
                invitecode:{
                    required:[true,"请输入班级邀请码"]
                },
                // 老师学生注册第1步 register_step1
                // 老师学生注册第2步 register_step2
                cnname:{
                    required:[true,"请输入中文名"],
                    reg:[regs.cnname,"请输入正确的中文名"]
                },
                enname:{
                    required:[true,"请输入英文名"],
                    reg:[regs.enname,"请输入正确的英文名"]
                },
                // 老师学生注册第2步 register_step2
                // 输入学生姓名
                stuname:{
                    required:[true,"请输入学生姓名"]
                },
                // 代理商
                teachername:{
                    required:[true,"请输入老师姓名"]
                },
                teacherphone:{
                    required:[true,"请输入手机号码"],
                    reg:[regs.phone,"请输入正确的手机号码"]
                },
                // 学生激活
                // 邀请码或者手机号
                activeorphone:{
                    required:[true,"请输入邀请码或老师手机号"],
                    reg:[regs.activeorphone,"请输入正确的邀请码或老师手机号"]
                }
            }
        });        
    })();

    // 获取验证码
    ;(function(){
    	var sendVerify = $(".send-verify");
    	if(!sendVerify.get(0)) return;
        var from = $.formVerify.formlist.from;
        utility.deftime({
            url:$("[send-url]").attr("send-url"),
            tar:".send-verify>input[type=button]",
            success:function(r){
                if(r.status == 1){
                    from.verifycode.setState(false,"短信发送成功，请查收！");
                    return true;
                }else{
                    from.verifycode.setState(false,r.info);
                }
            },
            error:function(){
                from.verifycode.setState(false,"短信发送失败，请重试！");
            },
            sendBefore:function(){
                var phone = from.phone,
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