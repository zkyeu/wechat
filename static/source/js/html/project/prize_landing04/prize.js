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
            $('#dialog .box').hide();

            $('#dialog').find('.box').eq(id-1).show();

             $('#dialog').show().find('.detail img').hide().eq(id-1).show();
            $('#dialog2 .text1 h3').text(prize);
          }
        });
    };

    //点击报名加盟
    $(".pri-list06 .pos02_3").on("click",function(){
        if($(".prize_join").attr("data-islogin")==1){
            $(".prize_join").show();
        }else{
            $(".sysInfo").show();
        }
    })

    //点击更多详情
    $(".rota_more").on("click",function(){
        $(".dialog3").show();
    })
    //点击更多详情的关闭
    $(".dialog3 .close").on("click",function(){
        $(".dialog3").hide();
    })

    /*点击抽奖按钮*/
    $('.pointer').click(function (){
        // var dataUrl=$(this).attr("data-url");
        if(bRotate)return;
        /* 数据接口 */
        $.ajax({
         type: "post",
         dataType: "json",
         url:"/Activity/ac_doDisney",
         data:{},
         success:function(res) {
            if(res.status==1){
                rotateFn(res.data.id, res.data.angle, res.data.prize, res.data.nick_name);
            }else if(res.status<=-1){
                $(".dialog").hide();
                alert(res.info);
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
    });
    //点击我知道了 
    // $(".down").on("click",function(){
    //     $(".sysInfo").hide();
    // })

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
        $('#dialog2').hide().find('.tip').hide();
    })

    $('#info-prev .del').click(function(){
        $('#info-prev').hide();
    })

    $('#info-already .del').click(function(){
        $('#info-already').hide();
    })

    //点击报名加盟里面的关闭按钮
    $(".join_close").on("click",function(){
        $(".prize_join").hide();
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
            url: '/Activity/ac_getUserLottery',
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

    //点击报名加盟的提交
    $(".join_sb").on("click",function(){
        var reg=/^1[0-9]{10}$/;
        var inputO = $(".join_list input").eq(0).val();
        var inputT = $(".join_list input").eq(1).val();
        var inputTw = $(".join_list input").eq(2).val();
        if(inputO==""){
            alert("请输入机构名称");
            return;
        }else if(inputT==""){
            alert("请输入姓名");
            return;
        }else if(inputTw==""){
            alert("请输入手机号");
            return;
        }else if(!reg.test(inputTw)){
            alert("请填写正确格式手机号码");
            return;
        }
        var dateH = {
            "org_name":inputO,
            "user_name":inputT,
            "mobile":inputTw
        }
        $.ajax({
            type:"post",
            dataType:"json",
            url:"/Activity/addDisneyData",
            data:dateH,
            success:function(res){
                alert(res.info);
                $(".prize_join").hide();
            }
        })
    })
    


    //微博 微信 下拉
    $(".jsMore").hover(function(){
        $(this).find('.jsUl').show();
    },function(){
        $(this).find('.jsUl').hide();
    });


});

  





 












