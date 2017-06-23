 
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/;
	 	$(".cc_getCourse").click(function(){
			  var tel=$(".cc_phone").val();
		    var passwd=$(".c_pwd").val();
		    if(tel==""){
		      alert("请填写手机号码");
		      return false;
		    }
		    if(!reTel.test(tel)){
		      alert("请填写正确格式手机号码"); 
		      return false; 
		    }
		    if(passwd==""){
		      alert("请填写密码");
		      return false;
		    }
		    $("#cc_form").submit();
	 	})
});
