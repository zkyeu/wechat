/**
 * 
 * @authors Saturday (13811774679@163.com)
 * @date    2014-09-19 10:46:34
 * @version 1.0.0
 */
define("silder",[],function(require,exports,module){
	$.fn.extend({
		silder:function(options){
			options=options || {};
			var defaults={
				"axis"		:"x",
				//bounceBoth bounceOut bounceIn backBoth backOut backIn elasticBoth elasticOut elasticIn easeBothStrong easeOutStrong easeInStrong easeBoth easeOut easeIn
				"type"		:"elasticOut",
				"speed"		:3000,
				"autoPlay"	:true,
                "pointClass":"silder-crt"
			};
			var settings=$.extend(defaults,options);
			return this.each(function(index,ele){
				var oSilder=$(ele);
				var oUl=oSilder.find("[data-silder='ul']");
				var aLi=oUl.children();
				var count=aLi.length;
                var oPoints=oSilder.find("[data-silder='points']");
				if(count<2){
					return true;
				}
				var liWidth=aLi.eq(0).outerWidth();
				var liHeight=aLi.eq(0).outerHeight();
				

				var iNow=0;
				var timer=null;
				var speed=settings.speed;
				var axis=settings.axis;
				var pointClass=settings.pointClass;
				//��ul�̶��㹻�Ŀ��ȣ�����li������
				if(axis=="x"){
					oUl[0].innerHTML+=oUl[0].innerHTML;
					oUl.width(liWidth*count*2).children().css("float","left");
				}
				if(axis=="y"){
					oUl[0].innerHTML+=oUl[0].innerHTML;
					oUl.height(liHeight*count*2).children().css("float","none");
				}
				if(axis=="opacity"){
					aLi.css({
						"position":"absolute"
					}).filter(":gt(0)").hide();
				}
				
				var preBtn=oSilder.find("[data-silder='prev']");
				var nextBtn=oSilder.find("[data-silder='next']");

				preBtn.click(function(){
					if(oUl.is(":animated") || oUl.find(":animated").length) return;
					pre();
				});
				nextBtn.click(function(){
					if(oUl.is(":animated") || oUl.find(":animated").length) return;
					next();
				});
				oUl.add(nextBtn).add(preBtn).add(oPoints).hover(function(){
					clearInterval(timer);
				},function(){
					begin();
				});
                //����ʧȥ����ֹͣ�˶�
                $(window).on("blur",function(){
                    clearInterval(timer);
                });
                $(window).on("focus",function(){
                    begin();
                });
				if(settings.autoPlay) begin();
                addPoints();
				function _tick(){
					switch(axis){
						case "x":
							if(iNow<0){
								iNow=count-1;
								oUl.css("left",-count*liWidth);
							}
							oUl.stop().animate(
								{
									"left":-iNow*liWidth
								},
								{
								    easing:settings.type, 
								    duration: 500, 
								    complete: function(){
										if(iNow==count){
											iNow=0;
											oUl.css("left",0);
										}
		                                changePoint();
									} 
								}
							);
							break;
						case "y":
							if(iNow<0){
								iNow=count-1;
								oUl.css("top",-count*liHeight);
							}
							oUl.stop().animate(
								{
									"top":-iNow*liHeight
								},
								{
								    easing:settings.type, 
								    duration: 500, 
								    complete: function(){
										if(iNow==count){
											iNow=0;
											oUl.css("top",0);
										}
		                                changePoint();
									} 
								}
							);
							break;
						case "opacity":
							if(iNow<0){
								iNow=count-1;
							}
							if(iNow==count){
								iNow=0;
							}
							aLi.eq(iNow).fadeIn().siblings().fadeOut();
							changePoint();
							break;
					}
				}
				function pre(){
					iNow--;
					_tick();
				}
				function next(){
					iNow++;
					_tick();
				}
				function begin(){
					clearInterval(timer);
					timer=setInterval(function(){
						next();
					},speed);
				}
                function addPoints(){
                	if(oPoints.length==0)return;
                    var sLi="";
                    for(var i=0;i<count;i++){
                        sLi+="<li></li>";
                    }
                    oPoints.append(sLi);
                    oPoints.find("li").on("click",function(){
                        iNow=$(this).index();
                        changePoint();
                        _tick();
                    }).eq(0).addClass(pointClass);
                }
                function changePoint(){
                	if(oPoints.length==0)return;
                    oPoints.find("li").removeClass(pointClass).eq(iNow).addClass(pointClass);
                }
			});
		}
	});
});
