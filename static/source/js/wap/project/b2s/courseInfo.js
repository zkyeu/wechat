define("courseInfo",["ckplayer","utility"],function(require,exports,module){
    var utility = require("utility");
    // utility.confirm();
    ;
    (function() {
        var box = $(".course-info-box");
        box.on("click", ".info-list-download a", function() {
            var self = $(this),
                downloadURL = self.attr("download-url"),
                textbookPublish = self.attr("textbook_publish");


            if (!downloadURL) {
                // 未付费
                utility.confirm({
                    content: "精品课VIP方可下载，<br/>是否成为VIP？",
                    sureCb: function() {
                        window.location.assign(self.attr("paydetail-url"));
                    }
                });
            } else {
                //判断教材是否发布
                if (textbookPublish == "true") {
                    // 已付费
                    window.location.assign(downloadURL);
                } else {
                    utility.promptDialog({
                        content: "教材尚未发布，请稍后再来哦~",
                        width: 206,
                        height: 90

                    });
                }
            }


        });
    })();
    // 隐藏APP
    (function(){
        if(localStorage.getItem("down_app")) return;
        $(".class_software").show();
        var close_soft = $(".class_software_box").find("span"),
            class_software = $(".class_software");
        close_soft.on("click",function(){
            localStorage.setItem("down_app","1");
            class_software.fadeOut();
        });

    })();

    //课前预习视频
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
              $("#ckplayerDialog").hide();
              $("#j-mask").hide();
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
              {f: src, c: 0, b: 1},
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


          // var videos = $("body").find("video");
          // console.log(videos.length);
          // if(videos.length > 0){
          //   for(var i=0; i<videos.length; i++){
          //     videos.eq(i).attr("preload","preload");
          //   }
          // }else{
          //     videos.attr("preload","preload");
          // }


          return false;
      });

});
