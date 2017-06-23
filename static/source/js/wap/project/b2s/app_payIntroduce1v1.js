define("app_payIntroduce1v1",["fastclick","swiper-3.3.1.jquery.min"],function(require, exports, module) {
    require("swiper-3.3.1.jquery.min");
    require("fastclick");
    FastClick.attach(document.body);

    //app开始 单加
    var $appFlag = 0,//1为弹框的遮罩层和里面的内容都隐藏（隐藏过程需要600毫秒），0为弹框的遮罩层不隐藏，里面的元素隐藏，2为遮罩层里面的的元素立即隐藏。
        $appPopDialogType = 0;//0为底部大按钮立即支付的弹窗 $not_choose_pop，，1为购物车所在弹窗 $class_to_buy


    //app结束
   $choose_btn = $(".choose_btn");
   $choose_class = $(".choose_class").find("li");
   $to_pay_on = $(".to_pay_on");
   $shpping_car = $(".shpping_car");
   $not_choose_pop = $(".not_choose_pop");
   $class_to_buy = $(".class_to_buy");
   $to_pay_on_pop = $(".to_pay_on_pop");
   $table = $("table");
   $choose_class_i = $table.find("td").find("i");
   $choose_class_par = $(".colo").parent();
   $free_class = $(".free_class");
   $money = $(".title").find("i");
   $change_on = $(".change").find("p");
   $pay_all_mon_i = $(".pay_all_mon").find("i");
   //$money_free = $(".no_change").attr("money");

   $money_1v1 = $(".change").attr("money");
   flag = false;
   $shpping_car = $(".shpping_car");
   $shop_car = $shpping_car.find(".shop_car");
   $choose_class_pop = $(".choose_class_pop");
   $choose_class_pop_c = $(".choose_class_pop_c");
   $class_normal_attr = $choose_class_pop_c.find(".class_normal");
   $to_pay_on_pop_car = $(".to_pay_on_pop_car");
   $to_pay = $(".to_pay");
   var $choose_class_text ,
   $choose_class_money ,
   $different_free,
   $package_val,
   $1v1_32_val,
   $buyed_free,
   $1v1_32;
   var d_money = $("#b2s_package_price").val();

   $1v1_32 = $not_choose_pop.find(".change_on").attr("choose-free");
   if($1v1_32){
        $1v1_32_val = $1v1_32;
   }else{
        $1v1_32_val = 0;
   }
   //alert($1v1_32_val);


   var tools = {
        changeClass : function(){//页面内选择课程选项
            $choose_class.on("click",function(){
                var that = $(this).find(".choose_btn");
                //恢复价格红色
                // $(".choose_class_pop").removeClass("price_gree");
                $(".choose_class_pop_c").find(".class_normal").find("span").show();
                //$1v1_32_val = null;
                if(that.attr("zs") == "1"){
                    // console.log(that.attr("zs"));
                    if($choose_class_pop_c.find(".change").length > 0){
                        $choose_class_pop_c.find(".change").find("p").html('赠送价值'+d_money+'元VIP精品课32节');
                        $choose_class_pop_c.find(".change").find("p").next().html("+￥0");
                        $choose_class_pop_c.find(".change").find("p").addClass("js-change").removeClass("change_on");
                        
                        $1v1_32_val = $choose_class_pop_c.find(".js-change").attr("choose-free");

                        $choose_class_pop_c.find(".change").attr("money","0");
                        that.attr("different_free","0");
                        $choose_class_pop_c.find(".class_normal").find("p").html('')
                        $choose_class_pop_c.find(".class_normal").find("p").next().html("0");
                        $choose_class_pop_c.closest(".choose_class_pop").removeClass("price_gree");
                    }
                }else{
                    $choose_class_pop_c.find(".change").find("p").html('同时购买外教VIP精品课32节');
                    $choose_class_pop_c.find(".change").find("p").next().html("￥"+d_money);
                    $choose_class_pop_c.find(".change").find("p").removeClass("change_on").removeClass("js-change");
                    $1v1_32_val = 0;
                    $1v1_32_val = 0;
                    $choose_class_pop_c.find(".change").attr("money",d_money);
                    $choose_class_pop_c.closest(".choose_class_pop").addClass("price_gree");
                    var du_different= that.attr("du_different");
                    that.attr("different_free",du_different);
                    $choose_class_pop_c.find(".class_normal").find("p").html('立享1对1专属外教课优惠')
                    $choose_class_pop_c.find(".class_normal").find("p").next().html("-￥"+ $different_free);
                }
                $shop_car.show();
                that.addClass("on_cli");
                that.find("span").html("已选");
                that.parent().siblings().find(".choose_btn").removeClass("on_cli");
                that.parent().siblings().find(".choose_btn").find("span").html("选择");
                $to_pay_on.hide();  
                $shpping_car.show();
                $choose_class_text = that.siblings(".left_content").find("p").eq(0).html(); 
                $choose_class_money = that.siblings(".left_content").find("p").eq(1).attr("money");
                $choose_class_pop_c.find(".title").find("span").html($choose_class_text);
                $choose_class_pop_c.find(".title").find("i").html("￥" + $choose_class_money);
                $different_free = that.attr("different_free");//精品课优惠价
                $class_normal_attr.attr("money",$different_free);
                $class_normal_attr.find("span").html("-￥"+ $different_free);
                $choose_class_pop.find(".no_change").attr("money",$different_free);
                $choose_class_pop.find(".no_change").find("span").html("-￥"+ $different_free);
                var different_free = $choose_class_pop_c.find(".class_normal").attr("money");
                if(!different_free){
                    different_free =0;
                }
                var free_m = $choose_class_pop_c.find(".no_change").attr("money");
                // $1v1_32_val = that.attr("packageid");//套餐id
                // $1v1_32 = that.attr("packageid");//留存id 再次选中可复原
                $package_val = that.attr("package");//套餐种类

                if(!free_m){
                    free_m = 0;
                }
                var m_1v1  = $choose_class_pop_c.find(".change").attr("money");
                if(!m_1v1){
                    m_1v1 = 0;
                    //$1v1_32_val = 0;
                }else{
                    //$1v1_32_val = $choose_class_pop_c.find(".change").find("p").attr("choose-free");
                }
                //var all_money =  parseFloat($choose_class_money) + parseFloat(m_1v1) - parseFloat(free_m) - parseFloat(different_free);
                var all_money =  parseFloat($choose_class_money) - parseFloat(free_m);
                $choose_class_pop_c.find(".pay_all_mon").find("i").html("￥" + all_money);

                if(that.attr("zs") == "1"){
                    $choose_class_pop_c.find(".class_normal").find("p").next().html("");
                }
                //console.log($package_val , $1v1_32_val);
            }); 
        },
        noChoosePay : function(obj1,obj2,obj3,f){//显示有课程信息的弹层 obj1 页面内支付  obj2 弹窗  f为有购物车的弹窗
            obj1.on("click",function(){
                var that = $(this);
                that.hide();
                obj2.show();
                $to_pay_on_pop.show();
                // obj3.animate({bottom:'1.25rem'});
                obj3.animate({bottom:'0'},1);


                $appPopDialogType = 0;
                if(f){
                    //alert();
                    that.hide();
                    $appPopDialogType = 1;
                }
            })
        },
        hideNoPop : function(obj1,obj2,obj3){//obj1 半透明背景层 obj2 内容弹窗 obj3 原本的支付按钮
            obj1.on("click",function(){
                console.log($appFlag)
                var that = $(this);
                // obj2.animate({bottom:'-13rem'},600);
                obj2.animate({bottom:'-13rem'},1);
                if($appFlag == 0){
                    setTimeout(function(){
                        that.hide();
                        js_pay_dialog.addClass("disnone");
                    },1)
                }else if($appFlag == 2){
                    setTimeout(function(){
                        that.hide();
                    },1)
                }
                
                obj3.show();
                $shop_car.show();
            });
            obj2.on("click",function(e){
                obj1.show();
　　            e.stopPropagation();
            });
        },
        chooseClassPop : function(){//弹层内套餐价格改变
            //flag  判断是否勾选
            $choose_class_par.on("click",function(){//页面内未选择课程时 弹窗内改变套餐
                var that = $(this).find("i");
                that.closest("table").siblings(".free_class").find(".class_normal").find("span").show();
                flag = false;
                //恢复价格红色
                //that.closest(".not_choose_pop").removeClass("price_gree");
                if(that.attr("zs") == "1"){
                    console.log(that.attr("zs"));
                    if($not_choose_pop.find(".change").length >0){
                        $not_choose_pop.find(".change").find("p").html('赠送价值'+d_money+'元VIP精品课32节');
                        $not_choose_pop.find(".change").find("p").next().html("+￥0");
                        $not_choose_pop.find(".change").find("p").addClass("js-change").removeClass("change_on");

                        $1v1_32_val = $not_choose_pop.find(".js-change").attr("choose-free");

                        $not_choose_pop.find(".change").attr("money","0");
                        $not_choose_pop.removeClass("price_gree");
                        that.attr("different_free","0");
                        $not_choose_pop.find(".class_normal").find("p").html('')
                        $not_choose_pop.find(".class_normal").find("p").next().html("0");
                    }
                }else{//不是45节的情况下
                    $not_choose_pop.find(".change").find("p").html('同时购买外教VIP精品课32节');
                    $not_choose_pop.find(".change").find("p").next().html("￥"+d_money);
                    $not_choose_pop.find(".change").find("p").removeClass("change_on").removeClass("js-change");

                    $1v1_32_val = 0;//////////////////
                    //flag = true;
                    $not_choose_pop.addClass("price_gree");
                    $not_choose_pop.find(".change").attr("money",d_money);
                    var du_different= that.attr("du_different");
                    that.attr("different_free",du_different);
                    $not_choose_pop.find(".class_normal").find("p").html('立享1对1专属外教课优惠')
                    $not_choose_pop.find(".class_normal").find("p").next().html("-￥"+ $different_free);
                }
                that.addClass("on_choose");
                that.parent().parent().siblings().find("i").removeClass("on_choose");
                
                $different_free = that.attr("different_free");
                $not_choose_pop.find(".class_normal").attr("money",$different_free);
                $not_choose_pop.find(".class_normal").find("span").html("-￥"+ $different_free);
                $not_choose_pop.find(".no_change").attr("money",$different_free);
                $not_choose_pop.find(".no_change").find("span").html("-￥"+ $different_free);
                var different_free = $not_choose_pop.find(".class_normal").attr("money");
                if(!different_free){
                    different_free =0;
                }
                var money = that.parent().siblings(".colo").attr("money");
                $money.html("￥"+money);
                $money_free = $(".class_to_buy").find(".no_change").attr("money");
                $money_1v1 = $(".class_to_buy").find(".change").attr("money");
                
                $package_val = that.attr("package");//套餐种类
                
                if(!$money_free){
                    $money_free = 0;
                }
                
                if(!$money_1v1){
                    $money_1v1 = 0;
                    //$1v1_32_val = 0;
                }else{
                    //$1v1_32_val = $(".class_to_buy").find(".change").find("p").attr("choose-free");
                }
                if(flag){
                    $pay_all_mon_i.html("￥"+ (parseFloat(money) - parseFloat($money_free) + parseFloat($money_1v1)- parseFloat(different_free)));
                }else{
                    $pay_all_mon_i.html("￥"+ (parseFloat(money) - parseFloat($money_free)));
                }
                if(that.attr("zs") == "1"){
                    $not_choose_pop.find(".class_normal").find("p").next().html("");
                }
                //console.log($package_val , $1v1_32_val);
            });
            $change_on.on("click",function(){
                var that = $(this);
                $1v1_32_val = that.attr("choose-free");
                if(that.hasClass("change_on")){
                    that.removeClass("change_on");
                    $1v1_32_val = 0;
                    flag = false;
                    //价格不显示
                    //that.parent().siblings(".class_normal").find("span").hide();
                    //价格置灰
                    if(!that.hasClass("js-change")){
                        that.closest("ul").parent().parent().addClass("price_gree");
                    }
                }else{
                    that.addClass("change_on");
                    $1v1_32_val = that.attr("choose-free");
                  // that.parent().siblings(".class_normal").find("span").show();
                    flag = true;
                    //价格置灰
                    if(!that.hasClass("js-change")){
                        that.closest("ul").parent().parent().removeClass("price_gree");
                    }
                }
                //console.log(that.closest(".free_class").siblings("table").find(".on_choose").attr("packageid"));
                //console.log($1v1_32_val);
                var $money = that.parent().siblings(".title").find("i");
                if(!$money.length){
                    //alert();
                    $money = that.parent().parent().siblings(".title").find("i");
                }
                $different_free = that.attr("different_free");
                that.siblings(".class_normal").attr("money",$different_free);
                that.siblings(".class_normal").find("span").html("-￥"+ $different_free);
                that.siblings(".no_change").attr("money",$different_free);
                that.siblings(".no_change").find("span").html("-￥"+ $different_free);
                if(that.parent().parent().siblings("table").length){
                    //alert();
                    var different_free = $not_choose_pop.find(".class_normal").attr("money");
                }else{
                    var different_free = $choose_class_pop_c.find(".class_normal").attr("money");
                }
                if(!different_free){
                    different_free =0;
                }
                $pay_all_mon_i = that.parent().siblings(".pay_all_mon").find("i");
                $money_free = that.parent().siblings(".no_change").attr("money");
                $money_1v1 = that.parent().attr("money");
                if(!$money_free){
                    $money_free = 0;
                }
                if(!$money_1v1){
                    $money_1v1 = 0;
                }
               // console.log($money_free);
                var money_val = $money.html();
                var money = money_val.replace("￥","");
                if(flag){
                    $pay_all_mon_i.html("￥"+(money - $money_free + parseFloat($money_1v1) - parseFloat(different_free)));
                }else{
                    $pay_all_mon_i.html("￥"+(money - $money_free));
                }
            })
        },
        goTo : function(){
            var $introduce_title= $(".introduce_title"),
                $gotoTar = $("[id*=class_]");
            $introduce_title.on("click","li",function(){
                var that = $(this);
                    that.addClass("active").siblings().removeClass("active");
                    document.body.scrollTop = document.documentElement.scrollTop = $gotoTar.eq(that.index()).offset().top - $(".introduce_title_sure").height() + 2;
            })
        },
        getValue : function(obj){
            obj.on("click",function(){
                var $form  = $(".js_payform");
                // 有没有改变勾选课程
                // if(!$package_val){
                //     $package_val = 0;
                // }else{
                    $form.find("input[package]").val($package_val);
                //}
                // 有没有勾选掉32节
                $form.find("input[addbuy]").val($1v1_32_val);
                console.log($form.find("input[package]").val(),$form.find("input[addbuy]").val());
            })
        },
        scrollTap : function(){
            var introduce_title_box = $(".introduce_title_box");
            var setFix = function(){
                var introduce_title_sure = $(".introduce_title_sure");
                var nor_top = introduce_title_box.offset().top;
                if(nor_top <= $(window).scrollTop()){
                    introduce_title_sure.addClass("fix_top");
                }else{
                    introduce_title_sure.removeClass("fix_top");
                }

            }

            var gotoTar = $("[id*=class_]"),
                _body = $('body')[0],
                _li = $(".introduce_title>li");


            var setTop = function(){
                var scrollTop = $(this).scrollTop(),
                    _body = $("body")[0],
                    $introduce_title_sure = $(".introduce_title_sure"),
                    // 最大滚动
                    scrollTop3 = _body.scrollHeight - _body.clientHeight,
                    scrollTop2 = gotoTar.eq(1).offset().top - $introduce_title_sure.height(),
                    scrollTop1 = gotoTar.eq(0).offset().top - $introduce_title_sure.height(),
                    scrollTop = $(this).scrollTop();
                    
                if(scrollTop3 == scrollTop){
                    _li.removeClass("active");
                    _li.eq(-1).addClass("active");
                }else{
                    _li.eq(-1).removeClass("active");
                }
                
                if(scrollTop>=scrollTop2 && scrollTop<scrollTop3){
                    _li.removeClass("active");
                    _li.eq(1).addClass("active");
                }

                if(scrollTop>=scrollTop1 && scrollTop<scrollTop2){
                    _li.removeClass("active");
                    _li.eq(0).addClass("active");
                }

            }


            $(window).on("scroll touchstart touchmove touchend load",function(){
                setFix();
                setTop.call(this);
            });
        }
   }
   tools.changeClass();
   // tools.noChoosePay($to_pay_on,$not_choose_pop,$class_to_buy);

   // tools.hideNoPop($not_choose_pop,$class_to_buy,$to_pay_on);
   tools.chooseClassPop();
   // tools.noChoosePay($shpping_car,$choose_class_pop,$choose_class_pop_c,true);
   // tools.hideNoPop($choose_class_pop,$choose_class_pop_c,$shpping_car);
   // tools.goTo();
   // tools.scrollTap();
   tools.getValue($to_pay_on_pop_car);
   tools.getValue($to_pay_on_pop);
   tools.getValue($to_pay);
   

    //
    //
    // $("body").scrollTop(300)
    /*以下部分针对app*/
    var js_payForm = $("#js_payForm"),
        js_payMode = $(".js_payMode"),
        js_pay_dialog = $(".js_pay_dialog"),
        js_pay_dialog_hide = $(".js_pay_dialog_hide"),
        js_paySelect = $(".js_paySelect"),
        js_choose_dialog = $(".js_choose_dialog"),
        payDialogWrap = $(".pay-dialog-wrap"),
        _scrollTop = null;


    window.checkWeixin=function(type){
        if(type != 1){
            //$(".js_weixin").addClass('disnone');
            $(".js_weixin").css({"display":"none"});
        }
    };
    // window.location.href = "/client/invoke?type=1";
    // window.location.href = "app51talkb2s://client/invoke?type=1";
    
    var controlScroll = (function(){
        var dis = function(event){
            var target = event.target;
            var canLock = true;
            /*while(!!target){
                if(target.className &&　target.className.indexOf("not_choose_pop") > -1){
                    canLock = false;
                    break;
                }
                target = target.parentNode;
            }*/

            console.log(canLock);
            if(canLock)　event.preventDefault();
            // console.log(event.target);
            // event.preventDefault();
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


    //进入页面时底部的立即支付按钮
    $to_pay_on.on("click","",function(){
        $appPopDialogType = 0;
        $to_pay_on.hide();
        $not_choose_pop.show();
        $to_pay_on_pop.show();
        payDialogWrap.removeClass("disnone");
        $class_to_buy.css({"bottom": '0'});
        _scrollTop = $("body").scrollTop();
        // $("body").css({"position":"fixed","top":0-_scrollTop});
        // $("html,body").css({"overflow":"hidden"});
        controlScroll.lock();
    })

    //购物车点击后的效果
    $shpping_car.on("click","",function(){
        $appPopDialogType = 1;
        $shpping_car.hide();
        $choose_class_pop.show();
        $to_pay_on_pop_car.show();
        $choose_class_pop_c.show();
        payDialogWrap.removeClass("disnone");
        _scrollTop = $("body").scrollTop();
        // $("html,body").css({"overflow":"hidden"});
        controlScroll.lock();
    })

    
    //弹层1的蒙层点击
    // $not_choose_pop.on("click","",function(){
    payDialogWrap.on("click","",function(){
        dialogHide();
    })

    //弹层2的蒙层点击
    // $choose_class_pop.on("click","",function(){
    payDialogWrap.on("click","",function(){
        dialogHide();
    })


    //弹窗1和弹窗2 里面的 立即支付按钮
    js_payMode.on("click","",function(){
        

        // $appFlag = 1;
        if($appPopDialogType == 0){
            // $not_choose_pop.trigger("click");
            // $class_to_buy.css({"bottom": ''});
            $class_to_buy.hide();
            $to_pay_on_pop.hide();
        }else if($appPopDialogType == 1){
            // $choose_class_pop.trigger("click");
            $choose_class_pop_c.hide();
            $to_pay_on_pop_car.hide();
        }
        js_pay_dialog.removeClass("disnone");

        return false;
    })

    js_pay_dialog_hide.on("click","",function(){
        dialogHide();
    })

    var dialogHide = function(){
        
        js_pay_dialog.addClass("disnone");
        payDialogWrap.addClass("disnone");

        if($appPopDialogType == 0){
            // $not_choose_pop.trigger("click");
            $not_choose_pop.hide();
            $to_pay_on.show();
            $class_to_buy.show();
            $to_pay_on_pop.show();
            
        }else if($appPopDialogType == 1){
            // $choose_class_pop.trigger("click");
            $choose_class_pop.hide();
            $shpping_car.show();
            $choose_class_pop_c.show();
            $to_pay_on_pop_car.show();

        }
        
        /*$("html,body").css({"overflow":""});
        document.body.scrollTop=_scrollTop;*/
        controlScroll.unLock();

    }

    //选择微信或支付宝 支付提交
    js_paySelect.on("click","span",function(){
        var _this = $(this),
            paytype = _this.data('paytype');
        $(".js_paytype").val(paytype);
        $(".js_timestamp").val(new Date().getTime());
        //然后js触发form提交。
        js_payForm.submit();
    })

    ///////////////// swiper ///////////////////
    var mySwiper = new Swiper('.swiper-container', {
		autoplay: 3000,//可选选项，自动滑动
		autoplayDisableOnInteraction : false,
		loop: true,
    	pagination: '.swiper-pagination',// 如果需要分页器
	})
    
});



