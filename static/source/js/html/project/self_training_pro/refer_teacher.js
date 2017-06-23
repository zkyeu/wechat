$(function(){
	var first_banner_num=0;
	var first_banner_lens=$(".banner>ol>li").length;
	//初始化轮播的宽度
	var prentWidth=$(".banner").width(),
	lens=$(".banner>ul>li").length;
	//init z-index
	$(".banner>ul>li").each(function(i,v){
		$(this).css({
			zIndex:10-i
		})
	});
	$(".banner").css({
		height:prentWidth*0.31
	});
	$(".banner>ol").css({
		top:prentWidth*0.31*0.85
	});
	//轮播
	new slide({
		slideEles:".banner>ul",
		slideType:"fade",
		callback:function(){
				first_banner_num++;
				if(first_banner_num>(first_banner_lens-1)){
					first_banner_num=0
				};
				$(".banner>ol>li").removeClass("current");
				$(".banner>ol>li").eq(first_banner_num).addClass("current");
			}
	})

	$(".write_form").on("click",function(){
		$(".complete_form").removeClass("hide");
	});
	$(".complete_form span.close").on("click",function(){//点击表单的关闭按钮，清空表单
		$(".complete_form").addClass("hide");
		$(".complete_form input").val("");
		$(".complete_form select option:first").prop({selected:'selected'});
		/*$(".complete_form select").prop({
			selectedIndex:0
		})*/

	});
	$(".share_to_friends").on("click",function(){
		$(".share_link").removeClass("hide");
	});
	$(".share_link span.close").on("click",function(){
		$(".share_link").addClass("hide");
	});

	$("table").on('click',"a.popup",function(){
		$(".payout_status").removeClass("hide");
	});
	$(".payout_status span.close,.payout_status a.close").on("click",function(){
		$(".payout_status").addClass("hide");
	});

	$(".querydialog .closeDialog,.querydialog .close").on("click",function(){
		$(".querydialog").addClass("hide");
	});
	$("#query").click(function(){
		$(".querydialog").removeClass("hide");
	});
	$(".copy").on("click",function(){
		copyToClipboard("copylink");
	})
	function copyToClipboard(elementId) {
      // 创建元素用于复制
      var aux = document.createElement("input");

      // 获取复制内容
      var content = document.getElementById(elementId).innerHTML || document.getElementById(elementId).value;
    
      // 设置元素内容
      aux.setAttribute("value", content);
    
      // 将元素插入页面进行调用
      document.body.appendChild(aux);
    
      // 复制内容
      aux.select();
    
      // 将内容复制到剪贴板
      document.execCommand("copy");
    
      // 删除创建元素
      document.body.removeChild(aux);

		alert("Success! Now you can send your personal referral link to your friends.")
    }

})