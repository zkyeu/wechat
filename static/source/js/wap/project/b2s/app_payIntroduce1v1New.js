define("app_payIntroduce1v1New",["fastclick","swiper-3.3.1.jquery.min"],function(require, exports, module) {
    require("swiper-3.3.1.jquery.min");
    require("fastclick");

    FastClick.attach(document.body);

   ///////////////// swiper ///////////////////
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        autoplayDisableOnInteraction : false,
        loop: true,
        pagination: '.swiper-pagination',// 如果需要分页器
    });

    //声明变量便于调用
    var money,freemoney,vipmoney,packagemore;

    //弹层
    var $to_pay_on = $(".to_pay_on"),
        $choose_pop = $(".choose_pop"),
        $choose_class_pop_c = $choose_pop.find(".choose_class_pop_c"),
        $to_pay_on_pop = $choose_pop.find(".to_pay_on_pop"),
        $choose_class = $(".choose_class"),
        $class_to_buy = $choose_pop.find(".class_to_buy"),
        $free_class = $(".free_class"),
        $shpping_car = $(".shpping_car");
//未选择课程时弹窗
    $to_pay_on.on("click",function(){
        //禁止屏幕滑动
        controlScroll.lock();

        //app 微信支付宝隐藏
        $(".js_pay_dialog").hide();

        //传值置空
        $(".package").val($("table").find("tr").eq(1).attr("package"));
        $(".moreClass").val("0");
        $(".packagemore").val("0");
        //弹层的显示以及隐藏
        $(this).hide();
        $to_pay_on_pop.show();
        $choose_pop.show();
        $class_to_buy.animate({bottom:0},1);
        //样式恢复

        setTimeout(function(){
            //为啥得执行两遍啊？？
            $("table").find("tr").eq("1").trigger("click");
            $("table").find("tr").eq("1").trigger("click");
        },500);
    });
    //页面内选择课程弹窗内
    function changeShow(f,obj){
        if(f){
            obj.find(".free_change").show();
            obj.find(".change").hide();
            obj.find(".class_normal").hide();
        }else{
            obj.find(".free_change").hide();
            obj.find(".change").show();
            obj.find(".class_normal").show();
        }
    }
//页面内选择课程

    //选择课程
    function chooseClass(obj1, obj2, flag){//obj1 =that  obj2 =pop flag =两者的不同1位页面内选择
        //传值改变
        $(".package").val(obj1.attr("package"));
        // 样式改变
        if(flag == "1"){//页面内文字的改变
            obj1.find(".choose_btn").addClass("on_cli").html("已选<br>课程");
            obj1.siblings().find(".choose_btn").removeClass("on_cli").html("未选<br>课程");
        }else{
            if(obj1.find("i").hasClass("on_choose")){
                //obj1.find("i").removeClass("on_choose");
            }else{
                obj1.find("i").addClass("on_choose");
                obj1.siblings().find("i").removeClass("on_choose");                
            }
        }
        zs = obj1.attr("zs");
        money = obj1.attr("money");
        freemoney = obj1.attr("freemoney");
        vipmoney = obj1.attr("vipmoney");
        packagemore = obj1.attr("packagemore");
        title = obj1.find(".left_content").find("p").html();
        //弹层title
        if(flag == "1"){
            obj2.find(".title").find("span").html("已选课程" + title);
        }
        obj2.find(".title").find("i").html("￥"+money);
        //弹层内内容
        if($(".no_change").length){//判断是不是vip
             obj2.find(".no_change").find("span").html("-￥"+freemoney);
             obj2.find(".pay_all_mon").find("i").html("￥"+ (parseInt(money) - parseInt(freemoney)));
        }else{//不是vip的情况
            if(zs == "1"){//是45节赠送情况
                //勾选传值置空
                $(".moreClass").val("0");
                $(".packagemore").val("0");
                obj2.find(".free_change").find("em").html(vipmoney);
                changeShow(1,obj2);
                obj2.find(".pay_all_mon").find("i").html("￥"+ money);
            }else{
                //勾选样式置空
                obj2.find(".change").find("p").removeClass("change_on");
                obj2.find(".change").find("span").removeClass("js-click");
                obj2.find(".class_normal").find("span").removeClass("js-click");
                //勾选传值置空
                $(".moreClass").val("0");
                $(".packagemore").val("0");
                obj2.find(".change").find("span").html("+￥"+ vipmoney);
                obj2.find(".class_normal").find("span").html("-￥"+ freemoney);
                changeShow(0,obj2);
                obj2.find(".pay_all_mon").find("i").html("￥"+ money);
                //$choose_class_pop_c.find(".pay_all_mon").find("i").html("￥"+ ( parseInt(money) + parseInt(vipmoney) - parseInt(freemoney)));
            }
        }
    }
    $choose_class.on("click","li",function(){
        var that = $(this);
        $shpping_car.show();
        $to_pay_on.hide();
        chooseClass(that, $choose_class_pop_c , 1);
    });

