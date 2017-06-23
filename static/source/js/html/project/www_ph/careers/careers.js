$(function(){
	var first_banner_num=0;
	var first_banner_lens=$(".banner>ol>li").length;
	//topbar_hover
	new hover({
		el:".twinkle_line",
		h_el:".bar_list>ul",
		currentClass:"current",
		current_page:"careers"
	});
	//footer_hover
	new hover({
		el:".f_twinkle_line",
		h_el:".notice>ul",
		mouseout:"dis",
		current_page:"teach"
	});
	// new slide({
	// 	slideEles:".banner>ul",
	// 	slideType:"fade",
	// 	callback:function(){
	// 			first_banner_num++;
	// 			if(first_banner_num>(first_banner_lens-1)){
	// 				first_banner_num=0
	// 			};
	// 			$(".banner>ol>li").removeClass("current");
	// 			$(".banner>ol>li").eq(first_banner_num).addClass("current");

	// 		}
	// });
	//收缩展开
	$(".m_caption").toggle(function(){
			$(this).siblings(".m_paragraph").slideDown();
			$(this).find("i").removeClass("m_gt").addClass("m_low");	
			$(this).addClass("m_caption_after");
	},function(){
		  	$(this).siblings(".m_paragraph").slideUp();
			$(this).find("i").removeClass("m_low").addClass("m_gt");	
			$(this).removeClass("m_caption_after");
	});
	$(".m_caption").hover(function(){
      $(this).toggleClass("m_captionHover");
  });
	//楼层动画触发
	$(window).on("scroll",function(){
		var distance=$(this).scrollTop()+500;
		var f2_pos=$(".floor_2").position().top;
		var f6_pos=$(".floor_6").position().top;
		var animated={
			f2:false,
			f5:false
		}
		if(distance>=f2_pos&&!animated.f2){
			$(".floor_2>ul").addClass("list_move");
			$(".m_arrowLeft").addClass("arrowLeft");
			$(".m_arrowRight").addClass("arrowRight");
			animated.f2=true;
		}
		if(distance>=f6_pos&&!animated.f5){
			$(".floor_6>ul").addClass("move_list");
			animated.f6=true;
		}
	});
});