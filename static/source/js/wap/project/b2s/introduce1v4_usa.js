define("introduce1v4_usa",["fastclick","swiper-3.3.1.jquery.min"],function(require, exports, module) {
    require("fastclick");//去除click延迟
    require("swiper-3.3.1.jquery.min");
    FastClick.attach(document.body);
    var bottom_box = $(".bottom_box"),
       class_to_buy = $(".class_to_buy"),
       js_tobuy = $(".js-tobuy"),
       all_dio = $(".all_dio");
   
    js_tobuy.on("click",function(e){
        e.stopPropagation();
        //登录流程
        showDio();
        showBuy();
    });

//添加登录流程
    function showDio(){//显示底部大弹层
        all_dio.show();
    }
    function showBuy(){//显示购买课程信息弹层
        class_to_buy.show();
    }

    all_dio.on("click",function(){//点击弹层空白处隐藏
        if(class_to_buy.is(":hidden")){
            //支付内容隐藏  证明是登录流程中
        }else{
            //支付内容显示 证明 是正常支付流程中点击空白隐藏
            all_dio.hide();
            $(".js_pay_dialog").hide();
        }
    });



    class_to_buy.on("click",function(e){
        all_dio.show();
        e.stopPropagation();
    });
    $(".js_pay_dialog").on("click",function(e){
        e.stopPropagation();
    });

//有弹框后禁止滑动
    var controlScroll = (function(){
        var dis = function(event){
            event.preventDefault();
        },
        body = document.body || document.documentElement;

        return {
            lock : function(filter){
                body.addEventListener('touchmove', dis, false);
            },
            unLock : function(filter){
                body.removeEventListener('touchmove', dis, false);
            }
        }
    })()


    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        autoplayDisableOnInteraction : false,
        loop: true,
        pagination: '.swiper-pagination',// 如果需要分页器
    });


    //app

    $(".app_pay_btn").on("click",function(){
        class_to_buy.hide();
        $(".js_pay_dialog").show();
    });
    $(".pay-dialog-but").on("click",function(){
        all_dio.hide();
        $(".js_pay_dialog").hide();
    })
    //选择微信或支付宝 支付提交
    $(".js_paySelect").on("click","span",function(){
        var _this = $(this),
            paytype = _this.data('paytype');
        $(".js_paytype").val(paytype);
        $(".js_timestamp").val(new Date().getTime());

        //然后js触发form提交。
        // console.log("调试用--1");
        // alert("调试用--1");
        $(".js_payform").submit();
        // console.log("调试用--4");
        // alert("调试用--2");
    });



    //倒计时

    var bottom_timer = $(".bottom_timer"),
        bottom_not_buy = $(".bottom_not_buy"),
        endtime = bottom_timer.attr("endtime"),
        nowtime = bottom_timer.attr("nowtime"),
        starttime = bottom_timer.attr("starttime");
    var isTimer = (nowtime - starttime)>0 ? (endtime - nowtime) : (endtime - starttime);
    var stime = nowtime - starttime;
    if(endtime == "0"){//未开始
        $(".bottom_not_buy").removeClass("disnone");
        return ;
    }
    if(endtime){
        var setTime = setInterval(function(){
            if(stime < 0){//距离开始
                stime ++;
                bottom_not_buy.removeClass("disnone");
                bottom_not_buy.find(".before").removeClass("disnone");
                bottom_not_buy.find(".after").addClass("disnone");
                bottom_timer.addClass("disnone");
            }else{
                if(isTimer > 0){ //距离结束
                    isTimer--;
                    var outTime = showTime(isTimer);
                    if(outTime.day > 0){
                        bottom_timer.find(".day").text(outTime.day + "天");
                    }else{
                        bottom_timer.find(".day").text("");
                    }
                    bottom_timer.find(".hor").text(outTime.hor);
                    bottom_timer.find(".min").text(outTime.min);
                    bottom_timer.find(".sec").text(outTime.sec);
                    bottom_not_buy.addClass("disnone");
                    bottom_timer.removeClass("disnone");
                }else{//已经结束
                    bottom_not_buy.removeClass("disnone");
                    bottom_not_buy.find(".before").addClass("disnone");
                    bottom_not_buy.find(".after").removeClass("disnone");
                    bottom_timer.addClass("disnone");
                    clearInterval(setTime);
                }
            }
        },1000);
    }

    function showTime(obj){
        var outTime ={};
        outTime.sec = parseInt(obj%60);
        outTime.min = parseInt(obj/60%60);
        outTime.hor = parseInt(obj/(60*60)%24);
        outTime.day = parseInt(obj/(60*60*24));
        outTime.sec = (outTime.sec<10) ? ("0"+outTime.sec) :outTime.sec; 
        outTime.min = (outTime.min<10) ? ("0"+outTime.min) :outTime.min; 
        outTime.hor = (outTime.hor<10) ? ("0"+outTime.hor) :outTime.hor; 
        //outTime.day = (outTime.day<10) ? ("0"+outTime.day) :outTime.day; 
        return outTime;
    }

});
