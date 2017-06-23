define(function(require,exports,module){
    var oBtn=$(".video_show .top_mask");
    var src=oBtn.attr("data-vedioSrc");
    var width=oBtn.attr("data-width") || 820;
    var height=oBtn.attr("data-height") || 455;
    /* 视频来源地址 */
    var source=oBtn.attr("data-source") || "";
    if(!src)return;
    if($("#ckplayerDialog").length==0){
        $(".video_show").append(
            '<div id="ckplayerDialog">'+
              '<a class="source"></a>'+
              '<div id="playerContent"></div>'+
            '</div>'
        );
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
});
