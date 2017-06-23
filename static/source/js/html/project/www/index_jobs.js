 
define(function(require,exports,module){
	// require("formCheck");
	require('logHref');
//微博 微信 下拉
	$(".jsMore").hover(function(){
		$(this).find('.jsUl').show();
	},function(){
		$(this).find('.jsUl').hide();
	}); 

var jb_certi_url=$(".jb_certi").attr("data_href");
var jb_getFree_url=$(".jb_getFree").attr("data_href");
	//验证登录 验证是否有等级
	$(".jb_certi").click(function(){
	 $.ajax({
			url: '/Ajax/liepinIntroduce',
			type: 'POST',
			dataType: 'json',
			cache:false,
			success:function(res){
				if(res.status==0&&res.data=="login_fail"){
				   $(".jb_mask").show();
				   $(".jb_login01").show();
				   return false;
					}else{
							//判断是否获得水平认证
							if(res.status==0&&res.data=="grade_fail"){
									 $(".jb_mask").show();
									 $(".jb_getTest").show();
									 return false;
							}else{
								 window.open(jb_certi_url);  //跳转到评级页面
								 return false;
							}
					}
			}
	  })

	});
//验证登录 验证是否预约体验课
$(".jb_getFree").click(function(){
	 $.ajax({
			url: '/Ajax/liepinEvaluation',
			type: 'POST',
			dataType: 'json',
			cache:false,
			success:function(res){
				if(res.status==0&&res.data=="login_error"){
				   $(".jb_mask").show();
				   $(".jb_login01").show();
				   return false;
					}else{
							//判断是否领取免费测评
							if(res.status==0&&res.data=="grade_error"){
									 window.open(jb_getFree_url);  //跳转到领取免费体验课页面
									 return false;
							}else{
								  $(".jb_mask").show();
									$(".jb_getFreeClass").show();
								 return false;
							}
					}
			}
	  })

	});




});