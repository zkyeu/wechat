define(function(require,exports,module){
    
    	var autoFn = function(callback){
    		this.topBox = $('#topBox');
    		this.bottomBox = $('#bottomBox');
            this.mainBox = $('#mainBox');
            this.callback = callback;
    		this._event();
            this._callback();
    	};
    	autoFn.prototype = {
    		_event:function(){
                
                this.topH = this.topBox.length > 0 ? this.topBox.height() : 0;
                this.bottomH = this.bottomBox.length > 0 ? this.bottomBox.height() : 0;
                this.contentH = $(window).height()-this.topH-this.bottomH-10;
                this.mainBox.css('min-height',this.contentH);
    		},
            _callback:function(){
                if(typeof(this.callback) == "function") this.callback();
            }
    	};

    
    return autoFn;
});