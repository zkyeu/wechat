define('bx_alert', [], function(require, exports, module) {
    //弹出框提示
    var m_alert = $.extend({
        alert: function(msg, cancel, confirm, cancelBack, confirmBack) {
            $(".dialog_mask").show();
            var $alert = $(".alert");
            if ($alert.length) {
                $alert.show().find(".bd").html(msg);
                $alert.find(".cancel").html(cancel);
                $alert.find('.confirm').html(confirm);
            } else {
                var sAlert = '<div class="alert" id="alert" style="display:block;">' +
                    '<div class="bd">' + msg +
                    '</div>' +
                    '<div class="fbt">' +
                    '<span class="btn cancel">' + cancel + '</span>' +
                    '<span class="btn confirm">' + confirm + '</span>' +
                    '</div>' +
                    '</div>';
                $("body").append(sAlert);
                var timer = null;

            }
            $(".alert").off();
            $(".alert").on("click", '.cancel', function(event) {
                $(".dialog_mask").hide();
                $(".alert").hide();
                cancelBack && cancelBack();
            });
            $(".alert").on("click", '.confirm', function(event) {
                $(".dialog_mask").hide();
                $(".alert").hide();
                confirmBack && confirmBack();
            });

        }
    });
});