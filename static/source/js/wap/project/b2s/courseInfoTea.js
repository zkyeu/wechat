define(function(require, exports, module) {
    var utility = require("utility");

    ;
    (function() {
        var box = $(".course-info-box");
        box.on("click", ".info-list-download a", function() {
            var self = $(this),
                downloadURL = self.attr("download-url"),
                textbookPublish = self.attr("textbook_publish");

            //判断教材是否发布
            if (textbookPublish == "true") {
                // 已付费
                window.location.assign(downloadURL);
            } else {
                utility.promptDialog({
                    content: "教材尚未发布，请稍后再来哦~",
                    width: 206,
                    height: 90
                });
            }

        });
    })();

});
