(function(){ 
	var aPage=$("[data-init]");
	var arr=[];
/*	 seajs.config({
        alias:{"swipeDown": "swipeDown.js"}
    });*/
	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});
    seajs.use(arr);
})();