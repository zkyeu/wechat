define(function(require){
	require('placeholder');
	require('formCheck');
	$("#RegForm3").formCheck();
	$("#RegForm2").formCheck({
	 		"cb":function(res){
	 			if(res.status==1){
	 				$(".getSuc").show();
	 				$(".redPacketLayer").hide();
	 				//3s后自动跳转
	 				var oSec=$("#jump3s");
					var time=oSec.html()*1;
					var url=$("#experCour").attr("href");
					var timer=null;
					timer=setInterval(function(){
						oSec.html(time--);
						if(time<0){
								clearInterval(timer);
								location.href=url;
						}
					},1000);
	 			}else{
	 				alert(res.info);
	 			}
	 		}
	 });
	$("#RegForm1").formCheck({
		json: {
			"occup": {
				"reg":/^[124567]$/,
				"error":"年龄段格式不正确",
				"empty":"年龄段不能为空"
			}
		}
	});
	$(function(){
		var $advList = $('#advList');
		var $advLi = $advList.find('li');
		var $tabDivs = $('#tabDivs').children();
		var oldIndex = 0;
		var $jb_sts=$(".jb_st").children();
		$advLi.mouseover(function(){
			var index = $(this).index();
			$advLi.eq(oldIndex).find('span').removeClass('tab_color');
			$advLi.eq(oldIndex).find('i').removeClass('tabon'+oldIndex);
			$(this).children('i').addClass('tabon'+index);
			$(this).children('span').addClass('tab_color');

			$tabDivs.removeClass('tabDesc').eq(index).addClass('tabDesc');
			$('#sanjiao').removeClass('tab_sanjiao'+oldIndex).addClass('tab_sanjiao'+index);

			$jb_sts.removeClass();
			 
			$jb_sts.eq(index).removeClass("jb_stno");
 			$jb_sts.eq(index).addClass("jb_stbk");
			
			
		}).mouseout(function(){
			oldIndex = $(this).index();
		})

		$('#similarSel,#selOption').click(function(){
			$('#ageList').show();
			$('#openWidnow').addClass('openWidnowUp');
			$('#selOption').addClass('turnBg');
			$('#orderBtn2').hide();
			return false;
		})

		$(document).click(function(){
			$('#openWidnow').removeClass('openWidnowUp');
			$('#ageList').hide();
			$('#selOption').removeClass('turnBg');
			$('#orderBtn2').show();
		})
		$('#ageList span').click(function(){
			var str = $(this).text();
			var num = $(this).attr('num');
			$('#openWidnow').removeClass('openWidnowUp');
			$('#similarSel').text(str).css('color','#000');
			$('#ageSel').val(num);
			$('#ageList').hide();
			$('#selOption').removeClass('turnBg');
			$('#orderBtn2').show();
		})
	});
	//遮罩及表单的显示，隐藏
	$('.listenBtn,.expriceBtn,.btn-tiyan,.orderNow_btn').click(function(){
		$('#ageSel').val(-1);
	    $('#openWidnow').show();
	    $('#mask').show();
	});
	//红包
	$('.openPacket').click(function(){
	    $('.redPacketLayer').show();
	    $('#mask').show();
	});

	//--/红包
	$('#mask').click(function(){
	    $('#openWidnow').hide();
	    $('.redPacketLayer').hide();
	    $('.getSuc').hide();
	    $(this).hide();
	});

});

