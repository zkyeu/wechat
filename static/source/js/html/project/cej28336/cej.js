 
define(function(require,exports,module){
/*change*/
  $(".cej .cej-lev").on("click",".tst",function(){
    var tstSib = $(this).parent().siblings();
    $(this).addClass("tstActive");
    tstSib.find(".tst").removeClass("tstActive");
    tstSib.find(".t-ul").hide();
    $(this).siblings().show(); 
  });
  $(".t-ul li a").mouseover(function(){
    $(this).addClass("aHover");
    $(this).find(".t-vro").show();
  }).mouseout(function(){
    $(this).removeClass("aHover");
    $(this).find(".t-vro").hide();
  });
/*视频播放*/
    // if($(".cej-lev").attr("data-vedio")){
    //   $(".cej-lev .video_play").attr({
    //     "data-vedioSrc":$(".cej-lev").attr("data-vedio"),
    //     "data-width":$(".cej-lev").attr("data-width"),
    //     "data-height":$(".cej-lev").attr("data-height"),
    //     //视频来源地址
    //     "data-source":$(".cej-lev").attr("data-source")
    //   }).show();
    // }else{
    //   $(".cej-lev .video_play").hid();
    // }
    $("[data-vedioSrc]").on("click",function(){
        $(".cej-lev").attr({
          "data-vedio":$(this).attr("data-vedioSrc"),
        })
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
              src,
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
}); 