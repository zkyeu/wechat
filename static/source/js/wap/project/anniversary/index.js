/**
 *
 * @authors vincent (wuyan@51talk.com)
 * @date    2017-05-27 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	
    var anniversary = {
    	init: function(){
    		this.prize_num = $("#lottery h3 span").html();
    		this.ajax_able = true;//是否可以调用ajax接口
    		//$(".mask").css({"display":"block"});
    		this.initShare();
    		$(".coupon").on("click", this.getCoupon);
    		$(".mypop").on("click", this.closePop);
    		$(".get_rule").on("click", this.showRules);
    		$(".pointer").on("click", this.getPrise);
    		$(".share").on("click", this.getSharePrise);
    		$("#cancle-share").on("click", this.closeMyPop);
    		$(".save_address .commit").on("click",this.saveAddress);
    		$(".pop_model .close").on("click",this.closeMyPop);
    		$(".course_list a").on("click",this.topay);
    		window.onscroll = function(){
		        $('.lazy').each(function(){
					if($(window).scrollTop() + window.innerHeight > $(this).offset().top){
		            	anniversary.images($(this));
					}
		        });
		    }
    	},
    	images: function(imgobj){
    		var img = new Image();
	        var imgsrc=imgobj.attr('imgsrc');
	        img.onload = function () {
	            if(img.complete == true){
	                imgobj.attr('src', imgsrc);
	                imgobj.removeClass('lazy');
	                imgobj.removeAttr('imgsrc');
	            }
	        };
	        img.src = imgsrc;
    	},
    	initShare: function(){
    		var appType = $('#app-type').val();  //1微信、0 app
			$.ajax({
	            url:'/landing/shareWx',
	            type:"GET",
	            dataType: "json",
	            success : function(res){
	                if(res.status == 1){
		                if (appType == '1') {
	                        anniversary.updateWeixinShare(res);
	                    }
		            }
	            }
	        });
    	},
    	topay: function(){
    		var user_id = $("#user_id").val();
    		if(user_id){
    			var url = $(this).data("url");
    			window.location.href = url;
    		}else{
    			window.location.href = "/landing/double12Login?type=anniversary";
    		}
    	},
    	scroll_news: function(){
    		var firstNode = $('.names li');
			firstNode.eq(0).fadeOut('slow',function(){ //获取li的第一个,执行fadeOut
				$(this).clone().appendTo($(this).parent()).show('slow'); //把每次的li的第一个克隆，然后添加到父节点 对象。
				$(this).remove();//去掉每次的第一个li。
			});
    	},
    	closeMyPop: function(){
    		$(this).closest(".pop_model").css({"display":"none"});
    		$(".mask").css({"display":"none"});
    	},
    	saveAddress: function(){
    		var name = $(".user_name").val();
    		var phone = $(".phone").val();
    		var address = $(".place").val();
    		var reTel = /^1[0-9]{10}$/;
    		if(!name){
    			$(".warn h4").html("请填写姓名");
    			$(".warn").css({"visibility":"visible"});
    			return false;
    		}
    		if(!phone){
    			$(".warn h4").html("请填写电话");
    			$(".warn").css({"visibility":"visible"});
    			return false;
    		}
    		if (!reTel.test(phone)) {
				$(".warn h4").html("请填写正确格式的手机号码");
    			$(".warn").css({"visibility":"visible"});
				return false;
			}
    		if(!address){
    			$(".warn h4").html("请填写奖品邮寄地址");
    			$(".warn").css({"visibility":"visible"});
    			return false;
    		}
    		$.ajaxRequest("/landing/addUserAddr",{tel: phone, address: address, real_name: name},function(res){
			  	if(res.status == 1){
	                $(".save_address").css({"display":"none"});
	                $(".mask").css({"display":"none"});
	            }
			});
    	},
    	getSharePrise: function(){
    		var appType = $('#app-type').val();  //1微信、0 app
    		
            
	        $.ajaxRequest("/landing/shareWx","",function(res){
			  	if(res.status == 1) {
                    
                    $(".mask").css({"display":"block"});
                    var sUserAgent = navigator.userAgent.toLowerCase();
			      	var bIsQQ = sUserAgent.match(/qq/i) == "qq";
			      	if(bIsQQ){
			          	$('.weixin-share-tip').removeClass('hide').css({"display":"block"});
			          	return false;
			      	}
                    appType == '1' && $('.weixin-share-tip').removeClass('hide').css({"display":"block"});
                    appType == '0' && $('.share-cont').removeClass('hide').css({"display":"block"});
                }
               
			});
    	},
    	updateWeixinShare: function(res){
    		var wx_tit = $('#wx-title').val();
	        var wx_des = $('#wx-description').val();
	        var wx_img = $('#wx-imgUrl').val();
	        var shareUrl = "http://" + $('#share_url').val();
	        wx.config({
	            debug: false,
	            appId: res.data.appId,
	            timestamp: res.data.timestamp,
	            nonceStr: res.data.nonceStr,
	            signature: res.data.signature,
	            jsApiList: ['checkJsApi',
	                'onMenuShareTimeline',
	                'onMenuShareAppMessage',
	                'onMenuShareQQ',
	                'onMenuShareWeibo',
	                'hideMenuItems',
	                'showMenuItems',
	                'hideAllNonBaseMenuItem',
	                'showAllNonBaseMenuItem',
	                'openCard'
	            ]
	        });
    		wx.ready(function() {
    			// alert(wx_tit + "::::::::" + wx_des + ":::::::::::" + wx_img);
	            wx.onMenuShareAppMessage({  //分享给朋友
	                title: wx_tit,
	                desc: wx_des,
	                // link: res.data.url
	                link: shareUrl,
	                imgUrl: wx_img
	            });
	            wx.onMenuShareQQ({ //qq
	                title: wx_tit,
	                desc: wx_des,
	                link: shareUrl,
	                imgUrl: wx_img
	            });
	            wx.onMenuShareTimeline({  //朋友圈
	                title: wx_tit,
	                desc: wx_des,
	                link: shareUrl,
	                imgUrl: wx_img
	            });
	            wx.onMenuShareQZone({  //qq空间
	                title: wx_tit,
	                desc: wx_des,
	                link: shareUrl,
	                imgUrl: wx_img
	            });
	            wx.onMenuShareWeibo({  //微博
	                title: wx_tit,
	                desc: wx_des,
	                link: shareUrl,
	                imgUrl: wx_img
	            });

	        });
	        wx.error(function(res){
			    console.log(res);
			});
    	},
    	getPrise: function(){
    		$(this).toggleClass('click_pointer');
    		// var item = anniversary.rnd(0,7);

	     //  switch (item) {
	     //   case 1:
	     //     var angle = [26, 88, 137, 185, 235, 287, 337];
	     //     anniversary.rotateFn(0, 337, '未中奖');
	     //     break;
	     //   case 2:
	     //     var angle = [88, 137, 185, 235, 287];
	     //     anniversary.rotateFn(1, 26, '免单4999元');
	     //     break;
	     //   case 3:
	     //     var angle = [137, 185, 235, 287];
	     //     anniversary.rotateFn(2, 88, '免单50元');
	     //     break;
	     //   case 4:
	     //     var angle = [137, 185, 235, 287];
	     //     anniversary.rotateFn(3, 137, '免单10元');
	     //     break;
	     //   case 5:
	     //     var angle = [185, 235, 287];
	     //     anniversary.rotateFn(4, 185, '免单5元');
	     //     break;
	     //   case 6:
	     //     var angle = [185, 235, 287];
	     //     anniversary.rotateFn(5, 185, '免单5元');
	     //     break;
	     //   case 7:
	     //     var angle = [235, 287];
	     //     anniversary.rotateFn(6, 235, '免分期服务费');
	     //     break;
	     //   case 8:
	     //     var angle = [287];
	     //     anniversary.rotateFn(7, 287, '提高白条额度');
	     //     break;
	     //    case 9:
	     //     var angle = [287];
	     //     anniversary.rotateFn(7, 287, '提高白条额度');
	     //     break;
	     //    case 10:
	     //     var angle = [287];
	     //     anniversary.rotateFn(7, 287, '提高白条额度');
	     //     break;
	     //  }
	     //  console.log(item);

		  $.ajaxRequest("/landing/doanniversary","",function(res){
		  	if(res.status == 1){
		  		if(res.data == 1){
		  			$(".noprise").css({"display":"block"});
		        	$(".mask").css({"display":"block"});
		  		}else{
		  			anniversary.rotateFn(res.data.id, res.data.angle, res.data.prize, res.data.mobile);
		  		}
                
            }
		  });
    	},
    	rotateFn: function(id, angle, prize, mobile){
    		$('#rotate').stopRotate();
		    $('#rotate').rotate({
		        angle:0,
		        animateTo:angle+1800,
		        duration:8000,
		        callback:function (){
		        	
		        	if(anniversary.prize_num > 0){
		        		anniversary.prize_num--;
		        		$("#lottery h3 span").html(anniversary.prize_num);
		        		var $li = $('<li><span>'+mobile+'</span><b>学员抽中 '+prize+'</b></li>');
		          		$(".name_list li").eq(4).after($li);
		          		$(".empty_prise").addClass('hide');
		        		if(id != 10){
		        			$(".save_address")
		        			.find(".prise_name")
		        			.html(prize)
		        			.end()
		        			.find("img")
		        			.addClass("hide")
		        			.end()
		        			.find("img[data-img='prize_"+id+"']")
		        			.removeClass("hide")
		        			.end()
		        			.css({"display":"block"});
		        		}
		        		$(".prize_desc")
	        				.eq(0)
	        				.find("h3")
	        				.html("恭喜您获得" + prize)
	        				.end()
	        				.find(".myprize")
	        				.addClass("hide")
		        			.end()
	        				.find("img[data-img='prize_"+id+"']")
		        			.removeClass("hide")
		        			.end()
		        			.css({"display":"block"});
		        		$(".user_name").val("");
    					$(".phone").val("");
    					$(".place").val("");
		        		if(id == 10){
		        			$(".noprise").find(".content").addClass('hide').end().find(".fighting").removeClass('hide').end().css({"display":"block"});
		        			var hasPrise = $("#hasPrise").val();
		        			$(".save_address").css({"display":"none"});
		        			if(hasPrise != 1){
		        				$(".prize_desc").eq(0).find("h3").html("您未中奖请再接再厉！");
		        			}
		        			
		        			
		        		}

		        		$(".mask").css({"display":"block"});
		        	}else{
		        		$(".noprise").css({"display":"block"});
		        		$(".mask").css({"display":"block"});
		        	}
		          
		        }
		      });
    	},
    	rnd: function(n, m){
    		return Math.floor(Math.random()*(m-n+1)+n)
    	},
    	getCoupon: function(){
    		var money = $(this).data("money");
    		var that = this;

    		$.ajaxRequest("/landing/getCoupons",{money: money},function(res){
			  	if(res.status == 1){
	                $(".get_coupon").find(".money").html(money + "元").end().css({"display":"block"});
	                $(that).find("img").addClass("hide").end().find(".grey").removeClass("hide");
    				$(".mask").css({"display":"block"});
	            }
			});
    	},
    	closePop: function(){
    		$(this).closest(".mypop").removeClass("hide").css({"display":"none"});
    		$(".mask").css({"display":"none"});
    	},
    	showRules: function(){
    		var useArray = ["1. 本活动优惠券有效时间为：2017.06.07至2017.06.11。",
    		"2. 每单限用一张优惠券，一次性使用，不得找零。",
    		"3. 不可与其它优惠券叠加使用。",
    		"4. 如购课时未使用本活动优惠券，则视为自动放弃。",
    		"5. 本活动优惠券不可退换，超过有效时间将无法使用。",
    		"6. 本活动优惠券与账户绑定，不可转让，不可提现。"];
    		var prizeArray = [
    		"1.抽奖时间：6月7日00：00~6月11日23：59。",
    		"2.抽奖规则：每人均有3次初始抽奖机会，每求助一位好友，可增加一次抽奖机会，同一好友不能重复赠送。",
    		"3.领取奖品方式：抽中实物奖品后，请正确填写邮寄信息，否则视为自动放弃奖品。",
    		"4.实物奖品将在活动结束后20个工作日内发放完毕。","5.实物奖品港澳台及国外不包邮。",
    		"6.如发现任何违规行为，则抽取的奖品将统一清零。",
    		"7.奖品图案仅供参考，以实物为主。",
    		"8.活动所有解释权归51Talk所有。"];
    		var start_time = $("#start_time").val();
    		var end_time = $("#end_time").val();
    		useArray[0] = "1. 本活动优惠券有效时间为：" + start_time + "至" + end_time + "。";
    		prizeArray[0] = "1.抽奖时间：" + start_time + " 00:00~" + end_time + " 23:59。";
    		var list = "";
    		if($(this).hasClass("prize_rule")){
    			$(".rule .list").css({"background-size":"100% 12rem"});
    			prizeArray.forEach(function(elem) {
    				list = list + "<li>" + elem + "</li>";
    			})
    		}else{
    			$(".rule .list").css({"background-size":"contain"});
    			useArray.forEach(function(elem) {
    				list = list + "<li>" + elem + "</li>";
    			})
    		}

    		$(".rule").find("ul").html(list);
    		$(".rule").css({"display":"block"});
    		$(".mask").css({"display":"block"});
    	}
    };
    $.extend(true,$,{
        ajaxRequest: function(url, params, callback, settings){
            if(anniversary.ajax_able){
            	anniversary.ajax_able = false;
            	$(".loading").css({"display":"block"});
            	$.ajax({
	                url: url,
	                type: (settings && settings.method) || "GET",
	                dataType: (settings && settings.dataType) || "json",
	                data: params,
	                success: function(response){
	                	$(".loading").css({"display":"none"});
	                	anniversary.ajax_able = true;
	                	if(response.status == 1){
		                    !!callback && callback(response);
		                }else if(response.status == -1){
							window.location.href = response.data;
			            }else{
							alert(response.info);
			            }
	                },
	                error: function(){
	                	$(".loading").css({"display":"none"});
	                	anniversary.ajax_able = true;
	                	console.log("fail")
	                }
	            })
            }

            
        }
        
    });
    $(function(){
       
        anniversary.init();
        setInterval(anniversary.scroll_news,2000);
    });
  
});



