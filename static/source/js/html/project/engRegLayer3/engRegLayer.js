define(function(require){
	require('placeholder');
	$(function(){
		var $advList = $('#advList');
		var $advLi = $advList.find('li');
		var $tabDivs = $('#tabDivs').children();
		var oldIndex = 0;
		$advLi.mouseover(function(){
			var index = $(this).index();
			$advLi.eq(oldIndex).find('span').removeClass('tab_color');
			$advLi.eq(oldIndex).find('i').removeClass('tabon'+oldIndex);
			$(this).children('i').addClass('tabon'+index);
			$(this).children('span').addClass('tab_color');

			$tabDivs.removeClass('tabDesc').eq(index).addClass('tabDesc')
			$('#sanjiao').removeClass('tab_sanjiao'+oldIndex).addClass('tab_sanjiao'+index);
		}).mouseout(function(){
			oldIndex = $(this).index();
		})

	});
	//遮罩及表单的显示，隐藏
	$('.listenBtn,.expriceBtn,.btn-tiyan,.orderNow_btn').click(function(){
	    $('#openWidnow').show();
	    $('#mask').show();
	});
	$('#beginExp').click(function(){
		$('#promptWin').hide();
		$('#openWidnow').show();
	    $('#mask').show();
	})

	$('#mask').click(function(){
	    $('#openWidnow').hide();
	    $(this).hide();
	});
 
	//获取验证码
	 $(".tel_btn").click(function(){
	 		if (this.bAjax) {
				return;
			}
	 		var _this=this;
	 		var reTel = /^1[0-9]{10}$/;
	  	var mobile=$("#mobile3").val();
	  	if(!reTel.test(mobile)){
	  			alert("请填写正确的手机号码！");
	  			return false;
	  	}else{
	  		this.bAjax=true;
	  		$(".tel_btn").html("请稍等...");
				$.ajax({
							type:'post',
							dataType:'json',
							url:'/Ajax/sendSms',
							data:{
								"mobile":mobile
							},
							success:function(data){
								if(data.status==1){
										 timer(_this,60);
								}else{
									 _this.innerHTML="重新获取";
                    _this.bAjax=false;
                    alert(res.info)
								}
							}
				});	
			 
	  	}
			
		});
  //获取验证码
   $(".tel_btns").click(function(){
      if (this.bAjax) {
        return;
      }
      var _this=this;
      var reTel = /^1[0-9]{10}$/;
      var mobile=$("#mobile3").val();
      var imgCode = $('#authCode').val();
      if(!reTel.test(mobile)){
          alert("请填写正确的手机号码！");
          return false;
      }else if(!imgCode||(imgCode.length && imgCode.length<1)){
            alert("请填写图形验证码！");
            return false;

      }else{
        this.bAjax=true;
        $(_this).html("请稍等...");
        $.ajax({
              type:"GET",
              dataType:"jsonp",
              url: "http://www.51talk.com/passport/getMobileCode",
              data:{
                "mobile":mobile,
                authCode:imgCode
              },
              success:function(data){
                if(data.status==1){
                     timer(_this,120);
                }else{
                   _this.innerHTML="重新获取";
                    _this.bAjax=false;
                    alert(data.info);
                    if(data.status==2){
                      $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                    }
                }
              }
        }); 
       
      }
      
    });
 //倒计时
    function timer(obj,count){
        obj.innerHTML="请稍等...";
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
 	$("#submit1").on("click",function(){
			var mobile=$("#mobile3").val();
   		var mobileReg=/^1[0-9]{10}$/;
   		var password=$("#password3").val();
   		var passwordReg=/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
   		var mobileCode=$("#mobileCode").val();
   		var mobileCodeReg=/^[0-9]{5}$/;
   		if(mobile==""){
   					alert("手机号码不能为空");
   					return false;
   		};
   		if(!mobileReg.test(mobile)){
   					alert("请填写正确的手机号码");
   					return false;
   		};
   		if(mobileCode==""){
   					alert("验证码不能为空");
   					return false;
   		};
   		if(!mobileCodeReg.test(mobileCode)){
   					alert("验证码错误");
   					return false;
   		};
   		if(password==""){
   					alert("密码不能为空");
   					return false;
   		};
   		if(!passwordReg.test(password)){
   					alert("密码格式错误");
   					return false;
   		}else{
   				document.getElementById("RegForm1").submit();
   		}
 	});
  $("#submit3").on("click",function(){
    var email = $("#user_name").val();
    var emailReg=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
    var mobile=$("#mobile").val();
    var mobileReg=/^1[0-9]{10}$/;
    var password=$("#password").val();
    var passwordReg=/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
    if(email==""){
      alert("邮箱不能为空");
      return false;
    };
    if(!emailReg.test(email)){
      alert("请填写正确的邮箱地址");
      return false;
    };
    if(mobile==""){
      alert("手机号不能为空");
      return false;
    };
    if(!mobileReg.test(mobile)){
      alert("请填写正确的手机号码");
      return false;
    };
    if(password==""){
      alert("秘密不能为空");
      return false;
    };
    if(!passwordReg.test(password)){
      alert("请设置您的密码");
      return false;
    }else{
      $("#RegForm3").submit();
    }
  });
});
