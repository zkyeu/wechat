define(function(require, exports, module) {
    var utility = require("utility"),
        confirm = utility.confirm,
        promptDialog = utility.promptDialog;
    resetPwd = $(".detail-resetPwd");

    resetPwd.on("click", "a", function() {
        var self = $(this);
        // console.log(self)
        var limit = self.data('limit');
        if (!limit) {
            confirm({
                content: "将密码重置为手机号后6位",
                width: 240,
                sureCb: function() {
                    $.ajax({
                        url: "/wap/stuResetPassword",
                        cache: false,
                        dataType: "json",
                        success: function(data) {
                            var status = data.status;
                            if (status == 1) {
                                promptDialog({
                                    content: "已重置密码"
                                });
                            } else if(status == -2){
                                self.data("limit",1);
                                promptDialog({
                                    content: "每天密码重置次数不能超过3次",
                                    width: 410,
                                    height: 180
                                });
                            }else{
                                self.data("limit",1);
                                promptDialog({
                                    content: "每天密码重置次数不能超过3次"
                                });
                            }
                        },
                        error: function() {
                            promptDialog({
                                content: "重置失败，稍后请重试",
                                width: 206,
                                height: 90
                            });
                        }
                    });
                }
            });
        } else {
            promptDialog({
                content: "每天密码重置次数不能超过3次",
                width: 206,
                height: 90
            });
        }
    });

});
