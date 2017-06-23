define(function(require, exports, module) {

    ;
    (function() {
        
        $(".stu-buyvip-container ul").on("click", "li dl", function() {
            var self = $(this),
                radioStr = self.find("dd span");
            if(radioStr.hasClass("radio-no")){
                $(".radio-yes").addClass("radio-no").removeClass("radio-yes");
                radioStr.addClass("radio-yes").removeClass("radio-no");
            }
        });

        
    })();

});
