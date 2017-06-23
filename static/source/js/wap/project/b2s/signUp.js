define(function(require, exports, module) {
    var utility = require("utility"),
        regs = $.formVerify.utility.regs,
        promptDialog = utility.promptDialog;

    ;
    (function() {
                     
        //立即报名
        var js_signUpBtn = $("#js_signUpBtn");
        js_signUpBtn.on("click","",function(){
            $.ajax({
                url:"/wapNew/Student/ajaxCourseApply",
                data:{},
                type:"get",
                cache:false,
                dataType:"json",
                success:function(data){
                    var _status = data.status,
                        _info = data.info,
                        _showtime = 2000;
                    if(_status == 1){
                        promptDialog({
                            content:"报名成功",
                            myClass:"singn-up-dialog",
                            showTime:_showtime,
                            width:"auto",
                            height:"auto"
                        })
                        setTimeout(function(){
                            js_signUpBtn.addClass('bg1');
                            js_signUpBtn.html("已报名");
                            js_signUpBtn.off();
                        },_showtime)
                    }else if(_status == 0){
                        promptDialog({
                            content:_info,
                            myClass:"singn-up-dialog",
                            showTime:_showtime,
                            width:"auto",
                            height:"auto"
                        })
                    }
                }
            })
        })

    })();

});
