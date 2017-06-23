/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-10-24 15:13:23
 */
define(function(require,exports,module){

  //全局参数配置
  var gconfig = {
    url: "http://wapdev.51talk.com"
  } 

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

    $(function() {
        lottery.init('lottery');

        $("#lottery .pointer").click(function() {
          var that = $(this);
          var login = $("#login").val();
          var active = $("#active").val();
          var tipDialog = $("#j_tip");
          var dataLotteryUrl=$("#lottery").attr("data-lottery-url");
          if(login == "1" && active == "0") {
            //可以抽奖
        if(that.attr("send") == "1") {
                return false;
              }
        lottery.speed = 100;
        $.ajax({
          type: "post",
          dataType: "json",
          url: dataLotteryUrl,
          data:{id:24},
          beforeSend: function () {
            that.attr("send", "1");
          },
          success:function(res) {
            if(res.status==1){
              $("#active").val("1");
                $("#lottery").attr("prize_site",res.data.angle-1);
                $("#lottery").attr("prize_id",res.data.id-1);
                $("#lottery").attr("nick_name",res.data.nick_name);
                $("#lottery").attr("prize_name",res.data.prize);
                roll();
            }else {
                $(".dialog").addClass('hide');
                alert(res.info);
            }
            that.removeAttr("send");
            }
          });
          click = true;
          return false;
          } else if(active == "1") {
            //已经登录，已经抽过奖
            $("#j_tip").find(".text").html("您已经参与过抽奖了，请关注下面的活动哦！");
            $("#j_tip").removeClass("hide");
          } 
        });

        //buildCourseList();
    });

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
        $('#dialog').addClass('hide').find('img').hide();
    });
    $('#dialog2 .close').click(function(){
        $('#dialog2').addClass('hide').find('.tip').addClass('hide');
    });
    $('#j_tip .close').click(function(){
        $('#j_tip').addClass("hide");
    });

  /*获奖记录*/
  $('#prize_log').click(function(){
    var that = $(this);
      var login = $("#login").val();
      var active = $("#active").val();

      if(login == "1" && active == "1") {
      $('#dialog2').removeClass('hide').find(".tip-1").addClass('hide');
      $('#dialog2').removeClass('hide').find('.tip-2').removeClass('hide');
      } else {
        $('#dialog2').removeClass('hide').find('.tip-2').addClass('hide');
      $('#dialog2').removeClass('hide').find(".tip-1").removeClass('hide');
      }
        
        /*
        if(that.attr("send") == "1") {
          return false;
        }

    $.ajax({
      url: '/Landing/getUserLottery',
      data: {},
      type: 'POST',
      dataType: 'json',
      beforeSend: function () {
            that.attr("send", "1");
          },
      success: function(rs){
        var text = rs.data;
        if(rs.status == 1){
          $('#dialog2').show().find(".tip-1").addClass('hide');
          $('#dialog2').show().find('.tip-2').removeClass('hide').find('h3').text(text);
        }else if(rs.status == 0){
          $('#dialog2').hide();
          $(".sysInfo").show();

        }else{
          $('#dialog2').show().find('.tip-2').addClass('hide');
          $('#dialog2').show().find(".tip-1").removeClass('hide');
        }
        that.removeAttr("send");
      }
    });
    */
  });

    //查看更多课程
    $("#course .btn_buy").click(function(e){
    var that = $(this);
    var tipDialog = $("#j_tip");
    if(that.attr("data-status") == "1") {
      tipDialog.find(".text").html("您已经购买过该套餐了，活动期间<br/>只能购买一次哦~");
      tipDialog.removeClass("hide");
      e.preventDefault();
    }
    });

});
