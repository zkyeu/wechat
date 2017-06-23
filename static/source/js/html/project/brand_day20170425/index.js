define('index',[''],function(require,exports){

    !function(){
        
        $(".jsMore").hover(function(){
            $(this).find('.jsUl').show();
        },function(){
            $(this).find('.jsUl').hide();
        });
        $(".ruleBtn").on("click",function(){
            $(".rule-mask,.rule-details").show();
        });
        $(".rule-details,.rule-mask").on("click",function(){
            $(".rule-mask,.rule-details").hide();
        });
    }();
   
})


