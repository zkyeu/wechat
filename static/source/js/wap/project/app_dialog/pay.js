define(function(require, exports, module) {

    ;
    (function() {
        
        window.checkWeixin=function(type){
            if(type != 1){
                $(".js_weixin").addClass('disnone');
            }
        };
        // window.location.href = "/client/invoke?type=1";
        // window.location.href = "app51talkb2s://client/invoke?type=1";

        ////////////
        // 支付部分开始 //
        ////////////

        $(".js_pay").on("click", ".js_radio", function() {
            var self = $(this),
                payid = self.data('payid'),
                price = self.data('price'),
                discount = self.data('discount');
                // discount = $(".js_discount").data('discount');
            $(".js_radio").find('.icon-radio').removeClass('icon-radio-yes').addClass("icon-radio-no");
            self.find('.icon-radio').removeClass('icon-radio-no').addClass('icon-radio-yes');
            $("#vipPayId").val(payid);
            $(".js_actualAmount").html(price-discount);
            $(".js_discount").html(discount);
            /*if (self.hasClass("selected")) {
                self.addClass("no-selected").removeClass("selected");
                $("#vipClass1").val(self.data("no"));
            } else {
                self.addClass("selected").removeClass("no-selected");
                $("#vipClass1").val(self.data("yes"));
            }*/
        });

        $(".alipay,.WeChat").on("click", function() {
            var self = $(this);
            $("#vipPay").val(self.data("pay"));
            $("#answerForm").submit();
        });

        ////////////
        // 支付部分结束 //
        ////////////
    })();

});
