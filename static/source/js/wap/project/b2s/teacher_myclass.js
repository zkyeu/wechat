define(function(require, exports, module) {

    ;
    (function() {
        
        $(".account-info").on("click", "li", function() {
            var _self = $(this),
                _state = _self.data("state"),
                _href = _self.data("href"),
                _not = _self.data("not"),
                _overdue = _self.data("overdue");
            if(_state==1){
                window.location.href=_href;
            }else if(_state==0){
                $(".dialog-tit").html(_not);
                dialogShow();
            }else if(_state==2){
                $(".dialog-tit").html(_overdue);
                dialogShow();
            }
        });

        $(".dialog-btn").on("click", "", function() {
            dialogClose();
        });

        function dialogShow(){
            $(".dialog-wrap").show();
        }
        function dialogClose(){
            $(".dialog-wrap").hide();
        }

        
    })();

});
