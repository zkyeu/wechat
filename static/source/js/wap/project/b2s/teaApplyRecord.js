define(function(require, exports, module) {
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    //
    ;
    (function() {
        var status = null,
            log_id = null;

        //弹框1显示
        function showDialog1() {
            $(".tea-dialog-wrap , .dialog-agree").css("display", "block");
        }
        //弹框2显示
        function showDialog2() {
            $(".tea-dialog-wrap , .dialog-reject").css("display", "block");
        }
        //弹框消失
        function hideDialog() {
            $(".tea-dialog-wrap , .dialog-agree , .dialog-reject").css("display", "none");
        }


        $(".tea-dialog-wrap").on("click", ".btn-cancel", function() {
            hideDialog();
        })

        $(".tea-dialog-wrap").on("click", ".btn-confirm", function() {
            //window.location = "/wapNew/Teacher/transferAgree?log_id=" + log_id + "&status=" + status;
            $.ajax({
                type: "GET",
                url: "/wapNew/Teacher/transferAgree", //"test.json"
                data: {
                    "log_id": log_id,
                    "status": status
                },
                dataType: "json",
                success: function(data) {
                    var url=location.search;
                    if(url.indexOf("?")!=-1){
                        // document.title='有参数';
                        location.replace(window.location.href+"&cache="+Math.random());
                    }else{
                        // document.title='没参数';
                        location.replace(window.location.href+"?cache="+Math.random());
                    }
                    // location.replace(location.href);
                    // window.location.reload(true);
                    hideDialog();
                }
            });
        })

        $(".btn-reject").on("click", "", function() {
            var self = $(this);
            status = self.data("status");
            log_id = self.parent().data("id");
            showDialog2();
        })

        $(".btn-agree").on("click", "", function() {
            var self = $(this),
                message = self.data("message");
            status = self.data("status");
            log_id = self.parent().data("id");
            $(".tea-dialog-wrap .dialog-agree .tea-dialog-tit").html(message);
            showDialog1();
        })

        //TAB切换，收到的请求、发出的请求。
        $(".tea-apply-tit").on("click", "span", function() {
            var self = $(this),
                switchover = self.data("switchover");
            self.siblings().removeClass("tea-apply-tit-select");
            self.addClass("tea-apply-tit-select");
            if (switchover == "receive") {
                $(".tea-apply-receive").show();
                $(".tea-apply-send").hide();
            }
            if (switchover == "send") {
                $(".tea-apply-send").show();
                $(".tea-apply-receive").hide();
            }
        })
    })();

});
