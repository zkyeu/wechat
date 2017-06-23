/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-10-31 12:10:30
 * @liyang 1.1.0
 */
define(function(require, exports, module) {
	$(function(){
		/*当前级别*/
		var levleG1 = false;
		/*常用DOM*/
		var sceneArray = [],
			allMusic = {
				clickDomMusic :  strJSON.sys_sound.clickDomMusic,
				backgroundMusic : strJSON.sys_sound.backgroundMusic,
				unitLockMusic : strJSON.sys_sound.unitLockMusic,
				unitOpenMusic : strJSON.sys_sound.unitOpenMusic,
				unitOnMusic : strJSON.sys_sound.unitOnMusic,
				unitOverMusic : strJSON.sys_sound.unitOverMusic,
				EricSpeak : strJSON.sys_sound.EricSpeak
			};

		function DealCookies() {
			this.mask = $(".mask");
			this.newUnitTit = $(".new-unit-tit");
			this.titShow = $(".startScenesTit");
			this.ericSpeak = $("#EricSpeak");
		}

		DealCookies.level = "/nat/challenge/ajax_is_current_level";

		$.extend(DealCookies.prototype, {
			init: function() {
				var EricHavedSpeak = this.getCookie('EricSpeak');
				if(!EricHavedSpeak){
					this.setCookie("EricSpeak","haveSpeak");
					this.mask.show();
					this.titShow.show();
					this.ericSpeak.jPlayer({
						ready: function (event) {
				            $(this).jPlayer("setMedia", {
				                title: "Bubble",
				                mp3: allMusic.EricSpeak
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
					this.sendRequest(DealCookies.level, 'get', '', $.proxy(this.handleRequestSuccessFirst, this));
				}else {
					this.mask.hide();
					this.titShow.hide();
					this.sendRequest(DealCookies.level, 'get', '', $.proxy(this.handleRequestSuccessSecond, this));
				}
			},

			getCookie: function(name) {
				var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
			    if(arr=document.cookie.match(reg)) {
			    	return (arr[2]);
			    } else {
			    	 return null;
			    }     
			},

			setCookie: function(name,value) {
				var Days = 30; 
			    var exp = new Date(); 
			    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
			    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
			},

			handleRequestSuccessFirst: function(res) {
				if(res.data.current_level > 1){
					levleG1 = true;
				}else{
					levleG1 = false;
				}
			},

			handleRequestSuccessSecond: function(res) {
				if(res.data.current_level > 1){
					this.mask.show();
					this.newUnitTit.show();
				}else{
					levleG1 = false;
				}
			},

			sendRequest: function(url,method,data,success,error) {
				$.ajax({
					url: url,
					type: method,
					dataType: 'json',
					data: data,
					success: success,
					error: error
				});
			}
		})

		function RenderData() {
			this.sceneContainer = $(".scenes");
			this.monsterContainer = $(".scenes").find(".scenes-monster");
			this.puzzleContainer = this.monsterContainer.find(".puzzles");
			this.menuPuzzleNumContainer = $(".m-menu").find(".m-card");
			this.sceneData = strJSON.scene;
			this.levelData = strJSON.level.level_list;
			this.puzzlesData = puzzlesJSON;
			this.animalImageArray = [];

			this.roleData = strJSON.role_message;
			this.roleIntroduce = $(".startScenesTit");
			this.roleComplete = $(".success-tit");
			this.levelTit = $(".new-unit-tit").find(".level-tit");
		}
		$.extend(RenderData.prototype, {
			init: function() {
				this.setRoleStyle();
				this.appendSceneDataBg();
				this.appendUnitData();
				this.sceneMonster();
			},

			setRoleStyle: function() {
				var roleIntroduce = this.roleData.role_introduce,
					roleComplete = this.roleData.role_complete,
					levelTit = this.roleData.role_level;

				this.roleIntroduce.css({background:'url('+roleIntroduce+') no-repeat'});
				this.roleComplete.css({background:'url('+roleComplete+') no-repeat'});
				this.levelTit.attr("src", levelTit);
			},

			appendSceneDataBg: function() {
				var sceneLength = this.sceneData.length;
				for(var i = 0; i < sceneLength; i++ ) {
					var sceneBgUrl = this.sceneData[i].bg_src,
						sceneChildLength = this.sceneData[i].level.length;
					this.monsterContainer.before(
						'<li class="sceneslist">'+
							'<div class="main-wrap">'+
							'</div>'+
						'</li>');
					this.sceneContainer.find(".sceneslist").eq(i).css({background:'url('+sceneBgUrl+') center center no-repeat'});
					this.appendSceneChildData(i,sceneChildLength);
				}
			},

			appendSceneChildData: function(index,num) {
				for(var k = 0; k < num; k++){
					var left = this.sceneData[index].level[k].coordinate.x,
						top = this.sceneData[index].level[k].coordinate.y,
						animalImages = this.sceneData[index].level[k].animal.images,
						startAnimalImg = this.sceneData[index].level[k].animal.images.start;
					sceneArray.push(index);
					this.animalImageArray.push(animalImages);
					this.sceneContainer.find(".main-wrap").eq(index).append('<div class="unit" data-ImgSrc = "'+startAnimalImg+'" style = "top:'+top+'px'+';left:'+left+'px'+'"></div>');
				}
			},

			appendUnitData: function() {
				var levelLength = this.levelData.length;
				for(var j = 0; j < levelLength; j++) {
					var levelStatus = this.levelData[j].status,
						starNum = this.levelData[j].star,
						unitId = this.levelData[j].unit,
						unit = this.sceneContainer.find(".unit"),
						status = this.adapterLevelStatus(levelStatus);

					unit.eq(j).attr("data-status", status);
					unit.eq(j).attr("data-unitId", unitId);
					this.handleUnitStatus[status](unit,starNum,j,this);
				}
			},

			adapterLevelStatus: function(status) {
				var adapter = {
					'0' : 'lock',
					'1' : 'open',
					'2' : 'on',
					'3' : 'over'
				};

				return adapter[status];
			},

			handleUnitStatus: {
				"lock": function(unitDom,star,index,parentsThis) {
					var unitNum = (index + 1) < 10? ("0"+ (index + 1)): (index + 1),
						animalImg = '<img class="u-animal" src="' + parentsThis.animalImageArray[index].lock + '" />',
						caption = '<h3 class="custom_pass_f">'+'Unit '+unitNum+'</h3>',
						fence = '<span class="u-icon u-fence"></span>';
					unitDom.eq(index).append(caption + animalImg + fence);
				},
				"open": function(unitDom,star,index,parentsThis) {
					var unitNum = (index + 1) < 10? ("0"+ (index + 1)): (index + 1),
						animalImg = '<img class="u-animal" src="' + parentsThis.animalImageArray[index].open + '" />',
						caption = '<h3 class="custom_pass_t">'+'Unit '+unitNum+'</h3>',
						fence = '<span class="u-icon u-fence"></span>',
						getStars = '<span class="star u-icon f-star-1"></span>'+'<span class="star u-icon f-star-2"></span>'+'<span class="star u-icon f-star-3"></span>';
					unitDom.eq(index).append(getStars + caption + animalImg + fence);
				},
				"on": function(unitDom,star,index,parentsThis) {
					var unitNum = (index + 1) < 10? ("0"+ (index + 1)): (index + 1),
						animalImg = '<img class="u-animal" src="' + parentsThis.animalImageArray[index].on + '" />',
						caption = '<h3 class="custom_pass_t">'+'Unit '+unitNum+'</h3>',
						getStars = {
							'0' : '<span class="star u-icon f-star-1"></span>'+'<span class="star u-icon f-star-2"></span>'+'<span class="star u-icon f-star-3"></span>',
							'1' : '<span class="star u-icon s-star-1"></span>'+'<span class="star u-icon f-star-2"></span>'+'<span class="star u-icon f-star-3"></span>',
							'2' : '<span class="star u-icon s-star-1"></span>'+'<span class="star u-icon s-star-2"></span>'+'<span class="star u-icon f-star-3"></span>'
						},
						showStar = getStars[star];
					unitDom.eq(index).append(showStar + caption + animalImg);
				},
				"over": function(unitDom,star,index,parentsThis) {
					var unitNum = (index + 1) < 10? ("0"+ (index + 1)): (index + 1),
						animalImg = '<img class="u-animal" src="' + parentsThis.animalImageArray[index].over + '" />',
						caption = '<h3 class="custom_pass_t">'+'Unit '+unitNum+'</h3>',
						showStar = '<span class="star u-icon s-star-1"></span>'+'<span class="star u-icon s-star-2"></span>'+'<span class="star u-icon s-star-3"></span>';
					unitDom.eq(index).append(showStar + caption + animalImg);
				}
			},

			sceneMonster: function() {
				var xNum = parseInt(this.puzzlesData.puzzleImage.x_num),
					yNum = parseInt(this.puzzlesData.puzzleImage.y_num),
					itemWidth = parseInt(this.puzzlesData.puzzleImage.img_width),
					itemHeight = parseInt(this.puzzlesData.puzzleImage.img_height),
					totalWidth = (itemWidth + 1) * xNum,
					totalHeight = (itemHeight + 1) * yNum,
					addcards = this.puzzlesData.addcards,
					monster_image = this.puzzlesData.puzzleImage.boss_image,
					getPuzzles = this.puzzlesData.fragment,
					getPuzzlesTotal = this.puzzlesData.fragment.length,
					puzzlesTotal = xNum*yNum,
					animateChangeBig = "changebig",
					needPuzzleBox = "";


				this.puzzleContainer.height(totalHeight);
				this.puzzleContainer.width(totalWidth);
				this.puzzleContainer.css({background:'url('+monster_image+') center center no-repeat'});
				this.menuPuzzleNumContainer.find(".card_num").html(getPuzzlesTotal);
				if(addcards === true){this.menuPuzzleNumContainer.addClass(animateChangeBig)};
				for(var i = 0; i < puzzlesTotal; i++){
					needPuzzleBox = needPuzzleBox + "<li><span></span></li>";
				}
				this.puzzleContainer.append(needPuzzleBox);
				this.puzzleContainer.find("li").height(itemHeight).width(itemWidth);
				for(var j =0; j < getPuzzlesTotal; j++){
					var item =  getPuzzles[j].split('-');
					this.puzzleContainer.find("li").eq((parseInt(item[1])-1) * xNum + parseInt(item[0]) - 1).find("span").hide();
				}
				this.hangdlePuzzleStatus(getPuzzlesTotal, puzzlesTotal);
			},

			hangdlePuzzleStatus: function(g, t) {
				this.puzzleEmpty = 	this.monsterContainer.find(".empty_tit");
				this.puzzleOngoing = this.monsterContainer.find(".ongoing");
				this.puzzleCardTit = this.monsterContainer.find(".card-tit");
				this.puzzleCompleted = this.monsterContainer.find(".completed");
				this.puzzleGoBtn = this.monsterContainer.find(".go_btn");
				this.puzzlesTotalShow = this.monsterContainer.find(".card_num");

				this.puzzlesTotalShow.html(t);
				switch (true) {
					case g === 0 :
						this.puzzleEmpty.show();
						break;
					case g < t :
						this.puzzleOngoing.show();
						this.puzzleCardTit.show();
						this.puzzleCompleted.hide();
						this.puzzleGoBtn.hide();
						break;
					default :
						this.puzzleOngoing.hide();
						this.puzzleCardTit.hide();
						this.puzzleCompleted.show();
						this.puzzleGoBtn.show();
				}
			}
		});

		/*设置位置*/
		function SetPosition() {
			this.containter = $(".scenes-box");
			this.cardNum = this.containter.find('.card_num');
			this.sound = this.containter.find('.m-sound');
			this.secesParent = $(".scenesMain");
			this.scenesContainer = $('.scenes');
			this.scenesChild = $('.scenes>li');
			this.moveRange = this.scenesChild.width();	
			this.camera = $(".monster-wrap").find(".camera");
			this.nowUnitNow = parseInt(strJSON.level.level_process)-1,
			this.page = sceneArray[this.nowUnitNow] || 0;
		}

		SetPosition.api = '';

		$.extend(SetPosition.prototype, {
			init: function() {
				this.containter.css({cursor:"pointer"});
				this.secesParent.css({width:this.scenesChild.width(),height:"100%"});
				this.scenesContainer.css({width:20000,height:"100%"});
				this.scenesChild.css({height:"100%","float":"left"});
				
				this.autoMiddle();
				$(window).resize($.proxy(this.autoMiddle,this));

				this.StartPosition(this.page);
				this.bindEvents();
			},

			autoMiddle: function(){
				var extra = this.secesParent.width() - this.containter.width();
				if(extra > 0) {
					this.secesParent.css({'margin-left':-extra/2});
				} else {
					this.secesParent.css('margin','0 auto');
				}
				this.cameraPosition();
			},

			cameraPosition: function() {
				var screenWidth = parseInt($(window).width());
				var cameraMargin = -((1920-screenWidth)/1920)*400+"px";
				this.camera.css({marginTop:cameraMargin})
			},

			StartPosition: function(page) {
				this.scenesContainer.animate({marginLeft:-page*this.moveRange},10)
				this.scenesContainer.animate({opacity:'1'},500)
			},

			bindEvents: function() {
				this.sound.on('click',$.proxy(this.handleDatesItemClick, this));
			},

			handleDatesItemClick: function(e) {

			},

			sendRequest: function(url,method,data,success,error) {
				$.ajax({
					url: url,
					type: method,
					dataType: 'json',
					data: data,
					success: success,
					error: error
				});
			},

			handleResponseSuccess: function(res) {
				var status = res.status;
				var data = res.data;
				if(status == 1){
					
				}else {
					alert(res.info);
				}
			},

			handleResponseError: function() {

	  		}
		});

		/* 左右箭头点击事件，获取新拼图，点击quit按钮 */
		function TriggerDirection() {
			this.nowUnitNow = parseInt(strJSON.level.level_process)-1,
			this.page = sceneArray[this.nowUnitNow] || 0;;
			this.speed = 400;
			this.scenesContainer = $(".scenes");
			this.scenesChild = $(".scenes>li");
			this.arrowLeft = $('.arrowLeft');
			this.arrowRight = $('.arrowRight');
			this.moveRange = this.scenesChild.width();
			this.unit = $(".scenes").find(".unit");

			this.animateNode = ".unit";
			this.animateStart = "start-state";
			this.animateHover = "hover-state";
			this.animateNow = "now-state";
			this.animateBig = 'changebig';

			this.cardNum = $(".scenes-box").find(".m-card");
			this.musicClickDom = $("#clickMusic");
			this.quitBtn = $(".startUnit").find(".back_btn");
			this.scenesBox = $(".scenes-box");
			this.startUnit = $(".startUnit");
		}
		TriggerDirection.api = {
			puzzlesNumber : '/nat/challenge/ajax_open_puzzle'
		};
		$.extend(TriggerDirection.prototype, {
			init: function() {
				this.bindEvents();
				this.triggerArrow();
				this.animatiomAll();
			},

			triggerArrow: function() {
				this.animatiomAll();
				if(this.page == 0){
					this.arrowLeft.hide();
					this.arrowRight.show();
				}else if(this.page == this.scenesChild.length - 1){
					this.arrowLeft.show();
					this.arrowRight.hide();
				}else{
					this.arrowLeft.show();
					this.arrowRight.show();
				}
			},

			bindEvents: function() {
				this.arrowLeft.on('click', $.proxy(this.handleArrowLeftClick, this));
				this.arrowRight.on('click', $.proxy(this.handleArrowRightClick, this));
				this.cardNum.on('click', $.proxy(this.handlecardNumClick, this));
				this.quitBtn.on('click', $.proxy(this.handleQuitClick, this));
			},

			musicHandleClickDom: function() {
				this.musicClickDom.jPlayer("play");
				this.musicClickDom.jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                title: "Bubble",
			                mp3: allMusic.clickDomMusic
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

			handleArrowLeftClick: function() {
				this.musicHandleClickDom();
				if(!this.scenesContainer.is(":animated")){
					if(this.page !== 0){
						this.page--;
						this.handlePage(this.page);				
					}
					this.triggerArrow();
				}
			},

			handleArrowRightClick: function() {
				this.musicHandleClickDom();
				if(!this.scenesContainer.is(":animated")){
					if (this.page !== (this.scenesChild.length-1)) {
						this.page++;
						this.handlePage(this.page);
					}
					this.triggerArrow();
				}
			},

			handlecardNumClick: function(e) {
				var target = $(e.currentTarget);
				this.musicHandleClickDom();
				if(target.hasClass(this.animateBig)){
					this.sendRequest(TriggerDirection.api.puzzlesNumber,'get');
					target.removeClass(this.animateBig);
				}
				if(!this.scenesContainer.is(":animated")){
					this.page = ((this.scenesChild.length)-1);
					this.triggerArrow();
					this.handlePage(this.page);
				}
			},

			sendRequest: function(url,method,data,success,error) {
				$.ajax({
					url: url,
					type: method,
					dataType: 'json',
					data: data,
					success: success,
					error: error
				});
			},

			handlePage: function(page) {
				this.scenesContainer.animate({
					marginLeft:-page*this.moveRange
				},this.speed);
			},

			handleQuitClick: function() {
				this.musicHandleClickDom();
				this.animatiomAll();
				this.scenesBox.show();
				this.startUnit.hide();
			},

			animatiomAll: function() {
				/*移除动画*/
				this.unit.removeClass(this.animateStart);
				this.unit.eq(this.nowUnitNow).removeClass(this.animateNow);

				/*添加动画*/
				this.scenesChild.eq(this.page).find(this.animateNode).addClass(this.animateStart);
				setTimeout($.proxy(this.nowUnitAnimate, this), 1000);
			},

			nowUnitAnimate: function() {
				var dataStatus = this.unit.eq(this.nowUnitNow).attr("data-status");
				if(dataStatus === "lock" || dataStatus === "over"){
					return;
				}else{
					this.unit.eq(this.nowUnitNow).addClass(this.animateNow);
				}	
			}			
		})


		function StartScenes() {
			this.sceneData = strJSON.scene;
			this.unit = $(".scenes").find(".unit");
			this.scenesBox = $(".scenes-box");
			this.startUnit = $(".startUnit");
			this.startUnitTit = $(".startUnit").find(".top-tit");
			this.startUnitAnimal = $(".startUnit").find('.animal-url');

			this.tslBtnChinese = $(".tsl-btn-chinese");
			this.tslBtnEnglish = $(".tsl-btn-english");
			this.englishContext = $(".english");
			this.chineseContext  = $(".chinese");

			this.closeEricSpeak = $(".startScenesTit").find(".start-btn, .close_btn");
			this.replayBtn = $(".startUnit").find(".replay-btn");
			this.mask = $(".mask");
			this.startScenesTit = $(".startScenesTit");
			this.ericSpeakIntroduce = $(".m-menu").find(".m-tit");


			this.animateStart = "start-state";
			this.animateHover = "hover-state";
			this.animateNow = "now-state";

			this.musicBackgroundContainer = $("#scenes_bg_music");
			this.musicBackgroundBtn = $(".scenes-box").find(".m-sound");
			this.musicClickDom = $("#clickMusic");
			this.unitHoverMusic = $("#unitHoverMusic");
			this.ericSpeak = $("#EricSpeak");
			this.startTestBtn = $(".startUnit").find(".start_btn");

			this.newUnitTit = $(".new-unit-tit");
			this.newUnitTitClose = $(".new-unit-tit").find(".close-mask");

			/*最后拼图页面*/
			this.puzzleGoBtn = $(".btn-wrap").find(".go_btn");
			this.puzzleSuccessTit = $(".success-tit");
			this.puzzleSuccessTitClose = $(".success-tit .success-close");
			/*全局定时器*/
			this.timerFirst = "";
		}

		StartScenes.api = {
			successTit :'/nat/challenge/ajax_is_level_test?g_level_id=1' 
		}
		$.extend(StartScenes.prototype, {
			init: function() {
				this.bindEvents();
				this.musicDefaultBackgroundPlay();
			},

			bindEvents: function() {
				this.unit.on('click', $.proxy(this.handleUnitClik, this));
				this.unit.on('mouseenter', $.proxy(this.handleUnitMouseenter, this));
				this.unit.on('mouseleave', $.proxy(this.handleUnitMouseleave, this));

				this.tslBtnChinese.on('click', $.proxy(this.handletslBtnChineseClick, this));
				this.tslBtnEnglish.on('click', $.proxy(this.handletslBtnEnglishClick, this));

				this.closeEricSpeak.on('click', $.proxy(this.musicCloseEricSpeakIntroduceClick, this));
				this.replayBtn.on('click', $.proxy(this.handleReplayBtnClick, this));
				
				this.startTestBtn.on('click', $.proxy(this.handlestartTestBtn, this));
				this.newUnitTitClose.on('click', $.proxy(this.handleNewUnitTitCloseClick, this));
				/* Music */
				this.ericSpeakIntroduce.on('click', $.proxy(this.musicEricSpeakIntroduceClick, this));
				this.musicBackgroundBtn.on('click', $.proxy(this.musicHandleBackgroundBtnClick, this));
				/* 拼图页puzzle */
				this.puzzleGoBtn.on('click', $.proxy(this.puzzleGoBtnClick, this));
				this.puzzleSuccessTitClose.on('click', $.proxy(this.puzzleSuccessTitCloseClick, this));
			},

			puzzleSuccessTitCloseClick: function(){
				this.musicHandleClickDom();
				this.puzzleSuccessTit.hide();
				this.mask.hide();
			},

			puzzleGoBtnClick: function() {
				this.musicClickDom.jPlayer("play");
				this.sendRequest(StartScenes.api.successTit, 'get', "", $.proxy(this.puzzleGoBtnClickSuccess, this), $.proxy(this.puzzleGoBtnClickError, this));
			},

			puzzleGoBtnClickSuccess: function(res) {
				var puzzleSuccessTit = this.puzzleSuccessTit;
				var mask = this.mask;
				if(res.status == 1){
					puzzleSuccessTit.show();
					mask.show();
				}else{
					window.location.href ='/nat/user/certificate';
				}
			},

			handlestartTestBtn: function() {
				this.musicHandleClickDom();
				this.musicBackgroundContainer.jPlayer("pause");
			},

			handleUnitClik: function(e) {
				var target  = $(e.currentTarget),
					thisStatus = target.attr("data-status"),
					thisAnimaltSrc = target.attr("data-ImgSrc"),
					thisTit = target.find("h3").html(),
					parentIndex = target.parents(".sceneslist").index(),
					UnitId = "/nat/challenge/question?unit_id="+target.attr("data-unitId"),
					startUnitBgUrl = this.sceneData[parentIndex].start_bg_src;
				
				__sdonclick('click');
				this.startUnit.css({background:'url('+startUnitBgUrl+') no-repeat',backgroundSize:'cover'});
				this.startTestBtn.attr("href",UnitId);
				this.musicHandleClickDom();
				if (thisStatus === "open" || thisStatus === "on" || thisStatus === "over"){
					this.handlestartUnit(thisTit,thisAnimaltSrc);
				}
			},

			handleUnitMouseenter: function(e) {
				var target  = $(e.currentTarget),
				thisStatus = target.attr("data-status"),
				MusicSrc = this.handleUnitMouseeterMusicSrc(thisStatus);

				if(target.hasClass(this.animateNow)){
					target.removeClass(this.animateStart);
				}else{
					target.removeClass(this.animateStart);
					target.addClass(this.animateHover);
				}

				var timer = 0,
					parentThis = this;
				this.timerFirst = setInterval(function() {
					timer = timer + 100;
					if(timer > 400) {
						parentThis.musicHandleUnitMouseenter(MusicSrc);	
					}
				}, 100);		
			},

			handleUnitMouseleave: function(e) {
				var target  = $(e.currentTarget);
				var thisStatus = target.attr("data-status");

				clearInterval(this.timerFirst);
				if(!target.hasClass(this.animateNow)){
					target.removeClass(this.animateHover);
				}
			},

			handleUnitMouseeterMusicSrc: function(status) {
				var MusicSrc = {
					"lock" : allMusic.unitLockMusic,
					"open" : allMusic.unitOpenMusic,
					"on"   : allMusic.unitOnMusic,
					"over" : allMusic.unitOverMusic
 				}
 				return MusicSrc[status];
			},

			musicHandleUnitMouseenter: function(m) {
				$("#unitHoverMusic").jPlayer("setMedia", {
	                mp3: m
	            }).jPlayer("play");
				$("#unitHoverMusic").jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                title: "Bubble",
			                mp3: m
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
		    	clearInterval(this.timerFirst);
			},

			musicHandleClickDom: function() {
				this.musicClickDom.jPlayer("play");
				this.musicClickDom.jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                title: "Bubble",
			                mp3: allMusic.clickDomMusic
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

			musicDefaultBackgroundPlay: function() {
				this.musicBackgroundContainer.jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                title: "Bubble",
			                mp3: allMusic.backgroundMusic
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

			musicHandleBackgroundBtnClick: function(e) {
				this.musicHandleClickDom();
				var target = $(e.currentTarget),
					close = "m-sound-close";
				if(!target.hasClass(close)){
					this.musicBackgroundContainer.jPlayer("pause");
					target.addClass(close);
				}else{
					this.musicBackgroundContainer.jPlayer("play");
					target.removeClass(close);
				}	
			},

			musicEricSpeakIntroduceClick: function() {
				this.musicHandleClickDom();
				this.mask.show();
				this.startScenesTit.show();
				this.ericSpeak.jPlayer("setMedia", {
					mp3: allMusic.EricSpeak
				}).jPlayer("play");
				this.ericSpeak.jPlayer({
	        		ready: function (event) {
			            $(this).jPlayer("setMedia", {
			                title: "Bubble",
			                mp3: allMusic.EricSpeak
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

			musicCloseEricSpeakIntroduceClick: function() {
				this.musicHandleClickDom();
				this.mask.hide();
				this.startScenesTit.hide();
				this.ericSpeak.jPlayer("pause");
				if(levleG1){
					this.mask.show();
					this.newUnitTit.show();
				}
			},
			
			handlestartUnit: function(t,u) {
				this.startUnitTit.html(t)
				this.startUnitAnimal.attr("src",u);
				this.scenesBox.hide();
				this.startUnit.show();
			},

			handletslBtnChineseClick: function(e) {
				this.musicHandleClickDom();
				var target  = $(e.currentTarget);
				target.hide();
				this.tslBtnEnglish.show();
				this.englishContext.hide();
				this.chineseContext.show();
			},

			handletslBtnEnglishClick: function(e) {
				this.musicHandleClickDom();
				var target  = $(e.currentTarget);
				target.hide();
				this.tslBtnChinese.show();
				this.englishContext.show();
				this.chineseContext.hide();
			},	

			handleNewUnitTitCloseClick: function() {
				this.musicHandleClickDom();
				this.mask.hide();
				this.newUnitTit.hide();
			},

			handleReplayBtnClick: function() {
				this.musicHandleClickDom();
			},

			sendRequest: function(url,method,data,success,error) {
				$.ajax({
					url: url,
					type: method,
					dataType: 'json',
					data: data,
					success: success,
					error: error
				});
			}
		})

		function Page() {

		}
		$.extend(Page.prototype, {
			init: function() {
				var renderData = new RenderData();
				renderData.init();

				var dealCookies = new DealCookies();
				dealCookies.init();
				
				var setPosition = new SetPosition();
				setPosition.init();

				var startScenes = new StartScenes();
				startScenes.init();

				var direction = new TriggerDirection();
				direction.init();
			}
		});

		var page = new Page();
		page.init();
	});
});

