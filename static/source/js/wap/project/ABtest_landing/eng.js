/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/;
	$("#reg1").click(function(){
		var mobile = $("#mobile").val();
		var passwd = $("#reg1_passwd").val();
		var code = $("#code").val();
		if (mobile == "") {
			alert("请填写手机号码");
			return false;
		}
		if (!reTel.test(mobile)) {
			alert("请填写正确格式手机号码");
			return false;
		}
		if(code==""){
			alert("请填写验证码");
            return false;
		}
		if (passwd == "") {
			alert("请填写密码");
			return false;
		}
        document.getElementById("reg1_form").submit();
	});
	//获取验证码
	$(".getCode").on("click",function(){
        var mobile=$("#mobile").val();
        var _this=this;
        this.bAjax=true;
        this.innerHTML="请稍等...";
        $.ajax({
            type:"POST",
            dataType:"json",
            url: "http://wap.51talk.com/Ajax/sendSms",
            data: {"mobile":mobile},
            success: function(res){
                if(res.status){
                    timer(_this,60);
                }else{
                    _this.innerHTML="重新获取";
                    _this.bAjax=false;
                    alert(res.info);
                }

            }
        }); 
    });
    //倒计时
    function timer(obj,count){
        obj.innerHTML=count+"秒后重新获取";
        obj.timer=setInterval(function(){
            count--;
            if(count==0){
                obj.innerHTML= "重新获取";
                obj.bAjax=false;
                clearInterval(obj.timer);
            }else{
                var str=count+"秒";
                obj.innerHTML=str;
            }
        },1000);
    } 
	
});
