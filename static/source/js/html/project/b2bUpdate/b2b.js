define(function(require){
	require('placeholder');
 $(".b_getFree").on("click",function(){
 	var company=$("input[name='company']").val();
 	var phone=$("input[name='phone']").val();
 	var username=$("input[name='username']").val();
 	var regPhone=/^1[0-9]{10}$/
 	if(company==""){
 			alert("请填写公司名称！");
 			return false;
 	}
 	if(phone==""){
 			alert("请填写联系电话！");
 			return false;
 	}
 	if(!regPhone.test(phone)){
 			alert("请填写正确的联系电话！");
 			return false;
 	}
 	if(username==""){
 			alert("请填写联系人！");
 			return false;
 	}else{
 		$("#RegForm1").submit();
 	}

 });
 	//微博 微信 下拉
	$(".jsMore").hover(function(){
		$(this).find('.jsUl').show();
	},function(){
		$(this).find('.jsUl').hide();
	});
	 		 
});

