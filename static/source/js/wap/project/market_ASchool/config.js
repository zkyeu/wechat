;(function(){ 
	var aPage=$("[data-init]");
	var arr=[];
	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});
    seajs.use(arr);
})();