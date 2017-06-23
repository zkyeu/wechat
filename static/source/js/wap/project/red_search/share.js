/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	// (function(){
	//     var oWin=$(window);
	//     var aImg=$("img");
	//     oWin.on("load scroll resize",function(){
	//         var scrollT=oWin.scrollTop();
	//         aImg.each(function(){
	//             if(this.src)return true;
	//             var oImg=$(this);
	//             if(scrollT+oWin.height()>=oImg.offset().top){
	//                 this.src=this.getAttribute("_src");
	//                 this.removeAttribute("_src");
	//             }
	//         });
	        
	//     });
	// })();
	var reTel = /^1[0-9]{10}$/;
	$("#reg1").click(function(){
		var tel = $("#reg1_tel").val();
		var passwd = $("#reg1_passwd").val();
		if (tel == "") {
			alert("请填写手机号码");
			return false;
		}
		if (!reTel.test(tel)) {
			alert("请填写正确格式手机号码");
			return false;
		}
		if (passwd == "") {
			alert("请填写密码");
			return false;
		}
		document.getElementById("reg1_form").submit();
	});
	$("#reg2").click(function(){
		var tel = $("#reg2_tel").val();
		var passwd = $("#reg2_passwd").val();
		if (tel == "") {
			alert("请填写手机号码");
			return false;
		}
		if (!reTel.test(tel)) {
			alert("请填写正确格式手机号码");
			return false;
		}
		if (passwd == "") {
			alert("请填写密码");
			return false;
		}
		document.getElementById("reg2_form").submit();
	});

	var dropDownH = $(".drop_down").offset().top-$(window).height();
	var part2H = $(".part2").offset().top-$(window).height();
	var part3H = $(".part3").offset().top-$(window).height();
	var timer = setInterval(function(){
		if ($(window).scrollTop()>dropDownH && $(window).scrollTop()<part2H) {
			$(".text1").addClass("text_now");
		} else if ($(window).scrollTop()>part2H && $(window).scrollTop()<part3H) {
			$(".text2").addClass("text_now");
		} else if ($(window).scrollTop()>part3H) {
			$(".text3").addClass("text_now");
		}
	}, 1);
	
	
});
