define(function(require,exports,module){
	//点击播放显示视频播放
	$('.video_guide .play').on('click',function(){
		$('.mask').show();
	})
	//点击蒙版隐藏视频
	  $('.mask').on('click',function(){
	    $(this).hide();
	   	$('video').get(0).pause();
	  })
 	setTimeout(function(){
 		$('.mask + div').appendTo($('.mask'))
 	},100);
})