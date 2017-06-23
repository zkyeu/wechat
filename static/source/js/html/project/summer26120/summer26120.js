define(function(require,exports,module){
  /*导航滑动*/
    function scrollDown(ele){
      var name = ele.data('name');
      name =$("."+name);
      $('html,body').animate({scrollTop:name.offset().top}, 800);
    }
    $(".b-nav").on("click",function(){
      $(this).addClass("active").parent().siblings().find(".b-nav").removeClass("active");
      scrollDown($(this));
    });

  /*弹出层*/
    $(".scan-cod").click(function(){
      var dataName = $(this).attr("data-name");
      var dataNum = $(this).attr("data-num");
      var dataImg = $(this).attr("data-img");
      $(".cls-layer").show();
      $(".cls-layer").find(".bold").text(dataName);
      $(".cls-layer").find(".money").text(dataNum);
      $(".cls-layer").find(".lay-code").attr('src',dataImg);
      $(".dadaId").val($(this).attr("data-id"));
    });
    $(".cls-layer .close,.cls-layer .mask").click(function(){
      $(".cls-layer").hide();
    });
    /*确认付款*/
    $(".c-tip li").click(function(){
      $(this).addClass("clHover").siblings().removeClass("clHover").find(".c-input").attr("checked",false);
      $(this).find(".c-input").attr("checked",true);
      $(".pwTh").val($(this).find(".c-input").val());
    });
    $(".payMt").click(function(){
      // var cTip = $(".c-tip").find("li");
      // var dataB = cTip.eq(0).attr("data-urlB");
      // var dataT = cTip.eq(1).attr("data-urlT");
      // if(cTip.eq(0).is(".clHover")){
      //   $(this).attr("href",dataB);
      // }else{
      //   $(this).attr("href",dataT);  
      // }
      $(".cls-layer").hide();
      $(".payMt").submit();
    });
  /*回到顶部*/
    (function(){
      $(window).on("load scroll",function(){
        if($(window).scrollTop()>1000){
            $(".u-gotop").fadeIn();
        }else{
            $(".u-gotop").fadeOut();
        }
      });
      $(".u-gotop").on("click",function(){
        $("body,html").animate({scrollTop: 0}, "fast");
      });
    })();
  /*切换*/
    $(".lst-ul li").click(function(){
      $(this).addClass("on-fst").siblings().removeClass("on-fst");
      var index=$(this).index();
      $(".cls-lay .cls-nr").eq(index).show().siblings().hide();
    })
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
              'http://static.51talk.com/static/js/html/lib/ckplayer/ckplayer.swf',
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
      });

  /*在线咨询*/
    $(".online").on("click",function(){
      //打开qq企业客服
      window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=4006320051&aty=0&a=0&curl=&ty=1', '_blank', 'height=544px, width=644px,toolbar=no,scrollbars=no,menubar=no,status=no');
    });
  /*分享*/
  $(".cls-share").hover(function(){
    $(this).find(".cls-bds").show();
    $(this).find(".sha-img").addClass("sha-img-hover");
  },function(){
    $(this).find(".cls-bds").hide();
    $(this).find(".sha-img").removeClass("sha-img-hover");  
  });
   var shareContent = $(".sFied").attr("shareContent") || "@51talk 无忧英语-51Talk外教和服务挺不错，我向我的好友推荐了51Talk！你也来试试吧！";
    var shareLink = $(".sFied").attr("shareLink")||"http://www.51talk.com?66";
    window._bd_share_config={"common":{"bdSnsKey":{},"bdText":shareContent,"bdMini":"2","bdMiniList":false,"bdPic":"http://static.51talk.com/images/web_new/home/banner/student1.jpg;http://static.51talk.com/images/web_new/home/banner/index.jpg;http://static.51talk.com/images/web_new/home/show/4.png;http://static.51talk.com/images/web_new/home/show/11_07.png","bdUrl": shareLink,"bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
  /*客服聊天点击统计*/
    // $(".online").on("click",function(){
    //   var type=$(this).attr("data-type");
    //   var url=$(this).attr("data-url");
    //   $.ajax({
    //     url: url,
    //     data: {"type":type},
    //     type: "POST"
    //   });
    // });
    //在线咨询弹窗
    // (function(){
    //   var timer=null;
    //   var sAlertOnline='<div class="alert_online">'+
    //         '<a href="javascript:;" class="u-close"></a>'+
    //         '<a href="javascript:;" class="u-btn"></a>'+
    //       '</div>';
    //   var oAlertOnline=$(sAlertOnline);
    //   oAlertOnline.find('.u-close').on("click",function(){
    //     oAlertOnline.fadeOut();
    //     localStorage.qqzx_close=1;
    //   }).end().find('.u-btn').on("click",function(){
    //     //打开qq企业客服
    //     window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=4006320051&aty=0&a=0&curl=&ty=1', '_blank', 'height=544px, width=644px,toolbar=no,scrollbars=no,menubar=no,status=no');
    //   });
    //   if(localStorage.qqzx_close!=1){
    //     timer=setTimeout(function(){
    //       $("body").append(oAlertOnline.show());
    //     },30000);
    //     $(".video_play").on("click", function(){
    //       clearTimeout(timer);
    //     });
    //   }
    // })();
});