//页面内勾选课程弹层内勾选32节
    function moreClass(obj){
        if(obj.find("p").hasClass("change_on")){
            //样式
            obj.find("p").removeClass("change_on");
            obj.find("span").removeClass("js-click");
            obj.siblings(".class_normal").find("span").removeClass("js-click");
            obj.siblings(".pay_all_mon").find("i").html("￥"+money);
            //传值
            $(".moreClass").val("0");
            $(".packagemore").val("0");
        }else{
            obj.find("p").addClass("change_on");
            obj.find("span").addClass("js-click");
            obj.siblings(".class_normal").find("span").addClass("js-click");
            obj.siblings(".pay_all_mon").find("i").html("￥"+ ( parseInt(money) + parseInt(vipmoney) - parseInt(freemoney)));
            //传值
            $(".moreClass").val("1");
            $(".packagemore").val(packagemore);
        }
    }
    $choose_class_pop_c.on("click",".change",function(){
        var that = $(this);
        moreClass(that);  
    })

    //弹层内勾选32节
    $class_to_buy.on("click",".change",function(){
        var that = $(this);
        moreClass(that);  
    })

//未选课程弹层
    $("table").on("click","tr",function(){
        var that = $(this);
        chooseClass(that, $class_to_buy ,0);
    });

//已选课程弹层
    $shpping_car.on("click",function(){
        //禁止屏幕滑动
        controlScroll.lock();
        //app 微信支付宝隐藏
        $(".js_pay_dialog").hide();


        $(this).hide();
        $to_pay_on_pop.show();
        $choose_pop.show();
        $choose_class_pop_c.animate({bottom:0},1);
    });


    //弹层出现点击空白处消失
    function toHide(){
        //取消禁止屏幕滑动
        controlScroll.unLock();

        $class_to_buy.animate({bottom:"-17rem"},1);
        $choose_class_pop_c.animate({bottom:"-10rem"},1);
        setTimeout(function(){
            $to_pay_on_pop.hide();
            $choose_pop.hide();
            $to_pay_on.show(); 
    //页面内选择课程样式恢复
            $choose_class.find("li").each(function(){
                $(this).find(".choose_btn").removeClass("on_cli").html("未选<br>课程");
            });
        },1);
    }

    $choose_pop.on("click",function(){
        //var that = $(this);
        toHide();
    });
    function stop(obj){
        obj.on("click",function(e){
            $choose_pop.show();
    　　    e.stopPropagation();
        });
    }
    stop($class_to_buy);
    stop($to_pay_on_pop);
    stop($choose_class_pop_c);

    //app
    stop($(".js_pay_dialog"));


//app相关
   $(".js-app-pop").on("click",function(){
        $class_to_buy.animate({bottom:"-17rem"},1);
        $choose_class_pop_c.animate({bottom:"-10rem"},1);
        $(".js_pay_dialog").show();
   });   


   $(".js_pay_dialog_hide").on("click","",function(){
        toHide();
   });
});

//选择微信或支付宝 支付提交
    $(".js_paySelect").on("click","span",function(){
        var _this = $(this),
            paytype = _this.data('paytype');
        $(".js_paytype").val(paytype);
        $(".js_timestamp").val(new Date().getTime());
        //然后js触发form提交。
        $(".js_payform").submit();
    })

//无微信时隐藏
    window.checkWeixin=function(type){
        if(type != 1){
            //$(".js_weixin").addClass('disnone');
            $(".js_weixin").css({"display":"none"});
        }
    };

//有遮罩层时禁止滑动
    var controlScroll = (function(){
        var dis = function(event){
            var target = event.target;
            var canLock = true;
            
            if(canLock)　event.preventDefault();
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
