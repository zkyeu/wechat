function video(opt){
	this.opts={
		click_ele:"",
		video_src:"",
		style:{
			width:300,
			height:300,
			top:""
		},
		parent_el:""
	};
	$.extend(this.opts,opt);
	this.c_dom=function(){
		var dom="";
		var _this=this;
		dom+='<div class="videos" style="position:absolute;left:50%;top:'+(this.opts.style.top?(this.opts.style.top+"px"):("100px"))+';transform:translateX(-50%)"><span class="close_video_btn" style="position:absolute;right:40px;top:5px;width:40px;height:40px;cursor:pointer;" action-type="close_pop"></span>\
				<iframe width='+this.opts.style.width+' height='+this.opts.style.height+' src='+this.opts.video_src+' frameborder="0" allowfullscreen></iframe>\
		</div>';
		if(this.opts.parent_el){
			$(_this.opts.parent_el).append(dom);
		}else{
			$("body").append(dom);
		}
	}
	this.close_pop=function(){
		$("span[action-type=close_pop]").on("click",function(){
			$(this).parent().remove();
		})
	};
	this.init=function(){
		this.click();
	}
	this.click=function(){
		var _this=this;
		$(this.opts.click_ele).on("click",function(){
			_this.c_dom();
			_this.close_pop();
		})
	}
	this.init();
}