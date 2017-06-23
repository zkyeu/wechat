define(function(require,exports,module){
    //全局参数配置
    var gconfig = {
        url: "http://wapdev.51talk.com"
    };
    var prizeRet = {
        active:false,
        prizeName:''
    };

    //****************点击抽奖 Start ****************
    var lottery = {
        index: 0, //当前转动到哪个位置，起点位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 20, //初始转动速度
        times: 0, //转动次数
        cycle: 40, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: 0, //中奖位置
        init: function(id) {
            if ($("#" + id).find(".l_prize").length > 0) {
                $lottery = $("#" + id);
                $units = $lottery.find(".l_prize");
                this.obj = $lottery;
                this.count = $units.length;
                $lottery.find(".l_prize-" + this.index).addClass("l_now");
            }
        },
        roll: function() {
            var index = this.index;
            var count = this.count;
            var lottery = this.obj;
            $(lottery).find(".l_prize-" + index).removeClass("l_now");
            index += 1;
            if (index > count - 1) {
                index = 0;
            }
            $(lottery).find(".l_prize-" + index).addClass("l_now");
            this.index = index;
            return false;
        },
        stop: function(index) {
            this.prize = index;
            return false;
        }
    };
    function roll() {
        lottery.times += 1;
        lottery.roll();
        var prize_site = $("#lottery").attr("prize_site");
        var prize1 = $("#lottery").attr("prize_name");
        if (lottery.times > lottery.cycle + 10 && lottery.index == prize_site) {
            setTimeout(function(){
                var $li = $('<li class="chick"><span>'+$("#lottery").attr("nick_name")+'</span><b>抽中'+prize1+'</b></li>');
                $(".names li").eq(3).after($li);
                $(".dialog").addClass('hide');
                $("#dialog").removeClass('hide');
                $("#dialog .box img").eq($("#lottery").attr("prize_id")).show();
                $("#dialog").find(".prizeName").html(prize1);
                $('#dialog2 .text1 h3').text(prize1);
            },500);
            clearTimeout(lottery.timer);
            lottery.prize = -1;
            lottery.times = 0;
            click = false;
        } else {
            if (lottery.times < lottery.cycle) {
                lottery.speed -= 10;
            } else if (lottery.times == lottery.cycle) {
                var index = Math.random() * (lottery.count) | 0;
                lottery.prize = index;
            } else {
                if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                    lottery.speed += 110;
                } else {
                    lottery.speed += 50;
                }
            }
            if (lottery.speed < 40) {
                lottery.speed = 40;
            }
            lottery.timer = setTimeout(roll, lottery.speed);
        }
        return false;
    }
    var click = false;
    function executeLottery(){
        lottery.speed = 100;
        $.ajax({
            type: "get",
            dataType: "json",
            url: "/Landing/dofestival",
            data:{},
            // beforeSend: function () {
            //     that.attr("send", "1");
            // },
            success:function(res) {
                if(res.status==1){
                    prizeRet = {
                        active:true,
                        prizeName:res.data.nick_name
                    };
                    $("#lottery").attr("prize_site",res.data.angle-1);
                    $("#lottery").attr("prize_id",res.data.id);
                    $("#lottery").attr("nick_name",res.data.nick_name);
                    $("#lottery").attr("prize_name",res.data.prize);
                    roll();
                }else {
                    $(".dialog").addClass('hide');
                    alert(res.info);
                }
                // that.removeAttr("send");
            }
        });
    }
    $(function() {
        lottery.init('lottery');
        $("#lottery .pointer").click(function() {
            updateStatus();
            return;
            var that = $(this);
            var login = prizeRet.login;
            var active = prizeRet.active;
            var tipDialog = $("#j_tip");

            if(login == "1" && active == "0") {
                //可以抽奖
                if(that.attr("send") == "1") {
                    return false;
                }

            } else if(login == "1" && active == "1") {
                //已经登录，已经抽过奖
                tipDialog.find(".text").html("您本次的抽奖机会用完了，感谢您的参与哦。");
                tipDialog.removeClass("hide");
            } else {
                //没登录
                tipDialog.find(".text").html("您还没有登录，快去登录开始抽奖吧！");
                tipDialog.removeClass("hide");
            }
        });

        //buildCourseList();
    });
    //****************点击抽奖 End ******************

    /****************获奖名单播放 Start******************/
    function scroll_news(){
        var nameList = $('.share_names');
        nameList.find(".name_list").animate({
            marginTop: "-1.5rem"
        },500,'ease-in-out',function(){
            $(this).css({marginTop: "0rem"}).find("li:first").appendTo(this);
        });
    }
    setInterval(scroll_news,2000);
    /****************获奖名单播放 End ******************/


    var $ruleBtn = $('#rule');
    var $rulePannel = $('#rulePanel');//活动介绍
    var $rulePanelClose = $('#rulePanel .close');
    var $dialog2 = $('#dialog2');  // 抽奖结果Panel
    var $dialog2Close = $('#dialog2 .close');

    var $dialogTip1 = $('#dialog2 .tip-1'); // 没有抽奖结果提示
    var $dialogTip2 = $('#dialog2 .tip-2'); // 抽奖结果

    var $myPrizeBtn = $('#myPrizeBtn');// 我的中奖纪录按钮
    var $dialogClose = $('#dialog .close');


    $ruleBtn.click(function(){
        $rulePannel.removeClass('hide');
    });
    $rulePanelClose.click(function(){
        $rulePannel.addClass('hide');
    });
    $myPrizeBtn.click(function(){
        updateStatus(true);
    });
    $dialog2Close.click(function(){
        $dialog2.addClass('hide');
    });
    $dialogClose.click(function(){
        $('#dialog').addClass('hide');
    });

    //获取用户的抽奖结果
    function updateStatus(isClick){
        var tipDialog = $("#dialog2");
        var tip1 = $("#dialog2 .tip-1");
        var tip2 = $("#dialog2 .tip-2");
        $.ajax({
            type: "get",
            dataType: "json",
            url: "/landing/getUserLottery",
            // url: "/templates/a.json",
            data:{},
            success:function(res) {
                //抽过奖
                if(res.status=='1'){
                    prizeRet = {
                        active:true,
                        prizeName:res.data.prize
                    };
                    tip1.find(".text").html("<h3>您已经抽过奖啦！</h3>");
                    tipDialog.removeClass("hide");
                    tip1.removeClass("hide");
                    tip2.addClass("hide");
                }else if(res.status=='-1'){
                    // 没抽过奖
                    prizeRet = {
                        active:false,
                        prizeName:''
                    };
                    isClick || executeLottery();
                }else{
                    alert(res.info);
                }
                if(isClick){
                    $dialog2.removeClass('hide');
                    if(prizeRet.active){
                        $dialogTip1.addClass('hide') && $dialogTip2.removeClass('hide');
                        $('#myprizeContent').html(prizeRet.prizeName);
                    }else{
                        $dialogTip2.addClass('hide') && $dialogTip1.removeClass('hide');
                    }
                }

            }
        });
    }
});
