define("tearEnvelopes", ["fastclick","utility","swiper-3.3.1.jquery.min"], function(require, exports, module) {
    require("fastclick");
    FastClick.attach(document.body);
    var utility = require("utility"),
        promptDialog = utility.promptDialog;
    (function() {
        window.init=function(){
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: 3000,//可选选项，自动滑动
                autoplayDisableOnInteraction : false,
                loop: true,
                // direction:'vertical',
                pagination: '.swiper-pagination',// 如果需要分页器
            })
            var mySwiper1 = new Swiper('.swiper-container1', {
                autoplay: 2000,//可选选项，自动滑动
                autoplayDisableOnInteraction : false,
                loop: true,
                direction: 'vertical',
                height: $(".swiper-container1").height(),//你的slide高度
                // simulateTouch : false,
                noSwiping : true,
            })
        }

        //倒计时 start
        var js_time = $(".js_time"),
            js_day = $(".js_day"),
            js_hour = $(".js_hour"),
            js_minute = $(".js_minute"),
            js_second = $(".js_second"),
            js_none =$(".js_none"),
            js_show = $(".js_show"),
            // maxtime = js_time.data("maxtime"),
            // nowtime = js_time.data("nowtime") || maxtime,
            // time = null; 
            // assignment();
            starttime = js_time.data("starttime"),
            endtime = js_time.data("endtime"),
            nowtime = js_time.data("nowtime"),
            countDown_tit = $(".countDown-tit"),
            flag1 = starttime-nowtime,
            flag2 = endtime - nowtime,
            time = null; 
            isOpne = $(".isOpne").val();
        var flag =(isOpne == "3") ? true :false;//判断是否已经点了红包
            setInterval(function(){
                if(flag1>0){//距离开始开始
                    time = flag1;
                    time --;
                    flag1 = time;
                    assignment(time);
                    js_none.removeClass("disnone");
                    js_show.addClass("disnone");
                    countDown_tit.html("- 距离报名开始还有 -");
                }else if(flag2>0){//距离结束
                    time = flag2;
                    time --;
                    flag2 = time;
                    assignment(time);
                    js_none.addClass("disnone");
                    js_show.removeClass("disnone");
                    if(flag){
                        just_open.removeClass("disnone");
                        not_open.addClass("disnone");
                    }else{
                        not_open.removeClass("disnone");
                        just_open.addClass("disnone");
                    }
                    countDown_tit.html("- 距离报名结束还有 -");
                }
            },1000)

            function assignment(obj){
                time = count(obj);
                js_day.html(time.day); 
                js_hour.html(time.hour); 
                js_minute.html(time.minute); 
                js_second.html(time.second); 
            }

            function count(s){
                // console.log(s)
                var time = {};
                time.day = Math.floor(s/(24*60*60));
                time.hour = Math.floor(s/(60*60)%24);
                time.minute = Math.floor(s/60%60);
                time.second = Math.floor(s%60);
                return time;
            }
        //倒计时 end

        //立即报名 start
        var js_apply = $(".js_apply"),
            js_form = $(".js_form"),
            js_pay_app = $(".js_pay_app"),
            js_pay_app_val = $(".js_pay_app_val"),
            js_pay_timestamp = $(".js_pay_timestamp"),
            js_pay_btn = $(".js_pay_btn"),
            js_pay = $(".js_pay"),
            js_dialog = $(".js_dialog");

        js_apply.on("click","",function(){
            if(!flag){
                promptDialog({content:"亲~先把红包拆了吧",});
             }else{
                var _this = $(this),
                    href = _this.data('href') || "";
                if(href != ""){
                    window.location.href = href;
                }else{
                    js_dialog.removeClass('disnone');
                    controlScroll.lock();
                }
             }
        })
        js_dialog.on("click","",function(){
            js_dialog.addClass('disnone');
            controlScroll.unLock();
        })
        js_pay.on("click","",function(e){
            e.stopPropagation();
        })
        
        js_pay_app.on("click","",function(){
            var _this = $(this),
                app = _this.data('app');
            js_pay_app.removeClass('selected');
            _this.addClass('selected');
            js_pay_app_val.val(app);
        })
        js_pay_btn.on("click","",function(){
            js_pay_timestamp.val(new Date().getTime());
            js_form.submit();
        })

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

        //立即报名 end


        //红包模块
        var envelopes = $(".envelopes_box").find("div"),
            ajaxUrl = $(".envelopes_box").attr("ajaxUrl");
            open_envelopes = $(".open_envelopes"),
            envelopes_form = $(".envelopes_form"),
            js_cannot_buy = $(".js-cannot-buy"),
            just_open = $(".just_open"),
            not_open = $(".not_open"),
            isOpne = $(".isOpne").val();
            //flag = false;
        var flag =(isOpne == "3") ? true :false;//判断是否已经点了红包
        //console.log(flag);
        envelopes.on("click",function(){
            var that = $(this);
            index = that.index();
            if(isOpne == "0"){
                if(flag) return;
                open_envelopes.show();
                that.find(".before").removeClass("beforeAnimate");
                that.find(".before").hide();
                that.find(".have").show();
                that.siblings().find(".before").removeClass("beforeAnimate");
                that.siblings().find(".before").hide();
                that.siblings().find(".after").show();
                //just_open.addClass("disnone");
                //not_open.removeClass("disnone");
                $.ajax({
                        type: "GET",
                        url: ajaxUrl, 
                        data: {
                            data : index
                        },
                        dataType: "json",
                        success: function(data) {

                        }
                    });
                flag = true;
            }else if(isOpne == "1"){
                promptDialog({
                    content:"亲~活动还未开始哦",
                });
            }else if(isOpne == "2"){
                promptDialog({
                    content:"亲~活动还未开始哦",
                });
            }else if(isOpne == "3"){
                flag = true;  //进入页面时就已经领过红包
            }
        });
        open_envelopes.on("click",function(){
            $(this).hide();
            just_open.removeClass("disnone");
            not_open.addClass("disnone");
        });

        js_cannot_buy.on("click",function(){
            promptDialog({
                content:"亲~活动还未开始哦",
            });
        })
    })()
});
