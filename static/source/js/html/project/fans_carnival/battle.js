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
    //粉丝墙活动规则
    $(".rule").on("click",function(){
        $("#dialog4").show();
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
        var target = ele.data('target');
        target =$("."+target);
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




     /*视频播放*/
    if($(".cls-top").attr("data-vedio")){
      $(".cls-top .video_play").attr({
        "data-vedioSrc":$(".cls-top").attr("data-vedio"),
        "data-width":$(".cls-top").attr("data-width"),
        "data-height":$(".cls-top").attr("data-height"),
        //视频来源地址
        "data-source":$(".cls-top").attr("data-source")
      }).show();
    }else{
      $(".cls-top .video_play").hide();
    }
    $("[data-vedioSrc]").on("click",function(){
        var oBtn=$(this);
        var src=oBtn.attr("data-vedioSrc");
        var width=oBtn.attr("data-width") || 800;
        var height=oBtn.attr("data-height") || 450;
        //视频来源地址
        var source=oBtn.attr("data-source") || "";
        if(!src)return;
        if($("#ckplayerDialog").length==0){
            $("body").append(
                  '<div id="ckplayerDialog">'+
                        '<a class="close" href="javascript:;"></a>'+
                        '<a class="source"></a>'+
                        '<div id="playerContent"></div>'+
                      '</div>'+
                  '<div id="j-mask"></div>'
            );
            $("#ckplayerDialog").find('.close').add('#j-mask').on("click",function(){
              $("#ckplayerDialog").hide();
              $("#j-mask").fadeOut();
            });
          }
          CKobject.embed(
              'http://p.bokecc.com/flash/single/9A0993B2384AB21D_D82D72C9FD39F2E99C33DC5901307461_false_3A7743CB01E0E55B_1/player.swf',
              'playerContent',
              'ckplayer_playerContent',
              width,
              height,
              false,
              {f: src, c: 0, b: 1, p: 1},
              [src],
              {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
          );
          $("#ckplayerDialog").css({
            "display":"block",
            "width":width,
            "height":height
          }).find(".source").html(source);
          $("#j-mask").height($(document).height()).show();
          $.ajax({
               url: $(".fans_wall").attr("data-play-url"),
               data: {},
               type: 'POST',
               dataType: 'json'
           });
    });


    //发布祝福
    $(".send").on("click",function(){
        var prV = $(".fans_prize textarea").val();
        $.ajax({
            url: $(".fans_wall").attr("data-send-url"),
            data: {
                "date_wall":$(".fans_prize textarea").val()
            },
            type: 'POST',
            dataType: 'json',
            success: function(rs){
                if(rs.status==1){
                    if($("#wordCheck").html()>0){
                        var strP = '<li class="clearfix">'+
                                '<div class="fans_left"><img src="'+ rs.data.avatar +'" alt="" width="48" height="48"></div>'+
                                '<div class="fans_right">'+
                                  '<h3 class="fans_tit">'+
                                    '<div class="userName">'+ rs.data.nickname +'</div>'+
                                    '<div class="time_l"><span class="day_t">'+ rs.data.time +'</span><span class="time_t">'+ rs.data.hours +'</span></div>'+
                                    '</h3>'+
                                  '<p class="fans_text">'+ rs.data.message +'</p>'+
                                '</div>'+
                              '</li>';
                        $(".fans").append(strP);
                        $(".fans li").eq(0).remove();
                        $(".fans_prize textarea").val("");
                        $("#wordCheck").html("50");
                    }else{
                        alert("您输入的字数已超50字");
                    };
                }else if(rs.status==-2){
                    alert(rs.info);
                }else if(rs.status==0){
                    $(".dialog").hide();
                    $(".sysInfo").show();
                }
            }
        });
        
        
    })


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
      $(document).ready(function(){
        $(".fans_roll_box").mCustomScrollbar({
          theme:"light-3"
        });
       
      });
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

  
//剩余可输入字数
var maxstrlen=50;

function Q(s){return document.getElementById(s);}

function checkWord(c){
    len=maxstrlen;
    var str = c.value;
    myLen=getStrleng(str);
    var wck=Q("wordCheck");
    if(myLen>len*2){
        c.value=str.substring(0,i+1);
    }else{
        wck.innerHTML = Math.floor((len*2-myLen)/2);
    }
}

function getStrleng(str){
    myLen =0;
    i=0;
    for(;(i<str.length)&&(myLen<=maxstrlen*2);i++){
        if(str.charCodeAt(i)>0&&str.charCodeAt(i)<128)
            myLen++;
        else
            myLen+=2;
    }
    return myLen;
} 



 












