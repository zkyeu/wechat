define("introduce1v3_more2",["fastclick","swiper-3.3.1.jquery.min"],function(require, exports, module) {
    require("swiper-3.3.1.jquery.min");
    require("fastclick");//去除click延迟

    FastClick.attach(document.body);
//swiper
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        autoplayDisableOnInteraction : false,
        loop: true,
        pagination: '.swiper-pagination',// 如果需要分页器
    });
//套餐
    var choose_class = $(".choose_class"),
        choose_class_one = $(".choose_class_one"),
        to_pay_on = $(".to_pay_on"),
        js_tobuy = $(".js-tobuy"),
        shpping_car = $(".shpping_car"),
        class_to_buy = $(".class_to_buy"),
        choose_class_pop = $(".choose_class_pop"),
        to_pay_btn = $(".to_pay_btn"),
        class_to_buy = $(".class_to_buy");

   //倒计时活动效果
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
            //to_pay_on.hide();
            to_pay_on.addClass("disnone");
            choose_class_pop.show();
            class_to_buy.show();
        }
    //  end

    ////页面未选择套餐显示弹窗
    js_tobuy.on("click",function(){
        $(".more_end_pop").addClass("disnone");
        isclick = true;

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
                    //to_pay_on.hide();
                    to_pay_on.addClass("disnone");
                    choose_class_pop.show();
                    class_to_buy.show();
                }else if(data.status == "0"){
                    //走登录流程
                    window.location.href = currentpageurl;
                }
            }
        });
        // ajax end
    });
    choose_class_pop.on("click",function(){//点击空白隐藏
        choose_class_pop.hide();
        //to_pay_on.show();
        to_pay_on.removeClass("disnone");
        isclick = false;
    });
    class_to_buy.on("click",function(e){
        choose_class_pop.show();
        e.stopPropagation();
    });
    to_pay_btn.on("click",function(e){
        choose_class_pop.show();
        e.stopPropagation();
    });


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
    if(intime>0){
        var setT = setInterval(function(){
            if(intime > 0){
                intime --;
                var texttime = showTime(intime);
                hou.text(texttime.hor);
                sec.text(texttime.sec);
                min.text(texttime.min);
            }else{
                //alert("a");
                if(isclick) return;
                endplay.removeClass("disnone");
                more_timer.addClass("disnone");
                more_end_pop.removeClass("disnone");
                to_more.text("重新开团");
                to_pay_on.find("p").text("重新开团");
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
            to_pay_on.addClass("disnone");
        }else{
            to_pay_on.removeClass("disnone");
        }
    });



});

