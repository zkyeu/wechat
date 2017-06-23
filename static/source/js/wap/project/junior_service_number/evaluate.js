/**
 * @authors wanghuihui@51talk.com
 */
define("evaluate",["ckplayer"],function(require,exports,module){
    //视频
    var videoId = $('#playerContent'),
        palyerBtn = $('#palyerBtn');
        src = videoId.attr("data-vedioSrc"),
        width = videoId.attr("data-width") || 800,
        height = videoId.attr("data-height") || 450,
        source = videoId.attr("data-source") || "";
    CKobject.embed(
        src,
        'playerContent',
        'ckplayer_playerContent',
        width,
        height,
        false,
        {f: src, c: 0},
        [src],
        {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
    );
    //播放事件
    palyerBtn.on('touchend',function(){
        CKobject.getObjectById('ckplayer_a1').playOrPause();
    });
});
