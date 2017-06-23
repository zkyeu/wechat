$(function(){
	//topbar_hover
	new hover({
		el:".twinkle_line",
		h_el:".bar_list>ul",
		currentClass:"current",
		current_page:"about"
	});
	//footer_hover
	new hover({
		el:".f_twinkle_line",
		h_el:".notice>ul",
		mouseout:"dis",
		current_page:"teach"
	});

	//视频播放
	new video({
		click_ele:".play_video_au",
		video_src:"https://www.youtube.com/embed/lOVU03FXw9c?autoplay=1",
		style:{
			width:1280,
			height:860,
			top:97
		}
	})
	/*facebook video
	new video({
		click_ele:".play_video_au",
		video_src:"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F51talk%2Fvideos%2F757538197728100%2F&show_text=0&autoplay=1",
		style:{
			width:1280,
			height:860,
			top:97
		}
	})*/
})