$(function (){
    var bRotate = false;

    /* 
      @转动结束
      @awards: 第几种奖品
      @angles: 奖盘转动角度
      @txt: 奖品信息
    */
    function rotateFn(id, angle, prize, nick_name){
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
          angle:0,
          animateTo:angle +1800,
          duration:8000,
          callback:function (){
            /* 转动结束后的操作放这里 */
            bRotate = !bRotate;
            var $li = $('<li class="chick"><span>'+nick_name+'</span>学员抽中<b>'+prize+'</b></li>');
            $(".names li").eq(3).after($li);
            $(".dialog").hide();
            $('#dialog').find('.prizeName').html(prize);
            $('#dialog').show().find('.detail img').hide().eq(id-1).show();
            $('#dialog2 .text1 h3').text(prize);
          }
        });
    };

    /*点击抽奖按钮*/
    $('.pointer').click(function (){
        var dataUrl=$(this).attr("data-url");
        if(bRotate)return;
        /* 数据接口 */
        $.ajax({
         type: "post",
         dataType: "json",
         url:dataUrl,
         data:{},
         success:function(res) {
            if(res.status==1){
                rotateFn(res.data.id, res.data.angle, res.data.prize, res.data.nick_name);
            }else if(res.status==-1){
                $(".dialog").hide();
                $("#info-prev").show();
            }else{
                if(res.data){
                    $(".dialog").hide();
                    $(".sysInfo").show();
                    $("#down").attr("href",res.data);
                }else{
                    $(".dialog").hide();
                    $("#info-already").show();
                }
            }
          }
        });
    });

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

    var stuIndex = 1;
    $('#stuBox .prev').click(function(){
        if(stuIndex == 1){
            return ;
        }else{
            stuIndex++;
            $(this).removeClass("leftArrow2").addClass("leftArrow1");
            $('#stuBox .next').removeClass("rightArrow2").addClass("rightArrow1");
            $('#stuList').animate({'left':'-340px'});
        }
    })

    $('#stuBox .next').click(function(){
        if(stuIndex == 0){
            return ;
        }else{
            stuIndex--;
            $(this).removeClass("rightArrow1").addClass("rightArrow2");
            $('#stuBox .prev').removeClass("leftArrow1").addClass("leftArrow2");
            $('#stuList').animate({'left': 0});
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
    /*回到顶部显示隐藏*/
    ;(function(){
        var goLeft = 1000 + ($('.pri-main').width()-1000)/2 + 15;
        var goTop = ($(window).height() + 100 - 400)/2;
        $('#m-gotop').css('left',goLeft).css('top',goTop);
        
        $(window).on("load scroll",function(){
            if($(window).scrollTop()>860){
                $("#m-gotop").fadeIn();
            }else{
                $("#m-gotop").fadeOut();
            }
        });
    })();

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
    /*关闭弹层*/
    $('#dialog .close').click(function(){
        $('#dialog').hide().find('img').hide();
    })
    $('#dialog2 .close').click(function(){
        $('#dialog2').hide().find('.text').hide();
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
                    $('#dialog2').show().find('.text1').show().find('h3').text(text);
                }else if(rs.status == 0){
                    if(text){
                        $(".dialog").hide();
                        $(".sysInfo").show();
                        $("#down").attr("href",text);
                    }else{
                        $('#dialog2').show().find('.text5').show();
                    }
                }
            }
        })
    })

    /*早鸟票*/
    $('#morning_bird').click(function(){
        var url = $(this).attr('data-url');
        $.ajax({
            url: url,
            data: {},
            type: 'POST',
            dataType: 'json',
            success: function(rs){
                if(rs.status == 1){
                    $('#dialog2').show().find('.text2').show();
                }else if(rs.status == 0){
                    if(res.data){
                        $(".dialog").hide();
                        $(".sysInfo").show();
                        $("#down").attr("href",res.data);
                    }else{
                        $('#dialog2').show().find('.text6').show();
                    }
                }
            }
        })
    })

    $('.adv li').mouseover(function(){
        $(this).addClass("active").siblings().removeClass("active");
    })

});

  


















