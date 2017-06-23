$(function(){
	//topbar_hover
	new hover({
		el:".twinkle_line",
		h_el:".bar_list>ul",
		current_page:"news"
	});
	//footer_hover
	new hover({
		el:".f_twinkle_line",
		h_el:".notice>ul",
		mouseout:"dis",
		current_page:"teach"
	});
})
 