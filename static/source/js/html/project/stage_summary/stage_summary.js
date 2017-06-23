define(function(require){
	$(".m-list3 .m-ul01 li").hover(function(){
		var _index = $(this).index();
		var showTag = $(".hovershow>div");
		showTag.hide().eq(_index).show();
	})
	$(document).ready(function(){
        $(".m-show").mCustomScrollbar({
          theme:"light-3"
        });
       
    });
})