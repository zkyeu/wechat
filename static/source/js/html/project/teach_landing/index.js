/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	require("formCheck");
	//底部注册
	$("#formBottom").formCheck();
	//微博 微信 下拉
	$(".jsMore").hover(function(){
		$(this).find('.jsUl').show();
	},function(){
		$(this).find('.jsUl').hide();
	});
	//缩略图鼠标移入切换
	$(".m-img-lt li").mouseenter(function(){
		var oLi=$(this);
		var oUl=oLi.parent();
		if(oLi.find('.u-mask').hasClass('hover')) return;
		oUl.find('.u-mask').removeClass('hover');
		$(this).find('.u-mask').addClass('hover');
		$(".m-img-bg li").fadeOut().eq(oLi.index()).fadeIn();
	});
	//翻转tab切换
	$(".m-tab-step li").mouseenter(function(){
		var oLi=$(this);
		$(".m-tab-rel li").hide().eq(oLi.index()).show();
	});
	//兼容placeholder
	(function(){
		if("placeholder" in document.createElement("input")) return;
		var defaultColor="#ccc";
		$(":input:enabled").each(function(){
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


	//点击免费领取
	//点击最下面的还等什么立即抢购
	$(".free-now,.u-buy-btn").on("click",function(){
		$(".popup").removeClass("hide");
		var oWin=$(window);
		var oLogin=$(".p-logIn");
		oLogin.css({
			"top":oWin.height()/2-oLogin.height()/2+oWin.scrollTop(),
			"margin-top":"0"
		});
	})
	//点击弹窗免费领取
	$("#formBottom2").formCheck();

	//点击最下面的还等什么立即抢购

	// 点击其他地方弹窗关闭
	$(".p-mask").on("click",function(){
		$(".popup").addClass("hide");
	})
	/*$(document). on("click",function(e){
		var target  = $(e.target);
		alert(e.target.className);
		
	})*/
});
