define(function(require,exports,module){
    // 点选变色
    ;(function(){
        $(".class-info,.class-none").on(
            {
                touchstart:function(){
                    $(this).addClass("istouch");
                },
                touchend:function(){
                    var self = $(this);
                    window.setTimeout(function(){
                        self.removeClass("istouch");
                    },300);
                }
            },
            "dl"
        );
    })();


    //关闭选择教材提示弹层
    (function(){
      var $confirm_select_tops  = $(".confirm_select_tops"),
          $select_confirm = $(".select_confirm"),
          $close_select_confirm = $(".close_select_confirm");
      $(".close_select_confirm").on("click",function(){
        $select_confirm.hide();
        $confirm_select_tops.hide();
      })
    })();
});