define("introduce1v4_more2",["fastclick","swiper-3.3.1.jquery.min"],function(require, exports, module) {
    require("fastclick");//去除click延迟
    require("swiper-3.3.1.jquery.min");
    FastClick.attach(document.body);
    var bottom_box = $(".bottom_box"),
       class_to_buy = $(".class_to_buy"),
       js_tobuy = $(".js-tobuy"),
       all_dio = $(".all_dio");


       var isclick = false; //判断是否在倒计时过程中点击了购买

         //cookie 方法
        function SetCookie(name, value) {  
            var exp = new Date();  
            exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000); //天过期  
            document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString()+";path=/";  
            return true;  
        }; 
        function getCookie(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
            else
            return null;
        }

        // ajax回来弹层拉起 data-islogin = 1 为登录  0 为未登录 cookieGet 判断是否是登录流程走完回来的   statusmore判断团购是否已经过期
        var islogin = $("[data-loginajaxurl]").attr("data-islogin");
        var cookieGet = getCookie("cookielogin");
        var statusmore = $("#show_status").val();//判断团购有没有结束  2代表未结束   是否显示支付弹窗 1表示不显示 2表示显示

        if(islogin == 1 && statusmore ==2){
            isclick = true;
            showDio();
            showBuy();
        }
        //  end


        js_tobuy.on("click",function(e){
            more_end_pop.addClass("disnone");
            isclick = true;//如果点击购买 禁止弹出倒计时结束的弹窗
            e.stopPropagation();

            // ajax start
            var ajaxurl = $("[data-loginajaxurl]").attr("data-loginajaxurl");
            var currentpageurl = $("[data-currentpageurl]").attr("data-currentpageurl");
            $.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                },
                dataType: "json",
                success: function(data) {
                    if(data.status == "1"){//已登录
                        showDio();
                        showBuy();
                    }else if(data.status == "0"){
                        //走登录流程
                        window.location.href = currentpageurl;
                    }
                }
            });
            // ajax end
        });
    //添加登录流程
        function showDio(){//显示底部大弹层
            all_dio.show();
        }
        function showBuy(){//显示购买课程信息弹层
            class_to_buy.removeClass("disnone");
        }

    all_dio.on("click",function(){
        if(class_to_buy.is(":hidden")){
            //支付内容隐藏  证明是登录流程中
        }else{
            //支付内容显示 证明 是正常支付流程中点击空白隐藏
            all_dio.hide();
            $(".js_pay_dialog").hide();
            isclick = false;
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

    var more_timer = $(".more_timer"),
        hou = more_timer.find(".hou"),
        min = more_timer.find(".min"),
        sec = more_timer.find(".sec"),
        bottom_not_buy = $(".bottom_not_buy"),
        endtime = more_timer.attr("endtime"),
        starttime = more_timer.attr("starttime"),
        endplay = $(".endplay"),
        more_end_pop = $(".more_end_pop"),
        to_more = $(".to_more"),
        share_pop = $(".share_pop");
    var intime = endtime - starttime;
    if(intime >0){
        var setT = setInterval(function(){
            if(intime > 0){
                intime --;
                var texttime = showTime(intime);
                hou.text(texttime.hor);
                sec.text(texttime.sec);
                min.text(texttime.min);
            }else{
                if(isclick) return;
                endplay.removeClass("disnone");
                more_timer.addClass("disnone");
                more_end_pop.removeClass("disnone");
                to_more.text("重新开团");
                bottom_box.find(".right_box").text("重新开团");
                clearInterval(setT);
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

    more_end_pop.on("click",function(){
        $(this).addClass("disnone");
    })
    more_end_pop.find(".content").on("click","",function(e){
        e.stopPropagation();
        $(this).show();
    })

    share_pop.on("click",function(){
        $(this).hide();
    });


    //底部悬浮在中间按钮消失时显示
    $(window).scroll(function(){
        var that = $(this);
        var more_top = parseInt(to_more.offset().top),
            document_top = parseInt(that.scrollTop()),
            more_heigth = parseInt(to_more.height());
        if((more_top + more_heigth - document_top) > 0){
            bottom_box.addClass("disnone");
        }else{
            bottom_box.removeClass("disnone");
        }
    });

});
