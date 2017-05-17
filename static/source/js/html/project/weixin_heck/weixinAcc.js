define("weixinAcc",["utility"],function(require,exports,module){

    require("utility");

    var form = $("[rel=weixinAccForm]");
    
    form.formVerify({
        rules : {
            wechat_id : {
                required : [true,"请输入微信账号"]
            },
            nick_name : {
                required : [true,"请输入英文名"]
            },
            device_id : {
                required : [true,"请输入手机设备编号"]
            },
            user_group : {
                required : [true,"请选择用户类型"]
            }
        },
        errorHandler : function(flag,text){
            $(this).siblings("p").html(flag ? "" : text);
        },
        submitHandler : function(){
            if(!this.checkFlag) return;
            if(form.sendStatus) return;
            var sub = $(".sub_account");
            $.ajax({
                beforeSend : function(){
                    form.sendStatus = true;
                    sub.addClass("sub_account_dis").val("提交中...");
                },
                url : "/AdminContact/addAdminWechatContact",
                type : "post",
                data : form.serialize(),
                dataType : "json",
                success : function(data){
                    if(data.status == 10000){
                        alert("添加成功");
                        window.location.assign("/AdminContact/wxMain");
                    }else{
                        alert(data.message);
                    }
                },
                error : function(){
                    alert("网络错误请重试！")
                },
                complete : function(){
                    form.sendStatus = false;
                    sub.removeClass("sub_account_dis").val("确定");
                }
            });
        }
    });
});



