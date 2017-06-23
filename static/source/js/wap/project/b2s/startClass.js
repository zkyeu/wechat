define("startClass",["utility"],function(require,exports,module){
    var utility = require("utility"),
        $choosed = $(".checked").find("span"),
        confirm = utility.confirm,
        getValue = window.localStorage.getItem("writeValue"),
        textarea = $("textarea"),
        flag = true;
    var form = $("[rel=startClass]");

//同意按钮    
    $choosed.on("click",function(){
        //console.log(flag);
        if(flag){
            flag = false;
            $choosed.addClass("choosed");
        }else{
            $choosed.removeClass("choosed");
            flag = true;
        }
    });
//检查页面内有没有手动输入过
        (function(){
           
            if(!!getValue){
                textarea.val(getValue);
            }

        })();

//表单提交
    form.on("submit",function(e){
        var e = e || event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        
        //添加local

        window.localStorage.setItem("writeValue",textarea.val()); 


        //各种提示

        var reg = /[^0-9a-zA-z\u4e00-\u9fa5+]/g,
            user_text_before =  $("textarea").val().split(""),
            normal_text = $(".out_text").text().replace(reg,'').split(""),
            user_text = $("textarea").val().replace(reg,'').split(""),
            isLogin = $("#isLogin").val(),
            mobile = $('#mobile').val(),
            loginAction = $('#loginAction').val(),
            logoutAction = $('#logoutAction').val(),
            saveAction = $('#saveAction').val(),
            num = 0,
            indexArr = [];
        //console.log(normal_text,user_text);
        for(var i=0; i<normal_text.length; i++){
            if(!(normal_text[i] == user_text[i] )){
                indexArr.push(i);
            }
        }
        //console.log(user_text_before[3]);
        //console.log(reg.test(user_text_before[3]));
        //console.log(indexArr[0]);

        // for(var m=0; m<user_text_before.length; m++){
        //     if(num == indexArr[0]){
        //         console.log($(this).index());
        //     }
        //     num ++;
        //     if(reg.test(user_text_before[m])){
        //         num --;
        //     }
        // }
        //console.log(indexArr);

        if(indexArr.length){
            confirm({
                content: "您输入的第"+indexArr[0]+"个汉字有误，请修改。",
                type : "alert",
                myClass : "alertConfirm"
            });
        }else{
            if(!!flag){
                confirm({
                    content: "请确认您会遵守承诺才会领取课程哦",
                    type : "alert"
                });
            }else{
                $(".confirm-wrap").removeClass("alertConfirm");
                if(isLogin == "1" ){
                    //console.log(isLogin);
                    confirm({
                        content: "请确认为账号"+mobile+"申请课程",
                        sureText : "确定",
                        cancleText : "换账号申请",
                        type : "confirm",
                        sureCb : function(){
                            $.ajax({
                                beforeSend : function(){
                                    form.sendStatus = true;
                                },
                                url : saveAction,
                                type : "post",
                                dataType : "json",
                                success : function(data){
                                    //if(!!data.data.url){
                                        if(data.status == 10007){
                                            confirm({
                                                content: "该账号已申请，去约课吧。",
                                                sureText : "换账号领取",
                                                cancleText : "确定",
                                                type : "confirm",
                                                sureCb : function(){
                                                    window.localStorage.setItem("writeValue",""); 
                                                    window.location.assign(logoutAction);
                                                },
                                                cancelCb : function(){
                                                    window.location.assign(data.data.url);
                                                }
                                            });
                                            $(".btn-cancel").html("确定");
                                            $(".btn-sure").html("换账号领取");
                                        }else if(data.status == 10008){
                                             confirm({
                                                content: "您已有该课程权限，去约课吧。",
                                                sureText : "换账号领取",
                                                cancleText : "确定",
                                                type : "confirm",
                                                sureCb : function(){
                                                    window.localStorage.setItem("writeValue",""); 
                                                    window.location.assign(logoutAction);
                                                },
                                                cancelCb : function(){
                                                    window.location.assign(data.data.url);
                                                }
                                            });
                                            $(".btn-cancel").html("确定");
                                            $(".btn-sure").html("换账号领取");
                                        }else if(data.status == 0){
                                            window.location.assign(data.data.url);
                                        }else{
                                            confirm({
                                                content: data.info,
                                                type : "alert",
                                            });
                                        }
                                        
                                    // }else{
                                    //      confirm({
                                    //         content: data.info,
                                    //         type : "alert"
                                    //     });
                                    // }
                                },
                                error : function(){
                                    alert("网络错误请重试！")
                                },
                                complete : function(){
                                    form.sendStatus = false;
                                }
                            });    
                        },
                        cancelCb : function(){//更换绑定账号
                           window.localStorage.setItem("writeValue",""); 
                           window.location.assign(logoutAction);
                        }

                    });
                   $(".btn-cancel").html("换个账号");
                }else{
                    window.location.assign(loginAction);
                }
            }
            
        }
        
    });


});