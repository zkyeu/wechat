/*
 * sell.js
 * author:liya;
 * email: liya@51talk.com
 * date: 2016-08-31
*/
define(function(require, exports, module) {
	var dialog = require('minidialog');
	var sellFn = (function() {
		return{
			sellAjax: function(url, data, callback) {
				$.ajax({
					url: url,
					type: 'POST',
					dataType: 'json',
					data: data,
					success:function(res) {
						callback.apply(this,arguments);
					}
				})
			}
		}
	})();
	//定义变量
	var gradeLi = $('.grade-select li'),
		helpElem = $('.help'),
		prop_grade = $("#prop_grade"),
		prop_term = $("#prop_term"),
		prop_classlevel = $("#prop_classlevel"),
		prop_classtype = $("#prop_classtype"),
		prop_classtime = $("#prop_classtime"),
		class_first_date = $("#class_first_date"),
		class_last_date = $("#class_last_date"),
		prop_class = $("#prop_class"),
		gradeStatus = false,
		termStatus = false,
		classStatus = false,
		levelStatus = false,
		timeStatus = false;
	var currentSelect = function (elem) {
		var _self = $(this),
			data = _self.attr('data-grade') || _self.attr('data-semester') || _self.attr('data-classes') || _self.attr('data-level') || _self.attr('data-time');
		// if(_self.hasClass('disable') || _self.hasClass('disable-gray')) return;
		_self.addClass('current').siblings().removeClass('current');
		return data;
	};
	var onFf = true;
	var clickAbleFn = function() {
		// 都选之后请求ajax
		if (gradeStatus && termStatus && levelStatus) {
			// 请求返回值是否显示有无上课周期
	        console.log(prop_grade.val());
	        if(onFf){
	        	onFf = false;
	        	$.ajax({
		            type:"POST",
		            dataType:"json",
		            url: "/Ajax/getSpecialTimes",
		            data: {
		            	"prop_grade":prop_grade.val(),
		            	"prop_term":prop_term.val(),
		            	"prop_classlevel":prop_classlevel.val()
		            },
		            success: function(res){
		            	// 1、显示时间周期 2、显示已满 3、错误信息
		            	if(res.status==1){
		            		$('.time-select').show();
		            		$('.s-full').hide();
		            		$(".select-h").show();
		            		$(".select-h ul").html("");
		            		var arr = res.data.time_list;
		            		var str = '';
		            		for(var i = 0; i < arr.length; i++){
		            			str+="<li data-class_first_date='"+arr[i].time_start+"' data-class_last_date='"+arr[i].time_end+"'>"+arr[i].time_show_start+"-"+arr[i].time_show_end+"</li>";
		            		};
		            		$(".select-h ul").append(str);
		            	}else if(res.status==2){
		            		$(".time-select").show();
		            		$(".select-h").hide();
		            		$('.s-full').show();
		            	}else{
		            		$(".dialog").show();
	            			$(".info").html(res.info);
		            	};
		            	setTimeout(function(){
		            		onFf = true;
		            	},1000);
		            }
		        });
	        }
			

			
		}
	}
	// 判断如果本类型存在则正常进行判断 否则返回true
	if($('.sell2').find('.grade-select').length){
		gradeLi.on('click', function() {
			currentSelect.call(this);
			var grade = currentSelect.call(this);
			gradeStatus = true;
			prop_grade.val($(".grade-select .current").attr("data-grade"));
			clickAbleFn.call(this);
		})
	}else{
		gradeStatus = true;
	}
	if($('.sell2').find('.semester-select').length) {
		$('.semester-select').delegate('li', 'click', function() {
			currentSelect.call(this);
			var semester = currentSelect.call(this);
			termStatus = true;
			prop_term.val($(".semester-select .current").attr("data-semester"));
			clickAbleFn.call(this);
		})
	}else{
		termStatus = true;
	}
	if($('.sell2').find('.level-select').length){
		$('.level-select').delegate('li', 'click ', function() {
			currentSelect.call(this);
			var level = currentSelect.call(this);
			levelStatus = true;
			prop_classlevel.val($(".level-select .current").attr("data-level"));
			clickAbleFn.call(this);
		})
	}else{
		levelStatus = true;
	} 
	$('.time-select').delegate('li', 'click', function() {
		currentSelect.call(this);
		var time = currentSelect.call(this);
		timeStatus = true;
		class_first_date.val($(this).attr("data-class_first_date"));
		class_last_date.val($(this).attr("data-class_last_date"));
		$('.sell2 .footer').show().addClass('clickable');

	})
	var isCurrent = function(txt) {
		new dialog({
			html: txt,
			modal: true,
			autoHide: 1500
		});
	}
	$('.sell2 .footer').on('click', function() {
		$("#formInfo").submit();
	});
	
	// 选择周几
	$('.day-select').on('click',function(){
		$('.day-tap').show();
		return false;
	})
	//edit by sxc 2016.12.14
	$('.new-day-tap').delegate('li','click',function(){
		$('.new-day-tap li').attr('class','');
		$(this).attr('class','active');
		//var weekData = $(this).find("span").attr('data-lesson_start_week');
		var weekData = $(this).attr('data-lesson_start_week');

		//$('.day-tit').html($(this).html());
		//$(".day-tap").hide();
		$.ajax({
			url:"/Ajax/getSpecialClass",
			type: 'POST',
			dataType: 'json',
			data:{
				"prop_grade":prop_grade.val(),
            	"prop_term":prop_term.val(),
            	"prop_classlevel":prop_classlevel.val(),
            	"prop_classtype":prop_classtype.val(),
            	"class_first_date":class_first_date.val(),
            	"class_last_date":class_last_date.val(),
            	"lesson_start_week":weekData
			},
			success:function(res) {
				if(res.status == 1){
					$(".classes-list").show();
					$(".full").hide();
					var arrClass = res.data.class_list;
					$(".classes-list").html('');
					var partItem = "";
					for(var key  in arrClass){
						var listClass = arrClass[key];
						var strTime = key;
						var listItem = "";
						for(var key in listClass){
							var strClass = '';
							if(listClass[key].tag=="hot"){
								strClass="热报";
							}else if(listClass[key].tag=="quota"){
								strClass="名额紧张";
							};

							listItem += '<li class="'+listClass[key].tag+'">'+ 
											'<p class="item-t-tit" data-goods_id="'+listClass[key].id+'">'+listClass[key].name+'</p>'+
											
										'</li>';
						}
						partItem += '<section class="part-item">'+
										'<span class="item-time">'+strTime+'</span>'+
										'<ul class="item-list">'+listItem+'</ul>'+
									'</section>';
					}
					$(".classes-list").append(partItem);
					$('.sell2 .footer').hide();

				}else if(res.status == 2){
					$(".classes-list").hide();
					$(".full").show();
				}else{
					$(".dialog").show();
            		$(".info").html(res.info);
				}
			}
		})
		return false;
	})
	// 选择班
	$('.classes-list').on('click','.item-list li',function(){
		$('.part-item li').removeClass('current');
		$('.part-item .item-time').removeClass('item-now');
		$(this).addClass('current');
		$(this).parents('.part-item').find(".item-time").addClass('item-now');
		prop_class.val($(this).find(".item-t-tit").attr("data-goods_id"));
		if ($('.sell2').find('.item-now').length) {
			$('.sell2 .footer').show().addClass('clickable');
		}
		return false;
	})

	// 点击完成
	$("#finish").on("click",function(){
		$("#formFinish").submit();
	});


	// 手机号及验证码的验证
	var reTel = /^1[0-9]{10}$/;
	var reCode = /^[0-9]{5}$/;
	var telVal,codeVal;

	function optsCheck(whichOpt){//success按钮的状态判断
		if(!whichOpt)return;
		var code=$("#code").val(),
		pic_code=$("#pic_code").val(),
		tel=$("#tel").val();

		switch(whichOpt){
			case "success":
				if(code != "" && reCode.test(code) && reTel.test(tel) && pic_code!=""){
			    	$(".login-now").removeClass("cancel");
			    }else{
			    	$(".login-now").addClass("cancel");
			    }
		    break;
		    case "crcode":
			    if(reTel.test(tel)&&pic_code!=""){
			    	$(".login-get").removeClass("cancel");
			    }else{
			    	$(".login-get").addClass("cancel");
			    }
		    break;
		}
	}

	$("#tel").blur(function(){ 
		var tel = $("#tel").val();
		telVal=tel;
		if (tel == "" || !reTel.test(tel)) {
		    $('.login-phone').addClass('error');
		    $("#tel").addClass('error');
		    $("#tel").val('手机号码错误');
	    };
	    $("#tel").keyup(function(){
	    	optsCheck("crcode");	
	    })
	    
	}); 
	

	$("#tel").focus(function(){ 
		if(telVal){
			$("#tel").val(telVal);
		}else{
			$("#tel").val("");
		}
	    $('.login-phone').removeClass('error');
	    $("#tel").removeClass('error');
	}); 

	$("#pic_code").focus(function(){
		$("#pic_code").keyup(function(){
			optsCheck("crcode");	
		})
	});

	$("#code").focus(function(){
		$(this).keyup(function(){
			optsCheck("success");
		});
	});

	    
	$("#code").blur(function(){
		var code = $("#code").val();
		var tel = $("#tel").val();

		codeVal=code;
		if (code == "" || !reCode.test(code)) {
		    $("#code").addClass('error');
		    $("#code").val('验证码错误');
	    };
	    
	});
	$("#code").focus(function(){ 
		if(codeVal){
			$("#code").val(codeVal);
		}else{
			$("#code").val("");
		}
		
	    $("#code").removeClass('error');
	});
	//图片验证码refresh
	$(".login-crcode").find("article").on("click",function(){
		$(this).find("img").attr({
			src:"/ajax/verify?"+Math.random()
		});
		
	})
	// 获取验证码
	$(".login-get").click(function(){
		var code=$("#pic_code").val(),
		phone=reTel.test($("#tel").val());
		if(code==""||!phone)return;

		var url = $(".logo-list").attr("data-url");
		if (this.bAjax) {
			return;
		}
 		var _this=this;
	  	var mobile=$("#tel").val();
	  	if(!reTel.test(mobile)){
	  			$('.login-phone').addClass('error');
	  			$("#tel").addClass('error');
		    	$("#tel").val('手机号码错误');
	  			return false;
	  	}else{
	  		this.bAjax=true;
	        $.ajax({
	            type:"POST",
	            dataType:"json",
	            url: "/Ajax/sendSmsNew/0",
	            data: {
	            	"mobile":mobile,
	            	"verify_code":code
	            },
	            success: function(res){
	            	$(".login-crcode article").find("img").attr({
						src:"/ajax/verify?"+Math.random()
					});
	                if(res.status==1){
	                    timer(_this,60);
	                }else{
	                    _this.innerHTML="重新获取";
	                    _this.bAjax=false;
	                    $(".s_model .notice").removeClass('hide');
            			$(".s_model .notice").text(res.info);
            			setTimeout(function(){
            				$(".s_model .notice").addClass('hide');
            			},2000);
	                }
	            }
	        }); 
	    };
	});
	//倒计时
    function timer(obj,count){
        obj.timer=setInterval(function(){
            count--;
            if(count==0){
                obj.innerHTML= "获取验证码";
                obj.bAjax=false;
                clearInterval(obj.timer);
            }else{
                var str="重新获取("+count+"秒)";
                obj.innerHTML=str;
            }
        },1000);
    };
    // 点击立即抢购
    var codeTime=true;
    $('.login-now a').on("click",function(){
    	if($(".login-now").hasClass("cancel"))return;//模仿disabled功能
	    $(".s_model .loading").removeClass('hide');
		var tel = $("#tel").val();
	    var code = $("#code").val();
	    if (tel == "" || !reTel.test(tel)) {
		    $('.login-phone').addClass('error');
		    $("#tel").addClass('error');
		    $("#tel").val('手机号码错误');
		    return false;
	    };
		if (code == "") {
		    $("#code").addClass('error');
		    $("#code").val('验证码错误');
		    return false;
	    };
	    var mobile = $("#tel").val();
	    var mobile_code = $("#code").val();
	    var urlList1 = $(".login").attr("data-url-list1");
	    if(codeTime){
	    	$.ajax({
	            type:"POST",
	            dataType:"json",
	            url: "/Ajax/specialReg",
	            data: {
	            	"mobile":mobile,
	            	"mobile_code":mobile_code
	            },
	            success: function(res){

	            	// status=1就是未购买过 status=2就是登陆购买过的
	            	if(res.status == 1){
	            		// 增加请求  商品id 
	            		var goods_id = res.data.goods_id;
	            		$.ajax({
	            			type:"POST",
				            dataType:"json",
				            url: "/Ajax/createMultiOrder",
				            data: {
				            	"goods_id":goods_id,
				            	"img_code":$("#pic_code").val()
				            },
				            success:function(res2){
				            	if(res2.status == 1){
				            		callpay(res2.data,res2.info);
				            		
				            	}else if(res2.status == 2){
				            		window.location.href= res2.data.url;
				            	}
				            	// 微信支付接口
							    function onBridgeReady(data,order_id){
					               	WeixinJSBridge.invoke(
					                   	'getBrandWCPayRequest', JSON.parse(data),
					                   	function(res){     
					                      	var href = urlList1+order_id;
					                       	if(res.err_msg == "get_brand_wcpay_request：ok" ) {
					                            href = urlList1+order_id;
					                       	}
					                       	window.location.href= href;
					                   	}
					               	); 
					            }
					            function callpay(data,order_id){
					                if (typeof WeixinJSBridge == "undefined"){
					                   	if( document.addEventListener ){
					                       	document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					                   	}else if (document.attachEvent){
					                       	document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
					                       	document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					                   	}
					                }else{
					                   	onBridgeReady(data,order_id);
					                }
					            }
				            }
	            		})
	            			
	            		
	            	}else if(res.status == 2){
	            		window.location.href=res.data.url;
	            	}else if(res.status == 0){
	            		$(".s_model .loading").addClass('hide');
	            		$(".s_model .notice").removeClass('hide');
            			$(".s_model .notice").text(res.info);
            			setTimeout(function(){
            				$(".s_model .notice").addClass('hide');
            			},1000);
	            	}
	            }
	        }); 
	    }
	    codeTime=false;
		setTimeout(function(){
			codeTime=true;
    		$(".s_model .loading").addClass('hide');
		},2000);

	});
	
	
	// 点击我知道了关闭弹窗
	$(".know a").on("click",function(){
		$(".dialog").hide();
	})
	

})