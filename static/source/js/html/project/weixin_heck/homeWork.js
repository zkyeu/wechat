define("homeWork",["fastclick", "fancybox"],function(require,exports,module){
	require("fastclick");
	require("fancybox");

	FastClick.attach(document.body); 

    $("[rel=hw]").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });

    var $audiom = $(".li-audio-m");
    var $now;
    var $audio = $("audio");
    var audio = $audio[0];

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

});