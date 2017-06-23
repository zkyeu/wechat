define("helperLink", ["layui","helperIframe"], function (require, exports, module) {
    require("helperIframe");
    var $helperLink = $(".helper-link");

    var wxInit = window.parent.wxHeck.wxInit;

    var helperLinkHandler = new function () {

        if (!wxInit) return;

        var me = this;

        me.addFriend = function (data) {
            wxInit.$broadcast("showAddFriend", data);
        }
    }

    $helperLink.on("click", "[data-action]", function () {
        var $this = $(this);
        var action = $this.attr("data-action");
        var data = $this.attr("data-data");

        typeof(helperLinkHandler[action]) == "function" && helperLinkHandler[action](JSON.parse(data));
    });


});