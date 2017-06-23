/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-07-11 12:10:30
 * @liyang 1.0.0
 */
define(function(require,exports,module){
	/* 首先判断是不是IE低版本 */
	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") 
	{ 
	$(".fly").css("bottom","200px");
	} 
	else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
	{ 
	$(".fly").css("bottom","200px");
	} 
	else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") 
	{ 
	$(".fly").css("bottom","200px");
	} 
	else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0") 
	{ 
	$(".fly").css("bottom","200px");
	} 
	$(function(){
		$('#page-wrap').fullpage({
			'navigation': true,
		});
	});
	/* 判断是什么操作系统 */
	function validataOS(){
		if(navigator.userAgent.indexOf("Window")>0){
			return "Windows";
		}else if(navigator.userAgent.indexOf("Mac OS X")>0) {
			return "Mac";
		}else if(navigator.userAgent.indexOf("Linux")>0) {
			return "Linux";
		}else{
			return "NUll";
		}
	}
	/* 根据系统判断下载链接 */
	var yourOs = validataOS();
	if(yourOs == "Mac"){
		$(".mac").addClass("mac_after");
	}else{
		$(".pc").addClass("pc_after");
	}
	/* 下载ac悬停效果 */
	$(".pc_link").hover(function(){
		$(this).addClass("pc_hover");
	},function(){
		$(this).removeClass("pc_hover");
	})

	$(".page3_list1").hover(function(){
		$(this).addClass("page3_now");
		$(this).find(".page3_bg2").show();
		$(this).find(".page3_bg1").hide();
	},function(){
		$(this).removeClass("page3_now");
		$(this).find(".page3_bg2").hide();
		$(this).find(".page3_bg1").show();
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
          $(".cls-top").append(
                '<div id="ckplayerDialog">'+
                      '<a class="source"></a>'+
                      '<div id="playerContent"></div>'+
                    '</div>'
          );
          $(".m-s-m").hide();
          $(".video_play").hide();
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
    });
});