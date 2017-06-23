define("app_marketing", ["fastclick","swiper-3.3.1.jquery.min"], function(require, exports, module) {
    require("fastclick");
    FastClick.attach(document.body);

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
            maxtime = js_time.data("maxtime"),
            nowtime = js_time.data("nowtime") || maxtime,
            time = null; 
            assignment();

            setInterval(function(){
                nowtime = nowtime - 1;
                if(nowtime < 0){
                    nowtime = maxtime;
                }
                assignment();
            },1000)

            function assignment(){
                time = count(nowtime);
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
            var _this = $(this),
                href = _this.data('href') || "";
            if(href != ""){
                window.location.href = href;
            }else{
                js_dialog.removeClass('disnone');
                controlScroll.lock();
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

    })()
});
