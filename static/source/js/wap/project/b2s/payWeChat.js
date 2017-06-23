define(function(require, exports, module) {
    var utility = require("utility"),
        radioPrice = $(".pay-radio"),
        price=$(".price");

    radioPrice.on("click", function() {
        var self = $(this),
            money=self.data("price");
        radioPrice.removeClass("pay-radio-select");
        self.addClass("pay-radio-select");
        $("#pay_weChat").val(money);
        price.html("¥"+money);
    });

});
