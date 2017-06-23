define(function(require,exports,module){
	//顶部显示微信、微博相关信息
	$('.jsMore').hover(function(){
		$(this).find('.jsUl').toggle();
	});
	//同步美国小学教师
	$('.teacher-wrap li').hover(function(){
		var _self = $(this),
			index = _self.index();
		_self.addClass('hover').siblings().removeClass('hover');
		$('.teacher-wrap .base').eq(index).show().siblings().hide();
	})
	//课程优势hover效果
	$('.adv-wrap li').hover(function(){
		var _self = $(this);
		_self.addClass('hover').siblings().removeClass('hover');
	});
	//轮播图
	//接收三个参数，分别是容器的宽度、要移动的dom元素和选中状态元素
	function autoSlider(w, slider, current){
		var timer = null;
		var sliderWidth = w.width(),
			childElemLen = slider.find('li').length,
			index = 0;
		function begin(){
			clearInterval(timer);
			timer = setInterval(function() {
				sliderFn("next")
			},3000);
		};
		function sliderFn(i){
			if(typeof i == 'number'){
				index = i;
			}else{
				index++;
			}
			if(index >= childElemLen) {
				index = 0;
			}
			slider.find('li').eq(index).fadeIn().siblings().fadeOut();
			current.eq(index).addClass('current').siblings().removeClass('current');
		}
		current.on('click',function(){
			var curIndex = $(this).index();
			console.log(index);
			sliderFn(curIndex)
		});
		begin()
	};
	//全程同步美国小学轮播图
	var syncWidth = $('.sync .slider'),
		syncSlider = $('.sync .slider-wrap'),
		dot = $('.sync .point > a');
	autoSlider(syncWidth, syncSlider, dot);
	//同步美国小学教材轮播图
	var course = $('.sync-textbook .img-lst'),
		courseSlider = $('.sync-textbook .slider-wrap'),
		current = $('.sync-textbook .point > a');
	autoSlider(course, courseSlider, current);
})