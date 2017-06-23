define("MarketingShow",["ckplayer"],function(require, exports, module) {
//视频
    if($(".cls-top").attr("data-vedio")){
      $(".cls-top .video_play").attr({
        //"data-vedioSrc":$(".cls-top").attr("data-vedio"),
        "data-width":$(".cls-top").attr("data-width"),
        "data-height":$(".cls-top").attr("data-height"),
        //视频来源地址
        "data-source":$(".cls-top").attr("data-source")
      }).show();
    }else{
      $(".cls-top .video_play").show();
    }
    $("[data-vedioSrc]").on("click",function(){
        var oBtn=$(this);
        var src=oBtn.attr("data-vedioSrc");
        var width=oBtn.attr("data-width") || 800;
        var height=oBtn.attr("data-height") || 450;
        //视频来源地址
        var source=oBtn.attr("data-source") || "";
        $("#j-mask").show();
        if(!src)return;
        if($("#ckplayerDialog").length==0){
            $("body").append(
                  '<div id="ckplayerDialog">'+
                        '<a class="close" href="javascript:;"></a>'+
                        '<a class="source"></a>'+
                        '<div id="playerContent" style="width:100%"></div>'+
                      '</div>'+
                  '<div id="j-mask"></div>'
            );
            $("#ckplayerDialog").find('.close').add('#j-mask').on("click",function(){
              $("#ckplayerDialog").remove();
              $("#j-mask").remove();
            });
          }
          CKobject.embed(
              //'http://static.51talk.com/static/js/html/lib/ckplayer/ckplayer.swf',
              src,
              'playerContent',
              'ckplayer_playerContent',
              width,
              height,
              false,
              {f: src, c: 0, p: 1},
              [src],
              {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
          );
          $("#playerContent").css({
            "width":width*2
          });
          $("#ckplayerDialog").css({
            "display":"block",
            "width":width,
            "height":height,
          }).find(".source").html(source); 


          var videos = $("body").find("video");
          //console.log(videos.length);
          if(videos.length > 0){
            for(var i=0; i<videos.length; i++){
              videos.eq(i).attr("preload","preload");
            }
          }else{
              videos.attr("preload","preload");
          }


          return false;
      });
});
