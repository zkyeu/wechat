$(function(){
	var first_banner_num=0;
	var first_banner_lens=$(".banner>ol>li").length;
	//topbar_hover
	new hover({
		el:".twinkle_line",
		h_el:".bar_list>ul",
		currentClass:"current",
		current_page:"teach"
	});
	//footer_hover
	new hover({
		el:".f_twinkle_line",
		h_el:".notice>ul",
		mouseout:"dis",
		currentClass:"current",
		current_page:"teach"
	});
	if(first_banner_lens>1){
		//顶部轮播
		new slide({
			slideEles:".banner>ul",
			slideType:"fade",
			callback:function(){
				first_banner_num++;
				if(first_banner_num>(first_banner_lens-1)){
					first_banner_num=0
				};
				$(".banner>ol>li").removeClass("current");
				$(".banner>ol>li").eq(first_banner_num).addClass("current");

			}
		});	
	}
	
	//中部轮播
	new slide({
		slideEles:".f4_banner>ul",
		nextBtn:"a.next",
		preBtn:"a.pre",
		slideType:"slide",
		slideAuto:true
	});
	$(window).on("scroll",function(){
		var distance=$(this).scrollTop()+200;
		var f2_pos=$(".floor_2").position().top;
		var f5_pos=$(".floor_5").position().top;
		var animated={
			f2:false,
			f5:false
		}
		if(distance>=f2_pos&&!animated.f2){
			$(".floor_2>dd").addClass("animated");
			animated.f2=true;
		}
		if(distance>=f5_pos&&!animated.f5){
			$(".floor_5>dl").addClass("animated");
			animated.f5=true;
		}
	})
})