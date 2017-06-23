
/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	$(function(){
		var win_w = $(window).width();
		var $log_img = $(".log_img");
		$log_img.each(function(i){
			if($log_img.eq(i).width()>(win_w-70)){
				$log_img.eq(i).width((win_w-70)+"px");
			}	
		})
	});
});
