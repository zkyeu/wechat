define(function(require, exports, module) {
    var media = {
        audios: [
            {
                mp3: "http://static.51talk.com/upload/efl_audio/prepar/9521aa10b8b967dfb47031366c7f955c_160907c87.mp3",
            },
            {
                mp3: "http://static.51talk.com/upload/efl_audio/prepar/efa293134e3e6fa949c9d22a23317168_16090770d.mp3",
            },
            {
                mp3: "http://static.51talk.com/upload/efl_audio/prepar/d936cb0be11886e69f517accdce106b2_160907a94.mp3",
            }
        ],
    };

    var initTurn = function() {
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        $('#bookflip').turn({
            width: screenWidth,
            height: screenHeight,
            display: 'single'
        });
    };
    initTurn();


    function calculateNext() {
        var screenWidth = $(window).width();
        var defaultPicWidth = 1920;
        var defaultNextWidth = 117;
        var defaultNextHeight = 106;
        var nextWidth = defaultNextWidth*(screenWidth/defaultPicWidth);
        var nextHeight = nextWidth/(defaultNextWidth/defaultNextHeight);
        $('.next').css({
            'width': nextWidth,
            'height': nextHeight,
            'background-size': nextWidth
        });
    }
    calculateNext();

    function calculateHorn() {
        var screenWidth = $(window).width();
        var defaultPicWidth = 1920;
        var defaultNextWidth = 85;
        var defaultNextHeight = 85;
        var nextWidth = defaultNextWidth*(screenWidth/defaultPicWidth);
        var nextHeight = nextWidth/(defaultNextWidth/defaultNextHeight);
        $('.horn').css({
            'width': nextWidth,
            'height': nextHeight,
            'background-size': nextWidth
        });
    }
    calculateHorn();
    function calculateGifDimensionPositions() {
        var screenWidth = $(window).width();
        var defaultGifWidth = 1152;
        var defaultGifHeight = 648;
        var defaultPicWidth = 1920;
        var defaultPicHeight = 1080;
        var gifPicRatio = defaultGifWidth/defaultPicWidth;
        var gifWidth = parseInt(screenWidth*gifPicRatio, 10);
        var defaultGifTop = (defaultPicHeight - defaultGifHeight)/2;
        var gifTop = parseInt(defaultGifTop*(screenWidth/1920),10);

        return {
           'width':  gifWidth,
           'top': gifTop,
           'marginLeft': -gifWidth/2
        }
    }

    function setGifDimensionsPositions() {
        var dimensionsPositions = calculateGifDimensionPositions();
        $('.page .gif').css({
            width: dimensionsPositions.width,
            top: dimensionsPositions.top,
            'margin-left': dimensionsPositions.marginLeft,
            position: 'absolute'
        });
    }
    setGifDimensionsPositions();
    $(window).resize(function() {
        resetBookflip();
        setGifDimensionsPositions();
        calculateNext();
        calculateHorn();
    });

    function resetBookflip() {
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        $("#bookflip").turn("size", screenWidth, screenHeight); 
    }

    $('.horn').on('click', function() {
        if ($(this).hasClass('close')) {
            $("#jplayer").jPlayer("play");
            $(this).removeClass('close');
        } else {
            $("#jplayer").jPlayer("pause");
            $(this).addClass('close');
        }
    });
    var iTimer;
    var initJplayer = function() {
        $("#jplayer").jPlayer({
            ready: function (event) {
                $(this).jPlayer("setMedia", {
                    mp3: "http://static.51talk.com/upload/efl_audio/prepar/9521aa10b8b967dfb47031366c7f955c_160907c87.mp3",
                }).jPlayer("play");

                iTimer = setTimeout(function() {

                        $('.next').fadeIn();

                }, 17000);
            },
            swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",        
            supplied: "m4a, mp3",
            wmode: "window",
            autoBlur: false,
            smoothPlayBar: true,
            remainingDuration: true,
            toggleDuration: true
        });

        $("#tip").jPlayer({
            ready: function (event) {
                $(this).jPlayer("setMedia", {
                    mp3: "http://static.51talk.com/upload/efl_audio/prepar/537a70992dfeea468a1d54e7b29a329d_16090775c.mp3",
                });
            },
            swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",        
            supplied: "m4a, mp3",
            wmode: "window",
            autoBlur: false,
            smoothPlayBar: true,
            remainingDuration: true,
            toggleDuration: true
        });

    };
    var loadImg = function(url, cb) {
        var img = new Image();
        img.onload = function() {
            cb && cb();
        };
        img.src = url;
    };

    var imgList = [];
    $('.slides .slide').eq(0).find('img').each(function(index, elem) {
        imgList.push($(elem).attr('src'));
    });

    var loadImgs = function(srcs) {
        var count = srcs.length;
        var loadCount = 0;
        $.each(srcs, function(index, elem){
            loadImg(elem, function(){
                loadCount ++;
                var progress = parseInt(100*loadCount/count, 10);
                $('.progress').html(progress);
                if (count === loadCount) {
                    $('.loading').fadeOut();
                    $('.slides').fadeIn();                 
                    $('.horn'). fadeIn();
                    initJplayer();
                }
            });
        });
    };
    
    loadImgs(imgList);

    var index ;
    var setMedia = function(page) {
        $("#jplayer").jPlayer("setMedia", media.audios[page-1]).jPlayer("play"); 

        clearTimeout(iTimer);

        if (page === 3) {
            iTimer = setTimeout(function() {
                $('.guide'). fadeIn();
            }, 13000); 
        }

        if (page === 2) {
            iTimer = setTimeout(function() {               
                $('.next'). fadeIn();
            }, 13000);
        }
  
    };
    $("#bookflip").bind("turning", function(event, page, view) {
        $("#jplayer").jPlayer("stop");
        $('.next').hide();
        $('.horn').removeClass('close');
        setMedia(page);
    });

    $('.link').on('mouseenter', function(){
        $("#tip").jPlayer("play");
    });

    $(".next").on('click', function() {
        $("#bookflip").turn("next");
    });
});