/**
 * 
 * @authors Saturday (zhuning@51talk.com)
 * @date    2015-02-12 13:49:21
 * @version 1.0.0
 */
define(function(require,exports,module){
	var cookie = require("cookie");
	$("#start").click(function() {
		cookie.clearCookie("start_t");
		cookie.setCookie("start_t", Math.round(new Date().getTime()/1000));
	});
	$("#end_t").html(Math.round((Math.round(new Date().getTime()/1000)-(cookie.getCookie("start_t")))/60) || 1);
	// $(".choice").click(function() {
	// 	var data = {};
	// 	data.result = $(this).attr("result");
	//     $.post("", data, function(){});
	// });
});
function submit(obj, result){
	document.getElementById("c_result").value = result;
	document.getElementById("c_col").submit();
}