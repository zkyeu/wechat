$(function (){    
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
                 if (click) {
                    return false;
                } else {
                    lottery.speed = 100;
                    $.ajax({
                     type: "post",
                     dataType: "json",
                     url:"/Activity/dofestival",
                     data:{},
                     success:function(res) {
                        if(res.status==1){
                            $("#lottery").attr("prize_site",res.data.angle-1);
                            $("#lottery").attr("prize_id",res.data.id-1);
                            $("#lottery").attr("nick_name",res.data.nick_name);
                            $("#lottery").attr("prize_name",res.data.prize);
                            roll();
                            click = true;
                           
                        }else if(res.status<=-1){
                            $(".dialog").hide();
                            alert(res.info);
                            click = false;
                        }else{
                            if(res.data){
                                $(".dialog").hide();
                                $(".sysInfo").show();
                                
                            }else{
                                $(".dialog").hide();
                            }
                            click = true;
                        }
                        
                      }
                    });
                     return click;
                }
            });
        })

    //点击更多详情
    $(".rota_more").on("click",function(){
        $("#dialog3").show();
    })
    //点击更多详情的关闭
    $(".dialog3 .close").on("click",function(){
        $(".dialog3").hide();
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

    //点赞
    var times = $(".praise_times").find(".p_times").html();
    $(".praise_times").on("click",function(){
        if($(this).find(".p_icon").attr("class")=="p_icon praised"){
            alert("您已点赞");
        }else{
            $(this).find(".p_icon").addClass("praised");
            $(this).find(".p_text").html("已赞");
            $(".praise_times").find(".p_times").html(parseInt(times)+1);
        }

        $.ajax({
           url: $(".fans_wall").attr("data-click-url"),
           data: {},
           type: 'POST',
           dataType: 'json'
        });


    })

//判断浏览器是否支持 placeholder属性  
    function isPlaceholder(){  
      var input = document.createElement('input');  
      return 'placeholder' in input;  
    }
    //滚动条插件的调用
    (function($){
      if(!isPlaceholder()){  
        $("li input").not("input[type='password']").each(//把input绑定事件 排除password框  
          function(){  
            if($(this).val()=="" && $(this).attr("placeholder")!=""){  
              $(this).val($(this).attr("placeholder"));  
              $(this).focus(function(){  
                if($(this).val()==$(this).attr("placeholder")) $(this).val("");  
              });  
              $(this).blur(function(){  
                if($(this).val()=="") $(this).val($(this).attr("placeholder"));  
              });  
            }  
        });  
      }  
    })(jQuery);
});
