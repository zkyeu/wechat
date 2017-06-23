function hover(options){
	/*edit by sxc 2017.12.30*/
	this.opts={
		el:"",
		h_el:"",//滑动元素的父级;结构目前写死;结构应该为ul>li，父级应该为ul
		current_page:"teach",
		mouseout:"",
		seconds:200,
		currentClass:"",//点击切换的class
		click_opt:false,//初始化点击改变index的开关
		complicate:""//点击的时候出现特殊情况的处理变量，除作者自己其他人几乎用不到
	};
	$.extend(this.opts,options);
	if(!this.opts.el||!this.opts.h_el)return;

	this.dis_arr=[];
	this.width_arr=[];
	this.init_index=0;
	this.set_idx=function(){
		var _this=this;
		switch(this.opts.current_page){
			case "teach":
				this.init_index=0;
			break;
			case "careers":
				this.init_index=1;
			break;
			case "test":
				this.init_index=2;
			break;
			case "news":
				this.init_index=3;
			break;
			case "about":
				this.init_index=4;
			break;
		};
		this.init_pos(_this.init_index);
	};
	this.init_pos=function(idx){
		var opts=this.opts,
		dis=0,
		index=idx+1,
		_this=this;
		for(var i=0;i<index;i++){//累加距离
			dis+=this.dis_arr[i];
		};
		$(opts.el).css({//初始化位置
			"left":dis,
			"width":_this.width_arr[idx]+'px'
		},opts.seconds);

		$(opts.h_el).find('li').eq(idx).addClass(opts.currentClass);

		this.show(true);
	}
	this.move_dis_arr=function(){//获取移动的距离数组
		var arr=[],
		opt=this.opts,
		_this=this;
		this.dis_arr.push(0);
		$(opt.h_el).find("li").each(function(i){
			_this.dis_arr.push($(this).width()+parseInt($(this).css("paddingRight")));
		});
		this.dis_arr.splice(this.dis_arr.length-1);
	}
	this.get_width_arr=function(){//获取元素不同宽度的数组
		var arr=[],
		opt=this.opts,
		_this=this;
		$(opt.h_el).find("li").each(function(i){
			_this.width_arr.push($(this).width());
		})
	}
	this.show=function(n){
		var opts=this.opts;
		if(n){
			$(opts.el).show();
		}else{
			$(opts.el).hide();
		}
	};
	this.move=function(idx){//el移动
		var opts=this.opts,
		dis=0,
		index=idx+1,
		_this=this;
		for(var i=0;i<index;i++){//累加距离
			dis+=this.dis_arr[i];
		}
		
		$(opts.el).animate({//移动
			"left":dis,
			"width":_this.width_arr[idx]+'px'
		},opts.seconds);

	};
	this.mouse_over=function(){
		var opts=this.opts,
		_this=this;
		if(opts.mouseout=="dis")this.show(false);
		$(opts.h_el).find("li").on("mouseover",function(){
			_this.show(true);
			$(opts.el).stop();
			var idx=$(this).index();
			_this.move(idx);
		})
	};
	this.mouse_out=function(idx){
		var opts=this.opts,
		_this=this;
		$(opts.h_el).find("li").on("mouseout",function(){
			var index=_this.init_index;
			if(opts.mouseout!="dis"){
				$(opts.el).stop();
				_this.move(index);
			}else{
				_this.show(false);
			}
			
		})
	};
	this.click=function(){
		var opts=this.opts,
		_this=this;
		if(!opts.click_opt)return;
		$(opts.h_el).find("li").on('click',function(){
			if(opts.complicate&&opts.complicate==$(this).index())return;
			_this.init_index=$(this).index();
		});
	}
	this.init=function(){
		this.move_dis_arr();
		this.get_width_arr();
		this.set_idx();
		this.mouse_over();
		this.mouse_out();
		this.click();
	};
	this.init();
}