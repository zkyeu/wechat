/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define('common/common',['formCheck','silder'],function(require,exports,module){
	require("formCheck");
	require("silder");
	if($(".m-main2 iframe").length>0){
		document.domain="51talk.com";
	}
    $.fn.lavaLamp = function(o) {
        o = $.extend({
            fx: "linear",
            speed: 500,
            click: function() {}
        },
        o || {});
        return this.each(function() {
            var b = $(this),
            noop = function() {},
            $back = $('<li class="back"><div class="left"></div></li>').appendTo(b),
            $li = $("li", this),
            curr = $("li.current", this)[0] || $($li[0]).addClass("current")[0];
            $li.not(".back").hover(function() {
                move(this)
            },
            noop);
            $(this).hover(noop, 
            function() {
                move(curr)
            });
            $li.click(function(e) {
                /*setCurr(this);
                return o.click.apply(this, [e, this])*/
            });
            setCurr(curr);
            function setCurr(a) {
            	if($(a).text()=="首 页"){
            		//var left = (a.offsetLeft-40);
            		var left = a.offsetLeft+7;
            	}else if($(a).text().length==3){
            		//var left = (a.offsetLeft-34);
            		var left = a.offsetLeft+16;
            	}else{
            		var left = a.offsetLeft+26;
            		//var left = (a.offsetLeft-25)
            	}
                $back.css({
                    "left": left + "px",
                    "width": 80 + "px"
                });
                curr = a
            };
            function move(a) {
            	if($(a).text()=="首 页"){
            		//var left = (a.offsetLeft-40);
            		var left = a.offsetLeft+7;
            	}else if($(a).text().length==3){
            		//var left = (a.offsetLeft-34);
            		var left = a.offsetLeft+16;
            	}else{
            		var left = a.offsetLeft+26;
            		//var left = (a.offsetLeft-25)
            	}
                $back.each(function() {
                    $.dequeue(this, "fx")
                }).animate({
                    width: 80,
                    left: left
                },
                o.speed, o.fx)
            }
        })
    }
	function Common(){
		this.topTemp = $(window).scrollTop();//用来判断上滚动下滚动
		this.directory = $("body").data("directory");//用来判断是否是为首页
	};
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
			this.videoPlay();
		},
		bindEvents:function(){
			this.navMouseHover();
			this.topHeaderScroll();
			this.lazyloadImage();
			this.mediumTab();
			this.loginTransform();
			this.backToTop();
			this.eleMouseover();
		},
		eleMouseover:function(){
		     $(".jsMore").hover(function(){
	            clearTimeout(this.timer2);
	            var _this=this;
	            this.timer1=setTimeout(function(){
	                $(_this).find(".jsUl").show();
	            },300);
	        },function(){
	            clearTimeout(this.timer1);
	            var _this=this;
	            this.timer2=setTimeout(function(){
	                $(_this).find(".jsUl").hide();
	            },300);
	        })
		},
		topHeaderScroll:function(){
			$(".g-weibo").mouseover(function(){
				$(".weibo").fadeIn();
			});
			$(".g-weibo").mouseleave(function(){
				$(".weibo").fadeOut();
			});
			//头部 导航滚动效果控制
			var self = this;
			var top1 =  $(window).scrollTop();
			if(top1>0 && (this.directory=="index")){
				$(".wrap-nav").css({"background":"#fff"});
				$(".back").addClass("yello");
			}
			$(window).scroll($.proxy(function(e){
			var top = $(window).scrollTop();
				topTemp = this.topTemp;

				if(top>topTemp){
					if((top/18)>0 && (top/18)<32){
						var t1 = -top/18;
						//$(".wrap-nav").css({'transform':'translateY('+t1+'px)'});
						$(".wrap-nav").css({'top':(t1+'px')});
						if(this.directory=="index"){
							$(".wrap-nav").css({"background":"#fff"});
							$(".back").addClass("yello");/**/
						}
					}else{
						if(top<=0){
							$(".wrap-nav").css({"top":0});
						}else{
							$(".wrap-nav").css({"top":"-31px"});
						
						}
						$(".back").addClass("yello");
					}
				}else{
					if((top/18)<=31){
						var t1 = -top/18;
						if(top/18>0){
							$(".wrap-nav").css({'top':(t1+'px')});
						}else{
							$(".wrap-nav").css({'top':(0+'px')});
						}
						
					}
				}
				this.topTemp = top;
			},this));	
		},
		navMouseHover:function(){
			//一级导航hover效果
		    $(".menu").lavaLamp({
	            fx: "backout", 
	            speed: 700,
	            click: function(event, menuItem) {
	                return false;
	            }
			});
		},
		lazyloadImage:function(){
			//懒加载图片
			var oWin=$(window);
		    var aImg=$("img[data-src]");
		    oWin.on("load scroll resize",function(){
		        var scrollT=oWin.scrollTop();
		        aImg.each(function(){
		            //if(this.src)return true;
		            var oImg=$(this);
		            if(scrollT+oWin.height()>=oImg.offset().top){
		            	oImg.attr("src",oImg.data("src"));
		            	oImg.removeAttr("data-src");
		              
		            }
		        });

		    });
		},
		mediumTab:function(){
			//媒体合作切换
			$(".m-medium h2 a").click(function(){
				var index =  $(".m-medium h2 a").index($(this));
				$(".m-medium .list").hide().eq(index).show();
				$(this).addClass("selected").siblings().removeClass("selected");
			});
		},
		loginTransform:function(){
			//登录 注册翻转
			$(".m-main .m-tab li").not(".crt").on("click",function(){
				var index=$(this).index();
				$('.m-ipts').find("input[name='mobile']").focus();
				$(".m-main").toggleClass('turn').children().css("z-index",3).eq(index).css("z-index",4);
			});
		},
		backToTop:function(){
			//返回到顶部
			$("body").append('<div id="u-gotop"><a href="javascript:;" title="回到顶部">回到顶部</a></div>');
		    $(window).on("load scroll",function(){
		        if($(window).scrollTop()>1500){
		            $("#u-gotop").fadeIn();
		        }else{
		        	if(!$("#u-gotop").hasClass("topFly")){
		        		$("#u-gotop").fadeOut();
		        	}
		        	
		        }
		    });
		    $("#u-gotop").on("click",function(){
		    	$(this).addClass("topFly");
		    	$(this).addClass("animated").addClass("slideOutUp");
		        $("body,html").animate({scrollTop: 0}, "fast");
		        setTimeout(function(){
		        	 $("#u-gotop").removeClass("animated").removeClass("slideOutUp").removeClass("topFly");
		        	 $("#u-gotop").hide();
		        },1500)
		    });
		},
		loginLogic:function(){
			$("#LoginForm").formCheck({
					"focus"	:true,
					"alertType":"bottom",
					"json":{
						"username":{//手机号
							"reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
							"error":"用户名格式错误",
							"empty":"请输入用户名"
						},
						"user_name":{//手机号
							"reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
							"error":"用户名格式错误",
							"empty":"请输入用户名"
						},
						"password2":{
							"reg":/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/,
							"error":"密码格式错误",
							"empty":"密码不能为空"
						}
					}
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
								oForm.attr("submited",true).submit().find('li.u-error').removeClass('u-error').end().find('.jsSubmit').val("登录...");
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
		ssoLogin:function(){
			window.ssoController = {
					preLogin:function(){
						$.ajax({
				            url: 'http://login.51talk.com/sso/prelogin',
				            dataType: 'jsonp',
				            jsonpCallback: 'preLoginCallBack',
				            data: $('#LoginForm').serialize(),
				            type: 'get',
				            success: function(ret) {
				                $('#login_la').val(ret.res.la);
				                //收起错误信息
				                $("#password2").removeAttr('name');
								$("#LoginForm").attr("submited",true).submit().find('li.u-error').removeClass('u-error').end().find('.jsSubmit').val("登录...");
				            }
				        });
					},
					feedBack: function(dataObj){
						var data = eval(dataObj);
						if(data.code == 10000){
							if(data.from_url){
								window.location.href= data.from_url;
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
				            url: 'http://login.51talk.com/sso/publickey',
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
				$("body").append("<iframe id='ssoLoginFrame' name='ssoLoginFrame' width='0' height='0' style='display:none;'></iframe>");
			    var hidden3='<input type="hidden" name="public_key" id="public_key" />'+
			                '<input type="hidden" name="la" id="login_la" />'+
			                '<input type="hidden" name="group" id="group" value="4" />';
			    loginForm.attr({
			        "target" : "ssoLoginFrame",
			        "action" : "http://login.51talk.com/sso/login"
			    }).append(hidden3);
			    //$("#autologin").attr( "checked", true );
			    // prelogin
			    ssoController.getPublicKey();
			    $('#username').blur(function(){
			        $.ajax({
			            url: 'http://login.51talk.com/sso/prelogin',
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
		videoPlay:function(){

					var vedioType = null;
					// 在轮播之前更改第一个视频播放src
					var firstSrc = $(".pic").find(".first");
					var leftWidth = $(".switch li").length*25/2-5;
					$(".switch").css({"margin-left":-leftWidth});
					if(firstSrc.attr("data-vedio")){
						vedioType = 1;
						$(".sign-cha .video_play").attr({
							"data-vedioSrc":firstSrc.attr("data-vedio"),
							"data-width":firstSrc.attr("data-width"),
							"data-height":firstSrc.attr("data-height"),
							//视频来源地址
							"data-source":firstSrc.attr("data-source")
						}).show();
					}else if(firstSrc.attr("data-young")){
						vedioType = 2;
						$(".sign-cha .video_play").attr({
							"data-vedioSrc":firstSrc.attr("data-young"),
							"data-width":firstSrc.attr("data-width"),
							"data-height":firstSrc.attr("data-height"),
							//视频来源地址
							"data-source":firstSrc.attr("data-source")
						}).show();
					}
					else{
						$(".sign-cha .video_play").hide();
					}
					//简易轮播 + 视频播放
					(function(){
						
						setTimeout(function(){
								$(".pic [data-origin]").each(function(){
									$(this).attr("src",$(this).data("origin"))
									$(this).removeAttr("data-origin");
								});
						},6000);
						var oUl=$(".pic");
						var aLi=oUl.find("li");
						var aPointer=$(".switch li");
						var oNext=$(".sign-cha .rt");
						var oPrev=$(".sign-cha .lt");
						var count=aLi.length;
						var iNow=0;

						//渐变效果
						var speed=300;
						//切换时间
						var slideSpeed=6000;
						var timer=null;

						oNext.on("click",function(){
							slide("next");
						});
						oPrev.on("click",function(){
							slide("prev");
						});
						aPointer.on("click",function(){
							var index=$(this).index();
							if(iNow==index)return;
							slide(index);
						}).hover(function(){
							clearInterval(timer);
						},function(){
							begin();
						});
						//窗口失去焦点停止运动
				        // $(window).on("blur",function(){
				        //     clearInterval(timer);
				        // });
				        // $(window).on("focus",function(){
				        //     begin();
				        // });
						//开启定时器
						begin();
						function slide(type){
							if(aLi.eq(iNow).is(":animated")) return;
							aLi.eq(iNow).css({"z-index":0}).animate({"opacity":0},speed);
							if(type==="next"){
								iNow++;
							}else if(type==="prev"){
								iNow--;
							}else{
								iNow=type;
							}
							if(iNow<0){
								iNow=count-1;
							}else if(iNow===count){
								iNow=0;
							}
							aLi.eq(iNow).css({"z-index":1,"opacity":0.7}).animate({"opacity":1},speed);
							//视频相关
							if(aLi.eq(iNow).attr("data-vedio")){
								vedioType = 1;
								$(".sign-cha .video_play").attr({
									"data-vedioSrc":aLi.eq(iNow).attr("data-vedio"),
									"data-width":aLi.eq(iNow).attr("data-width"),
									"data-height":aLi.eq(iNow).attr("data-height"),
									//视频来源地址
									"data-source":aLi.eq(iNow).attr("data-source")
								}).show();
							}else if(aLi.eq(iNow).attr("data-young")){
								vedioType = 2;
								$(".sign-cha .video_play").attr({
									"data-vedioSrc":aLi.eq(iNow).attr("data-young"),
									"data-width":aLi.eq(iNow).attr("data-width"),
									"data-height":aLi.eq(iNow).attr("data-height"),
									//视频来源地址
									"data-source":aLi.eq(iNow).attr("data-source")
								}).show();
							}
							else{
								$(".sign-cha .video_play").hide();
							}
							pointer();
							begin();
						}
						function begin(){
							if(count<=1) {
								$(".change").hide();
								$(".switch").hide();
								return;
							}
							clearInterval(timer);
							timer=setInterval(function(){
								slide("next");
							},slideSpeed);
						}
						//改变焦点
						function pointer(){
							aPointer.removeClass("crt").eq(iNow).addClass("crt");
						}
						$("[data-vedioSrc]").on("click",function(){
							//debugger;
							var oBtn=$(this);
							var src=oBtn.attr("data-vedioSrc");
							var width=oBtn.attr("data-width") || 800;
							var height=oBtn.attr("data-height") || 450;
							//视频来源地址
							var source=oBtn.attr("data-source") || "";
							var videoTool =null;

							if(!src.match(/\.swf$/)){
								videoTool = "http://static.51talk.com/static/js/html/lib/ckplayer/ckplayer.swf";
							}else{
								videoTool = src;
							}
					        if(!src)return;
				             if($("#ckplayerDialog").length==0){
					                $("body").append(
					                    '<div id="ckplayerDialog">'+
					                    	'<a class="close" href="javascript:;"></a>'+
					                    	'<a class="source"></a>'+
					                    	'<div id="playerContent"></div>'+
					                    '</div>'+
					                    '<div id="j-mask"></div>'
					                );
					                $("#ckplayerDialog").find('.close').add('#j-mask').on("click",function(){
										$("#ckplayerDialog").hide();
										$("#j-mask").fadeOut();
										//继续轮播图
										begin();
									});
					            }
					            CKobject.embed(
					                videoTool,
					                'playerContent',
					                'ckplayer_playerContent',
					                width,
					                height,
					                false,
					                {f: src, c: 0, b: 1, p: 1},
					                [src],
					                {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
					            );
					            $("#ckplayerDialog").css({
					            	"display":"block",
					            	"width":width,
					            	"height":height
					            }).find(".source").html(source);
					            $("#j-mask").height($(document).height()).show();
					            //暂停轮播图
					            clearInterval(timer);
							});
					})();

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
