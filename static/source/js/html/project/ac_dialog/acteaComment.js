define("acteaComment",["utility"],function(require,exports,module){
	require("utility");
	;(function(){
		$.fn.comment = function(options){
			var defaults = {
				enterCb : null,
				selectCb : null,
				leaveCb : null
			},
			o = $.extend({}, defaults ,options);
			var $v = $(this),
				$li = $v.find("li"),
				$obj = null,
				enterCb = o.enterCb,
				selectCb = o.selectCb,
				leaveCb = o.leaveCb;
			$v.on({
				mouseenter : function(){
					var $self = $(this),
						$$li = $self.closest("li"),
						$index = $$li.index();
					$$li.removeClass("li-act li-select li-sel").addClass("li-active").prevAll().removeClass("li-select li-sel li-active").addClass("li-act").end().nextAll().removeClass("li-act li-active li-select li-sel");
					(typeof(enterCb) == "function") && enterCb($self,$index);
				},
				click : function(){
					var $self = $(this),
						$$li = $self.closest("li"),
						$index = $$li.index();
					if($$li.hasClass("li-select")) return;
					if(!!$obj) $obj.removeClass("li-select");
					$$li.addClass("li-select").prevAll().addClass("li-sel").end().nextAll().removeClass("li-sel");
					$obj = $$li;
					$v.attr("comment",$index);
					(typeof(selectCb) == "function") && selectCb($self);
				}
			},"i").on("mouseleave",function(){
				if(!!$obj) $obj.addClass("li-select").prevAll().addClass("li-sel").end().nextAll().removeClass("li-sel");
				$(this).find("li").removeClass("li-act li-active");
				(typeof(leaveCb) == "function") && leaveCb();
			});

			return $v;		
		}
	})();
	
	$(".comment-wrap").each(function(i,v){
		$(v).comment({
			enterCb:function($self,$index){
				var $des = $self.closest(".comment-wrap").siblings(".comment-des");
				$des.find("li").eq($index).show().siblings().hide();
				$des.slideDown();

				$self.closest(".comment-li").siblings(".comment-li").find(".comment-des").slideUp();
			}
		});
	});

	// $(".comment-multi,.ac-popup-type2").acScroll();
});