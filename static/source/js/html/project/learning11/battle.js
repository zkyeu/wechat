define('battle',['cart'],function(require,exports,module){
        $.fn.extend({
        addSelect: function () {
            return this.each(function (index, ele) {
                var oSelect = $(ele);
                var aOption = oSelect.children();
                var sDiv = '<div class="u-sec">';
                var sH5 = '<h5 class="seced">' + aOption.eq(ele.selectedIndex).html() + '</h5><ul class="secls">';
                sDiv += sH5;
                aOption.each(function (index, ele) {
                    var sLi = '<li>' + $(ele).html() + '</li>';
                    sDiv += sLi;
                });
                sDiv += '</ul></div>';

                var oDiv = $(sDiv);
                oSelect.after(oDiv);

                var oUl = oDiv.find("ul");
                var oH5 = oDiv.find("h5");
                var oSelect = oDiv.prev();
                var aLi = oUl.children();

                var liCount=oSelect.attr("data-count") || 6;
                var divWidth=oSelect.attr("data-width");
                if(divWidth){
                    oDiv.css("width",divWidth);
                }
                if (aLi.length < liCount) {
                    oUl.height(24 * aLi.length);
                } else {
                    oUl.height(24 * liCount);
                }

                aLi.each(function () {
                    $(this).on("click", function () {
                        var oLi = $(this);
                        var oldIndex=oSelect[0].selectedIndex;
                        if(oSelect[0].selectedIndex!=oLi.index()){
                            oSelect[0].selectedIndex=oLi.index();
                            oH5.html(oLi.html());
                            oSelect.change();
                        }
                        //js改变selectedIndex时不会触发change事件，要用js触发下
                        oDiv.removeClass("open");
                        oUl.removeClass("open");
                        oH5.removeClass("open");
                    });
                });
                oH5.on("click", function () {
                    oH5.toggleClass("open").next().toggleClass("open");
                    oDiv.toggleClass("open");
                    $(".u-sec ul").not(oH5.next()).removeClass("open");
                    $(".u-sec").not(oDiv).removeClass("open");
                    $(".u-sec h5").not(oH5).removeClass("open");
                    
                    //return false;
                });
                //li hover样式切换
                if($.browser.version == "6.0" || $.browser.version == "7.0"){
                    aLi.mouseover(function(){
                        aLi.removeClass("hover");
                        $(this).addClass("hover");
                    });
                }
            });
        },
        addRadio: function () {
            return this.each(function (index, ele) {
                var inputRadio = $(ele);
                var oRadio = $('<span class="u-rad"></span>');
                inputRadio.after(oRadio);
                if (inputRadio.prop("checked")) {
                    oRadio.addClass("check");
                }
                if (inputRadio.prop("disabled")) {
                    return true;
                }
                oRadio.parent().on("click", function () {
                    var oLabel = $(this);
                    var oRadio2 = oLabel.find("input[type='radio']");
                    var sName = oRadio2.attr("name");

                    $("input[name=" + sName + "]").not(oRadio2).each(function (index, ele) {
                        var oLabel2 = $(ele).attr("checked", false).parent();
                        oLabel2.find(".u-rad").removeClass("check");
                    });
                    if(!oRadio2.prop("checked")){
                        oRadio2.attr("checked", true);
                        oRadio.addClass("check");
                        if(oRadio.next().html()=="选用QQ上课"){
                            $('.add-z-ac').show();
                        }else{
                            $('.add-z-ac').hide();
                        }
                        oRadio2.change();
                    }else if(oRadio2.attr("data-extend")){
                        oRadio2.attr("checked", false);
                        oRadio.removeClass("check");
                        oRadio2.change();
                    }
                    return false;
                });
            });
        },
        unChecked: function () {
            return this.each(function (index, ele) {
                if(ele.type.toLowerCase()=="radio"){
                    $(ele).attr("checked",false).next().removeClass("check");
                }else{
                    $(ele).attr("checked",false).next().removeClass("checked");
                }
            });
        },
        checked: function () {
            return this.each(function (index, ele) {
                if(ele.type.toLowerCase()=="radio"){
                    $(ele).attr("checked",true).next().addClass("check");
                }else{
                    $(ele).attr("checked",true).next().addClass("checked");
                }
                
            });
        },
        addCheckbox: function () {
            return this.each(function (index, ele) {
                var inputCheckbox = $(ele);
                var oCheckbox = $('<span class="u-ckb"></span>');
                inputCheckbox.after(oCheckbox);
                if (inputCheckbox.prop("checked")) {
                    oCheckbox.addClass("checked");
                }
                if (inputCheckbox.prop("disabled")) {
                    return true;
                }
                oCheckbox.parent().on("click", function () {
                    var oLabel = $(this);
                    inputCheckbox.attr("checked",!inputCheckbox.prop("checked"));
                    oCheckbox.toggleClass("checked");
                    inputCheckbox.change();
                    return false;
                });
            });
        },
        dialogCenter:function(){
            return this.each(function (index, ele) {
                var oDialog = $(ele);
                var oContent = oDialog.find(".in");
                var oBd = oContent.find('.bd');
                var maxHeight = 505;
                if(oBd.height()>maxHeight){
                    oBd.height(maxHeight);
                }
                var y ;
                var offsetTop = ($(window).height()-oContent.outerHeight()) / 2,
                    offsetLeft = oContent.outerWidth() / 2;
                if( offsetTop > 0) {
                    y = offsetTop
                }else {
                    y = '20px';
                }
                oContent.css({
                    top : y,
                    marginLeft : -offsetLeft
                });
            });
        },
        alertCkplayer:function(){
            var _this=this;
            require.async("ckplayer",function(ckplayer){
                _this.each(function (index, ele) {
                    $(ele).live('click', function () {
                        var src=$(this).attr("data-src");
                        if(!src)return;
                        var title=$(this).attr("data-title");
                        if($("#ckplayerDialog").length==0){
                            $("body").append(
                                '<div class="m-dialog" id="ckplayerDialog">'+
                                    '<div class="in">'+
                                        '<div class="hd">'+
                                          '<a class="close" href="javascript:void(0)" title="关闭">x</a>'+
                                          '<h4 class="u-tt-md">如何上课及上课常见问题</h4>'+
                                        '</div>'+
                                        '<div class="j-bd" id="playerContent"></div>'+
                                    '</div>'+
                                '</div>'
                            );
                        }
                        //http://www.ckplayer.com/tool/flashvars.htm
                        ckplayer.embed(
                            '/static/js/lib/ckplayer/ckplayer.swf',
                            'playerContent',
                            'ckplayer_playerContent',
                            '800',
                            '450',
                            false,
                            {f: src, c: 0, b: 1, p: 1},
                            [src],
                            {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
                        );

                        $("#ckplayerDialog").show().dialogCenter().find("h4").html(title);
                    });
                });
            });
            return this;
        }
    }); 
    $.extend({
        alert: function (msg, fnCb,btnMsg,bCheckbox) {
            btnMsg=btnMsg || "确&nbsp;定";
            if ($("#m-alert").length) {
                $("#m-alert").show().find(".bd").html(msg).end().find(".u-btn").html(btnMsg);
            } else {
                var sAlert = '<div class="m-alert" id="m-alert" style="display:block;">' +
                    '<div class="in">' +
                    '<div class="hd">' +
                    '<a class="close" href="javascript:;" title="关闭">x</a>' +
                    '<h4>温馨提示</h4>' +
                    '</div>' +
                    '<div class="bd">' +msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<label class="u-lab" style="display:none;" for="jsFor">'+
                      '<input class="f-dn" id="jsFor" type="checkbox" value="不再提示">'+
                      '<span class="u-txt">不再提示</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</label>'+
                    '<span class="close u-btn hover">'+btnMsg+'</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                    $("body").append(sAlert);
                    var timer = null;
                    $("#m-alert").on("click", function (event) {
                        if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            $("#m-alert").find(".sibmit .close").toggleClass("active");
                            i++;
                            if (i == 4)
                            clearInterval(timer);
                        }, 120);
                        }
                    });
                }
                var oCheckbox=$("#jsFor");
                oCheckbox.parent().hide();
                if(bCheckbox){
                    if(oCheckbox.next(".u-ckb").length==0){
                        $("#jsFor").addCheckbox();
                    }
                    oCheckbox.parent().show();
                }
                $("#m-alert").find(".close").unbind("click").bind("click", function () {
                    $("#m-alert").hide();
                    fnCb && fnCb();
                });            
        },
        tips: function (msg, fnCb,btnMsg,bCheckbox) {
            btnMsg=btnMsg || "确&nbsp;定";
            if ($("#m-alert").length) {
                $("#m-alert").show().find(".bd").html(msg).end().find(".u-btn").html(btnMsg);
            } else {
                var sAlert = '<div class="m-alert" id="m-alert" style="display:block;">' +
                    '<div class="in">' +
                    '<div class="hd">' +
                    '<a class="close" href="javascript:;" title="关闭">x</a>' +
                    '<h4>温馨提示</h4>' +
                    '</div>' +
                    '<div class="bd">' +msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<label class="u-lab" style="display:none;" for="jsFor">'+
                      '<input class="f-dn" id="jsFor" type="checkbox" value="不再提示">'+
                      '<span class="u-txt">不再提示</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</label>'+
                    '<span class="close u-btn hover">'+btnMsg+'</span>' +
                    '<span class="goto u-btn hover">马上测试</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                    $("body").append(sAlert);
                    var timer = null;
                    $("#m-alert").on("click", function (event) {
                        if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            $("#m-alert").find(".sibmit .close").toggleClass("active");
                            i++;
                            if (i == 4)
                            clearInterval(timer);
                        }, 120);
                        }
                    });
                }
                var oCheckbox=$("#jsFor");
                oCheckbox.parent().hide();
                if(bCheckbox){
                    if(oCheckbox.next(".u-ckb").length==0){
                        $("#jsFor").addCheckbox();
                    }
                    oCheckbox.parent().show();
                }
                $("#m-alert").find(".close").unbind("click").bind("click", function () {
                    $("#m-alert").hide();
                    fnCb && fnCb();
                });            
        },
        confirm: function (msg, fnSure, fnCancel, sSure, sCancel,bCheckbox,reverse) {
            sSure = sSure || "确定";
            sCancel = sCancel || "取消";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd p:first").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert" id="m-confirm" style="display:block;">' +
                        '<div class="in" style="width:260px;margin-left:-130px;">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭">x</a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        '<p>'+msg+'</p>' +
                        '<p class="f-tal" style="display:none;">'+
                        '<label class="u-lab" for="jsFor2">'+
                          '<input class="f-dn" id="jsFor2" type="checkbox" value="以后不再提示">'+
                          '<span class="u-txt">以后不再提示</span>'+
                        '</label>'+
                        '</p>'+
                        '</div>' +
                        '<div class="ft">' +
                        '<div class="sibmit f-tac">' +
                        '<span class="u-btn active jsSure">' + sSure + '</span>' +
                        '<i>&nbsp;&nbsp;</i>' +
                        '<span class="u-btn hover jsCancel">' + sCancel + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                var oConfirm = $(sConfirm);
                $("body").append(oConfirm);
                var timer = null;
                oConfirm.on("click", function (event) {
                    if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            oConfirm.find(".jsSure").toggleClass("active");
                            i++;
                            if (i == 4)
                                clearInterval(timer);
                        }, 120);
                    }
                });

            }
            var oCheckbox=$("#jsFor2");
            var oI=$("#m-confirm").find(".sibmit i");
            oCheckbox.parent().parent().hide();
            if(bCheckbox){
                if(oCheckbox.next(".u-ckb").length==0){
                    $("#jsFor2").addCheckbox();
                }
                oCheckbox.parent().parent().show();
            }
            if(reverse){
                oI.after($("#m-confirm").find(".jsSure"));
                oI.before($("#m-confirm").find(".jsCancel"));
            }else{
                oI.after($("#m-confirm").find(".jsCancel"));
                oI.before($("#m-confirm").find(".jsSure"));
            }
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel.call(this);
            });
            $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnSure && fnSure();
            });
        },

        loading: function () {
            if ($("#m-load").length) {
            $("#m-load").show();
            } else {
            var sLoading = '<div class="m-load" id="m-load" style="display:block;">正在努力加载中</div>';
            $("body").append(sLoading);
            }
        },
        unloading: function () {
            $("#m-load").hide();
        },
        tips2: function (msg, fnCb,btnMsg,bCheckbox) {
            btnMsg=btnMsg || "下次再说";
            if ($("#m-alert").length) {
                $("#m-alert").show().find(".bd").html(msg).end().find(".u-btn").html(btnMsg);
            } else {
                var sAlert = '<div class="m-alert" id="m-alert" style="display:block;">' +
                    '<div class="in">' +
                    '<div class="hd">' +
                    '<a class="close" href="javascript:;" title="关闭">x</a>' +
                    '<h4>温馨提示</h4>' +
                    '</div>' +
                    '<div class="bd">' +msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<label class="u-lab add-u-lab" for="jsFor">'+
                      '<input class="add-check-b" type="checkbox" value="不再提示">'+
                      '<span class="u-txt">不再提示</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</label>'+
                    '<span class=" u-btn hover nextGo">'+btnMsg+'</span>' +
                    '<span class="goto u-btn hover">马上测试</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                    $("body").append(sAlert);
                    var timer = null;
                    $("#m-alert").on("click", function (event) {
                        if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            $("#m-alert").find(".sibmit .close").toggleClass("active");
                            i++;
                            if (i == 4)
                            clearInterval(timer);
                        }, 120);
                        }
                    });
                    
                    
                }
                $("#m-alert").find(".close").unbind("click").bind("click", function () {
                    $("#m-alert").hide();
                    $("#m-alert").remove();
                    fnCb && fnCb();

                });            
        }

    });
    //js动态添加模拟checkbox
    $("input[type='checkbox'].f-dn").each(function (index, ele) {
       $(ele).addCheckbox();
    });
    require("cart").cart();
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
                    var $li = $('<li class="chick"><span>'+$("#lottery").attr("nick_name")+'</span>学员抽中<b>'+prize1+'</b></li>');
                    $(".names li").eq(3).after($li);
                    $(".dialog").hide();
                    $("#dialog").show();
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

    $(function() {
        lottery.init('lottery');
        $("#lottery .pointer").click(function() {

            if($("#login").val()==0){
                    $(".alert_dialog p").text("请先登陆再抽奖");
                    $(".alert_dialog").show();
                    return;
            }else if($("#login").val()==1 && $("#active").val()==1){
                $(".alert_dialog p").text("您已经参与过抽奖了!");
                $(".alert_dialog").show();
                return;
            }

            //roll();
            //  if (click) {
            //     return false;
            // } else {
                lottery.speed = 100;
                $.ajax({
                 type: "post",
                 url:"/Activity/dofestival",
                 success:function(res) {
                 console.log(res);
                 res = JSON.parse(res);
                    if(res.status==1){
                        $("#lottery").attr("prize_site",res.data.angle-1);
                        $("#lottery").attr("prize_id",res.data.id-1);
                        $("#lottery").attr("nick_name",res.data.nick_name);
                        $("#lottery").attr("prize_name",res.data.prize);
                        roll();
                        $("#active").val(1);
                       
                    }else if(res.status<=-1){
                        $(".dialog").hide();
                        $(".alert_dialog p").text(res.info);
                        $(".alert_dialog").show();
                    }else{
                        if(res.data){
                            $(".dialog").hide();
                            $(".sysInfo").show();
                            
                        }else{
                            $(".dialog").hide();
                        }
                    }
                    
                  }
                });
                click = true;
                return false;
            // }
        });
    })

    //点击更多详情
    $(".rota_more").on("click",function(){
        $(".dialog3").show();
    })
    //点击更多详情的关闭
    $(".dialog3 .close").on("click",function(){
        $(".dialog3").hide();
    })

    /*教师学员列表滚动*/
    var teaIndex = 1;
    $('#teacherBox .prev').click(function(){
        if(teaIndex == 1){
            return ;
        }else{
            teaIndex++;
            $(this).removeClass("leftArrow2").addClass("leftArrow1");
            $('#teacherBox .next').removeClass("rightArrow2").addClass("rightArrow1");
            $('#teacherList').animate({'left':'-928px'});
        }
    })

    $('#teacherBox .next').click(function(){
        if(teaIndex == 0){
            return ;
        }else{
            teaIndex--;
            $(this).removeClass("rightArrow1").addClass("rightArrow2");
            $('#teacherBox .prev').removeClass("leftArrow1").addClass("leftArrow2");
            $('#teacherList').animate({'left': 0});
        }
    })

   

    /*导航滑动*/
    function scrollDown(ele){
        var target = ele.attr("href");
        target =$(target);
        $('html,body').animate({scrollTop:target.offset().top}, 800);
    }
    $("#widthMain1030 a,#relatePiece a").on("click",function(){
        if($(this).closest("#relatePiece").length>0){
            $('#relatePiece').find('a').removeClass("active");
            $(this).addClass('active');
        }
        scrollDown($(this));
    });

    $('#m-top').click(function(){
        scrollDown($(this));
    })
   

    /*获奖名单播放*/
    function scroll_news(){
        var firstNode = $('.names li'); 
        firstNode.eq(0).fadeOut('slow',function(){ //获取li的第一个,执行fadeOut
         $(this).clone().appendTo($(this).parent()).show('slow'); //把每次的li的第一个克隆，然后添加到父节点 对象。
         $(this).remove();//去掉每次的第一个li。
        });
    }
    setInterval(scroll_news,2000);
    
    /*倒计时*/
    var disTime = $('#widthMain1030 .time').attr('data-time');
    var timer = setInterval(function(){
        showTime();
    },1000);

    function addZero(n){
        return n<10 ? '0'+n : n;
    }

    function showTime(){
        if(disTime<0 || (!disTime) ){
            clearInterval(timer);
            return;
        }
        var seconds = Math.floor(disTime / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var CDay = days;
        var CHour = hours % 24;
        var CMinute = minutes % 60;
        $('#widthMain1030 .day').text(addZero(CDay));
        $('#widthMain1030 .hour').text(addZero(CHour));
        $('#widthMain1030 .min').text(addZero(CMinute));
        disTime -= 1000;
    }
    

//显示秒杀倒计时

var dTime = $("#d-time").attr("data-time");
var dTimer = setInterval(function(){
    if(dTime<0 || (!dTime) ){
        clearInterval(dTimer);
        return;
    }
    var seconds = Math.floor(dTime / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var CHour = hours % 24;
    var CMinute = minutes % 60;
    var CSeconds = seconds % 60;
    $('#d-time .d-hour').text(addZero(CHour));
    $('#d-time .d-min').text(addZero(CMinute));
    $('#d-time .d-second').text(addZero(CSeconds));
    dTime -= 1000;
},1000)


    /*关闭弹层*/
    $('#dialog .close').click(function(){
        $('#dialog').hide().find('img').hide();
    })
    $('#dialog2 .close').click(function(){
        $('#dialog2').hide().find('.tip').hide();
    })

    $('#info-prev .del').click(function(){
        $('#info-prev').hide();
    })

    $('#info-already .del').click(function(){
        $('#info-already').hide();
    })

    

    /*助梦*/
    $('#u-dream').click(function(){
        var $input = $(this).prev();
        var val = $.trim($input.val());
        if(val.length<2 || val.length>15){
            $('#dialog2').show().find('.text4').show();
            return;
        } 
        $input.val('');
        $('#dialog2').show().find('.text3').show();
    })

    /*获奖记录*/
    $('#prize_log').click(function(){
            if($("#login").val()==0){
                    $(".alert_dialog p").text("请先登陆再查看抽奖记录！");
                    $(".alert_dialog").show();
                    return;
            }else if($("#login").val()==1 && $("#active").val()==0){
                $(".alert_dialog p").text("您还没有参与抽奖，快去抽奖吧!");
                $(".alert_dialog").show();
                return;
            }
        $.ajax({
            url: '/Activity/getUserLottery',
            data: {},
            type: 'POST',
            dataType: 'json',
            success: function(rs){
                var text = rs.data;
                if(rs.status == 1){
                    $('#dialog2').show().find(".tip-1").hide();
                    $('#dialog2').show().find('.tip-2').show().find('h3').text(text);
                }else if(rs.status == 0){
                    $('#dialog2').hide();
                    $(".sysInfo").show();

                }else{
                    $('#dialog2').show().find('.tip-2').hide();
                    $('#dialog2').show().find(".tip-1").show();
                }
            }
        })
    })

    

    $('.adv li').mouseover(function(){
        $(this).addClass("active").siblings().removeClass("active");
    })


    //微博 微信 下拉
    $(".jsMore").hover(function(){
        $(this).find('.jsUl').show();
    },function(){
        $(this).find('.jsUl').hide();
    });

    //html5音频播放
    var audio ;
    window.onload = function(){
        initAudio();
    }
    var initAudio = function(){
        //audio =  document.createElement("audio")
        //audio.src='Never Say Good Bye.ogg'
        audio = document.getElementById('audio');
    }
    function getCurrentTime(id){            
        return parseInt(audio.currentTime);
    }

    function playOrPaused(id,obj){
        if(audio.paused){
            audio.play();
            obj.attr("class",'pri-start pri-stop');
            return;
        }
        audio.pause();
        obj.attr("class",'pri-start');
    }

    function playOrWidth(id){
        return audio.playbackRate;
    }
    $(".close_alert").on("click",function(){
        $(".alert_dialog").hide();
    })
    $(".pri-list03-l .pri-start").on("click",function(){
        //如果是开着的再次点击到时候就关闭
        if($(this).attr("class")=="pri-start pri-stop"){
            $(this).attr("class","pri-start");
            $(this).attr("data-num","");
            playOrPaused("",$(this));
            clearInterval(interval);

        }else{
            // 先还原所有的开始播放按钮
            $(".pri-list03-l .pri-start").attr("data-num","");
            $(".pri-list03-l .pri-start").attr("class",'pri-start');
            $(this).attr("data-num","1");
            // 先清空之前的定时器和
            clearInterval(interval);

            var numMp3 = $(this).parent(".pri-audio").attr("date-num");
            $(audio).attr("src",$(".pri-list03-l .pri-audio").eq(numMp3).attr("date-src"));
            playOrPaused("",$(this));

            var interval = setInterval(function() {  
                var widthline = Math.round(audio.currentTime)/Math.round(audio.duration) * 100;  
                    $(".pri-start[data-num='1']").parent('.pri-audio').find('.pri-r-width').css('width',widthline +"%");
                    if(Math.round(audio.currentTime)==Math.round(audio.duration)){
                        $(".pri-start[data-num='1']").attr("class",'pri-start');
                        clearInterval(interval,function(){
                            $(".pri-start[class='pri-start']").attr("data-num",'');
                        });
                    };
            },500);
        };
        
    });
});

  

 



 












