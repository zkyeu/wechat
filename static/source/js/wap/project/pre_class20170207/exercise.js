define(function(require, exports, module){
    var index = 0;
    function Exercise() {
        this.sliderWrapper = $('.swiper-wrapper .swiper-slide');
        this.stars = $('.exercise-slide .star_wrap');
        this.exercise = $('.exercise-operation');
        this.listen = $('.exercise-operation .listen');
        this.record = $('.exercise-operation .record');
        this.play = $('.exercise-operation .play');
        this.playStop = $('.exercise-operation .play-stop');
        this.sliderNav = $('.exercise-slider__nav li');
        this.cardWrap = $('.card_wrap');
        this.switchBtn = $('.card_wrap .switch');
        this.sliderScrollNav = $('.exercise-slider__nav .exercise-scroll');
        this.bodyWidth = $('body').width();
        this.audio = $('#audio');
        this.completeAudio = $('#complete_audio');
        this.exerciseAnimate = $(".exercise-animate");
        this.recordStatus = false;
        this.playStatus = false;
        this.sentenceStatus = false;
        this.courseId = $('#course_id').val();
        this.cardLen = Number($('#un_finished_course_num').val());
        this.second = 0;
        this.sentSecond = 0;
        this.lastCard = $('.topic-finished');
        this.finishedBtn = $('.topic-finished');
        this.svg = $('#svg');
        this.circle = document.querySelectorAll("circle")[1];
        this.timer = [];
        this.sentTimer = [];
        this.startTime = 0;
        this.endTime = 0;
        this.canvasScale = false;
        this.cardSwitch = false;
        this.autoStopTimer = null;
    }
    $.extend(Exercise.prototype, {
        init: function() {
            this.bindEvents();
            this.calcSliderNav();
            this.WxHideOptionHandler();
            this.toastHandler('请先进行录音');
            this.initPlayStatus(index);
        },
        initPlayStatus: function(i) {
            var hasScore = this.cardWrap.eq(i).find('.english_card').attr('data-complete') || this.cardWrap.eq(i).find('.english_card').attr('data-score');
            if(hasScore) {
              this.play.addClass('play-normal');
            }
        },
        WxHideOptionHandler: function() {
            var _self = this;
            function onBridgeReady() {
                wx.hideOptionMenu();
                _self.completeAudio[0].play();
                _self.completeAudio[0].pause();
            }
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady',onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        },
        bindEvents: function() {
            this.listen.on('click', $.proxy(this.listenAudio, this));
            this.record.on('click', $.proxy(this.recordAudio, this));
            this.play.on('click', $.proxy(this.unPlayAudio, this));
            this.sliderNav.on('click', $.proxy(this.sliderNavHandler, this));
            this.cardWrap.on('click', $.proxy(this.switchCardHandler, this));
            this.finishedBtn.on('click', '.finished-btn', $.proxy(this.completeHandler, this));
            this.audio.on('ended', $.proxy(this.listenAudioEnd, this));
            // this.audio.on('ended', $.proxy(this.playAudioEnd, this));
        },
        completeHandler: function() {
            this.sendRequest('complete', 'POST', 'json', {'course_id': this.courseId}, this.sendRequestCompleteSuccess, this.sendRequestError)
        },
        //中英文卡片切换
        switchCardHandler: function(e) {
            this.cardSwitch = !this.cardSwitch;
            var currentCard = this.cardWrap.eq(index).find('.english_card'),
                chineseCard = this.cardWrap.eq(index).find('.chinese_card'),
                that = this;
            var start = new Date().getTime();
            var target = $(e.currentTarget).find('.switch'),
                text = target.text();
            text == '中' ? target.text('英') : target.text('中');
            // 如果是句子就翻译一下
            if(currentCard.hasClass('sentence') && !this.sentenceStatus) {
                var english = unescape(currentCard.text());
                $.ajax({
                    url: 'translate?q=' + english,
                    type: 'GET',
                    dataType: 'json',
                    success: function(res) {
                        that.sentenceStatus = true;
                        chineseCard.text(res.data);
                    }
                })
            }
            // 加入3D翻转效果
            this.cardWrap.eq(index).find('.card').toggleClass('rotate');
            if(this.cardSwitch) {
                currentCard.css('z-index', 8);
                chineseCard.css('z-index', 9);
            } else {
                currentCard.css('z-index', 9);
                chineseCard.css('z-index', 8);
            }
        },
        // 句子25秒加载完进度条
        autoStopRecordCompleteHandler: function() {
            var that = this;
            for(var i = 0; i < 100; i++){
                that.sentTimer[i] = setTimeout(function() {
                    that.sentSecond += 1;
                    var percent = that.sentSecond / 100, perimeter = Math.PI * 2 * 25;
                    if(perimeter * (1- percent) == 0) {
                        that.svg.hide();
                        that.record.removeClass('record-complete');
                        that.sentSecond = 0;
                        that.circle.setAttribute('stroke-dasharray', '0 1069');
                        return;
                    }
                    that.circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
                }, i * 250 + 500)
            }
            that.sentSecond = 0;
        },
        // 单词15秒加载完进度条
        recordCompleteHandler: function() {
            var that = this;
            for(var i = 0; i < 100; i++){
                that.timer[i] = setTimeout(function() {
                    that.second += 1;
                    var percent = that.second / 100, perimeter = Math.PI * 2 * 25;
                    if(perimeter * (1- percent) == 0) {
                        that.svg.hide();
                        that.record.removeClass('record-complete');
                        that.second = 0;
                        that.circle.setAttribute('stroke-dasharray', '0 1069');
                        return;
                    }
                    that.circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
                }, i * 150 + 500)
            }
            that.second = 0;
        },
        toastHandler: function(text) {
            var toast = '<section id="toast">'+
                            '<section class="mask-transparent">'+
                                '<section class="toast-dialog">' + text + '</section>'+
                            '</section>'+
                        '</section>';
            $(toast).appendTo($(document.body))
        },
        listenAudioEnd: function() {
            this.listen.removeClass('listen-stop');
        },
        listenAudio: function(e) {
            var target = $(e.currentTarget);
            var audioUrl = this.cardWrap.eq(index).find('.sys_record').val();
            target.addClass('listen-stop');
            this.audio.attr('src', audioUrl);
            this.audio[0].play();
        },
        recordAudio: function(e) {
            this.recordStatus = !this.recordStatus;
            var target = $(e.currentTarget);
            var that = this;
            var currentCard = this.cardWrap.eq(index).find('.english_card'),
                wordId = this.cardWrap.eq(index).find('.word_id').val(),
                refText = currentCard.text(),
                coreType = "en.word.score";
            if(currentCard.hasClass('sentence')){
                coreType = "en.sent.score";
                this.autoStopRecordCompleteHandler();
            } else {
                this.recordCompleteHandler();
            }
            if(recordBegin) {
                if(this.recordStatus) {
                    this.svg.show();
                    target.addClass('record-complete');
                    this.sliderWrapper.eq(index).addClass('stop-swiping');
                    chivox.wx.startRecord({
                    　　refText: refText,
                    　　coreType: coreType,
                    　　regular: true,
                    　　rank: 100,
                    　　isPlayTipsAudio: false,
                    　　success: function (res) {
                            currentCard.attr({'data-clientRecId': res.result.clientRecId});
                            if(currentCard.hasClass('sentence')){
                              that.autoStopTimer = setTimeout(function () {
                                  that.autoStopRecordSuccess(e);
                              }, 25000);
                            } else {
                              that.autoStopTimer = setTimeout(function () {
                                  that.autoStopRecordSuccess(e);
                              }, 15000);
                            }
                        },
                    　　error: function (e) {
                            console.log('录音失败' + JSON.stringify(e))
                        }
                    });
                } else {
                    this.stopRecordSuccess(e);
                }
            } else {
                alert('录音功能加载失败，请点击右上角-刷新页面');
            };
        },
        stopRecordSuccess: function(e) {
            var target = $(e.currentTarget);
            var that = this;
            var currentCard = this.cardWrap.eq(index).find('.english_card'),
                wordId = this.cardWrap.eq(index).find('.word_id').val(),
                refText = currentCard.text(),
                isComplete = currentCard.attr('data-complete');
            this.svg.hide();
            target.removeClass('record-complete');
            this.circle.setAttribute('stroke-dasharray', "0 1069");
            clearTimeout(this.autoStopTimer);
            for(var i = 0, len = this.timer.length; i < len; i++) {
                clearTimeout(this.timer[i]);
            }
            for(var i = 0, len = this.sentTimer.length; i < len; i++) {
                clearTimeout(this.sentTimer[i]);
            }
            chivox.wx.stopRecord({
            　　clientRecId: currentCard.attr('data-clientRecId'),
            　　isShowProgressTips: 0,
                stoped: function (res) {
                        console.log('停止录音成功的回调')
                },
                success: function(res) {
                    that.recordStatus = false;
                    var score = res.result.result.overall;
                    var tipId = res.result.result.info;
                    var audioUrl = res.result.audioUrl;
                    if(score >= 36) {
                      currentCard.attr('data-score', true);
                    }
                    that.sendRequest('score', 'POST', 'json', {'c_id': that.courseId, "w_id":wordId, "word": refText, "score": score, "local_id": currentCard.attr('data-clientRecId'), "audio_url": audioUrl}, that.sendRequestSuccess, that.sendRequestError);
                    if(currentCard.hasClass('sentence')){
                      if( score >= 0 && score <= 35) {
                          that.zeroScore('你的发音不够标准<br>请再试一次');
                      } else if( score >= 36 && score <= 50) {
                          that.oneScore();
                      } else if(score >= 51  && score <= 60) {
                          that.twoScore();
                      } else if(score >= 61 && score <= 80) {
                          that.threeScore();
                      } else if(score >= 81 && score <= 90) {
                          that.fourScore();
                      } else if(score >= 91 && score <= 100) {
                          that.fiveScore();
                      }
                    } else {
                      if( score >= 0 && score <= 35) {
                          that.zeroScore('你的发音不够标准<br>请再试一次');
                      } else if( score >= 36 && score <= 50) {
                          that.oneScore();
                      } else if(score >= 51  && score <= 60) {
                          that.twoScore();
                      } else if(score >= 61 && score <= 80) {
                          that.threeScore();
                      } else if(score >= 81 && score <= 90) {
                          that.fourScore();
                      } else if(score >= 91 && score <= 100) {
                          that.fiveScore();
                      }
                    }
                    for(var i = 0; i < tipId.length; i++) {
                        var tipId = tipId[i].tipId;
                        switch(tipId) {
                            case 10000:
                                that.zeroScore('未检测到录音，请再试一遍');
                                break;
                            case 10001:
                                that.zeroScore('你的发音不完整，请再试一遍');
                                break;
                            case 10002:
                                that.zeroScore('未准确识别录音，请检测手机是否静音状态');
                                break;
                            case 10003:
                                that.zeroScore('未准确识别录音，请检测手机是否静音状态');
                                break;
                            case 10004:
                                that.zeroScore('未准确识别录音，请靠近麦克风再试一次');
                                break;
                            case 10005:
                                that.zeroScore('未准确识别录音，请靠近麦克风再试一次');
                                break;
                            case 10006:
                                that.zeroScore('未准确识别录音，周边环境噪音大会影响录音效果');
                                break;
                        }
                    }
                },
                error: function() {
                  that.sliderWrapper.eq(index).removeClass('stop-swiping');
                }
            })
        },
        autoStopRecordSuccess: function(e) {
            var target = $(e.currentTarget);
            var that = this;
            var currentCard = this.cardWrap.eq(index).find('.english_card'),
                wordId = this.cardWrap.eq(index).find('.word_id').val(),
                refText = currentCard.text(),
                isComplete = currentCard.attr('data-complete');
            this.circle.setAttribute('stroke-dasharray', "0 1069");
            for(var i = 0, len = this.timer.length; i < len; i++) {
                clearTimeout(this.timer[i]);
            }
            for(var i = 0, len = this.sentTimer.length; i < len; i++) {
                clearTimeout(this.sentTimer[i]);
            }
            chivox.wx.stopRecord({
            　　clientRecId: currentCard.attr('data-clientRecId'),
            　　isShowProgressTips: 0,
                stoped: function (res) {
                    console.log('停止录音成功的回调')
                },
                success: function(res) {
                    that.svg.hide();
                    that.recordStatus = false;
                    that.record.removeClass('record-complete');
                    var score = res.result.result.overall;
                    var tipId = res.result.result.info;
                    var audioUrl = res.result.audioUrl;
                    if(score >= 36) {
                      currentCard.attr('data-score', true);
                    }
                    that.sendRequest('score', 'POST', 'json', {'c_id': that.courseId, "w_id":wordId, "word": refText, "score": score, "local_id": currentCard.attr('data-clientRecId'), "audio_url": audioUrl}, that.sendRequestSuccess, that.sendRequestError);
                    if(currentCard.hasClass('sentence')){
                      if( score >= 0 && score <= 35) {
                          that.zeroScore('你的发音不够标准<br>请再试一次');
                      } else if( score >= 36 && score <= 50) {
                          that.oneScore();
                      } else if(score >= 51  && score <= 60) {
                          that.twoScore();
                      } else if(score >= 61 && score <= 80) {
                          that.threeScore();
                      } else if(score >= 81 && score <= 90) {
                          that.fourScore();
                      } else if(score >= 91 && score <= 100) {
                          that.fiveScore();
                      }
                    } else {
                      if( score >= 0 && score <= 35) {
                          that.zeroScore('你的发音不够标准<br>请再试一次');
                      } else if( score >= 36 && score <= 50) {
                          that.oneScore();
                      } else if(score >= 51  && score <= 60) {
                          that.twoScore();
                      } else if(score >= 61 && score <= 80) {
                          that.threeScore();
                      } else if(score >= 81 && score <= 90) {
                          that.fourScore();
                      } else if(score >= 91 && score <= 100) {
                          that.fiveScore();
                      }
                    }
                    for(var i = 0; i < tipId.length; i++) {
                        var tipId = tipId[i].tipId;
                        switch(tipId) {
                            case 10000:
                                that.zeroScore('未检测到录音，请再试一遍');
                                break;
                            case 10001:
                                that.zeroScore('你的发音不完整，请再试一遍');
                                break;
                            case 10002:
                                that.zeroScore('未准确识别录音，请检测手机是否静音状态');
                                break;
                            case 10003:
                                that.zeroScore('未准确识别录音，请检测手机是否静音状态');
                                break;
                            case 10004:
                                that.zeroScore('未准确识别录音，请靠近麦克风再试一次');
                                break;
                            case 10005:
                                that.zeroScore('未准确识别录音，请靠近麦克风再试一次');
                                break;
                            case 10006:
                                that.zeroScore('未准确识别录音，周边环境噪音大会影响录音效果');
                                break;
                        }
                    }
                },
                error: function() {
                  that.sliderWrapper.eq(index).removeClass('stop-swiping');
                }
            })
        },
        zeroScore: function(text) {
            var num = index;
            this.stars.eq(num).attr('class', 'star_wrap');
            this.stars.eq(num).find('div').css('display', 'block');
            $('#toast').show();
            $('#toast').find('.toast-dialog').html(text);
            setTimeout(function(){
                $('#toast').hide();
            }, 2000);
            this.sliderWrapper.eq(index).removeClass('stop-swiping');
        },
        oneScore: function() {
            this.starScore(1);
            this.play.addClass('play-normal');
            this.playStatus = true;
        },
        twoScore: function() {
            this.starScore(2);
            this.play.addClass('play-normal');
            this.playStatus = true;
        },
        threeScore: function() {
            this.starScore(3);
            this.play.addClass('play-normal');
            this.playStatus = true;
        },
        fourScore: function() {
            this.starScore(4);
            this.play.addClass('play-normal');
            this.playStatus = true;
        },
        fiveScore: function() {
            this.starScore(5);
            this.colourBarCanvas(5);
            this.play.addClass('play-normal');
            this.playStatus = true;
        },
        unPlayAudio: function(e) {
            var target = $(e.currentTarget),
                currentCard = this.cardWrap.eq(index).find('.english_card').attr('data-clientRecId'),
                clientRecId = this.cardWrap.eq(index).find('.local_id').val(),
                userRecord = this.cardWrap.eq(index).find('.user_record').val();
            if(!currentCard && !clientRecId) {
                $('#toast').show();
                $('#toast').find('.toast-dialog').html('请先进行录音');
                setTimeout(function() {
                    $('#toast').hide();
                }, 2000);
            } else if(!this.playStatus && clientRecId) {
                target.addClass('play-normal');
                this.audio.attr('src', userRecord);
                this.audio[0].play();
                // target.removeClass('play-stop');
            } else {
                target.addClass('play-normal');
                this.playAudio(currentCard, clientRecId, e);
            }
            if(target.hasClass('play-normal')) {
                this.playAudioStop(currentCard, clientRecId);
            }
        },
        playAudio: function(currentCard, clientRecId) {
            chivox.wx.playVoice({
            　　clientRecId: currentCard || clientRecId
            });
            // wx.onVoicePlayEnd({
            //    complete: function (res) {
            //      alert('录音（' + res.localId + '）播放结束');
            //    }
            //  });
            this.playStatus = true;
        },
        playAudioStop: function(currentCard, clientRecId, e) {
            var target = $(e.currentTarget);
            // target.toggleClass('play-stop');
            chivox.wx.stopVoice({
            　　clientRecId: currentCard || clientRecId
            });
        },
        playAudioEnd: function() {
            this.play.removeClass('play-stop');
            this.play.addClass('play-normal');
        },
        // 发送单词评分接口
        sendRequest: function(url, type, dataType, data, success, error) {
            $.ajax({
                url: url,
                type: type,
                dataType: dataType,
                data: data,
                context: this,
                success: success,
                error: error
            })
        },
        sendRequestSuccess: function(res) {
            if(res.status == 0) {
              this.cardLen = res.data.last_num;
            }
        },
        sendRequestCompleteSuccess: function(res) {
            if(res.status == 1) {
                location.href = res.data.url;
            }
        },
        sendRequestError: function(res) {
            console.log(res)
        },
        colourBarCanvas: function(score) {
            var that = this,
                lCanvas = this.exerciseAnimate.find('#l_canvas')[0],
                rCanvas = this.exerciseAnimate.find('#r_canvas')[0],
                lContext = lCanvas.getContext('2d'),
                rContext = rCanvas.getContext('2d'),
                oImg = this.exerciseAnimate.find('#colour_bar')[0],
                screenWidth = $('body').width();

            this.exerciseAnimate.find('img').addClass('animated_horn');
            // this.completeAudio[0].src = this.musicAdapter(score);
            // this.completeAudio[0].play();
            setTimeout(function() {
                that.exerciseAnimate.find('img').removeClass('animated_horn');
            }, 2000);

            if(!this.canvasScale) {
                this.canvasScale = true;
                lContext.scale(screenWidth/750, screenWidth/750);
                rContext.scale(screenWidth/750, screenWidth/750);
            }

            var colour1 = new ColourBar(oImg, 230, 230, 10);
            var startColour = setInterval(function() {
                lContext.clearRect(0, 0, lCanvas.width, lCanvas.height);
                rContext.clearRect(0, 0, lCanvas.width, lCanvas.height);
                colour1.draw(lContext);
                colour1.draw(rContext);
            }, 16);
            setInterval(function() {
                colour1.nextFrame();
            }, 100);
            setTimeout(function() {
                lContext.clearRect(0, 0, lCanvas.width, lCanvas.height);
                rContext.clearRect(0, 0, lCanvas.width, lCanvas.height);
                clearInterval(startColour);
            }, 6000);
            function ColourBar(img, w, h, maxFrame) {//彩带对象
                this.x = 0;
                this.y = 0;
                this.w = w;
                this.h = h;
                this.img = img;
                this.maxFrame = maxFrame;
                this.nowFrame = 0;
            }
            ColourBar.prototype.draw = function(context) {
                context.drawImage(this.img, this.nowFrame*this.w, 0, this.w, this.h, 0, 0, this.w, this.h);
            }
            ColourBar.prototype.nextFrame = function() {
                this.nowFrame++;
                if(this.nowFrame >= this.maxFrame) {
                    this.nowFrame = 0;
                }
            }
        },
        // 评分逻辑
        starScore: function(score) {
            var that = this;
            var hasScore = this.cardWrap.eq(index).find('.english_card').attr('data-complete') || this.cardWrap.eq(index).find('.english_card').attr('data-score');
            if(typeof score == 'undefined' || !score ) {return};
            this.completeAudio[0].src = this.musicAdapter(score);
            this.completeAudio[0].play();
            this.sliderNav.eq(index).addClass('complete').text('');
            if(hasScore) {
                this.stars.eq(index).attr('class', 'star_wrap');
                var i = 0;
                var num = index;
                function nextStar() {
                    if(i === 0) {
                        $(".star_wrap").eq(num).find('.star').find('div').css('display','block');
                        $(".star_wrap").eq(num).find('.star').find('div').eq(0).addClass('resume1');
                    }
                    setTimeout(function() {
                        $(".star_wrap").eq(num).find('.star').eq(i).find('div').addClass('turn');
                    }, 10);
                    var timerNext = setTimeout(function() {
                        $(".star_wrap").eq(num).find('.star').eq(i).find('div').eq(0).css('display','none');
                        $(".star_wrap").eq(num).find('.star').eq(i).find('div').eq(1).css('display','block');
                        $(".star_wrap").eq(num).find('.star').eq(i).find('div').removeClass('resume1');
                        $(".star_wrap").eq(num).find('.star').find('div').removeClass('turn');
                        i++;
                        if(i < score) {
                            nextStar();
                        } else {
                            $(".star_wrap").eq(num).addClass('filp'+score);
                        }
                        that.sliderWrapper.eq(index).removeClass('stop-swiping');
                    }, 500);
                }
                if(i < score) {
                    nextStar();
                }
            }
        },
        // 评分对象
        musicAdapter: function(s) {
            var adapter = {
                1: musicData.tryagain,
                2: musicData.tryagain,
                3: musicData.good,
                4: musicData.very_good,
                5: musicData.perfect
            }
            return adapter[s];
        },
        // 快速切换逻辑
        sliderNavHandler: function (e) {
            this.resetPlayerButtonStatus();
            if(this.sliderWrapper.eq(index).hasClass('stop-swiping')) return;
            var target = $(e.currentTarget),
                navIndex = target.index();
            target.addClass('current').siblings().removeClass('current');
            index = navIndex;
            if(index != this.cardLen) {
                this.exercise.show();
            }
            this.initPlayStatus(navIndex);
            swiper.slideTo(navIndex, 1000, false);
        },
        //  已完成的内容
        finishedHandler: function() {
          var html = '<i class="finished-icon"></i>' +
                      '<p class="finished-text">全都做完了哟~</p>'+
                      '<a href="javascript:;" class="finished-btn"></a>'+
                      '<p class="finished-tips">交卷后也可以返回重新训练</p>';
          $('.topic-finished .finished').html(html);
        },
        // 未完成内容
        unFinishedHandler: function(len) {
            var html = '<div class="unfinished">' +
                            '<p class="addstyle">你还有<em>'+ len +'</em>题</p>'+
                            '<p>没做完哟~</p>'+
                            '<a href="javascript:;" class="unfinished-btn"></a>'+
                        '</div>';
            $('.topic-finished .finished').html(html);
        },
        // 获取css3属性
        getStyle: function(elem) {
            var reg = /\-?[0-9]+/g ;
            return elem.css('transform').match(reg);
        },
        // 卡片切换时，重置状态
        resetPlayerButtonStatus: function() {
            this.recordStatus = false;
            this.playStatus = false;
            this.sentenceStatus = false;
            this.cardSwitch = false;
            this.svg.hide();
            for(var i = 0; i < this.timer.length; i++) {
                clearTimeout(this.timer[i]);
            }
            for(var i = 0, len = this.sentTimer.length; i < len; i++) {
                clearTimeout(this.sentTimer[i]);
            }
            clearTimeout(this.autoStopTimer);
            this.cardWrap.eq(index).find('.english_card').css('z-index', '9');
            this.cardWrap.eq(index).find('.chinese_card').css('z-index', '8');
            this.cardWrap.eq(index).find('.card').removeClass('rotate');
            this.record.removeClass('record-complete');
            this.circle.setAttribute('stroke-dasharray', "0 1069");
            this.listen.removeClass('listen-stop');
            if(!this.playStatus) {
               this.play.removeClass('play-stop play-normal');
            }
        },
        // 计算快速切换设置中间位置
        calcSliderNav: function() {
            var bodyWidth = document.documentElement.offsetWidth || document.body.offsetWidth,
                sliderNavlen = this.sliderNav.length,
                offsetWidthLi = this.sliderNav.width(),
                countWidth = sliderNavlen * offsetWidthLi;
            if(countWidth > this.bodyWidth) {
              this.sliderScrollNav.css({'position': 'absolute'});
            }
            this.sliderScrollNav.width(countWidth);
            // this.sliderScrollNav.css({'margin-left': bodyWidth / 2});
        },
        currentLeft: function() {
          var pageNum = Math.ceil(this.sliderScrollNav.width() /  this.bodyWidth);
          var currentOffsetLeft;
          var sliderNavCurrent = $('.exercise-slider__nav .current');
          if(this.sliderScrollNav.width() > this.bodyWidth) {
              currentOffsetLeft = sliderNavCurrent.position().left;
          } else {
              currentOffsetLeft = sliderNavCurrent.offset().left;
          }
          return currentOffsetLeft;
        },
        // 答题卡关联快速切换逻辑(向右)
        relevanceSliderNavNext: function(nextIndex) {
            this.resetPlayerButtonStatus();
            this.initPlayStatus(nextIndex);
            var len = $('.exercise-scroll li').length;
            // 是否到最后一个了
            if(this.cardLen == 0) {
              this.finishedHandler()
              this.lastCard.css('visibility','visible');
            } else if(this.cardLen >= 1) {
              this.unFinishedHandler(this.cardLen);
              this.lastCard.css('visibility','visible');
            }
            if(nextIndex == len) {
                this.exercise.hide();
            }
            this.sliderNav.eq(nextIndex).addClass('current').siblings().removeClass('current');
            if (nextIndex >= len) return;
            // this.sliderNav.eq(nextIndex - 1).addClass('complete');
            var offsetWidthLi = this.sliderNav[nextIndex].offsetWidth,
                sliderWarpperLen = this.sliderWrapper.length,
                sliderNavComplete = $('.exercise-slider__nav .complete');
            sliderNavComplete.text('');
            var currentOffsetLeft = this.currentLeft();
            if(currentOffsetLeft > this.bodyWidth) {
                this.sliderScrollNav.css({'transform':'translate3D(-'+ (currentOffsetLeft - this.bodyWidth + offsetWidthLi) +'px, 0, 0)'});
            }
        },
        // 答题卡关联快速切换逻辑(向左)
        relevanceSliderNavPrev: function(prevIndex) {
            this.resetPlayerButtonStatus();
            this.initPlayStatus(prevIndex);
            this.exercise.show();
            var offsetWidthLi = this.sliderNav[prevIndex].offsetWidth,
                sliderNavCurrent = $('.exercise-slider__nav .current'),
                sliderWarpperLen = this.sliderWrapper.length;
            if (prevIndex < 0) return;
            this.sliderNav.eq(prevIndex).addClass('current').siblings().removeClass('current');
            var currentOffsetLeft = this.currentLeft();
            var prevCurrent = sliderNavCurrent.offset().left;
            if(currentOffsetLeft > this.bodyWidth && prevCurrent <= 0) {
                this.sliderScrollNav.css({'transform':'translate3D( -'+ (currentOffsetLeft - this.bodyWidth + offsetWidthLi) +'px, 0, 0)'});
            } else if(currentOffsetLeft < this.bodyWidth && prevCurrent <= 0) {
                this.sliderScrollNav.css({'transform':'translate3D( 0, 0, 0)'});
            }
        }
    });

    var exercise = new Exercise();
    exercise.init();

    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        longSwipesRatio : 0.25,
        touchMoveStopPropagation : true,
        slideToClickedSlide:true,
        followFinger: false,
        slidesPerView: 'auto',
        threshold: 30,
        noSwiping : true,
        noSwipingClass : 'stop-swiping',
        centeredSlides: true,
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        },
        onTransitionEnd: function(swiper){
            index = swiper.activeIndex;
        },
        onSlidePrevEnd: function(swiper) {
            var prevIndex = swiper.activeIndex;
            exercise.relevanceSliderNavPrev(prevIndex);
        },
        onSlideNextEnd: function(swiper) {
            var nextIndex = swiper.activeIndex;
            exercise.relevanceSliderNavNext(nextIndex);
        }
    });
    myScroll = new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
});
