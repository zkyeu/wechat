/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	require("formCheck");
	require("silder");
 
	$(".m-reg form").formCheck({
		"focus"	:true,
		"alertType":"bottom"
	});
	
	$(".m-log form").formCheck({
		"focus"	:true,
		"alertType":"bottom",
		"json":{
			"user_name":{//手机号
				"reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
				"error":"用户名格式错误",
				"empty":"请输入用户名"
			},
			"username":{//手机号
				"reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
				"error":"用户名格式错误",
				"empty":"请输入用户名"
			}
		}
	}).on("submit",function(){
		//及时验证用户名+密码
		var oForm=$(".m-log form");
		if(oForm.attr("submited"))return true;
		var aInput=oForm.find('input[name="user_name"],input[name="password"]');
		$.ajax({
			url: '/user/ajax_login.php',
			type: 'POST',
			dataType: 'json',
			data: aInput.serializeArray(),
			success:function(res){
				if(res.status==1){
					//收起错误信息
					oForm.find('li.u-error').removeClass('u-error');
					oForm.find('.jsSubmit').val("登录...");
					oForm.attr("submited",true).submit();
				}else{
					aInput.eq(res.type).closest('li').addClass('u-error').find('.u-err').html(res.msg);
				}
			}
		});
		return false;
	});
	
	$("#formBottom").formCheck();

	$(".m-main .jsCheck").focusin(function() {
		$(this).closest('li').addClass('icon-btn');
	}).focusout(function() {
		if(!$(this).val()){
			$(this).closest('li').removeClass('icon-btn');
		}
	});;
	
	//微博 微信 下拉
	$(".jsMore").hover(function(){
		$(this).find('.jsUl').show();
	},function(){
		$(this).find('.jsUl').hide();
	});
	//青少 选项卡
	$(".jsTabs").each(function(){
		var oBlock=$(this);
		var oTab=oBlock.find('ul');
		oTab.find('li').on("click",function(){
			var index=$(this).index();
			oBlock.find('.t-sm-tit01').hide().eq(index).show();
		});
	});
	//登录 注册翻转
	$(".m-main .m-tab li").not(".crt").on("click",function(){
		var index=$(this).index();
		$(".m-main").toggleClass('turn').children().css("z-index",3).eq(index).css("z-index",4);
	});
	//简易轮播 + 视频播放
	(function(){
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
				$(".sign-cha .video_play").attr({
					"data-vedioSrc":aLi.eq(iNow).attr("data-vedio"),
					"data-width":aLi.eq(iNow).attr("data-width"),
					"data-height":aLi.eq(iNow).attr("data-height")
				}).show();
			}else{
				$(".sign-cha .video_play").hide();
			}
			pointer();
			begin();
		}
		function begin(){
			if(count<=1) return; 
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
			var oBtn=$(this);
			var src=oBtn.attr("data-vedioSrc");
			var width=oBtn.attr("data-width") || 800;
			var height=oBtn.attr("data-height") || 450;

	        if(!src)return;
            if($("#ckplayerDialog").length==0){
                $("body").append(
                    '<div id="ckplayerDialog">'+
                    	'<a class="close" href="javascript:;"></a>'+
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
                'http://static.51talk.com/static/js/html/lib/ckplayer/ckplayer.swf',
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
            });
            $("#j-mask").height($(document).height()).show();
            //暂停轮播图
            clearInterval(timer);
		});
	})();
	//兼容placeholder
	(function(){
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
	})();
	//图片延迟加载
	(function(){
		var oWin=$(window);
	    var aImg=$("img");
	    oWin.on("load scroll resize",function(){
	        var scrollT=oWin.scrollTop();
	        aImg.each(function(){
	            if(this.src)return true;
	            var oImg=$(this);
	            if(scrollT+oWin.height()>=oImg.offset().top){
	                this.src=this.getAttribute("_src");
	                this.removeAttribute("_src");
	            }
	        });
	        
	    });
	})();
	//他们都在推荐51talk
	$(".talk-list li").mousemove(function(){
		$(this).addClass("hover").siblings().removeClass('hover');
	});
	//青少年英语教材特色： tab+轮播图，图片src和数量动态改变
	$(".m-silder-youth").silder({
		"axis":"opacity"
	});
	$(".y_textbooks_list li").on("click",function(){
		if($(this).hasClass('y_peopel_b')) return;
		$(this).addClass('y_peopel_b').siblings().removeClass('y_peopel_b');
		var aImgSrc=$(this).attr("data-imgSrc").split(",");
		var txt=$(this).attr("data-txt");
		var str='<div class="m-silder-box"><ul class="m-silder" data-silder="ul">';
		for(var i=0;i<aImgSrc.length;i++){
			str+="<li><img src='"+aImgSrc[i]+"' /></li>";
		}
		str+='</ul></div><a href="javascript:;" class="u-next" data-silder="next"></a><a href="javascript:;" class="u-prev" data-silder="prev"></a><ul class="u-points" data-silder="points"></ul>';
		$(".y_textbooks_text").html(txt);
		$(".m-silder-youth").html(str).silder({
			"axis":"opacity"
		});
	});
	//企业荣誉  /  媒体报道
	$(".hon-ul li").on("click",function(){
		$(this).addClass('hon-on').siblings().removeClass('hon-on');
		$(".hon-en").hide().eq($(this).index()).show();
	});

	//官网首页右侧 在线咨询+官方微信
	$(".m-ntkf,.m-wx").each(function() {
		var aLi=$(this).children();
		var oLi1=aLi.eq(0);
		var oLi2=aLi.eq(1);

		oLi1.mouseover(function() {
			aLi.toggle();
		});
		oLi2.mouseout(function() {
			aLi.toggle();
		});
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
	//手机二维码点击
	$('#open_download').click(function(){
		window.open('http://www.51talk.com/app/download_app.php');
	});

	//回到顶部
	(function(){
		$("body").append('<div id="u-gotop"><a href="javascript:;" title="回到顶部">回到顶部</a></div>');
	    $(window).on("load scroll",function(){
	        if($(window).scrollTop()>1500){
	            $("#u-gotop").fadeIn();
	        }else{
	            $("#u-gotop").fadeOut();
	        }
	    });
	    $("#u-gotop").on("click",function(){
	        $("body,html").animate({scrollTop: 0}, "fast");
	    });
	})();
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
	// 课程体系菜单
 	(function(){
 		$(".cs_list01").children("ul").hide();
		 		$(".cs_list01").hover(function(){
		 			$(this).children("ul").show();
		 		},function(){
		 			$(this).children("ul").hide();
		 		})
 	})();
 // 轮播
 (function(){
 
 function change(index){
		 		$(".cs_levelConBot").children("div").eq(index).show().siblings().hide();
			  //头部文字
			 	$(".cs_levelCon01_tit").children("p").eq(index).show().siblings().hide();
			 	//轮播图片
			 	$(".cs_picPlay").find("li").eq(index).show().siblings().hide();
				//内容轮播
				$(".cs_levelConBot").children("div").eq(index).show().siblings().hide();
				//小圆点变化
				$(".cs_switch").find("i").removeClass();
				$(".cs_switch").find("i").eq(index).addClass("activei");
				//倒三角
				$(".cs_level").find("li").children("i").removeClass();
		 	 	$(".cs_level").find("li").children("i").eq(index).removeClass().addClass('activei0'+index);
 };
 //点击leval
		$(".cs_level").find("li").click(function(){
		 		index=$(this).index();
		 		if(index==5)return false;
		 		change(index);
 		});

//点击小圆点
	$(".cs_switch").find("li").click(function(){
				index=$(this).index();
		 		change(index);
	});
//小于号，大于号
	var index=0;
	$(".gt").click(function(){
		 if(index==0)return false;
		 index--;
		 change(index);
	});
	$(".lt").click(function(){
		if(index==4) return false;
 			index++;
 			change(index);
 			 
	});
 })();
// 轮播结束
 
// 点击书本效果
$(".cs02_book li").click(function(){
	  var nexIndex = $(".cs02_book").index($(this).parent().parent());
		$(this).parent().parent().data("target");
		$(this).parent().parent().find("img").removeClass();
		$(this).children("img").addClass("imgBig");
		//添加的内容
			//获取属性
			var pdf_dir=$(this).children("img").attr("pdf_dir");
			var pdf_url=$(this).children("img").attr("pdf_url");
			var buy_url=$(this).children("img").attr("buy_url");
					console.log(pdf_dir);
			//获取对象
			var oPdf_dir= $(this).parent().parent().parent().parent().find(".cs02_btn").find(".cs02_btn_pdf_dir").children("a");
			var oPdf_url= $(this).parent().parent().parent().parent().find(".cs02_btn").find(".cs02_btn_pdf_url").children("a");
			var oBuy_url= $(this).parent().parent().parent().parent().find(".cs02_btn").find(".cs02_btn_buy_url").children("a");
			//判断是否有url值
				if(pdf_dir==""){
						oPdf_dir.parent().hide();
				}
				if(buy_url==""){
						oBuy_url.parent().hide();
				}

			//赋值url
			oPdf_dir.attr("href",pdf_dir);
			oPdf_url.attr("href",pdf_url);
			oBuy_url.attr("href",buy_url);

		//添加的内容结束
		var index = $(this).index();
		$(".cs_levelCon").eq(nexIndex).find('.cs_levelCon01').hide();
		$(".cs_levelCon").eq(nexIndex).find('.cs_levelCon01').eq(index).show();
});

});
