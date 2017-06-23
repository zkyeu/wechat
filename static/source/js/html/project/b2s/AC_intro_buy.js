	
define(function(require,exports,module){
	;(function(){
		var $time = $(".time");
		var leftTime = $time.attr("title");
		var $AC_a = $(".AC_a");
		function countTime(){
			leftTime = leftTime - 1;
			if(leftTime < 0){
				$AC_a.css({"background":"#ccc"});
				$AC_a.attr({"href":"javascript:;"})
			}else{
				var min = parseInt(leftTime/60);
				var sec = leftTime - min*60;
				if(sec>9){
					$time.html("0" + min+"  &nbsp;:&nbsp;"+  sec);
				}else{
					$time.html("0" + min+"  &nbsp;:&nbsp;0"+ sec);
				}
				
				setTimeout(countTime,1000)
			}
			
		}
		countTime();
	})();
	
});