define('drag', [], function(require, exports, module) {
	var drag = {
		draged: null,
		start: function(ev) {
			var ev = ev || window.event,
				target = ev.target ? ev.target : ev.srcElement;
			this.draged = target;
			$(target).css({'opactiy':'0.5'});
			var isSelect = $(target).parent('li').attr('data-select'),
				hasScore = $(target).parent('li').attr('data-score');;
			if(isSelect || hasScore){
				$(target).parent('li').removeAttr('data-select data-score');
			}
			ev.dataTransfer.setData('color', $(target).data('color'));
		},
		enter: function(e) {
			var e = e || window.event,
				target = e.target ? e.target : e.srcElement;
			$(target).addClass('current');
		},
		exit: function(e) {
			var e = e || window.event,
				target = e.target ? e.target : e.srcElement;
			$(target).removeClass('current')
		},
		drop: function(e) {
			var e = e || window.event,
				target = e.target ? e.target : e.srcElement,
				targetNodeName = target.nodeName.toLowerCase(),	//目标元素节点名称
				targetParentClass = target.parentNode.parentNode.className,	//目标元素祖父节点className
				targetParentNodeName = target.parentNode.parentNode.nodeName.toLowerCase(),	//目标元素祖父节点名称
				dragedColor = e.dataTransfer.getData('color'),	//获取start阶段保存的颜色
				targetColor = $(target).attr('data-color');
				
			if(targetNodeName == 'li' && (targetParentClass == 'answer-wrap' || targetParentClass == 'noselect' || targetParentClass == 'drag' || targetParentClass == 'option-wrap')){
				if(dragedColor == targetColor) {
					$(target).attr({'data-score':5, 'data-select':'true'});
					console.log(true);
				}else{
					$(target).attr({'data-select':'true'});
					console.log(false);
				}


				target.appendChild(this.draged);
				$(target).addClass('default-status');
			}
			//
			var dragedParentNode = this.draged.parentNode;	//保存上次拖拽元素的父节点
			var targetParentNode = target.parentNode.parentNode;	//目标元素祖父节点
			if(targetParentNodeName == 'li') {
				var targetColor = $(targetParentNode).attr('data-color'),	//目标元素祖父节点的颜色
					lastColor = $(target.parentNode).attr('data-color'),	//需要交换目标元素父节点颜色
					initColor = $(this.draged.parentNode).attr('data-color');		//拖拽元素节点颜色
				console.log('被拖拽元素节点初始化颜色========>%s,目标元素祖父节点颜色===========>%s,保存的颜色=======>%s,需要被交换目标元素父节点颜色lastColor======>%s',initColor,targetColor,dragedColor,lastColor);
				if (dragedColor == targetColor) {
					$(targetParentNode).attr({'data-score':5, 'data-select':'true'});
					if( initColor == lastColor){
						$(dragedParentNode).attr({'data-score':5, 'data-select':'true'});
					}
				} else {
					$(targetParentNode).removeAttr('data-score');
					$(dragedParentNode).removeAttr('data-score');
				}
				targetParentNode.removeChild(target.parentNode)
				targetParentNode.appendChild(this.draged);
				dragedParentNode.appendChild(target.parentNode);
			}
		}
	}
	return drag;
})