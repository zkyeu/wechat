define(function(require,exports){
	$.extend({
		confirm: function(option) {
		    var msg = option.msg,
		        type = option.type || 'alert',
		        sSure = option.sureText || "确定",
		        sCancel = option.cancelText || "取消",
		        isReverse = option.isReverse || false,
		        fnCancel = option.fnCancel || function(){},
		        fnSure = option.fnSure || function(){},
		        addClass = option.addClass || "";
		    if ($("#m-confirm").length) {
		        $("#m-confirm").show().find(".bd p:first").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
		    } else {
		        var sConfirm = '<div class="m-alert '+addClass+'" id="m-confirm" style="display:block;">' +
		                '<div class="in">' +
		                '<div class="hd">' +
		                '<a class="close" href="javascript:;" title="关闭"></a>' +
		                '<h4>温馨提示</h4>' +
		                '</div>' +
		                '<div class="bd">' +
		                '<p class="f-tac">'+msg+'</p>' +
		                '</div>' +
		                '<div class="ft f-tac">' +
		                '<span class="u-btn jsCancel">' + sCancel + '</span>' +
		                '<i>&nbsp;&nbsp;</i>' +
		                '<span class="u-btn jsSure">' + sSure + '</span>' +
		                '</div>' +
		                '</div>' +
		                '</div>';
		        $("body").append(sConfirm);
		    }

		    if(type == 'alert'){
		        
		        $("#m-confirm").find(".ft i").hide();
		        $("#m-confirm").find(".jsCancel").hide();
		    }else{
		        
		        var oI=$("#m-confirm").find(".ft i");
		        $("#m-confirm").find(".jsCancel").show();
		        oI.show();

		        if(!isReverse){
		            oI.after($("#m-confirm").find(".jsSure"));
		            oI.before($("#m-confirm").find(".jsCancel"));
		        }else{
		            oI.after($("#m-confirm").find(".jsCancel"));
		            oI.before($("#m-confirm").find(".jsSure"));
		        }
		    }
		    
		    $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
		        $("#m-confirm").hide();
		        fnCancel && fnCancel.call(this);
		    });
		    $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
		        $("#m-confirm").hide();
		        fnSure && fnSure();
		    });
		}
	})

	var $boxs = $(".boxs");
	var $L_pay = $("#L_pay"); 
	$boxs.click(function(){
		$(this).find("span").addClass("cli_on");
		var $pay_name_val = $(this).find("span").attr("li_pay");
		$L_pay.val($pay_name_val);
	    $(this).parent().siblings().find(".boxs").find("span").removeClass("cli_on");
		$(this).siblings().find("span").removeClass("cli_on");
		$(this).find("div").addClass("cli");
		$(this).parent().siblings().find(".boxs").find("div").removeClass("cli");
		$(this).siblings().find("div").removeClass("cli");
	})
	var $posi_table = $(".posi_table");
	var $table_span = $posi_table.find("span");
	var $pay_tab = $(".pay_tit").find(".pay_tab");
	var $pay_bot = $(".pay_bot");
	var $pay_tit = $(".pay_tit");
	$table_span.each(function(i){
		$table_span.eq(i).click(function(){
			$(this).addClass("have_bot").siblings().removeClass(" have_bot");
			$pay_tab.eq(i).show().siblings().hide();
			$pay_tit.find(".boxs").find("div").removeClass("cli");
			$pay_tit.find(".boxs").find("span").removeClass("cli_on");
		});
		
	})

	// 判断是否点击了提交按钮
	var $close = $(".close");
	var $tanceng = $(".tanceng");
	var $center = $(".center");
	$tanceng.css({"height":$(document).height()})
	$tanceng.hide();
	$center.hide();

	$close.click(function(){
		$tanceng.hide();
		$center.hide();
	});

	$('#AC_ordeForm').submit(function(){
		var $has_class = $pay_tab.find(".boxs").find("span").hasClass("cli_on");
		if($has_class){
			$tanceng.show();
			$center.show();
		}else{
			$.confirm({msg: '请选择支付方式！'});
			return false;
		}
	})
})





