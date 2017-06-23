/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	
	var partRight = $(".partRight"),
		partRightUl = partRight.find("ul"),
		Closed = $(".closed"),
		Opened = $(".Opened"),
		fReduce = $(".f-reduce"),
		fAdd = $(".f-add"),
		fNumber = $(".f-number"),
		oMdate = $(".m-date"),
		oMdateLi = oMdate.find("li").width(),
		oMdateWidth = oMdateLi*(oMdate.find("li").index()+1),
		partRightB = $(".partRightB"),
		ratio = ($(".roll_part_t").width() - $("#roll").width())/(oMdateWidth-$(".overPart").width()),
		timer,
		rollLeft = window.location.search.split("&"),
		arrRoll = rollLeft[rollLeft.length-1].split("=");

		//获取地址栏的search值用来老师选择完成之后定位到当前位置
		if(arrRoll[0]=="roll"){
			$("#roll").css("left",arrRoll[1]+"px");
			$("#roll2").css("left",arrRoll[1]+"px");
			$(".m-date").css("left",-arrRoll[1]/ratio+"px");
			partRight.css("left",-arrRoll[1]/ratio+"px");
			if(arrRoll[1] == $(".roll_part_t").width() - $("#roll").width()){
				$(".m-next").hide();
			}else{
				$(".m-next").show();
			}
			if(arrRoll[1] != 0){
				$(".m-pre").show();
			}else{
				$(".m-pre").hide();
			}
		}

		//刷新之后如果滚动条的高度大于头部定位的高度 把滚动条的距离赋给头部定位
		if($(document).scrollTop() >= $('.m-c-top').offset().top){
			// $('.m-c-top').css({"position":"fixed","left":"435px","top":"0px"});
			$('.m-c-top').css({"position":"fixed","left":"50%","top":"0px","margin-left":"-517px"});
		}

		oMdate.width(oMdateWidth);
		partRightB.width(oMdateWidth);
		partRight.width(oMdateWidth);



		//解决ie9下添加两个后标 后面的那个不显示
		var rightSpan; 
		// alert(partRightB.find("ul li").index())
		partRightB.find("ul li").each(function(){
			rightSpan = $(this).find("p .m-t-icon").length;
			if(rightSpan>1){
				$(this).find(".m-t-icon").closest("p").css({
					"line-height":"1",
					"width":"36"
				});
				 $(this).find("p .m-t-icon").css("float","right")
			}
			// console.log(rightSpan);
		})
		// find("span").index();

		//合并li之后的样式
		merge();
		function merge(){
			$(".bMerge").each(function(event){
				var bIndex = $(this).closest("li").index();
				var bLiB = $(this).closest("ul").next().find("li").eq(bIndex);
				// alert($(this).closest("li.pass"));
				if($(this).closest("li").hasClass("pass")){
					bLiB.addClass("pass");
				}
				bLiB.html("");
				bLiB.css({"border-top":"none","margin-top":"0px"});
				
			})
		}
		//给周末添加高峰时段
		//hiTopN();
		function hiTopN(){
			var numSat = [],
				arrSat = [];
			$(".m-date li").each(function(){
				numSat.push($(this).find(".Saturday,.Sunday").closest("li").index());
			});

			for(var i=0;i<numSat.length;i++){
				if(numSat[i]>0){
					arrSat.push(numSat[i]);
				}
			}
			for(var i=0;i<arrSat.length;i++){
				partRightUl.filter(function(index){
					return index>=6 && index <=25;
				}).each(function(){
	   				if($(this).find("li").eq(arrSat[i]).attr("class")=="Booked"){
	   					$(this).find("li").eq(arrSat[i]).addClass("darkTop hiTop");
	   				}
	   				$(this).find("li").eq(arrSat[i]).addClass("hiTop");
	   			});

			}
			partRightUl.filter(function(index){
				return index>=26 && index <=33;
			}).each(function(){
				$(this).find("li").addClass("hiTop");
			})
		}

		//点击课程选中
   		Closed.not($(".bMerge,.pass").closest("li")).on("click",function(event){
   			tabClass.call($(this),event,"m-f-icon close-o");
   		});
   		Opened.not($(".bMerge,.pass").closest("li")).on("click",function(event){
   			tabClass.call($(this),event,"m-f-icon close-o");
   		});

   		//点击双格课程
   		Closed.find(".bMerge").on("click",function(event){
   			var bIndex = $(this).closest("li").index();
			var bLiB = $(this).closest("ul").next().find("li").eq(bIndex);
			// 判断如果是双格的点击全选以后再次单点bug 
   			if($(this).closest(".m-f-icon")){
   				$(this).closest('li').removeClass("m-f-icon close-o");
   				// 清除双格第二格的选中状态
				bLiB.removeClass("m-f-icon close-o");
   			}
   			tabClass.call($(this),event,"close-o");
   		});
   		Opened.not(".pass").find(".bMerge").on("click",function(event){
   			tabClass.call($(this),event,"close-o");
   		});


   		function tabClass(event,className){
   			this.toggleClass(className);
   			event.stopPropagation();
   		}


   		//点击开关操作
		// $(".f-exchange").on("click",function(){
		// 	var innerIcon = $(".close-o").find(".innerIcon");
		// 	$(".close-o").each(function(){
				
		// 		if($(this).find(".innerIcon").html()=="Closed"){
		// 			$(this).find(".innerIcon").html("Opened");
		// 			$(this).removeClass("closed");
		// 			$(this).closest("li").removeClass("closed");
		// 		}else{
		// 			$(this).find(".innerIcon").html("Closed");
		// 			$(this).addClass("closed");
		// 			$(this).closest("li").addClass("closed");
		// 		}
		// 	})
			
  //  			$(".close-o").removeClass("m-f-icon close-o");
  //  			$(".m-icon-q").addClass("m-icon-q2");
		// })

   		//点击减
   		fReduce.on("click",function(event){
   			event.stopPropagation();
   			var fNumberH = fNumber.html();
   			if(Number(fNumberH)-1 >= 1){
   				fNumber.html(Number(fNumberH)-1);
   			}else{
   				return;
   			}
   		});
   		//点击加
   		fAdd.on("click",function(event){
   			event.stopPropagation();
   			var fNumberH = fNumber.html();
   			if(Number(fNumberH)+1 <= 3){
   				fNumber.html(Number(fNumberH)+1);
   			}else{
   				return;
   			}
   		});
   		//点击翻倍Confirm price 
   		$(".f-price").on("click",function(){
   			partRightUl.find(".close-o").each(function(){
   				$(this).filter(".price").find(".c-p").remove();
   				if($(".f-number").html() == 1){
	   				return;
	   			}
	   			$(this).filter(".price").find("p").append("<span class='m-t-icon c-p'>"+"X"+$(".f-number").html()+"</span>")
   			})
   		})

        //点击全选和高峰时段
       
       	$(".m-icon-q").on("click",function(event){
       		event.stopPropagation();
       		var qFar = $(this).closest("li");
       		if($(this).closest("p").index()==1){
       			if($(this).closest("p").attr("date-only")=="now"){
       				$(this).attr("date-only","");
       			}else{
       				$(this).attr("date-only","now");
       			}
       		}
       		if($(this).attr("date-now")=="1"){
       			if($(this).closest("p").index()==1){
	       			partRightUl.each(function(){
		   				$(this).find("li").eq(qFar.index()).not(".Opened,.Booked,.pass").removeClass("m-f-icon close-o").find(".bMerge").removeClass("close-o");
		   			});
	       		}else{
	       			partRightUl.each(function(){
		   				$(this).find("li").eq(qFar.index()).filter(".hiTop").not(".Opened,.Booked,.pass").removeClass("m-f-icon close-o").find(".bMerge").removeClass("close-o");
		   				// 双格清除选中状态
		   			});
	       			
	       		};
	   			$(this).addClass("m-icon-q2");
	   			$(this).closest("li").find(".m-icon-q").attr("date-now","");
       		}else{
       			$(this).closest("li").find(".m-icon-q").addClass("m-icon-q2");
       		
	       		$(this).toggleClass("m-icon-q2");
	       		if($(this).closest("p").index()==1){
	       			partRightUl.each(function(){

	       				$(this).find("li").eq(qFar.index()).not(".Opened,.Booked,.close-o,.pass").addClass("m-f-icon close-o");
	       				// 高峰期双格选中的时候要排除pass opened booked 
	       				$(this).find("li").eq(qFar.index()).not(".pass,.Opened,.Booked").filter(".mergeBox").find(".bMerge").addClass("close-o");

	       			});
	       		}else{
	       			//如果点了全选再点击高峰时段的时候 需要先清空所有的 然后再添加高峰时段
	       			if($(this).closest("p").next().find("span").attr("date-only")=="now"){
	       				partRightUl.each(function(){
			   				$(this).find("li").eq(qFar.index()).not(".Opened,.Booked,.pass").removeClass("m-f-icon close-o").find(".bMerge").removeClass("close-o");
			   			});
	       			}
	       			partRightUl.each(function(){
	       				$(this).find("li").eq(qFar.index()).not(".Opened,.Booked,.close-o,.pass").filter(".hiTop").addClass("m-f-icon close-o");
	       				$(this).find("li").eq(qFar.index()).not(".pass,.Opened,.Booked").filter(".hiTop").filter(".mergeBox").find(".bMerge").addClass("close-o");
	       			});
	       			
	       		};
	       		
	       		$(this).closest("li").find(".m-icon-q").attr("date-now","");
	       		$(this).attr("date-now","1");
       		}
       		partRightUl.last().find("li").eq(qFar.index()).removeClass("m-f-icon close-o");
       	})

       	//点击滚轮
   		function addEvent(obj,sEv,fn){
			if(obj.attachEvent){
				obj.attachEvent('on'+sEv,fn);
			}else{
				obj.addEventListener(sEv,fn,false);
			}
		}
		function removeEvent(obj,sEv,fn){
			if(obj.detachEvent){
				obj.detachEvent('on'+sEv,fn);
			}else{
				obj.removeEventListener(sEv,fn,false);
			}
		}
		function getStyle(obj,attr){
			return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
		}

		var oLi=document.getElementById('roll');
		var oLi2=document.getElementById('roll2');

		addEvent(oLi,'mousedown',function(ev){
			var oEvent=ev||event;
			var left=oLi.offsetLeft;
			var disX=oEvent.clientX-left;
			
			function mouseMove(ev){
				var oEvent = ev || event;
				var l = oEvent.clientX - disX;
				if(l <= 0){
					l = 0;
				}else if(l >= $(".roll_part_t").width() - $("#roll").width()){
					l = $(".roll_part_t").width() - $("#roll").width();
				}
				oLi.style.left = l + 'px';
				oLi2.style.left = l + 'px';
				$(".m-date").css("left",-l/ratio+"px");
				partRight.css("left",-l/ratio+"px");

				if(l == $(".roll_part_t").width() - $("#roll").width()){
					$(".m-next").hide();
				}else{
					$(".m-next").show();
				}
				if(l != 0){
					$(".m-pre").show();
				}else{
					$(".m-pre").hide();
				}

			}
			function mouseUp(){
				removeEvent(document,'mousemove',mouseMove);
				removeEvent(document,'mouseup',mouseUp);					
				oLi.releaseCapture && oLi.releaseCapture();
			
			}
			addEvent(document,'mousemove',mouseMove);
			addEvent(document,'mouseup',mouseUp);
			
			//oEvent.preventDefault：Chrome浏览器阻止默认事件，只有事件在绑定时使用
			oEvent.preventDefault && oEvent.preventDefault();
			oLi.setCapture && oLi.setCapture();
			return false;
		});
		addEvent(oLi2,'mousedown',function(ev){
			var oEvent=ev||event;
			var left=oLi2.offsetLeft;
			var disX=oEvent.clientX-left;
			
			function mouseMove(ev){
				var oEvent = ev || event;
				var l = oEvent.clientX - disX;
				if(l <= 0){
					l = 0;
				}else if(l >= $(".roll_part_t").width() - $("#roll").width()){
					l = $(".roll_part_t").width() - $("#roll").width();
				}
				oLi2.style.left = l + 'px';
				oLi.style.left = l + 'px';

				$(".m-date").css("left",-l/ratio+"px");
				partRight.css("left",-l/ratio+"px");
				if(l == $(".roll_part_t").width() - $("#roll").width()){
					$(".m-next").hide();
				}else{
					$(".m-next").show();
				}
				if(l != 0){
					$(".m-pre").show();
				}else{
					$(".m-pre").hide();
				}

			}
			function mouseUp(){
				removeEvent(document,'mousemove',mouseMove);
				removeEvent(document,'mouseup',mouseUp);					
				oLi2.releaseCapture && oLi2.releaseCapture();
			
			}
			addEvent(document,'mousemove',mouseMove);
			addEvent(document,'mouseup',mouseUp);
			
			//oEvent.preventDefault：Chrome浏览器阻止默认事件，只有事件在绑定时使用
			oEvent.preventDefault && oEvent.preventDefault();
			oLi2.setCapture && oLi2.setCapture();
			return false;
		});
		
		//吸顶
		$(window).scroll(function(){
			// console.log($(document).scrollTop()+":"+$(".partRightB").offset().top)
			if($(document).scrollTop() >= $('.m-c-top').offset().top){
				// $('.m-c-top').css({"position":"fixed","left":"435px","top":"0px"});
				$('.m-c-top').css({"position":"fixed","left":"50%","top":"0px","margin-left":"-517px"});
			}
			if($(document).scrollTop() <= partRightB.offset().top){
				$('.m-c-top').css({"position":"absolute","left":"50%","top":"0px","margin-left":"-517px"});
			}
		})


		// 点击上一个
		var preTimer = null;
		$(".m-pre").mousedown(function(event) {
			$.pre_show();
			preTimer = setInterval($.pre_show,500);
		}).mouseup(function(event){
			clearInterval(preTimer);
		});
		
		// 点击下一个	
		var nextTimer = null;
		$(".m-next").mousedown(function(event) {
			$.next_show();
			nextTimer = setInterval($.next_show,500);
		}).mouseup(function(event) {
			clearInterval(nextTimer);
		});
		
		$.extend({
			pre_show: function(){
				var mDate = parseInt($(".m-date").css("left"));
				if(mDate >= -oMdateLi){
					mDate = -oMdateLi;
					$(".m-pre").hide();
					clearInterval(preTimer);
				}
				$(".m-date").css("left",(mDate+oMdateLi)+"px");
				partRight.css("left",(mDate+oMdateLi)+"px");
				$("#roll").css("left",-(mDate+oMdateLi)*ratio+"px");
				$("#roll2").css("left",-(mDate+oMdateLi)*ratio+"px");
				$(".m-next").show();	
			},
			next_show:function(){
				var mDate = parseInt($(".m-date").css("left"));
				if(mDate <= -(partRight.width()-$(".overPart").width())+oMdateLi){
					mDate =-(partRight.width()-$(".overPart").width())+oMdateLi;
					$(".m-next").hide();
					clearInterval(nextTimer);
				}
				$(".m-date").css("left",(mDate-oMdateLi)+"px");
				partRight.css("left",(mDate-oMdateLi)+"px");
				$("#roll").css("left",-(mDate-oMdateLi)*ratio+"px");
				$("#roll2").css("left",-(mDate-oMdateLi)*ratio+"px");
				$(".m-pre").show();
			}
		});



});
