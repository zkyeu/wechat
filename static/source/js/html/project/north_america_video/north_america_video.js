/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2017-05-19 14:43:30
 * @liyang 2.0.0
 */
define(function(require,exports,module){
	$(function(){
 		var playOrder = 0,
 			videoArray = "";

 		function Video() {
 			this.videos = videoData;//所有的视频资源
 			this.yearArr = [];
 			this.yearCur = 0;

 			this.main = $(".g-main");
 			this.mainShowData = $(".g-main").find(".g-widthMain");

 			this.sideDOM = $(".g-aside");
 			this.yearBox = $(".g-aside").find(".u-year");
 			this.yearNum = this.yearBox.find(".u-num");
 			this.yearUpBtn = this.yearBox.find(".u-up");
 			this.yearDownBtn = this.yearBox.find(".u-down");
 			this.yearPositon = [];

 			this.monthBox = $(".g-aside").find(".u-month");
 			this.monthArray = [];
 			this.positionArray = [];

 			this.maskTop = $(".mask-top");//上阴影
 			this.maskBottom = $(".mask-bottom");//下阴影
 			this.maskStep = $(".mask-step");//成功的步骤弹层
 		}
 		Video.downACLink = "/ac/51TalkAC.php";
 		Video.courseLink = "/nat/reserve/reserveNew";
 		$.extend(Video.prototype, {
 			init: function() {
 				this.renderData();
 				this.fixSpecialPosition();
 				this.dealYearPosition();
 				this.renderNewSideData(this.yearCur);
 				this.windowScroll();
 				this.bindEvents();
 			},
 			renderData: function() {//渲染数据
 				var that = this;
 				$.each(this.videos, function(index, item) {
 					that.yearArr.push(item.year);//年份数组
 					renderStart(item.showData);//渲染需要展示的数据
 				});

 				function renderStart(data) {
 					var yearWrap = $('<div class="year_position"></div>').appendTo(that.mainShowData);
 					$.each(data, function(index, item) {//遍历渲染每年的所有视频
	 					var list = "",
	 					    addClassName = (index%2 === 0)?'m-caption-left':'m-caption-right';
	 					switch(true) {//这个月没有上课
	 						case (item.no_class == "yes"):
	 							list+= '<div class="m-video">'+
				 							'<div class="m-caption '+addClassName+'">'+
					 							'<h3 class="u-date">'+item.year_month+'</h3>'+
					 							'<p class="u-descrip">'+
					 								'到底发生了啥？宝贝儿这个月没来上课么？老师都想你了呢，赶快去约课吧'+
					 							'</p>'+
					 						'</div>'+
					 						showButton(item.show_button)+
					 					'</div>'
					 			function showButton(status) {
					 				if(status == "yes") {
					 					return ('<ul class="m-list-wrap">'+
						 							'<li class="m-list-none">'+
						 								'<span class="u-point"></span>'+
						 								'<div class="m-box">'+
						 									'<a href='+Video.courseLink+' class="u-link">'+'立即约课'+'</a>'+
						 								'</div>'+
						 							'</li>'+
						 						'</ul>');
					 				} else {
					 					return "";
					 				}
			 					}
	 							break;
	 						default://这个月有上课
	 							list += '<div class="m-video">'+
				 							'<div class="m-caption '+addClassName+'">'+
					 							'<h3 class="u-date">'+item.year_month+'</h3>'+
					 							'<p class="u-descrip">'+
					 								'我家宝贝儿太棒了！本月已经累计说英语'+item.class_min+'分钟了，打败了全世界'+item.rate+'的小朋友呢！'+
					 							'</p>'+
					 						'</div>'+
					 						'<ul class="m-list-wrap">'+
					 							renderListItems()+
					 						'</ul>'+
					 					'</div>'
					 			function renderListItems() {//渲染这个月的所有视频
					 				var listItems = "";
					 				$.each(item.video_info, function(index, item) {
					 					var itemWrap = '<li class="m-list m-list-'+(index+1)%10+'" data-channel='+item.channel+'>'+
															'<span class="u-point"></span>'+
																itemStatus(item.status, item.teach_type, item.vid, item.num, item.img, item.appoint_id, item.id)+
															'<p class="u-tit01" title="'+item.course_name+'">'+item.course_name+'</p>'+
							 								'<p class="u-tit02">'+item.course_top+' '+item.course_sub+' | '+item.class_date+'</p>'+
														'</li>';
										listItems += itemWrap;

										function itemStatus(status, type, vid, num, img, appoint_id, id) {
											var data = "";
											if(status == 1) {//视频删除
												data = '<div class="m-box" data-status="delected">'+
							 									'<span class="u-flag">'+num+'</span>'+
							 									'<div class="img_wrap delete_video"></div>'+
							 								'</div>'
											} else {//视频未删除
												if(type == '51TalkAC' && vid != "") {//使用51TalkAC并且有视频的
													data = '<div class="m-box">'+
							 									'<span class="u-flag">'+num+'</span>'+
							 									'<span class="u-delect"></span>'+
							 									imgStatus(img)+
							 									'<div class="u-mask">'+
							 										'<p class="play_btn" dataVideo-vid="'+vid+'" data-appoint_id = '+appoint_id+'></p>'+
							 										'<div class="delect_tips">'+
							 											'<p>删除宝贝的视频吗？</p>'+
							 											'<span class="delete_btn" data-id='+id+'>删除</span>'+
							 											'<span class="cancel_btn">取消</span>'+
							 										'</div>'+
							 									'</div>'+
							 								'</div>'
												} else if(type == '51TalkAC' && vid == "") {
													data = '<div class="m-box">'+
							 									'<span class="u-flag">'+num+'</span>'+
							 									'<div class="img_wrap fail_video">'+
							 										'<p class="look_step_success">点我查看如何录制成功</p>'+
							 									'</div>'+
							 								'</div>'
												} else {//没有使用51TalkAC的
													data = '<div class="m-box u-ac-down">'+
																'<span class="u-flag">'+num+'</span>'+
																'<p class="u-ac-tit">'+
																	"未下载AC，无法播放"+'</br>'+
																	'<a href='+Video.downACLink+'>'+'点击下载'+'</a>'+
																'</p>'+
															'</div>'
												}
											};
											return data;
											//图片的状态
											function imgStatus(status) {
												if(status) {
													return ('<div class="img_wrap"><img src="'+img+'"></div>');
												} else {
													return ('<div class="img_wrap empty_img"></div>');
												}
											}
										}
					 				});
					 				return listItems;
					 			};
	 					};
	 					return yearWrap.append(list);
	 				});
 				}
 			},
 			fixSpecialPosition: function() {//处理特殊位置的样式
 				this.mainShowData.find(".m-video").first().addClass("m-video-first");
 				if(this.mainShowData.find(".m-video").last().height() < $(window).height()) {
 					var addHeight =  ($(window).height()-this.mainShowData.find(".m-video").last().height()) + "px";
 					this.mainShowData.find(".m-video").last().after('<div style="height:'+addHeight+';width :100%"></div>');
 				}
 				$(".m-video .m-list-wrap").each(function(index, elem){
	 				var videoPosition = $(elem).find("li").length%10;
	 				if(videoPosition === 1 || videoPosition === 7){
	 					$(elem).find("li").last().addClass("m-list-special");
	 				}
	 			})
 			},
 			dealYearPosition: function() {
 				var that = this;
 				$(".year_position").each(function(index, elem) {
 					var offsetTop = $(elem).find(".m-video").first().offset().top;
 					that.yearPositon.push(offsetTop-45);
 				})
 			},
 			renderNewSideData: function(year) {
 				this.monthArray = [];
 				this.positionArray = [];
 				this.monthBox.empty();
 				for(var i = 0; i < this.videos[year].showData.length; i++) {
 					var month = this.videos[year].showData[i].month;
 					this.monthArray.push(month);
 				}
 				this.futureMonths = this.videos[year].future_month;
 				this.renderSideData(year);
 			},
 			bindEvents: function() {
 				this.yearUpBtn.on('click', $.proxy(this.handleYearUpBtnClick, this));
 				this.yearDownBtn.on('click', $.proxy(this.handleYearDownBtnClick, this));
 				this.maskStep.on('click', '.close_btn', $.proxy(this.handleMaskStepClose, this));
 				this.maskStep.on('click', '.pc_btn, .mac_btn', $.proxy(this.handlePcMacBtnClick, this));
 				this.mainShowData.on('click', '.look_step_success', $.proxy(this.handleLookMaskStepClick, this));
 				this.monthBox.on('click', '.u-odd, .u-even', $.proxy(this.handleMonthClick, this));
 				this.monthBox.on('mouseenter', '.u-odd, .u-even', $.proxy(this.handleMonthMouseEnter, this));
 				this.monthBox.on('mouseleave', '.u-odd, .u-even', $.proxy(this.handleMonthMouseLeave, this));
 			},
 			handleMaskStepClose: function() {
 				this.maskStep.hide();
 			},
 			handleLookMaskStepClick: function() {
 				this.maskStep.show();
 			},
 			handlePcMacBtnClick: function(e) {//利用类的增加和删除控制展示PC or Mac
 				var target = $(e.currentTarget),
 					parent = target.parents('.step_success');
 					if(target.hasClass('pc_btn')) {
 						parent.addClass('pc_success').removeClass('mac_success');
 					} else {
 						parent.addClass('mac_success').removeClass('pc_success');
 					}
 			},
 			renderSideData: function(y) {
 				for(var i = 0; i < 12; i++) {
 					this.monthBox.append('<li></li>');
 				}
 				var curMonth = this.videos[y].showData[0].month || "";
 				if(curMonth) { this.monthBox.find("li").eq(12-curMonth).addClass('u-current');}

 				this.yearNum.html(this.videos[y].year);

 				//月份增加data-top属性
 				for(var i = 0; i < this.monthArray.length; i++) {
 					var videoParent = this.mainShowData.find('.year_position').eq(y).find(".m-video").eq(i),
						videoOffsetTop = videoParent.offset().top,
 						month = this.monthArray[i];
 					this.positionArray.push(videoOffsetTop-45);
 					this.monthBox.find('li').eq(12-month).attr("data-top", videoOffsetTop-45);
 				}
 				//处理每年的未来月份样式
 				for(var m = 0; m < this.futureMonths.length; m++) {
	 				var sideStatus = this.futureMonths[m]%2 === 0? "u-future-even": "u-future-odd";
 					this.monthBox.find("li").eq(12-this.futureMonths[m]).addClass(sideStatus).html(this.futureMonths[m]+"月");
 				}
 				//处理每年上课的月份
 				for(var i = 0; i < this.monthArray.length; i++) {
 					var sideStatus = this.monthArray[i]%2 === 0? "u-even": "u-odd";
 					this.monthBox.find("li").eq(12-this.monthArray[i]).addClass(sideStatus).html(this.monthArray[i]+"月");
 				}

 				//待优化2016-12-19
 				this.monthBox.find("li:even").addClass("u-even-empty");
 				this.monthBox.find("li:odd").addClass("u-odd-empty");
 				//年份上下单机按钮样式
 				if(this.yearArr.length == 1) {
 					this.yearUpBtn.addClass("no_click");
 					this.yearDownBtn.addClass("no_click");
 					return false;
 				} else if(this.yearArr.length > 1 && y == 0) {
 					this.yearUpBtn.addClass("no_click");
 					this.yearDownBtn.removeClass("no_click");
 					return false;
 				} else if(this.yearArr.length > 1 && y == this.yearArr.length-1) {
 					this.yearUpBtn.removeClass("no_click");
 					this.yearDownBtn.addClass("no_click");
 					return false;
 				} else{
 					this.yearUpBtn.removeClass("no_click");
 					this.yearDownBtn.removeClass("no_click");
 					return false;
 				}
 			},
 			handleMonthClick: function(e) {
 				var target  = $(e.currentTarget),
 					targetIndex = target.index(),
 					dis = parseInt(target.attr("data-top"));
 				$("body,html").animate({scrollTop:dis+"px"}, 500);
 			},
 			handleMonthMouseEnter: function(e) {
 				var target  = $(e.currentTarget);
 				if(target.hasClass("u-odd") && !target.hasClass("u-current")){
					target.addClass("u-odd-hover");
				}else if(target.hasClass("u-even") && !target.hasClass("u-current")){
					target.addClass("u-even-hover");
				}
 			},
 			handleMonthMouseLeave: function(e) {
 				var target  = $(e.currentTarget);
 				target.removeClass("u-odd-hover u-even-hover");
 			},
 			windowScroll: function() {
 				$(window).scroll($.proxy(this.handlePosition, this));
 			},
 			handlePosition: function() {
 				var mainDOMoffsetTop = this.main.offset().top,
 					wt = $(window).scrollTop();

 				if(wt > mainDOMoffsetTop) {
 					$('.g-main-init').find('.g-widthMain').addClass('bg_fixed');
 					this.sideDOM.css("position","fixed");
 					this.sideDOM.css("top","30px");
 				} else {
 					$('.g-main-init').find('.g-widthMain').removeClass('bg_fixed');
 					this.sideDOM.css("position","absolute");
 					this.sideDOM.css("top","450px");
 				}
 				//判断年份
 				for(var i = 0; i < this.yearPositon.length; i++) {
 					if(wt < this.yearPositon[i] && i === 0) {
 						this.yearCur = i;
 						this.renderNewSideData(this.yearCur);
 					} else if(wt >= this.yearPositon[i]) {
 						this.yearCur = i;
 						this.renderNewSideData(this.yearCur);
 					}
 				}
 				//判断月份
 				for(var i = 0; i < this.positionArray.length; i++){
 					if(wt < this.positionArray[0]){
 						this.monthBox.find('li').removeClass("u-current");
 						this.monthBox.find('li').eq(12-this.monthArray[0]).addClass("u-current");
 						this.maskTop.hide();
 				    	this.maskBottom.hide();
 					}else if(wt < this.positionArray[i]){
 						this.maskTop.show();
 				    	this.maskBottom.show();
 						this.monthBox.find('li').removeClass("u-current");
 						this.monthBox.find('li').eq(12-this.monthArray[i]-1).addClass("u-current");
 						break;
 					}else if(wt > this.positionArray[i]){
 						this.maskTop.show();
 				    	this.maskBottom.show();
 						this.monthBox.find('li').removeClass("u-current");
 						this.monthBox.find('li').eq(12-this.monthArray[this.positionArray.length-1]).addClass("u-current");
 					}
 				}
 			},
 			handleYearDownBtnClick: function() {
 				if(this.yearCur < this.yearArr.length-1) {
 					this.yearCur++;
 					this.renderNewSideData(this.yearCur);
 					var dis = this.mainShowData.find('.year_position').eq(this.yearCur).offset().top-45;
 					$("body,html").animate({scrollTop:dis+"px"}, 1000);
 				}
 			},
 			handleYearUpBtnClick: function() {
 				if(this.yearCur > 0) {
 					this.yearCur--;
 					this.renderNewSideData(this.yearCur);
 					var dis = this.mainShowData.find('.year_position').eq(this.yearCur).offset().top - 45;
 					$("body,html").animate({scrollTop:dis+"px"}, 1000);
 				}
 			}
 		});


		function PlayVideo() {
			this.videoItem = $('.m-box');
			this.videosPlayBtn = $(".g-main").find(".play_btn");
			this.videosDelectTipsBtn = $(".g-main").find('.u-delect');
			this.delectBtn = $(".g-main").find('.delete_btn');
			this.cancelBtn = $(".g-main").find('.cancel_btn');
			this.yyDialog = $("#yyDialog");
			this.ckplayerDialog = $("#ckplayerMask");
 			this.closeMaskTvBtn = $(".mask-Tv").find('.close');
 			this.delectUrl = $("#delect_url").val();
		}
		$.extend(PlayVideo.prototype, {
			init: function() {
				this.bindEvents();
			},
			bindEvents: function() {
				this.videosPlayBtn.on('click', $.proxy(this.handleVideosPlayBtnClick, this));//打开视频的按钮
				this.closeMaskTvBtn.on('click', $.proxy(this.handleCloseMaskTvBtnClick, this));//关闭视频谈层的按钮
				this.videosDelectTipsBtn.on('click', $.proxy(this.handleDelectTipsBtnClick, this));//打开删除的提示
				this.delectBtn.on('click', $.proxy(this.handleDelectBtnClick, this));//删除这个视频
				this.cancelBtn.on('click', $.proxy(this.handleCancelBtnClick, this));//取消删除这个视频
				this.videoItem.on('mouseenter', $.proxy(this.handlevideoMouseEnter, this));//每个视频悬停
				this.videoItem.on('mouseleave', $.proxy(this.handlevideoMouseLeave, this));//每个视频悬停
			},
			handlevideoMouseEnter: function(e) {//需要优化，以下四个都需要优化
				var target  = $(e.currentTarget),
				    status = target.attr('data-status'),
					delectBtn = target.find('.u-delect'),
					mask = target.find('.u-mask'),
					playBtn = target.find('.play_btn'),
					delectTips = target.find('.delect_tips'),
					imgWrap = target.find('.img_wrap');

				if(status == 'delected') {//已经删除
					return;
				} else if(status == 'delecting'){//删除中
					mask.show();
				} else {
					mask.show();
					playBtn.show();
					delectBtn.show();
				}
			},
			handlevideoMouseLeave: function(e) {//需要优化
				var target  = $(e.currentTarget),
				    status = target.attr('data-status'),
					delectBtn = target.find('.u-delect'),
					mask = target.find('.u-mask'),
					playBtn = target.find('.play_btn'),
					delectTips = target.find('.delect_tips'),
					imgWrap = target.find('.img_wrap');

				if(status == 'delected') {//已经删除
					return;
				} else if(status == 'delecting'){//删除中
					mask.show();
				} else {
					mask.hide();
					playBtn.hide();
					delectBtn.hide();
				}
			},
			handleDelectBtnClick: function(e) {//需要优化
				var target  = $(e.currentTarget),
					id = target.attr('data-id'),
					parents = target.parents('.m-box'),
					deleteTips = parents.find('.delect_tips'),
					imgWrap = parents.find('.img_wrap'),
					data = {
						log_id: id
					};
				deleteTips.hide();
				parents.attr('data-status', 'delected');
				imgWrap.empty().addClass('delete_video');//显示视频删除的图片
				this.sendRequest(this.delectUrl, 'post', data);
			},
			handleCancelBtnClick: function(e) {//需要优化
				var target  = $(e.currentTarget),
					parents = target.parents('.m-box'),
					deleteTips = parents.find('.delect_tips'),
					mask = parents.find('.u-mask'),
					playBtn = parents.find('.play_btn'),
					delectBtn = parents.find('.u-delect');
				mask.show();
				playBtn.show();
				delectBtn.show();
				deleteTips.hide();
				parents.attr('data-status', '');
			},
			handleDelectTipsBtnClick: function(e) {//需要优化
				var target  = $(e.currentTarget),
					parents = target.parents('.m-box'),
					deleteTips = parents.find('.delect_tips'),
					playBtn = parents.find('.play_btn');
				target.hide();
				playBtn.hide();
				deleteTips.show();
				parents.attr('data-status', 'delecting');
			},
			handleVideosPlayBtnClick: function(e){
 				var target  = $(e.currentTarget),
 					VideoSrc = target.attr("dataVideo-vid"),
 					appid = "1818061784",
 					appoint_id = target.attr("data-appoint_id"),
 					channelType = target.parents('li').attr('data-channel'),
 					url = "/nat/grow/ajax_add_hit?appoint_id=" + appoint_id;
 				if(!VideoSrc) return;
				this.sendRequest(url);
 				videoArray = "";
 				playOrder = 0;
 				videoArray = VideoSrc.split(",");
 				if(channelType == 2) {
	 				this.yyPlayVideo(videoArray[playOrder], appid);
 				} else {
 					this.ckplayerPlay(videoArray[playOrder]);
 				}
 			},
 			ckplayerPlay: function(src) {
 				var ckplayerSwfUrl = $("#ckplayer_swf").val();
 				this.ckplayerDialog.show();
 				var flashvars = {
 					f: src,
 					c: 0,
 					b: 1,
 					p: 1,
 					loaded: 'loadedHandler'
 				};
 				CKobject.embed(ckplayerSwfUrl,
 							   'playerContent',
 							   'ckplayer_playerContent',
 							   640,
 							   480,
 							   false,
 							   flashvars,
                			   [src],
                			   {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
 							);
 			},
 			yyPlayVideo: function(v, a) {
 				this.yyDialog.show();
 				yyObject.setPlayerWithURL('http://record.vod.huanjuyun.com/xcrs/'+v+'.m3u8', {
			        appid: a,
			        mode:2,
			        auto_play:1,
			        width:"640",
			        height:"480"
			    }, "playerContainer");
 			},
 			sendRequest: function(url, method, data, success, error) {
 				$.ajax({
 					url: url,
					type: method,
					dataType: 'json',
					data: data,
					success: success,
					error: error
 				})
 			},
 			handleCloseMaskTvBtnClick: function(e) {
 				var target = $(e.currentTarget);
 					parents = target.parents(".mask-Tv");
 				parents.hide();
 			}
		});

		var video = new Video();
		video.init();
		var playVideo = new PlayVideo();
		playVideo.init();

		window.ckplayer_status = function(str){//ckplayer监听
			if(str == 'ended' || str == 'error') {
				var videoLength = videoArray.length;
				if(videoLength >= playOrder) {
					playOrder = playOrder+1;
					playVideo.ckplayerPlay(videoArray[playOrder]);
				}
			}
		}
		window.js_playbackComplete = function() {//yy视频播放结束回调
			var videoLength = videoArray.length;
			if(videoLength >= playOrder){
				playOrder = playOrder+1;
				playVideo.yyPlayVideo(videoArray[playOrder], "1818061784");
			}
		}
		window.errorOccurred = function(errCode, errMsg) {//yy视频错误回调
			var videoLength = videoArray.length;
			if(videoLength >= playOrder){
				playOrder = playOrder+1;
				playVideo.yyPlayVideo(videoArray[playOrder], "1818061784");
			}
		}
	});
});
