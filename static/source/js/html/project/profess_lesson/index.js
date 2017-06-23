define(function(require,exports){
    //微博 微信 下拉
    $(".jsMore").hover(function(){
        $(this).find('.jsUl').show();
    },function(){
        $(this).find('.jsUl').hide();
    });
    
    //图片延迟加载
    (function(){
        var oWin=$(window);
        var aImg=$("img");
        oWin.on("load scroll resize",function(){
            var scrollT=oWin.scrollTop();
            aImg.each(function(){
                if(this.src)return true;
                var oImg=$(this);
                if(scrollT+oWin.height()>=oImg.offset().top){
                    this.src=this.getAttribute("_src");
                    this.removeAttribute("_src");
                }
            });
            
        });
    })();

    //点击切换播放音频
    var timer;
    $('#playList a').click(function(){
        var hasVideo = !!(document.createElement('video').canPlayType);
        if(!hasVideo){
            alert('您的浏览器版本太低，不支持播放音视频文件！');
            return;
        }
        clearTimeout(timer);
        var seconds;
        var $This = $(this);
        var index = $('#playList a').index(this)+1;
        var src = $('#audio').attr('src');
        var playNum = src.lastIndexOf('.')-1;
        var newSrc = src.substring(0,playNum) + index + '.mp3';
        $('#audio').attr('src',newSrc);
        switch(index){
            case 1:
            case 2:
                var hasActive = $(this).hasClass("green-pause");
                if(hasActive){
                    $('#audio')[0].pause();
                    $(this).removeClass("green-pause");
                }else{
                    if(index == 1){
                        seconds = 5000;
                        $('#playList a').eq(1).removeClass("green-pause");
                    }else{
                        seconds = 3200;
                        $('#playList a').eq(0).removeClass("green-pause");
                    }
                    $('#playList a').eq(2).removeClass("red-pause");
                    $(this).addClass("green-pause");

                    $('#audio')[0].play();
                    timer = setTimeout(function(){
                        $This.removeClass("green-pause");
                    },seconds);
                }
                break;
            case 3:
                var hasActive = $(this).hasClass("red-pause");
                if(hasActive){
                    $('#audio')[0].pause();
                    $(this).removeClass("red-pause");
                }else{
                    $('#playList a').eq(1).removeClass("green-pause");
                    $('#playList a').eq(0).removeClass("green-pause");
                    $(this).addClass("red-pause");
                    $('#audio')[0].play();
                    timer = setTimeout(function(){
                        $This.removeClass("red-pause");
                    },6300);
                }  
        }
    })
})