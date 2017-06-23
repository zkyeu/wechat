/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-12-16 16:10:30
 * @version 1.0.0
 */
define("b2s_foreign_teachers",["ckplayer"],function(require,exports,module){

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
        $("#j-mask").show();
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
              $("#j-mask").hide();
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
            "height":height,
          }).find(".source").html(source); 
          return false;
      });



    // go_top

    $.fn.goTop = function(options){
        var defaults = {
            time : 300
        },
        configs = $.extend({}, defaults, options),
        $self = $(this);
        $(window).scroll(function(){  
            if ($(window).scrollTop()>100){  
                $self.show();  
            }  
            else{  
                $self.hide();  
            }  
        });  

        $self.click(function(){  
            $('body,html').animate({scrollTop:0},defaults.time);  
            return false;  
        });  
          
    }
    $(".go_top").goTop();
});