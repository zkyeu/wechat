define(function(require){
	require('placeholder');
	require('formCheck');
	$("#RegForm3").formCheck();
	$("#RegForm1").formCheck();
	$(function(){
		var $advList = $('#advList');
		var $advLi = $advList.find('li');
		var $tabDivs = $('#tabDivs').children();
		var oldIndex = 0;
		$advLi.mouseover(function(){
			var index = $(this).index();
			$advLi.eq(oldIndex).find('span').removeClass('tab_color');
			$advLi.eq(oldIndex).find('i').removeClass('tabon'+oldIndex);
			$(this).children('i').addClass('tabon'+index);
			$(this).children('span').addClass('tab_color');

			$tabDivs.removeClass('tabDesc').eq(index).addClass('tabDesc')
			$('#sanjiao').removeClass('tab_sanjiao'+oldIndex).addClass('tab_sanjiao'+index);
		}).mouseout(function(){
			oldIndex = $(this).index();
		})

	});
	//遮罩及表单的显示，隐藏
	$('.listenBtn,.expriceBtn,.btn-tiyan,.orderNow_btn').click(function(){
		if($("#isowned").val()==="0"){
			$("#privilege").show();
		}else{
			$('#openWidnow').show();
		}
	    $('#mask').show();
	});
	$('#beginExp').click(function(){
		$('#promptWin').hide();
		$('#openWidnow').show();
	    $('#mask').show();
	})

	$('#mask').click(function(){
		$("#privilege").hide();
	    $('#openWidnow').hide();
	    $(this).hide();
	});
	// 点击我知道了
	$(".pri-know a").click(function(){
		$("#privilege").hide();
		$('#mask').hide();
	});
})
