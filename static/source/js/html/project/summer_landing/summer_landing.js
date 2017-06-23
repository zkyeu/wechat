define(function(require,exports,module){
	$(function(){
		//顶部显示微信、微博相关信息
		$('.jsMore').hover(function(){
			$(this).find('.jsUl').show();
		},function(){
			$(this).find('.jsUl').hide();
		});
		//tab切换
		$('.summer-tabs li').on('click',function(){
			var _self = $(this);
			_self.addClass('current').siblings().removeClass('current');
			var index = _self.index();
			$('.summer-container .switch').eq(index).show().siblings().hide();
		});
		//轮播图
		var index = 0;
		function slider(dir){
			var _self = $(this),
				sliderElem = _self.siblings('.slider-con').find('ul'),
				sliderWidth = _self.siblings('.slider-con').width(),
				lens = _self.siblings('.slider-con').find('li').length,
				dotCurrent = _self.siblings('.slider-con').find('.point>a');
			if(dir === 'left'){
				index -- ;
				if(index < 0){
					index = lens - 1;
				};
				console.log(index)
				dotCurrent.eq(index).addClass('current').siblings().removeClass('current');
				sliderElem.animate({'margin-left':'+='+sliderWidth},600,'linear',function(){
					
				});
			}else if(dir === 'right'){
				index ++;
				if(index > lens - 1){
					index = 0
				}
				console.log(index)
				dotCurrent.eq(index).addClass('current').siblings().removeClass('current');
				sliderElem.animate({'margin-left':'-='+sliderWidth},600,'linear',function(){
					console.log('end');
				})
			}
		}
		//调用
		var index = 0;
		$('.show-wrap .arr-left').on('click',function(){
			slider.call(this,'left');
		});
		$('.show-wrap .arr-right').on('click',function(){
			slider.call(this,'right');
		});
	});
})