define(function(require, exports, module) {
	//翻译
	$('.translate').on('click', function() {
		$(this).addClass('loading');
		var _self = $(this),
			url = $(this).data('url'),
			appoint_id = $(this).data('appointid'),
			tag_id = $(this).data('tagid');
		$.ajax({
			type :'POST',
			url :'/ajax/translate',
			dataType :'json',
			data: {
				appoint_id : appoint_id,
				tag_id : tag_id,
				user_tag : 'na_trial'
			},
			success: function(res) {
				_self.removeClass('loading');
				if(res.status == 0) {
					$('.remark .error').show().text('翻译失败');
				}
				if(res.status == 1) {
					_self.hide();
					$('.tips').show();
					$('.remark .result').text(res.data.result);
				}
			},
			error: function() {
				_self.removeClass('loading');
				console.log('请求发生错误');
				$('.remark .error').show().text('翻译失败');
			}
		})
	})
	//进入到视图区域 do something;
	var resultBox = $('.result').offset().top;
	var boxOffsetTop = $('.analyze').offset().top;
	$(window).on('scroll', function() {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
			clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		if(scrollTop + clientHeight >= (boxOffsetTop + 350)) {
			$('.analyze .progress').addClass('running');
		}
		if(scrollTop + clientHeight >= (resultBox + 150)) {
			$('.level-wrap .icon').addClass('running');
		}
	});
	//体验课课堂知识效果
	$('.knowledge .score').on('mouseenter',function() {
		$(this).addClass('rotate').siblings().removeClass('rotate');
	})
	$('.knowledge .score').on('mouseout',function() {
		$(this).removeClass('rotate');
	})
	var start = 0,
		timer,
		len = $('#tab li').length;
	//tab切换
	$('#tab li').on('click', function() {
		clearInterval(timer);
		var _self = $(this),
			index = _self.index();
		_self.addClass('current').siblings().removeClass('current');
		$('.content .text').eq(index).show().siblings('.text').hide();
	});
	function tabSwitch() {
		clearInterval(timer)
		timer = setInterval(function() {
			$('#tab li').eq(start).addClass('current').siblings().removeClass('current');
			$('.content .text').eq(start).show().siblings('.text').hide();
			start ++;
			if(start >= len) {
				start = 0;
				return false
			}
		}, 3000)
	}
	tabSwitch()
	$('.description').hover(function() {
		clearInterval(timer)
	},function() {
		tabSwitch();
	})
})