define('openclass/index',['common'],function(require,exports,module){
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
    /*点击轮播*/
      var oUl=$(".focus"); 
      var aLi=oUl.find("li");
      var aPoit=$(".focus-yd li");
      var oNext=$(".focus-jt .f-next");
      var oPrev=$(".focus-jt .f-last");
      var count=aLi.length;
      var iNow=0;
      var speed=300;// 渐变效果
      var slideSpeed=6000;//切换时间
      var timer=null;
      oNext.on("click",function(){
        slide("next");
      });
      oPrev.on("click",function(){
        slide("prev");
      });
      aPoit.on("click",function(){
        var index=$(this).index();
        if(iNow==index)return;
        slide(index);
      }).hover(function(){
        clearInterval(timer);
      },function(){
        begin();  
      });
      begin();
      function slide(type){
        if(aLi.eq(iNow).is(":animated")) return;
        aLi.eq(iNow).css({"z-index":0}).animate({"opacity":0},speed);
        if(type==="next"){
          iNow++;
        }else if(type==="prev"){
          iNow--;
        }else{
          iNow=type;
        }
        if(iNow<0){
          iNow=count-1;
        }else if(iNow===count){
          iNow=0;
        }
        aLi.eq(iNow).css({"z-index":1,"opacity":0.7}).animate({"opacity":1},speed); 
        pointer();
        begin();
      }
      function begin(){
        if(count<=1) return; 
        clearInterval(timer);
        timer=setInterval(function(){
          slide("next");
        },slideSpeed);
      }
      function pointer(){
        aPoit.removeClass("crt").eq(iNow).addClass("crt");
      } 

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
    
    $(".cs_close").click(function(){
        $(".cs_mask,.cs_masknew").hide();
    });

    // 点击进入教室
    $(".status-right").on("click",".goToClass",function(){
        $.fn.alert("请下载51Talk专用软件上课");
    })
});