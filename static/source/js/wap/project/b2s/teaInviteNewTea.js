define(function(require, exports, module) {
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    // 表单验证
    ;
    (function() {
        //转让班级，选取老师。
        $(".js_selectTeacher").on("click","li",function(){
            var _this = $(this),
                _phone = _this.data('phone');
            _this.addClass('selected').siblings().removeClass('selected');
            $("#js_radioVal").val(_phone);
        })

        //验证表单提交格式
        $("[rel=from]").formVerify({
            rules: {
                teachername: {
                    required: [true, "请输入老师姓名"]
                },
                teacherphone: {
                    required: [true, "请输入手机号码"],
                    reg: [regs.phone, "请输入正确的手机号码"]
                }
            },
            // 默认校验处理函数
            errorHandler: function(flag, text) {
                // for wap b2s reg
                var tip = this.closest(".tea-invite-input").next(".error-tips");
                flag ? tip.html("").hide() : tip.html(text).fadeIn();
            }
        });

        $("[rel=from1]").formVerify({
            rules: {
                teacherphone: {
                    required: [true, "请输入手机号码"],
                    reg: [regs.phone, "请输入正确的手机号码"]
                }
            },
            // 默认校验处理函数
            errorHandler: function(flag, text) {
                // for wap b2s reg
                var tip = this.closest(".tea-invite-input").next(".error-tips");
                flag ? tip.html("").hide() : tip.html(text).fadeIn();
            }
        });
    })();

});
