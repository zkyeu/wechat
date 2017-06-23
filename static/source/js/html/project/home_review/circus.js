define(function(require, exports, module){
	$(function() {
		function Sprites(img, w, h, maxFrame, align) {//切换图片的方法
			this.x = w/2;
			this.y = h/2;
			this.w = w;
			this.h = h;
			this.align = align;
			this.img = img;
			this.maxFrame = maxFrame;
			this.nowFrame = 0;
			this.times = 0;
		}
		Sprites.prototype = {
			setIntervalDraw: function(context) {
				var that = this;
				this.setIntervalDraw = setInterval(function() {
					that.draw(context);
				}, 16)
			},
			setIntervalNextFrame: function(times, time, callback) {
				var that = this;
				this.setIntervalNextFrame = setInterval(function() {
					that.nextFrame(times,callback);
				}, time);
			},
			setIntervalFrame: function(times, time) {//一直循环
				var that = this;
				this.setIntervalFrame = setInterval(function() {
					that.frame(times);
				}, time);
			},
			draw: function(context) {
				context.clearRect(0, 0, context.canvas.width, context.canvas.height);
				if(this.align === 'horizontal') {
					context.drawImage(this.img, 0, this.nowFrame*this.h, this.w, this.h, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
				} else {
					context.drawImage(this.img, this.nowFrame*this.w, 0, this.w, this.h, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
				}
			},
			frame: function(times) {//一直循环
				if(this.times%2 === 0) {
					this.nowFrame++;
					if(this.nowFrame >= this.maxFrame) {
	                	this.times++;
	                	this.nowFrame = this.maxFrame-1;
	                }
				} else {
					this.nowFrame--;
					if(this.nowFrame == 0) {
	                	this.times++;
	                	this.nowFrame = 1;
	                }
				}
			},
			nextFrame: function(times, callback) {
				this.nowFrame++;
                if(this.nowFrame >= this.maxFrame) {
                	this.times++;
                	this.nowFrame = 0;
                   	if(this.times === times) {
                   		callback();
                   	}
                }
			}
		};

		function Scale(d, name, t) {//页面放大缩小
			this.d = d;
			this.t = t || 0;
			this.wR = $(".theme-common").width()/1920;
			this.hR = $(".theme-common").height()/1080;
			this.r = (this.wR > this.hR)?this.hR:this.wR;
			this.sH = (this.d.height()-this.d.height()*this.r)/2;
			this[name](this.t);
			this.resize(name, this.t);
		}
		Scale.prototype = {
			scaleNone: function() {
				this.extendTransform(this.d, 'scale('+this.r+', '+this.r+')');
			},
			scaleXY: function(t) {
				this.extendTransform(this.d, 'scale('+this.r+', '+this.r+')');
				this.d.css('top', this.r*this.t-this.sH);
			},
			scaleX: function(t) {
				this.extendTransform(this.d, 'scale('+this.r+', 1)');
				this.d.css('top', this.r*this.t-this.sH);
			},
			scaleY: function(t) {
				this.extendTransform(this.d, 'scale(1, '+this.r+')');
				this.d.css('top', this.r*this.t-this.sH);
			},
			extendTransform: function(dom, style) {
				var tArr = ['transform', 'msTransform', 'webkitTransform', 'MozTransform'];
				$.each(tArr, function(index, item) {
					dom.css(item, style);
				});
			},
			resize: function(scaleName, dis) {
				var that = this;
				$(window).resize(function() {
					that.wR = $(".theme-common").width()/1920;
					that.hR = $(".theme-common").height()/1080;
					that.r = (that.wR > that.hR)?that.hR:that.wR;
					that.sH = (that.d.height()-that.d.height()*that.r)/2;
					that[scaleName](dis);
				})
			}
		};

		function SetBackground(dom, bgArr) {//设置背景图片
			this.wrap = dom;
			this.bgArr = bgArr;
			this.wR = $(".theme-common").width()/1920;
			this.hR = $(".theme-common").height()/1080;
			(this.wR > this.hR)?this.wbg():this.hbg();
			this.resize();
		}
		SetBackground.prototype = {
			resize: function(scaleName, dis) {
				var that = this;
				$(window).resize(function() {
					that.wR = $(".theme-common").width()/1920;
					that.hR = $(".theme-common").height()/1080;
					(that.wR > that.hR)?that.wbg():that.hbg();
				})
			},

			wbg: function() {
				this.wrap.css('background', 'url('+this.bgArr[0]+') top center no-repeat');
				this.wrap.css('backgroundSize','auto 100%');
			},

			hbg: function() {
				this.wrap.css('background', 'url('+this.bgArr[1]+') top center no-repeat');
				this.wrap.css('backgroundSize','100% auto');
			}
		};

		function ChooseMold() {//选择题模块
			this.loading = $("#loading-wrap");//loading页
			this.header = $(".header-common");//头部
			this.submitBtn = $('.submitbtn-common');//提交按钮
			this.themeCommon = $('.theme_common');//主题最外层
			this.moldCommon = $('.mold-common');//题型
			this.feedbackMusic = $('#feedbackMusic');//反馈
			this.feedbackWrap = $('.feedback-wrap');//答题反馈
			this.progressNum = $(".progress-common span");//进度数
			this.completeMark = $('.complete-mark');//完成弹层
			this.fetchData = $("#fetchdata").val();//访问数据的地址
			this.submitUrl = $("#submiturl").val();//发送数据的地址
			this.questionMusic = $("#questionMusic");//问题音乐
			this.clickDomMusic = $('#clickMusic');//点击DOM音乐
			this.bgMusic = $('#bgMusic');//背景音乐
			this.allData = {
				'dataList': "",//所有问题的数据
				'questionIndex': 0,//问题数据的索引
				'myQuestionAnswer': "",//我的答案
				'questionAnswer': "",//问题的答案
				'rightQuestionNum': 0,//正确的数量
				'questionId': "",//每道问题的ID
				'recordData': {}, //记录的每道问题ID和我的答案
				'allMusic': {}//所有音乐
			};
			//canvas动画
			this.rabbitContext = $("#rabbit_canvas")[0].getContext('2d');//兔子
			this.clownContext = $('#clown_canvas')[0].getContext('2d');//小丑
			this.progressContext = $("#progress_canvas")[0].getContext('2d');//进度条
			this.ledContext = $("#led_canvas")[0].getContext('2d');//舞台灯
			this.loadingContext = $("#loading_canvas")[0].getContext('2d');//loading
			this.loadingStatus = '';
			this.startCanvasName = {//开始时的canvas动画,和上面的canvas对应
				'ledContext':"",
				'rabbitContext': "",
				'clownContext':""
			}
		};
		$.extend(ChooseMold.prototype, {
			init: function() {
				this.sendRequest(this.fetchData, "post", "", this.handleSendRequestBefore, this.handleSendRequestSuccess, this.handleSendRequestError);
				this.bindEvents();
				//开始状态时的canvas动画小丑、兔子、舞台灯
				this.startCanvas('clownContext');
				this.startCanvas('rabbitContext');
				this.startCanvas('ledContext');
			},
			bindEvents: function() {
				this.moldCommon.on('click', '.playbtn-common', $.proxy(this.handlePlayBtnClick, this));
				this.moldCommon.on('click', '.options-common>li', $.proxy(this.handleOptionsItemClick, this));
				this.submitBtn.on('click', $.proxy(this.handleSubmitBtnClick, this));
			},
			renderData: {//渲染数据问题列表、头部、进度条
				questionList: function(data) {
					var list = "",
						moldName = "",
						answer = data.sections.ok;
					var renderNTME = {
						notice: function(data) {
							return (data)?'<h3 class="question-notice">'+data+'</h3>':"";
						},
						title: function(data) {
							return (data)?'<p class="question-title">'+data+'</p>':"";
						},
						music: function(data) {
							return (data)?'<div class="playbtn-common" data-url='+data+'>'+
										'<canvas width="90" height="90" class="audio-canvas">'+
									'</div>':'<div style="height:80px;"></div>';
						}
					};
					switch (data.subtype) {
						case '11'://听单词选图片'11'
						case '17'://看句子选图片'17'
							moldName = 'mold-a';//图片的都是题型a
							list += renderNTME.notice(data.notice)+
									renderNTME.title(data.title)+
									renderNTME.music(data.mp3)+
									optionsItem(data.sections)
							break;
						case '12'://听音选单词'12'
						case '13'://听音和提示选句子'13'
						case '14'://听句子选单词'14'
							moldName = 'mold-b';//句子和单词的都是题型b
							list += renderNTME.notice(data.notice)+
									renderNTME.title(data.title)+
									renderNTME.music(data.mp3)+
									optionsItem(data.sections)
							break;
					};
					return [moldName, list, answer, data.id];
					//渲染选项列表,图片、单词、句子
					function optionsItem(data) {
						var optionsList = '';
						var adapter = {
							'0': 'A',
							'1': 'B',
							'2': 'C'
						}
						switch(true) {
							case (!!data.imgs):
								optionsList = '<ul class="options-common">';
								$.each(data.imgs, function(index, item) {
									optionsList += '<li>'+
														'<img src='+item+'>'+
														'<p>'+adapter[index]+'</p>'+
													'</li>';
								});
								break;
							case (!!data.texts):
								optionsList = '<ul class="options-common">';
								$.each(data.texts, function(index, item) {
									optionsList += '<li><p>'+adapter[index]+'. '+item+'</p></li>';
								});
								break;
							case (!!data.words):
								optionsList = '<ul class="options-common">';
								$.each(data.words, function(index, item) {
									optionsList += '<li class="word"><p>'+adapter[index]+'. '+item+'</p></li>';
								});
								break;
						}
						return optionsList+'</ul>';
					};
				},
				header: function(data1, data2) {
					ChooseMold.apply(this, arguments);
					this.header.find('.header-common-level').html(data1[1] || "");
					this.header.find('.header-common-pdf').attr('href', data2);
				},
				progressShow: function(nowNum, allNum) {
					ChooseMold.apply(this, arguments);
					var disEdg = Math.ceil((348-190)/allNum),
						that = this;
					var sP = 190+(nowNum-1)*disEdg;
					var dis = 0;
					this.progressNum.html(nowNum+'/'+allNum);
					var timer = setInterval(function() {
						dis++;
						that.progressContext.moveTo(114.5, 119);
						that.progressContext.arc(114.5, 119, 110, d2a(190), d2a(sP+dis), false);
						that.progressContext.lineWidth = 10;
						that.progressContext.strokeStyle = '#adc64b';
						that.progressContext.stroke();
						if(dis >= disEdg){
							clearInterval(timer);
						}
					}, 16);

					function d2a(n) {
						return n*Math.PI/180;
					}
				}
			},
			handleSendRequestBefore: function() {
				var that = this;
				this.loadingStatus = new Sprites($(".loading_img")[0], 350, 500, 15);
				this.loadingStatus.setIntervalDraw(that.loadingContext);
				this.loadingStatus.setIntervalNextFrame( 2, 100, function() {});
			},
			handleSendRequestSuccess: function(res) {
				this.allData.dataList = res.data.list;
				this.allData.allMusic = res.data.theme.mp3;
				this.playBgMusic(this.allData.allMusic.bg);
				var that = this;
				var bgArray = [res.data.theme.w_bg, res.data.theme.h_bg];
				var returnArray = this.renderData['questionList'](this.allData.dataList[this.allData.questionIndex]);
				this.moldCommon.empty().attr('class', 'mold-common');
				this.moldCommon.addClass(returnArray[0]).append(returnArray[1]);
				this.allData.questionAnswer = returnArray[2];
				this.allData.questionId = returnArray[3];
				//头部显示、进度显示
				this.renderData['header'](res.data.parentNameList, res.data.review_book);
				this.progressNum.html(this.allData.questionIndex+'/'+this.allData.dataList.length);
				//Scale和设置背景
				new Scale($('.complete-common'), 'scaleNone');
				new Scale($('.header-common'), 'scaleY');
				new Scale($('.header-common>a'), 'scaleX');
				new Scale($('.header-common>p'), 'scaleX');
				new Scale($('.feedback-wrap'), 'scaleXY');
				new Scale($('.mold-common'), 'scaleXY');
				new Scale($('.canvas-wrap'), 'scaleXY');
				new Scale($('.submitbtn-common'), 'scaleXY', 840);
				new Scale($('.progress-common'), 'scaleXY', 988);
				new SetBackground($(".theme-common"), bgArray);
				//loading状态取消
				setTimeout(function() {
					that.loading.animate({opacity: 0}, 100, function() {
						clearInterval(that.loadingStatus.setIntervalDraw);
						clearInterval(that.loadingStatus.setIntervalNextFrame);
						that.loading.hide();
					});
				}, 2000);
			},
			sendRequest: function(url, method, data, beforeSend, success, error) {
		        $.ajax({
		          url: url,
		          type: method,
		          dataType: 'json',
		          data: data,
		          context: this,
		          beforeSend: beforeSend,
		          success: success,
		          error: error
		        });
		    },
		    setIntervalNextFrame: function(times, time, callback) {
				var that = this;
				this.setIntervalNextFrame = setInterval(function() {
					that.nextFrame(times,callback);
				}, time);
				this.newCanvas($(".loading_img")[0], 260, 374, 15, '', this.loadingContext, 1, 100);
			},
			playBgMusic:function(music) {
				this.bgMusic.jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                mp3: music
			            }).jPlayer("play");
			        },
			        ended: function() { 
					    $(this).jPlayer("play"); 
					},
		            swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",        
		            supplied: "m4a, mp3",
		            wmode: "window",
		            autoBlur: false,
		            smoothPlayBar: true,
		            remainingDuration: true,
		            toggleDuration: true
		    	});
			},
		    playFeedbackMusic: function(music) {//播放答题反馈音乐
		    	this.feedbackMusic.jPlayer("setMedia", {
	                mp3: music
	            }).jPlayer("play");
				this.feedbackMusic.jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                mp3: music
			            }).jPlayer("play");
			        },
		            swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
		            supplied: "m4a, mp3",
		            wmode: "window",
		            autoBlur: false,
		            smoothPlayBar: true,
		            remainingDuration: true,
		            toggleDuration: true
		    	});
		    },
			playClickDomMusic: function() {//点击dom的声音
				var that = this;
				this.clickDomMusic.jPlayer("play");
				this.clickDomMusic.jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                mp3: that.allData.allMusic.click
			            }).jPlayer("play");
			        },
		            swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
		            supplied: "m4a, mp3",
		            wmode: "window",
		            autoBlur: false,
		            smoothPlayBar: true,
		            remainingDuration: true,
		            toggleDuration: true
		    	});
			},
			handlePlayBtnClick: function(e) {//点击播放按钮,没分离,分离请注意作用域
				var target = $(e.currentTarget),
					playUrl = target.data('url'),
					canvas = target.find('canvas'),
					context = canvas[0].getContext('2d'),
					that = this;
		  		if(target.hasClass('isplaying')) {return};
		    	target.addClass('isplaying');
		    	this.bgMusic.jPlayer("volume", '0.1');
		    	//播放时的Canvas
		    	canvas.css('visibility', 'visible');
		    	var playCanvas = new Sprites($('.playing_audio')[0], 90, 90, 25);
		    	playCanvas.setIntervalDraw(context);
				playCanvas.setIntervalNextFrame( 2, 30, function() {});
				//播放音乐
				this.questionMusic.jPlayer("setMedia", {
	                mp3: playUrl
	            }).jPlayer("play");
				this.questionMusic.jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                mp3: playUrl
			            }).jPlayer("play");
			        },
		            swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
		            supplied: "m4a, mp3",
		            wmode: "window",
		            autoBlur: false,
		            smoothPlayBar: true,
		            remainingDuration: true,
		            toggleDuration: true
		    	});
		    	this.questionMusic.bind($.jPlayer.event.ended, function(event) {
		    		target.removeClass('isplaying');
		    		clearInterval(playCanvas.setIntervalDraw);
					clearInterval(playCanvas.setIntervalNextFrame);
					canvas.css('visibility', 'hidden');
					that.bgMusic.jPlayer("volume", '1');
		    	})
			},
			handleOptionsItemClick: function(e) {//点击选项
				var target = $(e.currentTarget);
				var that = this;
				this.playClickDomMusic();
				this.addRemoveClass(target, 'options_click', function(e) {
					var adapter = {
						'0': 'A',
						'1': 'B',
						'2': 'C'
					}
					that.allData.myQuestionAnswer = adapter[e];
				});
			},
			handleSubmitBtnClick: function(e) {//点击提交按钮,有callback注意
				var target = $(e.currentTarget),
					that = this,
					feedChild = this.feedbackWrap.find('.feedback');
				if(target.hasClass('clickMark')) {return};//防止连续提交处理
				target.addClass('clickMark');
				this.playClickDomMusic();
				switch(this.allData.myQuestionAnswer) {
					case (''):
						handleFeedBack('empty', function() {
						});
						break;
					case (this.allData.questionAnswer):
						handleFeedBack('right', function() {
							renderNextQuestion();
						});
						break;
					default:
						handleFeedBack('error', function() {
							renderNextQuestion();
						});
				};
				function renderNextQuestion() {//渲染下一道题
					that.allData.recordData[that.allData.questionId] = that.allData.myQuestionAnswer;
					that.allData.myQuestionAnswer = "";
					that.allData.questionAnswer = "";
					if(that.allData.questionIndex >= that.allData.dataList.length) {
						var data = {item: that.allData.recordData};
						that.completeTips(that.allData.rightQuestionNum, that.allData.dataList.length);
						that.sendRequest(that.submitUrl, "post", data);
						return;
					} else {
						var returnArray = that.renderData['questionList'](that.allData.dataList[that.allData.questionIndex]);
						that.allData.questionId = returnArray[3];
						that.moldCommon.animate({opacity: 0.3}, 400, function() {
							that.moldCommon.empty().attr('class', 'mold-common');
							that.moldCommon.addClass(returnArray[0]).append(returnArray[1]);
							that.allData.questionAnswer = returnArray[2];
							that.moldCommon.animate({opacity: 1}, 400, function() {});
						});
					}
				};
				function handleFeedBack(status, callback) {//处理答题反馈,有callback注意
					var statusHandle = {
						'empty': function() {
							return ['请选择答案', 'empty', 'bounceInDownError'];
						},
						'right': function() {
							that.allData.questionIndex++;
							that.allData.rightQuestionNum++;
							that.playFeedbackMusic(that.allData.allMusic.answer_success);
							//canvas
							that.closeStartCanvas('rabbitContext');
							that.closeStartCanvas('clownContext');
							that.newCanvas($(".rabbit_sprites_success")[0], 210, 327, 18, '', that.rabbitContext, 1, 100, function() {
								that.startCanvas('rabbitContext');
							});
							that.newCanvas($(".led_sprites")[0], 1920, 245, 2, 'horizontal', that.ledContext, 9, 100, function() {
								that.startCanvas('ledContext');
							});
							that.newCanvas($(".clown_sprites_success")[0], 434, 390, 20, '', that.clownContext, 1, 100, function() {
								that.startCanvas('clownContext');
							});
							that.renderData['progressShow'](that.allData.questionIndex, that.allData.dataList.length);
							return ['回答正确', '', 'bounceInDownSuccess'];
						},
						'error': function() {
							that.allData.questionIndex++;
							that.playFeedbackMusic(that.allData.allMusic.answer_fail);
							//canvas
							that.closeStartCanvas('rabbitContext');
							that.closeStartCanvas('clownContext');
							that.newCanvas($(".rabbit_sprites_error")[0], 210, 327, 18, '', that.rabbitContext, 1, 100, function() {
								that.startCanvas('rabbitContext');
							});
							that.newCanvas($(".clown_sprites_error")[0], 434, 390, 10, '', that.clownContext, 1, 100, function() {
								that.startCanvas('clownContext');
							});
							that.renderData['progressShow'](that.allData.questionIndex, that.allData.dataList.length);
							return ['正确答案'+that.allData.questionAnswer, 'error', 'bounceInDownError'];
						}
					};
					//start反馈动画
					var returnArray = statusHandle[status]();
					that.feedbackWrap.show();
					feedChild.attr('class', 'feedback');
					feedChild.find('.text').html(returnArray[0]);
					feedChild.addClass(returnArray[1]);
					feedChild.addClass(returnArray[2]);
					//resume反馈动画、callback渲染下一道题
					setTimeout(function() {
						feedChild.css('top', 0)
						         .removeClass('bounceInDownSuccess bounceInDownError')
								 .animate({'top': '-100%'}, 500, function() {
								 	$(this).css('top', 0);
									that.feedbackWrap.hide();
									target.removeClass('clickMark');
									callback();
								 });
					}, 1500);
				}
			},
			completeTips: function(rightNum, allNum) {//完成提示,可写配置
				var that = this;
				if(rightNum/allNum == 1) {
					that.playFeedbackMusic(that.allData.allMusic.complete_success);
					completeStatus('complete-allright', '100分', '小朋友好棒，'+allNum+'道题全部答对！');
				} else if(rightNum/allNum >= 0.6) {
					that.playFeedbackMusic(that.allData.allMusic.complete_success);
					completeStatus('complete-excellent', '回答正确<span>'+rightNum+'</span>道题', '回答错误'+(allNum-rightNum)+'道题，继续努力哦！');
				} else {
					that.playFeedbackMusic(that.allData.allMusic.complete_fail);
					completeStatus('complete-tryagain', '宝贝加油', '回答正确'+rightNum+'道题，回答错误'+(allNum-rightNum)+'道题，别灰心！');
				}
				function completeStatus(className, text1, text2) {
					that.completeMark.show();
					var completeMain = that.completeMark.find('.complete-common'),
						tips1 = that.completeMark.find('.answer-right-tips'),
						tips2 = that.completeMark.find('.answer-error-tips');
					completeMain.addClass(className);
					tips1.html(text1);
					tips2.html(text2);
				}
			},
			newCanvas: function(img, w, h, frame, dir, contextName, num, time, callback, x, y) {//成功失败的动画的展示,没扩展,写到这我并不想写了
				var that = this;
				var sprite = new Sprites(img, w, h, frame, dir);
					sprite.x = x || w/2;
					sprite.y = y || h/2; 
					sprite.setIntervalDraw(contextName);
					sprite.setIntervalNextFrame(num, time, function() {
						clearInterval(sprite.setIntervalDraw);
						clearInterval(sprite.setIntervalNextFrame);
						if(callback){callback()};//以后再改吧
					});
			},
			startCanvas: function(name) {//没时间改
				switch(name) {
					case ('clownContext'): 
						this.startCanvasName[name] = new Sprites($(".clown_sprites")[0], 434, 390, 20);//小丑
						this.startCanvasName[name].setIntervalDraw(this[name]);
						this.startCanvasName[name].setIntervalFrame(2, 80, function() {});
						break;
					case ('ledContext'): 
						this.startCanvasName[name] = new Sprites($(".led_none")[0], 1920, 245, 2, 'horizontal');//舞台
						this.startCanvasName[name].draw(this[name]);
						break;
					case('rabbitContext'):
						this.startCanvasName[name] = new Sprites($(".rabbit_sprites")[0], 210, 327, 20);//兔子
						this.startCanvasName[name].setIntervalDraw(this[name]);
						this.startCanvasName[name].setIntervalFrame(2, 100, function() {});
				}
			},
			closeStartCanvas: function(name) {//关闭开始状态的时候的canvas
				clearInterval(this.startCanvasName[name].setIntervalDraw);
				clearInterval(this.startCanvasName[name].setIntervalFrame);
			},
			addRemoveClass: function(dom, name, callback) {//增加移除类,很局限
				if(!dom.hasClass(name)) {
					dom.addClass(name).siblings().removeClass(name);
					callback(dom.index());
				}
			}
		});
		var chooseMold = new ChooseMold();
		chooseMold.init();
	})
});
