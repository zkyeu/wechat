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
				$(".dialog").hide();
				$("#dialog").show();
				$("#dialog .box img").eq($("#lottery").attr("prize_id")).show();
				$("#dialog").find(".prizeName").html(prize1);
				$('#dialog2 .text1 h3').text(prize1);
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

        //$('#dialog2').show().find(".tip-2").show();

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
             url: gconfig.url + "/Activity/dofestival",
             data:{},
             beforeSend: function () {
             	that.attr("send", "1");
             },
             success:function(res) {
             	console.log("res===========" + JSON.stringify(res))
                if(res.status==1){
                    $("#lottery").attr("prize_site",res.data.angle-1);
                    $("#lottery").attr("prize_id",res.data.id-1);
                    $("#lottery").attr("nick_name",res.data.nick_name);
                    $("#lottery").attr("prize_name",res.data.prize);
                    roll();
                   
                }else if(res.status<=-1){
                    $(".dialog").hide();
                    alert(res.info);
                }else{
                    if(res.data){
                        $(".dialog").hide();
                        //$(".sysInfo").show();
                        
                    }else{
                        $(".dialog").hide();
                    }
                }
                that.removeAttr("send");
              }
            });
            click = true;
            return false;
        });

        //buildCourseList();
    });

	/*获奖名单播放*/
	function scroll_news(){
		var firstNode = $('.names li');
		firstNode.eq(0).fadeOut('slow',function(){ //获取li的第一个,执行fadeOut
			$(this).clone().appendTo($(this).parent()).show('slow'); //把每次的li的第一个克隆，然后添加到父节点 对象。
			$(this).remove();//去掉每次的第一个li。
		});
	}
	setInterval(scroll_news,2000);

	/*关闭弹层*/
    $('#dialog .close').click(function(){
        $('#dialog').hide().find('img').hide();
    });
    $('#dialog2 .close').click(function(){
        $('#dialog2').hide().find('.tip').hide();
    });

	/*获奖记录*/
	$('#prize_log').click(function(){
		var that = $(this);
    	console.log(that.attr("send"));
        
        if(that.attr("send") == "1") {
        	return false;
        }

		$.ajax({
			url: '/Activity/getUserLottery',
			data: {},
			type: 'POST',
			dataType: 'json',
			beforeSend: function () {
         		that.attr("send", "1");
         	},
			success: function(rs){
				var text = rs.data;
				if(rs.status == 1){
					$('#dialog2').show().find(".tip-1").hide();
					$('#dialog2').show().find('.tip-2').show().find('h3').text(text);
				}else if(rs.status == 0){
					$('#dialog2').hide();
					$(".sysInfo").show();

				}else{
					$('#dialog2').show().find('.tip-2').hide();
					$('#dialog2').show().find(".tip-1").show();
				}

				that.removeAttr("send");
			}
		});
	});

    //查看更多课程

    //查询课程
    function buildCourseList() {
    	var html = "";
    	for(var i=0; i<3; i++) {
    		html +='<li>'+
                '<img alt="" src="/images/wap/learning11/s'+ (i+1) +'.png">'+
                '<div class="text">'+
                    '<p class="package_name">270次次卡学习套餐</p>'+
                    '<p class="desc">'+
                        '<span class="low">低至</span>'+
                        '<span class="price_new">￥8798</span>'+
                        '<span class="price_old">￥10388</span>'+
                    '</p>'+
                '</div>'+
                '<span class="label hot"></span>'+
                '<a href="" class="btn_buy">一键抢购</a>'+
            '</li>'
    	}
    	$("#course").html(html);
    }

});
