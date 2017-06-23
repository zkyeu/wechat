/**
 *
 * @authors wuhao (wuhao@51talk.com)
 * @date    2016-11-24 12:10:30
 * @version 1.0.0
 */
define("index/index",['common'],function(require,exports,module){
    var common=require("common");
	if($(".index-m1")[0]){
			var index_m1 = $(".index-m1 p").offset().top - $(window).height();
		}

		if($(".index-m3")[0]){
			var index_m3 = $(".index-m3 p").offset().top - $(window).height();
		}
		if($(".study-step")[0]){
			var study_step = $(".study-step").offset().top - $(window).height();
		}
		if($(".index-m7")[0]){
			var index_m7 = $(".index-m7 .list").offset().top - $(window).height();
		}
		if($(".m-partner .list")[0]){
			var m_partner = $(".m-partner .list").offset().top - $(window).height();
		}
		if($(".m-medium .list")[0]){
			var m_medium = $(".m-medium .list").eq(0).offset().top - $(window).height();
		}

		var topTemp = $("body").scrollTop();
		if(topTemp>index_m1){
			$(".index-m1 ul").addClass("animated");
			$(".index-m1 li").addClass("animated");
		}
		$(window).scroll(function(e){
			var top = $(window).scrollTop();
			if(top>index_m1){
				$(".index-m1 ul").addClass("animated");
				$(".index-m1 li").addClass("animated");
			}
			if(top>index_m3){
				$(".index-m3 ul").addClass("animated");
				$(".index-m3 li").addClass("animated");
			}

			if(top>study_step){
				$(".study-step ul").addClass("animated");
				$(".study-step li").addClass("animated");
			}
			if(top>index_m7){
				$(".index-m7 ul").addClass("animated");
				$(".index-m7 li").addClass("animated");
			}
			if(top> m_partner){
				$(".m-partner ul").addClass("animated");
				$(".m-partner img").addClass("animated");
			}
			if(top> m_medium){
				$(".m-medium ul").addClass("animated");
				$(".m-medium img").addClass("animated");
			}
		})
		// layer
		$(".layer-popup .delete").click(function(){
			$(".layer-popup").hide();
		});
});
