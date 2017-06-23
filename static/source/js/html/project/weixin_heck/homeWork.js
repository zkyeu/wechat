define("homeWork",["fastclick", "fancybox"],function(require,exports,module){
	require("fastclick");
	require("fancybox");

	FastClick.attach(document.body); 

    $("[rel=hw]").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });

    var isAndroid = String(navigator.userAgent.toLowerCase().match(/android/i)) == "android";
    var $audiom = $(".li-audio-m");
    var $videom = $(".li-audio-v");
    var $now;
    var $audio = $("audio");
    var audio = $audio[0];
    var $video = $("video");
    var video = $video[0];
    var $hwVideo = $(".hw-video");

    $audiom.on("click", function(){
    	var $self = $(this);
    	var dataAudio = $self.attr("data-audio");
    	if(!dataAudio) return;

    	$audio.attr("src", dataAudio);
    	audio.play();

    	if($now) $now.removeClass("isplaying");
    	$self.addClass("isplaying");
    	$now = $self;
    });

    $audio.on({
    	ended : function(){
    		$now.removeClass("isplaying");
    		$now = null;
    	}
    });

    $videom.on("click", function(){
        var src = $(this).attr("data-video");
        if(isAndroid){
            var $$video = $("<video controls preload></video>");
            $$video.attr("src", src).appendTo($hwVideo);
            $hwVideo.show();
            $$video.one("ended", function(){
                $hwVideo.hide();
                $$video.remove();
            }).get(0).play();
        }else{
            $video.attr("src", src);
            video.play();
        }
    });

    function autoFull(){
        // if(!isAndroid()) return;
        $hwVideo.show();
    }

    ;(function(){
        // if(!isAndroid()) return;
        $video.on("ended", function(){
            $hwVideo.hide();
        });
    })();

});