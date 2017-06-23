define(function(require, exports, module){
	$(function() {
		var tell = '有问题联系13029727256';
		var allData = {
			'dataList': "",//所有问题的数据
			'questionIndex': 0,//问题数据的索引
			'myQuestionAnswer': "",//我的答案
			'questionAnswer': "",//问题的答案
			'rightQuestionNum': 0,//正确的数量
			'questionId': "",//每道问题的ID
			'recordData': {}//记录的每道问题ID和我的答案
		};

		var finishConfig = {
		    "width": 1920,
		    "height": 1080,
		    "renderer": Phaser.CANVAS,
		    "transparent": true,
		    "parent": "finish"
		};
		var finishGame = new Phaser.Game(finishConfig);

		var gameConfig = {
		    "width": 1920,
		    "height": 1080,
		    "renderer": Phaser.CANVAS,
		    "transparent": true,
		    "parent": "game"
		};
		var game = new Phaser.Game(gameConfig);
		game.States = {};

		game.States.boot = function() {
			this.preload = function() {
				game.load.spritesheet('loading', loadingSprite.url, loadingSprite.width, loadingSprite.height, 15);
				this.fetchDataUrl = $("#fetchdata").val();
				this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			};
			this.create = function() {
				// this.startLoadAllData();
				this.sendRequest(this.fetchDataUrl, 'post', '', this.handleFetchDataBefore, this.handleFetchDataSuccess, this.handleFetchDataError);
			}
			this.loadingAnimate = function() {
				this.loading = game.add.sprite(game.world.centerX, game.world.centerY, 'loading', 0);
				this.loading.visible = false;
				this.loading.animations.add('bear');
				this.loading.play('bear', 15, true);
				this.loading.anchor.set(0.5);
			}
			this.startLoadAllData = function() {
				game.load.onLoadStart.add(this.loadStart, this);
				game.load.onFileComplete.add(this.fileComplete, this);
				game.load.onLoadComplete.add(this.loadComplete, this);
				game.state.start('preload');
			}
			this.handleFetchDataBefore = function() {
				this.loadingAnimate();
			}
			this.handleFetchDataSuccess = function(res) {
				allData.dataList = res;
				this.startLoadAllData();
			}
			this.handleFetchDataError = function() {
			}
			this.sendRequest = function(url, method, data, beforeSend, success, error) {
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
			}
			this.loadStart = function() {
				this.loadingAnimate();
			}
			this.fileComplete = function(progress, cacheKey, success, totalLoaded, totalFiles) {
				if(this.scale.width!=1920 || this.scale.height != 1080) {
					this.loading.visible = true;
				}
			    // console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
			}
			this.loadComplete = function() {
			    this.loading.kill(); 
			    game.state.start('render');
			}
		};
	 
		game.States.preload = function() {
			this.preload = function() {
				//主题的固定资源
				$.each(assetsJson.game.type, function(type, data) {
					if(type == "image" && data.length > 1) {
						$.each(data, function(index, item) {
							game.load.image(item.key, item.url);
						})
					} else if(type == "spritesheet" && data.length > 1) {
						$.each(data, function(index, item) {
							game.load.spritesheet(item.key, item.url, item.width, item.height);
						})
					} else if(type == "audio" && data.length > 1) {
						$.each(data, function(index, item) {
							game.load.audio(item.key, item.url);
						})
					}
				});

				//加载的所有音频和图片
				// $.each(allData.dataList.data.list, function(index, item) {
				// 	game.load.audio('answerMp3_'+index, item.mp3);
				// 	(item.sections.imgs == "" || item.sections.imgs == null)?"": loadAnswer(item.sections.imgs, index);
				// })
				$.each(allData.dataList.data.list, function(index, item) {
					(item.sections.imgs == "" || item.sections.imgs == null)?"": loadAnswer(item.sections.imgs, index);
				})
				function loadAnswer(data, parentIndex) {
					$.each(data, function(index, item) {
						game.load.image('answerImg_' + parentIndex + '_' + index, item);
					})
				}
				game.load.start();
			};
		}

		game.States.render = function() {
			this.create = function() {
				this.questionMp3 = $("#question_mp3");
				this.sendDataUrl = $('#submiturl').val();
				this.setBgckgroundImage();
				this.emitterStart();
				this.bgMusic = game.add.audio('bgMusic');
				this.bgMusic.onDecoded.add(this.bgMusicPlay, this);
				this.clickMusic = game.add.audio('clickMusic');
				this.answerFailMusic = game.add.audio('answerFailMusic');
				this.answerSuccessMusic = game.add.audio('answerSuccessMusic');

				this.clownNoneStart();
				this.rabbitNoneStart();
				this.ledNoneStart();
				
				this.renderHeader(allData.dataList.data.parentNameList[1], allData.dataList.data.review_book);
				this.renderQuestion(allData.questionIndex);
				this.renderProgressInit(allData.dataList.data.list.length);
				this.renderProgress(allData.questionIndex, allData.dataList.data.list.length);
				this.submitBtn = game.add.button(game.world.centerX, 870, 'submitBtn', this.submitBtnClick, this, 1, 0, 1);
				this.submitBtn.anchor.set(0.5);

				this.playingBtn = game.add.sprite(game.world.width/2, 350, 'playingBtn', 0);
				this.playingBtn.anchor.set(0.5);
				this.playingBtnAnimate = this.playingBtn.animations.add('playing');
				this.playingBtn.visible = false;
			}
			this.setBgckgroundImage = function() {
				var that = this;
				this.canvasWidth = $("#game").find('canvas').width();
				this.wRatio = this.canvasWidth/$("body").width();
				this.canvasHeight = $("#game").find('canvas').height();
				this.hRatio = this.canvasHeight/$("body").height();
				(this.wRatio > this.hRatio)?wRatio():hRatio();

				$(window).resize(function() {
					that.canvasWidth = $("#game").find('canvas').width();
					that.wRatio = that.canvasWidth/$("body").width();
					that.canvasHeight = $("#game").find('canvas').height();
					that.hRatio = that.canvasHeight/$("body").height();
					(that.wRatio > that.hRatio)? wRatio():hRatio();
					that.renderHeader();
				});

				function wRatio() {
					that.ratio = (that.wRatio > that.hRatio)? Math.floor(that.canvasWidth)/1920: Math.floor(that.canvasHeight)/1080;
					$('#game').addClass('game_bg02').removeClass('game_bg01');
				}

				function hRatio() {
					that.ratio = (that.wRatio > that.hRatio)? Math.floor(that.canvasWidth)/1920: Math.floor(that.canvasHeight)/1080;
					$('#game').addClass('game_bg01').removeClass('game_bg02')
				}
			}
			this.sendRequest = function(url, method, data, beforeSend, success, error) {
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
			}
			this.emitterStart = function() {
				this.emitter = game.add.emitter(game.world.centerX, 850, 15);
				this.emitter.makeParticles('star');
				this.emitter.minParticleSpeed.setTo(-100, 1);
			    this.emitter.maxParticleSpeed.setTo(100, 5);
			    this.emitter.minParticleScale = 0.5;
			    this.emitter.maxParticleScale = 1.5;
			    this.emitter.setRotation(30, 30);
			    this.emitter.gravity = -17;
			    this.emitter.flow(12000, 500, 1, -1);
			}
			this.playMp3BtnClick = function() {
				var playUrl = this.playUrl;
				var that = this;
				if(!playUrl) {
					return;
				}

				this.bgMusic.volume = 0.1;
				this.playMp3Btn.visible = false;
				this.playingBtn.visible = true;
				this.playingBtnAnimate.play(20, true);

				this.questionMp3.jPlayer("setMedia", {
	                mp3: playUrl
	            }).jPlayer("play");
				this.questionMp3.jPlayer({
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

		    	this.questionMp3.bind($.jPlayer.event.ended, function(event) {
		    		that.bgMusic.volume = 1;
					that.playMp3Btn.visible = true;
					that.playingBtn.visible = false;
		    	})
			}
			this.bgMusicPlay = function() {
				this.bgMusic.loop = true;
				this.bgMusic.play();
			}
			this.renderHeader = function(courseName, pdfLink) {
				var that = this;
				$('.game_header').show();
				$('.course_name').html(courseName);
				$('.pdf_down').attr('href', pdfLink);
				//头部的尺寸
				scaleY($("#game_header"));
				scaleX($(".course_name"), 'left', 'marginLeft');
				scaleX($(".pdf_down"), 'right', 'marginRight');

				function scaleX(dom, dir, mdir) {
					var dis = ($("body").width() - that.canvasWidth)/2 + 30;
					extendTransform(dom, 'scale('+that.ratio+', 1)');
					dom.css(dir, -(1-that.ratio)*dom.width()/2+'px');
					dom.css(mdir, dis+'px');
				}

				function scaleY(dom) {
					var top = (dom.height() - Math.floor(dom.height()*that.ratio))/2;
					extendTransform(dom, 'scale(1, '+that.ratio+')');
					dom.css('top', -top);
				}

				function extendTransform(dom, style) {
					var tArr = ['transform', 'msTransform', 'webkitTransform', 'MozTransform'];
					$.each(tArr, function(index, item) {
						dom.css(item, style);
					});
				}
			}
			this.renderProgressInit = function(allNum) {
				this.moveNum = Math.ceil((347-193)/allNum);
				this.angle = {
					start: 193,
					end: 193
				}
				this.progressGroup = game.add.group();
				this.progressGroup.x = game.world.centerX;
				this.progressGroup.y =1035;
				this.progressBg = game.add.image(0, 0, 'progress');
				this.progressBg.anchor.set(0.5);
				var progressStyle = {
					font: '30px Microsoft YaHei',
					fontWeight: 'bold',
					fill: '#fff0a9'
				}
				this.progressText = game.add.text(0, 15, '', progressStyle);
				this.progressText.anchor.set(0.5);
				this.progress = game.add.graphics(0, 0);
				
				this.progressGroup.add(this.progressBg);
				this.progressGroup.add(this.progressText);
				this.progressGroup.add(this.progress);
			}
			this.renderProgress = function(nowNum, allNum) {
				this.progressNum = game.add.tween(this.angle).to( { end:nowNum*this.moveNum + this.angle.start}, 1000, "Linear");
				this.progressNum.start();
				this.progressText.text = nowNum + '/' + allNum;
			}
			
			this.renderQuestionInit = function() {
				allData.questionIndex++;
				this.allAnswerGroup.destroy();
				this.title.destroy();
				this.notice.destroy();
				this.playMp3Btn.destroy();
				this.playingBtn.visible = false;
				if(this.playMp3) {
					this.playMp3.destroy();
				}
				this.allquestionGroup.destroy();
				this.renderQuestion(allData.questionIndex);
			}
			this.renderQuestion = function(num) {
				var data = allData.dataList.data.list[num]
				//初始化数据
				this.allAnswerGroup = game.add.group();
				this.feedbackStartStatus = true;//feedback状态
				allData.myQuestionAnswer = "";
				allData.questionAnswer = data.sections.ok;
				allData.questionId = data.id;
				this.playUrl = "";
				var titleStyle = {
					font: '30px Microsoft YaHei',
					fill: '#ffd2fd',
					align: 'center'
				};
				var adapter = {
					'0': 'A',
					'1': 'B',
					'2': 'C'
				};
				//题型、题目、音乐
				this.notice = game.add.text(game.world.width/2, 190, '', titleStyle);
				this.title = game.add.text(game.world.width/2, 250, '', titleStyle);
				this.playMp3Btn = game.add.button(game.world.width/2, 350, 'playBtn', this.playMp3BtnClick, this, 1, 0, 1);
				this.notice.anchor.set(0.5);
				this.title.anchor.set(0.5);
				this.playMp3Btn.anchor.set(0.5);

				this.allquestionGroup = game.add.group();
				this.allquestionGroup.add(this.title);
				this.allquestionGroup.add(this.notice);
				this.allquestionGroup.add(this.playMp3Btn);
				this.allquestionGroup.alpha = 0;
				game.add.tween(this.allquestionGroup).to({alpha: 1}, 1500, "Linear", true);
				
				//遍历题型
				switch (data.subtype) {
					case '13'://听音选图
					case '14'://看句子选图
						this.title.text = data.title || "";
						this.notice.text = data.notice || "";
						(data.mp3 == "" || data.mp3 == null)? this.playMp3Btn.destroy(): this.playUrl = data.mp3;
						break;
					case '11'://听音选单词
					case '12'://听音选句子
					case '15'://看句子选句子
					case '16'://看句子选单词
						this.title.text = data.title || "";
						this.notice.text = data.notice || "";
						(data.mp3 == "" || data.mp3 == null)? this.playMp3Btn.destroy(): this.playUrl = data.mp3;
						break;
				};
				//遍历题型选项
				switch(true) {
					case (!!data.sections.imgs):
						var button;
						var img;
						var chooseText;
						var answerGroup = null;
						var answerStyle = {
								font: '36px Microsoft YaHei',
								fill: '#ffffff',
								fontWeight: 'bold'
							};
						var positionArray = (data.sections.imgs.length === 3)? [[550, 570], [965, 570], [1380, 570]]: [[750, 570], [1165, 570]];

						for(var i = 0; i < data.sections.imgs.length; i++) {
							answerGroup = game.add.group();
							answerGroup.x = positionArray[i][0];
							answerGroup.y = positionArray[i][1];

							img = game.add.image(0, -30, 'answerImg_'+allData.questionIndex+ '_' + i);
							img.scale.set(0.8, 0.8);
							img.anchor.set(0.5);

							chooseText = game.add.text(0, 120, adapter[i], answerStyle);
							chooseText.setShadow(0, 3, 'rgba(0, 0, 0, 0.5)', 2);
							chooseText.anchor.set(0.5);

							button = game.add.button(0, 0, 'answerBg', this.answerImgClick, this, 1, 0, 0);
							button.anchor.set(0.5);
							button.answer = adapter[i];
							button.name = 'button';

							answerGroup.add(button);
							answerGroup.add(img);
							answerGroup.add(chooseText);
							this.allAnswerGroup.add(answerGroup);
						}
						break;
					case (!!data.sections.texts):
						var button;
						var answerText;
						var answerGroup = null;
						var answerStyle = {
							font: '24px Microsoft YaHei',
							boundsAlignV: 'middle',
							boundsAlignH: 'left',
							fill: '#ffffff'
						}
						var positionArray = (data.sections.texts.length === 3)? [440, 550, 660]: [440, 550];
						for(var i = 0; i < data.sections.texts.length; i++) {
							answerGroup = game.add.group();
							answerGroup.x = game.world.centerX;
							answerGroup.y = positionArray[i];
							answerGroup.pivot.x = 500;

							button = game.add.button(500, 0, 'textsBg', this.answerTextsClick, this, 1, 0, 2);
							button.anchor.set(0.5, 0);
							button.answer = adapter[i];
							button.name = 'button';

							answerText = game.add.text(0, 0, adapter[i] + '. '+ data.sections.texts[i], answerStyle);
							answerText.setTextBounds(40, 0, 1000, 70);
							answerText.name = 'text';
							answerGroup.add(button);
							answerGroup.add(answerText);
							this.allAnswerGroup.add(answerGroup);
						}
						break;
					case (!!data.sections.words):
						var button;
						var answerText;
						var answerGroup = null;
						var answerStyle = {
							font: '24px Microsoft YaHei',
							boundsAlignV: 'middle',
							boundsAlignH: 'center',
							fill: '#ffffff'
						}
						var positionArray = (data.sections.words.length === 3)? [440, 550, 660]: [440, 550];
						for(var i = 0; i < data.sections.words.length; i++) {
							answerGroup = game.add.group();
							answerGroup.x = game.world.centerX;
							answerGroup.y = positionArray[i];
							answerGroup.pivot.x = 150;

							button = game.add.button(150, 0, 'wordsBg', this.answerTextsClick, this, 1, 0, 2);
							button.anchor.set(0.5, 0);
							button.answer = adapter[i];
							button.name = 'button';

							answerText = game.add.text(0, 0, adapter[i] + '. '+ data.sections.words[i], answerStyle);
							answerText.setTextBounds(0, 0, 300, 70);
							answerText.name = 'text';
							answerGroup.add(button);
							answerGroup.add(answerText);
							this.allAnswerGroup.add(answerGroup);
						}
						break;
				}
				this.allAnswerGroupTween();
			}
			this.allAnswerGroupTween = function() {
				var answerGroupIndex = 0;
				this.allAnswerGroup.forEach(function(item) {
					item.alpha = 0;
					answerGroupIndex++;
					game.add.tween(item).to({alpha: 1}, 1000, "Linear", true, answerGroupIndex*500);
					game.add.tween(item).to({y:'+20'}, 1000, Phaser.Easing.Bounce.Out, true, answerGroupIndex*500);
				});
			}
			this.answerImgClick = function(button) {
				this.clickMusic.play();
				allData.myQuestionAnswer = button.answer;
				var buttonParent = button.parent;
				buttonParent.parent.forEach(function(item) {
					if(item == buttonParent) {
						game.add.tween(item.scale).to({x:1.1, y:1.1}, 200, "Linear", true);
						childForEach(item, function(button) {
							button.setFrames(2, 2, 2);
						});
					} else {
						game.add.tween(item.scale).to({x:1, y:1}, 200, "Linear", true);
						childForEach(item, function(button) {
							button.setFrames(1, 0, 0);
						});
					}
				});

				function childForEach(parent, callbackButton) {
					parent.forEach(function(child) {
						if(child.name == 'button') {
							callbackButton(child);
						}
					})
				}
			}
			this.answerTextsClick = function(button) {
				this.clickMusic.play();
				allData.myQuestionAnswer = button.answer;
				var buttonParent = button.parent;
				buttonParent.parent.forEach(function(item) {
					if(item == buttonParent) {
						game.add.tween(item.scale).to({x:1.05, y:1.05}, 200, "Linear", true);
						childForEach(item, function(button) {
							button.setFrames(2, 2, 2);
						}, function(text) {
							text.fill = '#fffbba';
						});
					} else {
						game.add.tween(item.scale).to({x:1, y:1}, 200, "Linear", true);
						childForEach(item, function(button) {
							button.setFrames(1, 0, 0);
						}, function(text) {
							text.fill = '#ffffff';
						});
					}
				});

				function childForEach(parent, callbackButton, callbackText) {
					parent.forEach(function(child) {
						if(child.name == 'button') {
							callbackButton(child);
						} else if(child.name == 'text') {
							callbackText(child);
						}
					})
				}
			}
			this.answerWordsClick = function(button) {
				this.clickMusic.play();
				allData.myQuestionAnswer = button.answer;
				var buttonParent = button.parent;
				buttonParent.parent.forEach(function(item) {
					if(item == buttonParent) {
						game.add.tween(item.scale).to({x:1.05, y:1.05}, 200, "Linear", true);
						childForEach(item, function(button) {
							button.setFrames(2, 2, 2);
						}, function(text) {
							text.fill = 'green';
						});
					} else {
						game.add.tween(item.scale).to({x:1, y:1}, 200, "Linear", true);
						childForEach(item, function(button) {
							button.setFrames(1, 0, 0);
						}, function(text) {
							text.fill = '#000000';
						});
					}
				});

				function childForEach(parent, callbackButton, callbackText) {
					parent.forEach(function(child) {
						if(child.name == 'button') {
							callbackButton(child);
						} else if(child.name == 'text') {
							callbackText(child);
						}
					})
				}
			}
			this.submitBtnClick = function() {
				this.clickMusic.play();
				this.submitBtnTween = game.add.tween(this.submitBtn).to({y:'+2'}, 20, 'Linear', true);
				this.submitBtnTweenBack = game.add.tween(this.submitBtn).to({y:'-2'}, 20, 'Linear', false, 100);
				this.submitBtnTween.chain(this.submitBtnTweenBack);
				
				if(this.feedbackStartStatus) {//开始反馈状态
					switch(allData.myQuestionAnswer) {
						case "":
						case null:
							this.feedback();
							break;
						case allData.questionAnswer:
							this.clownSuccessFailStart('clownSuccess');
							this.rabbitSuccessFailStart('rabbitSuccess');
							this.ledSuccessStart('ledSuccess', 7);
							this.answerSuccessMusic.play();
							this.feedback('success');
							break;
						default:
							this.clownSuccessFailStart('clownFail');
							this.rabbitSuccessFailStart('rabbitFail');
							this.answerFailMusic.play();
							this.feedback('fail');
					}
				}
			}
			this.clownNoneStart = function() {
				this.clown = game.add.sprite(1450, 600, 'clownNone', 0);
				this.clownAnimate = this.clown.animations.add('clownNone');
				this.clownAnimate.play(15, true);
			}
			this.clownSuccessFailStart = function(name) {
				this.clown.loadTexture(name, 0);
				this.clownAnimate = this.clown.animations.add(name);
				this.clownAnimate.play(15, false, true);
				this.clownAnimate.onComplete.add(function() {
					this.clownNoneStart();
				}, this);
			}
			this.rabbitNoneStart = function() {
				this.rabbit = game.add.sprite(150, 650, 'rabbitNone', 0);
				this.rabbitAnimation = this.rabbit.animations.add('rabbitNone');
				this.rabbitAnimation.play(10, true);
			}
			this.rabbitSuccessFailStart = function(name) {
				this.rabbit.loadTexture(name, 0);
				this.rabbitAnimate = this.rabbit.animations.add(name);
				this.rabbitAnimate.play(15, false, true);
				this.rabbitAnimate.onComplete.add(function() {
					this.rabbitNoneStart();
				}, this);
			}
			this.ledNoneStart = function() {
				this.led = game.add.image(0, 840, 'ledNone');
			}
			this.ledSuccessStart = function(name, times) {
				var i = 0;
				this.led.loadTexture(name, 0);
				this.ledAnimate = this.led.animations.add(name);
				this.ledAnimate.play(10, false, false);
				this.ledAnimate.onComplete.add(function() {
					i++;
					if(i == times) {
						this.led.kill();
						this.ledNoneStart();
					} else {
						this.ledAnimate.play(10, false, false);
					}
				}, this);
			}
			this.feedback = function(status) {
				var feedbackStyle = {
					font: '32px Microsoft YaHei',
					align:'center',
					fill: '#fd4a05',
					fontWeight: 'bold'
				}
				this.feedbackGroup = game.add.group();
				this.feedbackGroup.x = game.world.centerX;
				this.feedbackGroup.y = -375;
				this.feedbackGroup.pivot.x = 135.5;
				this.feedbackGroup.pivot.y = 0;
				this.feedbackText = game.add.text(135.5, 270, '', feedbackStyle);
				this.feedbackText.anchor.set(0.5);

				allData.recordData[allData.questionId] = allData.myQuestionAnswer;//记录的信息

				switch(status) {
					case 'success':
						allData.rightQuestionNum++;
						this.renderProgress(allData.questionIndex+1, allData.dataList.data.list.length);
						this.feedbackImg = game.add.sprite(0, 0, 'answerSuccess', 0);
						this.answerSuccessAnimate = this.feedbackImg.animations.add('answerSuccess');
						this.answerSuccessAnimate.play(5, true);
						break;
					case 'fail':
						this.renderProgress(allData.questionIndex+1, allData.dataList.data.list.length);
						this.feedbackText.text = '正确答案 ' + allData.questionAnswer;
						this.feedbackImg = game.add.image(0, 0, 'answerFail');
						break;
					default:
						this.feedbackText.text = '请选择答案';
						this.feedbackText.y = 250;
						this.feedbackImg = game.add.image(0, 0, 'answerNone');
				}
				this.feedbackGroup.add(this.feedbackImg);
				this.feedbackGroup.add(this.feedbackText);
				
				this.feedbackAnimate = game.add.tween(this.feedbackGroup).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
				this.feedbackAnimate.onStart.add(feedbackAnimateStart, this);
				this.feedbackAnimate.onComplete.add(feedbackAnimateComplete, this);
				this.feedbackAnimateBack = game.add.tween(this.feedbackGroup).to({y:-375}, 1000, Phaser.Easing.Back.Out, false, 1000);
				this.feedbackAnimateBack.onComplete.add(feedbackAnimateBackComplete, this);
				function feedbackAnimateStart() {
					this.feedbackStartStatus = false;
				}
				function feedbackAnimateComplete() {
					this.feedbackAnimateBack.start();
				}
				function feedbackAnimateBackComplete() {
					this.feedbackStartStatus = true;
					if(status == 'success' || status == 'fail') {
						if(allData.questionIndex+1 >= allData.dataList.data.list.length) {
							this.sendRequest(this.sendDataUrl, 'post', {item: allData.recordData}, this.handleFetchDataBefore, this.handleFetchDataSuccess, this.handleFetchDataError);
							this.finished();
							return;
						} else {
							game.add.tween(this.allAnswerGroup).to({alpha: 0}, 500, "Linear", true);
							game.add.tween(this.allquestionGroup).to({alpha: 0}, 500, "Linear", true);
							this.renderQuestionInit();
						}
					}
				}
			}
			this.finished = function() {
				this.rightRate = allData.rightQuestionNum/allData.dataList.data.list.length;

				switch(true) {
					case(this.rightRate == 1):
						this.finishMusic = game.add.audio('completeSuccessMusic');
						this.finishMusic.play();
						break;
					case(this.rightRate >= 0.6):
						this.finishMusic = game.add.audio('completeSuccessMusic');
						this.finishMusic.play();
						break;
					default:
						this.finishMusic = game.add.audio('completeFailMusic');
						this.finishMusic.play();
				}
				
				finishModule();
			}
			this.update = function() {
				this.progress.clear();
				this.progress.lineStyle(10, 0xadc64b);
				this.progress.arc(0, 70, 108, game.math.degToRad(193), game.math.degToRad(this.angle.end), false);
				this.progress.endFill();
			}
		}

		game.States.finished = function() {
			this.create = function() {
			}
		}

		//结果模块
		function finishModule() {
			finishGame.States = {};
			finishGame.States.boot = function() {
				this.preload = function() {
					this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				};
				this.create = function() {
					finishGame.state.start('preload');
				}
			};

			finishGame.States.preload = function() {
				this.preload = function() {
					$.each(assetsJson.finish.type, function(type, data) {
						if(type == "image" && data.length > 1) {
							$.each(data, function(index, item) {
								finishGame.load.image(item.key, item.url);
							})
						} else if(type == "spritesheet" && data.length > 1) {
							$.each(data, function(index, item) {
								finishGame.load.spritesheet(item.key, item.url, item.width, item.height);
							})
						} else if(type == "audio" && data.length > 1) {
							$.each(data, function(index, item) {
								finishGame.load.audio(item.key, item.url);
							})
						} else if(type == "atlas" && data.length > 1) {
							$.each(data, function(index, item) {
								finishGame.load.atlas(item.key, item.image, item.data);
							})
						}
					});
				}
				this.create = function() {
					finishGame.state.start('render');
				}
			}

			finishGame.States.render = function() {
				this.create = function() {
					$('#finish').show();

					this.finishLight = finishGame.add.image(0, -200, 'finishLight');	
					this.finishLight.anchor.set(0.5);
					this.finishLight.alpha = 0;

					this.finishEmitter = finishGame.add.emitter(finishGame.world.centerX, 700, 200);

					this.finishGroup = finishGame.add.group();
					this.finishGroup.x = finishGame.world.centerX;
					this.finishGroup.y = 700;
					
					this.finishBodyGroup = finishGame.add.group();
					this.finishBody = finishGame.add.image(0, 0, 'finishBody');
					this.finishBody.anchor.set(0.5);
					this.finishBodyGroup.add(this.finishBody);

					this.rightRate = allData.rightQuestionNum/allData.dataList.data.list.length;//正确率

					switch(true) {
						case(this.rightRate == 1)://全对
							this.finishPerfect();
							break;
						case(this.rightRate >= 0.6)://及格
							this.finishSuccess();
							break;
						default://不及格
							this.finishFail();
					}

					//两个按钮
					this.doAgainBtn = finishGame.add.button(-100, 130, 'finishBtn', this.doAgainBtnClick, this, 0, 0, 0);
					this.backBtn = finishGame.add.button(100, 130, 'finishBtn', this.backBtnClick, this);
					if($("#from_igs").val() === 'true') {
						this.backBtn.setFrames(2, 2, 2);
					} else {
						this.backBtn.setFrames(1, 1, 1);
					}
					this.doAgainBtn.anchor.set(0.5);
					this.backBtn.anchor.set(0.5);
					this.finishBodyGroup.add(this.doAgainBtn);
					this.finishBodyGroup.add(this.backBtn);

					this.finishGroup.add(this.finishLight);
	   				this.finishGroup.add(this.finishCartoon);
					this.finishGroup.add(this.finishBodyGroup);
					this.finishGroup.scale.set(0, 0);
					this.finishGroupTween = finishGame.add.tween(this.finishGroup.scale).to({x:1, y:1}, 1000, Phaser.Easing.Back.Out, true);
				}

				this.startRender = function() {
					
					this.finishEmitter = finishGame.add.emitter(finishGame.world.centerX, 700, 200);

					this.finishGroup = finishGame.add.group();
					this.finishGroup.x = finishGame.world.centerX;
					this.finishGroup.y = 700;

					this.finishBodyGroup = finishGame.add.group();
					this.finishBody = finishGame.add.image(0, 0, 'finishBody');
					this.finishBody.anchor.set(0.5);
					this.finishBodyGroup.add(this.finishBody);

					this.rightRate = allData.rightQuestionNum/allData.dataList.data.list.length;//正确率

					switch(true) {
						case(this.rightRate == 1)://全对
							this.finishPerfect();
							break;
						case(this.rightRate >= 0.6)://及格
							this.finishSuccess();
							break;
						default://不及格
							this.finishFail();
					}

					//两个按钮
					this.doAgainBtn = finishGame.add.button(-100, 130, 'finishBtn', this.doAgainBtnClick, this, 0, 0, 0);
					this.backBtn = finishGame.add.button(100, 130, 'finishBtn', this.backBtnClick, this);
					if($("#from_igs").val() === 'true') {
						this.backBtn.setFrames(2, 2, 2);
					} else {
						this.backBtn.setFrames(1, 1, 1);
					}
					this.doAgainBtn.anchor.set(0.5);
					this.backBtn.anchor.set(0.5);
					this.finishBodyGroup.add(this.doAgainBtn);
					this.finishBodyGroup.add(this.backBtn);

					this.finishGroup.add(this.finishLight);
	   				this.finishGroup.add(this.finishCartoon);
					this.finishGroup.add(this.finishBodyGroup);
					this.finishGroup.scale.set(0, 0);
					this.finishGroupTween = finishGame.add.tween(this.finishGroup.scale).to({x:1, y:1}, 1000, Phaser.Easing.Back.Out, true);
					$('#finish').show();
				}

				this.update = function() {
					this.finishLight.angle += 0.3;
				}

				this.finishPerfect = function() {
					this.finishEmitterStart();

					this.finishCartoon = finishGame.add.sprite(0, 0, 'finishPerfect');
					this.finishCartoon.animations.add('move');
					this.finishCartoon.animations.play('move', 18, true);
					this.finishCartoonTween();

					finishGame.add.tween(this.finishLight).to({alpha:1}, 1000, "Linear", true, 200);

					this.finishLed = finishGame.add.image(0, -100, 'finishLed');	
					this.finishLed.anchor.set(0.5);
					this.finishLed.animations.add('change');
					this.finishLed.animations.play('change', 4, true);
	   				this.finishGroup.add(this.finishLed);
	   					
					var style1 = {
						font: '110px Microsoft YaHei',
						boundsAlignH: 'center',
						fontWeight:'bold',
						fill: '#ff5e0e'
					}
					var style2 = {
						font: '24px Microsoft YaHei',
						boundsAlignH: 'center',
						fontWeight:'bold',
						fill: '#ff5e0e'
					}

	   				this.text1 = finishGame.add.text(0, -30, '100分', style1);
	   				this.text2 = finishGame.add.text(0, 50, '', style2);
	   				this.text2.text = '小朋友好棒，'+ allData.dataList.data.list.length+'道题全部答对！';
					this.text1.anchor.set(0.5);
	   				this.text2.anchor.set(0.5);

	   				this.finishBodyGroup.add(this.text1);
	   				this.finishBodyGroup.add(this.text2);
				}

				this.finishSuccess = function() {//及格
					this.finishEmitterStart();
					
					this.finishCartoon = finishGame.add.sprite(0, 0, 'finishSuccess');
					this.finishCartoon.animations.add('move');
					this.finishCartoon.animations.play('move', 18, true);
					this.finishCartoonTween();

					finishGame.add.tween(this.finishLight).to({alpha:1}, 1000, "Linear", true, 200);

					var style1 = {
						font: '45px Microsoft YaHei',
						boundsAlignH: 'center',
						fontWeight:'bold',
						fill: '#fc950f'
					}
					var style2 = {
						font: '24px Microsoft YaHei',
						boundsAlignH: 'center',
						fontWeight:'bold',
						fill: '#999999'
					}
	   				
					this.text1 = finishGame.add.text(0, -20, '', style1);
					this.text2 = finishGame.add.text(0, 50, '', style2);
					this.text1.text = '回答正确 '+ allData.rightQuestionNum +' 道题';
					this.text2.text = '回答错误 '+ (allData.dataList.data.list.length - allData.rightQuestionNum) + ' 道题，继续努力哦！';
					this.text1.anchor.set(0.5);
					this.text2.anchor.set(0.5);

					var startIndex = this.text1.text.indexOf('确')+1;
					var endIndex = this.text1.text.indexOf('道');

					this.text1.addColor('#ff5e0e', startIndex); 
					this.text1.addColor('#fc950f', endIndex); 
					
					this.finishBodyGroup.add(this.text1);
					this.finishBodyGroup.add(this.text2);
				}

				this.finishFail = function() {//错误多，不及格
					this.finishCartoon = finishGame.add.sprite(0, 0, 'finishFail');
					this.finishCartoon.animations.add('move');
					this.finishCartoon.animations.play('move', 18, true);
					this.finishCartoonTween();

					var style1 = {
						font: '60px Microsoft YaHei',
						boundsAlignH: 'center',
						fontWeight:'bold',
						fill: '#ff5e0e'
					}
					var style2 = {
						font: '24px Microsoft YaHei',
						boundsAlignH: 'center',
						fontWeight:'bold',
						fill: '#999999'
					}

					this.text1 = finishGame.add.text(0, -20, '宝贝加油', style1);
					this.text2 = finishGame.add.text(0, 50, '', style2);
					this.text2.text = '回答正确 '+ allData.rightQuestionNum + ' 道题，错误 ' + (allData.dataList.data.list.length - allData.rightQuestionNum) + ' 道题，别灰心！';
					this.text1.anchor.set(0.5);
					this.text2.anchor.set(0.5);
	   					
					this.finishBodyGroup.add(this.text1);
					this.finishBodyGroup.add(this.text2);
				}

				this.finishEmitterStart = function() {
					this.finishEmitter.makeParticles('finishColours', [0, 1, 2, 3, 4, 5, 6, 7]);
				    this.finishEmitter.minParticleSpeed.setTo(-300, 0);
				    this.finishEmitter.maxParticleSpeed.setTo(300, -300);

				    this.finishEmitter.minParticleScale = 0.5;
	    			this.finishEmitter.maxParticleScale = 1.5;
	    			this.finishEmitter.setRotation(-40, 40);
				    this.finishEmitter.gravity = 20;
				    this.finishEmitter.flow(3000, 500, 5, -1);
				}

				this.doAgainBtnClick = function() {
					location.reload(); 
				}

				this.backBtnClick = function() {
					if($("#from_igs").val() === 'true') {
						window.webkit.messageHandlers.NativeBack.postMessage("NativeBack");
					} else {
						window.location.href = $("#userCenter").val();
					}
				}

				this.finishCartoonTween = function(callback) {
					this.finishCartoon.anchor.set(0.5);
					this.finishCartoonTween = finishGame.add.tween(this.finishCartoon).to({y:'-300'}, 800, Phaser.Easing.Bounce.Out, true, 300);
					this.finishCartoonTween.onComplete.add(function() {
						if(callback) {
							callback();
						}
					}, this);
				}
			}

			finishGame.state.add('boot', finishGame.States.boot);
			finishGame.state.add('preload', finishGame.States.preload);
			finishGame.state.add('render', finishGame.States.render);
			finishGame.state.start('boot');
		}

		game.state.add('boot', game.States.boot);
		game.state.add('preload', game.States.preload);
		game.state.add('render', game.States.render);
		game.state.add('finished', game.States.finished);
		game.state.start('boot');
	});
});
