define("curriculumSet",["ckplayer"],function(require,exports,module){

    var curriculumSetFn = function(){
        this.tab = $('#tab');
        this.courseDes = $('#courseDes');
        this._event();
    };
    curriculumSetFn.prototype = {
        _event:function(){
            var that = this;
            this.tab.find('a').on('mouseover',function(){
                that.tab.find('a').each(function(i){
                    if($(this).hasClass('current'+i) == true){
                        that.curNumber = i;
                    }
                });


                that.cur = $(this).index();
                if(!$(this).hasClass('current')){
                    that.tab.removeClass().addClass('tab-box tab-box'+that.cur);
                    if(that.cur > that.curNumber){
                        for(var i=that.curNumber; i<that.cur; i++ ){
                            that.tab.find('a').eq(i).removeClass('btn'+ i +' current'+i).addClass('btn-'+i);
                        }
                        
                    }else if(that.cur < that.curNumber){
                        for(var i=that.curNumber; i>that.cur; i-- ){
                            that.tab.find('a').eq(i).removeClass('btn-'+ i +' current'+i).addClass('btn'+i);
                        }
                    }
                    
                    $(this).addClass('current'+that.cur);
                    that.courseDes.html(desText[that.cur]);
                }
            });
        }
    };
    new curriculumSetFn();
});
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