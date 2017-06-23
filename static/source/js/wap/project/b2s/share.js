define(function(require,exports,module){
     (function() {
        //显示分享引导-学生页
        $(".share-btn").on("click", function() {
            $(".stu-audio-dialog").show();
        });
        $(".share-cancel").on("click", function() {
            $(".stu-audio-dialog").hide();
        });
    })();
});