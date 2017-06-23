function slide(options){
	/*edit by sxc 2017.12.30*/
	/*轮播图分为两种类型，一种为淡入淡出，暂不支持点击按钮切换，自动轮播，因此也不需要preBtn和nextBtn,slideType类型为fade;另一种为无缝滚动切换，支持按钮,slideType为slide*/
	/*淡入淡出标准的html结构应为ul>li>img;ul与一个li同宽高，li绝对定位，且按照先后顺序出现层级（z-index数字越大，在最下层）*/
	this.opts={
		preBtn:"",//上一张按钮
		nextBtn:"",//下一张按钮
		slideEles:"",//轮播元素
		slideType:"",//轮播图类型
		duration:3000,//渐变切换时间
		slideAuto:false,
		callback:""
	};
	this.init_index=0;
	this.opts.init_now=1;
	$.extend(this.opts,options);
	this.oneByOne=function(i){//淡入淡出切换
		var opts=this.opts,
		ele=$(opts.slideEles).find("li"),
		elesLeth=ele.length,
		_this=this;
		if(elesLeth<0||elesLeth==undefined)return;
		setTimeout(function(){
			ele.eq(i).fadeOut(500,function(){
				if(_this.opts.callback)_this.opts.callback();
				$(this).hide();
				i++;
				if(i==elesLeth){
					i=0;
					ele.show();
					ele.fadeIn(100);
				};
				_this.oneByOne(i);
			})
		},opts.duration);
	};
	this.slide=function(banWidth,liLen,forward){
		if(this.size_once_click)return;//限制点击一次完成后才可点击
		this.size_once_click=!this.size_once_click;
		var els=this.opts.slideEles;
 		var _this=this;
        if(forward=='next'){
            _this.opts.init_now++;
            $(els).animate({'left':-banWidth*_this.opts.init_now},function(){
                if(_this.opts.init_now>=liLen-1){
                    _this.opts.init_now=1;
                    $(els).css('left',banWidth*(-1));
                }
                if(_this.opts.callback)_this.opts.callback();
                _this.size_once_click=false;
            })
        }else{
            _this.opts.init_now--;
            $(els).animate({'left':-banWidth*_this.opts.init_now},function(){
                if(_this.opts.init_now<=0){
                    _this.opts.init_now=liLen-2;
                    $(els).css('left',-banWidth*_this.opts.init_now);
                }
                if(_this.opts.callback)_this.opts.callback();
                _this.size_once_click=false;
            })
        }
	};
	this.clone=function(){
		var opts=this.opts,
		_this=this,
		$list=$(opts.slideEles),
		$firstLi = $list.children().eq(0),
	    $lastLi = $list.children().last();
	    $list.append($firstLi.clone());
	    $list.prepend($lastLi.clone());
	    this.opts.liWidth = $firstLi.outerWidth();
	    this.opts.liLen=$list.find("li").length;
	    $list.css({
	        width: _this.opts.liLen*_this.opts.liWidth,
	        left: _this.opts.liWidth*(-1)
	    })
	};
	this.slide_init=function(){
		this.clone();
		var opts=this.opts,
		_this=this;
		if(!opts.preBtn||!opts.nextBtn)return;
		$(opts.preBtn).on("click",function(){
			_this.slide(_this.opts.liWidth,_this.opts.liLen,"pre")
		});
		$(opts.nextBtn).on("click",function(){
			_this.slide(_this.opts.liWidth,_this.opts.liLen,"next")
		});

		if(opts.slideAuto){
			this.timer=setInterval(function(){
				_this.slide(_this.opts.liWidth,_this.opts.liLen,"next")
			},opts.duration);

			$(opts.preBtn).on("mouseover",function(){
				clearInterval(_this.timer);
			}).on("mouseout",function(){
				_this.timer=setInterval(function(){
					_this.slide(_this.opts.liWidth,_this.opts.liLen,"next")
				},opts.duration)
			});

			$(opts.nextBtn).on("mouseover",function(){
				clearInterval(_this.timer);
			}).on("mouseout",function(){
				_this.timer=setInterval(function(){
					_this.slide(_this.opts.liWidth,_this.opts.liLen,"next")
				},opts.duration)
			})
		}
	};

	this.init=function(){
		var _this=this;
		var opts=this.opts;
		switch(opts.slideType){
			case "fade":
			this.oneByOne(_this.init_index);
			break;
			case "slide":
			this.slide_init();
			break;
		}
		
	};
	this.init();
}