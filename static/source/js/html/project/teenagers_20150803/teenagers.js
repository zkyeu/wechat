/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	require("formCheck");
	require("silder");
	require("placeholder");
	$("#t-regForm,#m-regForm,#b-regForm").formCheck();

	$("#silderX").silder({
		"axis":"x",
        "speed":5000,
        "points":true,
        "pointClass":$("[data-silder='points']").attr("data-class")
	});

});
