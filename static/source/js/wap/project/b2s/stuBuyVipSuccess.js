define(function(require, exports, module) {

    ;
    (function() {
        
        //支付成功页倒计时开始
        var s = 4, t;
        function times(){
            s--;
            $(".time").html(s+"秒");
            t = setTimeout(times, 1000);
            if ( s <= 0 ){
                s = 4;
                clearTimeout(t);
                window.location.href=$(".countdownHref").attr("href");
            }
        }
         
        times();
        //支付成功页倒计时结束

    })();

});
