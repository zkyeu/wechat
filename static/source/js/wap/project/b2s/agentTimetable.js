define(function(require, exports, module) {
    var utility = require("utility");
    isIOS = utility.checkPlat.isIOS();
    // utility.confirm();
    ;
    (function() {
        var timeNow = $("#timeNow"),
            cacheData = timeNow.val(),
            eventStr = null;

        //苹果和安卓的事件不一样
        isIOS ? eventStr = "blur" : eventStr = "change";
        //发ajax 时，手机上用onblur 和 onfocusout
        timeNow.on(eventStr, function() {
            var self = $(this),
                val = self.val();
            console.log(val);
            $(".day-now label span").html(val);
            if (val == "") {
                console.log("wei kong");
                //return;
            } else {
                console.log("bu wei kong");
                if (cacheData != val) {
                    cacheData = val;
                    window.location.assign("/wapagent/course?date=" + val);
                }
            }

        });

    })();

});
