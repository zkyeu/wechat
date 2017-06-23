define("share_pop",["fastclick"],function(require, exports, module) {
    require("fastclick");//去除click延迟

    FastClick.attach(document.body);


    $(".choose_class_share").on("click",function(){
        $(".share_pop").show();
    });
    $(".share_pop").on("click",function(){
        $(this).hide();
    })

});

