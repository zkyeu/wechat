/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/;
	$("#reg1").click(function(){
        var grade = $("#grade option:selected").val();
        console.log(grade);
		var mobile = $("#mobile").val();
		var passwd = $("#reg1_passwd").val();
		var code = $("#code").val();
        if (grade === "0") {
            alert("请选择年级");
            return false;
        }
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
    var isGetingCode = false;
	$(".getCode").on("click",function(){
        if (!isGetingCode) {
            isGetingCode = true;
            var mobile=$("#mobile").val();
            var _this=this;
            
            this.innerHTML="请稍等...";
            $.ajax({
                type:"POST",
                dataType:"json",
                url: "http://wap.51talk.com/Ajax/sendSms",
                data: {"mobile":mobile},
                success: function(res){
                    if(res.status){
                        $(_this).addClass('countdown');
                        timer(_this,60);
                    }else{
                        _this.innerHTML="重新获取";
                        isGetingCode = false;
                        alert(res.info);
                    }
                }
            }); 
        }

    });
    $(".getCodes").on("click",function(){
        var imgCode = $('#authCode').val();
        if(!imgCode||(imgCode.length && imgCode.length<1)){
            alert("请填写图形验证码！");
            return false;

        }
        if (!isGetingCode) {
            isGetingCode = true;
            var mobile=$("#mobile").val();
            var _this=this;
            
            this.innerHTML="请稍等...";
            $.ajax({
                type:"GET",
                dataType:"jsonp",
                url: "http://www.51talk.com/passport/getMobileCode",
                data: {"mobile":mobile,authCode:imgCode},
                success: function(res){
                    if(res.status == 1){
                        $(_this).addClass('countdown');
                        timer(_this,120);
                    }else{
                        _this.innerHTML="重新获取";
                        isGetingCode = false;
                        alert(res.info);
                        if(res.status==2){
                            $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                        }
                    }
                }
            }); 
        }

    });
    //倒计时
    function timer(obj,count){
        //obj.innerHTML=count+"秒后重新获取";
        obj.timer=setInterval(function(){
            count--;
            if(count==0){
                obj.innerHTML= "重新获取";
                isGetingCode=false;
                clearInterval(obj.timer);
                $(obj).removeClass('countdown');
            }else{
                var str="倒计时"+count+"s";
                obj.innerHTML=str;
            }
        },1000);
    } 
});
