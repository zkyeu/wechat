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
   
});
