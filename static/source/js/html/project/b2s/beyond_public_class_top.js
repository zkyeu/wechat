define("beyond_public_class_top",[],function(require,exports,module){
(function(){
	var TabFn = function(){
		this.questionInfo = $('.question-info');
		this.playBtn = $('.play-btn');
		this.backTop = $('#backTop');
		this._event();
		this.scrollTopFn();
	}
	TabFn.prototype = {
		_event:function(){
			var that = this;
			
			
			this.questionInfo.toggle(
				function(){
					$(this).next().show();
					$(this).find('.answer-des').find('i').addClass('animate-i-s');
					$(this).find('.answer-des').find('i').removeClass('animate-i-e');
					if(that.getBrowser().IE6 == true || that.getBrowser().IE7 == true || that.getBrowser().IE8 == true || that.getBrowser().IE9 == true){
						if($(this).hasClass('question-right')){
							$(this).find('.answer-des').find('i').addClass('down-i-r');
						}else{
							$(this).find('.answer-des').find('i').addClass('down-i');
						}	
					}
					
				},
				function(){
					$(this).next().hide();
					$(this).find('.answer-des').find('i').removeClass('animate-i-s');
					$(this).find('.answer-des').find('i').addClass('animate-i-e');
					if(that.getBrowser().IE6 == true || that.getBrowser().IE7 == true || that.getBrowser().IE8 == true || that.getBrowser().IE9 == true){
						if($(this).hasClass('question-right')){
							$(this).find('.answer-des').find('i').removeClass('down-i-r');
						}else{
							$(this).find('.answer-des').find('i').removeClass('down-i');
						}
					}
				}
			);


			this.questionInfo.on('mouseover',function(){
				if($(this).hasClass('question-right')){
					$(this).addClass('question-bg-r');
				}else{
					$(this).addClass('question-bg-w');
				}
			});

			this.questionInfo.on('mouseout',function(){
				if($(this).hasClass('question-right')){
					$(this).removeClass('question-bg-r');
				}else{
					$(this).removeClass('question-bg-w');
				}
			});

			this.playBtn.on('mouseover',function(){
				that.showYellow($(this));
			});
			this.playBtn.on('mouseout',function(){
				that.showGrey($(this));
			});
			this.playBtn.on('click',function(){
				that.yinpin = $(this).attr('yinp-value');
				playSound(that.yinpin);
				$(this).unbind('mouseout');
				$('.answer-title').find('span').removeClass('yellow');
				$('.answer-title').find('span').addClass('grey');
				$(this).addClass('yellow');
			});

			$(window).on('scroll',function(){
				that.scrollTopFn();
				
			});
		},
		
		showYellow:function(dom){
			dom.removeClass('grey');
			dom.addClass('yellow');
		},

		showGrey:function(dom){
			dom.removeClass('yellow');
			dom.addClass('grey');
		},
		getBrowser : function() {
		 var browser = {};
		 var userAgent = navigator.userAgent.toLowerCase();

		 browser.IE = /msie/.test(userAgent);
		 browser.OPERA = /opera/.test(userAgent);
		 browser.MOZ = /gecko/.test(userAgent);
		 browser.IE6 = /msie 6/.test(userAgent);
		 browser.IE7 = /msie 7/.test(userAgent);
		 browser.IE8 = /msie 8/.test(userAgent);
		 browser.IE9 = browser.IE && !browser.IE6 && !browser.IE7 && !browser.IE8;
		 browser.SAFARI = /safari/.test(userAgent);
		 browser.CHROME = /chrome/.test(userAgent);
		 browser.IPHONE = /iphone os/.test(userAgent);
		 browser.MAXTHON = /maxthon/.test(userAgent);

		 return browser;
		},
		scrollTopFn:function(){
			this.windowHeight = $(window).height();
			if($(document).scrollTop() >= 200){
				this.backTop.show();
				this.backTop.css('display','block');
			}else{
				this.backTop.hide();
			}
		}
		
	};

	new TabFn();
})();






/*  swf音频播放  Start  */
function playSound(mp3_addr){
    document.getElementById('b2splay').playSound(mp3_addr,playCurrentTime);
}
function stopSound(){
    document.getElementById('b2splay').stopSound();
}
/*  swf音频播放  End  */

 var randomPlay = Math.random();
$("#mp3Box").append(
        '<object type="application/x-shockwave-flash" id="b2splay" name="mp3main" align="middle" data="/js/html/project/b2s/b2splay.swf?rnd='+randomPlay+ '" width="1px" height="1px">'+
        '<param name="disState" value="0">'+
        '<param name="movie" value="/js/html/project/b2s/b2splay.swf?rnd='+randomPlay+ '"/>'+
        '<param name="quality" value="high">'+
        '<param name="bgcolor" value="#ffffff">'+
        '<param name="allowscriptaccess" value="sameDomain">'+
        '<param name="allowfullscreen" value="false">'+
        '<param name="wmode" value="transparent">'+
        '</object>'
);

 seajs.use('/js/html/project/b2s/swfobject');


 	window["playCurrentTime"] = 0;

	window["onSoundPaused"] = function (currentTime){    //通知JS，声音已经暂停
	    playCurrentTime = currentTime;
	}

	window["onSoundPlayEnd"] = function (argv){  //通知JS声音播放完毕
		
	    playCurrentTime = 0;
	    if($('.play-btn').hasClass('yellow')){
	    	$('.play-btn').removeClass('yellow');
	    	$('.play-btn').addClass('grey');
	    }
	    
	}

});






