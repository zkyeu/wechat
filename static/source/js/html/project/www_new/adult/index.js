/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-11-09 12:10:30
 * @version 1.0.0
 */
define('adult/index',['formCheck','silder','common'],function(require,exports,module){

    require("common");

    var directory = $("body").data("directory");
    var p_t_list="";
    var p_t_list2="";
    var p_line="";
    var p_line2="";

    if($("ul[data-adult='move1']")[0]){
        p_t_list = $("ul[data-adult='move1']").offset().top - $(window).height();
    }
    if($(".p-line[data-adult='move2']")[0]){
        p_line = $(".p-line[data-adult='move2']").offset().top - $(window).height();
    }
    if($(".p-line[data-adult='move4']")[0]){
        p_line2 = $(".p-line[data-adult='move4']").offset().top - $(window).height();
    }
    if($("ul[data-adult='move3']")[0]){
        p_t_list2 = $("ul[data-adult='move3']").offset().top - $(window).height();
    }
    if($(".study-step")[0]){
        var study_step = $(".study-step").offset().top - $(window).height();
    }
    var top = $("body").scrollTop();
    if(top>p_t_list){
        $("ul[data-adult='move1']").addClass("list_move");
    }

    $(window).scroll(function(){

        var top = $(window).scrollTop();

        if(top>p_t_list){ 
            $("ul[data-adult='move1']").addClass("list_move");
        }
        if(top>p_line){
            $(".p-line[data-adult='move2']").addClass("move_line");
        }
        if(top>p_line2){
            $(".p-line[data-adult='move4']").addClass("move_line");
        }
        if(top>p_t_list2){ 
            $("ul[data-adult='move3']").addClass("list_move");
        }
        if(top>study_step){
            $(".study-step ul").addClass("animated");
            $(".study-step li").addClass("animated");
        }
    })

/*特色班级*/
  /*导航滑动*/
    function scrollDown(ele){
      var name = ele.data('name');
      name =$("."+name);
      $('html,body').animate({scrollTop:name.offset().top}, 800);
    }
    $(".cls-banner .b-nav").on("click",function(){
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
      $(".cls-layer").hide();
      $(".payMt").submit();
    });
  /*切换*/
    $(".lst-ul li").click(function(){
      $(this).addClass("on-fst").siblings().removeClass("on-fst");
      var index=$(this).index();
      $(".cls-lay .cls-nr").eq(index).show().siblings().hide();
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
});



