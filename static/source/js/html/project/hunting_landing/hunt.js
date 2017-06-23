define(function(require,exports,module){
	require('placeholder');
	require('formCheck');
	$("#RegForm").formCheck({
	});
	$(".t-btn").click(function(){
		$(".info").show();
		$(".msk").show();
	});
	$("#msk").click(function(){
		$(".info").hide();
		$(this).hide();
	});
});

