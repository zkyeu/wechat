define(function(require, exports, module) {
	

	var answerFn = function(){
        this.completBox = $('#completBox');
		this.hammerId = $('#hammerId');
		this.griffinId = $('#griffinId');
        this.griffinIdFail = $('#griffinIdFail')
		this.rightId = $('#rightId');
        this.failId = $('#failId');
		this.processId = $('#processId');
		this.griffinStarId = $('#griffinStarId');
		this.rightFlag = $('.right-icon');
		this.scoreMove = $('#scoreMove');
		this.errorId = $('#errorId');
		this.hammerErrorId = $('#hammerErrorId');
		this.lionId = $('#lionId');
		this.scoreValue = $('#scoreValue');


		this.sureBtn = $('#sureBtn');

        this.curQueId = $('#curQueId')
        this.allQueId = $('#allQueId');
        this.queTitId = $('#queTitId');

		this.queTit = $('#queTit');
		this.answerContent = $('#answerContent');

		this.tableHtml = '';
        this.questionFlag = new Array();
        this.playerFn();
        this.playerFn2();
        this.playerFn3();
        this.playerFn4();

		//结果页
        this.starId = $('#starId');

        this.jigsawId = $('#jigsawId');
        this.resultFailId = $('#resultFailId');
        this.completId = $('#completId')
        this.completShow = $('#completShow');
        this.failShow = $('#failShow');
        this.resultSureBtn = $('.sure-btn')
        this.jigsawHtml = '';
        this.starHtml = '';
		this._event();
        
        
	};
	answerFn.prototype = {
        
		_event:function(){
			var that = this;
            this.request = this.getRequest();
            this.flagName = this.request['unit_id']; 
            this.requestDataFn();
            
           //锤子运动结束事件
			this.hammerId.on("webkitAnimationEnd animationend",function(){
                that.setMediaFn2('http://static.51talk.com/upload/efl_audio/prepar/1d4749294aeb27314f4ff5169dc08c57_160907b7c.mp3');
				that.griffinId.removeClass('griffin-z').addClass('griffin-r');
				that.griffinStarId.removeClass('hide').addClass('show');
				that.scoreMove.removeClass('hide').addClass('show');
				setTimeout(function(){
					that.showFlagFn();
				},500);
				
			});
            //锤子飞过声音
            $('#hammerErrorId, #hammerId').on("webkitAnimationStart animationstart",function(){
                that.setMediaFn2('http://static.51talk.com/upload/efl_audio/prepar/c3e03932b2118382b80f184f6c6a7cb9_160907639.mp3');
            });
            
            //回答错误锤子运动结束事件
			this.hammerErrorId.on("webkitAnimationEnd animationend",function(){
                that.setMediaFn2('http://static.51talk.com/upload/efl_audio/prepar/23b44690473037707fc9b9997dddf01b_160907a15.mp3');
                that.griffinIdFail.removeClass('griffin-z').addClass('griffin-e');
				that.lionId.removeClass('animal-r'+that.currentUnit).addClass('animal-e'+that.currentUnit);
				setTimeout(function(){
					that.showFlagFn();
				},500);
			});
            //减份音效
            this.scoreMove.on('webkitAnimationStart animationstart',function(){
                that.setMediaFn2('http://static.51talk.com/upload/efl_audio/prepar/6fc98279f35a5deeb658a390842e9321_160908ada.mp3');
                that.socre = Number(that.scoreValue.text());
                that.scoreValue.text(--that.socre);
            });
            //结果按钮音效
            this.resultSureBtn.on('click',function(){
                that.setMediaFn4('http://static.51talk.com/upload/efl_audio/prepar/d8a37797e525673f793e4ecab4f74c80_160907deb.mp3');
            });
			//答案滑过事件
			this.answerContent.on('mouseover','.hover-flag',function(){
				if($(this).hasClass('hover-flag')){
					$(this).addClass('hover-s');
				}
			});
			this.answerContent.on('mouseout','.hover-flag',function(){
				$(this).removeClass('hover-s');
			});
			
			
            //文字   选中答案
			this.answerContent.on('click','.answer-text',function(){
                that.optionFn($(this));
				if(!$(this).hasClass('chose-f')){
					$('.answer-text').removeClass('chose-f').addClass('hover-flag').removeClass('hover-s');
					$(this).addClass('chose-f').removeClass('hover-flag');
					that.changeBtnFn();
				}
			});
            //图片 选中答案
			this.answerContent.on('click','.answer-img',function(){
                that.optionFn($(this));
				if(!$(this).hasClass('hover-img')){
					$('.answer-img').removeClass('hover-img').addClass('hover-flag').removeClass('hover-s');
					$(this).addClass('hover-img').removeClass('hover-flag');
					that.changeBtnFn();
				}
			});

            //play 按钮
			this.queTit.on('click','#playId',function(){
                that.setMediaFn(that.currentQuestion.mp3_url);
				$(this).addClass('jp-play').hide();
				$('#stopId').css('display','block');
			});

            //暂停按钮
			this.queTit.on('click','#stopId',function(){
				$('#playId').show();
				$(this).hide();
                $("#jquery_jplayer_1").jPlayer("pause");
			});

            //确定按钮
            $('#btnBox').on('click','.av-sure-btn',function(){
                __sdonclick('click');
                $(this).removeClass('av-sure-btn');
                var self = $(this);
                that.question_id = $(this).attr('data-id');
                that.section = that.questionFlag[$(this).attr('data-id')];
                $.ajax({
                    url:'/nat/challenge/ajax_submit_answer',
                    type:'get',
                    dataType:'json',
                    data:{
                        question_id:that.question_id,
                        section:that.section
                    },
                    success:function(data){
                       if(data.status == 1){
                            if(data.data.error){
                                window.location.reload();
                            }
                            self.removeClass('dis-sure-btn');
                            if(data.data.star == undefined){
                                if(data.data.correct == 1){
                                    that.setMediaFn3('http://static.51talk.com/upload/efl_audio/prepar/131e6aef7d59dc1648f4b74767c5fbd0_160907127.mp3');
                                    that.processId.hide();
                                    that.rightId.show();
                                    that.scoreMove.show();
                                    if(that.IETester() == '9.0' || that.IETester() == '8.0' || that.IETester() == '7.0'){
                                        that.ieScore = Number(that.scoreValue.text());
                                        that.scoreValue.text(--that.ieScore);
                                    }
                                }else{
                                    that.setMediaFn3('http://static.51talk.com/upload/efl_audio/prepar/36b289da99b26246cfa4dd42ee995e95_160907b4f.mp3');
                                    that.processId.hide();
                                    that.failId.show(); 
                                }
                                //重绘问题，跳下一题
                                that.nextQuestionFn();
                            }else{
                                //最后一题
                                if(data.data.correct == 1){
                                    that.processId.hide();
                                    that.rightId.show();
                                    that.scoreMove.show();
                                }else{
                                    that.processId.hide();
                                    that.failId.show(); 
                                }
                                that.star = data.data.star;
                                that.hadGetPuzzle = data.data.had_get_puzzle;
                                that.newGetPuzzle = data.data.new_get_puzzle;
                                that.unitImgComplet = data.data.unit_img_complete;
                                that.unitImgFail = data.data.unit_img_fail;
                                that.completeJumpUrl = data.data.complete_jump_url;
                                setTimeout(function(){
                                    if(that.star == 0){
                                        that.playerFailFn();
                                        that.resultFailId.show();
                                    }else{
                                        that.playerSuccessFn();
                                        that.completId.show();
                                    }
                                    that.completBox.removeClass('hide').addClass('show');
                                },2000);
                                
                                //渲染结果页
                                that.resultPage();
                            }
                        }
                    }

                });
            });
            $('body').on('click','.av-sure-btn,.quit-btn,.answer-img',function(){
                that.setMediaFn4('http://static.51talk.com/upload/efl_audio/prepar/d8a37797e525673f793e4ecab4f74c80_160907deb.mp3');
            });
            if(this.IETester() == '9.0' || this.IETester() == '8.0' || this.IETester() == '7.0'){
                this.rightFlag.css({'display':'block','top':'100px'});
            }
            $('.mask').height(window.screen.height+'px');
		},
        //恢复角色，准备跳下一题
        showResult:function(){
            if(this.IETester() != '9.0' && this.IETester() != '8.0' && this.IETester() != '7.0' && this.IETester() != '6.0'){
                this.hideFlagFn();    
            }
            this.queControlFn(this.curNumber);
            this.resetBtnStateFn();
            //对错提示 恢复
            this.processId.show();
            this.rightId.hide();
            this.failId.hide();
            this.scoreMove.hide();

            this.griffinId.removeClass('griffin-r').addClass('griffin-z');
            this.griffinStarId.removeClass('show').addClass('hide');

            //对错动画角色回复正常，以方便下次变化
            this.griffinIdFail.removeClass('griffin-e').addClass('griffin-z');
            this.lionId.removeClass('animal-e'+this.currentUnit).addClass('animal-r'+this.currentUnit);
            //分数减少
            this.curQueId.text(this.curNumber+1);
        },
        //判断，跳下一题
        nextQuestionFn:function(){
            var that = this;
            this.curNumber++;
            if(this.curNumber <= this.questionLength){

                //跳到下一题
                setTimeout(function(){
                    that.showResult();
                },2000);
                
            }
        },
        //存储答案选项
        optionFn:function(ele){
            this.dataId = this.sureBtn.attr('data-id');
            this.questionFlag[this.dataId] = ele.find('.option').text();
            
        },
        //处理接口返回的数据
        interfaceData:function(data){

            this.questionList = data.data.question_list;
            //总题数
            this.questionLength = this.questionList.length;
            //当前题数
            this.number = data.data.user_current_answer;
            this.queControlFn(this.number);
            //当前题数（计数用）
            this.curNumber = this.number;

            //当前关数
            this.currentUnit = data.data.user_current_unit;

            this.currentCorrectCount = data.data.current_correct_count;

            this.animalIcons = data.data.unit_animal_img;

            $('.animal').css('background','url('+ this.animalIcons +') no-repeat').addClass('animal-r'+this.currentUnit);
            this.scoreValue.text(this.questionLength - this.currentCorrectCount);
            this.initQueNumber();

        },
        //初始化题数
        initQueNumber:function(){
            this.curQueId.text(this.number+1);
            this.allQueId.text(this.questionLength);
        },
        //请求题目列表
        requestDataFn:function(){
            var that = this;
            $.ajax({
                type: "GET",
                url: "/nat/challenge/ajax_question_list",
                data:{unit_id:this.flagName},
                dataType: "json",
                success: function(data){
                     if(data.status == 1){
                        that.interfaceData(data);
                     }
                }
            });
        },

        //按钮状态
		changeBtnFn:function(){
			this.sureBtn.removeClass('dis-sure-btn').addClass('av-sure-btn');
		},
        resetBtnStateFn:function(){
            this.sureBtn.removeClass('av-sure-btn').addClass('dis-sure-btn');
        },

		showFlagFn:function(){
			this.rightFlag.removeClass('hide').addClass('show').animate({top:'100px'});
		},
        hideFlagFn:function(){
            this.rightFlag.removeClass('show').addClass('hide').animate({top:'50px'});
            
        },
		playerFn:function(){
			$("#questionPlay").jPlayer({
		        ready: function (event) {
		            $(this).jPlayer("setMedia", {
		                title: "Bubble",
		                m4a: "",
		                oga: ""
		            }).jPlayer("play");
		        },
                ended: function() { 
                    $('#playId').show();
                    $('#stopId').hide();
                },
		        swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
		        supplied: "m4a, oga, mp3",
		        wmode: "window",
		        useStateClassSkin: true,
		        autoBlur: false,
		        smoothPlayBar: true,
		        keyEnabled: true,
		        remainingDuration: true,
		        toggleDuration: true
		 });
		},
        //设置音频
		setMediaFn:function(value){
			$("#questionPlay").jPlayer("setMedia", {
				mp3: value
			}).jPlayer("play");
		},

        playerFn2:function(){
            $("#animationPlay").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        m4a: "",
                        oga: ""
                    });
                },
                ended: function() { 
                    
                },
                swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
                supplied: "m4a, oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
         });
        },
        //设置音频
        setMediaFn2:function(value){
            $("#animationPlay").jPlayer("setMedia", {
                mp3: value
            }).jPlayer("play");
        },
        playerFn3:function(){
            $("#autoPlay").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        m4a: "",
                        oga: ""
                    }).jPlayer("play");
                },
                ended: function() { 
                    
                },
                swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
                supplied: "m4a, oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
         });
        },
        //设置音频
        setMediaFn3:function(value){
            $("#autoPlay").jPlayer("setMedia", {
                mp3: value
            }).jPlayer("play");
        },
        playerFn4:function(){
            $("#clickPlay").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        m4a: "",
                        oga: ""
                    }).jPlayer("play");
                },
                ended: function() { 
                },
                swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
                supplied: "m4a, oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
         });
        },
        //设置音频
        setMediaFn4:function(value){
            $("#clickPlay").jPlayer("setMedia", {
                mp3: value
            }).jPlayer("play");
        },

        //结果音频
        playerSuccessFn:function(){
            $("#playerSuccess").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        mp3: "http://static.51talk.com/upload/efl_audio/prepar/084d147a6d5a06a908c20df848dabb94_16090717f.mp3",
                        oga: ""
                    }).jPlayer("play");
                },
                ended: function() { 
                },
                swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
                supplied: "m4a, oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });
        },
        
        playerFailFn:function(){
            $("#playerFail").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        mp3: "http://static.51talk.com/upload/efl_audio/prepar/500f1595b19674194d83633504156318_160907e5e.mp3",
                        oga: ""
                    }).jPlayer("play");
                },
                ended: function() { 
                },
                swfPath: "http://static.51talk.com/static/js/html/lib/ckplayer/jquery.jplayer.swf",
                supplied: "m4a, oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });
        },

        //问题判断
        queControlFn:function(n){
            var that = this;
            this.currentQuestion = this.questionList[n];
            this.sureBtn.attr('data-id',this.currentQuestion.id);
            this.queTitId.text(this.currentQuestion.notice);
            //是否存在音频
            if(this.currentQuestion.is_mp3 == 1){
                this.queTit.html('<div class="play-btn" id="playBtn">\
                            <div id="jp_container_1"  role="application" aria-label="media player">\
                                <a href="javascript:;" class="play-b jp-play" id="playId"></a>\
                                <a href="javascript:;" class="jp-stop stop-b" id="stopId"></a>\
                            </div>\
                        </div>\
                        <h2 id="queText">'+ this.currentQuestion.title +'</h2>');
            }else{
                this.queTit.html('<div class="que-tit" id="queTit">\
                        <h2 id="queText" class="que-text">'+ this.currentQuestion.title +'</h2>\
                    </div>');
            }
            //文字 图片判断
            if(this.currentQuestion.is_img == 1){
                $.each(this.currentQuestion.answer_list,function(index){
                    that.tableHtml += '<td class="answer-a answer-img hover-flag">\
                                        <a href="javascript:;"><img src="'+ that.currentQuestion.answer_list[index].answer +'"/></a>\
                                        <span class="option">'+ that.currentQuestion.answer_list[index].section +'</span>\
                                    </td><td class="td-tab"></td>';
                });
                if(this.currentQuestion.answer_list.length == 3){
                    this.tableHtml += '<td class="l-td-tab"></td>';
                }
                this.answerContent.html(this.tableHtml);
                that.tableHtml = '';
                
            }else{
                $.each(this.currentQuestion.answer_list,function(index){
                    that.tableHtml += '<td class="answer-a answer-text hover-flag ">\
                                        <a href="javascript:;">'+ that.currentQuestion.answer_list[index].answer +'</a>\
                                        <span class="option">'+ that.currentQuestion.answer_list[index].section +'</span>\
                                    </td>\
                                    <td class="td-tab"></td>';
                });
                
                this.answerContent.html(this.tableHtml);
                that.tableHtml = '';
            }
        },
        //获取url后参数
        getRequest:function() { 
            var url = location.search; 
            var theRequest = new Object(); 
            if (url.indexOf("?") != -1) { 
                var str = url.substr(1); 
                strs = str.split("&"); 
                for(var i = 0; i < strs.length; i ++) { 
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
                } 
            } 
            return theRequest; 
        },
        IETester:function(userAgent){
            var UA =  userAgent || navigator.userAgent;
            if(/msie/i.test(UA)){
                return UA.match(/msie (\d+\.\d+)/i)[1];
            }else if(~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')){
                return UA.match(/rv:(\d+\.\d+)/)[1];
            }
            return false;
        },
        resultPage:function(){
            var that = this;
            this.sNewPuzzle = Number(this.hadGetPuzzle)+1;
            this.eNewPuzzle = Number(this.hadGetPuzzle)+Number(this.newGetPuzzle);
            
            this.jigsawHtmlFn();
            this.starId.on('webkitAnimationStart animationstart','.star',function(){
                that.setMediaFn2('http://static.51talk.com/upload/efl_audio/prepar/4801cb3d33b40a4188eb88d0e22b00d7_160907f14.mp3');
            });
            if(this.star == 0){
                this.failShow.css('background','url('+ this.unitImgFail +') no-repeat');
                this.resultFailId.show();
                this.completId.hide();
            }else{
                this.completShow.css('background','url('+ this.unitImgComplet +') no-repeat');
                this.starHtmlFn();
                this.completId.show();
                this.resultFailId.hide();
            }
            this.resultSureBtn.attr('href',this.completeJumpUrl);

        },
        //渲染拼图
        jigsawHtmlFn:function(){
            for(var i=1; i<=this.hadGetPuzzle; i++){
                this.jigsawHtml += '<div class="jigsaw jigsaw-e'+ i +'">\
                    <span class="exist"></span>\
                </div>'
            }
            
            for(var i=this.sNewPuzzle; i<=this.eNewPuzzle; i++){
                this.jigsawHtml += '<div class="jigsaw-hide jigsaw-p'+ i +' jigsaw jigsaw1"></div>'
            }
            this.jigsawId.html(this.jigsawHtml);
        },
        //渲染星星
        starHtmlFn:function(){
            for(var i=1;i<=this.star;i++){
                this.starHtml += '<div class="star star'+ i +'">\
                     <div class="b-star"></div>\
                     <div class="l-star"></div>\
                     </div>';
            }
            this.starId.html(this.starHtml);
        }
	};
	new answerFn();
});




