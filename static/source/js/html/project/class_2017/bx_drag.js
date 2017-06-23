define('bx_drag', [], function(require, exports, module) {
	var bx_common = require('bx_common');
	var dragNumber = 0;
	var drag = {
		imgPic: null,
		dragColor: null,
		selectstart: function(e) {
			return;
		},
		start: function(e) {
			var e = e || window.event;
			//$(target).addClass('current');
			//console.log("======start=====");
			//操作提示处理
			$('#j_tip_drag').addClass('hide').remove();
			// jumpFlag = 1;
			// clearInterval(tipDragTimer);
			//开始拖动
			var target = e.target;
			$(target).parent().attr("dragNumber", dragNumber++);
			//debugger;
			//console.log(target.nodeName.toLowerCase());

			if (!target.nodeName.toLowerCase() == "div" && !$(target).hasClass("dragTarget")) {
				return;
			}
			//alert(222);
			setTimeout(function() {
				target.classList.add('outwidow');
			});
			//$(e.target).hide();
			//	debugger;
			drag.imgPic = target;
			/*	if(target.nodeName.toLowerCase=="li"){
					console.log(target.nodeName);
					return;
				}*/

			///debugger;

			if ($(target).parents('.pic-box').length != 0) {
				$(target).parent("li.pic").css({
					'z-index': 9
				}).siblings("li.pic").css({
					'z-index': 1
				});
				$(target).parent('li.pic').removeAttr('data-select');
			}

			//转成原生对象
			//e.originalEvent.dataTransfer.setData('color', $(target).data('color'));
			try {
				e.dataTransfer.setData('color', $(target).attr('data-color'));
			} catch (ev) {
				e.dataTransfer.setData('Text', target.getAttribute('data-color'));
			}
			drag.dragColor = $(target).data('color');

		},
		end: function(e) {
			var e = e || window.event;
			//e.preventDefault();
			//console.log("end");
			$(drag.imgPic).removeClass("outwidow");
			e.preventDefault();
			e.cancelBubble = true;
		},
		enter: function(e) {
			var e = e || window.event;
			//$(target).addClass('current');
			//console.log("======enter=====");
			e.preventDefault();
			e.cancelBubble = true;
		},
		leave: function(e) {
			//$(drag.imgPic).removeClass("outwidow");
			e.preventDefault();
			//console.log("not target");
		},
		over: function(e) {
			//console.log("======over=====");
			var e = e || window.event,
				target = e.target ? e.target : e.srcElement;
			e.preventDefault();
			e.cancelBubble = true;
		},
		drop: function(e) {
			//console.log("======drop=====");
			//e.preventDefault();
			//debugger;
			var target = e.target,
				targetNodeName = target.nodeName.toLowerCase(),
				dragedColor = drag.dragColor;
			targetColor = $(target).attr('data-color');
			//debugger;
			//var dddd = e.dataTransfer.getData('Text') || e.dataTransfer.getData('color')	;
			var j_result_box = $("#j_result_box");
			var j_pic_list = $("#j_pic_list");
			var j_list = $("#j_result_box .list");
			var j_pic = $("#j_result_box li.pic");
			var j_jigsaw = $("#j_result_box .jigsaw");

			var j_tip_zan = $('#j_tip_zan');
			var j_tip_wrong = $('#j_tip_wrong');
			var j_audio_word = $('#j_audio_word');

			var dragParentId = $(drag.imgPic).parent().parent().parent().attr('id');
			var targetParentId = $(target).parent().parent().attr("id");
			if (targetNodeName == 'li' && $(target).hasClass("pic") && drag.imgPic.nodeName.toLowerCase() == "div" && $(drag.imgPic).hasClass("dragTarget")) {

				if (dragParentId == targetParentId && $(drag.imgPic).parent().attr("dragNumber") != $(target).attr("dragNumber") && dragParentId != "j_result_box") {
					$(drag.imgPic).parent().hide();
				} else if (dragParentId != targetParentId && dragParentId != "j_result_box") {
					$(drag.imgPic).parent().hide();
				}

				$(drag.imgPic).remove();
				$(target).html($(drag.imgPic));
				//console.log("..................");

			} else if (targetNodeName == "div" && $(target).hasClass("dragTarget") && drag.imgPic.nodeName.toLowerCase() == "div" && $(drag.imgPic).hasClass("dragTarget")) {
				var listPic = false,
					resultList = false;
				if ($(target).parent().parent().parent().attr("id") == "j_pic_list") {
					listPic = true;
				} else if ($(target).parent().parent().parent().attr("id") == "j_result_box") {
					resultList = true;
				}

				if (resultList) {
					var toEle = $(drag.imgPic).parent();
					var childEle = $(target);
					$(target).parent().html($(drag.imgPic));
					toEle.html(childEle);
				} else if (listPic) {
					for (var i = 0; i < $(target).parent().parent().find(".pic").length; i++) {
						var hasEle = $(target).parent().parent().find(".pic").eq(i).html().trim();
						if (!hasEle) {
							if (dragParentId != "j_result_box") {
								$(drag.imgPic).parent().hide();
							}
							$(target).parent().parent().find(".pic").eq(i).html($(drag.imgPic)).show();
							break;
						}
					}

				}

			} else if ((targetNodeName == "div" && $(target).hasClass("pic-box")) && drag.imgPic.nodeName.toLowerCase() == "div" && $(drag.imgPic).hasClass("dragTarget") || (targetNodeName == "ul" && $(target).hasClass("leftList"))) {
				for (var i = 0; i < $(".leftList .pic").length; i++) {
					var hasEle = $(target).parent().parent().find(".pic").eq(i).html().trim();
					if (!hasEle) {
						if (dragParentId != "j_result_box") {
							$(drag.imgPic).parent().hide();
						}
						$(target).parent().parent().find(".pic").eq(i).html($(drag.imgPic)).show();
						break;
					}
				}
			} else {
				return false;
			}

			//计算正确拼图
			j_pic.each(function(i) {
				if ($(this).attr('data-color') == $(this).find('.dragTarget').attr('data-color')) {
					$(this).attr({
						'data-select': '1'
					});
				} else {
					$(this).attr({
						'data-select': '0'
					});
				}
			});

			//拼图计算
			//if (targetParentClass == 'result-box') {
			var correctItem = $('#j_result_box li.pic[data-select=1]');
			var resultItem = $('#j_result_box .dragTarget[data-color]');
			j_tip_zan.addClass('hide');
			j_tip_wrong.addClass('hide');
			//console.log(resultItem.length === 3);
			if (resultItem.length === 3 && ($(target).parent().parent().parent().attr("id") != "j_result_box" || $(target).parent().parent().attr("id") != "j_result_box")) {
				if (correctItem.length === 3) {
					//成功
					j_tip_zan.removeClass('hide');
					j_result_box.attr("data-flag", '1');
						bx_common.playAudio2(coverPlayer, j_result_box.attr('media-yes'), function() {
						}, function() {
							$(".word-txt").removeClass("hide");
							j_pic_list.addClass("hide");
							j_result_box.addClass("r-success");
							j_list.addClass("hide");
							j_jigsaw.removeClass('hide');
							j_tip_zan.addClass('hide');
							setTimeout(function() {
								j_audio_word.trigger('click', {
									correct: 'ok'
								});
							}, 500);
						});
				} else {
					if ((targetNodeName == "div" && $(target).hasClass("pic-box")) && drag.imgPic.nodeName.toLowerCase() == "div" && $(drag.imgPic).hasClass("dragTarget") || (targetNodeName == "ul" && $(target).hasClass("leftList"))) {
						return;
					}
					bx_common.playAudio2(coverPlayer, j_result_box.attr('media-no'), function() {
						j_tip_wrong.removeClass('hide');
					}, function() {
						j_tip_wrong.addClass('hide');
					});
				}
			} else {

			}
			//}

		}
	}
	module.exports = drag;
})