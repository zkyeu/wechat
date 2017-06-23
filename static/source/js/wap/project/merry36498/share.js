/**
 * @authors hhl (huhaili@51talk.com)
 * @date    2016-12-13 15:13:23
 */
 define(function(require,exports,module){
  /*点击抽奖*/
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
        $("#dialog .detail").find("img").eq($("#lottery").attr("prize_id")).show();
        $("#dialog").find(".prizeName").html(prize1);
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
        var active = $("#active").val();
        var dataUrl=$("#lottery").attr("data-url");
        if(active=="0"){
          //可以抽奖
          if(that.attr("send") == "1") {
            return false;
          }
          lottery.speed = 100;
          $.ajax({
           type: "get",
           dataType: "json",
           url: dataUrl,
           data:{},
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
        }else if(active == "1") {
          //已经登录，已经抽过奖
          $("#j_tip").find(".text-h3").html("您已经参与过抽奖了，请关注下面的活动哦！");
          $("#j_tip").removeClass("hide");
        }
    });
  });
  /*获奖名单播放*/
    function scroll_news(){
      var nameList = $('.share_names');
      nameList.find(".name_list").animate({
        marginTop: "-1.5rem"
      },500,'ease-in-out',function(){
        $(this).css({marginTop: "0rem"}).find("li:first").appendTo(this);
      });
    }
    setInterval(scroll_news,2000);

  /*获奖记录*/
    $('#prize_log').click(function(){
      var that = $(this);
        var active = $("#active").val();
        if(active == "1") {
          $('#dialog2').removeClass('hide').find(".tip-1").addClass('hide');
          $('#dialog2').removeClass('hide').find('.tip-2').removeClass('hide');
          $('#dialog2').removeClass('hide').find('.tip-2').find("span").html($(".prizeName").html());
        } else {
          $('#dialog2').removeClass('hide').find('.tip-2').addClass('hide');
          $('#dialog2').removeClass('hide').find(".tip-1").removeClass('hide');
        }
    });
  /*点击事件*/
    $(".share_names .rule").click(function(){
      $(".activity-rule").show();
    });
    $(".activity-rule .close").click(function(){
      $(".activity-rule").hide(); 
    });
    $('#dialog .close').click(function(){
      $('#dialog').addClass('hide').find('img').hide();
    });
    $('#dialog2 .close').click(function(){
      $('#dialog2').addClass('hide').find('.tip').addClass('hide');
    });
    $('#j_tip .close').click(function(){
      $('#j_tip').addClass('hide');
    });
 });