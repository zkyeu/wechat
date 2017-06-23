define("acsoundPlay",["swfobject"],function(require,exports,module){
	require("swfobject");
	
	var
	acsoundPlay = new function(){
		var _ = this;

		_.initFlag = false;

		_.getSwf = (function(href){
			var html = [],
				swfHref = $("[swfHref]").attr("swfHref") || "/js/html/project/b2s/b2splay.swf";
				swfHref += "?v="+(new Date).getTime();
			html.push('<object type="application/x-shockwave-flash" id="acplay" name="mp3main" align="middle" data="'+ swfHref + '" width="1px" height="1px">');
		    html.push('<param name="disState" value="0">');
		    html.push('<param name="movie" value="'+ swfHref + '"/>');
		    html.push('<param name="quality" value="high">');
		    html.push('<param name="bgcolor" value="#ffffff">');
		    html.push('<param name="allowscriptaccess" value="sameDomain">');
		    html.push('<param name="allowfullscreen" value="false">');
		    html.push('<param name="wmode" value="transparent">');
		    html.push('</object>');
			_.$swf = $(html.join("")).css({
				position:"absolute",
				zIndex:-1
			});

			_.$swf.appendTo("body");
			
		})()

		_.playInit = function(options){
			var defaults = {
				href : "",
				playTag : null,
				startFn : Function,
				stopFn : Function,
				endFn : Function
			},
			o = $.extend({},defaults,options);
			if(!_.initFlag) _.getGlobal(o.endFn),_.initFlag=true;
			o.playTag ? (_.playSound(o.href),o.startFn()) : (_.stopSound(),o.endFn());
		}


		_.playSound = function(href){
			try{
				_.$swf[0].playSound(href,playCurrentTime)
			}catch(e){}
		}

		_.stopSound = function(){
			try{
			_.$swf[0].stopSound();
			}catch(e){}
		}

		_.getGlobal = function(callback){
			$.extend(window,{
				playCurrentTime : 0,
				onSoundPaused : function(currentTime){
					playCurrentTime = currentTime;
				},
				onSoundPlayEnd : function(){
					playCurrentTime = 0;
					(typeof(callback) == "function") && callback();
				}
			});
		}

	}

	module.exports = acsoundPlay;

});