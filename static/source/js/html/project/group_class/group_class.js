define(function(require, exports, module) {
	//设置切换时间
	var speed = 1500;
	//是否选题
	var flag = false;
	//初始化点击值
	var index = 0;
	//初始分数
	var score = 0;
	//小男孩
	var boy = $('.boy-icon');
	//进度条
	var processBar = $('.process .bar');
	//题目个数
	var questionLen = $('.common-bg').length;
	//平均值
	var mean = 0;
	var initMean= 100/questionLen;
	//下一步
	var nextBtn = $('.group-container .next');
	//显示的元素
	var showElem =  $('.common-bg:visible');
	var currentSpan =null;
	var canNext =  true;



	;(function($){
		$.playAudio =function(options){
			var configs = $.extend(true, {}, {
				player:$(".player").get(0),
				playBtn:$(".playBtn"),
				playingClass:"playing"
			}, options)	;

			var playBtn = configs.playBtn,player = configs.player;

			playBtn.click(function(){
				$(this).addClass(configs.playingClass);
				player.src = $(this).attr("audio-url");
				player.play();
			});
			if(player.addEventListener){
				player.addEventListener("ended",function(){
					playBtn.removeClass(configs.playingClass);
				});
			}
			


		}
	})(jQuery);

	//单选题

	function SingleSelect(status, dom){
		this.status = status;
		this.dom = dom;
	}

	SingleSelect.prototype = {
		init:function(){
			this.bindEvents(showElem,nextBtn);
		},
		dragSelect: function(elem) {
			var _self = this;
				showElem.find('li.current').each(function(index, el) {
					var isSelect = $(el).attr('data-select'),
						selectScore = $(el).attr('data-score');

				});
		},
		singleSelect: function(elem) {
			//可见元素里查找元素是否选择
			var self = this;
			var selector = this.dom.find('li.current'),
				isSelect = selector.attr('data-select'),
				selectScore = selector.data('score');
		},
		select:function(showElem, elem){
				//可见元素里查找元素是否选择
				var self = this;
				var selector = showElem.find('li.current'),
					isSelect = selector.attr('data-select'),
					selectScore = parseInt(selector.data('score'));
					console.log(selectScore)
				if(isSelect) {
					if(selectScore) {
						boy.addClass('boy-right');
						score += selectScore;
						flag = true;
					}else{
						flag = true;
						boy.addClass('boy-wrong');
					}
					canNext = false;
				}else{
					alert('请完成题目作答后再点击下一步');
					return false;
				}
				skip(elem);	
		},
		bindEvents:function(showElem,nextBtn){
			//事件绑定
			showElem.find('li.single').on('click',function() {
				var _self = $(this);
				_self.addClass('current').siblings().removeClass('current').siblings().removeAttr("data-select");
				_self.attr({'data-select':true});
			});
			//点击操作下一步
			if($("audio").length>0){

				$.playAudio({
					player:$("audio").get(0),
					playBtn:showElem.find(".play-btn"),
					playingClass:"playing"
				});
			}

			nextBtn.off().on('click', function() {

				if(canNext){
					if($("audio").length>0){
						var audio = $("audio").get(0);
						if(!audio.paused){
							audio.pause();
							showElem.find(".play-btn").removeClass("playing");
						}
					}
					
					switchQuestion(showElem, $('.common-bg'));

				}else{
					console.log("还不可操作！");
				}
			});

			showElem.find(".btn_close").on("click",function(){
				showElem.find(".story_dialog").hide();
			});
			showElem.find(".btn").on("click",function(){
				showElem.find(".story_dialog").show();
			});
		}
	}
	//跳转到下一页

	function checkBroser() {
			var isIeBrowser = $.browser.msie;
	        var browserVersion = parseInt($.browser.version, 10);
	        if (isIeBrowser && browserVersion < 9) {
	        	return true;
	        }
	        return false;
    }

	function DragLeft(){};
	DragLeft.prototype = {
		init:function(){
			this.bindEvents(showElem,nextBtn);
		},
		bindEvents:function(showElem,nextBtn){
			nextBtn.off().on('click', function() {
				if(canNext){
					switchQuestion(showElem, $('.common-bg'));
				}else{
					console.log("还不可操作！");
				}
			});
			showElem.find(".btn_close").on("click",function(){
				showElem.find(".story_dialog").hide();
			});
			showElem.find(".btn").on("click",function(){
				showElem.find(".story_dialog").show();
			});
		},
		select:function(showElem, elem){
			var rightEles = showElem.find('.answer-wrap li[data-score="5"][data-select=true]');
			var leftLength = showElem.find('.answer-wrap li').length;
			if(showElem.data("five")){
				leftLength = 5;
			}
			flag = true;
			var answerEle = showElem.find('.answer-wrap li[data-select=true]');
			rightEles.each(function(){
				var selectScore = $(this).attr("data-score");
				score += parseInt(selectScore);
			});
			if(answerEle.length!=leftLength){
				alert('请完成题目作答后再点击下一步');
				return false;
			}else if(rightEles.length >0 && (rightEles.length !=leftLength)){
				//小孩子哭脸
				flag = true;
				boy.addClass('boy-wrong');
				canNext = false;
			}else if(rightEles.length ==leftLength){
				//小孩笑脸
				flag = true;
				boy.addClass('boy-right');
				canNext = false;
			}
			skip(elem);

		}
	}


	function DownSlide(){};
	DownSlide.prototype = {
		init:function(){
			this.bindEvents(showElem,nextBtn);
		},
		bindEvents:function(showElem,nextBtn){
			var list = showElem.find(".list");
			showElem.find("p span").on("click",function(event){
				event.stopPropagation();
				currentSpan = $(this);
				var offset = $(this).offset();
				showElem.find(".list").show().css({"top":offset.top-144,"left":offset.left-$(".list-select").offset().left-60})
			});
			list.find("li").click(function(event){
				var option = $(this).find("span").text();
				currentSpan.html(option);
				currentSpan.attr("data-select",true);
				if(currentSpan.data("value")== $(this).data("value")){
					currentSpan.attr("data-score",5);
				}else{
					currentSpan.removeAttr("data-score");
				}
				list.hide();
			});
			$(document).click(function(){
				list.hide();
			})
			nextBtn.off().on('click', function() {
				if(canNext){
					switchQuestion(showElem, $('.common-bg'));
				}else{
					console.log("还不可操作！");
				}
			});
		},
		select:function(showElem, elem){
			var rightEles = showElem.find('.list-select span[data-score="5"][data-select="true"]');
			var leftLength = showElem.find('.list li').length;
			var answerEle = showElem.find('.list-select p span');

			rightEles.each(function(){
				var selectScore = $(this).attr("data-score");
				score += parseInt(selectScore);
			});
			if(answerEle.length!=leftLength){
				alert('请完成题目作答后再点击下一步');
				return false;
			}else if(rightEles.length >0 && (rightEles.length !=leftLength)){
				//小孩子哭脸
				flag = true;
				boy.addClass('boy-wrong');
				canNext = false;
			}else if(rightEles.length == leftLength){
				//小孩笑脸
				flag = true;
				boy.addClass('boy-right');
				canNext = false;
			}else {
				flag = true;
				boy.addClass('boy-wrong');
				canNext = false;
			}

			skip(elem);

		}
	}



	//单选项题
	var singleSelect  = new SingleSelect(false, showElem);
		singleSelect.init();
	//拖拽题	
	var dragLeft =  new DragLeft();	
	dragLeft.init();
	//填空题
	var downSlide = new DownSlide();
	downSlide.init();

	function saveScore(score,level){
		var def =  new $.Deferred();
		return $.ajax({
			type:"post",
			url:"/Ajax/youthCapacityEvaluation",
			data:{
				questions:$("#grade").val(),
				score:score,
				level:level,
				type:1
			},
			success:function(){
				console.log("success");
			},
			error:function(){
				console.log("error");
			}
		});
	}
	if($("#grade").length>0){
		$.ajax({
			url:"/Ajax/measurementYouth",
			type:"post",
			data:{
				questions:$("#grade").val(),
				type:0
			}
		});
	}

	var scoreResult = function(score){

		if(score>= 80 && score<=100){
			saveScore(score,1).done(function(){
				location.href="/Trial/youthLevelPage?level=1";
			});
			
		}else if(score>=50 && score<80){
			saveScore(score,2).done(function(){
				location.href="/Trial/youthLevelPage?level=2";
			});
			
		}else{
			saveScore(score,3).done(function(){
				location.href="/Trial/youthLevelPage?level=3";
			});
			
		}
	}	
	var switchQuestion = function(showElem, elem) {
		var type = showElem.attr("data-type");
		switch (type){
			case "singleSelect":
				singleSelect.select(showElem, elem);
				break;
			case "dragSelect":
				dragLeft.select(showElem,elem);
				break;
			case "listSelect":
				downSlide.select(showElem,elem);
				break;
			default:
				alert("题型错误");	
				break;

		}
	};
	//回调操作默认状态

	function rebackNext(elem,index){
		elem.eq(index).show();
		mean += initMean;
		processBar.css({'width': mean + '%'});
		showElem =  $('.common-bg:visible');
		canNext = true;
		boy.removeClass("boy-right boy-wrong");
	}

	//跳转到下一页
	function skip(elem){
		if(flag) {
			setTimeout(function() {
				elem.eq(index).animate({'transform':'transalteX(-100%)'}, 600, function() {
					elem.eq(index).hide();
					index ++;
					var type = elem.eq(index).attr("data-type");
					if($("audio").length>0){
						var audio = $("audio").get(0);
						if(!audio.paused){
							audio.pause();
							showElem.find(".play-btn").removeClass("playing");
						}
					}
					if( type=="singleSelect"){
						rebackNext(elem,index);
						singleSelect.bindEvents(showElem,nextBtn);
					}
					else if(type == "dragSelect"){
						rebackNext(elem,index);
						dragLeft.bindEvents(showElem,nextBtn);
					}else if(type =="listSelect"){
						rebackNext(elem,index);
						downSlide.bindEvents(showElem,nextBtn);
					}
					else if(index >= questionLen){
						scoreResult(score);
					}else{
						alert("不能操作");
						//canNext = true;
						//elem.eq(index-1).show();
					}
					
				});
			}, speed);
		}
	}
	$(".grdeList li").click(function(){
		var value = $(this).find("em").text();
		 $("#grade2").val(value);
		 $("#guideForm").submit();
	});

	if(checkBroser()){
		$(".dialog").show();
	}
	$(".dialog .title a,.dialog .cancle").on("click",function(){
		$(".dialog").hide();
	});

	$(".dialog .download").on("click",function(){
		$(".dialog").hide();
		location.href="http://sw.bos.baidu.com/sw-search-sp/software/3d03c3764837b/ChromeStandalone_52.0.2743.116_Setup.exe"
	});

	// 拖拽
	$(function(){
		var drag =  {
			draged: null,
			start: function(ev) {
				var ev = ev || window.event,
					target = ev.target ? ev.target : ev.srcElement;
				this.draged = target;
				$(target).css({'opactiy':'0.5'});
				var isSelect = $(target).parent('li').attr('data-select'),
					hasScore = $(target).parent('li').attr('data-score');;
				if(isSelect || hasScore){
					$(target).parent('li').removeAttr('data-select data-score');
				}
				try {
				    ev.dataTransfer.setData('color', $(target).attr('data-color'));
				  } catch (e) {
				    ev.dataTransfer.setData('Text', target.getAttribute('data-color'));
				}
			},
			enter: function(e) {
				var e = e || window.event,
					target = e.target ? e.target : e.srcElement;
				$(target).addClass('current');
				if($(target).hasClass('answer-wrap')) {
					$('.answer-wrap').removeClass('current');
				}
				if($(target).hasClass('option-wrap')) {
					$('.option-wrap').removeClass('current');
				}
				e.preventDefault();
				e.cancelBubble = true;
			},
			over: function(e) {
				var e = e || window.event,
					target = e.target ? e.target : e.srcElement;
				e.preventDefault();
				e.cancelBubble = true;
			},
			drop: function(e) {
				var e = e || window.event,
					target = e.target ? e.target : e.srcElement,
					targetNodeName = target.nodeName.toLowerCase(),	//目标元素节点名称
					targetParentClass = target.parentNode.parentNode.className,	//目标元素祖父节点className
					targetParentNodeName = target.parentNode.parentNode.nodeName.toLowerCase(),	//目标元素祖父节点名称
					dragedColor = e.dataTransfer.getData('Text') || e.dataTransfer.getData('color'),	//获取start阶段保存的颜色
					targetColor = $(target).attr('data-color'),
					dragable = null,
					typeofDraged = Object.prototype.toString.call(this.draged);
				if(targetNodeName == 'li' && (targetParentClass == 'answer-wrap' || targetParentClass == 'noselect' || targetParentClass == 'drag' || targetParentClass == 'option-wrap')){
					if(dragedColor == targetColor) {
						$(target).attr({'data-score':5, 'data-select':'true'});
					}else{
						$(target).attr({'data-select':'true'});
					}
					if(typeofDraged == '[object HTMLDivElement]') {
						dragable = true;
					}else if(typeofDraged == '[object Text]') {
						dragable = false;
					}
					if(dragable) {
						target.appendChild(this.draged);
					}
					$(target).addClass('default-status');
				}
				var dragedParentNode = this.draged.parentNode;	//保存上次拖拽元素的父节点
				var targetParentNode = target.parentNode.parentNode;	//目标元素祖父节点
				if(targetParentNodeName == 'li') {
					var targetColor = $(targetParentNode).attr('data-color'),	//目标元素祖父节点的颜色
						lastColor = $(target.parentNode).attr('data-color'),	//需要交换目标元素父节点颜色
						initColor = $(this.draged.parentNode).attr('data-color');		//拖拽元素节点颜色
					if (dragedColor == targetColor) {
						$(targetParentNode).attr({'data-score':5, 'data-select':'true'});
						if( initColor == lastColor){
							$(dragedParentNode).attr({'data-score':5, 'data-select':'true'});
						}
					} else {
						$(targetParentNode).removeAttr('data-score');
						$(dragedParentNode).removeAttr('data-score');
					}
					if(typeofDraged == '[object HTMLDivElement]') {
						dragable = true;
					}else if(typeofDraged == '[object Text]') {
						dragable = false;
					}
					if(dragable) {
						targetParentNode.removeChild(target.parentNode)
						targetParentNode.appendChild(this.draged);
						dragedParentNode.appendChild(target.parentNode);
					}
				}
			}
		};
		if(!checkBroser()){
			document.addEventListener('dragstart', drag.start, false);
			document.addEventListener('dragenter', drag.enter, false);
			document.addEventListener('dragover', drag.over, false);
			document.addEventListener('drop', drag.drop, false);
		}
	})
})