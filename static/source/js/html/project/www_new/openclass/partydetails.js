define('openclass/partydetails',['common'],function(require,exports,module){
  var common=require("common");

    $.fn.extend({
        alert: function (msg, fnCb,btnMsg) {
            btnMsg=btnMsg || "确&nbsp;定";
            if ($("#m-alert").length) {
                $("#m-alert").show().find(".bd").html(msg).end().find(".u-btn").html(btnMsg);
            } else {
                var sAlert = '<div class="m-alert" id="m-alert" style="display:block;">' +
                    '<div class="in">' +
                    '<div class="hd">' +
                    '<a class="close" href="javascript:;" title="关闭">x</a>' +
                    '<h4>温馨提示</h4>' +
                    '</div>' +
                    '<div class="bd">' +
                    msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<span class="close u-btn hover">'+btnMsg+'</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                var oAlert = $(sAlert);
                $("body").append(oAlert);
                oAlert.find(".close").unbind("click").bind("click", function () {
                    oAlert.hide();
                    fnCb && 　fnCb.call(this);
                });
                var timer = null;
                oAlert.on("click", function (event) {
                    if ($(event.target).hasClass("m-alert")) {
                    var i = 0;
                    clearInterval(timer);
                    timer = setInterval(function () {
                        oAlert.find(".sibmit .close").toggleClass("active");
                        i++;
                        if (i == 4)
                        clearInterval(timer);
                    }, 120);
                    }
                });

            }
        },
        confirm: function (msg, fnSure, fnCancel, sSure, sCancel) {
            sSure = sSure || "确定";
            sCancel = sCancel || "取消";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert" id="m-confirm" style="display:block;">' +
                        '<div class="in" style="width:260px;margin-left:-130px;">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭">x</a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        msg +
                        '</div>' +
                        '<div class="ft">' +
                        '<div class="sibmit f-tac">' +
                        '<span class="u-btn active jsSure">' + sSure + '</span>' +
                        '<i>&nbsp;&nbsp;</i>' +
                        '<span class="u-btn hover jsCancel">' + sCancel + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                var oConfirm = $(sConfirm);
                $("body").append(oConfirm);

                var timer = null;
                oConfirm.on("click", function (event) {
                    if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            oConfirm.find(".jsSure").toggleClass("active");
                            i++;
                            if (i == 4)
                                clearInterval(timer);
                        }, 120);
                    }
                });

            }
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel();
            });
            $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnSure && fnSure();
            });
        },
        loading: function () {
            if ($("#m-load").length) {
            $("#m-load").show();
            } else {
            var sLoading = '<div class="m-load" id="m-load" style="display:block;">正在努力加载中</div>';
            $("body").append(sLoading);
            }
        },
        unloading: function () {
            $("#m-load").hide();
        },
        mask:function(){
            if($("#j-mask").length){
                $("#j-mask").show();
            }else{
                $("body").append("<div id='j-mask'>");
            }
        },
        unMask:function(){
            $("#j-mask").hide();
        }
    });
    $.fn.extend({
        showDialog:function(){
            var h=this.height();
            var w=this.width();
            var oWin=$(window);
            this.css({
                "top":oWin.height()/2+oWin.scrollTop(),
                "left":"50%",
                "margin-left":-w/2,
                "margin-top":-h/2,
                "position":"absolute",
                "z-index":$("#mask").css("z-index")*1+1
            });
            $.mask();
            this.show();
        },
        hideDialog:function(){
            this.hide();
            $.unMask();
        }
    }); 
    //预约
    $(".jsSignUp").live("click",function(event){
        var oBtn=$(this);
        var id=oBtn.attr("data-id");
        //是否是付费公开课
        var isPay=(oBtn.attr("data-pay") || 0)*1;
        var url="/Ajax/openClassApply";

        //查看次卡是否够用
        var cards=$("#user_cards").val()*1;
        //是否是体验用户   1 表示体验用户
        var is_exp_user=$("#is_exp_user").val();
        if(isPay>0){
            if(is_exp_user==1){
                $.fn.alert("请您购买次卡套餐后再预约！",function(){
                    if($(this).html()=="去购买"){
                        window.open("http://www.51talk.com/pay/product");
                    }
                },"去购买");
                return false;
            }
            if(cards<isPay){
                $.fn.alert("您当前仅剩"+cards+"次次卡，本次预约需要"+isPay+"次次卡，请购买次卡套餐后再预约",function(){
                    if($(this).html()=="去购买"){
                        window.open("http://www.51talk.com/pay/product");
                    }
                },"去购买");
            }else{
                $.fn.confirm("本次预约将消耗您"+isPay+"次次卡，课前1小时内不可取消。",function(){
                    $.ajax({
                        url:url,
                        type:"GET",
                        dataType:"json",
                        data:{"id":id},
                        success:function(res){
                            if(res.status==1){
                                $.fn.alert(
                                    '<div class="add-layer">'
                                        + (res.info || '预约成功，请通过51Talk专用软件上课') + '<ul>'
                                            +'<li  class="lay-computer">'
                                                +'<a href="http://www.51talk.com/ac/51TalkAC.php" target="_blank">'+'<i>'+'</i>'+'下载电脑版'
                                                +'</a>'
                                            +'</li>'
                                            +'<li class="lay-iphone">'
                                                +'<a href="http://www.51talk.com/app/download_app.php" target="_blank" id="layIphone">'+'<i>'+'</i>'+'下载手机版'
                                                    +'<img src="http://static.51talk.com/static/image/openclass/class_cope.png?v=2323232weq" title="下载二维码" class="code">'
                                                +'</a>'
                                            +'</li>'
                                        +'</ul>'
                                    +'</div>'
                                );
                                var rightTap = oBtn.parents(".status-right");
                                var oCount = rightTap.find(".f-tar .o-color");
                                var uCancel = rightTap.find(".u-cancel");
                                var uCancel2 = rightTap.find(".f-tar").eq(1);
                                oBtn.html("进入教室").removeClass("jsSignUp").addClass("goToClass");
                                uCancel.show();
                                uCancel2.show();
                                oCount.html(parseInt(oCount.html())*1+1+"人");
                                //更新次卡数
                                $("#user_cards").val(cards-isPay);
                            }else if(res.status==2){
                                $.fn.alert(res.info,function(){
                                    window.open(res.data);
                                },"去购买");
                            }else{
                                $.fn.alert(res.info,function(){
                                    if(res.data){
                                        location.href=res.data;
                                    }
                                });
                            }
                        }
                    });
                });
            }
             
        }else{
            $.ajax({
                url:url,
                type:"GET",
                dataType:"json",
                data:{"id":id},
                success:function(res){
                    if(res.status==1){

                        $.fn.alert(
                            '<div class="add-layer">'
                                + (res.info || '预约成功，请通过51Talk专用软件上课') + '<ul>'
                                    +'<li  class="lay-computer">'
                                        +'<a href="http://www.51talk.com/ac/51TalkAC.php" target="_blank">'+'<i>'+'</i>'+'下载电脑版'
                                        +'</a>'
                                    +'</li>'
                                    +'<li class="lay-iphone">'
                                        +'<a href="http://www.51talk.com/app/download_app.php" target="_blank" id="layIphone">'+'<i>'+'</i>'+'下载手机版'
                                            +'<img src="http://static.51talk.com/static/image/openclass/class_cope.png?v=2323232weq" title="下载二维码" class="code">'
                                        +'</a>'
                                    +'</li>'
                                +'</ul>'
                            +'</div>'
                        );

                        var rightTap = oBtn.parents(".status-right");
                        var oCount = rightTap.find(".f-tar .o-color");
                        var uCancel = rightTap.find(".u-cancel");
                        var uCancel2 = rightTap.find(".f-tar").eq(1);
                        oBtn.html("进入教室").removeClass("jsSignUp").addClass("goToClass");
                        uCancel.show();
                        uCancel2.show();
                        oCount.html(parseInt(oCount.html())*1+1+"人");
                    }else if(res.status==2){
                        $.fn.confirm(res.info,function(){
                            window.open(res.data);
                        },$.noop,"我也要付费","算了，学别的");
                    }else{
                        $.fn.alert(res.info,function(){
                            if(res.data){
                                location.href=res.data;
                            }
                        });
                    }
                }
            });
        }
        event.preventDefault();
    });
    // 北美预约js修改
    $(".jsSignUp_bm").live("click",function(event){
        var oBtn=$(this);
        var id=oBtn.attr("data-id");
        //是否是付费公开课
        var isPay=(oBtn.attr("data-pay") || 0)*1;
        var url="/Ajax/openClassApply";

        //查看次卡是否够用
        var cards=$("#user_periods").val()*1;
        //是否是体验用户   1 表示体验用户
        var is_exp_user=$("#is_exp_user").val();
        if(isPay>0){
            if(is_exp_user==1){
                $.fn.alert("请您购买课时套餐后再预约！",function(){
                    if($(this).html()=="去购买"){
                        window.open("http://www.51talk.com/pay/product");
                    }
                },"去购买");
                return false;
            }
            if(cards<isPay){
                $.fn.alert("您当前仅剩"+cards+"课时，本次预约需要"+isPay+"课时，请购买课时套餐后再预约",function(){
                    if($(this).html()=="去购买"){
                        window.open("http://www.51talk.com/pay/product");
                    }
                },"去购买");
            }else{
                $.fn.confirm("本次预约将消耗您"+isPay+"课时，课前1小时内不可取消。",function(){
                    $.ajax({
                        url:url,
                        type:"GET",
                        dataType:"json",
                        data:{"id":id},
                        success:function(res){
                            if(res.status==1){
                                $.fn.alert(
                                    '<div class="add-layer">'
                                        + (res.info || '预约成功，请通过51Talk专用软件上课') + '<ul>'
                                            +'<li  class="lay-computer">'
                                                +'<a href="http://www.51talk.com/ac/51TalkAC.php" target="_blank">'+'<i>'+'</i>'+'下载电脑版'
                                                +'</a>'
                                            +'</li>'
                                            +'<li class="lay-iphone">'
                                                +'<a href="http://www.51talk.com/app/download_app.php" target="_blank" id="layIphone">'+'<i>'+'</i>'+'下载手机版'
                                                    +'<img src="http://static.51talk.com/static/image/openclass/class_cope.png?v=2323232weq" title="下载二维码" class="code">'
                                                +'</a>'
                                            +'</li>'
                                        +'</ul>'
                                    +'</div>'
                                );
                                var rightTap = oBtn.parents(".status-right");
                                var oCount = rightTap.find(".f-tar .o-color");
                                var uCancel = rightTap.find(".u-cancel2");
                                var uCancel2 = rightTap.find(".f-tar").eq(1);
                                oBtn.html("进入教室").removeClass("jsSignUp_bm").addClass("goToClass");
                                uCancel.show();
                                uCancel2.show();
                                oCount.html(parseInt(oCount.html())*1+1+"人");
                                //更新次卡数
                                $("#user_periods").val(cards-isPay);
                            }else if(res.status==2){
                                $.fn.alert(res.info,function(){
                                    window.open(res.data);
                                },"去购买");
                            }else{
                                $.fn.alert(res.info,function(){
                                    if(res.data){
                                        location.href=res.data;
                                    }
                                });
                            }
                        }
                    });
                });
            }
        }else{
            $.ajax({
                url:url,
                type:"GET",
                dataType:"json",
                data:{"id":id},
                success:function(res){
                    if(res.status==1){
                        $.fn.alert(
                            '<div class="add-layer">'
                                + (res.info || '预约成功，请通过51Talk专用软件上课') + '<ul>'
                                    +'<li  class="lay-computer">'
                                        +'<a href="http://www.51talk.com/ac/51TalkAC.php" target="_blank">'+'<i>'+'</i>'+'下载电脑版'
                                        +'</a>'
                                    +'</li>'
                                    +'<li class="lay-iphone">'
                                        +'<a href="http://www.51talk.com/app/download_app.php" target="_blank" id="layIphone">'+'<i>'+'</i>'+'下载手机版'
                                            +'<img src="http://static.51talk.com/static/image/openclass/class_cope.png?v=2323232weq" title="下载二维码" class="code">'
                                        +'</a>'
                                    +'</li>'
                                +'</ul>'
                            +'</div>'
                        );
                        var rightTap = oBtn.parents(".status-right");
                        var oCount = rightTap.find(".f-tar .o-color");
                        var uCancel = rightTap.find(".u-cancel2");
                        var uCancel2 = rightTap.find(".f-tar").eq(1);
                        oBtn.html("进入教室").removeClass("jsSignUp_bm").addClass("goToClass");
                        uCancel.show();
                        uCancel2.show();
                        oCount.html(parseInt(oCount.html())*1+1+"人");
                    }else if(res.status==2){
                        $.fn.confirm(res.info,function(){
                            window.open(res.data);
                        },$.noop,"我也要付费","算了，学别的");
                    }else{
                        $.fn.alert(res.info,function(){
                            if(res.data){
                                location.href=res.data;
                            }
                        });
                    }
                }
            });
        }
        event.preventDefault();
    });
    $("#layIphone").live("mouseover",function(){
         $(".code").show();
    }).live("mouseout",function(){
        $(".code").hide();
    });
    //取消预约
    $(".u-cancel").on("click",function(){
        var oBtn=$(this);
        var oNext=oBtn.next();
        var id=oNext.attr("data-id");
        //是否是付费公开课
        var isPay=(oBtn.attr("data-pay") || 0)*1;
        var url="/Ajax/openClassCancel";
        if(isPay>0){
            $.fn.confirm("课程很精彩，确认取消么？",function(){
                $.ajax({
                    url:url,
                    type:"GET",
                    dataType:"json",
                    data:{"id":id},
                    success:function(res){  
                        if(res.status==1){
                            $.fn.alert(res.info);
                            var rightTap = oBtn.parents(".status-right");
                            var oCount = rightTap.find(".f-tar .o-color");
                            var uCancel2 = rightTap.find(".f-tar").eq(1);
                            oBtn.hide();
                            uCancel2.hide();
                            oNext.html("预约").addClass("jsSignUp").removeClass("goToClass");
                            oCount.html(parseInt(oCount.html())*1-1+"人");
                            //更新次卡数
                            $("#user_cards").val($("#user_cards").val()*1+isPay);
                        }else{
                            $.fn.alert(res.info,function(){
                                if(res.data){ 
                                    location.href=res.data;
                                }
                            });
                        }
                    },
                    error:function(){
                        $.fn.alert("网络连接失败！");
                    }
                });
            })
        }else{
            $.ajax({
                url:url,
                type:"GET",
                dataType:"json",
                data:{"id":id},
                success:function(res){  
                    if(res.status==1){
                        $.fn.alert(res.info);
                        var rightTap = oBtn.parents(".status-right");
                        var oCount = rightTap.find(".f-tar .o-color");
                        var uCancel2 = rightTap.find(".f-tar").eq(1);
                        oBtn.hide();
                        uCancel2.hide();
                        oNext.html("预约").addClass("jsSignUp").removeClass("goToClass");
                        oCount.html(parseInt(oCount.html())*1-1+"人");
                    }else{
                        $.fn.alert(res.info,function(){
                            if(res.data){
                                location.href=res.data;
                            }
                        });
                    }
                },
                error:function(){
                    $.fn.alert("网络连接失败！");
                }
            });
        }
        
    });
    //取消北美预约
    $(".u-cancel2").on("click",function(){
        var oBtn=$(this);
        var oNext=oBtn.next();
        var id=oNext.attr("data-id");
        //是否是付费公开课
        var isPay=(oBtn.attr("data-pay") || 0)*1;
        var url="/Ajax/openClassCancel";
        if(isPay>0){
            $.fn.confirm("课程很精彩，确认取消么？",function(){
                $.ajax({
                    url:url,
                    type:"GET",
                    dataType:"json",
                    data:{"id":id},
                    success:function(res){  
                        if(res.status==1){
                            $.fn.alert(res.info);
                            var rightTap = oBtn.parents(".status-right");
                            var oCount = rightTap.find(".f-tar .o-color");
                            var uCancel2 = rightTap.find(".f-tar").eq(1);
                            oBtn.hide();
                            uCancel2.hide();
                            oNext.html("预约").addClass("jsSignUp_bm").removeClass("goToClass");
                            oCount.html(parseInt(oCount.html())*1-1+"人");
                            //更新次卡数
                            $("#user_cards").val($("#user_cards").val()*1+isPay);
                        }else{
                            $.fn.alert(res.info,function(){
                                if(res.data){
                                    location.href=res.data;
                                }
                            });
                        }
                    },
                    error:function(){
                        $.fn.alert("网络连接失败！");
                    }
                });
            })
        }else{
            $.ajax({
                url:url,
                type:"GET",
                dataType:"json",
                data:{"id":id},
                success:function(res){  
                    if(res.status==1){
                        $.fn.alert(res.info);
                        //取消预约成功隐藏价格
                        var rightTap = oBtn.parents(".status-right");
                        var oCount = rightTap.find(".f-tar .o-color");
                        var uCancel2 = rightTap.find(".f-tar").eq(1);
                        oBtn.hide();
                        uCancel2.hide();
                        oNext.html("预约").addClass("jsSignUp_bm").removeClass("goToClass");
                        oCount.html(parseInt(oCount.html())*1-1+"人");
                    }else{
                        $.fn.alert(res.info,function(){
                            if(res.data){
                                location.href=res.data;
                            }
                        });
                    }
                },
                error:function(){
                    $.fn.alert("网络连接失败！");
                }
            });
        }
        
    });
    // $(".clist-left").hover(function(){
    //     $(this).find(".cover-img").fadeIn();
    // },function(){
    //     $(this).find(".cover-img").hide();
    // });

    //预约
    $(".jsSignUp2").on("click",function(){
        var oBtn=$(this);
        var isJoined=oBtn.attr("data-joined") || 0;
        var id=oBtn.attr("data-id");
        if(isJoined==1){
            var url="/Ajax/openClassCancel";
        }else{
            var url="/Ajax/openClassApply";
        }
        $.ajax({
            url:url,
            type:"GET",
            dataType:"json",
            data:{"id":id},
            success:function(res){
                if(res.status==1){
                    $.fn.alert(res.info);
                    oBtn.attr("data-joined",isJoined^1);
                    var oCount = rightTap.find(".f-tar .o-color");
                    if(isJoined==1){
                        oBtn.html("预约").removeClass("ed");
                        oCount.html(parseInt(oCount.html())*1-1+"人");
                    }else{
                        oBtn.html("取消预约").addClass("ed");
                        oCount.html(parseInt(oCount.html())*1+1+"人");
                    }
                }else if(res.status==2){
                    $.fn.confirm(res.info,function(){
                        window.open(res.data);
                    },$.noop,"我也要付费","算了，学别的");
                }else{
                    $.fn.alert(res.info,function(){
                        if(res.data){
                            location.href=res.data;
                        }
                    });
                }
            },
            error:function(){
                $.fn.alert("网络连接失败！");
            }
        });
    });


    // 现金支付预约课
    $(".js_money").on("click",function(evt){
        var evt = evt || window.event;
        if (evt.preventDefault) {
            evt.preventDefault();
            evt.stopPropagation();
        } else {
            evt.returnValue = false;
            evt.cancelBubble = true; 
        }
        var oBtn=$(this);
        var id=oBtn.attr("data-id");
        //是否是付费公开课
        var isPay=(oBtn.attr("data-pay") || 0)*1;
        var url="/Ajax/openClassApply";
        $.ajax({
            url:url,
            type:"GET",
            dataType:"json",
            data:{"id":id},
            success:function(res){
                if(res.status==1){
                    window.location.href = res.data;
                }else{
                    if(res.info=='该课程已为您预留，请尽快完成支付'){
                        window.location.href = 'http://www.51talk.com/pay/openClassPay?classId='+id;
                    }else{
                        $.fn.alert(res.info);
                    }
                }
            }
        });
    })
    /* 现金支付取消课程*/
    $(".cancel_money").on("click",function(){
        // 弹层显示
        var _this = $(this);
        $.fn.confirm("课程非常精彩，确认取消么？",function(){
            $(".cs_masknew,.cs_mask").show();
            return verifyMessage(_this);
        })
    })
     // 现金支付弹窗
    function verifyMessage(obj) {
        var oBtn = obj;
        var id=oBtn.attr("data-id");
        $(".cs_mask input[name='username']").focus(function () {
            $(".cs_right .cs_tip").show().siblings().hide(); 
        });
        $(".cs_mask input[name='bank']").focus(function () {
            $(".cs_bank").hide();
        });
        $(".cs_mask input[name='bankname']").focus(function () {
            $(".cs_bankname").hide();
        });
        $(".cs_mask input[name='accountid']").focus(function () {
            $(".cs_id").hide();
        });
        $(".cs_submit").on("click",function(event){
            var ajaxUrl=$(this).attr("ajax-url");
            var username = $(".cs_mask input[name='username']").val();
            var bank = $(".cs_mask input[name='bank']").val();
            var bankname = $(".cs_mask input[name='bankname']").val();
            var accountid = $(".cs_mask input[name='accountid']").val();
            if (username == "" || username == null) {
                $(".cs_right .cs_tip").hide().siblings().show();
            }
            if (bank == "" || bank == null) {
                $(".cs_bank").show();
            }
            if (bankname =="" || bankname == null) {
                 $(".cs_bankname").show();
            }
            if (accountid == "" || accountid == null) {
                $(".cs_id").show();
            }else{
                $.ajax({
                    url:ajaxUrl,
                    data:{"username":username,"bank":bank,"bankname":bankname,"accountid":accountid,"class_id":id},
                    dataType:"json",
                    type:"post",
                    success: function (res) {
                        if(res.status==1){
                            $.ajax({
                                url:'/Ajax/openClassCancel',
                                type:"GET",
                                data:{"id":id},
                                dataType:"json",
                                success:function(res){
                                    if(res.status==1){
                                        $.fn.alert(res.info);
                                        window.location.reload();
                                        // oNext.html("预约").addClass("jsSignUp_bm");
                                    }else{
                                        $.fn.alert(res.info);
                                    }
                                },
                                error:function(){
                                    $.fn.alert("网络连接失败！");
                                }
                            });
                        }else{
                            $.fn.alert(res.info);
                        }
                    },
                    error:function () {
                        $.fn.alert("网络连接失败，请稍后重试！");
                    }
                })  
                event.stopPropagation();
            }
        });
        $(".cs_close").click(function(){
            $(".cs_mask,.cs_masknew").hide();
        });
    }






  // 添加百度编辑器ueditor
  var oUE=UE.getEditor('editor',{
      serverUrl:"/api/upload",
      toolbars:[['bold','emotion', "forecolor",'link', 'unlink',"fontsize","fontfamily"]],
      enableAutoSave: false,
      wordCount:false,
      autoSyncData:false,
      emotionLocalization:true,
      wordOverFlowMsg:''});


  var oUE2=UE.getEditor('editor2',{
      serverUrl:"/api/upload",
      toolbars:[['bold','emotion',"forecolor",'link', 'unlink',"fontsize","fontfamily"]],
      enableAutoSave: false,
      wordCount:false,
      autoSyncData:false,
      emotionLocalization:true,
      wordOverFlowMsg:''});

  var oReplay2=$("#replay2");


  //回复功能
  (function(){
      $(document).on("click",".reply-text",function(){
        $(this).parents(".itemMain").after(oReplay2.show());
      });
      
      $(document).on("click",".jsReply",function(){
            var oA=$(this);
            oA.parents(".itemMain").after(oReplay2.show());
            //取id
            var pid=oA.attr("data-id");
            $("#replyForm2").find("input[name='parent_id']").val(pid);
            //ie6下bug处理
            var isIE=!!window.ActiveXObject;
            var isIE6=isIE&&!window.XMLHttpRequest;
            if(isIE && isIE6){
                document.body.style.zoom = 1.1;
                document.body.style.zoom = '';
            }
        });

    $(".jsReply3").on("click",function(){
        oReplay2.hide();
    })
    $(".jsReply2").on("click",function(){
        oUE.setContent("");
    })
      //一级回复
      $("#ueSubmit").on("click",function(){
          var text=$.trim(oUE.getPlainTxt());
          if(!text){
              $.fn.alert("内容不能为空 ");
              return;
          }
          var oForm=$("#replyForm");
          var type =$(this).attr('data-type');
          var oPid=oForm.find("input[name='parent_id']");
          var oContent=oForm.find("input[name='content']");
          var regS = new RegExp("&#39;","gi");
          var forumData = $.trim(oUE.getContent()).replace(regS,'');
          oContent.val(forumData);
          $.ajax({
              url:oForm.attr("action"),
              type:oForm.attr("method"),
              dataType:"json",
              data:oForm.serializeArray(),
              success:function(res){
                  if(res.status){
                      var json=res.data;
                      var str='';
                      if(type==1){
                          str+='<div class="c-c-reply"><a href="javascript:;" class="thumbs-up star-icon" data-fornum_id="'+json.reply_id+'"><span class="icon-meta icon-praise"></span><b>0</b> </a><span class="reply-text">回复</span><span class="jsDelete" data-id="'+json.reply_id+'">删除</span></div>';
                      }
                      var sDiv = '<div class="item-list">'+
                                '<div class="itemMain">'+
                                    '<div class="avatar">'+
                                        '<img src="'+json.avatar+'" height="60" width="60" alt="头像"/>'+
                                        '<i class="cover"></i>'+
                                    '</div>'+
                                    '<div class="comment-cont">'+
                                      '<h3 class="c-c-tit"><span>'+json.nick_name+'</span>'+json.date+'</h3>'+
                                      '<p class="c-c-text">'+json.content+'</p>'+
                                      '<div class="c-c-reply"><a href="javascript:;" class="thumbs-up star-icon" data-fornum_id="'+json.reply_id+'"><span class="icon-meta icon-praise"></span><b>0</b> </a><span class="reply-text jsReply" data-id="'+json.reply_id+'" data-name="robert">回复</span><span class="jsDelete" data-id="'+json.reply_id+'">删除</span></div>'+
                                    '</div>'+
                                '</div>'+
                              '</div>';
                      var oDiv=$(sDiv);
                      var oP=$(".cmtItem").eq(0);
                      oP.append(oDiv);
                      oP.find(".itemSub").removeClass("last").last().addClass("last");
                      var totalNum = $(".m-comment .cm-tit span").html();
                      $(".m-comment .cm-tit span").html(totalNum*1+1);
                      refreshCode(1);
                      oUE.setContent("");
                  }else{
                      if(res.data=="codeError"){
                          refreshCode(1);
                      }
                      $.fn.alert(res.info,function(){
                          if(res.data && res.data!="codeError"){
                              location.href=res.data;
                          }
                      });
                  }
                  if(res.data.is_verify==1){
                      $("form .fn-left").show();
                  }

              },
              error:function(){
                  $.fn.alert("网络连接失败！");
              }
          });
          
      });
      //二级回复
      $("#ueSubmit2").on("click",function(){
          var text=$.trim(oUE2.getPlainTxt());
          if(!text){
              $.fn.alert("内容不能为空");
              return;
          }
          var oForm=$("#replyForm2");
          var oPid=oForm.find("input[name='parent_id']");
          var oContent=oForm.find("input[name='content']");
          var regS = new RegExp("&#39;","gi");
          var forumData = $.trim(oUE2.getContent()).replace(regS,'');
          oContent.val(forumData);
          $.ajax({
              url:oForm.attr("action"),
              type:oForm.attr("method"),
              dataType:"json",
              data:oForm.serializeArray(),
              success:function(res){
                  if(res.status){
                      var json=res.data;
                      var sDiv = '<div class="itemSub">'+
                                '<div class="avatar">'+
                                    '<img src="'+json.avatar+'" height="50" width="50" alt="头像"/>'+
                                    '<i class="cover"></i>'+
                                '</div>'+
                                '<div class="comment-cont">'+
                                  '<h3 class="c-c-tit"><span>'+json.nick_name+'</span>'+json.date+'<span class="jsDelete" data-id="'+json.reply_id+'">删除</span></h3>'+
                                  '<p class="c-c-text">'+json.content+'</p>'+
                                '</div>'+
                            '</div>';
                      var oDiv=$(sDiv);
                      var oP=oReplay2.parent(".item-list");
                      oReplay2.hide();
                      oP.append(oDiv);
                      oP.find(".itemSub").removeClass("last").last().addClass("last");
                      refreshCode(0);
                      oUE2.setContent("");
                  }else{
                      if(res.data=="codeError"){
                          refreshCode(0);
                      }
                      $.fn.alert(res.info,function(){
                          if(res.data && res.data!="codeError"){
                              location.href=res.data;
                          }
                      });
                  }
                  if(res.data.is_verify==1){
                      $("form .fn-left").show();
                  }
              },
              error:function(){
                  $.fn.alert("网络连接失败！");
              }
          });
          
      });
      $("#verifyCode").on("keydown",function(ev){
          if(ev.keyCode==13){
              return false;
          }
      });

      function refreshCode(index){
          //刷新验证码
          var oImg=$(".jsCode").eq(index)[0];
          if(!oImg)return;
          var src="";
          var v="/vv//"
          if(oImg.src.indexOf(v)!=-1){
              src=oImg.src.substring(0,oImg.src.indexOf(v)+v.length);
          }else{
              src=oImg.src+v;
          }
          oImg.src=src+Math.random();
          $("#verifyCode,#verifyCode2").val("");
      }
  })();
  $('.r-publish').on("click",function(){
    var text=$.trim($("#ueSubmit3").val());
        if(!text){
            $.fn.alert("内容不能为空 ");
            return;
        }
  })

  //用户删除自己的回复
  $(".jsDelete").live("click",function(){
      var reply_id=$(this).attr("data-id");
      $.fn.confirm("确定要删除此条回复吗？",function(){
          $.ajax({
              url:"/ajax/delReply",
              type:"post",
              dataType:"json",
              data:{"reply_id":reply_id},
              success:function(res){
                  if(res.status){
                      $.fn.alert(res.info,function(){
                          location.reload();
                      });
                      setTimeout(function(){
                          location.reload();
                      },3000);
                  }else{
                      $.fn.alert(res.info);
                  }
              }
          });
      });
  });
  //管理员操作  fangxz
  $(".jsOperate").on("click",function(){
      var oA=$(this);
      var type=oA.attr("type");
      var forum_id=$("#forum_id").val();
      var text = oA.html();
      $.fn.confirm("您确定要执行"+text+"操作吗?",function(){
          $.ajax({
              url:"/ajax/forumAction",
              type:"post",
              dataType:"json",
              data:{"type":type,"id":forum_id},
              success:function(res){
                  if(res.status){
                      $.fn.alert("操作成功！");
                      setTimeout(function(){
                          location.href="/Forum/index";
                      },1000);
                  }else{
                      $.fn.alert(res.info);
                  }
                  
              },
              error:function(){
                  $.fn.alert("网络连接失败！");
              }
          });
      });

  });


  /*点赞*/
  $(".sha-pra").on("click", function () {
      var great_icon = $(this);
      var great_img_i = great_icon.find("i");
      var pra_num = parseInt(great_icon.find("b").html());
      var pra_val = great_icon.find("b");
      var forum_id =great_icon.attr("data-fornum_id");
      if (great_img_i.hasClass("icon-share-get")) {
          var ajaxurl = "/ajax/cancelPraise";
          var num = pra_num - 1;
      } else {
          var ajaxurl = "/ajax/praiseLog";
          var num = pra_num + 1;
      }
      
      $.ajax({
          type: "POST",
          url: ajaxurl,
          dataType: "json",
          data: {forum_id: forum_id, type: 1},
          success: function (msg) {
              if (msg.status==1) {
                  if (great_img_i.hasClass("icon-share-get")) {
                      great_img_i.removeClass("icon-share-get");
                  }else{
                      great_img_i.addClass("icon-share-get");
                  }
                  pra_val.html(num);
              }else if(msg.status==2){
                  $.fn.alert(msg.info, function () {
                      location.href = "/Forum/detail/"+forum_id+".html";
                  });
              } else {
                  $.fn.alert(msg.info, function () {
                      if (msg.data) {
                          location.href = msg.data;
                      }
                  });
              }
          }
      });
  });
  /*回复点赞*/
  $(document).on("click",".star-icon", function () {
      var great_icon = $(this);
      var pra_num = parseInt(great_icon.find("b").html());
      var pra_val = great_icon.find("b");
      var forum_id = great_icon.attr("data-fornum_id");
      if (great_icon.find(".icon-meta").hasClass("icon-get")) {
          var ajaxurl = "/ajax/cancelPraise";
          var num = pra_num - 1;
      } else {
          var ajaxurl = "/ajax/praiseLog";
          var num = pra_num + 1;
      }
      $.ajax({
          type: "POST",
          url: ajaxurl,
          dataType: "json",
          data: {forum_id: forum_id, type: 2},
          success: function (msg) {
              if (msg.status) {
                  if (great_icon.find(".icon-meta").hasClass("icon-get")) {
                      great_icon.find(".icon-meta").removeClass("icon-get");
                  }else{
                      great_icon.find(".icon-meta").addClass("icon-get");
                  }
                  pra_val.html(num);
              } else {
                  $.fn.alert(msg.info, function () {
                      if (msg.data) {
                          location.href = msg.data;
                      }
                  });
              }
          }
      });
  });

  $(".sha-fx").click(function (event) {
    event.stopPropagation(); //阻止事件冒泡 
    $(".new-bdshare").toggle();
  });
  $(document).click(function (e) {
    if (!$(".sha-fx").hasClass("new-bdshare")) {
        $(".new-bdshare").hide();
    }
  });

  $(".share_num").click(function(){
    var forum_id =$(this).attr("data-fornum_id");
    var share_num = $(this).attr("data-share_num");
    $.ajax({
        type: "POST",
        url: "/ajax/forumSharenum",
        dataType: "json",
        data: {forum_id: forum_id,share_num:share_num},
        success: function (msg) {
            if(msg.status==1)
            {
                return true;
            }else{
                return false;
            }
        }
    });
  })

  
  var shareContent = "@51talk 无忧英语-51Talk外教和服务挺不错，我向我的好友推荐了51Talk！你也来试试吧！";
  var shareLink = "http://www.51talk.com?66";
  window._bd_share_config={"common":{"bdSnsKey":{},"bdText":shareContent,"bdMini":"2","bdMiniList":false,"bdPic":"http://static.51talk.com/images/web_new/home/banner/student1.jpg;http://static.51talk.com/images/web_new/home/banner/index.jpg;http://static.51talk.com/images/web_new/home/show/4.png;http://static.51talk.com/images/web_new/home/show/11_07.png","bdUrl": shareLink,"bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];


  $(".cs_close").click(function(){
      $(".cs_mask,.cs_masknew").hide();
  });



  // 公开课详情页点击最上面的分享按钮
  $(".wechat_share_top").click(function(){
    // 微信分享弹窗显示
    $(".wechat_share").show();
  });
  // 点击微信分享弹窗上的关闭
  $(".wechat_close").click(function(){
    // 微信分享弹窗隐藏
    $(".wechat_share").hide();
  });
    
    // 点击进入教室
    $(".status-right").on("click",".goToClass",function(){
        $.fn.alert("请下载51Talk专用软件上课");
    })


});