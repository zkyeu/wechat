define("acMeeting",["utility"],function(require,exports,module){
	var utility = require("utility"),
		timmer = $(".meeting-timmer>span");

	utility.deftime({
		start : +timmer.text(),
		startFn : function(r){
			timmer.text(r);
		},
		targetFn : function(r){
			(typeof(acCallback) == "function") && acCallback.call(null,r);
		}
	});

});