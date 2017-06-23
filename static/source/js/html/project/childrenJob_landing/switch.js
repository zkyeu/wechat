/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
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
		var slideSpeed=3000;
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
		 
	})();
	 
});
