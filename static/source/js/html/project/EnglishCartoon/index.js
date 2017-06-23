define(function(require,exports,module){
  require("formCheck");
  require("lazyload");
  require("placeholder");

  $("#formBottom").formCheck();
   $(function () {
    window.aiPanel = new chivox.AiPanel({
      appKey: "14350468870000e0",
      secretKey: "55d7229b6ae9332e89596cff1f9ce042"
    });
    aiPanel.Dialog.close();
  });
 
  /**
   * @aiPanel 驰声音频对象
   * @obj 数据操作节点
   * @toggleClass 操作样式
   */
  function setData(aiPanel, obj, toggleClass){
    aiPanel.setData({
      audioUrl: obj.attr("data-url"),
      serverParams:{
        coreType: "en.sent.score",
        refText: "hello limei"
      }
    });
    aiPanel.params.onAfterPlay = function() {
      obj.toggleClass(toggleClass);
      aiPanel.setData({audioUrl:""});
      defferd.resolve();
    };
    obj.toggleClass(toggleClass);
    $("#aiPanel .play").click();//播放触发
  }
  $(".playNow").click(function(){
     if($(this).attr("status")==1){
        $("#aiPanel .play").click();//播放触发
        $(this).attr("status",0);
        $(".playNow").removeClass("stop");
        $(this).addClass("playNow");
     }else{
        $(".playNow").removeClass("stop").attr("status",0);
        setData(aiPanel,$(this),"stop");
        $(this).attr("status",1);
     }
  });
  //微博 微信 下拉
  $(".jsMore").hover(function(){
    $(this).find('.jsUl').show();
  },function(){
    $(this).find('.jsUl').hide();
  });
  //官网首页右侧 在线咨询+官方微信
  $(".m-ntkf,.m-wx").each(function() {
    var aLi=$(this).children();
    var oLi1=aLi.eq(0);
    var oLi2=aLi.eq(1);

    oLi1.mouseover(function() {
      aLi.toggle();
    });
    oLi2.mouseout(function() {
      aLi.toggle();
    });
  });
  //客服聊天点击统计
  $(".u-b-ntkf").on("click",function(){
    var type=$(this).attr("data-type");
    var url=$(this).attr("data-url");
    $.ajax({
            url: url,
            data: {"type":type},
            type: "POST"
        });
  });
  //手机二维码点击
  $('#open_download').click(function(){
    window.open('http://www.51talk.com/app/download_app.php');
  });

  //回到顶部
  (function(){
    $("body").append('<div id="u-gotop"><a href="javascript:;" title="回到顶部">回到顶部</a></div>');
      $(window).on("load scroll",function(){
          if($(window).scrollTop()>1500){
              $("#u-gotop").fadeIn();
          }else{
              $("#u-gotop").fadeOut();
          }
      });
      $("#u-gotop").on("click",function(){
          $("body,html").animate({scrollTop: 0}, "fast");
      });
  })();
});

