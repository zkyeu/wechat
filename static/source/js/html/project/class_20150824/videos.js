define("videos", ["lodash", "tmpl"], function(require, exports, module) {
    var tmpl  =  require("tmpl");
    var cookie = require("cookie");
    var switch1 = $("#switch").val();
    var isBlind = false;
    //定义按钮状态
    window.statusList = {
        cover:false,
        deafness:false,
        countDown:false
    }
    window.statusList2 = {
        videoArr:[],
        audioArr:[]
    }
    

    var domain = "http://static.51talk.com/upload/";
    function changeCase(str) {
        var s = str;
        return s.replace(/(^|\s+)\w/, function(s) {
            return s.toUpperCase();
        });
    }
    //数据统计接口

    function Statistics(){
        this.raise = 0;
        this.startTime = 0;   
    }
    $.extend(Statistics.prototype,{
          ajax:function(data,url){
              $.ajax({
                    url: url,
                    dataType: 'json',
                    type: "post",
                    data:data,
                    context: this,
                    success: function(){},
                    error: function() {}
            });
          },  
            //记录页码 
           pageRecord:function(page,m_page,model,is_end,raise,stayTime){
                   var postData = {
                        "course_id" : course_id,
                        "appoint_id" : appoint_id,
                        "page" : page,
                       "m_page" :m_page,//单个模块儿为1
                        "model" : model,
                        "is_end" : is_end,
                        "raise" : raise,
                        "stay_time" : stayTime
                   };
                   this.ajax(postData,"/ApiEfl/addPrePictureLog?act=page");
               
           },
           //读句子记录
           setenceRecord:function(data){
            $.ajax({
                    url: "/ApiEfl/addPrePictureLog?act=read",
                    dataType: 'json',
                    type: "post",
                    data:data,
                    context: this,
                    success: function(){},
                    error: function() {}
            });
           },
           browserRecord:function(data){
                data["course_id"] = course_id;
                $.ajax({
                    url: "/ApiEfl/addPrePictureLog?act=browser",
                    dataType: 'json',
                    type: "post",
                    data:data,
                    context: this,
                    success: function(){},
                    error: function() {}
                });
           },
           replayRecord:function(data){
            data['course_id'] = course_id;
                $.ajax({
                    url: "/ApiEfl/addPrePictureLog?act=listen",
                    dataType: 'json',
                    type: "post",
                    data:data,
                    context: this,
                    success: function(){},
                    error: function() {}
                });
           }
    });

    //基础公用方法

    function Base(){}
    $.extend(Base.prototype,{//视频暂停播放
        videoPlayPause:function(){
            $(".video").off().on('click',function(e){
                 if(e.target.paused){
                        $(".ytp-bezel").show().addClass("ytp-bezel2");
                        $(".ytp-bezel path").attr("d","m 12.22,28.88 0,-17.77 16.66,8.91 -16.66,8.86 z");
                         $(".ytp-bezel").attr("aria-label","播放");
                        $(".ytp-bezel-icon").addClass("ytp-bezel-icon-play");
                        setTimeout(function(){
                          $(".ytp-bezel").hide();
                          $(".ytp-bezel").removeClass("ytp-bezel2");
                           e.target.play();
                        },500);
                  }else{
                         $(".ytp-bezel").show().addClass("ytp-bezel2");
                         $(".ytp-bezel path").attr("d","m 12.22,11.11 0,17.77 6.66,0 0,-17.77 -6.66,0 z m 10,0 0,17.77 6.66,0 0,-17.77 -6.66,0 z");
                         $(".ytp-bezel").attr("aria-label","播放");
                        $(".ytp-bezel-icon").removeClass("ytp-bezel-icon-play");
                        setTimeout(function(){
                          $(".ytp-bezel").hide();
                          $(".ytp-bezel").removeClass("ytp-bezel2");
                          e.target.pause();
                        },500);
                  }
            });
        },
        process:function(page,total){
            if(page==1){
                var step = 0;
            }else if(page==2){
                var step = 25;
            }else if(page==total){
                var step=100;
            }else{
                var step =0.25+(0.75/(total-2))*(page-2);
                step = step.toFixed(2).slice(2, 4).toString();
            }
            $("#step2").html("("+step+"%)");
        },
        loading:function(video){
             video.onloadstart = function(){
                $(".waiting").show();
                
             }
             video.onloadeddata = function(){
                $(".waiting").hide();
                var t_endTime = new Date().getTime();
                if(switch1 && !isBlind){
                    $.ajax({
                      url:"/ApiEfl/addLoadPerformanceLog",
                      type: "post",
                      data:{
                        url:video.src,
                        type:"2",
                        "load_time":t_endTime - t_startTime,
                        "edition":1
                      }
                    });
                    console.log(t_endTime - t_startTime);
                }
                
             }
             video.oncanplay = function(){
                $(".waiting").hide();

             }
             video.onplay = function(){

                $(".waiting").hide();
             }
             video.onprogress = function(e){
                if(e.target.paused){
                    $(".waiting").show();
                }else{
                    $(".waiting").hide();
                }
             }
             video.onwaiting = function(){
                $(".waiting").show();
             }
             video.onplaying = function(){
                $(".waiting").hide();
             }
        },
        videoStart:function(){
            var self = this;
            $(".video").each(function(i,item){
                $(item).get(0).addEventListener("pause",$.proxy(function(){
                    $(".player2").show();
                    self.showMask();
                },self));
            });
        },
        videoEnded:function(video,callback){
            var self = this;
            video.onended = function(){
                self.showReplay();
                if(callback){
                    callback();
                }
            }
        },
        videoReplay : function(video,callback){
            /*var defferd =  new Deferred();*/

            var self = this;
            $(".replay2").off().on("click",function(){
                video.play();
                self.hideReplay();
                if(callback){
                     callback();
                }
            });

            //return defferd;
        },
        showMask:function(){
            $(".vediolearing .mask").show();
        },
        hideMask:function(){
            $(".vediolearing .mask").hide();
        },
        showReplay:function(){
           this.showMask();
           $(".vediolearing .replay2").show();
        },
        hideReplay:function(){
            this.hideMask();
            $(".vediolearing .replay2").hide();
        },
        recordRead:function(aiPanel, obj, toggleClass) {
            var defferd = new $.Deferred();
            aiPanel.setData({
                audioUrl: obj.attr("media-audio"),
                serverParams: {
                    coreType: "en.sent.score",
                    refText: "hello limei"
                }
            });
            aiPanel.params.onAfterPlay = function() {
                obj.toggleClass(toggleClass);
                aiPanel.setData({
                    audioUrl: ""
                });
                defferd.resolve();
            };
            obj.toggleClass(toggleClass);
            $("#aiPanel .play").click(); //播放触发
            return defferd;
        },
        setData:function(aiPanel, mediaurl){   //声音播放
            var defferd = new $.Deferred();
            aiPanel.setData({
                audioUrl: mediaurl,
                serverParams: {
                    coreType: "en.sent.score",
                    refText: "hello limei"
                }
            });
            aiPanel.params.onAfterPlay = function() {
                //obj.toggleClass(toggleClass);
                aiPanel.setData({
                    audioUrl: ""
                });
                defferd.resolve();
            };
            //obj.toggleClass(toggleClass);
            $("#aiPanel .play").click(); //播放触发
            return defferd;
        },
        setRecord:function(aiPanel, obj, toggleClass, word_id, type) {
            var coreType = "en.word.score";
            if (obj.attr("data-title").split(" ").length > 1) {
                coreType = "en.sent.score";
            }
            aiPanel.setData({
                audioUrl: obj.attr("media-audio"),
                serverParams: {
                    coreType: coreType,
                    refText: obj.attr("data-title"),
                    attachAudioUrl: 1,
                    result: {
                        details: {
                            raw: 1,
                            sym: 1
                        }
                    },
                    rank: 100,
                    userId: type + "_" + student_num
                },
                duration: 600 * obj.attr("data-title").split(" ").length + 2000
            });

            aiPanel.params.onBeforeReplay = function(){
                 $("#replay").removeClass("disableplay").addClass('pause');
            }
            aiPanel.params.onAfterReplay=function(){
                $("#replay").removeClass("disableplay").removeClass('pause');
            }
            aiPanel.params.onBeforeRecord = function(data) {
                $(".error_warn").hide();
            }
            aiPanel.params.onScore = function(data) {
                record = data.audioUrl;
                var resultObj = new chivox.EnSentScore(data);
                var sent = "";
                var scoreList = [];
                for (var i = 0; i < resultObj.getWordSize(); i++) {
                    var color = "";
                    var score = resultObj.data.result.details[i].score;
                    if (score >= 0 && score <= 60) {
                        color = "#ff5b5b";
                    } else if (score > 60 && score < 80) {
                        color = "#000000";
                    } else if (score >= 80 && score <= 100) {
                        color = "#4ebc23";
                    }

                    var singleWord = resultObj.data.result.details[i].rawchar;
                    if (singleWord.split(" ").length > 1) {
                        singleWord = changeCase(singleWord);
                    }
                    sent = sent + ' <span style="color:' + color + ';">' + singleWord + '</span>';
                    if(score!=undefined){
                         scoreList.push(singleWord+"/"+score);
                    }
                   
                }
                $(".sentence").html(sent);
                var scoreAll = resultObj.getOverall();
                //showScoreGuide(scoreAll);
                if (scoreAll >= 0 && scoreAll <= 60) {
                    $("#recordScore").removeClass().addClass("bad");
                } else if (scoreAll > 60 && scoreAll < 80) {
                      $("#recordScore").removeClass().addClass("middle");
                } else if (scoreAll >= 80 && scoreAll <= 100) {
                    $("#recordScore").removeClass().addClass("record-score");
                    //$(".record-score").addClass("middle");
                } else {
                    scoreAll = "0";
                }
                //scoreAll="0";
                //$(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; top:-31px; right:-48px; left:-76px;display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: " + position + ";");
                if(scoreAll>60){
                    $("#recordScore").html(scoreAll);
                }else{
                    $("#recordScore").html("");
                }
                scoreVal = scoreAll;
                //Scorelog(this, resultObj,obj);
                jumpFlag = 1;
                 $("#recordScore").show();
                //logRecordData(word_id, course, 5, resultObj.getOverall());
               /* if (scoreAll == "0") {
                   $(".error_warn").show();
                } else {
                    $(".error_warn").hide();
                    $(".record-score").show();
                }*/
                $("#replay").attr('media-audio','http://'+record+'.mp3');
                $("#replay").removeClass("disableplay").removeClass("pause");
                var posteData= {
                    "course_id" : course_id,
                    "p_id"     : obj.attr("pid"),
                    "score"     : scoreVal,
                    "w_score"   : scoreList.join(),
                    "record"    :record
                }
                //句子记录
                statistics.setenceRecord(posteData);
            };

           

            aiPanel.params.onAfterRecord = function(data) {
               
                obj.removeClass(toggleClass).addClass("off");
                obj.attr("isrecord", "false");
                
            };
            aiPanel.params.onScoreError = function(errorType) {
                //评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
                var errorObj = chivox.AiStatusCode.get(errorType, "cn");
                alert(errorObj.feedback);
                //$(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; bottom: -10px; right: -215px; display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: 0px -38px;");
                $(".record-score").html("0");

            };
            obj.toggleClass(toggleClass);
            $("#recordScore").hide();
            $("#aiPanel .record").click(); //播放触发
        },
        setRight: function (aiPanel, callback) {
        dataIndex = 0200;
        aiPanel.setData({
            audioUrl: "http://static.51talk.com/static/js/html/project/class_20150824/yes.mp3"
        });
        $(".good").show();
        $(".good img").animate({height:"auto",width:"220px", "bottom":"204px"},800);
        aiPanel.params.onAfterPlay = function() {
            setTimeout(function(){
               $(".good").hide();
               callback();
            },300);
            aiPanel.params.data.audioUrl="";
        };
        $("#aiPanel .play").click();
           if(cookie.getCookie("VideoisGrade")=="true"){
                $(".record-tips").hide();
                $(".record-tips").addClass('hide');
            }else{
                $(".record-tips").show();
            }
    }
    });
    var statistics = new Statistics();
     var base = new Base();   
    //分页
    function Pagenation(){
       this.page = parseInt(videoPage);
       this.pageNumber = parseInt(videoTotal); 
       this.data = null;
       
    }

    $.extend(Pagenation.prototype, {
        
        getPageNo: function() {
            return this.page;
        },

        setPageNo: function() {

        },
        
        first:function(){
            videoMpage=1;
            this.page=1;
            statistics.raise=1;
            statistics.startTime = new Date().getTime();
            $.ajax({
                url: "/ApiEfl/getPrePicture?course_id="+course_id+"&page="+this.page,
                dataType: 'json',
                type: "get",
                context: this,
                success: this.hanldleFetchDataFirstSuccess,
                error: function() {}
            });
        },
        init:function(){
            if(this.page==1){
                 statistics.pageRecord(0,0,0,0,statistics.raise,0);
            }
            statistics.startTime = new Date().getTime();
             $.ajax({
                url: "/ApiEfl/getPrePicture?course_id="+course_id+"&page="+this.page,
                dataType: 'json',
                type: "get",
                context: this,
                success: this.hanldleFetchDataSuccess3,
                error: function() {}
            });
        },
        prev:function(type){
            videoMpage=1;
             $(".loading-pic").show();
             if($("#deafness").length==0){
                    var stayTime =  new Date().getTime() - statistics.startTime;
                    var isEnd = this.data.is_end ? this.data.is_end : 0;
                    statistics.pageRecord(this.page,this.data.m_page,this.data.model,isEnd,statistics.raise,stayTime);
             }
            statistics.startTime = new Date().getTime();
            var page = this.page;
             if(this.page>1){
                 page--;
            }
           videoPage = page;
           this.page = page;

           $.ajax({
                url: "/ApiEfl/getPrePicture?course_id="+course_id+"&page="+this.page,
                dataType: 'json',
                type: "get",
                context: this,
                success: this.hanldleFetchDataSuccess2,
                error: function() {}
            });
        },
        next: function(type){
            videoMpage=1;
            $(".loading-pic").show();
            if($("#deafness").length==0){
                    var stayTime =  new Date().getTime() - statistics.startTime;
                    var isEnd = this.data.is_end ? this.data.is_end : 0;
                    statistics.pageRecord(this.page,this.data.m_page,this.data.model,isEnd,statistics.raise,stayTime);
             }
            statistics.startTime = new Date().getTime();
            var page = this.page;
            if(parseInt(this.page)< parseInt(this.pageNumber)){
                 page++;
            }
           this.page = page;
           videoPage = page;
            $.ajax({
                url: "/ApiEfl/getPrePicture?course_id="+course_id+"&page="+this.page,
                dataType: 'json',
                type: "get",
                context: this,
                success: this.hanldleFetchDataSuccess,
                error: function() {}
            });
        },

        hanldleFetchDataSuccess: function(data) {
            $(".loading-pic").hide();
            base.process(this.page,this.pageNumber);
            this.data = data.data;
            $(this).triggerHandler('next', data.data);
        },
        hanldleFetchDataSuccess2:function(data){
            $(".loading-pic").hide();
            base.process(this.page,this.pageNumber);
            this.data = data.data;
            $(this).triggerHandler('prev', data.data);
        },
        hanldleFetchDataSuccess3:function(data){
            $(".loading-pic").hide();
            base.process(this.page,this.pageNumber);
            this.data = data.data;
            $(this).triggerHandler('init', data.data);
        },
        hanldleFetchDataFirstSuccess:function(data){
            $(".loading-pic").hide();
            base.process(this.page,this.pageNumber);
            this.data = data.data;
            $(this).triggerHandler('first', data.data);
        }
    });
   //用户引导 
   function GuideUser() {
    	this.dialog = $("#video-dialog");
    	this.tab = $("[data-tab='2']");
    	this.close = $("#video-dialog .close");
    	this.down = $("#video-dialog .down");
    }
    $.extend(GuideUser.prototype, {
    	init: function() {
            var isUnderIe9Browser = this.checkBrowserIsUnderIe9();
            this.posteData = {};
            var browser = $.browser;
            this.posteData.browser = _.keys(browser)[0];
            this.posteData.browse_v = _.values(browser)[1];
            this.posteData.behavior = "-1";     
            if(isUnderIe9Browser){
                this.showDialog();
                statistics.browserRecord(this.posteData);
                this.bindEvents();
                $(".loading-pic").hide();
                $(".sub-class").html("<div style='padding-left:40px;line-height:48px;'>浏览器版本过低，请下载高版本浏览器！推荐使用<a style='color:#ff8200;' target='_blank'  href='http://www.baidu.com/link?url=OfJDTsUi84wmJYP_xn1A-IaiO8kqvSo9We4k659YhqKd0N1giAOAWM6akv2Y7rnbunNlHTeqNvH7NU75o5vATVtET9STivjmwPg0CYxyJ5a' >chrome</a></div>");
                return false;
            }
           $(this).triggerHandler('showContent', this);

    	},
    	bindEvents: function() {
            
			this.close.on('click', $.proxy(this.hideDialog, this));
			this.tab.on('click',$.proxy(this.showDialog, this));
            var self = this;
            $("#donwnload").on("click",function(){
                self.posteData.behavior= 1;
                statistics.browserRecord(self.posteData);
                self.close.addClass("havenDown");
            });
    	},
    	checkBrowserIsUnderIe9: function() {
			var isIeBrowser = $.browser.msie;
	        var browserVersion = parseInt($.browser.version, 10);
	        if (isIeBrowser && browserVersion < 9) {
	        	return true;
	        }
	        return false;
    	},
    	showDialog: function() {
    		  this.dialog.show();		
    	},
    	hideDialog: function() {
    		this.dialog.hide();
            if( !this.close.hasClass('havenDown')){
                this.posteData.behavior= 0;
                statistics.browserRecord(this.posteData);
            }
            
    	}
    });
     //封面
    function Cover() {
        this.parent = $('.sub-class');
        window.t_startTime =  new Date().getTime();
    }
    $.extend(Cover.prototype, {
        init: function(data) {
            this.render(data);
            this.video =  this.parent.find('.cover-video').get(0);
            this.bindEvents();
            this.video.play();
        },
        render: function(data) {
            $(".loading-pic").hide();
            $(".sub-class").html(tmpl.cover({data:data,domain:domain}));
        },
        bindEvents: function() {
            this.parent.off();
            this.parent.on('click', '.learning', $.proxy(this.handleLearningButtonClick, this));
            var self = this;
            base.videoEnded(this.video,function(){
                $(".sub-class .learning").removeClass("disablelearning");
                 statusList.cover=true;
             });
            base.videoReplay(this.video);
            base.videoPlayPause();
            base.loading(this.video);
        },
        handleLearningButtonClick: function(e) {
            if(!$(e.target).hasClass("disablelearning")){
                $(this).triggerHandler('showContent', this);
            }
            
        }        
    }); 
    

    //盲听环节
    function Deafness(){
        this.parent = $(".sub-class");
        this.cur = 0;
    }
    $.extend(Deafness.prototype,{
        init:function(data){
            this.page = data.page;
            this.model = data.model;
            window.t_startTime =  new Date().getTime();
            isBlind = true;
            this.render(data);
            this.bindEvents(); 
            this.total =   data.datalist.length;
        },
        render:function(data){
            $(".loading-pic").hide();
            $(".sub-class").html(tmpl.deafness({data:data,domain:domain}));
            base.showMask();
            this.countDown();

        },
        bindEvents:function(){
            this.parent.off();
            $("video").each(function(i,item){
                //item.removeEventListener("ended");
            });
            base.videoPlayPause();
            this.replayVideo();
             $(".video").each(function(i,item){
                base.loading(item);
             });
            this.parent.on('click', '.learning', $.proxy(this.handleLearningButtonClick, this));
            //base.videoStart();
        },
        handleLearningButtonClick: function(e) {
            if(!$(e.target).hasClass("disablelearning")){
                $(this).triggerHandler('showContent', this);
            }
            
        } ,
        replayVideo:function(){
            var self = this;
            this.parent.on("click",".replay2",function(){
                base.hideReplay();
                //取消事件
                self.cur=0;
                self.cancelPlayEvent();
                self.playVideo($.makeArray($(".video")));
            });
        },
        cancelPlayEvent:function(){
            $.each($(".video"),function(i,item){
               //item.removeEventListener("ended");
            });
        },
        countDown:function(){
            var self = this;
              var number;
                aiPanel.setData({
                    audioUrl: "http://static.51talk.com/static/js/html/project/class_20150824/time3.mp3",
                    serverParams: {
                        coreType: "en.sent.score",
                        refText: "hello limei"
                    }
                });
                aiPanel.params.onAfterPlay = function() {
                      number = parseInt($(".countdown").text());
                      $(".countdown").text(number - 1);
                      if (number > 1) {
                        setTimeout(function(){
                            self.countDown();
                        },1000);
                      }else{
                        $(".countdown").hide();
                        base.hideMask();
                        self.playVideo($.makeArray($(".video")));
                      }
                      aiPanel.params.data.audioUrl="";
                };

                $("#aiPanel .play").click();
        },
        playVideo:function(medias){
              var list = medias;
              var media = list.shift();
              var self = this;
              $(media).show();
              media.play();
              self.cur++;
              media.onended = function(e){
                   if(self.cur == self.total){
                        statistics.pageRecord(self.page,self.cur,self.model,1,statistics.raise,0);
                    }else{
                        statistics.pageRecord(self.page,self.cur,self.model,0,statistics.raise,0);
                    }
                  if(list.length!=0){
                    $(e.target).hide();
                    base.hideReplay();
                  }else{
                    $(".learning").removeClass('disablelearning');
                    base.showReplay();
                  }
                  if(list.length>0){
                    self.playVideo(list);
                  }
              }
          }
    });

    //逐句环句
    function Setence(){
        this.parent = $(".sub-class");
        this.audioPlaying=false;
        this.havenRecord = false;
        window.t_startTime =  new Date().getTime();
    }
    $.extend(Setence.prototype,{
        init:function(data){

            this.data = data;
            if(videoMpage!=1 && videoMpage!=2 && videoMpage!=3){
                videoMpage = 1;
            }

            this.data.videoMpage = videoMpage;
            this.render(this.data);
            
            this.video = this.parent.find(".video").get(0);
            this.bindEvents();
            //记录当前处在哪一个环节当中
            var isEnd = this.data.is_end ? this.data.is_end : 0;
            statistics.pageRecord(this.data.page,videoMpage,this.data.model,isEnd,statistics.raise,0);
            //通过模块页来触发音频自动播放
            if(videoMpage==2){
               this.round2();
            }else{
                this.video.play();
            }

        },
        bindEvents:function(){
            this.parent.off();
            var self = this;
            
            //视频播放完触发事件
            base.videoEnded(self.video,function(){
                self.parent.find("#firstButtons span").removeClass('disable');
                //开始请求记录按钮状态
            });
            base.videoPlayPause();
            //视频重新播放
            base.videoReplay(this.video,$.proxy(function(){
                this.posteData = {
                    "p_id"  : this.data.id,
                    'round' : $(".replay2").attr("flage")
                }
                 statistics.replayRecord(this.posteData);
             },this));
            this.can();
            this.not();
            
            //次轮听懂
            this.secondCan();
            //次轮听不懂
            this.secondNot();
            //录音
            this.record();
            //播放录音
            this.recordReplay();
            this.parent.on('click', '.next', $.proxy(this.handleLearningButtonClick, this));
            this.parent.on("click",'.prev',$.proxy(this.handlePrevButtonClick, this));
            base.loading(this.video);
        },
        record:function(){
            var self = this;
            this.parent.on('click','.off',$.proxy(function(e){
                 self.stopVideo();
                $(".good").hide();
                this.havenRecord=true;
                $(".record-start").hide();    
                if($("#replay").hasClass('pause')){
                     $("#replay").removeClass("pause");
                }
                if ($(e.target).attr("isRecord") == "true") {
                    $("#aiPanel .record").click();
                    $(".record-score").hide();
                    $(e.target).attr("isRecord", "false");
                } else {
                    $(e.target).attr("isRecord", "true");
                    base.setRecord(aiPanel, $(e.target), "luyin", student_num1, "video");
                }
                $(".record-tips").hide();
                $(".record-tips").addClass("hide");
                cookie.setCookie("VideoisGrade", "true");
            },this));
            
        },
        stopVideo:function(){
            if(!this.video.paused){
                this.video.pause();
                this.video.currentTime = 0;
            }
        },
        recordReplay:function(){
            var self = this;
            this.parent.on('click','#replay',$.proxy(function(e){
                 self.stopVideo();
                $(".good").hide();
                var ele = $(e.target);
                  $(".off").removeClass("luyin").attr("isrecord", 'false');
                if(ele.hasClass('pause') && !$("#replay").attr('media-audio')){
                    ele.removeClass('pause').addClass('sentence-play');
                    $('#aiPanel .replay').click();
                    return;
                }
                if($("#replay").attr('media-audio')){
                   if(ele.hasClass('pause')){
                        $('#aiPanel .play').click();
                        ele.removeClass('pause').addClass('sentence-play');
                        return;
                   }
                    base.recordRead(aiPanel,ele,'pause');
                }else if(!ele.hasClass('disableplay')){
                    $(".replay").click();
                }
            },self));
        },
        can:function(){
            var self = this;
            $("#can").off().on("click",function(){
                if(!$(this).hasClass("disable")){
                    var isEnd = self.data.is_end ? self.data.is_end : 0;
                    var stayTime =  new Date().getTime() - statistics.startTime;
                    statistics.pageRecord(self.data.page,3,self.data.model,isEnd,statistics.raise,stayTime);
                    statistics.startTime =  new Date().getTime();
                    videoMpage=3;
                    self.stopVideo();
                    self.pulicLast($("#firstButtons"),$.proxy(self.setRight2,self));
                    self.posteData = {
                        "p_id"  : self.data.id,
                        'round' : $(".replay2").attr("flage"),
                        'operation' :1
                     }
                     statistics.replayRecord(self.posteData);
                    $(".replay2").attr("flage",3);
                }
            });
        },
        pulicLast:function(hideEle,callback){
                hideEle.hide();
                $(".lastsentences").show();
                base.videoReplay(this.video,$.proxy(function(){
                this.posteData = {
                    "p_id"  : this.data.id,
                    'round' : $(".replay2").attr("flage")
                }
                 statistics.replayRecord(this.posteData);
             },this));
                base.hideReplay();
                if(callback){
                    callback();
                }else{
                    this.video.play();
                }
        },
        setRight2:function(){
            var self = this;
            base.setRight(aiPanel,$.proxy(function(){
                    self.video.play();
            },self));
        },
        secondCan:function(){
            //console.log(aiPanel.params.data.audioUrl);
             var self = this;
            $("#secondButtons .can").off().on("click",$.proxy(function(e){
                if(!$(e.target).hasClass("disable")){
                    var isEnd = self.data.is_end ? self.data.is_end : 0;
                    var stayTime =  new Date().getTime() - statistics.startTime;
                     statistics.pageRecord(self.data.page,3,self.data.model,isEnd,statistics.raise,stayTime);
                     statistics.startTime =  new Date().getTime();
                    self.stopVideo();
                    self.pulicLast($("#secondButtons"),$.proxy(self.setRight2,self));
                    if(self.audioPlaying){
                        $("#aiPanel .play").click();
                        $(".slowplay").hide();
                    }
                    self.posteData = {
                        "p_id"  : self.data.id,
                        'round' : $(".replay2").attr("flage"),
                        'operation' :1
                     }
                     statistics.replayRecord(self.posteData);
                    $(".replay2").attr("flage",3);
                }
            },self));
        },
        secondNot:function(){
            
            var self = this;
            $("#secondButtons .not").off().on("click",$.proxy(function(e){
                if(!$(e.target).hasClass("disable")){
                    if(aiPanel.player.getPlayerStatus()=="player.playing"){
                        aiPanel.player.stop();
                    }
                     var isEnd = self.data.is_end ? self.data.is_end : 0;
                     var stayTime =  new Date().getTime() - statistics.startTime;
                     statistics.pageRecord(self.data.page,3,self.data.model,isEnd,statistics.raise,stayTime);
                     statistics.startTime =  new Date().getTime();
                     videoMpage=3;
                    self.pulicLast($("#secondButtons"));
                    if(self.audioPlaying){
                        $("#aiPanel .play").click();
                        $(".slowplay").hide();
                    }
                    self.posteData = {
                        "p_id"  : self.data.id,
                        'round' : $(".replay2").attr("flage"),
                        'operation' :0
                     }
                     statistics.replayRecord(self.posteData);
                    $(".replay2").attr("flage",3);
                    if(cookie.getCookie("VideoisGrade")=="true"){
                        $(".record-tips").hide();
                        $(".record-tips").addClass("hide");
                    }else{
                        $(".record-tips").show();
                    }
                }
            },self));
        },
        not:function(){
            var self = this;
            
            $("#not").off().on("click",function(){
                if(!$(this).hasClass("disable")){
                   self.stopVideo();
                   self.round2();
                }
               
            });
        },
        round2:function(){
            var self = this;
            var isEnd = this.data.is_end ? this.data.is_end : 0;
             var stayTime =  new Date().getTime() - statistics.startTime;
             statistics.pageRecord(self.data.page,2,self.data.model,isEnd,statistics.raise,stayTime);
             statistics.startTime = new Date().getTime();
                    videoMpage=2;
                    base.hideReplay();
                    base.showMask();
                    $(".slowplay,#secondButtons").show();
                    $("#firstButtons").hide();
                    self.audioPlaying =true;
                    self.posteData = {
                        "p_id"  : self.data.id,
                        'round' : $(".replay2").attr("flage"),
                        'operation' :0
                     }
                     statistics.replayRecord(self.posteData);
                    $(".replay2").attr("flage",2);
                    base.setData(aiPanel,domain+self.data.audiourl).done(function(){
                        $("#secondButtons span").removeClass("disable");
                        $(".slowplay").hide();
                        base.hideMask();
                        base.showReplay();
                        self.audioReplay();
                        self.audioPlaying = false;
                        //$(".replay2").attr("isaudio",1);
                    });
         },
        audioReplay:function(){
            var self = this;
            $(".replay2").off().on("click",function(){

                base.hideReplay();
                $(".slowplay").show();
                base.showMask();
                self.audioPlaying = true;
                 self.posteData = {
                        "p_id"  : self.data.id,
                        'round' : $(".replay2").attr("flage")
                     }
                statistics.replayRecord(self.posteData);
                base.setData(aiPanel,domain+self.data.audiourl).done(function(){
                        $(".slowplay").hide();
                        base.showReplay();
                        $(".replay2").attr("isaudio",1);
                        self.audioPlaying = false;
                });
            })
        },
        render:function(data){
             $(".loading-pic").hide();
            this.parent.html(tmpl.videoSetence({data:data,domain:domain}));
        },
        handleLearningButtonClick:function(){
            var self = this;
            if(this.havenRecord || self.data.score){
                 if(aiPanel.player.getPlayerStatus()=="player.playing"){
                        aiPanel.player.stop();
                    }
                $(this).triggerHandler('showContent', this);
            }else{
                $("#skipDialog .layerWord").css({"height":"600px"});
                $("#skipDialog").show();
                $("#skipDialog #wok").off().on("click",function(){
                    $("#skipDialog").hide();
                });
                $("#skipDialog #wsorry").off().on("click",$.proxy(function(){
                    $("#skipDialog").hide();
                    if(aiPanel.player.getPlayerStatus()=="player.playing"){
                        aiPanel.player.stop();
                    }
                    $(self).triggerHandler('showContent', self);
                    
                },self));
            }
        },
        handlePrevButtonClick:function(){
            if(aiPanel.player.getPlayerStatus()=="player.playing"){
                aiPanel.player.stop();
            }
            $(this).triggerHandler('showPrevContent', this);
        }
    });

    //转场
    function Transitions() {
        this.parent = $('.sub-class');
    }
    $.extend(Transitions.prototype, {
        init: function(data) {
            this.parent.off();
            this.render(data);
            this.video =  this.parent.find('.video').get(0);
            this.bindEvents();
            this.video.play();
        },
        render: function(data) {
            $(".loading-pic").hide();
            $(".sub-class").html(tmpl.transitions({data:data,domain:domain}));
        },
        bindEvents: function() {
            this.parent.on('click', '.continue', $.proxy(this.handleLearningButtonClick, this));
            this.parent.on('click', '.prev', $.proxy(this.handlePrevButtonClick, this));
            //$(".prev").off().on("click",$.proxy(this.handlePrevButtonClick, this));
            var self = this;
            base.videoEnded(this.video);
            base.videoReplay(this.video);
            base.videoPlayPause();
            base.loading(this.video);
            //base.videoStart();
        },
        handleLearningButtonClick: function(e) {
            $(this).triggerHandler('showContent', this);            
        },
        handlePrevButtonClick:function(){
            $(this).triggerHandler('showPrevContent', this);
        }        
    }); 

     //结果页
    function VideoResult() {
        this.parent = $('.sub-class');
    }
    $.extend(VideoResult.prototype, {
        init: function(data) {
            this.render(data);
            this.video =  this.parent.find('.video').get(0);
            this.bindEvents();
            statistics.pageRecord(data.page,1,data.model,1,statistics.raise,0);
        },
        render: function(data) {
            $(".loading-pic").hide();
            $(".sub-class").html(tmpl.videoResult());
        },
        bindEvents: function() {
            this.parent.on('click', '.relearning', $.proxy(this.handleLearningButtonClick, this));
            var self = this;
        },
        handleLearningButtonClick: function(e) {
            $(this).triggerHandler('showContent', this);            
        }        
    }); 
    //图说视频入口
	function Videos() {
 
	}
	$.extend(Videos.prototype, {

		init: function() {
            $(".ft").hide();
            this.pagenation = new Pagenation();
            this.guideUser = new GuideUser();
            this.bindEvents();
			this.guideUser.init();
                      
		},

        bindEvents: function() {
            //视频播放暂停
            $(this.guideUser).on('showContent', $.proxy(this.showInitPartment, this));         
            $(this.pagenation).on('next', $.proxy(this.partment, this));
            $(this.pagenation).on('prev', $.proxy(this.partment, this));
            $(this.pagenation).on('init', $.proxy(this.partment, this));
            $(this.pagenation).on('first', $.proxy(this.partment, this));
        },
        showInitPartment:function(e){
            var data = arguments[1];
            this.pagenation.init(data);
        },
        showNextPartment: function(e) {
            var data = arguments[1];
            this.pagenation.next(data);
        },
        showPrevPartment: function(e) {
            var data = arguments[1];
            this.pagenation.prev(data);
        },
        showFirstPartment: function(e) {
            var data = arguments[1];
            this.pagenation.first(data);
        },
        partment: function(e) {
            var data = arguments[1];
            var type = data.type;
            var page = data.page;

            if (type === '1') {
                this.cover = new Cover();
                data.butstatus = statusList.cover;
                $(this.cover).on('showContent', $.proxy(this.showNextPartment, this));
                this.cover.init(data);
            }else if(type=="4"){
                this.deafness = new Deafness();
                data.butstatus = statusList.deafness;
                $(this.deafness).on('showContent', $.proxy(this.showNextPartment, this));
                this.deafness.init(data);
            }else if(type=="2"){
                this.sentence = new Setence();
                $(this.sentence).on('showContent', $.proxy(this.showNextPartment, this));
                $(this.sentence).on('showPrevContent', $.proxy(this.showPrevPartment, this));
                this.sentence.init(data);
               
            }else if(type=="3"){
                this.transitions = new Transitions();
                $(this.transitions).on('showContent', $.proxy(this.showNextPartment, this));
                $(this.transitions).on('showPrevContent', $.proxy(this.showPrevPartment, this));
                this.transitions.init(data);
            }else if(type=="9"){
                this.videoResult = new VideoResult();
                $(this.videoResult).on('showContent', $.proxy(this.showFirstPartment, this));
                this.videoResult.init(data);
            }
        }
	});

     exports.videos = Videos;
});

