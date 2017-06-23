/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	$(".cerlist li").click(function(){
		var cerIndex = $(this).index();
		$(".certificate").attr("index", cerIndex);

		var dataUserLevel = parseInt($(this).attr("data-user-level"));
		var dataLevel = parseInt($(this).attr("data-level"));
		var dataApply = parseInt($(this).attr("data-apply"));
		var dataUrl = $(this).attr("data-url");

		if ($(this).hasClass("jsPause")) {
			var str = $(this).attr("data-levels");
	        var arr=[];
	        if(str) arr=str.split(",");
	        var strInfo = "";
	        for(var i=0;i<arr.length;i++){
	            var level=arr[i].split(":")[0];
	            var status=arr[i].split(":")[1];
	            var classInfo = '';
	            if (i==arr.length-1) {
	            	classInfo = (status==="ok" ? 'class="finish last"':'class="last"');
	            } else {
	            	classInfo = (status==="ok" ? 'class="finish"':'');
	            }
	            strInfo = strInfo + '<li ' + classInfo + '><a target="_blank" href="' + (status==="ok" ? "javascript:;" : (dataUrl + level)) + '"><div class="status"></div><div class="level">LEVEL ' + level + '</div></a></li>';
	        }
	        $(".zn-cert").find(".f-cb").html(strInfo);
			$(".zn-cert").show();
		} else if (!$(this).attr("data-id") || $(this).attr("data-id") == "") {
			if (dataUserLevel > dataLevel) {
			} else if (dataUserLevel <= dataLevel) {
				// if (cerIndex>0 && $(".cerlist li").eq(cerIndex-1).find(".p1").text() == "" && $(this).find(".p1").text() == "您正在努力获取") {
				if (($(".cerlist li").eq(cerIndex-1).attr("data-level") < dataUserLevel && dataUserLevel <= dataLevel) || cerIndex == 0) {
				} else {
					$(this).find(".p1").html("学完level"+dataLevel+"所有课程");
					$(this).find(".p2").html("就可以获得我啦");
					var index = $(this);
				    setTimeout(function() {
						index.find(".p1").html("");
						index.find(".p2").html("");
				    // },1000);
				    },3000);
				}
			}
		} else {
			if ($(this).attr("data-apply") == "Y") {
				$(".certificate .title").hide();
				$(".certificate .group").hide();
				$(".certificate .sibmit").hide();
				$(".certificate .f-tac img").attr("src", $(this).find("img").attr("src"));
				if ($(this).attr("data-send") == "N") {
					$(".certificate .zn-f a").html("邮寄信息已提交，请耐心等待");
				} else {
					$(".certificate .zn-f a").html("证书已申请邮寄，请耐心等待");
				}
				$(".certificate .zn-f").show();
			} else if ($(this).attr("data-apply") == "N"){
				$(".certificate .title").show();
				$(".certificate .group").show();
				$(".certificate .sibmit").show();
				$(".certificate .zn-f").hide();
			}
			$(".zn-send").show();
		}
	});
	$(".close").click(function(){
		$(".m-dialog").hide();
	});
	$(".sibmit .u-btn").click(function(){
		var post_num_re = /^[0-9]{6}$/;
		var real_name = $("#real_name").val() || "";
		var username_re = /[^\s]{1,}/;
		var user_addr = $("#user_addr").val() || "";
		var post_num = $("#post_num").val() || "";
		if (real_name == "") {
			alert("请填写收获人姓名");
			return false;
		} else if (user_addr == "") {
			alert("请填写收件地址");
			return false;
		} else if (post_num == "") {
			alert("请填写邮政编码");
			return false;
		} else if (!post_num_re.test(post_num)) {
			alert("请填写正确邮政编码");
			return false;
		} else {
			var data = {};
			data.real_name = real_name;
			data.post_num = post_num;
			data.user_addr = user_addr;
			var liindex = $(".certificate").attr("index");
			data.liindex = liindex;
			data.id = $(".cerlist li").eq(liindex).attr("data-id");

// console.log(data);
			$.ajax({url:"", type:'POST', dataType:'json', data:data,
				success : function(d){
					if (d.status == "OK") {
						$(".certificate .title").hide();
						$(".certificate .group").hide();
						$(".certificate .sibmit").hide();
						$(".certificate .zn-f").show();
						$(".certificate .f-tac img").attr("src", d.result);
						$(".cerlist li").eq(liindex).find("img").attr("src", d.result);
					} else {
						alert(d.message);
						return false;
					}
				}
			});
			// $.post("", data, function(res) {
			// 	res = JSON.parse(d);
			// 	if (res.status == "OK") {
			// 		$(".certificate .title").hide();
			// 		$(".certificate .group").hide();
			// 		$(".certificate .sibmit").hide();
			// 		$(".certificate .zn-f").show();
			// 		$(".certificate .f-tac img").attr("src", res.result);
			// 		$(".cerlist li").eq(liindex).find("img").attr("src", res.result);
			// 	} else {
			// 		alert(res.message);
			// 		return false;
			// 	}
			// });
		}
	});
});
