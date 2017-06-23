define(function(require){
    var click = false,
        newLink = "";
        //防止连续抽奖
    var canLottery = true;

    //点击抽奖
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
        if (lottery.times > lottery.cycle + 10 && lottery.index == prize_site) {
            canLottery = true;
            if(prize_site == 4) {
                setTimeout(function() {
                    $("#smart_100_tips").show();
                }, 1000);
            } else {
                 setTimeout(function(){
                    console.log(prize_site);
                    window.location.href = newLink;
                }, 1000);
            }
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
  
    $(function() {
        lottery.init('lottery');
        //还需要写一层限制
        $("#lottery .pointer").click(function() {
            var that = $(this),
                url = $(this).data("url"),
                firstPhoneTips = $("#first_phone"),
                totalPrizeTimes = parseInt($("#total_prize_times").find("span").html());
            //填写手机号弹层是否出现 1 出现 0不出现
            if(firstPhoneTips.val() == "1") {
                $("#fill_phone_tips").show();
                return false;
            }
            
            if(canLottery) {
                //可以抽奖
                lottery.speed = 100;
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: url,
                    data:{},
                    beforeSend: function () {
                       canLottery = false;
                    },
                    success:function(res) {
                        var times = res.data.last_times;
                        $("#total_prize_times").find("span").html(times);
                        if(res.status == 1){
                            $("#lottery").attr("prize_site",res.data.angle-1);
                            newLink = res.data.url;
                            roll();
                        }else {
                            canLottery = true;
                            if(times == 0) {
                                $("#no_change_tips").show();
                            } else {
                                alert(res.info);
                            }
                        }
                    }
                });
            }
        });

        var validRule = {
            isNoEmpty: function(value) {
                if(!value) {
                    return false;
                } else {
                    return true;
                }
            },
            passwordVal: function(value) {
                var reg = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
                if(!reg.test(value)) {
                    return false;
                } else {
                    return true;
                }
            },
            isMobile: function(value) {
                var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
                if(!reg.test(value)) {
                    return false;
                } else {
                    return true;
                }
            },
            isCode: function(value) {
                var reg = /^\d{6}$/;
                if(!reg.test(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        };
        function Page() {
            // 各种弹层
            this.shareTips = $("#share_tips");
            this.sendChanceTips = $("#send_chance_tips");
            this.noPrizeTips = $("#smart_100_tips");
            this.noChangeTips = $("#no_change_tips");
            this.sendSuccessTips = $("#send_success_tips");
            this.fillPhoneTips = $("#fill_phone_tips");
            //中奖滚动
            this.newDynamic = $(".new_dynamic").find('.new_list');
            //获得抽奖机会按钮
            this.getChanceBtn = $("#get_chance_btn");
        }

        $.extend(Page.prototype, {
            init: function() {
                this.bindEvents();
                this.RollDynamic(this.newDynamic);
            },

            bindEvents: function() {
                //注意这是是指向.close_btn父级.f-mask的弹层
                this.shareTips.on("click", ".close_btn", $.proxy(this.handleThisTipsCloseClick, this));
                this.fillPhoneTips.on("click", ".p_close_btn", $.proxy(this.handleThisTipsCloseClick, this));
                this.sendSuccessTips.on("click", ".close_btn, .p_close_btn", $.proxy(this.handleThisTipsCloseClick, this));
                this.noChangeTips.on("click", ".p_close_btn", $.proxy(this.handleThisTipsCloseClick, this));
                this.noPrizeTips.on("click", ".p_close_btn", $.proxy(this.handleThisTipsCloseClick, this));
                this.sendSuccessTips.on("click", ".p_close_btn", $.proxy(this.handleThisTipsCloseClick, this));
                this.sendChanceTips.on("click", ".p_close_btn", $.proxy(this.handleThisTipsCloseClick, this));
                //填写手机号弹层
                this.fillPhoneTips.on("click", ".send_code", $.proxy(this.handleFillPhoneSendCodeClick, this));
                this.fillPhoneTips.on("click", ".send_phone_btn", $.proxy(this.handleFillPhoneSubmitClick, this));
                //赠送抽奖机会
                this.sendChanceTips.on("click", ".send_chance", $.proxy(this.handleSendChanceSubmitClick, this));
                //获得抽奖机会
                this.getChanceBtn.on("click", $.proxy(this.handleGetChanceBtnClick, this));
            },

            handleFillPhoneSendCodeClick: function(e) {
                var target = $(e.currentTarget),
                    url = target.data("url"),
                    phone = this.fillPhoneTips.find("#phone"),
                    phoneVal = phone.val(),
                    data = {"mobile":phoneVal};
                if(target.hasClass('have_sended')) {
                    return;
                }
                if(!validRule.isMobile(phoneVal)) {
                    phone.parents("li").find(".error_tips").show();
                    return false;
                } else {
                    this.sendRequest(url, "post", data, this.handleFillPhoneSendCodeSuccess, this.handleFillPhoneSendCodeError);
                }
            },

            handleFillPhoneSendCodeSuccess: function(res) {
                var phone = this.fillPhoneTips.find("#phone"),
                    sendCodeBtn = this.fillPhoneTips.find(".send_code"),
                    time = 60;
                if(res.status == 0) {
                    phone.parents("li").find(".error_tips").hide();
                    sendCodeBtn.html(time+" S");
                    sendCodeBtn.addClass('have_sended');
                    var Timer = setInterval(function() {
                        if(time === 0) {
                            sendCodeBtn.removeClass('have_sended').html("重获验证码");
                            clearInterval(Timer);
                            return false;
                        } else {
                           time--; 
                           sendCodeBtn.html(time+" S");
                        }
                    }, 1000);
                } else {
                    alert("请求验证码失败");
                }
            },

            handleFillPhoneSubmitClick: function(e) {
                var target = $(e.currentTarget),
                    url = target.data("url"),
                    phone = this.fillPhoneTips.find("#phone"),
                    phoneVal = phone.val(),
                    code = this.fillPhoneTips.find("#code"),
                    codeVal = code.val(),
                    data = {
                        mobile :phoneVal,
                        code: codeVal
                    }
                if(!validRule.isMobile(phoneVal)) {
                    phone.parents("li").find(".error_tips").show();
                    return false;
                } else {
                    phone.parents("li").find(".error_tips").hide();
                }
                if(!validRule.isCode(codeVal)) {
                    code.parents("li").find(".error_tips").show();
                    return false;
                } else {
                    code.parents("li").find(".error_tips").hide();
                    this.sendRequest(url, "post", data, this.handleFillPhoneSubmitSuccess, this.handleFillPhoneSubmitError);
                }
            },

            handleFillPhoneSubmitSuccess: function(res) {
                var status = res.status,
                    times = res.data.last_times;
                if(status == 0) {
                    $("#first_phone").val("0");
                    $("#total_prize_times").find("span").html(times);
                    this.fillPhoneTips.hide();
                } else {
                    alert(res.info);
                }
            },

            handleSendChanceSubmitClick: function(e) {
                var target = $(e.currentTarget),
                    url = target.data("url"),
                    openId = $("#open_id").val(),
                    data = {
                        openid: openId
                    };
                    this.sendRequest(url, "post", data, this.handleSendChanceSubmitSuccess, this.handleSendChanceSubmitError);
            },

            handleSendChanceSubmitSuccess: function(res) {
                var status = res.status;
                    if(status === 1) {
                        this.sendChanceTips.hide();
                        this.sendSuccessTips.show();
                    } else {
                        alert(res.info);
                    }
            },

            handleThisTipsCloseClick: function(e) {
                var target = $(e.currentTarget),
                    parent_1 = target.parents(".f-mask"),
                    parent_2 = target.parents(".p-mask");
                parent_1.find(".error_tips").hide();
                parent_2.find(".error_tips").hide();
                parent_1.hide();
                parent_2.hide();
            },

            RollDynamic: function(dom) {
                function next() {
                    dom.find('li:first').fadeOut('slow',function(){ 
                        $(this).appendTo($(this).parent()).show('slow'); 
                    });
                };
                setInterval(next, 2000);
            },

            handleGetChanceBtnClick: function(e) {
                var target = $(e.currentTarget),
                    firstPhoneTipsVal = $("#first_phone").val();
                if(firstPhoneTipsVal == "1") {
                    this.fillPhoneTips.show();
                } else {
                    this.shareTips.show();
                }
            },

            sendRequest: function(url, method, data, success, error) {
                $.ajax({
                  url: url,
                  type: method,
                  dataType: 'json',
                  data: data,
                  context: this,
                  success: success,
                  error: error
                });
            }
        })

        var page = new Page();
        page.init();
    });       
});