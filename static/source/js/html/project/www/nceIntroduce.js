define("nceIntroduce",["index_old"],function(require,exports,module){
	require("index_old");
	var nceIntroduceFn = function(){
		this.lArrowBtn = $('#lArrowBtn');
		this.rArrowBtn = $('#rArrowBtn');
		this.classImg = $('#classImg').find('div');
		this.imgNum = $('#classImg').find('div').size();
		this.classIcon = $('#classIcon').find('span');
		this.iNow = 0;
		this._event();
		this.startFn();
	};
	nceIntroduceFn.prototype = {
		_event:function(){
			var that = this;
			this.rArrowBtn.on('click',function(){
				that.slide('next');
			});
			this.lArrowBtn.on('click',function(){
				that.slide('prev');
			});
			this.classIcon.on('click',function(){
				var index=$(this).index();
				if(that.iNow == index) return;
				that.slide(index);

			});
		},
		slide:function(type){
			var that = this;
			if(this.classImg.eq(this.iNow).is(":animated")) return;
			this.classImg.eq(this.iNow).css({"z-index":0}).animate({"opacity":0},200);
			if(type == 'next'){
				this.iNow++;
			}else if(type == 'prev'){
				this.iNow--;
			}else{
				this.iNow = type;
			}
			if(this.iNow < 0){
				this.iNow = this.imgNum-1;
			}else if(this.iNow == this.imgNum){
				this.iNow = 0;
			}
			this.classImg.eq(this.iNow).css({"z-index":1}).animate({"opacity":1},200);
			this.pointerFn();
			this.startFn();
			

		},
		startFn:function(){
			var that = this;
			clearInterval(this.timer);
			if(this.imgNum<=1) return;
			this.timer = setInterval(function(){
				that.slide('next');
			},6000);
		},
		pointerFn:function(){
			 this.classIcon.removeClass("current-i").eq(this.iNow).addClass("current-i");
		}


	};
	new nceIntroduceFn();
});