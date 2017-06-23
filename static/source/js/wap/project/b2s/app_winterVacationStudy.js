define("app_winterVacationStudy", ["fastclick"], function(require, exports, module) {
    // require("swiper-3.3.1.jquery.min");
    require("fastclick");
    FastClick.attach(document.body);

    (function() {

        var js_extractBtn = $(".js_extractBtn"), //抽取英雄卡按钮
            userId = js_extractBtn.data('userid'),//当前用户id
            number = js_extractBtn.data('number'),//当前用户抽奖次数
            js_extractText = $(".js_extractText"),//抽奖提示文字
            js_extractSurplus = $(".js_extractSurplus"),//剩余抽奖次数
            dialog = $(".dialog"), //弹层
            js_bigIcon = $(".js_bigIcon"), //弹层内的大图标
            js_scale = $(".js_scale"), //弹层内的大图标的父级
            // js_text = $(".js_text"), //弹层内的提示文案
            js_badge = $(".js_badge"); //徽章列表

        js_extractBtn.on("click", "",extract);

        //抽取英雄卡
        function extract() {
            var badgeItems = js_badge.find('li'),
                len = badgeItems.length,
                num = 0, //
                markLoop = 0, //标示为0时，顺时针循环；标示为1时，逆时针循环。
                markFirst = 0, //标示为0时，证明是第一次顺时针循环，第一次顺时针循环时不让选中，多循环一会。
                selected = null, //选中的徽章，为1-12
                loopClockwise = null, //顺时针循环
                loopAnticlockwise = null, //逆时针循环
                surplusNum = js_extractSurplus.data("num"),//获取剩余的次数
                nextNum = js_extractSurplus.data("nextnum");//获取下一次打卡累积的次数

            surplusNum = surplusNum - 1;
            if(surplusNum > 0){
                js_extractBtn.off();
                js_extractSurplus.attr("data-num",surplusNum).html(surplusNum);
            }else{
                js_extractBtn.off().addClass('forbid');//点击抽取英雄卡后就不可再次点击了
                js_extractSurplus.attr("data-num",surplusNum);
                if(nextNum > 30){
                    js_extractText.html("本次机会已用完，感谢你参加本次活动");
                }else{
                    js_extractText.html("本次机会已用完，累计到"+nextNum+"次打卡再来抽取吧~");
                }
            }
            js_badge.addClass('forbid');//循环时禁止点击徽章列表


            loopClockwise = setInterval(clockwise, 100);
            //提交前把这段注释掉
            /*setTimeout(function(){
                function GetRandomNum(Min,Max){   
                    var Range = Max - Min;   
                    var Rand = Math.random();   
                    return(Min + Math.round(Rand * Range));   
                }   
                var a = GetRandomNum(1,12);   
                console.log("1-12之间的勋章随机一个，随机结果为："+a);
                selected = a - 1;
            },7000);*/

            $.ajax({
                type: "GET",
                url: "/wapnew/WinterVacation/drawLottery", 
                data: {
                    "userId": userId,
                    "number": number
                },
                dataType: "json",
                success: function(data) {
                    selected = data.selectedIndex - 1;//索引值从0开始
                }
            });

            function clockwise() {
                if (markLoop == 0) {
                    $(badgeItems[num]).prev().find(".con-icon").removeClass("scale");
                    $(badgeItems[num]).find(".con-icon").addClass("scale");
                    if (num == selected && markFirst == 1) {
                        clearInterval(loopClockwise);
                        $(badgeItems[num]).addClass("active");
                        js_badge.removeClass('forbid');
                        if(surplusNum > 0){
                            js_extractBtn.on("click", "",extract);
                        }
                    }
                    ++num < len ? markLoop = 0 : markLoop = 1;
                } else {
                    anticlockwise();
                }
            }

            function anticlockwise() {
                --num;
                if (num >= 0) {
                    $(badgeItems[num]).next().find(".con-icon").removeClass("scale");
                    $(badgeItems[num]).find(".con-icon").addClass("scale");
                    if (num == selected) {
                        clearInterval(loopClockwise);
                        $(badgeItems[num]).addClass("active");
                        js_badge.removeClass('forbid');
                        if(surplusNum > 0){
                            js_extractBtn.on("click", "",extract);
                        }
                    }
                } else {
                    // clearInterval(loopClockwise);
                    num = 0;
                    markLoop = 0;
                    markFirst = 1;//更改此表示，证明已经不是第一次顺时针循环，可以选中了。
                    clockwise();
                }
            }
        }

        //有弹框后禁止滑动
        var controlScroll = (function() {
            var dis = function(event) {
                    event.preventDefault();
                },
                body = document.body || document.documentElement;

            return {
                lock: function() {
                    body.addEventListener('touchmove', dis, false);
                },
                unLock: function() {
                    body.removeEventListener('touchmove', dis, false);
                }
            }
        })();

        //点击徽章
        js_badge.on("click", "li", function() {
            var _this = $(this),
                active = _this.hasClass('active'),
                num = _this.data("num"),
                str = "",
                imgSrc = "";
            if (active) {
                imgSrc = _this.find('.icon1').attr("src");
                // str = '恭喜完成<span class="font1">' + num + '</span>次打卡<br>棒棒哒！';
            } else {
                imgSrc = _this.find('.icon2').attr("src");
                // str = '需要完成<span class="font1">' + num + '</span>次打卡<br>加油哦～';
            }
            js_bigIcon.attr("src", imgSrc);
            // js_text.html(str);
            dialogShow();
            setTimeout(function() {
                js_scale.addClass('on');
            }, 100)
        })
        dialog.on("click", "", function() {
            dialogHide();
            js_scale.removeClass('on');
        })

        function dialogShow() {
            dialog.removeClass('disnone');
            controlScroll.lock();
        }

        function dialogHide() {
            dialog.addClass('disnone');
            controlScroll.unLock();
        }



        //分享
        var js_share = $(".js_share");
        js_share.on("click", "span", function() {
            var that = $(this),
                share = that.data('share');
            window.location.href = share + "&timestamp=" + new Date().getTime();
            return false;
        })
    })()

});
