define(function(require, exports, module) {

    ;
    (function() {
        function payShow() {
            $(".pay-dialog").show();
        }

        function payHide() {
            $(".pay-dialog").hide();
        }

        $(".pay-dialog-hide").on("tap", "", function() {
            payHide();
        });

        $(".buyvip-container").on("tap", ".pay-dialog-show", function() {
            payShow();

        });

        $(".buyvip-bottom-1 ul").on("tap", "li dl", function() {
            var self = $(this),
                packageId = self.data("packageid");
            $("#packageId").val(packageId);
        });

        $(".buyvip-bottom-2 ul").on("tap", "li dl", function() {
            var self = $(this),
                radioStr = self.find("dd span"),
                packageId = self.data("packageid");
            if(radioStr.hasClass("radio-no")){
                $(".radio-yes").addClass("radio-no").removeClass("radio-yes");
                radioStr.addClass("radio-yes").removeClass("radio-no");
                $("#packageId").val(packageId);
            }
        });

        $(".payItems").on("tap", "", function() {
            var self = $(this),
                payType = self.data("paytype");
                console.log(self);
            $("#payType").val(payType);
            //alert(payType)

            $("#buyVipForm").submit();
        });

        $(".btn-reload").on("tap", "", function() {
            location.reload();
        });
    })();

});
