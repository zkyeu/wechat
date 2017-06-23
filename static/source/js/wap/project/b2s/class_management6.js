define("class_management6", ["", ""], function(require, exports, module) {

    var $tea_btn = $(".tea-btn-wrap2");
    $tea_btn.on("click", function() {
        var type = $(".tea-btn").data("type");
        var href = $(".tea-btn").data("href");
        if (type == "app") {
        	var h = $(".tea-btn-in").height(),
            	hWebview = window.screen.height;
	        // console.log(h);
	        // alert(hWebview);
            window.location.href = href + "&proportion="+(h/hWebview);
            return;
        }
        
        $(".stu-audio-dialog").show();
    });
    $(".share-bottom").on("click", function() {
        $(".stu-audio-dialog").hide();
    })


});
