/*
 * sell.js
 * author:liya;
 * email: liya@51talk.com
 * date: 2016-08-31
*/
define(function(require, exports, module) {
	var dialog = require('minidialog');
	var sellFn = (function() {
		return{
			sellAjax: function(url, data, callback) {
				$.ajax({
					url: url,
					type: 'POST',
					dataType: 'json',
					data: data,
					success:function(res) {
						callback.apply(this,arguments);
					}
				})
			}
		}
	})();
	//定义变量
	var gradeLi = $('.grade-select li'),
		helpElem = $('.help'),
		prop_grade, prop_term, prop_classtype, prop_classlevel,
		gradeStatus = false,
		termStatus = false,
		classStatus = false,
		levelStatus = false;
	var currentSelect = function (elem) {
		var _self = $(this),
			data = _self.attr('data-grade') || _self.attr('data-semester') || _self.attr('data-classes') || _self.attr('data-level');
		if(_self.hasClass('disable') || _self.hasClass('disable-gray')) return;
		_self.addClass('current').siblings().removeClass('current default');
		return data;
	};
	// 弹层操作
	var layer = {
		show: function() {
			var clientHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
			$('.dialog').css({'height':clientHeight}).show();
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		},
		hide: function() {
			$('.dialog').hide();
		}
	};
	$('.dialog .close').on('click', layer.hide);
	helpElem.on('click', layer.show);
	var clickAbleFn = function() {
		if (gradeStatus && termStatus && classStatus && levelStatus) {
			$('.sell .footer').addClass('clickable');
		}
	}
	gradeLi.on('click', function() {
		currentSelect.call(this);
		var grade = currentSelect.call(this);
		gradeStatus = true;
		prop_grade = grade;
		clickAbleFn.call(this);
	});
	$('.semester-select').delegate('li', 'click', function() {
		currentSelect.call(this);
		var semester = currentSelect.call(this);
		termStatus = true;
		prop_term = semester;
		clickAbleFn.call(this);
	});
	$('.classes-select').delegate('li', 'click', function() {
		currentSelect.call(this);
		var classes = currentSelect.call(this);
		classStatus = true;
		prop_classtype = classes;
		clickAbleFn.call(this);
	});
	$('.level-select').delegate('li', 'click', function() {
		currentSelect.call(this);
		var level = currentSelect.call(this);
		levelStatus = true;
		prop_classlevel = level;
		clickAbleFn.call(this);
	});
	//侧边栏--选择老师 交互
	var sliderMask = $('.slider-bar-mask'),
		sliderWrap = $('.slider-bar-wrap');
	$('.teacher-select .replace').on('click', function() {
		sliderMask.show();
		sliderWrap.addClass('show');
	});
	$('.slider-bar-wrap .touch-area').on('click', function() {
		sliderWrap.removeClass('show');
		setTimeout(function() {
			sliderMask.hide();
		},500);
	});
	var isCurrent = function(txt) {
		new dialog({
			html: txt,
			modal: true,
			autoHide: 1500
		});
	}
	$('.sell .footer').on('click', function() {
		if (!gradeStatus) {
			isCurrent('请选择年级');
			return false;
		}
		if (!termStatus) {
			isCurrent('请选择学期');
			return false;
		}
		if (!classStatus) {
			isCurrent('请选择班型');
			return false;
		}
		if (!levelStatus) {
			isCurrent('请选择班级层次');
			return false;
		}
		location.href = '/multi/show?prop_grade=' + prop_grade + '&prop_term=' + prop_term + '&prop_classtype='+ prop_classtype + '&prop_classlevel=' + prop_classlevel;
	});
	//定制课表交互
	var isSelect = function(select,txt) {
		if (typeof select == 'undefined') {
			new dialog({
				html: txt,
				modal: true,
				autoHide: 1500
			});
			return false;
		}
	};
	var periodLi = $('.period li'),
		timeLi = $('.time .tab li'),
		timeLst = $('.time .time-lst'),
		timeLstLi = $('.time .time-lst li'),
		recommendLi = $('.recommend li'),
		recommend = $('.recommend ul'),
		class_first_date,class_last_date,lesson_start_week,lesson_start_time;
	//获取第一页的参数
	prop_grade = $('#prop_grade').val();
	prop_term = $('#prop_term').val();
	prop_classtype = $('#prop_classtype').val();
	prop_classlevel = $('#prop_classlevel').val();
	var ajaxRes = function(res) {
		var html = '',
		 	resData = res.data;
		if(resData.length > 0) {
			for(var i = 0, len = resData.length; i < len; i++) {
				html += '<li data-goods_id='+ resData[i].id +' data-goods_price='+ resData[i].price +'>'+ resData[i].name +'</li>'
			}
			recommend.html(html);
		} else {
			recommend.text('暂无推荐班级');
			console.log('无推荐班级');
		}
	}
	var obj = new Object();
	obj.prop_grade = prop_grade;
	obj.prop_term = prop_term;
	obj.prop_classtype = prop_classtype;
	obj.prop_classlevel = prop_classlevel;
	periodLi.on('click', function() {
		var _self = $(this);
		class_first_date = _self.attr('data-class_first_date');
		class_last_date = _self.attr('data-class_last_date');
		currentSelect.call(this);
		obj.class_first_date = class_first_date;
		obj.class_last_date = class_last_date;
		obj.lesson_start_week = "";
		obj.lesson_start_time = "";
		timeLi.removeClass('current');
		timeLstLi.removeClass('current');
		sellFn.sellAjax('/multi/getAjaxShow', obj, ajaxRes);
	});
	timeLi.on('click', function() {
		var _self = $(this),
			index = _self.index();
		isSelect(class_first_date || class_last_date, '请选择上课周期');
		lesson_start_week = _self.attr('data-lesson_start_week');
		obj.lesson_start_week = lesson_start_week;
		obj.lesson_start_time = "";
		timeLstLi.removeClass('current');
		currentSelect.call(this);
		timeLst.eq(index).show().siblings('.time-lst').hide();
		sellFn.sellAjax('/multi/getAjaxShow', obj, ajaxRes);
	});
	timeLstLi.on('click', function() {
		var _self = $(this),
			index = _self.parents('.time-lst').index() - 2;
		timeLi.eq(index).addClass('current').siblings().removeClass('current');
		lesson_start_time = _self.attr('data-lesson_start_time');
		obj.lesson_start_week = $('.time .tab .current').attr('data-lesson_start_week');
		obj.lesson_start_time = lesson_start_time;
		isSelect(class_first_date || class_last_date, '请选择上课周期');
		currentSelect.call(this);
		sellFn.sellAjax('/multi/getAjaxShow', obj, ajaxRes);
	});
	$('.recommend').delegate('li', 'click', function() {
		var _self = $(this),
			id = _self.attr('data-goods_id'),
			price = _self.attr('data-goods_price');
		currentSelect.call(this);
		$('.c-footer .money').text(price + '元');
		$('.c-footer .sign a').attr('href','/SpecialClass/goToPay/'+ id);
	});
	$('.c-footer .sign a').on('click', function(e) {
		var id = $('.recommend .current').attr('data-goods_id');
		// if (!obj.class_first_date || !obj.class_last_date) {
		// 	isCurrent('请选择上课周期');
		// 	e.stopPropagation();
		// 	return false;
		// }
		// if (!obj.lesson_start_week || !obj.lesson_start_time) {
		// 	isCurrent('请选择上课时间');
		// 	e.stopPropagation();
		// 	return false;
		// }
		if (!id) {
			isCurrent('请选择推荐班级');
			e.stopPropagation();
			return false;
		}
	});
})