/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-10-24 15:13:23
 */
define(function(require,exports,module){

	//全局参数配置
	var gconfig = {
		url: "http://wap.51talk.com:3002"
	}

	var validate = {
		isEmpty: function(value) {
			if(!value) {
				return false;
			}else{
				return true;
			}
		},
		isMobile: function(value) {
			//var reg = /(^1[3|5|8][0-9]{9}$)/;
			var reg = /^1[0-9]{10}$/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		},
		isPassword: function(value) {
			var reg = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		}
	};

	//点击抽奖
	var lottery = {
		index: 0, //当前转动到哪个位置，起点位置
		count: 0, //总共有多少个位置
		timer: 0, //setTimeout的ID，用clearTimeout清除
		speed: 20, //初始转动速度
		times: 0, //转动次数
		cycle: 40, //转动基本次数：即至少需要转动多少次再进入抽奖环节
		prize: 0, //中奖位置
		init: function(id) {
			if ($("#" + id).find(".l_prize").length > 0) {
				$lottery = $("#" + id);
				$units = $lottery.find(".l_prize");
				this.obj = $lottery;
				this.count = $units.length;
				$lottery.find(".l_prize-" + this.index).addClass("l_now");
			}
		},
		roll: function() {
			var index = this.index;
			var count = this.count;
			var lottery = this.obj;
			$(lottery).find(".l_prize-" + index).removeClass("l_now");
			index += 1;
			if (index > count - 1) {
				index = 0;
			}
			$(lottery).find(".l_prize-" + index).addClass("l_now");
			this.index = index;
			return false;
		},
		stop: function(index) {
			this.prize = index;
			return false;
		}
	};
	function roll() {
		lottery.times += 1;
		lottery.roll();
		var prize_site = $("#lottery").attr("prize_site");
		var prize1 = $("#lottery").attr("prize_name");
		if (lottery.times > lottery.cycle + 10 && lottery.index == prize_site) {
			setTimeout(function(){
				var $li = $('<li class="chick"><span>'+$("#lottery").attr("nick_name")+'</span><b>抽中'+prize1+'</b></li>');
				$(".names li").eq(3).after($li);
				$(".dialog").addClass('hide');
				$("#dialog").removeClass('hide');
				$("#dialog .box img").eq($("#lottery").attr("prize_id")).show();
				$("#dialog").find(".prizeName").html(prize1);
			},500);
			clearTimeout(lottery.timer);
			lottery.prize = -1;
			lottery.times = 0;
			click = false;

		} else {
			if (lottery.times < lottery.cycle) {
				lottery.speed -= 10;
			} else if (lottery.times == lottery.cycle) {
				var index = Math.random() * (lottery.count) | 0;
				lottery.prize = index;
			} else {
				if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
					lottery.speed += 110;
				} else {
					lottery.speed += 50;
				}
			}
			if (lottery.speed < 40) {
				lottery.speed = 40;
			}
			lottery.timer = setTimeout(roll, lottery.speed);

		}
		return false;
	}

	var click = false;

    $(function() {
        lottery.init('lottery');

        $("#lottery .pointer").click(function() {
        	var that = $(this);
            if(that.attr("send") == "1") {
            	return false;
            }
			console.log(that.attr("send"));
			lottery.speed = 100;
            $.ajax({
             type: "post",
             dataType: "json",
             url: "/Landing/dofestival",
             data:{},
             beforeSend: function () {
             	that.attr("send", "1");
             },
             success:function(res) {
                if(res.status==1){
                    $("#lottery").attr("prize_site",res.data.angle-1);
                    $("#lottery").attr("prize_id",res.data.id-1);
                    $("#lottery").attr("nick_name",res.data.nick_name);
                    $("#lottery").attr("prize_name",res.data.prize);
                    roll();
                }else {
                    $(".dialog").addClass('hide');
                    alert(res.info);
                }
                that.removeAttr("send");
              }
            });
            click = true;
            return false;
        });
    });

	/*获奖名单播放*/
	function scroll_news(){
		var nameList = $('.share_names');
		nameList.find(".name_list").animate({
			marginTop: "-0.6875rem"
		},500,'ease-in-out',function(){
			$(this).css({marginTop: "0rem"}).find("li:first").appendTo(this);
		});
	}
	setInterval(scroll_news,2000);

	/*关闭弹层*/
    $('#dialog .close').click(function(){
        $('#dialog').addClass('hide').find('img').hide();
    });
    $('#j_tip .close').click(function(){
        $('#j_tip').addClass("hide");
    });

    //验证码倒计时
	function recordTime(time){
		var time = time;
		var sendBtn = $("#send_code");
		var timer = setInterval(function(){
			time--;
			sendBtn.text(time+"s");
			if(time<0){
				sendBtn.text("重获验证码");
				sendBtn.removeClass("sending");
				clearInterval(timer);
			}
		},1000);
	}

	//发送验证码
	$('#send_code').tap(function(){
		var tel = $('#reg1_tel').val();
		if($(this).hasClass('sending')){
			return;
		}
		if(!validate.isEmpty(tel)) {
			alert('请输入您的手机号码');
			return false;
		}else if(!validate.isMobile(tel)) {
			alert('请输入正确的手机号');
			return false;
		}
		
		$.ajax({
			url:"/Ajax/sendSms",
			type:"POST",
			datatype: 'json',
			data: {
				mobile: tel
			},
			success:function(res){
				var res = JSON.parse(res);
				if(res.status == 0) {
					alert(res.info);
				}else if(res.status == 1) {
					$("#send_code").addClass("sending");
					recordTime(60);
				}
			}
		})
	});

	//注册
	var regBtn = $('#regBtn');
	var regForm = $('#regForm');
	regBtn.on('click', function() {
		var tel = $('#reg1_tel').val(),
			password = $('#reg1_passwd').val(),
			mobileCode = $("#reg1_code").val(),
			register_from = $("#register_from").val();
		if(!validate.isEmpty(tel)) {
			alert('请输入您的手机号码');
			return false;
		}else if(!validate.isMobile(tel)) {
			alert('请输入正确的手机号');
			return false;
		}
		if(!mobileCode){
			alert('请输入验证码');
			return;
		}
		if(!validate.isEmpty(password)) {
			alert('请设置您的密码');
			return false;
		}else if(!validate.isPassword(password)) {
			alert('密码长度为6~20');
			return false;
		}
		regForm.submit();
		/*$.ajax({
			url: '',
			type: 'POST',
			datatype: 'json',
			data: {
				mobile: tel,
				password: password,
				mobile_code: mobileCode,
				register_from: register_from
			},
			success: function(res) {
				var res = JSON.parse(res);
				if(res.status == 0) {
					alert(res.info);
				}else if(res.status == 1) {
					regForm.find("ul").remove();
					regForm.find(".reg_tip span").html(res.mobile);
					regForm.find(".reg_tip").removeClass("hide");
				}
			}
		});*/
	});
});
