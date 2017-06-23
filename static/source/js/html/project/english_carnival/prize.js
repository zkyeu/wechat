$(function (){
  /*扩展*/
  var bRotate = false;
  /* 转动超时 */
  var rotateTimeOut = function (){
    $('#rotate').rotate({
      angle:0,
      animateTo:2160,
      duration:8000,
      callback:function (){
        /* 转动超时后的操作放这里 */
      }
    });
  };
  /* 
    @转动结束
    @awards: 第几种奖品
    @angles: 奖盘转动角度
    @txt: 奖品信息
  */
  var rotateFn = function (id, angle, prize, nick_name){
    bRotate = !bRotate;
    $('#rotate').stopRotate();
    $('#rotate').rotate({
      angle:0,
      animateTo:angle+1800,
      duration:8000,
      callback:function (){
        /* 转动结束后的操作放这里 */
        bRotate = !bRotate;
        var $li = $('<li class="chick"><span>'+nick_name+'</span>学员抽中<b>'+prize+'</b></li>');
        $(".name li").eq(3).after($li);
        $(".dialog").hide();
        switch(id){
          case 1:
            $("#pri350").show();
            break;
          case 2:
            $("#pri550").show();
            break;
          case 3:
            $("#pri1000").show();
            break;
          case 4:
            $("#pri5").show();
            break;
          case 5:
            $("#pri8").show();
            break;
          case 6:
            $("#kindle").show();
            break;
          case 7:
            $("#ipad").show();
            break;
          default:
        }
      }
    });
  };

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
       /* 得到数据后 */
       if(res.status==1){
        rotateFn(res.data.id, res.data.angle, res.data.prize, res.data.nick_name);
        }else if(res.status==-1){
          $(".dialog").hide();
          $(".go-dia").show();
        }else{
          if(res.data){
            $(".dialog").hide();
            $(".sysInfo").show();
            $("#down").attr("href",res.data);
          }else{
            $(".dialog").hide();
            $(".complt").show();
          }
        }
      }
    });
/*数据模拟*/
      // var item = rnd(0,7);

      // switch (item) {
      //  case 0:
      //    var angle = [26, 88, 137, 185, 235, 287, 337];
      //    rotateFn(0, 337, '未中奖');
      //    break;
      //  case 1:
      //    var angle = [88, 137, 185, 235, 287];
      //    rotateFn(1, 26, '免单4999元');
      //    break;
      //  case 2:
      //    var angle = [137, 185, 235, 287];
      //    rotateFn(2, 88, '免单50元');
      //    break;
      //  case 3:
      //    var angle = [137, 185, 235, 287];
      //    rotateFn(3, 137, '免单10元');
      //    break;
      //  case 4:
      //    var angle = [185, 235, 287];
      //    rotateFn(4, 185, '免单5元');
      //    break;
      //  case 5:
      //    var angle = [185, 235, 287];
      //    rotateFn(5, 185, '免单5元');
      //    break;
      //  case 6:
      //    var angle = [235, 287];
      //    rotateFn(6, 235, '免分期服务费');
      //    break;
      //  case 7:
      //    var angle = [287];
      //    rotateFn(7, 287, '提高白条额度');
      //    break;
      // }
      // console.log(item);
    });
  });
  function rnd(n, m){
    return Math.floor(Math.random()*(m-n+1)+n)
  }
/*导航滑动*/
  function scrollDown(ele){
    var target = ele.data('target');
    target =$("."+target);
    $('html,body').animate({scrollTop:target.offset().top}, 800);
  }
  $(".nav01,.nav02,.nav03,.nav04,.nav05, .nav06").on("click",function(){
    scrollDown($(this));
  });

/*回到顶部*/
  (function(){
    $("body").append('<div id="u-gotop"><a href="javascript:;" title="回到顶部">回到顶部</a></div>');
      $(window).on("load scroll",function(){
          if($(window).scrollTop()>1000){
              $("#u-gotop").fadeIn();
          }else{
              $("#u-gotop").fadeOut();
          }
      });
      $("#u-gotop").on("click",function(){
          $("body,html").animate({scrollTop: 0}, "fast");
      });
  })();
/*获奖名单播放*/
  function scroll_news(){
    var firstNode = $('.name li'); 
    firstNode.eq(0).fadeOut('slow',function(){ //获取li的第一个,执行fadeOut
     $(this).clone().appendTo($(this).parent()).show('slow'); //把每次的li的第一个克隆，然后添加到父节点 对象。
     $(this).remove();//去掉每次的第一个li。
    });
  }
  setInterval('scroll_news()',2000);//每隔0.5秒，执行scroll_news()

/*弹层隐藏*/
  $("#diaDel,#dil-git").on("click",function(){
    $(".dialog").hide();
  });

/* 轮播过渡 */
  var ulIndex = 0;
  $(".next").click(function(){
    var parent = $(this).parent();
    var len = $(parent).find("ul").length;
    ulIndex = (++ulIndex) >= len ? (len-1) : ulIndex;
    if (ulIndex < len) {
      $(this).removeClass("next-d");
      $(parent).find('ul').hide().animate({opacity: 0});
      $(parent).find("ul").eq(ulIndex).show().animate({opacity: 1}, 'fast');
    } else {
      $(this).addClass("next-d");
    }
    if (!$(this).siblings(".prev").hasClass("prev-d")) $(this).siblings(".prev").addClass("prev-d");
  });

  $(".prev").click(function(){
    var parent = $(this).parent();
    var len = $(parent).find("ul").length;
    ulIndex = (--ulIndex) <= 0 ? 0 : ulIndex;
    if (ulIndex < 0) {
      $(this).addClass("prev-d");
    } else {
      $(this).removeClass("prev-d");
      $(parent).find('ul').hide().animate({opacity: 0});
      $(parent).find("ul").hide().eq(ulIndex).show().animate({opacity: 1}, 'fast');
    }
    if (!$(this).siblings(".next").hasClass("next-d")) $(this).siblings(".next").addClass("next-d");
  });

/* 倒计时 */
var currentTime = $(".timer").attr("data-time") || 306000;
var timeVal = setInterval(function(){
  if (currentTime <= 0) {
    clearInterval(timeVal);
    return false;
  }
  currentTime = currentTime - 1000;
  if ($(".timer").attr("data-type") == "junior") {
    $(".timer .day").html(Math.floor(currentTime/(1000 * 60 * 60 * 24)));
    $(".timer .hour").html(Math.floor(currentTime/(1000*60*60)) % 24);
    $(".timer .min").html(Math.floor(currentTime/(1000*60)) % 60);
  }else {
    $(".timer span").html(Math.floor(currentTime/(1000 * 60 * 60 * 24)) + '天' + (Math.floor(currentTime/(1000*60*60)) % 24) + '小时' + (Math.floor(currentTime/(1000*60)) % 60) + '分');
  }
}, 1000); 
