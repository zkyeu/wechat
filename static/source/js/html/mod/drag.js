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
		drop: function(e) {
			var e = e || window.event,
				target = e.target ? e.target : e.srcElement,
				targetNodeName = target.nodeName.toLowerCase(),	//Ŀ��Ԫ�ؽڵ�����
				targetParentClass = target.parentNode.parentNode.className,	//Ŀ��Ԫ���游�ڵ�className
				targetParentNodeName = target.parentNode.parentNode.nodeName.toLowerCase(),	//Ŀ��Ԫ���游�ڵ�����
				dragedColor = e.dataTransfer.getData('color'),	//��ȡstart�׶α�������ɫ
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
				$(target).addClass('current');
			}
			//
			var dragedParentNode = this.draged.parentNode;	//�����ϴ���קԪ�صĸ��ڵ�
			var targetParentNode = target.parentNode.parentNode;	//Ŀ��Ԫ���游�ڵ�
			if(targetParentNodeName == 'li') {
				var targetColor = $(targetParentNode).attr('data-color'),	//Ŀ��Ԫ���游�ڵ�����ɫ
					lastColor = $(target.parentNode).attr('data-color'),	//��Ҫ����Ŀ��Ԫ�ظ��ڵ���ɫ
					initColor = $(this.draged.parentNode).attr('data-color');		//��קԪ�ؽڵ���ɫ
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