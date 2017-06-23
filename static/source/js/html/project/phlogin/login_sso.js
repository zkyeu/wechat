define('login_sso',['formCheck','silder'],function(require,exports,module){
	require("formCheck");
	function Common(){
		this.topTemp = $(window).scrollTop();//用来判断上滚动下滚动
		this.directory = $("body").data("directory");//用来判断是否是为首页
	};
	var domain = document.domain;
	$.extend(Common.prototype,{
		init:function(){
			this.bindEvents();
			//this.regCheck();
			if($(".m-main2 iframe").length==0){
				this.ssoLogin();
			}
			this.loginLogic();
			this.regLogic();
			this.placeholder();
		},
		bindEvents:function(){
		},
		loginLogic:function(){
			var self =this;
			var regJson = {
						"user_name":{//手机号
							"reg":/./i,
							"error":"user's name is wrong ",
							"empty":"please input your user name"
						},
						"password2":{
							"reg":/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/,
							"error":"password format is worong",
							"empty":"password can't empty"
						}
					};
			if($("[name='lang']").val()=="zh-cn"){
				regJson = {
						"user_name":{//手机号
							"reg":/./i,
							"error":"用户名错误",
							"empty":"请输入您的用户名"
						},
						"password2":{
							"reg":/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/,
							"error":"请输入6位长的密码",
							"empty":"密码不能为空"
						}
					};
			}

			if($("[name='user_type']").val()!="teacher"){
				regJson.user_name.reg=/[a-z0-9\+_\-]$/;
			}

			$("#LoginForm").formCheck({
					"focus"	:true,
					"alertType":"left",
					"json":regJson
			}).on("submit",function(){

					//及时验证用户名+密码
					var oForm=$(this);
					if(oForm.attr("submited")) return true;

					var login_la = $('#login_la').val();
			        var public_key = $('#public_key').val();
			        var password = $('#password2').val();

					if(!public_key){
			        	//$('#username').closest('li').addClass('u-error').find('.u-err').html("您的用户名或密码错误");
			        	ssoController.getPublicKey();

			        }
			        var encrypt = new JSEncrypt();
			        encrypt.setPublicKey(public_key);
			        var encrypted = encrypt.encrypt(password);
			        $("#password").val(encrypted);
					if(!encrypted || encrypted=="false"){
			          $("#password").val(hex_md5(password));
			        }
			        if(!login_la){
			        	ssoController.preLogin();
			        }else{
				       	//收起错误信息
				       	$("#password2").removeAttr('name');
				       	 self.startLogin();
			        }
			        return false;
			});
		},
		regLogic:function(){
			//验证注册
			this.regCheck();
		},
		regCheck:function(){
			$(".m-reg form").formCheck({
				"focus"	:true,
				"alertType":"bottom"
			}).on("submit",function(){
				$(this).attr("submited", "true");
			});
				//注册手机号失焦判断
			var iptsInput = $(".m-ipts li").eq(0).find("input");
			iptsInput.blur(function(){
				var reTel = /^1[0-9]{10}$/;
				var tel = $(this).val();
				if (!reTel.test(tel)) {
					$(this).closest("dl").next(".u-err").show();
					$(this).closest("dl").next(".u-err").html("请填写正确的手机号码");
					return false;
				}

				var mobileName = iptsInput.val();
				$.ajax({
		            url: "/Ajax/homeMobilEvalidate",
		            data: {"mobile":mobileName},
		            type: "POST",
		            dataType:"json",
		            success:function(res){
		            	if(res.status=="0" || res.status=="2") {
		            		$(".notice-mast-box").show();
		            		$(".m-notice").find("p").html(res.info);
		            		$(".duosuo-success,.duosuo-fail").remove();
		            	}        	
		            }
				});
			});
			//注册登录优化--若您有推荐人/推荐码，请点这里--20160315--张天
			$(".referral-code").on("click",function(){
				$(this).hide();
				$(this).next("dl").show();
				$(".m-referral").removeClass("m-referral");
			});
			//点击提示框的换个号码注册
			$(".sub-left").on("click",function(){
				if($(".m-main2").length>0){
					var subInputM = $(".m-main2 iframe").get(0).contentWindow.$(".m-ipts input[name='mobile']");
				}else{
					var subInputM = $(".m-ipts").find("input[name='mobile']");
				}
				
				$(".notice-mast-box").hide();
				subInputM.focus();
				subInputM.val("");
			});
			//点击提示框的登录
			$(".sub-left").next("li").on("click",function(){
				$(".notice-mast-box").hide();
				if($(".m-main2").length>0){
					var tel = $(".m-main2 iframe").get(0).contentWindow.$(".m-ipts input[name='mobile");
					var subInput = $(".m-main2 iframe").get(0).contentWindow.$(".m-log input[name='user_name']");
					$(".m-main2 iframe").get(0).contentWindow.$(".m-main").toggleClass('turn').children().css("z-index",3).eq(1).css("z-index",4);
					var mlog = $(".m-main2 iframe").get(0).contentWindow.$('.m-log');
				}else{
					var tel = $('.m-ipts').find("input[name='mobile']");
					var subInput = $(".m-log").find("input[name='user_name']");
					$(".m-main").toggleClass('turn').children().css("z-index",3).eq(1).css("z-index",4);
					var mlog = $(".m-log");
				}

				if("placeholder" in document.createElement("input")){
					subInput.val(tel.val()).focus();
					mlog.find("input[name='password']").focus();
				}else{
					subInput.val(tel.val()).next().focus();
					mlog.find("input[name='password']").next().focus();
				}
				tel.val("");
			});
		},
		startLogin:function(){
			$.ajax({
                	url:$("#LoginForm").attr("action"),
                	type:"post",
                	data:{
                		user_name: $("#user_name").val(),
                		password : $("#password").val(),
                		la :$('#login_la').val(),
                		client:$("#client").val(),
                		lang : $("#lang").val(),
                		from_url:$("#from_url").val()
                	},
                	success : function(data){
                		if(data.code == 10000){
							if(data.res.from_url){
								window.location.href= data.res.from_url;
							}else{
								window.location.reload();
							}
						}else{
							$(".tipmessage").removeClass("hide").html(data.message);
							$("#password2").attr('name',"password2");
							if($("#lang").val()=="english"){
								$("#LoginForm").removeAttr("submited").find('.jsSubmit').val("Sign In");
							}else{
								$("#LoginForm").removeAttr("submited").find('.jsSubmit').val("登 录");
							}
												
						}
                	}
            });
            if($("#lang").val()=="english"){
            	$("#LoginForm").attr("submited",true).find('.jsSubmit').val("logging in...");
            }else{
            	$("#LoginForm").attr("submited",true).find('.jsSubmit').val("正在登录");
            }
		},
		ssoLogin:function(){
			var self = this;
			window.ssoController = {
					preLogin:function(){
						$.ajax({
				            url: 'http://'+domain+'/sso/prelogin',
							data: {client:$("#client").val()},
				            type: 'get',
				            success: function(ret) {
				                $('#login_la').val(ret.res.la);
				                //收起错误信息
				                $("#password2").removeAttr('name');
				                self.startLogin();
								//$("#LoginForm").attr("submited",true).submit().find('li.u-error').removeClass('u-error').end().find('.jsSubmit').val("登录...");
				            }
				        });
					},
					feedBack: function(dataObj){
						var data = eval(dataObj);
						if(data.code == 10000){
							if(data.from_url){
								window.location.href= data.res.from_url;
							}else{
								window.location.reload();
							}
						}else{
						$('#password').blur().closest('li').addClass('u-error').find('.u-err').html(data.msg);
						$("#password2").attr('name',"password2");
						$("#LoginForm").removeAttr("submited").find('.jsSubmit').val("登录");					
						}
					},
					getPublicKey:function(){
						var client_id = $('input[name=client]').val() || 1;
						if($("#public_key").val()){
							return;
						}
						$.ajax({
				            url: 'http://'+domain+'/sso/publickey',
				            dataType: 'jsonp',
				            jsonpCallback: 'pubkeyCallBack',
				            data: {'client':client_id},
				            type: 'get',
				            success: function(ret) {
				                $("#public_key").val(ret.res.rsa_pub);
				            }
				        });
					}
			};
			(function(){
				var loginForm=$("#LoginForm");
			    var hidden3='<input type="hidden" name="public_key" id="public_key" />'+
			                '<input type="hidden" name="la" id="login_la" />';
			    loginForm.append(hidden3);
			    //$("#autologin").attr( "checked", true );
			    // prelogin
			    ssoController.getPublicKey();
			    $('#user_name').blur(function(){
			        $.ajax({
			            url: 'http://'+domain+'/sso/prelogin',
			            dataType: 'jsonp',
			            jsonpCallback: 'preLoginCallBack',
			            data: loginForm.serialize(),
			            type: 'get',
			            success: function(ret) {
			                $('#login_la').val(ret.res.la);
			            }
			        });
			        return false;
			    }).focus(function(){
			    	ssoController.getPublicKey();
			    });
			    $("input").focus(function(){
			    	$(".tipmessage").addClass("hide");
			    })
			    $('#password').focus(function(){
			    	ssoController.getPublicKey();
			    });
			})();
		},
		placeholder:function(){
			if("placeholder" in document.createElement("input")) return;
			var defaultColor="#ccc";
			$(":input:visible").each(function(){
				var oInput=$(this);
				var placeholder=oInput.attr("placeholder");
				if(!placeholder) return true;
				if(this.type.toLowerCase()=="textarea"){
					var oSpan=$('<textarea>');
				}else{
					var oSpan=$('<input>');
				}
				oSpan.addClass(oInput.attr("class")).val(placeholder).css("color",defaultColor);
				oInput.after(oSpan);
				oSpan.focus(function(){
					oSpan.hide();
					oInput.show().focus();
				});
				oInput.blur(function(){
					if(this.value==""){
						oInput.hide();
						oSpan.show();
					}
				});
				if(this.value==""){
					oSpan.show();
					oInput.hide();
				}else{
					oSpan.hide();
				}
			});
		},
		onlineAsk:function(){
			var timer=null;
			var sAlertOnline='<div class="alert_online">'+
						'<a href="javascript:;" class="u-close"></a>'+
						'<a href="javascript:;" class="u-btn"></a>'+
					'</div>';
			var oAlertOnline=$(sAlertOnline);
			oAlertOnline.find('.u-close').on("click",function(){
				oAlertOnline.fadeOut();
				localStorage.qqzx_close=1;
			}).end().find('.u-btn').on("click",function(){
				//打开qq企业客服
				window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=4006320051&aty=0&a=0&curl=&ty=1', '_blank', 'height=544px, width=644px,toolbar=no,scrollbars=no,menubar=no,status=no');
			});
			if(localStorage.qqzx_close!=1){
				timer=setTimeout(function(){
					$("body").append(oAlertOnline.show());
				},30000);
				$(".video_play").on("click", function(){
		        	clearTimeout(timer);
		        });
			}
		}

	});

	var common =  new Common();
	common.init();
	exports.common = common;
	// 微信侧栏
	$('.bar-list li').mouseover(function(){
    var index = $(this).index();
    $(".b-hover").removeClass("b-hover-moveDown").addClass("b-hover-moveIn");
    if(index==0){
      $(".b-hover").removeClass("b-hover02").removeClass("b-hover03");
      $(".u-b-ntkf").show();
      $(".link-hover").hide();
    }
    if(index==1){
      $(".b-hover").addClass("b-hover02").removeClass("b-hover03");
      $(".u-b-ntkf,.link-hover").hide();
    }
    if(index==2){
      $(".b-hover").addClass("b-hover03").removeClass("b-hover02");
      $(".u-b-ntkf").hide();
      $(".link-hover").show();
    }
    $('.b-hover').animate({
        top: index * 100
    },200)
	})

	$('.rt-side-bar').mouseleave(function(){
		$(".b-hover").removeClass("b-hover-moveIn").addClass("b-hover-moveDown")
		setTimeout(function(){
			$(".u-b-ntkf,.link-hover").hide();
			;
		},100)
	}).mouseover(function(){
		$(".b-hover").show();

	});
	//客服聊天点击统计
	$(".u-b-ntkf").on("click",function(){
		var type=$(this).attr("data-type");
		var url=$(this).attr("data-url");
		$.ajax({
      url: url,
      data: {"type":type},
      type: "POST"
    });
	});
	$(".link-hover").click(function(){
		$(".b-hover").hide();
		$(".b-hover03").hide();
		window.open('http://www.51talk.com/app/download_app.php');
	});
	//在线咨询弹窗
	(function(){
		var timer=null;
		var sAlertOnline='<div class="alert_online">'+
					'<a href="javascript:;" class="u-close"></a>'+
					'<a href="javascript:;" class="u-btn"></a>'+
				'</div>';
		var oAlertOnline=$(sAlertOnline);
		oAlertOnline.find('.u-close').on("click",function(){
			oAlertOnline.fadeOut();
			localStorage.qqzx_close=1;
		}).end().find('.u-btn').on("click",function(){
			//打开qq企业客服
			window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=4006320051&aty=0&a=0&curl=&ty=1', '_blank', 'height=544px, width=644px,toolbar=no,scrollbars=no,menubar=no,status=no');
		});
		if(localStorage.qqzx_close!=1){
			timer=setTimeout(function(){
				$("body").append(oAlertOnline.show());
			},30000);
			$(".video_play").on("click", function(){
	        	clearTimeout(timer);
	        });
		}
	})();
});