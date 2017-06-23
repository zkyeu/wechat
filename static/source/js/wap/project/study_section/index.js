/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-04-27 15:43:30
 */
define(function(require,exports,module){
	$(".receive").on("click",function(){
		var dataUrl=$(this).attr("data-url");
		var _this = $(this);
		$.ajax({
			type:"post",
			url:dataUrl,
			dataType:"json",
			data:{},
			success:function(res){
				if(res.status==1){
					_this.html("已领取");
				}else{
					if(res.data == ""||res.data == null){
						_this.html("已领取");
					}else{
						window.location.href=res.data;
					}	
				}
			}
		})
	})
});
