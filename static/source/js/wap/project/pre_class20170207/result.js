define(function(require, exports, module) {
	var app = {
		showMask: $('.share-mask'),
		shareBtn: $('.share .share-btn'),
		audio: document.getElementById('audio'),
		init: function() {
			var that = this;
			document.addEventListener("WeixinJSBridgeReady",function(){
					that.audio.play();
	    },false);
			this.bindEvents();
		},
		bindEvents: function() {
			this.showMask.on('click', $.proxy(this.hideGuide, this));
			this.shareBtn.on('click', $.proxy(this.showGuide, this));
		},
		showGuide: function() {
			this.showMask.show();
		},
		hideGuide: function() {
			this.showMask.hide();
		}
	}
	app.init();
})
