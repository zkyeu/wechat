define("payIntroduce1v3",["fastclick","swiper-3.3.1.jquery.min"],function(require, exports, module) {
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
    var $choose_class = $(".choose_class"),
        $choose_class_one = $(".choose_class_one"),
        $to_pay_on = $(".to_pay_on"),
        $shpping_car = $(".shpping_car"),
        $class_to_buy = $(".class_to_buy"),
        isVip,//存储是否选择的是VIP
        money,
        d_money,
        vip_money,
        $choose_class_pop = $(".choose_class_pop"),
        $choose_class_pop_c = $choose_class_pop.find(".choose_class_pop_c"),
        //has 代表已选择课程额弹窗内元素
        has_no_change =  $choose_class_pop_c.find(".no_change"),
        has_change = $choose_class_pop_c.find(".change"),
        has_class_normal = $choose_class_pop_c.find(".class_normal"),
        has_vip_new = $choose_class_pop_c.find(".vip_new"),
        has_pay_all_mon = $choose_class_pop_c.find(".pay_all_mon"),
        no_change =  $class_to_buy.find(".no_change"),
        change = $class_to_buy.find(".change"),
        class_normal = $class_to_buy.find(".class_normal"),
        vip_new = $class_to_buy.find(".vip_new"),
        //new_vip_class = $class_to_buy.find(".new_vip_class"),
        pay_all_mon = $class_to_buy.find(".pay_all_mon"),
        $to_pay_on_pop_car = $(".to_pay_on_pop_car"),
        playTime = $(".play_time"),
        startTime = playTime.attr("start-time"),
        endTime = playTime.attr("end-time"),
        $class_to_buy = $(".class_to_buy");

        var flag;//app相关  判断是哪个弹层

    //页面内选择套餐
    function chooseClass(obj){
        obj.on("click","li",function(){
            var that = $(this);
            isVip = that.attr("isVip");
            money = that.attr("money");//套餐价格
            d_money = that.attr("d-money");//不同的优惠价格
            pac = that.find(".pac").html();
            pac_mes = that.find(".pac_mes").html();
            vip_money = that.attr("vip-money");//32节课价格
            that.find(".choose_btn").addClass("on_cli").find("span").html("已选");
            that.siblings().find(".choose_btn").removeClass("on_cli").find("span").html("购买");
            $to_pay_on.hide();
            $shpping_car.show();
            //隐藏域赋值
            console.log(that.attr("packageid"),isVip);
            $(".packageid").val(that.attr("packageid"));
            $(".isvip").val(isVip);
            $(".buymore").val("0");
            //弹窗内元素更改
            $choose_class_pop_c.find(".title").find("span").html("已选课程 &nbsp;&nbsp;&nbsp;"+pac);
            $choose_class_pop_c.find("h3").html("("+pac_mes+")");
            $choose_class_pop_c.find(".title").find("i").html("￥"+money);
            has_change.removeClass("cho");
            has_class_normal.removeClass("on-cho");
            if(isVip == 1){//是否为新生Vip
                //alert(isVip);
                if(has_vip_new.length){//判断是否已经购买
                    has_vip_new.find("span").html("￥" + vip_money);
                    var all_money = parseInt(vip_money) + parseInt(money);
                    has_pay_all_mon.find("i").html("￥" + all_money);
                    $(".buymore").val(has_vip_new.attr("moreid"));
                }else{
                    has_pay_all_mon.find("i").html("￥" + money);
                }
            }else{
                if(has_no_change.length){//是否已经购买
                    has_no_change.find("span").html("-￥"+ d_money);
                    var all_money = parseInt(money) - parseInt(d_money);
                    has_pay_all_mon.find("i").html("￥" + all_money);
                }else{
                    has_change.find("span").html("￥" + vip_money);
                    has_class_normal.find("span").html("-￥" + d_money);
                    has_pay_all_mon.find("i").html("￥"+money);
                }
            }

        });
    }
    chooseClass($choose_class);
    chooseClass($choose_class_one);
   

    //勾选是否多购买
    //function toAdd(obj){
        $(".change").on("click",function(){
            var that = $(this);
            if(that.hasClass("cho")){
                that.removeClass("cho").next().removeClass("on-cho");
                that.siblings(".pay_all_mon").find("i").html("￥" + money);
                $(".buymore").val("0");
             }else{
                that.addClass("cho").next().addClass("on-cho");
                var all_money = parseInt(money) + parseInt(vip_money) - parseInt(d_money);
                that.siblings(".pay_all_mon").find("i").html("￥" + all_money);
                $(".buymore").val(that.attr("moreid"));
             }
        })
    //}

    //页面内选择后套餐显示
    $shpping_car.on("click",function(){

        var ajaxurl = $("[data-loginajaxurl]").attr("data-loginajaxurl");
        var currentpageurl = $("[data-currentpageurl]").attr("data-currentpageurl");
        if(ajaxurl){
            $.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                },
                dataType: "json",
                success: function(data) {
                    if(data.status == "1"){//已登录
                        
                        flag = true;//app

                        $choose_class_pop.show();
                        $to_pay_on.hide();
                        $shpping_car.addClass("show_car");
                        if(isVip == 1){//是否为新生VIP
                            if(has_vip_new.length){//是否有这个结构
                                has_vip_new.show();
                            }
                            has_no_change.hide();
                            has_change.hide();
                            has_class_normal.hide();
                        }else{
                            has_no_change.show();
                            has_change.show();
                            has_class_normal.show();
                            has_vip_new.hide();
                        }
                        $choose_class_pop_c.animate({bottom:"0"});
                        $shpping_car.hide();
                    }else if(data.status == "0"){
                        //走登录流程
                        SetCookie("cookielogin","1");//放cookie
                        window.location.href = currentpageurl;
                    }
                }
            });
        }else{
            flag = true;//app

            $choose_class_pop.show();
            $to_pay_on.hide();
            $shpping_car.addClass("show_car");
            if(isVip == 1){//是否为新生VIP
                if(has_vip_new.length){//是否有这个结构
                    has_vip_new.show();
                }
                has_no_change.hide();
                has_change.hide();
                has_class_normal.hide();
            }else{
                has_no_change.show();
                has_change.show();
                has_class_normal.show();
                has_vip_new.hide();
            }
            $choose_class_pop_c.animate({bottom:"0"});
            $shpping_car.hide();
        }
        
       
        
    });

    
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

    // ajax回来弹层拉起 data-islogin = 1 为登录  0 为未登录
        var islogin = $("[data-loginajaxurl]").attr("data-islogin");
        var statusmore = $("#show_status").val();//判断团购有没有结束  2代表未结束   是否显示支付弹窗 1表示不显示 2表示显示
        
        if(islogin == 1 && statusmore == 2){
            $to_pay_on.hide();
            money = $(".js-not-pop").eq("0").attr("money");
            d_money = $(".js-not-pop").eq("0").attr("d-money");//不同的优惠价格
            vip_money =$(".js-not-pop").eq("0").attr("vip-money");//32节课价格
            console.log(money,d_money,vip_money);
            //如果不显示vip新生包
            var js_not_pop = $(".js-not-pop"),
                new_vip_class = true;
            //初始化弹层内内容
            js_not_pop.eq("0").find("i").addClass("on_choose");
            js_not_pop.eq("0").siblings().find("i").removeClass("on_choose");
            $(".packageid").val(js_not_pop.eq("0").attr("packageid"));
            $(".isvip").val(js_not_pop.eq("0").attr("isvip"));
            
            if(js_not_pop.eq("0").attr("isvip") == 1){//是否四vip套餐
                var buymore_val = $(".class_to_buy").find(".free_class").find("li").eq(1).attr("moreid");
                //console.log(buymore_val);
                $(".buymore").val(buymore_val);
            }else{
                //alert("");
                $(".buymore").val("0");
                var p = $(".class_to_buy").find(".free_class").find("li"); 
               // console.log(p); 
                for(var i=0; i<p.length; i++){
                    p.eq(i).removeClass("cho");
                }
                ///alert($(".buymore").val());  
            }
            

            for(var i=0; i<js_not_pop.length; i++){
                if(js_not_pop.eq(i).attr("isvip") == 1){
                    new_vip_class = false;
                }

            }
            //alert(new_vip_class);
            if(new_vip_class){
                vip_new.hide();
                change.show();
                class_normal.show();
                no_change.show();
            }else{
                vip_new.show();
                change.hide();
                class_normal.hide();
                no_change.hide();
            }
           
            $choose_class_pop.show();
            $class_to_buy.animate({bottom:"0"});
        }
    //


    ////页面未选择套餐显示弹窗
    $to_pay_on.on("click",function(){

        //添加购买前登陆判断

        var ajaxurl = $("[data-loginajaxurl]").attr("data-loginajaxurl");
        var currentpageurl = $("[data-currentpageurl]").attr("data-currentpageurl");

        if(ajaxurl){
            $.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                },
                dataType: "json",
                success: function(data) {
                    if(data.status == "1"){//已登录
                        $to_pay_on.hide();
                        money = $(".js-not-pop").eq("0").attr("money");
                        d_money = $(".js-not-pop").eq("0").attr("d-money");//不同的优惠价格
                        vip_money =$(".js-not-pop").eq("0").attr("vip-money");//32节课价格
                        console.log(money,d_money,vip_money);
                        //如果不显示vip新生包
                        var js_not_pop = $(".js-not-pop"),
                            new_vip_class = true;
                        //初始化弹层内内容
                        js_not_pop.eq("0").find("i").addClass("on_choose");
                        js_not_pop.eq("0").siblings().find("i").removeClass("on_choose");
                        $(".packageid").val(js_not_pop.eq("0").attr("packageid"));
                        $(".isvip").val(js_not_pop.eq("0").attr("isvip"));
                        
                        if(js_not_pop.eq("0").attr("isvip") == 1){//是否四vip套餐
                            var buymore_val = $(".class_to_buy").find(".free_class").find("li").eq(1).attr("moreid");
                            //console.log(buymore_val);
                            $(".buymore").val(buymore_val);
                        }else{
                            //alert("");
                            $(".buymore").val("0");
                            var p = $(".class_to_buy").find(".free_class").find("li"); 
                           // console.log(p); 
                            for(var i=0; i<p.length; i++){
                                p.eq(i).removeClass("cho");
                            }
                            ///alert($(".buymore").val());  
                        }
                        

                        for(var i=0; i<js_not_pop.length; i++){
                            if(js_not_pop.eq(i).attr("isvip") == 1){
                                new_vip_class = false;
                            }

                        }
                        //alert(new_vip_class);
                        if(new_vip_class){
                            vip_new.hide();
                            change.show();
                            class_normal.show();
                            no_change.show();
                        }else{
                            vip_new.show();
                            change.hide();
                            class_normal.hide();
                            no_change.hide();
                        }
                       
                        $choose_class_pop.show();
                        $class_to_buy.animate({bottom:"0"});
                    }else if(data.status == "0"){
                        //走登录流程
                        window.location.href = currentpageurl;
                    }
                }
            });
        }else{
            $to_pay_on.hide();
            money = $(".js-not-pop").eq("0").attr("money");
            d_money = $(".js-not-pop").eq("0").attr("d-money");//不同的优惠价格
            vip_money =$(".js-not-pop").eq("0").attr("vip-money");//32节课价格
            console.log(money,d_money,vip_money);
            //如果不显示vip新生包
            var js_not_pop = $(".js-not-pop"),
                new_vip_class = true;
            //初始化弹层内内容
            js_not_pop.eq("0").find("i").addClass("on_choose");
            js_not_pop.eq("0").siblings().find("i").removeClass("on_choose");
            $(".packageid").val(js_not_pop.eq("0").attr("packageid"));
            $(".isvip").val(js_not_pop.eq("0").attr("isvip"));
            
            if(js_not_pop.eq("0").attr("isvip") == 1){//是否四vip套餐
                var buymore_val = $(".class_to_buy").find(".free_class").find("li").eq(1).attr("moreid");
                //console.log(buymore_val);
                $(".buymore").val(buymore_val);
            }else{
                //alert("");
                $(".buymore").val("0");
                var p = $(".class_to_buy").find(".free_class").find("li"); 
               // console.log(p); 
                for(var i=0; i<p.length; i++){
                    p.eq(i).removeClass("cho");
                }
                ///alert($(".buymore").val());  
            }
            

            for(var i=0; i<js_not_pop.length; i++){
                if(js_not_pop.eq(i).attr("isvip") == 1){
                    new_vip_class = false;
                }

            }
            //alert(new_vip_class);
            if(new_vip_class){
                vip_new.hide();
                change.show();
                class_normal.show();
                no_change.show();
            }else{
                vip_new.show();
                change.hide();
                class_normal.hide();
                no_change.hide();
            }
           
            $choose_class_pop.show();
            $class_to_buy.animate({bottom:"0"});
        }


        
    });

    //点击页面空白处 隐藏div
    function hidePop(obj1,obj2){//obj1阻止冒泡的元素  obj2 需要展示的支付按钮
        $choose_class_pop.on("click",function(){
            var that = $(this);
            obj1.animate({bottom:"-10rem"},500);
            setTimeout(function(){
                that.hide();
                obj2.show();
            },500);  
        });
        //阻止冒泡
        obj1.on("click",function(e){
            $(this).show();
            e.stopPropagation();
        });
        $to_pay_on_pop_car.on("click",function(e){
            $(this).show();
            e.stopPropagation();
        });
        $(".pay-dialog-tit").on("click",function(e){
            $(this).show();
            e.stopPropagation();
        });
    };
    hidePop($choose_class_pop_c,$shpping_car);
    hidePop($class_to_buy,$to_pay_on);

    //弹层内选择套餐
    $class_to_buy.on("click",".js-not-pop",function(){
        var that = $(this);
        isVip = that.attr("isVip");
        money = that.attr("money");//套餐价格
        d_money = that.attr("d-money");//不同的优惠价格
        vip_money = that.attr("vip-money");//32节课价格
        //勾选框复原
        change.removeClass("cho");
        class_normal.removeClass("on-cho");

        that.closest("table").siblings("ul").find(".title").find("i").html("￥" + money);
        $(".packageid").val(that.attr("packageid"));
        $(".isvip").val(isVip);
        $(".buymore").val("0");
        that.find("i").addClass("on_choose");
        that.siblings().find("i").removeClass("on_choose");
        if(isVip == 1){//是否为新生Vip
            no_change.hide();
            change.hide();
            class_normal.hide();
            if(vip_new.length){//判断是否已经购买
                vip_new.show();
                vip_new.find("span").html("￥" + vip_money);
                var all_money = parseInt(vip_money) + parseInt(money);
                pay_all_mon.find("i").html("￥" + all_money);
                $(".buymore").val(vip_new.attr("moreid"));
            }else{
                pay_all_mon.find("i").html("￥" + money);
            }
        }else{
            
            no_change.show();
            change.show();
            class_normal.show();
            vip_new.hide();
            if(no_change.length){//是否已经购买
                no_change.find("span").html("-￥"+ d_money);
                var all_money = parseInt(money) - parseInt(d_money);
                pay_all_mon.find("i").html("￥" + all_money);
            }else{
                change.find("span").html("￥" + vip_money);
                class_normal.find("span").html("-￥" + d_money);
                pay_all_mon.find("i").html("￥" + money);
            }
        }
    })
    

    //app 相关

   //$to_pay_on_pop_car.on("click",function(){
        //console.log($(".packageid").val(),$(".isvip").val(),$(".buymore").val());
        // $choose_class_pop_c.animate({bottom:"-10rem"},500);
        // $class_to_buy.animate({bottom:"-10rem"},500);
        // $(".pay-dialog").show();
    //});
    // $(".pay-dialog-but").on("click",function(){

    //     $(".pay-dialog").hide();
    //     $choose_class_pop.hide();
    //     if(flag){
    //         $shpping_car.show();
    //     }else{
    //        $to_pay_on.show(); 
    //     }
    // })


    //倒计时活动效果
    var playTime = $(".play_time"),
        cannot_buy = $(".cannot_buy"),
        start_buy = $(".start_buy"),
        has_time = $(".has_time"),
        to_pay_on = $(".to_pay_on"),
        shpping_car = $(".shpping_car"),
        fix_null = $(".fix_null"),
        cannot_buy_btn = $(".cannot_buy_btn"),
        startTime = playTime.attr("start-time"),
        endTime = playTime.attr("end-time"),
        nowTime = playTime.attr("systime"),
        Time =  nowTime,
        flag1 = Time - startTime,
        flag2 = Time - endTime;
    if(endTime == "0"){
        has_time.addClass("disnone");
        cannot_buy_btn.removeClass("disnone");
        cannot_buy.removeClass("disnone");
        cannot_buy.find(".before").removeClass("disnone");
        cannot_buy.find(".after").addClass("disnone");
        to_pay_on.addClass("disnone");
        shpping_car.addClass("disnone");
        fix_null.addClass("disnone");
        //console.log("a");
        return;
    }
    if(startTime.length){

        var setT =  setInterval(function(){
            Time =  Number(Time) + 1;
            flag1 = Time - startTime;
            flag2 = Time - endTime;
            if(flag1<0){
            //距离开始状态 不能买
                // cannot_buy.addClass("disnone");
                // cannot_buy_btn.removeClass("disnone");
                // start_buy.removeClass("disnone");
                //优化
                cannot_buy.find(".before").removeClass("disnone");
                cannot_buy.find(".after").addClass("disnone");
                to_pay_on.addClass("disnone");
                shpping_car.addClass("disnone");
                fix_null.addClass("disnone");


                has_time.addClass("disnone");
                cannot_buy_btn.removeClass("disnone");
                cannot_buy.removeClass("disnone");
                var m = Math.abs(flag1);
                m--;
                var v = showTime(m);
                start_buy.find(".Tday").text(v.day);
                start_buy.find(".Thor").text(v.hor);
                start_buy.find(".Tmin").text(v.min);
                start_buy.find(".Tsec").text(v.sec);
            }else if(flag1>0 && flag2<0){
            //距离结束时间  可以购买
                cannot_buy.addClass("disnone");
                start_buy.addClass("disnone");
                has_time.removeClass("disnone");
                cannot_buy_btn.addClass("disnone");
                var m = Math.abs(flag2);
                m--;
                var v = showTime(m);
                if(v.day != "0"){//天数为零的时候不显示
                    has_time.find(".Tday").parent().removeClass("disnone");
                    has_time.find(".Tday").text(v.day);
                }else{
                    has_time.find(".Tday").parent().addClass("disnone");
                }
                has_time.find(".Thor").text(v.hor);
                has_time.find(".Tmin").text(v.min);
                has_time.find(".Tsec").text(v.sec);


                //优化
                to_pay_on.removeClass("disnone");
                shpping_car.removeClass("disnone");
                fix_null.removeClass("disnone");
            }else if(flag2>0){
            //倒计时结束不能购买
                has_time.addClass("disnone");
                cannot_buy_btn.removeClass("disnone");
                cannot_buy.removeClass("disnone");
                cannot_buy.find(".before").addClass("disnone");
                cannot_buy.find(".after").removeClass("disnone");
                to_pay_on.addClass("disnone");
                shpping_car.addClass("disnone");
                fix_null.addClass("disnone");
                clearInterval(setT);
            }

        },1000);
    }


    //时间差
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

